import path from "path";
import React, { Suspense } from 'react';
import { MDXProvider } from "@mdx-js/react";
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/icomoon/menu';
import { HashRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { pages } from "../../../../docs/SUMMARY.js";
const Readme = pages["README.md"];
import TOC from '../../../../docs/SUMMARY.md';
import { ErrorBoundary } from "./ErrorBoundary.jsx";

export class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state={ showSidebar: true };
        this.pageComponents = {
            wrapper: ({children, ...props}) => {
                return <>{children}</>;
            },
            a: props => props.href && props.href.startsWith("http") 
               ? <a {...props} target="_blank">{props.children}</a>
               : <Link to={(props.href[0] === "/" ) ? (props.href) : `${path.resolve((path.dirname(location.hash.substr(1) || "/")), props.href)}`}>{props.children}</Link>,
            img: ({src, ...props}) => <img {...props} src={src && src.replace(".gitbook/assets", "_assets")}/>,
            th: ({style, children, ...props}) => <th {...props}>{children}</th>,
            td: ({style, children, ...props}) => <td {...props}>{children}</td>,
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
        this.tocComponents = {
            wrapper: ({children, ...props}) => {
                return <>{children}</>;
            },
            a: props => props.href && props.href.startsWith("http") 
               ? <a {...props} target="_blank">{props.children}</a>
               : <NavLink to={`/${props.href}`}>{props.children}</NavLink>,
        }
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState(prevState => ({showSidebar: !prevState.showSidebar}));
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

    render() {
        const {showSidebar} = this.state;
        return (<>
            <button style={{position: "absolute", left: -4, top: -4, backgroundColor: "transparent", color: "rgba(255,255,255,0.75)", border: "none"}} 
                    onClick={this.toggleSidebar} title="Toggle Sidebar"><Icon icon={menu} /></button>
            <div className="panel docs" style={{display: "flex", flexDirection: "row"}}>
                <Router basename="/">
                    <div className="toc" style={{flex: "0 1 auto", minWidth:"175px", maxWidth:"200px", display:showSidebar?"block":"none"}}>
                        <MDXProvider components={this.tocComponents}>
                            <TOC />
                        </MDXProvider>
                    </div>
                    <div className="md" style={{flex: "1 1 auto"}}>
                        <MDXProvider components={this.pageComponents}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <ErrorBoundary>
                                    <Switch>
                                        {Object.entries(pages).map(([route, Page]) => 
                                            <Route key={route} path={`/${route}`}>
                                                <Page />
                                            </Route>
                                        )}
                                        <Route path="/">
                                            <Readme />
                                        </Route>
                                    </Switch>
                                </ErrorBoundary>
                            </Suspense>
                        </MDXProvider>
                    </div>
                </Router>
            </div>
        </>)
    }
}