import hexUtils from "../util/hexUtils.js";
import log from "../util/log.js";
import cvtDataToBin from "../util/cvtDataToBin.js";

/*
 * Valid registers (used in different assembly contexts)
 */
let validRegisters = ["a", "al", "b", "bl", "c", "cl", "d", "dl", "x", "xl", "y", "yl",
    "sp", "bp", "sb", "db", "flags", "pc"];
let validByteRegisters = ["al", "bl", "cl", "dl", "xl", "yl"];
let validByteDataRegisters = ["al", "bl", "cl", "dl"];
let validWordRegisters = ["a", "b", "c", "d", "x", "y", "sp", "bp"];
let validPushRegisters = ["a", "b", "c", "d", "x", "y", "sp", "bp", "sb", "db", "flags", "pc"];
let validPopRegisters = ["a", "b", "c", "d", "x", "y", "sp", "bp", "sb", "db", "flags"];
let validLoopRegisters = ["c", "d", "x", "y"];
let validWordDataRegisters = ["a", "b", "c", "d"];
let validBankRegisters = ["sb", "db"];
//let validIndexRegisters = ["x", "y"];
let validXRegister = "x";
let validYRegister = "y";
let validDataRegister = "d";
let validAccumulatorWordRegister = "a";
let validAccumulatorByteRegister = "al";
let validAccumulatorRegisters = ["a", "al"];
//let validFlagsRegister = "flags";
let validBasePointerRegister = "bp";
let validCounterWordRegister = "c";

/*
 * Register map
 */
let registerMap = {
    a: 0, al: 0, b: 1, bl: 1,
    c: 2, cl: 2, d: 3, dl: 3,
    x: 4, xl: 4, y: 5, yl: 5,
    sp: 6, bp: 7, sb: 12, db: 13,
    flags: 14, pc: 15
};

let bankRegisterOffset = 12;

/*
 * flag map
 */
let validFlags = ["i", "m", "x", "e", "v", "c", "n", "z",
    "eq", "lt", "o"];
let flagMap = {
    i: 7, m: 6, x: 5, e: 4,
    o: 3, c: 2, n: 1, z: 0,
    v: 3, lt: 2, eq: 0
};


/*
 * EXCEPTIONS
 */

function prettify(extra) {
    if (extra === undefined || extra === null) {
        return "(blank)";
    }
    if (typeof extra === "number") {
        return `"${extra}" (${hexUtils.toHex5(extra)})`;
    }
    return `"${extra}"`;
}

export class AssemblerError extends Error {
    constructor({ triggeringError = null, line = "", lineNumber = 0, filename = "stdin" } = {}) {
        super("Exception in assembler");
        let msg = `Assembler failed to parse "${filename}":${lineNumber ? lineNumber : ""} | ${line}`;
        this.input = line;
        this.lineNumber = lineNumber;
        this.filename = filename;
        this.file = filename;
        this.code = 0x8000;
        if (triggeringError) {
            msg += String.fromCharCode(13) + String.fromCharCode(10);
            msg += `... error ${hexUtils.toHex4(triggeringError.code)}: ${triggeringError.message}`;
        }
        this.name = this.constructor.name;
        this.message = msg;
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(msg)).stack;
        }
    }
}

