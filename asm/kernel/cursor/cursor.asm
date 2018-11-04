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
    .db 15

.var cursor-color-original              ; original fg/bg colors
    .dw 0xFF00

.var cursor-color                       ; color of the cursor (fg: hi, bg: lo)
    .dw 0x00FF

.code+ 0x0C000
;
; cursor code
;
; ####################################################################

; get the cursor's page base
_get-cursor-page-base:
    ENTER 0x00
    PUSHA

; c = cursor-page
    XOR A, A
    LDS AL, [addr(&cursor-page)]
    MOV C, A

; b = 1000 (size of page)
    LDI A, #TILE-PAGE-OFFSET
    MOV B, A
; a = TILE-PAGES-BOT - PAGE-LENGTH (because we'll always add at least ONCE)
    LDI A, addr(#TILE-PAGES-BOT)
    SUB A, B
; while(C>=0) A+=B, C--
_get-cursor-page-base-loop:
    ADD A, B
    LOOP C, >_get-cursor-page-base-loop
; ret A
    STS A, [#BP-RET-VAL]

    POPA
    EXIT 0x00
    RET

;
; cursor-render
;
; cursor render is expected to be called sixty times a second (once per frame)
; this function handles the cursor rendering and the blinking of the cursor as
; well.
cursor-render:
    PUSHA                               ; push current state

; zero out A, and get the source bank. The source bank will be consistent
; for the remainder of the function, so we won't modify it again.

    XOR A, A                            ; zero
    LDI AL, bank(&cursor-page)          ; get the address of the cursor's
    MOV SB, A                           ; page so that we know which

    LDI AL, bank(#TILE-PAGES-BOT)       ; set destination bank to tile page
    MOV DB, A                           ; memory

; FIRST, determine if we need to render the cursor at all. This is controlled
; by the cursor's page. If it's positive (or zero), the cursor is visible on
; the respective tile page. If it's negative (0xFF), the cursor is hidden.
    LDS AL, [addr(&cursor-page)]        ; tile page the cursor is rendering
    IF N                                ; on. If the page is negative,
        BR :cursor-render-exit          ; we exit.
    MOV C, A                            ; Move page to C

    ; calculate the base page
    PUSH C                              ; will be replaced with return value
                                        ; doesn't matter, really, we just want to reserve
                                        ; two bytes on the stack for the return value
    CALL :_get-cursor-page-base          ; determine the base page
    POP X                               ; X is now the base page

; next, determine if the cursor is blinking or not. If cursor-blink-enable:1 is
; zero, then the cursor can't blink, so there's no point in doing any frame
; counting.
    LDS AL, [addr(&cursor-blink-enable)] ; get the enable value
    IFNR AL, 0b00000001                  ; if not set, no blinking, so jump
        BRS >cursor-draw                ; straight to drawing the cursor

; we know the cursor can be blinking, so let's tweak our counters appropriately.
    LDS AL, [addr(&cursor-blink-counter)]; get the curent frames remaining before blinking
    DEC A                               ; Down by one
    IF Z                                ; if zero, we need to trigger a blink!
        CALLS >cursor-toggle            ; toggle the cursor
    STS AL, [addr(&cursor-blink-counter)]; put the new value into the counter
    BRS >cursor-draw                    ; and draw the cursor appropriately

cursor-toggle:
    LDI A, 0b00000010                   ; the toggle value
    MOV B, A                            ; B = 2
    LDS AL, [addr(&cursor-blink-enable)] ; get the enable value
    XOR A, B                            ; flip bit 1
    STS AL, [addr(&cursor-blink-enable)] ; store the toggle back
    LDS AL, [addr(&cursor-blink-duration)] ; get duration; this will get stored
    RET                                 ; back into the counter on return

cursor-draw:

    ; get cursor position
    XOR A, A
    MOV D, A
    LDS A, [addr(&cursor-pos)]
    MOV Y, A                            ; X + Y is now the address in memory

    ; get the blink state
    LDS AL, [addr(&cursor-blink-enable)]
    MOV B, A
    IFNR BL, 0b00000010
        LDS A, [addr(&cursor-color-original)]
    IFR BL, 0b00000010
        LDS A, [addr(&cursor-color)]

    STD AL, [0x400+X+Y]                 ; AL --> background color
    XCB A                               ; swap the hi/lo bytes
    STD AL, [0x800+X+Y]                 ; AL --> foreground color

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

; first, we need to get the current cursor position -- we're going to need
; to do some clean up to ensure that we don't leave traces of the cursor
; behind.

    LDI AL, bank(&cursor-pos)
    MOV SB, A
    LDI AL, bank(#TILE-PAGE-0-BOT)
    MOV DB, A

    LDS A, [addr(&cursor-pos)]          ; A is the current cursor position
    MOV Y, A                            ; store it in X

    PUSH X                              ; need address of base page
    CALL :_get-cursor-page-base
    POP X                               ; now in X

; get the new cursor position and store it
    LDS A, [BP+0x0002]                  ; first parameter is position
    STS A, [addr(&cursor-pos)]

; next, make sure we store the ORIGINAL color values into the OLD positions
    LDS A, [addr(&cursor-color-original)]
    STD AL, [0x400+X+Y]                 ; AL --> background color
    XCB A                               ; swap the hi/lo bytes
    STD AL, [0x800+X+Y]                 ; AL --> foreground color

; NEXT: get the new original color
    LDS A, [addr(&cursor-pos)]
    MOV Y, A
    LDD AL, [0x800+X+Y]
    XCB A
    LDD AL, [0x400+X+Y]
    STS A, [addr(&cursor-color-original)]

; trigger a fresh blink
    LDI AL, 0x01                        ; 1 will dec next frame
    STS AL, [addr(&cursor-blink-counter)]
    LDI AL, 0b00000010
    MOV B, A
    LDS AL, [addr(&cursor-blink-enable)]; get current status
    OR A, B                             ; force bit 2 on
    STS AL, [addr(&cursor-blink-enable)]; next cursor will draw solid

; done!
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
