# code.regs: A=0x8000 C=0xFFFF
# code.flags: Z- C+ N+
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    ld c, 0xFFFE                        {$14 $00 $FF $FE}
    label: {
    _loop:
        inc a                           {$C0}
        loops _loop, c                  {$84 $01 $FC}
    }
    ld c, 0x7FFE                        {$14 $00 $7F $FE}
    {
    _loop:                                                        # making sure we can redeclare!
        dec a                           {$D0}
        loops _loop, c                  {$84 $01 $FC}
        br _done
    _done:
        nop
    }
    brk                                 {$3F}
}
