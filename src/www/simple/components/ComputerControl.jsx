import React from 'react';

import { TIMING_METHODS } from "../../../core/Computer.js";

const TIMING_METHOD_SELECT = {
    [TIMING_METHODS.RAF]:   { label: "Auto",  granularities: [0x01, 0x0F, 0xFF, 0x1FF, 0xFFF, 0x1FFF, 0x3FFF], default: 0xFF },
    [TIMING_METHODS.FIXED]: { label: "Fixed", granularities: [64, 128, 256, 512, 1024, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576, 32768], default: 4096}
};

const TICKS_BETWEEN_RASTER_LINES = [ "AUTO", 0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 ];

export class ComputerControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startAddress: "0x0FF00",
            timingMethod: props.store.config.options.timingMethod,
            sliceGranularity: props.store.config.options.sliceGranularity,
            sliceTime: props.store.config.options.sliceTime,
            ticksBetweenRasterLines: props.store.config.options.ticksBetweenRasterLines
        };

        this.startAddressChanged = this.startAddressChanged.bind(this);
        this.granularityChanged = this.granularityChanged.bind(this);
        this.timingMethodChanged = this.timingMethodChanged.bind(this);
        this.ticksChanged = this.ticksChanged.bind(this);
        this.randomizeClicked = this.randomizeClicked.bind(this);
        this.startClicked = this.startClicked.bind(this);
        this.stopClicked = this.stopClicked.bind(this);
        this.continueClicked = this.continueClicked.bind(this);
        this.stepClicked = this.stepClicked.bind(this);
        this.jumpClicked = this.jumpClicked.bind(this);
        this.applyClicked = this.applyClicked.bind(this);
    }
    startAddressChanged(e) {
        this.setState({ startAddress: e.target.value });
    }
    granularityChanged(e) {
        const { timingMethod } = this.state;
        const sliceGranularity = Number(e.target.value) || TIMING_METHOD_SELECT[timingMethod].default;
        this.setState({ sliceGranularity });
    }
    timingMethodChanged(e) {
        const timingMethod = Number(e.target.value);
        const sliceGranularity = TIMING_METHOD_SELECT[timingMethod].default;
        this.setState({ timingMethod, sliceGranularity });
    }
    ticksChanged(e) {
        const ticksBetweenRasterLines = (e.target.value);
        this.setState({ ticksBetweenRasterLines });
    }
    applyClicked() {
        const { timingMethod, sliceGranularity, ticksBetweenRasterLines } = this.state;
        const { store } = this.props;
        const { computer, devices: { screen } } = store;
        store.config.options.timingMethod = timingMethod;
        store.config.options.sliceGranularity = sliceGranularity;
        store.config.options.ticksBetweenRasterLines = ticksBetweenRasterLines;
        computer.options = Object.assign({}, computer.options, { timingMethod, sliceGranularity });
        if (ticksBetweenRasterLines !== "AUTO") {
            screen.adjustPerformance = false;
            screen.ticksBetweenRasterLines = ticksBetweenRasterLines;
        }  else {
            screen.adjustPerformance = true;
            screen.ticksBetweenRasterLines = 8;
        }
        store.save();
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
        const { startAddress, sliceGranularity, timingMethod, ticksBetweenRasterLines } = this.state;
        return (
            <div className="panel">
                <label>Start Address: <input type="text" value={startAddress} onChange={this.startAddressChanged} /></label>
                <span className="divider"/>
                <button onClick={this.startClicked}>Start</button>
                <button onClick={this.continueClicked}>Continue</button>
                <button onClick={this.stopClicked}>Stop</button>
                <span className="divider"/>
                <button onClick={this.jumpClicked}>Jump</button>
                <button onClick={this.stepClicked}>Step</button>
                <span className="divider"/>
                <button onClick={this.randomizeClicked}>Randomize</button>
                <br />
                <label>Mode:
                    <select onChange={this.timingMethodChanged} value={timingMethod}>
                        {
                            Object.entries(TIMING_METHOD_SELECT).map(([k, {label}]) => (
                                <option key={k} value={k}>{label}</option>
                            ))
                        }
                    </select>
                </label>
                <label>Slice Granularity: 
                    <select onChange={this.granularityChanged} value={sliceGranularity}>
                        {
                            TIMING_METHOD_SELECT[timingMethod].granularities.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))
                        }
                    </select>
                </label>
                <input type="text" value={sliceGranularity} onChange={this.granularityChanged} />
                <label>Ticks between raster:
                    <select onChange={this.ticksChanged} value={ticksBetweenRasterLines}>
                        {
                            TICKS_BETWEEN_RASTER_LINES.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))
                        }
                    </select>
                </label>
                <button onClick={this.applyClicked}>Apply</button>
            </div>
        );
    }
}