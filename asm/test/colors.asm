;
; colors.asm
;
; renders all 256 colors combinations on the graphics layer and scrolls the
; contents slowly
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

.def graphics-layer-value 0x01
.def graphics-layer-size 63999

.data 0x1FA02
.var graphics-layer

.code 0x1000
_init:
    LDI AL, bank(&graphics-layer)
    MOV DB, A                           ; set destination bank appropriately
    LDI AL, #graphics-layer-value
    STD AL, [addr(&graphics-layer)]
    LDI A, #graphics-layer-size
    MOV B, A                            ; B = size of graphics layer
    XOR A, A                            ; zero A
_outer-loop:
    MOV X, B                            ; reset X to size of graphics layer
_inner-loop>
    STD AL, [0x0000+X]                  ; write color value to graphics layer
    INC A
    LOOP X, >_inner-loop                ; and loop until x<0
    DEC A                               ; will cause the screen to scroll left
    BR :_outer-loop
