import { Device } from "../core/Device.js";

/******************************************************************************
 *
 * Display Generator
 *
 * The display supports a 640x480 canvas, of which 512x384 is addressable by
 * the user. Depending on the mode, the addressable area is either 256x192 or
 * 512x384px.
 *
 * Supported Modes:
 *  0 - Tiles (32 x 24, equivalent to 256 x 192, 256 colors)
 *  1 - Tiles (64 x 48, equivalent to 512 x 384, 256 colors)
 *  2 - HiRes (256 x 192, 256 colors, 8 bpp)
 *  3 - HiRes (512 x 192, 4 colors, 2 bpp)
 *
 */

const PALETTE_PAGE  = 0x00; // ???_ppppp
const BG_COLOR      = 0x01;
const LAYER_SEL     = 0x02; // Change this to select which layer to read from/write to
const LAYER_SRC     = 0x03; // v_zz_ppppp
const LAYER_CFG     = 0x04; // ss_?_ttttt
const LAYER_BG      = 0x05;
const LAYER_FG      = 0x06;
const LAYER_XOFFSET = 0x07;
const LAYER_YOFFSET = 0x08;
const LAYER_XCROP   = 0x09;
const LAYER_YCROP   = 0x0A;
const LAYER_MODE    = 0x0B; // ?????_mm; mode
const SPRITE_SEL    = 0x0C;
const SPRITE_SRC    = 0x0D; // v_zz_ppppp
const SPRITE_IDX    = 0x0E; // * 64 bytes
const SPRITE_CFG    = 0x0F; // ss_?_ttttt
const SPRITE_DIM    = 0x10; // hhhh_wwww
const SPRITE_BG     = 0x11;
const SPRITE_FG     = 0x12;
const SPRITE_X_HI   = 0x13;
const SPRITE_X_LO   = 0x14;
const SPRITE_Y_HI   = 0x15;
const SPRITE_Y_LO   = 0x16;
/*    OPEN_FOR_EXP  = 0x17; */
/*    OPEN_FOR_EXP  = 0x18; */
const SPRITE_COL_HI = 0x19; // collision high
const SPRITE_COL_LO = 0x1A; // collision lo
const BORDER_COLOR  = 0x1B;
const BORDER_CFG    = 0x1C; // v_?_yyy_xxx
const TRAP_ON_RASTER= 0x1D;
const CURRENT_RASTER= 0x1E;
const RESET_WAIT    = 0x1F;

const VSYNC_TRAP    = 0x88;

const TARGET_FPS = 60;
const SCREEN_COLUMNS = 640;
const SCREEN_ROWS = 480;
const ADDRESSABLE_COLUMNS = 512;
const ADDRESSABLE_ROWS = 384;
const TILE_COLUMNS = 64;
const TILE_ROWS = 48;
const BORDER_WIDTH = (SCREEN_COLUMNS - ADDRESSABLE_COLUMNS) / 2;
const BORDER_HEIGHT = (SCREEN_ROWS - ADDRESSABLE_ROWS) / 2;
const MS_PER_SEC = 1000;
const SAMPLES = 10;

const MODES = {
    FAST: 1,
    SLOW: 2
};

const MIRROR_MAP = {
    [PALETTE_PAGE]: true,
    [BG_COLOR]: true,
    [LAYER_SEL]: true,
    [SPRITE_SEL]: true,
    [SPRITE_COL_HI]: true,
    [SPRITE_COL_LO]: true,
    [BORDER_COLOR]: true,
    [BORDER_CFG]: true,
    [TRAP_ON_RASTER]: true,
    [CURRENT_RASTER]: true,
    [RESET_WAIT]: true,
};


