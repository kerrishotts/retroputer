import hexUtils from "../util/hexUtils.js";
import twosComplement from "../util/twosComplement.js";

let semantics = {
      NOP:     0x00, MOVE:    0x10, SWAP:    0x11, LOAD:    0x20,
      STORE:   0x21, IN:      0x28, OUT:     0x29, MEMFILL: 0x2D,
      MEMCOPY: 0x2E, MEMSWAP: 0x2F, PUSH:    0x30, POP:     0x31,
      PUSHA:   0x32, POPA:    0x33,
      ADD:     0x40, INC:     0x41, SUB:     0x48, DEC:     0x49,
      CMP:     0x4F, IMUL:    0x50, IDIV:    0x51, IMOD:    0x52,
      SHL:     0x58, SHR:     0x59, ROL:     0x5A, ROR:     0x5B,
      XOR:     0x5C, AND:     0x5D, OR:      0x5E, NEG:     0x5F,
      SETFLAG: 0x60, CLRFLAG: 0x61,
      IFR:     0x64, IFNR:    0x65, SETR:    0x66, CLRR:    0x67,
      IFFLAG:  0x68, IFNFLAG: 0x69,
      BR:      0x70, CALL:    0x71, ENTER:   0x72, EXIT:    0x73,
      TRAP:    0x74, BYTESWAP:0x78, RET:     0x7F, HALT:    0x80,
      LOOP:    0x7A,
      BADOP:   0xFF
    };

let semanticAssemblyMap = {
      NOP:     "nop"            ,MOVE:    "mov DR, SR"    ,SWAP:    "swap DR, SR"   ,LOAD:    "ldB DR, OP",
      STORE:   "stB SR, OP"     ,IN:      "in SR, U8"     ,OUT:     "out SR, U8"    ,MEMFILL: "mfill DbS : DR, SR * C",
      MEMCOPY: "mcopy DbS : DR, SbS : SR * C"             ,MEMSWAP: "mswap DbS : DR, SbS : SR * C",
      PUSH:    "push SR"        ,POP:     "pop DR",
      PUSHA:   "pusha"          ,POPA:    "popa"          ,
      ADD:     "add DR, SR"     ,INC:     "inc SR"        ,SUB:     "sub DR, SR"    ,DEC:     "dec SR",
      CMP:     "cmp DR, SR"     ,IMUL:    "mul OR : DR, SR"    ,IDIV:    "idiv OR : DR, SR"   ,IMOD:    "imod OR : DR, SR",
      SHL:     "shl DR, SR"     ,SHR:     "shr DR, SR"    ,ROL:     "rol DR, SR"    ,ROR:     "ror DR, SR",
      XOR:     "xor DR, SR"     ,AND:     "and DR, SR"    ,OR:      "or DR, SR"     ,NEG:     "neg DR",
      SETFLAG: "set F"          ,CLRFLAG: "clr F"         ,
      IFR:     "ifr SR, U8"     ,IFNR:    "ifnr SR, U8"   ,SETR:    "setr SR, U8"   ,CLRR:    "clrr SR, U8",
      IFFLAG:  "if F"           ,IFNFLAG: "ifn F"         ,
      BR:      "br OP"          ,CALL:    "call OP"       ,ENTER:   "enter U8"      ,EXIT:    "exit U8",
      TRAP:    "trap OP"        ,BYTESWAP:"xcb SR"        ,RET:     "ret"           ,HALT:    "halt U8",
      LOOP:    "loop LR, S8",
      BADOP:   "???"
    };

let semanticsMap = Object.keys(semantics).reduce((p, c) => {
      p[semantics[c]] = c;
      return p;
    }, {});

/**
 * Given a `cpu` state, return the assembly instruction that best matches
 *
 * @param {Cpu} cpu     the cpu with state to decode
 * @return {string}     the matching assembly statement
 */
