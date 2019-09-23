import htm from 'https://unpkg.com/htm@2.2.1?module';
import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.60';

const html = htm.bind(React.createElement);

import { Computer, TIMING_METHODS } from "../../core/Computer.js";
import { SimpleConsoleDevice } from "./SimpleConsole.js";
import { Screen } from "../../devices/Screen.js";
import { DMA } from "../../devices/DMA.js";

import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../core/Diagnostics.js";

import { parser } from "../../basm/parser.js";
import { assemble } from "../../basm/assemble.js";

import rom from "../../roms/kernel.js";

class Store {
    constructor() {
        const computer = new Computer({ 
            performance, 
            debug: true, 
            timingMethod: TIMING_METHODS.FIXED, 
            sliceTime: 16, 
            sliceGranularity: 8191 //0xF 
        });
        computer.memory.loadFromJS(rom, true);
        const diagnostics = new Diagnostics(computer);
        const simpleConsole = new SimpleConsoleDevice({
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

        const dma = new DMA({
            device: 13,
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
            dma
        };

        this.config = {
            panels: {
                canvas: true,
                state: true,
                code: true,
                console: false,
                control: true
            },
            code: localStorage.getItem("code") || (`
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
        }
    }

    get code() {
        return this.config.code;
    }

    set code(v) {
        this.config.code = v;
        localStorage.setItem("code", v);
    }
}

const store = new Store();
window.store = store;

class ComputerControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startAddress: "0x0FF00",
            granularity: props.store.computer.options.sliceGranularity
        };

        this.startAddressChanged = this.startAddressChanged.bind(this);
        this.granularityChanged = this.granularityChanged.bind(this);
        this.randomizeClicked = this.randomizeClicked.bind(this);
        this.startClicked = this.startClicked.bind(this);
        this.stopClicked = this.stopClicked.bind(this);
        this.continueClicked = this.continueClicked.bind(this);
        this.stepClicked = this.stepClicked.bind(this);
        this.jumpClicked = this.jumpClicked.bind(this);
    }
    startAddressChanged(e) {
        this.setState({ startAddress: e.target.value });
    }
    granularityChanged(e) {
        const granularity = Number(e.target.value) || 8191;
        this.props.store.computer.options.sliceGranularity = granularity;
        this.setState({ granularity });
    }
    startClicked() {
        const { store } = this.props;
        const { startAddress } = this.state;
        const { computer, diagnostics } = store;

        computer.processor.jump(Number(startAddress));
        computer.processor.registers.SINGLE_STEP = 0;
        if (diagnostics.state == "running") return;
        computer.run();
    }
    stopClicked() {
        const { store } = this.props;
        const { computer } = store;

        computer.stop();
    }
    continueClicked() {
        const { store } = this.props;
        const { diagnostics, computer } = store;

        if (diagnostics.state == "running") return;
        computer.processor.registers.SINGLE_STEP = 0;
        computer.run();
    }
    stepClicked() {
        const { store } = this.props;
        const { diagnostics, computer } = store;

        if (diagnostics.state == "running") {
            computer.processor.registers.SINGLE_STEP = 1;
            return;
        };
        const prevInterruptsDisabled = computer.processor.registers.INTERRUPT_DISABLE;
        computer.processor.registers.INTERRUPT_DISABLE = 1;
        computer.processor.registers.SINGLE_STEP = 0;
        computer.step();
        computer.processor.registers.INTERRUPT_DISABLE = prevInterruptsDisabled;
    }
    jumpClicked() {
        const { store } = this.props;
        const { startAddress } = this.state;
        const { diagnostics, computer } = store;

        computer.processor.jump(Number(startAddress));
    }
    randomizeClicked() {
        const { store } = this.props;
        const { computer } = store;
        let byte = 0;
        for (let addr = 0; addr < (computer.memory.size - 65536); addr++) {
            do {
                byte = Math.floor(Math.random() * 255);
            } while (byte === 0x3F)
            computer.memory.writeByte(addr, byte);
        };
    }
    render() {
        const { store } = this.props;
        const { startAddress, granularity } = this.state;
        return html`
            <div className="panel">
                <label>Start Address: <input type="text" value=${startAddress} onChange=${this.startAddressChanged} /></label>
                <span className="divider"/>
                <button onClick=${this.startClicked}>Start</button>
                <button onClick=${this.continueClicked}>Continue</button>
                <button onClick=${this.stopClicked}>Stop</button>
                <span className="divider"/>
                <button onClick=${this.jumpClicked}>Jump</button>
                <button onClick=${this.stepClicked}>Step</button>
                <span className="divider"/>
                <button onClick=${this.randomizeClicked}>Randomize</button>
                <span className="divider"/>
                <label>Slice Granularity: <input type="text" value=${granularity} onChange=${this.granularityChanged} /></label>
            </div>
        `;
    }
}

class ComputerScreen extends React.Component {
    constructor(props) {
        super(props);

        this.renderFrame = this.renderFrame.bind(this);

        const frameCanvas = document.createElement("canvas");
        frameCanvas.setAttribute("width", "640");
        frameCanvas.setAttribute("height", "480");
        const frameCtx = frameCanvas.getContext("2d");
        const frameBuffer = frameCtx.createImageData(640, 480);

        this.canvas = React.createRef();

        this._cancelRAF = null;
        this._lastTimestamp = 0;

        this.state = {
            frameBuffer,
            frameCtx,
            frameCanvas,
            frames: 0,
            orphanedFrames: 0,
        };
    }
    componentDidMount() {
        this._cancelRAF = requestAnimationFrame(this.renderFrame);
    }
    componentWillUnmount() {
        cancelAnimationFrame(this._cancelRAF);
    }
    renderFrame(now) {
        const { store } = this.props;
        const { computer, diagnostics, devices: { screen } } = store;

        let { orphanedFrames, frames, frameBuffer, frameCtx, frameCanvas } = this.state;
        frames++;
        if (frames % 60 === 0) {
            orphanedFrames = 0;
        }

        const delta = now - this._lastTimestamp;
        if (delta > 17) {
            console.log("LONG FRAME", delta);
        } 
        this._lastTimestamp = now;

        this._cancelRAF = requestAnimationFrame(this.renderFrame);

        if (diagnostics.state !== "running") {
            if (orphanedFrames < 3) {
                while (!screen._wait)
                    screen.tick();
                orphanedFrames++;
            }
        }

        if (diagnostics.state === "running" || orphanedFrames < 3) {
            screen.resetWait();
            frameBuffer.data.set(screen.frame);
            frameCtx.putImageData(frameBuffer, 0, 0);

            const canvas = this.canvas.current;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(frameCanvas, 0, 0);
        }

        if (diagnostics.state === "running") {
            orphanedFrames = 0;
        }

        this.setState({
            orphanedFrames,
            frames
        });

    }
    render() {
        return html`
            <div className="panel row">
                <canvas width=${640} height=${480} ref=${this.canvas} className="screen nogrow noshrink center" />
            </div>
        `;
    }
}

class ComputerState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFrequency: 100,
            updating: false
        };

        this._cancelUpdate = null;

        this.updateFrequencyChanged = this.updateFrequencyChanged.bind(this);
        this.refreshControlClicked = this.refreshControlClicked.bind(this);
        this.singleRefreshClicked = this.singleRefreshClicked.bind(this);
    }
    compontWillUnmount() {
        if (this.state.updating) {
            clearInterval(this._cancelUpdate);
        }
    }
    updateFrequencyChanged(e) {
        let { updating, updateFrequency } = this.state;
        updateFrequency = e.target.value;
        if (updating) {
            clearInterval(this._cancelUpdate);
            this._cancelUpdate = setInterval(() => this.setState({}), Number(updateFrequency) || 1000);
        }
        this.setState({updateFrequency})
    }
    refreshControlClicked() {
        let { updating, updateFrequency } = this.state;
        if (updating) {
            clearInterval(this._cancelUpdate);
            updating = false;
        } else {
            this._cancelUpdate = setInterval(() => this.setState({}), Number(updateFrequency) || 1000);
            updating = true;
        }
        this.setState({updating});
    }
    singleRefreshClicked() {
        this.setState({});
    }
    render() {
        const { store } = this.props;
        const { computer, diagnostics, devices: {screen} } = store;
        const { updating, updateFrequency } = this.state;

        const statsHeader = ["Activity", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i"];
        const regsHeader = ["", "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"];
        const dumpedStats = diagnostics.dumpStatistics();
        const stats = [ diagnostics.state, dumpedStats.ticks, dumpedStats.tasks, dumpedStats.insts, dumpedStats.aluOps,
            dumpedStats.slices, dumpedStats.microOpsPerSlice, dumpedStats.instsPerSlice, dumpedStats.totalTime,
            dumpedStats.MMOPs, dumpedStats.MIPs, dumpedStats.MAOPs, dumpedStats.microOpsPerInst ];
        const regs = [ "", ...diagnostics.dumpRegisters().map(toHex4) ];

        return html`
            <div className="panel">
                <div>
                    <label>Update Freq: <input type="text" value=${updateFrequency} onChange=${this.updateFrequencyChanged}/></label>
                    <span className="divider"/>
                    <button onClick=${this.refreshControlClicked}>${updating ? "█": "⮀" }</button>
                    <button onClick=${this.singleRefreshClicked}>↻</button>
                </div>
                <table><tbody>
                    ${Array.from({length: statsHeader.length}, (_, idx) => html`
                            <tr key=${idx}><th>${statsHeader[idx]}</th>
                                <td>${stats[idx]}</td>
                                <th>${regsHeader[idx]}</th>
                                <td>${regs[idx]}</td>
                            </tr>
                    `)}
                    <tr><th>Scr TSR</th><td>${numToString(round(screen._ticksSinceRaster, 0), {padDecimal: 0})}</td>
                        <th>Scr TTS</th><td>${numToString(round(screen._ticksThisSecond, 0), {padDecimal: 0})}</td></tr>
                    <tr><th>Scr TPS</th><td>${numToString(round(screen._ticksPerSecond, 4), {padDecimal: 4})}</td>
                        <th>Scr TPR</th><td>${numToString(round(screen._ticksPerRaster, 4), {padDecimal: 4})}</td></tr>
                </tbody></table>
                <code>${diagnostics.disassembleMemory({start: computer.processor.registers.PC, length: 16}).split("\n").slice(0, 4).map(s => s.trim()).join("\n")}</code>
        </div>
        `;
    }
}

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.store.code,
            log: ""
        };

        this.codeChanged = this.codeChanged.bind(this);
        this.assembleClicked = this.assembleClicked.bind(this);
    }
    codeChanged(e) {
        const { store }  = this.props;
        const code = e.target.value;
        store.code = code;
        this.setState({code});
    }
    assembleClicked() {
        const { store } = this.props;
        const { code, computer } = store;

        const asm = code;
        const memory = computer.memory;
        try {
            const ast = parser.parse(asm);
            const segments = assemble(ast);
            segments.forEach(segment => {
                const data = segment.data;
                const name = segment.name;
                data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
            });
            this.setState({log: "Assembled successfully.\n"});
        } catch (e) {
            this.setState({log: e.message});
        }
    }
    render() {
        const { code, log } = this.state;
        return html`
            <div className="panel column">
                <button className="nogrow noshrink" onClick=${this.assembleClicked}>Assemble</button>
                <textarea className="grow shrink" onChange=${this.codeChanged}>${code}</textarea>
                <code className="nogrow noshrink" style=${{whiteSpace: "pre-wrap"}}>${log}</code>
            </div>
        `;
    }
}

class ComputerConsole extends React.Component {
    constructor(props) {
        super(props);
        this._console = React.createRef();
    }
    componentDidMount() {
        const { store } = this.props;
        const { devices: { console } } = store;
        console.target = this._console.current;
    }
    render() {
        return html`
            <div className="panel">
                <code ref=${this._console}/>
            </div>
        `;
    }
}


class App extends React.Component {
    render() {
        const { store } = this.props;
        return html`
            <div>Hello, from ${store.config.code}</div>
        `;
    }
}

window.React = React;
window.ReactDOM = ReactDOM;
function initGoldenLayout() {
var config = {
    settings: {
        showPopoutIcon: false,
    },
    content: [{
        type: 'column',
        content:[{
            type: 'react-component',
            title: 'Control',
            height: 10,
            component: 'computer-control',
            props: {store}
        }, 
        {
            type: 'row',
            content: [
                {
                    type: 'stack',
                    content: [
                        {
                            type: 'react-component',
                            title: 'Screen',
                            component: 'computer-screen',
                            props: {store}
                        },
                        {
                            type: 'react-component',
                            title: 'Console',
                            component: 'computer-console',
                            props: {store}
                        },
                    ]
                },
                {
                    type: 'stack',
                    width: 25,
                    content: [
                        {
                            type: 'react-component',
                            title: 'State',
                            component: 'computer-state',
                            width: 25,
                            props: {store}
                        },
                        {
                            type: 'react-component',
                            title: 'Code',
                            component: 'code-editor',
                            width: 25,
                            props: {store}
                        },
                    ]
                }
            ]
        }]
    }]
};
var myLayout = new GoldenLayout( config );
myLayout.registerComponent( 'computer-control', ComputerControl);
myLayout.registerComponent( 'computer-screen', ComputerScreen);
myLayout.registerComponent( 'computer-state', ComputerState);
myLayout.registerComponent( 'computer-console', ComputerConsole);
myLayout.registerComponent( 'code-editor', CodeEditor);
myLayout.init();
}

initGoldenLayout();