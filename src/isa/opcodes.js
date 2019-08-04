import { TASKS, mapTask } from "./tasks.js";

import { REGISTER_INDEX, FLAGS_INDEX, RegisterFile } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import { ALU, COMMANDS, SIZES } from "../core/ALU.js";
import { IOBus } from "../core/IOBus.js";

const taskCache = new Map();

export function _constructArgs(instruction, operands) {
    const args = {};
    const argLocations = Object.entries(operands);
    let i, l, arg, msb, lsb, x, bit, v;
    for (i = 0, l = argLocations.length; i < l; i++) {
        [arg, [msb, lsb]] = argLocations[i];
        v = 0;
        for (x = msb; x >= lsb; x--) {
            bit = (instruction & (1 << x)) ? 1 : 0;
            v = (v << 1) | bit;
        }
        args[arg] = v;
    }
    return args;
}

export function decodeToTasks(instruction, { operands, decode }) {
    const cachedInst = taskCache.get(instruction);
    if (cachedInst) return cachedInst;
    /*if (taskCache.has(instruction)) {
        return taskCache.get(instruction);
    }*/
    const args = _constructArgs(instruction, operands);
    const tasks = decode(args);
    taskCache.set(instruction, tasks);
    return tasks;
}

export const OPCODES = {};
OPCODES["nop"] = {
    asm: "nop",
    pattern: "0000_0000",
    operands: {},
    decode: () => [
        TASKS.NOP
    ]
};

OPCODES["brk"] = {
    asm: "brk",
    pattern: "0011_1111",
    operands: {},
    decode: () => [
        TASKS.SET_FLAG_IMM | FLAGS_INDEX.SINGLE_STEP,
        //TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.FLAGS,
        //TASKS.PUSH_BYTE | 0b00000100,
        //TASKS.OR,
        //TASKS.POP_INTO_REGISTER | REGISTER_INDEX.FLAGS
    ]
};

