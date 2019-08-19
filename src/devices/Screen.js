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
const LAYER0_SRC    = 0x02; // v_zz_ppppp
const LAYER0_CFG    = 0x03; // ss_?_ttttt
const LAYER0_POS    = 0x04; // yyyy_xxxx
const LAYER0_BG     = 0x05;
const LAYER0_FG     = 0x06;
const LAYER0_WINDOW = 0x07; // yyyy_xxxx
const LAYER1_SRC    = 0x08;
const LAYER1_CFG    = 0x09;
const LAYER1_POS    = 0x0A;
const LAYER1_BG     = 0x0B;
const LAYER1_FG     = 0x0C;
const LAYER1_WINDOW = 0x0D;
const LAYER2_SRC    = 0x0E;
const LAYER2_CFG    = 0x0F;
const LAYER2_POS    = 0x10;
const LAYER2_BG     = 0x11;
const LAYER2_FG     = 0x12;
const LAYER2_WINDOW = 0x13;
const LAYER3_SRC    = 0x14;
const LAYER3_CFG    = 0x15;
const LAYER3_POS    = 0x16;
const LAYER3_BG     = 0x17;
const LAYER3_FG     = 0x18;
const LAYER3_WINDOW = 0x19;
const LAYER_MODES   = 0x1A; // 0b33_22_11_00
const BORDER_COLOR  = 0x1B;
const BORDER_CFG    = 0x1C; // v_?_yyy_xxx
const TRAP_ON_RASTER= 0x1D;
const CURRENT_RASTER= 0x1E;
const RESET_WAIT    = 0x1F;
/*    OPEN_FOR_EXP  = 0x1F; */

const MIRROR_MAP = {
    [PALETTE_PAGE]: true,
    [BG_COLOR]: true,
    [LAYER0_SRC]: true,
    [LAYER0_CFG]: true,
    [LAYER0_POS]: true,
    [LAYER0_BG]: true,
    [LAYER0_FG]: true,
    [LAYER0_WINDOW]: true,
    [LAYER1_SRC]: true,
    [LAYER1_CFG]: true,
    [LAYER1_POS]: true,
    [LAYER1_BG]: true,
    [LAYER1_FG]: true,
    [LAYER1_WINDOW]: true,
    [LAYER2_SRC]: true,
    [LAYER2_CFG]: true,
    [LAYER2_POS]: true,
    [LAYER2_BG]: true,
    [LAYER2_FG]: true,
    [LAYER2_WINDOW]: true,
    [LAYER3_SRC]: true,
    [LAYER3_CFG]: true,
    [LAYER3_POS]: true,
    [LAYER3_BG]: true,
    [LAYER3_FG]: true,
    [LAYER3_WINDOW]: true,
    [LAYER_MODES]: true,
    [BORDER_COLOR]: true,
    [BORDER_CFG]: true,
    [TRAP_ON_RASTER]: true,
    [CURRENT_RASTER]: false,
    [RESET_WAIT]: false
};

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

export class Screen extends Device {
    constructor({device = 1, length = 32, ioBus, memory = undefined, clock = undefined, performance}) {
        super({device, length, ioBus, memory, clock});

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

        this.reset();
    }

    get frame() {
        return this._frame;
    }

