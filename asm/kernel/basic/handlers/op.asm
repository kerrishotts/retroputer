.segment __current__ kmemmap.basic.code-start .append {
    #
    # Add accumulator and operand values together
    #
    # @return dl 0 if no error
    handler-add-expr: {
        enter 0x00
        push a
        push b
        push c
    _main:
        al := [bdata.accumulator-token]
        b  := [bdata.accumulator]
        cl := [bdata.operand-token]
        d  := [bdata.operand]

        cmp al, cl
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        add b, d
        [bdata.accumulator] := b
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }

    #
    # sub accumulator and operand values together
    #
    # @return dl 0 if no error
    handler-sub-expr: {
        enter 0x00
        push a
        push b
        push c
    _main:
        al := [bdata.accumulator-token]
        b  := [bdata.accumulator]
        cl := [bdata.operand-token]
        d  := [bdata.operand]

        cmp al, cl
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        sub b, d
        [bdata.accumulator] := b
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
    #
    # multiply accumulator and operand values together
    #
    # @return dl 0 if no error
    handler-mul-expr: {
        enter 0x00
        push a
        push b
        push c
    _main:
        al := [bdata.accumulator-token]
        b  := [bdata.accumulator]
        cl := [bdata.operand-token]
        d  := [bdata.operand]

        cmp al, cl
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        mul b, d
        [bdata.accumulator] := b
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
}
