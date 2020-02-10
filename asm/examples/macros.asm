.segment data 0x03000 {
    bar: .word 0x01000
}
.segment code 0x02000 {

    # test a simple statement alias
    .define zeroA() {
        ld a, 0x0000
    }
    zeroA()    # should emit ld a, 0x0000

    brk


    # test with a simple constant replacement
    .define _add(_a, _b) {
        push b
        ld a, _a()
        ld b, _b()
        add a, b
        pop b
    }
    _add([data.bar], 155)

    brk


    # tests a single argument replacement
    .define put_char(ch) {
        d := asc(ch())
        call [0x0FFE0]
    }

    put_char("A")
    
    brk

    # tests with register replacement
    .define IFF(_rA, _f, _rB) {
        pushf
        cmp _rA(), _rB()
        if _f() {
            ld a, 0x01
        } else {
            ld a, 0xFF
        }
        popf
    }

    IFF(A, flag:c, B)

}
