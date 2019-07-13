import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";

import { CLI } from "cliffy";

import { parser } from "../basm/parser.js";
import { assemble } from "../basm/assemble.js";
import { SIZE_BYTE, SIZE_WORD, SIZE_ADDR, TASKS, TASK_FNS } from "../isa/tasks.js";

import { REGISTER_INDEX, FLAGS_INDEX } from "../core/RegisterFile.js";
import { Memory } from "../core/Memory.js";
import memoryLayout from "../core/memoryLayout.js";
import { SystemBus } from "../core/SystemBus.js";
import { Bus } from "../core/Bus.js";
import { IOBus } from "../core/IOBus.js";
import { Processor } from "../core/Processor.js";


import report from "yurnalist";

const toHex = (n, padding=4) => n.toString(16).padStart(padding, "0").toUpperCase();
const toHex2 = n => toHex(n, 2);
const toHex4 = n => toHex(n, 4);
const toHex5 = n => toHex(n, 5);
const toHex8 = n => toHex(n, 8);

class Computer {
    constructor() {
        // configure the computer
        this.clock = new Bus(1, 0b1);
        this.systemBus = new SystemBus();
        this.memory = new Memory({systemBus: this.systemBus});
        this.ioBus = new IOBus()
        this.processor = new Processor({memory: this.memory, systemBus: this.systemBus, ioBus: this.ioBus, clock: this.clock})

        this.processor.registers.MP = 0x2000;
        this.processor.registers.PC = 0x2000;

        this._runID = null;
    }
    step() {
        this.clock.signal();
    }
    runBatch(timeout = 16, granularity = 4096) {
        const start = performance.now();
        this.processor.registers.SINGLE_STEP = 0;
        if (timeout > 0) {
            let now = start;
            let c = 0;
            while (!this.processor.registers.SINGLE_STEP && now < (start + timeout)) {
                this.step();
                if ((c = ((c + 1) & granularity)) === 0) {
                    now = performance.now();
                }
            }
        } else {
            while (!this.processor.registers.SINGLE_STEP) {
                this.step();
            }
        }
    }
    run(timeout = 16, granularity = 4096) {
        if (this._runID) {
            clearInterval(this._runID);
        }
        this._runID = setInterval(() => {
            this.runBatch(timeout > 0 ? timeout - 1 : 0, granularity);
            if (this.processor.registers.SINGLE_STEP) {
                clearInterval(this._runID); // computer has halted, so no point in doing nothing
                this._runID = null;
            }
        }, timeout);
    }
    stop() {
        if (this._runID) {
            clearInterval(this._runID);
        }
        this._runID = null;
    }
    get running() {
        return this._runID !== null;
    }
}

const computers = {};

