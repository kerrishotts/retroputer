import express from "express";
import convert from 'rgba-to-datauri';

import { performance } from "perf_hooks";

import report from "yurnalist";

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

import output from "image-output";

const VERSION = "0.0.1";
let verbose = false;

function run(cb, {asm, at = 0x02000, timeout = 3000, finishScreen = false} = {}) {

    const computer = new Computer({performance, debug: true, timingMethod: "AUTO", sliceTime: 16, sliceGranularity: 255});
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
        performance
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

    const diag = new Diagnostics(computer);

    // assemble incoming
    try {
        const ast = parser.parse(asm);
        const globals = createScope();
        globals[SCOPE.CONTENTS] = Object.assign({}, vectors);
        const segments = assemble(ast, globals);
        segments.forEach(segment => {
            const data = segment.data;
            const name = segment.name;
            data.forEach((byte, idx) => computer.memory.writeByte(segment.addr + idx, byte, true));
        });
    } catch (err) {
        cb(err, null);
        return;
    }

    // start the computer (we need to call INIT, so this will launch BASIC for 1s)
    computer.processor.jump(0x0FF00);
    computer.processor.registers.SINGLE_STEP = 0;
    computer.run();
    
    let forceKill;
    const stop = (why) => {
        computer.stop();
        clearInterval(interval);
        clearTimeout(forceKill);
        if (finishScreen) {
            for (let frames = 0; frames < 3; frames++) { 
                while (!screen._wait) screen.tick();
                screen.resetWait();
            }
        }
        cb(null, screen.frame);
    }

    // Handle screen frames, and early stop
    const interval = setInterval(() => {
        if (screen._wait) {
            screen.resetWait();
        }
        if (diag.state !== "running") {
            stop(0);
        }
    }, 1);

    // time out after the desired interval (+1s, since we have to INIT)
    forceKill = setTimeout(() => {
        stop(1);
    }, timeout + 1000);

    // start the actual requested assembly
    setTimeout(() => {
        if (at !== undefined) {
            computer.processor.jump(at);
        }
    }, 1000);

}

const PORT = process.env.PORT || 1234;
const app = express();

app.use(express.text());
app.use(express.urlencoded({extended: true}));

const editor = (asm) => `
        <form method="POST" action="/">
            <textarea name="asm" rows=25 cols=80>${asm || `.segment data 0x03000 {
    hello: .string 12, "Hello, world", 0
}
.segment code 0x02000 {
    d := addrbank(data.hello)
    x := addrbofs(data.hello)
    call [PRINT]
    brk
}`}</textarea><br/>
            <input type="checkbox" checked name="finishScreen" value="yes"> Finish Screen?<br/>
            <input type="submit"/>
        </form>`;

app.route("/")
    .get((req, res, next) => {
        res.send(`
<html>
    <body>
        Retroputer Server Listening
        ${editor()}
    </body>
</html>`);
    })
    .post((req, res, next) => {
        const asm = req.body.asm || req.body;
        // options
        const finishScreen = (req.body.finishScreen || req.query.finishScreen) === "yes";

        // timeout -- allow between 1ms and 10s
        let timeout = Number(req.query.timeout || "3000");
        if (Number.isNaN(timeout)) timeout = 3000;
        if (timeout < 1) timeout = 1;
        if (timeout > 10000) timeout = 1000;

        // here we go!
        run((err, frame) => {
            res.send(`
<html>
    <body>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap">
        ${err ? `<pre>${err.message}</pre><pre>${asm}<pre>`
              : `<img src="${convert.convert(Buffer.from(frame), 640, 480)}"/>`
        }
        ${req.body.asm ? editor() : ""}
        </div>
    </body>
</html>`);
            next();
        }, {timeout, asm, finishScreen});
    });


const listener = app.listen(PORT, () => {
    console.log(`Retroputer Server listening on port ${listener.address().port}`);
});