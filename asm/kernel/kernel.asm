;
; 6516 Retroputer KERNEL
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;
; constants
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

.def MEM-BOT                   0x00000  ; bottom of memory
.def MEM-LEN                   0x40000

.def BANK-LEN                  0x10000
.def BANK-0                    0x00     ; bank 0
.def BANK-0-BOT                0x00000  ; bottom of bank 0
.def BANK-0-TOP                0x0FFFF  ; top of bank 0
.def BANK-1                    0x01     ; bank 1
.def BANK-1-BOT                0x10000
.def BANK-1-TOP                0x1FFFF
.def BANK-2                    0x02     ; bank 2
.def BANK-2-BOT                0x20000
.def BANK-2-TOP                0x2FFFF
.def BANK-3                    0x03     ; bank 3
.def BANK-3-BOT                0x30000
.def BANK-3-TOP                0x3FFFF

.def TRAP-BOT                  0x00000  ; start of traps
.def TRAP-TOP                  0x001FF  ; end of traps
.def TRAP-LEN                  0x00200

.def TRAP-RESET                0x00000  ; reset trap vector
.def TRAP-FRAME                0x001E0  ; frame trap vector

.def STACK-BOT                 0x00400  ; bottom of stack
.def STACK-TOP                 0x00FFF  ; top of stack
.def STACK-LEN                 0x00800

.def CODE-BOT                  0x01000  ; start of code
.def CODE-TOP                  0x0AFFF  ; end of code
.def CODE-LEN                  0x0A000

.def ROM-SCRATCH-BOT           0x0B000  ; rom scratch area
.def ROM-SCRATCH-TOP           0x0BFFF  ; end of scratch area
.def ROM-SCRATCH-LEN           0x01000

.def ROM-BOT                   0x0C000  ; bottom of ROM
.def ROM-TOP                   0x0FFFF  ; top of ROM
.def ROM-LEN                   0x04000

.def FRAME-HANDLER             0x0FE00  ; start of frame trap handler
.def RESET-HANDLER             0x0FF00  ; start of reset trap handler
.def NOTRAP-HANDLER            0x0FFFF  ; ret for traps that don't do anything

.def GRAPHICS-BOT              0x10000  ; start of graphics
.def GRAPHICS-TOP              0x1F9FF  ; end of graphics
.def GRAPHICS-LEN              0x0FA00

.def GRAPHICS-LAYER            0x1FA02  ; 0-7 visible, 0xFF invisible
.def BORDER-COLOR              0x1FA04  ; border color
.def BORDER-SIZE-X             0x1FA05  ; width of border
.def BORDER-SIZE-Y             0x1FA06  ; height of border
.def BACKGROUND-COLOR          0x1FA0B  ; background color

.def PALETTE-BOT               0x1FC00  ; start of palette entries
.def PALETTE-TOP               0x1FFFF  ; end of palette
.def PALETTE-LEN               0x00400

.def TILE-SET-LEN              0x04000
.def TILE-SETS-BOT             0x20000  ; start of tile sets
.def TILE-SET-0-BOT            0x20000  ; start of tile set 0
.def TILE-SET-0-TOP            0x23FFF  ; end of tile set
.def TILE-SET-1-BOT            0x24000  ; start of tile set 1
.def TILE-SET-1-TOP            0x27FFF
.def TILE-SET-2-BOT            0x28000  ; start of tile set 2
.def TILE-SET-2-TOP            0x2BFFF
.def TILE-SET-3-BOT            0x2C000  ; start of tile set 3
.def TILE-SET-3-TOP            0x2FFFF
.def TILE-SETS-TOP             0x2FFFF  ; top of tile sets