OPCODES["not"] = {
    asm: "not $r",
    pattern: "0000_1001 0000_rrrr",
    operands: { r: [3, 0] },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r, // a, op1
        ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | ((r & 0x01) ? 0xFF : 0xFFFF), // b, op2
        TASKS.XOR_WITH_FLAGS,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["neg"] = {
    asm: "neg $r",
    pattern: "0000_1001 0001_rrrr",
    operands: { r: [3, 0] },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r, // a
        ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | ((r & 0x01) ? 0xFF : 0xFFFF), // b
        TASKS.XOR,
        ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | 0x01,
        TASKS.ADD_WITH_FLAGS,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["exc"] = {
    asm: "exc $r",
    pattern: "0000_1001 0010_rrrr",
    operands: { r: [3, 0] },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r,
        ((r & 0x01) ? TASKS.DECOMPOSE_BYTE_TO_NIBBLE : TASKS.DECOMPOSE_WORD_TO_BYTES),
        TASKS.PUSH_BYTE | ((r & 0x01) ? 4 : 8),
        TASKS.SHL,
        TASKS.OR_WITH_FLAGS,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["swap_ds"] = {
    asm: "swap $d, $s",
    pattern: "0000_1110 dddd_ssss",
    operands: { s: [3, 0], d: [7, 4] },
    decode: ({ d = 0, s = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | d,
        TASKS.GET_REGISTER_AND_PUSH | s,
        TASKS.POP_INTO_REGISTER | d,
        TASKS.POP_INTO_REGISTER | s
    ]
};

OPCODES["mov_ds"] = {
    asm: "mov $d, $s",
    pattern: "0000_1111 dddd_ssss",
    operands: { s: [3, 0], d: [7, 4] },
    decode: ({ d = 0, s = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | s,
        TASKS.POP_INTO_REGISTER | d
    ]
};

// some opcodes can be generated based on a recurring pattern.
// no sense in typing those over and over, so let's do it automatically.

// inc and dec are just add and subtract in disguise. It's no
// faster to use them, but they are convenient from a typing
// perspective
[
    ["inc", TASKS.ADD_WITH_FLAGS, `1100_rrrr`],
    ["dec", TASKS.SUB_WITH_FLAGS, `1101_rrrr`]
].forEach(([opcode, task, pattern]) => {
    OPCODES[`${opcode}_r`] = {
        asm: `${opcode} $r`,
        pattern,
        operands: { r: [3, 0] },
        decode: ({ r = 0 } = {}) => [
            // clear carry bit; inc & dec should never be affected
            TASKS.CLEAR_FLAG_IMM | FLAGS_INDEX.CARRY,
            // now do the real work
            TASKS.GET_REGISTER_AND_PUSH | r,
            ((r & 0b1) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | 1,
            task,
            TASKS.POP_INTO_REGISTER | r
        ]
    }
});

// set and clear flag
[
    ["set", TASKS.SET_FLAG_IMM, `1011_0fff`],
    ["clr", TASKS.CLEAR_FLAG_IMM, `1011_1fff`]
].forEach(([opcode, task, pattern]) => {
    OPCODES[`${opcode}_f`] = {
        asm: `${opcode} $f`,
        pattern,
        operands: { f: [2, 0] },
        decode: ({ f = 0 } = {}) => [
            task | f,
        ]
    }
});

// add, sub, cmp, and, or, test, xor
[
    ["add", TASKS.ADD_WITH_FLAGS, "0000_0001", "0100_1dd1", "0100_1dd0"],
    ["sub", TASKS.SUB_WITH_FLAGS, "0000_0010", "0101_0dd1", "0101_0dd0"],
    ["cmp", TASKS.CMP_WITH_FLAGS, "0000_0011", "0101_1dd1", "0101_1dd0"],
    ["and", TASKS.AND_WITH_FLAGS, "0000_0100", "0110_0dd1", "0110_0dd0"],
    ["or", TASKS.OR_WITH_FLAGS, "0000_0101", "0110_1dd1", "0110_1dd0"],
    ["test", TASKS.TEST_WITH_FLAGS, "0000_0110", "0111_0dd1", "0111_0dd0"],    // TODO: incorrect; the alu doesn't support test ATM
    ["xor", TASKS.XOR_WITH_FLAGS, "0000_0111", "0111_1dd1", "0111_1dd0"],
].forEach(([opcode, task, ds, db, dw]) => {
    OPCODES[`${opcode}_ds`] = {
        asm: `${opcode} $d, $s`,
        pattern: `${ds} dddd_ssss`,
        operands: { s: [3, 0], d: [7, 4] },
        decode: (
            opcode === "cmp"
                ? ({ d = 0, s = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | d, // a
                    TASKS.GET_REGISTER_AND_PUSH | s, // b
                    task]
                : ({ d = 0, s = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | d, // a
                    TASKS.GET_REGISTER_AND_PUSH | s, // b
                    task,
                    (TASKS.POP_INTO_REGISTER | d)]
        )
    };
    OPCODES[`${opcode}_db`] = {
        asm: `${opcode} $d, $b`,
        pattern: `${db} bbbb_bbbb`,
        operands: { d: [10, 9], b: [7, 0] },
        decode: (
            opcode === "cmp"
                ? ({ d = 0, b = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | ((d << 1) | 1), // a
                    TASKS.PUSH_BYTE | b, //b
                    [task],
                ]
                : ({ d = 0, b = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | ((d << 1) | 1), // a
                    TASKS.PUSH_BYTE | b, //b
                    [task],
                    (TASKS.POP_INTO_REGISTER | ((d << 1) | 1))
                ]
        )
    };
    OPCODES[`${opcode}_dw`] = {
        asm: `${opcode} $d, $w`,
        pattern: `${dw} wwww_wwww wwww_wwww`,
        operands: { d: [18, 17], w: [15, 0] },
        decode: (
            opcode === "cmp"
                ? ({ d = 0, w = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | (d << 1), // a
                    TASKS.PUSH_WORD | w, // b
                    task,
                ]
                : ({ d = 0, w = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | (d << 1), // a
                    TASKS.PUSH_WORD | w, // b
                    task,
                    (TASKS.POP_INTO_REGISTER | (d << 1))
                ]
        )
    };
});

// trap
OPCODES["trap_b"] = {
    asm: "trap $b",
    pattern: "0000_1000 bbbb_bbbb",
    operands: { b: [7, 0] },
    decode: ({ b = 0 } = {}) => [
        TASKS.PUSH_BYTE | b,
        TASKS.TRAP
    ]
};
OPCODES["trap_r"] = {
    asm: "trap $r",
    pattern: "0100_0rrr",
    operands: { r: [2, 0] },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r,
        TASKS.TRAP
    ]
};

// enter
OPCODES["enter_n"] = {
    asm: "enter $n",
    pattern: "0011_1000 nnnn_nnnn",
    operands: { n: [7, 0] },
    decode: ({ n = 0} = {}) => [
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.BP}),
        ...OPCODES["mov_ds"].decode({d: REGISTER_INDEX.BP, s: REGISTER_INDEX.SP}),
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.SP,
        TASKS.PUSH_WORD | n,
        TASKS.SUB,
        TASKS.POP_INTO_REGISTER | REGISTER_INDEX.SP
    ]
};
// exit
OPCODES["exit_n"] = {
    asm: "exit $n",
    pattern: "0011_1001 nnnn_nnnn",
    operands: { n: [7, 0] },
    decode: ({ n = 0} = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.SP,
        TASKS.PUSH_WORD | n,
        TASKS.ADD,
        TASKS.POP_INTO_REGISTER | REGISTER_INDEX.SP,
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.BP})
    ]
};

// ds variants of shl, shr, mul, div, mod, smul, sdiv, smod
[
    ["shl", TASKS.SHL_WITH_FLAGS, "0000_1011 dddd_ssss"],
    ["shr", TASKS.SHR_WITH_FLAGS, "0000_1101 dddd_ssss"],
    ["mul", TASKS.MUL_WITH_FLAGS, "1010_1000 dddd_ssss"],
    ["div", TASKS.DIV_WITH_FLAGS, "1010_1001 dddd_ssss"],
    ["mod", TASKS.MOD_WITH_FLAGS, "1010_1010 dddd_ssss"],
    ["smul", TASKS.SMUL_WITH_FLAGS, "1010_1011 dddd_ssss"],
    ["sdiv", TASKS.SDIV_WITH_FLAGS, "1010_1100 dddd_ssss"],
    ["smod", TASKS.SMOD_WITH_FLAGS, "1010_1101 dddd_ssss"]
].forEach(([opcode, task, pattern]) => {
    OPCODES[`${opcode}_ds`] = {
        asm: `${opcode} $d, $s`,
        pattern,
        operands: { s: [3, 0], d: [7, 4] },
        decode: ({ d = 0, s = 0 } = {}) => [
            TASKS.GET_REGISTER_AND_PUSH | d, // a
            TASKS.GET_REGISTER_AND_PUSH | s, // b
            task,
            TASKS.POP_INTO_REGISTER | d
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
        decode: ({ r = 0, n = 0 } = {}) => [
            TASKS.GET_REGISTER_AND_PUSH | r, // a
            TASKS.PUSH_BYTE | n, // b
            task,
            TASKS.POP_INTO_REGISTER | r
        ]
    }
});

OPCODES["in_rp"] = {
    asm: "in $r, $p",
    pattern: "0011_0000 rrrr_0000 pppppppp",
    operands: { r: [15, 12], p: [7, 0] },
    decode: ({ r = 0, p = 0 } = {}) => [
        TASKS.PUSH_BYTE | p,
        TASKS.IO_IN,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["out_rp"] = {
    asm: "out $r, $p",
    pattern: "0011_0001 rrrr_0000 pppppppp",
    operands: { r: [15, 12], p: [7, 0] },
    decode: ({ r = 0, p = 0 } = {}) => [
        TASKS.PUSH_BYTE | p,
        TASKS.GET_REGISTER_AND_PUSH | r,
        TASKS.IO_OUT,
    ]
};



// LD dw
OPCODES["ld_dw"] = {
    asm: "ld $d, $w",
    pattern: "0001_ddd0 0000_0000 wwww_wwww wwww_wwww",
    operands: { d: [27, 25], w: [15, 0] },
    decode: ({ d = 0, w = 0 } = {}) => [
        TASKS.PUSH_WORD | w,
        TASKS.POP_INTO_REGISTER | (d << 1)
    ]
};

// LD db
OPCODES["ld_db"] = {
    asm: "ld $d, $b",
    pattern: "0001_ddd1 0000_0000 bbbb_bbbb",
    operands: { d: [19, 17], b: [7, 0] },
    decode: ({ d = 0, b = 0 } = {}) => [
        TASKS.PUSH_BYTE | b,
        TASKS.POP_INTO_REGISTER | ((d << 1) | 1)
    ]
};

const addressingTasks = ({ m = 0, i = 0, x = 0, y = 0, a = 0 } = {}) => [
    // m: 0b01 === address, 0b10 === BP, 0b11 ==== D
    // i: 0b0 === absolute; 0b1 === indirect
    // if we're BP or D, we need that register added to the address on the stack
    ...(m > 1 ? [
        TASKS.GET_REGISTER_AND_PUSH | (m === 2 ? REGISTER_INDEX.BP : REGISTER_INDEX.D),
        TASKS.ADD,
        TASKS.PUSH_WORD | 0xFFFF,
        TASKS.AND
    ] : []),
    // if indexing by x, do so
    ...(x === 1 ? [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.X,
        // TODO: scale?
        TASKS.ADD
    ] : []),
    // if indirect, we need memory at location
    ...(i === 1 ? [
        TASKS.GET_WORD_FROM_MEMORY,
        TASKS.PUSH_ADDR | (a & 0x70000),
        TASKS.OR
    ] : []),
    // index by y
    ...(y === 1 ? [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.Y,
        // TODO: scale?
        TASKS.ADD
    ] : []),
];

// LD; 12 cycles worst case.  3 in the best.
OPCODES["ld"] = {
    asm: "ld $d, $a $x $y $m:$i",
    pattern: "0001_dddd mmix_yaaa aaaa_aaaa aaaa_aaaa",
    operands: { d: [27, 24], m: [23, 22], i: [21, 21], x: [20, 20], y: [19, 19], a: [18, 0] },
    decode: ({ d = 0, m = 0, i = 0, x = 0, y = 0, a = 0 } = {}) => [
        TASKS.PUSH_ADDR | a,
        ...addressingTasks({ m, i, x, y, a }),
        // get the desired data from memory
        ((d & 0x01)
            ? TASKS.GET_BYTE_FROM_MEMORY
            : TASKS.GET_WORD_FROM_MEMORY),
        // and load it
        TASKS.POP_INTO_REGISTER | d
    ]
}

// ST; 12 cycles worst case.  3 in the best.
OPCODES["st"] = {
    asm: "st $a, $s $x $y $m:$i",
    pattern: "0010_ssss mmix_yaaa aaaa_aaaa aaaa_aaaa",
    operands: { s: [27, 24], m: [23, 22], i: [21, 21], x: [20, 20], y: [19, 19], a: [18, 0] },
    decode: ({ s = 0, m = 0, i = 0, x = 0, y = 0, a = 0 } = {}) => [
        TASKS.PUSH_ADDR | a,
        ...addressingTasks({ m, i, x, y, a }),
        // get byte/word to push to memory
        TASKS.GET_REGISTER_AND_PUSH | s,
        // get the desired data from memory
        ((s & 0x01)
            ? TASKS.POP_BYTE_INTO_MEMORY
            : TASKS.POP_WORD_INTO_MEMORY),
    ]
};


OPCODES["push_r"] = {
    asm: `push $r`,
    pattern: "1110_rrrr",
    operands: { r: [3, 0] },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.SP,
        TASKS.PUSH_WORD | ((r & 0b1) ? 1 : 2),
        TASKS.SUB,
        TASKS.DUP,
        TASKS.GET_REGISTER_AND_PUSH | r,
        ((r & 0b1)
            ? TASKS.POP_BYTE_INTO_MEMORY
            : TASKS.POP_WORD_INTO_MEMORY),
        TASKS.POP_INTO_REGISTER | REGISTER_INDEX.SP,
    ]
};
OPCODES["pop_r"] = {
    asm: `pop $r`,
    pattern: "1111_rrrr",
    operands: { r: [3, 0] },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.SP,
        TASKS.DUP,
        TASKS.PUSH_WORD | ((r & 0b1) ? 1 : 2),
        TASKS.ADD,
        TASKS.POP_INTO_REGISTER | REGISTER_INDEX.SP,
        ((r & 0b1)
            ? TASKS.GET_BYTE_FROM_MEMORY
            : TASKS.GET_WORD_FROM_MEMORY),
        TASKS.POP_INTO_REGISTER | r,
    ]
};

OPCODES["pushall"] = {
    asm: `pushall`,
    pattern: "1010_0000",
    operands: {},
    decode: () => [
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.SP}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.A}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.B}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.C}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.D}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.X}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.Y}),
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.BP})
    ]
};
OPCODES["popall"] = {
    asm: `popall`,
    pattern: "1010_0001",
    operands: {},
    decode: () => [
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.BP}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.Y}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.X}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.D}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.C}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.B}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.A}),
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.SP})
    ]
};


