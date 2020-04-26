import express from "express";
import convert from 'rgba-to-datauri';
import PNG from "pngjs";
import GifEncoder from "gif-encoder";

import { performance } from "perf_hooks";

import { parser } from "../basm/parser.js";
import { assemble, setImportProvider, createScope, SCOPE } from "../basm/assemble.js";
//import { nodeImportProvider } from "../basm/importProviders/node.js";
//setImportProvider(nodeImportProvider);

import { Computer, TIMING_METHODS } from "../core/Computer.js";
import { ConsoleDevice } from "../devices/Console.js";
import { Screen } from "../devices/Screen.js";
import { DMA } from "../devices/DMA.js";
import { Keyboard } from "../devices/Keyboard.js";
import { Timers } from "../devices/Timers.js";

import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics } from "../core/Diagnostics.js";

import rom, { vectors } from "../roms/kernel.js";

function createComputer({timingMethod = "AUTO", sliceTime = 16, sliceGranularity = 255, adjustPerformance = true, ticksBetweenRasterLines = 12, mode = 2} = {}) {
    const computer = new Computer({performance, debug: true, timingMethod, sliceTime, sliceGranularity});
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
    screen.adjustPerformance = adjustPerformance;
    screen.ticksBetweenRasterLines = ticksBetweenRasterLines;
    screen.mode = mode;

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

    return {
        computer,
        memory: computer.memory,
        console,
        dma,
        keyboard,
        timers,
        screen
    };
}

function assembleCode({asm, computer}) {
    const ast = parser.parse(asm);
    const globals = createScope();
    globals[SCOPE.CONTENTS] = Object.assign({}, vectors);
    const segments = assemble(ast, globals);
    segments.forEach(segment => {
        const data = segment.data;
        const name = segment.name;
        data.forEach((byte, idx) => computer.memory.writeByte(segment.addr + idx, byte, true));
    });
}

function stopComputer({computer, screen, finishScreen = false, interval, forceKill, recordBuffer, onStop} = {}) {
    computer.stop();
    clearInterval(interval);
    clearTimeout(forceKill);
    if (finishScreen) {
        for (let frames = 0; frames < 3; frames++) { 
            while (!screen._wait) screen.tick();
            screen.resetWait();
            if (recordBuffer) { recordBuffer.push(Buffer.from(screen.frame)); }
        }
    }
    onStop(screen.frame);
}

function startComputer({computer, screen, diag, timeout = 3000, finishScreen = false, recordBuffer = null, onStop}) {
    // start the computer (we need to call INIT, so this will launch BASIC for 1s)
    computer.processor.jump(0x0FF00);
    computer.processor.registers.SINGLE_STEP = 0;
    computer.run();

    let forceKill, interval;

    // time out after the desired interval (+1s, since we have to INIT)
    forceKill = setTimeout(() => { stopComputer({computer, screen, finishScreen, interval, forceKill, recordBuffer, onStop}); }, timeout + 1000);

    // Handle screen frames, and early stop
    interval = setInterval(() => {
        if (screen._wait) {
            screen.resetWait();
            if (recordBuffer) { recordBuffer.push(Uint8Array.from(screen.frame)); }
        }
        if (diag.state !== "running") stopComputer({computer, screen, finishScreen, interval, forceKill, recordBuffer, onStop});
    }, 1);
}


function run(cb, {asm, at = 0x02000, timeout = 3000, finishScreen = false, timingMethod = "AUTO", sliceTime = 16, sliceGranularity = 255, adjustPerformance = true, ticksBetweenRasterLines = 12, mode = 2, recordBuffer = null} = {}) {
    const {computer, memory, console, dma, keyboard, times, screen} = createComputer({timingMethod, sliceTime, sliceGranularity, adjustPerformance, ticksBetweenRasterLines, mode});
    const diag = new Diagnostics(computer);

    // assemble incoming
    try { assembleCode({asm, computer}); } 
    catch (err) { return cb(err, null); }

    startComputer({computer, screen, timeout, diag, finishScreen, recordBuffer, onStop: frame => cb(null, frame)});
    
    // start the actual requested assembly
    setTimeout(() => { if (at !== undefined) computer.processor.jump(at); }, 1000);

}

/*
 * HTML Templates & Rendering
 */

const defaultAsm = `.segment data 0x03000 {
    hello: .string 12, "Hello, world", 0
}
.segment code 0x02000 {
    d := addrbank(data.hello)
    x := addrbofs(data.hello)
    call [PRINT]
    brk
}`;

const editor = ({asm, finishScreen = "yes"} = {}) => `
        <form method="POST" action="/">
            <textarea name="asm" rows=25 cols=80>${asm || defaultAsm}</textarea><br/>
            <input type="checkbox" ${finishScreen === "yes" ? "checked" : ""} name="finishScreen" value="yes"> Finish Screen?<br/>
            <input type="submit"/>
        </form>`;

