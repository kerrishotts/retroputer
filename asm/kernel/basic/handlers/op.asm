.segment __current__ kmemmap.basic.code-start .append {
    #
    # negate
    #
    # @return dl 0 if no error
    handler-neg-expr: {
        enter 0x00
        push a
        push b
        push c
    _main:
        call pop-number-param

        neg  c
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
        call pop-number-param
        brs ex _out
        a := c
        b := d
        call pop-number-param
        brs ex _out

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
        call pop-number-param
        brs ex _out
        a := c
        b := d
        call pop-number-param
        brs ex _out

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

    handler-div-expr: {
        enter 0x00
        push a
        push b
        push c
    _main:
        call pop-number-param
        brs ex _out
        a := c
        b := d
        call pop-number-param
        brs ex _out

        div a, c
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

    handler-mod-expr: {
        enter 0x00
        push a
        push b
        push c
    _main:
        call pop-number-param
        brs ex _out
        a := c
        b := d
        call pop-number-param
        brs ex _out

        mod a, c
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

    handler-lt-expr: {
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
        cmp a, c
        if n {
            c := 1
        } else {
            c := 0
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
    handler-lte-expr: {
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
        cmp a, c
        if n {
            c := 1
        } else {
            if z {
                c := 1
            } else {
                c := 0
            }
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }

    handler-lt-expr: {
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
        cmp a, c
        if n {
            c := 1
        } else {
            c := 0
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
    handler-lte-expr: {
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
        cmp a, c
        if n {
            c := 1
        } else {
            if z {
                c := 1
            } else {
                c := 0
            }
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }

    handler-gt-expr: {
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
        cmp c, a
        if n {
            c := 1
        } else {
            c := 0
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
    handler-gte-expr: {
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
        cmp c, a
        if n {
            c := 1
        } else {
            if z {
                c := 1
            } else {
                c := 0
            }
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }

    handler-equ-expr: {
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
        cmp a, c
        if z {
            c := 1
        } else {
            c := 0
        }
        call push-param
        dl := 0

    _out:
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }
    handler-neq-expr: {
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
        cmp a, c
        if z {
            c := 0
        } else {
            c := 1
        }
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
