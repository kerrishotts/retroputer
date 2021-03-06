
.segment brodata kmemmap.basic.rodata-start .append {

        keywords:
                                .const TOK_ABS                          128
            _abs-keyword:       .string "ABS"          , constants.NUL, TOK_ABS
                                .const TOK_AND                          129
            _and-keyword:       .string "AND"          , constants.NUL, TOK_AND
                                .const TOK_ASC                          130
            _asc-keyword:       .string "ASC"          , constants.NUL, TOK_ASC
                                .const TOK_ATN                          131
            _atn-keyword:       .string "ATN"          , constants.NUL, TOK_ATN
                                .const TOK_AT                           132
            _at-keyword:        .string "AT"           , constants.NUL, TOK_AT
                                .const TOK_CALL                         133
            _call-keyword:      .string "CALL"         , constants.NUL, TOK_CALL
                                .const TOK_CATALOG                      134
            _catalog-keyword:   .string "CATALOG"      , constants.NUL, TOK_CATALOG
                                .const TOK_CHRS                         135
            _chrs-keyword:      .string "CHRS$"        , constants.NUL, TOK_CHRS
                                .const TOK_CHR                          136
            _chr-keyword:       .string "CHR$"         , constants.NUL, TOK_CHR
                                .const TOK_CLS                          137
            _cls-keyword:       .string "CLS"          , constants.NUL, TOK_CLS
                                .const TOK_CLOSE                        138
            _close-keyword:     .string "CLOSE"        , constants.NUL, TOK_CLOSE
                                .const TOK_CONTINUE                     139
            _continue-keyword:  .string "CONTINUE"     , constants.NUL, TOK_CONTINUE
                                .string "CONT"         , constants.NUL, TOK_CONTINUE
                                .const TOK_COS                          140
            _cos-keyword:       .string "COS"          , constants.NUL, TOK_COS
                                .const TOK_DATA                         141
            _data-keyword:      .string "DATA"         , constants.NUL, TOK_DATA
                                .const TOK_DEFFN                        142
            _deffn-keyword:     .string "DEFFN"        , constants.NUL, TOK_DEFFN
                                .const TOK_DEFSUB                       143
            _defsub-keyword:    .string "DEFSUB"       , constants.NUL, TOK_DEFSUB
                                .const TOK_DIM                          144
            _dim-keyword:       .string "DIM"          , constants.NUL, TOK_DIM
                                .const TOK_DO                           145
            _do-keyword:        .string "DO"           , constants.NUL, TOK_DO
                                .const TOK_ELSEIF                       146
            _elseif-keyword:    .string "ELSEIF"       , constants.NUL, TOK_ELSEIF
                                .const TOK_ELSE                         147
            _else-keyword:      .string "ELSE"         , constants.NUL, TOK_ELSE
                                .const TOK_ENDSUB                       148
            _endsub-keyword:    .string "ENDSUB"       , constants.NUL, TOK_ENDSUB
                                .const TOK_ENDFN                        149
            _endfn-keyword:     .string "ENDFN"        , constants.NUL, TOK_ENDFN
                                .const TOK_ENDIF                        150
            _endif-keyword:     .string "ENDIF"        , constants.NUL, TOK_ENDIF
                                .const TOK_END                          151
            _end-keyword:       .string "END"          , constants.NUL, TOK_END
                                .const TOK_EXP                          152
            _exp-keyword:       .string "EXP"          , constants.NUL, TOK_EXP
                                .const TOK_FOR                          153
            _for-keyword:       .string "FOR"          , constants.NUL, TOK_FOR
                                .const TOK_GETKEY                       154
            _getkey-keyword:    .string "GETKEY$"      , constants.NUL, TOK_GETKEY
                                .const TOK_GOSUB                        155
            _gosub-keyword:     .string "GOSUB"        , constants.NUL, TOK_GOSUB
                                .const TOK_GOTO                         156
            _goto-keyword:      .string "GOTO"         , constants.NUL, TOK_GOTO
                                .const TOK_HEX                          157
            _hex-keyword:       .string "HEX$"         , constants.NUL, TOK_HEX
                                .const TOK_HOME                         158
            _home-keyword:      .string "HOME"         , constants.NUL, TOK_HOME
                                .const TOK_IF                           159
            _if-keyword:        .string "IF"           , constants.NUL, TOK_IF
                                .const TOK_INPUT                        160
            _input-keyword:     .string "INPUT"        , constants.NUL, TOK_INPUT
                                .const TOK_INT                          161
            _int-keyword:       .string "INT"          , constants.NUL, TOK_INT
                                .const TOK_IN                           162
            _in-keyword:        .string "IN"           , constants.NUL, TOK_IN
                                .const TOK_LEFT                         163
            _left-keyword:      .string "LEFT$"        , constants.NUL, TOK_LEFT
                                .const TOK_LEN                          164
            _len-keyword:       .string "LEN"          , constants.NUL, TOK_LEN
                                .const TOK_LET                          165
            _let-keyword:       .string "LET"          , constants.NUL, TOK_LET
                                .const TOK_LIST                         166
            _list-keyword:      .string "LIST"         , constants.NUL, TOK_LIST
                                .const TOK_LOAD                         167
            _load-keyword:      .string "LOAD"         , constants.NUL, TOK_LOAD
                                .const TOK_LOG                          168
            _log-keyword:       .string "LOG"          , constants.NUL, TOK_LOG
                                .const TOK_LOOP                         169
            _loop-keyword:      .string "LOOP"         , constants.NUL, TOK_LOOP
                                .const TOK_LOWER                        170
            _lower-keyword:     .string "LOWER$"       , constants.NUL, TOK_LOWER
                                .const TOK_MID                          171
            _mid-keyword:       .string "MID$"         , constants.NUL, TOK_MID
                                .const TOK_NEW                          172
            _new-keyword:       .string "NEW"          , constants.NUL, TOK_NEW
                                .const TOK_NEXT                         173
            _next-keyword:      .string "NEXT"         , constants.NUL, TOK_NEXT
                                .const TOK_NOT                          174
            _not-keyword:       .string "NOT"          , constants.NUL, TOK_NOT
                                .const TOK_ON                           175
            _on-keyword:        .string "ON"           , constants.NUL, TOK_ON
                                .const TOK_OPEN                         176
            _open-keyword:      .string "OPEN"         , constants.NUL, TOK_OPEN
                                .const TOK_OR                           177
            _or-keyword:        .string "OR"           , constants.NUL, TOK_OR
                                .const TOK_OUT                          178
            _out-keyword:       .string "OUT"          , constants.NUL, TOK_OUT
                                .const TOK_PEEK                         179
            _peek-keyword:      .string "PEEK"         , constants.NUL, TOK_PEEK
                                .const TOK_POKE                         180
            _poke-keyword:      .string "POKE"         , constants.NUL, TOK_POKE
                                .const TOK_PRINT                        181
            _print-keyword:     .string "PRINT"        , constants.NUL, TOK_PRINT
                                .string "?"            , constants.NUL, TOK_PRINT
                                .const TOK_READ                         182
            _read-keyword:      .string "READ"         , constants.NUL, TOK_READ
                                .const TOK_REM                          183
            _rem-keyword:       .string "REM"          , constants.NUL, TOK_REM
                                .string "'"            , constants.NUL, TOK_REM
                                .const TOK_RETURN                       184
            _return-keyword:    .string "RETURN"       , constants.NUL, TOK_RETURN
                                .const TOK_RIGHT                        185
            _right-keyword:     .string "RIGHT$"       , constants.NUL, TOK_RIGHT
                                .const TOK_RND                          186
            _rnd-keyword:       .string "RND"          , constants.NUL, TOK_RND
                                .const TOK_RENAME                       187
            _rename-keyword:    .string "RENAME"       , constants.NUL, TOK_RENAME
                                .const TOK_REMOVE                       188
            _remove-keyword:    .string "REMOVE"       , constants.NUL, TOK_REMOVE
                                .const TOK_RESTORE                      189
            _restore-keyword:   .string "RESTORE"      , constants.NUL, TOK_RESTORE
                                .const TOK_RUN                          190
            _run-keyword:       .string "RUN"          , constants.NUL, TOK_RUN
                                .const TOK_SAVE                         191
            _save-keyword:      .string "SAVE"         , constants.NUL, TOK_SAVE
                                .const TOK_SGN                          192
            _sgn-keyword:       .string "SGN"          , constants.NUL, TOK_SGN
                                .const TOK_SIN                          193
            _sin-keyword:       .string "SIN"          , constants.NUL, TOK_SIN
                                .const TOK_SPC                          194
            _spc-keyword:       .string "SPC"          , constants.NUL, TOK_SPC
                                .const TOK_SQR                          195
            _sqr-keyword:       .string "SQR"          , constants.NUL, TOK_SQR
                                .const TOK_STEP                         196
            _step-keyword:      .string "STEP"         , constants.NUL, TOK_STEP
                                .const TOK_STOP                         197
            _stop-keyword:      .string "STOP"         , constants.NUL, TOK_STOP
                                .const TOK_STR                          198
            _str-keyword:       .string "STR$"         , constants.NUL, TOK_STR
                                .const TOK_TAB                          199
            _tab-keyword:       .string "TAB"          , constants.NUL, TOK_TAB
                                .const TOK_TAN                          200
            _tan-keyword:       .string "TAN"          , constants.NUL, TOK_TAN
                                .const TOK_THEN                         201
            _then-keyword:      .string "THEN"         , constants.NUL, TOK_THEN
                                .const TOK_TO                           202
            _to-keyword:        .string "TO"           , constants.NUL, TOK_TO
                                .const TOK_UNTIL                        203
            _until-keyword:     .string "UNTIL"        , constants.NUL, TOK_UNTIL
                                .const TOK_UPPER                        204
            _upper-keyword:     .string "UPPER$"       , constants.NUL, TOK_UPPER
                                .const TOK_USR                          205
            _usr-keyword:       .string "USR"          , constants.NUL, TOK_USR
                                .const TOK_VAL                          206
            _val-keyword:       .string "VAL"          , constants.NUL, TOK_VAL
                                .const TOK_WHILE                        207
            _while-keyword:     .string "WHILE"        , constants.NUL, TOK_WHILE
                                .const TOK_ADD                          208
            _add-keyword:       .string "+"            , constants.NUL, TOK_ADD
                                .const TOK_SUB                          209
            _sub-keyword:       .string "-"            , constants.NUL, TOK_SUB
                                .const TOK_NEG                          210
            _neg-keyword:       .string "-"            , constants.NUL, TOK_NEG
                                .const TOK_MUL                          211
            _mul-keyword:       .string "*"            , constants.NUL, TOK_MUL
                                .const TOK_DIV                          212
            _div-keyword:       .string "/"            , constants.NUL, TOK_DIV
                                .const TOK_MOD                          213
            _mod-keyword:       .string "%"            , constants.NUL, TOK_MOD
                                .const TOK_POW                          214
            _pow-keyword:       .string "^"            , constants.NUL, TOK_POW
                                .const TOK_NEQ                          215
            _neq-keyword:       .string "<>"           , constants.NUL, TOK_NEQ
                                .string "!="           , constants.NUL, TOK_NEQ
                                .const TOK_LTE                          216
            _lte-keyword:       .string "<="           , constants.NUL, TOK_LTE
                                .string "=<"           , constants.NUL, TOK_LTE
                                .const TOK_GTE                          217
            _gte-keyword:       .string ">="           , constants.NUL, TOK_GTE
                                .string "=>"           , constants.NUL, TOK_GTE
                                .const TOK_LT                           218
            _lt-keyword:        .string "<"            , constants.NUL, TOK_LT
                                .const TOK_GT                           219
            _gt-keyword:        .string ">"            , constants.NUL, TOK_GT
                                .const TOK_EQU                          220
            _equ-keyword:       .string "="            , constants.NUL, TOK_EQU
                                .const TOK_LPAR                         221
            _lpar-keyword:      .string "("            , constants.NUL, TOK_LPAR
                                .const TOK_RPAR                         222
            _rpar-keyword:      .string ")"            , constants.NUL, TOK_RPAR
                                .const TOK_LBRACKET                     223
            _lbracket-keyword:  .string "["            , constants.NUL, TOK_LBRACKET
                                .const TOK_RBRACKET                     224
            _rbracket-keyword:  .string "]"            , constants.NUL, TOK_RBRACKET
                                .const TOK_COMMA                        225
            _comma-keyword:     .string ","            , constants.NUL, TOK_COMMA
                                .const TOK_SEMICOLON                    226
            _semicolon-keyword: .string ";"            , constants.NUL, TOK_SEMICOLON
                                .const TOK_END_OF_STMT                  227
            _end_of_stmt-keyword:.string ":"            , constants.NUL, TOK_END_OF_STMT
                                .const TOK_REAL                         249
                                .const TOK_VARIABLE                     250
                                .const TOK_CODE_STRING                  251
                                .const TOK_STRING                       252
                                .const TOK_DWORD                        253
                                .const TOK_WORD                         254
                                .const TOK_BYTE                         255

            _end-of-token-table: .byte constants.NUL

            token-vectors:
               .word _abs-keyword, 0b0000000000000001
               .word _and-keyword, 0b0000000000000100
               .word _asc-keyword, 0b0000000000000001
               .word _atn-keyword, 0b0000000000000001
               .word _at-keyword, 0b0000000000000010
               .word _call-keyword, 0b0000000000000010
               .word _catalog-keyword, 0b0000000000000010
               .word _chrs-keyword, 0b0000000000000001
               .word _chr-keyword, 0b0000000000000001
               .word _cls-keyword, 0b0000000000000010
               .word _close-keyword, 0b0000000000000010
               .word _continue-keyword, 0b0000000000000010
               .word _cos-keyword, 0b0000000000000001
               .word _data-keyword, 0b0000000000000010
               .word _deffn-keyword, 0b0100000000000010
               .word _defsub-keyword, 0b0100000000000010
               .word _dim-keyword, 0b0000000000000010
               .word _do-keyword, 0b0100000000000010
               .word _elseif-keyword, 0b1100000000000010
               .word _else-keyword, 0b1100000000000010
               .word _endsub-keyword, 0b1000000000000010
               .word _endfn-keyword, 0b1000000000000010
               .word _endif-keyword, 0b1000000000000010
               .word _end-keyword, 0b0000000000000010
               .word _exp-keyword, 0b0000000000000001
               .word _for-keyword, 0b0100000000000010
               .word _getkey-keyword, 0b0000000000000001
               .word _gosub-keyword, 0b0000000000000010
               .word _goto-keyword, 0b0000000000000010
               .word _hex-keyword, 0b0000000000000001
               .word _home-keyword, 0b0000000000000010
               .word _if-keyword, 0b0000000000000010
               .word _input-keyword, 0b0000000000000010
               .word _int-keyword, 0b0000000000000001
               .word _in-keyword, 0b0000000000000001
               .word _left-keyword, 0b0000000000000001
               .word _len-keyword, 0b0000000000000001
               .word _let-keyword, 0b0000000000000010
               .word _list-keyword, 0b0000000000000010
               .word _load-keyword, 0b0000000000000010
               .word _log-keyword, 0b0000000000000001
               .word _loop-keyword, 0b1000000000000010
               .word _lower-keyword, 0b0000000000000001
               .word _mid-keyword, 0b0000000000000001
               .word _new-keyword, 0b0000000000000010
               .word _next-keyword, 0b1000000000000010
               .word _not-keyword, 0b0000000000000100
               .word _on-keyword, 0b0000000000000010
               .word _open-keyword, 0b0000000000000010
               .word _or-keyword, 0b0000000000000100
               .word _out-keyword, 0b0000000000000010
               .word _peek-keyword, 0b0000000000000001
               .word _poke-keyword, 0b0000000000000010
               .word _print-keyword, 0b0000000000000010
               .word _read-keyword, 0b0000000000000010
               .word _rem-keyword, 0b0000000000000010
               .word _return-keyword, 0b0000000000000010
               .word _right-keyword, 0b0000000000000001
               .word _rnd-keyword, 0b0000000000000001
               .word _rename-keyword, 0b0000000000000010
               .word _remove-keyword, 0b0000000000000010
               .word _restore-keyword, 0b0000000000000010
               .word _run-keyword, 0b0000000000000010
               .word _save-keyword, 0b0000000000000010
               .word _sgn-keyword, 0b0000000000000001
               .word _sin-keyword, 0b0000000000000001
               .word _spc-keyword, 0b0000000000000001
               .word _sqr-keyword, 0b0000000000000001
               .word _step-keyword, 0b0000000000000010
               .word _stop-keyword, 0b0000000000000010
               .word _str-keyword, 0b0000000000000001
               .word _tab-keyword, 0b0000000000000001
               .word _tan-keyword, 0b0000000000000001
               .word _then-keyword, 0b0110000000000010
               .word _to-keyword, 0b0000000000000010
               .word _until-keyword, 0b1000000000000010
               .word _upper-keyword, 0b0000000000000001
               .word _usr-keyword, 0b0000000000000001
               .word _val-keyword, 0b0000000000000001
               .word _while-keyword, 0b1000000000000001
               .word _add-keyword, 0b0000000000000100
               .word _sub-keyword, 0b0000000000000100
               .word _neg-keyword, 0b0000000000000100
               .word _mul-keyword, 0b0000000000000100
               .word _div-keyword, 0b0000000000000100
               .word _mod-keyword, 0b0000000000000100
               .word _pow-keyword, 0b0000000000000100
               .word _neq-keyword, 0b0000000000000100
               .word _lte-keyword, 0b0000000000000100
               .word _gte-keyword, 0b0000000000000100
               .word _lt-keyword, 0b0000000000000100
               .word _gt-keyword, 0b0000000000000100
               .word _equ-keyword, 0b0000000000000100
               .word _lpar-keyword, 0b0000000000001000
               .word _rpar-keyword, 0b0000000000001000
               .word _lbracket-keyword, 0b0000000000001000
               .word _rbracket-keyword, 0b0000000000001000
               .word _comma-keyword, 0b0000000000001000
               .word _semicolon-keyword, 0b0000000000001000
               .word _end_of_stmt-keyword, 0b0000000000001000

}
