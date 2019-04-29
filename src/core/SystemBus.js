import { Bus } from "./Bus.js";

const ADDRESS_SIZE = 4;
const ADDRESS_MASK = 0b111111111111111111;
const DATA_SIZE = 2;
const DATA_MASK = 0b1111111111111111;
const COMMAND_SIZE = 1;
const COMMAND_MASK = 0b11;
const EXECUTE_SIZE = 1;
const EXECUTE_MASK = 0b1;

const _addressBus = Symbol("_addressBus");
const _dataBus = Symbol("_dataBus");
const _commandBus = Symbol("_commandBus");
const _executeBus = Symbol("_executeBus");

export const COMMANDS_MEMORY_READ_BYTE = 0b00;
export const COMMANDS_MEMORY_READ_WORD = 0b01;
export const COMMANDS_MEMORY_WRITE_BYTE = 0b10;
export const COMMANDS_MEMORY_WRITE_WORD = 0b11;

export class SystemBus {
    constructor() {
        this[_addressBus] = new Bus(ADDRESS_SIZE, ADDRESS_MASK);
        this[_dataBus] = new Bus(DATA_SIZE, DATA_MASK);
        this[_commandBus] = new Bus(COMMAND_SIZE, COMMAND_MASK);
        this[_executeBus] = new Bus(EXECUTE_SIZE, EXECUTE_MASK);
    }

    get addressBus() {
        return this[_addressBus];
    }

    get dataBus() {
        return this[_dataBus];
    }

    get commandBus() {
        return this[_commandBus]
    }

    get executeBus() {
        return this[_executeBus]
    }

    get command() {
        return this[_commandBus].value;
    }

    get address() {
        return this[_addressBus].value;
    }

    get data() {
        return this[_dataBus].value;
    }

    set data(v) {
        this[_dataBus].value = v;
    }

    readByte(address) {
        this[_addressBus].value = address;
        this[_dataBus].value = 0;
        this[_commandBus].value = COMMANDS_MEMORY_READ_BYTE;
        this[_executeBus].signal(1);
        return this[_dataBus].value;
    }

    readWord(address) {
        this[_addressBus].value = address;
        this[_dataBus].value = 0;
        this[_commandBus].value = COMMANDS_MEMORY_READ_WORD;
        this[_executeBus].signal(1);
        return this[_dataBus].value;
    }

    writeByte(address, value) {
        this[_addressBus].value = address;
        this[_dataBus].value = value & 0xFF;
        this[_commandBus].value = COMMANDS_MEMORY_WRITE_BYTE;
        this[_executeBus].signal(1);
    }

    writeWord(address, value) {
        this[_addressBus].value = address;
        this[_dataBus].value = value;
        this[_commandBus].value = COMMANDS_MEMORY_WRITE_WORD;
        this[_executeBus].signal(1);
    }

}