# Memory layout

|  Start  |   End   | Size | Identifier       | Purpose                                                      |
|:-------:|:-------:|:----:|:----------------:|:-------------------------------------------------------------|
|  00000                 ||| memBot           | Bottom of memory                                             |
|  00000  |  0FFFF  |  64K |                  | Bank 0; code and data                                        |
|  00000  |  001FF  | 512B | traps            | Traps consisting of 256 2-byte pointers; all but 0x00 and 0xFE default to 0xFFFF|
|  00000  |  00001  |   2B | trapRESET        | Trap 0x00; points to reset()                                 |
|  001E0  |  001E1  |   2B | trapFRAME        | Trap 0xF0; points to frame()                                 |
|  00400  |  00FFF  |   3K | stackMax         | Default location of stack; stack grows down from 00FFF       |
|  01000  |  0AFFF  |  39K | codeStart        | Code and data                                                |
|  0B000  |  0BFFF  |   4K | romScratchStart  | ROM and KERNEL scratch area                                  |
|  0C000  |  0FFFF  |  16K | romStart         | ROM and KERNEL                                               |
|  0FE00  |  0FEFF  | 256B | frame            | Called after each frame is drawn to screen                   |
|  0FF00  |  0FFFE  | 255B | reset            | Performs initialization steps and jumps to 0x01000           |
|  0FFFF                 |||defaultTrapHandler| Just a RET for any TRAPs that aren't overridden              |
|  10000  |  1FFFF  |  64K |                  | Bank 1; graphics and video configuration                     |
|  10000  |  1F9FF  | ~64K | graphicsStart    | 320x200 256-color graphics                                   |
|  1FA00                 ||| reserved         | reserved                                                     |
|  1FA01                 ||| reserved         |                                                              |
|  1FA02                 ||| graphicsLayer    | (0-7 visible; else invisible)                                |
|  1FA03                 ||| reserved         |                                                              |
|  1FA04                 ||| borderColor      | Border color                                                 |
|  1FA05                 ||| borderSizeX      | Width of border, horizontally                                |
|  1FA06                 ||| borderSizeY      | Height of border, vertically                                 |
|  1FA07                 ||| reserved         |                                                              |
|  1FA08                 ||| reserved         |                                                              |
|  1FA09                 ||| reserved         |                                                              |
|  1FA0A                 ||| reserved         |                                                              |
|  1FA0B                 ||| backgroundColor  | Screen background color                                      |
|  1FC00  |  1FFFF  |   1K | paletteStart     | 256 RGBx color definitions                                   |
|  20000  |  2FFFF  |  64K |                  | Bank 2; tile set definitions                                 |
|  20000  |  23FFF  |  16K | tileSet0         | Tile set 0 (256 8x8 tiles)                                   |
|  24000  |  27FFF  |  16K | tileSet1         | Tile set 1                                                   |
|  28000  |  2BFFF  |  16K | tileSet2         | Tile set 2                                                   |
|  2C000  |  2FFFF  |  16K | tileSet3         | Tile set 3                                                   |
|  30000  |  3FFFF  |  64K |                  | Bank 3; tile pages, sprites, data storage                    |
|  30000  |  303FF  |   1K | tilePage0        | Tile page 0                                                  |
|  30400  |  307FF  |   1K | tilePage0bgColor | Background color for tile page 0                             |
|  30800  |  30BFF  |   1K | tilePage0fgColor | Foreground color for tile page 0                             |
|  30FF9                 ||| tilePage0CropX   | Width of visual crop, in pixels                              |
|  30FFA                 ||| tilePage0CropY   | Height of visual crop, in pixels                             |
|  30FFB                 ||| tilePage0Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  30FFC                 ||| tilePage0Set     | Tile set to use (0-3)                                        |
|  30FFD                 ||| tilePage0OffsetX | Rendering offset (signed)                                    |
|  30FFE                 ||| tilePage0OffsetY | Rendering offset (signed)                                    |
|  30FFF                 ||| tilePage0Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  31000  |  313FF  |   1K | tilePage1        | Tile page 1                                                  |
|  31400  |  317FF  |   1K | tilePage1bgColor | Background color for tile page 1                             |
|  31800  |  31BFF  |   1K | tilePage1fgColor | Foreground color for tile page 1                             |
|  31FF9                 ||| tilePage1CropX   | Width of visual crop, in pixels                              |
|  31FFA                 ||| tilePage1CropY   | Height of visual crop, in pixels                             |
|  31FFB                 ||| tilePage1Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  31FFC                 ||| tilePage1Set     | Tile set to use (0-3)                                        |
|  31FFD                 ||| tilePage1OffsetX | Rendering offset (signed)                                    |
|  31FFE                 ||| tilePage1OffsetY | Rendering offset (signed)                                    |
|  31FFF                 ||| tilePage1Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  32000  |  323FF  |   1K | tilePage2        | Tile page 2                                                  |
|  32400  |  327FF  |   1K | tilePage2bgColor | Background color for tile page 2                             |
|  32800  |  32BFF  |   1K | tilePage2fgColor | Foreground color for tile page 2                             |
|  32FF9                 ||| tilePage2CropX   | Width of visual crop, in pixels                              |
|  32FFA                 ||| tilePage2CropY   | Height of visual crop, in pixels                             |
|  32FFB                 ||| tilePage2Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  32FFC                 ||| tilePage2Set     | Tile set to use (0-3)                                        |
|  32FFD                 ||| tilePage2OffsetX | Rendering offset (signed)                                    |
|  32FFE                 ||| tilePage2OffsetY | Rendering offset (signed)                                    |
|  32FFF                 ||| tilePage2Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  33000  |  333FF  |   1K | tilePage3        | Tile page 3                                                  |
|  33400  |  337FF  |   1K | tilePage3bgColor | Background color for tile page 3                             |
|  33800  |  33BFF  |   1K | tilePage3fgColor | Foreground color for tile page 3                             |
|  33FF9                 ||| tilePage3CropX   | Width of visual crop, in pixels                              |
|  33FFA                 ||| tilePage3CropY   | Height of visual crop, in pixels                             |
|  33FFB                 ||| tilePage3Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  33FFC                 ||| tilePage3Set     | Tile set to use (0-3)                                        |
|  33FFD                 ||| tilePage3OffsetX | Rendering offset (signed)                                    |
|  33FFE                 ||| tilePage3OffsetY | Rendering offset (signed)                                    |
|  33FFF                 ||| tilePage3Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  3FFFF                 ||| memTop           | Top of memory                                                |