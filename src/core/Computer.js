import { Memory } from "../core/Memory.js";
import { SystemBus } from "../core/SystemBus.js";
import { Bus } from "../core/Bus.js";
import { IOBus } from "../core/IOBus.js";
import { Processor } from "../core/Processor.js";
import { Controller } from "../core/Controller.js";

export const TIMING_METHODS = {
    AUTO: 0,
    INTERVAL: 1,
    TIMEOUT: 2,
    RAF: 3,
    BLOCKING: 4
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
    constructor({ performance, debug = false, sliceTime = 16, sliceGranularity = 0xFFF, timingMethod = TIMING_METHODS.AUTO} = {}) {

        const clock = new Bus(1, 0b1);
        const systemBus = new SystemBus();
        const memory = new Memory({ systemBus });
        const ioBus = new IOBus();
        const debugLine = debug ? new Bus(1, 0b1) : null;
        const processor = new Processor({ memory, systemBus, ioBus, clock, debug: debugLine });
        const controller = new Controller({processor: processor, ioBus, clock});

        this.stats = {
            time: 0,
            ticks: 0,
            slices: 0
        };

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

        this.options = {
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

    /**
     * Step the computer by sending a tick.
     *
     * NOTE: This is **not** the same as single-stepping an instruction. An instruction
     * may in fact require multiple
     */
    tick() {
        this.stats.ticks++;
        this.clock.signal();
    }

    /**
     * Attempt to step the computer by a single instruction
     * This can only be done if the computer has been initialized in debug mode
     * If it hasn't been, we'll do the same thing as a clock signal (task step)
     */
    step() {
        if (this.debug) {
            this.processor.registers.SINGLE_STEP = 1;
            this.runSlice();
            this._stopSignal = false;
        } else {
            this.tick();  // without the debug signal, we can't effectively single step
        }
    }

    /**
     * Run the computer in slice mode until the desired timeout has been passed
     * If the computer is in debug mode, a BRK instruction will trigger single-step mode
     * and stop execution early. If the computer is already in single step mode,
     * only a single instruction will execute
     */
    runSlice() {
        const { sliceTime: timeout, sliceGranularity: granularity, performance, timingMethod} = this.options;
        this[_stopSignal] = false;       // clear any stop signal for this slice
        this.stats.slices++;
        const start = performance.now();
        if (timeout > 0 && timingMethod !== TIMING_METHODS.BLOCKING) {
            let now = start;
            let c = 0;
            while (!this[_stopSignal]) {
                this.tick();
                if ((c = ((c + 1) & granularity)) === 0) {
                    now = performance.now();
                    if (now >= (start + timeout)) {
                        break;
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
        this.stats.time += totalTime;
        return totalTime;             // used for next slice timing
    }

    /**
     * Run the computer indefinitely using the configured timing method.
     */
    run() {
        const {timingMethod, sliceTime} = this.options;

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
        const {timingMethod} = this.options;
        this[_stopSignal] = true;        // stop any running slice
        if (this[_runID]) {
            switch (timingMethod) {
                case TIMING_METHODS.TIMEOUT: {
                    clearTimeout(this[_runID]);
                    break;
                }
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
}