import Register from "./Register.js";
import log from "./log.js";
import hexUtils from "./hexUtils.js";
import { exec } from "./Semantics.js";
import cpuSemantics from "./Semantics.js";

export default class CPU {
  constructor(memory) {
    // status
    this.running = false;
    this.paused = false;
    this.pauseTimer = 0;
    this.stepping = false;
    this.noAdvance = false; // used when PC changes to prevent advancement

    // register and flag mapping
    this.registers = [
      new Register("A", 2), new Register("B", 2),
      new Register("C", 2), new Register("D", 2),
      new Register("X", 2), new Register("Y", 2),
      new Register("SP", 2), new Register("BP", 2),
      undefined, undefined,
      undefined, undefined,
      new Register("SB", 1), new Register("DB", 1),
      new Register("F", 1), new Register("PC", 2)];
    this.registerMap = {
      A: 0, AL: 0, B: 1, BL: 0,
      C: 2, CL: 2, D: 3, DL: 3,
      X: 4, XL: 4, Y: 5, YL: 5,
      SP: 6, BP: 7, SB: 12, DB: 13,
      F: 14, Flags: 14, PC: 15,
      0: "A(L)", 1: "B(L)", 2: "C(L)", 3: "D(L)",
      4: "X(L)", 5: "Y(L)", 6: "SP",   7: "BP",
      12:"SB",   13:"DB",   14:"Flags", 15: "PC"
    };
    this.flagMap = {
      0: "Z", 1: "N", 2: "C", 3: "O", 4: "-", 5: "X", 6: "M", 7: "I",
      "Z": 0, "N": 1, "C": 2, "O": 3,         "X": 5, "M": 6, "I": 7
    };
    this.addressingModeMap = [ "imm8/rel8", "imm16/rel16", "abs16", "ind16", "relBP", "indBP", "absD", "indD" ];

    // give defaults for registers and flags 
    this.registers[this.registerMap.SP].U16 = 0x1000;
    this.registers[this.registerMap.BP].U16 = 0x1000;

    this.setFlag(this.flagMap.X);
    this.setFlag(this.flagMap.I);
    
    this.memory = memory;

    this.state = {
      instruction: [],    // raw bytes
      opcodeType: 0x00,   // type of opcode -- if extended, first byte of instruction
      opcode: 0x00,       // instruction
      semantic: 0x00,     // what should we actually do?
      imm8: 0x00,         // imm8 of instruction, if it makes sense
      imm16: 0x0000,      // imm16 of instruction, if it makes sense
      srcRegister: 0x00, // source register
      destRegister: 0x00, // destination register
      flag: 0x00,         // flag index
      srcBank: 0x00,     // source bank select
      destBank: 0x00,     // destination bank select
      whichBank: 0x00,    // which bank
      addressingMode: 0x00,  // addressing mode
      indexByX: false,
      indexByY: false,
      scale: 1
    }  

    this.semantics = cpuSemantics.semantics;
    this.semanticsMap = cpuSemantics.semanticsMap;
  }

  getFlag(flag) {
    return (this.registers[this.registerMap.Flags].U8 & (0x01 << flag)) > 0;
  }
  setFlag(flag) {
    this.registers[this.registerMap.Flags].U8 |= (0x01 << flag);
  }
  clrFlag(flag) {
    if (this.getFlag(flag)) {
      this.registers[this.registerMap.Flags].U8 -= (0x01 << flag);
    }
  }

  push(reg, v, dsize = 2) {
    let SP = this.registers[this.registerMap.SP];
    let size = (reg ? reg.size : dsize);
    SP.U16 -= size;
    if (size === 1) {
        this.memory.poke(SP.U16, (reg ? reg.U8 : v));
    } else {
        this.memory.poke16(SP.U16, (reg ? reg.U16 : v));
    }
  }

  pop (reg, dsize = 2) {
    let v;
    let SP = this.registers[this.registerMap.SP];
    let size = (reg ? reg.size : dsize);
    if (size === 1) {
        v = this.memory.peek(SP.U16);
        if (reg) { reg.U8 = v; }
    } else {
        v = this.memory.peek16(SP.U16);
        if (reg) { reg.U16 = v; }
    }
    SP.U16 += size;
    return v;
  }
  
  clearState() {
    this.state.instruction.length=0;    // raw bytes
    this.state.opcodeType= 0x00;   // type of opcode -- if extended, first byte of instruction
    this.state.opcode= 0x00;       // instruction
    this.state.semantic= 0x00;     // what should we actually do?
    this.state.imm8= 0x00;         // imm8 of instruction, if it makes sense
    this.state.imm16= 0x0000;      // imm16 of instruction, if it makes sense
    this.state.srcRegister= 0x00; // source register
    this.state.destRegister= 0x00; // destination register
    this.state.flag= 0x00;         // flag index
    this.state.srcBank= 0x00;     // source bank select
    this.state.destBank= 0x00;     // destination bank select
    this.state.whichBank = 0x00;   // 00 = SB, 01 = DB
    this.state.addressingMode= 0x00;  // addressing mode
    this.state.indexByX= false;
    this.state.indexByY= false;
    this.state.scale= 0;
  }
  
