import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";

import report from "yurnalist";
import { CLI } from "cliffy";
import sade from "sade";

import { parser } from "../basm/parser.js";
import { assemble, setImportProvider, createScope, SCOPE } from "../basm/assemble.js";
import { nodeImportProvider } from "../basm/importProviders/node.js";
setImportProvider(nodeImportProvider);

import { Computer, TIMING_METHODS } from "../core/Computer.js";
import { ConsoleDevice } from "../devices/Console.js";
import { Screen } from "../devices/Screen.js";
import { DMA } from "../devices/DMA.js";
import { Keyboard } from "../devices/Keyboard.js";
import { Timers } from "../devices/Timers.js";

import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics } from "../core/Diagnostics.js";

import rom, { vectors } from "../roms/kernel.js";

import shell from "shelljs";

import output from "image-output";

const VERSION = "0.0.1";
let verbose = false;

class Monitor {
    constructor() {
        this.computers = {};
        this.diagnostics = {};
        this.devices = {};
        this.intervals = {};
        this.default = "default";
    }

    includes(name) {
        return Object.keys(this.computers).indexOf(name) > -1;
    }

    dumpScreen({name = this.default, to = ""} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" does not exist.`);
        }

        const screen = this.devices[name].screen;
        console.log("\n");
        output(screen.frame, (to === "" || to === "console" || to === true) ? null : to, {width: 640, height: 480});
        if (screen._wait) {
            screen.resetWait();
        }

    }

    create({name = this.default, debug = true, timingMethod = TIMING_METHODS.AUTO, time = "16", granularity = "15"} = {}) {
        if (this.includes(name)) {
            throw new Error(`A computer with the name "${name}" already exists.`);
        }
        const computer = new Computer({performance, debug, timingMethod, sliceTime: Number(time), sliceGranularity: Number(granularity)});
        computer.memory.loadFromJS(rom, true);

        const timers = new Timers({
            device: 0,
            length: 16,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock,
            performance
        });

        const screen = new Screen({
            device: 1,
            length: 32,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock,
            performance,
            stats: this.fps
        });
        screen.adjustPerformance = true; // no auto adjust of perf; may be < 60fps
        screen.ticksBetweenRasterLines = 12; // 12 tics per line
        screen.mode = 2; // accurate screen

        const console = new ConsoleDevice({
            device: 8,
            length: 16,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock
        });

        const dma = new DMA({
            device: 13,
            length: 16,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock
        });

        const keyboard = new Keyboard({
            device: 3,
            length: 16,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock
        });
        this.devices[name] = {
            screen,
            keyboard, 
            timers,
            dma,
            console
        };

        this.intervals[name] = {};
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

        if (this.intervals[name].screen) {
            clearInterval(this.intervals[name].screen);
        }
        this.intervals[name].screen = setInterval(() => {
            const screen = this.devices[name].screen;
            if (screen._wait) {
                screen.resetWait();
            }
        }, 1);
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
        if (this.intervals[name].screen) {
            clearInterval(this.intervals[name].screen);
        }
    }

    memory({name = this.default} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        return this.computers[name].memory;
    }

    disassemble({start = undefined, length = 16, name = this.default} = {}) {
        if (!this.includes(name)) {
            throw new Error(`A computer with the name "${name}" doesn't exist.`);
        }
        const startAt = (start === undefined) ? this.computers[name].processor.registers.PC : start;
        report.log(this.diagnostics[name].disassembleMemory({start: startAt, length}));
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
            ["Name", "Activity", "|", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i" ,"|\n               |",
             "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"],
                    Object.entries(this.diagnostics)
                .filter(([candidate]) => name !== undefined ? candidate === name : true)
                .map(([name, diag]) => { 
                    const dumpedStats = diag.dumpStatistics();
                    const stats = [ dumpedStats.ticks, dumpedStats.tasks, dumpedStats.insts, dumpedStats.aluOps,
                        dumpedStats.slices, dumpedStats.microOpsPerSlice, dumpedStats.instsPerSlice, dumpedStats.totalTime,
                        dumpedStats.MMOPs, dumpedStats.MIPs, dumpedStats.MAOPs, dumpedStats.microOpsPerInst ];
                    return [
                        name,
                        diag.state,
                        "|", ...stats, "|\n",
                        ...diag.dumpRegisters().map(toHex4)
                    ]})
        );
        if (dump) {
            report.log("Next Instruction (disassembled): ");
            const startAt = this.computers[name].processor.registers.PC;
            report.log(this.diagnostics[name].disassembleMemory({start: startAt, length: 8}).split("\n")[0]);
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
            },
            { label: "timing", description: "Enables fixed or auto timing modes. AUTO, FIXED, INTERVAL, TIMEOUT, RAF, BLOCKING", optional: true, type: "string" },
            { label: "time", description: "Amount of time for a slice, unless FIXED or BLOCKING.", optional: true, type: "string" },
            { label: "granularity", description: "Instruction granularity in slice. If FIXED, number of instructions per slice. BLOCKING ignores.", optional: true, type: "string" }
        ],
        options: [
        ],
        action: ({name = monitor.default, timing = "AUTO", time = "16", granularity="255"}, {debug = true} = {}) => {
            try {
                const timingMethod = TIMING_METHODS[timing.toUpperCase()];
                monitor.create({name, debug, timingMethod, time, granularity});
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
                        const globals = createScope();
                        globals[SCOPE.CONTENTS] = Object.assign({}, vectors);
                        const segments = assemble(ast, globals);
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
                const globals = createScope();
                globals[SCOPE.CONTENTS] = Object.assign({}, vectors);
                const segments = assemble(ast, globals);
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
    dumpScreen: {
        description: "Show computer screen",
        parameters: [
            {
                label: "to", optional: true, type: "string",
                description: "Location to dump screen to, or `console`."
            },
        ],
        action: ({name = monitor.default, to = ""} = {}) => {
            try {
                monitor.dumpScreen({name, to});
            } catch (err) {
                report.error(err.message);
            }
        }
    },
    disassemble: {
        description: "Disassemble computer memory contents",
        parameters: [
            {
                label: "start", optional: true, type: "number",
                description: "Starting address to disassemble, defaults to PC"
            },
            {
                label: "length", optional: true, type: "number",
                description: "Number of bytes to disassemble, defaults to $0F"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Target computer to disassemble; defaults to current default"`
            }
        ],
        action: ({start, length = 0xF, name = monitor.default}) => {
            try {
                monitor.disassemble({start, length, name});
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

function quitWithOptions({reason, dumpScreen, finishScreen}) {
    if (dumpScreen) {
        const screen = monitor.devices["local"].screen;
        if (finishScreen) {
            for (let frames = 0; frames < 3; frames++) { 
                while (!screen._wait) screen.tick();
                screen.resetWait();
            }
        }
        commands.dumpScreen.action({to:dumpScreen});
    }
    if (verbose) commands.list.action();
    if (verbose) report.info(reason);
    process.exit(0);
}

const prog = sade("monitor");
prog
    .version(VERSION)
    .option("--level", "Specify verbosity level (error, verbose)", "error");

prog
    .command("run <asmFile>")
    .describe("Assemble the specified assembly file, and then execute it to completion, or for a given time period.")
    .option("-g, --at", "Specify the starting address for execution", "0x02000")
    .option("-t, --timeout", "Timeout for execution or (0) to completion", "0")
    .option("-c, --cycles", "Stop after specified cycles or (0) to completion", "0")
    .option("-s, --slices", "Stop after specified slices or (0) to completion", "0")
    .option("-d, --screen", "Render the screen, either to the 'console' or to a file", "")
    .option("-f, --finish", "If specified, allow the screen to render completely.", false)
    .option("--timingMethod", "Specifies the timing method: (AUTO), FIXED, INTERVAL, TIMEOUT, RAF, BLOCKING", "AUTO")
    .option("--timePerSlice", "Specifies the ms per slice", "16")
    .option("--sliceGranularity", "Specifies the granularity per time check in a slice or # of instructions for FIXED", "15")
    .example("run asm/examples/console.asm -g 0x03000")
    .action((asmFile, {g = "0x02000", t = "0", c = "0", s = "0", d = "", f = false, timingMethod = "AUTO", timePerSlice = "16", sliceGranularity = "15", level = "error"} = {}) => {
        const name = "local";
        let dumpScreen = d;
        if (dumpScreen === true) {
            dumpScreen = "console";
        }
        const finishScreen = f;
        verbose = level === "verbose";
        commands.create.action({name, timing: timingMethod, time: timePerSlice, granularity: sliceGranularity}, {debug: timingMethod.toUpperCase() !== "BLOCKING"});
        if (timingMethod.toUpperCase() !== "BLOCKING") commands.start.action({name});
        commands.assemble.action({file: asmFile, name});

        const diag = monitor.diagnostics[name];

        let cyclesAtStart = 0;
        let totalTimeAtStart = 0;
        let slicesAtStart = 0;
        let startCounting = false;
        setTimeout(() => {
            commands.stop.action({name});
            commands.start.action({at: g, name});
            const stats = diag.dumpStatistics();
            cyclesAtStart = stats.insts;
            slicesAtStart = stats.slices;
            totalTimeAtStart = stats.totalTime;
            startCounting = true; 
        }, timingMethod.toUpperCase() !== "BLOCKING" ? 1000 : 0);

        if (verbose) commands.list.action();

        let cycles = Number(c);
        if (Number.isNaN(cycles)) cycles = 0;

        let slices = Number(s);
        if (Number.isNaN(slices)) slices = 0;

        let timeout  = Number(t);
        if (Number.isNaN(timeout)) timeout = 0;

        setInterval(() => {
            if (diag.state !== "running") {
                quitWithOptions({reason: "Program terminated.", dumpScreen, finishScreen});
            }
            if (!startCounting) return;

            const stats = diag.dumpStatistics();
            if (cycles > 0 && (stats.insts - cyclesAtStart) >= cycles) {
                quitWithOptions({reason: "Program terminated early (cycles exceeded).", dumpScreen, finishScreen});
            }
            if (slices > 0 && (stats.slices - slicesAtStart) >= slices) {
                quitWithOptions({reason: "Program terminated early (slices exceeded).", dumpScreen, finishScreen});
            }
            if (timeout > 0 && (stats.totalTime - totalTimeAtStart) >= timeout) {
                quitWithOptions({reason: "Program terminated early (timed out).", dumpScreen, finishScreen});
            }
        }, 1);
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
            // dumpScreen
            .addCommand("ds", commands.dumpScreen)
            .addCommand("screen", commands.dumpScreen)
            // disassemble
            .addCommand("u", commands.disassemble)
            .addCommand("disassemble", commands.disassemble)
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