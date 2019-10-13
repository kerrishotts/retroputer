import React from 'react';

export class ComputerControl extends React.Component {
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
                <span className="divider"/>
                <label>Slice Granularity: <input type="text" value={granularity} onChange={this.granularityChanged} /></label>
            </div>
        );
    }
}