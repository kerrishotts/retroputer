import Memory from "./Memory.js";

 export default class Screen {
  constructor(id, memory) {
    var width = 320, height = 200, layout = memory.layout;
    this._layout = {
      backgroundColor: layout.backgroundColor - layout.screenConfigStart,
      tileForeground: layout.tileForeground - layout.screenConfigStart,
      tileBackground: layout.tileBackground - layout.screenConfigStart,
      tileSetOffsetY: layout.tileSetOffsetY - layout.screenConfigStart,
      tileSetOffsetX: layout.tileSetOffsetX - layout.screenConfigStart,
      borderSizeY: layout.borderSizeY - layout.screenConfigStart,
      borderSizeX: layout.borderSizeX - layout.screenConfigStart,
      borderColor: layout.borderColor - layout.screenConfigStart,
      tileSet: layout.tileSet - layout.screenConfigStart,
      graphicsDisplay: layout.graphicsDisplay - layout.screenConfigStart,
      tileDisplay: layout.tileDisplay - layout.screenConfigStart,
      tilePage: layout.tilePage - layout.screenConfigStart
    };

    this._width = width;
    this._height = height;
    this._tileWidth = 8;
    this._tileHeight = 8;
    this._tileColumns = width / this._tileWidth;
    this._tileRows = height / this._tileHeight;
    this._screen = document.getElementById(id);
    this._screen_ctx = this._screen.getContext("2d");
    this._screen.setAttribute("width", width);
    this._screen.setAttribute("height", height);
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute("width", width);
    this._canvas.setAttribute("height", height);
    this._canvas_ctx = this._canvas.getContext("2d");

    // the screen occupies the second block of memory
    this._memory = memory.range(layout.graphicsStart,
                                layout.graphicsLength);

    // the palette is 256 entries of rgba bytes
    this._palette = memory.range32(layout.paletteStart,
                                   layout.paletteLength32);

    // configuration settings
    this._config = memory.range(layout.screenConfigStart,
                                layout.screenConfigLength);

    // tilesets
    this._tilesets = memory.range(layout.tileSetsStart,
                                  layout.tileSetsLength);

    this._tiles = memory.range(layout.tilePagesStart,
                               layout.tilePagesLength);

    // we also need the 32-bit array that the canvas will use
    this._frameData = this._canvas_ctx.getImageData(0, 0, 
                          width, height);
    this._frameBuf = new ArrayBuffer(this._frameData.data.length);
    this._frame = new Uint32Array(this._frameBuf);
    this._frame8 = new Uint8ClampedArray(this._frameBuf);    

    // set up our initial values
    this.init();
  }

  init() {
    this.initPalette();
    this.initScreenConfiguration();
  }

  initPalette() {
    var r, g, b, a, m, 
        ma = [0, 127, 191, 255];

    for (var i = 0; i < 256; i++) {
      m = ma[(((i & 0xC0) >> 6))];
      r = ma[((i & 0x30) >> 4)];// || m;
      g = ma[((i & 0x0C) >> 2)];// || m;
      b = ma[((i & 0x03) >> 0)];// || m;

      Memory.poke(this._palette, i, (255 << 24) |
                                    (b << 16) |
                                    (g << 8) |
                                    (r));
    }
  }

  initScreenConfiguration() {
    Memory.poke(this._config, this._layout.backgroundColor, 0x01); // dark blue
    Memory.poke(this._config, this._layout.tileForeground, 0xFF); // white
    Memory.poke(this._config, this._layout.tileBackground, 0x00); // black
    Memory.poke(this._config, this._layout.tileSetOffsetX, 0x00);
    Memory.poke(this._config, this._layout.tileSetOffsetY, 0x00);
    Memory.poke(this._config, this._layout.borderSizeX, 0x08); // 8px wide
    Memory.poke(this._config, this._layout.borderSizeY, 0x08); // 8px high
    Memory.poke(this._config, this._layout.borderColor, 0x09); //
    Memory.poke(this._config, this._layout.tileSet, 0x00); // first tileset
    Memory.poke(this._config, this._layout.graphicsDisplay, 0x00); // no graphics
    Memory.poke(this._config, this._layout.tileDisplay, 0x00); // behind graphics
    Memory.poke(this._config, this._layout.tilePage, 0x00); // zero tile page
  }

  update() {
    var tileForegroundColor = 
          this._config[this._layout.tileForeground],
        tileBackgroundColor = 
          this._config[this._layout.tileBackground],
        backgroundColor = this._config[this._layout.backgroundColor],
        borderSizeX = this._config[this._layout.borderSizeX],
        borderSizeY = this._config[this._layout.borderSizeY],
        borderColor = this._config[this._layout.borderColor],
        graphicsDisplay = this._config[this._layout.graphicsDisplay],
        tileDisplay = this._config[this._layout.tileDisplay],
        tileSet = this._config[this._layout.tileSet],
        tileSetBase = tileSet * 16384,
        tilePage = this._config[this._layout.tilePage],
        tilePageBase = tilePage * 1024,
        //todo: need to sign these two
        tileSetOffsetX = this._config[this._layout.tileSetOffsetX], 
        tileSetOffsetY = this._config[this._layout.tileSetOffsetY],
        leftBorder = borderSizeX, 
        rightBorder = this._width - borderSizeX,
        topBorder = borderSizeY, 
        bottomBorder = this._height - borderSizeY,
        displayOrder = tileDisplay & 0x01,
        color, addr, gpix, tpix, tile, tileSetAddr, pix;

    for (var y = 0; y < this._height; y++) {
      for (var x = 0; x < this._width; x++) {

        // get the tile index
        addr = ((y >> 3) * this._tileColumns) + (x >> 3);
        tile = this._tiles[tilePageBase + addr]; 
        
        // get the tile pixel
        tileSetAddr = ((y & 0x07) << 3) + (x & 0x07) +
                      (tile << 6); // tile*64

        tpix = this._tilesets[tileSetBase + tileSetAddr];

        if (tpix === 0x00 || tpix === 0xFF) {
          tpix = (tpix & 0x01) === 1 ? tileForegroundColor 
                                     : tileBackgroundColor;
        }

        tpix = (tileDisplay === 2) ? 0 : tpix;

        // get the graphics pixel
        addr = (y*this._width) + x;
        gpix = this._memory[addr];

        gpix = (graphicsDisplay === 1) ? gpix : 0; 

        // which one?
        pix = (displayOrder === 0) ? ((gpix === 0) ? tpix : gpix)
                                   : ((tpix === 0) ? gpix : tpix);

        pix = (pix ===0) ? backgroundColor : pix;

        // handle the border
        if (((x < leftBorder) || (x >= rightBorder)) ||
            ((y < topBorder) || (y >= bottomBorder))) {
          pix = borderColor;
        }

        // store the pixel
        color = this._palette[pix];
        this._frame[addr] = color;
      }
    }   
  }

  draw() {
    this._frameData.data.set(this._frame8);
    this._canvas_ctx.putImageData(this._frameData, 0, 0);
    this._screen_ctx.drawImage(this._canvas, 0, 0);
  }
}