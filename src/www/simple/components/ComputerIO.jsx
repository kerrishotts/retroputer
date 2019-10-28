import React from 'react';
import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../../core/Diagnostics.js";

const columnWidths = [ 48, ...Array.from({length: 8}, () => 24), 16, ...Array.from({length: 8}, () => 12)];

export class ComputerIO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updating: false
        };

        this._cancelUpdate = null;

        this.cell = this.cell.bind(this);
    }
    componentDidMount() {
        this._cancelUpdate = setInterval(() => this.setState({updating: true}), 1000);
    }
    compontWillUnmount() {
        if (this.state.updating) {
            clearInterval(this._cancelUpdate);
        }
    }
    cell({ columnIndex, rowIndex, style}) {
        const { store } = this.props;
        const { screen, console, dma, keyboard } = store.devices;
        const rowAddr = rowIndex * 8;
        const whichByte = (columnIndex % 9) - 1;
        const realAddr = rowAddr + Math.max(whichByte, 0);
        const whichDevice = [null, screen, screen, keyboard, null, null, null, null,
                             console, null, null, null, null, dma, null, null][rowIndex >> 1];
        const baseDevice = [0, 0, 16, 0, 0, 0, 0, 0,
                             0, 0, 0, 0, 0, 0, 0, 0][rowIndex >> 1];
        const byteAtAddr = (whichDevice && whichDevice._read(baseDevice + whichByte + (8 * (rowIndex & 1)))) || 0;
        const charAtAddr = byteAtAddr < 32 ? "." : String.fromCharCode(byteAtAddr);
        return (
            <div style={style}>
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