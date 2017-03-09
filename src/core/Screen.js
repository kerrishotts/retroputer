import twosComplement from "../util/twosComplement.js";

export default class Screen {
    constructor(id, borderId, memory) {
        let width = 320, height = 200, layout = memory.layout;

        this._width = width;
        this._height = height;
        this._tileWidth = 8;
        this._tileHeight = 8;
        this._tileColumns = width / this._tileWidth;
        this._tileRows = height / this._tileHeight;
        this._screen = document.getElementById(id);
        this._screen.setAttribute("width", width);
        this._screen.setAttribute("height", height);
        this._screenCtx = this._screen.getContext("2d");

        this._canvas = document.createElement("canvas");
        this._canvas.setAttribute("width", width);
        this._canvas.setAttribute("height", height);
        this._canvasCtx = this._canvas.getContext("2d");

        this._screenBorderEl = document.getElementById(borderId);

        this._memory = memory;
        this._layout = layout;
        this._palette = memory.range32(layout.paletteStart,
            layout.paletteLength32);

        /*
        // the screen occupies the second block of memory
        this._memory = memory.range(layout.graphicsStart,
        layout.graphicsLength);

        // the palette is 256 entries of rgba bytes

        // configuration settings
        this._config = memory.range(layout.screenConfigStart,
        layout.screenConfigLength);
        */
        // tilesets
        this._tilesets = memory.range(layout.tileSetsStart,
            layout.tileSetsLength);

        this._tiles = memory.range(layout.tilePagesStart,
            layout.tilePagesLength);

        // we also need the 32-bit array that the canvas will use
        this._frameData = this._canvasCtx.createImageData(width, height);
        this._frameBuf = new ArrayBuffer(this._frameData.data.length);
        this._frame = new Uint32Array(this._frameBuf);
        this._frame8 = new Uint8Array(this._frameBuf);

        // set up our initial values
        this.init();
    }

    init() {
        // we expect the bootstrap in ROM to set up the screen
        //this.initPalette();
        //this.initScreenConfiguration();
    }

    setPaletteEntry(idx, r, g, b) {
        let addr = this._layout.paletteStart + (idx << 2)
        this._memory.poke(addr + 3, 0xFF);
        this._memory.poke(addr + 2, b);
        this._memory.poke(addr + 1, g);
        this._memory.poke(addr + 0, r);
    }

    getPaletteEntry(idx) {
        let addr = this._layout.paletteStart + (idx << 2)
        return {
            r: this._memory.peek(addr),
            g: this._memory.peek(addr + 1),
            b: this._memory.peek(addr + 2)
        };
    }

    initPalette() {
        let r, g, b, m,
            ma = [0, 128, 192, 255];

        for (let i = 0; i < 256; i++) {
            m = ma[(((i & 0xC0) >> 6))];
            r = ma[((i & 0x30) >> 4)] || m;
            g = ma[((i & 0x0C) >> 2)] || m;
            b = ma[((i & 0x03) >> 0)] || m;
            this.setPaletteEntry(i, r, g, b);
        }
    }

    setBackgroundColor(c) {
        this._memory.poke(this._layout.backgroundColor, c);
    }
    getBackgroundColor() {
        return this._memory.peek(this._layout.backgroundColor);
    }

    setBorderSize(x, y) {
        this._memory.poke(this._layout.borderSizeX, x);
        this._memory.poke(this._layout.borderSizeY, y);
    }
    getBorderSize() {
        return [this._memory.peek(this._layout.borderSizeX) & 0x3F,
        this._memory.peek(this._layout.borderSizeY) & 0x3F];
    }

    setBorderColor(c) {
        this._memory.poke(this._layout.borderColor, c);
    }
    getBorderColor() {
        return this._memory.peek(this._layout.borderColor);
    }

    setGraphicsLayer(l) {
        this._memory.poke(this._layout.graphicsLayer, l);
    }
    getGraphicsLayer() {
        return this._memory.peek(this._layout.graphicsLayer) & 0x87;
    }

    setTilePageLayer(page, l) {
        let layers = [this._layout.tilePage0Layer,
        this._layout.tilePage1Layer,
        this._layout.tilePage2Layer,
        this._layout.tilePage3Layer];
        this._memory.poke(layers[page], l);
    }
    getTilePageLayer(page) {
        let layers = [this._layout.tilePage0Layer,
        this._layout.tilePage1Layer,
        this._layout.tilePage2Layer,
        this._layout.tilePage3Layer];
        return this._memory.peek(layers[page]) & 0x87;
    }

