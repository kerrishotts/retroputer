/* globals SharedArrayBuffer */

const _rom = Symbol("_rom");
const _shared = Symbol("_shared");
const _startingAddress = Symbol("_startingAddress");
const _endingAddress = Symbol("_endingAddress");
const _size = Symbol("_size");
const _buffer = Symbol("_buffer");
const _data = Symbol("_data");
const _systemBus = Symbol("_systemBus");

const { COMMANDS_MEMORY_READ_BYTE, COMMANDS_MEMORY_WRITE_BYTE,
        COMMANDS_MEMORY_READ_WORD, COMMANDS_MEMORY_WRITE_WORD } = require ("./SystemBus.js");

export class MemoryBank {
  constructor({ systemBus, address = 0x00000, size = 0, rom = false, shared = false, buffer } = {}) {
    this[_buffer] = buffer || new (shared ? SharedArrayBuffer : ArrayBuffer)(size);
    this[_data] = new Uint8Array(this[_buffer]);
    this[_size] = size;
    this[_startingAddress] = address;
    this[_endingAddress] = address + size - 1;
    this[_shared] = shared;
    this[_rom] = rom;
    this[_systemBus] = systemBus;

    this.signaled = this.signaled.bind(this);
    if (systemBus) {
      systemBus.executeBus.addReceiver(this.signaled);
    }
  }

  get shared() {
    return this[_shared];
  }

  get rom() {
    return this[_rom];
  }

  get startingAddress() {
    return this[_startingAddress];
  }

  get size() {
    return this[_size];
  }

  get endingAddress() {
    return this[_endingAddress];
  }

  read(address) {
    return this[_data][address - this[_startingAddress]];
  }

  write(address, value) {
    if (!this[_rom]) {
      this[_data][address - this[_startingAddress]] = value;
    }
  }

  signaled() {
    // the system's execute line has been triggered
    const command = this[_systemBus].command;
    const address = this[_systemBus].address;
    if (address >= this[_startingAddress] && address <= this[_endingAddress]) {
      switch (command) {
        default:
        case COMMANDS_MEMORY_READ_BYTE:
          this[_systemBus].data = this.read(address);
          break;
        case COMMANDS_MEMORY_READ_WORD:
          this[_systemBus].data = (this.read(address) << 8) | this.read(address + 1);
          break;
        case COMMANDS_MEMORY_WRITE_BYTE:
          this.write(address, this[_systemBus].data);
          break;
        case COMMANDS_MEMORY_WRITE_WORD:
          const data = this[_systemBus].data;
          const hi = (data & 0xFF00) >> 8;
          const lo = (data & 0x00FF);
          this.write(address, hi);
          this.write(address+1, lo);
          break;
      }
    }
  }
}

const _banks = Symbol("_banks");

export class Memory {
  constructor({ systemBus, layout = {}, shared = false, buffer }) {
    const banks = [];

    // push the lower 48KB of writeable memory
    banks.push(new MemoryBank({
      systemBus,
      address: 0x00000,
      size: layout.romStart,
      rom: false,
      shared,
      buffer: buffer ? buffer.slice(0, layout.romStart) : undefined
    }));

    // next comes the ROM block
    banks.push(new MemoryBank({
      systemBus,
      address: layout.romStart,
      size: layout.romLength,
      rom: false,                 // TODO: change to TRUE when we have a kernel
      shared,
      buffer: buffer ? buffer.slice(layout.romStart, layout.romLength) : undefined
    }));

    // and now banks 1, 2, and 3.
    banks.push(...[1, 2, 3].map(bank => new MemoryBank({
      systemBus,
      address: layout.bankLength * bank,
      size: layout.bankLength,
      rom: false,
      shared,
      buffer: buffer ? buffer.slice(layout.bankLength * bank, layout.bankLength) : undefined
    })));

    this[_banks] = banks;
  }

  get banks() {
    return this[_banks];
  }

  get size() {
    const banks = this[_banks];
    let size = 0;
    banks.forEach(bank => size += bank.size);
    return size;
  }

  bankForAddress(address) {
    const banks = this[_banks];
    for (let i = banks.length - 1; i >= 0; i--) {
      if (banks[i].startingAddress <= address && address <= banks[i].endingAddress) {
        return banks[i];
      }
    }
  }

  readByte(address) {
    const bank = this.bankForAddress(address);
    return bank.read(address);
  }

  readWord(address) {
    const bank = this.bankForAddress(address);
    return bank.read(address) << 8 + bank.read(address + 1);
  }

  writeByte(address, value) {
    const bank = this.bankForAddress(address);
    bank.write(address, value);
  }

  writeWord(address, value) {
    const bank = this.bankForAddress(address);
    const hi = (value & 0xFF00) >> 8;
    const lo = (value & 0x00FF);
    bank.write(address, hi);
    bank.write(address + 1, lo);
  }

  loadFromJS(data, addrOverride) {
    let addr = data.addr;
    if (addrOverride) {
      addr = addrOverride;
    }
    data.data.forEach((v, i) => {
      this.writeByte(i + addr, v);
    });
  }
}
