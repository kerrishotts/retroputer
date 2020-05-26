import React from 'react';
import 'handsontable/dist/handsontable.full.css';
import { HotTable, HotColumn } from '@handsontable/react';

import { OPCODES } from "../../../../src/isa/opcodes.js";

const opcodeRange = (pattern) => {
    const firstBits = pattern.split(" ")[0].replace(/\_/g, "");
    const lowVersion = firstBits.replace(/[^0-9]/g, "0");
    const highVersion = firstBits.replace(/[^0-9]/g, "1");
    const [lowCode, highCode] = [lowVersion, highVersion].map(v => Number(`0b${v}`).toString(16).toUpperCase().padStart(2, "0"));
    if (lowCode === highCode) return lowCode;
    return `${lowCode}-${highCode}`;
};

const splitPattern = (pattern) => {
    const bits = Array.from(pattern.replace(/\_/g, "").split(" ").join("").padEnd(32));


    return bits;
}

const getData = () => Object.entries(OPCODES)
.map(([opcode, data], idx) => {
    return [
        opcode.split("_")[0],
        opcode,
        data.description,
        opcodeRange(data.pattern),
        data.pattern.split(" ").length,
        data.pattern,
        ...splitPattern(data.pattern),
        ...Array.from(data.flags||"        ").map(ch => (ch === " " || ch === ".") ? " " : (ch.toLowerCase() === ch ? " " : "✓" ))
    ];
});

const mergeCellsAndData = data => {
    const newData = [];
    const mergeCells = [];
    data.forEach((row, idx) => {
        newData.push(Array.from(row));
        // pattern is in columns 6..37; this is where we want to 
        for (let c = 6; c < 38; c++) {
            const v = row[c];
            if (v === "0" || v === "1") continue;
            let e = 1;
            while (c+e < 38 && row[c + e] === v ) e++;
            if (e > 1) {
                mergeCells.push({row: idx, col: c, colspan: e, rowspan: 1})

                const orig = row.slice(c, c+e).join("");
                let repl = "";
                switch (orig) {
                    case "dd": repl = "dest"; break;
                    case "ddd": repl = "dest"; break;
                    case "dddd": repl  = "dest"; break;
                    case "ss": repl = "source"; break;
                    case "sss": repl = "source"; break;
                    case "ssss": repl = "source"; break;
                    case "rrr": repl = "reg"; break;
                    case "rrrr": repl = "reg"; break;
                    case "fff": repl = "flag"; break;
                    case "nnnn": repl = "imm4"; break;
                    case "nnnnnnnn": repl = "imm8"; break;
                    case "bbbbbbbb": repl = "imm8"; break;
                    case "pppppppp": repl = "port"; break;
                    case "wwwwwwwwwwwwwwww": repl = "imm16"; break;
                    case "aaaaaaaa": repl  = "addr8"; break;
                    case "aaaaaaaaaaaaaaaa": repl  = "addr16"; break;
                    case "aaaaaaaaaaaaaaaaaaa": repl  = "addr19"; break;
                }
                if (repl) newData[idx][c] = repl;

                c += e - 1;
            }
        }
    });
    return [newData, mergeCells];
};

const sortBy = (data, col) => data.sort((a, b) => a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0);

export class ISA extends React.Component {
  constructor(props) {
    super(props);

    const [data, mergeCells] = mergeCellsAndData(sortBy(getData(), 5));
    this.state = { data, mergeCells, sortBy: 5 };

    this.handleSortBy = this.handleSortBy.bind(this);
  }

  handleSortBy(evt) {
    const newSortBy = Number(evt.target.value);
    const [data, mergeCells] = mergeCellsAndData(sortBy(getData(), newSortBy));
    this.setState({ data, mergeCells, sortBy: newSortBy });
  }

  render() {
    const {data, mergeCells, sortBy} = this.state;
    return (
    <>
        <select onChange={this.handleSortBy} value={sortBy}>
            <option value="0">Alias</option>
            <option value="1">Opcode</option>
            <option value="3">Byte</option>
            <option value="4">Size</option>
            <option value="5">Pattern</option>
        </select>
        <HotTable data={data} colHeaders={true} rowHeaders={true} 
                  licenseKey= 'non-commercial-and-evaluation' 
                  height="90%" stretchH="last"
                  mergeCells={mergeCells}
                  hiddenColumns={{columns: [1,5], indicators: true}}
                  contextMenu
                  manualColumnResize={true}
                  wordWrap={false}
                  >
            <HotColumn title="Alias" readOnly/>
            <HotColumn title="Opcode" readOnly/>
            <HotColumn title="Description" readOnly/>
            <HotColumn title="Byte" readOnly className="htRight"/>
            <HotColumn title="Size" readOnly settings={{type: "numeric"}} />
            <HotColumn title="Pattern" readOnly/>
            {Array.from({length: 32}, (_, idx) => <HotColumn key={idx} width="18" className={`htCenter ${["a","b","c","d"][Math.floor((idx % 16)/4)]}`} title={(idx % 8).toString()} readOnly/> )}
            {"EX ID IS SS N C V Z".split(" ").map((h, idx) => <HotColumn key={idx} width="24" className={`htCenter ${["a","b","c","d"][Math.floor((idx % 16)/4)]}`} title={h} readOnly/> )}
        </HotTable>
    </>);
  }
}