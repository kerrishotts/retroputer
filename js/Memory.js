
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

  initPalette() {
    var paletteOffset = this.layout.paletteStart, 
        r, g, b, a, m, 
        ma = [0, 127, 191, 255];

    for (var i = 0; i < 256; i++) {
      m = ma[(((i & 0xC0) >> 6))];
      r = ma[((i & 0x30) >> 4)];// || m;
      g = ma[((i & 0x0C) >> 2)];// || m;
      b = ma[((i & 0x03) >> 0)];// || m;

      this.poke(paletteOffset + (i*4)+0, r);
      this.poke(paletteOffset + (i*4)+1, g);
      this.poke(paletteOffset + (i*4)+2, b);
      this.poke(paletteOffset + (i*4)+3, 255); 
    }
  }

  initScreenConfiguration() {
    this.poke(this.layout.backgroundColor, 0x01); // dark blue
    this.poke(this.layout.tileForeground, 0xFF); // white
    this.poke(this.layout.tileBackground, 0x00); // black
    this.poke(this.layout.tileSetOffsetX, 0x00);
    this.poke(this.layout.tileSetOffsetY, 0x00);
    this.poke(this.layout.borderSizeX, 0x08); // 8px wide
    this.poke(this.layout.borderSizeY, 0x08); // 8px high
    this.poke(this.layout.borderColor, 0x09); //
    this.poke(this.layout.tileSet, 0x00); // first tileset
    this.poke(this.layout.graphicsDisplay, 0x00); // no graphics
    this.poke(this.layout.tileDisplay, 0x00); // behind graphics
    this.poke(this.layout.tilePage, 0x00); // zero tile page
  }
  
  init() {
    this.initPalette();
    this.initScreenConfiguration();
  }
}