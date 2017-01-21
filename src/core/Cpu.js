import Register from "./Register.js";
import log from "../util/log.js";
import hexUtils from "../util/hexUtils.js";
import { exec } from "./semantics.js";
import cpuSemantics from "./semantics.js";
import decode from "./decoder.js";

export default class CPU {
  constructor(memory, io) {
    // status
    this.running = false;
    this.paused = false;
    this.stepping = false;

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
      0: "Z", 1: "N", 2: "C", 3: "V", 4: "E", 5: "X", 6: "M", 7: "I",
      "Z": 0, "N": 1, "C": 2, "V": 3, "E": 4, "X": 5, "M": 6, "I": 7,
      "EQ":0,         "LT":2, "O": 3
    };
    this.addressingModeMap = [ "imm8/rel8", "imm16/rel16", "abs16", "ind16", "relBP", "indBP", "absD", "indD" ];

    // need to keep track of memory
    this.memory = memory;

    // and io
    this.io = io;

    // semantics for execution
    this.semantics = cpuSemantics.semantics;
    this.semanticsMap = cpuSemantics.semanticsMap;
    this.mapStateToAsm = cpuSemantics.mapStateToAsm.bind(this, this);

    // bind semantic exec to our execute
    this.execute = exec.bind(this);

    // also bind decode
    this.decode = decode.bind(this);

    this.init();
  }

  init() {

    // give defaults for registers and flags 
    this.registers[this.registerMap.SP].U16 = 0x1000;
    this.registers[this.registerMap.BP].U16 = 0x1000;

    this.setFlag(this.flagMap.X);
    this.setFlag(this.flagMap.I);
    
    // instruction decoding and execution state
    this.state = { };
    this.clearState();
  }

  /**
   * Returns the value of the requested flag
   * @param {number} flag
   * @returns {boolean}
   */
  getFlag(flag) {
    return (this.registers[this.registerMap.Flags].U8 & (0x01 << flag)) > 0;
  }

  /**
   * Sets the requested flag to 1
   * @param {number} flag
   */
  setFlag(flag) {
    this.registers[this.registerMap.Flags].U8 |= (0x01 << flag);
  }

  /**
   * clears the requested flag
   * @param {number} flag
   */
  clrFlag(flag) {
    if (this.getFlag(flag)) {
      this.registers[this.registerMap.Flags].U8 -= (0x01 << flag);
    }
  }

  /**
   * Pushes a register or value onto the stack. If reg is supplied, that contents
   * are pushed onto the stack. If reg is udnefined, v is pushed. In the latter case,
   * dsize must be either 1 (byte) or 2 (word)
   * 
   * @param {Register} reg
   * @param {number} [v]
   * @param {number} [dsize=2]
   * 
   */
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

  /**
   * Pops a value from the stack and stores it in reg, if provided. Returns the value
   * regardless. If reg is undefined, dsize is used to determine how much to pop --
   * 1 = byte, 2 = word
   * 
   * @param {Register} reg
   * @param {number} [dsize=2]
   * @return {number}
   */
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

  /**
   * Clears the CPU's decode/execute state
   */ 
  clearState() {
    if (this.state.instruction === undefined) {
      this.state.instruction = [];
    }
    this.state.instruction.length=0;    // raw bytes
    this.state.opcodeType= 0x00;   // type of opcode -- if extended, first byte of instruction
    this.state.opcode= 0x00;       // instruction
    this.state.semantic= 0x00;     // what should we actually do?
    this.state.imm8= 0x00;         // imm8 of instruction, if it makes sense
    this.state.imm16= 0x0000;      // imm16 of instruction, if it makes sense
    this.state.srcRegister= 0x00; // source register
    this.state.destRegister= 0x00; // destination register
    this.state.othRegister = 0x00; // other register
    this.state.flag= 0x00;         // flag index
    this.state.srcBank= 0x00;     // source bank select
    this.state.destBank= 0x00;     // destination bank select
    this.state.whichBank = 0x00;   // 00 = SB, 01 = DB
    this.state.addressingMode= 0x00;  // addressing mode
    this.state.indexByX= false;
    this.state.indexByY= false;
    this.state.scale= 0;
  }

  /**
   * dumps the CPU's internal state
   */  
  dump() {
    log( "---- REGISTERS" );
    log( this.registers.map(r => r ? `${r ? r.name : ""}: ${r ? hexUtils.toHex4(r.U16) : ""} ` : ``).join("") );
    log( [7, 6, 5, 4, 3, 2, 1, 0].map(flag => `${this.flagMap[flag]}: ${this.getFlag(flag) ? 1 : 0}, `).join("") );
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

/**
 * fetches the desired byte (n) of the current instruction. If n is zero, the CPU's execution
 * and decode state is cleared first.
 */
  fetch(n) {
    if (n === 0) {
      this.clearState();
    }
    let rPC = this.registers[this.registerMap.PC].U16;
    this.state.instruction.push( this.memory.peek(rPC + n) );
  }

  /**
   * Advance PC by the length of the current instruction
   */
  advancePC() {
    this.registers[this.registerMap.PC].U16 += this.state.instruction.length;
  }

  /**
   * Steps the CPU by a single instruction. If skipFetch is TRUE, then the expectation is that an
   * instruction is already present in this.state.instruction and that it needs decoded and executed.
   * This is typical of hardware interrupts.
   */
  step(skipFetch = false) {
    if (!skipFetch) {
      this.fetch(0);  // get first byte of instruction
    }

    // decode the instruction; additional fetches occur as necessary
    this.decode(!skipFetch);

    // and advance PC, unless we've not fetched an instruction, in which case we shouldn't advance
    if (!skipFetch) { 
      this.advancePC();
    }

    // if X is set, execute the instruction. OR, execute it if we're called with skipFetch
    // which means we're probably servicing an interrupt
    if (this.getFlag(this.flagMap.X) || skipFetch) {
      this.execute();
      if (!this.getFlag(this.flagMap.X)) {
        this.step();  // go ahead and skip the next instruction
        this.setFlag(this.flagMap.X); // Flags.X can only skip one cycle
      }
   }
    /* else {
      this.setFlag(this.flagMap.X); // Flags.X can only skip one cycle
    }*/
  }

  /**
   * Send a trap to the CPU; actually injects a TRAP instruction and executes it
   * All traps are maskable EXCEPT 0x00 (RESET). If the CPU was previously HALTed,
   * it resumes execution.
   */
  sendTrap(trap) {
    if (trap === 0x00 || (trap > 0x00 && this.getFlag(this.flagMap.I))) {
      this.paused = false;
      this.state.instruction = [ 0x06, 0x01, trap ];
      this.step(true); // don't fetch anything -- we want the above instruction
    }
  }

  pause(imm8) {
    if (imm8 === 0xFF) {
      // Really, really halt!
      this.running = false;
    }
    this.paused = true;
  }
}