.data+ 0x0B000
;
; cursor control
;
; ####################################################################

.var cursor-pos
    .dw 0x0000

.var cursor-visible
    .db 0x01

.var cursor-blink-enable
    .db 0x01

.var cursor-blink-counter
    .db 30

.var cursor-blink-reset
    .db 30


.code+ 0x0C000
;
; cursor code
;
; ####################################################################

cursor-render:
    PUSHA
    XOR A, A
    LDI AL, bank(&cursor-visible)
    MOV DB, A
    LDI A, [addr(&cursor-visible)]
    IF Z
        BR :cursor-render-exit

    
    
cursor-render-exit:
    POPA
    RET