# code.regs: A=0xFFFF C=0xFFFF
# code.flags: Z- C+ N+
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    ld c, 0xFFFE                        {$14 $00 $FF $FE}
_loop:
    inc a                               {$C0}
    loops _loop, c                      {$84 $01 $FC}
    brk                                 {$3F}
}
