/* globals Atomics, SharedArrayBuffer */
import CPU from "./Cpu.js";
import Memory from "./Memory.js";
import Screen from "./Screen.js";

import TRAPS from "../core/traps.js";
import memoryLayout from "./memoryLayout.js";
import log from "../util/log.js";

import supportsWorkers from "../util/supportsWorkers.js";
import supportsSharedArrayBuffer from "../util/supportsSharedArrayBuffer.js";
import supportsAtomics from "../util/supportsAtomics.js";

const useWorkers = supportsSharedArrayBuffer && supportsWorkers;

export default class Computer {

    constructor({
        screenId = "screen",
        borderId = "screen-border",
        devices = [],
        roms = [],
        beforeFrameUpdate,
        debug
    } = {}) {
        this.debug = debug;

        this.performance = {
            iterationsBetweenTimeCheck: 100,
            timeToDevoteToCPU: 12,
            throttlePoint: 14,          // floor((850/60))
            maxTimeToDevoteToCPU: 12,   // floor((725/60))
            minTimeToDevoteToCPU: 0.2,
            finetuning: 1, // percent to adjust 25 = faster adjustments
            FPSTargets: [60, 30, 15, 7.5],
            targetFPSIdx: 0
        };
        this.targetFPS(60);

        this.memory = new Memory(memoryLayout, { shared: useWorkers });
        this.memory.init();

        // load ROMS
        this.roms = roms;
        this.roms.forEach((rom) => {
            this.memory.loadFromJS(rom);
        });
        this.memory.protected = true;

        if (useWorkers) {
            const cpuWorker = new Worker("./dist/CpuWorker.js");
            let instSinceLastMessage = 0;
            cpuWorker.addEventListener("message", (e) => {
                const cmd = e.data.cmd;
                const data = e.data.data;
                switch (cmd) {
                    case "stats":
                        instSinceLastMessage = data.numInstructions - instSinceLastMessage;
                        this.stats.lastFrameInstructions += instSinceLastMessage;
                        this.stats.totalInstructions = data.numInstructions;
                        break;
                    case "status":
                        this.cpu.stepping = data.stepping;
                        this.cpu.running = data.running;
                        this.cpu.paused = data.paused;
                        break;
                    case "state":
                        this.cpu.state = data;
                        break;
                    case "registers":
                        this.cpu.registers = data;
                        break;
                    case "flags":
                        break;
                    default:
                }
            });

            if (supportsAtomics) {
                this._sentinelSharedBuffer = new SharedArrayBuffer(1);
                this._sentinel = new Uint8Array(this._sentinelSharedBuffer);
                cpuWorker.postMessage({ cmd: "setSentinel", data: this._sentinelSharedBuffer });
            }
            cpuWorker.postMessage({ cmd: "setSharedMemory", data: this.memory.sharedArrayBuffer });
            cpuWorker.postMessage({ cmd: "init" });
            this.cpuWorker = cpuWorker;
            this.cpu = {
                stepping: false,
                paused: false,
                running: false,
                registers: {},
                state: {},
                worker: true,
                working: false,
                sendTrap: (trap) => {
                    this.cpuWorker.postMessage({ cmd: "trap", data: trap });
                    this.getCPUAttention();
                }
            };
        } else {
            this.cpu = new CPU(this.memory);
        }

        this.devices = {};
        this.deviceTickFns = [];

        devices.forEach((Device) => {
            let device = new Device({ cpu: this.cpu, memory: this.memory });
            this.devices[device.name] = device;
            if (typeof device.tick === "function") {
                this.deviceTickFns.push(device.tick.bind(device));
            }
        });


        if (useWorkers) {
            this.screen = new Screen(screenId, borderId, this.memory, { shared: true });
            const screenWorker = new Worker("./dist/ScreenWorker.js");
            screenWorker.postMessage({ cmd: "setSharedMemory", data: this.memory.sharedArrayBuffer });
            screenWorker.postMessage({ cmd: "setSharedFrameBuffer", data: this.screen.sharedArrayBuffer });
            screenWorker.postMessage({ cmd: "init" });
            screenWorker.addEventListener("message", (e) => {
                const cmd = e.data.cmd;
                switch (cmd) {
                    case "updated":
                        this.screen.draw();
                        // send a frame interrupt to the CPU
                        this.cpuWorker.postMessage({ cmd: "trap", data: TRAPS.FRAME });
                        this.getCPUAttention();
                        break;
                    default:
                }
            });
            this.screenWorker = screenWorker;
        } else {
            if (screenId) {
                this.screen = new Screen(screenId, borderId, this.memory);
            } else {
                this.screen = null;
            }
        }
        this.beforeFrameUpdate = beforeFrameUpdate;

        this.resetStats();

        this.tick = (f) => {
            if (this.screen) {
                if (useWorkers) {
                    this.tickInBrowserUsingWorkers(f);
                } else {
                    this.tickInBrowser(f);
                }
            } else {
                this.tickOutsideBrowser(f);
            }
        }
    }
    targetFPS(f) {
        this.performance.targetFPSIdx = this.performance.FPSTargets.indexOf(f);
        if (this.performance.targetFPSIdx === -1) {
            this.performance.targetFPSIdx = 0;
        }
        this.performance.throttlePoint = Math.floor(1000 / f); // 850
        this.performance.maxTimeToDevoteToCPU = Math.floor(725 / f);
    }

