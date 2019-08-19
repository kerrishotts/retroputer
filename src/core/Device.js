import { IOBus } from "./IOBus.js";

export const _ioBus = Symbol("_ioBus");
export const _memory = Symbol("_memory");
export const _buffer = Symbol("_buffer");
export const _device = Symbol("_device");

export class Device {
    constructor({device = 0, length = 16, ioBus, memory = undefined, clock = undefined}) {
        this[_ioBus] = ioBus;
        this[_memory] = memory;
        this[_device] = device;

        this[_buffer] = new Uint8Array(new ArrayBuffer(length << 1));

        this.putOnBus = this.putOnBus.bind(this);
        this.pullFromBus = this.pullFromBus.bind(this);
        this._read = this._read.bind(this);
        this._write = this._write.bind(this);

        ioBus.executeBus.addReceiver(() => {
            const ioBus = this[_ioBus];
            const selectedDevice = ioBus.deviceSelectBus.value;
            if (selectedDevice === this.device) {
                const command = ioBus.commandBus.value;
                const address = ioBus.addressSelectBus.value;
                const fn = command === 0 ? this.putOnBus : this.pullFromBus;
                if (fn) {
                    fn(address);
                }
            }
        });

        this.tick = this.tick.bind(this);
        if (clock) {
            clock.addReceiver(this.tick);
        }

    }

    _read(address = 0) {
        return this[_buffer][address];
    }
    _write(address = 0, data = 0) {
        this[_buffer][address << 1] = data;
        if (this.mirrored[address]) {
            this[_buffer][address] = data;
        }
    }

    putOnBus(address = 0) {
        const ioBus = this[_ioBus];
        ioBus.dataBus.value = this._read(address);
    }

    pullFromBus(address = 0) {
        const data = this[_ioBus].dataBus.value;
        this._write(address, data);
    }

    get mirrored() {
        return {}
    }

    get device() {
        return this[_device];
    }

    get ioBus() {
        return this[_ioBus];
    }

    get memory() {
        return this[_memory];
    }

    requestService(r) {
        const ioBus = this[_ioBus];
        ioBus.irqServiceBus.value = this.device;
        ioBus.irqSignalBus.signal(1);  // hold?
    }

    tick() {
        // nop
    }
}