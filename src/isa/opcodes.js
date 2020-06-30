import { TASKS, mapTask, FLAGS_PULL_FROM_ALU, FLAGS_PUSH_AND_PULL, FLAGS_PUSH_TO_ALU } from "./tasks.js";

import { REGISTER_INDEX, FLAGS_INDEX, RegisterFile } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import { ALU, COMMANDS, SIZES } from "../core/ALU.js";
import { IOBus } from "../core/IOBus.js";

const taskCache = new Map();
const equivCache = new Map();

const SIZE_BYTE = SIZES.BYTE;
const SIZE_WORD = SIZES.WORD;
const SIZE_ADDR = SIZES.ADDR;

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

export function decodeToTaskEquiv(instruction, { operands, equiv }) {
    const cachedInst = equivCache.get(instruction);
    let args, fn;
    if (cachedInst) {
        args = cachedInst.args;
        fn = cachedInst.fn;
    } else {
        args = _constructArgs(instruction, operands);
        fn = equiv.bind(undefined, args);
        equivCache.set(instruction, {args, fn});
    }
    return fn;
}

export function decode(instruction, opcode, useEquiv = true) {
    if (opcode.equiv && useEquiv) return decodeToTaskEquiv(instruction,opcode);
    return decodeToTasks(instruction, opcode);
}

const aluOp = ({alu, registerFile, command, op0, sz0, op1, sz1, flagHandling}) => {
    const retSize = sz1 > sz0 ? sz1 : sz0;
    alu.op1Bus.data = op0;
    alu.op2Bus.data = op1;
    alu.commandBus.data = (retSize << 8) | (sz0 << 6) | (sz1 << 4) | command;
    alu.flagsBus.data = (flagHandling & FLAGS_PUSH_TO_ALU) ? (registerFile.FLAGS & 0xF) : 0;
    alu.executeBus.signal();
    if (flagHandling & FLAGS_PULL_FROM_ALU) {
        registerFile.FLAGS = (registerFile.FLAGS & 0xF0) | alu.flagsBus.data;
        // set exception when dividing by zero
        if (command === COMMANDS.SDIV || command === COMMANDS.DIV ||
            command === COMMANDS.SMOD || command === COMMANDS.MOD) {
            if (op1 === 0) {
                registerFile.EXCEPTION = 1;
            }
        }
    }
    return alu.retBus.data;
}

export const OPCODES = {};
OPCODES["nop"] = {
    asm: "nop",
    pattern: "0000_0000",
    operands: {},
    description: "Performs no operation",
    flags: "xdshncvz",
    equiv: () => {},
    decode: () => [
        TASKS.NOP
    ]
};

//FIXME: halt is currently doing the same thing as BRK
OPCODES["halt"] = {
    asm: "halt",
    pattern: "0011_1110",
    operands: {},
    description: "Halts the processor until an interrupt occurs",
    flags: "xdshncvz",
    equiv: (_, {registerFile}) => registerFile.SINGLE_STEP = 1,
    decode: () => [
        TASKS.SET_FLAG_IMM | FLAGS_INDEX.SINGLE_STEP
    ]
};

//FIXME: wait is currently doing the same thing as BRK
OPCODES["wait"] = {
    asm: "wait $r",
    pattern: "1010_1111 bbbb_bbbb",
    operands: {b: [7, 0]},
    description: "[TODO] Waits until a specific interrupt occurs",
    flags: "xdshncvz",
    equiv: (_, {registerFile}) => registerFile.SINGLE_STEP = 1,
    decode: ({b = 0} = {}) => [
        TASKS.SET_FLAG_IMM | FLAGS_INDEX.SINGLE_STEP
    ]
};

OPCODES["brk"] = {
    asm: "brk",
    pattern: "0011_1111",
    operands: {},
    description: "Halts the processor if a debugger is attached",
    flags: "xdshncvz",
    equiv: (_, {registerFile}) => {
        registerFile.SINGLE_STEP = 1;
        registerFile.INTERRUPT_DISABLE = 1;
    },
    decode: () => [
        TASKS.SET_FLAG_IMM | FLAGS_INDEX.INTERRUPT_DISABLE,
        TASKS.SET_FLAG_IMM | FLAGS_INDEX.SINGLE_STEP
    ]
};

