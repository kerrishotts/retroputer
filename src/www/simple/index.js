import htm from 'https://unpkg.com/htm@2.2.1?module';
import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.60';

const html = htm.bind(React.createElement);

import { Computer, TIMING_METHODS } from "../../core/Computer.js";
import { SimpleConsoleDevice } from "./SimpleConsole.js";
import { Screen } from "../../devices/Screen.js";
import { DMA } from "../../devices/DMA.js";

import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../core/Diagnostics.js";

import { parser } from "../../basm/parser.js";
import { assemble } from "../../basm/assemble.js";

import rom from "../../roms/kernel.js";

const $ = sel => document.querySelector(sel);

const computer = new Computer({ performance, debug: true, timingMethed: TIMING_METHODS.AUTO, sliceTime: 16 });
// load in the ROM data
computer.memory.loadFromJS(rom, true);

window.computer = computer;

const diagnostics = new Diagnostics(computer);
window.diagnostics = diagnostics;

const simpleConsole = new SimpleConsoleDevice({
    target: document.querySelector("#console"),
    device: 8,
    length: 16,
    ioBus: computer.ioBus,
    memory: computer.memory,
    clock: computer.clock
});

const screen = new Screen({
    device: 1,
    length: 32,
    ioBus: computer.ioBus,
    memory: computer.memory,
    clock: computer.clock,
    performance
});

const dma = new DMA({
    device: 13,
    length: 16,
    ioBus: computer.ioBus,
    memory: computer.memory,
    clock: computer.clock
});



let stopTimer = false;
let diagnosticsTimer;
const updateDiagnostics = () => {
    if (diagnostics.state !== "running") {
        stopTimer = true;
        diagnosticsTimer = null;
    }
    //if (!stopTimer) requestAnimationFrame(updateDiagnostics);
    if (!stopTimer) diagnosticsTimer = setTimeout(updateDiagnostics, 100);
    const el = document.querySelector("#status");
    const statsHeader = ["Activity", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i"];
    const regsHeader = ["", "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"];
    const dumpedStats = diagnostics.dumpStatistics();
    const stats = [ diagnostics.state, dumpedStats.ticks, dumpedStats.tasks, dumpedStats.insts, dumpedStats.aluOps,
        dumpedStats.slices, dumpedStats.microOpsPerSlice, dumpedStats.instsPerSlice, dumpedStats.totalTime,
        dumpedStats.MMOPs, dumpedStats.MIPs, dumpedStats.MAOPs, dumpedStats.microOpsPerInst ];
    const regs = [ "", ...diagnostics.dumpRegisters().map(toHex4) ];

    el.innerHTML = `
    <table>
        ${Array.from({length: statsHeader.length}, (_, idx) => `
                <tr><th>${statsHeader[idx]}</th>
                    <td>${stats[idx]}</td>
                    <th>${regsHeader[idx]}</th>
                    <td>${regs[idx]}</td></tr>
        `).join("")}
        <tr><th>Scr TSR</th><td>${numToString(round(screen._ticksSinceRaster, 0), {padDecimal: 0})}</td>
            <th>Scr TTS</th><td>${numToString(round(screen._ticksThisSecond, 0), {padDecimal: 0})}</td></tr>
        <tr><th>Scr TPS</th><td>${numToString(round(screen._ticksPerSecond, 4), {padDecimal: 4})}</td>
            <th>Scr TPR</th><td>${numToString(round(screen._ticksPerRaster, 4), {padDecimal: 4})}</td></tr>
    </table>
<code>${diagnostics.disassembleMemory({start: computer.processor.registers.PC, length: 16}).split("\n").slice(0, 4).map(s => s.trim()).join("\n")}</code>
    `;
};
updateDiagnostics();

const frameCanvas = document.createElement("canvas");
frameCanvas.setAttribute("width", "640");
frameCanvas.setAttribute("height", "480");
const frameCtx = frameCanvas.getContext("2d");
const frameBuffer = frameCtx.createImageData(640, 480);

const canvas = $("#canvas canvas");
const ctx = canvas.getContext("2d");

let orphanedFrames = 0;
function handleVSYNC() {
    if (diagnostics.state !== "running") {
        if (orphanedFrames < 3) {
            while (!screen._wait)
                screen.tick();
            orphanedFrames++;
            updateDiagnostics();
        }
    }
    frameBuffer.data.set(screen.frame);
    frameCtx.putImageData(frameBuffer, 0, 0);
    ctx.drawImage(frameCanvas, 0, 0);
    screen.resetWait();
    requestAnimationFrame(handleVSYNC);

    if (diagnostics.state === "running") {
        orphanedFrames = 0;
    }
}
handleVSYNC();

$("#assemble").onclick = () => {
    const asm = $("#code").value;
    const memory = computer.memory;
    const ast = parser.parse(asm);
    const segments = assemble(ast);
    segments.forEach(segment => {
        const data = segment.data;
        const name = segment.name;
        data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
    });
    orphanedFrames = 0;
}

$("#random").onclick = () => {
    let byte = 0;
    for (let addr = 0; addr < (computer.memory.size - 65536); addr++) {
        do {
            byte = Math.floor(Math.random() * 255);
        } while (byte === 0x3F)
        computer.memory.writeByte(addr, byte);
    };
    orphanedFrames = 0;
}

$("#start").onclick = () => {
    computer.processor.jump(Number($("#address").value));
    computer.processor.registers.SINGLE_STEP = 0;
    stopTimer = false;
    if (diagnostics.state == "running") return;
    requestAnimationFrame(updateDiagnostics);
    computer.run();
}

$("#continue").onclick = () => {
    if (diagnostics.state == "running") return;
    computer.processor.registers.SINGLE_STEP = 0;
    stopTimer = false;
    requestAnimationFrame(updateDiagnostics);
    computer.run();
}

$("#jump").onclick = () => {
    computer.processor.jump(Number($("#address").value));
    stopTimer = false;
    if (diagnostics.state == "running") return;
    requestAnimationFrame(updateDiagnostics);
}

$("#step").onclick = () => {
    computer.processor.registers.SINGLE_STEP = 0;
    stopTimer = false;
    requestAnimationFrame(updateDiagnostics);
    orphanedFrames = 0;
    computer.step();
}

$("#stop").onclick = () => {
    stopTimer = true;
    computer.stop();
}

