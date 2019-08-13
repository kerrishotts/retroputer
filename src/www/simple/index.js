import { Computer, TIMING_METHODS } from "../../core/Computer.js";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics } from "../../core/Diagnostics.js";
import { SimpleConsoleDevice } from "./SimpleConsole.js";
import { parser } from "../../basm/parser.js";
import { assemble } from "../../basm/assemble.js";

import rom from "../../roms/kernel.js";

const round = (n, places = 0) => {
    const multiplier = 10 ** places;
    const v = Math.round(n * multiplier) / multiplier;
    return v;
}

const numToString = (n, { padWhole = 0, padDecimal = 2, padSign = 0 } = {}) => {
    const [ whole, decimal ] = Math.abs(n).toString().split(".");
    const neg = n < 0;
    return `${(neg ? "-" : "").padStart(padSign)}${whole.padStart(padWhole, "0")}${padDecimal ? "." : ""}${(decimal || "").padEnd(padDecimal, "0")}`;
}

const computer = new Computer({ performance, debug: true, timingMethed: TIMING_METHODS.AUTO, sliceTime: 8 });
// load in the ROM data
computer.memory.loadFromJS(rom, true);

window.computer = computer;

const simpleConsole = new SimpleConsoleDevice({
    target: document.querySelector("#console"),
    device: 8,
    length: 16,
    ioBus: computer.ioBus,
    memory: computer.memory,
    clock: computer.clock
});

const diagnostics = new Diagnostics(computer);
window.diagnostics = diagnostics;

let stopTimer = false;
const updateDiagnostics = () => {
    if (diagnostics.state !== "running") {
        stopTimer = true;
    }
    if (!stopTimer) requestAnimationFrame(updateDiagnostics);
    const el = document.querySelector("#status");
    const statsHeader = ["Activity", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i"];
    const regsHeader = ["", "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"];
    const stats = [
        diagnostics.state,
        /* #ticks */ numToString(computer.processor.stats.ticks, {padDecimal: 0}),
        /* #tasks */ numToString(computer.processor.stats.tasks, {padDecimal: 0}),
        /* #insts */ numToString(computer.processor.stats.insts, {padDecimal: 0}),
        /* #alu ops */ numToString(computer.processor.alu.stats.ops, {padDecimal: 0}),
        /* #slices */ numToString(computer.stats.slices, {padDecimal: 0}),
        /* micro ops / slice */ numToString(round(computer.stats.slices !== 0 ? (computer.processor.stats.tasks / computer.stats.slices) : 0, 2)),
        /* insts / slice */ numToString(round(computer.stats.slices !== 0 ? (computer.processor.stats.insts / computer.stats.slices) : 0, 2)),
        /* time */ numToString(round(computer.stats.time, 2)),
        /* million micro ops / sec */ numToString(round(computer.stats.time !== 0 ? ((computer.processor.stats.tasks / computer.stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
        /* mllion ips / sec */ numToString(round(computer.stats.time !== 0 ? ((computer.processor.stats.insts / computer.stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
        /* million aops / sec */ numToString(round(computer.stats.time !== 0 ? ((computer.processor.alu.stats.ops / computer.stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
        /* mop / ips */ numToString(round(computer.processor.stats.insts !== 0 ? ((computer.processor.stats.tasks / computer.processor.stats.insts)) : 0, 4), {padDecimal: 4}),
    ];
    const regs = [ "", ...diagnostics.dumpRegisters().map(toHex4) ];

    el.innerHTML = `
    <table>
        ${Array.from({length: statsHeader.length}, (_, idx) => {
            return `
                <tr><th>${statsHeader[idx]}</th>
                    <td>${stats[idx]}</td>
                    <th>${regsHeader[idx]}</th>
                    <td>${regs[idx]}</td></tr>
            `
            }).join("")}
    </table>
    `;
};
updateDiagnostics();


const $ = sel => document.querySelector(sel);

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
}

$("#random").onclick = () => {
    let byte = 0;
    for (let addr = 0; addr < computer.memory.size; addr++) {
        do {
            byte = Math.floor(Math.random() * 255);
        } while (byte === 0x3F)
        computer.memory.writeByte(addr, byte);
    };
}

$("#start").onclick = () => {
    const at = 0x02000;
    computer.processor.jump(at);
    computer.processor.registers.SINGLE_STEP = 0;
    stopTimer = false;
    requestAnimationFrame(updateDiagnostics);
    computer.run();
}

$("#continue").onclick = () => {
    computer.processor.registers.SINGLE_STEP = 0;
    stopTimer = false;
    requestAnimationFrame(updateDiagnostics);
    computer.run();
}

$("#stop").onclick = () => {
    stopTimer = true;
    computer.stop();
}

