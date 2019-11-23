.segment test-nop 0x02000 {
    nop                                 {$00}
    brk                                 {$3F}
}

# test-cmp-dw-1.regs: A=0x0123 B=0x0123
# test-cmp-dw-1.flags: C- Z+ N-
.segment test-cmp-dw-1 0x02000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    ld b, 0x0123                        {$12 $00 $01 $23}
    cmp a, b                            {$03 $02}
    brk                                 {$3F}
}

# test-cmp-dw-2.regs: A=0x0123 B=0x0124
# test-cmp-dw-2.flags: C+ Z- N+
.segment test-cmp-dw-2 0x02000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    ld b, 0x0124                        {$12 $00 $01 $24}
    cmp a, b                            {$03 $02}
    brk                                 {$3F}
}

# test-cmp-dw-3.regs: A=0x0123 B=0x0122
# test-cmp-dw-3.flags: C- Z- N-
.segment test-cmp-dw-3 0x02000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    ld b, 0x0122                        {$12 $00 $01 $22}
    cmp a, b                            {$03 $02}
    brk                                 {$3F}
}

# test-cmp-dw-4.regs: A=0x0001 B=0xFFFF
# test-cmp-dw-4.flags: C+ Z- N-
.segment test-cmp-dw-4 0x02000 {
    ld a, 0x0001                        {$10 $00 $00 $01}
    ld b, 0xFFFF                        {$12 $00 $FF $FF}
    cmp a, b                            {$03 $02}
    brk                                 {$3F}
}

# test-cmp-dw-5.regs: A=0x0001
# test-cmp-dw-5.flags: C+ Z- N-
.segment test-cmp-dw-5 0x02000 {
    ld a, 0x0001                        {$10 $00 $00 $01}
    cmp a, 0xFFFF                       {$58 $FF $FF}
    brk                                 {$3F}
}

# test-cmp-flags-1.regs: A=0x2000 B=0x2001
# test-cmp-flags-1.flags: Z- N+
.segment test-cmp-flags-1 0x02000 {
    ld a, 0x2000
    ld b, 0x2001

    set c                              # set c -- cmp shouldn't be affected
    cmp a, b                           # a is <= b, so N should be set, Z should be clear
    brk
}

# test-load-and-add-dw-1.regs: A=0x0246 B=0x0123
# test-load-and-add-dw-1.flags: C- Z- N- V-
.segment test-load-and-add-dw-1 0x02000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    ld b, 0x0123                        {$12 $00 $01 $23}
    add a, b                            {$01 $02}
    brk                                 {$3F}
}

# test-load-and-add-db-1.regs: AL=0x46 BL=0x23
# test-load-and-add-db-1.flags: C- Z- N- V-
.segment test-load-and-add-db-1 0x02000 {
    ld al, 0x23                         {$11 $00 $23}
    ld bl, 0x23                         {$13 $00 $23}
    add al, bl                          {$01 $13}
    brk                                 {$3F}
}

# test-load-and-add-dw-2.regs: A=0x0246
# test-load-and-add-dw-2.flags: C- Z- N- V-
.segment test-load-and-add-dw-2 0x02000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    add a, 0x0123                       {$48 $01 $23}
    brk                                 {$3F}
}

# test-load-dw-1.regs: A=0x0000
.segment test-load-dw-1 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    brk                                 {$3F}
}

# test-load-and-store-dw-1.regs: A=0x1234 B=0x1234
.segment test-load-and-store-dw-1 0x02000 {
    ld b, 0x1234                        {$12 $00 $12 $34}
    st [0x01000], b                     {$22 $40 $10 $00}
    ld a, [0x01000]                     {$10 $40 $10 $00}
    brk                                 {$3F}
}

# test-load-and-store-dw-3.regs: A=0x1234 B=0x1234 D=0x0010
.segment test-load-and-store-dw-3 0x02000 {
    ld b, 0x1234                        {$12 $00 $12 $34}
    ld d, 0x0010                        {$16 $00 $00 $10}
    st [d], b                           {$22 $C0 $00 $00}
    ld a, [d]                           {$10 $C0 $00 $00}
    brk                                 {$3F}
}

# test-load-and-store-dw-2.regs: A=0x2345 B=0x2345
.segment test-load-and-store-dw-2 0x02000 {
    ld b, 0x1234                        {$12 $00 $12 $34}
    st [0x01000], b                     {$22 $40 $10 $00}
    ld b, 0x2345                        {$12 $00 $23 $45}
    st [0x01234], b                     {$22 $40 $12 $34}
    ld a, <0x01000>                     {$10 $60 $10 $00}
    brk                                 {$3F}
}

# test-dec-from-zero.regs: A=0xFFFF
# test-dec-from-zero.flags: C+
.segment test-dec-from-zero 0x02000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
    dec a                               {$D0}
    brk                                 {$3F}
}

# test-dec-from-max-word.regs: C=0xFFFE
# test-dec-from-max-word.flags: C-
.segment test-dec-from-max-word 0x02000 {
    ld c, 0xFFFF                        {$14 $00 $FF $FF}
    dec c                               {$D4}
    brk                                 {$3F}
}

# test-dec-from-zero-3.regs: C=0x7FFF
# test-dec-from-zero-3.flags: C-
.segment test-dec-from-zero-3 0x02000 {
    ld c, 0x8000                        {$14 $00 $80 $00}
    dec c                               {$D4}
    brk                                 {$3F}
}

# test-dec-with-carry.regs: A=0x0FFF
# test-dec-with-carry.flags: Z-
.segment test-dec-with-carry 0x02000 {
    ld a, 0x1000
    set c
    dec a
    brk
}

# test-inc-with-carry.regs: A=0x1001
# test-inc-with-carry.flags: Z-
.segment test-inc-with-carry 0x02000 {
    ld a, 0x1000
    set c
    inc a
    brk
}

# test-div-by-zero.regs: A=0x0 B=0
# test-div-by-zero.flags: EX+
.segment test-div-by-zero 0x02000 {
    ld a, 0x1000
    ld b, 0
    div a, b
    brk
}