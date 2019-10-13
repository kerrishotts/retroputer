import { REGISTER_INDEX, FLAGS_INDEX, RegisterFile } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import { ALU, COMMANDS, SIZES } from "../core/ALU.js";
import { IOBus } from "../core/IOBus.js";

export const SIZE_BYTE = SIZES.BYTE;
export const SIZE_WORD = SIZES.WORD;
export const SIZE_ADDR = SIZES.ADDR;

// stack sizes are stored in bits 30 and 29. Avoiding msb for perf
export const STACK_BYTE = 0x00000000;
export const STACK_WORD = 0x20000000;
export const STACK_ADDR = 0x40000000;
export const STACK_TYPE_MASK = 0x60000000;
export const STACK_DATA_MASK = 0x1FFFFFFF;

export const FLAGS_PUSH_TO_ALU = 0b01;
export const FLAGS_PULL_FROM_ALU = 0b10;
export const FLAGS_PUSH_AND_PULL = 0b11;

const mapSize = size =>
    size === SIZE_BYTE ? STACK_BYTE
  : size === SIZE_WORD ? STACK_WORD
  : size === SIZE_ADDR ? STACK_ADDR
  : size === STACK_BYTE ? SIZE_BYTE
  : size === STACK_WORD ? SIZE_WORD
  : size === STACK_ADDR ? SIZE_ADDR
  : size;

/**
 * @param {Array<Number>} stack
 * @param {number} data
 * @param {number} size
 */
const push = (stack, data, size) => {
    const newSize = mapSize(size);
    return stack.push(newSize | data);
};

/**
 * @param {Array<number>} stack
 * @returns {number}
 */
const pop = stack => {
    const s0 = stack.pop() | 0;
    const data = s0 & STACK_DATA_MASK;
    return data;
};

/**
 * @param {Array<number>} stack
 * @returns {number[]}
 */
const popWithSize = stack => {
    const s0 = stack.pop() | 0;
    const data = s0 & STACK_DATA_MASK;
    const stackSize = s0 & STACK_TYPE_MASK;
    const size = mapSize(stackSize);
    return [data, size];
}


// tasks comprise an opcode in the top 8 bits
// and oeprands in the lower 24 bits.
export const TASK_OPCODE_MASK = 0x7F000000;
export const TASK_OPERAND_MASK = 0x00FFFFFF;

export const opcodeFromTask = task => task & TASK_OPCODE_MASK;
/*
{    let opcode = task & TASK_OPCODE_MASK;
    if (opcode < 0) opcode += 0x100000000;
    return opcode;
}
*/
export const operandFromTask = task => task & TASK_OPERAND_MASK;
/**
 * @type {Object.<string, number>}
 *
 * Tasks are a 32 bit wide number consisting of an opcode in the
 * top eight bits and an optional argument in the lower 24 bits.
 */