let exceptions = [
    { code: 0x8001, name: "OperandExpected", message: extra => `Operand expected; got ${prettify(extra[0])}` },
    { code: 0x8010, name: "UnsignedByteExpected", message: extra => `Unsigned byte value expected; got ${prettify(extra[0])}` },
    { code: 0x8011, name: "SignedByteExpected", message: extra => `Signed byte value expected; got ${prettify(extra[0])}` },
    { code: 0x8012, name: "UnsignedWordExpected", message: extra => `Unsigned word value expected; got ${prettify(extra[0])}` },
    { code: 0x8013, name: "SignedWordExpected", message: extra => `Signed word value expected; got ${prettify(extra[0])}` },
    { code: 0x8014, name: "BankExpected", message: extra => `Bank value expected; got ${prettify(extra[0])}` },
    { code: 0x8015, name: "UnsignedValueOutOfRange", message: extra => `Unsigned value out of range; got ${prettify(extra[0])}, but expected ${extra[1]} to ${extra[2]}` },
    { code: 0x8016, name: "WordExpected", message: extra => `Word value expected; got ${prettify(extra[0])}` },
    { code: 0x8020, name: "AddressExpected", message: extra => `Address expected; got ${prettify(extra[0])}` },
    { code: 0x8030, name: "RegisterExpectedError", message: extra => `Register expected; got ${prettify(extra[0])}` },
    { code: 0x8031, name: "ALExpected", message: extra => `AL(8) register expected; got ${prettify(extra[0])}` },
    { code: 0x8032, name: "AExpected", message: extra => `A(16) register expected; got ${prettify(extra[0])}` },
    { code: 0x8033, name: "BankRegisterExpectedError", message: extra => `Bank register expected; got ${prettify(extra[0])}` },
    { code: 0x8034, name: "CExpected", message: extra => `C(16) register expected; got ${prettify(extra[0])}` },
    { code: 0x8036, name: "PushRegisterExpected", message: extra => `Push register expected; got ${prettify(extra[0])}` },
    { code: 0x8037, name: "PopRegisterExpected", message: extra => `Pop register expected; got ${prettify(extra[0])}` },
    { code: 0x8038, name: "XExpected", message: extra => `X(16) register expected; got ${prettify(extra[0])}` },
    { code: 0x8039, name: "YExpected", message: extra => `Y(16) register expected; got ${prettify(extra[0])}` },
    { code: 0x803A, name: "BPExpected", message: extra => `BP register expected; got ${prettify(extra[0])}` },
    { code: 0x803B, name: "DExpected", message: extra => `D(16) register expected; got ${prettify(extra[0])}` },
    { code: 0x803C, name: "AccumulatorExpected", message: extra => `A or AL register expected; got ${prettify(extra[0])}` },
    { code: 0x803D, name: "LoopRegisterExpected", message: extra => `Loop register expected; got ${prettify(extra[0])}` },
    { code: 0x803E, name: "WordRegisterExpected", message: extra => `Word register expected; got ${prettify(extra[0])}` },
    { code: 0x803F, name: "ByteRegisterExpected", message: extra => `Byte register expected; got ${prettify(extra[0])}` },
    { code: 0x803E, name: "WordDataRegisterExpected", message: extra => `General purpose word-sized register expected; got ${prettify(extra[0])}` },
    { code: 0x803F, name: "ByteDataRegisterExpected", message: extra => `General purpose byte-sized register expected; got ${prettify(extra[0])}` },
    { code: 0x8040, name: "FlagExpected", message: extra => `Flag expected; got ${prettify(extra[0])}` },
    { code: 0x8050, name: "ExpectedSymbol", message: extra => `Expected ${extra[0]}, got ${prettify(extra[1])}` },
    { code: 0x8100, name: "UnknownDirective", message: extra => `Unknown directive; got ${prettify(extra[0])}` },
    { code: 0x8200, name: "UnknownTypeSigil", message: extra => `Unknown type sigil; got ${prettify(extra[0])}` },
    { code: 0x8300, name: "UnexpectedOpcode", message: extra => `Unexpected opcode; got ${prettify(extra[0])}` },
    { code: 0x8400, name: "UndefinedSymbol", message: extra => `Undefined symbol; got ${prettify(extra[0])}` },
    { code: 0xFF00, name: "UnexpectedAssembly", message: extra => `Unexpected assembly; expected ${hexUtils.byteArrayToHex(extra[0])}; got ${hexUtils.byteArrayToHex(extra[1])}` },
    { code: 0xFFFF, name: "UnexpectedToken", message: extra => `Got an unexpected token: ${JSON.stringify(extra)}` }
];

// error extension based on http://stackoverflow.com/a/39929058/741043
let asmExceptions = exceptions.reduce((acc, e) => {
    acc[e.name] = class AsmError extends Error {
        constructor(...extra) {
            super(e.name);
            let msg = typeof e.message === "function" ? e.message(extra) : e.message;
            this.name = e.name;
            this.code = e.code;
            this.message = msg;
            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, this.constructor);
            } else {
                this.stack = (new Error(msg)).stack;
            }
        }
    }
    return acc;
}, {});

export let OperandExpectedError = asmExceptions.OperandExpected;
export let RegisterExpectedError = asmExceptions.RegisterExpected;
export let BankRegisterExpectedError = asmExceptions.BankRegisterExpected;
export let UnsignedByteExpectedError = asmExceptions.UnsignedByteExpected;
export let SignedByteExpectedError = asmExceptions.SignedByteExpected;
export let UnsignedWordExpectedError = asmExceptions.UnsignedWordExpected;
export let UnsignedValueOutOfRange = asmExceptions.UnsignedValueOutOfRange;
export let SignedWordExpectedError = asmExceptions.SignedWordExpected;
export let BankExpectedError = asmExceptions.BankExpected;
export let WordExpectedError = asmExceptions.WordExpected;
export let AddressExpectedError = asmExceptions.AddressExpected;
export let ALExpectedError = asmExceptions.ALExpected;
export let AExpectedError = asmExceptions.AExpected;
export let CExpectedError = asmExceptions.CExpected;
export let XExpectedError = asmExceptions.XExpected;
export let YExpectedError = asmExceptions.YExpected;
export let BPExpectedError = asmExceptions.BPExpected;
export let DExpectedError = asmExceptions.DExpected;
export let AccumulatorExpectedError = asmExceptions.AccumulatorExpected;
export let LoopRegisterExpectedError = asmExceptions.LoopRegisterExpected;
export let WordRegisterExpectedError = asmExceptions.WordRegisterExpected;
export let ByteRegisterExpectedError = asmExceptions.ByteRegisterExpected;
export let WordDataRegisterExpectedError = asmExceptions.WordDataRegisterExpected;
export let ByteDataRegisterExpectedError = asmExceptions.ByteDataRegisterExpected;
export let PushRegisterExpectedError = asmExceptions.PushRegisterExpected;
export let PopRegisterExpectedError = asmExceptions.PopRegisterExpected;
export let FlagExpectedError = asmExceptions.FlagExpected;
export let ExpectedSymbol = asmExceptions.ExpectedSymbol;
export let UnknownDirectiveError = asmExceptions.UnknownDirective;
export let UnknownTypeSigilError = asmExceptions.UnknownTypeSigil;
export let UnexpectedOpcodeError = asmExceptions.UnexpectedOpcode;
export let UndefinedSymbolError = asmExceptions.UndefinedSymbol;
export let UnexpectedAssemblyError = asmExceptions.UnexpectedAssembly;
export let UnexpectedTokenError = asmExceptions.UnexpectedToken;

