/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import memoryLayout from "js/memoryLayout.js";
import Computer from "js/Computer.js";
import log from "js/log.js";
import Asm from "js/Asm.js";


export default class App {
  start() {

    let computer = new Computer({
      screenId: "screen",
      debug: false
    });

    // fill in a program
    let prog = [
      "LDS A, 0x03FF",
      "MOV B, A",
      "LDS A, 0x03",
      "MOV DB, A",
      "XOR A, A",
      "MOV X, B",
      "CLR Z",
      "STD AL, [0x0000+X]",
      "INC A",
      "DEC X",
      "IFN Z",
      "BR -10",
      "HALT 0x00",
      "BR -7"
    ];
    let addr = 0xFF00;
    try {
      for (let i = 0; i< prog.length; i++) {
        let assembly = Asm.assembleSingleInstruction(prog[i]);
        log(prog[i]);
        assembly.instruction.forEach(v => computer.memory.poke(addr++, v));
      }
    } catch (err) {
      log (JSON.stringify(err));
    }

    // drop a RET at the frame interrupt
    computer.memory.poke(0xFE00, 0xFF);

    let cold = true;
    document.getElementById("toolbar").addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        switch (e.target.getAttribute("data-cmd")) {
          case "start":
            if (cold) {
              computer.reset();
              cold = false;
            }
            computer.start();
            break;
          case "stop":
            computer.stop();
            break;
          case "step":
            if (cold) {
              cold = false;
              computer.reset();
              computer.dumpAll();
            }
            computer.step();
            computer.dumpAll();
            break;
          case "dump":
            computer.dumpAll();
            break;
          case "reset":
            computer.reset();
            computer.dumpAll();
            break;
        }
      }
    });
  }
}

window.app = (new App()).start();