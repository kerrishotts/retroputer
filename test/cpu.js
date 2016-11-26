import CPU from "../js/Cpu.js";
import Memory from "../js/Memory.js";
import Screen from "../js/Screen.js";
import memoryLayout from "../js/memoryLayout.js";

let expect = require("chai").expect;

describe("#CPU", () => {
    let cpu, memory, expectedPC;
    beforeEach(() => {
        memory = new Memory(memoryLayout);
        memory.init();
        cpu = new CPU(memory);
    });
    describe("#create", () => {
        it ("should be able to create a new CPU instance", () => {
            expect(cpu).to.exist;
        });
    });
    describe("#fetch", () => {

    });
    describe("#decode", () => {
        afterEach(function()  {
            if (this.currentTest.state === "failed") {
                cpu.dump();
            }
            cpu.advancePC();
            expect(cpu.registers[cpu.registerMap.PC].U16).to.equal(expectedPC);
        });
        describe("#one byte intructions", () => {
            beforeEach( () => {
                expectedPC = 0x0001;
            });
            it("RET", () => { 
                cpu.state.instruction = [0xFF]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.RET);
            });
            it("POP A", () => { 
                cpu.state.instruction = [0xF0]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.POP);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.A); 
            });
            it("POP C", () => { 
                cpu.state.instruction = [0xF2]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.POP);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.C);
            });
            it("POP FLAGS", () => { 
                cpu.state.instruction = [0xFE]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.POP);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.Flags);
            });
            it("PUSH A", () => {
                cpu.state.instruction = [0xE0]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.PUSH);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.A); 
            });
            it("PUSH D", () => {
                cpu.state.instruction = [0xE3]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.PUSH);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.D); 
            });
            it("PUSH PC", () => {
                cpu.state.instruction = [0xEF]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.PUSH);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.PC); 
            });
            it("MOV A, A", () => {
                cpu.state.instruction = [0xC0]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.MOVE);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.A); 
                expect(cpu.state.srcRegister).to.equal(cpu.registerMap.A); 
            });
            it("MOV C, B", () => {
                cpu.state.instruction = [0b11001001]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.MOVE);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.C); 
                expect(cpu.state.srcRegister).to.equal(cpu.registerMap.B); 
            });
            it("TRAP AL", () => {
                cpu.state.instruction = [0x03]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.TRAP);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.AL);
            });
            it("NOP", () => {
                cpu.state.instruction = [0x00]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.NOP);
            });
        });

        describe("#two byte instructions", () => {
            beforeEach( () => {
                expectedPC = 0x0002;
            });
            it("ENTER 0x32", () => {
                cpu.state.instruction = [0x01, 0x32]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.ENTER);
                expect(cpu.state.imm8).to.equal(0x32);
            });
            it("EXIT 0xEF", () => {
                cpu.state.instruction = [0x02, 0xEF]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.EXIT);
                expect(cpu.state.imm8).to.equal(0xEF);
            });
            it("ADD B, D", () => {
                cpu.state.instruction = [0x04, 0b00001011]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.ADD);
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.B); 
                expect(cpu.state.srcRegister).to.equal(cpu.registerMap.D); 
            });

        });

        describe("#three byte instructions", () => {
            beforeEach( () => {
                expectedPC = 0x0003;
            });
            it("MOV C:00110011, B", () => {
                cpu.state.instruction = [0x06, 0b10010001, 0b00110011]; cpu.decode(false);
                expect(cpu.state.semantic).to.equal(cpu.semantics.MOVE)
                expect(cpu.state.destRegister).to.equal(cpu.registerMap.C); 
                expect(cpu.state.srcRegister).to.equal(cpu.registerMap.B); 
                expect(cpu.state.imm8).to.equal(0b00110011);
            });
        });

        describe("#four byte instructions", () => {
            beforeEach( () => {
                expectedPC = 0x0004;
            });
        });

    });
    describe("#execute", () => {

    });
});