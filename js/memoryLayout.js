export let memoryLayout = {
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
};

export default memoryLayout;