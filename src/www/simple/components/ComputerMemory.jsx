import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';
import { BufferEditor } from './BufferEditor.jsx';

export class ComputerMemory extends AutoUpdateComponent {
    constructor(props) {
        super(props);

        this.rangeChanged = this.rangeChanged.bind(this);
    }

    rangeChanged({start, end} = {}) {
        const { store } = this.props;
        store.memoryStart = start || store.memoryStart;
        store.memoryEnd = end || store.memoryEnd;
        this.setState({});
    }

    render() {
        const { store } = this.props;
        const { memoryStart, memoryEnd } = store;
        const range = {start: memoryStart, end: memoryEnd};

        return (
            <BufferEditor range={range} 
                          buffer={store.computer.memory} 
                          readFn="readByte" 
                          writeFn="writeByte" 
                          onRangeChanged={this.rangeChanged} 
                          className="Memory"
                          bigDelta={0x10000}
                          smallDelta={0x00100}
                          mask={0x7FFFF}/>
        );
    }
}