export const TASKS = {
    NOP:                      0x00000000,
    // get and push
    GET_REGISTER_AND_PUSH:    0x01000000,        // r -> s0
    POP_INTO_REGISTER:        0x02000000,        // r <- s0
    PUSH_BYTE:                0x03000000,        // b -> s0
    PUSH_WORD:                0x04000000,        // w -> s0
    PUSH_ADDR:                0x05000000,        // a -> s0
    GET_BYTE_FROM_MEMORY:     0x06000000,        // [s0] -> s0
    GET_WORD_FROM_MEMORY:     0x07000000,        // [s0] -> s0
    POP_BYTE_INTO_MEMORY:     0x08000000,        // [s0] <- s1
    POP_WORD_INTO_MEMORY:     0x09000000,        // [s0] <- s1

    // decompose and recompose
    DECOMPOSE_WORD_TO_BYTES:  0x10000000,      // s0 -> [s0, s1]
    RECOMPOSE_BYTES_TO_WORD:  0x11000000,      // [s0, s1] -> s0
    DECOMPOSE_BYTE_TO_NIBBLE: 0x12000000,     // s0 -> [s0, s1]
    RECOMPOSE_NIBBLE_TO_BYTE: 0x13000000,     // [s0, s1] -> s0

    // bit twiddling
    SET_BIT:         0x14000000,
    CLEAR_BIT:       0x15000000,

    // decisions
    PICK:            0x16000000,

    // commands
    TRAP:            0x17000000,
    DUP:             0x18000000,
    SWAP:            0x19000000,

    // FLAGS
    CLEAR_FLAG_IMM:  0x1A000000,
    SET_FLAG_IMM:    0x1B000000,
    TEST_FLAG_IMM:   0x1C000000,
    PULL_FLAGS_FROM_ALU: 0x1D000000,
    PUSH_FLAGS_TO_ALU: 0x1E000000,

    // IO
    IO_IN:           0x20000000,
    IO_OUT:          0x21000000,

    // arithmetic
    ADD:             0x40000000,        // [s0, s1] -> s0 + s1
    SUB:             0x42000000,
    CMP:             0x44000000,
    AND:             0x46000000,
    OR:              0x48000000,
    TEST:            0x4A000000,
    XOR:             0x4C000000,
    SHL:             0x50000000,
    SHR:             0x52000000,
    MUL:             0x60000000,
    DIV:             0x62000000,
    MOD:             0x64000000,
    SMUL:            0x70000000,
    SDIV:            0x72000000,
    SMOD:            0x74000000,
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
export const TASK_FNS = new Array(256).fill(() => 0);
[
    [TASKS.NOP, () => 0],
    [TASKS.GET_REGISTER_AND_PUSH, ({ stack, registerFile, arg }) => {
        push(stack, registerFile.getRegister(arg), registerFile.getSizeOfRegister(arg));
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
        const s0 = pop(stack) & 0x0F;                             // pop trap number
        ioBus.irqServiceBus.value = s0;
        ioBus.irqSignalBus.signal();                                // send command
    }],
    [TASKS.IO_IN, ({ stack, ioBus}) => {
        const s0 = pop(stack) & 0xFF;                             // pop off the port #
        ioBus.deviceSelectBus.value = (s0 & 0xF0) >> 4;           // top four bits represent the device
        ioBus.addressSelectBus.value = (s0 & 0x0F);               // bottom four represent the address
        ioBus.commandBus.value = 0;                               // READ from bus
        ioBus.executeBus.signal();                                // send command
        push(stack, ioBus.dataBus.value, SIZE_BYTE);              // put the result on the stack
    }],
    [TASKS.IO_OUT, ({ stack, ioBus}) => {
        const s0 = pop(stack) & 0xFF;                             // pop off the data
        const s1 = pop(stack) & 0xFF;                             // pop off the port #
        ioBus.deviceSelectBus.value = (s1 & 0xF0) >> 4;           // top four bits represent the device
        ioBus.addressSelectBus.value = (s1 & 0x0F);               // bottom four represent the address
        ioBus.dataBus.value = s0;                                 // put the data on the bus
        ioBus.commandBus.value = 1;                               // WRITE from bus
        ioBus.executeBus.signal();                                // send command
    }],
    [TASKS.DUP, ({ stack }) => {
        const s0 = stack.pop();   // use pop() to preserve type info
        stack.push(s0);
        stack.push(s0);
    }],
    [TASKS.SWAP, ({ stack}) => {
        const s0 = stack.pop();
        const s1 = stack.pop();
        stack.push(s0);
        stack.push(s1);
    }],
    [TASKS.SET_BIT, ({ stack, arg }) => {
        const bit = 0b1 << arg;
        stack.push(stack.pop() | bit); // technically lets us set the upper bits, bot oh well
    }],
    [TASKS.CLEAR_BIT, ({ stack, arg }) => {
        const bit = ~(0b1 << arg);
        stack.push(stack.pop() & bit);
    }],
    [TASKS.PICK, ({ stack}) => {
        const s0 = pop(stack);
        const s1 = stack.pop();
        const s2 = stack.pop();
        stack.push(s0 !== 0 ? s2 : s1);
        /*if (s0 !== 0) {
            stack.push(s2);
        } else {
            stack.push(s1);
        }*/
    }],
    [TASKS.SET_FLAG_IMM, ({ arg, registerFile }) => {
        const flags = registerFile.FLAGS;
        const bit = 0b1 << arg;
        registerFile.FLAGS = flags | bit;
    }],
    [TASKS.CLEAR_FLAG_IMM, ({ arg, registerFile }) => {
        const flags = registerFile.FLAGS;
        const bit = ~(0b1 << arg);
        registerFile.FLAGS = flags & bit;
    }],
    [TASKS.TEST_FLAG_IMM, ({ stack, arg, registerFile }) => {
        const flags = registerFile.FLAGS;
        const bit = 0b1 << arg;
        push(stack, (((flags & bit) >> arg) > 0) ? 1 : 0, SIZE_BYTE);
    }],
    [TASKS.PULL_FLAGS_FROM_ALU, ({ arg, alu, registerFile }) => {
        registerFile.FLAGS = (registerFile.FLAGS & 0xF0) | ( alu.flagsBus.data & arg );
    }],
    [TASKS.PUSH_FLAGS_TO_ALU, ({ arg, alu, registerFile }) => {
        alu.flagsBus.data = (registerFile.FLAGS & 0x0F) & arg;
    }],
].forEach(([command, fn]) => {
    const idx = command >>> 24;
    TASK_FNS[idx] = fn;
});

const makeArithOp = (command, eatReturn) => {
    return ({ arg, stack, alu, registerFile }) => {
        const [s0, sz0] = popWithSize(stack);                   // s1, op2, b
        const [s1, sz1] = popWithSize(stack);                   // s0, op1, a
        //const retSize = Math.max(sz0, sz1);
        const retSize = sz1 > sz0 ? sz1 : sz0; //Math.max(sz0, sz1);
        alu.op1Bus.data = s1;
        alu.op2Bus.data = s0;
        alu.commandBus.data = (retSize << 8) | (sz1 << 6) | (sz0 << 4) | command;
        alu.flagsBus.data = (arg & 0b1) ? (registerFile.FLAGS & 0xF) : 0;
        alu.executeBus.signal();
        if (arg & 0b10) {
            registerFile.FLAGS = (registerFile.FLAGS & 0xF0) | alu.flagsBus.data;
        }
        const ret = alu.retBus.data;
        if (!eatReturn) push(stack, ret, retSize);
    };
};

Object.entries(TASKS).forEach(([k, v]) => {
    if (v >= 0x40000000) {
        let eatReturn = false;
        // this is an ALU op
        if (k.startsWith("CMP")) {
            k = k.replace("CMP", "SUB")
            eatReturn = true;
        }
        const op = k.split("_")[0];
        const command = COMMANDS[op];
        //TASK_FNS.set(v, makeArithOp(command, eatReturn));
        TASK_FNS[v >>> 24] = makeArithOp(command, eatReturn);
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
    //if (TASK_FNS.has(opcode)) {
        //TASK_FNS.get(opcode)({ arg: operand, stack, alu, registerFile, ioBus, memory });
        TASK_FNS[opcode >>> 24]({ arg: operand, stack, alu, registerFile, ioBus, memory });
    //} else {
        //throw new Error(`Could not execute task ${mapTask(task)}`);
    //}
};
