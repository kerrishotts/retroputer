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

const NUL =  0;
const BRK =  3;
const BEL =  7;
const BS  =  8;
const TAB =  9;
const LF  = 10;

const FF  = 12;
const CR  = 13;

const ARR = 16;
const ARL = 17;
const F1  = 18;
const F2  = 19;
const F3  = 20;
const F4  = 21;
const F5  = 22;
const F6  = 23;
const F7  = 24;
const F8  = 25;
const F9  = 26;
const F10 = 27;
const DEL = 29;
const ARU = 30;
const ARD = 31;

export const KEYBOARD_MAP = [
    /* Key        Unshifted Shf   GrU   GrS Ctl */
    [ ["Backquote",    "`", "~", 0xFF, 0x8E,  0], 
      [["Digit1", "Numpad1"],       "1", "!", 0xE4, 0x86, 0x1C], 
      [["Digit2", "Numpad2"],       "2", "@", 0xE5, 0x87, 0x1D], 
      [["Digit3", "Numpad3"],       "3", "#", 0xFB, 0x88, 0x1E],      
      [["Digit4", "Numpad4"],       "4", "$", 0xF0, 0x98, 0x1F], 
      [["Digit5", "Numpad5"],       "5", "%", 0xF1, 0xA8,  0], 
      [["Digit6", "Numpad6"],       "6", "^", 0xF2, 0x96,  0], 
      [["Digit7", "Numpad7"],       "7", "&", 0xF3, 0x97,  0], 
      [["Digit8", "Numpad8", "NumpadMultiply"],       "8", "*", 0xF4, 0xA6,  0], 
      [["Digit9", "Numpad9"],       "9", "(", 0xF5, 0xA7,  0], 
      [["Digit0", "Numpad0"],       "0", ")", 0xF6, 0x9E, 0x1B], 
      [["Minus", "NumpadSubtract"],        "-", "_", 0xED, 0x93,  0],       
      [["Equal", "NumpadEqual", "NumpadAdd"],        "=", "+", 0xEB, 0x95,  0], 
      ["Backspace",     BS, DEL, 0x7F,  DEL, FF], 
      ["F1",            F1,  F1,   F1,   F1, F1], 
      ["F2",            F2,  F2,   F2,   F2, F2]],
    [ ["Tab",          TAB, TAB,    0,    0,  0], 
      ["KeyQ",         "q", "Q", 0xDA, 0xD5, "Q".charCodeAt(0) - 64], 
      ["KeyW",         "w", "W", 0xC2, 0xD1, "W".charCodeAt(0) - 64], 
      ["KeyE",         "e", "E", 0xBF, 0xB8, "E".charCodeAt(0) - 64],        
      ["KeyR",         "r", "R", 0xC9, 0xD6, "R".charCodeAt(0) - 64], 
      ["KeyT",         "t", "T", 0xCB, 0xD2, "T".charCodeAt(0) - 64], 
      ["KeyY",         "y", "Y", 0xBB, 0xB7, "Y".charCodeAt(0) - 64], 
      ["KeyU",         "u", "U", 0xE9, 0xE3, "U".charCodeAt(0) - 64],
      ["KeyI",         "i", "I", 0xDF, 0xC4, "I".charCodeAt(0) - 64], 
      ["KeyO",         "o", "O", 0xE8, 0xE2, "O".charCodeAt(0) - 64], 
      ["KeyP",         "p", "P", 0xB2, 0x83, "P".charCodeAt(0) - 64], 
      ["BracketLeft",  "[", "{", 0xEC, 0x85,  0], 
      ["BracketRight", "]", "}", 0xEA, 0x84,  0], 
      ["Backslash",   "\\", "|", 0xEF, 0xA4,  0], 
      ["F3",            F3,  F3,   F3,   F3, F3], 
      ["F4",            F4,  F4,   F4,   F4, F4]],
    [ ["CapsLock",       0,   0,    0,    0,  0], 
      ["KeyA",         "a", "A", 0xC3, 0xC6, "A".charCodeAt(0) - 64], 
      ["KeyS",         "s", "S", 0xC5, 0xD8, "S".charCodeAt(0) - 64], 
      ["KeyD",         "d", "D", 0xB4, 0xB5, "D".charCodeAt(0) - 64],
      ["KeyF",         "f", "F", 0xCC, 0xC7, "F".charCodeAt(0) - 64], 
      ["KeyG",         "g", "G", 0xCE, 0xD7, "G".charCodeAt(0) - 64], 
      ["KeyH",         "h", "H", 0xB9, 0xB6, "H".charCodeAt(0) - 64], 
      ["KeyJ",         "j", "J", 0xDD, 0xB3, "J".charCodeAt(0) - 64], 
      ["KeyK",         "k", "K", 0xDB, 0x9F, "K".charCodeAt(0) - 64], 
      ["KeyL",         "l", "L", 0xDE, 0xBA, "L".charCodeAt(0) - 64], 
      ["Semicolon",    ";", ":", 0xB0, 0xA3,  0], 
      ["Quote",        `'`, `"`, 0xB1, 0xA5,  0],
      undefined,                                  
      [["Enter", "NumpadEnter"],         CR,  CR,  CR,   CR,  CR], 
      ["F5",            F5,  F5,  F5,   F5,  F5], 
      ["F6",            F6,  F6,  F6,   F6,  F6]],
    [ ["ShiftLeft",      0,   0,    0,    0,  0], 
      ["KeyZ",         "z", "Z", 0xC0, 0xD4, "Z".charCodeAt(0) - 64], 
      ["KeyX",         "x", "X", 0xC1, 0xCF, "X".charCodeAt(0) - 64], 
      ["KeyC",         "c", "C", 0xD9, 0xBE, "C".charCodeAt(0) - 64],
      ["KeyV",         "v", "V", 0xC8, 0xD3, "V".charCodeAt(0) - 64], 
      ["KeyB",         "b", "B", 0xCA, 0xD0, "B".charCodeAt(0) - 64], 
      ["KeyN",         "n", "N", 0xBC, 0xBD, "N".charCodeAt(0) - 64], 
      ["KeyM",         "m", "M", 0xE7, 0xE1, "M".charCodeAt(0) - 64],
      ["Comma",        ",", "<", 0xDC, 0xCD,  0], 
      [["Period", "NumpadDecimal"],       ".", ">", 0xE6, 0xE0,  0], 
      [["Slash", "NumpadDivide"],        "/", "?", 0xEE, 0x8F,  0], 
      undefined,
      ["ArrowUp",      ARU, ARU,  ARU,  ARU,ARU], 
      ["ShiftRight",     0,   0,    0,    0,  0], 
      ["F7",            F7,  F7,   F7,   F7, F7], 
      ["F8",            F8,  F8,   F8,   F8, F8]],
    [ [["MetaLeft", "MetaRight"],       0,   0,    0,    0,  0], 
      [["AltLeft", "AltRight"],        0,   0,    0,    0,  0], 
      [["ControlLeft", "ControlRight"],    0,   0,    0,    0,  0], 
      undefined,
      undefined,                                  
      undefined,                
      undefined,               
      undefined,
      ["Space",         32,  32,   32,   32, 32], 
      undefined,                
      undefined,               
      ["ArrowLeft",    ARL, ARL,  ARL,  ARL,ARL],
      ["ArrowDown",    ARD, ARD,  ARD,  ARD,ARD], 
      ["ArrowRight",   ARR, ARR,  ARR,  ARR,ARR], 
      ["F9",            F9,  F9,   F9,   F9, F9], 
      ["F10",          F10, F10,  F10,  F10,F10]]
];


