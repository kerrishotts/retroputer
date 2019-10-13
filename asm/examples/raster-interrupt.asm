.segment traps 0x03000 {
handle-frame:
    set id
    pushf
    push a
    ld al, [border-color]
    out 0x2B, al
    inc al
    cmp al, 0x27
    br !z, skip
    ld al, 0x18
skip:
    st [border-color], al
    pop a
    popf
    clr id
    ret
border-color:
    .byte 0x18
}

.segment code 0x02000 {
    ld a, traps.handle-frame
    st [0x88*2], a
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
