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
        default:
      }
      if (opcode >= 0x40 && opcode <= 0xBF) {
          this.fetch(1);
          this.fetch(2);
      }
    }
    
    this.state.opcodeType = opcodeType;
    this.state.opcode = opcode;
    
    switch (this.state.instruction.length) {
      case 1:
        if (opcode === 0b11111111) {
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
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b00000100) ? this.registerMap.DB : this.registerMap.SB;
          this.state.srcRegister = (opcode & 0b00000011);
          break;
        }
        if ((opcode & 0b11110000) === 0b00010000) {
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.DEC : this.semantics.INC;
          this.state.destRegister = (opcode & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode & 0b11110000) === 0b00100000) {
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.IFNFLAG : this.semantics.IFFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11110000) === 0b00110000) {
          this.state.semantic = (opcode & 0b00001000) ? this.semantics.CLRFLAG : this.semantics.SETFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11100000) === 0b11000000) {
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b00011100) >> 2;
          this.state.srcRegister = (opcode & 0b00000011);
          break;
        }
        if ((opcode & 0b11100000) === 0b11100000) {
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
          this.state.semantic = (opcodeExt & 0b01000000) ? this.semantics.SUB : this.semantics.ADD;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x04) && ((opcodeExt & 0b11000000) === 0b10000000)) {
          this.state.semantic = this.semantics.XOR;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x04) && ((opcodeExt & 0b11000000) === 0b11000000)) {
          this.state.semantic = this.semantics.CMP;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x05) && ((opcodeExt & 0b10000000) === 0b00000000)) {
          this.state.semantic = (opcodeExt & 0b01000000) ? this.semantics.SHR : this.semantics.SHL;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x05) && ((opcodeExt & 0b11000000) === 0b10000000)) {
          this.state.semantic = this.semantics.AND;
          this.state.destRegister = (opcodeExt & 0b00111000) >> 3;
          this.state.srcRegister = (opcodeExt & 0b00000111);
          break;
        }
        if ((opcode === 0x05) && ((opcodeExt & 0b11000000) === 0b11000000)) {
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
          this.state.semantic = this.semantics.TRAP;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x0608)) {
          this.state.semantic = this.semantics.NEG;
          this.state.destRegister = (opparm & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode === 0x0610)) {
          this.state.semantic = this.semantics.BYTESWAP;
          this.state.destRegister = (opparm & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode === 0x0614)) {
          this.state.semantic = this.semantics.HALT;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x0618)) {
          this.state.semantic = this.semantics.PUSHA;
          this.state.instruction.pop(); // give a byte back; this is technically a shorter instruction
          break;
        }
        if ((opcode === 0x0619)) {
          this.state.semantic = this.semantics.POPA;
          this.state.instruction.pop(); // give a byte back; this is technically a shorter instruction
          break;
        }
        if ((opcode >= 0x0620) && opcode < 0x0640) {
          this.state.srcRegister = (opcode & 0b00000111);
          this.state.destRegister = this.state.srcRegister;
          this.state.semantic = [this.semantics.SETR, this.semantics.CLRR, this.semantics.IFR, this.semantics.IFNR][(opcode & 0b00011000) >> 3];
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x0640)) {
          this.state.semantic = this.semantics.IMUL;
          this.state.othRegister =  (opparm & 0b11000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x0641)) {
          this.state.semantic = this.semantics.IDIV;
          this.state.othRegister =  (opparm & 0b11000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x0642)) {
          this.state.semantic = this.semantics.IMOD;
          this.state.othRegister =  (opparm & 0b11000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister = (opparm & 0b00000111);
          break;
        }
        if ((opcode >= 0x0650) && (opcode <= 0x0653)) {
          let deltaAtoC = 2;
          this.state.semantic = this.semantics.LOOP;
          this.state.srcRegister = (opcode & 0x03) + deltaAtoC;
          this.state.destRegister = this.state.srcRegister;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode === 0x066D)) {
          this.state.semantic = this.semantics.MEMFILL;
          this.state.destBank =     (opparm & 0b10000000) >> 7;
          this.state.srcBank = 0x00
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x066E)) {
          this.state.semantic = this.semantics.MEMSWAP;
          this.state.destBank =     (opparm & 0b10000000) >> 7;
          this.state.srcBank =      (opparm & 0b01000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode === 0x066F)) {
          this.state.semantic = this.semantics.MEMCOPY;
          this.state.destBank =     (opparm & 0b10000000) >> 7;
          this.state.srcBank =      (opparm & 0b01000000) >> 6;
          this.state.destRegister = (opparm & 0b00111000) >> 3;
          this.state.srcRegister =  (opparm & 0b00000111);
          break;
        }
        if ((opcode & 0b1111111111110000) === 0x0670) {
          this.state.semantic = (opcode & 0b0000000000001000) ? this.semantics.OUT : this.semantics.IN;
          this.state.destRegister = (opcode & 0b0000000000000111);
          this.state.srcRegister = this.state.destRegister;
          this.state.imm8 = opparm;
          break;
        }
        if ((opcode & 0b1111111111000000) === 0x0680) {
          this.state.semantic = this.semantics.MOVE;
          this.state.destRegister = (opcode & 0b0000000000111000) >> 3;
          this.state.srcRegister = (opcode & 0b0000000000000111);
          this.state.instruction.pop(); // give a byte back; this is technically a shorter instruction
          break;
        }
        if ((opcode & 0b1111111111000000) === 0x06C0) {
          this.state.semantic = this.semantics.SWAP;
          this.state.destRegister = (opcode & 0b0000000000111000) >> 3;
          this.state.srcRegister = (opcode & 0b0000000000000111);
          this.state.instruction.pop(); // give a byte back; this is technically a shorter instruction
          break;
        }
        if (opcode >= 0x40 && opcode < 0xC0) {
          this.state.semantic = ((opcode & 0b11000000) === 0x80 ) ? this.semantics.STORE : this.semantics.LOAD;
          this.state.destRegister = this.registerMap.A;
          this.state.srcRegister = this.registerMap.A;
          this.state.addressingMode = (opcode & 0b00111000) >> 3;
          this.state.indexByX = (opcode & 0b00000100) >> 2;
          this.state.indexByY = (opcode & 0b00000010) >> 1;
          this.state.scale = (opcode & 0b00000001);
          this.state.whichBank = (this.state.semantic === this.semantics.STORE ? 0x01 : 0x00);
          if (this.state.addressingMode === 0) {
            this.state.imm8 = (this.state.instruction[1]);
            this.state.instruction.pop();
          } else if (this.state.addressingMode >= 6) {
            this.state.imm16 = 0;
            this.state.instruction.pop();
            this.state.instruction.pop();
          } else {
            this.state.imm16 = (this.state.instruction[1] << 8) | this.state.instruction[2];
          }
          break;
        }
        this.state.semantic = this.semantics.BADOP;
        break;
      case 4:
        opcode = this.state.instruction[1];
        if ((opcode & 0b10000000) === 0b00000000) {
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
          this.state.semantic = (opcode & 0b01000000) ? this.semantics.STORE : this.semantics.LOAD;
          this.state.destRegister = this.registerMap.A;
          this.state.srcRegister = this.registerMap.A;
          this.state.addressingMode = (opcode & 0b00111000) >> 3;
          this.state.indexByX = (opcode & 0b00000100) >> 2;
          this.state.indexByY = (opcode & 0b00000010) >> 1;
          this.state.scale = (opcode & 0b00000001);
          this.state.whichBank = (this.state.semantic === this.semantics.STORE ? 0x00 : 0x01);
          if (this.state.addressingMode === 0) {
            this.state.imm8 = (this.state.instruction[2]);
            this.state.instruction.pop();
          } else if (this.state.addressingMode >= 6) {
            this.state.imm16 = 0;
            this.state.instruction.pop();
            this.state.instruction.pop();
          } else {
            this.state.imm16 = (this.state.instruction[2] << 8) | this.state.instruction[3];
          }
          break;
        }

        this.state.semantic = this.semantics.BADOP;
        break;
    default:
    }
  }