OPCODES["not"] = {
    asm: "not $r",
    pattern: "0000_1001 0000_rrrr",
    operands: { r: [3, 0] },
    description: "!reg",
    flags: "xdshNcvZ",
    equiv: ({r}, {alu, registerFile}) => {
        const mask = (r & 1) ? 0xFF : 0xFFFF; 
        const sign = (r & 1) ? 0x80 : 0x8000;
        const v = (~registerFile.getRegister(r)) & mask;
        registerFile.setRegister(r, v);
        registerFile.NEGATIVE = (v & sign) ? 1 : 0;
        registerFile.ZERO = v === 0 ? 1 : 0;
        /*registerFile.setRegister(r,aluOp({alu, registerFile, 
            command: COMMANDS.XOR, 
            op0: registerFile.getRegister(r), sz0: ((r & 0x01) ? SIZE_BYTE : SIZE_WORD), 
            op1: ((r & 0x01) ? 0xFF : 0xFFFF), sz1: ((r & 0x01) ? SIZE_BYTE : SIZE_WORD),
            flagHandling: FLAGS_PULL_FROM_ALU}));*/
    },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r, // a, op1
        ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | ((r & 0x01) ? 0xFF : 0xFFFF), // b, op2
        TASKS.XOR | FLAGS_PULL_FROM_ALU,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["neg"] = {
    asm: "neg $r",
    pattern: "0000_1001 0001_rrrr",
    operands: { r: [3, 0] },
    description: "-1 * reg",
    flags: "xdshNcvZ",
    equiv: ({r}, {alu, registerFile}) => {
        const mask = (r & 1) ? 0xFF : 0xFFFF; 
        const sign = (r & 1) ? 0x80 : 0x8000;
        const v = (-registerFile.getRegister(r)) & mask;
        registerFile.setRegister(r, v);
        registerFile.NEGATIVE = (v & sign) ? 1 : 0;
        registerFile.ZERO = v === 0 ? 1 : 0;
    },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r, // a
        ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | ((r & 0x01) ? 0xFF : 0xFFFF), // b
        TASKS.XOR,
        ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | 0x01,
        TASKS.ADD | FLAGS_PULL_FROM_ALU,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["exc"] = {
    asm: "exc $r",
    pattern: "0000_1001 0010_rrrr",
    operands: { r: [3, 0] },
    description: "Swaps high and low regions of the register",
    flags: "xdshNcvZ",
    equiv: ({r}, {alu, registerFile}) => {
        const mask = (r & 1) ? 0xFF : 0xFFFF; 
        const sign = (r & 1) ? 0x80 : 0x8000;
        let v = registerFile.getRegister(r);
        if (r & 1) {
            // eight bit register; swap nibbles
            v = ((v & 0x0F) << 4) | ((v & 0xF0) >> 4);
        } else {
            // word register; swap bytes
            v = ((v & 0x00FF) << 8) | ((v & 0xFF00) >> 8);
        }
        registerFile.setRegister(r, v);
        registerFile.NEGATIVE = (v & sign) ? 1 : 0;
        registerFile.ZERO = v === 0 ? 1 : 0;
    },
    decode: ({ r = 0 } = {}) => [
        TASKS.GET_REGISTER_AND_PUSH | r,
        ((r & 0x01) ? TASKS.DECOMPOSE_BYTE_TO_NIBBLE : TASKS.DECOMPOSE_WORD_TO_BYTES),
        TASKS.PUSH_WORD | ((r & 0x01) ? 4 : 8),
        TASKS.SHL,
        TASKS.OR | FLAGS_PULL_FROM_ALU,
        TASKS.POP_INTO_REGISTER | r
    ]
};

OPCODES["swap_ds"] = {
    asm: "swap $d, $s",
    pattern: "0000_1110 dddd_ssss",
    operands: { s: [3, 0], d: [7, 4] },
    description: "Swaps register values",
    flags: "xdshncvz",
    equiv: ({d, s}, {registerFile}) => {
        const dV = registerFile.getRegister(d);
        const sV = registerFile.getRegister(s);
        registerFile.setRegister(d, sV);
        registerFile.setRegister(s, dV);
    },
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
    description: "Moves value of source to dest",
    flags: "xdshncvz",
    equiv: ({d,s}, {registerFile}) => {
        const sV = registerFile.getRegister(s);
        registerFile.setRegister(d, sV);
    },
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
    ["inc", TASKS.ADD, `1100_rrrr`, COMMANDS.ADD],
    ["dec", TASKS.SUB, `1101_rrrr`, COMMANDS.SUB]
].forEach(([opcode, task, pattern, command]) => {
    OPCODES[`${opcode}_r`] = {
        asm: `${opcode} $r`,
        pattern,
        operands: { r: [3, 0] },
    description: `${opcode}rements register`,
    flags: "xdshNCVZ",
        equiv: ({r}, {registerFile, alu}) => {
            registerFile.setRegister(r,aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(r), sz0: ((r & 0x01) ? SIZE_BYTE : SIZE_WORD), 
                op1: 1,                           sz1: ((r & 0x01) ? SIZE_BYTE : SIZE_WORD),
                flagHandling: FLAGS_PULL_FROM_ALU}));
        },
        decode: ({ r = 0 } = {}) => [
            // clear carry bit; inc & dec should never be affected
            //TASKS.CLEAR_FLAG_IMM | FLAGS_INDEX.CARRY,
            // now do the real work
            TASKS.GET_REGISTER_AND_PUSH | r,
            ((r & 0b1) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | 1,
            task | FLAGS_PULL_FROM_ALU,
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
        description: `${opcode}s specified flag`,
        flags: "XDSHNCVZ",
        equiv: task === TASKS.SET_FLAG_IMM ? (({f}, {registerFile}) => registerFile.FLAGS |= 1 << f)
                                           : (({f}, {registerFile}) => registerFile.FLAGS &= ~(1 << f)),
        decode: ({ f = 0 } = {}) => [
            task | f,
        ]
    }
});

// add, sub, cmp, and, or, test, xor
[
    ["add", TASKS.ADD, "0000_0001", "0100_1dd1", "0100_1dd0", COMMANDS.ADD, FLAGS_PUSH_AND_PULL],
    ["sub", TASKS.SUB, "0000_0010", "0101_0dd1", "0101_0dd0", COMMANDS.SUB, FLAGS_PUSH_AND_PULL],
    ["cmp", TASKS.CMP, "0000_0011", "0101_1dd1", "0101_1dd0", COMMANDS.SUB, FLAGS_PULL_FROM_ALU],
    ["and", TASKS.AND, "0000_0100", "0110_0dd1", "0110_0dd0", COMMANDS.AND, FLAGS_PUSH_AND_PULL],
    ["or", TASKS.OR, "0000_0101", "0110_1dd1", "0110_1dd0", COMMANDS.OR, FLAGS_PUSH_AND_PULL],
    ["test", TASKS.TEST, "0000_0110", "0111_0dd1", "0111_0dd0", COMMANDS.TEST],    // TODO: incorrect; the alu doesn't support test ATM
    ["xor", TASKS.XOR, "0000_0111", "0111_1dd1", "0111_1dd0", COMMANDS.XOR, FLAGS_PUSH_AND_PULL],
].forEach(([opcode, task, ds, db, dw, command, flagHandling], idx) => {
    OPCODES[`${opcode}_ds`] = {
        asm: `${opcode} $d, $s`,
        pattern: `${ds} dddd_ssss`,
        operands: { s: [3, 0], d: [7, 4] },
        description: `${opcode}s dest and source, storing result in dest`,
        flags: idx < 3 ? "xdshNCVZ" : "xdshNcvZ",
        equiv: opcode==="cmp" ? (({d,s}, {registerFile, alu}) => {
            aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d), sz0: ((d & 0x01) ? SIZE_BYTE : SIZE_WORD), 
                op1: registerFile.getRegister(s), sz1: ((s & 0x01) ? SIZE_BYTE : SIZE_WORD),
                flagHandling});
        }) : (({d,s}, {registerFile, alu}) => {
            registerFile.setRegister(d,aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d), sz0: ((d & 0x01) ? SIZE_BYTE : SIZE_WORD), 
                op1: registerFile.getRegister(s), sz1: ((s & 0x01) ? SIZE_BYTE : SIZE_WORD),
                flagHandling}));
        }),
        decode: (
            opcode === "cmp"
                ? ({ d = 0, s = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | d, // a
                    TASKS.GET_REGISTER_AND_PUSH | s, // b
                    task | FLAGS_PULL_FROM_ALU
                ]
                : ({ d = 0, s = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | d, // a
                    TASKS.GET_REGISTER_AND_PUSH | s, // b
                    task | FLAGS_PUSH_AND_PULL,
                    (TASKS.POP_INTO_REGISTER | d)
                ]
        )
    };
    OPCODES[`${opcode}_db`] = {
        asm: `${opcode} $d, $b`,
        pattern: `${db} bbbb_bbbb`,
        operands: { d: [10, 9], b: [7, 0] },
        description: `${opcode}s dest and imm8, storing result in dest`,
        flags: idx < 3 ? "xdshNCVZ" : "xdshNcvZ",
        equiv: opcode==="cmp" ? (({d,b}, {registerFile, alu}) => {
            aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d*2+1), sz0:               SIZE_BYTE             , 
                op1: b                              , sz1:               SIZE_BYTE             ,
                flagHandling});
        }) : (({d,b}, {registerFile, alu}) => {
            registerFile.setRegister(d*2+1,aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d*2+1), sz0:               SIZE_BYTE             , 
                op1: b                              , sz1:               SIZE_BYTE             ,
                flagHandling}));
        }),
        decode: (
            opcode === "cmp"
                ? ({ d = 0, b = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | ((d << 1) | 1), // a
                    TASKS.PUSH_BYTE | b, //b
                    task | FLAGS_PULL_FROM_ALU
                ]
                : ({ d = 0, b = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | ((d << 1) | 1), // a
                    TASKS.PUSH_BYTE | b, //b
                    task | FLAGS_PUSH_AND_PULL,
                    (TASKS.POP_INTO_REGISTER | ((d << 1) | 1))
                ]
        )
    };
    OPCODES[`${opcode}_dw`] = {
        asm: `${opcode} $d, $w`,
        pattern: `${dw} wwww_wwww wwww_wwww`,
        operands: { d: [18, 17], w: [15, 0] },
        description: `${opcode}s dest and imm16, storing result in dest`,
        flags: idx < 3 ? "xdshNCVZ" : "xdshNcvZ",
        equiv: opcode==="cmp" ? (({d,w}, {registerFile, alu}) => {
            aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d*2), sz0:               SIZE_WORD             , 
                op1: w                            , sz1:               SIZE_WORD             ,
                flagHandling});
        }) : (({d,w}, {registerFile, alu}) => {
            registerFile.setRegister(d*2,aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d*2), sz0:               SIZE_WORD             , 
                op1: w                            , sz1:               SIZE_WORD             ,
                flagHandling}));
        }),
        decode: (
            opcode === "cmp"
                ? ({ d = 0, w = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | (d << 1), // a
                    TASKS.PUSH_WORD | w, // b
                    task | FLAGS_PULL_FROM_ALU
                ]
                : ({ d = 0, w = 0 } = {}) => [
                    TASKS.GET_REGISTER_AND_PUSH | (d << 1), // a
                    TASKS.PUSH_WORD | w, // b
                    task | FLAGS_PUSH_AND_PULL,
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
    description: "Executes the specified trap",
    flags: "xdshncvz",
    equiv: ({r}, {registerFile, memory}) => {
        OPCODES["br_call_f"].equiv({w: 1, i: 1, m: 1, a: b}, {registerFile, memory});
    },
    decode: ({ b = 0 } = {}) => [
        ...OPCODES["br_call_f"].decode({w: 1, i: 1, m: 1, a: b})
    ]
};

// FIXME: does not work!
OPCODES["trap_r"] = {
    asm: "trap $r",
    pattern: "0100_0rrr",
    operands: { r: [2, 0] },
    description: "[TODO] Executes the specified trap in the given register",
    flags: "xdshncvz",
    equiv: ({r}, {registerFile, memory}) => {},
    decode: ({ r = 0 } = {}) => [
        TASKS.NOP
    ]
};

// enter
OPCODES["enter_n"] = {
    asm: "enter $n",
    pattern: "0011_1000 nnnn_nnnn",
    operands: { n: [7, 0] },
    description: "Enters a stack frame",
    flags: "xdshncvz",
    equiv: ({n}, {registerFile, memory}) => {
        OPCODES["push_r"].equiv({r: REGISTER_INDEX.BP}, {registerFile, memory});
        OPCODES["mov_ds"].equiv({d: REGISTER_INDEX.BP, s: REGISTER_INDEX.SP}, {registerFile, memory});
        registerFile.SP -= n;
    },
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
    description: "Leaves a stack frame",
    flags: "xdshncvz",
    equiv: ({n}, {registerFile, memory}) => {
        registerFile.SP += n;
        OPCODES["pop_r"].equiv({r: REGISTER_INDEX.BP}, {registerFile, memory});
    },
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
    ["shl", TASKS.SHL, "0000_1011 dddd_ssss", COMMANDS.SHL],
    ["shr", TASKS.SHR, "0000_1101 dddd_ssss", COMMANDS.SHR],
    ["mul", TASKS.MUL, "1010_1000 dddd_ssss", COMMANDS.MUL],
    ["div", TASKS.DIV, "1010_1001 dddd_ssss", COMMANDS.DIV],
    ["mod", TASKS.MOD, "1010_1010 dddd_ssss", COMMANDS.MOD],
    ["smul", TASKS.SMUL, "1010_1011 dddd_ssss", COMMANDS.SMUL],
    ["sdiv", TASKS.SDIV, "1010_1100 dddd_ssss", COMMANDS.SDIV],
    ["smod", TASKS.SMOD, "1010_1101 dddd_ssss", COMMANDS.SMOD]
].forEach(([opcode, task, pattern, command], idx) => {
    OPCODES[`${opcode}_ds`] = {
        asm: `${opcode} $d, $s`,
        pattern,
        operands: { s: [3, 0], d: [7, 4] },
        description: `${opcode} dest and source, storing result in dest`,
        flags: idx < 2 ? "xdshNCvZ" : (opcode.indexOf("mul") > -1 ? "x" : "X") + "dshNCVZ",
        equiv: (({d=0,s=0}={}, {registerFile, alu}) => {
            registerFile.setRegister(d,aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(d), sz0: ((d & 0x01) ? SIZE_BYTE : SIZE_WORD), 
                op1: registerFile.getRegister(s), sz1: ((s & 0x01) ? SIZE_BYTE : SIZE_WORD),
                flagHandling: FLAGS_PUSH_AND_PULL}));
        }),
        decode: ({ d = 0, s = 0 } = {}) => [
            TASKS.GET_REGISTER_AND_PUSH | d, // a
            TASKS.GET_REGISTER_AND_PUSH | s, // b
            task | FLAGS_PUSH_AND_PULL,
            TASKS.POP_INTO_REGISTER | d
        ]
    }
});

