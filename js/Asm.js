import hexUtils from "./hexUtils.js";

export class OperandExpectedError extends Error {
    constructor(extra) {
        super(`Operand expected`);
        this.code = 0x8001;
    }
}

export class RegisterExpectedError extends Error {
    constructor(extra) {
        super(`Register expected; got ${extra}`);
        this.code = 0x8030;
    }
}

export class BankRegisterExpectedError extends Error {
    constructor(extra) {
        super(`Bank register expected; got ${extra}`);
        this.code = 0x8033;
    }
}

export class UnsignedByteExpectedError extends Error {
    constructor(extra) {
        super(`Unsigned byte value expected; got ${extra}`);
        this.code = 0x8010;
    }
}

export class SignedByteExpectedError extends Error {
    constructor(extra) {
        super(`Signed byte value expected; got ${extra}`);
        this.code = 0x8011;
    }
}

export class UnsignedWordExpectedError extends Error {
    constructor(extra) {
        super(`Unsigned word value expected; got ${extra}`);
        this.code = 0x8012;
    }
}

export class UnsignedValueOutOfRange extends Error {
    constructor(extra, lo, hi) {
        super(`Unsigned value out of range; got ${extra}, expected ${lo} to ${hi}`);
        this.code = 0x8015;
    }
}

export class SignedWordExpectedError extends Error {
    constructor(extra) {
        super(`Signed word value expected; got ${extra}`);
        this.code = 0x8013;
    }
}

export class BankExpectedError extends Error {
    constructor(extra) {
        super(`Bank value expected; got ${extra}`);
        this.code = 0x8014;
    }
}

export class AddressExpectedError extends Error {
    constructor(extra) {
        super(`Address expected; got ${extra}`);
        this.code = 0x8020;
    }
}

export class ALExpectedError extends Error {
    constructor(extra) {
        super(`AL(8) register expected; got ${extra}`);
        this.code = 0x8031;
    }
}

export class AExpectedError extends Error {
    constructor(extra) {
        super(`A(16) register expected; got ${extra}`);
        this.code = 0x8032;
    }
}

export class CExpectedError extends Error {
    constructor(extra) {
        super(`C(16) register expected; got ${extra}`);
        this.code = 0x8034;
    }
}

export class XExpectedError extends Error {
    constructor(extra) {
        super(`X(16) register expected; got ${extra}`);
        this.code = 0x8038;
    }
}

export class YExpectedError extends Error {
    constructor(extra) {
        super(`Y(16) register expected; got ${extra}`);
        this.code = 0x8039;
    }
}

export class BPExpectedError extends Error {
    constructor(extra) {
        super(`BP register expected; got ${extra}`);
        this.code = 0x803A;
    }
}

export class DExpectedError extends Error {
    constructor(extra) {
        super(`D(16) register expected; got ${extra}`);
        this.code = 0x803B;
    }
}

export class PushRegisterExpectedError extends Error {
    constructor(extra) {
        super(`Valid PUSH register expected; got ${extra}`);
        this.code = 0x8036;
    }
}

export class PopRegisterExpectedError extends Error {
    constructor(extra) {
        super(`Valid POP register expected; got ${extra}`);
        this.code = 0x8037;
    }
}

export class FlagExpectedError extends Error {
    constructor(extra) {
        super(`Flag expected; got ${extra}`);
        this.code = 0x8040;
    }
}

export class ExpectedSymbol extends Error {
    constructor(whichSymbol, got) {
        super (`Expected ${whichSymbol}, got ${got}`);
        this.code = 0x8050;
    }
}

export class UnexpectedAssemblyError extends Error {
    constructor(expected, got) {
        super(`Unexpected assembly; expected ${hexUtils.byteArrayToHex(expected)}; got ${hexUtils.byteArrayToHex(got)}`);
        this.code = 0xFF00;
    }
}

export class UnexpectedTokenError extends Error {
    constructor(extra) {
        super(`Got an unexpected token: ${JSON.stringify(extra)}`);
        this.code = 0xFFFF;
    }
}

let validRegisters = ["a", "al", "b", "bl", "c", "cl", "d", "dl", "x", "xl", "y", "yl",
                      "sp", "bp", "sb", "db", "flags", "pc"];
