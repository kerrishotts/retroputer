import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';

import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../../core/Diagnostics.js";

const columnWidths = [ 48, ...Array.from({length: 8}, () => 24), 16, ...Array.from({length: 8}, () => 12)];

export class ComputerMemory extends AutoUpdateComponent {
    constructor(props) {
        super(props);

        this.state = {
            quickEdit: false
        };

        this.cell = this.cell.bind(this);
        this.startChanged = this.startChanged.bind(this);
        this.endChanged = this.endChanged.bind(this);
        this.bankDown = this.bankDown.bind(this);
        this.pageDown = this.pageDown.bind(this);
        this.bankUp = this.bankUp.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.changeMemory = this.changeMemory.bind(this);
        this.incMemory = this.incMemory.bind(this);
        this.decMemory = this.decMemory.bind(this);
        this.toggleQuickEdit = this.toggleQuickEdit.bind(this);
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
    toggleQuickEdit() {
        this.setState(state => ({quickEdit: !state.quickEdit}));
    }
    incMemory(evt) {
        if (!this.state.quickEdit) return;
        evt.preventDefault();

        const el = evt.target;
        const addr = Number(el.dataset.addr);
        const data = (Number(el.dataset.data) + 1) & 0xFF;
        this.props.store.computer.memory.writeByte(addr, data);
        this.setState(() => ({}));
        return false;
    }
    decMemory(evt) {
        if (!this.state.quickEdit) return;
        evt.preventDefault();

        const el = evt.target;
        const addr = Number(el.dataset.addr);
        const data = (Number(el.dataset.data) - 1) & 0xFF;
        this.props.store.computer.memory.writeByte(addr, data);
        this.setState(() => ({}));
        return false;
    }
    changeMemory(evt) {
        if (this.state.quickEdit) return;
        evt.preventDefault();

        const el = evt.target;
        const addr = Number(el.dataset.addr);
        const data = Number(el.dataset.data);
        const char = el.dataset.char;

        const v = prompt(`Value or character for ${toHex5(addr)}?`, "0x" + toHex2(data));
        let newData = data;
        if (v.length < 2) {
            // a character
            newData = v.charCodeAt(0);
        } else {
            // a byte
            newData = Number(v);
            if (Number.isNaN(newData)) {
                newData = data;
            }
        }
        this.props.store.computer.memory.writeByte(addr, newData);
        this.setState(() => ({}));

        return false;
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
            <div style={newStyle} data-addr={realAddr} data-data={byteAtAddr} data-char={charAtAddr} title={`${toHex5(realAddr)}: ${toHex2(byteAtAddr)} (${charAtAddr})`}>
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
            <div className="panel" style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <div>
                    <input type="text" size={8} value={memoryStart} onChange={this.startChanged} />-
                    <input type="text" size={8} value={memoryEnd}   onChange={this.endChanged} />
                    <button onClick={this.bankDown}>--</button> <button onClick={this.pageDown}>-</button>&nbsp;|&nbsp;
                    <button onClick={this.pageUp}>+</button> <button onClick={this.bankUp}>++</button>
                    <label><input type="checkbox" checked={this.state.quickEdit} onChange={this.toggleQuickEdit}/>Quick Edit</label>
                </div>
                <div style={{overflow: "hidden", flex: "1 1 auto", userSelect: "none", ["-webkit-user-select"]: "none"}} 
                     onClick={this.incMemory}
                     onContextMenu={this.decMemory}
                     onDoubleClick={this.changeMemory}>
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