OPCODES["pushf"] = {
    asm: `pushf`,
    pattern: "1010_0010",
    operands: {},
    decode: () => [
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.STATUS})
    ]
};

OPCODES["popf"] = {
    asm: `popf`,
    pattern: "1010_0011",
    operands: {},
    decode: () => [
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.STATUS})
    ]
};

OPCODES["pushmm"] = {
    asm: `pushmm`,
    pattern: "1010_0100",
    operands: {},
    decode: () => [
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.MM})
    ]
};

OPCODES["popmm"] = {
    asm: `popmm`,
    pattern: "1010_0101",
    operands: {},
    decode: () => [
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.MM})
    ]
};

OPCODES["ret"] = {
    asm: `ret`,
    pattern: "1010_0111",
    operands: {},
    decode: () => [
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.PC})
    ]
};

[
    ["brs_calls_f", "1001_nfff mmix_yuw1 aaaa_aaaa", 8],
    ["br_call_f", "1001_nfff mmix_yuw0 aaaa_aaaa aaaa_aaaa", 0]
].forEach(([opcode, pattern, offset]) => {
    OPCODES[opcode] = {
        asm: `${opcode} $n $f $m $i $x $y $u $w $a`,
        pattern,
        operands: {
            n: [27 - offset, 27 - offset],
            f: [26 - offset, 24 - offset],
            m: [23 - offset, 22 - offset],
            i: [21 - offset, 21 - offset],
            x: [20 - offset, 20 - offset],
            y: [19 - offset, 19 - offset],
            u: [18 - offset, 18 - offset],
            w: [17 - offset, 17 - offset],
            s: [16 - offset, 16 - offset],
            a: [15 - offset, 0]
        },
        decode: ({ n = 0, f = 0, m = 0, i = 0, x = 0, y = 0, u = 0, w = 0, s = 0, a = 0 } = {}) => [
            // value to use if branch is taken
            // m: 0b00 === relative, 0b01 === address,
            //    0b10 === BP, 0b11 ==== D
            // i: 0b0 === absolute; 0b1 === indirect
            // if w is 1, we're a CALL
            ...(w === 1 ? [
                TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.SP,
                TASKS.PUSH_WORD | 2,
                TASKS.SUB,
                TASKS.DUP, // will leave SP on the stack after
                // we pop it back into the register file
                TASKS.POP_INTO_REGISTER | REGISTER_INDEX.SP,
                TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.PC,
                TASKS.POP_WORD_INTO_MEMORY,
            ] : []),
            ...(s === 0 ? [
                TASKS.PUSH_WORD | a
            ] : [
                    // make sure the address is sign extended
                    TASKS.PUSH_WORD | (((a & 0x80) > 0 ? 0xFF00 : 0) | a)
                ]),
            ...(m === 0 ? [
                // need this relative address turned into
                // an absolute one, thanks!
                TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.PC,
                TASKS.ADD
            ] : []),
            ...addressingTasks({ m, i, x, y, a }),
            ...(m !== 0 ? [
                    TASKS.GET_WORD_FROM_MEMORY
            ] : []),
            ...(u === 1 ? [
                // unconditional, so don't check any flags
                // as such, the address is currently on the stack
                TASKS.POP_INTO_REGISTER | REGISTER_INDEX.PC,
            ] : [
                    // we have to test to see if we branch
                    // value to use if branch isn't taken
                    TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.PC,
                    // if we're checking with NOT, SWAP!
                    (n === 1 ? TASKS.SWAP : TASKS.NOP),
                    // check flags to see which branch we should take
                    TASKS.TEST_FLAG_IMM | f,
                    //TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.FLAGS,
                    //TASKS.PUSH_BYTE | (0b1 << f),
                    //TASKS.AND,
                    // if s0 is non-zero, we branch to the desired address
                    TASKS.PICK,
                    TASKS.POP_INTO_REGISTER | REGISTER_INDEX.PC
                ])
        ]
    }
});

