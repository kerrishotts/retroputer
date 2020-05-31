.segment __current__ kmemmap.basic.code-start .append {

    handler-clear-screen: {
        call [vectors.CLEAR_SCREEN]
        dl := 0
        ret
    }

    handler-home: {
        d := 0
        call [vectors.SET_CURSOR_POS]
        dl := 0
        ret
    }

    handler-new: {
        call new
        dl := 0
        ret
    }

    handler-print: {
        enter 0x02
        .const emit-newline -2
    _main:

        call gettok
        cmp dl, 0
        br z _bail                          # next token was an end of the line
        cmp dl, brodata.TOK_END_OF_STMT
        br z _bail                          # next token was an end of the statement
        cmp dl, brodata.TOK_SEMICOLON
        br z _maybe-no-newline              # semicolon suppresses CR at end of line
        cmp dl, brodata.TOK_COMMA
        br z _tab                           # comma emits some tabs
        call backtok                        # give eval a chance

        call eval
        cmp dl, 0
        brs !z _out                         # an error happened, bail
        dl := [bdata.accumulator-token]
        cmp dl, brodata.TOK_CODE_STRING     # is the accumulator a code string?
        if z {
            d := 0
            x := [bdata.accumulator]
            call [vectors.PRINT]
        } else {                            # must be a string in the heap or number?
            cmp dl, brodata.TOK_STRING
            if z {  
                d := addrbank(kmemmap.basic.heap-start)
                x := [bdata.accumulator]
                call [vectors.PRINT]
            } else {
                b := 10
                c := [bdata.accumulator]
                LDPTR(d, x, bdata.itoa-buffer)
                call [vectors.I16_TO_STR]
                call [vectors.PRINT]
            }
        }
        call _reset-newline
        br _main                            # back for more!

    _out:
        exit 0x02
        ret
    _bail:
        d := [bp+emit-newline]
        cmp d, 1
        if !z {
            d := brodata.newline >> 3
            x := brodata.newline & 7
            call [vectors.PRINT]            # NEWLINE, to be neat
        }
        dl := 0

        call backtok
        brs _out
    _reset-newline:
        d := 0
        [bp+emit-newline] := d
        ret
    _maybe-no-newline:
        d := 1
        [bp+emit-newline] := d
        br _main 
    _tab:
        x := 8
        do {
            dl := asc(" ")
            call [vectors.PUT_CHAR]
            dec x
        } while !z
        br _main
    }
}


