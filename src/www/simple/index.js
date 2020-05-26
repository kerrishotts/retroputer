import React from 'react';
import ReactDOM from 'react-dom';

var $ = require('jquery');
window.$ = $;
var GoldenLayout = require('golden-layout');
import './assets/goldenlayout-base.css';
import './assets/goldenlayout-dark-theme.css';

import { Store } from "./Store.js";
const store = new Store();
window.store = store;

import { ComputerConsole } from "./components/ComputerConsole.jsx";
import { CodeEditor } from "./components/CodeEditor.jsx";
import { ComputerState } from "./components/ComputerState.jsx";
import { Disassembler } from "./components/Disassembler.jsx";
import { FPS } from "./components/FPS.jsx";
import { ComputerScreen } from "./components/ComputerScreen.jsx";
import { ComputerControl } from "./components/ComputerControl.jsx";
import { ComputerMemory } from "./components/ComputerMemory.jsx";
import { ComputerKeyboard } from "./components/ComputerKeyboard.jsx";
import { ComputerIO } from "./components/ComputerIO.jsx";
import { Docs } from "./components/Docs.jsx";

window.React = React;
window.ReactDOM = ReactDOM;

const defaultConfig = {
    settings: {
        showPopoutIcon: false,
        showCloseIcon: false,
    },
    content: [{
        type: 'column',
        content:[{
            type: 'row',
            height: 14,
            content: [
                {
                    type: 'react-component',
                    title: 'Control',
                    component: 'computer-control',
                    props: {store}
                }, 
                {
                    type: 'react-component',
                    width: 15,
                    title: 'Keyboard',
                    component: 'computer-keyboard',
                    props: {store}
                },
                {
                    type: 'react-component',
                    width: 15,
                    title: 'FPS',
                    component: 'fps',
                    props: {store}
                },
            ]
        },
        {
            type: 'row',
            content: [
                {
                    type: 'stack',
                    content: [
                        {
                            type: 'react-component',
                            title: 'Screen',
                            component: 'computer-screen',
                            props: {store}
                        },
                        {
                            type: 'react-component',
                            title: 'Console',
                            component: 'computer-console',
                            props: {store}
                        },
                        {
                            type: 'react-component',
                            title: 'Documentation',
                            component: 'docs',
                            props: {store}
                        },
                    ]
                },
                {
                    type: 'column',
                    width: 25,
                    content: [
                        {
                            type: 'stack', 
                            height: 75,
                            content: [
                                {
                                    type: 'react-component',
                                    title: 'State',
                                    component: 'computer-state',
                                    width: 25,
                                    props: {store}
                                },
                                {
                                    type: 'react-component',
                                    title: 'Code',
                                    component: 'code-editor',
                                    width: 25,
                                    props: {store}
                                },
                                {
                                    type: 'react-component',
                                    title: 'Disassembly',
                                    component: 'disassembler',
                                    width: 25,
                                    props: {store}
                                },
                            ]
                        },
                        {
                            type: 'stack',
                            height: 25,
                            content: [
                                {
                                    type: 'react-component',
                                    title: 'Memory',
                                    component: 'computer-memory',
                                    width: 25,
                                    props: {store}
                                },
                                {
                                    type: 'react-component',
                                    title: 'I/O',
                                    component: 'computer-io',
                                    width: 25,
                                    props: {store}
                                },
                            ]
                        }
                    ]
                }
            ]
        }]
    }]
};

function setProps(node) {
    if (Array.isArray(node)) {
        node.forEach(node => setProps(node));
    } else {
        if (node.type.endsWith("component")) {
            node.props = {store};
        } else {
            if (node.content) {
                setProps(node.content);
            }
        }
    }
}

function removeProps(node) {
    if (Array.isArray(node)) {
        node.forEach(node => removeProps(node));
    } else {
        if (node.type.endsWith("component")) {
            node.props = null;
            node.componentState = {};
        } else {
            if (node.content) {
                removeProps(node.content);
            }
        }
    }
}

let lastConfigSaveTimer = null;

function initGoldenLayout() {
    let config;
    const storedConfig = localStorage.getItem("panelConfig");
    if (storedConfig) {
        config = JSON.parse(storedConfig); 
        Object.assign(config.settings, defaultConfig.settings);
        setProps(config.content);
    } else {
        config = defaultConfig;
    }
    if(window.location.search.includes("reset-layout")) {
        config = defaultConfig;
    }
    const myLayout = new GoldenLayout( config );
    myLayout.registerComponent( 'computer-control', ComputerControl);
    myLayout.registerComponent( 'fps', FPS);
    myLayout.registerComponent( 'docs', Docs);
    myLayout.registerComponent( 'computer-screen', ComputerScreen);
    myLayout.registerComponent( 'computer-state', ComputerState);
    myLayout.registerComponent( 'disassembler', Disassembler);
    myLayout.registerComponent( 'computer-memory', ComputerMemory);
    myLayout.registerComponent( 'computer-io', ComputerIO);
    myLayout.registerComponent( 'computer-console', ComputerConsole);
    myLayout.registerComponent( 'computer-keyboard', ComputerKeyboard);
    myLayout.registerComponent( 'code-editor', CodeEditor);
    myLayout.init();

    myLayout.on("stateChanged", () => {
        // only allow saving our state once a second
        if (!lastConfigSaveTimer) {
            lastConfigSaveTimer = setTimeout( () => 
                {
                    lastConfigSaveTimer = null;
                    try {
                        const curConfig = myLayout.toConfig();
                        removeProps(curConfig.content)
                        localStorage.setItem("panelConfig", JSON.stringify(curConfig));
                    }
                    catch (err) {
                        console.log(err.message);
                    }
                }, 1000
            );
        }
    });

}

initGoldenLayout();

setTimeout(() => document.getElementById("start").click(), 250);