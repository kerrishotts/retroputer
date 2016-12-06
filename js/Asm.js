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

function shrinkArray(arr) {
    let newArr = [];
    arr.forEach(i => (i !== undefined && i !== null && i !== "") ? newArr.push(i) : undefined);
    return newArr;
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
            case "f":
                if (validFlags.findIndex(r => r === operand) < 0) {
                    throw new FlagExpectedError(operand);
                }
                return flagMap[operand];
            case "r":
                if (validRegisters.findIndex(r => r === operand) < 0) {
                    throw new RegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "pushr":
                if (validPushRegisters.findIndex(r => r === operand) < 0) {
                    throw new PushRegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "popr":
                if (validPopRegisters.findIndex(r => r === operand) < 0) {
                    throw new PopRegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "r16":
                if (validWordRegisters.findIndex(r => r === operand) < 0) {
                    throw new RegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "r8":
                if (validByteRegisters.findIndex(r => r === operand) < 0) {
                    throw new RegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "dr16":
                if (validWordDataRegisters.findIndex(r => r === operand) < 0) {
                    throw new RegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "dr8":
                if (validByteDataRegisters.findIndex(r => r === operand) < 0) {
                    throw new RegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "c16":
                if (operand !== validCounterWordRegister) {
                    throw new CExpectedError(operand);
                }
                return registerMap[operand];
            case "a16":
                if (operand !== validAccumulatorWordRegister) {
                    throw new AExpectedError(operand);
                }
                return registerMap[operand];
            case "a8":
                if (operand !== validAccumulatorByteRegister) {
                    throw new ALExpectedError(operand);
                }
                return registerMap[operand];
            case "a":
                if (validAccumulatorRegisters.findIndex(r => r === operand) < 0) {
                    throw new RegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "br":
                if (validBankRegisters.findIndex(r => r === operand) < 0) {
                    throw new BankRegisterExpectedError(operand);
                }
                return registerMap[operand];
            case "u2":
                b = Number(operand).valueOf();
                if (b<0 || b>3 || Number.isNaN(b)) {
                    throw new UnsignedValueOutOfRange(operand, 0, 3);
                }
                return b;
            case "u3":
                b = Number(operand).valueOf();
                if (b<0 || b>7 || Number.isNaN(b)) {
                    throw new UnsignedValueOutOfRange(operand, 0, 7);
                }
                return b;
            case "u4":
                b = Number(operand).valueOf();
                if (b<0 || b>15 || Number.isNaN(b)) {
                    throw new UnsignedByteExpectedError(operand);
                }
                return b;
            case "u8":
                b = Number(operand).valueOf();
                if (b<0 || b>255 || Number.isNaN(b)) {
                    throw new UnsignedByteExpectedError(operand);
                }
                return b;
            case "s8":
                b = Number(operand).valueOf();
                if (b<-128 || b>127 || Number.isNaN(b)) {
                    throw new SignedByteExpectedError(operand);
                }
                return b;
            case "u16":
                w = Number(operand).valueOf();
                if (w<0 || w>65536 || Number.isNaN(w)) {
                    throw new UnsignedWordExpectedError(operand);
                }
                return w;
            case "s16":
                let w = Number(operand).valueOf();
                if (w<-32768 || w>32767 || Number.isNaN(w)) {
                    throw new SignedWordExpectedError(operand);
                }
                return w;
            case "bankvalue":
                let b = Number(operand).valueOf();
                if (b<0 || b>3 || Number.isNaN(b) ) {
                    throw new BankExpectedError(operand);
                }
                return b;
            case "address":
                let matches;
                if (!(matches=operand.match(/([\[\(]){1}(bp\+|d){0,1}(0x[a-f0-9]{1,4}){0,1}(\+x){0,1}([\]\)]){1}(\+y){0,1}/))) {
                    throw new AddressExpectedError(operand);
                }
                return matches;
        }

        throw new UnexpectedTokenError(operands);
    } catch (err) {
        if (throws) {
            throw err;
        } else {
            if (eats) { 
                operands.unshift(operand);
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

        // is there a label (of the form label:)
        if (matches = r[0].match(/([\_\-A-Za-z0-9]+)\:/)) {
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
        let op1, op2, op3, op4, op5;
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
            case "set":      // st flag
            case "clr":      // cl flag
                translate = {
                    if:  0b00100000,
                    ifn: 0b00101000,
                    set:  0b00110000,
                    clr:  0b00111000
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
                    //todo
                }
                break;
            case "ld":      // ld [br:]a(l), ...
            case "st":      // st [br:]a(l), ...
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