/**
 *
 * Removes undefined, null, or empty items from an array
 * @param {Array} arr           array to shrink
 * @returns {Array}             shrunk array
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
 * @param {Array} validList             list of valid items
 * @param {Array} mappingList           corresponding map items
 * @param {string} item                 item to match
 * @param {Error} ErrorToThrow          Error to throw if no match
 * @return {Any}                        Mapped item
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
 * @param {string} str                  incoming data
 * @param {number} lo                   low number
 * @param {number} hi                   high number
 * @param {Error} ErrorToThrow          exception to throw
 * @return {lnumber}                    number, if within range
 */
function toNumberInRange(str, lo, hi, ErrorToThrow) {
    let n = Number(str);
    if (n < lo || n > hi || Number.isNaN(n)) {
        throw new ErrorToThrow(str, lo, hi);
    }
    return n;
}


/**
 * Expect an operand matching type in the provided operands array. Return it if it exists, or throw an error if it doesn't.
 * If throws is set to false, no error will be thrown; undefined is returned instead. If eats is true in this case, the
 * token is pushed back on the operands array.
 *
 * Eats can be false, in which case this method just looks at it rather than consuming a token.
 *
 * @param {Array} operands         the opearnds to work with
 * @param {string} [type="any"]    the required type of the next operand
 * @param {Boolean} [throws=true]  If operand isn't matched, throw (unless false)
 * @param {Boolean} [eats=true]    If operand is matched, eat.
 * @return {Any}    value of operand if matched
 */
