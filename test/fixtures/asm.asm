.segment test-nop 0x0000 {
    nop                                 {$00}
}

# test-load-and-add-dw-1.regs: A=0x0246 B=0x0123
# test-load-and-add-dw-1.flags: C- Z- N- V-
.segment test-load-and-add-dw-1 0x0000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    ld b, 0x0123                        {$12 $00 $01 $23}
    add a, b                            {$01 $02}
}

# test-load-and-add-db-1.regs: AL=0x46 BL=0x23
# test-load-and-add-db-1.flags: C- Z- N- V-
.segment test-load-and-add-db-1 0x0000 {
    ld al, 0x23                         {$11 $00 $23}
    ld bl, 0x23                         {$13 $00 $23}
    add al, bl                          {$01 $13}
}

# test-load-and-add-dw-2.regs: A=0x0246
# test-load-and-add-dw-2.flags: C- Z- N- V-
.segment test-load-and-add-dw-2 0x0000 {
    ld a, 0x0123                        {$10 $00 $01 $23}
    add a, 0x0123                       {$48 $01 $23}
}

# test-load-dw-1.regs: A=0x0000
.segment test-load-dw-1 0x0000 {
    ld a, 0x0000                        {$10 $00 $00 $00}
}

# test-load-and-store-dw-1.regs: A=0x1234 B=0x1234
.segment test-load-and-store-dw-1 0x0000 {
    ld b, 0x1234                        {$12 $00 $12 $34}
    st [0x01000], b                     {$22 $40 $10 $00}
    ld a, [0x01000]                     {$10 $40 $10 $00}
}

# test-load-and-store-dw-3.regs: A=0x1234 B=0x1234 D=0x1000
.segment test-load-and-store-dw-3 0x0000 {
    ld b, 0x1234                        {$12 $00 $12 $34}
    ld d, 0x1000                        {$16 $00 $10 $00}
    st [d], b                           {$22 $C0 $00 $00}
    ld a, [d]                           {$10 $C0 $00 $00}
}

# test-load-and-store-dw-2.regs: A=0x2345 B=0x2345
.segment test-load-and-store-dw-2 0x0000 {
    ld b, 0x1234                        {$12 $00 $12 $34}
    st [0x01000], b                     {$22 $40 $10 $00}
    ld b, 0x2345                        {$12 $00 $23 $45}
    st [0x01234], b                     {$22 $40 $12 $34}
    ld a, <0x01000>                     {$10 $60 $10 $00}
}



