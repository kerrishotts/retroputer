import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";
import readline from "readline";

import report from "yurnalist";
import { CLI } from "cliffy";

import { parser } from "../basm/parser.js";
import { assemble } from "../basm/assemble.js";

import { Computer } from "../core/Computer.js";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics } from "../core/Diagnostics.js";

const VERSION = "0.0.1";

class Monitor {
    constructor() {
        this.computers = {};
        this.diagnostics = {};
        this.default = "default";
    }

    includes(name) {
        return Object.keys(this.computers).indexOf(name) > -1;
    }

    create({name = this.default} = {}) {
        if (this.includes(name)) {
            throw new Error(`A computer with the name "${name}" already exists.`);
        }
        this.computers[name] = new Computer({performance, debug: true});
        this.diagnostics[name] = new Diagnostics(this.computers[name]);
    }
    start({name = this.default, at = undefined} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        if (this.diagnostics[name].state === STATE.RUNNING) {
            throw new Error(`Computer "${name}" is already running. Stop it first.`);
        }
        const computer = this.computers[name];
        if (at !== undefined) {
            computer.processor.jump(at);
        }
        // start assumes we don't want to single step.
        computer.processor.registers.SINGLE_STEP = 0;
        computer.run();
    }
    tick({name = this.default, at = undefined} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        if (this.diagnostics[name].state === STATE.RUNNING) {
            throw new Error(`Computer "${name}" is already running. Stop it first.`);
        }
        const computer = this.computers[name];
        if (at !== undefined) {
            computer.processor.jump(at);
        }
        computer.tick();
    }
    step({name = this.default, at = undefined} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        if (this.diagnostics[name].state === STATE.RUNNING) {
            throw new Error(`Computer "${name}" is already running. Stop it first.`);
        }
        const computer = this.computers[name];
        if (at !== undefined) {
            computer.processor.jump(at);
        }
        computer.step();
    }
    stop({name = this.default} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        this.computers[name].stop();
    }

    memory({name = this.default} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        return this.computers[name].memory;
    }

    dump({start = undefined, length = 256, name = this.default} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        const startAt = (start === undefined) ? this.computers[name].processor.registers.PC : start;
        const rows = this.diagnostics[name].dumpMemory({start: startAt, length, width: 16})
            .map(row => [
                ...row.map(toHex2),
                row.map(byte => ((byte & 0x7F) >= 0x20) ? String.fromCharCode(byte) : ".").join("")
            ])
            .map((row, idx) => [toHex5(startAt + idx * 16) + ":", ...row])
            .map(row => [ ...row.slice(0, 9), "-", ...row.slice(9)]);
        report.table(
            [
                "Addr:",
                ...Array.from({length: 8}, (_, col) => toHex2(col)),
                "",
                ...Array.from({length: 8}, (_, col) => toHex2(col + 8)),
                "Text"],
            rows
        );
        return rows;
    }

    reportStatus({name = undefined, stack = false, tasks = false, cache = false, dump = false} = {}) {
        report.table(
            ["Name", "Activity", "A", "B", "C", "D", "X", "Y", "BP", "SP", "STAT", "PC", "MP", "MM"],
            Object.entries(this.diagnostics)
                .filter(([candidate]) => name !== undefined ? candidate === name : true)
                .map(([name, diag]) => [
                    name,
                    diag.state,
                    ...diag.dumpRegisters().map(toHex4)
                ])
        );
        if (dump) {
            report.log("Next 16 bytes: ");
            this.dump({length: 16, name});
        }
        if (stack) {
            const stack = this.diagnostics[name].dumpTaskStack();
            if (stack.length > 0) {
                report.log("Stack: ");
                report.table(
                    ["Idx", "Size", "Value"],
                    stack.map((v, idx) => [idx.toString(), toHex2((v & 0xFF000000) >> 24), toHex(v & 0x00FFFFFF, 6)])
                );
            }
        }
        if (tasks) {
            const taskQueue = this.diagnostics[name].dumpTaskQueue({mapped: true}).map(([pc, task], idx) => [idx.toString(), toHex5(pc), task]);
            if (taskQueue.length > 0) {
                report.log("Tasks: ");
                report.table(
                    ["Idx", "Next", "Task"],
                    taskQueue
                );
            }
        }
        if (cache) {
            report.log("Instruction Cache: " + this.diagnostics[name].dumpInstructionCache().map(([_, v]) => toHex2(v)));
        }
    }
}

const monitor = new Monitor();

