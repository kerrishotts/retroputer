/* eslint-disable */
export let memoryLayout = {
  size: 256
  , memlen: 0x40000
  , memtop: 0x3FFFF
  , iolen: 256
  , iotop: 0x3FFFF
  , ioComm3DataIn: 0x3FF4F
  , ioComm3DataOut: 0x3FF4E
  , ioComm3Command: 0x3FF4D
  , ioComm3Configuration: 0x3FF4C
  , ioComm2DataIn: 0x3FF4B
  , ioComm2DataOut: 0x3FF4A
  , ioComm2Command: 0x3FF49
  , ioComm2Configuration: 0x3FF48
  , ioComm1DataIn: 0x3FF47
  , ioComm1DataOut: 0x3FF46
  , ioComm1Command: 0x3FF45
  , ioComm1Configuration: 0x3FF44
  , ioComm0DataIn: 0x3FF43
  , ioComm0DataOut: 0x3FF42
  , ioComm0Command: 0x3FF41
  , ioComm0Configuration: 0x3FF40  // b0 = opened; b1 = cmd sent; b2 = cmd ack; b3 = data out sent; b4 = data out ack; b5 = data in sent; b6 = data in ack
  , ioRandomHigh: 0x3FF39
  , ioRandomLow: 0x3FF38
  , ioClockHours: 0x3FF33
  , ioClockMinutes: 0x3FF32
  , ioClockSeconds: 0x3FF31
  , ioClockHundredths: 0x3FF30
  , ioTimer3HighCurrent: 0x3FF2C
  , ioTimer3LowCurrent: 0x3FF2B
  , ioTimer3HighReset: 0x3FF2A
  , ioTimer3LowReset: 0x3FF29
  , ioTimer3Configuration: 0x3FF28
  , ioTimer2HighCurrent: 0x3FF24
  , ioTimer2LowCurrent: 0x3FF23
  , ioTimer2HighReset: 0x3FF22
  , ioTimer2LowReset: 0x3FF21
  , ioTimer2Configuration: 0x3FF20
  , ioTimer1HighCurrent: 0x3FF1C
  , ioTimer1LowCurrent: 0x3FF1B
  , ioTimer1HighReset: 0x3FF1A
  , ioTimer1LowReset: 0x3FF19
  , ioTimer1Configuration: 0x3FF18
  , ioTimer0HighCurrent: 0x3FF14
  , ioTimer0LowCurrent: 0x3FF13
  , ioTimer0HighReset: 0x3FF12
  , ioTimer0LowReset: 0x3FF11
  , ioTimer0Configuration: 0x3FF10  // b0 = enabled; b1: 0 = one-shot, 1 = continuous; b2: 0 = no interrupt, 1 = trigger interrupt; b7 = triggered (manual reset)
  , ioKeyboardDirections: 0x3FF02
  , ioKeyboardModifiers: 0x3FF01
  , ioKeyboardKeyPressed: 0x3FF00
  , iobot: 0x3FF00
  , spriteCount: 16
  , spriteFHeight: 0x340AF
  , spriteEHeight: 0x340AE
  , spriteDHeight: 0x340AD
  , spriteCHeight: 0x340AC
  , spriteBHeight: 0x340AB
  , spriteAHeight: 0x340AA
  , sprite9Height: 0x340A9
  , sprite8Height: 0x340A8
  , sprite7Height: 0x340A7
  , sprite6Height: 0x340A6
  , sprite5Height: 0x340A5
  , sprite4Height: 0x340A4
  , sprite3Height: 0x340A3
  , sprite2Height: 0x340A2
  , sprite1Height: 0x340A1
  , sprite0Height: 0x340A0
  , spriteFWidth: 0x3409F
  , spriteEWidth: 0x3409E
  , spriteDWidth: 0x3409D
  , spriteCWidth: 0x3409C
  , spriteBWidth: 0x3409B
  , spriteAWidth: 0x3409A
  , sprite9Width: 0x34099
  , sprite8Width: 0x34098
  , sprite7Width: 0x34097
  , sprite6Width: 0x34096
  , sprite5Width: 0x34095
  , sprite4Width: 0x34094
  , sprite3Width: 0x34093
  , sprite2Width: 0x34092
  , sprite1Width: 0x34091
  , sprite0Width: 0x34090
  , spriteFTile: 0x3408F
  , spriteETile: 0x3408E
  , spriteDTile: 0x3408D
  , spriteCTile: 0x3408C
  , spriteBTile: 0x3408B
  , spriteATile: 0x3408A
  , sprite9Tile: 0x34089
  , sprite8Tile: 0x34088
  , sprite7Tile: 0x34087
  , sprite6Tile: 0x34086
  , sprite5Tile: 0x34085
  , sprite4Tile: 0x34084
  , sprite3Tile: 0x34083
  , sprite2Tile: 0x34082
  , sprite1Tile: 0x34081
  , sprite0Tile: 0x34080
  , spriteFTileSet: 0x3407F
  , spriteETileSet: 0x3407E
  , spriteDTileSet: 0x3407D
  , spriteCTileSet: 0x3407C
  , spriteBTileSet: 0x3407B
  , spriteATileSet: 0x3407A
  , sprite9TileSet: 0x34079
  , sprite8TileSet: 0x34078
  , sprite7TileSet: 0x34077
  , sprite6TileSet: 0x34076
  , sprite5TileSet: 0x34075
  , sprite4TileSet: 0x34074
  , sprite3TileSet: 0x34073
  , sprite2TileSet: 0x34072
  , sprite1TileSet: 0x34071
  , sprite0TileSet: 0x34070
  , spriteFFGColor: 0x3406F
  , spriteEFGColor: 0x3406E
  , spriteDFGColor: 0x3406D
  , spriteCFGColor: 0x3406C
  , spriteBFGColor: 0x3406B
  , spriteAFGColor: 0x3406A
  , sprite9FGColor: 0x34069
  , sprite8FGColor: 0x34068
  , sprite7FGColor: 0x34067
  , sprite6FGColor: 0x34066
  , sprite5FGColor: 0x34065
  , sprite4FGColor: 0x34064
  , sprite3FGColor: 0x34063
  , sprite2FGColor: 0x34062
  , sprite1FGColor: 0x34061
  , sprite0FGColor: 0x34060
  , spriteFBGColor: 0x3405F
  , spriteEBGColor: 0x3405E
  , spriteDBGColor: 0x3405D
  , spriteCBGColor: 0x3405C
  , spriteBBGColor: 0x3405B
  , spriteABGColor: 0x3405A
  , sprite9BGColor: 0x34059
  , sprite8BGColor: 0x34058
  , sprite7BGColor: 0x34057
  , sprite6BGColor: 0x34056
  , sprite5BGColor: 0x34055
  , sprite4BGColor: 0x34054
  , sprite3BGColor: 0x34053
  , sprite2BGColor: 0x34052
  , sprite1BGColor: 0x34051
  , sprite0BGColor: 0x34050
  , spriteFScale: 0x3404F
  , spriteEScale: 0x3404E
  , spriteDScale: 0x3404D
  , spriteCScale: 0x3404C
  , spriteBScale: 0x3404B
  , spriteAScale: 0x3404A
  , sprite9Scale: 0x34049
  , sprite8Scale: 0x34048
  , sprite7Scale: 0x34047
  , sprite6Scale: 0x34046
  , sprite5Scale: 0x34045
  , sprite4Scale: 0x34044
  , sprite3Scale: 0x34043
  , sprite2Scale: 0x34042
  , sprite1Scale: 0x34041
  , sprite0Scale: 0x34040
  , spriteFYPosition: 0x3403F
  , spriteEYPosition: 0x3403E
  , spriteDYPosition: 0x3403D
  , spriteCYPosition: 0x3403C
  , spriteBYPosition: 0x3403B
  , spriteAYPosition: 0x3403A
  , sprite9YPosition: 0x34039
  , sprite8YPosition: 0x34038
  , sprite7YPosition: 0x34037
  , sprite6YPosition: 0x34036
  , sprite5YPosition: 0x34035
  , sprite4YPosition: 0x34034
  , sprite3YPosition: 0x34033
  , sprite2YPosition: 0x34032
  , sprite1YPosition: 0x34031
  , sprite0YPosition: 0x34030
  , spriteFXPosition: 0x3401F
  , spriteEXPosition: 0x3401E
  , spriteDXPosition: 0x3401D
  , spriteCXPosition: 0x3401C
  , spriteBXPosition: 0x3401B
  , spriteAXPosition: 0x3401A
  , sprite9XPosition: 0x34019
  , sprite8XPosition: 0x34018
  , sprite7XPosition: 0x34017
  , sprite6XPosition: 0x34016
  , sprite5XPosition: 0x34015
  , sprite4XPosition: 0x34014
  , sprite3XPosition: 0x34013
  , sprite2XPosition: 0x34012
  , sprite1XPosition: 0x34011
  , sprite0XPosition: 0x34010
  , spriteFLayer: 0x3400F
  , spriteELayer: 0x3400E
  , spriteDLayer: 0x3400D
  , spriteCLayer: 0x3400C
  , spriteBLayer: 0x3400B
  , spriteALayer: 0x3400A
  , sprite9Layer: 0x34009
  , sprite8Layer: 0x34008
  , sprite7Layer: 0x34007
  , sprite6Layer: 0x34006
  , sprite5Layer: 0x34005
  , sprite4Layer: 0x34004
  , sprite3Layer: 0x34003
  , sprite2Layer: 0x34002
  , sprite1Layer: 0x34001
  , sprite0Layer: 0x34000
  , spriteStart: 0x34000
  , tilePagesLength: 0x04000
  , tilePageLength: 0x01000
  , tilePage3Layer: 0x33FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
  , tilePage3OffsetY: 0x33FFE  // signed Y offset for smooth scrolling
  , tilePage3OffsetX: 0x33FFD  // signed X offset for smooth scrolling
  , tilePage3Set: 0x33FFC  // 0 - 3, which tileset to use
  , tilePage3Scale: 0x33FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
  , tilePage3CropY: 0x33FFA  // height of area to ignore when compositing (border)
  , tilePage3CropX: 0x33FF9  // width of area to ignore when compositing (border)
  , tilePage3FGColor: 0x33800
  , tilePage3BGColor: 0x33400
  , tilePage3: 0x33000
  , tilePage2Layer: 0x32FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
  , tilePage2OffsetY: 0x32FFE  // signed Y offset for smooth scrolling
  , tilePage2OffsetX: 0x32FFD  // signed X offset for smooth scrolling
  , tilePage2Set: 0x32FFC  // 0 - 3, which tileset to use
  , tilePage2Scale: 0x32FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
  , tilePage2CropY: 0x32FFA  // height of area to ignore when compositing (border)
  , tilePage2CropX: 0x32FF9  // width of area to ignore when compositing (border)
  , tilePage2FGColor: 0x32800
  , tilePage2BGColor: 0x32400
  , tilePage2: 0x32000
  , tilePage1Layer: 0x31FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
  , tilePage1OffsetY: 0x31FFE  // signed Y offset for smooth scrolling
  , tilePage1OffsetX: 0x31FFD  // signed X offset for smooth scrolling
  , tilePage1Set: 0x31FFC  // 0 - 3, which tileset to use
  , tilePage1Scale: 0x31FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
  , tilePage1CropY: 0x31FFA  // height of area to ignore when compositing (border)
  , tilePage1CropX: 0x31FF9  // width of area to ignore when compositing (border)
  , tilePage1FGColor: 0x31800
  , tilePage1BGColor: 0x31400
  , tilePage1: 0x31000
  , tilePage0Layer: 0x30FFF  // 0 - 7 = visible at layer, 0xFF/-1 = not visible
  , tilePage0OffsetY: 0x30FFE  // signed Y offset for smooth scrolling
  , tilePage0OffsetX: 0x30FFD  // signed X offset for smooth scrolling
  , tilePage0Set: 0x30FFC  // 0 - 3, which tileset to use
  , tilePage0Scale: 0x30FFB  // 0 = 1x1 pixel, 1 = 2x2 pixel
  , tilePage0CropY: 0x30FFA  // height of area to ignore when compositing (border)
  , tilePage0CropX: 0x30FF9  // width of area to ignore when compositing (border)
  , tilePage0FGColor: 0x30800
  , tilePage0BGColor: 0x30400
  , tilePage0: 0x30000
  , tilePagesStart: 0x30000
  , tileSetsLength: 65536
  , tileSetLength: 16384
  , tileSet3: 0x2C000  // tileset 3
  , tileSet2: 0x28000  // tileset 2
  , tileSet1: 0x24000  // tileset 1
  , tileSet0: 0x20000  // 16K 256 8x8 tileset 0
  , tileSetsStart: 0x20000
  , paletteLength: 1024
  , paletteLength32: 256
  , paletteStart: 0x1FC00  // 256 x 4 bytes
  , backgroundColor: 0x1FA0B  // background color for screen
  // ,tileForeground:  0x1FA0A  // foreground color for tiles (0xFF)
  // ,tileBackground:  0x1FA09  // background color for tiles (0x00)
  // ,tileSetOffsetY:  0x1FA08  // signed offset for tiles (y-pos px)
  // ,tileSetOffsetX:  0x1FA07  // signed offset for tiles (x-pos px)
  , borderSizeY: 0x1FA06  // height of vertical border in px
  , borderSizeX: 0x1FA05  // width of horizontal border in px
  , borderColor: 0x1FA04  // Border Color
  // ,tileSet:         0x1FA03  // Tile set (sourced from 0x2****)
  , graphicsLayer: 0x1FA02  // 0 - 7, graphica layer; FF = no display
  // ,tileDisplay:     0x1FA01  // Tile display order:
  //     0 = behind graphics
  //     1 = in front of graphics
  //     2 = hidden
  // ,tilePage:        0x1FA00  // Tile page: 0=0x0A000; 1=0x0A400
  , screenConfigLength: 256
  , screenConfigStart: 0x1FA00
  , graphicsLength: 64000
  , graphicsStart: 0x10000  // 320 x 200 (64000) bytes
  , romLength: 0x04000  // length of rom
  , romEnd: 0x0FFFF  // End of ROM
  , romStart: 0x0C000  // Start of ROM
  , romLength: 0x04000
  , romScratchStart: 0x0B000 // ROM scratch area
  , codeStart: 0x01000  // Start of code execution
  , stackTop: 0x00FFF  // top of stack (grows down)
  , stackMax: 0x00400  // bottom of stack
  , trapReset: 0x00000  // jump to instruction when reset
  // default: 0x01000
  , traps: 0x00000  // 256 2-byte long pointers; ends 0x001FF
  , membot: 0x00000
  , bankLength: 0x10000
};

export default memoryLayout;