import test from "ava";

import { ALU, COMMANDS, SIZES } from "../src/core/ALU.js";

test("Can create an ALU", (t) => {
    let alu;
    t.notThrows(() => { alu = new ALU(); });
});

const sizeMapping = [8, 16, 19];
sizeMapping[SIZES.OP1_8] = 8;
sizeMapping[SIZES.OP1_16] = 16;
sizeMapping[SIZES.OP1_19] = 19;
sizeMapping[SIZES.OP2_8] = 8;
sizeMapping[SIZES.OP2_16] = 16;
sizeMapping[SIZES.OP2_19] = 19;
sizeMapping[SIZES.RET_8] = 8;
sizeMapping[SIZES.RET_16] = 16;
sizeMapping[SIZES.RET_19] = 19;
const uMasks = [0xFF, 0xFFFF, 0x7FFFF];
const sMasks = [0x7F, 0x7FFF, 0x3FFFF];
const negs = [-128, -32768, -524288];

/**
 * @param {*} t
 * @param {*} param1
 * @param {*} param2
 */
function aluMacro(t, {a, b, sizeOfA, sizeOfB, checkFlags, command} = {}, {maskedRet, ret, sizeOfRet, flags} = {}) {
    const alu = new ALU();
    alu.op1Bus.data = a;
    alu.op2Bus.data = b;
    alu.flagsBus.data = 0;
    alu.commandBus.data = sizeOfRet | sizeOfA | sizeOfB | command;
    alu.executeBus.signal();
    t.is(alu.retBus.data, maskedRet);
    const f = alu.flagsBus.data;
    t.is((f & checkFlags).toString(2).padStart(4, "0"), flags.toString(2).padStart(4, "0"));
}
const commandMap = {
    [COMMANDS.ADD]: "+",
    [COMMANDS.SUB]: "-",
    [COMMANDS.MUL]: "*",
    [COMMANDS.DIV]: "/",
    [COMMANDS.MOD]: "%",
    [COMMANDS.SMUL]: "*",
    [COMMANDS.SDIV]: "/",
    [COMMANDS.SMOD]: "%",
    [COMMANDS.AND]: "and",
    [COMMANDS.AND]: "and",
    [COMMANDS.OR]: "or",
    [COMMANDS.XOR]: "xor",
    [COMMANDS.SHL]: "<<",
    [COMMANDS.SHR]: ">>",
    [COMMANDS.NOT]: "not",
    [COMMANDS.NEG]: "neg"
};
aluMacro.title = function(title = "", {a, b, sizeOfA, sizeOfB, checkFlags, command}, {maskedRet, ret, sizeOfRet, flags}) {
    return `${title}: ${a}(${sizeMapping[sizeOfA]}) ${commandMap[command]} ${b}(${sizeMapping[sizeOfB]}) = ${ret}[${maskedRet}](${sizeMapping[sizeOfRet]}) with flags ${flags.toString(2).padStart(4, "0")}(${checkFlags.toString(2).padStart(4, "0")}, NCVZ)`;
}

const aSizes = [SIZES.OP1_8, SIZES.OP1_16, SIZES.OP1_19];
const bSizes = [SIZES.OP2_8, SIZES.OP2_16, SIZES.OP2_19];
const rSizes = [SIZES.RET_8, SIZES.RET_16, SIZES.RET_19];
const uRanges = [
    { min: 0, max: 0x000FF, incA: 19, incB: 13, signed: -128, nums: [0, 1, 2, 3, 5, 11, 15, 32, 63, 127, 192, 255]},
    { min: 0, max: 0x0FFFF, incA: 1523, incB: 2334, signed: -32768, nums: [0, 1, 2, 3, 5, 11, 32, 255, 1594, 21852, 32767, 49152, 65535]},
    { min: 0, max: 0x7FFFF, incA: 5941, incB: 4193, nums: [0x00, 0x01, 0x02, 0x03, 0x05, 0x11, 0x20, 0x80, 0xFF, 0xFFF, 0xFFFF, 0x10000, 0x20000, 0x30000, 0x40000, 0x2FFFF]}
];

