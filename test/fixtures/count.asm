# code.regs: A=0xFFFF
# code.flags: Z+ C- N-
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
_loop:
    inc a                               {$C0}
    cmp a, 0xFFFF                       {$58 $FF $FF}
    brs nz _loop                        {$98 $01 $F9}
    brk                                 {$3F}
}
