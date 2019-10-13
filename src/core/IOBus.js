import { Bus } from "./Bus.js";

const _irqServiceBus = Symbol("_irqService");
const _irqSignalBus = Symbol("_irqSignal");
const _deviceSelectBus = Symbol("_deviceSelect");
const _addressSelectBus = Symbol("_addressSeect");
const _dataBus = Symbol("_data");
const _commandBus = Symbol("_command");
const _executeBus = Symbol("_execute");

export class IOBus {
    constructor() {
        this[_irqServiceBus] = new Bus(2);   // four lines gives 16 IRQs
        this[_irqSignalBus] = new Bus(1, 0x0F);    // when signaled, a device is requesting service
        this[_deviceSelectBus] = new Bus(1, 0x0F); // Device transferring data
        this[_addressSelectBus] = new Bus(1, 0x0F); // Address of data (per device)
        this[_dataBus] = new Bus(1);               // Data is transferred at 8 bits
        this[_commandBus] = new Bus(1, 0x01);      // 0 = read; 1 = write
        this[_executeBus] = new Bus(1, 0x01);      // when signaled, execute data transfer
    }

    get irqServiceBus() { return this[_irqServiceBus]; }
    get irqSignalBus() { return this[_irqSignalBus]; }
    get deviceSelectBus() { return this[_deviceSelectBus]; }
    get addressSelectBus() { return this[_addressSelectBus]; }
    get dataBus() { return this[_dataBus]; }
    get commandBus() { return this[_commandBus]; }
    get executeBus() { return this[_executeBus]; }

}