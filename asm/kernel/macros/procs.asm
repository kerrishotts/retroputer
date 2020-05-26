.define BIG_ENTER(size) {
    push bp
    push a
    bp := sp
    ld a, size()
    clr c
    sub sp, a
}

.define BIG_EXIT(size) {
    ld a, size()
    clr c
    add sp, a
    pop a
    pop bp
}