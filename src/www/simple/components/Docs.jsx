import React, { Suspense } from 'react';
import { MDXProvider } from "@mdx-js/react";
import { pages } from "../../../../docs/SUMMARY.js";

import TOC from '../../../../docs/SUMMARY.md';

export class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Page: pages["README.md"]
        };
        this.components = {
            wrapper: ({children, ...props}) => {
                return <>{children}</>;
            },
            a: props => props.href.startsWith("http") 
               ? <a {...props} target="_blank">{props.children}</a>
               : <a href="#" onClick={evt => this.navigate(props.href)}>{props.children}</a>,
            pre: ({children, ...props}) => 
                <pre class="code">
                    <div class="codebar">
                        <button onClick={e => this.copyToEditor(e.target.parentNode.nextSibling.innerText)}>Copy to Editor</button>
                    </div>
                    <div class="codebody">
                        {children}
                    </div>
                </pre>
        }
    }

    copyToEditor(text) {
        let newCode = text;
        if (newCode.indexOf(".segment") < 0 ) {
            newCode = `.segment code 0x02000 {\n${newCode}\nbrk\n}`;
        }
        if (newCode.indexOf("brk") < 0) {
            newCode = `${newCode.substr(0, newCode.length-2)}\nbrk\n${newCode.substr(newCode.length-2)}`;
        }
        const { store } = this.props;
        store.code = newCode;
        store.notify();
    }

    navigate(route) {
        this.setState({
            Page: pages[route]
        });
    }
        
    render() {
        const { Page } = this.state;
        return (
            <div className="panel docs" style={{display: "flex", flexDirection: "row"}}>
                <MDXProvider components={this.components}>
                    <div className="toc" style={{flex: "0 0 auto"}}>
                        <TOC />
                    </div>
                    <div className="md" style={{flex: "1 1 auto"}}>
                        <Suspense fallback={<p>Loading...</p>}>
                            <Page />
                        </Suspense>
                    </div>
                </MDXProvider>
            </div>
        )
    }
}