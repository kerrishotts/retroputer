let semantics = {
      NOP:     0x00, MOVE:    0x10, SWAP:    0x11, LOAD:    0x20,
      STORE:   0x21, IN:      0x28, OUT:     0x29, MEMFILL: 0x2D,
      MEMCOPY: 0x2E, MEMSWAP: 0x2F, PUSH:    0x30, POP:     0x31,
      ADD:     0x40, INC:     0x41, SUB:     0x48, DEC:     0x49,
      CMP:     0x4F, IMUL:    0x50, IDIV:    0x51, IMOD:    0x52,
      SHL:     0x58, SHR:     0x59, ROL:     0x5A, ROR:     0x5B,
      XOR:     0x5C, AND:     0x5D, OR:      0x5E, NEG:     0x5F,
      SETFLAG: 0x60, CLRFLAG: 0x61, IFFLAG:  0x68, IFNFLAG: 0x69,
      BR:      0x70, CALL:    0x71, ENTER:   0x72, EXIT:    0x73,
      TRAP:    0x74, BYTESWAP:0x78, RET:     0x7F, HALT:    0x80,
      BADOP:   0xFF
    };

let semanticsMap = Object.keys(semantics).reduce((p, c) => {
      p[semantics[c]] = c;
      return p;
    }, {});

function handleFlags(cpu, v, size=16) {
    let unsignedSize = (size === 16 ? 65536 : 256);
    let unsignedMax = unsignedSize - 1;
    let signedSize = (size === 16 ? 32768 : 128);
    let signedMax = signedSize - 1;
    let carry = false;
    

    // handle Zero flag
    (v !== 0) ? cpu.clrFlag(cpu.flagMap.Z) : cpu.setFlag(cpu.flagMap.Z);

    // handle Negative flag
    cpu.clrFlag(cpu.flagMap.N);

    if (v < 0) { v = (unsignedSize + v) & unsignedMax; }
    if (v > signedMax) {
        cpu.setFlag(cpu.flagMap.N);
        carry = true;
    }

    // handle Overflow flag
    cpu.clrFlag(cpu.flagMap.O);
    if (v > unsignedMax) {
        v = (v - unsignedSize) & unsignedMax; 
        cpu.setFlag(cpu.flagMap.O);
        carry = true;
    }

    // handle Carry
    (carry ? cpu.setFlag(cpu.flagMap.C) : cpu.clrFlag(cpu.flagMap.C));

    return v;
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
        addr |= cpu.memory.peek16(addr);
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
    [semantics.IN]:     function _in(cpu) { cpu.registers[cpu.state.destRegister].U8 = handleFlags(cpu, cpu.io.read(cpu.state.imm8), 8); },
    [semantics.OUT]:    function _out(cpu){ cpu.io.write(cpu.state.imm8, cpu.registers[cpu.state.srcRegister].U8); },
    [semantics.MEMFILL]:undefined,
    [semantics.MEMCOPY]:undefined,
    [semantics.MEMSWAP]:undefined,
    [semantics.PUSH]:   function push(cpu) {
        let sreg = cpu.registers[cpu.state.srcRegister];
        if (!sreg) { return; }
        cpu.push(sreg);
    },
    [semantics.POP]:    function pop(cpu) {
        let dreg = cpu.registers[cpu.state.destRegister];
        if (!dreg) { return; }
        cpu.pop(dreg);
    },
    [semantics.ADD]:    function add(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 + cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.SUB]:    function sub(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 - cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.INC]:    function inc(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 + 1, 16); },
    [semantics.DEC]:    function dec(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 - 1, 16); },
    [semantics.CMP]:    function cmp(cpu) { (cpu.registers[cpu.state.destRegister].U16 === cpu.registers[cpu.state.srcRegister].U16 ?
                                             cpu.setFlag(cpu.flagMap.Z) : cpu.clrFlag(cpu.flagMap.Z)); },
    [semantics.IMUL]:   function imul(cpu){ cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 * cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.IDIV]:   function idiv(cpu){ cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, Math.floor(cpu.registers[cpu.state.destRegister].U16 / cpu.registers[cpu.state.srcRegister].U16, 16)); },
    [semantics.IMOD]:   function imod(cpu){ cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, Math.floor(cpu.registers[cpu.state.destRegister].U16 % cpu.registers[cpu.state.srcRegister].U16, 16)); },
    [semantics.SHL]:    function shl(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 << cpu.registers[cpu.state.srcRegister].U16, 16); },
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
    semanticsMap
};