const KEYCODE_MAP = {};
KEYBOARD_MAP.map((keys, row) => keys && keys.map((data, col) => {
    if (data) {
        const [key, unshifted, shifted, gru, grs, ctl] = data;
        const tmp = { addr: (row * 16 + col), unshifted, shifted, gru, grs, ctl };
        if (typeof tmp.unshifted === "string") tmp.unshifted = tmp.unshifted.charCodeAt(0);
        if (typeof tmp.shifted === "string") tmp.shifted = tmp.shifted.charCodeAt(0);
        if (typeof tmp.gru === "string") tmp.gru = tmp.gru.charCodeAt(0);
        if (typeof tmp.grs === "string") tmp.grs = tmp.grs.charCodeAt(0);
        if (typeof tmp.ctl === "string") tmp.ctl = tmp.ctl.charCodeAt(0);
        if (Array.isArray(key)) {
            for (let theKey of key) {
                KEYCODE_MAP[theKey] = tmp;
            }
        } else {
            KEYCODE_MAP[key] = tmp;
        }
    }
}));

function mapKeyCode(code) {
    const data = KEYCODE_MAP[code];
    if (data) {
        const addr = data.addr;
        if (addr !== undefined) {
            const bit  =   addr & 0b00000111; // the low three bits define which bit should be toggled
            const quad = (addr & 0b11111000) >> 3; // the high bits define the quadrant
            const mask = ~(1 << bit);

            return { mask, bit, port: quad + 0x02, data };
        }
        return {};
    }
    return {};
}

