export default class Register {

  constructor (name, size) {
    this.name = name;
    this.size = size;
    this._max = size - 1;
    this._data = new ArrayBuffer(size);
    this._UINT8 = new Uint8ClampedArray(this._data);
  }
  
  get U2() {
    return this.U8 & 0x03;
  }

  get U8() {
    return this._UINT8[this._max];
  }
  
  set U8(value) {
    if (value < 0) { value += 256; }
    this._UINT8[this._max] = value & 0xFF;
  }
  
  get U16() {
    return (this.size > 1) ? (this._UINT8[0] << 8 | this._UINT8[1]) : this.U8;
  }
  
  set U16(value) {
    if (value < 0) { value += 65536; }
    if (this.size > 1) {
      this._UINT8[0] = (value & 0xFF00) >> 8;
      this._UINT8[1] = (value & 0x00FF);
    } else {
      this.U8 = value & 0x00FF;
    }
  }
}