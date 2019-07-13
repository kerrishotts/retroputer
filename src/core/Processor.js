import { ALU } from "./ALU.js";
import { Memory } from "./Memory.js";
import { Bus } from "./Bus.js";
import { SystemBus } from "./SystemBus.js";
import { IOBus } from "./IOBus.js";
import { RegisterFile } from "./RegisterFile.js";
import { decodeInstruction } from "../isa/decodeInstruction.js";
import { executeTask } from "../isa/tasks.js";
import { decode } from "punycode";

const _alu = Symbol("_alu");
const _registerFile = Symbol("_registerFile");

const _memory = Symbol("_memory");
const _systemBus = Symbol("_systemBus");
const _ioBus = Symbol("_ioBus");
const _clock = Symbol("_clock");

const _taskQueue = Symbol("_taskQueue");
const _stack = Symbol("_stack");
const _cache = Symbol("_cache")

const MAX_CACHE = 256;
const MAX_TASKS = 256;

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
        this[_registerFile].MM = 0b0000110001000001; // banks 1, 2, 3

        this[_memory] = memory;
        this[_systemBus] = systemBus;
        this[_systemBus].map = this[_registerFile].MM;
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

    get internalState() {
        return {
            pc: this.registers.PC,
            mp: this.registers.MP,
            cache: this[_cache],
            stack: this[_stack],
            tasks: this[_taskQueue]
        };
    }

    /**
     * Injects bytes into the fetch cache
     *
     * @param {Array} bytes bytes to inject
     * @returns {void}
     * @memberof Processor
     */
    inject(addr, bytes) {
        this[_cache].push(...bytes.map((byte, idx) => [addr+idx, byte]));
    }

    _fetch() {
        const byte = this.memory.readByte(this.registers.MP);
        if (byte === undefined) {
            throw new Error("Bad memory");
        }
        this.inject(this.registers.MP, [byte]);
        this.registers.MP += 1;
    }

    _decode() {
        let pc = this[_cache][0] && this[_cache][0][0];
        const bytes = this[_cache].map(([_, byte]) => byte);
        const preDecodeLength = bytes.length;
        const tasks = decodeInstruction(bytes);
        if (tasks) {
            const postDecodeLength = bytes.length;
            const decodedInstructionLength = preDecodeLength - postDecodeLength;

            // remove the decoded instruction from the cache
            this[_cache] = this[_cache].slice(decodedInstructionLength);
            pc += decodedInstructionLength;
            pc &= 0xFFFF;
            // add the tasks to the queue, with associated PC
            this[_taskQueue].push(...tasks.map(task => [pc, task]));
            return;
        } else {
            if (this[_cache].length > 4) {
                // failed to decode what was in the cache, and it's
                // long enough to have done so
                throw new Error(`Couldn't properly decode cache: ${this[_cache]}`);
            }
        }
    }

    _execute() {
        if (this[_taskQueue].length > 0) {
            const [pc, task] = this[_taskQueue].shift();
            // make sure PC is set to the address of the instruction
            // we're executing
            this.registers.PC = pc;
            // also, assert MM on the system bus in case it's changed
            this[_systemBus].map = this[_registerFile].MM;
            if (task !== undefined) {
                executeTask(task, {
                    stack: this[_stack],
                    registerFile: this[_registerFile],
                    alu: this[_alu],
                    memory: this[_memory],
                    ioBus: this[_ioBus]
                });
            }
            if (this.registers.PC !== pc) {
                // we've jumped -- clear the cache and task queue
                // and start fetching from the new location
                this[_stack] = [];
                this[_cache] = [];
                this[_taskQueue] = [];
                this.registers.MP = this.registers.PC;
            }

        }
    }

    tick() {
        // we'll fetch up to 256 instructions / tasks
        if (this[_cache].length < MAX_CACHE && this[_taskQueue].length < MAX_TASKS) {
            this._fetch();
        }

        if (this[_cache].length > 0 && this[_taskQueue].length < MAX_TASKS) {
            this._decode();
        }

        // if there's something in the queue, execute it :-)
        if (this[_taskQueue].length > 0) {
            this._execute();
        }
    }
}