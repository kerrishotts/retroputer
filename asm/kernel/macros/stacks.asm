.define STPUSH(v, stack) {
    push c
    push d
    push x
    LDPTR(d, x, stack())
    c := v()
    call [vectors.STACK_PUSH]
    pop x
    pop d
    pop c
}

.define STPUSH_BP(v, offset) {
    push c
    push d
    push x
    c := v()
    ld d, offset()
    x := bp
    clr c
    add x, d
    d := 0
    call [vectors.STACK_PUSH]
    pop x
    pop d
    pop c
}

.define STPOP(v, stack) {
    push c
    push d
    push x
    LDPTR(d, x, stack())
    clr z
    call [vectors.STACK_POP]
    pop x
    pop d
    v() := c
    pop c
}

.define STPOP_BP(v, offset) {
    push c
    push d
    push x
    ld d, offset()
    x := bp
    clr c
    add x, d
    d := 0
    clr z
    call [vectors.STACK_POP]
    pop x
    pop d
    v() := c
    pop c
}

.define STPEEK(v, stack) {
    push c
    push d
    push x
    LDPTR(d, x, stack())
    set z
    call [vectors.STACK_POP]
    pop x
    pop d
    v() := c
    pop c
}

.define STPEEK_BP(v, offset) {
    push c
    push d
    push x
    ld d, offset()
    x := bp
    clr c
    add x, d
    d := 0
    set z
    call [vectors.STACK_POP]
    pop x
    pop d
    v() := c
    pop c
}

.define INIT_STACK(size) {
    .word 0
    .word[size()]
}

.define INIT_STACK_BP(offset) {
    push d
    push x
    ld d, offset()
    x := bp
    clr c
    add x, d
    d := 0
    [d, x] := d
    pop x
    pop d
}