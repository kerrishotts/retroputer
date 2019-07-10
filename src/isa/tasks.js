import { REGISTER_INDEX, FLAGS_INDEX, RegisterFile } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import { ALU, COMMANDS, SIZES } from "../core/ALU.js";
import { IOBus } from "../core/IOBus.js";

export const SIZE_BYTE = SIZES.BYTE;
export const SIZE_WORD = SIZES.WORD;
export const SIZE_ADDR = SIZES.ADDR;

// stack sizes are stored in the top 2 bits
export const STACK_BYTE = 0x00000000;
export const STACK_WORD = 0x40000000;
export const STACK_ADDR = 0x80000000;
export const STACK_TYPE_MASK = 0xC0000000;
export const STACK_DATA_MASK = 0x3FFFFFFF;

/**
 * @param {Array<Number>} stack
 * @param {number} data
 * @param {number} size
 */
const push = (stack, data, size) => {
    const newSize = size === SIZE_BYTE ? STACK_BYTE
        : size === SIZE_WORD ? STACK_WORD
            : STACK_ADDR;
    return stack.push(newSize | data);
};

/**
 * @param {Array<number>} stack
 * @param {boolean} [withSize = false]
 * @returns {number|Array<number>}
 */
const pop = (stack, withSize = false) => {
    const s0 = stack.pop();
    const data = s0 & STACK_DATA_MASK;
    if (withSize) {
        const stackSize = s0 & STACK_TYPE_MASK;
        const size = stackSize === STACK_BYTE ? SIZE_BYTE
            : stackSize === STACK_WORD ? SIZE_WORD
                : SIZE_ADDR;
        return [data, size];
    } else {
        return data;
    }
};


// tasks comprise an opcode in the top 8 bits
// and oeprands in the lower 24 bits.
export const TASK_OPCODE_MASK = 0xFF000000;
export const TASK_OPERAND_MASK = 0x00FFFFFF;

export const opcodeFromTask = task => {
    let opcode = task & TASK_OPCODE_MASK;
    if (opcode < 0) opcode += 0x100000000;
    return opcode;
}
export const operandFromTask = task => task & TASK_OPERAND_MASK;
/**
 * @type {Object.<string, number>}
 *
 * Tasks are a 32 bit wide number consisting of an opcode in the
 * top eight bits and an optional argument in the lower 24 bits.
 */
export const TASKS = {
    NOP: 0x00000000,
    // get and push
    GET_REGISTER_AND_PUSH: 0x01000000,        // r -> s0
    POP_INTO_REGISTER: 0x02000000,        // r <- s0
    PUSH_BYTE: 0x03000000,        // b -> s0
    PUSH_WORD: 0x04000000,        // w -> s0
    PUSH_ADDR: 0x05000000,        // a -> s0
    GET_BYTE_FROM_MEMORY: 0x06000000,        // [s0] -> s0
    GET_WORD_FROM_MEMORY: 0x07000000,        // [s0] -> s0
    POP_BYTE_INTO_MEMORY: 0x08000000,        // [s0] <- s1
    POP_WORD_INTO_MEMORY: 0x09000000,        // [s0] <- s1

    // decompose and recompose
    DECOMPOSE_WORD_TO_BYTES: 0x10000000,      // s0 -> [s0, s1]
    RECOMPOSE_BYTES_TO_WORD: 0x11000000,      // [s0, s1] -> s0
    DECOMPOSE_BYTE_TO_NIBBLE: 0x12000000,     // s0 -> [s0, s1]
    RECOMPOSE_NIBBLE_TO_BYTE: 0x13000000,     // [s0, s1] -> s0

    // bit twiddling
    SET_BIT: 0x20000000,
    CLEAR_BIT: 0x21000000,

    // decisions
    PICK: 0x30000000,

    // commands
    TRAP: 0x40000000,
    DUP: 0x50000000,
    SWAP: 0x51000000,

    // arithmetic
    ADD: 0x80000000,        // [s0, s1] -> s0 + s1
    ADD_WITH_FLAGS: 0x81000000,
    SUB: 0x82000000,
    SUB_WITH_FLAGS: 0x83000000,
    CMP: 0x84000000,
    CMP_WITH_FLAGS: 0x85000000,
    AND: 0x86000000,
    AND_WITH_FLAGS: 0x87000000,
    OR: 0x88000000,
    OR_WITH_FLAGS: 0x89000000,
    TEST: 0x8A000000,
    TEST_WITH_FLAGS: 0x8B000000,
    XOR: 0x8C000000,
    XOR_WITH_FLAGS: 0x8D000000,
    SHL: 0x90000000,
    SHL_WITH_FLAGS: 0x91000000,
    SHR: 0x92000000,
    SHR_WITH_FLAGS: 0x93000000,
    MUL: 0xA0000000,
    MUL_WITH_FLAGS: 0xA1000000,
    DIV: 0xA2000000,
    DIV_WITH_FLAGS: 0xA3000000,
    MOD: 0xA4000000,
    MOD_WITH_FLAGS: 0xA5000000,
    SMUL: 0xB0000000,
    SMUL_WITH_FLAGS: 0xB1000000,
    SDIV: 0xB2000000,
    SDIV_WITH_FLAGS: 0xB3000000,
    SMOD: 0xB4000000,
    SMOD_WITH_FLAGS: 0xB5000000,
};
/**
 * @typedef {Number} Task
 * @name Task
 */