export class Screen extends Device {
    constructor({device = 1, length = 32, controller, memory = undefined, clock = undefined, performance, stats}) {
        super({device, length, controller, memory, clock});

        this._baseDevice = device;
        this._raster = 0;
        this._column = 0;
        this._delta  = 0;
        this._wait   = false;
        this._mode   = MODES.FAST;

        this._performance = performance;
        this._ticksPerRaster = 8; /* good enough guess */
        this._ticksSinceRaster = 0;
        this._ticksPerSecond = 248000; /* guess; will revise */
        this._ticksThisSecond = 0;
        this._ticksLastSecond = 0;

        this._adjustPerformance = true;

        this._lastPerformance = performance.now();
        this._startTime = this._lastPerformance;

        this._stats = stats;

        // the frame is composed of RGBA bytes for 640 x 480 pixels
        this._frame = new Uint8Array(new ArrayBuffer(SCREEN_ROWS * SCREEN_COLUMNS * 4));

        // used for less accurate emulation mode...
        this._pixelFrame = new Uint8Array(new ArrayBuffer(SCREEN_ROWS * SCREEN_COLUMNS));

        // internal configuration
        this._cfg = {};

        this._spritesByLayer = [ [], [], [], [] ];

        this.reset();

    }

    get adjustPerformance() {
        return this._adjustPerformance;
    }
    set adjustPerformance(v) {
        this._adjustPerformance = v;
    }

    get frame() {
        return this._frame;
    }

    get ticksBetweenRasterLines() {
        return this._ticksPerRaster;
    }
    set ticksBetweenRasterLines(v) {
        this._ticksPerRaster = Number(v);
    }

    reset() {
        this._write(PALETTE_PAGE, 29);
        this._write(BG_COLOR, 9);
        this._write(BORDER_CFG, 0x80);
        this._write(BORDER_COLOR, 0x80);
        this._write(TRAP_ON_RASTER, 0x00);
        this._write(CURRENT_RASTER, 0x00);
        this._write(RESET_WAIT, 0);
        this._cfg = {
            layers: Array.from({length: 4}, (_, idx) => ({
                src: (idx === 0 ? 0x80 : 0x00) | (idx + 4), // v_zz_ppppp / visible / z-order / page
                cfg: 28, // ss_?_ttttt - scale / tile
                bg: 0,
                fg: 0xFF,
                mode: 0, //screen mode
                visible: (idx === 0 ? 1 : 0),
                zIndex: idx,
                page: idx + 4,
                scale: 0,
                tilePage: 28,
                yOffset: 0,
                xOffset: 0,
                yWindow: 0,
                xWindow: 0,
            })),
            sprites: Array.from({length: 16}, () => ({
                src: 0,
                idx: 0,
                page: 0,
                zIndex: 0,
                tilePage: 28,
                dimensions: 0, // hhhh_wwww; up to 16x16 tiles
                height: 0,
                width: 0,
                bg: 0,
                fg: 0,
                x: 0, // x-position
                y: 0, // y-position
                scale: 0, // yyyy_xxxx - scale in each direction (multiples; 0 = 1px)
                visible: 0,
                collided: 0, 
            }))
        }
    }

