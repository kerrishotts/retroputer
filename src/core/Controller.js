import { Processor } from "./Processor.js";
import { Device } from "./Device.js";
import { IOBus } from "./IOBus.js";
import { Bus } from "./Bus.js";

const _processor = Symbol("_processor");
const _ioBus = Symbol("_ioBus");
const _devices = Symbol("_devices");
const _deviceMap = Symbol("_deviceMap");

export class Controller {
    /**
     * 
     * @param {Object} config 
     * @param {Processor} config.processor
     * @param {IOBus} config.ioBus
     * @param {Bus} config.Bus
     */
    constructor({processor, ioBus, clock}) {
        this[_processor] = processor;
        processor.registerController(this);
        this[_ioBus] = ioBus;
        this[_devices] = [];
        this[_deviceMap] = [];

        this.tick = this.tick.bind(this);
        if (clock) {
            clock.addReceiver(this.tick);
        }
    }

    get ioBus() {
        return this[_ioBus];
    }

    get processor() {
        return this[_processor];
    }

    get devices() {
        return this[_devices];
    }

    /**
     * @param {Device} device 
     */
    register(device) {
        this[_devices].push(device);
        this[_devices].sort((a, b) => a.priority - b.priority);

        this[_deviceMap] = this[_devices].reduce(
            (m, device) => {
                for (let addr = device.addrStart; addr <= device.addrEnd; addr += 16) {
                    m[addr >> 4] = device;
                }
                return m;
            }, []);
    }

    pureRead(address) {
        const deviceSelection = address >> 4;
        const actualDevice = this[_deviceMap][deviceSelection];
        return (actualDevice ? actualDevice._read(address - actualDevice.addrStart) : 0) || 0;
    }

    pureWrite(address, value) {
        const deviceSelection = address >> 4;
        const actualDevice = this[_deviceMap][deviceSelection];
        if (actualDevice) actualDevice._write(address - actualDevice.addrStart, value);
    }

    /**
     * @param {Device} device 
     */
    sendInterruptForDevice(device) {
        const ioBus = this[_ioBus];
        ioBus.irqServiceBus.value |= (1 << device.device);
        // on the next tick, the processor will be pinged, and it can service
        // the highest-priority device at the time.
    }

    pingProcessor() {
        if (this.ioBus.irqServiceBus.value !== 0) {
            for (let device of this.devices) {
                if (this.ioBus.irqServiceBus.value & (1 << device.device)) {
                    this.ioBus.irqSignalBus.signal(device.device);
                    break;
                }
            }
        }
    }

    /**
     * @param {number} deviceNum 
     */
    ackInterrupt(deviceNum) {
        this.ioBus.irqServiceBus.value &= ~(1 << deviceNum);
        this.ioBus.irqSignalBus.value = 0;
    }

    tick() {
        this.pingProcessor();
    }

}