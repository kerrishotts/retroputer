.segment __current__ kmemmap.basic.code-start .append {
    expression-handlers:        # vector, unary/binary (0/F), assoc (0=left,0F=right), precedence 
        .word token-not-impl                ,0x0014 # 128, ABS
        .word token-not-impl                ,0xF006 # 129, AND
        .word token-not-impl                ,0x0014 # 130, ASC
        .word token-not-impl                ,0x0014 # 131, ATN
        .word handler-syntax-error          ,0x0000 # 132, AT
        .word handler-syntax-error          ,0x0000 # 133, CALL
        .word handler-syntax-error          ,0x0000 # 134, CATALOG
        .word token-not-impl                ,0x0014 # 135, CHR
        .word handler-syntax-error          ,0x0000 # 136, CLS
        .word handler-syntax-error          ,0x0000 # 137, CLOSE
        .word handler-syntax-error          ,0x0000 # 138, CONTINUE
        .word token-not-impl                ,0x0014 # 139, COS
        .word handler-syntax-error          ,0x0000 # 140, DATA
        .word handler-syntax-error          ,0x0000 # 141, DEFFN
        .word handler-syntax-error          ,0x0000 # 142, DEFSUB
        .word handler-syntax-error          ,0x0000 # 143, DIM
        .word handler-syntax-error          ,0x0000 # 144, DO
        .word handler-syntax-error          ,0x0000 # 145, ELSEIF
        .word handler-syntax-error          ,0x0000 # 146, ELSE
        .word handler-syntax-error          ,0x0000 # 147, ENDSUB
        .word handler-syntax-error          ,0x0000 # 148, ENDFN
        .word handler-syntax-error          ,0x0000 # 149, ENDIF
        .word handler-syntax-error          ,0x0000 # 150, END
        .word token-not-impl                ,0x0014 # 151, EXP
        .word handler-syntax-error          ,0x0000 # 152, FOR
        .word token-not-impl                ,0x0014 # 153, GETKEY
        .word handler-syntax-error          ,0x0000 # 154, GOSUB
        .word handler-syntax-error          ,0x0000 # 155, GOTO
        .word token-not-impl                ,0x0014 # 156, HEX
        .word handler-syntax-error          ,0x0000 # 157, HOME
        .word handler-syntax-error          ,0x0000 # 158, IF
        .word handler-syntax-error          ,0x0000 # 159, INPUT
        .word token-not-impl                ,0x0014 # 160, INT
        .word handler-in-expr               ,0x0014 # 161, IN
        .word token-not-impl                ,0x0014 # 162, LEFT
        .word token-not-impl                ,0x0014 # 163, LEN
        .word handler-syntax-error          ,0x0000 # 164, LIST
        .word handler-syntax-error          ,0x0000 # 165, LOAD
        .word token-not-impl                ,0x0014 # 166, LOG
        .word handler-syntax-error          ,0x0000 # 167, LOOP
        .word token-not-impl                ,0x0014 # 168, MID
        .word handler-syntax-error          ,0x0000 # 169, NEW
        .word handler-syntax-error          ,0x0000 # 170, NEXT
        .word token-not-impl                ,0x0F11 # 171, NOT (right assoc)
        .word handler-syntax-error          ,0x0000 # 172, ON
        .word handler-syntax-error          ,0x0000 # 173, OPEN
        .word token-not-impl                ,0xF005 # 174, OR
        .word handler-syntax-error          ,0x0000 # 175, OUT
        .word handler-peek-expr             ,0xF014 # 176, PEEK
        .word handler-syntax-error          ,0x0000 # 177, POKE
        .word handler-syntax-error          ,0x0000 # 178, PRINT
        .word handler-syntax-error          ,0x0000 # 179, READ
        .word token-not-impl                ,0x0000 # 180, REM
        .word handler-syntax-error          ,0x0000 # 181, RETURN
        .word token-not-impl                ,0x0014 # 182, RIGHT
        .word token-not-impl                ,0x0014 # 183, RND
        .word handler-syntax-error          ,0x0000 # 184, RENAME
        .word handler-syntax-error          ,0x0000 # 185, REMOVE
        .word handler-syntax-error          ,0x0000 # 186, RESTORE
        .word handler-syntax-error          ,0x0000 # 187, RUN
        .word handler-syntax-error          ,0x0000 # 188, SAVE
        .word token-not-impl                ,0x0014 # 189, SGN
        .word token-not-impl                ,0x0014 # 190, SIN
        .word token-not-impl                ,0x0014 # 191, SPC
        .word token-not-impl                ,0x0014 # 192, SQR
        .word handler-syntax-error          ,0x0000 # 193, STEP
        .word handler-syntax-error          ,0x0000 # 194, STOP
        .word token-not-impl                ,0x0014 # 195, STR
        .word token-not-impl                ,0x0014 # 196, TAB
        .word token-not-impl                ,0x0014 # 197, TAN
        .word handler-syntax-error          ,0x0000 # 198, THEN
        .word handler-syntax-error          ,0x0000 # 199, TO
        .word handler-syntax-error          ,0x0000 # 200, UNTIL
        .word token-not-impl                ,0x0014 # 201, USR
        .word token-not-impl                ,0x0014 # 202, VAL
        .word handler-syntax-error          ,0x0000 # 203, WHILE
        .word handler-add-expr              ,0xF00E # 204, +  
        .word handler-sub-expr              ,0xF00E # 205, -  
        .word handler-mul-expr              ,0xF00F # 206, *
        .word token-not-impl                ,0xF00F # 207, /
        .word token-not-impl                ,0xF00F # 208, %
        .word token-not-impl                ,0xFF10 # 209, ^        right associative
        .word token-not-impl                ,0xF00B # 210, <>, !=
        .word token-not-impl                ,0xF00C # 211, <=
        .word token-not-impl                ,0xF00C # 212, >=
        .word token-not-impl                ,0xF00C # 213, <
        .word token-not-impl                ,0xF00C # 214, >
        .word token-not-impl                ,0xF00B # 215, =
        .word 0xFFFE                        ,0x0015 # 216, (
        .word 0xFFFF                        ,0x0015 # 217, )
        .word token-not-impl                ,0x0014 # 218, [
        .word token-not-impl                ,0x0014 # 219, ]
        .word token-not-impl                ,0x00FF # 220, :
        .word token-not-impl                ,0x0014 # 221, LOWER
        .word token-not-impl                ,0x0014 # 222, UPPER
        .word handler-syntax-error          ,0x0000 # 223, LET
        .word token-not-impl                ,0x0001 # 224, COMMA
        .word token-not-impl                ,0x0001 # 225, SEMICOLON
        .word token-not-impl                ,0x0000 # 226
        .word token-not-impl                ,0x0000 # 227
        .word token-not-impl                ,0x0000 # 228
        .word token-not-impl                ,0x0000 # 229
        .word token-not-impl                ,0x0000 # 230
        .word token-not-impl                ,0x0000 # 231
        .word token-not-impl                ,0x0000 # 232
        .word token-not-impl                ,0x0000 # 233
        .word token-not-impl                ,0x0000 # 234
        .word token-not-impl                ,0x0000 # 235
        .word token-not-impl                ,0x0000 # 236
        .word token-not-impl                ,0x0000 # 237
        .word token-not-impl                ,0x0000 # 238
        .word token-not-impl                ,0x0000 # 239
        .word token-not-impl                ,0x0000 # 240
        .word token-not-impl                ,0x0000 # 241
        .word token-not-impl                ,0x0000 # 242
        .word token-not-impl                ,0x0000 # 243
        .word token-not-impl                ,0x0000 # 244
        .word token-not-impl                ,0x0000 # 245
        .word token-not-impl                ,0x0000 # 246
        .word token-not-impl                ,0x0000 # 247
        .word token-not-impl                ,0x0000 # 248
        .word token-not-impl                ,0x00FF # 249, TOK_REAL
        .word token-not-impl                ,0x00FF # 250, TOK_VARIABLE
        .word token-not-impl                ,0x00FF # 251, TOK_CODE_STRING
        .word token-not-impl                ,0x00FF # 252, TOK_STRING
        .word token-not-impl                ,0x00FF # 253, TOK_DWORD
        .word token-not-impl                ,0x00FF # 254, TOK_WORD
        .word token-not-impl                ,0x00FF # 255, TOK_BYTE
    #
    # EVAL is responsible for evaluating the current expression
    # 
    # @returns DL: 0 if no error, or an error number if one occurred
    #
    #######################################################################
    eval: {
        BIG_ENTER(270)
        .const cur-precedence -2
        .const in-paren -3                  # tracks if we're in parentheses
        .const expecting   -4               # tracks what we're expecting next
        .const orig-sp -6
        .const vector-bank -8
        .const vector-offs -10
        .const operator-stack -140          # operator stack has room for 32 ops (each op is 4 bytes)
        .const value-stack -270             # value stack has room for 32 values
        .const MAX_EXPR_SIZE 32 * 2         # 32 operations or values (each is four bytes)
        push y
        push x
        push c
        push b
        push a
        [bp+orig-sp] := sp                  # need a way to know when we've exhausted the stack
    _main:
        INIT_STACK_BP(operator-stack)
        INIT_STACK_BP(value-stack)
        a := 0
        [bp+expecting] := al                    # 0 = we're expecting a non-operator
        [bp+in-paren]  := al                    # 0 = not in a parenthesis
        do {
            x := [bp+value-stack]
            c := MAX_EXPR_SIZE
            cmp x, c
            br !n _too-complex                  # too complex an operation!

            x := [bp+operator-stack]
            c := MAX_EXPR_SIZE
            cmp x, c
            br !n _too-complex                  # it's too much, captain; the ship cannae take any more!

            call gettok                         # get the next token in the stream

            cmp dl, 0
            br z _finish-eval                   # end-of-line, hope we're done!
            cmp dl, brodata.TOK_END_OF_STMT
            br z _finish-eval                   # end-of-statement, hope we're done!

            al := [bp+in-paren]                 # check if we're in a parenthesis
            cmp al, 0
            if z {                              # we aren't, so bail if we see , or ;
                cmp dl, brodata.TOK_COMMA       # comma is a valid exit
                br z _finish-eval
                cmp dl, brodata.TOK_SEMICOLON   # as is a semicolon
                br z _finish-eval
            } else {
                cmp dl, brodata.TOK_COMMA       # a comma in a paren could be a 
                if z {                          # parameter list; this is OK
                    continue
                }
                cmp dl, brodata.TOK_SEMICOLON   # but a semicolon isn't
                if z {
                    dl := brodata.SYNTAX_ERROR  # syntax error
                    br _out
                }
            }

            # a,b = vector, metadata for the token
            c := dl                             # need to compute lookup address
            and cl, 0b0111_1111                 # drop the top bit (subtract 128)
            shl c, 2                            # * 4 (vector, metadata word)
            push x                              # stash this....
            x := c
            a := [expression-handlers, x]       # a is now the handler vector
            inc x
            inc x
            b := [expression-handlers, x]       # b is now the metadata
            pop x                               # x is back to operator stack ptr
            # is token of any value here? b will be non-zero
            cmp b, 0
            if z {
                dl := brodata.SYNTAX_ERROR      # Nope; bail!
                br _out
            }

            # token is of value, what is it?
            cmp dl, brodata.TOK_VARIABLE        # is it a variable?
            if z {
                call getvar                     # parse the variable. it'll be in the accumulator
                dl := [bdata.accumulator-token]
                STPUSH_BP(d, value-stack)       #push accumulator token on stack
                d := [bdata.accumulator]
                STPUSH_BP(d, value-stack)       # push accumulator on stack (@todo: wrong for reals)
                continue
            }

            cmp dl, brodata.TOK_BYTE            # is it a byte?
            if z {
                dl := brodata.TOK_WORD
                STPUSH_BP(d, value-stack)       # convert to word and push
                d := 0                          # clear d in prep for next token (which will be a byte)
                call gettok                     # next byte is our number
                STPUSH_BP(d, value-stack)       # stack has word on it
                continue
            }

            cmp dl, brodata.TOK_WORD
            if z {                              # it's a word
                STPUSH_BP(d, value-stack)
                call gettok-word
                STPUSH_BP(d, value-stack)
                continue
            }

            cmp dl, brodata.TOK_CODE_STRING
            if z {                              # it's a string
                STPUSH_BP(d, value-stack)
                d := [bdata.current-line-aptr]
                STPUSH_BP(d, value-stack)       # push POINTER to string
                do {
                    call gettok
                    cmp dl, 0
                } while !z                      # eat the rest of the string
                continue
            }

            cmp dl, brodata.TOK_LPAR
            if z {                              # it's a left paren -- push and continue
                call _push-operator
                al := [bp+in-paren]
                inc al
                [bp+in-paren] := al             # in a parenthesis now
                continue
            }

            cmp dl, brodata.TOK_RPAR
            if z {                              # it's a right paren -- evaluate until we see a left paren
                # @todo handle paranthetical
                x := [bp+operator-stack]
                c := 0   
                cmp x, c                        # is stack empty?
                while !z do {                   # keep going until it is...
                    call _pop-operator
                    cmp a, 0xFFFE               # this is ('s pseudo-vector
                    brs z _continue
                    call _do-operator           # pull an op and execute it
                    x := [bp+operator-stack]    # check stack size
                    cmp x, c
                }
                dl := brodata.EXPECTED_LEFT_PARENTHESIS
                br _out                         # wow; forget something? A LPAREN!!!
            _continue:
                al := [bp+in-paren]
                dec al
                [bp+in-paren] := al             # out of paren
                continue
            }

            x := [bp+operator-stack]            # get current stack size
            c := 0   
            cmp x, c                            # is the stack empty?
            x := a
            y := b
            while !z do {                       # no, precedence and associativity need to be handled
                call _pop-operator
                cmp bl, yl                      # does token take precedence?
                if n {                          # it doesn't
                    call _push-operator         # (yeesh, don't eat it)
                    break
                }
                cmp a, 0xFFFE                   # don't execute a parenthesis
                if z {
                    call _push-operator
                    break
                }
                call _do-operator               # pull an op and execute it
                push x
                x := [bp+operator-stack]        # check stack size
                c := 0
                cmp x, c
                pop x
            }
            a := x                              # make sure op is what it was originally
            b := y                              # before precedence check
            call _push-operator                 # push op and continue
            continue
        } while z
    _finish-eval:
        call backtok                            # need to walk back a token

        x := [bp+operator-stack]
        c := 0   
        cmp x, c                                # is stack empty?
        while !z do {                           # keep going until it is...
            call _pop-operator
            cmp a, 0xFFFE                       # shouldn't have parens anymore
            if z {
                dl := brodata.EXPECTED_RIGHT_PARENTHESIS
                brs _out
            }
            call _do-operator                   # pull an op and execute it
            x := [bp+operator-stack]            # check stack size
            cmp x, c
        }
    _done:
        STPOP_BP(d, value-stack)                # pop off the last value -- this is our return
        [bdata.accumulator] := d
        STPOP_BP(d, value-stack)
        [bdata.accumulator-token] := dl
        dl := 0                                 # if we're here, we evaluated without issue
    _out:
        sp := [bp+orig-sp]                      # make sure stack is cleaned up if we exited early
        pop a
        pop b
        pop c
        pop x
        pop y
        BIG_EXIT(270)
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

        d := b
        and d, 0b1111_0000_0000_0000
        shr d, 12
        cmp dl, 0xF
        if z {
            # pop off second value
            STPOP_BP(d, value-stack)
            [bdata.operand] := d
            STPOP_BP(d, value-stack)
            [bdata.operand-token] := dl
        }
        # pop off first
        STPOP_BP(d, value-stack)
        [bdata.accumulator] := d
        STPOP_BP(d, value-stack)
        [bdata.accumulator-token] := dl

        [bp+vector-offs] := a
        call [bp+vector-offs]                    # call the operator handler

        cmp dl, 0
        br !z _out                               # that didn't work

        # push value back on stack
        dl := [bdata.accumulator-token]
        STPUSH_BP(d, value-stack)
        d := [bdata.accumulator]
        STPUSH_BP(d, value-stack)
        ret
    }
}
