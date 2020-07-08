.segment __current__ kmemmap.basic.code-start .append {
    #
    # EXEC is responsible for evaluating the line at D,X
    # 
    # @param [D, X]: PTR to crunched line (either direct or run mode works)
    # @returns DL: 0 if no error, or an error number if one occurred
    #
    #######################################################################
    exec: {
        enter 0x00
        push x
        push a
        push y
        push c
    _main:
        y := 0
        do {
            in dl, 0x38                         # Check for CTRL+C
            and dl, 0b0000_1000
            cmp dl, 0
            if !z {                             # Got CTRL
                in dl, 0x3A
                and dl, 0b0000_0100
                cmp dl, 0
                if !z {                         # Got C
                    dl := 0                     # HALT!
                    [bdata.execution-mode] := dl
                    dl := brodata.STOPPED_ERROR # with appropriate error
                    br _out
                }
            }
            call gettok
            c := dl
            cmp c, 128
            if n {
                # not an executable token
                cmp c, 0
                if z {
                    dl := 0
                    brs _out
                }
                dl := brodata.SYNTAX_ERROR
                brs _out
            }
            clr c
            sub c, 128
            shl c, 1
            x := c
            call [statement-handlers, x]
            cmp dl, constants.NO_STMT_TERM_NEEDED
            if z {
                continue                        # probably had a THEN or ELSE...
            }
            cmp dl, 0
            brs !z _out  # an error occurred, get us out

            call gettok
            cmp dl, 0
            if z {
                brs _out
            } else {
                cmp dl, brodata.TOK_END_OF_STMT
                if z {
                    continue
                } else {
                    dl := brodata.SYNTAX_ERROR
                    brs _out
                }
            }
        } while z
    _out:
        cmp dl, constants.EXIT_EARLY
        if z {
            dl := 0                             # Early exit is not an ERROR condition
        }
        pop c
        pop y
        pop a
        pop x
        exit 0x00
        ret
    }
}