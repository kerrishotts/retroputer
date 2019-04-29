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

export class Bus {

    /**
     * @param {Number} size number of bytes the bus controls
     */
    constructor(size = 2, mask = 0xFFFFFFFF) {

        this[_size] = size;
        this[_mask] = mask; // lets us simulate a smaller bus width
        this[_buffer] = new ArrayBuffer(size);

        switch (size) {
            case 1: this[_value] = new Uint8Array(this[_buffer]); break;
            case 2: this[_value] = new Uint16Array(this[_buffer]); break;
            case 4: this[_value] = new Uint32Array(this[_buffer]); break;
            default:
                throw new Error("Bus must be eight, sixteen, or thirty-two bits wide.");
        }

        this[_receivers] = [];
    }

    addReceiver(receiver) {
        if (receiver) {
            this[_receivers].push(receiver);
        }
    }

    set value(v) {
        this[_value][0] = v & this[_mask];
    }

    get value() {
        return this[_value][0];
    }

    get size() {
        return this[_size];
    }

    signal(v, hold = false) {
        if (v !== undefined) {
            this.value = v;
        }

        for (let i = this[_receivers].length - 1; i >= 0; i--) {
            this[_receivers][i](this.value);
        }

        if (!hold) {
            this.value = 0;
        }
    }
}