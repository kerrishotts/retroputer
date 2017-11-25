/* globals self */
import CPU from "../core/Cpu.js";
import Memory from "../core/Memory.js";

import memoryLayout from "../core/memoryLayout.js";
import TRAPS from "../core/traps.js";

class CPUWorker {
    constructor() {
        this.cpu = new CPU();

        this.stats = {
            numInstructions: 0
        };

        this.tick = this.tick.bind(this);
    }

    setSharedMemory(sharedArrayBuffer) {
        this.cpu.memory = new Memory(memoryLayout, { withSharedArrayBuffer: sharedArrayBuffer });
    }

    setSharedIO() {
    }

    init() {
        this.stats.numInstructions = 0;
        this.cpu.init();
    }

    getStats(_, postMessage) {
        postMessage({
            cmd: "stats",
            data: this.stats
        });
    }

    getStatus(_, postMessage) {
        postMessage({
            cmd: "status",
            data: {
                running: this.cpu.running,
                stepping: this.cpu.stepping,
                paused: this.cpu.paused
            }
        });
    }

    getState(_, postMessage) {
        postMessage({
            cmd: "state",
            data: this.cpu.state
        });
    }

    getRegisters(_, postMessage) {
        postMessage({
            cmd: "registers",
            data: this.cpu.registers
        });
    }

    start() {
        this.cpu.stepping = false;
        if (this.cpu.running) {
            return;
        }

        this.cpu.running = true;
        this.tick();
    }

    tick() {
        const now = performance.now();
        const stopAt = now + 12;
        while (performance.now() < stopAt && (this.cpu.running && !this.cpu.paused)) {
            for (let i = 0; i < 100; i++) {
                if (this.cpu.running && !this.cpu.paused) {
                    this.cpu.step();
                    this.stats.numInstructions++;
                } else {
                    break;
                }
            }
        }
        if (this.cpu.running && !this.cpu.stepping) {
            setTimeout(this.tick, 0);
        }
    }

    stop() {
        this.cpu.running = false;
    }

    step() {
        this.cpu.stepping = true;
        this.cpu.step();
        this.stats.numInstructions++;

        this.cpu.stepping = false;
        this.cpu.running = false;
    }

    trap(trap) {
        this.cpu.sendTrap(trap);
    }

    hardReset() {
        this.init();
    }

    softReset() {
        this.cpu.sendTrap(TRAPS.RESET);
    }

}

const cpuWorker = new CPUWorker();
self.addEventListener("message", (e) => {
    const cmd = e.data.cmd;
    const data = e.data.data;
    if (cpuWorker[cmd]) {
        cpuWorker[cmd](data, self.postMessage);
    }
});