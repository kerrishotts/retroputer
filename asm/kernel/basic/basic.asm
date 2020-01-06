########################################
#
# Retroputer Kernel : BASIC : Core
#
########################################

.namespace basic {
    .segment brodata kmemmap.basic.rodata-start .append {

###############################################################################
#
# Welcome message and prompt
#
###############################################################################
        welcome:
            .byte 12, 13
            .string " **** RETROPUTER BASIC 1.0 ****"
            .byte 13, 13
            .string "512K RAM  40960 BASIC BYTES FREE"
            .byte 13, 0
        prompt:
            .string "READY."
        newline:
            .byte 13, 0
        
###############################################################################
#
# Error Messages
#
# These are NUL-terminated error messages. It's expected that the "error" 
# word will be appended on output. The vector can be used to look up an error
# based on its number.
#
###############################################################################
        errors:
        syntax-err:             .string "SYNTAX"                  # Error 00
                                .byte 0
        type-mismatch-err:      .string "TYPE MISMATCH"           # 01
                                .byte 0
        undefined-subroutine-err: .string "UNDEFINED SUBROUTINE"    # 02
                                .byte 0
        undefined-function-err: .string "UNDEFINED FUNCTION"      # 03
                                .byte 0
        undefined-statement-err:.string "UNDEFINED STATEMENT"     # 04
                                .byte 0
        insufficient-args-err:  .string "INSUFFICIENT ARGUMENTS"  # 05
                                .byte 0
        too-many-args-err:      .string "TOO MANY ARGUMENTS"      # 06
                                .byte 0
        can-not-continue-err:   .string "CAN'T CONTINUE"          # 07
                                .byte 0
        out-of-data-err:        .string "OUT OF DATA"             # 08
                                .byte 0
        deffn-without-endfn-err:.string "DEFFN WITHOUT ENDFN"     # 09
                                .byte 0
        defsub-without-endsub-err:  .string "DEFSUB WITHOUT ENDSUB"   # 10
                                .byte 0
        not-enough-memory-err:  .string "NOT ENOUGH MEMORY"       # 11
                                .byte 0
        out-of-memory-err:      .string "OUT OF MEMORY"           # 12
                                .byte 0
        invalid-quantity-err:   .string "INVALID QUANTITY"        # 13
                                .byte 0
        do-without-loop-err:    .string "DO WITHOUT LOOP"         # 14
                                .byte 0
        mismatched-next-err:    .string "MISMATCHED NEXT"         # 15
                                .byte 0
        if-without-endif-err:   .string "IF WITHOUT ENDIF"        # 16
                                .byte 0
        else-without-if-err:    .string "ELSE WITHOUT IF"         # 17
                                .byte 0
        endif-without-if-err:   .string "ENDIF WITHOUT IF"        # 18
                                .byte 0
        elseif-without-if-err:  .string "ELSEIF WITHOUT IF"       # 19
                                .byte 0
        file-not-found-err:     .string "FILE NOT FOUND"          # 20
                                .byte 0
        unexpected-return-err:  .string "RETURN WITHOUT CALL OR GOSUB" # 21
                                .byte 0
        out-of-disk-space-err:  .string "OUT OF DISK SPACE"       # 22
                                .byte 0
        file-exists-err:        .string "FILE EXISTS"             # 23
                                .byte 0
        stopped-err:            .string "STOPPED"                 # 24
                                .byte 0
        string-too-long-err:    .string "STRING TOO LONG"         # 25
                                .byte 0
        line-too-long-err:      .string "LINE TOO LONG"           # 26
                                .byte 0
        next-without-for-err:   .string "NEXT WITHOUT FOR"        # 27
                                .byte 0
        while-without-loop-err: .string "WHILE WITHOUT LOOP"      # 28
                                .byte 0
        until-without-loop-err: .string "UNTIL WITHOUT LOOP"      # 29
                                .byte 0
        loop-without-do-err:    .string "LOOP WITHOUT DO"         # 30
                                .byte 0
        expression-too-complex-err: .string "EXPRESSION TOO COMPLEX"  # 31
                                .byte 0
        stack-overflow-err:     .string "STACK OVERFLOW"          # 32
                                .byte 0
        error:                  .string " ERROR"                  # 33
                                .byte 13, 0
        error-vectors:
            .word syntax-err, type-mismatch-err, undefined-subroutine-err, undefined-function-err, undefined-statement-err
            .word insufficient-args-err, too-many-args-err, can-not-continue-err, out-of-data-err, deffn-without-endfn-err
            .word defsub-without-endsub-err, not-enough-memory-err, out-of-memory-err, invalid-quantity-err, do-without-loop-err
            .word mismatched-next-err, if-without-endif-err, else-without-if-err, endif-without-if-err, elseif-without-if-err
            .word file-not-found-err, unexpected-return-err, out-of-disk-space-err, file-exists-err, stopped-err, string-too-long-err
            .word line-too-long-err, next-without-for-err, while-without-loop-err, until-without-loop-err, loop-without-do-err
            .word expression-too-complex-err, stack-overflow-err, error
        

###############################################################################
#
# Keywords, operators, and other tokenizable items
#
# This list forms the reserved words in BASIC, and includes statements,
# functions, logical operators, numerical operators, and other important
# symbols.
#
# The storage is as follows:
#
# KEYWORD\0: A NUL-Terminated keyword
# TOKEN MAP: A byte indicating the token mapping
#
# Given a token, one can look up the full version using the associated vectors
# (subtract 128 first).
#
###############################################################################
        keywords:
            _abs-keyword:        .string "ABS" 
                                .byte 0, 128
            _and-keyword:        .string "AND" 
                                .byte 0, 129
            _asc-keyword:        .string "ASC" 
                                .byte 0, 130
            _atn-keyword:        .string "ATN" 
                                .byte 0, 131
            _at-keyword:         .string "AT" 
                                .byte 0, 132
            _call-keyword:       .string "CALL" 
                                .byte 0, 133
            _catalog-keyword:    .string "CATALOG" 
                                .byte 0, 134
            _chr-keyword:        .string "CHR$" 
                                .byte 0, 135
            _cls-keyword:        .string "CLS" 
                                .byte 0, 136
            _close-keyword:      .string "CLOSE" 
                                .byte 0, 137
            _continue-keyword:   .string "CONTINUE" 
                                .byte 0, 138
            _cos-keyword:        .string "COS" 
                                .byte 0, 139
            _data-keyword:       .string "DATA" 
                                .byte 0, 140
            _deffn-keyword:      .string "DEFFN" 
                                .byte 0, 141
            _defsub-keyword:     .string "DEFSUB" 
                                .byte 0, 142
            _dim-keyword:        .string "DIM" 
                                .byte 0, 143
            _do-keyword:         .string "DO" 
                                .byte 0, 144
            _elseif-keyword:     .string "ELSEIF" 
                                .byte 0, 145
            _else-keyword:       .string "ELSE" 
                                .byte 0, 146
            _endsub-keyword:     .string "ENDSUB" 
                                .byte 0, 147
            _endfn-keyword:      .string "ENDFN" 
                                .byte 0, 148
            _endif-keyword:      .string "ENDIF" 
                                .byte 0, 149
            _end-keyword:        .string "END" 
                                .byte 0, 150
            _exp-keyword:        .string "EXP" 
                                .byte 0, 151
            _for-keyword:        .string "FOR" 
                                .byte 0, 152
            _getkey-keyword:     .string "GETKEY$" 
                                .byte 0, 153
            _gosub-keyword:      .string "GOSUB" 
                                .byte 0, 154
            _goto-keyword:       .string "GOTO" 
                                .byte 0, 155
            _hex-keyword:        .string "HEX$" 
                                .byte 0, 156
            _home-keyword:       .string "HOME" 
                                .byte 0, 157
            _if-keyword:         .string "IF" 
                                .byte 0, 158
            _input-keyword:      .string "INPUT" 
                                .byte 0, 159
            _int-keyword:        .string "INT" 
                                .byte 0, 160
            _in-keyword:         .string "IN" 
                                .byte 0, 161
            _left-keyword:       .string "LEFT$" 
                                .byte 0, 162
            _len-keyword:        .string "LEN" 
                                .byte 0, 163
            _list-keyword:       .string "LIST" 
                                .byte 0, 164
            _load-keyword:       .string "LOAD" 
                                .byte 0, 165
            _log-keyword:        .string "LOG" 
                                .byte 0, 166
            _loop-keyword:       .string "LOOP" 
                                .byte 0, 167
            _mid-keyword:        .string "MID$" 
                                .byte 0, 168
            _new-keyword:        .string "NEW" 
                                .byte 0, 169
            _next-keyword:       .string "NEXT" 
                                .byte 0, 170
            _not-keyword:        .string "NOT" 
                                .byte 0, 171
            _on-keyword:         .string "ON" 
                                .byte 0, 172
            _open-keyword:       .string "OPEN" 
                                .byte 0, 173
            _or-keyword:         .string "OR" 
                                .byte 0, 174
            _out-keyword:        .string "OUT" 
                                .byte 0, 175
            _peek-keyword:       .string "PEEK" 
                                .byte 0, 176
            _poke-keyword:       .string "POKE" 
                                .byte 0, 177
            _print-keyword:      .string "PRINT" 
                                .byte 0, 178
            _read-keyword:       .string "READ" 
                                .byte 0, 179
            _rem-keyword:        .string "REM" 
                                .byte 0, 180
            _return-keyword:     .string "RETURN" 
                                .byte 0, 181
            _right-keyword:      .string "RIGHT$" 
                                .byte 0, 182
            _rnd-keyword:        .string "RND" 
                                .byte 0, 183
            _rename-keyword:     .string "RENAME" 
                                .byte 0, 184
            _remove-keyword:     .string "REMOVE" 
                                .byte 0, 185
            _restore-keyword:    .string "RESTORE" 
                                .byte 0, 186
            _run-keyword:        .string "RUN" 
                                .byte 0, 187
            _save-keyword:       .string "SAVE" 
                                .byte 0, 188
            _sgn-keyword:        .string "SGN" 
                                .byte 0, 189
            _sin-keyword:        .string "SIN" 
                                .byte 0, 190
            _spc-keyword:        .string "SPC" 
                                .byte 0, 191
            _sqr-keyword:        .string "SQR" 
                                .byte 0, 192
            _step-keyword:       .string "STEP" 
                                .byte 0, 193
            _stop-keyword:       .string "STOP" 
                                .byte 0, 194
            _str-keyword:        .string "STR$" 
                                .byte 0, 195
            _tab-keyword:        .string "TAB" 
                                .byte 0, 196
            _tan-keyword:        .string "TAN" 
                                .byte 0, 197
            _then-keyword:       .string "THEN" 
                                .byte 0, 198
            _to-keyword:         .string "TO" 
                                .byte 0, 199
            _until-keyword:      .string "UNTIL" 
                                .byte 0, 200
            _usr-keyword:        .string "USR" 
                                .byte 0, 201
            _val-keyword:        .string "VAL" 
                                .byte 0, 202
            _while-keyword:      .string "WHILE" 
                                .byte 0, 203
            _add-operator:      .string "+"
                                .byte 0, 204
            _sub-operator:      .string "-"
                                .byte 0, 205
            _mul-operator:      .string "*"
                                .byte 0, 206
            _div-operator:      .string "/"
                                .byte 0, 207
            _mod-operator:      .string "%"
                                .byte 0, 208
            _pow-operator:      .string "^"
                                .byte 0, 209
            _neq-operator:      .string "<>"
                                .byte 0, 210
            _lte-operator:      .string "<="
                                .byte 0, 211
            _gte-operator:      .string ">="
                                .byte 0, 212
            _lt-operator:      .string "<"
                                .byte 0, 213
            _gt-operator:      .string ">"
                                .byte 0, 214
            _equ-operator:      .string "="
                                .byte 0, 215
            _lpar-token:      .string "("
                                .byte 0, 216
            _rpar-token:      .string ")"
                                .byte 0, 217
            _lbracket-token:    .string "["
                                .byte 0, 218
            _rbracket-token:    .string "]"
                                .byte 0, 219
            _end-of-stmt:       .string ":"
                                .byte 0, 220
            token-vectors: 
                .word _abs-keyword, _and-keyword, _asc-keyword, _atn-keyword, _at-keyword
                .word _call-keyword, _catalog-keyword, _chr-keyword, _cls-keyword, _close-keyword
                .word _continue-keyword, _cos-keyword, _data-keyword, _deffn-keyword, _defsub-keyword
                .word _dim-keyword, _do-keyword, _elseif-keyword, _else-keyword, _endsub-keyword
                .word _endfn-keyword, _endif-keyword, _end-keyword, _exp-keyword, _for-keyword, _getkey-keyword
                .word _gosub-keyword, _goto-keyword, _hex-keyword, _home-keyword, _if-keyword, _input-keyword
                .word _int-keyword, _in-keyword, _left-keyword, _len-keyword, _list-keyword, _load-keyword
                .word _log-keyword, _loop-keyword, _mid-keyword, _new-keyword, _next-keyword, _not-keyword
                .word _on-keyword, _open-keyword, _or-keyword, _out-keyword, _peek-keyword, _poke-keyword
                .word _print-keyword, _read-keyword, _rem-keyword, _return-keyword, _right-keyword
                .word _rnd-keyword, _rename-keyword, _remove-keyword, _restore-keyword, _run-keyword
                .word _save-keyword, _sgn-keyword, _sin-keyword, _spc-keyword, _sqr-keyword, _step-keyword
                .word _stop-keyword, _str-keyword, _tab-keyword, _tan-keyword, _then-keyword, _to-keyword
                .word _until-keyword, _usr-keyword, _val-keyword, _while-keyword, _add-operator, _sub-operator
                .word _mul-operator, _div-operator, _mod-operator, _pow-operator, _neq-operator, _lte-operator
                .word _gte-operator, _lt-operator, _gt-operator, _equ-operator, _lpar-token, _rpar-token
                .word _lbracket-token, _rbracket-token, _end-of-stmt
    }
    
###############################################################################
#
# Global BASIC State
#
###############################################################################
    .segment bdata kmemmap.basic.data-start .append {
        buffer:              .byte[256]          # input buffer
        crunch-buffer:       .byte[256]          # line crunch buffer

    }

###############################################################################
#
# BASIC Logic
#
###############################################################################
    .segment bcode kmemmap.basic.code-start .append {
        start: {
            call init                            # Say hello
            call repl                            # Enter the REPL
            brk
        }

        #
        # Hi!
        #
        #######################################################################
        init: {
            d := brodata.welcome >> 3
            x := brodata.welcome & 7
            call [vectors.PRINT]
            ret
        }

        #
        # The REPL is responsible for:
        # 
        # 1. Print prompt, and take input (via vectors.INPUT)
        # 2. Crunching the line
        # 3a. If there's a line number, add it to program memory
        # 3b. If there's no line number, execute it immediately
        # 4. If an error has occurred, print it.
        # 5. Go back to 1.
        #
        #######################################################################
        repl: {
        _loop:

            #
            # STEP 1
            #
            d := brodata.prompt >> 3
            x := brodata.prompt & 7
            call [vectors.PRINT]                 # READY.

        _get-line:
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            c := 255
            call [vectors.INPUT]                 # Get input from user

            d := brodata.newline >> 3
            x := brodata.newline & 7
            call [vectors.PRINT]                 # NEWLINE, to be neat

            # Is the line too long, or no line at all?
            cmp c, 0x00
            if z {
                # no line; go again, but no prompt
                br _get-line
            }
            if n {
                # too long
                d := brodata.line-too-long-err >> 3
                x := brodata.line-too-long-err & 7
                call [vectors.PRINT]
                d := brodata.error >> 3
                x := brodata.error & 7
                call [vectors.PRINT]

                # try again.
                br _loop
            }


            #
            # STEP 2: Crunch
            #

            # 2a. UPPERCASE anything that's not a string; this is important
            #     to ensure that we can properly crunch later.
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            y := 0
            bl := 0                              # tracks if we're in quote mode
            do {
                al := [d, x, y]
                cmp al, 34
                if z {
                    # QUOTE!
                    xor bl, 0xFF                 # toggle quote mode on and off
                }
                cmp bl, 0xFF
                if !z {
                    # not in quote mode, do uppercase handling
                    cmp al, 97
                    if !n {
                        cmp al, 123
                        if n {
                            and al, 0b11011111       # to uppercase (zero bit 5)
                            [d, x, y] := al
                        }
                    }
                }
                inc y
                cmp al, 0x00
            } while !z

            # TEMP: Display what we got
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            call [vectors.PRINT]
            d := brodata.newline >> 3
            x := brodata.newline & 7
            call [vectors.PRINT]                 # NEWLINE, to be neat


            #
            # STEP 3: Store / execute
            #

            #
            # STEP 4: Display errors
            #

            #
            # STEP 5: Do it again
            #
            br _loop
            ret
        }
    }
}