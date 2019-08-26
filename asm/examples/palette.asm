.segment code 0x02000 {
    ld x, 33
    ld al, 0
    ld bl, 0
    do {
        ld dl, 32
        st [0x10000, x], dl
        ld dl, 0
        st [0x11000, x], dl
        mov cl, bl
        shl cl, 4
        or cl, al
        st [0x12000, x], cl
        inc x
        inc al
        cmp al, 16
        br z next-line
        continue
next-line:
        ld dl, 16
        add x, dl
        ld al, 0
        inc bl
        cmp bl, 16
    } while !z

    brk
}
