.segment __current__ kmemmap.basic.code-start .append {
    statement-handlers:
        .word handler-syntax-error          # 128, ABS
        .word handler-syntax-error          # 129, AND
        .word handler-syntax-error          # 130, ASC
        .word handler-syntax-error          # 131, ATN
        .word handler-syntax-error          # 132, AT
        .word token-not-impl                # 133, CALL
        .word token-not-impl                # 134, CATALOG
        .word handler-syntax-error          # 135, CHR
        .word handler-clear-screen          # 136, CLS
        .word token-not-impl                # 137, CLOSE
        .word token-not-impl                # 138, CONTINUE
        .word handler-syntax-error          # 139, COS
        .word token-not-impl                # 140, DATA
        .word token-not-impl                # 141, DEFFN
        .word token-not-impl                # 142, DEFSUB
        .word token-not-impl                # 143, DIM
        .word token-not-impl                # 144, DO
        .word token-not-impl                # 145, ELSEIF
        .word token-not-impl                # 146, ELSE
        .word token-not-impl                # 147, ENDSUB
        .word token-not-impl                # 148, ENDFN
        .word token-not-impl                # 149, ENDIF
        .word token-not-impl                # 150, END
        .word handler-syntax-error          # 151, EXP
        .word token-not-impl                # 152, FOR
        .word handler-syntax-error          # 153, GETKEY
        .word token-not-impl                # 154, GOSUB
        .word handler-goto                  # 155, GOTO
        .word handler-syntax-error          # 156, HEX
        .word handler-home                  # 157, HOME
        .word handler-if                    # 158, IF
        .word token-not-impl                # 159, INPUT
        .word handler-syntax-error          # 160, INT
        .word handler-syntax-error          # 161, IN
        .word handler-syntax-error          # 162, LEFT
        .word handler-syntax-error          # 163, LEN
        .word handler-list                  # 164, LIST
        .word token-not-impl                # 165, LOAD
        .word handler-syntax-error          # 166, LOG
        .word token-not-impl                # 167, LOOP
        .word handler-syntax-error          # 168, MID
        .word handler-new                   # 169, NEW
        .word token-not-impl                # 170, NEXT
        .word handler-syntax-error          # 171, NOT
        .word token-not-impl                # 172, ON
        .word token-not-impl                # 173, OPEN
        .word handler-syntax-error          # 174, OR
        .word token-not-impl                # 175, OUT
        .word handler-syntax-error          # 176, PEEK
        .word handler-poke                  # 177, POKE
        .word handler-print                 # 178, PRINT
        .word token-not-impl                # 179, READ
        .word handler-rem                   # 180, REM
        .word token-not-impl                # 181, RETURN
        .word handler-syntax-error          # 182, RIGHT
        .word handler-syntax-error          # 183, RND
        .word token-not-impl                # 184, RENAME
        .word token-not-impl                # 185, REMOVE
        .word token-not-impl                # 186, RESTORE
        .word handler-run                   # 187, RUN
        .word token-not-impl                # 188, SAVE
        .word handler-syntax-error          # 189, SGN
        .word handler-syntax-error          # 190, SIN
        .word handler-syntax-error          # 191, SPC
        .word handler-syntax-error          # 192, SQR
        .word token-not-impl                # 193, STEP
        .word token-not-impl                # 194, STOP
        .word handler-syntax-error          # 195, STR
        .word handler-syntax-error          # 196, TAB
        .word handler-syntax-error          # 197, TAN
        .word token-not-impl                # 198, THEN
        .word token-not-impl                # 199, TO
        .word token-not-impl                # 200, UNTIL
        .word handler-syntax-error          # 201, USR
        .word handler-syntax-error          # 202, VAL
        .word token-not-impl                # 203, WHILE
        .word handler-syntax-error          # 204, +  
        .word handler-syntax-error          # 205, -  
        .word handler-syntax-error          # 206, *
        .word handler-syntax-error          # 207, /
        .word handler-syntax-error          # 208, %
        .word handler-syntax-error          # 209, ^
        .word handler-syntax-error          # 210, <>, !=
        .word handler-syntax-error          # 211, <=
        .word handler-syntax-error          # 212, >=
        .word handler-syntax-error          # 213, <
        .word handler-syntax-error          # 214, >
        .word handler-syntax-error          # 215, =
        .word handler-syntax-error          # 216, (
        .word handler-syntax-error          # 217, )
        .word handler-syntax-error          # 218, [
        .word handler-syntax-error          # 219, ]
        .word token-not-impl                # 220, :
        .word handler-syntax-error          # 221, LOWER
        .word handler-syntax-error          # 222, UPPER
        .word handler-let                   # 223, LET
        .word token-not-impl                # 224, COMMA
        .word token-not-impl                # 225, SEMICOLON
        .word token-not-impl                # 226, CHRS$
        .word token-not-impl                # 227
        .word token-not-impl                # 228
        .word token-not-impl                # 229
        .word token-not-impl                # 230
        .word token-not-impl                # 231
        .word token-not-impl                # 232
        .word token-not-impl                # 233
        .word token-not-impl                # 234
        .word token-not-impl                # 235
        .word token-not-impl                # 236
        .word token-not-impl                # 237
        .word token-not-impl                # 238
        .word token-not-impl                # 239
        .word token-not-impl                # 240
        .word token-not-impl                # 241
        .word token-not-impl                # 242
        .word token-not-impl                # 243
        .word token-not-impl                # 244
        .word token-not-impl                # 245
        .word token-not-impl                # 246
        .word token-not-impl                # 247
        .word token-not-impl                # 248
        .word handler-syntax-error          # 249, TOK_REAL
        .word handler-assignment            # 250, TOK_VARIABLE
        .word handler-syntax-error          # 251, TOK_CODE_STRING
        .word handler-syntax-error          # 252, TOK_STRING
        .word handler-syntax-error          # 253, TOK_DWORD
        .word handler-syntax-error          # 254, TOK_WORD
        .word handler-syntax-error          # 255, TOK_BYTE


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