/**
 * @typedef {Array.<number>} StackItem
 * @name StackItem
 */

/**
 * @typedef {StackItem[]} Stack
 * @name Stack
 */

/**
 * @typedef {Function} TASK_FN({stack: Stack, registerFile: RegisterFile, alu: ALU, memory: Memory, args: Array})
 * @name TASK_FN
 */

/**
 * @type {Object.<Number, TASK_FN>}
 */
export const TASK_FNS = new Map([
    [TASKS.NOP, () => { }],
    [TASKS.GET_REGISTER_AND_PUSH, ({ stack, registerFile, arg }) => {
        const rIdx = arg;
        push(stack, registerFile.getRegister(rIdx), registerFile.getSizeOfRegister(rIdx));
    }],
    [TASKS.POP_INTO_REGISTER, ({ stack, registerFile, arg }) => {
        registerFile.setRegister(arg, pop(stack));
    }],
    [TASKS.PUSH_BYTE, ({ stack, arg }) => {
        push(stack, arg, SIZE_BYTE);
    }],
    [TASKS.PUSH_WORD, ({ stack, arg }) => {
        push(stack, arg, SIZE_WORD);
    }],
    [TASKS.PUSH_ADDR, ({ stack, arg }) => {
        push(stack, arg, SIZE_ADDR);
    }],
    [TASKS.GET_BYTE_FROM_MEMORY, ({ stack, memory }) => {
        push(stack, memory.readByte(pop(stack)), SIZE_BYTE);
    }],
    [TASKS.GET_WORD_FROM_MEMORY, ({ stack, memory }) => {
        push(stack, memory.readWord(pop(stack)), SIZE_WORD);
    }],
    [TASKS.POP_BYTE_INTO_MEMORY, ({ stack, memory }) => {
        const byte = pop(stack);     // s0
        const addr = pop(stack);     // s1
        memory.writeByte(addr, byte);
    }],
    [TASKS.POP_WORD_INTO_MEMORY, ({ stack, memory }) => {
        const word = pop(stack);     // s0
        const addr = pop(stack);     // s1
        memory.writeWord(addr, word);
    }],
    [TASKS.DECOMPOSE_WORD_TO_BYTES, ({ stack }) => {
        const word = pop(stack);     // s0
        push(stack, (word & 0xFF00) >> 8, SIZE_BYTE);            // a = hi
        push(stack, (word & 0x00FF), SIZE_BYTE);                 // b = lo
    }],
    [TASKS.RECOMPOSE_BYTES_TO_WORD, ({ stack }) => {
        const s0 = pop(stack);                                    // b = lo
        const s1 = pop(stack);                                    // a = hi
        push(stack, (s1 << 8) | s0, SIZE_WORD);
    }],
    [TASKS.DECOMPOSE_BYTE_TO_NIBBLE, ({ stack }) => {
        const byte = pop(stack);                                  // s0
        push(stack, (byte & 0xF0) >> 4, SIZE_BYTE);              // a = hi
        push(stack, (byte & 0x0F), SIZE_BYTE);                   // b = lo
    }],
    [TASKS.RECOMPOSE_NIBBLE_TO_BYTE, ({ stack }) => {
        const s0 = pop(stack);                                    // b = lo
        const s1 = pop(stack);                                    // a = hi
        push(stack, (s1 << 4) | s0, SIZE_BYTE);
    }],
    [TASKS.TRAP, ({ stack, ioBus }) => {
        // TODO
    }],
    [TASKS.DUP, ({ stack }) => {
        const s0 = stack.pop();   // use pop() to preserve type info
        stack.push(s0, s0);
    }],
    [TASKS.SWAP, ({ stack, registerFile }) => {
        const s0 = stack.pop();
        const s1 = stack.pop();
        stack.push(s0, s1);
    }],
    [TASKS.SET_BIT, ({ stack, arg }) => {
        const bit = 0b1 << arg;
        stack.push(stack.pop() | bit); // technically lets us set the upper bits, bot oh well
    }],
    [TASKS.CLEAR_BIT, ({ stack, arg }) => {
        const bit = (0b1 << arg) ^ 0xFFFFFFFF;
        stack.push(stack.pop() & bit);
    }],
    [TASKS.PICK, ({ stack, arg }) => {
        const s0 = pop(stack);
        const s1 = stack.pop();
        const s2 = stack.pop();
        if (s0 !== 0) {
            stack.push(s2);
        } else {
            stack.push(s1);
        }
    }]
]);