    now() {
        return performance.now();
    }

    nodeNow() {
        // TODO
        // return a performance.now-like value
    }

    getCPUAttention() {
        if (useWorkers && supportsAtomics && this.cpu.working) {
            Atomics.store(this._sentinel, 0, 1);
        }
    }

    tickInBrowserUsingWorkers(f) {
        if (this.cpu.working) {
            window.requestAnimationFrame(this.tick);
        }

        if (this.debug) {
            //this.cpu.dump();
            this.memory.dump();
            this.dump();
        }

        this.stats.lastFrameInstructions = 0;

        this.cpuWorker.postMessage({ cmd: "getStats" });
        this.cpuWorker.postMessage({ cmd: "getStatus" });
        this.cpuWorker.postMessage({ cmd: "getState" });
        this.cpuWorker.postMessage({ cmd: "getRegisters" });

        /*eslint-disable no-var, vars-on-top*/
        var fudge = 1;
        var msPerFrame = Math.floor(1000 / this.performance.FPSTargets[this.performance.targetFPSIdx]);

        var startTime = this.now();
        var deltaf = f - this.stats.oldf;
        var curTime, stopTime, endTime, totalTime;

        /*eslint-enable no-var, vars-on-top*/
        this.stats.oldf = f;
        this.stats.deltaf = deltaf;

        // is there a beforeFrameUpdate callback? If so, call it
        if (this.beforeFrameUpdate) {
            this.beforeFrameUpdate(this, deltaf);
        }

        if (this.screen) {
            // composite the screen
            this.screenWorker.postMessage({ cmd: "update" });
        }


        // we need to know how long that took so we can devote
        // a safe amount of time to the processor
        // and if we need to reduce our targetFPS
        curTime = this.now();
        if ((curTime - startTime) > msPerFrame + fudge) {
            if (this.performance.targetFPSIdx < (this.performance.FPSTargets.length - 1)) {
                this.performance.targetFPSIdx++;
            }
        } else if ((curTime - startTime) < (msPerFrame / 2) + fudge) {
            if (this.performance.targetFPSIdx > 0) {
                this.performance.targetFPSIdx--;
            }
        }

        //stopTime = curTime + (this.performance.timeToDevoteToCPU);
        stopTime = Math.min(startTime + (msPerFrame - fudge), curTime + this.performance.timeToDevoteToCPU);

        // if the time to devote to the CPU is so small that we've already passed
        // stop time, give it some more time
        if (stopTime < this.now()) {
            stopTime = this.now() + this.performance.minTimeToDevoteToCPU;
        }

        this.tickDevices();

        // compute final stats and adjust performance
        endTime = this.now();
        totalTime = endTime - startTime;
        this.stats.lastFrameTime = totalTime;
        this.stats.totalTime += totalTime;
        this.stats.totalFrames++;
        this.stats.performanceAtTime = endTime;

    }

