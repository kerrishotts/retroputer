/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import Computer from "../core/Computer.js";
import log from "../util/log.js";
import Asm from "../asm/Asm.js";
import hexUtils from "../util/hexUtils.js";

import Keyboard from "../core/devices/Keyboard.js";
import Timers from "../core/devices/Timers.js";

import font from "../roms/font0.js";
import kernel from "../roms/kernel.js";

export default class App {
    constructor() {
        this.panelTimer = undefined;
    }

    createSampleProgram() {
        let prog = [
            ".code 0x1000",
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
        this.saveProgram(prog.join(String.fromCharCode(10)), "sample");
    }

    saveProgram(code, programName) {
        localStorage.setItem(programName, code);
        let storedProgramKeys = localStorage.getItem("_stored-asm-keys");
        if (!storedProgramKeys) {
            storedProgramKeys = "[]";
        }
        storedProgramKeys = JSON.parse(storedProgramKeys);
        if (storedProgramKeys.find(v => v === programName)) {
            return; // already exists, no need to go further
        }
        storedProgramKeys.push(programName);
        storedProgramKeys = storedProgramKeys.sort((a, b) => a < b);
        localStorage.setItem("_stored-asm-keys", JSON.stringify(storedProgramKeys));
    }

    loadProgram(programName) {
        let prog = localStorage.getItem(programName);
        if (!prog) {
            alert(`There is no program named ${programName}`);
            return "";
        }

        return prog;
    }

    saveProgramFromEditor() {
        let programName = prompt("Name your program", "program");
        this.saveProgram(document.querySelector("#code textarea").value, programName);
        this.updateListOfStoredPrograms();
        alert("Program saved");
    }

    loadProgramToEditor(programName) {
        if (programName) {
            let prog = this.loadProgram(programName);
            document.querySelector("#code textarea").value = prog;
        }
    }

    updateListOfStoredPrograms() {
        let storedProgramKeys = localStorage.getItem("_stored-asm-keys");
        if (!storedProgramKeys) {
            this.createSampleProgram();
            this.updateListOfStoredPrograms();
            return;
        }
        storedProgramKeys = JSON.parse(storedProgramKeys);
        let targetOptGroup = document.getElementById("saved-asms");

        let df = storedProgramKeys.reduce((p, c) => {
            let opt = document.createElement("option");
            opt.setAttribute("value", c);
            opt.textContent = c;
            p.appendChild(opt);
            return p;
        }, document.createDocumentFragment());
        targetOptGroup.innerHTML = "";
        targetOptGroup.appendChild(df);
    }

    sizeScreen() {
        let el = document.getElementById("screen");
        let curWidth = parseInt(el.style.width, 10);
        let curHeight = parseInt(el.style.height, 10);
        let containerStyle = window.getComputedStyle(el.parentElement);
        let containerWidth = parseInt(containerStyle.width, 10);
        let containerHeight = parseInt(containerStyle.height, 10);
        let titleHeight = parseInt(window.getComputedStyle(el.previousElementSibling).height, 10);

        containerHeight -= titleHeight;

        let w, h;
        w = Math.floor(containerWidth);
        h = Math.floor(w * (200 / 320));

        if (h > containerHeight) {
            h = Math.floor(containerHeight);
            w = Math.floor(h / (200 / 320));
        }

        w = Math.floor(w / 320) * 320;
        h = Math.floor(h / 200) * 200;

        if (w < 320 || h < 200) {
            w = 320;
            h = 200;
        }

        if (curWidth !== w && curHeight !== h) {
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;
        }
    }

    updatePanels() {
        let computer = this.computer;

        // update screen stats
        let el = document.getElementById("stats");

        let lastFrameTime = Math.round(computer.stats.lastFrameTime * 100) / 100;
        let lastFrameDelta = Math.round((computer.stats.deltaf));
        let avgFrameTime = Math.round((computer.stats.totalTime / computer.stats.totalFrames) * 100) / 100;
        let secondsElapsed = (computer.stats.performanceAtTime - computer.stats.startTime) / 1000;
        let fps = Math.round((computer.stats.totalFrames / secondsElapsed) * 100) / 100;
        let actMIPS = Math.round(((computer.stats.totalInstructions / computer.stats.totalFrames) * fps) / 10000) / 100;
        let avgInstPerFrame = Math.round(computer.stats.totalInstructions / computer.stats.totalFrames);
        let totalInstBillions = Math.round(computer.stats.totalInstructions / 1000000);

        el.textContent = (`last frame: ${lastFrameDelta}d; ${lastFrameTime} (${avgFrameTime}avg) | fps: ${fps}/${computer.performance.FPSTargets[computer.performance.targetFPSIdx]} | #inst: ${avgInstPerFrame}/${actMIPS} (${totalInstBillions}m)`)

        // update CPU stats
        if (computer.cpu) {

            for (let reg of computer.cpu.registers) {
                if (reg) {
                    let el = document.getElementById(`reg-${reg.name}`);
                    if (el) {
                        el.textContent = (reg.size === 1 ? hexUtils.toHex2(reg.U8, "") : hexUtils.toHex4(reg.U16, "")).toUpperCase();
                    }
                }
            }

            if (computer.cpu.state.instruction) {
                el = document.getElementById("instructions");
                el.textContent = computer.cpu.state.instruction.map(i => hexUtils.toHex2(i, "").toUpperCase()).join(" ");
            }

            if (!computer.cpu.worker) {
                for (let flag = 0; flag < 8; flag++) {
                    let el = document.getElementById(`flag-${flag}`);
                    el.textContent = (computer.cpu.getFlag(flag)) ? "X" : "-";
                }

                el = document.getElementById("disassembly");
                el.textContent = computer.cpu.mapStateToAsm();
            }

            // update speed
            el = document.getElementById("cpu-speed");
            el.textContent = `${computer.performance.timeToDevoteToCPU}/${computer.performance.maxTimeToDevoteToCPU}`;
        }

    }

    dumpMemory() {
        let startAddr = Number(document.getElementById("mem-start").value);
        let endAddr = Number(document.getElementById("mem-end").value);
        let el = document.getElementById("memory-dump");
        let div = 8;
        let brk = 8;

        let dump = this.computer.memory.range(startAddr, (endAddr - startAddr) + 1).reduce(
            (p, c, idx) => {
                let str = "", pos;
                if ((idx % div) === 0) {
                    if (Math.floor((idx / div)) % brk === 0) {
                        p.push(String.fromCharCode(13) + String.fromCharCode(10));
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
                str = p[p.length - 1];
                pos = 7 + ((idx % div) * 3);

                /* eslint-disable prefer-template */
                str = str.substr(0, pos) + (hexUtils.toHex2(c, "").toUpperCase() + " ") + str.substr(pos + 3, 255);

                /* eslint-enable prefer-template */
                if (((c >= 33) && (c <= 127)) || (c === 255)) {
                    pos = 7 + (div * 3) + (idx % div);
                    if (c === 255) { c = 0x2588; }
                    str = str.substr(0, pos) + String.fromCharCode(c) + str.substr(pos + 1, 255);
                }
                p[p.length - 1] = str;
                return p;
            }, []).join("");

        el.textContent = dump;
    }

    assemble() {
        try {
            log("Assembling...");
            let el = document.querySelector("#code textarea");
            let code = el.value.split(String.fromCharCode(10));
            let asm = new Asm();
            asm.assemble(code);

            log("Assembled; writing...");
            asm.writeToMemory(this.computer.memory, { debug: true });
        } catch (err) {
            log(`Assembly error ${err.message} (${hexUtils.toHex4(err.code)}) at line # ${err.lineNumber}:${err.line}`);
            log(err.stack);
        }
    }

    onStartPressed() {
        const computer = this.computer;
        if (this.cold) {
            computer.reset();
            this.cold = false;
        }
        computer.resetStats();
        computer.start();
    }

    onStopPressed() {
        this.computer.stop();
    }

    onStepPressed() {
        const computer = this.computer;
        computer.resetStats();
        if (this.cold) {
            this.cold = false;
            computer.reset();
            this.updatePanels();
            computer.dumpAll();
        }
        computer.step();
        setTimeout(() => {
            this.updatePanels();
            computer.dumpAll();
        }, 32);
    }

    onResetPressed() {
        this.computer.reset();
        this.updatePanels();
    }

    onHardResetPressed() {
        this.cold = true;
        this.computer.hardReset();
        this.updatePanels();
    }

    onDumpCpuPressed() {
        this.updatePanels();
        this.computer.dumpAll();
    }

    onDumpMemPressed() {
        this.dumpMemory();
    }

    onAssemblePressed() {
        this.assemble();
    }

    onLoadAsmPressed() {
        let programName = document.getElementById("asm-select").value;
        this.loadProgramToEditor(programName);
    }

    onLoadAsmDiskPressed() {
        let filePicker = document.getElementById("program");
        if (FileReader && filePicker.files && filePicker.files.length) {
            let fileReader = new FileReader();
            fileReader.onload = function () {
                document.querySelector("#code textarea").value = fileReader.result;
            }
            fileReader.readAsText(filePicker.files[0]);
        }
    }

    onSaveAsmPressed() {
        this.saveProgramFromEditor();
    }

    onPanelCmdPressed(el, p) {
        el.parentElement.classList.remove("fullscreen");
        el.parentElement.classList.remove("minimize");

        switch (p) {
            case "maximize":
                el.parentElement.classList.add("fullscreen");
                break;
            case "normalize":
                break;
            case "minimize":
                el.parentElement.classList.add("minimize");
                break;
            default:
        }
    }

    onReportingPressed(el, p) {
        switch (p) {
            case "always":
                this.updatePanelContinuously();
                break;
            default:
                this.stopUpdatingPanelContinuously();
        }
    }


    onSpeedAdjustPressed(_, r) {
        const computer = this.computer;
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

        switch (r) {
            case "slowest":
                computer.performance.maxTimeToDevoteToCPU = 0.02;
                incr = 0;
            case "slow":
                computer.performance.maxTimeToDevoteToCPU = Math.round((computer.performance.maxTimeToDevoteToCPU - incr) * 100) / 100;
                if (computer.performance.maxTimeToDevoteToCPU < 0.2) {
                    computer.performance.maxTimeToDevoteToCPU = 0.2;
                }
                computer.performance.timeToDevoteToCPU = computer.performance.maxTimeToDevoteToCPU;
                computer.performance.iterationsBetweenTimeCheck = (computer.performance.maxTimeToDevoteToCPU < 0.3) ? 1 : 100;
                this.updatePanels();
                break;
            case "fastest":
                computer.performance.maxTimeToDevoteToCPU = 16;
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
            default:
        }

    }

    updatePanelContinuously() {
        this.panelTimer = setInterval(() => this.updatePanels(), 125);
    }
    stopUpdatingPanelContinuously() {
        clearInterval(this.panelTimer);
    }

    start() {
        window.addEventListener("resize", () => {
            setTimeout(() => {
                this.sizeScreen()
            }, 50);
        });
        setInterval(() => this.sizeScreen(), 1000);
        let computer = new Computer({
            devices: [Keyboard, Timers],
            roms: [...kernel, font],
            screenId: "screen",
            debug: false
        });

        this.computer = computer;
        this.cold = true;

        this.updatePanelContinuously();

        this.updateListOfStoredPrograms();

        document.body.addEventListener("click", (e) => {
            let matches = e.target.matches || e.target.msMatchesSelector;
            if (matches.call(e.target, "button")) {
                let cmd = e.target.getAttribute("data-cmd");
                let extra = e.target.getAttribute("data-parm");
                if (!cmd) { return; }

                let fn = this["on" + cmd.split("-").map(i => i[0].toUpperCase() + i.substr(1)).join("") + "Pressed"];
                if (typeof fn === "function") {
                    fn.call(this, e.target, extra);
                    return;
                }
            }
        });
    }
}

window.app = (new App()).start();