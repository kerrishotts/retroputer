import test from "ava";

import { RegisterFile } from "../src/core/RegisterFile.js";

test("Can create the register file", t => {
    let registers;
    t.notThrows(() => registers = new RegisterFile());
});

Array.from({length: 24}, (_, idx) => idx).forEach(idx => {
    test(`Can assign and read the same value to r${idx}`, t => {
        const registers = new RegisterFile();
        registers.setRegister(idx, 123);
        t.is(registers.getRegister(idx), 123);
    });
});

Array.from({length: 12}, (_, idx) => idx).forEach(idx => {
    const reg = idx * 2;
    test(`Can assign and read the same word value to r${reg}`, t => {
        const registers = new RegisterFile();
        registers.setRegister(reg, 45192);
        t.is(registers.getRegister(reg), 45192);
    });
});

const wordRegisters = ["A", "B", "C", "D", "X", "Y", "BP", "SP", "STATUS", "PC"];
const byteRegisters = ["AL", "BL", "CL", "DL", "XL", "YL", "FLAGS"];
const flags = ["CARRY", "OVERFLOW", "NEGATIVE", "ZERO", "SINGLE_STEP", "INTERRUPT_DISABLE", "INTERRUPT_SERVICE", "EXCEPTION"];

wordRegisters.forEach(reg => {
    test(`Can assign and read the same word from ${reg}`, t => {
        const registers = new RegisterFile();
        registers[reg] = 49152;
        t.is(registers[reg], 49152);
    });
});

byteRegisters.forEach(reg => {
    test(`Can assign and read the same byte from ${reg}`, t => {
        const registers = new RegisterFile();
        registers[reg] = 123;
        t.is(registers[reg], 123);
    });
});

flags.forEach(flag => {
    test(`Can clear ${flag}`, t => {
        const registers = new RegisterFile();
        registers[flag] = 0;
        t.is(registers[flag], 0);
    });
    test(`Can set ${flag}`, t => {
        const registers = new RegisterFile();
        registers[flag] = 1;
        t.is(registers[flag], 1);
    });
});