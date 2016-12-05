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
let validWordDataRegisters = ["a", "b", "c", "d"];
let validBankRegisters = ["sb", "db"];
let validIndexRegisters = ["x", "y"];
let validDataRegister = "d";
let validAccumulatorWordRegister = "a";
let validAccumulatorByteRegister = "al";
let validFlagsRegister = "flags";
let validBasePointerRegister = "bp";

let registerMap = {
    a: 0, al: 0, b: 1, bl: 1,
    c: 2, cl: 2, d: 3, dl: 3,
    x: 4, xl: 4, y: 5, yl: 5,
    sp: 6, bp: 7, sb: 12, db: 13,
    flags: 15, pc: 16
};

function shrinkArray(arr) {
    let newArr = [];
    arr.forEach(i => (i !== undefined && i !== null && i !== "") ? newArr.push(i) : undefined);
    return newArr;
}

function expectOperand(operands=[], {type="any", throws=true, eats=true} = {}) {
    let operand = eats ? operands.shift() : operands[0];
    try {
        if (operand === undefined || operand === null) {
            throw new OperandExpectedError();
        }

        if (type === "any") {
            return operand;
        }

        if (type === "register")  {
            if (validRegisters.findIndex(r => r === operand) < 0) {
                throw new RegisterExpectedError(operand);
            }
            return registerMap[operand];
        }

        if (type === "register16")  {
            if (validWordRegisters.findIndex(r => r === operand) < 0) {
                throw new RegisterExpectedError(operand);
            }
            return registerMap[operand];
        }

        if (type === "register8")  {
            if (validWordRegisters.findIndex(r => r === operand) < 0) {
                throw new RegisterExpectedError(operand);
            }
            return registerMap[operand];
        }

        if (type === "dataregister16")  {
            if (validWordDataRegisters.findIndex(r => r === operand) < 0) {
                throw new RegisterExpectedError(operand);
            }
            return registerMap[operand];
        }

        if (type === "dataregister8")  {
            if (validWordDataRegisters.findIndex(r => r === operand) < 0) {
                throw new RegisterExpectedError(operand);
            }
            return registerMap[operand];
        }


        if (type === "accumulator8") {
            if (operand !== "al") {
                throw new ALExpectedError(operand);
            }
            return registerMap[operand];
        }

        if (type === "accumulator16") {
            if (operand !== "a") {
                throw new AExpectedError(operand);
            }
            return registerMap[operand];
        }
        
        if (type === "ubyte") {
            let b = Number(operand).valueOf();
            if (b<0 || b>255 || Number.isNaN(b)) {
                throw new UnsignedByteExpectedError(operand);
            }
            return b;
        }

        if (type === "sbyte") {
            let b = Number(operand).valueOf();
            if (b<-128 || b>127 || Number.isNaN(b)) {
                throw new SignedByteExpectedError(operand);
            }
            return b;
        }

        if (type === "uword") {
            let w = Number(operand).valueOf();
            if (w<0 || w>65536 || Number.isNaN(b)) {
                throw new UnsignedWordExpectedError(operand);
            }
            return w;
        }

        if (type === "sword") {
            let w = Number(operand).valueOf();
            if (w<-32768 || w>32767 || Number.isNaN(b)) {
                throw new SignedWordExpectedError(operand);
            }
            return w;
        }

        if (type === "bank") {
            let b = Number(operand).valueOf();
            if (w<0 || w>3 || Number.isNaN(b) ) {
                throw new BankExpectedError(operand);
            }
            return b;
        }

        if (type === "address") {
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

        r = shrinkArray((r[0] ? r[0] : "").split(/[\s,\:=]+/));

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
        let op1, op2;
        let ops = r.operands;

        // some opcodes are easy to assemble, let's do those first

        switch (r.opcode) {
            case "nop": 
                instruction.push(0x00);
                break;
            case "ret":
                instruction.push(0xFF);
                break;
            case "enter":
                instruction.push(0x01);
                instruction.push(expectOperand(ops, {type: "ubyte"}));
                break;
            case "exit":
                instruction.push(0x02);
                instruction.push(expectOperand(ops, {type: "ubyte"}));
                break;
            case "trap":
                if ((op1 = expectOperand(ops, {type: "ubyte", throws: false})) !== undefined) {
                    instruction.push(0x06, 0x01, op1);
                    break;
                } else if (expectOperand(ops, {type: "accumulator8"}) !== undefined) {
                    instruction.push(0x03);
                    break;
                }
                break;
            case "add":
                op1 = expectOperand(ops, {type: "register16"});
                op2 = expectOperand(ops, {type: "register16"});
                instruction.push(0x04, (op1 << 3) | op2);
                break;
            case "sub":
                op1 = expectOperand(ops, {type: "register16"});
                op2 = expectOperand(ops, {type: "register16"});
                instruction.push(0x04, 0b01000000 | (op1 << 3) | op2);
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