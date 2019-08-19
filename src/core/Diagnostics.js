import { Computer, TIMING_METHODS } from "./Computer.js";
import { mapTask, TASKS } from "../isa/tasks.js";
import { disassembleAll } from "../basm/disassemble.js";

/* Utility methods that are common for rendering statistics and diagnostics */
export const toHex = (n, padding=4) => n.toString(16).padStart(padding, "0").toUpperCase();
export const toHex2 = n => toHex(n, 2);
export const toHex4 = n => toHex(n, 4);
export const toHex5 = n => toHex(n, 5);
export const toHex8 = n => toHex(n, 8);

export const round = (n, places = 0) => {
    const multiplier = 10 ** places;
    const v = Math.round(n * multiplier) / multiplier;
    return v;
}

export const numToString = (n, { padWhole = 0, padDecimal = 2, padSign = 0 } = {}) => {
    const [ whole, decimal ] = Math.abs(n).toString().split(".");
    const neg = n < 0;
    return `${(neg ? "-" : "").padStart(padSign)}${whole.padStart(padWhole, "0")}${padDecimal ? "." : ""}${(decimal || "").padEnd(padDecimal, "0")}`;
}

export const STATE = {
    PAUSED: "paused",
    RUNNING: "running",
    STEPPING: "stepping"
};

export class Diagnostics {
    /**
     * @param {Computer} computer
     */
    constructor(computer) {
        this.computer = computer;
    }

    get state() {
        let curState = STATE.PAUSED;
        if (this.computer.running) {
            curState = STATE.RUNNING;
        }
        if (this.computer.stepping && this.computer.debug) {
            curState = STATE.STEPPING;
        }
        return curState;
    }

    dumpRegisters() {
        return [
            this.computer.processor.registers.A,
            this.computer.processor.registers.B,
            this.computer.processor.registers.C,
            this.computer.processor.registers.D,
            this.computer.processor.registers.X,
            this.computer.processor.registers.Y,
            this.computer.processor.registers.BP,
            this.computer.processor.registers.SP,
            this.computer.processor.registers.STATUS,
            this.computer.processor.registers.PC,
            this.computer.processor.registers.MP,
            this.computer.processor.registers.MM
        ];
    }

    dumpMemory({start = 0, length = 256, width = 16} = {}) {
        const numRows = Math.ceil(length / width);
        const numCols = width;
        return Array.from({length: numRows}, (_, row) => [
            ...Array.from({length: numCols}, (_, col) => this.computer.memory.readByte(start + ((row * width) + col)))
        ]);
    }

    disassembleMemory({start = 0, length = 16} = {}) {
        return disassembleAll(Array.from({length}, (_, idx) => this.computer.memory.readByte(start + idx)), {addr: start});
    }

    dumpInstructionCache() {
        return this.computer.processor.internalState.cache;
    }

    dumpTaskQueue({mapped = false} = {}) {
        //return this.computer.processor.internalState.tasks.map(([pc, task]) => [pc, mapped ? mapTask(task) : task]);
        return this.computer.processor.internalState.tasks.reduce((acc, cur, idx) => {
            const which = idx % 2; // if which is 0, processing PC. Otherwise task.
            if (which === 0) {
                acc.push([cur, undefined]);
            } else {
                const last = acc.pop();
                last[1] = mapped ? mapTask(cur) : cur;
                acc.push(last)
            }
            return acc;
        }, []);
    }

    dumpTaskStack() {
        return this.computer.processor.internalState.stack;
    }

    dumpStatistics() {
        return {
            ticks: numToString(this.computer.processor.stats.ticks, {padDecimal: 0}),
            tasks: numToString(this.computer.processor.stats.tasks, {padDecimal: 0}),
            insts: numToString(this.computer.processor.stats.insts, {padDecimal: 0}),
            aluOps: numToString(this.computer.processor.alu.stats.ops, {padDecimal: 0}),
            slices: numToString(this.computer.stats.slices, {padDecimal: 0}),
            microOpsPerSlice: numToString(round(this.computer.stats.slices !== 0 ? (this.computer.processor.stats.tasks / this.computer.stats.slices) : 0, 2)),
            instsPerSlice: numToString(round(this.computer.stats.slices !== 0 ? (this.computer.processor.stats.insts / this.computer.stats.slices) : 0, 2)),
            totalTime: numToString(round(this.computer.stats.time, 2)),
            MMOPs: numToString(round(this.computer.stats.time !== 0 ? ((this.computer.processor.stats.tasks / this.computer.stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
            MIPs: numToString(round(this.computer.stats.time !== 0 ? ((this.computer.processor.stats.insts / this.computer.stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
            MAOPs: numToString(round(this.computer.stats.time !== 0 ? ((this.computer.processor.alu.stats.ops / this.computer.stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
            microOpsPerInst: numToString(round(this.computer.processor.stats.insts !== 0 ? ((this.computer.processor.stats.tasks / this.computer.processor.stats.insts)) : 0, 4), {padDecimal: 4}),
        };
    }

    resetStatistics() {
        this.computer.stats.slices = 0;
        this.computer.stats.time = 0;
        this.computer.processor.stats.ticks = 0;
        this.computer.processor.stats.tasks = 0;
        this.computer.processor.stats.insts = 0;
        this.computer.processor.alu.stats.ops = 0;
    }

}