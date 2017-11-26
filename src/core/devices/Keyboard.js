import ports from "../ports.js";
import GenericDevice from "../GenericDevice.js";

let specialKeyMap = {
    33: 1,              /* page up*/
    34: 2,              /* page down*/
    35: 3,              /* end */
    36: 4,              /* home */
    37: 5,              /* left */
    38: 6,              /* up */
    39: 7,              /* right */
    40: 10,              /* down */
    9: 9,              /* tab */
    45: 11,             /* insert */
    46: 12,             /* delete */
    112: 16,             /* f1 */
    113: 17,
    114: 18,
    115: 19,
    116: 20,
    117: 21,
    118: 22,
    119: 23,
    120: 24,
    121: 25,
    122: 26,
    123: 27,
}

let stateKeyBitmap = {
    16: 0b10000000,         /* shift */
    17: 0b01000000,         /* ctrl */
    18: 0b00100000,         /* alt */
    19: 0b00010000,         /* pause/break */
    144: 0b00001000,         /* num lock */
    145: 0b00000100,         /* scroll lock */
    20: 0b00000010,         /* caps lock */
}

let directionalBitmap = {

    /*    ....ULRD */
    33: 0b00001010,         /* page up */
    34: 0b00000011,         /* page down */
    35: 0b00000101,         /* end */
    36: 0b00001100,         /* home */
    37: 0b00000100,         /* left */
    65: 0b00000100,         /* a = left */
    38: 0b00001000,         /* up */
    87: 0b00001000,         /* w = up */
    39: 0b00000010,         /* right */
    68: 0b00000010,         /* d = right */
    40: 0b00000001,         /* down */
    83: 0b00000001,         /* s = down */
}

function isInvalidTarget(evt) {
    let targetTag = evt.target.tagName.toLowerCase();
    return (targetTag === "input" && evt.target.getAttribute("id") !== "kbd") || targetTag === "textarea" || targetTag === "button";
}

export default class Keyboard extends GenericDevice {
    constructor({ cpu, memory } = {}) {
        super({ cpu, memory, name: "keyboard", type: "buffered" });

        this._key = 0;
        this._state = 0b00000000;       // modifier keys like CTRL, ALT, etc.
        this._directions = 0b00000000;  // directional keys

        if (typeof window !== "undefined") {
            this.registerWithDOM();
        }
    }

    updateMemoryState() {
        this.write(ports.ioKeyboardKeyPressed, this._key);
        this.write(ports.ioKeyboardModifiers, this._state);
        this.write(ports.ioKeyboardDirections, this._directions);
    }

    onKeyDown(evt) {
        if (isInvalidTarget(evt)) { return; }

        // handle special keys!
        let key = evt.which;
        let mappedKey = specialKeyMap[key];
        if (mappedKey) {
            this._key = key;
            evt.preventDefault();
        }

        // also handle modifier and directional keys
        let bitmask = stateKeyBitmap[key] || 0x00;
        this._state |= bitmask;

        bitmask = directionalBitmap[key] || 0x00;
        this._directions |= bitmask;

        this.updateMemoryState();
    }

    onKeyUp(evt) {
        if (isInvalidTarget(evt)) { return; }

        let key = evt.which;
        this._key = 0;
        // handle modifier and directional keys
        let bitmask = stateKeyBitmap[key] || 0x00;
        this._state &= (!bitmask);

        bitmask = directionalBitmap[key] || 0x00;
        this._directions &= (!bitmask);

        this.updateMemoryState();
        this.cpu.sendTrap(0x11);

        evt.preventDefault();
    }

    onKeyPress(evt) {
        if (isInvalidTarget(evt)) { return; }

        // handle normal keys
        this._key = evt.which;

        this.updateMemoryState();
        this.cpu.sendTrap(0x10);

        evt.preventDefault();
    }

    registerWithDOM() {
        document.addEventListener("keydown", evt => this.onKeyDown(evt));
        document.addEventListener("keypress", evt => this.onKeyPress(evt));
        document.addEventListener("keyup", evt => this.onKeyUp(evt));
    }


}