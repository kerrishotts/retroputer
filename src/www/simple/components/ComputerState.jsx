import React from 'react';
import { AutoUpdateComponent } from './AutoUpdateComponent.jsx';
import { Icon } from 'react-icons-kit';
import { play2 } from 'react-icons-kit/icomoon/play2';
import { stop } from 'react-icons-kit/icomoon/stop';
import { info } from 'react-icons-kit/icomoon/info';

import { toHex, toHex2, toHex4, toHex5, STATE, Diagnostics, numToString, round } from "../../../core/Diagnostics.js";

export class ComputerState extends AutoUpdateComponent {
    constructor(props) {
        super(props);

        this.singleRefreshClicked = this.singleRefreshClicked.bind(this);
    }

    singleRefreshClicked() {
        this.setState({});
    }
    render() {
        const { store } = this.props;
        const { computer, diagnostics, devices: {screen} } = store;
        const { updating, updateFrequency } = this.state;

        const statsHeader = ["Activity", "#Ticks", "#µOPs", "#Insts", "#aOPs", "#Slices", "µOP/slice", "i/slice", "time(ms)", "time/slice", "mµOP/s", "mips", "maOP/s", "µOP/i"];
        const regsHeader = ["", "r: A", "r: B", "r: C", "r: D", "r: X", "r: Y", "r:BP", "r:SP", "STAT", "r:PC", "r:MP", "r:MM"];
        const dumpedStats = diagnostics.dumpStatistics();
        const stats = [ diagnostics.state, dumpedStats.ticks, dumpedStats.tasks, dumpedStats.insts, dumpedStats.aluOps,
            dumpedStats.slices, dumpedStats.microOpsPerSlice, dumpedStats.instsPerSlice, dumpedStats.totalTime, dumpedStats.timeThisSlice,
            dumpedStats.MMOPs, dumpedStats.MIPs, dumpedStats.MAOPs, dumpedStats.microOpsPerInst ];
        const regs = [ "", ...diagnostics.dumpRegisters().map(toHex4) ];

        return (
            <div className="panel">
                <div>
                    <button onClick={this.singleRefreshClicked} title="Update"><Icon icon={info} /></button>
                </div>
                <table><tbody>
                    {Array.from({length: statsHeader.length}, (_, idx) => (
                            <tr key={idx}><th>{statsHeader[idx]}</th>
                                <td style={{width: "25%"}}>{stats[idx]}</td>
                                <th>{regsHeader[idx]}</th>
                                <td style={{width: "25%"}}>{regs[idx]}</td>
                            </tr>
                    ))}
                    <tr><th>Scr TSR</th><td>{numToString(round(screen._ticksSinceRaster, 0), {padDecimal: 0})}</td>
                        <th>Scr TTS</th><td>{numToString(round(screen._ticksThisSecond, 0), {padDecimal: 0})}</td></tr>
                    <tr><th>Scr TPS</th><td>{numToString(round(screen._ticksPerSecond, 4), {padDecimal: 4})}</td>
                        <th>Scr TBR</th><td>{numToString(round(screen._ticksPerRaster, 4), {padDecimal: 4})}</td></tr>
                </tbody></table>
        </div>
        );
    }
}