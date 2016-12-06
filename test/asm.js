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
              "XOR A, A                    => 04 80",
              "XOR A, B                    => 04 81",
              "XOR A, C                    => 04 82",
              "XOR A, D                    => 04 83",
              "XOR B, A                    => 04 88",
              "XOR B, C                    => 04 8A",
              "CMP A, A                    => 04 C0",
              "CMP A, B                    => 04 C1",
              "CMP A, C                    => 04 C2",
              "CMP A, D                    => 04 C3",
              "CMP B, A                    => 04 C8",
              "CMP B, C                    => 04 CA",
              "SHL A, 0                    => 05 00",
              "SHL B, 1                    => 05 09",
              "SHL C, 2                    => 05 12",
              "SHL D, 3                    => 05 1B",
              "SHR A, 0                    => 05 40",
              "SHR B, 1                    => 05 49",
              "SHR C, 2                    => 05 52",
              "SHR D, 3                    => 05 5B",
              "AND A, A                    => 05 80",
              "AND A, B                    => 05 81",
              "AND A, C                    => 05 82",
              "AND A, D                    => 05 83",
              "AND B, A                    => 05 88",
              "AND B, C                    => 05 8A",
              "OR A, A                     => 05 C0",
              "OR A, B                     => 05 C1",
              "OR A, C                     => 05 C2",
              "OR A, D                     => 05 C3",
              "OR B, A                     => 05 C8",
              "OR B, C                     => 05 CA",
              "NEG A                       => 06 08 00",
              "XCB B                       => 06 10 01",
              "MUL A, B                    => 06 40 01",
              "IDIV A, B                   => 06 41 01",
              "IMOD A, B                   => 06 42 01",
              "MFILL SB:B, D * C           => 06 6D 0B",
              "MSWAP SB:B, DB:D * C        => 06 6E 4B",
              "MCOPY SB:B, DB:D * C        => 06 6F 4B",
              "IN AL, 0x40                 => 06 70 40",
              "OUT CL, 0x40                => 06 7A 40",
              "SWAP C, A                   => 06 D0",
              "INC B                       => 11",
              "DEC D                       => 1B",
              "IF Z                        => 20",
              "IF O                        => 23",
              "IF I                        => 27",
              "IFN Z                       => 28",
              "IFN O                       => 2B",
              "IFN I                       => 2F",
              "SET Z                       => 30",
              "SET O                       => 33",
              "SET I                       => 37",
              "CLR Z                       => 38",
              "CLR O                       => 3B",
              "CLR I                       => 3F",
              "PUSH A                      => E0",
              "PUSH SB                     => EC",
              "PUSH PC                     => EF",
              "POP A                       => F0",
              "POP SB                      => FC",
              "POP FLAGS                   => FE",
              "RET                         => FF",
              "MOV A, A                    => C0",
              "MOV A, B                    => C1",
              "MOV A, D                    => C3",
              "MOV Y, D                    => D7",
              "MOV C, X                    => 06 94",
              "BR +127                     => 07 01 00 7F",
              "BR -32768                   => 07 01 80 00",
              "CALL +127                   => 07 41 00 7F",
              "CALL -1                     => 07 41 FF FF"
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