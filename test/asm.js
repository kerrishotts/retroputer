import test from "ava";
import fs from "fs";
import path from "path";

import { parser } from "../src/basm/parser.js";
import { assemble } from "../src/basm/assemble.js";

import { mapTask, executeTask } from "../src/isa/tasks.js";
import { decodeInstruction } from "../src/isa/decodeInstruction.js";
import { _constructArgs, decodeToTasks, OPCODES } from "../src/isa/opcodes.js";
import { RegisterFile, REGISTER_INDEX, FLAGS_INDEX } from "../src/core/RegisterFile.js";
import { Memory } from "../src/core/Memory.js";
import { SystemBus } from "../src/core/SystemBus.js";
import { ALU } from "../src/core/ALU.js";

const fixture = fs.readFileSync(path.resolve(__dirname, "fixtures", "asm.asm"), {encoding: "utf8"});

test("Can assemble fixtures", t => {
    t.notThrows(() => {
        const ast = parser.parse(fixture);
        const asm = assemble(ast);
    });
});

const ast = parser.parse(fixture);
const segments = assemble(ast);
segments.forEach(segment => {
    test(`Can execute ${segment.name}`, t => {
        const data = segment.data;
        const name = segment.name;

        const regs = fixture.match(new RegExp(`^# ${segment.name}.regs:(.*)$`, "m"));
        const flags = fixture.match(new RegExp(`^# ${segment.name}.flags:(.*)$`, "m"));

        const stack = [];
        const systemBus = new SystemBus();
        const memory = new Memory({systemBus});
        const alu = new ALU();
        const registerFile = new RegisterFile();

        const tasks = [];
        let i = 0;
        while (data.length > 0) {
            i += 1;
            const bytes = data.slice(0, i);
            const {tasks: opTasks} = decodeInstruction(bytes);
            if (opTasks) {
                tasks.push(...opTasks);
                data.splice(0, i);
                i = 0;
            }
        }

        t.notThrows( () => {
            tasks.forEach(task => {
                t.log(name, mapTask(task));
                executeTask(task, {stack, registerFile, alu, memory, ioBus: null});
                t.log(JSON.stringify(registerFile));
            });
        }, `[${name}] can execute`);

        if (regs) {
            const expected = regs[1].trim().split(" ");
            expected.forEach(expr => {
                const [r, vStr] = expr.split("=");
                const rIdx = REGISTER_INDEX[r.toUpperCase()];
                const v = Number(vStr);
                t.is(registerFile.getRegister(rIdx), v, `[${name}] ${r} = ${vStr}`);
            });
        }
        if (flags) {
            const expected = flags[1].trim().split(" ");
            expected.forEach(flag => {
                const f = flag.substr(0, flag.length - 1);
                const v = flag[flag.length - 1];
                const fIdx = FLAGS_INDEX[f.toUpperCase()];
                if (v === "+") {
                    t.is(registerFile.FLAGS & (1 << fIdx) ? 1 : 0, 1, `[${name}] ${f} is set`);
                }
                if (v === "-") {
                    t.is(registerFile.FLAGS & (1 << fIdx) ? 1 : 0, 0, `[${name}] ${f} is clear`);
                }
            });
        }
    });
});

