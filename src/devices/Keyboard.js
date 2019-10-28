import { Device, _buffer } from "../core/Device.js";

const PORT_KEY_PRESSED      = 0x00;
const PORT_BUFFER_REMAINING = 0x01;
const PORT_ROW_0_QUAD_0     = 0x02;
const PORT_ROW_0_QUAD_1     = 0x03;
const PORT_ROW_1_QUAD_0     = 0x04;
const PORT_ROW_1_QUAD_1     = 0x05;
const PORT_ROW_2_QUAD_0     = 0x06;
const PORT_ROW_2_QUAD_1     = 0x07;
const PORT_ROW_3_QUAD_0     = 0x08;
const PORT_ROW_3_QUAD_1     = 0x09;
const PORT_ROW_4_QUAD_0     = 0x0A;
const PORT_ROW_4_QUAD_1     = 0x0B;

const MIRROR_MAP = {
    [PORT_KEY_PRESSED]: true,
    [PORT_BUFFER_REMAINING]: true,
    [PORT_ROW_0_QUAD_0]: true,
    [PORT_ROW_0_QUAD_1]: true,
    [PORT_ROW_1_QUAD_0]: true,
    [PORT_ROW_1_QUAD_1]: true,
    [PORT_ROW_2_QUAD_0]: true,
    [PORT_ROW_2_QUAD_1]: true,
    [PORT_ROW_3_QUAD_0]: true,
    [PORT_ROW_3_QUAD_1]: true,
    [PORT_ROW_4_QUAD_0]: true,
    [PORT_ROW_4_QUAD_1]: true,
};

const KEYBOARD_MAP = [
    [ "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", 
      "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "F1", "F2"],
    [ "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU",
      "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "F3", "F4"],
    [ "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", 
      "KeyK", "KeyL", "Semicolon", "Quote", undefined, "Enter", "F5", "F6"],
    [ "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM",
      "Comma", "Period", "Slash", undefined, "ArrowUp", "ShiftRight", "F7", "F8"],
    [ "MetaLeft", "AltLeft", "ControlLeft", undefined, undefined, undefined, undefined, undefined,
      "Space", undefined, undefined, "ArrowLeft", "ArrowDown", "ArrowRight", "F9", "F10"]
];

const KEYCODE_MAP = {};
KEYBOARD_MAP.map((keys, row) => keys && keys.map((key, col) => {
    if (key) {
        KEYCODE_MAP[key] = (row * 16 + col);
    }
}));

function mapKeyCode(code) {
    const addr = KEYCODE_MAP[code];
    if (addr !== undefined) {
        const bit  =   addr & 0b00000111; // the low three bits define which bit should be toggled
        const quad = (addr & 0b11111000) >> 3; // the high bits define the quadrant
        const mask = ~(1 << bit);

        return { mask, bit, port: quad + 0x02 };
    }
    return {};
}

export class Keyboard extends Device {
    constructor({device = 3, length = 16, controller, memory = undefined, clock = undefined}) {
        super({device, length, controller, memory, clock});

        this._buffer = "";
    }

    keyPressed(which) {
        if (this._buffer.length < 255 ) {
            this._buffer += String.fromCharCode(which);
        }
    }
    keyDown(which) {
        const { mask, port, bit } = mapKeyCode(which);
        if (port !== undefined) {
            const cur = this._read(port);
            this._write(port, (cur & mask) | (1 << bit)); // set the bit to indicate something is pressed
        }
    }
    keyUp(which) {
        const { mask, port } = mapKeyCode(which);
        if (port !== undefined) {
            const cur = this._read(port);
            this._write(port, (cur & mask)); // clear the bit to indicate key is not pressed
        }
    }

    _read(address = 0) {
        let data = super._read(address);

        if (address === PORT_KEY_PRESSED) {
            data = this._buffer.charCodeAt(0);
        }
        if (address === PORT_BUFFER_REMAINING) {
            data = 255 - this._buffer.length;
        }

        return data;
    }

    putOnBus(address = 0) {
        super.putOnBus(address);
        if (address === PORT_KEY_PRESSED) {
            // reading the buffer shifts out the buffer
            this._buffer = this._buffer.substr(1);
        }
    }

    get mirrored() {
        return MIRROR_MAP;
    }
}