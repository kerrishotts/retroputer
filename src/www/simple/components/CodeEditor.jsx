import React from 'react';

import { parser } from "../../../basm/parser.js";
import { assemble, createScope, SCOPE } from "../../../basm/assemble.js";

import { vectors } from "../../../roms/kernel.js";

export class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.store.code,
            log: ""
        };

        this.editor = React.createRef();
        this.codeChanged = this.codeChanged.bind(this);
        this.codeChangedOutside = this.codeChangedOutside.bind(this);
        this.assembleClicked = this.assembleClicked.bind(this);

        this.assembleClicked();
    }
    componentDidMount() {
        this.props.store.addListener(this.codeChangedOutside);
    }
    componentWillUnmount() {
        this.props.store.removeListener(this.codeChangedOutside);
    }
    codeChanged(e) {
        const { store }  = this.props;
        const code = e.target.value;
        store.code = code;
        this.setState({code});
    }
    codeChangedOutside(store) {
        const code = store.code;
        this.setState({code});
        this.editor.current.value = code;
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
            this.setState({log: e.message});
        }
    }
    render() {
        const { code, log } = this.state;
        return (
            <div className="panel column">
                <button className="nogrow noshrink" onClick={this.assembleClicked}>Assemble</button>
                <textarea ref={this.editor} className="grow shrink" onChange={this.codeChanged} defaultValue={code}></textarea>
                <code className="nogrow noshrink" style={{whiteSpace: "pre-wrap"}}>{log}</code>
            </div>
        );
    }
}