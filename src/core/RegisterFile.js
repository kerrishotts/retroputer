import { SIZES } from "./ALU";

const _buffer = Symbol("_buffer");
const _byteData = Symbol("_data");
const _wordData = Symbol("_word");

const REGISTER_COUNT = 20;

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
    PC: 18
};

export const FLAGS_INDEX = {
    ZERO: 0,
    CARRY: 1,
    SINGLE_STEP: 2,
    INTERRUPT_SERVICE: 3,
    INTERRUPT_DISABLE: 4,
    EXCEPTION: 5,
    OVERFLOW: 6,
    NEGATIVE: 7
};

export class RegisterFile {
    constructor() {
        this[_buffer] = new ArrayBuffer(REGISTER_COUNT);
        this[_byteData] = new Uint8Array(this[_buffer]);
        this[_wordData] = new Uint16Array(this[_buffer]);
    }

    getRegister(index) {
        if ((index & 0b1) === 0) {
            return this[_wordData][index >> 1];
        } else {
            return this[_byteData][index];
        }
    }

    getSizeOfRegister(index) {
        return (index & 0b1) ? SIZES.BYTE : SIZES.WORD;
    }

    getRegisterMask(index) {
        if ((index & 0b1) === 0) {
            return 0xFFFF;
        } else {
            return 0xFF;
        }
    }

    setRegister(index, value) {
        if ((index & 0b1) === 0) {
            this[_wordData][index >> 1] = value;
        } else {
            this[_byteData][index] = value;
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

    // Flags
    get ZERO()              { return (this.FLAGS & 0b00000001); }
    get CARRY()             { return (this.FLAGS & 0b00000010) >> FLAGS_INDEX.CARRY; }
    get SINGLE_STEP()       { return (this.FLAGS & 0b00000100) >> FLAGS_INDEX.SINGLE_STEP; }
    get INTERRUPT_SERVICE() { return (this.FLAGS & 0b00001000) >> FLAGS_INDEX.INTERRUPT_SERVICE; }
    get INTERRUPT_DISABLE() { return (this.FLAGS & 0b00010000) >> FLAGS_INDEX.INTERRUPT_DISABLE; }
    get EXCEPTION()         { return (this.FLAGS & 0b00100000) >> FLAGS_INDEX.EXCEPTION; }
    get OVERFLOW()          { return (this.FLAGS & 0b01000000) >> FLAGS_INDEX.OVERFLOW; }
    get NEGATIVE()          { return (this.FLAGS & 0b10000000) >> FLAGS_INDEX.NEGATIVE; }

    set ZERO(v)              { this.FLAGS = ((this.FLAGS & 0b11111110) | (v & 0b1)); }
    set CARRY(v)             { this.FLAGS = ((this.FLAGS & 0b11111101) | (v & 0b1) << FLAGS_INDEX.CARRY); }
    set SINGLE_STEP(v)       { this.FLAGS = ((this.FLAGS & 0b11111011) | (v & 0b1) << FLAGS_INDEX.SINGLE_STEP); }
    set INTERRUPT_SERVICE(v) { this.FLAGS = ((this.FLAGS & 0b11110111) | (v & 0b1) << FLAGS_INDEX.INTERRUPT_SERVICE); }
    set INTERRUPT_DISABLE(v) { this.FLAGS = ((this.FLAGS & 0b11101111) | (v & 0b1) << FLAGS_INDEX.INTERRUPT_DISABLE); }
    set EXCEPTION(v)         { this.FLAGS = ((this.FLAGS & 0b11011111) | (v & 0b1) << FLAGS_INDEX.EXCEPTION); }
    set OVERFLOW(v)          { this.FLAGS = ((this.FLAGS & 0b10111111) | (v & 0b1) << FLAGS_INDEX.OVERFLOW); }
    set NEGATIVE(v)          { this.FLAGS = ((this.FLAGS & 0b01111111) | (v & 0b1) << FLAGS_INDEX.NEGATIVE); }

}