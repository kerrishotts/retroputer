import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';
import { Icon } from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon/info';

import { disassemble, getLastDisassembly } from '../System.js';

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
        disassemble({address: this.state.address, length: this.state.count});
        this.setState({});
    }
    refreshIfNeeded() {
        if (this.state.address === "PC") {
            this.refreshClicked();
        }
    }

    render() {
        const { store } = this.props;
        const { address, count } = this.state;

        const asm = getLastDisassembly();

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
                <code>{asm.map((inst, idx) => 
                    <div key={idx}>
                        <a style={{color: "currentColor"}} href="#" onClick={e => this.jumpTo("0x" + inst.address)}>{inst.address}</a>:&nbsp;
                        <span style={{display:"inline-block", width: "8em"}}>{inst.bytes}</span>
                        <span>{inst.asm}</span>
                    </div>)}</code>
        </div>
        );
    }
}