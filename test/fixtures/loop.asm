# code.regs: A=0xFFFF C=0x0000
# code.flags: Z+ C- N-
.segment code 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    ld c, 0xFFFF                        {$14 $00 $FF $FF}
_loop:
    inc a                               {$C0}
    loops _loop, c
    brk                                 {$3F}
}