function mapStateToAsm(cpu) {
    let asm = semanticAssemblyMap[semanticsMap[cpu.state.semantic]] || "";

    asm = asm.replace("B", ["s", "d"][cpu.state.whichBank]);
    asm = asm.replace("F", cpu.flagMap[cpu.state.flag]);
    asm = asm.replace("DbS", cpu.registerMap[cpu.state.destBank === 0 ? "SB" : "DB"]);
    asm = asm.replace("SbS", cpu.registerMap[cpu.state.destBank === 0 ? "SB" : "DB"]);
    asm = asm.replace("OR", cpu.registerMap[cpu.state.othRegister] || "BAD");
    asm = asm.replace("SR", cpu.registerMap[cpu.state.srcRegister] || "BAD");
    asm = asm.replace("LR", cpu.registerMap[cpu.state.srcRegister] || "BAD");
    asm = asm.replace("DR", cpu.registerMap[cpu.state.destRegister] || "BAD");
    asm = asm.replace("U8", hexUtils.toHex2(cpu.state.imm8));
    asm = asm.replace("S8", twosComplement.from8(cpu.state.imm8));


    if (asm.indexOf("OP") > -1) {
        // special handling
        switch (cpu.state.semantic) {
            case semantics.LOAD:
            case semantics.STORE:
            case semantics.BR:
            case semantics.CALL:
                {
                    asm = asm.replace(/\(L\)/g, cpu.state.scale === 0 ? "L" : "");
                    let relative = false;
                    let brackets = (cpu.state.addressingMode & 1) === 0 ? "[]" : "()";
                    let indexByX = cpu.state.indexByX ? "+X" : "";
                    let indexByY = cpu.state.indexByY ? "+Y" : "";
                    if (cpu.state.semantic === cpu.semantics.BR ||
                        cpu.state.semantic === cpu.semantics.CALL) {
                        relative = true;
                    }
                    switch (cpu.state.addressingMode) {
                        case 0: asm = asm.replace("OP", relative ? twosComplement.from8(cpu.state.imm8) : hexUtils.toHex2(cpu.state.imm8) ); break;
                        case 1: asm = asm.replace("OP", relative ? twosComplement.from16(cpu.state.imm16) : hexUtils.toHex4(cpu.state.imm16) ); break;
                        case 2: asm = asm.replace("OP", brackets[0] + hexUtils.toHex4(cpu.state.imm16) + indexByX + indexByY + brackets[1]); break;
                        case 3: asm = asm.replace("OP", brackets[0] + hexUtils.toHex4(cpu.state.imm16) + indexByX + brackets[1] + indexByY); break;
                        case 4: asm = asm.replace("OP", brackets[0] + "BP+" + hexUtils.toHex4(cpu.state.imm16) + indexByX + indexByY + brackets[1]); break;
                        case 5: asm = asm.replace("OP", brackets[0] + "BP+" + hexUtils.toHex4(cpu.state.imm16) + indexByX + brackets[1] + indexByY); break;
                        case 6: asm = asm.replace("OP", brackets[0] + "D" + indexByX + indexByY + brackets[1]); break;
                        case 7: asm = asm.replace("OP", brackets[0] + "D" + indexByX + brackets[1] + indexByY); break;
                        default:
                    }
                }
                break;
            case semantics.TRAP:
                asm = asm.replace("OP",  (cpu.state.opcode === 0x03 ? "AL" : hexUtils.toHex2(cpu.state.imm8)));
                break;
            default:
        }
    } else {
        asm = asm.replace(/\(L\)/g, "");
    }

    return asm;
}