    _read(address = 0) {
        const r = super._read(address);
        if (address > LAYER_SEL && address < SPRITE_SEL) {
            const layer = this._cfg.layers[this._read(LAYER_SEL) & 0x3];
            switch (address) {
                case LAYER_SRC: return layer.src;
                case LAYER_CFG: return layer.cfg;
                case LAYER_BG:  return layer.bg;
                case LAYER_FG:  return layer.fg;
                case LAYER_XOFFSET: return layer.xOffset;
                case LAYER_YOFFSET: return layer.yOffset;
                case LAYER_XCROP: return layer.xWindow;
                case LAYER_YCROP: return layer.yWindow;
                case LAYER_MODE: return layer.mode;
            }
        }
        if (address > SPRITE_SEL && address < SPRITE_COL_HI) {
            const sprite = this._cfg.sprites[this._read(SPRITE_SEL) & 0xF];
            switch (address) {
                case SPRITE_SRC: return sprite.src;
                case SPRITE_CFG: return sprite.cfg;
                case SPRITE_IDX: return sprite.idx;
                case SPRITE_DIM: return sprite.dimensions;
                case SPRITE_FG: return sprite.fg;
                case SPRITE_BG: return sprite.bg;
                case SPRITE_X_HI: return (sprite.x & 0xFF00) >>> 8;
                case SPRITE_X_LO: return (sprite.x & 0x00FF);
                case SPRITE_Y_HI: return (sprite.y & 0xFF00) >>> 8;
                case SPRITE_Y_LO: return (sprite.y & 0x00FF);
            }
        }
        return r;
    }
    _write(address = 0, data = 0) {
        super._write(address, data);
        if (address > LAYER_SEL && address < SPRITE_SEL) {
            const layer = this._cfg.layers[this._read(LAYER_SEL) & 0x3];
            switch (address) {
                case LAYER_SRC: {
                    layer.src = data;
                    layer.visible = (layer.src & 0x80) >>> 7;
                    layer.zIndex = (layer.src & 0b01100000) >>> 5;
                    layer.page = (layer.src & 0b00011111);
                    return;
                }
                case LAYER_CFG: {
                    layer.cfg = data;
                    layer.scale    = (layer.cfg & 0b11000000) >>> 6;
                    layer.tilePage = (layer.cfg & 0b00011111);
                    return;
                }
                case LAYER_BG:  return layer.bg = data;
                case LAYER_FG:  return layer.fg = data;
                case LAYER_XOFFSET: return layer.xOffset = data;
                case LAYER_YOFFSET: return layer.yOffset = data;
                case LAYER_XCROP: return layer.xWindow = data;
                case LAYER_YCROP: return layer.yWindow = data;
                case LAYER_MODE: return layer.mode = data & 0b11;
            }
        }
        if (address > SPRITE_SEL && address < SPRITE_COL_HI) {
            const sprite = this._cfg.sprites[this._read(SPRITE_SEL) & 0xF];
            switch (address) {
                case SPRITE_SRC: {
                    sprite.src = data;
                    sprite.visible = (sprite.src & 0x80) >>> 7;
                    sprite.zIndex = (sprite.src & 0b01100000) >>> 5;
                    sprite.page = (sprite.src & 0b00011111);
                    return;
                }
                case SPRITE_CFG: {
                    sprite.cfg = data;
                    sprite.scale    = (sprite.cfg & 0b11000000) >>> 6;
                    sprite.tilePage = (sprite.cfg & 0b00011111);
                    return;
                }
                case SPRITE_IDX: return sprite.idx = data;
                case SPRITE_DIM: {
                    sprite.dimensions = data;
                    sprite.height = (sprite.dimensions & 0xF0) >>> 4;
                    sprite.width = (sprite.dimensions & 0x0F);
                    return;
                }
                case SPRITE_FG: return sprite.fg = data;
                case SPRITE_BG: return sprite.bg = data;
                case SPRITE_X_HI: return sprite.x = (sprite.x & 0x00FF) | (data << 8);
                case SPRITE_X_LO: return sprite.x = (sprite.x & 0xFF00) | data;
                case SPRITE_Y_HI: return sprite.y = (sprite.y & 0x00FF) | (data << 8);
                case SPRITE_Y_LO: return sprite.y = (sprite.y & 0xFF00) | data;
            }
        }
    }

    pullFromBus(address) {
        super.pullFromBus(address);
        const selectedDevice = (this.ioBus.deviceSelectBus.value - this._baseDevice) << 4;
        const port = address | selectedDevice;
        switch(port) {
            case RESET_WAIT:
                return this.resetWait();
        }
    }

    get mirrored() {
        return MIRROR_MAP;
    }

    resetWait() {
        this._wait = false;
        if (this._stats) this._stats.begin();
        //this._ticksSinceRaster = 0;
    }

    tick() {
        super.tick();
        this._ticksThisSecond++;

        if (this._mode === MODES.FAST) {
            this._ticksSinceRaster++;
            if (this._wait) {
                if (this._ticksSinceRaster > this._ticksPerRaster) {
                    this._ticksSinceRaster -= this._ticksPerRaster;
                    this._raster++;
                    if (this._raster > 480) this._raster = 480;
                }
                this._write(CURRENT_RASTER, this._raster >> 1);
                return;
            }
            this._spritesByLayer = this._getSprites();
            this._generateScreen();
            this._raster = 0;
            this._wait = true;
            this.requestService();
            this._write(CURRENT_RASTER, this._raster >> 1);
            this._adjustRasterSpeed();
        } else {
            this._ticksSinceRaster++;
            if (this._wait) return;
            if (this._ticksSinceRaster >= this._ticksPerRaster) {
                this._ticksSinceRaster -= this._ticksPerRaster;
                    this._generateRasterLine();
                    this._raster++;
                    if (this._raster > SCREEN_ROWS) {
                        if (this._stats) this._stats.end();
                        if (this._stats) this._stats.begin();
                        this._raster = 0;
                        this._wait = true;
                        this._spritesByLayer = this._getSprites();
                    }
                    if (this._raster === (this._read(TRAP_ON_RASTER) << 1)) {
                        this.requestService();
                    }
                this._write(CURRENT_RASTER, this._raster >> 1);
                this._adjustRasterSpeed();
            }
        }
    }

