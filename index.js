/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import memoryLayout from "js/memoryLayout.js";
import Computer from "js/Computer.js";
import log from "js/log.js";
import Asm from "js/Asm.js";
import hexUtils from "js/hexUtils.js";


export default class App {
  constructor() {
    this.panelTimer = undefined;
  }
  sizeScreen() {
    let el = document.getElementById("screen");
    let ui = document.getElementById("ui");
    let uiStyle = window.getComputedStyle(ui);
    let maxWidth = parseInt(uiStyle.width, 10) - 200;
    let containerStyle = window.getComputedStyle(el.parentElement);
    let containerWidth = parseInt(containerStyle.width, 10);
    let containerHeight = parseInt(containerStyle.height, 10);
    let titleHeight= parseInt(window.getComputedStyle(el.previousElementSibling).height, 10);
    let maxHeight = parseInt(uiStyle.height, 10) - ((titleHeight * 2) + 200);

    containerHeight -= titleHeight;

    let w, h;
    w = Math.floor(maxWidth);
    h = Math.floor(w * (200 / 320));

    if (h > maxHeight) {
      h = Math.floor(maxHeight);
      w = Math.floor(h / (200 / 320));
    }

    w = Math.floor(w / 320 ) * 320 ;
    h = Math.floor(h / 200 ) * 200 ;

    if (w < 320 || h < 200) {
      w = 320;
      h = 200;
    }

    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  }

  updatePanels() {
    let computer = this.computer;

    // update screen stats
    let el = document.getElementById("stats");

    let lastFrameTime = Math.round(computer.stats.lastFrameTime * 100) / 100;
    let avgFrameTime = Math.round((computer.stats.totalTime / computer.stats.totalFrames) * 100) / 100;
    let avgMIPS = Math.round(((computer.stats.totalInstructions / computer.stats.totalFrames) * 60 ) / 10000) / 100;
    let secondsElapsed = (computer.stats.performanceAtTime - computer.stats.startTime) / 1000;
    let expectedFrames = secondsElapsed * 60;
    let actMIPS = Math.round(((computer.stats.totalInstructions / expectedFrames) * 60 ) / 10000) / 100;
    let fps = Math.round((computer.stats.totalFrames / secondsElapsed) * 100) / 100;

    el.textContent = (`last frame: ${lastFrameTime} | avg: ${avgFrameTime} | fps: ${fps} | inst: ${computer.stats.totalInstructions}`)

    // update CPU stats
    for (let reg of computer.cpu.registers) {
      if (reg) {
        let el = document.getElementById(`reg-${reg.name}`);
        if (el) {
          el.textContent = (reg.size === 1 ? hexUtils.toHex2(reg.U8, "") : hexUtils.toHex4(reg.U16, "")).toUpperCase();
        }
      }
    }
    for (let flag = 0; flag < 8; flag++) {
      let el = document.getElementById(`flag-${flag}`);
      el.textContent = (computer.cpu.getFlag(flag)) ? "X" : "-";
    }
    el = document.getElementById(`instructions`);
    el.textContent = computer.cpu.state.instruction.map(i => hexUtils.toHex2(i,"").toUpperCase()).join(" ");
  }

  start() {
    window.addEventListener("resize", () => {
      setTimeout( () => {
        this.sizeScreen()
      }, 50);
    });
    setTimeout( () => this.sizeScreen(), 50);
    let computer = new Computer({
      screenId: "screen",
      debug: false
    });

    this.computer = computer;

    this.panelTimer = setInterval( () => this.updatePanels(), 125);

    // fill in a program
    let prog = [
      "LDI A, 0x03",
      "MOV DB, A",
      "LDI A, 0x03FF",
      "MOV B, A",
      "XOR A, A",
      "MOV X, B",
      "CLR Z",
      "STD AL, [0x0000+X]",
      "INC A",
      "DEC X",
      "IFN Z",
      "BR -10",
      "BR -16"
      //"HALT 0x00",
      //"BR -7"
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
            computer.resetStats();
            computer.start();
            break;
          case "stop":
            computer.stop();
            break;
          case "step":
            computer.resetStats();
            if (cold) {
              cold = false;
              computer.reset();
              this.updatePanels();
              computer.dumpAll();
            }
            computer.step();
            setTimeout( () => {
              this.updatePanels();
              computer.dumpAll();
            }, 32);
            break;
          case "dump":
            this.updatePanels();
            computer.dumpAll();
            break;
          case "reset":
            computer.resetStats();
            computer.reset();
            this.updatePanels();
            computer.dumpAll();
            break;
        }
      }
    });
  }
}

window.app = (new App()).start();