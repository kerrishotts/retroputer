import { Bus } from "./Bus.js";

const _op1 = Symbol("_op1");
const _op2 = Symbol("_op2");
const _ret = Symbol("_ret");
const _flags = Symbol("_flags");
const _command = Symbol("_command");
const _execute = Symbol("_execute");

export const COMMANDS = {
    ADD: 0x01,
    SUB: 0x02,
    MUL: 0x03,
    DIV: 0x04,
    MOD: 0x05,
    SMUL: 0x06,
    SDIV: 0x07,
    SMOD: 0x08,
    NEG: 0x09,
    SHL: 0x0A,
    SHR: 0x0B,
    AND: 0x0C,
    OR: 0x0D,
    XOR: 0x0E,
    NOT: 0x0F,
};

export const SIZES = {
    BYTE: 0b00,
    WORD: 0b01,
    ADDR: 0b10,
    RET_8:  0b0000000000,
    RET_16: 0b0100000000,
    RET_19: 0b1000000000,
    RET_32: 0b1100000000,
    OP1_8:  0b0000000000,
    OP1_16: 0b0001000000,
    OP1_19: 0b0010000000,
    OP1_32: 0b0011000000,
    OP2_8:  0b0000000000,
    OP2_16: 0b0000010000,
    OP2_19: 0b0000100000,
    OP2_32: 0b0000110000,
};

// size of operands are stored in the high nibble of
// a command, and represent the following
// 00 == 8 bits
// 01 == 16 bits
// 10 == 19 bits
// 11 == 32 bits
const signBit =        [0x00000080, 0x00008000, 0x00040000]; //, 0x080000000 ];
const signExtend =     [0x00FFFF80, 0x00FF8000, 0x00FC0000]; //, 0x080000000 ];
const signExtendMask = [0x0000007F, 0x00007FFF, 0x0003FFFF]; //, 0x07FFFFFFF ];
const mask =           [0x000000FF, 0x0000FFFF, 0x0007FFFF]; //, 0x0FFFFFFFF ];
const carryBit =       [0x00000100, 0x00010000, 0x00080000]; //, 0x100000000 ];
const shift =          [         8,         16,         19]; //,          32 ];

function extendSign(v, from, to) {
    const sign = (1 << from - 1);
    if (v & (sign)) {
        for (let i = to - 1; i >= from; i--) {
            v |= 1 << i;
        }
    }
    return v;
}

export class ALU {
    constructor() {
        this[_op1] = new Bus(4);
        this[_op2] = new Bus(4);
        this[_ret] = new Bus(4);
        this[_flags] = new Bus(1, 0x07);
        this[_command] = new Bus(2, 0x3FF);
        this[_execute] = new Bus(1, 0x01);

        this.signaled = this.signaled.bind(this);
        this[_execute].addReceiver(this.signaled);

        this.stats = {
            ops: 0,
            [COMMANDS.ADD]: 0,
            [COMMANDS.AND]: 0,
            [COMMANDS.DIV]: 0,
            [COMMANDS.MOD]: 0,
            [COMMANDS.MUL]: 0,
            [COMMANDS.NEG]: 0,
            [COMMANDS.NOT]: 0,
            [COMMANDS.OR]:  0,
            [COMMANDS.SDIV]: 0,
            [COMMANDS.SMOD]: 0,
            [COMMANDS.SMUL]: 0,
            [COMMANDS.SHL]: 0,
            [COMMANDS.SHR]: 0,
            [COMMANDS.SUB]: 0,
            [COMMANDS.XOR]: 0
        };
    }

    get op1Bus() { return this[_op1]; }
    get op2Bus() { return this[_op2]; }
    get retBus() { return this[_ret]; }
    get flagsBus() { return this[_flags]; }
    get commandBus() { return this[_command]; }
    get executeBus() { return this[_execute]; }

    signaled() { //eslint-disable-line complexity
        const command = this.commandBus.data;
        const op1 = this.op1Bus.data;
        const op2 = this.op2Bus.data;
        const sizeOfRet = (command & 0b1100000000) >> 8;
        let sizeOfOp1 = (command & 0b0011000000) >> 6;
        let sizeOfOp2 = (command & 0b0000110000) >> 4;
        const op = command & 0x00F;
        this.stats[op]++;
        this.stats.ops++;

        // get the operands and mask them based on the command size
        let a = op1;
        if (a < 0) { a += carryBit[sizeOfOp1]; }
        a &= mask[sizeOfOp1];

        let b = op2;
        if (b < 0) { b += carryBit[sizeOfOp2]; }
        b &= mask[sizeOfOp2];

        const signA = (a & signBit[sizeOfOp1]) ? 1 : 0;
        const signB = (b & signBit[sizeOfOp2]) ? 1 : 0;
        let zero = 0;
        let carry = 0;
        const carryIn = (this.flagsBus.data & 0b0100) >> 2;
        let negative = 0;
        let overflow = 0;
        let ret = 0;

        switch (op) {
            case COMMANDS.SUB: {
                ret = a + (-b) + carryIn;
                if (ret < 0) {
                    carry = 1;
                }
                break;
            }
            case COMMANDS.ADD: ret = a + b + carryIn; break;
            case COMMANDS.MUL: ret = a * b; break;
            case COMMANDS.MOD:
            case COMMANDS.DIV:
                if (b === 0) {
                    carry = 1;
                    overflow = 1;
                    negative = 1;
                    zero = 1;
                    ret = 0;
                } else {
                    if (op === COMMANDS.DIV) {
                        ret = Math.floor(a / b);
                    } else {
                        ret = a % b;
                    }
                }
                break;
            case COMMANDS.AND: ret = a & b; break;
            case COMMANDS.OR:  ret = a | b; break;
            case COMMANDS.XOR: ret = a ^ b; break;
            case COMMANDS.NOT: ret = ~a; break;
            case COMMANDS.NEG: ret = -a; break;
            case COMMANDS.SHL: ret = a << (b & 0x3F); break;
            case COMMANDS.SHR:
                for (let i = 0; i < (b & 0x3F); i++) {
                    ret = a >> 1;
                    if (signA && carryIn) {
                        ret |= signBit[sizeOfRet];
                    }
                }
                break;
            default:
        }

        // normalize ret; we need it to always be positive
        if (ret < 0) {
            ret += carryBit[sizeOfRet];
        }
        negative = (ret & signBit[sizeOfRet]) ? 1 : 0;

        // carry is set if the return value is larger than the value we can
        // handle -- preserve carry, since it might have been
        // set during subtraction
        //carry = carry | ((ret > mask[sizeOfRet]) ? 1 : 0);
        carry = carry | ((ret & ~mask[sizeOfRet]) ? 1 : 0);

        // mask off the return value to ensure we don't transmit invalid bits
        ret &= mask[sizeOfRet];

        // overflow is set if the result of the operation is incorrect
        // when performing signed arithmetic
        if ((op === COMMANDS.ADD || op === COMMANDS.MUL) && signA === signB) {
            // this is the only case in which an overflow can occur for addition
            if (signA !== negative) {
                // the return sign is different from one of the input signs
                // we've overflowed.
                overflow = 1;
            }
        } else if (op === COMMANDS.SUB && signA !== signB) {
            if (signA !== negative) {
                overflow = 1;
            }
        }


        // zero is set if return is zero
        zero = ret === 0 ? 1 : 0;

        this.retBus.data = ret;
        this.flagsBus.data = (negative << 3) | (carry << 2) | (overflow << 1) | (zero);
    }

}