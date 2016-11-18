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

  range(addr,len) {
    return new Uint8ClampedArray(this._buf, addr, len);
  }

  range32(addr,len) {
    return new Uint32Array(this._buf, addr, len);
  }

  init() {
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