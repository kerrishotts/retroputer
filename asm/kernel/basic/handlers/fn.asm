.segment __current__ kmemmap.basic.code-start .append {
    #
    # Returns the value at the specified port
    #
    # @return dl 0 if no error
    handler-in-expr: {
        enter 0x00
        push c
    _main:
        dl := [bdata.accumulator-token]
        c  := [bdata.accumulator]

        cmp dl, brodata.TOK_WORD
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        call bdata._in-port
        [bdata.accumulator] := c
        dl := 0

    _out:
        pop c
        exit 0x00
        ret
    }
    #
    # Returns the value at the specified bank/memory offset
    #
    # @return dl 0 if no error
    handler-peek-expr: {
        enter 0x00
        push a
        push b
        push c
        push x
    _main:
        al := [bdata.accumulator-token]
        b  := [bdata.accumulator]
        cl := [bdata.operand-token]
        d  := [bdata.operand]

        cmp al, brodata.TOK_WORD
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        cmp cl, brodata.TOK_WORD
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }

        x := d 
        d := b
        shl d, 13                               # convert bank # to address we expect
        c := 0
        cl := [d, x]
        [bdata.accumulator] := c
        dl := 0

    _out:
        pop x
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }

}