const commands = {
    create: {
        description: "Create a new Retroputer instance",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to current default`
            }
        ],
        action: ({name = monitor.default}) => {
            try {
                monitor.create({name});
                monitor.default = name; // this is the new default machine
                report.info(`Created a computer with name "${name}"`);
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    switch: {
        description: "Switch to a new default computer",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to "default"`
            }
        ],
        action: ({name = monitor.default} = {}) => {
            monitor.default = name;
            report.info(`Switched to computer "${name}"`);
        }
    },
    start: {
        description: "Start a computer executing",
        parameters: [
            {
                label: "at", optional: true, type: "number",
                description: "Location to start execution"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to the current default machine`
            }
        ],
        action: ({at, name = monitor.default}) => {
            try {
                monitor.start({at, name});
                report.info(`Started execution on computer "${name}"`);
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    stop: {
        description: "Stop a running Retroputer instance",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to the current default`
            }
        ],
        action: ({name = monitor.default}) => {
            try {
                monitor.stop({name});
                report.info(`Stopped computer "${name}"`);
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    step: {
        description: "Single-step a computer",
        parameters: [
            {
                label: "at", optional: true, type: "number",
                description: "Location to start execution; defaults to computer's PC"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to current default`
            }
        ],
        action: ({at, name = monitor.default}) => {
            try {
                monitor.step({name, at});
                monitor.reportStatus({name, dump: true});
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    tick: {
        description: "Tick a computer's clock",
        parameters: [
            {
                label: "at", optional: true, type: "number",
                description: "Location to start execution; defaults to computer's PC"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to current default`
            }
        ],
        action: ({at, name = monitor.default}) => {
            try {
                monitor.tick({name, at});
                monitor.reportStatus({name, dump: true, stack: true, tasks: true, cache: true});
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    status: {
        description: "Display a computer's state",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to current default`
            }
        ],
        action: ({name = monitor.default}) => {
            try {
                monitor.reportStatus({name, dump: true, stack: true, tasks: true, cache: true});
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    instruction: {
        description: "Assemble a single instruction",
        parameters: [
            {
                label: "at", optional: true, type: "number",
                description: "Location to assemble instruction; defaults to computer's PC"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Computer to target; defaults to "default"`
            }
        ],
        action: async ({at, name = monitor.default}) => {
            try {
                if (!monitor.includes(name)) {
                    report.error(`Can't assemble to nonexistent computer "${name}"`);
                    return;
                }
                const memory = monitor.memory({ name });
                const start = (at !== undefined) ? at : monitor.computers[name].processor.registers.PC;
                let location = start;
                let canContinue = true;
                const instructions = [];
                while (canContinue) {
                    const instruction = await (new Promise((resolve, reject) => {
                        cli.hide();
                        cli.readline.question(`${toHex5(location)}: `, answer => {
                            resolve(answer);
                        });
                    }));
                    if (instruction) {
                        instructions.push(instruction)
                        const asm = `.segment code ${start} {
    ${instructions.join("\n")}
}`;
                        const ast = parser.parse(asm);
                        const segments = assemble(ast);
                        segments.forEach(segment => {
                            const data = segment.data;
                            data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
                            location = segment.addr + data.length;
                        });
                    } else {
                        canContinue = false;
                    }
                }
                cli.show();
            } catch (err) {
                report.error(err.message);
                cli.show();
            }
        }
    },
    assemble: {
        description: "Assemble a file into a computer's memory",
        parameters: [
            {
                label: "file", optional: false, type: "string",
                description: "Path to the file to assemble"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Computer to target; defaults to "default"`
            }
        ],
        action: ({file, name = monitor.default}) => {
            try {
                const memory = monitor.memory({ name });
                const resolvedPath = path.resolve(process.cwd(), file);
                report.info(`Assembling ${resolvedPath}...`)
                const asm = fs.readFileSync(resolvedPath, {encoding: "utf8"});
                report.info(`... parsing...`);
                const ast = parser.parse(asm);
                report.info(`... assembling...`);
                const segments = assemble(ast);
                report.info(`... writing...`);
                segments.forEach(segment => {
                    const data = segment.data;
                    const name = segment.name;
                    report.info(`... ... writing segment ${name} with ${data.length} bytes to ${toHex(segment.addr)}...`);
                    data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
                });
                report.info(`... finished!`);
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    dump: {
        description: "Dump computer memory contents",
        parameters: [
            {
                label: "start", optional: true, type: "number",
                description: "Starting address to dump, defaults to PC"
            },
            {
                label: "length", optional: true, type: "number",
                description: "Number of bytes to dump, defaults to $FF"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Target computer to dump; defaults to current default"`
            }
        ],
        action: ({start, length = 0x00FF, name = monitor.default}) => {
            try {
                monitor.dump({start, length, name});
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    list: {
        description: "List computer instances and statuses",
        action: () => {
            monitor.reportStatus({});
        }
    },
    exit: {
        description: "Quit the monitor",
        action: () => {
            process.exit(0);
        }
    },
    default: {
        description: "Show the current computer default",
        action: () => {
            report.info(`The current computer default is "${monitor.default}"`);
        }

    }
};

const cli = new CLI()
    .setName("Retroputer Monitor")
    .setVersion(VERSION)
    .setDelimiter("\n. ")
    // create
    .addCommand("c", commands.create)
    .addCommand("create", commands.create)
    // switch
    .addCommand("sw", commands.switch)
    .addCommand("switch", commands.switch)
    // default
    .addCommand("default", commands.default)
    // stop
    .addCommand("x", commands.stop)
    .addCommand("stop", commands.stop)
    // start
    .addCommand("g", commands.start)
    .addCommand("start", commands.start)
    // step
    .addCommand("n", commands.step)
    .addCommand("step", commands.step)
    // tick
    .addCommand("t", commands.tick)
    .addCommand("tick", commands.tick)
    // status
    .addCommand("s", commands.status)
    .addCommand("status", commands.status)
    // instruction
    .addCommand("i", commands.instruction)
    .addCommand("inst", commands.instruction)
    .addCommand("instruction", commands.instruction)
    // assemble
    .addCommand("a", commands.assemble)
    .addCommand("asm", commands.assemble)
    .addCommand("assemble", commands.assemble)
    // dump
    .addCommand("d", commands.dump)
    .addCommand("dump", commands.dump)
    // list
    .addCommand("l", commands.list)
    .addCommand("list", commands.list)
    // quit
    .addCommand("q", commands.exit)
    .addCommand("quit", commands.exit)
    .addCommand("exit", commands.exit)
    .show();