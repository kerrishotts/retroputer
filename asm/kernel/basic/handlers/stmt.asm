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

    handler-poke: {
        enter 0x06
        .const parms -6
        .const pbank -6
        .const paddr -4
        .const pval  -2
        push c
        push y
        push x
        push a
        y := 0
    _main:
        call gettok                             # check if we have a number to parse
        cmp dl, 0                               # End of line?
        br z _skip

        cmp dl, brodata.TOK_END_OF_STMT         # End of statement?
        br z _skip

        call backtok
        call eval                               # it to get the line #

        cmp dl, 0                               # error?
        br !z _out

        call pop-param                          # get value to check type
        cmp dl, brodata.TOK_WORD                # is it a word?
        if !z {                                 # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bp+parms,y] := c                       # store this for future reference
        inc y
        inc y

        al := 6
        cmp yl, al                              # no more than three words
        br z _skip
        call gettok                             # check for comma
        cmp dl, brodata.TOK_COMMA
        if !z {
            dl := brodata.SYNTAX_ERROR          # gotta have a COMMA
            br _out
        }
        br _main                                # go back for more
    _skip:
        al := 6
        cmp yl, al                              # no more than three words
        if !z {
            dl := brodata.SYNTAX_ERROR          # not enough? too many?
            br _out                             # bail
        }
        a := [bp+pval]                          # get value
        x := [bp+paddr]                         # get address
        d := [bp+pbank]                         # get bank
        shl d, 13
        [d, x] := al                            # write value
        dl := 0                                 # no error
    _out:
        pop a
        pop x
        pop y
        pop c
        exit 0x06
        ret
    }

    #
    # [LET] var=expr
    #
    # Assigns expression to variable
    ###########################################################################
    handler-assignment: {
        enter 0x00
        push a
        push b
        push c
        push x
        push y
    _main:
        call backtok                            # by the time we're here, we're too far ahead
        call gettok
        cmp dl, brodata.TOK_VARIABLE            # is next token a variable?
        if !z {
            dl := brodata.SYNTAX_ERROR          # No; bail!
            br _out
        }

        call gettok-word                        # get index
        b := d
        shr b, 14                               # need the type of variable
        and d, 0b0011_1111_1111_1111            # mask off the type for index
        y := d

        d := 0                                  # coming from bank 0
        cmp bl, constants.TYPE_WORD             # is this a word variable?
        if z {
            bl := brodata.TOK_WORD              # enable type match
            x := kmemmap.basic.ints-start       # set base
            br _continue
        }

        cmp bl, constants.TYPE_STRING           # is it a string?
        if z {
            bl := brodata.TOK_STRING            # enable type match
            x := kmemmap.basic.strs-start
            br _continue
        }

        cmp bl, constants.TYPE_REAL             # is it a real?
        if z {
            bl := brodata.TOK_REAL              # enable type match
            x := kmemmap.basic.dbls-start
            shl y, 2                            # advance y correctly
            br _continue
        }

        # must be an array @TODO
        dl := brodata.NOT_IMPLEMENTED
        br _out

    _continue:

        a := d                                  # preserve bank

        call gettok-raw                         # get length of variable name to skip
        do {
            call gettok-raw                     # but we actually don't care about it...
            cmp dl, 0                           # end of line? That's bad.
            if z {
                dl := brodata.SYNTAX_ERROR
                br _out
            }
            cmp dl, brodata.TOK_END_OF_STMT     # end of statement?
            if z {
                dl := brodata.SYNTAX_ERROR      # also bad
                br _out
            }
            cmp dl, brodata.TOK_EQU             # keep going til we see an equal sign
        } while !z


        call eval                               # evaluate expression
        cmp dl, 0                               # was there an error?
        br !z _out                              # ... bail

        call pop-param                          # get the result of the expression
        cmp dl, bl                              # do types match?
        if !z {
            # @TODO check for string and code strings
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out                             # NOPE
        }

        swap a, d                               # need d to be the bank
        [d, x, y] := c                          # store value (WRONG FOR STRINGS and REALS, @FIXME)

        dl := 0                                 # no error

    _out:
        pop y
        pop x
        pop c
        pop b
        pop a
        exit 0x00
        ret
    }

    handler-let: {
        enter 0x00
    _main:
        call gettok                             # simulate advancement past variable
        call handler-assignment                 # We're just eating LET
    _out:
        exit 0x00
        ret
    }


    #
    # GOTO line
    #
    # Moves execution to the given line number. If execution isn't in progress,
    # execution begins from the given line number (equivalent to `RUN line`).
    ###########################################################################
    handler-goto: {
        enter 0x00
        push c
    _main:
        call gettok                             # check if we have a number to parse
        cmp dl, 0                               # End of line?
        if z {
            dl := brodata.SYNTAX_ERROR          # that's a syntax error
            br _out
        }
        cmp dl, brodata.TOK_END_OF_STMT         # End of statement?
        if z {
            dl := brodata.SYNTAX_ERROR          # that's a syntax error
            br _out
        }
        call backtok                            # put the token back so we can eval
        call eval                               # it to get the line #
        cmp dl, 0                               # error?
        br !z _out

        call pop-param                          # get starting line number
        cmp dl, brodata.TOK_WORD                # is it a word?
        if !z {                                 # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bdata.current-line-number] := c        # store the line number

        dl := 0
        cl := 1
        [bdata.execution-mode] := cl            # put us in run mode
    _out:
        pop c
        exit 0x00
        ret
    }
    #
    # RUN [start]
    #
    # Starts program execution from the first line, unless a starting line
    # number is supplied
    ###########################################################################
    handler-run: {
        enter 0x00
        push c
    _main:
        c := 0
        [bdata.current-line-number] := c        # start at line zero

        call gettok                             # check if we have a number to parse
        cmp dl, 0                               # End of line?
        if z {
            call backtok
            br _do-run
        }
        cmp dl, brodata.TOK_END_OF_STMT         # End of statement?
        if z {
            call backtok
            br _do-run
        }
        call backtok                            # put the token back so we can eval
        call eval                               # it to get the line #
        cmp dl, 0                               # error?
        br !z _out

        call pop-param                          # get starting line number
        cmp dl, brodata.TOK_WORD                # is it a word?
        if !z {                                 # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bdata.current-line-number] := c        # store the line number
    _do-run:
        dl := 0
        cl := 1
        [bdata.execution-mode] := cl            # put us in run mode
    _out:
        pop c
        exit 0x00
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
        c := [bdata.maximum-line-number]    
        inc c                               # our list algo isn't inclusive, so fake it
        [bp+end-line] := c                  # default is to end at the highest we've seen
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
        cmp dl, brodata.TOK_COMMA           # ... but also a comma
        brs z _get-end                      # eat commas 
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
        inc c                                   # we need +1, since list is not inclusive
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
                            br _continue
                        }
                        cmp al, brodata.TOK_WORD
                        if z {
                            inc x
                            a := [d, x]
                            inc x
                            call _print-word
                            br _continue
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
                            br _continue
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

                    _continue:
                    }
                    inc x
                    al := [d, x]                # read the next token
                    cmp al, 0                   
                } while !z                      # end of line

                push d 
                dl := constants.CR
                call [vectors.PUT_CHAR]         # print NEWLINE

                # do we need to pause for a second?
                in dl, 0x38                         # left SHIFT will be here
                and dl, 0b0000_0001                 # only care about left SHIFT
                cmp dl, 1                           # it'll be 1 if set
                if z {
                    push c
                    in dl, 0x02
                    do {
                        in cl, 0x02
                        cmp dl, cl
                    } while z                       # wait a second
                    pop c
                }

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
        push b
        b := [d, x]                             # get the index so we can get sigil
        shr b, 14                               # only care about top two bits
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
        cmp bl, constants.TYPE_STRING
        if z {
            push d
            dl := ASC("$")
            call [vectors.PUT_CHAR]
            pop d
        } else {
            cmp bl, constants.TYPE_REAL
            if z {
                push d
                dl := ASC("#")
                call [vectors.PUT_CHAR]
                pop d
            }
        }
        pop b
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
            dl := [bdata.execution-mode]        # make sure we select the right bank
            cmp dl, 0
            if z {
                d := 0                          # for direct mode, it's zero bank
            } else {                            # but in run mode, it comes from code
                d := addrbank(kmemmap.basic.prog-start)
            }
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
        dl := 0x09
        call [vectors.PUT_CHAR]
        br _maybe-no-newline
    }
}