// rn variants of shl, shr
[
    ["shl", TASKS.SHL, "0000_1010 rrrr_nnnn", COMMANDS.SHL],
    ["shr", TASKS.SHR, "0000_1100 rrrr_nnnn", COMMANDS.SHR]
].forEach(([opcode, task, pattern, command]) => {
    OPCODES[`${opcode}_rn`] = {
        asm: `${opcode} $r, $n`,
        pattern,
        operands: { n: [3, 0], r: [7, 4] },
        description: `${opcode} reg by specified bits`,
        flags: "xdshNCvZ",
        equiv: (({r,n}, {registerFile, alu}) => {
            registerFile.setRegister(r,aluOp({alu, registerFile, 
                command, 
                op0: registerFile.getRegister(r), sz0: ((r & 0x01) ? SIZE_BYTE : SIZE_WORD), 
                op1: n                          , sz1:               SIZE_BYTE             ,
                flagHandling: FLAGS_PUSH_AND_PULL}));
        }),
        decode: ({ r = 0, n = 0 } = {}) => [
            TASKS.GET_REGISTER_AND_PUSH | r, // a
            TASKS.PUSH_BYTE | n, // b
            task | FLAGS_PUSH_AND_PULL,
            TASKS.POP_INTO_REGISTER | r
        ]
    }
});

