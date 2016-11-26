import Register from "./Register.js";
import log from "./log.js";
import hexUtils from "./hexUtils.js";

export default class CPU {
  constructor(memory) {
    this.registers = [
      new Register("A", 2), new Register("B", 2),
      new Register("C", 2), new Register("D", 2),
      new Register("X", 2), new Register("Y", 2),
      new Register("SP", 2), new Register("BP", 2),
      undefined, undefined,
      undefined, undefined,
      new Register("SB", 1), new Register("DB", 1),
      new Register("F", 1), new Register("PC", 16)];
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
    
    this.registers[this.registerMap.SP].U16 = 0x1000;
    this.registers[this.registerMap.BP].U16 = 0x1000;
    
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
      addressingMode: 0x00,  // addressing mode
      indexByX: false,
      indexByY: false,
      scale: 1
    }  
    
    this.semantics = {
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

    this.semanticsMap = Object.keys(this.semantics).reduce((p, c) => {
      p[this.semantics[c]] = c;
      return p;
    }, {});
    
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
          this.state.semantic = this.semantics.NOP;
          break;
        }
        if (opcode === 0x03) {
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
          this.state.srcRegister = (opcode & 0b00000111);
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
          // IF/IF! flag
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   1   tgl   f l a g 
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.IFNFLAG : this.semantics.IFFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11110000) === 0b00110000) {
          // ST/CL flag
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
          this.state.srcRegister = this.state.destBank;
          break;
        }
        this.state.semantic = this.semantics.BADOP;
        break;
      case 2:
        opcodeExt = this.state.instruction[1];
        if ((opcode === 0x01)) {
          this.state.semantic = this.semantics.ENTER;
          this.state.imm8 = opcodeExt;
          break;
        }
        if ((opcode === 0x02)) {
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
        opcode = this.state.instruction[1];
        opparm = this.state.instruction[2];
        if ((opcode === 0x01)) {
          // TRAP imm8
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   0   0   0    0   0   0   1       i  m  m  e  d  i  a  t  e
          this.state.semantic = this.semantics.TRAP;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x08)) {
          // NEG reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   0   0   0    1   0   0   0    0   0   0   0    0  src-register
          this.state.semantic = this.semantics.NEG;
          this.state.destRegister = (opparm & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode === 0x10)) {
          // BYTESWAP reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   0   0   1    0   0   0   0    0   0   0   0    0  src-register
          this.state.semantic = this.semantics.BYTESWAP;
          this.state.destRegister = (opparm & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode === 0x40)) {
          // MUL drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   0   0    0   0   0   0    0  dst-register  0  src-register
          this.state.semantic = this.semantics.IMUL;
          this.state.destRegister = (opparm & 0b01110000) >> 4;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x41)) {
          // IDIV drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   0   0    0   0   0   1    0  dst-register  0  src-register
          this.state.semantic = this.semantics.IDIV;
          this.state.destRegister = (opparm & 0b01110000) >> 4;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x42)) {
          // IMOD drg, srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   0   0    0   0   1   0    0  dst-register  0  src-register
          this.state.semantic = this.semantics.IMOD;
          this.state.destRegister = (opparm & 0b01110000) >> 4;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x6D)) {
          // MEMFILL D:drg, srg * c
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   0    1   1   0   1   d:b dst-register s:b src-register
          this.state.semantic = this.semantics.MEMFILL;
          this.state.destBank = (opparm & 0b10000000) >> 7;
          this.state.destRegister = (opparm & 0b01110000) >> 4;
          this.state.srcBank = (opparm & 0b00001000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x6E)) {
          // MEMSWAP D:drg, srg * c
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   0    1   1   1   0   d:b dst-register s:b src-register
          this.state.semantic = this.semantics.MEMSWAP;
          this.state.destBank = (opparm & 0b10000000) >> 7;
          this.state.destRegister = (opparm & 0b01110000) >> 4;
          this.state.srcBank = (opparm & 0b00001000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x6F)) {
          // MEMCOPY D:drg, srg * c
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   0    1   1   1   1   d:b dst-register s:b src-register
          this.state.semantic = this.semantics.MEMCOPY;
          this.state.destBank = (opparm & 0b10000000) >> 7;
          this.state.destRegister = (opparm & 0b01110000) >> 4;
          this.state.srcBank = (opparm & 0b00001000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode & 0b11110000) === 0b01110000) {
          // IN/OUT reg, port
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    0   1   1   1   s/w  register    imm8
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.OUT : this.semantics.IN;
          this.state.destRegister = (opcode & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode & 0b11000000) === 0b10000000) {
          // MOV drg(masked by imm8), srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    1   0  dst-register src-register imm8
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b00111000) >> 3;
          this.state.srcRegister = (opcode & 0b00000111);
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode & 0b11000000) === 0b11000000) {
          // SWAP drg(masked by imm8), srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   0    1   1  dst-register src-register imm8
          this.state.semantic = this.semantics.SWAP;
          this.state.destRegister = (opcode & 0b00111000) >> 3;
          this.state.srcRegister = (opcode & 0b00000111);
          this.state.imm8 = opparm;
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
          this.imm16 = (this.instruction[2] << 8) & this.instruction[3];
          break;
        }
        if ((opcode & 0b10000000) === 0b10000000) {
          // LD / ST
          // -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-  -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    0   1   1   1    1  s/w address mode +x? +y? w/b  ...  s  i  x  t  e  e  n      b  i  t      a  d  d  r  e  s  s  ...
          this.state.semantic = (opcode & 0b01000000) ? this.semantics.STORE : this.semantics.LOAD;
          this.state.addressingMode = (opcode & 0b00111000) >> 3;
          this.state.indexByX = (opcode & 0b00000100) >> 2;
          this.state.indexByY = (opcode & 0b00000010) >> 1;
          this.state.scale = (opcode & 0b00000001);
          this.imm16 = (this.instruction[2] << 8) & this.instruction[3];
          break;
        }

        this.state.semantic = this.semantics.BADOP;
        break;
    }
    
  }

  execute() {

  }
  
  advancePC() {
    this.registers[this.registerMap.PC].U16 += this.state.instruction.length;
  }

  step(skipFetch = false) {
    if (!skipFetch) {
      this.fetch(0);
    }
    this.decode();
    if (!skipFetch) { 
      this.advancePC();
    }
    this.dump();
    this.execute();
  }

  sendTrap(trap) {
    this.state.instruction = [ 0x06, 0x01, trap ];
    
  }
}