Object.entries(TASKS).forEach(([k, v]) => {
    if (v >= 0x80000000) {
        let eatReturn = false;
        // this is an ALU op
        if (k.startsWith("CMP")) {
            k = k.replace("CMP", "SUB")
            eatReturn = true;
        }
        const withFlags = v & 0x01000000;
        const op = k.split("_")[0];
        const command = COMMANDS[op];
        TASK_FNS.set(v, (function (command, eatReturn, { stack, alu, registerFile }) {
            const [s0, sz0] = pop(stack, true);                   // s1, op2, b
            const [s1, sz1] = pop(stack, true);                   // s0, op1, a
            const retSize = Math.max(sz0, sz1);
            alu.op1Bus.data = s1;
            alu.op2Bus.data = s0;
            // set the flags ONLY if this is a WITH_FLAGS operation
            alu.flagsBus.data = (withFlags === 0)
                ? 0
                : (registerFile.NEGATIVE << 3) | (registerFile.CARRY << 2) | (registerFile.OVERFLOW << 1) | (registerFile.ZERO);
            alu.commandBus.data = (retSize << 8) | (sz0 << 6) | (sz1 << 4) | command;
            alu.executeBus.signal();
            if (!eatReturn) push(stack, alu.retBus.data, retSize);
            if (withFlags) {
                // pull back the flags
                registerFile.NEGATIVE = (alu.flagsBus.data & 0b1000) >> 3;
                registerFile.CARRY = (alu.flagsBus.data & 0b0100) >> 2;
                registerFile.OVERFLOW = (alu.flagsBus.data & 0b0010) >> 1;
                registerFile.ZERO = (alu.flagsBus.data & 0b0001);
            }
        }).bind(undefined, command, eatReturn));
    }
});

const taskToHex = n => n.toString(16).padStart(8, "0");

const TASK_MAP = new Map(Object.entries(TASKS).map(([k, v]) => [v, k]));

export const mapTask = task => {
    const opcode = opcodeFromTask(task);
    const operand = operandFromTask(task);
    const opcodeName = TASK_MAP.get(opcode);
    return `${taskToHex(task)} => ${taskToHex(opcode)}(${opcodeName}) ${taskToHex(operand)}`;
}

export const executeTask = (task, { stack, alu, registerFile, ioBus, memory }) => {
    const opcode = opcodeFromTask(task);
    const operand = operandFromTask(task);
    if (TASK_FNS.has(opcode)) {
        const fn = TASK_FNS.get(opcode);
        const arg = operand;
        fn({ arg, stack, alu, registerFile, ioBus, memory });
    } else {
        throw new Error(`Could not execute task ${mapTask(task)}`);
    }
};