function expectOperand(operands = [], { type = "any", throws = true, eats = true } = {}) {
    let operand = eats ? operands.shift() : operands[0];
    try {
        if (operand === undefined || operand === null) {
            throw new OperandExpectedError();
        }

        switch (type) {
            case "*":
                return operand;
            // flags
            case "f": return mappedListItem(validFlags, flagMap, operand, FlagExpectedError);

            // register types
            case "r": return mappedListItem(validRegisters, registerMap, operand, RegisterExpectedError);
            case "pushr": return mappedListItem(validPushRegisters, registerMap, operand, PushRegisterExpectedError);
            case "popr": return mappedListItem(validPopRegisters, registerMap, operand, PopRegisterExpectedError);
            case "r16": return mappedListItem(validWordRegisters, registerMap, operand, WordRegisterExpectedError);
            case "r8": return mappedListItem(validByteRegisters, registerMap, operand, ByteRegisterExpectedError);
            case "dr16": return mappedListItem(validWordDataRegisters, registerMap, operand, WordDataRegisterExpectedError);
            case "dr8": return mappedListItem(validByteDataRegisters, registerMap, operand, ByteDataRegisterExpectedError);
            case "c16": return mappedListItem([validCounterWordRegister], registerMap, operand, CExpectedError);
            case "a16": return mappedListItem([validAccumulatorWordRegister], registerMap, operand, AExpectedError);
            case "a8": return mappedListItem([validAccumulatorByteRegister], registerMap, operand, ALExpectedError);
            case "a": return mappedListItem(validAccumulatorRegisters, registerMap, operand, AccumulatorExpectedError);
            case "d16": return mappedListItem([validDataRegister], registerMap, operand, DExpectedError);
            case "l16": return mappedListItem(validLoopRegisters, registerMap, operand, LoopRegisterExpectedError);
            case "x16": return mappedListItem([validXRegister], registerMap, operand, XExpectedError);
            case "y16": return mappedListItem([validYRegister], registerMap, operand, YExpectedError);
            case "bp": return mappedListItem([validBasePointerRegister], registerMap, operand, BPExpectedError);
            case "br": return mappedListItem(validBankRegisters, registerMap, operand, BankRegisterExpectedError);
            // numbers
            case "u2": return toNumberInRange(operand, 0, 3, UnsignedValueOutOfRange);
            case "u3": return toNumberInRange(operand, 0, 7, UnsignedValueOutOfRange);
            case "u4": return toNumberInRange(operand, 0, 15, UnsignedValueOutOfRange);
            case "u8": return toNumberInRange(operand, 0, 255, UnsignedByteExpectedError);
            case "s8": return toNumberInRange(operand, -128, 127, SignedByteExpectedError);
            case "n8": return toNumberInRange(operand, -128, 255, WordExpectedError);
            case "u16": return toNumberInRange(operand, 0, 65535, UnsignedWordExpectedError);
            case "s16": return toNumberInRange(operand, -32768, 32767, SignedWordExpectedError);
            case "n16": return toNumberInRange(operand, -32768, 65535, WordExpectedError);
            case "bankvalue": return toNumberInRange(operand, 0, 3, BankExpectedError);

            // address
            /* eslint-disable */
            case "address": return dissectAddress(operand);

            /* eslint-enable */
            default:
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

/**
 * Returns an address object including information about the addressing mode, indexes, and associated registers
 *
 * @param {string} operand              operand that might be an address
 * @return {Object}                     an address object, if operand matches
 */
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

    // clear out some stuff we don't care about like brackets, parens and plusses
    let operands = shrinkArray(operand.split(/[\s\+\[\]\(\)]+/));

    // detect if the address reference is direct (absolute) or indirect
    switch (operand.substr(0, 1)) {
        case "[":
            address.direct = true;
            if (operand[operand.length - 1] !== "]") {
                throw new ExpectedSymbol("Bracket", operand);
            }
            break;
        case "(":
            address.indirect = true;
            if (operand[operand.length - 3] !== ")" &&
                operand[operand.length - 1] !== ")") {
                throw new ExpectedSymbol("Parentheses", operand);
            }
            break;
        default:
            throw new ExpectedSymbol("Parentheses or Bracket", operand);
    }

    // try to detect if we have a register
    address.reg = expectOperand(operands, { type: "bp", throws: false });
    if (address.reg === undefined) {
        address.reg = expectOperand(operands, { type: "d16", throws: false });
    }

    // BP is base-pointer-relative and expects a number
    if (address.reg === registerMap.bp) {
        address.addr = expectOperand(operands, { type: "s16", throws: false });
    } else if (address.reg === undefined) { // otherwise we expect a number as well, but not for a D register
        address.addr = expectOperand(operands, { type: "u16", throws: false });
    }

    // check for indexing by X and Y
    address.indexByX = Boolean(expectOperand(operands, { type: "x16", throws: false }));
    address.indexByY = Boolean(expectOperand(operands, { type: "y16", throws: false }));

    // if there's still stuff left that we haven't parsed, ERROR!
    if (operands.length !== 0) {
        throw new UnexpectedTokenError(operands);
    }

    /// set the address mode
    if (address.direct) {
        address.mode = (address.reg === registerMap.bp ? 4 : (address.reg === registerMap.d ? 6 : 2));
    } if (address.indirect) {
        address.mode = (address.reg === registerMap.bp ? 5 : (address.reg === registerMap.d ? 7 : 3));
    }

    return address;
}

/*
 * ASSEMBLY ROUTINES
 *
 * Each routine takes opcode and ops (all operands)
 ******************************************************************************/
function _nop() {
    return [0x00];
}
function _ret() {
    return [0xFF];
}
function _enterOrExit(which, opcode, ops) {
    return [which, expectOperand(ops, { type: "u8" })];
}
function _trap(opcode, ops) {
    let op1;
    if ((op1 = expectOperand(ops, { type: "u8", throws: false })) !== undefined) {
        return [0x06, 0x01, op1];
    } else if (expectOperand(ops, { type: "a8" }) !== undefined) {
        return [0x03];
    }
    return [];
}
function _binaryOp(whichClass, whichOp, opcode, ops) {
    let op1 = expectOperand(ops, { type: "r16" });
    let op2 = expectOperand(ops, { type: "r16" });
    return [whichClass, whichOp | (op1 << 3) | op2];
}
function _neg(opcode, ops) {
    let op1 = expectOperand(ops, { type: "r16" });
    return [0x06, 0x08, op1];
}
function _xcb(opcode, ops) {
    let op1 = expectOperand(ops, { type: "r16" });
    return [0x06, 0x10, op1];
}
function _mulOrDiv(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: "dr16" });
    let op2 = expectOperand(ops, { type: "r16" });
    let op3 = expectOperand(ops, { type: "r16" });
    return [0x06, which, (op1 << 6) | (op2 << 3) | op3];
}
function _mfill(opcode, ops) {
    let op1 = expectOperand(ops, { type: "br" }) - bankRegisterOffset;
    let op2 = expectOperand(ops, { type: "r16" });
    let op3 = 0;
    let op4 = expectOperand(ops, { type: "r8" });
    expectOperand(ops, { type: "c16" });
    return [0x06, 0x6D, (op1 << 7) | (op3 << 6) | (op2 << 3) | op4];
}
function _mCopyOrSwap(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: "br" }) - bankRegisterOffset;
    let op2 = expectOperand(ops, { type: "r16" });
    let op3 = expectOperand(ops, { type: "br" }) - bankRegisterOffset;
    let op4 = expectOperand(ops, { type: "r16" });
    expectOperand(ops, { type: "c16" });
    return [0x06, which, (op1 << 7) | (op3 << 6) | (op2 << 3) | op4];
}
function _inOrOut(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: "r8" });
    let op2 = expectOperand(ops, { type: "u8" });
    return [0x06, which | op1, op2];
}
function _incOrDec(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: "r16" });
    return [which | op1];
}
function _testFlag(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: "f" });
    return [which | op1];
}
function _testReg(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: "r8" });
    let op2 = expectOperand(ops, { type: "u8" });
    return [0x06, which | op1, op2];
}
function _pushOrPop(which, opcode, ops) {
    let op1 = expectOperand(ops, { type: (opcode === "push" ? "pushr" : "popr") });
    return [which | op1];
}
function _pushAOrPopA(which) {
    return [0x06, which];
}
function _branchOrCallShort(which, opcode, ops) {
    let op1;
    if ((op1 = expectOperand(ops, { type: "s8" })) !== undefined) {
        return [0x07, which, (op1 & 0xFF)];
    }
    return [];
}
function _branchOrCall(which, opcode, ops) {
    let op1;
    if ((op1 = expectOperand(ops, { type: "s16", throws: false })) !== undefined) {
        return [0x07, which | 0b00001000, (op1 & 0xFF00) >> 8, (op1 & 0xFF)];
    } else {
        op1 = expectOperand(ops, { type: "address" });
        return [0x07, which |
            (op1.mode << 3) |
            (op1.indexByX ? 0b00000100 : 0) |
            (op1.indexByY ? 0b00000010 : 0), (op1.addr & 0xFF00) >> 8, (op1.addr & 0xFF)];
    }
}
function _loop(opcode, ops) {
    let op1 = expectOperand(ops, { type: "l16" });
    let op2 = expectOperand(ops, { type: "s8" });
    let deltaCtoA = 2;
    return [0x06, 0x50 | (op1 - deltaCtoA), (op2 & 0xFF)];
}
function _loadOrStore(whichClass, whichOp, opcode, ops) {
    let op1 = expectOperand(ops, { type: "a8", throws: false });
    let op2;
    let scale = 1;
    let instruction = [];
    if (op1 === undefined) {
        op1 = expectOperand(ops, { type: "a16" });
        scale = 2;
    }
    if ((op2 = expectOperand(ops, { type: (scale === 1 ? "n8" : "n16"), throws: false })) !== undefined) {
        if (whichClass) {
            instruction.push(whichClass);
        }
        instruction.push(whichOp |
            (scale === 2 ? 0b00001000 : 0) |
            (scale === 2 ? 0b00000001 : 0));
        if (scale === 1) {
            instruction.push((op2 & 0xFF));
        } else {
            instruction.push((op2 & 0xFF00) >> 8, (op2 & 0xFF));
        }
    } else {
        op2 = expectOperand(ops, { type: "address" });
        if (whichClass) {
            instruction.push(whichClass);
        }
        instruction.push(whichOp |
            (op2.mode << 3) |
            (op2.indexByX ? 0b00000100 : 0) |
            (op2.indexByY ? 0b00000010 : 0) |
            (scale === 2 ? 0b00000001 : 0));
        if (op2.mode < 6) {
            instruction.push((op2.addr & 0xFF00) >> 8, (op2.addr & 0xFF));
        }
    }
    return instruction;
}
function _ldi(opcode, ops) {
    // ldi can only take the accumulator and immediate value
    let testOps = ops.map(i => i);
    let op1 = expectOperand(testOps, { type: "a8", throws: false });
    let scale = 1;
    if (op1 === undefined) {
        op1 = expectOperand(testOps, { type: "a16" });
        scale = 2;
    }
    expectOperand(testOps, { type: ["", "n8", "n16"][scale] });
    // if we get here, we're fine!
    return _loadOrStore(undefined, 0b01000000, opcode, ops);
}
function _mov(opcode, ops) {
    let op1, op2;
    if (op1 = expectOperand(ops, { type: "br", throws: false })) {
        op2 = expectOperand(ops, { type: "dr16" });
        return [0b00001000 | (op1 === registerMap.sb ? 0x0 : 0b00000100) | op2];
    } else {
        op1 = expectOperand(ops, { type: "r16" });
        op2 = expectOperand(ops, { type: "r16" });
        if (op2 > 3) {
            return [0x06, 0b10000000 | (op1 << 3) | op2];
        } else {
            return [0b11000000 | (op1 << 2) | op2];
        }
    }
}
function _halt(opcode, ops) {
    let op1 = expectOperand(ops, { type: "u8" });
    return [0x06, 0x14, op1];
}

