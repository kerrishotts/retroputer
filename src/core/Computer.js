import { Memory } from "../core/Memory.js";
import { SystemBus } from "../core/SystemBus.js";
import { Bus } from "../core/Bus.js";
import { IOBus } from "../core/IOBus.js";
import { Processor } from "../core/Processor.js";
import { Controller } from "../core/Controller.js";

import supportsSharedArrayBuffer from "../util/supportsSharedArrayBuffer.js";

export const TIMING_METHODS = {
    AUTO: 0,
    INTERVAL: 1,
    TIMEOUT: 2,
    RAF: 3,
    BLOCKING: 4,
    FIXED: 5
};

export const SHARED_MEMORY = {
    AUTO: 0,
    NOT_SHARED: 1,
    SHARED: 2
};

const _clock = Symbol("_clock");
const _processor = Symbol("_processor");
const _memory = Symbol("_memory");
const _ioBus = Symbol("_ioBus");
const _systemBus = Symbol("_systemBus");
const _controller = Symbol("_controller");
const _debug = Symbol("_debug");
const _stopSignal = Symbol("_stopSignal");
const _runID = Symbol("_runID");

export class Computer {
    /**
     * @param {Object} config
     * @param {Performance} config.performance the performance class to use
     * @param {boolean} [config.debug=false] if true, slice stops on single step mode
     * @param {number} [config.sliceTime=16] the amount of time to run, per slice
     * @param {number} [config.sliceGranularity=4095] the granularity when checking for slice timing
     * @param {number} [config.timingMethod=0] the timing method to use
     */
    constructor({ performance, debug = false, sliceTime = 16, sliceGranularity = 0x0FFF, timingMethod = TIMING_METHODS.AUTO, shared = SHARED_MEMORY.AUTO, stats} = {}) {

        const clock = new Bus(1, 0b1);
        const systemBus = new SystemBus();

        let realShared = false;
        switch (shared) {
            case SHARED_MEMORY.AUTO:
                realShared = supportsSharedArrayBuffer;
                break;
            case SHARED_MEMORY.SHARED:
                realShared = true;
                break;
            default:
            case SHARED_MEMORY.NOT_SHARED:
                realShared = false;
                break;
        }

        const memory = new Memory({ systemBus, shared: realShared });
        const ioBus = new IOBus();
        const debugLine = debug ? new Bus(1, 0b1) : null;
        const processor = new Processor({ memory, systemBus, ioBus, clock, debug: debugLine });
        const controller = new Controller({processor: processor, ioBus, clock});

        this.stats = {
            time: 0,
            ticks: 0,
            slices: 0,
            timeThisSlice: 0,
            ticksThisSlice: 0,
            ticksLastSlice: 0,
            processorStats: { ... processor.stats },
            processorStatsLastSlice: { ... processor.stats},
            processorStatsThisSecond: { ... processor.stats },
            processorStatsLastSecond: { ... processor.stats },
            aluStats: { ... processor.alu.stats },
            aluStatsLastSlice: { ... processor.alu.stats },
            aluStatsThisSecond: { ... processor.alu.stats },
            aluStatsLastSecond: { ... processor.alu.stats },
            timeSinceLastSecond: 0,
        };

        this._stats = stats;

        this[_stopSignal] = false;
        if (debugLine) {
            debugLine.addReceiver(() => {
                // stop any interval-based execution
                this[_stopSignal] = true; // <-- kill any executing routines.
                this.stop();
            });
        }


        this[_clock] = clock;
        this[_systemBus] = systemBus;
        this[_memory] = memory;
        this[_ioBus] = ioBus;
        this[_debug] = debugLine;
        this[_processor] = processor;
        this[_controller] = controller;

        const detectedTimingMethod = typeof requestAnimationFrame !== "undefined"
            ? TIMING_METHODS.RAF
            : TIMING_METHODS.TIMEOUT;

        this._options = {
            sliceTime,
            sliceGranularity,
            timingMethod: timingMethod === TIMING_METHODS.AUTO ? detectedTimingMethod : timingMethod,
            performance
        };

        /* private */
        this[_runID] = null;
    }

    /**
     * @type {Bus}
     */
    get clock() {
        return this[_clock];
    }

    /**
     * @type {SystemBus}
     */
    get systemBus() {
        return this[_systemBus];
    }

    /**
     * @type {Memory}
     */
    get memory() {
        return this[_memory];
    }

    /**
     * @type {IOBus}
     */
    get ioBus() {
        return this[_ioBus];
    }

    /**
     * @type {Controller}
     */
    get controller() {
        return this[_controller];
    }

    /**
     * @type {Bus}
     */
    get debugLine() {
        return this[_debug];
    }

    /**
     * @type {Processor}
     */
    get processor() {
        return this[_processor];
    }

    reset() {
        this.memory.reset(true);
        this.processor.reset();
    }

    /**
     * Step the computer by sending a tick.
     *
     * NOTE: This is **not** the same as single-stepping an instruction. An instruction
     * may in fact require multiple
     */
    tick() {
        this.stats.ticksThisSlice++;
        this.clock.signal();
    }

    /**
     * Attempt to step the computer by a single instruction
     * This can only be done if the computer has been initialized in debug mode
     * If it hasn't been, we'll do the same thing as a clock signal (task step)
     */
    step() {
        if (this.debug) {
            if (this.running) this.stop();
            this.processor.registers.INTERRUPT_DISABLE = 1;
            this.processor.registers.SINGLE_STEP = 1;
            this.runSlice();
            this._stopSignal = false;
        } else {
            this.tick();  // without the debug signal, we can't effectively single step
            this._updateStatsAfterSlice();
        }
    }