  dump() {
    log( "---- REGISTERS" );
    log( this.registers.map(r => r ? `${r ? r.name : ""}: ${r ? hexUtils.toHex4(r.U16) : ""} ` : ``).join("") );
    log( "---- STATE" );
    log( "inst[]=", this.state.instruction.map(b => hexUtils.toHex2(b)),
         "|", "opcode=", hexUtils.toHex2(this.state.opcode),
         "|", "semantic=", hexUtils.toHex2(this.state.semantic), this.semanticsMap[this.state.semantic]);
    log( "imm8=", hexUtils.toHex2(this.state.imm8), "|",
         "imm16=", hexUtils.toHex2(this.state.imm16), "|",
         "srcR=", this.registerMap[this.state.srcRegister], "|",
         "dstR=", this.registerMap[this.state.destRegister], "|",
         "flag=", this.flagMap[this.state.flag], "|");
    log( "bank selects", "src=", this.state.srcBank, "dst=", this.state.destBank, "|",
         "address mode=", this.addressingModeMap[this.state.addressingMode], "|",
         "index by", "X?", this.state.indexByX ? "Y" : "N",
                     "Y?", this.state.indexByY ? "Y" : "N", "|",
         "scale=", this.state.scale ? "byte" : "word");
    log( "" );
  }

  fetch(n) {
    if (n === 0) {
      this.clearState();
    }
    let rPC = this.registers[this.registerMap.PC].U16;
    this.state.instruction.push( this.memory.peek(rPC + n) );
  }