let validByteRegisters = ["al", "bl", "cl", "dl", "xl", "yl"];
let validByteDataRegisters = ["al", "bl", "cl", "dl"];
let validWordRegisters = ["a", "b", "c", "d", "x", "y", "sp", "bp"];
let validPushRegisters = ["a", "b", "c", "d", "x", "y", "sp", "bp", "sb", "db", "flags", "pc"];
let validPopRegisters = ["a", "b", "c", "d", "x", "y", "sp", "bp", "sb", "db", "flags"];
let validWordDataRegisters = ["a", "b", "c", "d"];
let validBankRegisters = ["sb", "db"];
let validIndexRegisters = ["x", "y"];
let validXRegister = "x";
let validYRegister = "y";
let validDataRegister = "d";
let validAccumulatorWordRegister = "a";
let validAccumulatorByteRegister = "al";
let validAccumulatorRegisters = ["a", "al"];
let validFlagsRegister = "flags";
let validBasePointerRegister = "bp";
let validCounterWordRegister = "c";

let registerMap = {
    a: 0, al: 0, b: 1, bl: 1,
    c: 2, cl: 2, d: 3, dl: 3,
    x: 4, xl: 4, y: 5, yl: 5,
    sp: 6, bp: 7, sb: 12, db: 13,
    flags: 14, pc: 15
};

let bankRegisterOffset = 12;

let validFlags = ["i", "m", "x", "o", "c", "n", "z"];
let flagMap = {
    i: 7, m: 6, x: 5,
    o: 3, c: 2, n: 1, z: 0
};

/**
 * 
 * Removes undefined, null, or empty items from an array
 * @param {Array} arr
 * @returns {Array}
 */
function shrinkArray(arr) {
    let newArr = [];
    arr.forEach(i => (i !== undefined && i !== null && i !== "") ? newArr.push(i) : undefined);
    return newArr;
}

/**
 * Returns a mapped value from a mapping list if the original value is found in a valid list
 * or throws the desired error.
 * 
 * @param {Array} validList
 * @param {Array} mappingList
 * @param {string} item
 * @param {Error} ErrorToThrow
 * @returns any
 */
function mappedListItem(validList, mappingList, item, ErrorToThrow) {
    if (validList.findIndex(r => r === item) < 0) {
        throw new ErrorToThrow(item);
    }
    return mappingList[item];
}

/**
 * returns a string converted to a number, provided it is within the range lo to hi,
 * and can be converted. Otherwise the desired error is thrown.
 * 
 * @param {string} str
 * @param {number} lo
 * @param {number} hi
 * @param {Error} ErrorToThrow
 * @returns number
 */
function toNumberInRange(str, lo, hi, ErrorToThrow) {
    let n = Number(str).valueOf();
    if (n<lo || n>hi || Number.isNaN(n)) {
        throw new ErrorToThrow(str, lo, hi);
    }
    return n;
}

function dissectAddress(operand) {
    /*
     * Addresses can take the following form:
     * 
     * [ or (, indicating Absolute or Indirect
     * Either BP+number, D, or number
     * Optionally +x
     * Optionally +y if in absolute
     * ] or ) (must match start)
     * Optionally +y if in indirect
     */
    let address = {
        direct: false,
        indirect: false,
        mode: undefined,
        addr: undefined,
        reg: undefined,
        indexByX: false,
        indexByY: false
    };
    let operands = shrinkArray(operand.split(/[\s\+\[\]\(\)]+/));

    switch (operand.substr(0,1)) {
        case "[":
            address.direct = true;
            if (operand[operand.length-1] !== "]") {
                throw new ExpectedSymbol("Bracket", operand);
            }
            break;
        case "(":
            address.indirect = true;
            if (operand[operand.length-3] !== ")" &&
                operand[operand.length-1] !== ")") {
                throw new ExpectedSymbol("Parentheses", operand);
            }
            break;
        default:
            throw new ExpectedSymbol("Parentheses or Bracket", operand);
    }

    address.reg = expectOperand(operands, {type: "bp", throws: false});
    if (address.reg === undefined) {
        address.reg = expectOperand(operands, {type: "d16", throws: false});
    }
    if (address.reg === registerMap.bp) {
        address.addr = expectOperand(operands, {type: "s16", throws: false});
    } else if (address.reg === undefined) {
        address.addr = expectOperand(operands, {type: "u16", throws: false});
    }

    address.indexByX = !!expectOperand(operands, {type: "x16", throws: false});
    address.indexByY = !!expectOperand(operands, {type: "y16", throws: false});

    if (operands.length !== 0) {
        throw new UnexpectedTokenError(operands);
    }

    if (address.direct) {
        address.mode = (address.reg === registerMap.bp ? 4 : (address.reg === registerMap.d ? 6 : 2));
    } if (address.indirect) {
        address.mode = (address.reg === registerMap.bp ? 5 : (address.reg === registerMap.d ? 7 : 3));
    }

    return address;

}

