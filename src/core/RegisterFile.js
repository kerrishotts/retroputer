import { isBigEndian, isLittleEndian } from "../util/endianness.js";
import { SIZES } from "./ALU.js";

const _buffer = Symbol("_buffer");
const _byteData = Symbol("_data");
const _wordData = Symbol("_word");

const REGISTER_COUNT = 24;

export const REGISTER_INDEX = {
    A: 0,
    AL: 1,
    B: 2,
    BL: 3,
    C: 4,
    CL: 5,
    D: 6,
    DL: 7,
    X: 8,
    XL: 9,
    Y: 10,
    YL: 11,
    BP: 12,
    SP: 14,
    STATUS: 16,
    FLAGS: 17,
    PC: 18,
    MM: 20,
    MP: 22
};

export const FLAGS_INDEX = {
    Z: 0,  ZERO:              0, Z_SET_MASK:  0b00000001, Z_CLR_MASK:  0b11111110,
    V: 1,  OVERFLOW:          1, V_SET_MASK:  0b00000010, V_CLR_MASK:  0b11111101,
    C: 2,  CARRY:             2, C_SET_MASK:  0b00000100, C_CLR_MASK:  0b11111011,
    N: 3,  NEGATIVE:          3, N_SET_MASK:  0b00001000, N_CLR_MASK:  0b11110111,
    SS: 4, SINGLE_STEP:       4, SS_SET_MASK: 0b00010000, SS_CLR_MASK: 0b11101111,
    IS: 5, INTERRUPT_SERVICE: 5, IS_SET_MASK: 0b00100000, IS_CLR_MASK: 0b11011111,
    ID: 6, INTERRUPT_DISABLE: 6, ID_SET_MASK: 0b01000000, ID_CLR_MASK: 0b10111111,
    EX: 7, EXCEPTION:         7, EX_SET_MASK: 0b10000000, EX_CLR_MASK: 0b01111111,
};

export class RegisterFile {
    constructor() {
        this[_buffer] = new ArrayBuffer(REGISTER_COUNT);
        this[_byteData] = new Uint8Array(this[_buffer]);
        this[_wordData] = new Uint16Array(this[_buffer]);
    }

    /**
     * @param {number} index 
     */
    getRegister(index) {
        //return (index & 0b1) ? this[_byteData][index] : (this[_byteData][index] << 8) | this[_byteData][index + 1];
        if ((index & 0b1) === 0) {
            return this[_wordData][index >> 1];
            //return (this[_byteData][index] << 8) | this[_byteData][index+1];
        } else {
            return this[_byteData][index - (isLittleEndian ? 1 : 0)];
        }
    }

    /**
     * @param {number} index 
     */
    getSizeOfRegister(index) {
        return (index & 0b1) ? SIZES.BYTE : SIZES.WORD;
    }

    /**
     * @param {number} index 
     */
    getRegisterMask(index) {
        //return (index & 0b1) ? 0xFF : 0xFFFF;
        if ((index & 0b1) === 0) {
            return 0xFFFF;
        } else {
            return 0xFF;
        }
    }

    /**
     * @param {number} index 
     * @param {number} value
     */
    setRegister(index, value) {
        if ((index & 0b1) === 0) {
            this[_wordData][index >> 1] = value & 0xFFFF;
            /*this[_byteData][index] = (value & 0xFF00) >> 8;
            this[_byteData][index + 1] = value & 0x00FF;*/
        } else {
            this[_byteData][index - (isLittleEndian ? 1 : 0)] = value;
            //this[_byteData][index] = value;
        }
    }

    // Registers
    get A() { return this.getRegister(REGISTER_INDEX.A); }
    get AL() { return this.getRegister(REGISTER_INDEX.AL); }
    get B() { return this.getRegister(REGISTER_INDEX.B); }
    get BL() { return this.getRegister(REGISTER_INDEX.BL); }
    get C() { return this.getRegister(REGISTER_INDEX.C); }
    get CL() { return this.getRegister(REGISTER_INDEX.CL); }
    get D() { return this.getRegister(REGISTER_INDEX.D); }
    get DL() { return this.getRegister(REGISTER_INDEX.DL); }
    get X() { return this.getRegister(REGISTER_INDEX.X); }
    get XL() { return this.getRegister(REGISTER_INDEX.XL); }
    get Y() { return this.getRegister(REGISTER_INDEX.Y); }
    get YL() { return this.getRegister(REGISTER_INDEX.YL); }
    get BP() { return this.getRegister(REGISTER_INDEX.BP); }
    get SP() { return this.getRegister(REGISTER_INDEX.SP); }
    get STATUS() { return this.getRegister(REGISTER_INDEX.STATUS); }
    get FLAGS() { return this.getRegister(REGISTER_INDEX.FLAGS); }
    get PC() { return this.getRegister(REGISTER_INDEX.PC); }
    get MM() { return this.getRegister(REGISTER_INDEX.MM); }
    get MP() { return this.getRegister(REGISTER_INDEX.MP); }