  decode(fetch = true) {
    let opcode = this.state.instruction[0];
    let opparm = 0x00;
    let opcodeExt = 0x00;
    let opcodeType = 0x00;

    if (fetch) {
      switch (opcode) {
        case 0x01:
        case 0x02:
        case 0x04:
        case 0x05: 
          this.fetch(1);
          break;
        case 0x06:
          this.fetch(1);
          this.fetch(2);
          break;
        case 0x07:
          this.fetch(1);
          this.fetch(2);
          this.fetch(3);
          break;
      }
      if (opcode >= 0x40 && opcode <= 0xBF) {
          this.fetch(1);
          this.fetch(2);
      }
    }
    
    this.state.opcodeType = opcodeType;
    this.state.opcode = opcode;
    
    switch(this.state.instruction.length) {
      case 1:
        if (opcode === 0b11111111) {
          // RET
          this.state.semantic = this.semantics.RET;
          break;
        }
        if (opcode === 0x00) {
          // NOP
          this.state.semantic = this.semantics.NOP;
          break;
        }
        if (opcode === 0x03) {
          // TRAP AL
          this.state.semantic = this.semantics.TRAP;
          this.destRegister = this.registerMap.AL;
          this.srcRegister = this.destRegister;
          break;
        }
        if ((opcode & 0b11111000) === 0b00001000) {
          // MV [SB|DB], srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    1  bnk src-reg
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b00000100) ? this.registerMap.DB : this.registerMap.SB;
          this.state.srcRegister = (opcode & 0b00000011);
          break;
        }
        if ((opcode & 0b11110000) === 0b00010000) {
          // INC/DEC reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   1   I/D src-register
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.DEC : this.semantics.INC;
          this.state.destRegister = (opcode & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode & 0b11110000) === 0b00100000) {
          // IF/IFN flag
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   1   tgl   f l a g 
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.IFNFLAG : this.semantics.IFFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11110000) === 0b00110000) {
          // SET/CLR flag
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   1   1   tgl   f l a g 
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.CLRFLAG : this.semantics.SETFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11100000) === 0b11000000) {
          // MOV dest, src
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  1   1   0  dst-register src-reg
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b00011100) >> 2;
          this.state.srcRegister = (opcode & 0b00000011);
          break;
        }
        if ((opcode & 0b11100000) === 0b11100000) {
          // PUSH/POP reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  1   1   1  s/w  r e g i s t e r
          this.state.semantic = (opcode & 0b00010000) ? this.semantics.POP : this.semantics.PUSH;
          this.state.destRegister = (opcode & 0b00001111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        this.state.semantic = this.semantics.BADOP;
        break;
      case 2:
        opcodeExt = this.state.instruction[1];
        if ((opcode === 0x01)) {
          // ENTER imm8
          this.state.semantic = this.semantics.ENTER;
          this.state.imm8 = opcodeExt;
          break;
        }
        if ((opcode === 0x02)) {
          // EXIT imm8
          this.state.semantic = this.semantics.EXIT;
          this.state.imm8 = opcodeExt;
          break;
        }
        if ((opcode === 0x04) && ((opcodeExt & 0b10000000) === 0b00000000)) {
          // ADD/SUB
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   0   0    0  s/w dst-register src-register 
          this.state.semantic = (opcodeExt & 0b01000000) ? this.semantics.SUB : this.semantics.ADD;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x04) && ((opcodeExt & 0b11000000) === 0b10000000)) {
          // XOR
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   0   0    1   0  dst-register src-register 
          this.state.semantic = this.semantics.XOR;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x04) && ((opcodeExt & 0b11000000) === 0b11000000)) {
          // CMP
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   0   0    1   1  dst-register src-register 
          this.state.semantic = this.semantics.CMP;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x05) && ((opcodeExt & 0b10000000) === 0b00000000)) {
          // SHL/SHR
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   0   1    0  s/w dst-register src-register 
          this.state.semantic = (opcodeExt & 0b01000000) ? this.semantics.SHR : this.semantics.SHL;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x05) && ((opcodeExt & 0b11000000) === 0b10000000)) {
          // AND
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   0   1    1   0  dst-register src-register 
          this.state.semantic = this.semantics.AND;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x05) && ((opcodeExt & 0b11000000) === 0b11000000)) {
          // OR
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   0   1    1   1  dst-register src-register 
          this.state.semantic = this.semantics.OR;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        this.state.semantic = this.semantics.BADOP;
        break;
      case 3:
        if (opcode === 0x06) {
          opcode = (opcode << 8) | this.state.instruction[1];
          opparm = this.state.instruction[2];
        }
        if ((opcode === 0x0601)) {
          // TRAP imm8
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   0   0   0    0   0   0   1       i  m  m  e  d  i  a  t  e
          this.state.semantic = this.semantics.TRAP;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x0608)) {
          // NEG reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   0   0   0    1   0   0   0    0   0   0   0    0  src-register
          this.state.semantic = this.semantics.NEG;
          this.state.destRegister = (opparm & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode === 0x0610)) {
          // BYTESWAP reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   0   0   1    0   0   0   0    0   0   0   0    0  src-register
          this.state.semantic = this.semantics.BYTESWAP;
          this.state.destRegister = (opparm & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode === 0x0620)) {
          // HALT imm8
          this.state.semantic = this.semantics.HALT;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x0640)) {
          // MUL drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   0   0    0   0   0   0    0  dst-register  0  src-register
          this.state.semantic = this.semantics.IMUL;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x0641)) {
          // IDIV drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   0   0    0   0   0   1    0  dst-register  0  src-register
          this.state.semantic = this.semantics.IDIV;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x0642)) {
          // IMOD drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   0   0    0   0   1   0    0  dst-register  0  src-register
          this.state.semantic = this.semantics.IMOD;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x066D)) {
          // MEMFILL D:drg, srg * c
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   0    1   1   0   1   d:b dst-register s:b src-register
          this.state.semantic = this.semantics.MEMFILL;
          this.state.destBank =     (opparm & 0b10000000) >> 7;
          this.state.srcBank = 0x00
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x066E)) {
          // MEMSWAP D:drg, srg * c
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   0    1   1   1   0   d:b dst-register s:b src-register
          this.state.semantic = this.semantics.MEMSWAP;
          this.state.destBank =     (opparm & 0b10000000) >> 7;
          this.state.srcBank =      (opparm & 0b01000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x066F)) {
          // MEMCOPY D:drg, srg * c
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   0    1   1   1   1   d:b dst-register s:b src-register
          this.state.semantic = this.semantics.MEMCOPY;
          this.state.destBank =     (opparm & 0b10000000) >> 7;
          this.state.srcBank =      (opparm & 0b01000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode & 0b1111111111110000) === 0x0670) {
          // IN/OUT reg, port
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   1   s/w  register    imm8
          this.state.semantic = (opcode & 0b0000000000001000) ? this.semantics.OUT : this.semantics.IN;
          this.state.destRegister = (opcode & 0b0000000000000111);
          this.state.srcRegister = this.state.destRegister;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode & 0b1111111111000000) === 0x0680) {
          // MOV drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0- 
          //  0   0   0   0    0   1   1   0    1   0  dst-register src-register 
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b0000000000111000) >> 3;
          this.state.srcRegister = (opcode & 0b0000000000000111);
          this.state.instruction.pop(); // give a byte back; this is technically a shorter instruction
          break;
        }
        if ((opcode & 0b1111111111000000) === 0x06C0) {
          // SWAP drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  
          //  0   0   0   0    0   1   1   0    1   1  dst-register src-register 
          this.state.semantic = this.semantics.SWAP;
          this.state.destRegister = (opcode & 0b0000000000111000) >> 3;
          this.state.srcRegister = (opcode & 0b0000000000000111);
          this.state.instruction.pop(); // give a byte back; this is technically a shorter instruction
          break;
        }
        if (opcode >= 0x40 && opcode < 0xC0) {
          // LDS / STD
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          // s/w s/w address mode +x? +y? w/b  ...  s  i  x  t  e  e  n      b  i  t      a  d  d  r  e  s  s  ...
          this.state.semantic = ((opcode & 0b11000000) === 0x80 ) ? this.semantics.STORE : this.semantics.LOAD;
          this.state.destRegister = this.registerMap.A;
          this.state.srcRegister = this.registerMap.A;
          this.state.addressingMode = (opcode & 0b00111000) >> 3;
          this.state.indexByX = (opcode & 0b00000100) >> 2;
          this.state.indexByY = (opcode & 0b00000010) >> 1;
          this.state.scale = (opcode & 0b00000001);
          this.state.whichBank = (this.state.semantic === this.semantics.STORE ? 0x01 : 0x00);
          this.state.imm16 = (this.state.instruction[1] << 8) | this.state.instruction[2];
          break;
        }
        this.state.semantic = this.semantics.BADOP;
        break;
      case 4:
        opcode = this.state.instruction[1];
        if ((opcode & 0b10000000) === 0b00000000) {
          // BR / CALL
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   1    0  s/w  address mode +x? +y? w/b  ...  s  i  x  t  e  e  n      b  i  t      a  d  d  r  e  s  s  ...
          this.state.semantic = (opcode & 0b01000000) ? this.semantics.CALL : this.semantics.BR;
          this.state.addressingMode = (opcode & 0b00111000) >> 3;
          this.state.indexByX = (opcode & 0b00000100) >> 2;
          this.state.indexByY = (opcode & 0b00000010) >> 1;
          this.state.scale = (opcode & 0b00000001);
          this.state.whichBank = 0x00;
          if (this.state.scale > 0) {
            this.state.imm16 = (this.state.instruction[2] << 8) | this.state.instruction[3];
          } else {
            this.state.imm8 = this.state.instruction[2];
            this.state.instruction.pop(); // give a byte back
          }
          break;
        }
        if ((opcode & 0b10000000) === 0b10000000) {
          // LDD / STS
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   1    1  s/w address mode +x? +y? w/b  ...  s  i  x  t  e  e  n      b  i  t      a  d  d  r  e  s  s  ...
          this.state.semantic = (opcode & 0b01000000) ? this.semantics.STORE : this.semantics.LOAD;
          this.state.destRegister = this.registerMap.A;
          this.state.srcRegister = this.registerMap.A;
          this.state.addressingMode = (opcode & 0b00111000) >> 3;
          this.state.indexByX = (opcode & 0b00000100) >> 2;
          this.state.indexByY = (opcode & 0b00000010) >> 1;
          this.state.scale = (opcode & 0b00000001);
          this.state.whichBank = (this.state.semantic === this.semantics.STORE ? 0x00 : 0x01);
          this.state.imm16 = (this.state.instruction[2] << 8) | this.state.instruction[3];
          break;
        }

        this.state.semantic = this.semantics.BADOP;
        break;
    }
    
  }

  execute() {
    exec(this);
  }
  
  advancePC() {
    this.registers[this.registerMap.PC].U16 += this.state.instruction.length;
  }

  step(skipFetch = false) {
    if (!skipFetch) {
      this.fetch(0);
    }
    this.decode(!skipFetch);

    if (this.state.semantic === this.semantics.RET) {
      this.noAdvance = true;
    }

    if (!skipFetch && !this.noAdvance) { 
      this.advancePC();
    }
    // if X is set, execute the instruction. OR, execute it if we're called with skipFetch
    // which means we're probably servicing an interrupt
    if (this.getFlag(this.flagMap.X) || skipFetch) {
      this.execute();
    } else {
      this.setFlag(this.flagMap.X); // Flags.X can only skip one cycle
    }


    if (this.noAdvance) {
      this.noAdvance = false;
    }

  }

  sendTrap(trap) {
    if (trap === 0x00 || (trap > 0x00 && this.getFlag(this.flagMap.I))) {
      this.paused = false;
      this.state.instruction = [ 0x06, 0x01, trap ];
      this.step(true); // don't fetch anything -- we want the above instruction
    }
  }

  pause(cycles = 0) {
    this.paused = true;
    this.pauseTimer = cycles;
  }
}