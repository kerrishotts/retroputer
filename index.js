/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/


class CPU {
  constructor(memory) {
    this.registers = {
      bs: 0x00,      // bank-select (BS opcode only)
      a: 0x00,       // accumulator, general purpose
      b: 0x00,       // general purpose
      // ab          // combination of a & b in 16 bits
      c: 0x00,       // general purpose
      d: 0x00,       // general purpose
      // cd          // combination of c & d in 16 bits
      x: 0x00,       // index register, general purpose
      y: 0x00,       // index register, general purpose
      // xy          // index register (x << 8 + y)
      flags: 0x00,   // 8-bit flags register
      sp: 0x0FFF,    // stack pointer
      pc: 0x0000     // program counter
    }
    this.memory = memory;

    this.state = {
      instruction: []
    }
  }

  fetch() {

  }

  decode() {

  }

  execute() {

  }

  sendTrap(trap) {
  }
}


memoryLayout = {
  size:                192
 ,memtop:          0x2FFFF
 ,tileSetsLength:    65536
 ,tileSetLength:     16384
 ,tileSet3:        0x2C000  // tileset 3
 ,tileSet2:        0x28000  // tileset 2
 ,tileSet1:        0x24000  // tileset 1
 ,tileSet0:        0x20000  // 16K 256 8x8 tileset 0  
 ,tileSetsStart:   0x20000
 ,paletteLength:      1024
 ,paletteLength32:     256
 ,paletteStart:    0x1FC00  // 256 x 4 bytes
 ,backgroundColor: 0x1FA0B  // background color for screen
 ,tileForeground:  0x1FA0A  // foreground color for tiles (0xFF)
 ,tileBackground:  0x1FA09  // background color for tiles (0x00)
 ,tileSetOffsetY:  0x1FA08  // signed offset for tiles (y-pos px)
 ,tileSetOffsetX:  0x1FA07  // signed offset for tiles (x-pos px)
 ,borderSizeY:     0x1FA06  // height of vertical border in px
 ,borderSizeX:     0x1FA05  // width of horizontal border in px
 ,borderColor:     0x1FA04  // Border Color
 ,tileSet:         0x1FA03  // Tile set (sourced from 0x2****)
 ,graphicsDisplay: 0x1FA02  // Display graphics? 1 = yes
 ,tileDisplay:     0x1FA01  // Tile display order:
                            //     0 = behind graphics
                            //     1 = in front of graphics
                            //     2 = hidden
 ,tilePage:        0x1FA00  // Tile page: 0=0x0A000; 1=0x0A400
 ,screenConfigLength:  256
 ,screenConfigStart:0x1FA00
 ,graphicsLength:    64000
 ,graphicsStart:   0x10000  // 320 x 200 (64000) bytes
 ,romEnd:          0x0FFFF  // End of ROM
 ,romStart:        0x0C000  // Start of ROM
 ,tilePagesLength:    4096
 ,tilePageLength:     1000
 ,tilePage3:       0x0BC00  // 40x25 tile page 3
 ,tilePage2:       0x0B800  // 40x25 tile page 2
 ,tilePage1:       0x0B400  // 40x25 tile page 1
 ,tilePage0:       0x0B000  // 40x25 tile page 0
 ,tilePagesStart:  0x0B000
 ,codeStart:       0x01000  // Start of code execution
 ,stackTop:        0x00FFF  // top of stack (grows down)
 ,stackMax:        0x00400  // bottom of stack
 ,trapReset:       0x00000  // jump to instruction when reset
                            // default: 0x01000
 ,traps:           0x00000  // 256 2-byte long pointers; ends 0x001FF
 ,membot:          0x00000
}

class Memory {
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

      memory.poke(paletteOffset + (i*4)+0, r);
      memory.poke(paletteOffset + (i*4)+1, g);
      memory.poke(paletteOffset + (i*4)+2, b);
      memory.poke(paletteOffset + (i*4)+3, 255); 
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

class Screen {
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

function log(s) {
  document.getElementById("log").textContent = s;
}

var memory = new Memory(memoryLayout);
memory.init();

// let's put some random dots onscreen
var fc = 1;
function update() {
  var screenOffset = memoryLayout.graphicsStart, addr, val;
  for (var y = 0; y < 200; y++) {
    for (var x = 0; x < 320; x++) {
      addr = screenOffset + (y * 320) + x;
      val = (((y & 0x01) + (x & 0x01)) % 2 )* fc;
      memory.poke(addr, val);
    }
  }
}

// let's create a tile
var tileSet0Offset = memoryLayout.tileSet0;
var tileSet0 = {
  "65": [ 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00,
        0x00, 0xFF, 0xFF, 0x00, 0xFF, 0xFF, 0x00, 0x00,
        0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00,
        0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
        0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
}

tileSet0["65"].forEach(function(v,i) {
  memory.poke(i+tileSet0Offset+(65*64),v)
  console.log([v,i]);
});
for (var row = 0; row < 25; row++) {
  for (var col = 0; col < 40; col++) {
    memory.poke(memoryLayout.tilePage0 + ((row * 40) + col), 65);
  }
}

// and draw it?
var screen = new Screen("screen", memory);
memory.poke(memoryLayout.graphicsDisplay,1);
memory.poke(memoryLayout.tileDisplay,1);
var oldf = 0;
function drawLoop(f) {
    log([f-oldf,f]);
    oldf = f;
    update();
    screen.update();
    screen.draw();
    fc++;
    if (fc<242) { window.requestAnimationFrame(drawLoop);}
}
window.requestAnimationFrame(drawLoop);

/**/