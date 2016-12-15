import CPU from "./Cpu.js";
import Memory from "./Memory.js";
import Screen from "./Screen.js";
import memoryLayout from "./memoryLayout.js";
import log from "./log.js";

import font from "../design/font0.js";

export default class Computer {

    constructor({
        screenId = "screen",
        beforeFrameUpdate,
        debug
    } = {}) {
        this.debug = debug;
        this.stats = {
            totalInstructions: 0,
            lastFrameInstructions: 0,
            totalFrames: 0,
            totalTime: 0,
            lastFrameTime: 0,
            oldf: 0,
            startTime: 0
        };
        this.performance = {
            iterationsBetweenTimeCheck: 100,
            timeToDevoteToCPU: 1,
            throttlePoint: 14,
            maxTimeToDevoteToCPU: 12
        };

        this.memory = new Memory(memoryLayout);
        this.memory.init();

        this.cpu = new CPU(this.memory);

        // simulate ROM font for now
        var tileSet0Offset = memoryLayout.tileSet0;
        font.forEach((v, i) => {
            this.memory.poke(i+tileSet0Offset, v);
        });

        this.screen = new Screen(screenId, this.memory);

        this.running = false;
        this.rafId = undefined;

        this.tick = (f) => {
            let startTime = performance.now();
            let deltaf = f - this.stats.oldf;
            this.stats.oldf = f;
            
            // is there a beforeFrameUpdate callback? If so, call it
            if (beforeFrameUpdate) {
                beforeFrameUpdate(this, deltaf);
            }

            // update the screen
            this.screen.update();
            this.screen.draw();

            // we need to know how long that took so we can devote
            // a safe amount of time to the processor

            let curTime = performance.now();
            let deltaToNow = curTime - startTime;
            let stopTime = curTime + (this.performance.timeToDevoteToCPU);

            // TODO: send a frame interrupt to the CPU

            // run the processor for awhile
            this.stats.lastFrameInstructions = 0;
            while (performance.now() < stopTime) {
                for (let i = this.performance.iterationsBetweenTimeCheck; i > 0; i--) {
                    this.cpu.step();
                    this.stats.lastFrameInstructions++;
                    this.stats.totalInstructions++;
                }
            }

            // compute final stats and vary performance
            let endTime = performance.now();
            let totalTime = endTime - startTime;
            this.stats.lastFrameTime = totalTime;
            this.stats.totalTime += totalTime;
            this.stats.totalFrames ++;

            if (totalTime > this.performance.throttlePoint) {
                // we need to limit processing time
                this.performance.timeToDevoteToCPU -= 0.25;
                if (this.performance.timeToDevoteToCPU < 0.25) {
                    this.performance.timeToDevoteToCPU = 0.25;
                }
            } else if (totalTime < this.performance.maxTimeToDevoteToCPU) {
                // but we need to increase processing to use the most of the
                // available time as possible
                this.performance.timeToDevoteToCPU += 1;
                if (this.performance.timeToDevoteToCPU > this.performance.maxTimeToDevoteToCPU) {
                    this.performance.timeToDevoteToCPU = 14;
                }
            }

            if (this.debug) {
                this.cpu.dump();
                this.memory.dump();
                this.dump();
            }
            if (this.running) {
                window.requestAnimationFrame(this.tick);
            }
        }
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
        if (this.running) {
            return;
        }
        this.stats.startTime = performance.now();
        this.running = true;
        window.requestAnimationFrame(this.tick);
    }

    stop() {
        if (!this.running) {
            return;
        }
        this.running = false;
    }

}