function addUpdatingFlags(cpu, a, b, size = 16) {
    let unsignedSize = (size === 16 ? 65536 : 256);
    let unsignedMax = unsignedSize - 1;
    let signedSize = (size === 16 ? 32768 : 128);
    let signedMax = signedSize - 1;
    let neg = (size === 16 ? 0b1000000000000000 : 0b10000000);

    // clear overflow and carry
    cpu.clrFlag(cpu.flagMap.V);
    cpu.clrFlag(cpu.flagMap.C);

    /*eslint-disable no-var, vars-on-top*/

    // Chrome deopts this because v is modified later ...

    var v = (a & unsignedMax) + (b & unsignedMax);

    /*eslint-enable no-var, vars-on-top*/

    // carry is easy -- use the MSB of the operation
    if (v > unsignedMax) {
        cpu.setFlag(cpu.flagMap.C);
    }

    // handle overflow
    if ( (a & neg) === (b & neg) ) {
        let opSigns = ((a & neg) | (b & neg)) ? 1 : 0;
        let resultSign = (v > signedMax) ? 1 : 0;
        if (opSigns !== resultSign) {
            cpu.setFlag(cpu.flagMap.V);
        }
    }

    v &= unsignedMax;

    return v;
}

function subtractUpdatingFlags (cpu, a, b, size = 16) {
    return addUpdatingFlags(cpu, a, (-b) & (size === 16 ? 0xFFFF : 0xFF), size);
}

/**
 * shifts a by b times in the direction specified by `dir`; rotation is determined
 * by mode
 *
 * @param {Cpu} cpu                 the cpu
 * @param {integer} a               value to shift
 * @param {integer} b               times to shift
 * @param {integer} [size]          size of value we're shifting
 * @param {integer} [dir]           direction; -1 is left, 1 is right
 * @param {integer} [mode]          mode; 0 = shift; 1 = rotate
 * @return {integer}                result
 */
function shiftUpdatingFlags(cpu, a, b, size = 16, dir = -1, mode = 0) {
    let msbmask = (size === 16) ? 0x8000 : 0x80;
    let maxint =  (size === 16) ? 0xFFFF : 0xFF;
    let lsbmask = 0x01;

    /*eslint-disable no-var, vars-on-top*/
    var r = a;

    /*eslint-enable no-var, vars-on-top*/

    cpu.clrFlag(cpu.flagMap.V);
    cpu.clrFlag(cpu.flagMap.C);
    for (let i = 0; i < b; i++) {
        let bitShiftingOut = r & ((dir < 0) ? msbmask : lsbmask);
        r = ((dir < 0) ? r << 1 : r >> 1) & maxint;
        if (mode > 0) {
            // rotating!
            if (bitShiftingOut > 0) {
                r |= (dir < 0) ? lsbmask : msbmask;
            }
        } else {
            // shifting; set carry if bit shifted out
            if (bitShiftingOut > 0) {
                cpu.setFlag(cpu.flagMap.C);
            }
        }
    }

    return r;
}


function handleFlags(cpu, v, size = 16) {
    let unsignedSize = (size === 16 ? 65536 : 256);
    let unsignedMax = unsignedSize - 1;
    let signedSize = (size === 16 ? 32768 : 128);
    let signedMax = signedSize - 1;


    // handle Zero flag
    (v !== 0) ? cpu.clrFlag(cpu.flagMap.Z) : cpu.setFlag(cpu.flagMap.Z);

    // handle Negative flag
    cpu.clrFlag(cpu.flagMap.N);

    if (v < 0) { v = (unsignedSize + v) & unsignedMax; }
    if (v > signedMax) {
        cpu.setFlag(cpu.flagMap.N);
    }

    return v & unsignedMax;
}