    setTilePageOffsets(page, x, y) {
        let offsetX = [this._layout.tilePage0OffsetX,
        this._layout.tilePage1OffsetX,
        this._layout.tilePage2OffsetX,
        this._layout.tilePage3OffsetX];
        this._memory.poke(offsetX[page], x < 0 ? x + 256 : x);
        this._memory.poke(offsetX[page] + 1, y < 0 ? y + 256 : y);
    }
    getTilePageOffsets(page) {
        let offsetX = [this._layout.tilePage0OffsetX,
        this._layout.tilePage1OffsetX,
        this._layout.tilePage2OffsetX,
        this._layout.tilePage3OffsetX];
        return [this._memory.peek(offsetX[page]),
        this._memory.peek(offsetX[page] + 1)];
    }

    setTilePageCrops(page, x, y) {
        let cropX = [this._layout.tilePage0CropX,
        this._layout.tilePage1CropX,
        this._layout.tilePage2CropX,
        this._layout.tilePage3CropX];
        this._memory.poke(cropX[page], x);
        this._memory.poke(cropX[page] + 1, y);
    }
    getTilePageCrops(page) {
        let cropX = [this._layout.tilePage0CropX,
        this._layout.tilePage1CropX,
        this._layout.tilePage2CropX,
        this._layout.tilePage3CropX];
        return [this._memory.peek(cropX[page]) & 0x3F,
        this._memory.peek(cropX[page] + 1) & 0x3F];
    }

    setTilePageSet(page, set) {
        let layers = [this._layout.tilePage0Set,
        this._layout.tilePage1Set,
        this._layout.tilePage2Set,
        this._layout.tilePage3Set];
        this._memory.poke(layers[page], set);
    }
    getTilePageSet(page) {
        let layers = [this._layout.tilePage0Set,
        this._layout.tilePage1Set,
        this._layout.tilePage2Set,
        this._layout.tilePage3Set];
        return this._memory.peek(layers[page]) & 0x03;
    }

    setTilePageScale(page, scale) {
        let layers = [this._layout.tilePage0Scale,
        this._layout.tilePage1Scale,
        this._layout.tilePage2Scale,
        this._layout.tilePage3Scale];
        this._memory.poke(layers[page], scale);
    }
    getTilePageScale(page) {
        let layers = [this._layout.tilePage0Scale,
        this._layout.tilePage1Scale,
        this._layout.tilePage2Scale,
        this._layout.tilePage3Scale];
        return this._memory.peek(layers[page]) & 0x0F;
    }


    initScreenConfiguration() {
        this.setBackgroundColor(0x01);  // dark blue
        this.setBorderSize(0x01, 0x01); // 8px on all sides
        this.setBorderColor(0x0A);
        this.setGraphicsLayer(0xFF); // graphics hidden by default;
        for (let page = 0; page < 4; page++) {
            let tilePageBase = this._layout.tilePage0 + (this._layout.tilePageLength * page);
            let tileBGColor = tilePageBase + 0x0400;
            let tileFGColor = tileBGColor + 0x0400;
            for (let idx = 0; idx < 0x0400; idx++) {
                this._memory.poke(tilePageBase + idx, 0);
                this._memory.poke(tileBGColor + idx, 0);
                this._memory.poke(tileFGColor + idx, 0xFF);
            }
            this.setTilePageLayer(page, (page === 0) ? 0x01 : 0xFF); // only tile page 0 is visible by default
            this.setTilePageCrops(page, 0, 0); // no crops
            this.setTilePageOffsets(page, 0, 0); // no offsets
            this.setTilePageScale(page, 0); // no scaling
            this.setTilePageSet(page, 0); // first tile set
        }
    }


    setPixel(x, y, c) {
        // let addr = (((y * this._width) + x) & 0xFFFF);
        // let addr = ((y * this._width) + x);
        // let addr = (((y << 8) + (y << 6) + x) & 0xFFFF);
        let addr = ((y << 8) + (y << 6) + x);
        this._frame[addr] = c; //this._palette[c] | 0xFF000000;
    }


