.data+ 0x0B000
;
; cursor control
;
; ####################################################################

.var cursor-pos                         ; row, col of cursor
    .dw 0x0000                          ; (row * 40) + col

.var cursor-page                        ; page the cursor is on
    .db 0x00                            ; if 0xFF, invisible

.var cursor-blink-enable                ; if 1, the cursor can blink
    .db 0x01                            ; {:1} indicates which state the cursor
                                        ; is in; 0 = hidden, 1 = visible

.var cursor-blink-counter               ; current # of frames before blinking
    .db 30

.var cursor-blink-duration              ; # of frames before blinking
    .db 30

.var cursor-color-original              ; original fg/bg colors
    .dw 0xFF00

.var cursor-color                       ; color of the cursor (fg: hi, bg: lo)
    .dw 0x00FF

.code+ 0x0C000
;
; cursor code
;
; ####################################################################

cursor-render:
    PUSHA
    XOR A, A
    LDI AL, bank(&cursor-page)
    MOV SB, A
    LDS A, [addr(&cursor-page)]
    IF N
        BR :cursor-render-exit
    MOV C, A

    ; calculate the base page
    LDI A, 0x1000                       ; length of a page
    MOV B, A
    LDI A, addr(#TILE-PAGE-0-BOT)       ; base of page zero
_loop:
    DEC C
    IF N
        BRS >_exit
    ADD A, B
    BRS >_loop
_exit:

    ; get cursor position
    MOV D, A
    LDS A, [addr(&cursor-pos)]
    MOV X, A


cursor-render-exit:
    POPA
    RET

;
; sets the position of the cursor
;
; @param    word    pos    +0x0002
; @returns  void
;
cursor-set-pos:
    ENTER 0x00
    PUSHA

    LDI A, bank(&cursor-pos)
    MOV DB, A

    LDS A, [BP+0x0002]                  ; first parameter is position
    STD A, [addr(&cursor-pos)]

    POPA
    EXIT 0x00
    RET

;
; PUBLIC
; gets the current position of the cursor
;
; @returns  word    pos    +0x0002
;
cursor-get-pos:
    ENTER 0x00
    PUSHA

    LDI A, bank(&cursor-pos)
    MOV SB, A

    LDS A, [addr(&cursor-pos)]
    STD A, [BP+0x0002]                  ; return is on caller stack

    POPA
    EXIT 0x00
    RET
