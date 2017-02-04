/* eslint-disable */
export let memoryLayout = {
  size:                256
 ,memtop:          0x3FFFF
 ,spriteCount:          16
 ,sprite0Height:   0x340A0
 ,sprite0Width:    0x34090
 ,sprite0Tile:     0x34080
 ,sprite0TileSet:  0x34070
 ,sprite0FGColor:  0x34060
 ,sprite0BGColor:  0x34050
 ,sprite0Scale:    0x34040
 ,sprite0YPosition:0x34030
 ,sprite0XPosition:0x34010
 ,sprite0Layer:    0x34000
 ,spriteStart:     0x34000
 ,tilePagesLength: 0x04000
 ,tilePageLength:  0x01000
 ,tilePage3Layer:  0x33FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
 ,tilePage3OffsetY:0x33FFE  // signed Y offset for smooth scrolling
 ,tilePage3OffsetX:0x33FFD  // signed X offset for smooth scrolling
 ,tilePage3Set:    0x33FFC  // 0 - 3, which tileset to use
 ,tilePage3Scale:  0x33FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
 ,tilePage3CropY:  0x33FFA  // height of area to ignore when compositing (border)
 ,tilePage3CropX:  0x33FF9  // width of area to ignore when compositing (border)
 ,tilePage3FGColor:0x33800
 ,tilePage3BGColor:0x33400
 ,tilePage3:       0x33000
 ,tilePage2Layer:  0x32FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
 ,tilePage2OffsetY:0x32FFE  // signed Y offset for smooth scrolling
 ,tilePage2OffsetX:0x32FFD  // signed X offset for smooth scrolling
 ,tilePage2Set:    0x32FFC  // 0 - 3, which tileset to use
 ,tilePage2Scale:  0x32FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
 ,tilePage2CropY:  0x32FFA  // height of area to ignore when compositing (border)
 ,tilePage2CropX:  0x32FF9  // width of area to ignore when compositing (border)
 ,tilePage2FGColor:0x32800
 ,tilePage2BGColor:0x32400
 ,tilePage2:       0x32000
 ,tilePage1Layer:  0x31FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
 ,tilePage1OffsetY:0x31FFE  // signed Y offset for smooth scrolling
 ,tilePage1OffsetX:0x31FFD  // signed X offset for smooth scrolling
 ,tilePage1Set:    0x31FFC  // 0 - 3, which tileset to use
 ,tilePage1Scale:  0x31FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
 ,tilePage1CropY:  0x31FFA  // height of area to ignore when compositing (border)
 ,tilePage1CropX:  0x31FF9  // width of area to ignore when compositing (border)
 ,tilePage1FGColor:0x31800
 ,tilePage1BGColor:0x31400
 ,tilePage1:       0x31000
 ,tilePage0Layer:  0x30FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
 ,tilePage0OffsetY:0x30FFE  // signed Y offset for smooth scrolling
 ,tilePage0OffsetX:0x30FFD  // signed X offset for smooth scrolling
 ,tilePage0Set:    0x30FFC  // 0 - 3, which tileset to use
 ,tilePage0Scale:  0x30FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
 ,tilePage0CropY:  0x30FFA  // height of area to ignore when compositing (border)
 ,tilePage0CropX:  0x30FF9  // width of area to ignore when compositing (border)
 ,tilePage0FGColor:0x30800
 ,tilePage0BGColor:0x30400
 ,tilePage0:       0x30000
 ,tilePagesStart:  0x30000
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
// ,tileForeground:  0x1FA0A  // foreground color for tiles (0xFF)
// ,tileBackground:  0x1FA09  // background color for tiles (0x00)
// ,tileSetOffsetY:  0x1FA08  // signed offset for tiles (y-pos px)
// ,tileSetOffsetX:  0x1FA07  // signed offset for tiles (x-pos px)
 ,borderSizeY:     0x1FA06  // height of vertical border in px
 ,borderSizeX:     0x1FA05  // width of horizontal border in px
 ,borderColor:     0x1FA04  // Border Color
// ,tileSet:         0x1FA03  // Tile set (sourced from 0x2****)
 ,graphicsLayer:   0x1FA02  // 0 - 7, graphica layer; FF = no display
// ,tileDisplay:     0x1FA01  // Tile display order:
                            //     0 = behind graphics
                            //     1 = in front of graphics
                            //     2 = hidden
// ,tilePage:        0x1FA00  // Tile page: 0=0x0A000; 1=0x0A400
 ,screenConfigLength:  256
 ,screenConfigStart:0x1FA00
 ,graphicsLength:    64000
 ,graphicsStart:   0x10000  // 320 x 200 (64000) bytes
 ,romEnd:          0x0FFFF  // End of ROM
 ,romStart:        0x0C000  // Start of ROM
 ,codeStart:       0x01000  // Start of code execution
 ,stackTop:        0x00FFF  // top of stack (grows down)
 ,stackMax:        0x00400  // bottom of stack
 ,trapReset:       0x00000  // jump to instruction when reset
                            // default: 0x01000
 ,traps:           0x00000  // 256 2-byte long pointers; ends 0x001FF
 ,membot:          0x00000
};

export default memoryLayout;