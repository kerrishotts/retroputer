# code.regs: A=0x0010
# code.flags: Z+
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
_loop:
    inc a                               {$C0}
    cmp a, 0x10                         {$58 $00 $10}
    brs nz _loop                        {$98 $01 $F9}
    brk                                 {$3F}
}