function getAddr(cpu, bankSelect) {

    /*eslint-disable no-var, vars-on-top*/
    var addr;

    /*eslint-enable no-var, vars-on-top*/
    let indirect = Boolean(cpu.state.addressingMode & 1);
    switch (cpu.state.addressingMode) {
        case 2:
        case 3:
            addr = cpu.state.imm16;
            break;
        case 4:
        case 5:
            addr = twosComplement.from16(cpu.state.imm16);
            addr = cpu.registers[cpu.registerMap.BP].U16 + addr;
            break;
        case 6:
        case 7:
            addr = cpu.registers[cpu.registerMap.D].U16;
            break;
        default:
    }
    // make sure bank is added in
    if ((cpu.state.addressingMode < 4) || (cpu.state.addressingMode > 5)) {
        // BP can only be from bank 0x00
        addr |= (cpu.registers[cpu.registerMap.SB + bankSelect].U2) << 16;
    }

    // index by X first, if we must
    if (cpu.state.indexByX) {
        addr += cpu.registers[cpu.registerMap.X].U16 << cpu.state.scale;
    }

    // indirect
    if (indirect) {
        addr = (addr & 0x30000) | cpu.memory.peek16(addr);
    }

    // index by Y if we must
    if (cpu.state.indexByY) {
        addr += cpu.registers[cpu.registerMap.Y].U16 << cpu.state.scale;
    }

    return addr;
}