let asmHandlers = {
    "nop": _nop,
    "ret": _ret,
    "enter": _enterOrExit.bind(undefined, 0x01),
    "exit": _enterOrExit.bind(undefined, 0x02),
    "trap": _trap,
    "add": _binaryOp.bind(undefined, 0x04, 0b00000000),
    "sub": _binaryOp.bind(undefined, 0x04, 0b01000000),
    "xor": _binaryOp.bind(undefined, 0x04, 0b10000000),
    "cmp": _binaryOp.bind(undefined, 0x04, 0b11000000),
    "shl": _binaryOp.bind(undefined, 0x05, 0b00000000),
    "shr": _binaryOp.bind(undefined, 0x05, 0b01000000),
    "and": _binaryOp.bind(undefined, 0x05, 0b10000000),
    "or": _binaryOp.bind(undefined, 0x05, 0b11000000),
    "neg": _neg,
    "xcb": _xcb,
    "mul": _mulOrDiv.bind(undefined, 0x40),
    "idiv": _mulOrDiv.bind(undefined, 0x41),
    "imod": _mulOrDiv.bind(undefined, 0x42),
    "mfill": _mfill,
    "mcopy": _mCopyOrSwap.bind(undefined, 0x6F),
    "mswap": _mCopyOrSwap.bind(undefined, 0x6E),
    "out": _inOrOut.bind(undefined, 0b01111000),
    "in": _inOrOut.bind(undefined, 0b01110000),
    "swap": _binaryOp.bind(undefined, 0x06, 0b11000000),
    "inc": _incOrDec.bind(undefined, 0b00010000),
    "dec": _incOrDec.bind(undefined, 0b00011000),
    "if": _testFlag.bind(undefined, 0b00100000),
    "ifn": _testFlag.bind(undefined, 0b00101000),
    "set": _testFlag.bind(undefined, 0b00110000),
    "clr": _testFlag.bind(undefined, 0b00111000),
    "ifr": _testReg.bind(undefined, 0b00110000),
    "ifnr": _testReg.bind(undefined, 0b00111000),
    "setr": _testReg.bind(undefined, 0b00100000),
    "clrr": _testReg.bind(undefined, 0b00101000),
    "push": _pushOrPop.bind(undefined, 0b11100000),
    "pop": _pushOrPop.bind(undefined, 0b11110000),
    "pusha": _pushAOrPopA.bind(undefined, 0x18),
    "popa": _pushAOrPopA.bind(undefined, 0x19),
    "brs": _branchOrCallShort.bind(undefined, 0b00000000),
    "calls": _branchOrCallShort.bind(undefined, 0b01000000),
    "br": _branchOrCall.bind(undefined, 0b00000001),
    "call": _branchOrCall.bind(undefined, 0b01000001),
    "loop": _loop,
    "ldi": _ldi,
    "lds": _loadOrStore.bind(undefined, undefined, 0b01000000),
    "std": _loadOrStore.bind(undefined, undefined, 0b10000000),
    "ldd": _loadOrStore.bind(undefined, 0x07, 0b10000000),
    "sts": _loadOrStore.bind(undefined, 0x07, 0b11000000),
    "mov": _mov,
    "halt": _halt
}