function expectOperand(operands=[], {type="any", throws=true, eats=true} = {}) {
    let operand = eats ? operands.shift() : operands[0];
    let b, w;
    try {
        if (operand === undefined || operand === null) {
            throw new OperandExpectedError();
        }

        switch (type) {
            case "*":
                return operand;
            case "f":     return mappedListItem(validFlags,                     flagMap,     operand, FlagExpectedError);
            case "r":     return mappedListItem(validRegisters,                 registerMap, operand, RegisterExpectedError);
            case "pushr": return mappedListItem(validPushRegisters,             registerMap, operand, PushRegisterExpectedError);
            case "popr":  return mappedListItem(validPopRegisters,              registerMap, operand, PopRegisterExpectedError);
            case "r16":   return mappedListItem(validWordRegisters,             registerMap, operand, RegisterExpectedError);
            case "r8":    return mappedListItem(validByteRegisters,             registerMap, operand, RegisterExpectedError);
            case "dr16":  return mappedListItem(validWordDataRegisters,         registerMap, operand, RegisterExpectedError);
            case "dr8":   return mappedListItem(validByteDataRegisters,         registerMap, operand, RegisterExpectedError);
            case "c16":   return mappedListItem([validCounterWordRegister],     registerMap, operand, CExpectedError);
            case "a16":   return mappedListItem([validAccumulatorWordRegister], registerMap, operand, AExpectedError);
            case "a8":    return mappedListItem([validAccumulatorByteRegister], registerMap, operand, ALExpectedError);
            case "a":     return mappedListItem(validAccumulatorRegisters,      registerMap, operand, RegisterExpectedError);
            case "d16":   return mappedListItem([validDataRegister],            registerMap, operand, DExpectedError);
            case "x16":   return mappedListItem([validXRegister],               registerMap, operand, XExpectedError);
            case "y16":   return mappedListItem([validYRegister],               registerMap, operand, YExpectedError);
            case "bp":    return mappedListItem([validBasePointerRegister],     registerMap, operand, BPExpectedError);
            case "br":    return mappedListItem(validBankRegisters,             registerMap, operand, BankRegisterExpectedError);
            case "u2":    return toNumberInRange(operand, 0, 3, UnsignedValueOutOfRange);
            case "u3":    return toNumberInRange(operand, 0, 7, UnsignedValueOutOfRange);
            case "u4":    return toNumberInRange(operand, 0, 15, UnsignedValueOutOfRange);
            case "u8":    return toNumberInRange(operand, 0, 255, UnsignedByteExpectedError);
            case "s8":    return toNumberInRange(operand, -128, 127, SignedByteExpectedError);
            case "n8":    return toNumberInRange(operand, -128, 255, SignedWordExpectedError);
            case "u16":   return toNumberInRange(operand, 0, 65535, UnsignedWordExpectedError);
            case "s16":   return toNumberInRange(operand, -32768, 32767, SignedWordExpectedError);
            case "n16":   return toNumberInRange(operand, -32768, 65535, SignedWordExpectedError);
            case "bankvalue": return toNumberInRange(operand, 0, 3, BankExpectedError);
            case "address": return dissectAddress(operand);
        }

        throw new UnexpectedTokenError(operands);
    } catch (err) {
        if (throws) {
            throw err;
        } else {
            if (eats) { 
                if (operand !== undefined && operand !== null) {
                    operands.unshift(operand);
                }
            }
            return undefined;
        }
    }
}

