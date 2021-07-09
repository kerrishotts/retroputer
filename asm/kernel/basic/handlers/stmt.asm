.segment __current__ kmemmap.basic.code-start .append {

    #
    # CLS
    #
    # Clears the screen
    #
    ###########################################################################
    handler-clear-screen: {
        call [vectors.CLEAR_SCREEN]
        dl := 0
        ret
    }

    #
    # HOME
    #
    # Positions the cursor in the upper-left corner of the screen
    #
    ###########################################################################
    handler-home: {
        d := 0
        call [vectors.SET_CURSOR_POS]
        dl := 0
        ret
    }

    #
    # NEW
    #
    # Resets BASIC to accept a new program (wiping out the existing code)
    #
    ###########################################################################
    handler-new: {
        call new
        dl := 0
        ret
    }

    #
    # REM | '
    #
    # Indicates a REMark. Execution of the line stops immediately
    #
    ###########################################################################
    handler-rem: {
        dl := constants.EXIT_EARLY
        ret
    }

    #
    # OUT port, byte
    #
    # Ouputs _byte_ into the port. If _byte_ is larger than 255, only the
    # bottom eight bits are kept.
    #
    # ERRORS:
    #  SYNTAX ERROR                    Missing one or more parameters or commas
    #  TYPE MISMATCH                   Parameters must be integers
    ###########################################################################
    handler-out: {
        enter 0x04
        .const parms -4
        .const paddr -4
        .const pval  -2
        push c
        push y
        push x
        push a
        y := 0
    _main:
        call gettok                                          # check if we have a number to parse
        cmp dl, 0                                            # End of line?
        br z _skip

        cmp dl, brodata.TOK_END_OF_STMT                      # End of statement?
        br z _skip

        call backtok
        call eval                                            # port 

        cmp dl, 0                                            # error?
        br !z _out

        call pop-param                                       # get value to check type
        cmp dl, brodata.TOK_WORD                             # is it a word?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bp+parms,y] := c                                    # store this for future reference
        inc y
        inc y

        al := 4
        cmp yl, al                                           # no more than two words
        br z _skip
        call gettok                                          # check for comma
        cmp dl, brodata.TOK_COMMA
        if !z {
            dl := brodata.SYNTAX_ERROR                       # gotta have a COMMA
            br _out
        }
        br _main                                             # go back for more
    _skip:
        al := 4
        cmp yl, al                                           # no more than two words
        if !z {
            dl := brodata.SYNTAX_ERROR                       # not enough? too many?
            br _out                                          # bail
        }
        a := [bp+pval]                                       # get value
        c := [bp+paddr]                                      # get address
        call bdata._out-port
        dl := 0                                              # no error
    _out:
        pop a
        pop x
        pop y
        pop c
        exit 0x04
        ret
    }
    #
    # POKE bank, addr, byte
    #
    # Pokes _byte_ into _bank_:_addr_. If _byte_ is larger than 255, only the
    # bottom eight bits are kept.
    #
    # ERRORS:
    #  SYNTAX ERROR                    Missing one or more parameters or commas
    #  TYPE MISMATCH                   Parameters must be integers
    ###########################################################################
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
        call gettok                                          # check if we have a number to parse
        cmp dl, 0                                            # End of line?
        br z _skip

        cmp dl, brodata.TOK_END_OF_STMT                      # End of statement?
        br z _skip

        call backtok
        call eval                                            # it to get the line 

        cmp dl, 0                                            # error?
        br !z _out

        call pop-param                                       # get value to check type
        cmp dl, brodata.TOK_WORD                             # is it a word?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bp+parms,y] := c                                    # store this for future reference
        inc y
        inc y

        al := 6
        cmp yl, al                                           # no more than three words
        br z _skip
        call gettok                                          # check for comma
        cmp dl, brodata.TOK_COMMA
        if !z {
            dl := brodata.SYNTAX_ERROR                       # gotta have a COMMA
            br _out
        }
        br _main                                             # go back for more
    _skip:
        al := 6
        cmp yl, al                                           # no more than three words
        if !z {
            dl := brodata.SYNTAX_ERROR                       # not enough? too many?
            br _out                                          # bail
        }
        a := [bp+pval]                                       # get value
        x := [bp+paddr]                                      # get address
        d := [bp+pbank]                                      # get bank
        shl d, 13
        [d, x] := al                                         # write value
        dl := 0                                              # no error
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
        call backtok                                         # by the time we're here, we're too far ahead
        call gettok
        cmp dl, brodata.TOK_VARIABLE                         # is next token a variable?
        if !z {
            dl := brodata.SYNTAX_ERROR                       # No; bail!
            br _out
        }

        call gettok-word                                     # get index
        b := d
        shr b, 14                                            # need the type of variable
        and d, 0b0011_1111_1111_1111                         # mask off the type for index
        y := d

        d := 0                                               # coming from bank 0
        cmp bl, constants.TYPE_WORD                          # is this a word variable?
        if z {
            bl := brodata.TOK_WORD                           # enable type match
            x := kmemmap.basic.ints-start                    # set base
            br _continue
        }

        cmp bl, constants.TYPE_STRING                        # is it a string?
        if z {
            bl := brodata.TOK_STRING                         # enable type match
            x := kmemmap.basic.strs-start
            br _continue
        }

        cmp bl, constants.TYPE_REAL                          # is it a real?
        if z {
            bl := brodata.TOK_REAL                           # enable type match
            x := kmemmap.basic.dbls-start
            shl y, 2                                         # advance y correctly
            br _continue
        }

        # must be an array @TODO
        dl := brodata.NOT_IMPLEMENTED
        br _out

    _continue:

        a := d                                               # preserve bank

        call gettok-raw                                      # get length of variable name to skip
        do {
            call gettok-raw                                  # but we actually don't care about it...
            cmp dl, 0                                        # end of line? That's bad.
            if z {
                dl := brodata.SYNTAX_ERROR
                br _out
            }
            cmp dl, brodata.TOK_END_OF_STMT                  # end of statement?
            if z {
                dl := brodata.SYNTAX_ERROR                   # also bad
                br _out
            }
            cmp dl, brodata.TOK_EQU                          # keep going til we see an equal sign
        } while !z


        call eval                                            # evaluate expression
        cmp dl, 0                                            # was there an error?
        br !z _out                                           # ... bail

        call pop-param                                       # get the result of the expression
        cmp dl, bl                                           # do types match?
        if !z {
            # @TODO check for string and code strings
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out                                          # NOPE
        }

        swap a, d                                            # need d to be the bank
        [d, x, y] := c                                       # store value (WRONG FOR STRINGS and REALS, @FIXME)

        dl := 0                                              # no error

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
        call gettok                                          # simulate advancement past variable
        call handler-assignment                              # We're just eating LET
    _out:
        exit 0x00
        ret
    }


    #
    # GOTO line
    #
    # Moves execution to the given line number. If execution isn't in progress,
    # execution begins from the given line number (equivalent to `RUN line`).
    #
    # ERRORS
    #  SYNTAX ERROR                    Missing the line number
    #  TYPE MISMATCH                   Line number must be an integer
    ###########################################################################
    handler-goto: {
        enter 0x00
        push c
    _main:
        call gettok                                          # check if we have a number to parse
        cmp dl, 0                                            # End of line?
        if z {
            dl := brodata.SYNTAX_ERROR                       # that's a syntax error
            br _out
        }
        cmp dl, brodata.TOK_END_OF_STMT                      # End of statement?
        if z {
            dl := brodata.SYNTAX_ERROR                       # that's a syntax error
            br _out
        }
        call backtok                                         # put the token back so we can eval
        call eval                                            # it to get the line 
        cmp dl, 0                                            # error?
        br !z _out

        call pop-param                                       # get starting line number
        cmp dl, brodata.TOK_WORD                             # is it a word?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bdata.current-line-number] := c                     # store the line number

        dl := 0
        cl := 1
        [bdata.execution-mode] := cl                         # put us in run mode
    _out:
        pop c
        exit 0x00
        ret
    }

    #
    # IF expr THEN statements
    #
    # Evaluates EXPR, and if it is nonzero, executes the statement(s) after
    # the THEN. If it is zero, execution of the line stops.
    #
    # TODO: MULTI-LINE IF...ENDIF
    #
    # ERRORS
    #  SYNTAX ERROR                    Missing THEN
    #  TYPE MISMATCH                   Resutling expression must be an integer
    ###########################################################################
    handler-if: {
        enter 0x00
        push c
    _main:
        call peektok
        cmp dl, 0                                            # is this the end of the line?
        if z {
            dl := brodata.SYNTAX_ERROR
            br _out
        }
        cmp dl, brodata.TOK_END_OF_STMT
        if z {
            dl := brodata.SYNTAX_ERROR
            br _out
        }
        call eval                                            # evaluate conditional
        cmp dl, 0
        br !z _out                                           # an error happened, bail
        call pop-param
        cmp dl, brodata.TOK_WORD                             # it is the right type, right?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        cmp c, 0
        if z {
            dl := constants.EXIT_EARLY                       # it's zero, bail!
            br _out
        }
        call gettok                                          # next token had better be THEN
        cmp dl, brodata.TOK_THEN
        if !z {
            dl := brodata.SYNTAX_ERROR
            br _out
        }
        dl := constants.NO_STMT_TERM_NEEDED                  # done; execution can pick up at this point
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
    #
    # ERRORS
    #  TYPE MISMATCH                   If specified, start must be an integer
    ###########################################################################
    handler-run: {
        enter 0x00
        push c
    _main:
        c := 0
        [bdata.current-line-number] := c                     # start at line zero

        call gettok                                          # check if we have a number to parse
        cmp dl, 0                                            # End of line?
        if z {
            call backtok
            br _do-run
        }
        cmp dl, brodata.TOK_END_OF_STMT                      # End of statement?
        if z {
            call backtok
            br _do-run
        }
        call backtok                                         # put the token back so we can eval
        call eval                                            # it to get the line 
        cmp dl, 0                                            # error?
        br !z _out

        call pop-param                                       # get starting line number
        cmp dl, brodata.TOK_WORD                             # is it a word?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bdata.current-line-number] := c                     # store the line number
    _do-run:
        dl := 0
        cl := 1
        [bdata.execution-mode] := cl                         # put us in run mode
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
    #
    # ERRORS
    #  SYNTAX ERROR                    Missing COMMA between numbers
    #  TYPE MISMATCH                   Line numbers must be integers
    ###########################################################################
    handler-list: {
        enter 0x06
        .const start-line -2
        .const end-line -4
        .const cur-indent -5
        .const past-line-start -6
        push c
        push x
        push a
        push b
    _main:
        call [vectors.GET_FG_COLOR]
        push d
        c := 0
        [bp+cur-indent] := cl                                # default indent is also zero
        [bp+past-line-start] := cl                           # indicates if we are at the start of a line (if 0)
        [bp+start-line] := c                                 # default is to start at line 0
        call _set-end-range-to-max
        call gettok                                          # we want to see if the next token is
        cmp dl, 0                                            # a number or not. This here means it
        if z {
            call backtok
            br _do-list
        }
        cmp dl, brodata.TOK_END_OF_STMT                      # ... as does this
        if z {
            call backtok
            br _do-list
        }
        cmp dl, brodata.TOK_COMMA                            # ... but this means no start, but maybe an end
        br z _get-end 
        call backtok                                         # put the token back so we can eval
        call eval                                            # it to get the line 
        cmp dl, 0                                            # error?
        br !z _out

        call pop-param                                       # get starting line number
        cmp dl, brodata.TOK_WORD                             # is it a word?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        [bp+start-line] := c                                 # store 
        inc c
        [bp+end-line] := c                                   # store end-of-line +1; a single start line is intended to list a single line

    _get-end:
        call gettok                                          # we may be looking at the ending number
        cmp dl, brodata.TOK_COMMA                            # ... but also a comma
        brs z _get-end                                       # eat commas 
        cmp dl, 0                                            # end of line?
        if z {
            call backtok
            br _do-list
        }
        cmp dl, brodata.TOK_END_OF_STMT                      # ... as does this
        if z {
            call backtok
            br _do-list
        }

        call backtok                                         # put the token back so we can eval
        call eval                                            # it to get the line 
        cmp dl, 0                                            # error?
        br !z _out

        call pop-param                                       # get starting line number
        cmp dl, brodata.TOK_WORD                             # is it a word?
        if !z {                                              # If not, it's a type mismatch
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        inc c                                                # we need +1, since list is not inclusive
        [bp+end-line] := c                                   # store 

    _do-list:
        c := [bp+start-line]
        d := [bp+end-line]
        do {
            call checkbreak
            br EX _break                                     # If EXCEPTION, CTRL+C is pressed

            # is there a line to print?
            d := addrbank(kmemmap.basic.lptr-start)
            x := c
            shl x, 1
            a := [d, x]                                      # read the line pointer
            cmp a, 0
            if !z {                                          # we have something to print!
                dl := [bdata.linenum-color]
                call [vectors.SET_FG_COLOR]

                push d
                push x
                b := 10                                      # print the line number in base 10
                LDPTR(d, x, bdata.itoa-buffer)
                call [vectors.U16_TO_STR]                    # convert line number to a string
                call [vectors.PRINT]                         # and print it (note this is unsigned)
                pop x
                pop d

                bl := [bp+cur-indent]
                dl := constants.SPACE
                do {
                    call [vectors.PUT_CHAR]                  # space between line numbers
                    dec bl
                } while !n                

                dl := 0
                [bp+past-line-start] := dl                   # we're at the start of the line

                d := addrbank(kmemmap.basic.prog-start)
                x := a                                       # d,x is now pointing at our program code
                a := [d, x]                                  # read the token (plus one more)
                bl := al                                     # bl is next token
                exc a                                        # al is now first token (ah is garbage now)
                do {
                    cmp al, 0b1000_0000                      # ... but we might be a regular character
                    if n {
                        push d
                        dl := al
                        call [vectors.PUT_CHAR]              # write the character as-is; @todo, does this need to be RAW?
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
                        br z _continue                       # @fixme: wrong for reals
                        cmp al, brodata.TOK_VARIABLE
                        if z {
                            inc x
                            call _print-variable
                            br _continue
                        }

                        # it's a keyword -- look it up
                        push d
                        push x
                        dl := [bdata.command-color]
                        call [vectors.SET_FG_COLOR]
                        d := addrbank(brodata.token-vectors)
                        x := addrbofs(brodata.token-vectors)
                        and a, 0b0111_1111                   # lose the top bits
                        shl a, 2                             # * 4 (ptr to text, and skip over metadata)
                        add x, a                             # x is pointing at the right token vector
                        inc x
                        inc x
                        a := [d, x]                          # get metadata
                        test a, 0b0000_0001                  # is it a function?
                        if !z {
                            push d
                            dl := [bdata.function-color]
                            call [vectors.SET_FG_COLOR]
                            pop d
                        }
                        test a, 0b0000_0100                  # is it an operator
                        if !z {
                            push d
                            dl := [bdata.operator-color]
                            call [vectors.SET_FG_COLOR]
                            pop d
                        }
                        test a, 0b0000_1000                  # is it a group?
                        if !z {
                            push d
                            dl := [bdata.grouping-color]
                            call [vectors.SET_FG_COLOR]
                            pop d
                        }
                        test a, 0b0100_0000_0000_0000        # is it entering a block
                        if !z {
                            test a, 0b0010_0000_0000_0000        # no trailing?
                            if !z {
                                cmp bl, 0
                                br !z skip-indent
                            }

                            push d
                            push a
                            dl := [bdata.indent]
                            al := [bp+cur-indent]
                            clr c
                            add al, dl
                            [bp+cur-indent] := al
                            pop a
                            pop d
                        skip-indent:
                        }
                        test a, 0b1000_0000_0000_0000        # is it leaving a block
                        if !z {
                            push d
                            bl := [bp+past-line-start]
                            cmp bl, 0
                            if z {                            # de-dent, if at start of line
                                bl := [bdata.indent]
                                dec bl                        # do one less than our space between line number
                                dl := constants.CURSOR_LEFT
                                do {
                                    call [vectors.PUT_CHAR]
                                    dec bl
                                } while !n
                            }
                            dl := [bdata.indent]
                            al := [bp+cur-indent]
                            clr c
                            sub al, dl
                            [bp+cur-indent] := al
                            pop d
                        }

                        dec x
                        dec x
                        x := [d, x]                          # pointing at token in memory
                        call [vectors.PRINT]
                        pop x
                        pop d

                    _continue:
                    }
                    inc x
                    al := 1
                    [bp+past-line-start] := al               # we're now past the start
                    #al := [d, x]                # read the next token
                    a := [d, x]                              # read the token (plus one more)
                    bl := al                                 # bl is next token
                    exc a                                    # al is now first token (ah is garbage now)
                    cmp al, 0                   
                } while !z                                   # end of line


                push d 
                dl := constants.CR
                call [vectors.PUT_CHAR]                      # print NEWLINE


                # do we need to pause for a second?
#                in dl, 0x38                                  # left SHIFT will be here
#                test dl, 0b0000_0001                         # only care about left SHIFT
#                if !z {                                      # ZERO will be unset if pressed
#                    push c
#                    in dl, 0x02
#                    do {
#                        in cl, 0x02
#                        cmp dl, cl
#                    } while z                                # wait a second
#                    pop c
#                }

                pop d
            }

            # keep going until we're at the end
            inc c
            d := [bp+end-line]
            cmp c, d
        } while n

    _break:
        dl := 0                                              # no error
    _out:
        cl := dl
        pop d
        call [vectors.SET_FG_COLOR]
        dl := cl
        pop b
        pop a
        pop x
        pop c
        exit 0x06
        ret
    _set-end-range-to-max:
        c := [bdata.maximum-line-number]    
        inc c                                                # our list algo isn't inclusive, so fake it
        [bp+end-line] := c                                   # default is to end at the highest we've seen
        ret
    _print-word:
        push b
        push c
        push d
        push x
        dl := [bdata.number-color]
        call [vectors.SET_FG_COLOR]
        LDPTR(d, x, bdata.itoa-buffer)                       # have to convert to string
        c := a
        b := 10
        call [vectors.U16_TO_STR]                            # these are always unsigned
        call [vectors.PRINT]                                 # output in base 10
        pop x
        pop d
        pop c
        pop b
        ret
    _print-string:
        push x
        push d
        dl := [bdata.string-color]
        call [vectors.SET_FG_COLOR]
        dl := constants.QUOTE
        call [vectors.PUT_CHAR]                              # print the quote
        pop d
        call [vectors.PRINT_RAW]                             # print the string
        push d
        dl := constants.QUOTE
        call [vectors.PUT_CHAR]                              # print the ending quote
        pop d
        pop x
        do {
            al := [d, x]
            inc x
            cmp al, 0                                        # seek ahead to the end of the string
        } while !z
        dec x
        ret
    _print-variable:
        # @todo: need to get the sigil so we can print it!
        push d
        dl := [bdata.variable-color]
        call [vectors.SET_FG_COLOR]
        pop d
        push b
        b := [d, x]                                          # get the index so we can get sigil
        shr b, 14                                            # only care about top two bits
        inc x
        inc x
        al := [d, x]                                         # length of variable name
        do {
            inc x
            push d
            dl := [d, x]
            call [vectors.PUT_CHAR]                          # print the variable name
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
                dl := ASC("#")                               # @todo REAL
                call [vectors.PUT_CHAR]
                pop d
            }
        }
        pop b
        ret
    }

    #
    # LAYER which [ON|OFF]|[MODE mode]|[SOURCE page]|
    #       [SCALE scale]|[TILESET page]|[COLOR fg[, bg]]|
    #       [AT x, y]|[SIZE w, h]|[LINE 0|1]
    #
    # Prints the value of any listed expressions to the screen. PRINT also
    # accepts various positional and formatting tokens.
    #
    # ERRORS
    ###########################################################################
    handler-layer: {
        enter 0x00
        push a
        push c
    _main:
        call eval
        cmp dl, 0
        br !z _out
        #call !z _ignore-err
        call pop-number-param
        br ex _out
        out 0x12, cl                                         # select the specified layer
    _configs:
        call gettok
        cmp dl, 0
        br z _bail                                           # next token was an end of the line
        cmp dl, brodata.TOK_END_OF_STMT
        br z _bail                                           # next token was an end of the statement
        cmp dl, brodata.TOK_ON                               # Check for ON  
        br z _layer-on
        cmp dl, brodata.TOK_OFF                              # Check for OFF 
        br z _layer-off
        cmp dl, brodata.TOK_SOURCE                           # Check for SOURCE page
        br z _layer-source
        cmp dl, brodata.TOK_SIZE                             # Check for SIZE scale
        br z _layer-size  
        cmp dl, brodata.TOK_TILESET                          # Check for TILESET page
        br z _layer-tileset 
        cmp dl, brodata.TOK_COLOR                            # Check for COLOR fg,bg
        br z _layer-color   
        cmp dl, brodata.TOK_AT                               # Check for AT x,y
        br z _layer-at   
        cmp dl, brodata.TOK_RECT                             # Check for RECT w,h
        br z _layer-rect   
        cmp dl, brodata.TOK_MODE                             # Check for MODE mode
        br z _layer-mode   
        cmp dl, brodata.TOK_LINE                             # Check for LINE height
        br z _layer-line
        call backtok                                         # SYNTAX ERROR then
        dl := brodata.SYNTAX_ERROR
        br _out
    _bail:
        call backtok
    _out-no-err:
        dl := 0
    _out:
        pop c
        pop a
        exit 0x00
        ret
    _layer-on:
        in cl, 0x13                                         # get layer src
        or cl, 0b1000_0000                                  # turn on the top bit
        out 0x13, cl                                        # layer visible!
        br _configs
    _layer-off:
        in cl, 0x13
        and cl, 0b0111_1111                                 # turn off the top bit
        out 0x13, cl                                        # layer invisible
        br _configs
    _layer-source:
        call eval                                           # get source page
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x13                                         # get layer source
        and al, 0b1110_0000                                 # zero the page
        or al, cl                                           # put new page
        out 0x13, al                                        # layer has new page
        br _configs
    _layer-size: 
        call eval                                           # get scale
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x14                                         # get layer config
        and al, 0b0011_1111                                 # zero the scale
        shl cl, 6
        or al, cl                                           # put new scale
        out 0x14, al                                        # layer has new page
        br _configs
    _layer-tileset:
        call eval                                           # get source page
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x14                                         # get layer config
        and al, 0b1110_0000                                 # zero the tileset
        or al, cl                                           # put new page
        out 0x14, al                                        # layer has new tileset
        br _configs
    _layer-color:
        call eval-all
        cmp dl, 0
        br !z _out
        call pop-number-param                               # foreground
        br ex _out                                          # handle error
        out 0x16, cl                                        # write foreground
        call pop-number-param                               # background (optional)
        if ex {
            cmp dl, brodata.INSUFFICIENT_ARGUMENTS_ERROR
            br _out-no-err                                  # not present, no error
        }
        out 0x15, cl
        br _configs
    _layer-at:
        call eval-all
        cmp dl, 0
        br !z _out
        call pop-number-param                               # x-position
        br ex _out                                          # handle error
        out 0x17, cl                                        # write X offset
        call pop-number-param                               # y-position
        br ex _out
        out 0x18, cl                                        # write Y offset
        br _configs
    _layer-rect:
        call eval-all
        cmp dl, 0
        br !z _out
        call pop-number-param                               # x size
        br ex _out                                          # handle error
        out 0x19, cl                                        # write X crop
        call pop-number-param                               # y size
        br ex _out
        out 0x1A, cl                                        # write Y crop
        br _configs
    _layer-mode:
        call eval                                           # get mode
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x1B                                         # get layer mode
        and al, 0b1111_1100                                 # zero the mode
        or al, cl                                           # put new mode
        out 0x1B, al                                        # layer has new mode
        br _configs
    _layer-line:
        call eval                                           # get line
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x14                                         # get layer mode
        and al, 0b1101_1111                                 # zero the line expander
        shl cl, 5
        or al, cl                                           # put new line expander
        out 0x14, al                                        # layer has new lines
        br _configs
    }

    #
    # PRINT [expr[[,|;|AT expr,expr|SPC(expr)|TAB(expr)] expr]...]
    #
    # Prints the value of any listed expressions to the screen. PRINT also
    # accepts various positional and formatting tokens.
    #
    #    ,        Moves cursor position to next tab position (tabs are set each 
    #             8 characters)
    #    ;        Instructs BASIC not to print a carriage return. Also used
    #             to separate items in the list. Unlike some BASICs, it is not
    #             permissable to print items without using a COMMA or SEMICOLON
    #             separator
    #    AT       Moves the cursor to the specified row, col location
    #    SPC()    Prints the specified number of spaces
    #    TAB()    Prints the specified number of tabs
    #
    # ERRORS
    #  SYNTAX ERROR                    Missing a separator
    #  TYPE MISMATCH                   Values for AT, SPC and TAB must be
    #                                  integers 
    ###########################################################################
    handler-print: {
        enter 0x02
        .const emit-newline -2
    _main:

        call gettok
        cmp dl, 0
        br z _bail                                           # next token was an end of the line
        cmp dl, brodata.TOK_END_OF_STMT
        br z _bail                                           # next token was an end of the statement
        cmp dl, brodata.TOK_SEMICOLON
        br z _maybe-no-newline                               # semicolon suppresses CR at end of line
        cmp dl, brodata.TOK_COMMA
        br z _tab                                            # comma emits some tabs
        cmp dl, brodata.TOK_CHR                              # Check for CHR$
        br z _print-chr
        cmp dl, brodata.TOK_CHRS                             # Check for CHRS$
        br z _print-chrs
        cmp dl, brodata.TOK_AT                               # Check for AT?
        br z _print-at
        cmp dl, brodata.TOK_SPC                              # Check for SPC()
        br z _print-spc-fn
        cmp dl, brodata.TOK_TAB                              # Check for TAB()
        br z _print-tab-fn 
        call backtok                                         # give eval a chance

        call eval
        cmp dl, 0
        brs !z _out                                          # an error happened, bail
        call pop-param
        cmp dl, brodata.TOK_CODE_STRING                      # is the accumulator a code string?
        if z {
            dl := [bdata.execution-mode]                     # make sure we select the right bank
            cmp dl, 0
            if z {
                d := 0                                       # for direct mode, it's zero bank
            } else {                                         # but in run mode, it comes from code
                d := addrbank(kmemmap.basic.prog-start)
            }
            x := c
            call [vectors.PRINT]
        } else {                                             # must be a string in the heap or number?
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
        br _main                                             # back for more!

    _out:
        exit 0x02
        ret
    _bail:
        d := [bp+emit-newline]
        cmp d, 1
        if !z {
            d := brodata.newline >> 3
            x := brodata.newline & 7
            call [vectors.PRINT]                             # NEWLINE, to be neat
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
    _print-chr:
        call eval                                            # expecting an expression for CHR$
        cmp dl, 0
        br !z _out                                           # an error happened, bail
        call pop-number-param
        br ex _out
        dl := cl
        call [vectors.PUT_CHAR]
        br _main
    _print-chrs:
        call eval
        cmp dl, 0
        br !z _out
        call pop-number-param
        br ex _out
        bl := cl
        call pop-number-param
        br ex _out
        br _print-lots                                       # print them
    _print-at:
        call eval                                            # expecting an expression for ROW
        cmp dl, 0
        br !z _out                                           # an error happened, bail
        call pop-param
        cmp dl, brodata.TOK_WORD                             # has to be an integer
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        b := c
        call gettok                                          # Next, we expect a COMMA
        cmp dl, brodata.TOK_COMMA
        if !z {
            dl := brodata.SYNTAX_ERROR
            br _out
        }
        call eval                                            # expecting an expression for COL
        cmp dl, 0
        br !z _out                                           # an error happened, bail
        call pop-param
        cmp dl, brodata.TOK_WORD                             # has to be an integer
        if !z {
            dl := brodata.TYPE_MISMATCH_ERROR
            br _out
        }
        d := b
        exc d
        dl := cl                                             # D should now be row (high), col (low)
        call [vectors.SET_CURSOR_POS]
        br _main 
    _print-tab-fn:
        bl := 9
        br _print-multiples
    _print-spc-fn:
        bl := 32
    _print-multiples:
        call eval                                            # expecting an expression for TAB
        cmp dl, 0
        br !z _out                                           # an error happened, bail
        call pop-number-param
        br ex _out
    _print-lots:
        cmp c, 0                                             # TAB/SPC(0) does nothing
        dl := bl
        while !z do {
            call [vectors.PUT_CHAR]
            dec c
        }
        br _maybe-no-newline
    }

    #
    # SPRITE which [ON|OFF]|[MODE mode]|[SOURCE page, idx]|
    #              [TILESET page]|[COLOR fg[, bg]]|
    #              [AT x, y]|[SIZE w, h, scale]|[LAYER lyr]
    #
    # Configures the given sprite.
    #
    # ERRORS
    ###########################################################################
    handler-sprite: {
        enter 0x00
        push a
        push c
    _main:
        call eval
        cmp dl, 0
        br !z _out
        call pop-number-param
        br ex _out
        out 0x1C, cl                                         # select the specified sprite
    _configs:
        call gettok
        cmp dl, 0
        br z _bail                                           # next token was an end of the line
        cmp dl, brodata.TOK_END_OF_STMT
        br z _bail                                           # next token was an end of the statement
        cmp dl, brodata.TOK_ON                               # Check for ON  
        br z _sprite-on
        cmp dl, brodata.TOK_OFF                              # Check for OFF 
        br z _sprite-off
        cmp dl, brodata.TOK_SOURCE                           # Check for SOURCE page, idx
        br z _sprite-source
        cmp dl, brodata.TOK_SIZE                             # Check for SIZE w,h,scale
        br z _sprite-size 
        cmp dl, brodata.TOK_TILESET                          # Check for TILESET page
        br z _sprite-tileset
        cmp dl, brodata.TOK_COLOR                            # Check for COLOR fg,bg
        br z _sprite-color  
        cmp dl, brodata.TOK_AT                               # Check for AT x,y
        br z _sprite-at  
        cmp dl, brodata.TOK_LAYER                            # Check for LAYER lyr
        br z _sprite-layer
        call backtok                                         # SYNTAX ERROR then
        dl := brodata.SYNTAX_ERROR
        br _out
    _bail:
        call backtok
    _out-no-err:
        dl := 0
    _out:
        pop c
        pop a
        exit 0x00
        ret
    _sprite-on:
        in cl, 0x1D                                         # get sprite src
        or cl, 0b1000_0000                                  # turn on the top bit
        out 0x1D, cl                                        # sprite visible!
        br _configs
    _sprite-off:
        in cl, 0x1D
        and cl, 0b0111_1111                                 # turn off the top bit
        out 0x1D, cl                                        # sprite invisible
        br _configs
    _sprite-source:
        call eval-all                                       # get source page
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x1D                                         # get sprite source
        and al, 0b1110_0000                                 # zero the page
        or al, cl                                           # put new page
        out 0x1D, al                                        # sprite has new page
        call pop-number-param
        br ex _out                                          # handle errors
        out 0x1E, cl                                        # sprite index
        br _configs
    _sprite-size: 
        call eval-all                                       # get scale
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        al := cl                                            # get width
        and al, 0b0000_1111                                 # limit to 0-15
        call pop-number-param
        br ex _out                                          # handle errors
        shl al, 4
        and cl, 0b0000_1111
        or al, cl                                           # height
        exc al                                              # swap nibbles
        out 0x20, al                                        # height, width
        call pop-number-param
        if ex {
            cmp dl, brodata.INSUFFICIENT_ARGUMENTS_ERROR
            br _out-no-err                                  # not present, no error
        }
        in al, 0x1F                                         # get sprite config
        and al, 0b0011_1111                                 # zero the scale
        shl cl, 6
        or al, cl                                           # put new scale
        out 0x1F, al                                        # sprite has new scale
        br _configs
    _sprite-tileset:
        call eval                                           # get source page
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x1F                                         # get sprite config
        and al, 0b1110_0000                                 # zero the tileset
        or al, cl                                           # put new page
        out 0x1F, al                                        # sprite has new tileset
        br _configs
    _sprite-color:
        call eval-all
        cmp dl, 0
        br !z _out
        call pop-number-param                               # foreground
        br ex _out                                          # handle error
        out 0x22, cl                                        # write foreground
        call pop-number-param                               # background (optional)
        if ex {
            cmp dl, brodata.INSUFFICIENT_ARGUMENTS_ERROR
            br _out-no-err                                  # not present, no error
        }
        out 0x21, cl
        br _configs
    _sprite-at:
        call eval-all
        cmp dl, 0
        br !z _out
        call pop-number-param                               # x-position
        br ex _out                                          # handle error
        exc c
        out 0x23, cl                                        # write X offset
        exc c
        out 0x24, cl
        call pop-number-param                               # y-position
        br ex _out
        exc c
        out 0x25, cl                                        # write Y offset
        exc c
        out 0x26, cl
        br _configs
    _sprite-layer:
        call eval                                           # get layer
        cmp dl, 0
        br !z _out                                          # handle errors
        call pop-number-param
        br ex _out                                          # handle errors
        in al, 0x1D                                         # get layer mode
        and al, 0b1001_1111                                 # zero the layer
        shl cl, 5
        or al, cl                                           # put new layer
        out 0x1D, al                                        # sprite has new layer
        br _configs
    }
}