for (let aIdx = 0; aIdx < 3; aIdx++) {
    for (let bIdx = 0; bIdx < 3; bIdx++) {
        for (let rIdx = 0; rIdx < 3; rIdx++) {
            const testPath = [aIdx, bIdx, rIdx].join(".");
            //if (rIdx < aIdx || rIdx < bIdx) { break; }
            //if (testPath !== "0.0.1") { continue; }
            const uMask = uMasks[rIdx];
            const sMask = sMasks[rIdx];
            const uARange = uRanges[aIdx];
            const uBRange = uRanges[bIdx];
            const sizeA = aSizes[aIdx];
            const sizeB = bSizes[bIdx];
            const sizeR = rSizes[rIdx];
            const signed = uRanges[rIdx].signed;
            const signedA = uRanges[aIdx].signed;
            const signedB = uRanges[bIdx].signed;

            for (let a of uARange.nums) {
                for (let b of uBRange.nums) {
                    // Unsigned Addition
                    {
                        const ret = a + b;
                        const maskedRet = ret & uMask;
                        const checkFlags = 0b1101;
                        const expectedFlags = ((maskedRet > sMask) ? 0b1000 : 0) |
                                            ((ret > uMask) ? 0b0100 : 0) |
                                            ((maskedRet === 0) ? 1 : 0);
                        test(`U:Add(${sizeMapping[aIdx]}, ${sizeMapping[bIdx]}, ${sizeMapping[rIdx]})`, aluMacro, {a, b, sizeOfA: sizeA, sizeOfB: sizeB, command: COMMANDS.ADD, checkFlags}, {ret, maskedRet, sizeOfRet: sizeR, flags: expectedFlags});
                    }
                    // Unsigned Subtraction
                    {
                        const ret = a - b;
                        const maskedRet = ret & uMask;
                        const checkFlags = 0b1101;
                        const expectedFlags = ((maskedRet > sMask) ? 0b1000 : 0) |
                                            ((a - b < 0) ? 0b0100 : 0) |
                                            ((ret > uMask) ? 0b0100 : 0) |
                                            ((maskedRet === 0) ? 1 : 0);
                        test(`U:Sub(${sizeMapping[aIdx]}, ${sizeMapping[bIdx]}, ${sizeMapping[rIdx]})`, aluMacro, {a, b, sizeOfA: sizeA, sizeOfB: sizeB, command: COMMANDS.SUB, checkFlags}, {ret, maskedRet, sizeOfRet: sizeR, flags: expectedFlags});
                    }
                    // Unsigned Multiplication
                    {
                        const ret = a * b;
                        const maskedRet = ret & uMask;
                        const checkFlags = 0b1101;
                        const expectedFlags = ((maskedRet > sMask) ? 0b1000 : 0) |
                                            ((ret > uMask) ? 0b0100 : 0) |
                                            ((maskedRet === 0) ? 1 : 0);
                        //test(`U:Mul(${sizeMapping[aIdx]}, ${sizeMapping[bIdx]}, ${sizeMapping[rIdx]})`, aluMacro, {a, b, sizeOfA: sizeA, sizeOfB: sizeB, command: COMMANDS.MUL, checkFlags}, {ret, maskedRet, sizeOfRet: sizeR, flags: expectedFlags});
                    }

                    if (signed !== undefined && aIdx === rIdx && bIdx === rIdx ) {
                        // run signed arithmetic tests as well, only where it makes
                        // sense (the bit widths on all operands and result must
                        // be identical)
                        const sA = a + signedA;
                        const sB = b + signedB;
                        const neg = negs[rIdx];
                        // Signed Addition
                        {
                            const ret = sA + sB;
                            const maskedRet = ret & uMask;
                            const checkFlags = 0b1011;
                            const expectedFlags = ((maskedRet > sMask) ? 0b1000 : 0) |
                                                ((ret < neg || ret > sMask) ? 0b0010 : 0) |
                                                (((ret & uMask) === 0) ? 1 : 0);
                            test(`S:Add(${sizeMapping[aIdx]}, ${sizeMapping[bIdx]}, ${sizeMapping[rIdx]})`, aluMacro, {a: sA, b: sB, sizeOfA: sizeA, sizeOfB: sizeB, command: COMMANDS.ADD, checkFlags}, {ret, maskedRet, sizeOfRet: sizeR, flags: expectedFlags});
                        }
                        // Signed Subtraction
                        {
                            const ret = sA - sB;
                            const maskedRet = ret & uMask;
                            const checkFlags = 0b1011;
                            const expectedFlags = ((maskedRet > sMask) ? 0b1000 : 0) |
                                                ((ret < neg || ret > sMask) ? 0b0010 : 0) |
                                                (((ret & uMask) === 0) ? 1 : 0);
                            test(`S:Sub(${sizeMapping[aIdx]}, ${sizeMapping[bIdx]}, ${sizeMapping[rIdx]})`, aluMacro, {a: sA, b: sB, sizeOfA: sizeA, sizeOfB: sizeB, command: COMMANDS.SUB, checkFlags}, {ret, maskedRet, sizeOfRet: sizeR, flags: expectedFlags});
                        }
                        // Signed Multiplication
                        /* INVALID currently
                        {
                            const ret = sA * sB;
                            const maskedRet = ret & uMask;
                            const checkFlags = 0b1011;
                            const expectedFlags = ((maskedRet > sMask) ? 0b1000 : 0) |
                                                ((ret < neg || ret > sMask) ? 0b0010 : 0) |
                                                (((ret & uMask) === 0) ? 1 : 0);
                            test(`S:Mul(${sizeMapping[aIdx]}, ${sizeMapping[bIdx]}, ${sizeMapping[rIdx]})`, aluMacro, {a: sA, b: sB, sizeOfA: sizeA, sizeOfB: sizeB, command: COMMANDS.MULTIPLY, checkFlags}, {ret, maskedRet, sizeOfRet: sizeR, flags: expectedFlags});
                        }
                        */
                    }
                }
            }
        }
    }
}


