import { TASKS } from "./tasks.js";

import { REGISTER_INDEX, FLAGS_INDEX, RegisterFile } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import { ALU, COMMANDS, SIZES } from "../core/ALU.js";
import { IOBus } from "../core/IOBus.js";

const taskCache = {};

export function _constructArgs(instruction, operands) {
    const args = {};
    const argLocations = Object.entries(operands);
    for (let i = 0, l = argLocations.length; i < l; i++) {
        const [arg, [msb, lsb]] = argLocations[i];
        args[arg] = 0;
        for (let x = msb; x >= lsb; x--) {
            const bit = (instruction & ( 1 << x )) ? 1 : 0;
            args[arg] = (args[arg] << 1) | bit;
        }
    }
    return args;
}

export function decodeToTasks(bytes, {operands, decode}) {
    let instruction = 0;
    bytes.forEach(byte => instruction = (instruction << 8) | byte);
    if (taskCache[instruction]) { return taskCache[instruction]; }
    const args = _constructArgs(instruction, operands);
    const tasks = decode(args);
    taskCache[instruction] = tasks;
    return tasks;
}

export const OPCODES = { };
OPCODES["nop"] = {
    asm: "nop",
    pattern: "0000_0000",
    operands: {},
    decode: () => []
};

OPCODES["not"] = {
    asm: "not $r",
    pattern: "0000_1001 0000_rrrr",
    operands: { r: [3, 0] },
    decode: ({r = 0} = {}) => [
        [TASKS.GET_REGISTER_AND_PUSH, r], // a, op1
        [(r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD, (r & 0x01) ? 0xFF : 0xFFFF], // b, op2
        [TASKS.XOR_WITH_FLAGS],
        [TASKS.POP_INTO_REGISTER, r]
    ]
};

OPCODES["neg"] = {
    asm: "neg $r",
    pattern: "0000_1001 0001_rrrr",
    operands: { r: [3, 0] },
    decode: ({r = 0} = {}) => [
        [TASKS.GET_REGISTER_AND_PUSH, r], // a
        [(r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD, (r & 0x01) ? 0xFF : 0xFFFF], // b
        [TASKS.XOR],
        [(r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD, 0x01],
        [TASKS.ADD_WITH_FLAGS],
        [TASKS.POP_INTO_REGISTER, r]
    ]
};

OPCODES["exc"] = {
    asm: "exc $r",
    pattern: "0000_1001 0010_rrrr",
    operands: { r: [3, 0] },
    decode: ({r = 0} = {}) => [
        [TASKS.GET_REGISTER_AND_PUSH, r],
        [(r & 0x01) ? TASKS.DECOMPOSE_BYTE_TO_NIBBLE : TASKS.DECOMPOSE_WORD_TO_BYTES],
        [TASKS.PUSH_BYTE, (r & 0x01) ? 4 : 8],
        [TASKS.SHL],
        [TASKS.OR_WITH_FLAGS],
        [TASKS.POP_INTO_REGISTER, r]
    ]
};

OPCODES["swap_ds"] = {
    asm: "swap $d, $s",
    pattern: "0000_1110 dddd_ssss",
    operands: { s: [3, 0], d: [7, 4] },
    decode: ({d = 0, s = 0} = {}) => [
        [TASKS.GET_REGISTER_AND_PUSH, d],
        [TASKS.GET_REGISTER_AND_PUSH, s],
        [TASKS.POP_INTO_REGISTER, d],
        [TASKS.POP_INTO_REGISTER, s]
    ]
};

OPCODES["mov_ds"] = {
    asm: "mov $d, $s",
    pattern: "0000_1111 dddd_ssss",
    operands: { s: [3, 0], d: [7, 4] },
    decode: ({d = 0, s = 0} = {}) => [
        [TASKS.GET_REGISTER_AND_PUSH, s],
        [TASKS.POP_INTO_REGISTER, d]
    ]
};

// some opcodes can be generated based on a recurring pattern.
// no sense in typing those over and over, so let's do it automatically.

// add, sub, cmp, and, or, test, xor
[
    ["add",  TASKS.ADD_WITH_FLAGS, "0000_0001", "0100_1dd1", "0100_1dd0" ],
    ["sub",  TASKS.SUB_WITH_FLAGS, "0000_0010", "0101_0dd1", "0101_0dd0" ],
    ["cmp",  TASKS.CMP_WITH_FLAGS, "0000_0011", "0101_1dd1", "0101_1dd0" ],
    ["and",  TASKS.AND_WITH_FLAGS, "0000_0100", "0110_0dd1", "0110_0dd0" ],
    ["or",   TASKS.OR_WITH_FLAGS, "0000_0101", "0110_1dd1", "0110_1dd0" ],
    ["test", TASKS.TEST_WITH_FLAGS, "0000_0110", "0111_0dd1", "0111_0dd0" ],    // TODO: incorrect; the alu doesn't support test ATM
    ["xor",  TASKS.XOR_WITH_FLAGS, "0000_0111", "0111_1dd1", "0111_1dd0" ],
].forEach(([opcode, task, ds, db, dw]) => {
    OPCODES[`${opcode}_ds`] = {
        asm: `${opcode} $d, $s`,
        pattern: `${ds} dddd_ssss`,
        operands: { s: [3, 0], d: [7, 4] },
        decode: ({d = 0, s = 0} = {}) => [
            [TASKS.GET_REGISTER_AND_PUSH, d], // a
            [TASKS.GET_REGISTER_AND_PUSH, s], // b
            [task],
            [TASKS.POP_INTO_REGISTER, d]
        ]
    };
    OPCODES[`${opcode}_db`] = {
        asm: `${opcode} $d, $b`,
        pattern: `${db} bbbb_bbbb`,
        operands: { d: [10, 9], b: [7, 0] },
        decode: ({d = 0, b = 0} = {}) => [
            [TASKS.GET_REGISTER_AND_PUSH, (d << 1) | 1], // a
            [TASKS.PUSH_BYTE, b], //b
            [task],
            [TASKS.POP_INTO_REGISTER, (d << 1) | 1 ]
        ]
    };
    OPCODES[`${opcode}_dw`] = {
        asm: `${opcode} $d, $w`,
        pattern: `${dw} wwww_wwww wwww_wwww`,
        operands: { d: [18, 17], w: [15, 0] },
        decode: ({d = 0, w = 0} = {}) => [
            [TASKS.GET_REGISTER_AND_PUSH, (d << 1)], // a
            [TASKS.PUSH_WORD, w], // b
            [task],
            [TASKS.POP_INTO_REGISTER, (d << 1) ]
        ]
    };
});

// trap
OPCODES["trap_b"] = {
    asm: "trap $b",
    pattern: "0000_1000 bbbb_bbbb",
    operands: { b: [7, 0] },
    decode: ({b = 0} = {}) => [
        [TASKS.PUSH_BYTE, b],
        [TASKS.TRAP]
    ]
};
OPCODES["trap_r"] = {
    asm: "trap $r",
    pattern: "0100_0rrr",
    operands: { r: [2, 0] },
    decode: ({r = 0} = {}) => [
        [TASKS.GET_REGISTER_AND_PUSH, r],
        [TASKS.TRAP]
    ]
};

// ds variants of shl, shr, mul, div, mod, smul, sdiv, smod
[
    ["shl",  TASKS.SHL_WITH_FLAGS,  "0000_1011 dddd_ssss"],
    ["shr",  TASKS.SHR_WITH_FLAGS,  "0000_1101 dddd_ssss"],
    ["mul",  TASKS.MUL_WITH_FLAGS,  "1010_1000 dddd_ssss"],
    ["div",  TASKS.DIV_WITH_FLAGS,  "1010_1001 dddd_ssss"],
    ["mod",  TASKS.MOD_WITH_FLAGS,  "1010_1010 dddd_ssss"],
    ["smul", TASKS.SMUL_WITH_FLAGS, "1010_1011 dddd_ssss"],
    ["sdiv", TASKS.SDIV_WITH_FLAGS, "1010_1100 dddd_ssss"],
    ["smod", TASKS.SMOD_WITH_FLAGS, "1010_1101 dddd_ssss"]
].forEach(([opcode, task, pattern]) => {
    OPCODES[`${opcode}_ds`] = {
        asm: `${opcode} $d, $s`,
        pattern,
        operands: { s: [3, 0], d: [7, 4] },
        decode: ({d = 0, s = 0} = {}) => [
            [TASKS.GET_REGISTER_AND_PUSH, d], // a
            [TASKS.GET_REGISTER_AND_PUSH, s], // b
            [task],
            [TASKS.POP_INTO_REGISTER, d]
        ]
    }
});

// rn variants of shl, shr
[
    ["shl", TASKS.SHL_WITH_FLAGS, "0000_1010 rrrr_nnnn"],
    ["shr", TASKS.SHR_WITH_FLAGS, "0000_1100 rrrr_nnnn"]
].forEach(([opcode, task, pattern]) => {
    OPCODES[`${opcode}_rn`] = {
        asm: `${opcode} $r, $n`,
        pattern,
        operands: { n: [3, 0], r: [7, 4] },
        decode: ({r = 0, n = 0} = {}) => [
            [TASKS.GET_REGISTER_AND_PUSH, r], // a
            [TASKS.PUSH_BYTE, n], // b
            [task],
            [TASKS.POP_INTO_REGISTER, r]
        ]
    }
});

// LD dw
OPCODES["ld_dw"] = {
    asm: "ld $d, $w",
    pattern: "0001_ddd0 0000_0000 wwww_wwww wwww_wwww",
    operands: { d: [27, 25], w: [15, 0] },
    decode: ({d = 0, w = 0} = {}) => [
        [TASKS.PUSH_WORD, w],
        [TASKS.POP_INTO_REGISTER, d << 1]
    ]
};

// LD db
OPCODES["ld_db"] = {
    asm: "ld $d, $b",
    pattern: "0001_ddd1 0000_0000 bbbb_bbbb",
    operands: { d: [19, 17], b: [7, 0] },
    decode: ({d = 0, b = 0} = {}) => [
        [TASKS.PUSH_BYTE, b],
        [TASKS.POP_INTO_REGISTER, (d << 1) | 1]
    ]
};

// LD; 12 cycles worst case.  3 in the best.
OPCODES["ld"] = {
    asm: "ld $d, $a $x $y $m:$i",
    pattern: "0001_dddd mmix_yaaa aaaa_aaaa aaaa_aaaa",
    operands: { d: [ 27, 24 ], m: [ 23, 22 ], i: [ 21, 21 ], x: [ 20, 20 ], y: [ 19, 19], a: [18, 0] },
    decode: ({ d = 0, m = 0, i = 0,x = 0, y = 0, a = 0 } = {}) => [
        // m: 0b01 === address, 0b10 === BP, 0b11 ==== D
        // i: 0b0 === absolute; 0b1 === indirect
        [TASKS.PUSH_ADDR, a],
        // if we're BP or D, we need that register added to the address on the stack
        ...(m > 1 ? [
            [TASKS.GET_REGISTER_AND_PUSH, m === 2 ? REGISTER_INDEX.BP : REGISTER_INDEX.D],
            [TASKS.ADD],
        ] : []),
        // if indexing by x, do so
        ...(x === 1 ? [
            [TASKS.GET_REGISTER_AND_PUSH, REGISTER_INDEX.X],
            // TODO: scale?
            [TASKS.ADD]
        ]: []),
        // if indirect, we need memory at location
        ...(i === 1 ? [
            [TASKS.GET_WORD_FROM_MEMORY],
            [TASKS.PUSH_ADDR, (a & 0x70000)],
            [TASKS.OR]
        ]: []),
        // index by y
        ...(y === 1 ? [
            [TASKS.GET_REGISTER_AND_PUSH, REGISTER_INDEX.Y],
            // TODO: scale?
            [TASKS.ADD]
        ]: []),
        // get the desired data from memory
        [(d & 0x01) ? TASKS.GET_BYTE_FROM_MEMORY : TASKS.GET_WORD_FROM_MEMORY],
        // and load it
        [TASKS.POP_INTO_REGISTER, d]
    ]
}

// ST; 12 cycles worst case.  3 in the best.
OPCODES["st"] = {
    asm: "st $a, $s $x $y $m:$i",
    pattern: "0010_ssss mmix_yaaa aaaa_aaaa aaaa_aaaa",
    operands: { s: [ 27, 24 ], m: [ 23, 22 ], i: [ 21, 21 ], x: [ 20, 20 ], y: [ 19, 19], a: [18, 0] },
    decode: ({ s = 0, m = 0, i = 0,x = 0, y = 0, a = 0 } = {}) => [
        // m: 0b01 === address, 0b10 === BP, 0b11 ==== D
        // i: 0b0 === absolute; 0b1 === indirect
        [TASKS.PUSH_ADDR, a],
        // if we're BP or D, we need that register added to the address on the stack
        ...(m > 1 ? [
            [TASKS.GET_REGISTER_AND_PUSH, m === 2 ? REGISTER_INDEX.BP : REGISTER_INDEX.D],
            [TASKS.ADD],
        ] : []),
        // if indexing by x, do so
        ...(x === 1 ? [
            [TASKS.GET_REGISTER_AND_PUSH, REGISTER_INDEX.X],
            // TODO: scale?
            [TASKS.ADD]
        ]: []),
        // if indirect, we need memory at location
        ...(i === 1 ? [
            [TASKS.GET_WORD_FROM_MEMORY],
            [TASKS.PUSH_ADDR, (a & 0x70000)],
            [TASKS.OR]
        ]: []),
        // index by y
        ...(y === 1 ? [
            [TASKS.GET_REGISTER_AND_PUSH, REGISTER_INDEX.Y],
            // TODO: scale?
            [TASKS.ADD]
        ]: []),
        // get byte/word to push to memory
        [TASKS.GET_REGISTER_AND_PUSH, s],
        // get the desired data from memory
        [(s & 0x01) ? TASKS.POP_BYTE_INTO : TASKS.POP_WORD_INTO_MEMORY],
    ]
}