[
    ["loops_r", "1000_rrrr mmix_y..1 aaaa_aaaa", 8],
    ["loop_r", "1000_rrrr mmix_y..0 aaaa_aaaa aaaa_aaaa", 0],
].forEach(
    ([opcode, pattern, offset]) => {
        OPCODES[opcode] = {
            asm: `${opcode} $r $m $i $x $y $a`,
            pattern,
            operands: {
                r: [27 - offset, 24 - offset],
                m: [23 - offset, 22 - offset],
                i: [21 - offset, 21 - offset],
                x: [20 - offset, 20 - offset],
                y: [19 - offset, 19 - offset],
                s: [16 - offset, 16 - offset],
                a: [15 - offset, 0]
            },
            decode: (
                // LOOP(s) DECrements the selected register
                // then, if CARRY is set, it branches to the
                // desired address
                (opcode === "loops_r")
                ? ({ r = 0, m = 0, i = 0, x = 0, y = 0, s = 0, a = 0} = {}) => [
                    ...OPCODES["dec_r"].decode({r}),
                    ...OPCODES["brs_calls_f"].decode({n: 1, f: FLAGS_INDEX.CARRY, m, i, x, y, s, a})
                ] : ({ r = 0, m = 0, i = 0, x = 0, y = 0, s = 0, a = 0} = {}) => [
                    ...OPCODES["dec_r"].decode({r}),
                    ...OPCODES["br_call_f"].decode({n: 1, f: FLAGS_INDEX.CARRY, m, i, x, y, s, a})]
            )
        };
    }
);