/*
for (let a = 0; a <= 255; a += 5) {
    for (let b = 0; b <= 255; b += 7) {
        const ret = a + b;
        const maskedRet = ret & 0xFF;
        const checkFlags = 0b1101;
        const expectedFlags = ((maskedRet > 127) ? 0b1000 : 0) |
                              ((ret > 0XFF) ? 0b0100 : 0) |
                              (((ret & 0xFF) === 0) ? 1 : 0);
        test("U:Add(8)", aluMacro, {a, b, sizeOfA: SIZES.OP1_8, sizeOfB: SIZES.OP2_8, command: COMMANDS.ADD, checkFlags}, {ret, maskedRet, sizeOfRet: SIZES.RET_8, flags: expectedFlags});
    }
}
for (let a = 0; a <= 65536; a += 1523) {
    for (let b = 0; b <= 65536; b += 2334) {
        const ret = a + b;
        const maskedRet = ret & 0xFFFF;
        const checkFlags = 0b1101;
        const expectedFlags = ((maskedRet > 32767) ? 0b1000 : 0) |
                              ((ret > 0xFFFF) ? 0b0100 : 0) |
                              (((ret & 0xFFFF) === 0) ? 1 : 0);
        test("U:Add(16)", aluMacro, {a, b, sizeOfA: SIZES.OP1_16, sizeOfB: SIZES.OP2_16, command: COMMANDS.ADD, checkFlags}, {ret, maskedRet, sizeOfRet: SIZES.RET_16, flags: expectedFlags});
    }
}

for (let a = -128; a <= 127; a += 5) {
    for (let b = -128; b <= 127; b += 7) {
        const ret = a + b;
        const maskedRet = ret & 0xFF;
        const checkFlags = 0b1011;
        const expectedFlags = ((maskedRet > 127) ? 0b1000 : 0) |
                              ((ret < -128) || (ret > 127) ? 0b0010 : 0) |
                              (((ret & 0xFF) === 0) ? 1 : 0);
        test("S:Add(8)", aluMacro, {a, b, sizeOfA: SIZES.OP1_8, sizeOfB: SIZES.OP2_8, command: COMMANDS.ADD, checkFlags}, {ret, maskedRet, sizeOfRet: SIZES.RET_8, flags: expectedFlags});
    }
}
for (let a = 0; a <= 255; a += 5) {
    for (let b = 0; b <= 255; b += 7) {
        const ret = a - b;
        const maskedRet = ret & 0xFF;
        const checkFlags = 0b1101;
        const expectedFlags = ((maskedRet > 127) ? 0b1000 : 0) |
                              (((ret & 0xFF) === 0) ? 1 : 0);
        test("U:Sub(8)", aluMacro, {a, b, sizeOfA: SIZES.OP1_8, sizeOfB: SIZES.OP2_8, command: COMMANDS.SUBTRACT, checkFlags}, {ret, maskedRet, sizeOfRet: SIZES.RET_8, flags: expectedFlags});
    }
}
for (let a = -128; a <= 127; a += 5) {
    for (let b = -128; b <= 127; b += 7) {
        const ret = a - b;
        const maskedRet = ret & 0xFF;
        const checkFlags = 0b1011;
        const expectedFlags = ((maskedRet > 127) ? 0b1000 : 0) |
                              ((ret < -128 || ret > 127) ? 0b0010 : 0) |
                              (((ret & 0xFF) === 0) ? 1 : 0);
        test("S:Sub(8)", aluMacro, {a, b, sizeOfA: SIZES.OP1_8, sizeOfB: SIZES.OP2_8, command: COMMANDS.SUBTRACT, checkFlags}, {ret, maskedRet, sizeOfRet: SIZES.RET_8, flags: expectedFlags});
    }
}
*/

/*

const a = 127;
const b = -2;
        const ret = a - b;
        const maskedRet = ret & 0xFF;
        const checkFlags = 0b1011;
        const expectedFlags = ((maskedRet > 127) ? 0b1000 : 0) |
                              ((ret < -128 || ret > 127) ? 0b0010 : 0) |
                              (((ret & 0xFF) === 0) ? 1 : 0);
        test("S:Sub(8)", aluMacro, {a, b, sizeOfA: SIZES.OP1_8, sizeOfB: SIZES.OP2_8, command: COMMANDS.SUBTRACT, checkFlags}, {ret, maskedRet, sizeOfRet: SIZES.RET_8, flags: expectedFlags});
*/
