/* global describe, it, beforeEach, __dirname */
let fs = require("fs");
let path = require("path");

let expect = require("chai").expect;

import Asm from "../src/asm/Asm.js";
import hexUtils from "../src/util/hexUtils";

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
                directiveData: "",
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
                let r = Asm.parseSingleInstruction("; this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r).to.deep.equal(expectedParseResult);
            });
            it ("should be able to parse a comment with only a directive", () => {
                let r = Asm.parseSingleInstruction(".code = 0x1000 ; this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r.comment).to.equal(expectedParseResult.comment);
            });
            it ("should be able to parse a comment with only a label", () => {
                let r = Asm.parseSingleInstruction("label: ; this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r.comment).to.equal(expectedParseResult.comment);
            });
            it ("should be able to parse a comment with an instruction", () => {
                let r = Asm.parseSingleInstruction("MOV A, B ; this is a comment");
                expectedParseResult.comment = " this is a comment";
                expect(r.comment).to.equal(expectedParseResult.comment);
            });
        });
        describe ("#directives", () => {
            it ("should be able to parse a directive with no extra data", () => {
                let r = Asm.parseSingleInstruction(".main");
                expectedParseResult.directive = "main";
                expect(r).to.deep.equal(expectedParseResult);
            });
            it ("should be able to parse a directive with extra data", () => {
                let r = Asm.parseSingleInstruction(".code 0x0100");
                expectedParseResult.directive = "code";
                expectedParseResult.directiveData = "0x0100";
                expect(r).to.deep.equal(expectedParseResult);
            });
        });
    });

    describe("#single-line assembly", () => {
        let instructionTests =
            [ "NOP                         => 00",
              "HALT 0x00                   => 06 14 00",
              "ENTER 0x40                  => 01 40",
              "ENTER 64                    => 01 40",
              "ENTER AL                                    ; 0x8010",
              "EXIT 0x40                   => 02 40",
              "EXIT 64                     => 02 40",
              "TRAP AL                     => 03",
              "TRAP A                                      ; 0x8031",
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
              "SHL A, A                    => 05 00",
              "SHL B, B                    => 05 09",
              "SHL C, C                    => 05 12",
              "SHL D, D                    => 05 1B",
              "SHR A, A                    => 05 40",
              "SHR B, B                    => 05 49",
              "SHR C, C                    => 05 52",
              "SHR D, D                    => 05 5B",
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
              "MUL C:A, B                  => 06 40 81",
              "IDIV C:A, B                 => 06 41 81",
              "IMOD C:A, B                 => 06 42 81",
              "MFILL SB:B, DL * C          => 06 6D 0B",
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
              "SETR AL, 0b00001111         => 06 20 0F",
              "CLRR AL, 0b00001111         => 06 28 0F",
              "IFR AL, 0b00001111          => 06 30 0F",
              "IFNR AL, 0b00001111         => 06 38 0F",
              "SETR DL, 0b00001111         => 06 23 0F",
              "CLRR DL, 0b00001111         => 06 2B 0F",
              "IFR DL, 0b00001111          => 06 33 0F",
              "IFNR DL, 0b00001111         => 06 3B 0F",
              "PUSHA                       => 06 18",
              "POPA                        => 06 19",
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
              "BR +127                     => 07 09 00 7F",
              "BR -32768                   => 07 09 80 00",
              "CALL +127                   => 07 49 00 7F",
              "CALL -1                     => 07 49 FF FF",
              "CALL [0x2000]               => 07 51 20 00",
              "LDI AL, 0x80                => 40 80",
              "LDI A, 0x0080               => 49 00 80",
              "LDS AL, [0x2000]            => 50 20 00",
              "LDS A, [0x2000]             => 51 20 00",
              "LDS A, [0x2000+Y]           => 53 20 00",
              "LDS A, [0x2000+X]           => 55 20 00",
              "LDS A, [0x2000+X+Y]         => 57 20 00",
              "LDS A, (0x2000)             => 59 20 00",
              "LDS A, (0x2000)+Y           => 5B 20 00",
              "LDS A, (0x2000+X)           => 5D 20 00",
              "LDS A, (0x2000+X)+Y         => 5F 20 00",
              "LDS A, [BP]                 => 61 00 00",
              "LDS A, [BP+0x2000]          => 61 20 00",
              "LDS A, [BP+Y]               => 63 00 00",
              "LDS A, [BP+0x2000+Y]        => 63 20 00",
              "LDS A, [BP+0x2000+X]        => 65 20 00",
              "LDS A, [BP+0x2000+X+Y]      => 67 20 00",
              "LDS A, (BP+0x2000)          => 69 20 00",
              "LDS A, (BP+0x2000)+Y        => 6B 20 00",
              "LDS A, (BP+0x2000+X)        => 6D 20 00",
              "LDS A, (BP+0x2000+X)+Y      => 6F 20 00",
              "LDS A, [D]                  => 71",
              "LDS A, [D+Y]                => 73",
              "LDS A, [D+X]                => 75",
              "LDS A, [D+X+Y]              => 77",
              "LDS A, (D)                  => 79",
              "LDS A, (D)+Y                => 7B",
              "LDS A, (D+X)                => 7D",
              "LDS A, (D+X)+Y              => 7F",
              "LDD AL, 0x80                => 07 80 80",
              "LDD A, 0x0080               => 07 89 00 80",
              "LDD AL, [0x2000]            => 07 90 20 00",
              "LDD A, [0x2000]             => 07 91 20 00",
              "LDD A, [0x2000+Y]           => 07 93 20 00",
              "LDD A, [0x2000+X]           => 07 95 20 00",
              "LDD A, [0x2000+X+Y]         => 07 97 20 00",
              "LDD A, (0x2000)             => 07 99 20 00",
              "LDD A, (0x2000)+Y           => 07 9B 20 00",
              "LDD A, (0x2000+X)           => 07 9D 20 00",
              "LDD A, (0x2000+X)+Y         => 07 9F 20 00",
              "LDD A, [BP]                 => 07 A1 00 00",
              "LDD A, [BP+0x2000]          => 07 A1 20 00",
              "LDD A, [BP+Y]               => 07 A3 00 00",
              "LDD A, [BP+0x2000+Y]        => 07 A3 20 00",
              "LDD A, [BP+0x2000+X]        => 07 A5 20 00",
              "LDD A, [BP+0x2000+X+Y]      => 07 A7 20 00",
              "LDD A, (BP+0x2000)          => 07 A9 20 00",
              "LDD A, (BP+0x2000)+Y        => 07 AB 20 00",
              "LDD A, (BP+0x2000+X)        => 07 AD 20 00",
              "LDD A, (BP+0x2000+X)+Y      => 07 AF 20 00",
              "LDD A, [D]                  => 07 B1",
              "LDD A, [D+Y]                => 07 B3",
              "LDD A, [D+X]                => 07 B5",
              "LDD A, [D+X+Y]              => 07 B7",
              "LDD A, (D)                  => 07 B9",
              "LDD A, (D)+Y                => 07 BB",
              "LDD A, (D+X)                => 07 BD",
              "LDD A, (D+X)+Y              => 07 BF",
              "STD AL, 0x80                => 80 80",
              "STD A, 0x0080               => 89 00 80",
              "STD AL, [0x2000]            => 90 20 00",
              "STD A, [0x2000]             => 91 20 00",
              "STD A, [0x2000+Y]           => 93 20 00",
              "STD A, [0x2000+X]           => 95 20 00",
              "STD A, [0x2000+X+Y]         => 97 20 00",
              "STD A, (0x2000)             => 99 20 00",
              "STD A, (0x2000)+Y           => 9B 20 00",
              "STD A, (0x2000+X)           => 9D 20 00",
              "STD A, (0x2000+X)+Y         => 9F 20 00",
              "STD A, [BP]                 => A1 00 00",
              "STD A, [BP+0x2000]          => A1 20 00",
              "STD A, [BP+Y]               => A3 00 00",
              "STD A, [BP+0x2000+Y]        => A3 20 00",
              "STD A, [BP+0x2000+X]        => A5 20 00",
              "STD A, [BP+0x2000+X+Y]      => A7 20 00",
              "STD A, (BP+0x2000)          => A9 20 00",
              "STD A, (BP+0x2000)+Y        => AB 20 00",
              "STD A, (BP+0x2000+X)        => AD 20 00",
              "STD A, (BP+0x2000+X)+Y      => AF 20 00",
              "STD A, [D]                  => B1",
              "STD A, [D+Y]                => B3",
              "STD A, [D+X]                => B5",
              "STD A, [D+X+Y]              => B7",
              "STD A, (D)                  => B9",
              "STD A, (D)+Y                => BB",
              "STD A, (D+X)                => BD",
              "STD A, (D+X)+Y              => BF",
              "STS AL, 0x80                => 07 C0 80",
              "STS A, 0x0080               => 07 C9 00 80",
              "STS AL, [0x2000]            => 07 D0 20 00",
              "STS A, [0x2000]             => 07 D1 20 00",
              "STS A, [0x2000+Y]           => 07 D3 20 00",
              "STS A, [0x2000+X]           => 07 D5 20 00",
              "STS A, [0x2000+X+Y]         => 07 D7 20 00",
              "STS A, (0x2000)             => 07 D9 20 00",
              "STS A, (0x2000)+Y           => 07 DB 20 00",
              "STS A, (0x2000+X)           => 07 DD 20 00",
              "STS A, (0x2000+X)+Y         => 07 DF 20 00",
              "STS A, [BP]                 => 07 E1 00 00",
              "STS A, [BP+0x2000]          => 07 E1 20 00",
              "STS A, [BP+Y]               => 07 E3 00 00",
              "STS A, [BP+0x2000+Y]        => 07 E3 20 00",
              "STS A, [BP+0x2000+X]        => 07 E5 20 00",
              "STS A, [BP+0x2000+X+Y]      => 07 E7 20 00",
              "STS A, (BP+0x2000)          => 07 E9 20 00",
              "STS A, (BP+0x2000)+Y        => 07 EB 20 00",
              "STS A, (BP+0x2000+X)        => 07 ED 20 00",
              "STS A, (BP+0x2000+X)+Y      => 07 EF 20 00",
              "STS A, [D]                  => 07 F1",
              "STS A, [D+Y]                => 07 F3",
              "STS A, [D+X]                => 07 F5",
              "STS A, [D+X+Y]              => 07 F7",
              "STS A, (D)                  => 07 F9",
              "STS A, (D)+Y                => 07 FB",
              "STS A, (D+X)                => 07 FD",
              "STS A, (D+X)+Y              => 07 FF",
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
                    expect(err.code).to.be.equal(Number(p.comment));
                } else {
                    throw err;
                }
            }
        }));
    });
    describe ("multi-line assembly", () => {
        // it is assumed these tests will have => to mark expected assembly. All we're doing
        // is assembling the code; the process itself will verify generated assembly against
        // expected assembly
        let tests = [
            "../asm/test/charset.asm",
            "../asm/test/hello-world.asm",
            "../asm/test/banner.asm",
        ];

        tests.forEach(filename => it(filename, () => {
            let fileContents = fs.readFileSync(path.join(__dirname, filename), {encoding: "utf8"});
            fileContents = fileContents.split(/\n/g);
            try {
                let asm = new Asm();
                asm.assemble(fileContents, {filename});
            } catch (err) {
                console.log(`Error ${hexUtils.toHex4(err.code)} at ${err.file}:${err.lineNumber}: ${err.message}`);
                console.log(`${err.input}`);
                throw err;
            }
        }));
    });
});