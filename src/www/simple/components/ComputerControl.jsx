import React from 'react';
import { Icon } from 'react-icons-kit';
import { play2 } from 'react-icons-kit/icomoon/play2';
import { forward2 } from 'react-icons-kit/icomoon/forward2';
import { stop } from 'react-icons-kit/icomoon/stop';
import { next } from 'react-icons-kit/icomoon/next';
import { previous } from 'react-icons-kit/icomoon/previous';
import { info } from 'react-icons-kit/icomoon/info';
import { location2 } from 'react-icons-kit/icomoon/location2';
import { shuffle } from 'react-icons-kit/icomoon/shuffle';

import { TIMING_METHODS } from "../../../core/Computer.js";

const TIMING_METHOD_SELECT = {
    [TIMING_METHODS.RAF]:      { label: "Auto",     granularities: [0x01, 0x0F, 0xFF, 0x1FF, 0xFFF, 0x1FFF, 0x3FFF], default: 0xFF },
    [TIMING_METHODS.INTERVAL]: { label: "Interval", granularities: [0x01, 0x0F, 0xFF, 0x1FF, 0xFFF, 0x1FFF, 0x3FFF], default: 0xFF },
    [TIMING_METHODS.TIMEOUT]:  { label: "Timeout",  granularities: [0x01, 0x0F, 0xFF, 0x1FF, 0xFFF, 0x1FFF, 0x3FFF], default: 0xFF },
    [TIMING_METHODS.FIXED]:    { label: "Fixed",    granularities: [256, 512, 1024, 2048, 3072, 4096, 6144, 8192, 10240, 12288, 16384, 24576, 32768], default: 12288},
    [TIMING_METHODS.SENTINEL]: { label: "Sentinel", granularities: [0x01], default: 0x01}
};

const TICKS_BETWEEN_RASTER_LINES = [ "AUTO", 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 96, 128 ];

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
        this.resetClicked = this.resetClicked.bind(this);
        this.startClicked = this.startClicked.bind(this);
        this.stopClicked = this.stopClicked.bind(this);
        this.continueClicked = this.continueClicked.bind(this);
        this.stepClicked = this.stepClicked.bind(this);
        this.jumpClicked = this.jumpClicked.bind(this);
        this.applyClicked = this.applyClicked.bind(this);
        this.autoUpdateClicked = this.autoUpdateClicked.bind(this);
        this.updateFrequencyChanged = this.updateFrequencyChanged.bind(this);
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
    resetClicked() {
        const { store } = this.props;
        const { computer, diagnostics } = store;

        computer.reset();
        if (diagnostics.state == "running") return;
        computer.run();
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
        computer.processor.registers.INTERRUPT_DISABLE = 0;
        computer.run();
    }
    stepClicked() {
        const { store } = this.props;
        const { diagnostics, computer } = store;

        if (diagnostics.state == "running") {
            computer.processor.registers.INTERRUPT_DISABLE = 1;
            computer.processor.registers.SINGLE_STEP = 1;
        };
        //const prevInterruptsDisabled = computer.processor.registers.INTERRUPT_DISABLE;
        //computer.processor.registers.INTERRUPT_DISABLE = 1;
        //computer.processor.registers.SINGLE_STEP = 0;
        computer.step();
        store.notify();
        this.setState({});
        //computer.processor.registers.INTERRUPT_DISABLE = prevInterruptsDisabled;
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
    updateFrequencyChanged(e) {
        const { store } = this.props;
        const newFreq = Number(e.target.value) || 250;
        store.updateInterval = newFreq;
        store.notify();
        this.setState({});
    }
    autoUpdateClicked() {
        const { store } = this.props;
        store.autoUpdate = !store.autoUpdate; 
        store.notify();
        this.setState({});
    }
    render() {
        const { store } = this.props;
        const { startAddress, sliceGranularity, timingMethod, ticksBetweenRasterLines } = this.state;
        const updateFrequency = store.updateInterval;
        const updating = store.autoUpdate;
        return (
            <div className="panel">
                <label>Start Address: <input size={10} type="text" value={startAddress} onChange={this.startAddressChanged} /></label>
                <span className="divider"/>
                <button onClick={this.resetClicked} title="Reset"><Icon icon={previous} /></button>
                <button onClick={this.startClicked} title="Start" id="start"><Icon icon={play2} /></button>
                <button onClick={this.continueClicked} title="Continue"><Icon icon={forward2} /></button>
                <button onClick={this.stopClicked} title="Stop"><Icon icon={stop} /></button>
                <span className="divider"/>
                <button onClick={this.jumpClicked} title="Jump to address"><Icon icon={location2} /></button>
                <button onClick={this.stepClicked} title="Single Step"><Icon icon={next} /></button>
                <span className="divider"/>
                <button onClick={this.randomizeClicked} title="Randomize memory"><Icon icon={shuffle} /></button>
                <span className="divider"/>
                <label>Update Freq: <input type="text" size={10} value={updateFrequency} onChange={this.updateFrequencyChanged}/></label>
                <span className="divider"/>
                <button onClick={this.autoUpdateClicked} title="Start/Stop Automatic Update"><Icon icon={updating ? stop : play2} /></button>
                
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