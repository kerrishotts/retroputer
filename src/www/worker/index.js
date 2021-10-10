import { Diagnostics } from "../../core/Diagnostics.js";
import { Computer, TIMING_METHODS } from "../../core/Computer.js";
import { BrowserConsole } from "./BrowserConsole.js";
import { Screen } from "../../devices/Screen.js";
import { DMA } from "../../devices/DMA.js";
import { Keyboard } from "../../devices/Keyboard.js";
import { Timers } from "../../devices/Timers.js";

import rom from "../../roms/kernel.js";

class System {
    constructor(opts) {
        this.config = Object.assign({}, {
            options: {
                timingMethod: TIMING_METHODS.FIXED,
                sliceGranularity: 16384,
                sliceTime: 16,
                ticksBetweenRasterLines: "AUTO",
                accurateScreen: true,
            },
        }, opts);
        const computer = new Computer({ 
            performance, 
            debug: true, 
            timingMethod: this.config.options.timingMethod,
            sliceTime: this.config.options.sliceTime, 
            sliceGranularity: this.config.options.sliceGranularity,
        });
        computer.memory.loadFromJS(rom, true);
        const diagnostics = new Diagnostics(computer);

        const timers = new Timers({
            device: 0,
            length: 16,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock,
            performance
        });

        const simpleConsole = new BrowserConsole({
            device: 8,
            length: 16,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock
        });

        const screen = new Screen({
            device: 1,
            length: 32,
            controller: computer.controller,
            memory: computer.memory,
            clock: computer.clock,
            performance
        });

        screen.adjustPerformance = this.config.options.ticksBetweenRasterLines === "AUTO";

        if (this.config.options.ticksBetweenRasterLines !== "AUTO") {
            screen.ticksBetweenRasterLines = Number(this.config.options.ticksBetweenRasterLines);
        }

        screen.mode = this.config.accurateScreen ? 2 : 1;

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

        this.computer = computer;
        this.diagnostics = diagnostics;
        this.devices = {
            console: simpleConsole,
            screen,
            dma,
            keyboard,
            timers
        };

        computer.reset();
    }
}

let system;
onmessage = evt => {
    const { data } = evt;
    const { command, options } = data;

    switch (command) {
        case "sys-init":        /* initialize the system */
            system = new System(options); 
            break;
        case "sys-config":      /* update the system configuration */
            break;
        case "cpu-reset":       /* reset the computer */
            system.computer.reset();
            if (system.diagnostics.state === "running") return;
            system.computer.run();

// temporary
const text = `10 PRINT CHR$(RND(2)+238);:GOTO 10
RUN
`;
Array.from(text).forEach(ch => {
    system.devices.keyboard.keyPressed(ch==="\n"?13:ch.charCodeAt(0));
});


            break;
        case "cpu-start":       /* start the computer */
            system.computer.processor.jump(Number(options.startAddress || "0xFF00"));
            system.computer.processor.registers.SINGLE_STEP = 0;
            if (system.diagnostics.state === "running") return;
            system.computer.run();
            break;
        case "cpu-stop":        /* stop the computer */
            system.computer.stop();
            break;
        case "cpu-continue":    /* continue the computer */
            if (system.diagnostics.state === "running") return;
            system.computer.processor.registers.SINGLE_STEP = 0;
            system.computer.processor.registers.INTERRUPT_DISABLE = 0;
            system.computer.run();
            break;
        case "cpu-step":        /* single-step the computer */
            if (system.diagnostics.state === "running") {
                system.computer.processor.registers.INTERRUPT_DISABLE = 1;
                system.computer.processor.registers.SINGLE_STEP = 1;
            };
            system.computer.step();
            break;
        case "cpu-jump":        /* jump the CPU to a new location */
            system.computer.processor.jump(Number(options.startAddress || "0xFF00"));
            break;

        case "frame-dump":      /* get a frame */
            const frame = system.devices.screen.frame;
            if (system.devices.screen._wait) system.devices.screen.resetWait();
            postMessage({
                command: "frame",
                frame
            } );
            break;
        case "frame-tick":      /* tick the screen driver */
            break;

        case "dump-statistics": /* get the computer's current stats */
            break;
        case "dump-registers":  /* get the computer's current registers */
            break;
        case "dump-flags":      /* get the computer's current flags */
            break;
        case "dump-fpu":        /* get the computer's current fpu */
            break;

        case "key-get-gr":      /* is GR down? */
            break;
        case "key-get-ctrl":    /* is CTRL down? */ 
            break;
        case "key-get-shifted": /* is SHIFT down? */
            break;
        case "key-down":        /* send key down */
            break;
        case "key-up":          /* send key up */
            break;
        case "key-pressed":     /* send key press */
            break;
        case "key-set-raw":     /* set raw matrix value */
            break;
        case "key-clear-raw":   /* clear raw matrix value */
            break;

        case "mem-peek":        /* peek a value from memory */
            break;
        case "mem-poke":        /* poke a value into memory */
            break;
        case "io-peek":         /* peek a value from i/o */
            break;
        case "io-poke":         /* poke a value into i/o */
            break;
        case "io-dump":         /* get the IO from the computer */
            break;
        case "mem-dump":        /* get a range of memory from the computer */
            break;
        default:
            console.log(`Received unsupported event: ${evt}`)
    }
}