OPCODES["in_rp"] = {
    asm: "in $r, $p",
    pattern: "0011_0000 rrrr_0000 pppppppp",
    operands: { r: [15, 12], p: [7, 0] },
    description: "Reads a value from port and stores in reg",
    flags: "xdshncvz",
    equiv: ({r, p}, {registerFile, ioBus}) => {
        ioBus.deviceSelectBus.value = (p & 0xF0) >> 4;           // top four bits represent the device
        ioBus.addressSelectBus.value = (p & 0x0F);               // bottom four represent the address
        ioBus.commandBus.value = 0;                              // READ from bus
        ioBus.executeBus.signal();                               // send command
        registerFile.setRegister(r, ioBus.dataBus.value);
    },
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
    description: "Writes value in reg to port",
    flags: "xdshncvz",
    equiv: ({r, p}, {registerFile, ioBus}) => {
        ioBus.deviceSelectBus.value = (p & 0xF0) >> 4;            // top four bits represent the device
        ioBus.addressSelectBus.value = (p & 0x0F);                // bottom four represent the address
        ioBus.dataBus.value = registerFile.getRegister(r);        // put the data on the bus
        ioBus.commandBus.value = 1;                               // WRITE from bus
        ioBus.executeBus.signal();                                // send command
    },
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
    description: "Loads an immediate word into dest",
    flags: "xdshncvz",
    equiv: ({d, w}, {registerFile}) => {
        registerFile.setRegister(d * 2, w);
    },
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
    description: "Loads an immediate byte into dest",
    flags: "xdshncvz",
    equiv: ({d, b}, {registerFile}) => {
        registerFile.setRegister(d * 2 + 1, b);
    },
    decode: ({ d = 0, b = 0 } = {}) => [
        TASKS.PUSH_BYTE | b,
        TASKS.POP_INTO_REGISTER | ((d << 1) | 1)
    ]
};