    set A(v) { this.setRegister(REGISTER_INDEX.A, v); }
    set AL(v) { this.setRegister(REGISTER_INDEX.AL, v); }
    set B(v) { this.setRegister(REGISTER_INDEX.B, v); }
    set BL(v) { this.setRegister(REGISTER_INDEX.BL, v); }
    set C(v) { this.setRegister(REGISTER_INDEX.C, v); }
    set CL(v) { this.setRegister(REGISTER_INDEX.CL, v); }
    set D(v) { this.setRegister(REGISTER_INDEX.D, v); }
    set DL(v) { this.setRegister(REGISTER_INDEX.DL, v); }
    set X(v) { this.setRegister(REGISTER_INDEX.X, v); }
    set XL(v) { this.setRegister(REGISTER_INDEX.XL, v); }
    set Y(v) { this.setRegister(REGISTER_INDEX.Y, v); }
    set YL(v) { this.setRegister(REGISTER_INDEX.YL, v); }
    set BP(v) { this.setRegister(REGISTER_INDEX.BP, v); }
    set SP(v) { this.setRegister(REGISTER_INDEX.SP, v); }
    set STATUS(v) { this.setRegister(REGISTER_INDEX.STATUS, v); }
    set FLAGS(v) { this.setRegister(REGISTER_INDEX.FLAGS, v); }
    set PC(v) { this.setRegister(REGISTER_INDEX.PC, v); }
    set MM(v) { this.setRegister(REGISTER_INDEX.MM, v); }
    set MP(v) { this.setRegister(REGISTER_INDEX.MP, v); }

    // Flags
    get ZERO()              { return (this.FLAGS & FLAGS_INDEX.Z_SET_MASK ); }
    get CARRY()             { return (this.FLAGS & FLAGS_INDEX.C_SET_MASK ) >> FLAGS_INDEX.CARRY; }
    get SINGLE_STEP()       { return (this.FLAGS & FLAGS_INDEX.SS_SET_MASK) >> FLAGS_INDEX.SINGLE_STEP; }
    get INTERRUPT_SERVICE() { return (this.FLAGS & FLAGS_INDEX.IS_SET_MASK) >> FLAGS_INDEX.INTERRUPT_SERVICE; }
    get INTERRUPT_DISABLE() { return (this.FLAGS & FLAGS_INDEX.ID_SET_MASK) >> FLAGS_INDEX.INTERRUPT_DISABLE; }
    get EXCEPTION()         { return (this.FLAGS & FLAGS_INDEX.EX_SET_MASK) >> FLAGS_INDEX.EXCEPTION; }
    get OVERFLOW()          { return (this.FLAGS & FLAGS_INDEX.V_SET_MASK ) >> FLAGS_INDEX.OVERFLOW; }
    get NEGATIVE()          { return (this.FLAGS & FLAGS_INDEX.N_SET_MASK ) >> FLAGS_INDEX.NEGATIVE; }

    set ZERO(v)              { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.Z_CLR_MASK)  | (v && FLAGS_INDEX.Z_SET_MASK)); }
    set CARRY(v)             { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.C_CLR_MASK)  | (v && FLAGS_INDEX.C_SET_MASK)); }
    set SINGLE_STEP(v)       { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.SS_CLR_MASK) | (v && FLAGS_INDEX.SS_SET_MASK)); }
    set INTERRUPT_SERVICE(v) { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.IS_CLR_MASK) | (v && FLAGS_INDEX.IS_SET_MASK)); }
    set INTERRUPT_DISABLE(v) { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.ID_CLR_MASK) | (v && FLAGS_INDEX.ID_SET_MASK)); }
    set EXCEPTION(v)         { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.EX_CLR_MASK) | (v && FLAGS_INDEX.EX_SET_MASK)); }
    set OVERFLOW(v)          { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.V_CLR_MASK)  | (v && FLAGS_INDEX.V_SET_MASK)); }
    set NEGATIVE(v)          { this.FLAGS = ((this.FLAGS & FLAGS_INDEX.N_CLR_MASK)  | (v && FLAGS_INDEX.N_SET_MASK)); }

    toJSON() {
        return {
            A: this.A,
            B: this.B,
            C: this.C,
            D: this.D,
            X: this.X,
            Y: this.Y,
            BP: this.BP,
            SP: this.SP,
            STATUS: this.STATUS,
            PC: this.PC,
            MP: this.MP,
            MM: this.MM,
            FLAGS: {
                ZERO: this.ZERO,
                CARRY: this.CARRY,
                SINGLE_STEP: this.SINGLE_STEP,
                INTERRUPT_SERVICE: this.INTERRUPT_SERVICE,
                INTERRUPT_DISABLE: this.INTERRUPT_DISABLE,
                EXCEPTION: this.EXCEPTION,
                OVERFLOW: this.OVERFLOW,
                NEGATIVE: this.NEGATIVE
            }
        };
    }
}