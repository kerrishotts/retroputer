;
; generates a rendering of all 256 colors in the current palette in a
; 16 x 16 grid on tile page 0 and then halts.
;
.code 0x01000
main:
    LDI A, 240
    MOV C, A
    LDI A, 0x03
    MOV DB, A
    LDI A, 0x10
    MOV B, A
    LDI A, 40 
    MOV D, A
    XOR A, A
    XOR Y, Y
    INC Y
_next-row:
    ADD Y, D
    XOR X, X

_loop:
    STD AL, [0x0400+X+Y]
    INC A
    INC X
    CMP X, B
    IF Z
        BR :_next-row

    DEC C
    IF C
        BR :_loop

_halt:
    HALT 0x00
    BR :_halt