const calcAddress = ({m,i,x,y,a},{registerFile,memory}) => {
    let addr = a;
    // m: 0b01 === address, 0b10 === BP, 0b11 ==== D
    // i: 0b0 === absolute; 0b1 === indirect
    // if we're BP or D, we need that register added to the address on the stack
    if (m === 2) addr = (addr + registerFile.BP) & 0xFFFF;
    if (m === 3) addr = (addr + (registerFile.D << 3));
    // if indexing by x, do so
    if (x === 1) addr += registerFile.X;
    // if indirect, we need memory at location
    if (i === 1) addr = (memory.readWord(addr) << 3) + memory.readWord(addr+2)
    // index by y
    if (y === 1) addr += registerFile.Y;
    return addr & 0x7FFFF;
}

const addressingTasks = ({ m = 0, i = 0, x = 0, y = 0, a = 0 } = {}) => [
    // m: 0b01 === address, 0b10 === BP, 0b11 ==== D
    // i: 0b0 === absolute; 0b1 === indirect
    // if we're BP or D, we need that register added to the address on the stack
    ...(m === 2 ? [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.BP,
        TASKS.ADD,
        TASKS.PUSH_WORD | 0xFFFF,
        TASKS.AND
    ] : m === 3 ? [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.D,
        TASKS.PUSH_WORD | 0,
        TASKS.RECOMPOSE_ADDR,
        TASKS.ADD,
    ] : []),
    // if indexing by x, do so
    ...(x === 1 ? [
        TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.X,
        // TODO: scale?
        TASKS.ADD
    ] : []),
    // if indirect, we need memory at location
    ...(i === 1 ? [
        TASKS.GET_ADDR_FROM_MEMORY,
        TASKS.RECOMPOSE_ADDR
        //TASKS.PUSH_ADDR | (a & 0x70000),
        //TASKS.OR
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
    description: "Loads a value from memory",
    flags: "xdshncvz",
    equiv: ({d,m,i,x,y,a}, {registerFile, memory}) => {
        if (d & 0x01) registerFile.setRegister(d, memory.readByte(calcAddress({m, i, x, y, a}, {registerFile, memory})))
        else          registerFile.setRegister(d, memory.readWord(calcAddress({m, i, x, y, a}, {registerFile, memory})));
    },
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
    description: "Stores a value to memory",
    flags: "xdshncvz",
    equiv: ({s,m,i,x,y,a}, {registerFile, memory}) => {
        const data = registerFile.getRegister(s);
        if (s & 0x01) memory.writeByte(calcAddress({m, i, x, y, a}, {registerFile, memory}), data)
        else          memory.writeWord(calcAddress({m, i, x, y, a}, {registerFile, memory}), data);
    },
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
    description: "Push the register on stack",
    flags: "xdshncvz",
    equiv: ({r}, {registerFile, memory}) => {
        registerFile.SP -= (r & 0b1 ? 1 : 2);
        if (r & 0b1) memory.writeByte(registerFile.SP, registerFile.getRegister(r))
        else         memory.writeWord(registerFile.SP, registerFile.getRegister(r));
    },
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
    description: "Pop top of stack into register",
    flags: "xdshncvz",
    equiv: ({r}, {registerFile, memory}) => {
        let data;
        if (r & 0b1) data = memory.readByte(registerFile.SP)
        else         data = memory.readWord(registerFile.SP);
        registerFile.SP += (r & 0b1 ? 1 : 2);
        registerFile.setRegister(r, data);
    },
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
    description: "Pushes SP, A, B, C, D, X, Y, and BP",
    flags: "xdshncvz",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.push_r.equiv({r: REGISTER_INDEX.SP}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.A}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.B}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.C}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.D}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.X}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.Y}, {registerFile, memory});
        OPCODES.push_r.equiv({r: REGISTER_INDEX.BP}, {registerFile, memory});
    },
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
    description: "Reverse of pushall",
    flags: "xdshncvz",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.BP}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.Y}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.X}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.D}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.C}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.B}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.A}, {registerFile, memory});
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.SP}, {registerFile, memory});
    },
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
    description: "Push flags onto stack",
    flags: "xdshncvz",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.push_r.equiv({r: REGISTER_INDEX.STATUS}, {registerFile, memory});
    },
    decode: () => [
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.STATUS})
    ]
};

