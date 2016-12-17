// exports to be bound to a cpu
  export default function decode(fetch = true) {
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
    
  };
