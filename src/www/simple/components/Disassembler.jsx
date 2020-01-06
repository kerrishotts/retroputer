import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';
import { Icon } from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon/info';

export class Disassembler extends AutoUpdateComponent {
    constructor(props) {
        super(props);
        this.state = {
            address: "PC",
            count: "128"
        };

        this.addressChanged = this.addressChanged.bind(this);
        this.countChanged = this.countChanged.bind(this);
        this.refreshClicked = this.refreshClicked.bind(this);
        this.refreshIfNeeded = this.refreshIfNeeded.bind(this);
    }

    jumpTo(address) {
        this.setState({address});
    }
    addressChanged(e) {
        const address = (e.target.value) || "0x00000";
        this.setState({address})
    }

    countChanged(e) {
        const count = (e.target.value) || "128";
        this.setState({count})
    }
    
    refreshClicked() {
        this.setState({});
    }
    refreshIfNeeded() {
        if (this.state.address === "PC") {
            this.refreshClicked();
        }
    }

    render() {
        const { store } = this.props;
        const { computer, diagnostics } = store;
        const { address, count } = this.state;

        let realAddress = Number(address);
        if (address === "PC") {
            realAddress = computer.processor.registers.PC
        }

        const asm = diagnostics.disassembleMemory({start: Number(realAddress), length: Number(count)})
                    .split("\n")
                    .map(str => ({
                        address: str.substr(0, 5), 
                        bytes: str.substr(7, 11).trim(),
                        asm: str.substr(22).trim()
                    }));

        return (
            <div className="panel">
                <div>
                    <label>Address: <input type="text" 
                                           value={address} 
                                           size={8}
                                           onChange={this.addressChanged}/></label>
                    <label>Count: <input type="text" 
                                         value={count} 
                                           size={6}
                                         onChange={this.countChanged}/></label>
                    <span className="divider"/>
                    <button onClick={this.refreshClicked} title="Refresh"><Icon icon={info} /></button>
                </div>
                <code>{asm.map(inst => 
                    <div key={inst.address}>
                        <a style={{color: "currentColor"}} href="#" onClick={e => this.jumpTo("0x" + inst.address)}>{inst.address}</a>:&nbsp;
                        <span style={{display:"inline-block", width: "8em"}}>{inst.bytes}</span>
                        <span>{inst.asm}</span>
                    </div>)}</code>
        </div>
        );
    }
}