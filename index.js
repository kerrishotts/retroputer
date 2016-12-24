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

    // update speed
    el = document.getElementById(`cpu-speed`);
    el.textContent = `${computer.performance.timeToDevoteToCPU}/${computer.performance.maxTimeToDevoteToCPU}`;

  }

  dumpMemory() {
    let startAddr = Number(document.getElementById("mem-start").value).valueOf();
    let endAddr = Number(document.getElementById("mem-end").value).valueOf();
    let el = document.getElementById("memory-dump");
    let div = 8;
    let brk = 8;

    let dump = this.computer.memory.range(startAddr, (endAddr - startAddr) + 1).reduce(
      (p, c, idx) => {
        let str = "", pos;
        if ((idx % div) === 0) {
          if (Math.floor((idx / div)) % brk === 0) {
            p.push (String.fromCharCode(13) + String.fromCharCode(10));
          }
          str = `${hexUtils.toHex(startAddr + idx, "00000", "")}: `;
          for (let i = 0; i < div; i++) {
            str += ".. ";
          }
          for (let i = 0; i < div; i++) {
            str += "."
          }
          str += String.fromCharCode(13) + String.fromCharCode(10);
          p.push(str);
        }
        str = p[p.length-1];
        pos = 7 + ((idx % div) * 3);
        str = str.substr(0, pos) + (hexUtils.toHex2(c, "").toUpperCase() + " ") + str.substr(pos + 3, 255);
        if (((c >= 33) && (c <= 127)) || (c === 255)) {
          pos = 7 + (div * 3) + (idx % div);
          if (c===255) { c = 0x2588; }
          str = str.substr(0, pos) + String.fromCharCode(c) + str.substr(pos+1, 255);
        }
        p[p.length-1] = str;
        return p;
      }, []).join("");

      el.textContent = dump;
  }

  assemble() {
    try {
      log ("Assembling...");
      let el = document.querySelector("#code textarea");
      let code = el.value.split(String.fromCharCode(10));
      let asm = new Asm();
      let c = 0;
      asm.assemble(code);

      log ("Assembled; writing...");
      for (let segmentName of Object.keys(asm.segments)) {
        let segment = asm.segments[segmentName];
        for (let addr of Object.keys(segment)) {
          let arr = segment[addr];
          if (arr instanceof Array) {
            log (`Writing ${segmentName}:${addr}`);
            let s = "";
            for (let i = 0; i < arr.length; i++) {
              this.computer.memory.poke(i + Number(addr).valueOf(), arr[i]);
              s += hexUtils.toHex2(arr[i], "") + " ";
              if (i % 16 === 15) {
                log (`... ${s}`);
                s = "";
              }
              c++;
            }
            log (`... ${s}`);
          }
        }
      }

      log(`Assembly complete; wrote ${c} bytes`);
    } catch (err) {
      log(`Assembly error ${err.message} (${hexUtils.toHex4(err.code)}) at line # ${err.lineNumber}:${err.line}`);
    }
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
      ".code 0xFF00",
      "LDI A, 0x03",
      "MOV DB, A",
      "LDI A, 0x03E7",
      "MOV B, A",
      "XOR A, A",
      "MOV X, B",
      "CLR Z",
      "STD AL, [0x0000+X]",
      "INC A",
      "DEC X",
      "IFN N",
      "BR -10",
      "INC A",
      "BR -17",
      ".code 0xFE00",
      "RET"
    ];
    document.querySelector("#code textarea").value = prog.join(String.fromCharCode(10));
/*
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
*/
    let cold = true;
    document.body.addEventListener("click", (e) => {
      let incr = 0;
      incr = 0.01;
      if (computer.performance.maxTimeToDevoteToCPU >= 0.3) {
        incr = 0.05;
      }
      if (computer.performance.maxTimeToDevoteToCPU >= 2) {
        incr = 0.25;
      }
      if (computer.performance.maxTimeToDevoteToCPU >= 5) {
        incr = 1;
      }
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
          case "dump-cpu":
            this.updatePanels();
            computer.dumpAll();
            break;
          case "dump-mem":
            this.dumpMemory();
            break;
          case "assemble":
            this.assemble();
            break;
          case "reset":
            computer.resetStats();
            computer.reset();
            this.updatePanels();
            computer.dumpAll();
            break;
          case "slowest":
            computer.performance.maxTimeToDevoteToCPU = 0.02;
            incr = 0;
          case "slow":
            computer.performance.maxTimeToDevoteToCPU = Math.round((computer.performance.maxTimeToDevoteToCPU - incr) * 100) / 100;
            if (computer.performance.maxTimeToDevoteToCPU < 0.01) {
              computer.performance.maxTimeToDevoteToCPU = 0.01;
            }
            computer.performance.timeToDevoteToCPU = computer.performance.maxTimeToDevoteToCPU;
            computer.performance.iterationsBetweenTimeCheck = (computer.performance.maxTimeToDevoteToCPU < 0.3) ? 1 : 100;
            this.updatePanels();
            break;
          case "fastest":
            computer.performance.maxTimeToDevoteToCPU = 12;
            incr = 0;
          case "fast":
            computer.performance.maxTimeToDevoteToCPU = Math.round((computer.performance.maxTimeToDevoteToCPU + incr) * 100) / 100;
            if (computer.performance.maxTimeToDevoteToCPU > 16) {
              computer.performance.maxTimeToDevoteToCPU = 16;
            }
            computer.performance.timeToDevoteToCPU = computer.performance.maxTimeToDevoteToCPU;
            computer.performance.iterationsBetweenTimeCheck = (computer.performance.maxTimeToDevoteToCPU < 0.3) ? 1 : 100;
            this.updatePanels();
            break;

        }
      }
    });
  }
}

window.app = (new App()).start();