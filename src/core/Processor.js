import { ALU } from "./ALU.js";
import { Memory } from "./Memory.js";
import { Bus } from "./Bus.js";
import { SystemBus } from "./SystemBus.js";
import { IOBus } from "./IOBus.js";
import { RegisterFile } from "./RegisterFile.js";
import { decodeInstruction } from "../isa/decodeInstruction.js";
import { executeTask } from "../isa/tasks.js";

const _alu = Symbol("_alu");
const _registerFile = Symbol("_registerFile");

const _memory = Symbol("_memory");
const _systemBus = Symbol("_systemBus");
const _ioBus = Symbol("_ioBus");
const _clock = Symbol("_clock");
const _debug = Symbol("_debug");

const _taskQueue = Symbol("_taskQueue");
const _stack = Symbol("_stack");
const _cache = Symbol("_cache")

const MAX_CACHE = 32;
const MAX_TASKS = 256;

export class Processor {

    /**
     * @param {*} param0  options
     * @property {Memory} param0.memory
     * @property {SystemBus} param0.systemBus
     * @property {IOBus} param0.ioBus
     * @property {Bus} param0.clock
     * @property {Bus} [param0.debug=null]
     */
    constructor({memory, systemBus, ioBus, clock, debug = null} = {}) {
        this[_alu] = new ALU();
        this[_registerFile] = new RegisterFile();
        this[_registerFile].MM = 0b0000110001000001; // banks 1, 2, 3

        this[_memory] = memory;
        this[_systemBus] = systemBus;
        this[_systemBus].map = this[_registerFile].MM;
        this[_ioBus] = ioBus;
        this[_clock] = clock;
        this[_debug] = debug;

        this[_stack] = []; //new Stack(8, 4);

        this[_taskQueue] = [];
        this[_cache] = [];

        this.tick = this.tick.bind(this);
        this.clock.addReceiver(this.tick);

        this.stats = {
            ticks: 0,
            insts: 0,
            misses: 0,
            decodes: 0,
            reads: 0,
            tasks: 0
        };

        this._context = {
            stack: this[_stack],
            registerFile: this[_registerFile],
            alu: this[_alu],
            memory: this[_memory],
            ioBus: this[_ioBus]
        };

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
     * @type {Bus}
     * @readonly
     * @memoberOf Processor
     */
    get debug() { return this[_debug]; }

    get internalState() {
        return {
            pc: this.registers.PC,
            mp: this.registers.MP,
            cache: this[_cache],
            stack: this[_stack],
            tasks: this[_taskQueue],
            stats: this.stats
        };
    }

    /**
     * Injects bytes into the fetch cache
     *
     * @param {number} byte byte to inject
     * @returns {void}
     * @memberof Processor
     */
    inject(addr, byte) {
        const cache = this[_cache];
        cache.push(addr, byte);
        this.stats.reads++;
    }

    /**
     * Forces a jump to the specified address
     * @param {number} addr the address to jump to
     * @param {boolean} [call=false] if true, acts as a call
     */
    jump(addr, call = false) {
        // throw away the prefetch and task queue
        this[_cache] = [];
        this[_taskQueue] = [];

        this.stats.misses++;

        // if it's a call, simulate the push
        if (call) {
            this.registers.SP -= 2;
            this.memory.writeWord(this.registers.SP, this.registers.PC);
        }

        // set the address
        this.registers.PC = addr;
        this.registers.MP = addr;
    }

    _fetch() {
        const cache = this[_cache];
        if (cache.length < MAX_CACHE) {
            const byte = this.memory.readByte(this.registers.MP);
            this.inject(this.registers.MP, byte);
            this.registers.MP += 1;
        }
    }

    _decode() {
        const cache = this[_cache];
        const taskQueue = this[_taskQueue];
        if (cache.length > 0 && taskQueue.length < MAX_TASKS) {
            let pc = cache[0];
            const bytes = Array(cache.length >> 1);
            for (let i = 1, l = cache.length; i < l; i+=2 ) {
                bytes[i >> 1] = cache[i]; // we want the byte, not its PC
            }
            const {size, tasks} = decodeInstruction(bytes);
            if (tasks) {
                this.stats.decodes++;
                // remove the decoded instruction from the cache
                //cache.splice(0, size << 1);
                this[_cache] = cache.slice(size << 1);
                pc += size;
                pc &= 0xFFFF;
                // add the tasks to the queue, with associated PC
                for (let i = 0, l = tasks.length; i < l; i++) {
                    taskQueue.push(pc, tasks[i]);
                }
                return;
            } else {
                if (cache.length > 8) {
                    // failed to decode what was in the cache, and it's
                    // long enough to have done so
                    this[_cache] = cache.slice(8);
                    //throw new Error(`Couldn't properly decode cache: ${this[_cache]}`);
                }
            }
        }
    }

    _execute() {
        let taskQueueLength = this[_taskQueue].length;
        let i = 0;
        while (taskQueueLength > 0) {
            // next task
            const pc = this[_taskQueue][i++];
            const task = this[_taskQueue][i++];
            //this[_taskQueue] = this[_taskQueue].slice(2);
            taskQueueLength -= 2;

            if (this[_taskQueue][i] !== pc) { this.stats.insts++; }

            // make sure PC is set to the address of the instruction
            // we're executing
            this.registers.PC = pc;

            // also, assert MM on the system bus in case it's changed
            this[_systemBus].map = this[_registerFile].MM;

            // execute the task
            this.stats.tasks++;
            executeTask(task, this._context);

            if (this.registers.PC !== pc) {
                // we've jumped -- clear the cache and task queue
                // and start fetching from the new location
                this.stats.misses++;
                this[_cache] = [];
                this[_taskQueue] = [];
                taskQueueLength = 0;
                i = 0;
                this.registers.MP = this.registers.PC;
            }

            if (this.debug) {
                // see if we've asserted the SINGLE STEP line
                // if so, we see if PC has changed
                // send a signal on the debug line when
                // we've encountered a BRK or are in single step
                // mode.
                if (this.registers.SINGLE_STEP) {
                    let instructionOver = false;
                    if (this.registers.PC !== pc) { instructionOver = true; }
                    if (taskQueueLength > 0) {
                        // next instruction has a different PC
                        if (this[_taskQueue][i] !== pc) { instructionOver = true; }
                    } else {
                        instructionOver = true;
                    }
                    if (instructionOver) {
                        this.debug.signal();
                    }
                }
            }
        }
        this[_taskQueue] = [];
    }

    tick() {
        this.stats.ticks++;
        this._execute();
        this._decode();
        this._fetch();
    }
}