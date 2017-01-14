;
; bootstraps the machine to expected initial state
; by default, memory is going to be randomized; we need to clear
; the screen, set up our registers, and then start code execution
; at 0x01000.

.data 0x00000
.var vRESET
    .dw @RESET

.data 0x001E0
.var vFRAME
    .dw @FRAME

.data 0x001FC
.var vBADOP
    .dw @BADOP

.code 0x0FE00
FRAME:
    RET

.code 0x0FF00
RESET:
    ; reset flags to expected state
    LDI AL, 0xA0
    POP Flags
    ;CLR Z
    ;CLR N 
    ;CLR V 
    ;CLR C 
    ;CLR M 
    ;CLR E
    ;SET I 
    ;SET X 

    ; Set SP and BP to 0x01000
    LDI A, 0x1000
    MOV SP, A
    MOV BP, A 

    ; set up the tile page and clear it
    LDI AL, 0x03        ; tile page 0 is in bank 3
    MOV DB, A

    ; Set up initial text mode
    XOR A, A            ; setting zeros for most things
    STD A, [0x0FF9]     ; zero crop
    STD A, [0x0FFD]     ; offset (0, 0)
    STD AL, [0x0FFB]    ; normal scale
    STD AL, [0x0FFC]    ; use tile set 0
    INC A
    STD AL, [0x0FFF]    ; make tile page 0 visible at layer 1
    LDI AL, 0xFF
    STD AL, [0x1FFF]    ; but hide tile page 1
    STD AL, [0x2FFF]    ; and page 2
    STD AL, [0x3FFF]    ; and page 3

    ; clear tile page 0
    LDI A, 0x0400       ; each part of text mode is 1024 bytes
    MOV C, A            ; so we'll fill memory in 1024-size blocks
    XOR A, A            ; and starts at address 0
    MOV D, A
    MFILL DB : D, AL * C; fill with zeros; A is already zero
    ADD D, C            ; move to background color (also 0x00)
    MFILL DB : D, AL * C 
    ADD D, C            ; move to foreground color
    LDI AL, 0xFF        ; and fill with 0xFF
    MFILL DB : D, AL * C

    ; set up graphic parameters
    LDI AL, 0x01        ; graphic parameters are in bank 0
    MOV DB, A
    LDI AL, 0x09        ; Set background color
    STD AL, [0xFA0B]
    LDI A, 0x0101       ; set border size (1px x 1px)
    STD A, [0xFA05]
    LDI AL, 0x3F        ; set border color
    STD AL, [0xFA04]
    LDI AL, 0xFF        ; hide graphics layer
    STD AL, [0xFA02]

    ; clear the color palette
    LDI A, 0x0400
    MOV C, A            ; need to zero 256 * 4 entries
    LDI A, 0xFC00
    MOV D, A            ; palette starts at 0x1FC00
    XOR A, A
    MFILL DB : D, AL * C

    ; set up color palette
    LDI A, 215          ; need to configure 216 entries
    MOV X, A
    LDI A, 0xFFFF       ; the palette starts at 0x1FC00, but we're
                        ; at the last value (255 is at 0x1FFFC),
                        ; but we also do reverse a, b, g, r
    MOV D, A
_loop:
    ; The default palette consists of hand-chosen colors in the lower 40 entries
    ; while the top 216 colors are rgb colors determined using the six-level rgb
    ; palette (seen here: https://en.wikipedia.org/wiki/List_of_software_palettes#6_level_RGB)
    ;

    DEC D               ; alpha is always ignored

    XOR C, C            ; upper 16-bits of mod/div need to be zero
    XOR A, A

    ; blue
    MOV B, X
    LDI AL, 6           ; blue is selected using modulo 6
    IMOD C * B, A       ; (C)B now has the blue value
    LDI AL, 51
    MUL C * B, A        ; * 51 gets us 0, 51, 102, 153, 204, 255
    MOV A, B
    STD AL, [D]         ; store it
    DEC D

    ; green
    MOV B, X
    LDI AL, 6            ; green is selected by dividing by 6
    IDIV C * B, A
    LDI A, 6            ; and then modulo 6
    IMOD C * B, A       ; 
    LDI AL, 51
    MUL C * B, A        ; * 51 gets us 0, 51, 102, 153, 204, 255
    MOV A, B
    STD AL, [D]         ; store it
    DEC D

    ; red
    MOV B, X
    LDI AL, 36           ; red is selected by dividing by 36
    IDIV C * B, A
    LDI A, 6            ; and then modulo 6
    IMOD C * B, A       ;
    LDI AL, 51
    MUL C * B, A        ; * 51 gets us 0, 51, 102, 153, 204, 255
    MOV A, B
    STD AL, [D]         ; store it
    DEC D

    DEC X               ; dec our index
    IF C                ; keep going below zero
        BR :_loop

    ; next we have 16 grayscales
    LDI AL, 15           ; 15 to zero
    MOV X, A
    LDI AL, 4            ; shift by four
    MOV B, A
_loop:
    MOV A, X
    SHL A, B
    DEC D                ; alpha is always skipped
    STD AL, [D]
    DEC D
    STD AL, [D]
    DEC D
    STD AL, [D]
    DEC D

    DEC X
    IF C
        BR :_loop

    ; now we have 24 colors left and 32 bytes to do it in
    ; i i r g b

    LDI A, 23           ; 24 colors, not counting black
    MOV X, A
_loop:
    XOR A, A            ; set color to zero
    MOV B, X
    MOV C, X
    CLRR BL, 0b11100111  ; intensity bits will only ever be 00, 01, 10
    SETR AL, 0b00111111
    IFR BL,  0b00001000
        SETR AL, 0b01000000
    IFR BL,  0b00010000
        SETR AL, 0b11000000
    DEC D               ; don't care about alpha byte
    IFR CL,  0b00000001  ; blue
        STD AL, [D]
    DEC D
    IFR CL,  0b00000010  ; green
        STD AL, [D]
    DEC D
    IFR CL,  0b00000100  ; red
        STD AL, [D]
    DEC D

    DEC X               ; next color
    IF C
        BR :_loop

    ; code starts at 0x01000, so pop there
    LDI A, 0x1000
    PUSH A
    RET

.code 0x0FFFF
BADOP:
DEFAULT-TRAP-HANDLER:
    RET