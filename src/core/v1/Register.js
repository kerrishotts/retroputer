export default class Register {

  constructor (name, size) {
    this.name = name;
    this.size = size;
    this._mask = [0x03, 0xFF, 0xFFFF][size];
    this._data = 0;
  }

  get U2() {
    return this._data & 0x03;
  }

  get U8() {
    return this._data & 0xFF;
  }

  set U8(value) {
    this._data = (this._data & 0xFF00) | (value & 0xFF);
  }

  get U16() {
    return this._data & this._mask;
  }

  set U16(value) {
    this._data = value & this._mask;
  }
}