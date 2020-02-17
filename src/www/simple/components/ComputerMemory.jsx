import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';

import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../../core/Diagnostics.js";

const columnWidths = [ 48, ...Array.from({length: 8}, () => 24), 16, ...Array.from({length: 8}, () => 12)];

export class ComputerMemory extends AutoUpdateComponent {
    constructor(props) {
        super(props);

        this.cell = this.cell.bind(this);
        this.startChanged = this.startChanged.bind(this);
        this.endChanged = this.endChanged.bind(this);
        this.bankDown = this.bankDown.bind(this);
        this.pageDown = this.pageDown.bind(this);
        this.bankUp = this.bankUp.bind(this);
        this.pageUp = this.pageUp.bind(this);
    }

    startChanged(e) {
        const { store } = this.props;
        const newAddress = e.target.value;
        store.memoryStart= newAddress;
        this.setState({});
    }

    endChanged(e) {
        const { store } = this.props;
        const newAddress = e.target.value;
        store.memoryEnd= newAddress;
        this.setState({});
    }

    bankDown() {
        const { store } = this.props;
        const [ start, end ] = [store.memoryStart, store.memoryEnd].map(n => Number(n));
        store.memoryStart = "0x" + ((start - 0x10000) & 0x7FFFF).toString(16);
        store.memoryEnd = "0x" + ((end - 0x10000) & 0x7FFFF).toString(16);
        this.setState({});
    }
    pageDown() {
        const { store } = this.props;
        const [ start, end ] = [store.memoryStart, store.memoryEnd].map(n => Number(n));
        store.memoryStart = "0x" + ((start - 0x00100) & 0x7FFFF).toString(16);
        store.memoryEnd = "0x" + ((end - 0x00100) & 0x7FFFF).toString(16);
        this.setState({});
    }
    bankUp() {
        const { store } = this.props;
        const [ start, end ] = [store.memoryStart, store.memoryEnd].map(n => Number(n));
        store.memoryStart = "0x" + ((start + 0x10000) & 0x7FFFF).toString(16);
        store.memoryEnd = "0x" + ((end + 0x10000) & 0x7FFFF).toString(16);
        this.setState({});
    }
    pageUp() {
        const { store } = this.props;
        const [ start, end ] = [store.memoryStart, store.memoryEnd].map(n => Number(n));
        store.memoryStart = "0x" + ((start + 0x00100) & 0x7FFFF).toString(16);
        store.memoryEnd = "0x" + ((end + 0x00100) & 0x7FFFF).toString(16);
        this.setState({});
    }

    cell({ columnIndex, rowIndex, style}) {
        const { store } = this.props;
        const { memoryStart } = store;
        const rowAddr = rowIndex * 8;
        const whichByte = (columnIndex % 9) - 1;
        const realAddr = Number(memoryStart) + rowAddr + Math.max(whichByte, 0);
        const byteAtAddr = this.props.store.computer.memory.readByte(realAddr);
        const charAtAddr = byteAtAddr < 32 ? "." : String.fromCharCode(byteAtAddr);
        const newStyle = Object.assign({}, style, {
            opacity: (columnIndex > 0) ? (byteAtAddr === 0) ? "0.25" : (byteAtAddr < 32 ? "0.5" : "1")
                                       : "1"
        });
        return (
            <div style={newStyle}>
                {
                    columnIndex < 1 ? toHex5(realAddr)
                    : (columnIndex > 0) && (columnIndex < 9) ? toHex2(byteAtAddr)
                    : columnIndex === 9 ? ""
                    : columnIndex > 9 ? charAtAddr
                    : ""
                }
            </div>
        );
    }
    render() {
        const { store } = this.props;
        const { memoryStart, memoryEnd } = store;
        const rowCount = ((Number(memoryEnd) - Number(memoryStart)) + 1) / 8;
        const Cell = this.cell;

        return (
            <div className="panel" style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <input type="text" size={8} value={memoryStart} onChange={this.startChanged} />-
                    <input type="text" size={8} value={memoryEnd}   onChange={this.endChanged} />
                    <button onClick={this.bankDown}>--</button> <button onClick={this.pageDown}>-</button>&nbsp;|&nbsp;
                    <button onClick={this.pageUp}>+</button> <button onClick={this.bankUp}>++</button>
                </div>
                <div style={{overflow: "scroll", flex: "1 1 auto"}}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Grid
                            className="Memory"
                            columnCount = { columnWidths.length }
                            columnWidth = { index => columnWidths[index] }
                            rowCount={rowCount}
                            rowHeight = { () => 16 }
                            estimatedRowHeight = {16}
                            height={height}
                            width={width}
                        >
                            {Cell}
                        </Grid>
                    )}
                </AutoSizer>
                </div>
            </div>
        );
    }
}