.segment brodata kmemmap.basic.rodata-start .append {
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
# KEYWORD\0: A constants.NUL-Terminated keyword
# TOKEN MAP: A byte indicating the token mapping
#
# Given a token, one can look up the full version using the associated vectors
# (subtract 128 first).
#
###############################################################################
        keywords:
                                 .const TOK_ABS                             128
            _abs-keyword:        .string "ABS"             , constants.NUL, TOK_ABS
                                 .const TOK_AND                             129
            _and-keyword:        .string "AND"             , constants.NUL, TOK_AND
                                 .const TOK_ASC                             130
            _asc-keyword:        .string "ASC"             , constants.NUL, TOK_ASC
                                 .const TOK_ATN                             131
            _atn-keyword:        .string "ATN"             , constants.NUL, TOK_ATN
                                 .const TOK_AT                              132
            _at-keyword:         .string "AT"              , constants.NUL, TOK_AT
                                 .const TOK_CALL                            133
            _call-keyword:       .string "CALL"            , constants.NUL, TOK_CALL
                                 .const TOK_CATALOG                         134
            _catalog-keyword:    .string "CATALOG"         , constants.NUL, TOK_CATALOG
                                 .const TOK_CHR                             135
            _chr-keyword:        .string "CHR$"            , constants.NUL, TOK_CHR
                                 .const TOK_CLS                             136
            _cls-keyword:        .string "CLS"             , constants.NUL, TOK_CLS
                                 .const TOK_CLOSE                           137
            _close-keyword:      .string "CLOSE"           , constants.NUL, TOK_CLOSE
                                 .const TOK_CONTINUE                        138
            _continue-keyword:   .string "CONTINUE"        , constants.NUL, TOK_CONTINUE
                                 .const TOK_COS                             139
            _cos-keyword:        .string "COS"             , constants.NUL, TOK_COS
                                 .const TOK_DATA                            140
            _data-keyword:       .string "DATA"            , constants.NUL, TOK_DATA
                                 .const TOK_DEFFN                           141
            _deffn-keyword:      .string "DEFFN"           , constants.NUL, TOK_DEFFN
                                 .const TOK_DEFSUB                          142
            _defsub-keyword:     .string "DEFSUB"          , constants.NUL, TOK_DEFSUB
                                 .const TOK_DIM                             143
            _dim-keyword:        .string "DIM"             , constants.NUL, TOK_DIM
                                 .const TOK_DO                              144
            _do-keyword:         .string "DO"              , constants.NUL, TOK_DO
                                 .const TOK_ELSEIF                          145
            _elseif-keyword:     .string "ELSEIF"          , constants.NUL, TOK_ELSEIF
                                 .const TOK_ELSE                            146
            _else-keyword:       .string "ELSE"            , constants.NUL, TOK_ELSE
                                 .const TOK_ENDSUB                          147
            _endsub-keyword:     .string "ENDSUB"          , constants.NUL, TOK_ENDSUB
                                 .const TOK_ENDFN                           148
            _endfn-keyword:      .string "ENDFN"           , constants.NUL, TOK_ENDFN
                                 .const TOK_ENDIF                           149
            _endif-keyword:      .string "ENDIF"           , constants.NUL, TOK_ENDIF
                                 .const TOK_END                             150
            _end-keyword:        .string "END"             , constants.NUL, TOK_END
                                 .const TOK_EXP                             151
            _exp-keyword:        .string "EXP"             , constants.NUL, TOK_EXP
                                 .const TOK_FOR                             152
            _for-keyword:        .string "FOR"             , constants.NUL, TOK_FOR
                                 .const TOK_GETKEY                          153
            _getkey-keyword:     .string "GETKEY$"         , constants.NUL, TOK_GETKEY
                                 .const TOK_GOSUB                           154
            _gosub-keyword:      .string "GOSUB"           , constants.NUL, TOK_GOSUB
                                 .const TOK_GOTO                            155
            _goto-keyword:       .string "GOTO"            , constants.NUL, TOK_GOTO
                                 .const TOK_HEX                             156
            _hex-keyword:        .string "HEX$"            , constants.NUL, TOK_HEX
                                 .const TOK_HOME                            157
            _home-keyword:       .string "HOME"            , constants.NUL, TOK_HOME
                                 .const TOK_IF                              158
            _if-keyword:         .string "IF"              , constants.NUL, TOK_IF
                                 .const TOK_INPUT                           159
            _input-keyword:      .string "INPUT"           , constants.NUL, TOK_INPUT
                                 .const TOK_INT                             160
            _int-keyword:        .string "INT"             , constants.NUL, TOK_INT
                                 .const TOK_IN                              161
            _in-keyword:         .string "IN"              , constants.NUL, TOK_IN
                                 .const TOK_LEFT                            162
            _left-keyword:       .string "LEFT$"           , constants.NUL, TOK_LEFT
                                 .const TOK_LEN                             163
            _len-keyword:        .string "LEN"             , constants.NUL, TOK_LEN
                                 .const TOK_LET                             223
            _let-keyword:        .string "LET"             , constants.NUL, TOK_LET
                                 .const TOK_LIST                            164
            _list-keyword:       .string "LIST"            , constants.NUL, TOK_LIST
                                 .const TOK_LOAD                            165
            _load-keyword:       .string "LOAD"            , constants.NUL, TOK_LOAD
                                 .const TOK_LOG                             166
            _log-keyword:        .string "LOG"             , constants.NUL, TOK_LOG
                                 .const TOK_LOOP                            167
            _loop-keyword:       .string "LOOP"            , constants.NUL, TOK_LOOP
                                 .const TOK_LOWER                           221
            _lower-keyword:      .string "LOWER$"           , constants.NUL, TOK_LOWER
                                 .const TOK_MID                             168
            _mid-keyword:        .string "MID$"            , constants.NUL, TOK_MID
                                 .const TOK_NEW                             169
            _new-keyword:        .string "NEW"             , constants.NUL, TOK_NEW
                                 .const TOK_NEXT                            170
            _next-keyword:       .string "NEXT"            , constants.NUL, TOK_NEXT
                                 .const TOK_NOT                             171
            _not-keyword:        .string "NOT"             , constants.NUL, TOK_NOT
                                 .const TOK_ON                              172
            _on-keyword:         .string "ON"              , constants.NUL, TOK_ON
                                 .const TOK_OPEN                            173
            _open-keyword:       .string "OPEN"            , constants.NUL, TOK_OPEN
                                 .const TOK_OR                              174
            _or-keyword:         .string "OR"              , constants.NUL, TOK_OR
                                 .const TOK_OUT                             175
            _out-keyword:        .string "OUT"             , constants.NUL, TOK_OUT
                                 .const TOK_PEEK                            176
            _peek-keyword:       .string "PEEK"            , constants.NUL, TOK_PEEK
                                 .const TOK_POKE                            177
            _poke-keyword:       .string "POKE"            , constants.NUL, TOK_POKE
                                 .const TOK_PRINT                           178
            _print-keyword:      .string "PRINT"           , constants.NUL, TOK_PRINT
                                 .string "?"               , constants.NUL, TOK_PRINT
                                 .const TOK_READ                            179
            _read-keyword:       .string "READ"            , constants.NUL, TOK_READ
                                 .const TOK_REM                             180
            _rem-keyword:        .string "REM"             , constants.NUL, TOK_REM
                                 .string "'"               , constants.NUL, TOK_REM
                                 .const TOK_RETURN                          181
            _return-keyword:     .string "RETURN"          , constants.NUL, TOK_RETURN
                                 .const TOK_RIGHT                           182
            _right-keyword:      .string "RIGHT$"          , constants.NUL, TOK_RIGHT
                                 .const TOK_RND                             183
            _rnd-keyword:        .string "RND"             , constants.NUL, TOK_RND
                                 .const TOK_RENAME                          184
            _rename-keyword:     .string "RENAME"          , constants.NUL, TOK_RENAME
                                 .const TOK_REMOVE                          185
            _remove-keyword:     .string "REMOVE"          , constants.NUL, TOK_REMOVE
                                 .const TOK_RESTORE                         186
            _restore-keyword:    .string "RESTORE"         , constants.NUL, TOK_RESTORE
                                 .const TOK_RUN                             187
            _run-keyword:        .string "RUN"             , constants.NUL, TOK_RUN
                                 .const TOK_SAVE                            188
            _save-keyword:       .string "SAVE"            , constants.NUL, TOK_SAVE
                                 .const TOK_SGN                             189
            _sgn-keyword:        .string "SGN"             , constants.NUL, TOK_SGN
                                 .const TOK_SIN                             190
            _sin-keyword:        .string "SIN"             , constants.NUL, TOK_SIN
                                 .const TOK_SPC                             191
            _spc-keyword:        .string "SPC"             , constants.NUL, TOK_SPC
                                 .const TOK_SQR                             192
            _sqr-keyword:        .string "SQR"             , constants.NUL, TOK_SQR
                                 .const TOK_STEP                            193
            _step-keyword:       .string "STEP"            , constants.NUL, TOK_STEP
                                 .const TOK_STOP                            194
            _stop-keyword:       .string "STOP"            , constants.NUL, TOK_STOP
                                 .const TOK_STR                             195
            _str-keyword:        .string "STR$"            , constants.NUL, TOK_STR
                                 .const TOK_TAB                             196
            _tab-keyword:        .string "TAB"             , constants.NUL, TOK_TAB
                                 .const TOK_TAN                             197
            _tan-keyword:        .string "TAN"             , constants.NUL, TOK_TAN
                                 .const TOK_THEN                            198
            _then-keyword:       .string "THEN"            , constants.NUL, TOK_THEN
                                 .const TOK_TO                              199
            _to-keyword:         .string "TO"              , constants.NUL, TOK_TO
                                 .const TOK_UNTIL                           200
            _until-keyword:      .string "UNTIL"           , constants.NUL, TOK_UNTIL
                                 .const TOK_UPPER                           222
            _upper-keyword:      .string "UPPER$"           , constants.NUL, TOK_UPPER
                                 .const TOK_USR                             201
            _usr-keyword:        .string "USR"             , constants.NUL, TOK_USR
                                 .const TOK_VAL                             202
            _val-keyword:        .string "VAL"             , constants.NUL, TOK_VAL
                                 .const TOK_WHILE                           203
            _while-keyword:      .string "WHILE"           , constants.NUL, TOK_WHILE
                                 .const TOK_ADD                             204
            _add-operator:       .string "+"               , constants.NUL, TOK_ADD
                                 .const TOK_SUB                             205
            _sub-operator:       .string "-"               , constants.NUL, TOK_SUB
                                 .const TOK_MUL                             206
            _mul-operator:       .string "*"               , constants.NUL, TOK_MUL
                                 .const TOK_DIV                             207
            _div-operator:       .string "/"               , constants.NUL, TOK_DIV
                                 .const TOK_MOD                             208
            _mod-operator:       .string "%"               , constants.NUL, TOK_MOD
                                 .const TOK_POW                             209
            _pow-operator:       .string "^"               , constants.NUL, TOK_POW
                                 .const TOK_NEQ                             210
            _neq-operator:       .string "<>"              , constants.NUL, TOK_NEQ
                                 .const TOK_LTE                             211
            _lte-operator:       .string "<="              , constants.NUL, TOK_LTE
                                 .string "=<"              , constants.NUL, TOK_LTE
                                 .const TOK_GTE                             212
            _gte-operator:       .string ">="              , constants.NUL, TOK_GTE
                                 .string "=>"              , constants.NUL, TOK_GTE
                                 .const TOK_LT                              213
            _lt-operator:        .string "<"               , constants.NUL, TOK_LT
                                 .const TOK_GT                              214
            _gt-operator:        .string ">"               , constants.NUL, TOK_GT
                                 .const TOK_EQU                             215
            _equ-operator:       .string "="               , constants.NUL, TOK_EQU
                                 .const TOK_LPAR                            216
            _lpar-token:         .string "("               , constants.NUL, TOK_LPAR
                                 .const TOK_RPAR                            217
            _rpar-token:         .string ")"               , constants.NUL, TOK_RPAR
                                 .const TOK_LBRACKET                        218
            _lbracket-token:     .string "["               , constants.NUL, TOK_LBRACKET
                                 .const TOK_RBRACKET                        219
            _rbracket-token:     .string "]"               , constants.NUL, TOK_RBRACKET
                                 .const TOK_COMMA                           224
            _comma:              .string ","               , constants.NUL, TOK_COMMA
                                 .const TOK_SEMICOLON                       225
            _semicolon:          .string ";"               , constants.NUL, TOK_SEMICOLON
                                 .const TOK_END_OF_STMT                     220
            _end-of-stmt:        .string ":"               , constants.NUL, TOK_END_OF_STMT
            _end-of-token-table: .byte constants.NUL
                                 .const TOK_BYTE                            255
                                 .const TOK_WORD                            254
                                 .const TOK_DWORD                           253
                                 .const TOK_STRING                          252
                                 .const TOK_CODE_STRING                     251
                                 .const TOK_VARIABLE                        250
                                 .const TOK_REAL                            249
                                 .const MAX_TOKEN                           225
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
                .word _lbracket-token, _rbracket-token, _end-of-stmt, _lower-keyword, _upper-keyword, _let-keyword
                .word _comma, _semicolon
}