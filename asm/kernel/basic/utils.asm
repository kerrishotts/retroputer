.segment __current__ kmemmap.basic.code-start .append {
    checkbreak: {
        enter 0
        push d
    _main:
        clr EX
        in dl, 0x38                                         # Check for CTRL+C
        test dl, 0b0000_1000
        if !z {                                             # Got CTRL
            in dl, 0x3A
            test dl, 0b0000_0100
            if !z {                                         # Got C
                set EX
            }
        }
    _out:
        pop d
        exit 0
        ret
    }

    #
    # Prints the error message (if any) specified by DL. If C is other than
    # zero, will also print C as a line number
    #
    #######################################################################
    print-error: {
        enter 10
        push d
        push b
        push x
        push y
        pushf
    _main:
        cmp dl, 0
        if !z {
            y := dl                                         # get error 
            d := brodata.error-prefix >> 3
            x := brodata.error-prefix & 7
            call [vectors.PRINT]                            # NEWLINE + "?""
            d := brodata.error-vectors >> 3                 # PTR to error vectors
            x := brodata.error-vectors & 7
            dec y                                           # errors start at 0
            shl y, 1                                        # y *= 2
            x := [d, x, y]                                  # indirect
            d := addrbank(brodata.error)                    # PTR to error messages
            call [vectors.PRINT]                            # print the error
            d := addrpage(brodata.error)                    # >> 3
            x := addrpofs(brodata.error)                    # & 7
            call [vectors.PRINT]                            # " ERROR" + NEWLINE
            cmp c, 0
            if !z {
                d := brodata.at-line >> 3
                x := brodata.at-line & 7
                call [vectors.PRINT]                        # " AT LINE "

                d := bp
                sub d, 10
                x := d
                d := 0
                b := 10                                     # No padding, base 10
                call [vectors.U16_TO_STR]                   # Convert C to a string
                call [vectors.PRINT]                        # ... and print it!
                d := brodata.newline >> 3
                x := brodata.newline & 7
                call [vectors.PRINT]                        # NEWLINE, to be neat
            }
        }
    _out:
        popf
        pop y
        pop x
        pop b
        pop d
        exit 10
        ret
    }
}