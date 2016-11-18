import Register from "js/Register.js";

export default class CPU {
  constructor(memory) {
    this.registers = [
      new Register("A", 2),
      new Register("B", 2),
      new Register("C", 2),
      new Register("D", 2),
      new Register("X", 2),
      new Register("Y", 2),
      new Register("SP", 2),
      new Register("BP", 2),
      undefined,
      undefined,
      undefined,
      undefined,
      new Register("SB", 1),
      new Register("DB", 1),
      new Register("F", 1),
      new Register("PC", 16)];
    this.registerMap = {
      A: 0,
      AL: 0,
      B: 1,
      BL: 0,
      C: 2, 
      CL: 2,
      D: 3,
      DL: 3,
      X: 4,
      XL: 4,
      Y: 5,
      YL: 5,
      SP: 6,
      BP: 7,
      SB: 12,
      DB: 13,
      F: 14,
      PC: 15
    };
    
    this.registers[this.registerMap.SP].U16 = 0x1000;
    this.registers[this.registerMap.BP].U16 = 0x1000;
    
    this.memory = memory;

    this.state = {};
    
    this.semantics = {
      NOP:     0x00,
      MOVE:    0x10,
      SWAP:    0x11,
      LOAD:    0x20,
      STORE:   0x21,
      IN:      0x28,
      OUT:     0x29,
      MEMFILL: 0x2D,
      MEMCOPY: 0x2E,
      MEMSWAP: 0x2F,
      PUSH:    0x30,
      POP:     0x31,
      ADD:     0x40,
      INC:     0x41,
      SUB:     0x48,
      DEC:     0x49,
      CMP:     0x4F,
      IMUL:    0x50,
      IDIV:    0x51,
      IMOD:    0x52,
      SHL:     0x58,
      SHR:     0x59,
      ROL:     0x5A,
      ROR:     0x5B,
      XOR:     0x5C,
      AND:     0x5D,
      OR:      0x5E,
      NEG:     0x5F,
      SETFLAG: 0x60,
      CLRFLAG: 0x61,
      IFFLAG:  0x68,
      IFNFLAG: 0x69,
      BR:      0x70,
      CALL:    0x71,
      ENTER:   0x72,
      EXIT:    0x73,
      TRAP:    0x74,
      RET:     0x7F      
    };
    
  }
  
  clearState() {
    this.state = {
      instruction: [],    // raw bytes
      opcodeType: 0x00,   // type of opcode -- if extended, first byte of instruction
      opcode: 0x00,       // instruction
      semantic: 0x00,     // what should we actually do?
      imm8: 0x00,         // imm8 of instruction, if it makes sense
      imm16: 0x0000,      // imm16 of instruction, if it makes sense
      srceRegister: 0x00, // source register
      destRegister: 0x00, // destination register
      flag: 0x00,         // flag index
      srceBank: 0x00,     // source bank select
      destBank: 0x00,     // destination bank select
      addressingMode: 0x00,  // addressing mode
      indexByX: false,
      indexByY: false,
      scale: 1
    }  
  }
  
  dump() {
    log( "----" );
    log( this.registers.map(r => `${r ? r.name : ""}: ${r ? r.U16.toString(16) : ""}`).join(" ") );
    log( this.state.instruction.map(b => b.toString(16)).join(" ") );
    log( JSON.stringify(this.state) );
  }

  fetch(n) {
    if (n === 0) {
      this.clearState();
    }
    let rPC = this.registers[this.registerMap.PC].U16;
    this.state.instruction.push( this.memory.peek(rPC + n) );
  }

  decode() {
    let opcode = this.state.instruction[0];
    let opcodeType = 0x00;
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
    
    this.state.opcodeType = opcodeType;
    this.state.opcode = opcode;
    
    switch(this.state.instruction.length) {
      case 1:
        if ((opcode & 0b11111000) === 0b00001000) {
          // MV [SB|DB], srg
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   0    1  bnk src-reg
          this.state.semantic = this.semantic.MOVE;
          this.state.destRegister = (opcode & 0b00000100) ? this.registerMap.DB : this.registerMap.SB;
          this.state.srcRegister = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11110000) === 0b00010000) {
          // INC/DEC reg
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   1   I/D src-register
          this.state.semantic = (opcode & 0b00001000) ? this.semantic.DEC : this.semantic.INC;
          this.state.destRegister = (opcode & 0b00000111);
          this.state.srcRegister = this.state.destRegister;
          break;
        }
        if ((opcode & 0b11110000) === 0b00100000) {
          // IF/IF! flag
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   0   1   tgl   f l a g 
          this.state.semantic = (opcode & 0b00001000) ? this.semantic.IFNFLAG : this.semantic.IFFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11110000) === 0b00110000) {
          // ST/CL flag
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  0   0   1   1   tgl   f l a g 
          this.state.semantic = (opcode & 0b00001000) ? this.semantic.CLRFLAG : this.semantic.SETFLAG;
          this.state.flag = (opcode & 0b00000111);
          break;
        }
        if ((opcode & 0b11100000) === 0b11000000) {
          // MOV dest, src
          // -7- -6- -5- -4-  -3- -2- -1- -0-
          //  1   1   0  dst-register src-reg
          this.state.semantic = (opcode & 0b00001000) ? this.semantic.CLRFLAG : this.semantic.SETFLAG;
          this.state.destRegister = (opcode & 0b00011100);
          this.state.srcRegister = (opcode & 0b00000011);
          break;
        }
        
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
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