# PROCEDURE SEMANTICS

Initially:
   BP: 0x1000
   SP: 0x1000

To call a procedure with three word-sized parameters, returning one word:

```
caller:
    LDI A, 0x0400   ; param 1
    PUSH A          ; SP: 0FFE  BP: 1000    (SP=)ARG-1 (BP)
    LDI A, 0x0800   ; param 2
    PUSH A          ; SP: 0FFC  BP: 1000    (SP=)ARG-2 ARG-1 (BP)
    LDI A, 0x0C00   ; param 3
    PUSH A          ; SP: 0FFA  BP: 1000    (SP=)ARG-3 ARG-2 ARG-1 (BP)
    LDI A, 0        ; return value
    PUSH A          ; SP: 0FF8  BP: 1000    (SP=)RETRN ARG-3 ARG-2 ARG-1 (BP)
    CALL proc       ; SP: 0FF6  BP: 1000    (SP=)RTADR RETRN ARG-3 ARG-2 ARG-1 (BP)
    ;returned         SP: 0FF8  BP: 1000    (SP=)RETRN ARG-3 ARG-2 ARG1 (BP)
    POP A           ; SP: 0FFA  BP: 1000    (SP=)ARG-3 ARG-2 ARG-1 (BP)
    MOV B, A
    POP A           ; SP: 0FFC
    POP A           ; SP: 0FFE
    POP A           ; SP: 1000
    ; or
    ; LDI A, 6
    ; ADD SP, A
    MOV A, B

proc:
    ENTER 0x04      ; (assume two local word variables, VAR-1, VAR-2)
        push sp     ; SP: 0FF4  BP: 1000    (SP=)0F F6 RTADR RETRN ARG-3 ARG-2 ARG-1 (BP)
        push bp     ; SP: 0FF2  BP: 1000    (SP=)10 00 0F F6 RTADR RETRN ARG-3 ARG-2 ARG-1 (BP)
        bp = sp     ; SP: 0FF2  BP: 0FF2
        sp -= 04    ; SP: 0FEE  BP: 0FF2
    PUSHA           ; SP: 0FD9  BP: 0FF2    (SP=)(21 bytes) VAR-2 VAR-1 (BP=)10 00 0F F6 RTADR RETRN ARG-3 ARG-2 ARG-1

    LDS A, [BP+-2]  ; A = VAR-1
    LDS A, [BP+-4]  ; A = VAR-2

    LDS A, [BP+4]   ; A = RTADR
    STS A, [BP+6]   ; A = RETRN VALUE
    LDS A, [BP+8]   ; A = ARG-3
    LDS A, [BP+0x0A]; A = ARG-2
    LDS A, [BP+0x0C]; A = ARG-1

    POPA            ; SP: 0FEE BP: 0FF2
    EXIT 0x04       ; SP: 0FF6 BP: 1000
    RET             ; SP: 0FF8 BP: 1000

```