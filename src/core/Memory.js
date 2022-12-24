/* globals SharedArrayBuffer */

const _rom = Symbol("_rom");
const _shared = Symbol("_shared");
const _startingAddress = Symbol("_startingAddress");
const _endingAddress = Symbol("_endingAddress");
const _size = Symbol("_size");
const _buffer = Symbol("_buffer");
const _data = Symbol("_data");
const _systemBus = Symbol("_systemBus");

import {
  COMMANDS_MEMORY_READ_BYTE, COMMANDS_MEMORY_WRITE_BYTE,
  COMMANDS_MEMORY_READ_WORD, COMMANDS_MEMORY_WRITE_WORD,
  SystemBus
} from "./SystemBus.js";

export class MemoryBank {
  /**
   * 
   * @param {Object} config 
   * @param {SystemBus} config.systemBus
   * @param {number} [config.address = 0]
   * @param {number} [config.size = 0]
   * @param {boolean} [config.rom = false]
   * @param {boolean} [config.shared = false]
   * @param {ArrayBuffer} buffer
   * 
   */
  constructor({ systemBus, address = 0x00000, size = 0, rom = false, shared = false, buffer = undefined }) {
    this[_buffer] = buffer || new (shared ? SharedArrayBuffer : ArrayBuffer)(size);
    this[_data] = new Uint8Array(this[_buffer], buffer ? address : 0, size);
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

  /**
   * @param {number} address 
   */
  read(address) {
    return this[_data][address & 0x3FFF];
    //return this[_data][address - this[_startingAddress]];
  }

  /**
   * @param {number} address 
   * @param {number} value 
   * @param {boolean} [override = false] If true, overwrites ROM
   */
  write(address, value, override = false) {
    if (!this[_rom] || override) {
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
          this.write(address + 1, lo);
          break;
      }
    }
  }
}

const _pages = Symbol("_pages");

export class Memory {
  /**
   * @param {Object} config
   * @param {SystemBus} config.systemBus
   * @param {number} [pageCount = 32]
   * @param {number} [pageSize = 0x4000]
   * @param {number[]} [romPages = [28, 29, 30, 31]]
   * @param {boolean} [shared = false]
   * @param {ArrayBuffer} [buffer = null] 
   */
  constructor({ systemBus, pageCount = 32, pageSize = 0x4000, romPages = [28, 29, 30, 31], shared = false, buffer = null }) {
    const pages = [];
    this[_buffer] = buffer || new (shared ? SharedArrayBuffer : ArrayBuffer)(pageCount * pageSize);

    for (let i = 0; i < pageCount; i++) {
      pages.push(new MemoryBank({
        systemBus,
        address: i * pageSize,
        size: pageSize,
        rom: romPages.indexOf(i) > -1,
        shared,
        buffer: this[_buffer]
      }));
    }

    this[_pages] = pages;
    this[_systemBus] = systemBus;
  }

  get pages() {
    return this[_pages];
  }

  get size() {
    const pages = this[_pages];
    let size = 0;
    pages.forEach(page => size += page.size);
    return size;
  }

  /**
   * @param {number} address
   */
  pageForAddress(address) {
    const pages = this[_pages];
    const map = this[_systemBus].map;
    const page = (address & 0b1111100000000000000) >> 14;

    switch (page) {
      case 1:
        return pages[(map & 0b0000000000011111)];
      case 2:
        return pages[(map & 0b0000001111100000) >> 5];
      case 3:
        return pages[(map & 0b0111110000000000) >> 10];
      default:
        return pages[page];
    }
    /*
        for (let i = pages.length - 1; i >= 0; i--) {
          if (pages[i].startingAddress <= address && address <= pages[i].endingAddress) {
            return pages[i];
          }
        }
    */
  }


  /**
   * @param {number} address
   */
  readByte(address) {
    const page = this.pageForAddress(address);
    return page.read(address);
  }

  readBytes(address, length) {
    return Array.from({length}, (_, idx) => this.readByte(address + idx));
  }

  /**
   * @param {number} address
   */
  readUnmappedByte(address) {
    const page = this[_pages][(address & 0b1111100000000000000) >> 14];
    return page.read(address);
  }

  /**
   * @param {number} address
   */
  readWord(address) {
    const page = this.pageForAddress(address);
    return (page.read(address) << 8) + page.read(address + 1);
  }

  /**
   * @param {number} address
   * @param {number} value
   * @param {boolean} [override = false] If true, override ROM
   */
  writeByte(address, value, override = false) {
    const page = this.pageForAddress(address);
    page.write(address, value, override);
  }

  writeUnmappedByte(address, value) {
    const page = this[_pages][(address & 0b1111100000000000000) >> 14];
    return page.write(address, value);
  }

  /**
   * @param {number} address
   * @param {number} value
   * @param {boolean} [override = false] If true, override ROM
   */
  writeWord(address, value) {
    const page = this.pageForAddress(address);
    const hi = (value & 0xFF00) >> 8;
    const lo = (value & 0x00FF);
    page.write(address, hi);
    page.write(address + 1, lo);
  }

  loadFromJS(bin, override = false) {
    bin.forEach(segment => {
      const addr = segment.addr;
      segment.data.forEach((v, i) => {
        this.writeByte(i + addr, v, override);
      });
    });
  }

  /**
   * @param {number} sourceAddress 
   * @param {number} targetAddress 
   * @param {number} length 
   */
  copyWithin(sourceAddress, targetAddress, length) {
    (new Uint8Array(this[_buffer])).copyWithin(targetAddress, sourceAddress, sourceAddress + length);
  }

  /**
   * @param {ArrayBuffer} buffer 
   * @param {number} address 
   */
  setWithin(buffer, address) {
    (new Uint8Array(this[_buffer])).set(buffer, address);
  }

  /**
   * @param {ArrayBuffer} data 
   * @param {number} address 
   * @param {number} length 
   */
  fillWithin(data, address, length) {
    (new Uint8Array(this[_buffer])).fill(data, address, address + length);
  }

  /**
   * @param {number} sourceAddress 
   * @param {number} targetAddress 
   * @param {number} length 
   */
  swapWithin(sourceAddress, targetAddress, length) {
    const source = Uint8Array.from(new Uint8Array(this[_buffer], sourceAddress, length));
    const target = Uint8Array.from(new Uint8Array(this[_buffer], targetAddress, length));

    this.setWithin(source, targetAddress);
    this.setWithin(target, sourceAddress);
  }

  reset(withPattern = false) {
    for (let i = 0; i < this.size; i++) {
      this.writeUnmappedByte(i, withPattern ? (i & 3) * 0x1F : 0x00);
    }
  }
}
