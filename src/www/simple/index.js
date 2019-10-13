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
import { FPS } from "./components/FPS.jsx";
import { ComputerScreen } from "./components/ComputerScreen.jsx";
import { ComputerControl } from "./components/ComputerControl.jsx";

window.React = React;
window.ReactDOM = ReactDOM;

function initGoldenLayout() {
    const config = {
        settings: {
            showPopoutIcon: false,
        },
        content: [{
            type: 'column',
            content:[{
                type: 'row',
                height: 10,
                content: [{
                    type: 'react-component',
                    title: 'Control',
                    component: 'computer-control',
                    props: {store}
                }, 
                {
                    type: 'react-component',
                    width: 15,
                    title: 'FPS',
                    component: 'fps',
                    props: {store}
                }]
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
                        ]
                    },
                    {
                        type: 'stack',
                        width: 25,
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
                        ]
                    }
                ]
            }]
        }]
    };
    const myLayout = new GoldenLayout( config );
    myLayout.registerComponent( 'computer-control', ComputerControl);
    myLayout.registerComponent( 'fps', FPS);
    myLayout.registerComponent( 'computer-screen', ComputerScreen);
    myLayout.registerComponent( 'computer-state', ComputerState);
    myLayout.registerComponent( 'computer-console', ComputerConsole);
    myLayout.registerComponent( 'code-editor', CodeEditor);
    myLayout.init();
}

initGoldenLayout();