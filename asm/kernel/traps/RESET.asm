;
; 6516 Retroputer Kernel
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; RESET.asm
; Author: Kerri Shotts
; Version: 0.2
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; Initializes the machine to its default state by setting up trap vectors, the
; screen (palette & tile page), setting flags and registers appropriately, and
; jumping to 0x01000.
;

.code 0x0FF00
RESET:
    ;
    ; reset flags to expected state
    LDI A, 0xA000
    PUSH A
    Pop Flags

    ;
    ; Set SP and BP to 0x01000
    LDI A, 0x1000
    MOV SP, A
    MOV BP, A

    ;
    ; set up the tile page and clear it
    LDI AL, bank(#TILE-PAGE-0-BOT)     ; tile page 0 is in bank 3
    MOV DB, A

    ; Set up initial text mode
    XOR A, A                            ; setting zeros for most things
    STD A, [addr(#TILE-PAGE-0-CROP-X)]  ; zero crop
    STD A, [addr(#TILE-PAGE-0-OFFSET-X)] ; offset (0, 0)
    STD AL, [addr(#TILE-PAGE-0-SCALE)]  ; normal scale
    STD AL, [addr(#TILE-PAGE-0-SET)]    ; use tile set 0
    INC A
    STD AL, [addr(#TILE-PAGE-0-LAYER)]  ; make tile page 0 visible at layer 1
    LDI AL, 0xFF
    STD AL, [addr(#TILE-PAGE-1-LAYER)]  ; but hide tile page 1
    STD AL, [addr(#TILE-PAGE-2-LAYER)]  ; and page 2
    STD AL, [addr(#TILE-PAGE-3-LAYER)]  ; and page 3

    ; clear tile page 0
    LDI A, #TILE-PAGE-LEN               ; each part of text mode is 1024 bytes
    MOV C, A                            ; so we'll fill memory in 1024-size blocks
    XOR A, A                            ; and starts at address 0
    MOV D, A
    MFILL DB : D, AL * C                ; fill with zeros; A is already zero
    ADD D, C                            ; move to background color (also 0x00)
    MFILL DB : D, AL * C
    ADD D, C                            ; move to foreground color
    LDI AL, 0xFF                        ; and fill with 0xFF
    MFILL DB : D, AL * C

    ; set up graphic parameters
    LDI AL, bank(#GRAPHICS-BOT)         ; graphic parameters are in bank 0
    MOV DB, A
    LDI AL, 0x09                        ; Set background color
    STD AL, [addr(#BACKGROUND-COLOR)]
    LDI A, 0x0000                       ; set border size (0px x 0px)
    STD A, [addr(#BORDER-SIZE-X)]
    LDI AL, 0x3F                        ; set border color
    STD AL, [addr(#BORDER-COLOR)]
    LDI AL, 0xFF                        ; hide graphics layer
    STD AL, [addr(#GRAPHICS-LAYER)]

    ; clear the color palette
    LDI A, #PALETTE-LEN
    MOV C, A                            ; need to zero 256 * 4 entries
    LDI A, addr(#PALETTE-BOT)
    MOV D, A                            ; palette starts at 0x1FC00
    XOR A, A
    MFILL DB : D, AL * C

    ; set up color palette
    LDI A, 215                          ; need to configure 216 entries
    MOV X, A
    LDI A, addr(#PALETTE-TOP)           ; the palette starts at 0x1FC00, but we're
                                        ; at the last value (255 is at 0x1FFFC),
                                        ; but we also do reverse a, b, g, r
    MOV D, A
_loop:
    ; The default palette consists of hand-chosen colors in the lower 40 entries
    ; while the top 216 colors are rgb colors determined using the six-level rgb
    ; palette (seen here: https://en.wikipedia.org/wiki/List_of_software_palettes#6_level_RGB)
    ;

    DEC D                               ; alpha is always ignored

    XOR A, A                            ; upper 16-bits of mod/div need to be zero
    MOV C, A

    ; blue
    MOV B, X
    LDI AL, 6                           ; blue is selected using modulo 6
    IMOD C * B, A                       ; (C)B now has the blue value
    LDI AL, 51
    MUL C * B, A                        ; * 51 gets us 0, 51, 102, 153, 204, 255
    MOV A, B
    STD AL, [D]                         ; store it
    DEC D

    ; green
    MOV B, X
    LDI AL, 6                           ; green is selected by dividing by 6
    IDIV C * B, A
    LDI A, 6                            ; and then modulo 6
    IMOD C * B, A
    LDI AL, 51
    MUL C * B, A
    MOV A, B
    STD AL, [D]
    DEC D

    ; red
    MOV B, X
    LDI AL, 36                          ; red is selected by dividing by 36
    IDIV C * B, A
    LDI A, 6                            ; and then modulo 6
    IMOD C * B, A
    LDI AL, 51
    MUL C * B, A
    MOV A, B
    STD AL, [D]
    DEC D

    LOOP X, >_loop                      ; continue looping until X < 0

    ; next we have 16 grayscales
    LDI AL, 15                          ; 15 to zero
    MOV X, A
    LDI AL, 4                           ; shift intensity by four
    MOV B, A
_loop:
    MOV A, X
    SHL A, B
    DEC D                               ; alpha is always skipped
    STD AL, [D]                         ; store gray color of A intensity
    DEC D
    STD AL, [D]
    DEC D
    STD AL, [D]
    DEC D

    LOOP X, >_loop                      ; continue looping until X < 0

    ; now we have 24 colors left; this will be 3 intensity levels of RGB

    LDI A, 23                           ; 24 colors, not counting black
    MOV X, A
_loop:
    XOR A, A                            ; set color to zero
    MOV B, X
    MOV C, X
    CLRR BL, 0b11100111                 ; intensity bits will only ever be 00, 01, 10
    SETR AL, 0b00111111
    IFR BL,  0b00001000
        SETR AL, 0b01000000
    IFR BL,  0b00010000
        SETR AL, 0b11000000
    DEC D                               ; don't care about alpha byte
    IFR CL,  0b00000001                 ; blue
        STD AL, [D]
    DEC D
    IFR CL,  0b00000010                 ; green
        STD AL, [D]
    DEC D
    IFR CL,  0b00000100                 ; red
        STD AL, [D]
    DEC D

    LOOP X, >_loop                      ; next color

    ; code starts at 0x01000, so pop there
    LDI A, #CODE-BOT
    PUSH A
    RET