OPCODES["popf"] = {
    asm: `popf`,
    pattern: "1010_0011",
    operands: {},
    description: "Pops flags from stack",
    flags: "XDSHNCVZ",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.STATUS}, {registerFile, memory});
    },
    decode: () => [
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.STATUS})
    ]
};

OPCODES["pushmm"] = {
    asm: `pushmm`,
    pattern: "1010_0100",
    operands: {},
    description: "Push memory map register to stack",
    flags: "xdshncvz",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.push_r.equiv({r: REGISTER_INDEX.MM}, {registerFile, memory});
    },
    decode: () => [
        ...OPCODES["push_r"].decode({r: REGISTER_INDEX.MM})
    ]
};

OPCODES["popmm"] = {
    asm: `popmm`,
    pattern: "1010_0101",
    operands: {},
    description: "Pops value on stack into memory map register",
    flags: "xdshncvz",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.MM}, {registerFile, memory});
    },
    decode: () => [
        ...OPCODES["pop_r"].decode({r: REGISTER_INDEX.MM})
    ]
};

OPCODES["ret"] = {
    asm: `ret`,
    pattern: "1010_0111",
    operands: {},
    description: "Return from subroutine",
    flags: "xdshncvz",
    equiv: ({}, {registerFile, memory}) => {
        OPCODES.pop_r.equiv({r: REGISTER_INDEX.PC}, {registerFile, memory});
    },
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
        description: "Conditional branch/call to address (U=unconditional; N=Not; W=Call)",
        flags: "xdshncvz",
        equiv: ({ n, f, m, i, x, y, u, w, s, a}, {registerFile, memory}) => {
            // value to use if branch is taken
            // m: 0b00 === relative, 0b01 === address,
            //    0b10 === BP, 0b11 ==== D
            // i: 0b0 === absolute; 0b1 === indirect
            // if w is 1, we're a CALL
            if (w === 1) OPCODES["push_r"].equiv({r: REGISTER_INDEX. PC}, {registerFile, memory}); 
            // make sure the address is sign extended
            let addr = (s === 0) ? a : (((a & 0x80) > 0 ? 0xFF00 : 0) | a);
            // need this relative address turned into
            // an absolute one, thanks!
            if (m === 0) addr = (addr + registerFile.PC) & 0x0FFFF;
            addr = calcAddress({m, i, x, y, a: addr}, {registerFile, memory});
            if (m !== 0) addr = memory.readWord(addr);
            if (u === 1) {
                // unconditional, so don't check any flags
                // as such, the address is currently on the stack
                registerFile.PC = addr;
            } else {
                    let flagValue = (registerFile.FLAGS & (1<<f)) ? 1 : 0;
                    if (n === 1) flagValue = 1 - flagValue;
                    if (flagValue === 1) registerFile.PC = addr;
            }
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
            description: "Decrements register and branches if carry is not set",
            flags: "xdshncvz",
            equiv: (opcode === "loops_r") 
                   ? ({ r, m, i, x, y, s, a}, {registerFile, memory, alu}) => {
                    OPCODES["dec_r"].equiv({r}, {registerFile, memory, alu}),
                    OPCODES["brs_calls_f"].equiv({n: 1, f: FLAGS_INDEX.CARRY, m, i, x, y, s, a}, {registerFile, memory})
                   }
                   : ({ r, m, i, x, y, s, a}, {registerFile, memory, alu}) => {
                    OPCODES["dec_r"].equiv({r}, {registerFile, memory, alu}),
                    OPCODES["br_call_f"].equiv({n: 1, f: FLAGS_INDEX.CARRY, m, i, x, y, s, a}, {registerFile, memory})
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