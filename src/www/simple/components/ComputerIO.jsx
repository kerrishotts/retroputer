import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';

import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../../core/Diagnostics.js";

const columnWidths = [ 48, ...Array.from({length: 8}, () => 24), 16, ...Array.from({length: 8}, () => 12)];

export class ComputerIO extends AutoUpdateComponent {
    constructor(props) {
        super(props);

        this.cell = this.cell.bind(this);
    }

    cell({ columnIndex, rowIndex, style}) {
        const { store } = this.props;
        const { screen, console, dma, keyboard, timers } = store.devices;
        const rowAddr = rowIndex * 8;
        const whichByte = (columnIndex % 9) - 1;
        const realAddr = rowAddr + Math.max(whichByte, 0);
        const whichDevice = [timers, screen, screen, keyboard, null, null, null, null,
                             console, null, null, null, null, dma, null, null][rowIndex >> 1];
        const baseDevice = [0, 0, 16, 0, 0, 0, 0, 0,
                             0, 0, 0, 0, 0, 0, 0, 0][rowIndex >> 1];
        const byteAtAddr = (whichDevice && whichDevice._read(baseDevice + whichByte + (8 * (rowIndex & 1)))) || 0;
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
        const { computer, diagnostics } = store;
        const { updating, updateFrequency } = this.state;
        const Cell = this.cell;

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Grid
                        className="Io"
                        columnCount = { columnWidths.length }
                        columnWidth = { index => columnWidths[index] }
                        rowCount={32}
                        rowHeight = { () => 16 }
                        estimatedRowHeight = {16}
                        height={height}
                        width={width}
                    >
                        {Cell}
                    </Grid>
                )}
            </AutoSizer>
        );
    }
}