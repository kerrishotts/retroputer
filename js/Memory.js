export default class Memory {
  constructor(layout) {
    this.layout = layout;
    this._buf = new ArrayBuffer(layout.size * 1024);
    this._mem = new Uint8ClampedArray(this._buf);
  }

  poke(addr, val) {
    this._mem[addr] = val;
  }

  peek(addr) {
    return this._mem[addr];
  }

  peek16(addr) {
    return (this._mem[addr] << 8) | this._mem[addr+1];
  }

  range(addr,len) {
    return new Uint8ClampedArray(this._buf, addr, len);
  }

  range32(addr,len) {
    return new Uint32Array(this._buf, addr, len);
  }

  init() {
    for (let i=0; i<(this.layout.size*1024); i++) {
      // simulate old-style memory being random at boot
      this.poke(i, Math.floor(Math.random()*256));
    };

    // but we do need a valid reset vector
    this.poke(0, 0xFF);
    this.poke(1, 0x00);

    // and we'll need to load a ROM in soon as well
    // TODO: load boot rom
  }

  static poke(buffer, addr, val)  {
    buffer[addr] = val;
  }

  static peek(buffer, addr) {
    return buffer[addr];
  }

  static range(buffer, addr, len) {
    return new Uint8ClampedArray(buffer, addr, len);
  }

  static range32(buffer, addr, len) {
    return new Uint32Array(buffer, addr, len);
  }

}