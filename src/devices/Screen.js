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
const BORDER_WIDTH = (SCREEN_COLUMNS - ADDRESSABLE_COLUMNS) / 2;
const BORDER_HEIGHT = (SCREEN_ROWS - ADDRESSABLE_ROWS) / 2;
const MS_PER_SEC = 1000;
const SAMPLES = 10;

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
    constructor({device = 1, length = 32, controller, memory = undefined, clock = undefined, performance}) {
        super({device, length, controller, memory, clock});

        this._baseDevice = device;
        this._raster = 0;
        this._column = 0;
        this._delta  = 0;
        this._wait   = false;

        this._performance = performance;
        this._ticksPerRaster = 50; /* good enough guess */
        this._ticksSinceRaster = 0;
        this._ticksPerSecond = 1500000; /* guess; will revise */
        this._ticksThisSecond = 0;

        this._lastPerformance = performance.now();
        this._startTime = this._lastPerformance;

        // the frame is composed of RGBA bytes for 640 x 480 pixels
        this._frame = new Uint8Array(new ArrayBuffer(SCREEN_ROWS * SCREEN_COLUMNS * 4));

        // internal configuration
        this._cfg = {};

        this._spritesByLayer = [ [], [], [], [] ];

        this.reset();

    }

    get frame() {
        return this._frame;
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
        //this._ticksSinceRaster = 0;
    }

    tick() {
        super.tick();
        this._ticksThisSecond++;
        this._ticksSinceRaster++;
        if (this._wait) return;
        if (this._ticksSinceRaster >= this._ticksPerRaster) {
            this._ticksSinceRaster = 0;
            //if (!this._wait) {
                this._generateRasterLine();
                this._raster++;
                if (this._raster > SCREEN_ROWS) {
                    this._raster = 0;
                    this._wait = true;
                    this._spritesByLayer = this._getSprites();
                }
                if (this._raster === (this._read(TRAP_ON_RASTER) << 1)) {
                    this.requestService();
                }
           // }
            this._write(CURRENT_RASTER, this._raster >> 1);
            this._adjustRasterSpeed();
        }
    }

    _getLayers() {
        let layers = [
            this._cfg.layers[0],
            this._cfg.layers[1],
            this._cfg.layers[2],
            this._cfg.layers[3]
        ];
        layers.sort((a, b) => a.zIndex - b.zIndex);
        return layers;
    }

    _getSprites() {
        const spritesByLayer = [ [], [], [], [] ];
        const sprites = this._cfg.sprites;
        for (let i = 0; i < 16; i++) {
            const sprite = sprites[i];
            if (sprite.visible === 1) 
                spritesByLayer[sprite.zIndex & 0x3].push(sprite);
        }
        return spritesByLayer;
    }

    _generateRasterLine() {
        // load in the configuration settings from our ports
        const palettePage = this._read(PALETTE_PAGE);
        const paletteAddr = palettePage << 14;
        const bgColor = this._read(BG_COLOR);
        const borderColor = this._read(BORDER_COLOR);
        const borderCfg = this._read(BORDER_CFG);
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
                        halfWidth = ((layer.mode & 1) === 0 ? 1 : 0);
                        maxWidth = (SCREEN_COLUMNS - (BORDER_WIDTH << 1)) >> halfWidth;
                        maxHeight = (SCREEN_ROWS - (BORDER_HEIGHT << 1)) >> halfWidth;

                        xOffset = layer.xOffset - (layer.xOffset > 127 ? 256 : 0) << halfWidth;
                        yOffset = layer.yOffset - (layer.yOffset > 127 ? 256 : 0) << halfWidth;

                        xLeftCrop = layer.xWindow << halfWidth;
                        xRightCrop = maxWidth - xLeftCrop;
                        yTopCrop = layer.yWindow << halfWidth;
                        yBottomCrop = maxHeight - yTopCrop;

                        aX = ((x - BORDER_WIDTH) - xOffset) >> halfWidth >> layer.scale;
                        aY = ((y - BORDER_HEIGHT) - yOffset) >> halfWidth >> layer.scale;

                        if (aX < xLeftCrop || aX >= xRightCrop) tempPixelColor = 0
                        else if (aY < yTopCrop || aY >= yBottomCrop) tempPixelColor = 0
                        else {
                            switch(layer.mode) {
                                case 0:
                                case 1:
                                    charCol = aX >>> 3;
                                    charColX = aX & 0x07;
                                    charRow = aY >>> 3;
                                    charRowY = aY & 0x07;
                                    tilePos = (charRow << (layer.mode === 0 ? 5 : 6)) + charCol;
                                    tile = this.memory.readUnmappedByte(pageAddr + tilePos)
                                    tilePixel = this.memory.readUnmappedByte(tilePageAddr + (tile << 6) + (charRowY << 3) + charColX);
                                    tileFgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x1000);
                                    tileBgColor = this.memory.readUnmappedByte(pageAddr + tilePos + 0x2000);
                                    if (tilePixel === 0x00) tempPixelColor = tileBgColor;
                                    else if (tilePixel === 0xFF) tempPixelColor = tileFgColor;
                                    else tempPixelColor = tilePixel;
                                    if (tempPixelColor === 0x00) tempPixelColor = layer.bg
                                    else if (tempPixelColor === 0xFF) tempPixelColor = layer.fg;
                                    break;
                                case 2:
                                    tempPixelColor = this.memory.readUnmappedByte(pageAddr + (aY << 8) + aX);
                                    break;
                                case 3:
                                    tempPixelColor = this.memory.readUnmappedByte(pageAddr + (aY << 7) + (aX >> 2));
                                    whichBit = aX & 0b11;
                                    tempPixelColor = (0b11 << (whichBit * 2)) >> (whichBit * 2) << 6;
                                    break;
                            }
                        }
                        curPixelColor = tempPixelColor !== 0 ? tempPixelColor : curPixelColor;
                    }
                    sprites = spritesByLayer[i];
                    for (j = 0, l = sprites.length; j < l; j++) {
                        sprite = sprites[j];
                        if (sprite.visible === 1) {
                            pageAddr = (sprite.page << 14) + (sprite.idx << 8);
                            tilePageAddr = sprite.tilePage << 14;
                            xOffset = sprite.x - (sprite.x > 32767 ? 65536 : 0);
                            yOffset = sprite.y - (sprite.y > 32767 ? 65536 : 0);

                            aX = ((x - BORDER_WIDTH) - xOffset) >> sprite.scale;
                            aY = ((y - BORDER_HEIGHT) - yOffset) >> sprite.scale;

                            maxWidth = sprite.width << 3;
                            maxHeight = sprite.height << 3;

                            tempPixelColor = 0;
                            if ((aX >= 0 && aY < maxWidth) && (aY >= 0 && aY < maxHeight)) {
                                charCol = aX >>> 3;
                                charColX = aX & 0x07;
                                charRow = aY >>> 3;
                                charRowY = aY & 0x07;
                                tilePos = (charRow << 6) + charCol;
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
            const delta = now - this._lastPerformance;
            this._lastPerformance = now;

            //const numSeconds = (now - this._startTime) / MS_PER_SEC;
            //this._ticksPerSecond = ((this._ticksPerSecond * SAMPLES) + this._ticksThisSecond) / (SAMPLES + 1);
            this._ticksPerSecond = (this._ticksPerSecond + this._ticksThisSecond) / 2;
            this._ticksThisSecond = 0;

            this._ticksPerRaster = Math.floor(this._ticksPerSecond / (TARGET_FPS * SCREEN_ROWS));
        }
    }
}