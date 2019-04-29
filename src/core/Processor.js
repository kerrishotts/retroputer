import { ALU } from "./ALU.js";
import { Memory } from "./Memory.js";
import { Bus } from "./Bus.js";
import { SystemBus } from "./SystemBus.js";
import { IOBus } from "./IOBus.js";
import { RegisterFile } from "./RegisterFile.js";
import { isDecodeableInstruction } from "../isa/isDecodeableInstruction.js";

const _alu = Symbol("_alu");
const _registerFile = Symbol("_registerFile");

const _memory = Symbol("_memory");
const _systemBus = Symbol("_systemBus");
const _ioBus = Symbol("_ioBus");
const _clock = Symbol("_clock");

const _taskQueue = Symbol("_taskQueue");
const _stack = Symbol("_stack");
const _cache = Symbol("_cache")


export class Processor {

    /**
     * @param {*} param0  options
     * @property {Memory} param0.memory
     * @property {SystemBus} param0.systemBus
     * @property {IOBus} param0.ioBus
     * @property {Bus} param0.clock
     */
    constructor({memory, systemBus, ioBus, clock} = {}) {
        this[_alu] = new ALU();
        this[_registerFile] = new RegisterFile();

        this[_memory] = memory;
        this[_systemBus] = systemBus;
        this[_ioBus] = ioBus;
        this[_clock] = clock;

        this[_taskQueue] = [];
        this[_stack] = [];
        this[_cache] = [];

        this.tick = this.tick.bind(this);
        this.clock.addReceiver(this.tick);
    }

    /**
     * @type {ALU}
     * @readonly
     * @memberof Processor
     */
    get alu() { return this[_alu]; }

    /**
     * @type {RegisterFile}
     * @readonly
     * @memberof Processor
     */
    get registers() { return this[_registerFile]; }

    /**
     * @type {Memory}
     * @readonly
     * @memberof Processor
     */
    get memory() { return this[_memory]; }

    /**
     * @type {SystemBus}
     * @readonly
     * @memberof Processor
     */
    get systemBus() { return this[_systemBus]; }

    /**
     * @type {IOBus}
     * @readonly
     * @memberof Processor
     */
    get ioBus() { return this[_ioBus]; }

    /**
     * @type {Bus}
     * @readonly
     * @memberof Processor
     */
    get clock() { return this[_clock]; }

    /**
     * Injects bytes into the fetch cache
     *
     * @param {Array} bytes bytes to inject
     * @returns {void}
     * @memberof Processor
     */
    inject(bytes) {
        this[_cache].push(...bytes);
    }

    _fetch() {
        const byte = this.memory.readByte(this.registers.PC);
        this.inject([byte]);
    }

    _decode(instructionSize = 1) {
        const instruction = this[_cache].slice(0, instructionSize);
    }

    _execute() {

    }

    tick() {
        this._fetch();
        for (let i = 1; i <= 4; i++) {
            if (isDecodeableInstruction(this[_cache].slice(0, i))) {
                this._decode(i);
            }
        }
        if (this[_taskQueue].length > 0) {
            this._execute();
        }
    }
}