    /*
    setPixel (x, y, c) {
      let addr = ((y << 8) + (y << 6) + x) << 2;
      let color = this._palette[c];
      this._frameBuf[addr++] = color & 0xFF; color >>= 8;
      this._frameBuf[addr++] = color & 0xFF; color >>= 8;
      this._frameBuf[addr++] = color & 0xFF;
      this._frameBuf[addr]   = 0xFF;
    }
    */

    setTile(page, row, col, tile, bgColor = 0x00, fgColor = 0xFF) {
        let baseAddr = this._layout.tilePage0 + (this._layout.tilePageLength * page);
        let tileAddr = baseAddr + (row * this._tileColumns) + col;
        let bgAddr = tileAddr + 0x0400;
        let fgAddr = tileAddr + 0x0800;

        this._memory.poke(tileAddr, tile);
        this._memory.poke(bgAddr, bgColor);
        this._memory.poke(fgAddr, fgColor);
    }

    renderBackgroundColorToCanvas(palette) {
        let c = this.getBackgroundColor();

        this._frame.fill(palette[c]);

        /*eslint-disable no-var, vars-on-top*/
//        for (var y = this._height - 1; y !== 0; y--) {
//            for (var x = this._width - 1; x !== 0; x--) {
//                this.setPixel(x, y, c);
//            }
//        }

        /*eslint-enable no-var, vars-on-top*/
    }

