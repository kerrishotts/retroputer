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
        call pop-param
        a := c
        b := d
        call pop-param

        cmp bl, dl
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        add a, c
        c := a
        call push-param
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
        call pop-param
        a := c
        b := d
        call pop-param

        cmp bl, dl
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        sub a, c
        c := a
        call push-param
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
        call pop-param
        a := c
        b := d
        call pop-param

        cmp bl, dl
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            brs _out
        }
        mul a, c
        c := a
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
}