    /**
     * Run the computer in slice mode until the desired timeout has been passed
     * If the computer is in debug mode, a BRK instruction will trigger single-step mode
     * and stop execution early. If the computer is already in single step mode,
     * only a single instruction will execute
     */
    runSlice() {
        if (this._stats) this._stats.begin();
        const { sliceTime: timeout, sliceGranularity: granularity, performance, timingMethod} = this._options;
        this[_stopSignal] = false;       // clear any stop signal for this slice
        this.stats.slices++;
        const start = performance.now();
        if (timeout > 0 && timingMethod !== TIMING_METHODS.BLOCKING) {
            let now = start;
            let slice = now;
            let delta = 0;
            let c = 0;
            if (timingMethod === TIMING_METHODS.FIXED) {
                let ticks = 0;
                while (!this[_stopSignal] && (ticks++ <= granularity)) {
                    this.tick();
                }
            } else {
                while (!this[_stopSignal]) {
                    this.tick();
                    if (c++ >= granularity) {
                        c = 0;
                        slice = now;
                        now = performance.now();
                        delta = now - slice;
                        if ((now + delta) >= (start + timeout)) {
                            break;
                        }
                    }
                }
            }
        } else {
            while (!this[_stopSignal]) {
                this.tick();
            }
        }
        if (this[_stopSignal]) {
            this.stop();
        }
        const end = performance.now();
        const totalTime = end - start;
        this.stats.timeThisSlice = totalTime;
        this.stats.time += totalTime;
        this._updateStatsAfterSlice();
        if (this._stats) this._stats.end();
        return totalTime;             // used for next slice timing
    }

    /**
     * Run the computer indefinitely using the configured timing method.
     */
    run() {
        const {timingMethod, sliceTime} = this._options;

        if (this.running) this.stop();

        switch (timingMethod) {
            case TIMING_METHODS.TIMEOUT: {
                this[_runID] = setTimeout((function slice() {
                    const timeTaken = this.runSlice();
                    if (this.running) {
                        this[_runID] = setTimeout(slice.bind(this), sliceTime - timeTaken);
                    }
                }).bind(this), 0 );     // may as well start as soon as possible
                break;
            }
            case TIMING_METHODS.FIXED:
            case TIMING_METHODS.RAF: {
                this[_runID] = requestAnimationFrame((function slice() {
                    const timeTaken = this.runSlice();
                    if (this.running) {
                        this[_runID] = requestAnimationFrame(slice.bind(this));
                    }
                }).bind(this));
                break;
            }
            case TIMING_METHODS.BLOCKING: {
                this[_runID] = 1; // convince this.running we're really running
                this.runSlice();
                break;
            }
            case TIMING_METHODS.INTERVAL:
            default: {
                this[_runID] = setInterval(() => {
                    this.runSlice();
                }, sliceTime + 1); // give it time to breathe
            }
        }
    }
    stop() {
        const {timingMethod} = this._options;
        this[_stopSignal] = true;        // stop any running slice
        if (this[_runID]) {
            switch (timingMethod) {
                case TIMING_METHODS.BLOCKING:
                    break;
                case TIMING_METHODS.TIMEOUT: {
                    clearTimeout(this[_runID]);
                    break;
                }
                case TIMING_METHODS.FIXED:
                case TIMING_METHODS.RAF: {
                    cancelAnimationFrame(this[_runID]);
                    break;
                }
                case TIMING_METHODS.INTERVAL:
                default: {
                    clearInterval(this[_runID]);
                }
            }
        }
        this[_runID] = null;
    }
    get running() {
        return this[_runID] !== null;
    }

    get stepping() {
        return this.processor.registers.SINGLE_STEP;
    }

    get options() {
        return this._options;
    }

    set options(options) {
        const running = this.running;
        this.stop();
        this._options = options;
        if (running) {
            this.run();
        }
    }

    _updateStatsAfterSlice() {
        this.stats.ticksLastSlice = this.stats.ticksThisSlice;
        this.stats.ticks += this.stats.ticksThisSlice;
        this.stats.ticksThisSlice = 0;
        this.stats.timeSinceLastSecond += this.stats.timeThisSlice;
        
        // update processor stats
        for (let [k, v] of Object.entries(this.processor.stats)) {
            this.stats.processorStats[k] += v;
            this.stats.processorStatsThisSecond[k] += v;
        }
        this.stats.processorStatsLastSlice = { ... this.processor.stats };

        // update alu stats
        for (let [k, v] of Object.entries(this.processor.alu.stats)) {
            this.stats.aluStats[k] += v;
            this.stats.aluStatsThisSecond[k] += v;
        }
        this.stats.aluStatsLastSlice = { ... this.processor.alu.stats };

        if (this.stats.timeSinceLastSecond >= 1000) {
            this.stats.processorStatsLastSecond = { ... this.stats.processorStatsThisSecond };
            for (let [k, v] of Object.entries(this.processor.stats)) {
                this.stats.processorStatsThisSecond[k] = 0;
            }
            this.stats.aluStatsLastSecond = { ... this.stats.aluStatsThisSecond };
            for (let [k, v] of Object.entries(this.processor.alu.stats)) {
                this.stats.aluStatsThisSecond[k] = 0;
            }
            this.stats.timeSinceLastSecond -= 1000;
        }

        this.processor.resetStats();
        this.processor.alu.resetStats();
    }
}