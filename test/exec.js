import Asm from "../js/Asm.js";
import Cpu from "../js/Cpu.js";
import IO from "../js/IO.js";
import Memory from "../js/Memory.js";
import memoryLayout from "../js/memoryLayout.js";

let fs = require("fs");
let path = require("path");

let expect = require("chai").expect;

describe ("#exec", () => {
    let asm, cpu;
    beforeEach(() => {
        asm = new Asm();
        cpu = new Cpu((new Memory(memoryLayout)), (new IO()));
        cpu.registers[cpu.registerMap.PC].U16 = 0x1000;
    });
    afterEach(function()  {
        if (this.currentTest.state === "failed") {
            cpu.dump();
        }
    });

    [
        ["Increment, no carry", [
            "XOR A, A",
            "INC A",
        ], { A: 0x0001, }, 
           { V: 0, C: 0, N: 0, Z: 0 }],

        ["Increment, carry", [
            "LDI A, 0xFFFF",
            "INC A",
        ], { A: 0x0000, }, 
           { V: 0, C: 1, N: 0, Z: 1 }],

        ["Decrement, no carry (indicating borrow)", [
            "XOR A, A",
            "DEC A",
        ], { A: 0xFFFF, }, 
           { V: 0, C: 0, N: 1, Z: 0 }],

        ["Decrement, carry (indicating no borrow)", [
            "LDI A, 0xFFFF",
            "DEC A",
        ], { A: 0xFFFE, }, 
           { V: 0, C: 1, N: 1, Z: 0 }],

        ["Simple addition", [
            "LDI A, 0x0010",
            "MOV B, A",
            "LDI A, 0x0002",
            "ADD A, B",
        ], { A: 0x0012, }, 
           { V: 0, C: 0, N: 0, Z: 0 }],

        ["Addition expecting carry", [
            "LDI A, 0xFFFF",
            "MOV B, A",
            "LDI A, 0xFFFF",
            "ADD A, B",
        ], { A: 0xFFFE, }, 
           { V: 0, C: 1, N: 1, Z: 0 }],

        ["Addition expecting overflow, not zero", [
            "LDI A, 0x7FFF",
            "MOV B, A",
            "LDI A, 0x0001",
            "ADD A, B",
        ], { A: 0x8000, }, 
           { V: 1, C: 0, N: 1, Z: 0 }],

        ["Addition expecting carry and zero", [
            "LDI A, 0xFFFF",
            "MOV B, A",
            "LDI A, 0x0001",
            "ADD A, B",
        ], { A: 0x0000, }, 
           { V: 0, C: 1, N: 0, Z: 1 }],

        ["Simple multiply", [
            "LDI A, 0x0010",
            "MOV B, A",
            "LDI A, 0x0002",
            "XOR C, C",
            "MUL C*A, B",
        ], { A: 0x0020, }, 
           { V: 0, C: 0, N: 0, Z: 0 }],

        ["Multiply, 64-bits", [
            "LDI A, 0x0010",
            "MOV B, A",
            "XOR C, C",
            "LDI A, 0x8000",
            "MUL C*A, B",
        ], { A: 0x0000, C: 0x0008}, 
           { V: 1, C: 1, N: 0, Z: 1 }],

    ].forEach((test) => {
        let name = test[0];
        let instructions = test[1];
        let expectedRegisters = test[2];
        let expectedFlags = test[3];
        it (name, () => {
            // always start execution at 0x01000
            instructions.unshift(".code 0x01000");

            // and halt when done
            instructions.push("halt 0x00");

            // assemble and write to memory
            asm.assemble(instructions);
            asm.writeToMemory(cpu.memory);

            // run CPU until halt
            cpu.running = true;
            while (!cpu.paused) {
                cpu.step();
            }

            // check registers
            for (let regName of Object.keys(expectedRegisters)) {
                let regValue = expectedRegisters[regName];
                expect(cpu.registers[cpu.registerMap[regName]].U16).to.be.equal(regValue);
            }

            // and flags
            for (let flagName of Object.keys(expectedFlags)) {
                let flagValue = expectedFlags[flagName];
                expect(cpu.getFlag(cpu.flagMap[flagName])).to.be.equal(flagValue === 1);
            }
        });
    });
});