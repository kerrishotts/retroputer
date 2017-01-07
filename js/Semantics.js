import hexUtils from "./hexUtils.js";

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
      BADOP:   0xFF
    };

let semanticAssemblyMap = {
      NOP:     "nop"            ,MOVE:    "mov DR, SR"    ,SWAP:    "swap DR, SR"   ,LOAD:    "ldB DR, OP",
      STORE:   "stB SR, OP"     ,IN:      "in SR, U8"     ,OUT:     "out SR, U8"    ,MEMFILL: "mfill",
      MEMCOPY: "mcopy"          ,MEMSWAP: "mswap"         ,PUSH:    "push SR"       ,POP:     "pop DR",
      PUSHA:   "pusha"          ,POPA:    "popa"          ,
      ADD:     "add SR, DR"     ,INC:     "inc SR"        ,SUB:     "sub SR, DR"    ,DEC:     "dec SR",
      CMP:     "cmp SR, DR"     ,IMUL:    "mul SR, DR"    ,IDIV:    "idiv SR, DR"   ,IMOD:    "imod SR, DR",
      SHL:     "shl SR, DR"     ,SHR:     "shr SR, DR"    ,ROL:     "rol SR, DR"    ,ROR:     "ror SR, DR",
      XOR:     "xor SR, DR"     ,AND:     "and SR, DR"    ,OR:      "or SR, DR"     ,NEG:     "neg DR",
      SETFLAG: "set F"          ,CLRFLAG: "clr F"         ,
      IFR:     "ifr SR"         ,IFNR:    "ifnr SR"       ,SETR:    "setr SR"       ,CLRR:    "clrr SR",
      IFFLAG:  "if F"           ,IFNFLAG: "ifn F"         ,
      BR:      "br OP"          ,CALL:    "call OP"       ,ENTER:   "enter U8"      ,EXIT:    "exit U8",
      TRAP:    "trap OP"        ,BYTESWAP:"xcb SR"        ,RET:     "ret"           ,HALT:    "halt U8",
      BADOP:   "???"
    };

let semanticsMap = Object.keys(semantics).reduce((p, c) => {
      p[semantics[c]] = c;
      return p;
    }, {});

function mapStateToAsm(cpu) {
    let asm = semanticAssemblyMap[semanticsMap[cpu.state.semantic]] || "";

    asm = asm.replace("B", ["s", "d"][cpu.state.whichBank]);
    asm = asm.replace("SR", cpu.registerMap[cpu.state.srcRegister] || "BAD");
    asm = asm.replace("DR", cpu.registerMap[cpu.state.destRegister] || "BAD");
    asm = asm.replace("U8", hexUtils.toHex2(cpu.state.imm8));


    if (asm.indexOf("OP") > -1) {
        // special handling
        switch (cpu.state.semantic) {
            case semantics.LOAD:
            case semantics.STORE:
            case semantics.BR:
            case semantics.CALL:
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
                    case 0: asm = asm.replace("OP", relative ? (cpu.state.imm8 > 127 ? -(256 - cpu.state.imm8) : hexUtils.toHex2(cpu.state.imm8)) : hexUtils.toHex2(cpu.state.imm8) ); break;
                    case 1: asm = asm.replace("OP", relative ? (cpu.state.imm16 > 32767 ? -(65536 - cpu.state.imm16) : hexUtils.toHex4(cpu.state.imm16)) : hexUtils.toHex4(cpu.state.imm16) ); break;
                    case 2: asm = asm.replace("OP", brackets[0] + hexUtils.toHex4(cpu.state.imm16) + indexByX + indexByY + brackets[1]); break;
                    case 3: asm = asm.replace("OP", brackets[0] + hexUtils.toHex4(cpu.state.imm16) + indexByX + brackets[1] + indexByY); break;
                    case 4: asm = asm.replace("OP", brackets[0] + "BP+" + hexUtils.toHex4(cpu.state.imm16) + indexByX + indexByY + brackets[1]); break;
                    case 5: asm = asm.replace("OP", brackets[0] + "BP+" + hexUtils.toHex4(cpu.state.imm16) + indexByX + brackets[1] + indexByY); break;
                    case 6: asm = asm.replace("OP", brackets[0] + "D" + indexByX + indexByY + brackets[1]); break;
                    case 7: asm = asm.replace("OP", brackets[0] + "D" + indexByX + brackets[1] + indexByY); break;
                }
                break;
            case semantics.TRAP:
                asm = asm.replace("OP",  (cpu.state.opcode === 0x03 ? "AL" : hexUtils.toHex2(cpu.state.imm8)));
                break;
        }
    } else {
        asm = asm.replace(/\(L\)/g, "");
    }

    return asm;
}

function addUpdatingFlags(cpu, a, b, size=16) {
    let unsignedSize = (size === 16 ? 65536 : 256);
    let unsignedMax = unsignedSize - 1;
    let signedSize = (size === 16 ? 32768 : 128);
    let signedMax = signedSize - 1;
    let neg = (size === 16 ? 0b1000000000000000 : 0b10000000);

    // clear overflow and carry
    cpu.clrFlag(cpu.flagMap.V);
    cpu.clrFlag(cpu.flagMap.C);

    let v = (a & unsignedMax) + (b & unsignedMax);

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

    v = v & unsignedMax;

    return v;
}

function subtractUpdatingFlags (cpu, a, b, size=16) {
    return addUpdatingFlags(cpu, a, (-b) & (size === 16 ? 0xFFFF : 0xFF), size);
}

