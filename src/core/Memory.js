import log from "../util/log.js";
import hexUtils from "../util/hexUtils.js";

export default class Memory {
  constructor(layout) {
    this._protected = false;
    this.layout = layout;
    this._buf = new ArrayBuffer(layout.size * 1024);
    this._mem = new Uint8Array(this._buf);
    this._rom = new Uint8Array(this._buf, layout.romStart, layout.romLength);
    this.resetStats();
  }

  get protected() {
    return this._protected;
  }

  set protected(v) {
    this._protected = v;
    if (v) {
      this._rom = this.copyFromRange(this.layout.romStart, this.layout.romLength);
    }
  }

  resetStats() {
    this.stats = {
      readsTotal: 0,
      byteReadsTotal: 0,
      wordReadsTotal: 0,
      writesTotal: 0,
      byteWritesTotal: 0,
      wordWritesTotal: 0,
      lastReadAddr: 0,
      lastWriteAddr: 0,
      lastValueRead: 0,
      lastValueWritten: 0,
    };
  }

  dump() {
    log(`mem stats | reads  8: ${this.stats.byteReadsTotal}  16: ${this.stats.wordReadsTotal}  All: ${this.stats.readsTotal}`);
    log(`mem stats | writes 8: ${this.stats.byteWritesTotal}  16: ${this.stats.wordWritesTotal}  All: ${this.stats.writesTotal}`);
    log(`mem stats | last read: ${hexUtils.toHex4(this.stats.lastValueRead)}@${hexUtils.toHex4(this.stats.lastReadAddr)}  write: ${hexUtils.toHex4(this.stats.lastValueWritten)}@${hexUtils.toHex4(this.stats.lastWriteAddr)}`);
  }

  loadFromJS(data, addrOverride) {
    let addr = data.addr;
    if (addrOverride) {
      addr = addrOverride;
    }
    data.data.forEach((v, i) => {
        this.poke(i + addr, v);
    });
  }

/*
  loadFromBIN(bin) {
    // TODO
  }
*/

  poke(addr, val) {
    addr &= 0x3FFFF;
    let v = (val & 0xFF);
    this._mem[addr] = v;
    this.stats.lastValueWritten = v;
    this.stats.writesTotal++;
    this.stats.byteWritesTotal++;
    this.stats.lastValueWritten = (val & 0xFF);
    this.stats.lastWriteAddr = addr;
  }

  poke16(addr, val) {
    addr &= 0x3FFFF;
    let v = (val & 0xFFFF);
    this._mem[addr] = (v & 0xFF00) >> 8;
    this._mem[addr + 1] = (v & 0x00FF);
    this.stats.writesTotal++;
    this.stats.wordWritesTotal++;
    this.stats.lastValueWritten = v;
    this.stats.lastWriteAddr = addr;
  }

  poke32(addr, val) {
    addr &= 0x3FFFF;
    let v = (val & 0xFFFFFFFF);
    this._mem[addr] = (v & 0xFF000000) >> 24;
    this._mem[addr + 1] = (v & 0x00FF0000) >> 16;
    this._mem[addr + 2] = (v & 0x0000FF00) >> 8;
    this._mem[addr + 3] = (v & 0x000000FF);
    this.stats.writesTotal++;
    this.stats.lastValueWritten = v;
    this.stats.lastWriteAddr = addr;
  }


  peek(addr) {
    addr &= 0x3FFFF;
    let v = this._mem[addr];
    if (this._protected) {
      if (addr >= this.layout.romStart && addr <= this.layout.romEnd) {
        v = this._rom[addr - this.layout.romStart];
      }
    }
    this.stats.readsTotal++;
    this.stats.byteReadsTotal++;
    this.stats.lastValueRead = v;
    this.stats.lastReadAddr = addr;
    return v;
  }

  peek16(addr) {
    addr &= 0x3FFFF;
    let v = (this.peek(addr) << 8) | this.peek(addr + 1);
    this.stats.readsTotal++;
    this.stats.wordReadsTotal++;
    this.stats.lastValueRead = v;
    this.stats.lastReadAddr = addr;
    return v;
  }

  peek32(addr) {
    addr &= 0x3FFFF;
    let v = (this.peek(addr) << 24) | (this.peek(addr + 1) << 16) | (this.peek(addr + 2) << 8) | (this.peek(addr + 3));
    this.stats.readsTotal++;
    this.stats.wordReadsTotal++;
    this.stats.lastValueRead = v;
    this.stats.lastReadAddr = addr;
    return v;
  }

  range(addr,len) {
    if (addr + len <= this.layout.memtop) {
      return new Uint8Array(this._buf, addr, len);
    } else {
      let overflow = (addr + len) - this.layout.memtop;
      len -= overflow;
      if (len < 0) { len = 0; }
      return new Uint8Array(this._buf, addr, len); //.concat(this.copyFromRange(0, overflow));
    }
  }

  copyFromRange(addr,len) {
    return Uint8Array.from(this.range(addr, len));
  }

  copyWithin({src, dest, len} = {}) {
    if (src + len > this.layout.memtop ||
        dest + len > this.layout.memtop) {
          return;
    }
    this._mem.copyWithin(dest, src, src + len);
  }

  fillWithin({value, addr, len} = {}) {
    if (len + addr > this.layout.memtop) {
      return;
    }
    this._mem.fill(value & 0xFF, addr, addr + len);
  }

  setWithin({data, addr} = {}) {
    if (addr + (data.length) > this.layout.memtop) {
      return;
    }
    this._mem.set(data, addr);
  }

  range32(addr,len) {
    return new Uint32Array(this._buf, addr, len);
  }

  init() {
    this.protected = false;
    for (let i = 0; i < (this.layout.size * 1024); i++) {
      // simulate old-style memory being random at boot
      this.poke(i, Math.floor(Math.random() * 256));
    }

    // we need three RETs at known important vectors
    [0x0FE00, 0x0FF00, 0x0FFFF].forEach((addr) => {
      this.poke(addr, 0xFF);
    });

    // All trap vectors initially point at 0xFFFF
    for (let addr = 0; addr < 512; addr++) {
      this.poke(addr, 0xFF);
    }

    // but we do need a valid FRAME and RESET vector
    this.poke16(0x00000, 0xFF00);
    this.poke16(0x001E0, 0xFE00);

    // loading boot ROM is the responsibility of our owner.

  }

/*
  static poke(buffer, addr, val)  {
    buffer[addr] = val;
  }

  static peek(buffer, addr) {
    return buffer[addr];
  }

  static range(buffer, addr, len) {
    return new Uint8Array(buffer, addr, len);
  }

  static range32(buffer, addr, len) {
    return new Uint32Array(buffer, addr, len);
  }
*/
}