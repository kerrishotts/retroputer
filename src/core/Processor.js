import { ALU } from "./ALU.js";
import { Memory } from "./Memory.js";
import { Bus } from "./Bus.js";
import { SystemBus } from "./SystemBus.js";
import { IOBus } from "./IOBus.js";
import { Controller } from "./Controller.js";
import { RegisterFile } from "./RegisterFile.js";
import { decodeInstruction, necessaryBytesForInstruction } from "../isa/decodeInstruction.js";
import { executeTask } from "../isa/tasks.js";

const _alu = Symbol("_alu");
const _registerFile = Symbol("_registerFile");

const _controller = Symbol("_controller");
const _memory = Symbol("_memory");
const _systemBus = Symbol("_systemBus");
const _ioBus = Symbol("_ioBus");
const _clock = Symbol("_clock");
const _debug = Symbol("_debug");

const _taskQueue = Symbol("_taskQueue");
const _stack = Symbol("_stack");
const _cache = Symbol("_cache")

const _pendingServiceRequest = Symbol("_pendingServiceRequest");

const MAX_CACHE = 32;
const MAX_TASKS = 256;

export class Processor {

    /**
     * @param {Object} config  options
     * @param {Memory} config.memory
     * @param {SystemBus} config.systemBus
     * @param {Controller} config.controller
     * @param {Bus} config.clock
     * @param {Bus} [config.debug=null]
     */
    constructor({memory, systemBus, ioBus, clock, debug = null} = {}) {
        this[_alu] = new ALU();
        this[_registerFile] = new RegisterFile();

        this[_memory] = memory;
        this[_systemBus] = systemBus;
        this[_systemBus].map = this[_registerFile].MM;
        this[_ioBus] = ioBus;
        this[_clock] = clock;
        this[_debug] = debug;

        this[_pendingServiceRequest] = -1;

        this[_stack] = []; //new Stack(8, 4);

        this[_taskQueue] = [];
        this[_cache] = [];

        this.tick = this.tick.bind(this);
        this.clock.addReceiver(this.tick);

        this.serviceDevices = this.serviceDevices.bind(this);
        ioBus.irqSignalBus.addReceiver(this.serviceDevices);

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

        this.reset();
    }

    reset() {
        this[_stack] = []; //new Stack(8, 4);
        this[_taskQueue] = [];
        this[_cache] = [];
        this[_pendingServiceRequest] = -1;
        this[_registerFile].PC = 0x0FF00;
        this[_registerFile].MP = 0x0FF00;
        this[_registerFile].BP = 0x02000;
        this[_registerFile].SP = 0x02000;
        this[_registerFile].MM = 0b0111110001000001; // page 3 = page 31, page 2 = page 2, page 1 = page 1
        this.registers.SINGLE_STEP = 0;
        this.registers.INTERRUPT_DISABLE = 1;
    }

    resetStats() {
        this.stats.ticks = 0;
        this.stats.insts = 0;
        this.stats.misses = 0;
        this.stats.decodes = 0;
        this.stats.reads = 0;
        this.stats.tasks = 0;
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
     * @type {Controller}
     * @readonly
     */
    get controller() { return this[_controller]; }

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
     * @param {Controller} controller 
     */
    registerController(controller) {
        this[_controller] = controller;
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
        cache.push(byte);
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
        const memory = this.memory;
        let mp = this.registers.MP;
        let bytes = [ memory.readByte(mp++) ];
        let nbfi = necessaryBytesForInstruction(bytes);

        while ( (nbfi < 0 || bytes.length < nbfi) && bytes.length < 5 ) {
            bytes.push(memory.readByte(mp++));
            nbfi = necessaryBytesForInstruction(bytes);
        }

        if (nbfi < 0) {
            // couldn't fetch a valid instruction. We'll try again
            // with the next byte
            mp = this.registers.MP + 1;
        }

        this[_cache] = bytes; 
        this.registers.PC = mp;
        this.registers.MP = mp;

/*
        const cache = this[_cache];
        if (cache.length < MAX_CACHE) {
            const byte = this.memory.readByte(this.registers.MP);
            this.inject(this.registers.MP, byte);
            this.registers.MP += 1;
        }
*/
    }

    _decode() {
        const cache = this[_cache];
        const {tasks} = decodeInstruction(cache);
        if (tasks) {
            this.stats.decodes++;
            this[_taskQueue] = tasks;
        } else {
            this[_taskQueue] = [];
        }

/*

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
*/
    }

    _execute() {
        const tasks = this[_taskQueue];
        let pc = this.registers.PC;
        let mp = this.registers.MP;
        let mm = this.registers.MM;
        let jump = false;

        // assert MM on the system bus in case it's changed
        this[_systemBus].map = this[_registerFile].MM;

        this.stats.insts++;

        for (let i = 0, l = tasks.length; i < l; i++) {
            this.stats.tasks++;
            executeTask(tasks[i], this._context);
        }

        if (this.registers.PC !== pc) {
            // JUMP!
            jump = true;
            this.stats.misses++;
            pc = this.registers.PC;
            mp = this.registers.PC;
        }

        if (this.debug) {
            // see if we've asserted the SINGLE STEP line
            // if so, we see if PC has changed
            // send a signal on the debug line when
            // we've encountered a BRK or are in single step
            // mode.
            if (this.registers.SINGLE_STEP) {
                this.debug.signal();
            }
        }

        this.registers.PC = pc;
        this.registers.MP = mp;
        this[_cache] = [];
        this[_taskQueue] = [];
/*

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
*/
    }

    serviceDevices() {
        const ioBus = this.ioBus;
        if (ioBus.irqServiceBus.value !== 0 && !this.registers.INTERRUPT_DISABLE) {
            const whichDevice = ioBus.irqSignalBus.value;
            if (this[_pendingServiceRequest] > -1 && this[_pendingServiceRequest] !== whichDevice) {
                throw new Error("Multiple services at the same time!");
            }
            this[_pendingServiceRequest] = whichDevice;
        }
    }

    _reallyServiceDevices() {
        const whichDevice = this[_pendingServiceRequest];
        if (whichDevice < 0) return;
        this[_pendingServiceRequest] = -1;

        const trapToTrigger = 0x80 | (whichDevice << 3);
        const trapVectorLookup = trapToTrigger << 1;
        const trapTarget = this.memory.readWord(trapVectorLookup);
        this.registers.STATUS = (this.registers.STATUS & 0x00FF) | (trapToTrigger << 8);
        this.jump(trapTarget, true);
        this.controller.ackInterrupt(whichDevice);

    }

    tick() {
        this.stats.ticks++;
        this._fetch();
        this._decode();
        this._execute();
        this._reallyServiceDevices();
    }
}