import CPU from "./Cpu.js";
import Memory from "./Memory.js";
import Screen from "./Screen.js";
import IO from "./IO.js";
import Keyboard from "./devices/Keyboard.js";


import memoryLayout from "./memoryLayout.js";
import log from "./log.js";


const TRAPS = {
    FRAME: 0xF0,
    RESET: 0x00
}

export default class Computer {

    constructor({
        screenId = "screen",
        devices = [],
        roms = [],
        beforeFrameUpdate,
        debug
    } = {}) {
        this.debug = debug;

        this.performance = {
            iterationsBetweenTimeCheck: 100,
            timeToDevoteToCPU: 1,
            throttlePoint: 14,          // floor((850/60))
            maxTimeToDevoteToCPU: 12,   // floor((725/60))
            minTimeToDevoteToCPU: 0.2
        };
        this.targetFPS(60);

        this.memory = new Memory(memoryLayout);
        this.memory.init();

        // load ROMS
        this.roms = roms;
        this.roms.forEach(rom => {
            this.memory.loadFromJS(rom);
        });

        this.io = new IO();
        this.cpu = new CPU(this.memory, this.io);

        this.devices = {};

        devices.forEach(Device => {
            let device = new Device({ io: this.io, cpu: this.cpu, memory: this.memory});
            this.devices[device.name] = device;
        });


        if (screenId) {
            this.screen = new Screen(screenId, this.memory);
        } else {
            this.screen = null;
        }
        this.beforeFrameUpdate = beforeFrameUpdate;

        this.resetStats();

        this.tick = (f) => {
            if (this.screen) {
                this.tickInBrowser(f);
            } else {
                this.tickOutsideBrowser(f);
            }
        }
    }
    targetFPS(f) {
        this.performance.throttlePoint = Math.floor(850 / f);
        this.performance.maxTimeToDevoteToCPU = Math.floor(725 / f);
    }
    tickInBrowser(f) {
        let startTime = performance.now();
        let deltaf = f - this.stats.oldf;
        this.stats.oldf = f;
        
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

        let curTime = performance.now();
        let deltaToNow = curTime - startTime;
        let stopTime = curTime + (this.performance.timeToDevoteToCPU);
        if (stopTime < performance.now()) {
            stopTime = performance.now() + this.performance.minTimeToDevoteToCPU;
        }

        // send a frame interrupt to the CPU
        this.cpu.sendTrap(TRAPS.FRAME);

        // run the processor for awhile
        if (this.cpu.stepping) {
            this.stats.lastFrameInstructions = 0;
            this.cpu.step();
            this.stats.lastFrameInstructions++;
            this.stats.totalInstructions++;
        } else {
            this.stats.lastFrameInstructions = 0;
            if (this.cpu.running && !this.cpu.paused) {
                while (performance.now() < stopTime) {
                    for (let i = this.performance.iterationsBetweenTimeCheck; i > 0; i--) {
                        if (this.cpu.running && !this.cpu.paused) {
                            this.cpu.step();
                            this.stats.lastFrameInstructions++;
                            this.stats.totalInstructions++;
                        }
                    }
                }
            }
        }

        // compute final stats and vary performance
        let endTime = performance.now();
        let totalTime = endTime - startTime;
        this.stats.lastFrameTime = totalTime;
        this.stats.totalTime += totalTime;
        this.stats.totalFrames ++;
        this.stats.performanceAtTime = endTime;

        if (!this.cpu.stepping) {
            // only throttle when stepping
            if (totalTime > this.performance.throttlePoint) {
                // we need to limit processing time
                this.performance.timeToDevoteToCPU = Math.round((this.performance.timeToDevoteToCPU * 100) - 25) / 100;
                if (this.performance.timeToDevoteToCPU < this.performance.minTimeToDevoteToCPU) {
                    this.performance.timeToDevoteToCPU = this.performance.minTimeToDevoteToCPU 
                }
            } else if (totalTime < this.performance.maxTimeToDevoteToCPU) {
                // but we need to increase processing to use the most of the
                // available time as possible
                this.performance.timeToDevoteToCPU = Math.round((this.performance.timeToDevoteToCPU * 100) + 25) / 100;
                if (this.performance.timeToDevoteToCPU > this.performance.maxTimeToDevoteToCPU) {
                    this.performance.timeToDevoteToCPU = this.performance.maxTimeToDevoteToCPU;
                }
            }
        }

        if (this.debug) {
            this.cpu.dump();
            this.memory.dump();
            this.dump();
        }
        if (this.cpu.running && !this.cpu.stepping) {
            window.requestAnimationFrame(this.tick);
        }
        if (this.cpu.stepping) {
            this.cpu.stepping = false;
            this.cpu.running = false;
        }
    }

    tickOutsideBrowser(f) {
        if (this.cpu.stepping) {
            this.cpu.step();
            this.stats.totalInstructions++;
        } else {
            if (this.cpu.running && !this.cpu.paused) {
                this.cpu.step();
                this.stats.totalInstructions++;
            }
        }
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
        this.cpu.dump();
        this.memory.dump();
        this.dump();
    }

    dump() {
        log(`cpu time per cycle (ms): ${this.performance.timeToDevoteToCPU} | instructions last cycle: ${this.stats.lastFrameInstructions} | total: ${this.stats.totalInstructions}`);

        let lastFrameTime = Math.round(this.stats.lastFrameTime * 100) / 100;
        let avgFrameTime = Math.round((this.stats.totalTime / this.stats.totalFrames) * 100) / 100;
        let avgMIPS = Math.round(((this.stats.totalInstructions / this.stats.totalFrames) * 60 ) / 10000) / 100;
        let secondsElapsed = (performance.now() - this.stats.startTime) / 1000;
        let expectedFrames = secondsElapsed * 60;
        let actMIPS = Math.round(((this.stats.totalInstructions / expectedFrames) * 60 ) / 10000) / 100;

        log(`last frame ms: ${lastFrameTime} | avg frame ms: ${avgFrameTime} | total frames: ${this.stats.totalFrames} | hope avg MIPS: ${avgMIPS} | act avg MIPS: ${actMIPS}`)
    }

    start() {
        if (this.cpu.stepping) {
            this.cpu.stepping = false;
        }
        if (this.cpu.running) {
            return;
        }
        this.stats.startTime = performance.now();
        this.cpu.running = true;
        window.requestAnimationFrame(this.tick);
    }

    stop() {
        if (!this.cpu.running) {
            return;
        }
        this.cpu.running = false;
    }

    step() {
        if (!this.cpu.running) {
            this.start();
        }
        this.cpu.clrFlag(this.cpu.flagMap.I);   // kill interrupts while stepping
        this.cpu.stepping = true;
    }

    reset() {
        // send reset trap
        this.cpu.sendTrap(TRAPS.RESET);
    }

    hardReset() {
        this.cpu.stepping = false;
        //this.cpu.running = false;
        this.cpu.init();
        this.memory.init();
        this.screen.init();

        // reload ROMs
        this.roms.forEach(rom => {
            this.memory.loadFromJS(rom);
        });

        //this.reset();
    }

}
