import React from 'react';
import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../../core/Diagnostics.js";

export class ComputerState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFrequency: 100,
            updating: false
        };

        this._cancelUpdate = null;

        this.updateFrequencyChanged = this.updateFrequencyChanged.bind(this);
        this.refreshControlClicked = this.refreshControlClicked.bind(this);
        this.singleRefreshClicked = this.singleRefreshClicked.bind(this);
    }
    compontWillUnmount() {
        if (this.state.updating) {
            clearInterval(this._cancelUpdate);
        }
    }
    updateFrequencyChanged(e) {
        let { updating, updateFrequency } = this.state;
        updateFrequency = e.target.value;
        if (updating) {
            clearInterval(this._cancelUpdate);
            this._cancelUpdate = setInterval(() => this.setState({}), Number(updateFrequency) || 1000);
        }
        this.setState({updateFrequency})
    }
    refreshControlClicked() {
        let { updating, updateFrequency } = this.state;
        if (updating) {
            clearInterval(this._cancelUpdate);
            updating = false;
        } else {
            this._cancelUpdate = setInterval(() => this.setState({}), Number(updateFrequency) || 1000);
            updating = true;
        }
        this.setState({updating});
    }
    singleRefreshClicked() {
        this.setState({});
    }
    render() {
        const { store } = this.props;
        const { computer, diagnostics, devices: {screen} } = store;
        const { updating, updateFrequency } = this.state;

        const statsHeader = ["Activity", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "mµOP/s", "mips", "maOP/s", "µOP/i"];
        const regsHeader = ["", "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"];
        const dumpedStats = diagnostics.dumpStatistics();
        const stats = [ diagnostics.state, dumpedStats.ticks, dumpedStats.tasks, dumpedStats.insts, dumpedStats.aluOps,
            dumpedStats.slices, dumpedStats.microOpsPerSlice, dumpedStats.instsPerSlice, dumpedStats.totalTime,
            dumpedStats.MMOPs, dumpedStats.MIPs, dumpedStats.MAOPs, dumpedStats.microOpsPerInst ];
        const regs = [ "", ...diagnostics.dumpRegisters().map(toHex4) ];

        return (
            <div className="panel">
                <div>
                    <label>Update Freq: <input type="text" 
                                               value={updateFrequency} 
                                               onChange={this.updateFrequencyChanged}/></label>
                    <span className="divider"/>
                    <button onClick={this.refreshControlClicked}>{updating ? "█": "⮀" }</button>
                    <button onClick={this.singleRefreshClicked}>↻</button>
                </div>
                <table><tbody>
                    {Array.from({length: statsHeader.length}, (_, idx) => (
                            <tr key={idx}><th>{statsHeader[idx]}</th>
                                <td>{stats[idx]}</td>
                                <th>{regsHeader[idx]}</th>
                                <td>{regs[idx]}</td>
                            </tr>
                    ))}
                    <tr><th>Scr TSR</th><td>{numToString(round(screen._ticksSinceRaster, 0), {padDecimal: 0})}</td>
                        <th>Scr TTS</th><td>{numToString(round(screen._ticksThisSecond, 0), {padDecimal: 0})}</td></tr>
                    <tr><th>Scr TPS</th><td>{numToString(round(screen._ticksPerSecond, 4), {padDecimal: 4})}</td>
                        <th>Scr TPR</th><td>{numToString(round(screen._ticksPerRaster, 4), {padDecimal: 4})}</td></tr>
                </tbody></table>
                <code>{diagnostics.disassembleMemory({start: computer.processor.registers.PC, length: 16}).split("\n").slice(0, 4).map(s => s.trim()).join("\n")}</code>
        </div>
        );
    }
}