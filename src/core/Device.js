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

        this[_buffer] = new Uint8Array(new ArrayBuffer(length));

        this.read = this.read.bind(this);
        this.write = this.write.bind(this);

        ioBus.executeBus.addReceiver(() => {
            const ioBus = this[_ioBus];
            const selectedDevice = ioBus.deviceSelectBus.value;
            if (selectedDevice === this.device) {
                const command = ioBus.commandBus.value;
                const address = ioBus.addressSelectBus.value;
                const data = ioBus.dataBus.value;
                const fn = command === 0 ? this.read : this.write;
                if (fn) {
                    fn(address, data);
                }
            }
        });

        this.tick = this.tick.bind(this);
        if (clock) {
            clock.addReceiver(this.tick);
        }

    }

    read(address = 0) {
        const ioBus = this[_ioBus];
        ioBus.dataBus.value = this[_buffer][address];
    }

    write(address = 0, data = 0) {
        const ioBus = this[_ioBus];
        this[_buffer][address] = data;
    }

    get device() {
        return this[_device];
    }

    requestService(r) {
        const ioBus = this[_ioBus];
        this[_ioBus].irqServiceBus.value = this.device;
        this[_ioBus].irqSignalBus.signal(1);  // hold?
    }

    tick() {
        // nop
    }
}