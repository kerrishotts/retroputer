import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";

import report from "yurnalist";
import { CLI } from "cliffy";
import sade from "sade";

import { parser } from "../basm/parser.js";
import { assemble, setImportProvider } from "../basm/assemble.js";
import { nodeImportProvider } from "../basm/importProviders/node.js";
setImportProvider(nodeImportProvider);

import { Computer, TIMING_METHODS } from "../core/Computer.js";
import { ConsoleDevice } from "../devices/Console.js";

import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics } from "../core/Diagnostics.js";

import rom from "../roms/kernel.js";

import shell from "shelljs";

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

const VERSION = "0.0.1";
let verbose = false;

class Monitor {
    constructor() {
        this.computers = {};
        this.diagnostics = {};
        this.default = "default";
    }

    includes(name) {
        return Object.keys(this.computers).indexOf(name) > -1;
    }

    create({name = this.default, debug = true, timingMethod = TIMING_METHODS.AUTO} = {}) {
        if (this.includes(name)) {
            throw new Error(`A computer with the name "${name}" already exists.`);
        }
        const computer = new Computer({performance, debug, timingMethod});
        computer.memory.loadFromJS(rom, true);
        const console = new ConsoleDevice({
            device: 8,
            length: 16,
            ioBus: computer.ioBus,
            memory: computer.memory,
            clock: computer.clock
        });
        this.computers[name] = computer;
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
            ["Name", "Activity", "|", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i" ,"|",
             "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"],
            Object.entries(this.diagnostics)
                .filter(([candidate]) => name !== undefined ? candidate === name : true)
                .map(([name, diag]) => [
                    name,
                    diag.state,
                    "|",
                    /* #ticks */ numToString(this.computers[name].processor.stats.ticks, {padDecimal: 0}),
                    /* #tasks */ numToString(this.computers[name].processor.stats.tasks, {padDecimal: 0}),
                    /* #insts */ numToString(this.computers[name].processor.stats.insts, {padDecimal: 0}),
                    /* #alu ops */ numToString(this.computers[name].processor.alu.stats.ops, {padDecimal: 0}),
                    /* #slices */ numToString(this.computers[name].stats.slices, {padDecimal: 0}),
                    /* micro ops / slice */ numToString(round(this.computers[name].stats.slices !== 0 ? (this.computers[name].processor.stats.tasks / this.computers[name].stats.slices) : 0, 2)),
                    /* insts / slice */ numToString(round(this.computers[name].stats.slices !== 0 ? (this.computers[name].processor.stats.insts / this.computers[name].stats.slices) : 0, 2)),
                    /* time */ numToString(round(this.computers[name].stats.time, 2)),
                    /* million micro ops / sec */ numToString(round(this.computers[name].stats.time !== 0 ? ((this.computers[name].processor.stats.tasks / this.computers[name].stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
                    /* mllion ips / sec */ numToString(round(this.computers[name].stats.time !== 0 ? ((this.computers[name].processor.stats.insts / this.computers[name].stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
                    /* million aops / sec */ numToString(round(this.computers[name].stats.time !== 0 ? ((this.computers[name].processor.alu.stats.ops / this.computers[name].stats.time) * 1000 / 1000000) : 0, 4), {padDecimal: 4}),
                    /* mop / ips */ numToString(round(this.computers[name].processor.stats.insts !== 0 ? ((this.computers[name].processor.stats.tasks / this.computers[name].processor.stats.insts)) : 0, 4), {padDecimal: 4}),
                    "|",
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
            report.log("Instruction Cache: ");
            report.log(this.diagnostics[name].dumpInstructionCache().map(v => toHex4(v)));
        }
    }
}

const monitor = new Monitor();
let cli;

const commands = {
    level: {
        description: "Set output level",
        parameters: [
            {
                label: "level", optional: true, type: "string",
                description: "Level of output; defaults to verbose for REPL"
            }
        ],
        action: ({level = "verbose"}) => {
            verbose = level === "verbose";
        }
    },
    create: {
        description: "Create a new Retroputer instance",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to current default`
            }
        ],
        options: [
            {
                label: "blocking", description: "If set, computer execution is blocking until it voluntarily surrenders control via setting SS."
            }
        ],
        action: ({name = monitor.default}, {blocking = false, debug = true}) => {
            try {
                monitor.create({name, debug, timingMethod: blocking ? TIMING_METHODS.BLOCKING : TIMING_METHODS.AUTO});
                monitor.default = name; // this is the new default machine
                if (verbose) report.info(`Created a computer with name "${name}"`);
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
            if (verbose) report.info(`Switched to computer "${name}"`);
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
                if (verbose) report.info(`Started execution on computer "${name}"`);
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
                if (verbose) report.info(`Stopped computer "${name}"`);
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
                            data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte, true));
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
                const dirname = path.dirname(file);
                const basename = path.basename(file);
                const newDir = path.resolve(process.cwd(), dirname);
                shell.pushd("-q", newDir);
                const resolvedPath = path.resolve(process.cwd(), basename);
                if (verbose) report.info(`Assembling ${resolvedPath}...`)
                const asm = fs.readFileSync(resolvedPath, {encoding: "utf8"});
                if (verbose) report.info(`... parsing...`);
                const ast = parser.parse(asm);
                if (verbose) report.info(`... assembling...`);
                const segments = assemble(ast);
                if (verbose) report.info(`... writing...`);
                segments.forEach(segment => {
                    const data = segment.data;
                    const name = segment.name;
                    if (verbose) report.info(`... ... writing segment ${name} with ${data.length} bytes to ${toHex(segment.addr)}...`);
                    data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte, true));
                });
                if (verbose) report.info(`... finished!`);
            } catch (err) {
                report.error(err.message);
            } finally {
                shell.popd("-q");
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
            if (verbose) report.info(`The current computer default is "${monitor.default}"`);
        }

    }
};

const prog = sade("monitor");
prog
    .version(VERSION)
    .option("--level", "Specify verbosity level (error, verbose)", "error");

prog
    .command("run <asmFile>")
    .describe("Assemble the specified assembly file, and then execute it to completion.")
    .option("-g, --at", "Specify the starting address for execution", "0x02000")
    .example("run asm/examples/console.asm -g 0x03000")
    .action((asmFile, {g = "0x02000", level = "error"} = {}) => {
        verbose = level === "verbose";
        commands.create.action({name:"local"}, {blocking: true});
        commands.assemble.action({file: asmFile, name: "local"});
        commands.start.action({at: g, name: "local"});
        if (verbose) commands.list.action();
        process.exit(0);
    });

prog
    .command("repl", "Execute as a REPL", {default: true})
    .example("repl")
    .action(({level = "error"}) => {
        verbose = level === "verbose";
        cli = new CLI()
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
            // output level
            .addCommand("level", commands.level)
            .show();
    });


prog.parse(process.argv);