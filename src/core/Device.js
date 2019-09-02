import { Bus } from "./Bus.js";
import { IOBus } from "./IOBus.js";
import { Controller } from "./Controller.js";

export const _controller = Symbol("_controller");
export const _ioBus = Symbol("_ioBus");
export const _memory = Symbol("_memory");
export const _buffer = Symbol("_buffer");
export const _device = Symbol("_device");
export const _priority = Symbol("_priority");

export class Device {
    /**
     * 
     * @param {Object} config 
     * @param {number} [config.device = 0] The device number
     * @param {number} [config.length = 16] The number of ports this device handles
     * @param {number} [config.priority = 15] The interrupt priority for this device
     * @param {Controller} config.controller  The associated controller
     * @param {Memory} config.memory The associated memory
     * @param {Bus} config.clock The clock
     */
    constructor({device = 0, length = 16, priority = 15, controller, memory = undefined, clock = undefined}) {
        this[_controller] = controller;
        controller.register(this);
        this[_ioBus] = controller.ioBus;
        this[_memory] = memory;
        this[_device] = device;
        this[_priority] = priority;

        this[_buffer] = new Uint8Array(new ArrayBuffer(length << 1));

        this._length = length;

        this.putOnBus = this.putOnBus.bind(this);
        this.pullFromBus = this.pullFromBus.bind(this);
        this._read = this._read.bind(this);
        this._write = this._write.bind(this);

        this.ioBus.executeBus.addReceiver(() => {
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
            if (this._length === 32) {
                if (selectedDevice === this.device + 1) {
                    const command = ioBus.commandBus.value;
                    const address = ioBus.addressSelectBus.value + 16;
                    const fn = command === 0 ? this.putOnBus : this.pullFromBus;
                    if (fn) {
                        fn(address);
                    }
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
        this[_buffer][this._length + address] = data;
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

    get priority() {
        return this[_priority];
    }

    get controller() {
        return this[_controller];
    }

    requestService(r) {
        this.controller.sendInterruptForDevice(this);
    }

    tick() {
        // do nothing for now
    }
}