    tickInBrowser(f) {
        if (!this.cpu.running) {
            return;
        }

        if (this.cpu.running && !this.cpu.stepping) {
            window.requestAnimationFrame(this.tick);
        }

        /*eslint-disable no-var, vars-on-top*/
        var fudge = 1;
        var msPerFrame = Math.floor(1000 / this.performance.FPSTargets[this.performance.targetFPSIdx]);

        var startTime = this.now();
        var deltaf = f - this.stats.oldf;
        var curTime, stopTime, endTime, totalTime;

        /*eslint-enable no-var, vars-on-top*/
        this.stats.oldf = f;
        this.stats.deltaf = deltaf;

        // is there a beforeFrameUpdate callback? If so, call it
        if (this.beforeFrameUpdate) {
            this.beforeFrameUpdate(this, deltaf);
        }

        if (this.screen) {
            // update the screen
            this.screen.update();
            this.screen.draw();
        }


        // we need to know how long that took so we can devote
        // a safe amount of time to the processor
        // and if we need to reduce our targetFPS
        curTime = this.now();
        if ((curTime - startTime) > msPerFrame + fudge) {
            if (this.performance.targetFPSIdx < (this.performance.FPSTargets.length - 1)) {
                this.performance.targetFPSIdx++;
            }
        } else if ((curTime - startTime) < (msPerFrame / 2) + fudge) {
            if (this.performance.targetFPSIdx > 0) {
                this.performance.targetFPSIdx--;
            }
        }

        //stopTime = curTime + (this.performance.timeToDevoteToCPU);
        stopTime = Math.min(startTime + (msPerFrame - fudge), curTime + this.performance.timeToDevoteToCPU);

        // if the time to devote to the CPU is so small that we've already passed
        // stop time, give it some more time
        if (stopTime < this.now()) {
            stopTime = this.now() + this.performance.minTimeToDevoteToCPU;
        }

        // send a frame interrupt to the CPU
        this.cpu.sendTrap(TRAPS.FRAME);

        // run the processor for a while
        if (this.cpu.stepping) {
            this.stats.lastFrameInstructions = 0;
            this.cpu.step();
            this.tickDevices();
            this.stats.lastFrameInstructions++;
            this.stats.totalInstructions++;
        } else {
            this.stats.lastFrameInstructions = 0;
            if (this.cpu.running && !this.cpu.paused) {
                while (this.now() < stopTime) {
                    for (let i = this.performance.iterationsBetweenTimeCheck; i > 0; i--) {
                        if (this.cpu.running && !this.cpu.paused) {
                            this.cpu.step();
                            this.stats.lastFrameInstructions++;
                            this.stats.totalInstructions++;
                        }
                    }
                    this.tickDevices();
                }
            }
        }

        // compute final stats and adjust performance
        endTime = this.now();
        totalTime = endTime - startTime;
        this.stats.lastFrameTime = totalTime;
        this.stats.totalTime += totalTime;
        this.stats.totalFrames++;
        this.stats.performanceAtTime = endTime;

        /*
                if (!this.cpu.stepping) {
                    // only throttle when stepping
                    if (totalTime > this.performance.throttlePoint) {
                        // we need to limit processing time
                        this.performance.timeToDevoteToCPU = Math.round((this.performance.timeToDevoteToCPU * 100) - this.performance.finetuning) / 100;
                        if (this.performance.timeToDevoteToCPU < this.performance.minTimeToDevoteToCPU) {
                            this.performance.timeToDevoteToCPU = this.performance.minTimeToDevoteToCPU
                        }
                    } else if (totalTime < this.performance.maxTimeToDevoteToCPU) {
                        // but we need to increase processing to use the most of the
                        // available time as possible
                        this.performance.timeToDevoteToCPU = Math.round((this.performance.timeToDevoteToCPU * 100) + this.performance.finetuning) / 100;
                        if (this.performance.timeToDevoteToCPU > this.performance.maxTimeToDevoteToCPU) {
                            this.performance.timeToDevoteToCPU = this.performance.maxTimeToDevoteToCPU;
                        }
                    }
                }
        */
        if (this.debug) {
            this.cpu.dump();
            this.memory.dump();
            this.dump();
        }
        if (this.cpu.stepping) {
            this.cpu.stepping = false;
            this.cpu.running = false;
        }
    }

    tickOutsideBrowser() {
        if (this.cpu.stepping) {
            this.cpu.step();
            this.stats.totalInstructions++;
        } else {
            if (this.cpu.running && !this.cpu.paused) {
                this.cpu.step();
                this.stats.totalInstructions++;
            }
        }
        this.tickDevices();
        if (this.debug) {
            this.cpu.dump();
            this.memory.dump();
            this.dump();
        }
        if (this.cpu.stepping) {
            this.cpu.stepping = false;
            this.cpu.running = false;
        }
    }

