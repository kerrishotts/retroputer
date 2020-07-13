.segment __current__ kmemmap.basic.code-start .append {

    # push-param
    #
    # Pushes a parameter onto the global p stack.
    #
    # @param DL - token type
    # @param C  - value (or PTR)
    #######################################################################

    push-param: {
        enter 0x00
        push x
    _main:
        x := 0
        xl := [bdata.param-length]                          # get current length
        [bdata.param-types, x]  := dl                       # write the token data type
        shl x, 3                                            # multiply by eight (width of param)
        cmp dl, brodata.TOK_REAL
        if !z {
            [bdata.params, x] := c                          # write value
        } else {
            push y
            y := c                                          # for reals, c is pointing into memory
            c := [kmemmap.basic.dbls-start,y]               # byte 1
            [bdata.params, x] := c                          # 
            inc y
            inc y
            inc x
            inc x
            c := [kmemmap.basic.dbls-start,y]               # byte 2
            [bdata.params, x] := c                          # 
            inc y
            inc y
            inc x
            inc x
            c := [kmemmap.basic.dbls-start,y]               # byte 3
            [bdata.params, x] := c                          # 
            inc y
            inc y
            inc x
            inc x
            c := [kmemmap.basic.dbls-start,y]               # byte 4
            [bdata.params, x] := c                          # 
            pop y
        }
        xl := [bdata.param-length]
        inc xl
        [bdata.param-length] := xl
    _out:
        pop x
        exit 0x00
        ret
    }

    # pop-param
    #
    # Returns the parameter at the given index
    #
    # @returns DL - type of parameter
    # @returns C - value
    # @returns FLAG:X -- set if not enough parameters
    #######################################################################
    pop-param: {
        enter 0x00
        push x
    _main:
        x := 0
        xl := [bdata.param-length]                          # need to know the length of the queue
        dec xl
        if n {
            set EX                                          # not enough parameters on the queue, so
            br _out                                         # bail out
        }
        clr EX                                              # enough parameters
        dl := [bdata.param-types,x]                         # get type
        shl x, 3                                            # multiply index by 8
        c := [bdata.params,x]                               # get value; @fixme broken for reals

        xl := [bdata.param-length]                          # reduce length
        dec xl
        [bdata.param-length] := xl
    _out:
        pop x
        exit 0x00
        ret
    }

    # get-param
    #
    # Returns the parameter at the given index
    #
    # @param X - parameter to return
    # @returns DL - type of parameter
    # @returns C - value
    # @returns FLAG:X -- set if not enough parameters
    #######################################################################
    get-param: {
        enter 0x00
        push x
        push y
    _main:
        y := 0
        yl := [bdata.param-length]                          # need to know the length of the queue
        cmp xl, yl
        if !n {
            set EX                                          # not enough parameters on the queue, so
            br _out                                         # bail out
        }
        sub yl, xl                                          # queue is in reverse order
        dec yl                                              # so subtract the parameter 
        xl := yl                                            # in order to make sure that we index right
        clr EX                                              # enough parameters
        dl := [bdata.param-types,x]                         # get type
        shl x, 3                                            # multiply index by 8
        c := [bdata.params,x]                               # get value; @fixme broken for reals
    _out:
        pop y
        pop x
        exit 0x00
        ret
    }

    # clear-params
    # 
    # Resets the paramater queue
    #
    #######################################################################
    clear-params: {
        enter 0x00
        push x
    _main:
        x := 0
        [bdata.param-length] := x
    _out:
        pop x
        exit 0x00
        ret
    }

    #
    # get-var looks up a variable and returns the value in C with the type
    # in DL
    #
    # NOTE: this only works while parsing a line (having already eaten the
    # TOK_VARIABLE token)
    #
    #######################################################################
    get-var: {
        push x
        push b
        push y
    _main:
        # [b,d] = [type, index]
        call gettok-word                                    # get variable index & type
        b := d
        and b, 0b1100_0000_0000_0000                        # just want the type
        shr b, 14                                           # in the lower bits
        and d, 0b0011_1111_1111_1111                        # for index, we don't want the type

        # advance parser past variable name
        push d                                              # save variable index
        call gettok-raw                                     # next byte is the length of the variable name
        x := [bdata.current-line-aptr]
        clr c
        add x, dl                                           # x += variable length
        [bdata.current-line-aptr] := x                      # and store it back
        pop d                                               # get variable index back

        # index our variable correctly
        x := d                                              # use x so we can index in a bit
        cmp b, constants.TYPE_WORD
        if z {                                              # we're a word
            d := brodata.TOK_WORD
            c := [kmemmap.basic.ints-start, x]
            br _out
        }

        cmp b, constants.TYPE_STRING
        if z {
            d := brodata.TOK_STRING                         # we're a string!
            c := [kmemmap.basic.strs-start, x]
            br _out
        }

        cmp b, constants.TYPE_REAL
        if z {
            d := brodata.TOK_REAL                           # we're a real!
            shl x, 2                                        # multiply by eight instead (64 bits)
            c := x                                          # instead of a value, we return the index into variable memory
            br _out
        }

        # @todo: handle array bits!

    _out:
        pop y
        pop b
        pop x
        ret
    }

    pop-number-param: {
        call pop-param
        if EX {
            dl := brodata.INSUFFICIENT_ARGUMENTS_ERROR
            br _out
        }
        cmp dl, brodata.TOK_WORD
        if !Z {
            dl := brodata.TYPE_MISMATCH_ERROR
            set EX
            br _out
        }
    _out:
        ret
    }

    #
    # EVAL is responsible for evaluating the current expression
    # 
    # @returns DL: 0 if no error, or an error number if one occurred
    #
    #######################################################################
    eval: {
        call clear-params
        clr ex
        br _eval
    }
    eval-all: {
        call clear-params
        set ex
        br _eval
    }
    eval-next: {
        clr ex
        br _eval
    }
    eval-next-all: {
        set ex
        br _eval
    }
    _eval: {
        BIG_ENTER(271)
        .const cur-precedence -2
        .const in-paren -3                                  # tracks if we're in parentheses
        .const expecting   -4                               # tracks what we're expecting next
        .const orig-sp -6
        .const vector-bank -8
        .const vector-offs -10
        .const operator-stack -140                          # operator stack has room for 32 ops (each op is 4 bytes)
        .const value-stack -270                             # value stack has room for 32 values
        .const parse-all -271                               # parse-all indicates if we consume COMMAs at top level
        .const MAX_EXPR_SIZE 32 * 2                         # 32 operations or values (each is four bytes)
        push y
        push x
        push c
        push b
        push a
        [bp+orig-sp] := sp                                  # need a way to know when we've exhausted the stack
    _main:
        if ex {
            al := 0xFF
            [bp+parse-all] := al                            # if CARRY is set, we'll parse everything
        } else {
            al := 0x00
            [bp+parse-all] := al                            # If NOT, we won't
        }
        INIT_STACK_BP(operator-stack)
        INIT_STACK_BP(value-stack)
        a := 0
        [bp+expecting] := al                                # 0 = we're expecting a non-operator
        [bp+in-paren]  := al                                # 0 = not in a parenthesis
        do {
            x := [bp+value-stack]
            c := MAX_EXPR_SIZE
            cmp x, c
            br !n _too-complex                              # too complex an operation!

            x := [bp+operator-stack]
            c := MAX_EXPR_SIZE
            cmp x, c
            br !n _too-complex                              # it's too much, captain; the ship cannae take any more!

            call gettok                                     # get the next token in the stream

            cmp dl, 0
            br z _finish-eval                               # end-of-line, hope we're done!
            cmp dl, brodata.TOK_END_OF_STMT
            br z _finish-eval                               # end-of-statement, hope we're done!

            al := [bp+in-paren]                             # check if we're in a parenthesis
            cmp al, 0
            if z {                                          # we aren't, so bail if we see , or ;
                #push al
                al := [bp+parse-all]                        # should we parse COMMAS?
                cmp al, 0                                   # if 0, NO.
                #pop al
                if z {
                    cmp dl, brodata.TOK_COMMA               # comma is a valid exit (this time)
                    br z _finish-eval
                }
                cmp dl, brodata.TOK_SEMICOLON               # as is a semicolon
                br z _finish-eval
            } else {
                cmp dl, brodata.TOK_COMMA                   # a comma in a paren could be a 
                if z {                                      # parameter list; this is OK
                    continue
                }
                cmp dl, brodata.TOK_SEMICOLON               # but a semicolon isn't
                if z {
                    dl := brodata.SYNTAX_ERROR              # syntax error
                    br _out
                }
            }

            # a,b = vector, metadata for the token
            c := dl                                         # need to compute lookup address
            and cl, 0b0111_1111                             # drop the top bit (subtract 128)
            shl c, 2                                        # * 4 (vector, metadata word)
            push x                                          # stash this....
            x := c
            a := [expression-handlers, x]                   # a is now the handler vector
            inc x
            inc x
            b := [expression-handlers, x]                   # b is now the metadata
            pop x                                           # x is back to operator stack ptr
            # is token of any value here? b will be non-zero
            cmp b, 0
            if z {
                br _finish-eval                             # might be done?
            }

            # token is of value, what is it?
            cmp dl, brodata.TOK_VARIABLE                    # is it a variable?
            if z {
                call get-var                                # parse the variable. it'll be in the accumulator
                STPUSH_BP(d, value-stack)                   # push accumulator token on stack
                d := c
                STPUSH_BP(d, value-stack)                   # push accumulator on stack (@todo: wrong for reals)
                continue
            }

            cmp dl, brodata.TOK_BYTE                        # is it a byte?
            if z {
                dl := brodata.TOK_WORD
                STPUSH_BP(d, value-stack)                   # convert to word and push
                d := 0                                      # clear d in prep for next token (which will be a byte)
                call gettok-raw                             # next byte is our number
                STPUSH_BP(d, value-stack)                   # stack has word on it
                continue
            }

            cmp dl, brodata.TOK_WORD
            if z {                                          # it's a word
                STPUSH_BP(d, value-stack)
                call gettok-word
                STPUSH_BP(d, value-stack)
                continue
            }

            cmp dl, brodata.TOK_CODE_STRING
            if z {                                          # it's a string
                STPUSH_BP(d, value-stack)
                d := [bdata.current-line-aptr]
                STPUSH_BP(d, value-stack)                   # push POINTER to string
                do {
                    call gettok-raw
                    cmp dl, 0
                } while !z                                  # eat the rest of the string
                continue
            }

            cmp dl, brodata.TOK_LPAR
            if z {                                          # it's a left paren -- push and continue
                call _push-operator
                al := [bp+in-paren]
                inc al
                [bp+in-paren] := al                         # in a parenthesis now
                continue
            }

            cmp dl, brodata.TOK_RPAR
            if z {                                          # it's a right paren -- evaluate until we see a left paren
                # @todo handle paranthetical
                x := [bp+operator-stack]
                c := 0   
                cmp x, c                                    # is stack empty?
                while !z do {                               # keep going until it is...
                    call _pop-operator
                    cmp a, 0xFFFE                           # this is ('s pseudo-vector
                    brs z _continue
                    call _do-operator                       # pull an op and execute it
                    x := [bp+operator-stack]                # check stack size
                    c := 0   
                    cmp x, c
                }
                dl := brodata.EXPECTED_LEFT_PARENTHESIS
                br _out                                     # wow; forget something? A LPAREN!!!
            _continue:
                al := [bp+in-paren]
                dec al
                [bp+in-paren] := al                         # out of paren
                continue
            }

            x := [bp+operator-stack]                        # get current stack size
            c := 0   
            cmp x, c                                        # is the stack empty?
            x := a
            y := b
            while !z do {                                   # no, precedence and associativity need to be handled
                call _pop-operator
                cmp bl, yl                                  # does token take precedence?
                if n {                                      # it doesn't
                    call _push-operator                     # (yeesh, don't eat it)
                    break
                }
                cmp a, 0xFFFE                               # don't execute a parenthesis
                if z {
                    call _push-operator
                    break
                }
                call _do-operator                           # pull an op and execute it
                push x
                x := [bp+operator-stack]                    # check stack size
                c := 0
                cmp x, c
                pop x
            }
            a := x                                          # make sure op is what it was originally
            b := y                                          # before precedence check
            call _push-operator                             # push op and continue
            continue
        } while z
    _finish-eval:
        call backtok                                        # need to walk back a token

        x := [bp+operator-stack]
        c := 0   
        cmp x, c                                            # is stack empty?
        while !z do {                                       # keep going until it is...
            call _pop-operator
            cmp a, 0xFFFE                                   # shouldn't have parens anymore
            if z {
                dl := brodata.EXPECTED_RIGHT_PARENTHESIS
                brs _out
            }
            call _do-operator                               # pull an op and execute it
            x := [bp+operator-stack]                        # check stack size
            c := 0   
            cmp x, c
        }
    _done:
        STPOP_BP(d, value-stack)                            # pop type
        br ex _check-return                                 # if we exhaust the stack, check if we've returned at least one
        c := d
        STPOP_BP(d, value-stack)                            # pop value
        br ex _check-return
        bl := [bdata.param-length]                          # check parameter length -- if it's too large, bail
        cmp bl, 10
        br z _too-complex                                   # it is? too complex, then
        call push-param                                     # put it on the param stack

        br _done                                            # keep going til we exhaust the stack
    _check-return:
        cl := [bdata.param-length]
        cmp cl, 1
        br n _out-of-values                                 # have to return at least ONE value

#        STPOP_BP(d, value-stack)                            # pop off the last value -- this is our return
#        br ex _out-of-values
#        c := d
#        STPOP_BP(d, value-stack)
#        br ex _out-of-values
#        call push-param                                     # save the result globally
        dl := 0                                             # if we're here, we evaluated without issue
    _out:
        sp := [bp+orig-sp]                                  # make sure stack is cleaned up if we exited early
        pop a
        pop b
        pop c
        pop x
        pop y
        BIG_EXIT(271)
        ret
    _too-complex:
        dl := brodata.EXPRESSION_TOO_COMPLEX_ERROR
        brs _out
    _push-operator:
        STPUSH_BP(a, operator-stack)
        STPUSH_BP(b, operator-stack)
        ret
    _pop-operator:
        STPOP_BP(b, operator-stack)
        STPOP_BP(a, operator-stack)
        ret
    _do-operator:
        cmp a, 0                                            # if no handler, just return
        if z {
            ret
        }

        d := b
        and d, 0b1111_0000_0000_0000
        shr d, 12
        cmp dl, 0
        if !z {
            b := d
            do {
                STPOP_BP(d, value-stack)
                br ex _out-of-params
                c := d
                STPOP_BP(d, value-stack)
                br ex _out-of-params
                call push-param
                dec bl
            } while !z
        }

        [bp+vector-offs] := a
        call [bp+vector-offs]                               # call the operator handler

        cmp dl, 0
        br !z _out                                          # that didn't work

        # push value back on stack
        call pop-param
        STPUSH_BP(d, value-stack)
        d := c
        STPUSH_BP(d, value-stack)
        ret
    _out-of-values:
        dl := brodata.SYNTAX_ERROR
        br _out
    _out-of-params:
        dl := brodata.INSUFFICIENT_ARGUMENTS_ERROR
        br _out
    }
}