    renderTilePageToCanvas(page, palette) {

        /*eslint-disable no-var, vars-on-top*/
        var [cropX, cropY] = this.getTilePageCrops(page),
            cropLeft = cropX, cropLeftMasked = cropLeft & 0xFF8,
            cropRight = this._width - cropX, cropRightMasked = (cropRight & 0xFF8) + 1,
            cropTop = cropY, cropTopMasked = cropTop & 0xFF8,
            cropBottom = this._height - cropY, cropBottomMasked = (cropBottom & 0xFF8) + 1,
            [offsetX, offsetY] = this.getTilePageOffsets(page),
            scale = this.getTilePageScale(page) & 0x07,
            tileSet = this.getTilePageSet(page),
            tileSetBase = tileSet * 16384,
            tilePageBase = page * 0x1000,
            tileForegroundColor, tileBackgroundColor,
            addr, tile, tileSetAddr, tpix,
            newx, newy, baseX, baseY,
            shift = 3 + scale, shiftedY, scaledY;

        offsetX = twosComplement.from8(offsetX);
        offsetY = twosComplement.from8(offsetY);
/* */
        // iterate row ---> col over the tile page
        for (var row = this._tileRows - 1; row > -1; row--) {
            // baseY should be the topmost Y position of the tile
            baseY = (row << shift) + offsetY;

            // only paint tiles that have visible portions on screen
            if (baseY >= cropTopMasked  && baseY <= cropBottomMasked) {
                for (var col = this._tileColumns - 1; col > -1; col--) {
                    // baseX should indicate the leftmost X position of the tile
                    baseX = (col << shift) + offsetX;

                    // only draw if the tile is visible
                    if (baseX >= cropLeftMasked && baseX <= cropRightMasked) {

                        // addr should indicate the tile page address of the tile
                        addr = (row << 5) + (row << 3) + col + tilePageBase;

                        // get the tile
                        tile = this._tiles[addr];
                        tileSetAddr = tileSetBase + (tile << 6);

                        // get corresponding colors
                        tileBackgroundColor = this._tiles[addr + 0x0400];
                        tileForegroundColor = this._tiles[addr + 0x0800];

                        // next, draw each pixel of the tile
                        for (var y = (8 << scale) - 1; y > -1; y--) {
                            newy = y + baseY;
                            for (var x = (8 << scale) - 1; x > -1; x--) {
                                tpix = this._tilesets[tileSetAddr + (((y >> scale) << 3) + (x >> scale))];
                                if (tpix === 0x00 || tpix === 0xFF) {
                                    tpix = (tpix === 0xFF ? tileForegroundColor : tileBackgroundColor);
                                }
                                if (tpix > 0) {
                                    newx = x + baseX;
                                    if (((newx >= cropLeft) && (newx < cropRight)) &&
                                        ((newy >= cropTop) && (newy < cropBottom))) {
                                        this.setPixel(newx, newy, palette[tpix]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

/*
        for (var y = this._height - 1; y > -1; y--) {
            shiftedY = y >> shift;
            scaledY = y >> scale;
            newy = y + offsetY;

            for (var x = this._width - 1; x > -1; x--) {

                // get the tile index
                //addr = ((y >> shift) * this._tileColumns) + (x >> shift);
                addr = (shiftedY << 5) + (shiftedY << 3) + (x >> shift) + tilePageBase;
                tile = this._tiles[addr];

                // get corresponding colors
                tileBackgroundColor = this._tiles[addr + 0x0400];
                tileForegroundColor = this._tiles[addr + 0x0800];

                // get the tile pixel
                tileSetAddr = ((scaledY & 0x07) << 3) + ((x >> scale) & 0x07) + (tile << 6) + tileSetBase;
                tpix = this._tilesets[tileSetAddr];

                if (tpix === 0x00 || tpix === 0xFF) {
                    tpix = (tpix === 0xFF ? tileForegroundColor : tileBackgroundColor);
                }

                newx = x + offsetX;

                if (tpix > 0) {
                    if (((newx >= cropLeft) && (newx < cropRight)) &&
                        ((newy >= cropTop) && (newy < cropBottom))) {
                        this.setPixel(newx, newy, palette[tpix]);
                    }
                }
            }
        }
 */

        /*eslint-enable no-var, vars-on-top*/
    }

    renderGraphicsToCanvas(palette) {
        let gpix,
            addr = this._layout.graphicsStart;

        /*eslint-disable no-var, vars-on-top*/
        for (var y = this._height - 1; y > -1; y--) {
            for (var x = this._width - 1; x > -1; x--) {
                addr++;
                gpix = this._memory.peek(addr);
                if (gpix > 0) {
                    this.setPixel(x, y, palette[gpix]);
                }
            }
        }

        /*eslint-enable no-var, vars-on-top*/
    }

    /*
    TODO:
    renderSpriteToCanvas(sprite) {

    }
    */

    renderBorderToScreenBorder(palette) {
        let borderColor = this.getBorderColor();
        let color = palette[borderColor];
        let b = (color & 0x00FF0000) >> 16;
        let g = (color & 0x0000FF00) >> 8;
        let r = (color & 0x000000FF);
        let css = `rgb(${r}, ${g}, ${b})`;
        this._screenBorderEl.style.backgroundColor = css;
        this._screen.style.backgroundColor = css;
    }

    renderBorderToCanvas(palette) {
        let borderColor = this.getBorderColor(),
            [borderSizeX, borderSizeY] = this.getBorderSize(),
            leftBorder = borderSizeX,
            rightBorder = this._width - borderSizeX,
            topBorder = borderSizeY,
            bottomBorder = this._height - borderSizeY;

        /*eslint-disable no-var, vars-on-top*/
        for (var y = this._height - 1; y > -1; y--) {
            for (var x = this._width - 1; x > -1; x--) {
                if (((x < leftBorder) || (x >= rightBorder)) ||
                    ((y < topBorder) || (y >= bottomBorder))) {
                    this.setPixel(x, y, palette[borderColor]);
                }
            }
        }

        /*eslint-enable no-var, vars-on-top*/
    }

    update() {
        let layer, palette = [];
        let layers = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];

        // background color goes first
        layers[0].push(this.renderBackgroundColorToCanvas.bind(this));

        // next figure out where the tile pages go
        for (let page = 0; page < 4; page++) {
            layer = this.getTilePageLayer(page);
            if (layer < 8) {
                layers[layer].push(this.renderTilePageToCanvas.bind(this, page));
            }
        }

        // then the graphics page
        layer = this.getGraphicsLayer();
        if (layer < 8) {
            layers[layer].push(this.renderGraphicsToCanvas.bind(this));
        }

        // then the sprites
        // TODO

        // then the border
        layers[7].push(this.renderBorderToCanvas.bind(this));

        // generate the current palette

        /* eslint-disable */
        for (var i = 0; i < 256; i++) {
            palette.push(this._palette[i] | 0xFF000000);
        }

        /* eslint-enable */
        // and now composite!
        for (let layerIdx = 0; layerIdx < 8; layerIdx++) {
            let actions = layers[layerIdx];
            for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
                actions[actionIdx](palette);
            }
        }
        this.renderBorderToScreenBorder(palette);
    }

    draw() {
        this._frameData.data.set(this._frame8);
        this._canvasCtx.putImageData(this._frameData, 0, 0);
        this._screenCtx.drawImage(this._canvas, 0, 0);
    }
}