    tickDevices() {
        let now = this.now();
        for (let i = this.deviceTickFns.length - 1; i >= 0; i--) {
            this.deviceTickFns[i](now);
        }
    }

    resetStats() {
        this.stats = {
            totalInstructions: 0,
            lastFrameInstructions: 0,
            totalFrames: 0,
            totalTime: 0,
            lastFrameTime: 0,
            oldf: 0,
            startTime: 0,
            performanceAtTime: 0
        };
        this.memory.resetStats();
    }

    dumpAll() {
        if (!this.cpu.worker) { this.cpu.dump(); }
        this.memory.dump();
        this.dump();
    }

    dump() {
        log(`cpu time per cycle (ms): ${this.performance.timeToDevoteToCPU} | instructions last cycle: ${this.stats.lastFrameInstructions} | total: ${this.stats.totalInstructions}`);

        let lastFrameTime = Math.round(this.stats.lastFrameTime * 100) / 100;
        let avgFrameTime = Math.round((this.stats.totalTime / this.stats.totalFrames) * 100) / 100;
        let avgMIPS = Math.round(((this.stats.totalInstructions / this.stats.totalFrames) * 60) / 10000) / 100;
        let secondsElapsed = (performance.now() - this.stats.startTime) / 1000;
        let expectedFrames = secondsElapsed * 60;
        let actMIPS = Math.round(((this.stats.totalInstructions / expectedFrames) * 60) / 10000) / 100;

        log(`last frame ms: ${lastFrameTime} | avg frame ms: ${avgFrameTime} | total frames: ${this.stats.totalFrames} | hope avg MIPS: ${avgMIPS} | act avg MIPS: ${actMIPS}`)
    }

    start() {
        this.stats.startTime = performance.now();

        if (this.cpuWorker) {
            this.cpu.working = true;
            this.cpuWorker.postMessage({ cmd: "start" });
            window.requestAnimationFrame(this.tick);
            return;
        }

        if (this.cpu.stepping) {
            this.cpu.stepping = false;
        }
        if (this.cpu.running) {
            return;
        }
        this.cpu.running = true;
        window.requestAnimationFrame(this.tick);
    }

    stop() {
        if (this.cpuWorker) {
            this.cpuWorker.postMessage({ cmd: "stop" });
            this.getCPUAttention();
            this.cpu.working = false;
            return;
        }

        if (!this.cpu.running) {
            return;
        }
        this.cpu.running = false;
    }

    step() {
        if (this.cpuWorker) {
            this.cpuWorker.postMessage({ cmd: "step" });
            this.getCPUAttention();
            return;
        }

        if (!this.cpu.running) {
            this.start();
        }
        this.cpu.clrFlag(this.cpu.flagMap.I);   // kill interrupts while stepping
        this.cpu.stepping = true;
    }

    reset() {
        if (this.cpuWorker) {
            this.cpuWorker.postMessage({ cmd: "softReset" });
            this.getCPUAttention();
            return;
        }
        // send reset trap
        this.cpu.sendTrap(TRAPS.RESET);
    }

    hardReset() {
        this.resetStats();
        this.stats.startTime = performance.now();
        if (this.cpuWorker) {
            this.cpuWorker.postMessage({ cmd: "stop" });
            this.getCPUAttention();
            this.memory.init();
            this.screen.init();
            this.cpuWorker.postMessage({ cmd: "hardReset" });
        } else {
            this.cpu.stepping = false;
            //this.cpu.running = false;
            this.cpu.init();
            this.memory.init();
            this.screen.init();
        }

        // reload ROMs
        this.roms.forEach((rom) => {
            this.memory.loadFromJS(rom);
        });
        this.memory.protected = true;

        // reset devices, if allowed
        Object.keys(this.devices).forEach(deviceName => (typeof this.devices[deviceName].reset === "function" ? this.devices[deviceName].reset() : 0));

        if (this.cpuWorker) {
            if (this.cpu.working) {
                setTimeout(() => {
                    this.cpuWorker.postMessage({ cmd: "start" });
                }, 100);
            }
        }
        //this.reset();
    }

}