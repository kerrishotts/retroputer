import { Computer, TIMING_METHODS } from "./Computer.js";
import { mapTask } from "../isa/tasks.js";

export const toHex = (n, padding=4) => n.toString(16).padStart(padding, "0").toUpperCase();
export const toHex2 = n => toHex(n, 2);
export const toHex4 = n => toHex(n, 4);
export const toHex5 = n => toHex(n, 5);
export const toHex8 = n => toHex(n, 8);

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

    dumpInstructionCache() {
        return this.computer.processor.internalState.cache;
    }

    dumpTaskQueue({mapped = false} = {}) {
        return this.computer.processor.internalState.tasks.map(([pc, task]) => [pc, mapped ? mapTask(task) : task]);
    }

    dumpTaskStack() {
        return this.computer.processor.internalState.stack;
    }

}