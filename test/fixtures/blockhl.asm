# code.regs: A=0x8000 C=0xFFFF
# code.flags: Z- C+ N+
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    ld c, 0xFFFE                        {$14 $00 $FF $FE}
    do {
        inc a                           {$C0}
        dec c
    } while !c
    ld c, 0x7FFE                        {$14 $00 $7F $FE}
    do {
        dec a                           {$D0}
        dec c
    } while !c
    brk                                 {$3F}
}