function shiftLeftUpdatingFlags(cpu, a, b, size=16) {
    let unsignedSize = (size === 16 ? 65536 : 256);
    let unsignedMax = unsignedSize - 1;
    let msb = (size === 16 ? 0b10000000000000000 : 0b100000000);

    // clear overflow and carry
    cpu.clrFlag(cpu.flagMap.V);
    cpu.clrFlag(cpu.flagMap.C);

    let v = (a & unsignedMax) << (b & unsignedMax);

    // use the MSB of the operation for Carry
    if (v & msb) {
        cpu.setFlag(cpu.flagMap.C);
    }

    v = v & unsignedMax;

    return v;
}


function handleFlags(cpu, v, size=16) {
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
    var addr;
    var indirect = !!(cpu.state.addressingMode & 1);
    switch (cpu.state.addressingMode) {
        case 2:
        case 3:
            addr = cpu.state.imm16;
            break;
        case 4:
        case 5:
            addr = cpu.state.imm16;
            if (addr > 32767) {
                addr = -(65536 - addr);
            }
            addr = cpu.registers[cpu.registerMap.BP].U16 + addr;
            break;
        case 6:
        case 7:
            addr = cpu.registers[cpu.registerMap.D].U16;
            break;
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
    [semantics.NOP]:    function nop(cpu) { return; },
    [semantics.MOVE]:   function move(cpu) { cpu.registers[cpu.state.destRegister].U16 = cpu.registers[cpu.state.srcRegister].U16; },
    [semantics.SWAP]:   function swap(cpu) { [ cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16 ] =
                                             [ cpu.registers[cpu.state.srcRegister].U16,  cpu.registers[cpu.state.destRegister].U16 ]; },
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
    [semantics.OUT]:    function _out(cpu){ cpu.io.write(cpu.state.imm8, cpu.registers[cpu.state.srcRegister].U8); },
    [semantics.MEMFILL]:undefined,
    [semantics.MEMCOPY]:undefined,
    [semantics.MEMSWAP]:undefined,
    [semantics.PUSH]:   function push(cpu) {
        let sreg = cpu.registers[cpu.state.srcRegister];
        if (!sreg) { return; }
        cpu.push(sreg);
    },
    [semantics.PUSHA]:  function pusha(cpu) {
        let sreg;
        for (let i=0; i<cpu.registers.length; i++) {
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
        for (let i=cpu.registers.length-1; i>=0; i--) {
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
    [semantics.IMOD]:   function imod(cpu){
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
    [semantics.SHL]:    function shl(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, shiftLeftUpdatingFlags(cpu, cpu.registers[cpu.state.destRegister].U16, cpu.registers[cpu.state.srcRegister].U16), 16); },
    [semantics.SHR]:    function shl(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 >> cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.ROL]:    undefined,
    [semantics.ROR]:    undefined,
    [semantics.AND]:    function and(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 & cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.OR ]:    function or (cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 | cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.XOR]:    function xor(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 ^ cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.NEG]:    function neg(cpu) { cpu.registers[cpu.state.destRegister].U16 =
                                            handleFlags(cpu, 256 - cpu.registers[cpu.state.destRegister].U16); },
    [semantics.SETFLAG]:function setflag(cpu) { cpu.setFlag(cpu.state.flag); },
    [semantics.CLRFLAG]:function clrflag(cpu) { cpu.clrFlag(cpu.state.flag); },
    [semantics.IFFLAG]: function ifflag(cpu)  { if (!cpu.getFlag(cpu.state.flag)) { cpu.clrFlag(cpu.flagMap.X); }},
    [semantics.IFNFLAG]:function ifnflag(cpu) { if (cpu.getFlag(cpu.state.flag))  { cpu.clrFlag(cpu.flagMap.X); }},
    [semantics.SETR]:   function setr(cpu)    { cpu.registers[cpu.state.srcRegister].U8 |= cpu.state.imm8; },
    [semantics.CLRR]:   function clrr(cpu)    { cpu.registers[cpu.state.srcRegister].U8 &= (0xFF - cpu.state.imm8); },
    [semantics.IFR]:    function ifr(cpu)     { if (!((cpu.registers[cpu.state.srcRegister].U8 & cpu.state.imm8)) === cpu.state.imm8) { cpu.clrFlag(cpu.flagMap.X); }},
    [semantics.IFNR]:   function ifnr(cpu)    { if ( ((cpu.registers[cpu.state.srcRegister].U8 & cpu.state.imm8)) === cpu.state.imm8) { cpu.clrFlag(cpu.flagMap.X); }},
    [semantics.BR]:     function br(cpu) {
        let PC = cpu.registers[cpu.registerMap.PC];
        if (cpu.state.addressingMode === 0) {
            PC.U16 += (cpu.state.imm8 > 127 ? cpu.state.imm8 - 256 : cpu.state.imm8);
        } else if (cpu.state.addressingMode === 1) {
            PC.U16 += (cpu.state.imm8 > 32767 ? cpu.state.imm16 - 65536 : cpu.state.imm16);
        } else {
            PC.U16 = getAddr(cpu, cpu.state.whichBank) & 0xFFFF;
        }
    },
    [semantics.CALL]:   function call(cpu) {
        cpu.push(cpu.registers[cpu.registerMap.PC]);
        semanticsOps[semantics.BR](cpu);
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
    }
}

export default {
    semantics,
    semanticsMap,
    semanticAssemblyMap,
    mapStateToAsm
};