    _getLayers() {
        return this._cfg.layers;
    }

    _getSprites() {
        const spritesByLayer = [ [], [], [], [] ];
        const sprites = this._cfg.sprites;
        for (let i = 0; i < 16; i++) {
            const sprite = sprites[i];
            if (sprite.visible === 1) 
                sprite.pageAddr = (sprite.page << 14) + (sprite.idx << 8);
                sprite.tilePageAddr = sprite.tilePage << 14;
                sprite.xOffset = sprite.x - (sprite.x > 32767 ? 65536 : 0);
                sprite.yOffset = sprite.y - (sprite.y > 32767 ? 65536 : 0);
                sprite.maxWidth = sprite.width << 3;
                sprite.maxHeight = sprite.height << 3;
                spritesByLayer[sprite.zIndex & 0x3].push(sprite);
        }
        return spritesByLayer;
    }

    _generateScreen() {
        if (this._stats) this._stats.begin();
        // if we want, we can render the whole screen at once. This isn't as "true" to
        // the spirit of Retroputer's lower-level screen generator, but in _most_ cases
        // it's close enough. It's also WAY more performant.
        const palettePage = this._read(PALETTE_PAGE);
        const paletteAddr = palettePage << 14;
        const bgColor = this._read(BG_COLOR);
        const borderCfg = this._read(BORDER_CFG);
        const borderColor = (borderCfg & 0b10000000) ? this._read(BORDER_COLOR) : bgColor;
        const extraBorderWidth  = (borderCfg & 0b00000111) << 1; // border width is * 2
        const extraBorderHeight = (borderCfg & 0b00111000) >> 2; // same for height
        const trapOnRaster = this._read(TRAP_ON_RASTER);
        const currentRaster = this._raster;
        const layers = this._getLayers();
        let spritesByLayer = this._spritesByLayer;

        // draw the background
        this._pixelFrame.fill(bgColor);

        // draw each layer and attendant sprites
        for (let layerIdx = 0; layerIdx < 4; layerIdx++) {
            const layer = layers[layerIdx];
            const sprites = spritesByLayer[layerIdx];
            if (layer.visible) {
                const pageAddr = layer.page << 14;
                const tilePageAddr = layer.tilePage << 14;
                const halfWidth = (layer.mode & 1) === 0;
                const maxWidth = (SCREEN_COLUMNS - (BORDER_WIDTH << 1)) >> halfWidth;
                const maxHeight = (SCREEN_ROWS - (BORDER_HEIGHT << 1)) >> halfWidth;

                const xOffset = layer.xOffset - ((layer.xOffset > 127) << 8) << halfWidth;
                const yOffset = layer.yOffset - ((layer.yOffset > 127) << 8) << halfWidth;

                const xLeftCrop = layer.xWindow << halfWidth;
                const xRightCrop = maxWidth - xLeftCrop;
                const yTopCrop = layer.yWindow << halfWidth;
                const yBottomCrop = maxHeight - yTopCrop;

                if (layer.mode >= 2) {
                    // hi-res modes

                } else {
                    // text modes
                    const rows = 24 * (layer.mode + 1);
                    const cols = 32 * (layer.mode + 1);
                    for (let row = rows - 1; row >= 0; row--) {
                        for (let col = cols - 1; col >= 0; col--) {
                            const tilePos = (row << (5 + (layer.mode !== 0))) + col;
                            const tile = this.memory.readUnmappedByte(pageAddr + tilePos)
                            const tileFgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x1000);
                            const tileBgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x2000);
                            const scale = halfWidth << layer.scale;
                            for (let _y = 7; _y >= 0; _y--) {
                                for (let _x = 7; _x >= 0; _x--) {
                                    const x = BORDER_WIDTH + (((col * 8) + _x) << scale) + xOffset;
                                    const y = BORDER_HEIGHT + (((row * 8) + _y) << scale) + yOffset;
                                    const offset = y * SCREEN_COLUMNS + x;
                                    let tilePixel = this.memory.readUnmappedByte(tilePageAddr + (tile << 6) + (_y << 3) + _x);

                                    if (tilePixel === 0x00) tilePixel = tileBgColor;
                                    if (tilePixel === 0xFF) tilePixel = tileFgColor;
                                    if (tilePixel === 0x00) tilePixel = layer.bg;
                                    if (tilePixel === 0xFF) tilePixel = layer.fg;
                                    if (tilePixel !== 0) {
                                        for (let sY = (1 << scale) - 1; sY >= 0; sY--) {
                                            for (let sX = (1 << scale) - 1; sX >= 0; sX--) {
                                                const offset = (y + sY) * SCREEN_COLUMNS + (x + sX);
                                                this._pixelFrame[offset] = tilePixel;
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }

                } 
            }
            for (let spriteIdx = sprites.length - 1; spriteIdx >= 0; spriteIdx--) {
                const sprite = sprites[spriteIdx];
                if (sprite.visible) {
                    const rows = sprite.height;
                    const cols = sprite.width;
                    for (let row = rows - 1; row >= 0; row--) {
                        for (let col = cols - 1; col >= 0; col--) {
                            const tilePos = (row * cols) + col;
                            const tile = this.memory.readUnmappedByte(sprite.pageAddr + tilePos)
                            const tileFgColor = this.memory.readUnmappedByte(sprite.pageAddr + tilePos + 0x40);
                            const tileBgColor = this.memory.readUnmappedByte(sprite.pageAddr + tilePos + 0x80);
                            const scale = sprite.scale;
                            for (let _y = 7; _y >= 0; _y--) {
                                for (let _x = 7; _x >= 0; _x--) {
                                    const x = (((col * 8) + _x) << scale) + sprite.xOffset;
                                    const y = (((row * 8) + _y) << scale) + sprite.yOffset;
                                    const offset = y * SCREEN_COLUMNS + x;
                                    let tilePixel = this.memory.readUnmappedByte(sprite.tilePageAddr + (tile << 6) + (_y << 3) + _x);

                                    if (tilePixel === 0x00) tilePixel = tileBgColor;
                                    if (tilePixel === 0xFF) tilePixel = tileFgColor;
                                    if (tilePixel === 0x00) tilePixel = sprite.bg;
                                    if (tilePixel === 0xFF) tilePixel = sprite.fg;
                                    if (tilePixel !== 0) {
                                        for (let sY = (1 << scale) - 1; sY >= 0; sY--) {
                                            for (let sX = (1 << scale) - 1; sX >= 0; sX--) {
                                                const offset = (y + sY) * SCREEN_COLUMNS + (x + sX);
                                                this._pixelFrame[offset] = tilePixel;
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                    
                }
            }
        }


        // at the end, convert to 24-bit color
        for (let y = SCREEN_ROWS - 1; y >= 0; y--) {
            for (let x = SCREEN_COLUMNS - 1; x >= 0; x--) {
                const offset = y * SCREEN_COLUMNS + x;
                const curPixelColor = (y < BORDER_HEIGHT + extraBorderHeight) ||
                                      (y > SCREEN_ROWS - (BORDER_HEIGHT + extraBorderHeight)) ||
                                      (x < BORDER_WIDTH + extraBorderWidth) ||
                                      (x > SCREEN_COLUMNS - (BORDER_WIDTH + extraBorderWidth)) ?
                                      borderColor : this._pixelFrame[offset];
                const paletteOffset = curPixelColor << 2;
                const r = this.memory.readUnmappedByte(paletteAddr + paletteOffset + 0);
                const g = this.memory.readUnmappedByte(paletteAddr + paletteOffset + 1);
                const b = this.memory.readUnmappedByte(paletteAddr + paletteOffset + 2);

                const frameOffset = offset * 4;
                this._frame[frameOffset + 0] = r;
                this._frame[frameOffset + 1] = g;
                this._frame[frameOffset + 2] = b;
                this._frame[frameOffset + 3] = 0xFF;
            }
        }
        if (this._stats) this._stats.end();
    }

    _generateRasterLine() {
        // load in the configuration settings from our ports
        const palettePage = this._read(PALETTE_PAGE);
        const paletteAddr = palettePage << 14;
        const bgColor = this._read(BG_COLOR);
        const borderCfg = this._read(BORDER_CFG);
        const borderColor = (borderCfg & 0b10000000) ? this._read(BORDER_COLOR) : bgColor;
        const extraBorderWidth  = (borderCfg & 0b00000111) << 1; // border width is * 2
        const extraBorderHeight = (borderCfg & 0b00111000) >> 2; // same for height
        const trapOnRaster = this._read(TRAP_ON_RASTER);
        const currentRaster = this._raster;
        const layers = this._getLayers();
        let spritesByLayer = this._spritesByLayer;

        const y = currentRaster;
        let i = 0, j = 0, l = 0;
        let curPixelColor = 0, tempPixelColor = 0;
        let r = 0, g = 0, b = 0, paletteOffset, frameOffset;
        let layer;
        let charCol, charColX, charRow, charRowY, tilePos, tile, tilePixel, tileFgColor, tileBgColor;
        let aX, aY;
        let pageAddr, tilePageAddr;
        let halfWidth;
        let whichBit;
        let maxWidth = 0, maxHeight = 0;
        let xOffset = 0, yOffset = 0;
        let xLeftCrop = 0, xRightCrop = 0;
        let yTopCrop = 0, yBottomCrop = 0;
        let sprites = [];
        let sprite;

        for (let x = 0; x < SCREEN_COLUMNS; x++) {
            if ((x < BORDER_WIDTH + extraBorderWidth) || (x >= ADDRESSABLE_COLUMNS + BORDER_WIDTH - extraBorderWidth)) {
                curPixelColor = borderColor;
            } else if ((y < BORDER_HEIGHT + extraBorderHeight) || (y >= ADDRESSABLE_ROWS + BORDER_HEIGHT - extraBorderHeight)) {
                curPixelColor = borderColor;
            } else {
                curPixelColor = bgColor;

                for (i = 0; i < 4; i++) {
                    layer = layers[i];
                    if (layer.visible === 1) {
                        pageAddr = layer.page << 14;
                        tilePageAddr = layer.tilePage << 14;
                        halfWidth = (layer.mode & 1) === 0;
                        maxWidth = (SCREEN_COLUMNS - (BORDER_WIDTH << 1)) >> halfWidth;
                        maxHeight = (SCREEN_ROWS - (BORDER_HEIGHT << 1)) >> halfWidth;

                        xOffset = layer.xOffset - ((layer.xOffset > 127) << 8) << halfWidth;
                        yOffset = layer.yOffset - ((layer.yOffset > 127) << 8) << halfWidth;

                        xLeftCrop = layer.xWindow << halfWidth;
                        xRightCrop = maxWidth - xLeftCrop;
                        yTopCrop = layer.yWindow << halfWidth;
                        yBottomCrop = maxHeight - yTopCrop;

                        aX = ((x - BORDER_WIDTH) - xOffset) >> halfWidth >> layer.scale;
                        aY = ((y - BORDER_HEIGHT) - yOffset) >> halfWidth >> layer.scale;

                        if (aX < xLeftCrop || aX >= xRightCrop) tempPixelColor = 0
                        else if (aY < yTopCrop || aY >= yBottomCrop) tempPixelColor = 0
                        else if (layer.mode >= 2) {
                            tempPixelColor = this.memory.readUnmappedByte(pageAddr + (aY << 8) + aX);
                        } else {
                            charCol = aX >>> 3;
                            charColX = aX & 0x07;
                            charRow = aY >>> 3;
                            charRowY = aY & 0x07;
                            tilePos = (charRow << (5 + (layer.mode !== 0))) + charCol;
                            tile = this.memory.readUnmappedByte(pageAddr + tilePos)
                            tilePixel = this.memory.readUnmappedByte(tilePageAddr + (tile << 6) + (charRowY << 3) + charColX);
                            tileFgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x1000);
                            tileBgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x2000);

                            if (tilePixel === 0x00) tempPixelColor = tileBgColor;
                            else if (tilePixel === 0xFF) tempPixelColor = tileFgColor;
                            else tempPixelColor = tilePixel;
                            if (tempPixelColor === 0x00) tempPixelColor = layer.bg
                            else if (tempPixelColor === 0xFF) tempPixelColor = layer.fg;
                        }
                        curPixelColor = tempPixelColor !== 0 ? tempPixelColor : curPixelColor;
                    }
                    sprites = spritesByLayer[i];
                    for (j = 0, l = sprites.length; j < l; j++) {
                        sprite = sprites[j];
                        if (sprite.visible === 1) {
                            pageAddr = sprite.pageAddr; //(sprite.page << 14) + (sprite.idx << 8);
                            tilePageAddr = sprite.tilePageAddr; //sprite.tilePage << 14;
                            xOffset = sprite.xOffset; //sprite.x - (sprite.x > 32767 ? 65536 : 0);
                            yOffset = sprite.yOffset; //sprite.y - (sprite.y > 32767 ? 65536 : 0);
                            maxWidth = sprite.maxWidth; //sprite.width << 3;
                            maxHeight = sprite.maxHeight; //sprite.height << 3;

                            aX = (x - xOffset) >> sprite.scale;
                            aY = (y - yOffset) >> sprite.scale;


                            tempPixelColor = 0;
                            if ((aX >= 0 && aX < maxWidth) && (aY >= 0 && aY < maxHeight)) {
                                charCol = aX >>> 3;
                                charColX = aX & 0x07;
                                charRow = aY >>> 3;
                                charRowY = aY & 0x07;
                                tilePos = (charRow * sprite.width) + charCol;
                                tile = this.memory.readUnmappedByte(pageAddr + tilePos)
                                tilePixel = this.memory.readUnmappedByte(tilePageAddr + (tile << 6) + (charRowY << 3) + charColX);
                                tileFgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x0040);
                                tileBgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x0080);
                                if (tilePixel === 0x00) tempPixelColor = tileBgColor;
                                else if (tilePixel === 0xFF) tempPixelColor = tileFgColor;
                                else tempPixelColor = tilePixel;
                                if (tempPixelColor === 0x00) tempPixelColor = sprite.bg
                                else if (tempPixelColor === 0xFF) tempPixelColor = sprite.fg;
                            }
                            curPixelColor = tempPixelColor !== 0 ? tempPixelColor : curPixelColor;
                        }
                    }
                }
            }

            paletteOffset = curPixelColor << 2;
            r = this.memory.readUnmappedByte(paletteAddr + paletteOffset + 0);
            g = this.memory.readUnmappedByte(paletteAddr + paletteOffset + 1);
            b = this.memory.readUnmappedByte(paletteAddr + paletteOffset + 2);

            frameOffset = (((y << 9) + (y << 7)) + x) << 2;
            this._frame[frameOffset + 0] = r;
            this._frame[frameOffset + 1] = g;
            this._frame[frameOffset + 2] = b;
            this._frame[frameOffset + 3] = 0xFF;
        }
    }

    _adjustRasterSpeed() {
        const now = this._performance.now();
        if (now >= this._lastPerformance + MS_PER_SEC) {
            const delta = (now - this._lastPerformance) / MS_PER_SEC;
            this._lastPerformance = now;

            //const numSeconds = (now - this._startTime) / MS_PER_SEC;
            //this._ticksPerSecond = ((this._ticksPerSecond * SAMPLES) + this._ticksThisSecond) / (SAMPLES + 1);
            this._ticksPerSecond = (this._ticksLastSecond + (this._ticksThisSecond / delta)) / 2;

            if (this.adjustPerformance) {
                this._ticksPerRaster = Math.floor(this._ticksPerSecond / (TARGET_FPS * SCREEN_ROWS)) /// 2;
            }
            this._ticksLastSecond = this._ticksThisSecond / delta;
            this._ticksThisSecond = 0;
        }
    }
}