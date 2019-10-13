.segment code 0x02000 {
    ld al, 0x00
    out 0x12, al     # set the layer we're modifying
    ld al, 2
    out 0x1B, al     # graphics mode 2
    ld al, 0
top:
    ld x, 49152
    ld bl, 0xff
    ld dl, 0
    do {
        st [0x10000,x], al
        inc al
        mov bl, al
        or bl, 0b10100100
        out 0x2B, bl
        dec x
    } while !c
setdma:
    # source
    ld cl, 0x01
    out 0xd0, cl
    ld cl, 0x00
    out 0xd1, cl
    ld cl, 0x00
    out 0xd2, cl
    # target
    ld cl, 0x01
    out 0xd4, cl
    ld cl, 0x00
    out 0xd5, cl
    ld cl, 0x01
    out 0xd6, cl
    # length
    ld cl, 0xBF
    out 0xd8, cl
    ld cl, 0xff
    out 0xd9, cl
    # execute
    ld cl, 0x01
dma:
    out 0xdc, cl
    st [0x10000], al
    inc al
sleep:
    inc bl
    out 0x2B, bl
    in dl, 0x2E
    cmp dl, 0xf0
    br !z sleep
hold:
    in dl, 0x2E
    cmp dl, 0xf0
    br z hold
    br dma
    brk
}