export class Keyboard extends Device {
    constructor({device = 3, length = 16, controller, memory = undefined, clock = undefined}) {
        super({device, length, controller, memory, clock});

        this._buffer = "";
    }

    get isShifted() {
        return (this._read(PORT_ROW_3_QUAD_0) & 1) || (this._read(PORT_ROW_3_QUAD_1) & 32);

    }

    get isGr() {
        return !!(this._read(PORT_ROW_4_QUAD_0) & 2);

    }

    get isCtl() {
        return !!(this._read(PORT_ROW_4_QUAD_0) & 4);
    }

    setRawKey(row, col) {
        const bit  = col & 0b00000111;
        const port = 2 + ((((row * 16) + col) & 0b11111000) >> 3);
        const mask = ~(1 << bit);
        const cur = this._read(port);
        this._write(port, (cur & mask) | (1 << bit));
    }

    clearRawKey(row, col) {
        const bit  = col & 0b00000111;
        const port = 2 + ((((row * 16) + col) & 0b11111000) >> 3);
        const mask = ~(1 << bit);
        const cur = this._read(port);
        this._write(port, (cur & mask));
    }

    getRawKey(row, col) {
        const bit  = col & 0b00000111;
        const port = 2 + ((((row * 16) + col) & 0b11111000) >> 3);
        const mask = ~(1 << bit);
        const cur = this._read(port);
        return (cur & (1<< bit)) ? 1 : 0;
    }

    keyPressed(which) {
        if (this._buffer.length < 255 ) {
            this._buffer += String.fromCharCode(which);
        }
        this.requestService();
    }
    keyDown(which) {
        const { mask, port, bit, data } = mapKeyCode(which);
        if (port !== undefined) {
            const cur = this._read(port);
            this._write(port, (cur & mask) | (1 << bit)); // set the bit to indicate something is pressed
        }
        if (data) {
            const isShifted = (this._read(PORT_ROW_3_QUAD_0) & 1) || (this._read(PORT_ROW_3_QUAD_1) & 32);
            const isGr = !!(this._read(PORT_ROW_4_QUAD_0) & 2);
            const isCtl = !!(this._read(PORT_ROW_4_QUAD_0) & 4);

            let key;

            if ( isCtl)              { this.keyPressed(data.ctl); return; }
            if (!isGr && !isShifted) { this.keyPressed(data.unshifted); return; }
            if (!isGr &&  isShifted) { this.keyPressed(data.shifted); return; }
            if ( isGr && !isShifted) { this.keyPressed(data.gru); return; }
            if ( isGr &&  isShifted) { this.keyPressed(data.grs); return; }
        }
        this.requestService();
    }
    keyUp(which) {
        const { mask, port, data } = mapKeyCode(which);
        if (port !== undefined) {
            const cur = this._read(port);
            this._write(port, (cur & mask)); // clear the bit to indicate key is not pressed
        }
        this.requestService();
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