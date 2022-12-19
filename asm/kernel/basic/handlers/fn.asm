.segment __current__ kmemmap.basic.code-start .append {
    #
    # Returns the value at the specified port
    #
    # @return dl 0 if no error
    handler-in-expr: {
        enter 0x00
        push c
    _main:
        call pop-number-param
        brs ex _out

        call bdata._in-port
        call push-param
        dl := 0

    _out:
        pop c
        exit 0x00
        ret
    }
    handler-rnd-expr: {
        enter 0x00
        push c
        push a
    _main:
        call pop-number-param
        brs ex _out

        in al, 12                               # get high byte of random #
        exc a
        in al, 13                               # get low byte of random #
        mod a, c                                # trim down to the parameter
        c := a
        call push-param
        dl := 0

    _out:
        pop a
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
        call pop-number-param
        brs ex _out
        a := c
        b := d
        call pop-number-param
        brs ex _out

        x := c 
        d := a
        shl d, 13                               # convert bank # to address we expect
        c := 0
        cl := [d, x]
        dl := brodata.TOK_WORD
        call push-param
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