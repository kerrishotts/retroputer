import { REGISTER_INDEX, FLAGS_INDEX, RegisterFile } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import { ALU, COMMANDS, SIZES } from "../core/ALU.js";
import { IOBus } from "../core/IOBus.js";

const SIZE_BYTE = SIZES.BYTE;
const SIZE_WORD = SIZES.WORD;
const SIZE_ADDR = SIZES.ADDR;

export const TASKS = {
    // get and push
    GET_REGISTER_AND_PUSH: 0x01,        // r -> s0
    POP_INTO_REGISTER:     0x02,        // r <- s0
    PUSH_BYTE:             0x03,        // b -> s0
    PUSH_WORD:             0x04,        // w -> s0
    PUSH_ADDR:             0x05,        // a -> s0
    GET_BYTE_FROM_MEMORY:  0x06,        // [s0] -> s0
    GET_WORD_FROM_MEMORY:  0x07,        // [s0] -> s0
    POP_BYTE_INTO_MEMORY:  0x08,        // [s0] <- s1
    POP_WORD_INTO_MEMORY:  0x09,        // [s0] <- s1


    // decompose and recompse
    DECOMPOSE_WORD_TO_BYTES: 0x10,      // s0 -> [s0, s1]
    RECOMPOSE_BYTES_TO_WORD: 0x11,      // [s0, s1] -> s0
    DECOMPOSE_BYTE_TO_NIBBLE: 0x12,     // s0 -> [s0, s1]
    RECOMPOSE_NIBBLE_TO_BYTE: 0x13,     // [s0, s1] -> s0

    // commands
    TRAP:                  0x40,

    // arithmetic
    ADD:                   0x80,        // [s0, s1] -> s0 + s1
    ADD_WITH_FLAGS:        0x81,
    SUB:                   0x82,
    SUB_WITH_FLAGS:        0x83,
    CMP:                   0x84,
    CMP_WITH_FLAGS:        0x85,
    AND:                   0x86,
    AND_WITH_FLAGS:        0x87,
    OR:                    0x88,
    OR_WITH_FLAGS:         0x89,
    TEST:                  0x8A,
    TEST_WITH_FLAGS:       0x8B,
    XOR:                   0x8C,
    XOR_WITH_FLAGS:        0x8D,
    SHL:                   0x90,
    SHL_WITH_FLAGS:        0x91,
    SHR:                   0x92,
    SHR_WITH_FLAGS:        0x93,
    MUL:                   0xA0,
    MUL_WITH_FLAGS:        0xA1,
    DIV:                   0xA2,
    DIV_WITH_FLAGS:        0xA3,
    MOD:                   0xA4,
    MOD_WITH_FLAGS:        0xA5,
    SMUL:                  0xB0,
    SMUL_WITH_FLAGS:       0xB1,
    SDIV:                  0xB2,
    SDIV_WITH_FLAGS:       0xB3,
    SMOD:                  0xB4,
    SMOD_WITH_FLAGS:       0xB5,
};

export const TASK_FNS = {
    [TASKS.GET_REGISTER_AND_PUSH]({stack /** : []*/, registerFile /** : RegisterFile */, args}) {
        const rIdx = args[0];
        stack.push([registerFile.getRegister(rIdx), registerFile.sizeOfRegister(rIdx)]);
    },
    [TASKS.POP_INTO_REGISTER]({stack, registerFile, args}) { registerFile.setRegister(args[0], stack.pop()[0]); },
    [TASKS.PUSH_BYTE]({stack, args}) { stack.push([args[0], SIZE_BYTE]); },
    [TASKS.PUSH_WORD]({stack, args}) { stack.push([args[0], SIZE_WORD]); },
    [TASKS.PUSH_ADDR]({stack, args}) { stack.push([args[0], SIZE_ADDR]); },
    [TASKS.GET_BYTE_FROM_MEMORY]({stack, memory}) { stack.push(memory.readByte(stack.pop()[0]), SIZE_BYTE); },
    [TASKS.GET_WORD_FROM_MEMORY]({stack, memory}) { stack.push(memory.readWord(stack.pop()[0]), SIZE_WORD); },
    [TASKS.POP_BYTE_INTO_MEMORY]({stack, memory}) {
        const byte = stack.pop()[0]; // s0
        const addr = stack.pop()[0]; // s1
        memory.writeByte(addr, byte);
    },
    [TASKS.POP_WORD_INTO_MEMORY]({stack, memory}) {
        const word = stack.pop()[0]; // s0
        const addr = stack.pop()[0]; // s1
        memory.writeWord(addr, word);
    },
    [TASKS.DECOMPOSE_WORD_TO_BYTES]({stack}) {
        const word = stack.pop()[0]; // s0
        stack.push([(word & 0xFF00) >> 8, SIZE_BYTE]);            // a = hi
        stack.push([(word & 0x00FF), SIZE_BYTE]);                 // b = lo
    },
    [TASKS.RECOMPOSE_BYTES_TO_WORD]({stack}) {
        const s0 = stack.pop()[0];                                // b = lo
        const s1 = stack.pop()[0];                                // a = hi
        stack.push([(s1 << 8) | s0, SIZE_WORD]);
    },
    [TASKS.DECOMPOSE_BYTE_TO_NIBBLE]({stack}) {
        const byte = stack.pop()[0];                              // s0
        stack.push([(byte & 0xF0) >> 4, SIZE_BYTE]);              // a = hi
        stack.push([(byte & 0x0F), SIZE_BYTE]);                   // b = lo
    },
    [TASKS.RECOMPOSE_NIBBLE_TO_BYTE]({stack}) {
        const s0 = stack.pop()[0];                                // b = lo
        const s1 = stack.pop()[0];                                // a = hi
        stack.push([(s1 << 4) | s0, SIZE_BYTE]);
    },
    [TASKS.TRAP]({stack, ioBus}) {
        // TODO
    },
};

Object.entries(TASKS).forEach(([k, v]) => {
    if (v >= 0x80) {
        // this is an ALU op
        const op = k.split("_")[0];
        TASK_FNS[v] = function({stack, alu, registerFile}) {
            const [s1, sz1] = stack.pop();                        // s1, op2, b
            const [s0, sz0] = stack.pop();                        // s0, op1, a
            const retSize = Math.max(sz0, sz1);
            alu.op1Bus.data = s0;
            alu.op2Bus.data = s1;
            // set the flags ONLY if this is a WITH_FLAGS operation
            alu.flagsBus.data = (v & 0b1) ? 0 : (registerFile.NEGATIVE << 3) | (registerFile.CARRY << 2) | (registerFile.OVERFLOW << 1) | (registerFile.ZERO);
            alu.commandBus.data = (retSize << 8) | (sz0 << 6) | (sz1 << 4) | COMMANDS[op];
            alu.executeBus.signal();
            stack.push([alu.retBus.data, retSize]);
            if (v & 0b1) {
                // pull back the flags
                registerFile.NEGATIVE = (alu.flagsBus.data & 0b1000) >> 3;
                registerFile.CARRY    = (alu.flagsBus.data & 0b0100) >> 2;
                registerFile.OVERFLOW = (alu.flagsBus.data & 0b0010) >> 1;
                registerFile.ZERO     = (alu.flagsBus.data & 0b0001);
            }
        };
    }
});