import test from "ava";
import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";



import { parser } from "../src/basm/parser.js";
import { assemble } from "../src/basm/assemble.js";

import { REGISTER_INDEX, FLAGS_INDEX } from "../src/core/RegisterFile.js";
import { Memory } from "../src/core/Memory.js";
import { SystemBus } from "../src/core/SystemBus.js";
import { Bus } from "../src/core/Bus.js";
import { IOBus } from "../src/core/IOBus.js";
import { Processor } from "../src/core/Processor.js";

function checkRegs({processor, t, regs, name}) {
    const expected = regs[1].trim().split(" ");
    expected.forEach(expr => {
        const [r, vStr] = expr.split("=");
        const rIdx = REGISTER_INDEX[r.toUpperCase()];
        const v = Number(vStr);
        t.is(processor.registers.getRegister(rIdx), v, `[${name}] ${r} = ${vStr}`);
    });
}

function checkFlags({processor, t, flags, name}) {
    const expected = flags[1].trim().split(" ");
    expected.forEach(flag => {
        const f = flag.substr(0, flag.length - 1);
        const v = flag[flag.length - 1];
        const fIdx = FLAGS_INDEX[f.toUpperCase()];
        if (v === "+") {
            t.is(processor.registers.FLAGS & (1 << fIdx) ? 1 : 0, 1, `[${name}] ${f} is set`);
        }
        if (v === "-") {
            t.is(processor.registers.FLAGS & (1 << fIdx) ? 1 : 0, 0, `[${name}] ${f} is clear`);
        }
    });
}

export function execFixture(t, {setup = null, file}, cb) {
    const TIMEOUT = 60000;

    const fixture = fs.readFileSync(path.resolve(__dirname, "fixtures", file), {encoding: "utf8"});

    // parse the fixture
    const ast = parser.parse(fixture);
    const segments = assemble(ast);

    // configure the computer
    const clock = new Bus(1, 0b1);
    const systemBus = new SystemBus();
    const memory = new Memory({systemBus});
    const ioBus = new IOBus()
    const processor = new Processor({memory, systemBus, ioBus, clock});

    let codeSegment;
    segments.forEach(segment => {
        const data = segment.data;
        const name = segment.name;
        if (name === "code") {
            codeSegment = segment;
        }
        data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
    });
    if (!codeSegment) {
        throw new Error(`Couldn't find a code segment for ${file}`);
    }

    // make sure we start execution from the correct location :-)
    processor.registers.MP = codeSegment.addr;
    processor.registers.PC = codeSegment.addr;

    if (setup) { setup({processor}); }

    t.notThrows( () => {
        let start = performance.now();
        let now = performance.now();
        while (!processor.registers.SINGLE_STEP && now < start + TIMEOUT) {
            clock.signal();
            now = performance.now();
        }
        if (!processor.registers.SINGLE_STEP) {
            throw new Error(`Timed out.`);
        }
        t.log(`Took: ${now - start}ms`);
    }, `[${file}] can execute in a processor`);

    const regs = fixture.match(new RegExp(`^# ${codeSegment.name}.regs:(.*)$`, "m"));
    const flags = fixture.match(new RegExp(`^# ${codeSegment.name}.flags:(.*)$`, "m"));

    if (regs) checkRegs({processor, regs, t, name: codeSegment.name});
    if (flags) checkFlags({processor, flags, t, name: codeSegment.name});

    t.notThrows(() => cb && cb(t, {processor}));
};

test.serial("Can execute asm fixtures in a processor", t => {
    const fixture = fs.readFileSync(path.resolve(__dirname, "fixtures", "asm.asm"), {encoding: "utf8"});
    const ast = parser.parse(fixture);
    const segments = assemble(ast);

    segments.forEach(segment => {
        const data = segment.data;
        const name = segment.name;

        const regs = fixture.match(new RegExp(`^# ${segment.name}.regs:(.*)$`, "m"));
        const flags = fixture.match(new RegExp(`^# ${segment.name}.flags:(.*)$`, "m"));

        const clock = new Bus(1, 0b1);
        const systemBus = new SystemBus();
        const memory = new Memory({systemBus});
        const ioBus = new IOBus()
        const processor = new Processor({memory, systemBus, ioBus, clock});

        data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));


        // make sure we start execution from the correct location :-)
        processor.registers.MP = segment.addr;
        processor.registers.PC = segment.addr;
        t.notThrows( () => {
            let ticks = 0;
            while (!processor.registers.SINGLE_STEP) {
                // signalling the clock will cause the processor to tick
                clock.signal();
            }
        }, `[${name}] can execute in a processor`);
        if (regs) checkRegs({processor, regs, t, name});
        if (flags) checkFlags({processor, flags, t, name});
    });
});

test("Can count", execFixture, { file: "count.asm" });
test("Can loop", execFixture, { file: "loop.asm" });
test("Can loop (w block)", execFixture, { file: "block.asm" });
test("Can enter and exit", execFixture, { file: "add-enter-exit.asm" });