export default class Asm {

    constructor() {
        this.basepath = "";
        this.importCallback = undefined;
        this.registerMaps = {};
        this.vars = {};
        this.defs = {};
        this.labels = {};
        this.segments = {
            code: {
                current: 0x1000,
                0x1000: []
            },
            data: {
                current: undefined
            }
        };
    }

    rewriteLineSymbols(line, stage) {
        // if stage is symbols, be permissive
        // rewrite symbols; symbols start with type sigils:
        //      # = item defined with .def
        //      & = item defined with .var
        //      : = label
        //      > = (short) label
        //      @ = (address of) label (used when building vector tables)
        // use values if we know them when permissive. if not permissive, throw that the symbol couldn't be found
        line = line.replace(/([\#\>\&\@\%\:][A-Za-z0-9\-\_]+)/g, (match) => {
            let typeOfSymbol = match[0];
            let symbolName = match.substr(1).toLowerCase();
            let data;
            switch (typeOfSymbol) {
                case "%":
                    data = this.registerMap[symbolName];
                    if (data === undefined) {
                        throw new UndefinedSymbolError(match);
                    }
                    break;
                case "&":
                    data = this.vars[symbolName];
                    break;
                case "#":
                    data = this.defs[symbolName];
                    break;
                case ">":
                case ":":
                    {
                        let pc = Number(this.segments.code.current) + this.segments.code[this.segments.code.current].length;
                        data = this.labels[symbolName];
                        if (data !== undefined) {
                            data -= (typeOfSymbol === ":" ? (pc + 4) : (pc + 3));
                        }
                    }
                    break;
                case "@":
                    data = this.labels[symbolName];
                    break;
                default:
                    throw new UnknownTypeSigilError(match);
            }
            if (data === undefined) {
                if (stage === "symbols") {
                    return "0x00000";
                } else {
                    throw new UndefinedSymbolError(match);
                }
            } else {
                return data;
            }
        });
        return line;
    }

    handleFunctions(line) {
        let functions = {
            bank: (m, n) => ((Number(n) & 0x30000) >> 16),
            addr: (m, n) => (Number(n) & 0xFFFF),
            word: (m, n) => (Number(n) & 0xFFFF),
            ord: (m, n) => (n.charCodeAt(0)),
            chr: (m, n) => (String.fromCharCode(n)),
            lo: (m, n) => (Number(n) & 0x00FF),
            hi: (m, n) => ((Number(n) & 0xFF00) >> 8),

        }
        for (let name of Object.keys(functions)) {
            let fn = functions[name];
            line = line.replace(new RegExp(`${name}\\(([0-9A-Za-z]+)\\)`, "gi"), fn);
        }
        return line;
    }

    handleDirective(parseResults, stage) {
        let addr;
        switch (parseResults.directive) {
            case "import":
                if (this.importCallback) {
                    this.assemble(this.importCallback(parseResults.directiveData), {
                        stageOverride: stage,
                        filename: parseResults.directiveData,
                        isImport: true
                    });
                } else {
                    throw new Error("No import functionality available.");
                }
                break;
            case "code":
            case "code+":
            case "data":
            case "data+":
                {
                    // create a segment for this directive
                    addr = Number(parseResults.directiveData);
                    let segmentName = parseResults.directive;
                    let isAppending = segmentName[segmentName.length - 1] === "+";
                    if (isAppending) {
                        segmentName = segmentName.substr(0, segmentName.length - 1);
                    }
                    if (!isAppending) {
                        // if we're appending to a segment, don't clear it. But if we aren't appending,
                        // clear away
                        this.segments[segmentName][addr] = [];
                    }
                    if (this.segments[segmentName][addr] === undefined) {
                        // if there's still no segment present, make sure it's initialized with an empty array
                        this.segments[segmentName][addr] = [];
                    }
                    this.segments[segmentName].current = addr;
                }
                break;
            case "rename":
                {
                    let [regName, regMap] = parseResults.directiveData.split(/\s/);
                    this.registerMap[regName] = regMap;
                    // TODO: throw error if not a valid register
                }
                break;
            case "var":
                addr = this.segments.data.current + this.segments.data[this.segments.data.current].length;
                this.vars[parseResults.directiveData.toLowerCase()] = addr;
                break;
            case "def":
                {
                    let [parm1, parm2] = parseResults.directiveData.split(" ");
                    this.defs[parm1.toLowerCase()] = parm2;
                }
                break;
            case "db":
                this.segments.data[this.segments.data.current].push(...parseResults.directiveData.split(" ").map(b => Number(b) & 0xFF));
                break;
            case "db[]":
                {
                    let parm1 = Number(parseResults.directiveData);
                    for (let i = 0; i < parm1; i++) {
                        this.segments.data[this.segments.data.current].push(0);
                    }
                }
                break;
            case "dw":
                {
                    let words = parseResults.directiveData.split(" ").map(w => Number(w) & 0xFFFF);
                    this.segments.data[this.segments.data.current].push(...words.reduce((p, c) => {
                        p.push((c & 0xFF00) >> 8);
                        p.push((c & 0x00FF));
                        return p;
                    }, []));
                }
                break;
            case "dw[]":
                {
                    let parm1 = Number(parseResults.directiveData) * 2;
                    for (let i = 0; i < parm1; i++) {
                        this.segments.data[this.segments.data.current].push(0);
                    }
                }
                break;
            case "ds":
                this.segments.data[this.segments.data.current].push(...Array.from(parseResults.directiveData).map(c => c.charCodeAt(0)));
                break;

            default:
                // unknown directive, complain
                throw new UnknownDirectiveError(parseResults.directive);
        }
    }

    handleLabel(parseResults) {
        let addr = this.segments.code.current + this.segments.code[this.segments.code.current].length;
        this.labels[parseResults.label] = addr;
    }

    handleAssembly(line, stage) {
        let r = Asm.assembleSingleInstruction(line, { throwIfUnexpectedAssembly: (stage === "assembly") });
        this.segments.code[this.segments.code.current].push(...r.instruction);
    }

    assemble(lines = [], { stageOverride = "", filename = "stdin", isImport = false } = {}) {
        let lineNumber = 0;
        for (let stage of ["symbols", "assembly"]) {
            if (stageOverride !== "") {
                if (stage !== stageOverride) {
                    /* eslint-disable */
                    continue;

                    /* eslint-enable */
                }
            }

            // reset segments
            if (!isImport) {
                [this.segments.code, this.segments.data].forEach((segments) => {
                    for (let segmentKey of Object.keys(segments)) {
                        let segment = segments[segmentKey];
                        if (segment instanceof Array) {
                            segment.length = 0;
                        }
                    }
                });
                this.segments.code = {
                    current: 0x1000
                };
            }

            lineNumber = 0;
            for (let line of lines) {
                lineNumber++;
                try {
                    let semipos = line.indexOf(";");
                    let lineWithoutComment = line;
                    if (semipos > -1) {
                        lineWithoutComment = line.substr(0, semipos);
                    }

                    line = this.rewriteLineSymbols(lineWithoutComment, stage);
                    line = this.handleFunctions(line, stage);
                    let parseResults = Asm.parseSingleInstruction(line);
                    if (parseResults.directive !== "") {
                        this.handleDirective(parseResults, stage);
                    }

                    if (parseResults.label !== "") {
                        this.handleLabel(parseResults, stage);
                    }

                    if (parseResults.opcode !== "") {
                        this.handleAssembly(line, stage);
                    }
                } catch (err) {
                    throw new AssemblerError({ triggeringError: err, line, lineNumber, filename });
                }
            }
        }
    }

    writeToString(format = "js", newline) {
        if (!newline) {
            newline = String.fromCharCode(13) + String.fromCharCode(10);
        }
        let text = (format !== "bin") ? "export default [" : "";
        for (let segmentName of Object.keys(this.segments)) {
            let segment = this.segments[segmentName];
            for (let addr of Object.keys(segment)) {
                let arr = segment[addr];
                if (arr instanceof Array) {
                    text += cvtDataToBin(arr, addr, format, newline, "", "") + (format !== "bin" ? "," : "") + newline;
                }
            }
        }
        if (format !== "bin") {
            text += "];";
        }
        return text;
    }

    writeToMemory(memory, { debug = false } = {}) {
        let c = 0;
        for (let segmentName of Object.keys(this.segments)) {
            let segment = this.segments[segmentName];
            for (let addr of Object.keys(segment)) {
                let arr = segment[addr];
                if (arr instanceof Array) {
                    if (debug) {
                        log(`Writing ${segmentName}:${addr}`);
                    }
                    let s = "";
                    for (let i = 0; i < arr.length; i++) {
                        memory.poke(i + Number(addr), arr[i]);
                        if (debug) {
                            s += hexUtils.toHex2(arr[i], "") + " ";
                            if (i % 16 === 15) {
                                log(`... ${s}`);
                                s = "";
                            }
                        }
                        c++;
                    }
                    if (debug) {
                        log(`... ${s}`);
                    }
                }
            }
        }
        if (debug) {
            log(`... Wrote ${c} bytes`);
        }
    }

    /**
     * Parses a single assembly instruction and returns a dictionary containing the various components.
     *
     * @param {string} text     the text to parse
     * @return {Object}         an object representing a single instruction
     */
    static parseSingleInstruction(text = "") {
        let results = {
            directive: "",
            directiveData: "",
            label: "",
            opcode: "",
            operands: [],
            comment: "",
            expectedAssembly: []
        }

        // get comment, if it exists (form: ; comment)
        let r = text.split(";");
        results.comment = r[1] || "";

        // get expected assembly results, if present (form => 00,00,00)
        r = (r[0] ? r[0] : "").split("=>");
        results.expectedAssembly = shrinkArray((r[1] ? r[1] : "").split(" ")).map(i => parseInt(i, 16));

        // remove whitespace so we have pure tokens
        r = shrinkArray((r[0] ? r[0] : "").split(/[\s]+/));

        if (r.length < 1) {
            // no need to go further; we're done
            return results;
        }

        // do we have a directive (of the form .directive)?
        let matches;
        if (matches = r[0].match(/\.([A-Za-z0-9\-\_\+]+)/)) {
            results.directive = matches[1].toLowerCase();
            r.shift();

            results.directiveData = r.join(" ");
            return results;
        }

        // is there a label (of the form label>)
        if (matches = r[0].match(/([\_\-A-Za-z0-9]+)[\>|\:]/)) {
            results.label = matches[1].toLowerCase();
            r.shift();
        }

        if (r.length < 1) {
            return results;
        }

        r = shrinkArray(r.join(" ").split(/[\s,\:=\*]+/));

        // next has to be an opcode, if it exists
        results.opcode = r[0].toLowerCase();
        r.shift();

        // and then all the operands, if they exist
        results.operands = r.map(i => i.toLowerCase());

        return results;
    }

    /**
     * Assemble a single instruction, returning an array of bytes representing the machine code for the instruction
     * Doesn't parse directives, respond to labels or anything like that -- just regular instructions
     *
     * @param {string} text             the text to parse
     * @returns {Array}                 the bytes representing the instruction
     */
    static assembleSingleInstruction(text = "", { throwIfUnexpectedAssembly = true } = {}) {
        let r = Asm.parseSingleInstruction(text);
        let instruction = [];
        if (r.opcode === "") {
            r.instruction = instruction;
            return r;
        }

        let handler = asmHandlers[r.opcode];
        if (handler) {
            instruction = handler(r.opcode, r.operands);
        }

        // if expected assembly has been passed, throw an error if it doesn't match
        if (r.expectedAssembly.length > 0) {
            r.expectedAssembly.forEach((b, idx) => {
                if (b !== instruction[idx]) {
                    if (throwIfUnexpectedAssembly) {
                        throw new UnexpectedAssemblyError(r.expectedAssembly, instruction);
                    }
                }
            });
        }

        // if we didn't generate any instruction, error
        if (instruction.length === 0) {
            throw new UnexpectedOpcodeError(r.opcode);
        } else {
            r.instruction = instruction;
            return r;
        }
    }
}