    reset() {
        this._write(PALETTE_PAGE, 29);
        this._write(BG_COLOR, 9);
        this._write(BORDER_COLOR, 19);
        this._write(BORDER_CFG, 0x80);
        this._write(LAYER0_SRC, 0b10000100);
        this._write(LAYER0_CFG, 28);
        this._write(LAYER1_SRC, 0b00000101);
        this._write(LAYER1_CFG, 28);
        this._write(LAYER2_SRC, 0b00000110);
        this._write(LAYER2_CFG, 28);
        this._write(LAYER3_SRC, 0b00000111);
        this._write(LAYER3_CFG, 28);
        this._write(LAYER0_BG, 0);
        this._write(LAYER1_BG, 0);
        this._write(LAYER2_BG, 0);
        this._write(LAYER3_BG, 0);
        this._write(LAYER0_FG, 0xFF);
        this._write(LAYER1_FG, 0xFF);
        this._write(LAYER2_FG, 0xFF);
        this._write(LAYER3_FG, 0xFF);
        this._write(LAYER0_POS, 0);
        this._write(LAYER1_POS, 0);
        this._write(LAYER2_POS, 0);
        this._write(LAYER3_POS, 0);
        this._write(LAYER0_WINDOW, 0);
        this._write(LAYER1_WINDOW, 0);
        this._write(LAYER2_WINDOW, 0);
        this._write(LAYER3_WINDOW, 0);
        this._write(LAYER_MODES, 0);
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
    }

    tick() {
        this._ticksSinceRaster++;
        this._ticksThisSecond++;
        if (this._ticksSinceRaster >= this._ticksPerRaster) {
            this._ticksSinceRaster = 0;
            if (!this._wait) {
                this._generateRasterLine();
                this._raster++;
                if (this._raster > SCREEN_ROWS) {
                    this._raster = 0;
                    this._wait = true;
                }
            }
            this._adjustRasterSpeed();
        } 
    }

    _getLayers() {
        let layers = [{
            src: this._read(LAYER0_SRC),
            cfg: this._read(LAYER0_CFG),
            pos: this._read(LAYER0_POS),
            bg:  this._read(LAYER0_BG),
            fg:  this._read(LAYER0_FG),
            win: this._read(LAYER0_WINDOW),
            mode: this._read(LAYER_MODES) & 0b00000011
        },{
            src: this._read(LAYER1_SRC),
            cfg: this._read(LAYER1_CFG),
            pos: this._read(LAYER1_POS),
            bg:  this._read(LAYER1_BG),
            fg:  this._read(LAYER1_FG),
            win: this._read(LAYER1_WINDOW),
            mode: this._read(LAYER_MODES) & 0b00001100
        },{
            src: this._read(LAYER2_SRC),
            cfg: this._read(LAYER2_CFG),
            pos: this._read(LAYER2_POS),
            bg:  this._read(LAYER2_BG),
            fg:  this._read(LAYER2_FG),
            win: this._read(LAYER2_WINDOW),
            mode: this._read(LAYER_MODES) & 0b00110000
        },{
            src: this._read(LAYER3_SRC),
            cfg: this._read(LAYER3_CFG),
            pos: this._read(LAYER3_POS),
            bg:  this._read(LAYER3_BG),
            fg:  this._read(LAYER3_FG),
            win: this._read(LAYER3_WINDOW),
            mode: this._read(LAYER_MODES) & 0b11000000
        }];
        for (let layer of layers) {
            layer.visible  = layer.src & 0b10000000 && 1;
            layer.zIndex   = layer.src & 0b01100000 >>> 5;
            layer.page     = layer.src & 0b00011111;
            layer.scale    = layer.cfg & 0b11000000 >>> 6;
            layer.tilePage = layer.cfg & 0b00011111;
            layer.yOffset  = layer.pos & 0b11110000 >>> 4;
            layer.xOffset  = layer.pos & 0b00001111;
            layer.yWindow  = layer.win & 0b11110000 >>> 4;
            layer.xWindow  = layer.win & 0b00001111;
        }
        layers.sort((a, b) => a.zIndex - b.zIndex);
        return layers;
    }

