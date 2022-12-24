import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';
import { BufferEditor } from './BufferEditor.jsx';

import { dumpIO, getLastIODump } from '../System.js';

export class ComputerIO extends AutoUpdateComponent {
    constructor(props) {
        super(props);
        this.state={
            ioStart:"0x00",
            ioEnd:"0xFF"
        }

        this.rangeChanged = this.rangeChanged.bind(this);
    }

    rangeChanged({start, end} = {}) {
        this.state.ioStart = start || this.state.ioStart;
        this.state.ioEnd = end || this.state.ioEnd;
        dumpIO();
        this.setState({});
    }

    onWillUpdate() {
        dumpIO();
    }

    render() {
        const { store } = this.props;
        const { ioStart, ioEnd } = this.state;
        const range = {start: ioStart, end: ioEnd};

        return (
            <BufferEditor range={range} 
                          buffer={getLastIODump()} 
                          readFn="pureRead" 
                          writeFn="pureWrite" 
                          onRangeChanged={this.rangeChanged} 
                          className="Io"
                          bigDelta={0x00100}
                          smallDelta={0x00010}
                          mask={0x000FF}/>
        );
    }
}