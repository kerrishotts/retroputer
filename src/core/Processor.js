import { ALU } from "./ALU.js";
import { Memory } from "./Memory.js";
import { Bus } from "./Bus.js";
import { SystemBus } from "./SystemBus.js";
import { IOBus } from "./IOBus.js";
import { RegisterFile } from "./RegisterFile.js";
import { decodeInstruction } from "../isa/decodeInstruction.js";
import { TASK_FNS } from "../isa/tasks.js";

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
        const byte = this.memory.readByte(this.registers.MP++);
        this.inject([byte]);
    }

    _decode() {
        for (let i = 1; i <= 4; i++) {
            const tasks = decodeInstruction(this[_cache].slice(0,i));
            if (tasks) {
                this[_cache] = this[_cache].slice(i+1);
                this.registers.PC += i;
                this[_taskQueue].push(...tasks);
            }
        }
    }

    _execute() {
        if (this[_taskQueue].length > 0) {
            const [task, operand] = this[_taskQueue].pop();
            TASK_FNS[task]({
                stack: this[_stack],
                registerFile: this.registers,
                alu: this.alu,
                memory: this.memory,
                args: [operand]
            });
        }
    }

    tick() {
        if (this[_cache].length < 256) {
            this._fetch();
        }

        if (this[_taskQueue].length > 0) {
            const curPC = this.registers.PC;
            this._execute();
            if (this.registers.PC !== curPC) {
                // we've jumped -- clear the cache
                // and start fetching from the new location
                this[_cache] = [];
                this.registers.MP = this.registers.PC;
            }
        }
    }
}