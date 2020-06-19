import React from 'react';

import { Key } from "./Key.jsx";
import { KEYBOARD_MAP } from "../../../devices/Keyboard.js";

export class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGr: false,
            isShift: false,
            isCtrl: false
        };
        this.keyUp = this.keyUp.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }
    componentDidMount() {
        const { store } = this.props;
        const { keyboard } = store.devices;
        this._watcher = setInterval(() => {
            this.setState({
                isGr: keyboard.isGr,
                isCtrl: keyboard.isCtl,
                isShift: keyboard.isShifted
            });
        }, 250);
    }
    componentWillUnmount() {
        clearInterval(this._watcher);
    }
    keyDown(evt) {
        const { store } = this.props;
        const { keyboard } = store.devices;
        let target = evt.target;
        if (!target.classList.contains("keycap")) target = target.parentElement;
        const row = target.getAttribute("datarow");
        const col = target.getAttribute("datacol");
        const toggle = target.getAttribute("datatoggle");
        const value = target.getAttribute("datavalue");
        if (row && col) {
            const rowNum = Number(row);
            const colNum = Number(col);
            const byte = Number(value);
            if (toggle) {
                const keyState = keyboard.getRawKey(rowNum, colNum);
                if (!keyState) keyboard.setRawKey(rowNum, colNum)
                else keyboard.clearRawKey(rowNum, colNum);
            } else {
                keyboard.setRawKey(rowNum, colNum);
                keyboard.keyPressed(byte);
            }
        }
    }
    keyUp(evt) {
        const { store } = this.props;
        const { keyboard } = store.devices;
        let target = evt.target;
        if (!target.classList.contains("keycap")) target = target.parentElement;
        const row = target.getAttribute("datarow");
        const col = target.getAttribute("datacol");
        const toggle = target.getAttribute("datatoggle");
        const value = target.getAttribute("datavalue");
        if (row && col) {
            const rowNum = Number(row);
            const colNum = Number(col);
            const byte = Number(value);
            if (!toggle) {
                keyboard.clearRawKey(rowNum, colNum);
            }
        }
    }
    render() {
        const keyState = this.state;
        return (
            <div class="keyboardPanel" onMouseDown={this.keyDown} onMouseUp={this.keyUp} >
                <div class="keyboardSection">
                    <div class="keyboardRow">
                        <Key coord={[0, 0]} which={KEYBOARD_MAP[0][ 0]} keyState={keyState} />
                        <Key coord={[0, 1]} which={KEYBOARD_MAP[0][ 1]} keyState={keyState} />
                        <Key coord={[0, 2]} which={KEYBOARD_MAP[0][ 2]} keyState={keyState} />
                        <Key coord={[0, 3]} which={KEYBOARD_MAP[0][ 3]} keyState={keyState} />
                        <Key coord={[0, 4]} which={KEYBOARD_MAP[0][ 4]} keyState={keyState} />
                        <Key coord={[0, 5]} which={KEYBOARD_MAP[0][ 5]} keyState={keyState} />
                        <Key coord={[0, 6]} which={KEYBOARD_MAP[0][ 6]} keyState={keyState} />
                        <Key coord={[0, 7]} which={KEYBOARD_MAP[0][ 7]} keyState={keyState} />
                        <Key coord={[0, 8]} which={KEYBOARD_MAP[0][ 8]} keyState={keyState} />
                        <Key coord={[0, 9]} which={KEYBOARD_MAP[0][ 9]} keyState={keyState} />
                        <Key coord={[0,10]} which={KEYBOARD_MAP[0][10]} keyState={keyState} />
                        <Key coord={[0,11]} which={KEYBOARD_MAP[0][11]} keyState={keyState} />
                        <Key coord={[0,12]} which={KEYBOARD_MAP[0][12]} keyState={keyState} />
                        <Key coord={[0,13]} label="Back" which={KEYBOARD_MAP[0][13]} keyState={keyState} size="key125"/>
                    </div>
                    <div class="keyboardRow">
                        <Key coord={[1, 0]} label="tab"  which={KEYBOARD_MAP[1][ 0]} keyState={keyState} size="key125"/>
                        <Key coord={[1, 1]} which={KEYBOARD_MAP[1][ 1]} keyState={keyState} />
                        <Key coord={[1, 2]} which={KEYBOARD_MAP[1][ 2]} keyState={keyState} />
                        <Key coord={[1, 3]} which={KEYBOARD_MAP[1][ 3]} keyState={keyState} />
                        <Key coord={[1, 4]} which={KEYBOARD_MAP[1][ 4]} keyState={keyState} />
                        <Key coord={[1, 5]} which={KEYBOARD_MAP[1][ 5]} keyState={keyState} />
                        <Key coord={[1, 6]} which={KEYBOARD_MAP[1][ 6]} keyState={keyState} />
                        <Key coord={[1, 7]} which={KEYBOARD_MAP[1][ 7]} keyState={keyState} />
                        <Key coord={[1, 8]} which={KEYBOARD_MAP[1][ 8]} keyState={keyState} />
                        <Key coord={[1, 9]} which={KEYBOARD_MAP[1][ 9]} keyState={keyState} />
                        <Key coord={[1,10]} which={KEYBOARD_MAP[1][10]} keyState={keyState} />
                        <Key coord={[1,11]} which={KEYBOARD_MAP[1][11]} keyState={keyState} />
                        <Key coord={[1,12]} which={KEYBOARD_MAP[1][12]} keyState={keyState} />
                        <Key coord={[1,13]} which={KEYBOARD_MAP[1][13]} keyState={keyState} />

                    </div>
                    <div class="keyboardRow">
                        <Key coord={[2, 0]} toggle={true} label="caps"  which={KEYBOARD_MAP[2][ 0]} keyState={keyState} size="key150"/>
                        <Key coord={[2, 1]} which={KEYBOARD_MAP[2][ 1]} keyState={keyState} />
                        <Key coord={[2, 2]} which={KEYBOARD_MAP[2][ 2]} keyState={keyState} />
                        <Key coord={[2, 3]} which={KEYBOARD_MAP[2][ 3]} keyState={keyState} />
                        <Key coord={[2, 4]} which={KEYBOARD_MAP[2][ 4]} keyState={keyState} />
                        <Key coord={[2, 5]} which={KEYBOARD_MAP[2][ 5]} keyState={keyState} />
                        <Key coord={[2, 6]} which={KEYBOARD_MAP[2][ 6]} keyState={keyState} />
                        <Key coord={[2, 7]} which={KEYBOARD_MAP[2][ 7]} keyState={keyState} />
                        <Key coord={[2, 8]} which={KEYBOARD_MAP[2][ 8]} keyState={keyState} />
                        <Key coord={[2, 9]} which={KEYBOARD_MAP[2][ 9]} keyState={keyState} />
                        <Key coord={[2,10]} which={KEYBOARD_MAP[2][10]} keyState={keyState} />
                        <Key coord={[2,11]} which={KEYBOARD_MAP[2][11]} keyState={keyState} />
                        <Key coord={[2,13]} label="enter" which={KEYBOARD_MAP[2][13]} keyState={keyState} size="key125" />

                    </div>
                    <div class="keyboardRow">
                        <Key coord={[3, 0]} toggle={true} label="shift"  which={KEYBOARD_MAP[3][ 0]} keyState={keyState} size="key175"/>
                        <Key coord={[3, 1]} which={KEYBOARD_MAP[3][ 1]} keyState={keyState} />
                        <Key coord={[3, 2]} which={KEYBOARD_MAP[3][ 2]} keyState={keyState} />
                        <Key coord={[3, 3]} which={KEYBOARD_MAP[3][ 3]} keyState={keyState} />
                        <Key coord={[3, 4]} which={KEYBOARD_MAP[3][ 4]} keyState={keyState} />
                        <Key coord={[3, 5]} which={KEYBOARD_MAP[3][ 5]} keyState={keyState} />
                        <Key coord={[3, 6]} which={KEYBOARD_MAP[3][ 6]} keyState={keyState} />
                        <Key coord={[3, 7]} which={KEYBOARD_MAP[3][ 7]} keyState={keyState} />
                        <Key coord={[3, 8]} which={KEYBOARD_MAP[3][ 8]} keyState={keyState} />
                        <Key coord={[3, 9]} which={KEYBOARD_MAP[3][ 9]} keyState={keyState} />
                        <Key coord={[3,10]} which={KEYBOARD_MAP[3][10]} keyState={keyState} />
                        <Key coord={[3,12]} which={KEYBOARD_MAP[3][12]} keyState={keyState} />
                        <Key coord={[3,13]} toggle={true} label="shift" which={KEYBOARD_MAP[3][13]} keyState={keyState} />

                    </div>
                    <div class="keyboardRow">
                        <Key coord={[4, 0]} toggle={true} label="fn"    which={KEYBOARD_MAP[4][ 0]} keyState={keyState} size="key125"/>
                        <Key coord={[4, 1]} toggle={true} label="gr"    which={KEYBOARD_MAP[4][ 1]} keyState={keyState} size="key125"/>
                        <Key coord={[4, 2]} toggle={true} label="ctrl"  which={KEYBOARD_MAP[4][ 2]} keyState={keyState} size="key125"/>
                        <Key coord={[4, 8]} label="space" which={KEYBOARD_MAP[4][ 8]} keyState={keyState} size="key200"/>
                        <Key coord={[4, 1]} toggle={true} label="gr"    which={KEYBOARD_MAP[4][ 1]} keyState={keyState} size="key125"/>
                        <Key coord={[4,11]} which={KEYBOARD_MAP[4][11]} keyState={keyState} />
                        <Key coord={[4,12]} which={KEYBOARD_MAP[4][12]} keyState={keyState} />
                        <Key coord={[4,13]} which={KEYBOARD_MAP[4][13]} keyState={keyState} />

                    </div>
                </div>
                <div class="keyboardSection">
                    <div class="keyboardRow">
                        <Key coord={[0,14]} label="f1"   which={KEYBOARD_MAP[0][14]} keyState={keyState} size="key125"/>
                        <Key coord={[0,15]} label="f2"   which={KEYBOARD_MAP[0][15]} keyState={keyState} size="key125"/>
                    </div>
                    <div class="keyboardRow">
                        <Key coord={[1,14]} label="f3"   which={KEYBOARD_MAP[1][14]} keyState={keyState} size="key125"/>
                        <Key coord={[1,15]} label="f4"   which={KEYBOARD_MAP[1][15]} keyState={keyState} size="key125"/>
                    </div>
                    <div class="keyboardRow">
                        <Key coord={[2,14]} label="f5"   which={KEYBOARD_MAP[2][14]} keyState={keyState} size="key125"/>
                        <Key coord={[2,15]} label="f6"   which={KEYBOARD_MAP[2][15]} keyState={keyState} size="key125"/>
                    </div>
                    <div class="keyboardRow">
                        <Key coord={[3,14]} label="f7"    which={KEYBOARD_MAP[3][14]} keyState={keyState} size="key125"/>
                        <Key coord={[3,15]} label="f8"    which={KEYBOARD_MAP[3][15]} keyState={keyState} size="key125"/>
                    </div>
                    <div class="keyboardRow">
                        <Key coord={[4,14]} label="f9"   which={KEYBOARD_MAP[3][14]} keyState={keyState} size="key125"/>
                        <Key coord={[4,15]} label="f10"  which={KEYBOARD_MAP[3][15]} keyState={keyState} size="key125"/>
                    </div>
                </div>
            </div>
        );
    }
}