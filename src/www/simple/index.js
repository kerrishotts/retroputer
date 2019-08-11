import { Computer, TIMING_METHODS } from "../../core/Computer.js";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics } from "../../core/Diagnostics.js";
import { SimpleConsoleDevice } from "./SimpleConsole.js";
import { parser } from "../../basm/parser.js";
import { assemble } from "../../basm/assemble.js";

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
    if (diagnostics.state === "stepping") {
        stopTimer = true;
    }
    if (!stopTimer) requestAnimationFrame(updateDiagnostics);
    const el = document.querySelector("#status");
    const statsHeader = ["Activity", "|", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i"];
    const regsHeader = ["", "|", "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"];
    const stats = [
        diagnostics.state,
        "|",
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
    const regs = [ "", "|", ...diagnostics.dumpRegisters().map(toHex4) ];

    el.innerHTML = `
    <table>
        <tr>${statsHeader.map(v => `<th>${v}</th>`).join("")}</tr>
        <tr>${stats.map(v => `<td>${v}</td>`).join("")}</tr>
        <tr>${regsHeader.map(v => `<th>${v}</th>`).join("")}</tr>
        <tr>${regs.map(v => `<td>${v}</td>`).join("")}</tr>
    </table>
    `;
};
requestAnimationFrame(updateDiagnostics);

const count = `
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    ld c, 0xFFFE                        {$14 $00 $FF $FE}
    do {
        inc a                           {$C0}
        dec c
    } while !c
    ld c, 0x7FFE                        {$14 $00 $7F $FE}
    do {
        dec a                           {$D0}
        dec c
    } while !c
    brk                                 {$3F}
}
`;

const out = `
.segment data 0x02000 {
    str: .string "Hello, world! I'm alive! "
        .byte 0x00
    crlf: .byte 13, 10                  ## CR/LF
        .byte 0x00
}
.segment code 0x03000 {
    # set up the stack for now
    ld sp, 0x02000
    ld bp, 0x02000

    ld a, data.crlf
    calls print

    # Write the string to the console a lot of times :-)
    ld c, 0x1000

    do {
        ld a, data.str
        calls print
        dec c
    } while !c

    ld a, data.crlf
    calls print

    brk

print-char:
    {
        enter 0x00
        push a
        out 0x82, al                        # write to CON:SEND
        ld al, 0b10                         # indicate write
        out 0x80, al                        # ...on CON:CTRL
        do {
            in al, 0x83                     # wait for ACK
        } while z
        pop a
        exit 0x00
        ret
    }

print:
    {
        enter 0x00
        push c
        ld c, print-char
        calls str-iter
        pop c
        exit 0x00
        ret
    }

str-iter:
    {
        # preamble
        enter 0x00
        push c                              # C has the address of the callback
        push a                              # A has the address of the string
        push d                              # D will get used (save it)
        push x                              # X will get used (save it)

        # logic
        mov d, a                            # D must have the address to print
        ld x, 0x0000                        # x is our index
        ld a, 0x0000                        # zero A to get it ready for loding characters
        do {
            ld al, [D,X]                    # A should be the desired character
            cmp al, 0x00                    # check if NUL
            if !z {
                call [BP+-2]                     # callback!
                inc x                           # next character
                continue
            }
        } while !z

        # postamble
        pop x
        pop d
        pop a
        pop c
        exit 0x00
        ret
    }

}
`;

const asm = out;

const memory = computer.memory;
const ast = parser.parse(asm);
const segments = assemble(ast);
segments.forEach(segment => {
    const data = segment.data;
    const name = segment.name;
    data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
});

const at = 0x02000;
computer.processor.jump(at);
computer.processor.registers.SINGLE_STEP = 0;
computer.run();
