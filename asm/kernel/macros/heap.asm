.define MAKE_HEAP(heap, size) {
    push c
    push d
    push x
    LDPTR(d, x, heap())
    ld c, size()
    call [vectors.MAKE_HEAP]
    pop x
    pop d
    pop c
}
.define GET_HEAP_FREE(heap) {
    push d
    push x
    LDPTR(d, x, heap())
    call [vectors.GET_HEAP_FREE]
    pop x
    pop d
}
.define ALLOC(heap, size) {
    push c
    LDPTR(d, x, heap())
    ld c, size()
    call [vectors.ALLOC]
    pop c
}