let semanticsOps = {
    [semantics.NOP]:    function nop() { },
    [semantics.MOVE]:   function move(cpu) { cpu.registers[cpu.state.destRegister].U16 = cpu.registers[cpu.state.srcRegister].U16; },
    [semantics.SWAP]:   function swap(cpu) {
        [ cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16 ] =
        [ cpu.registers[cpu.state.srcRegister].U16,  cpu.registers[cpu.state.destRegister].U16 ];
    },
    [semantics.LOAD]:   function load(cpu) {
        let dreg = cpu.registers[cpu.state.destRegister];
        if (cpu.state.addressingMode === 0) {
            dreg.U8 = cpu.state.imm8;
        } else if (cpu.state.addressingMode === 1) {
            dreg.U16 = cpu.state.imm16;
        } else {
            if (cpu.state.scale) {
                dreg.U16 = handleFlags(cpu, cpu.memory.peek16(getAddr(cpu, cpu.state.whichBank)), 16);
            } else {
                dreg.U8 = handleFlags(cpu, cpu.memory.peek(getAddr(cpu, cpu.state.whichBank)), 8);
            }
        }
    },
    [semantics.STORE]:  function store(cpu) {
        let sreg = cpu.registers[cpu.state.srcRegister];
        let addr;
        if (cpu.state.addressingMode < 2) {
            // can't store to immediate values
            return;
        } else {
            if (cpu.state.scale) {
                addr = getAddr(cpu, cpu.state.whichBank);
                if ((addr & 0x3C000) !== 0xC000) {
                    // avoid ROM
                    cpu.memory.poke16(addr, sreg.U16 );
                }
            } else {
                addr = getAddr(cpu, cpu.state.whichBank);
                if ((addr & 0x3C000) !== 0xC000) {
                    // avoid ROM
                    cpu.memory.poke(addr, sreg.U8 );
                }
            }
        }
    },
    [semantics.IN]:     function _in(cpu) {
        let data = cpu.io.read(cpu.state.imm8);
        if (data !== undefined) {
            cpu.clrFlag(cpu.flagMap.E);
        } else {
            data = 0x00;
            cpu.setFlag(cpu.flagMap.E);
        }
        cpu.registers[cpu.state.destRegister].U8 = handleFlags(cpu, data, 8);
    },
    [semantics.OUT]:    function _out(cpu) { cpu.io.write(cpu.state.imm8, cpu.registers[cpu.state.srcRegister].U8); },
    [semantics.MEMFILL]:function memfill(cpu) {
        let c = cpu.registers[cpu.registerMap.C].U16;
        let sr = cpu.registers[cpu.state.srcRegister].U8;
        let db = cpu.registers[cpu.state.destBank === 0 ? cpu.registerMap.SB : cpu.registerMap.DB].U2;
        let da = cpu.registers[cpu.state.destRegister].U16;
        let daddr = ((db << 16) | da);
        for (let i = 0; i < c; i++) {
            if (((daddr + i) & 0x3C000) !== 0xC000) {
                cpu.memory.poke(daddr + i, sr);
            }
        }
    },
    [semantics.MEMCOPY]:function memcopy(cpu) {
        let c = cpu.registers[cpu.registerMap.C].U16;
        let sb = cpu.registers[cpu.state.srcBank === 0 ? cpu.registerMap.SB : cpu.registerMap.DB].U2;
        let sa = cpu.registers[cpu.state.srcRegister].U16;
        let db = cpu.registers[cpu.state.destBank === 0 ? cpu.registerMap.SB : cpu.registerMap.DB].U2;
        let da = cpu.registers[cpu.state.destRegister].U16;
        let daddr = ((db << 16) | da);
        let saddr = ((sb << 16) | sa);
        for (let i = 0; i < c; i++) {
            if (((daddr + i) & 0x3C000) !== 0xC000) {
                cpu.memory.poke(daddr + i, cpu.memory.peek(saddr + i));
            }
        }
    },
    [semantics.MEMSWAP]:function memswap(cpu) {
        let c = cpu.registers[cpu.registerMap.C].U16;
        let sb = cpu.registers[cpu.state.srcBank === 0 ? cpu.registerMap.SB : cpu.registerMap.DB].U2;
        let sa = cpu.registers[cpu.state.srcRegister].U16;
        let db = cpu.registers[cpu.state.destBank === 0 ? cpu.registerMap.SB : cpu.registerMap.DB].U2;
        let da = cpu.registers[cpu.state.destRegister].U16;
        let daddr = ((db << 16) | da);
        let saddr = ((sb << 16) | sa);
        let s, d;
        for (let i = 0; i < c; i++) {
            s = cpu.memory.peek(saddr + i);
            d = cpu.memory.peek(daddr + i);
            if (((saddr + i) & 0x3C000) !== 0xC000) {
                cpu.memory.poke(saddr + i, d);
            }
            if (((daddr + i) & 0x3C000) !== 0xC000) {
                cpu.memory.poke(daddr + i, s);
            }
        }
    },
    [semantics.PUSH]:   function push(cpu) {
        let sreg = cpu.registers[cpu.state.srcRegister];
        if (!sreg) { return; }
        cpu.push(sreg);
    },
    [semantics.PUSHA]:  function pusha(cpu) {
        let sreg;
        for (let i = 0; i < cpu.registers.length; i++) {
            sreg = cpu.registers[i];
            if (sreg && sreg.name !== "PC") {
                cpu.push(sreg);
            }
        }
    },
    [semantics.POP]:    function pop(cpu) {
        let dreg = cpu.registers[cpu.state.destRegister];
        if (!dreg) { return; }
        cpu.pop(dreg);
    },
    [semantics.POPA]:   function popa(cpu) {
        let sreg;
        for (let i = cpu.registers.length - 1; i >= 0; i--) {
            sreg = cpu.registers[i];
            if (sreg && sreg.name !== "PC") {
                cpu.pop(sreg);
            }
        }
    },
    [semantics.ADD]:    function add(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu,
                addUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16,
                                      cpu.registers[cpu.state.srcRegister].U16, 16),
            16);
    },
    [semantics.SUB]:    function sub(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu,
                subtractUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16,
                                           cpu.registers[cpu.state.srcRegister].U16, 16),
            16);
    },
    [semantics.INC]:    function inc(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu,
                addUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16, 1, 16),
            16);
    },
    [semantics.DEC]:    function dec(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu,
                subtractUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16, 1, 16),
            16);
    },
    [semantics.CMP]:    function cmp(cpu) {
        // compare is just subraction without storing the result -- just flags!
        handleFlags(cpu,
            subtractUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16,
                                       cpu.registers[cpu.state.srcRegister].U16, 16),
        16);
    },
    [semantics.IMUL]:   function imul(cpu) {
        let result = ((cpu.registers[cpu.state.othRegister].U16 << 16) | cpu.registers[cpu.state.destRegister].U16) * cpu.registers[cpu.state.srcRegister].U16;
        cpu.registers[cpu.state.destRegister].U16 = handleFlags(cpu, result & 0x0000FFFF, 16);
        cpu.clrFlag(cpu.flagMap.C);
        cpu.clrFlag(cpu.flagMap.V);
        if (result > 65535) {
            cpu.registers[cpu.state.othRegister].U16 = (result & 0xFFFF0000) >> 16;
            cpu.setFlag(cpu.flagMap.C);
            cpu.setFlag(cpu.flagMap.V);
        }
    },
    [semantics.IDIV]:   function idiv(cpu) {
        let [a, b] = [(cpu.registers[cpu.state.othRegister].U16 << 16) | cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16];
        cpu.clrFlag(cpu.flagMap.E);
        if (b === 0) {
            cpu.setFlag(cpu.flagMap.E); // can't divide by zero!
        } else {
            let result = Math.floor(a / b);
            cpu.clrFlag(cpu.flagMap.C);
            cpu.clrFlag(cpu.flagMap.V);
            cpu.registers[cpu.state.destRegister].U16 = handleFlags(cpu, result & 0x0000FFFF, 16);
            if (result > 65535) {
                cpu.registers[cpu.state.othRegister].U16 = (result & 0xFFFF0000) >> 16;
                cpu.setFlag(cpu.flagMap.C);
                cpu.setFlag(cpu.flagMap.V);
            }
        }
    },
    [semantics.IMOD]:   function imod(cpu) {
        let [a, b] = [(cpu.registers[cpu.state.othRegister].U16 << 16) | cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16];
        cpu.clrFlag(cpu.flagMap.E);
        if (b === 0) {
            cpu.setFlag(cpu.flagMap.E); // can't divide by zero!
        } else {
            let result = Math.floor(a % b);
            cpu.clrFlag(cpu.flagMap.C);
            cpu.clrFlag(cpu.flagMap.V);
            cpu.registers[cpu.state.destRegister].U16 = handleFlags(cpu, result & 0x0000FFFF, 16);
            if (result > 65535) {
                cpu.registers[cpu.state.othRegister].U16 = (result & 0xFFFF0000) >> 16;
                cpu.setFlag(cpu.flagMap.C);
                cpu.setFlag(cpu.flagMap.V);
            }
        }
    },
    [semantics.SHL]:    function shl(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu, shiftUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16, 16, -1, (cpu.getFlag(cpu.flagMap.M) ? 1 : 0)), 16);
    },
    [semantics.SHR]:    function shr(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu, shiftUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16, 16, +1, (cpu.getFlag(cpu.flagMap.M) ? 1 : 0)), 16);
    },
    [semantics.ROL]:    undefined,   // subsumed into SHL
    [semantics.ROR]:    undefined,  // subsumed into SHR
    [semantics.AND]:    function and(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 & cpu.registers[cpu.state.srcRegister].U16, 16);
    },
    [semantics.OR]:     function or (cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 | cpu.registers[cpu.state.srcRegister].U16, 16);
    },
    [semantics.XOR]:    function xor(cpu) {
        cpu.registers[cpu.state.destRegister].U16 =
            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 ^ cpu.registers[cpu.state.srcRegister].U16, 16);
    },
    [semantics.NEG]:    function neg(cpu) {
        // if M is set, 1's complement (NOT)
        cpu.registers[cpu.state.destRegister].U16 = handleFlags(cpu, (cpu.getFlag(cpu.flagMap.M) ? 255 : 256) - cpu.registers[cpu.state.destRegister].U16);
    },
    [semantics.SETFLAG]:function setflag(cpu) { cpu.setFlag(cpu.state.flag); },
    [semantics.CLRFLAG]:function clrflag(cpu) { cpu.clrFlag(cpu.state.flag); },
    [semantics.IFFLAG]: function ifflag(cpu)  { if (!cpu.getFlag(cpu.state.flag)) { cpu.clrFlag(cpu.flagMap.X); } },
    [semantics.IFNFLAG]:function ifnflag(cpu) { if (cpu.getFlag(cpu.state.flag))  { cpu.clrFlag(cpu.flagMap.X); } },
    [semantics.SETR]:   function setr(cpu)    { cpu.registers[cpu.state.srcRegister].U8 |= cpu.state.imm8; },
    [semantics.CLRR]:   function clrr(cpu)    { cpu.registers[cpu.state.srcRegister].U8 &= (0xFF - cpu.state.imm8); },
    [semantics.IFR]:    function ifr(cpu)     { if (!(((cpu.registers[cpu.state.srcRegister].U8 & cpu.state.imm8)) > 0)) { cpu.clrFlag(cpu.flagMap.X); } },
    [semantics.IFNR]:   function ifnr(cpu)    { if ( ((cpu.registers[cpu.state.srcRegister].U8 & cpu.state.imm8)) > 0) { cpu.clrFlag(cpu.flagMap.X); } },
    [semantics.BR]:     function br(cpu) {
        let PC = cpu.registers[cpu.registerMap.PC];
        if (cpu.state.addressingMode === 0) {
            PC.U16 += twosComplement.from8(cpu.state.imm8);
        } else if (cpu.state.addressingMode === 1) {
            PC.U16 += twosComplement.from16(cpu.state.imm16);
        } else {
            PC.U16 = getAddr(cpu, cpu.state.whichBank) & 0xFFFF;
        }
    },
    [semantics.CALL]:   function call(cpu) {
        cpu.push(cpu.registers[cpu.registerMap.PC]);
        semanticsOps[semantics.BR](cpu);
    },
    [semantics.LOOP]:   function loop(cpu) {
        let reg = cpu.registers[cpu.state.srcRegister];
        reg.U16 = handleFlags(cpu, subtractUpdatingFlags(cpu, reg.U16, 1, 16), 16);
        if (cpu.getFlag(cpu.flagMap.C)) {
            let PC = cpu.registers[cpu.registerMap.PC];
            PC.U16 += twosComplement.from8(cpu.state.imm8);
        }
    },
    [semantics.TRAP]:   function trap(cpu) {
        let PC = cpu.registers[cpu.registerMap.PC];
        let v, i;
        cpu.push(PC);
        if (cpu.state.opcode === 0x03) {
            // trap registers
            i = cpu.registers[cpu.registerMap.AL].U8;
        } else {
            i = cpu.state.imm8;
        }
        v = cpu.memory.peek16(i << 1); // get vector
        PC.U16 = v;
    },
    [semantics.RET]:    function ret(cpu) {
        cpu.pop(cpu.registers[cpu.registerMap.PC]);
    },
    [semantics.BYTESWAP]:function byteswap(cpu) {
        let reg = cpu.registers[cpu.state.srcRegister];
        let hi = (reg.U16 & 0xFF00) >> 8;
        let lo = (reg.U16 & 0x00FF);
        reg.U16 = (lo << 8) | hi;
    },
    [semantics.ENTER]:  function enter(cpu) {
        let BP = cpu.registers[cpu.registerMap.BP];
        let SP = cpu.registers[cpu.registerMap.SP];
        cpu.push(SP);
        cpu.push(BP);
        BP.U16 = SP.U16;
        SP.U16 -= cpu.state.imm8;
    },
    [semantics.EXIT]:   function exit(cpu) {
        let BP = cpu.registers[cpu.registerMap.BP];
        let SP = cpu.registers[cpu.registerMap.SP];

        SP.U16 += cpu.state.imm8;
        cpu.pop(BP);
        cpu.pop(SP);
    },
    [semantics.HALT]:   function halt(cpu) {
        cpu.pause(cpu.state.imm8);
    }
}

// this expects to be bound to a cpu
export function exec() {
    let op = semanticsOps[this.state.semantic];
    if (op) {
        op(this);
    } else {
        this.setFlag(this.flagMap.E);
        this.sendTrap(0xFE);
    }
}

export default {
    semantics,
    semanticsMap,
    semanticAssemblyMap,
    mapStateToAsm
};