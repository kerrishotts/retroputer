import Stats from 'stats.js';
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../core/Diagnostics.js";

import { Computer, TIMING_METHODS } from "../../core/Computer.js";
import { TerminalConsoleDevice } from "./TerminalConsole.js";
import { Screen } from "../../devices/Screen.js";
import { DMA } from "../../devices/DMA.js";
import { Keyboard } from "../../devices/Keyboard.js";
import { Timers } from "../../devices/Timers.js";

import rom from "../../roms/kernel.js";

export class Store {
    constructor() {
        this.listeners = [];

        const stats = new Stats();
        stats.showPanel(0);
        stats.dom.style.cssText = "";
        this.stats = stats;

        const screenFPS = new Stats();
        screenFPS.showPanel(0);
        screenFPS.dom.style.cssText = "";
        this.fps = screenFPS;

        const cpuFPS = new Stats();
        cpuFPS.showPanel(0);
        cpuFPS.dom.style.cssText = "";
        this.cpuStats = cpuFPS;

        this.config = {};
        this.load();
        const computer = new Computer({ 
            performance, 
            debug: true, 
            timingMethod: this.config.options.timingMethod,
            sliceTime: this.config.options.sliceTime, 
            sliceGranularity: this.config.options.sliceGranularity,
            stats: this.cpuStats
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

        const simpleConsole = new TerminalConsoleDevice({
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
            performance,
            stats: this.fps
        });
        screen.adjustPerformance = this.config.options.ticksBetweenRasterLines === "AUTO";
        if (this.config.options.ticksBetweenRasterLines !== "AUTO") {
            screen.ticksBetweenRasterLines = Number(this.config.options.ticksBetweenRasterLines);
        }
        screen.mode = this.accurateScreen ? 2 : 1;

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

    get code() {
        return this.config.code;
    }

    set code(v) {
        this.config.code = v;
        this.save();
    }

    get updateInterval() {
        return this.config.panels.updateInterval || 250;
    }
    
    set updateInterval(ms) {
        this.config.panels.updateInterval = ms;
        this.save();
        this.notify();
    }

    get autoUpdate() {
        return this.config.panels.autoUpdate;
    }

    set autoUpdate(v) {
        this.config.panels.autoUpdate = v;
        this.save();
        this.notify();
    }

    get codes() {
        return this.config.codes;
    }

    get memoryStart() {
        return this.config.memoryPanel.start;
    }

    set memoryStart(v) {
        this.config.memoryPanel.start = Number.isNaN(Number(v)) ? "0x00000" : v;
        this.save();
        this.notify();
    }

    get memoryEnd() {
        return this.config.memoryPanel.end;
    }

    set memoryEnd(v) {
        this.config.memoryPanel.end = Number.isNaN(Number(v)) ? "0x7FFFF" : v;
        this.save();
        this.notify();
    }

    get useGL() {
        return this.config.options.useGL;
    }

    set useGL(v) {
        this.config.options.useGL = v;
        this.save();
        this.notify();
    }

    get accurateScreen() {
        return this.config.options.accurateScreen;
    }

    set accurateScreen(v) {
        this.config.options.accurateScreen = v;
        this.save();
        this.notify();
    }

    get showKeyboardOnScreen() {
        return this.config.options.showKeyboardOnScreen;
    }

    set showKeyboardOnScreen(v) {
        this.config.options.showKeyboardOnScreen = v;
        this.save();
        this.notify();
    }

    addListener(cb) {
        if (this.listeners.indexOf(cb) < 0) {
            this.listeners.push(cb);
        }
    }
    removeListener(cb) {
        this.listeners = this.listeners.filter(l => l !== cb);
    }

    notify() {
        this.listeners.forEach(l => l(this));
    }

    save() {
        localStorage.setItem("config", JSON.stringify(this.config));
    }

    saveProgram(name) {
        this.config.codes = [ ...this.config.codes.filter(({name:aName}) => aName !== name), {name, code: this.code} ];
        this.save();
        this.notify();
    }

    loadProgram(name) {
        this.code = this.config.codes.find(({name:aName}) => name === aName).code;
        this.save();
        this.notify();
    }

    load() {
        const savedConfigStr = localStorage.getItem("config");
        const savedConfig = savedConfigStr ? JSON.parse(savedConfigStr) : {};
        this.config = Object.assign({}, {
            memoryPanel: {
                start: "0x00000",
                end:   "0x000FF"
            },
            options: {
                timingMethod: TIMING_METHODS.FIXED,
                sliceGranularity: 4096,
                sliceTime: 16,
                ticksBetweenRasterLines: "AUTO",
                useGL: true,
                accurateScreen: false,
                showKeyboardOnScreen: false
            },
            panels: {
                canvas: true,
                state: true,
                code: true,
                console: false,
                control: true,
                updateInterval: 250,
                autoUpdate: true
            },
            codes: [],
            code: (`
            .segment code 0x02000 {
                ld al, 0
            top:
                ld x, 0
                ld c, 768
                ld bl, 0xff
                ld dl, 0
                do {
                    st [0x10000,x], al
                    st [0x11000,x], bl
                    st [0x12000,x], dl
                    inc al
                    inc x
                    dec c
                } while !z
                dec al
                br top
                brk
            }
            `.split("\n").map(l => l.substr(12)).join("\n"))
        }, savedConfig);
    }
}