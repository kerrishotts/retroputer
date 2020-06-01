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

    #
    # LIST [start,[end]]
    #
    # List takes an option start value, and an optional end value.
    # If no value is specified, LIST will display the entire program.
    ###########################################################################
    handler-list: {
        enter 0x04
        .const start-line -2
        .const end-line -4
        push c
        push x
        push a
        push b
    _main:
        c := 0
        [bp+start-line] := c                # default is to start at line 0
        c := 0x7FFF
        [bp+end-line] := c                  # default is to end at line 32767
        call gettok                         # we want to see if the next token is
        cmp dl, 0                           # a number or not. This here means it
        if z {
            call backtok
            br _do-list
        }
        cmp dl, brodata.TOK_END_OF_STMT     # ... as does this
        if z {
            call backtok
            br _do-list
        }
        cmp dl, brodata.TOK_COMMA           # ... but this means no start, but maybe an end
        br z _get-end 
        call backtok                        # put the token back so we can eval
        call eval                           # it to get the line #
        cmp dl, 0                           # error?
        br !z _out

        call pop-param                      # get starting line number
        cmp dl, brodata.TOK_WORD            # is it a word?
        if !z {                             # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bp+start-line] := c                # store 

    _get-end:
        call gettok                         # we may be looking at the ending number
        cmp dl, 0                           # end of line?
        if z {
            call backtok
            br _do-list
        }
        cmp dl, brodata.TOK_END_OF_STMT     # ... as does this
        if z {
            call backtok
            br _do-list
        }

        call backtok                        # put the token back so we can eval
        call eval                           # it to get the line #
        cmp dl, 0                           # error?
        br !z _out

        call pop-param                          # get starting line number
        cmp dl, brodata.TOK_WORD                # is it a word?
        if !z {                                 # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bp+end-line] := c                      # store 

    _do-list:
        c := [bp+start-line]
        d := [bp+end-line]
        do {
            # is there a line to print?
            d := addrbank(kmemmap.basic.lptr-start)
            x := c
            shl x, 1
            a := [d, x]                         # read the line pointer
            cmp a, 0
            if !z {                             # we have something to print!
                push d
                push x
                b := 10                         # print the line number in base 10
                LDPTR(d, x, bdata.itoa-buffer)
                call [vectors.U16_TO_STR]       # convert line number to a string
                call [vectors.PRINT]            # and print it (note this is unsigned)
                pop x
                pop d

                dl := constants.SPACE
                call [vectors.PUT_CHAR]         # space between line numbers
                d := addrbank(kmemmap.basic.prog-start)
                x := a                          # d,x is now pointing at our program code
                al := [d, x]                    # read the token
                do {
                    cmp al, 0b1000_0000         # ... but we might be a regular character
                    if n {
                        push d
                        dl := al
                        call [vectors.PUT_CHAR] # write the character as-is; @todo, does this need to be RAW?
                        pop d
                    } else {
                        cmp al, brodata.TOK_BYTE
                        if z {
                            inc x
                            a := 0
                            al := [d, x]
                            call _print-word
                            br _continue_with_space
                        }
                        cmp al, brodata.TOK_WORD
                        if z {
                            inc x
                            a := [d, x]
                            inc x
                            call _print-word
                            br _continue_with_space
                        }
                        cmp al, brodata.TOK_CODE_STRING
                        if z {
                            inc x
                            call _print-string
                            br _continue
                        }
                        cmp al, brodata.TOK_REAL  
                        br z _continue          # @fixme: wrong for reals
                        cmp al, brodata.TOK_VARIABLE
                        if z {
                            inc x
                            call _print-variable
                            br _continue_with_space
                        }

                        # it's a keyword -- look it up
                        push d
                        push x
                        d := addrbank(brodata.token-vectors)
                        x := addrbofs(brodata.token-vectors)
                        and al, 0b0111_1111     # lose the top bit
                        shl al, 1
                        add x, al               # x is pointing at the right token vector
                        x := [d, x]             # pointing at token in memory
                        call [vectors.PRINT]
                        pop x
                        pop d

                    _continue_with_space:
                        push d
                        dl := constants.SPACE
                        call [vectors.PUT_CHAR] # always a space after the token
                        pop d
                    _continue:
                    }
                    inc x
                    al := [d, x]                # read the next token
                    cmp al, 0                   
                } while !z                      # end of line

                push d 
                dl := constants.CR
                call [vectors.PUT_CHAR]         # print NEWLINE
                pop d
            }

            # keep going until we're at the end
            inc c
            d := [bp+end-line]
            cmp c, d
        } while n

        dl := 0                                 # no error
    _out:
        pop b
        pop a
        pop x
        pop c
        exit 0x04
        ret
    _print-word:
        push b
        push c
        push d
        push x
        LDPTR(d, x, bdata.itoa-buffer)          # have to convert to string
        c := a
        call [vectors.U16_TO_STR]               # these are always unsigned
        b := 10
        call [vectors.PRINT]                    # output in base 10
        pop x
        pop d
        pop c
        pop b
        ret
    _print-string:
        push x
        push d
        dl := constants.QUOTE
        call [vectors.PUT_CHAR]                 # print the quote
        pop d
        call [vectors.PRINT_RAW]                # print the string
        push d
        dl := constants.QUOTE
        call [vectors.PUT_CHAR]                 # print the ending quote
        pop d
        pop x
        do {
            al := [d, x]
            inc x
            cmp al, 0                           # seek ahead to the end of the string
        } while !z
        dec x
        ret
    _print-variable:
        # @todo: need to get the sigil so we can print it!
        inc x
        inc x
        al := [d, x]                            # length of variable name
        do {
            inc x
            push d
            dl := [d, x]
            call [vectors.PUT_CHAR]             # print the variable name
            pop d
            dec al
        } while !z
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
        call pop-param
        cmp dl, brodata.TOK_CODE_STRING     # is the accumulator a code string?
        if z {
            d := 0
            x := c
            call [vectors.PRINT]
        } else {                            # must be a string in the heap or number?
            cmp dl, brodata.TOK_STRING
            if z {  
                d := addrbank(kmemmap.basic.heap-start)
                x := c
                call [vectors.PRINT]
            } else {
                b := 10
                c := c
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


