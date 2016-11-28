import Asm from "../js/Asm.js";

let expect = require("chai").expect;

describe("#ASM", () => {
    let asm;
    beforeEach(() => {
        asm = new Asm();
    });
    describe("#create", () => {
        it ("should be able to create a new Assembler instance", () => {
            expect(asm).to.exist;
        });
    });
    describe("#parsing", () => {
        let expectedParseResult;
        beforeEach(() => {
            expectedParseResult = {
                label: "",
                directive: "",
                opcode: "",
                operands: [],
                expectedAssembly: [],
                comment: ""
            };
        });
        describe("#empty", () => {
            it("should be able to parse an empty instruction", () => {
                let r = Asm.parseSingleInstruction("");
                expect(r).to.deep.equal(expectedParseResult);
            });
            it("should be able to parse an empty instruction with whitespace", () => {
                let r = Asm.parseSingleInstruction("                              ");
                expect(r).to.deep.equal(expectedParseResult);
            });
        });
        describe ("#comments", () => {
            it ("should be able to parse a comment with no instruction", () => {
                let r = Asm.parseSingleInstruction("# this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r).to.deep.equal(expectedParseResult);
            });
            it ("should be able to parse a comment with only a directive", () => {
                let r = Asm.parseSingleInstruction(".code = 0x1000 # this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r.comment).to.equal(expectedParseResult.comment);
            });
            it ("should be able to parse a comment with only a label", () => {
                let r = Asm.parseSingleInstruction("label: # this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r.comment).to.equal(expectedParseResult.comment);
            });
            it ("should be able to parse a comment with an instruction", () => {
                let r = Asm.parseSingleInstruction("MOV A, B # this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r.comment).to.equal(expectedParseResult.comment);
            });
        });
        describe ("#directives", () => {
            it ("should be able to parse a directive with no instruction", () => {
                let r = Asm.parseSingleInstruction(".main");
                expectedParseResult.directive = "main";
                expect(r).to.deep.equal(expectedParseResult);
            });
        });
    });

    describe("#single-line assembly", () => {
        let instructionTests =
            [ "NOP                         => 00",
              "ENTER 0x40                  => 01 40",
              "ENTER 64                    => 01 40",
              "ENTER AL                                    # 0x8010",
              "EXIT 0x40                   => 02 40",
              "EXIT 64                     => 02 40",
              "TRAP AL                     => 03",
              "TRAP A                                      # 0x8031",
              "TRAP 0x40                   => 06 01 40",
              "TRAP 64                     => 06 01 40",
              "ADD A, A                    => 04 00",
              "ADD A, B                    => 04 01",
              "ADD A, C                    => 04 02",
              "ADD A, D                    => 04 03",
              "ADD B, A                    => 04 08",
              "ADD B, C                    => 04 0A",
              "SUB A, A                    => 04 40",
              "SUB A, B                    => 04 41",
              "SUB A, C                    => 04 42",
              "SUB A, D                    => 04 43",
              "SUB B, A                    => 04 48",
              "SUB B, C                    => 04 4A",
              "RET                         => FF",
            ]
        instructionTests.forEach(text => it(text, () => {
            let p = Asm.parseSingleInstruction(text);
            try {
                let i = Asm.assembleSingleInstruction(text);
                // if we get here and i.length > 0, then we've matched the expected assembly
                expect(i.instruction.length).to.be.greaterThan(0);
            } catch (err)  {
                if (p.comment) {
                    // some instructions we want to fail -- make sure we fail in the expected manner
                    expect(err.code).to.be.equal(Number(p.comment).valueOf());
                } else {
                    throw err;
                }
            }
        }));
    });
});