const renderPage = ({asm, finishScreen = "yes", frame, err, recordBuffer} = {}) => {
    let base64;
    if (!err) {
        if (Array.isArray(recordBuffer)) {
            base64=""; //TODO: Figure out how to get GIFs into the browser version
        } else {
            base64 = frame ? convert.convert(Buffer.from(frame), 640, 480) : "";
        }
    };
    return `
<html>
    <title>Retroputer... in the Cloud!</title>
    <body>
        <h1>Retroputer Cloud Executor</h1>
        ${err ? `<pre>${err.message}</pre>` : ""}
        <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            ${base64 ? `<img src="${base64}"/>` : ""}
            ${editor({asm, finishScreen})}
        </div>
    </body>
</html>`
};

/*
 * Server
 */

const PORT = process.env.PORT || 1234;
const app = express();

let rid = 0;

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.route("/")
    .all((req, res, next) => {
        rid++;
        req.rid = rid;
        console.log(`Incoming request #${rid} from ${req.ip}; ${req.method} ${req.originalUrl}`);
        next();
    })
    .get((req, res, next) => { res.send(renderPage()); next(); })
    .post((req, res, next) => {
        // get all the parameters and options

        // timeout
        const requestedTimeout = Number(req.body.timeout || req.query.timeout || "3000");
        const timeout = Math.max(Math.min(Number.isNaN(requestedTimeout) ? 3000 : requestedTimeout, 10000), 1);

        // assembly code
        const asm = req.body.asm || req.body; // (if content type is text, asm will be in the body)

        // other useful options

        // if yes, will draw the screen a few more times to allow final output to be drawn
        const finishScreen = (req.body.finishScreen || req.query.finishScreen || "yes") === "yes";

        // request the desired timing method
        const requestedTimingMethod = (req.body.timingMethod || req.query.timingMethod || "AUTO");
        const timingMethod = ["AUTO", "FIXED", "TIMEOUT", "INTERVAL"].find(c => c === requestedTimingMethod) || "AUTO";

        // slice time is used for AUTO, TIMEOUT, INTERVAL and can go between 1ms and 16ms.
        const requestedSliceTime = Number(req.body.sliceTime || req.query.sliceTime || "16");
        const sliceTime = Math.max(Math.min(Number.isNaN(requestedSliceTime) ? 16 : requestedSliceTime, 16), 1);

        // Granularity can go between 1 and 16383
        const requestedSliceGranularity = Number(req.body.sliceGranularity || req.query.sliceGranularity || "255");
        const sliceGranularity = Math.max(Math.min(Number.isNaN(requestedSliceGranularity) ? 255 : requestedSliceGranularity, 16383), 1);

        // 1 = fast, 2 = accurate
        const screenMode = {FAST: 1, ACCURATE: 2}[(req.body.screenMode || req.query.screenMode || "accurate").toUpperCase()] || 2;

        // ticks per raster line can go between 1 and 64
        const requestedTicksBetweenRasterLines = Number(req.body.ticksBetweenRasterLines || req.query.ticksBetweenRasterLines || "12");
        const ticksBetweenRasterLines = Math.max(Math.min(Number.isNaN(requestedTicksBetweenRasterLines) ? 12 : requestedTicksBetweenRasterLines, 64), 1);

        // if yes, the screen will adjust to try and maintain 60fps
        const adjustPerformance = (req.body.adjustPerformance || req.query.adjustPerformance || "yes") === "yes";

        // should we record for GIF?
        const recordBuffer = ((req.accepts("image/gif") &&
                              (req.body.record || req.query.record || "no") === "yes")) ? [] : null;

        // here we go!
        run((err, frame) => {
            res.format({
                default: () => { res.status(406).send("Unacceptable accept content type"); next();},
                "html": () => { res.send(renderPage({asm, finishScreen, frame, err, recordBuffer})); next();},
                "json": () => {
                    res.send({
                        error: err && err.message,
                        frame,
                        asm
                    });
                    next();
                },
                "image/png": () => {
                    const png = new PNG.PNG({ width: 640, height: 480 });
                    png.data = frame || [];
                    res.send(PNG.PNG.sync.write(png));
                    next();
                },
                "image/gif": () => {
                    const gif = new GifEncoder(640, 480);
                    res.type("image/gif");
                    gif.setDelay(16);
                    res.bytesWritten = 0;
                    gif.on("data", buffer => {
                        res.write(buffer);
                        res.bytesWritten += buffer.length;
                    });
                    gif.on("end", () => {
                        res.end();
                    });
                    gif.writeHeader();
                    if (!recordBuffer) {
                        gif.addFrame(frame);
                    } else {
                        for (let i = 0; i < recordBuffer.length; i++) {
                            gif.addFrame(recordBuffer[i]);
                        }
                    }
                    gif.finish();
                    next();
                }
            });
        }, {asm, timeout, finishScreen, timingMethod, sliceTime, sliceGranularity, adjustPerformance, ticksBetweenRasterLines, mode: screenMode, recordBuffer});
    })
    .all((req, res, next) => {
        console.log(`Completed processing request id #${req.rid}, status ${res.statusCode}. Wrote ${res.bytesWritten || res.get("Content-Length")} bytes.`);
        next();
    })
    ;


const listener = app.listen(PORT, () => { console.log(`Retroputer Server listening on port ${listener.address().port}`); });