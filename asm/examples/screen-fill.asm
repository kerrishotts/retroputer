.segment code 0x02000 {
    ld al, 0
top:
    ld x, 0
    ld c, 768
    ld bl, 0xff
    ld dl, 0
    do {
        st [0x10000,x], al
        st [0x11000,x], bl
        st [0x12000,x], dl
        inc al
        inc x
        dec c
    } while !z
    dec al
    br top
    brk
}