import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { Icon } from 'react-icons-kit';
import { pencil } from 'react-icons-kit/icomoon/pencil';
import { floppyDisk } from 'react-icons-kit/icomoon/floppyDisk';
import { eye } from 'react-icons-kit/icomoon/eye';
import { copy } from 'react-icons-kit/icomoon/copy';
import { magicWand } from 'react-icons-kit/icomoon/magicWand';

import { parser } from "../../../basm/parser.js";
import { assemble, createScope, SCOPE } from "../../../basm/assemble.js";

import { vectors } from "../../../roms/kernel.js";

export class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.store.code,
            log: "",
            view: "edit",
            curProgram: "__programs",
        };

        this.editor = React.createRef();
        this.codeChanged = this.codeChanged.bind(this);
        this.codeChangedOutside = this.codeChangedOutside.bind(this);
        this.assembleClicked = this.assembleClicked.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.showLogs = this.showLogs.bind(this);
        this.selectProgram = this.selectProgram.bind(this);
        this.saveProgram = this.saveProgram.bind(this);
        this.saveProgramAs = this.saveProgramAs.bind(this);

        this.program = React.createRef();

        this.assembleClicked();
    }
    componentDidMount() {
        this.props.store.addListener(this.codeChangedOutside);
    }
    componentWillUnmount() {
        this.props.store.removeListener(this.codeChangedOutside);
    }
    showEditor() {
        this.setState({
            view: "edit"
        });
    }
    showLogs() {
        this.setState({
            view: "logs"
        });
    }
    selectProgram(e) {
        const newValue = e.target.value;
        const { store } = this.props;
        store.loadProgram(newValue);
        this.setState(() => ({ code: store.code, curProgram: newValue}));
    }
    saveProgram() {
        let theName = this.program.current.value;
        store.saveProgram(theName);
        this.setState(() => ({}));
    }
    saveProgramAs() {
        const theName = prompt("Name for program?");
        store.saveProgram(theName);
        this.setState(() => ({curProgram: theName}));
    }
    codeChanged(e, v) {
        const { store }  = this.props;
        const code = v;
        store.code = code;
        this.setState({code});
    }
    codeChangedOutside(store) {
        const code = store.code;
        this.setState({code});
        //this.editor.current.value = code;
        this.assembleClicked();
    }
    assembleClicked() {
        const { store } = this.props;
        const { code, computer } = store;

        const asm = code;
        const memory = computer.memory;
        try {
            const ast = parser.parse(asm);
            const globals = createScope();
            globals[SCOPE.CONTENTS] = Object.assign({}, vectors);
            const segments = assemble(ast, globals);
            segments.forEach(segment => {
                const data = segment.data;
                const name = segment.name;
                data.forEach((byte, idx) => memory.writeByte(segment.addr + idx, byte));
            });
            this.setState({log: "Assembled successfully.\n"});
        } catch (e) {
            this.setState({log: e.message, view: "logs"});
        }
    }
    render() {
        const { store } = this.props;
        const { codes = [] } = store;
        const { code, log, view, curProgram } = this.state;
        return (
            <div className="panel column">
                <div className="nogrow noshrink row">
                    <button onClick={this.showEditor} className="nogrow noshrink" title="Editor"><Icon icon={pencil}/></button>
                    <button onClick={this.showLogs} className="nogrow noshrink" title="Logs"><Icon icon={eye}/></button>
                    <div style={{display: "inline-block"}} className="grow shrink"></div>
                    <select value={curProgram} onChange={this.selectProgram} ref={this.program}>
                        <option value="_selected">Programs...</option>
                        {
                            codes.sort(({name:a},{name:b}) => a < b ? -1 : a > b ? 1 : 0).map(el => (
                                <option key={el.name} value={el.name}>{el.name}</option>
                            ))
                        }
                    </select>
                    <button onClick={this.saveProgram} className="nogrow noshrink" title="Save"><Icon icon={floppyDisk}/></button>
                    <button onClick={this.saveProgramAs} className="nogrow noshrink" title="Save As..."><Icon icon={copy}/></button>
                    <div style={{display: "inline-block"}} className="grow shrink"></div>
                    <button className="nogrow noshrink" title="Assemble" onClick={this.assembleClicked}><Icon icon={magicWand}/></button>
                </div>
                {view === "edit" ? (
                    <ControlledEditor
                        className="grow shink"
                        height="100%"
                        language="asm"
                        value={code}
                        theme="dark"
                        onChange={this.codeChanged}
                        options={{
                            lineNumbersMinChars: 3,
                            fixedOverflowWidgets: true,
                            minimap: { enabled: false }
                        }}
                    />
                ) : (
                    <code className="nogrow noshrink" style={{whiteSpace: "pre-wrap"}}>{log}</code>
                )
                }
            </div>
        );
    }
}