export default class Asm {
    static parseSingleInstruction(text = "") {
        let results = {
            directive: "",
            label: "",
            opcode: "",
            operands: [],
            comment: "",
            expectedAssembly: []
        }

        // get comment, if it exists (form: # comment)
        let r = text.split("#");
        results.comment = r[1] || "";

        // get expected assembly results, if present (form => 00,00,00)
        r = (r[0] ? r[0] : "").split("=>");
        results.expectedAssembly = shrinkArray((r[1] ? r[1] : "").split(" ")).map(i => parseInt(i, 16));

        r = shrinkArray((r[0] ? r[0] : "").split(/[\s,\:=\*]+/));

        if (r.length < 1) {
            // no need to go further; we're done
            return results;
        }

        // do we have a directive (of the form .directive)?
        let matches;
        if (matches = r[0].match(/\.([A-Za-z0-9]+)/)) {
            results.directive = matches[1].toLowerCase();
            r.shift();
        }

        if (r.length < 1) {
            return results;
        }

        // is there a label (of the form label>)
        if (matches = r[0].match(/([\_\-A-Za-z0-9]+)\>/)) {
            results.label = matches[0].toLowerCase();
            r.shift();
        }

        if (r.length < 1) {
            return results;
        }

        // next has to be an operand, if it exists
        results.opcode = r[0].toLowerCase();
        r.shift();

        results.operands = r.map(i => i.toLowerCase());

        return results;
    }
    static assembleSingleInstruction(text = "") {
        let r = Asm.parseSingleInstruction(text);
        let instruction = [];
        if (r.opcode === "") {
            return instruction;
        }
        let op1, op2, op3, op4, op5, scale;
        let translate;
        let ops = r.operands;

        switch (r.opcode) {
            case "nop": 
                instruction.push(0x00);
                break;
            case "ret":
                instruction.push(0xFF);
                break;
            case "enter":   // enter imm8
                instruction.push(0x01, expectOperand(ops, {type: "u8"}));
                break;
            case "exit":    // exit imm8
                instruction.push(0x02, expectOperand(ops, {type: "u8"}));
                break;
            case "trap":    // trap al|imm8
                if ((op1 = expectOperand(ops, {type: "u8", throws: false})) !== undefined) {
                    instruction.push(0x06, 0x01, op1);
                } else if (expectOperand(ops, {type: "a8"}) !== undefined) {
                    instruction.push(0x03);
                }
                break;
            case "add":     // add drg, srg
            case "sub":     // sub drg, srg
            case "xor":     // xor drg, srg
            case "cmp":     // cmp drg, srg
            case "and":     // and drg, srg
            case "or":      // or  drg, srg
                translate={
                    add: [0x04, 0b00000000], 
                    sub: [0x04, 0b01000000], 
                    xor: [0x04, 0b10000000], 
                    cmp: [0x04, 0b11000000],
                    and: [0x05, 0b10000000],
                    or:  [0x05, 0b11000000]
                };
                op1 = expectOperand(ops, {type: "r16"});
                op2 = expectOperand(ops, {type: "r16"});
                instruction.push(translate[r.opcode][0], translate[r.opcode][1] | (op1 << 3) | op2);
                break;
            case "shl":     // shl reg, # times
            case "shr":     // shr reg, # times
                op1 = expectOperand(ops, {type: "r16"});
                op2 = expectOperand(ops, {type: "u3"});
                instruction.push(0x05, (r.opcode === "shl" ? 0b00000000 : 0b01000000) | (op1 << 3) | op2);
                break;
            case "neg":     // neg reg
            case "xcb":     // xcb reg
                op1 = expectOperand(ops, {type: "r16"});
                instruction.push(0x06, (r.opcode === "neg" ? 0x08 : 0x10), op1);
                break;
            case "mul":     // mul drg, srg
            case "idiv":    // idiv drg, srg
            case "imod":    // imod drg, srg
                translate={
                    mul: 0x40,
                    idiv: 0x41,
                    imod: 0x42
                };
                op1 = expectOperand(ops, {type: "r16"});
                op2 = expectOperand(ops, {type: "r16"});
                instruction.push(0x06, translate[r.opcode], (op1 << 3) | op2);
                break;
            case "mfill":   // mfill br [:] drg, srg [*] C
            case "mswap":   // mswap br [:] drg, br [:] srg [*] C
            case "mcopy":   // mcopy br [:] drg, br [:] srg [*] C
                translate = {
                    mfill: 0x6D,
                    mswap: 0x6E,
                    mcopy: 0x6F
                };
                op1 = expectOperand(ops, {type: "br"}) - bankRegisterOffset;
                op2 = expectOperand(ops, {type: "r16"});
                if (r.opcode !== "mfill") {
                    op3 = expectOperand(ops, {type:"br"}) - bankRegisterOffset;
                } else {
                    op3 = 0;
                }
                op4 = expectOperand(ops, {type: "r16"});
                op5 = expectOperand(ops, {type: "c16"});
                instruction.push(0x06, translate[r.opcode], (op1 << 7) | (op3 << 6) | (op2 << 3) | op4);
                break;
            case "in":      // in drg, port
            case "out":     // out srg, port
                op1 = expectOperand(ops, {type: "r8"});
                op2 = expectOperand(ops, {type: "u8"});
                instruction.push(0x06, 0b01110000 | (r.opcode !== "in" ? 0b00001000 : 0) | op1, op2);
                break;
            case "swap":    // swap drg, srg
                op1 = expectOperand(ops, {type: "r16"});
                op2 = expectOperand(ops, {type: "r16"});
                instruction.push(0x06, 0b11000000 | (op1 << 3) | op2);
                break;
            case "inc":     // inc reg
            case "dec":     // dec reg
                op1 = expectOperand(ops, {type: "r16"});
                instruction.push(0b00010000 | (r.opcode !== "inc" ? 0b00001000 : 0) | op1);
                break;
            case "if":      // if flag
            case "ifn":     // ifn flag
            case "set":     // set flag
            case "clr":     // clr flag
                translate = {
                    if:  0b00100000,
                    ifn: 0b00101000,
                    set: 0b00110000,
                    clr: 0b00111000
                }
                op1 = expectOperand(ops, {type: "f"});
                instruction.push(translate[r.opcode] | op1);
                break;
            case "push":    // push reg
            case "pop":     // pop reg
                op1 = expectOperand(ops, {type: (r.opcode === "push" ? "pushr" : "popr")});
                instruction.push((r.opcode === "push" ? 0b11100000 : 0b11110000) | op1);
                break;
            case "br":      // br address
            case "call":    // call address
                if ((op1 = expectOperand(ops, {type: "s16", throws: false})) !== undefined) {
                    instruction.push (0x07, (r.opcode === "br" ? 0b00000001 : 0b01000001), (op1 & 0xFF00) >> 8, (op1 & 0xFF));
                } else {
                    op1 = expectOperand(ops, {type: "address"});
                    instruction.push (0x07, (r.opcode === "br" ? 0b00000001 : 0b01000001) |
                                            (op1.mode << 3) | 
                                            (op1.indexByX ? 0b00000100 : 0) |
                                            (op1.indexByY ? 0b00000010 : 0), (op1.addr & 0xFF00) >> 8, (op1.addr & 0xFF));
                }
                break;
            case "lds":      // lds a(l), ...
            case "sts":      // sts a(l), ...
            case "ldd":      // ldd a(l), ...
            case "std":      // std a(l), ...
                translate = {
                    lds: [undefined, 0b01000000],
                    std: [undefined, 0b10000000],
                    ldd: [0x07,      0b10000000],
                    sts: [0x07,      0b11000000]
                }
                op1 = expectOperand(ops, {type: "a8", throws: false});
                scale = 1;
                if (op1 === undefined) {
                    op1 = expectOperand(ops, {type: "a16"});
                    scale = 2;
                }
                if ((op2 = expectOperand(ops, {type: (scale === 1 ? "n8" : "n16"), throws: false})) !== undefined) {
                    if (translate[r.opcode][0]) {
                        instruction.push(translate[r.opcode][0]);
                    }
                    instruction.push(translate[r.opcode][1] |
                                            (scale === 2 ? 0b00001000 : 0) | 
                                            (scale === 2 ? 0b00000001 : 0));
                    if (scale === 1) {
                        instruction.push ((op2 & 0xFF));
                    } else {
                        instruction.push ((op2 & 0xFF00) >> 8, (op2 & 0xFF));
                    }
                } else {
                    op2 = expectOperand(ops, {type: "address"});
                    if (translate[r.opcode][0]) {
                        instruction.push(translate[r.opcode][0]);
                    }
                    instruction.push(translate[r.opcode][1] |
                                            (op2.mode << 3) | 
                                            (op2.indexByX ? 0b00000100 : 0) |
                                            (op2.indexByY ? 0b00000010 : 0) | 
                                            (scale === 2 ?  0b00000001 : 0));
                    if (op2.mode < 6) {
                        instruction.push((op2.addr & 0xFF00) >> 8, (op2.addr & 0xFF));
                    }
                }
                break;
            case "mov":     // mov drg, srg
                op1 = expectOperand(ops, {type: "r16"});
                op2 = expectOperand(ops, {type: "r16"});
                if (op2>3) {
                    instruction.push(0x06, 0b10000000 | (op1 << 3) | op2);
                } else {
                    instruction.push(0b11000000 | (op1 << 2) | op2);
                }
                break;
        }

        if (r.expectedAssembly.length > 0) {
            r.expectedAssembly.forEach((b, idx) => {
                if (b !== instruction[idx]) {
                    throw new UnexpectedAssemblyError(r.expectedAssembly, instruction);
                }
            });
        }

        if (instruction.length === 0) {
            throw new Error(`Unexpected opcode ${r.opcode}`);
        } else {
            r.instruction = instruction;
            return r;
        }
    }
}