.def TILE-PAGE-LEN             0x00400
.def TILE-PAGE-BG-LEN          0x00400
.def TILE-PAGE-FG-LEN          0x00400
.def TILE-PAGES-BOT            0x30000  ; bottom of tile pages
.def TILE-PAGE-0-BOT           0x30000  ; bottom of tile page 0
.def TILE-PAGE-0-BG-BOT        0x30400  ; bottom of tile page 0 background color
.def TILE-PAGE-0-BG-TOP        0x307FF
.def TILE-PAGE-0-FG-BOT        0x30800  ; bottom of tile page 0 foreground color
.def TILE-PAGE-0-FG-BOT        0x30BFF
.def TILE-PAGE-0-TOP           0x30BFF
.def TILE-PAGE-0-CROP-X        0x30FF9  ; crop width
.def TILE-PAGE-0-CROP-Y        0x30FFA  ; crop height
.def TILE-PAGE-0-SCALE         0x30FFB  ; page scale (powers of two)
.def TILE-PAGE-0-SET           0x30FFC  ; tile set
.def TILE-PAGE-0-OFFSET-X      0x30FFD  ; offset X position
.def TILE-PAGE-0-OFFSET-Y      0x30FFE  ; offset Y position
.def TILE-PAGE-0-LAYER         0x30FFF  ; 0-7 visible; 0xFF hidden
.def TILE-PAGE-1-BOT           0x31000  ; bottom of tile page 1
.def TILE-PAGE-1-BG-BOT        0x31400  ; bottom of tile page 1 background color
.def TILE-PAGE-1-BG-TOP        0x317FF
.def TILE-PAGE-1-FG-BOT        0x31800  ; bottom of tile page 1 foreground color
.def TILE-PAGE-1-FG-BOT        0x31BFF
.def TILE-PAGE-1-TOP           0x31BFF
.def TILE-PAGE-1-CROP-X        0x31FF9  ; crop width
.def TILE-PAGE-1-CROP-Y        0x31FFA  ; crop height
.def TILE-PAGE-1-SCALE         0x31FFB  ; page scale (powers of two)
.def TILE-PAGE-1-SET           0x31FFC  ; tile set
.def TILE-PAGE-1-OFFSET-X      0x31FFD  ; offset X position
.def TILE-PAGE-1-OFFSET-Y      0x31FFE  ; offset Y position
.def TILE-PAGE-1-LAYER         0x31FFF  ; 0-7 visible; 0xFF hidden
.def TILE-PAGE-2-BOT           0x32000  ; bottom of tile page 2
.def TILE-PAGE-2-BG-BOT        0x32400  ; bottom of tile page 2 background color
.def TILE-PAGE-2-BG-TOP        0x327FF
.def TILE-PAGE-2-FG-BOT        0x32800  ; bottom of tile page 2 foreground color
.def TILE-PAGE-2-FG-BOT        0x32BFF
.def TILE-PAGE-2-TOP           0x32BFF
.def TILE-PAGE-2-CROP-X        0x32FF9  ; crop width
.def TILE-PAGE-2-CROP-Y        0x32FFA  ; crop height
.def TILE-PAGE-2-SCALE         0x32FFB  ; page scale (powers of two)
.def TILE-PAGE-2-SET           0x32FFC  ; tile set
.def TILE-PAGE-2-OFFSET-X      0x32FFD  ; offset X position
.def TILE-PAGE-2-OFFSET-Y      0x32FFE  ; offset Y position
.def TILE-PAGE-2-LAYER         0x32FFF  ; 0-7 visible; 0xFF hidden
.def TILE-PAGE-3-BOT           0x33000  ; bottom of tile page 3
.def TILE-PAGE-3-BG-BOT        0x33400  ; bottom of tile page 3 background color
.def TILE-PAGE-3-BG-TOP        0x337FF
.def TILE-PAGE-3-FG-BOT        0x33800  ; bottom of tile page 3 foreground color
.def TILE-PAGE-3-FG-BOT        0x33BFF
.def TILE-PAGE-3-TOP           0x33BFF
.def TILE-PAGE-3-CROP-X        0x33FF9  ; crop width
.def TILE-PAGE-3-CROP-Y        0x33FFA  ; crop height
.def TILE-PAGE-3-SCALE         0x33FFB  ; page scale (powers of two)
.def TILE-PAGE-3-SET           0x33FFC  ; tile set
.def TILE-PAGE-3-OFFSET-X      0x33FFD  ; offset X position
.def TILE-PAGE-3-OFFSET-Y      0x33FFE  ; offset Y position
.def TILE-PAGE-3-LAYER         0x33FFF  ; 0-7 visible; 0xFF hidden

.def MEM-TOP                   0x3FFFF  ; top of memory


.data 0x0B000

.code 0x0C000

.import cursor/cursor.asm

.import traps/vectors.asm
.import traps/FRAME.asm
.import traps/RESET.asm
.import traps/BADOP.asm


