export default class Register {

  constructor (name, size) {
    this.name = name;
    this.size = size;
    this._max = size - 1;
    this._data = new ArrayBuffer(size);
    this._UINT8 = new Uint8ClampedArray(this._data);
    if (this.size > 1) { 
      this._UINT16 = new Uint16Array(this._data);
    }
  }
  
  get U2() {
    return this.U8 && 0x03;
  }

  get U8() {
    return this._UINT8[this._max];
  }
  
  set U8(value) {
    this._UINT8[this._max] = value;
  }
  
  get U16() {
    return (this.size > 1) ? this._UINT16[0] : this.U8;
  }
  
  set U16(value) {
    if (this.size > 1) {
      this._UINT16[0] = value;
    } else {
      this.U8 = value & 0x00FF;
    }
  }
}