const cli = new CLI()
    .setDelimiter("? ")
    .addCommand("new", {
        description: "Create a new Retroputer instance",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to "default"`
            }
        ],
        action: ({name = "default"}) => {
            if (computers[name]) {
                report.error(`A computer with the name "${name}" already exists.`);
                return;
            }
            computers[name] = new Computer();
            report.info(`Created a computer with name "${name}"`);

        }
    })
    .addCommand("stop", {
        description: "Stop a running Retroputer instance",
        parameters: [
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to "default"`
            }
        ],
        action: ({name = "default"}) => {
            const targetComputer = computers[name];
            if (!targetComputer) {
                report.error(`Couldn't find a computer named ${name}. Did you create it with "new"?`);
                return;
            }
            targetComputer.stop();
            report.info(`Stopped computer "${name}"`);
        }
    })
    .addCommand("start", {
        description: "Start a computer executing",
        parameters: [
            {
                label: "at", optional: true, type: "number",
                description: "Locatio to start execution; defaults to $02000"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to "default"`
            }
        ],
        action: ({at = 0x02000, name = "default"}) => {
            const targetComputer = computers[name];
            if (!targetComputer) {
                report.error(`Couldn't find a computer named ${name}. Did you create it with "new"?`);
                return;
            }
            targetComputer.processor.registers.PC = at;
            targetComputer.processor.registers.MP = at;
            targetComputer.run();
            report.info(`Started execution on computer "${name}"`);
        }
    })
    .addCommand("step", {
        description: "Single-step a computer",
        parameters: [
            {
                label: "at", optional: true, type: "number",
                description: "Location to start execution; defaults to computer's PC"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Name of the retroputer; defaults to "default"`
            }
        ],
        action: ({at, name = "default"}) => {
            const targetComputer = computers[name];
            if (!targetComputer) {
                report.error(`Couldn't find a computer named ${name}. Did you create it with "new"?`);
                return;
            }
            if (targetComputer.running) {
                report.error(`Computer is running! Stop it first before single-stepping.`);
                return;
            }
            if (at !== undefined) {
                targetComputer.processor.registers.PC = at;
                targetComputer.processor.registers.MP = at;
            }
            targetComputer.step();
            report.table(
                ["Name", "Status", "A", "B", "C", "D", "X", "Y", "BP", "SP", "STATUS", "PC", "MP", "MM"],
                [[
                    name,
                    targetComputer.running ? "running" : "paused",
                    toHex(targetComputer.processor.registers.A),
                    toHex(targetComputer.processor.registers.B),
                    toHex(targetComputer.processor.registers.C),
                    toHex(targetComputer.processor.registers.D),
                    toHex(targetComputer.processor.registers.X),
                    toHex(targetComputer.processor.registers.Y),
                    toHex(targetComputer.processor.registers.BP),
                    toHex(targetComputer.processor.registers.SP),
                    toHex(targetComputer.processor.registers.STATUS),
                    toHex(targetComputer.processor.registers.PC),
                    toHex(targetComputer.processor.registers.MP),
                    toHex(targetComputer.processor.registers.MM)
                ]]
            );
            report.inspect(targetComputer.processor.internalState);
        }
    })
    .addCommand("assemble", {
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
        action: ({file, name = "default"}) => {
            const targetComputer = computers[name];
            if (!targetComputer) {
                report.error(`Couldn't find a computer named ${name}. Did you create it with "new"?`);
                return;
            }
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
                data.forEach((byte, idx) => targetComputer.memory.writeByte(segment.addr + idx, byte));
            });
            report.info(`... finished!`);
        }
    })
    .addCommand("dump", {
        description: "Dump computer memory contents",
        parameters: [
            {
                label: "start", optional: true, type: "number",
                description: "Starting address to dump, defaults to $2000"
            },
            {
                label: "length", optional: true, type: "number",
                description: "Number of bytes to dump, defaults to $FF"
            },
            {
                label: "name", optional: true, type: "string",
                description: `Target computer to dump; defaults to "default"`
            }
        ],
        action: ({start = 0x2000, length = 0x00FF, name = "default"}) => {
            const targetComputer = computers[name];
            if (!targetComputer) {
                report.error(`Couldn't find a computer named ${name}. Did you create it with "new"?`);
                return;
            }
            const rows = Array.from({length: Math.ceil(length / 16)}, (_, row) => {
                const bytes = Array.from({length: 16}, (_, col) => targetComputer.memory.readByte(start + (row * 16) + col));
                return [toHex5(start + (row * 16)) + ":",
                    ...bytes.map(toHex2),
                    bytes.map(byte => ((byte & 0x7F) >= 0x20) ? String.fromCharCode(byte) : ".").join("")
                ];
            });
            report.table(
                ["Addr:", ...Array.from({length: 16}, (_, col) => toHex2(col)), "Text"],
                rows
            );
        }
    })
    .addCommand("list", {
        description: "List computer instances and statuses",
        action: () => {
            const computerEntries = Object.entries(computers);
            if (computerEntries.length < 1) {
                report.error(`No computers created to display. Use "new" to create one.`);
                return;
            }
            report.table(
                ["Name", "Status", "A", "B", "C", "D", "X", "Y", "BP", "SP", "STATUS", "PC", "MP", "MM"],
                computerEntries.map(([name, computer]) => [
                    name,
                    computer.running ? "running" : "paused",
                    toHex(computer.processor.registers.A),
                    toHex(computer.processor.registers.B),
                    toHex(computer.processor.registers.C),
                    toHex(computer.processor.registers.D),
                    toHex(computer.processor.registers.X),
                    toHex(computer.processor.registers.Y),
                    toHex(computer.processor.registers.BP),
                    toHex(computer.processor.registers.SP),
                    toHex(computer.processor.registers.STATUS),
                    toHex(computer.processor.registers.PC),
                    toHex(computer.processor.registers.MP),
                    toHex(computer.processor.registers.MM)
                ])
            );
        }
    })
    .addCommand("exit", {
        description: "Quit the monitor",
        action: () => {
            process.exit(0);
        }
    })
    .show();