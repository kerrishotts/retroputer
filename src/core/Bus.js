/*****************************************************************
 *
 * Generic Bus Class
 * -----------------
 *
 * The Generic Bus enables us to create various kinds of busses,
 * including clocks, data lines, address-selects, and more.
 */

const _size = Symbol("_size");
const _buffer = Symbol("_buffer");
const _value = Symbol("_value");
const _receivers = Symbol("_receivers");
const _mask = Symbol("_mask");

const MASKS=[
    0,
    0xFF,
    0xFFFF,
    0xFFFFFF,
    0xFFFFFFFF
];

export class Bus {

    /**
     * @param {Number} size number of bytes the bus controls
     */
    constructor(size = 2, mask = 0xFFFFFFFF) {

        this[_size] = size;
        this[_mask] = mask & MASKS[size]; // lets us simulate a smaller bus width
        /*
        this[_buffer] = new ArrayBuffer(size);

        switch (size) {
            case 1: this[_value] = new Uint8Array(this[_buffer]); break;
            case 2: this[_value] = new Uint16Array(this[_buffer]); break;
            case 4: this[_value] = new Uint32Array(this[_buffer]); break;
            default:
                throw new Error("Bus must be eight, sixteen, or thirty-two bits wide.");
        }
        */
       this[_value] = 0;

        this[_receivers] = [];
    }

    /**
     * @param {Function} receiver 
     */
    addReceiver(receiver) {
        if (receiver) {
            this[_receivers].push(receiver);
        }
    }

    set value(v) {
        //this[_value][0] = v & this[_mask];
        this[_value] = (v < 0 ? ((~v)+1) : v) & this[_mask];
    }

    get value() {
        //return this[_value][0];
        return this[_value];
    }

    get size() {
        return this[_size];
    }

    /**
     * @param {number} v 
     * @param {boolean} [hold = false]
     */
    signal(v, hold = false) {
        if (v !== undefined) {
            this.value = v;
        }

        let curValue = this.value;
        for (let i = this[_receivers].length - 1; i >= 0; i--) {
            this[_receivers][i](curValue);
        }

        if (!hold) {
            this.value = 0;
        }
    }
}