    _generateRasterLine() {
        // load in the configuration settings from our ports
        const palettePage = this._read(PALETTE_PAGE);
        const paletteAddr = palettePage << 14;
        const bgColor = this._read(BG_COLOR);
        const borderColor = this._read(BORDER_COLOR);
        const borderCfg = this._read(BORDER_CFG);
        const extraBorderWidth  = borderCfg & 0b00000111 << 1; // border width is * 2
        const extraBorderHeight = borderCfg & 0b00111000 >> 2; // same for height
        const trapOnRaster = this._read(TRAP_ON_RASTER);
        const currentRaster = this._raster;
        const layers = this._getLayers();

        const y = currentRaster;
        let i;
        let curPixelColor = 0, tempPixelColor = 0;
        let r = 0, g = 0, b = 0, paletteOffset, frameOffset;
        let layer;
        let charCol, charColX, charRow, charRowY, tilePos, tile, tilePixel, tileFgColor, tileBgColor;
        let aX, aY;
        let pageAddr, tilePageAddr;
        let halfWidth;
        let whichBit;

        for (let x = 0; x < SCREEN_COLUMNS; x++) {
            if ((x < BORDER_WIDTH + extraBorderWidth) || (x > ADDRESSABLE_COLUMNS + BORDER_WIDTH - extraBorderWidth)) {
                curPixelColor = borderColor;
            } else if ((y < BORDER_HEIGHT + extraBorderHeight) || (y > ADDRESSABLE_ROWS + BORDER_HEIGHT - extraBorderHeight)) {
                curPixelColor = borderColor;
            } else {
                curPixelColor = bgColor;

                for (i = 0; i < 4; i++) {
                    layer = layers[i];
                    if (layer.visible) {
                        pageAddr = layer.page << 14;
                        tilePageAddr = layer.tilePage << 14;
                        halfWidth = ((layer.mode & 1) === 0 ? 1 : 0);

                        aX = (x - BORDER_WIDTH + layer.xOffset) >> halfWidth >> layer.scale;
                        aY = (y - BORDER_HEIGHT + layer.yOffset) >> halfWidth >> layer.scale;
                        switch(layer.mode) {
                            case 0:
                            case 1:
                                charCol = aX >>> 3;
                                charColX = aX & 0x07;
                                charRow = aY >>> 3;
                                charRowY = aY & 0x07;
                                tilePos = (aY << (layer.mode === 0 ? 5 : 6)) + aX;
                                tile = this.memory.readByte(pageAddr + tilePos)
                                tilePixel = this.memory.readByte(tilePageAddr + (tile << 6) + (charRowY << 3) + charColX);
                                tileFgColor = this.memory.readByte(pageAddr + tilePos + 0x1000);
                                tileBgColor = this.memory.readByte(pageAddr + tilePos + 0x2000);
                                if (tilePixel === 0x00) tempPixelColor = tileBgColor;
                                else if (tilePixel === 0xFF) tempPixelColor = tileFgColor;
                                else tempPixelColor = tilePixel;
                                if (tempPixelColor === 0x00) tempPixelColor = layer.bg
                                else if (tempPixelColor === 0xFF) tempPixelColor = layer.fg;
                                break;
                            case 2:
                                tempPixelColor = this.memory.readByte(pageAddr + (aY << 8) + aX);
                                break;
                            case 3:
                                tempPixelColor = this.memory.readByte(pageAddr + (aY << 7) + (aX >> 2));
                                whichBit = aX & 0b11;
                                tempPixelColor &= (0b11 << (whichBit * 2)) >> (whichBit * 2) << 6;
                                break;
                        }
                        curPixelColor = tempPixelColor !== 0 ? tempPixelColor : curPixelColor;
                    }
                }
            }

            paletteOffset = curPixelColor * 4;
            r = this.memory.readByte(paletteAddr + paletteOffset + 0);
            g = this.memory.readByte(paletteAddr + paletteOffset + 1);
            b = this.memory.readByte(paletteAddr + paletteOffset + 2);

            frameOffset = (y * 640 + x) * 4;
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

            const numSeconds = (now - this._startTime) / MS_PER_SEC;
            this._ticksPerSecond = ((this._ticksPerSecond * SAMPLES) + this._ticksThisSecond) / (SAMPLES + 1);
            this._ticksThisSecond = 0;

            this._ticksPerRaster = this._ticksPerSecond / (TARGET_FPS * SCREEN_ROWS);
        }
    }
}