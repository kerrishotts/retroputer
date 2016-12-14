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
      TRAP:    0x74, BYTESWAP:0x78, RET:     0x7F, BADOP:   0xFF
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
    (v === 0) ? cpu.clrFlag(cpu.flagMap.Z) : cpu.setFlag(cpu.flagMap.Z);

    // handle Negative flag
    cpu.clrFlag(cpu.flagMap.N);

    if (v < 0) { v = (unsignedSize - v) & unsignedMax; }
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
    let addr;
    let indirect = false;
    switch (cpu.state.addressingMode) {
        case 3:
        case 5:
        case 7:
            indirect = true;
            break;
    }
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
    addr |= (bankSelect ? cpu.registers[cpu.registerMap.DB].U8 : cpu.registers[cpu.registerMap.SB]).U8 << 17;

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
        switch (cpu.state.addressingMode) {
            case 0:
                cpu.registers[cpu.state.destRegister].U8 = cpu.state.imm8;
                break;
            case 1:
                cpu.registers[cpu.state.destRegister].U16 = cpu.state.imm16;
                break;
            default:
                if (cpu.state.scale) {
                    cpu.registers[cpu.state.destRegister].U16 = cpu.memory.peek16(getAddr(cpu, cpu.state.whichBank));
                } else {
                    cpu.registers[cpu.state.destRegister].U8 = cpu.memory.peek(getAddr(cpu, cpu.state.whichBank));
                }
        }
    },
    [semantics.STORE]:  undefined,
    [semantics.IN]:     undefined,
    [semantics.OUT]:    undefined,
    [semantics.MEMFILL]:undefined,
    [semantics.MEMCOPY]:undefined,
    [semantics.MEMSWAP]:undefined,
    [semantics.PUSH]:   undefined,
    [semantics.POP]:    undefined,
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
    [semantics.AND]:    function and(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 & cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.OR ]:    function or (cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 | cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.XOR]:    function xor(cpu) { cpu.registers[cpu.state.destRegister].U16 = 
                                            handleFlags(cpu, cpu.registers[cpu.state.destRegister].U16 ^ cpu.registers[cpu.state.srcRegister].U16, 16); },
    [semantics.NEG]:    undefined,
    [semantics.SETFLAG]:undefined,
    [semantics.CLRFLAG]:undefined,
    [semantics.IFFLAG]: undefined,
    [semantics.IFNFLAG]:undefined,
    [semantics.BR]:     undefined,
    [semantics.CALL]:   undefined,
    [semantics.TRAP]:   undefined,
    [semantics.RET]:    undefined,
    [semantics.BYTESWAP]:undefined,
    [semantics.ENTER]:  undefined,
    [semantics.EXIT]:   undefined
}

export function exec(cpu) {
    let op = semanticsOps[cpu.state.semantic];
    if (op) {
        op(cpu);
    }
}

export default {
    semantics,
    semanticsMap
};