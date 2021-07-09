
.segment brodata kmemmap.basic.rodata-start .append {

        keywords:
                                .const TOK_ABS                          128
            _abs-keyword:       .string "ABS"          , constants.NUL, TOK_ABS
                                .const TOK_AND                          129
            _and-keyword:       .string "AND"          , constants.NUL, TOK_AND
                                .const TOK_ASC                          130
            _asc-keyword:       .string "ASC"          , constants.NUL, TOK_ASC
                                .const TOK_ASM                          131
            _asm-keyword:       .string "ASM"          , constants.NUL, TOK_ASM
                                .const TOK_ATN                          132
            _atn-keyword:       .string "ATN"          , constants.NUL, TOK_ATN
                                .const TOK_AT                           133
            _at-keyword:        .string "AT"           , constants.NUL, TOK_AT
                                .const TOK_CALL                         134
            _call-keyword:      .string "CALL"         , constants.NUL, TOK_CALL
                                .const TOK_CATALOG                      135
            _catalog-keyword:   .string "CATALOG"      , constants.NUL, TOK_CATALOG
                                .const TOK_CHRS                         136
            _chrs-keyword:      .string "CHRS$"        , constants.NUL, TOK_CHRS
                                .const TOK_CHR                          137
            _chr-keyword:       .string "CHR$"         , constants.NUL, TOK_CHR
                                .const TOK_CIRCLE                       138
            _circle-keyword:    .string "CIRCLE"       , constants.NUL, TOK_CIRCLE
                                .const TOK_CLS                          139
            _cls-keyword:       .string "CLS"          , constants.NUL, TOK_CLS
                                .const TOK_CLOSE                        140
            _close-keyword:     .string "CLOSE"        , constants.NUL, TOK_CLOSE
                                .const TOK_CONTINUE                     141
            _continue-keyword:  .string "CONTINUE"     , constants.NUL, TOK_CONTINUE
                                .string "CONT"         , constants.NUL, TOK_CONTINUE
                                .const TOK_COLOR                        142
            _color-keyword:     .string "COLOR"        , constants.NUL, TOK_COLOR
                                .const TOK_COPY                         143
            _copy-keyword:      .string "COPY"         , constants.NUL, TOK_COPY
                                .const TOK_COS                          144
            _cos-keyword:       .string "COS"          , constants.NUL, TOK_COS
                                .const TOK_DATA                         145
            _data-keyword:      .string "DATA"         , constants.NUL, TOK_DATA
                                .const TOK_DEF                          146
            _def-keyword:       .string "DEF"          , constants.NUL, TOK_DEF
                                .const TOK_DIM                          147
            _dim-keyword:       .string "DIM"          , constants.NUL, TOK_DIM
                                .const TOK_DO                           148
            _do-keyword:        .string "DO"           , constants.NUL, TOK_DO
                                .const TOK_DRAW                         149
            _draw-keyword:      .string "DRAW"         , constants.NUL, TOK_DRAW
                                .const TOK_ELSE                         150
            _else-keyword:      .string "ELSE"         , constants.NUL, TOK_ELSE
                                .const TOK_END                          151
            _end-keyword:       .string "END"          , constants.NUL, TOK_END
                                .const TOK_EXP                          152
            _exp-keyword:       .string "EXP"          , constants.NUL, TOK_EXP
                                .const TOK_FILL                         153
            _fill-keyword:      .string "FILL"         , constants.NUL, TOK_FILL
                                .const TOK_FN                           154
            _fn-keyword:        .string "FN"           , constants.NUL, TOK_FN
                                .const TOK_FOR                          155
            _for-keyword:       .string "FOR"          , constants.NUL, TOK_FOR
                                .const TOK_FROM                         156
            _from-keyword:      .string "FROM"         , constants.NUL, TOK_FROM
                                .const TOK_GOSUB                        157
            _gosub-keyword:     .string "GOSUB"        , constants.NUL, TOK_GOSUB
                                .const TOK_GOTO                         158
            _goto-keyword:      .string "GOTO"         , constants.NUL, TOK_GOTO
                                .const TOK_HEX                          159
            _hex-keyword:       .string "HEX$"         , constants.NUL, TOK_HEX
                                .const TOK_IF                           160
            _if-keyword:        .string "IF"           , constants.NUL, TOK_IF
                                .const TOK_INPUT                        161
            _input-keyword:     .string "INPUT"        , constants.NUL, TOK_INPUT
                                .const TOK_INT                          162
            _int-keyword:       .string "INT"          , constants.NUL, TOK_INT
                                .const TOK_IN                           163
            _in-keyword:        .string "IN"           , constants.NUL, TOK_IN
                                .const TOK_KEY                          164
            _key-keyword:       .string "KEY$"         , constants.NUL, TOK_KEY
                                .const TOK_LAYER                        165
            _layer-keyword:     .string "LAYER"        , constants.NUL, TOK_LAYER
                                .const TOK_LEFT                         166
            _left-keyword:      .string "LEFT$"        , constants.NUL, TOK_LEFT
                                .const TOK_LEN                          167
            _len-keyword:       .string "LEN"          , constants.NUL, TOK_LEN
                                .const TOK_LET                          168
            _let-keyword:       .string "LET"          , constants.NUL, TOK_LET
                                .const TOK_LINE                         169
            _line-keyword:      .string "LINE"         , constants.NUL, TOK_LINE
                                .const TOK_LIST                         170
            _list-keyword:      .string "LIST"         , constants.NUL, TOK_LIST
                                .const TOK_LOAD                         171
            _load-keyword:      .string "LOAD"         , constants.NUL, TOK_LOAD
                                .const TOK_LOCAL                        172
            _local-keyword:     .string "LOCAL"        , constants.NUL, TOK_LOCAL
                                .const TOK_LOG                          173
            _log-keyword:       .string "LOG"          , constants.NUL, TOK_LOG
                                .const TOK_LOOP                         174
            _loop-keyword:      .string "LOOP"         , constants.NUL, TOK_LOOP
                                .const TOK_LOWER                        175
            _lower-keyword:     .string "LOWER$"       , constants.NUL, TOK_LOWER
                                .const TOK_MEM                          176
            _mem-keyword:       .string "MEM"          , constants.NUL, TOK_MEM
                                .const TOK_MID                          177
            _mid-keyword:       .string "MID$"         , constants.NUL, TOK_MID
                                .const TOK_MODE                         178
            _mode-keyword:      .string "MODE"         , constants.NUL, TOK_MODE
                                .const TOK_MOUSE                        179
            _mouse-keyword:     .string "MOUSE"        , constants.NUL, TOK_MOUSE
                                .const TOK_NEW                          180
            _new-keyword:       .string "NEW"          , constants.NUL, TOK_NEW
                                .const TOK_NEXT                         181
            _next-keyword:      .string "NEXT"         , constants.NUL, TOK_NEXT
                                .const TOK_NOT                          182
            _not-keyword:       .string "NOT"          , constants.NUL, TOK_NOT
                                .const TOK_OFF                          183
            _off-keyword:       .string "OFF"          , constants.NUL, TOK_OFF
                                .const TOK_ON                           184
            _on-keyword:        .string "ON"           , constants.NUL, TOK_ON
                                .const TOK_OPEN                         185
            _open-keyword:      .string "OPEN"         , constants.NUL, TOK_OPEN
                                .const TOK_OR                           186
            _or-keyword:        .string "OR"           , constants.NUL, TOK_OR
                                .const TOK_OUT                          187
            _out-keyword:       .string "OUT"          , constants.NUL, TOK_OUT
                                .const TOK_PEEK                         188
            _peek-keyword:      .string "PEEK"         , constants.NUL, TOK_PEEK
                                .const TOK_PLAY                         189
            _play-keyword:      .string "PLAY"         , constants.NUL, TOK_PLAY
                                .const TOK_POINT                        190
            _point-keyword:     .string "POINT"        , constants.NUL, TOK_POINT
                                .const TOK_POKE                         191
            _poke-keyword:      .string "POKE"         , constants.NUL, TOK_POKE
                                .const TOK_PRINT                        192
            _print-keyword:     .string "PRINT"        , constants.NUL, TOK_PRINT
                                .string "?"            , constants.NUL, TOK_PRINT
                                .const TOK_READ                         193
            _read-keyword:      .string "READ"         , constants.NUL, TOK_READ
                                .const TOK_RECT                         194
            _rect-keyword:      .string "RECT"         , constants.NUL, TOK_RECT
                                .const TOK_REM                          195
            _rem-keyword:       .string "REM"          , constants.NUL, TOK_REM
                                .string "'"            , constants.NUL, TOK_REM
                                .const TOK_RETURN                       196
            _return-keyword:    .string "RETURN"       , constants.NUL, TOK_RETURN
                                .const TOK_RIGHT                        197
            _right-keyword:     .string "RIGHT$"       , constants.NUL, TOK_RIGHT
                                .const TOK_RND                          198
            _rnd-keyword:       .string "RND"          , constants.NUL, TOK_RND
                                .const TOK_RENAME                       199
            _rename-keyword:    .string "RENAME"       , constants.NUL, TOK_RENAME
                                .const TOK_REMOVE                       200
            _remove-keyword:    .string "REMOVE"       , constants.NUL, TOK_REMOVE
                                .const TOK_RESTORE                      201
            _restore-keyword:   .string "RESTORE"      , constants.NUL, TOK_RESTORE
                                .const TOK_RUN                          202
            _run-keyword:       .string "RUN"          , constants.NUL, TOK_RUN
                                .const TOK_SAVE                         203
            _save-keyword:      .string "SAVE"         , constants.NUL, TOK_SAVE
                                .const TOK_SCREEN                       204
            _screen-keyword:    .string "SCREEN"       , constants.NUL, TOK_SCREEN
                                .const TOK_SGN                          205
            _sgn-keyword:       .string "SGN"          , constants.NUL, TOK_SGN
                                .const TOK_SIN                          206
            _sin-keyword:       .string "SIN"          , constants.NUL, TOK_SIN
                                .const TOK_SIZE                         207
            _size-keyword:      .string "SIZE"         , constants.NUL, TOK_SIZE
                                .const TOK_SOURCE                       208
            _source-keyword:    .string "SOURCE"       , constants.NUL, TOK_SOURCE
                                .const TOK_SPC                          209
            _spc-keyword:       .string "SPC"          , constants.NUL, TOK_SPC
                                .const TOK_SPRATTR                      210
            _sprattr-keyword:   .string "SPRATTR"      , constants.NUL, TOK_SPRATTR
                                .const TOK_SPRITE                       211
            _sprite-keyword:    .string "SPRITE"       , constants.NUL, TOK_SPRITE
                                .const TOK_SQR                          212
            _sqr-keyword:       .string "SQR"          , constants.NUL, TOK_SQR
                                .const TOK_STATUS                       213
            _status-keyword:    .string "STATUS"       , constants.NUL, TOK_STATUS
                                .const TOK_STEP                         214
            _step-keyword:      .string "STEP"         , constants.NUL, TOK_STEP
                                .const TOK_STICK                        215
            _stick-keyword:     .string "STICK"        , constants.NUL, TOK_STICK
                                .const TOK_STOP                         216
            _stop-keyword:      .string "STOP"         , constants.NUL, TOK_STOP
                                .const TOK_STR                          217
            _str-keyword:       .string "STR$"         , constants.NUL, TOK_STR
                                .const TOK_SUBROUTINE                   218
            _subroutine-keyword:.string "SUB"          , constants.NUL, TOK_SUBROUTINE
                                .const TOK_SWAP                         219
            _swap-keyword:      .string "SWAP"         , constants.NUL, TOK_SWAP
                                .const TOK_TAB                          220
            _tab-keyword:       .string "TAB"          , constants.NUL, TOK_TAB
                                .const TOK_TAN                          221
            _tan-keyword:       .string "TAN"          , constants.NUL, TOK_TAN
                                .const TOK_THEN                         222
            _then-keyword:      .string "THEN"         , constants.NUL, TOK_THEN
                                .const TOK_TILESET                      223
            _tileset-keyword:   .string "TILESET"      , constants.NUL, TOK_TILESET
                                .const TOK_TIME                         224
            _time-keyword:      .string "TIME"         , constants.NUL, TOK_TIME
                                .const TOK_TO                           225
            _to-keyword:        .string "TO"           , constants.NUL, TOK_TO
                                .const TOK_UNTIL                        226
            _until-keyword:     .string "UNTIL"        , constants.NUL, TOK_UNTIL
                                .const TOK_UPPER                        227
            _upper-keyword:     .string "UPPER$"       , constants.NUL, TOK_UPPER
                                .const TOK_USR                          228
            _usr-keyword:       .string "USR"          , constants.NUL, TOK_USR
                                .const TOK_VAL                          229
            _val-keyword:       .string "VAL"          , constants.NUL, TOK_VAL
                                .const TOK_WHILE                        230
            _while-keyword:     .string "WHILE"        , constants.NUL, TOK_WHILE
                                .const TOK_ADD                          231
            _add-keyword:       .string "+"            , constants.NUL, TOK_ADD
                                .const TOK_SUB                          232
            _sub-keyword:       .string "-"            , constants.NUL, TOK_SUB
                                .const TOK_NEG                          233
            _neg-keyword:       .string "-"            , constants.NUL, TOK_NEG
                                .const TOK_MUL                          234
            _mul-keyword:       .string "*"            , constants.NUL, TOK_MUL
                                .const TOK_DIV                          235
            _div-keyword:       .string "/"            , constants.NUL, TOK_DIV
                                .const TOK_MOD                          236
            _mod-keyword:       .string "%"            , constants.NUL, TOK_MOD
                                .const TOK_POW                          237
            _pow-keyword:       .string "^"            , constants.NUL, TOK_POW
                                .const TOK_NEQ                          238
            _neq-keyword:       .string "<>"           , constants.NUL, TOK_NEQ
                                .string "!="           , constants.NUL, TOK_NEQ
                                .const TOK_LTE                          239
            _lte-keyword:       .string "<="           , constants.NUL, TOK_LTE
                                .string "=<"           , constants.NUL, TOK_LTE
                                .const TOK_GTE                          240
            _gte-keyword:       .string ">="           , constants.NUL, TOK_GTE
                                .string "=>"           , constants.NUL, TOK_GTE
                                .const TOK_LT                           241
            _lt-keyword:        .string "<"            , constants.NUL, TOK_LT
                                .const TOK_GT                           242
            _gt-keyword:        .string ">"            , constants.NUL, TOK_GT
                                .const TOK_EQU                          243
            _equ-keyword:       .string "="            , constants.NUL, TOK_EQU
                                .const TOK_LPAR                         244
            _lpar-keyword:      .string "("            , constants.NUL, TOK_LPAR
                                .const TOK_RPAR                         245
            _rpar-keyword:      .string ")"            , constants.NUL, TOK_RPAR
                                .const TOK_COMMA                        246
            _comma-keyword:     .string ","            , constants.NUL, TOK_COMMA
                                .const TOK_SEMICOLON                    247
            _semicolon-keyword: .string ";"            , constants.NUL, TOK_SEMICOLON
                                .const TOK_END_OF_STMT                  248
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
               .word _asm-keyword, 0b0000000000000010
               .word _atn-keyword, 0b0000000000000001
               .word _at-keyword, 0b0000000000000010
               .word _call-keyword, 0b0000000000000010
               .word _catalog-keyword, 0b0000000000000010
               .word _chrs-keyword, 0b0000000000000001
               .word _chr-keyword, 0b0000000000000001
               .word _circle-keyword, 0b0000000000000010
               .word _cls-keyword, 0b0000000000000010
               .word _close-keyword, 0b0000000000000010
               .word _continue-keyword, 0b0000000000000010
               .word _color-keyword, 0b0000000000000010
               .word _copy-keyword, 0b0000000000000010
               .word _cos-keyword, 0b0000000000000001
               .word _data-keyword, 0b0000000000000010
               .word _def-keyword, 0b0100000000000010
               .word _dim-keyword, 0b0000000000000010
               .word _do-keyword, 0b0100000000000010
               .word _draw-keyword, 0b0000000000000010
               .word _else-keyword, 0b1100000000000010
               .word _end-keyword, 0b1000000000000010
               .word _exp-keyword, 0b0000000000000001
               .word _fill-keyword, 0b0000000000000010
               .word _fn-keyword, 0b0000000000000010
               .word _for-keyword, 0b0100000000000010
               .word _from-keyword, 0b0000000000000010
               .word _gosub-keyword, 0b0000000000000010
               .word _goto-keyword, 0b0000000000000010
               .word _hex-keyword, 0b0000000000000001
               .word _if-keyword, 0b0000000000000010
               .word _input-keyword, 0b0000000000000010
               .word _int-keyword, 0b0000000000000001
               .word _in-keyword, 0b0000000000000001
               .word _key-keyword, 0b0000000000000001
               .word _layer-keyword, 0b0000000000000010
               .word _left-keyword, 0b0000000000000001
               .word _len-keyword, 0b0000000000000001
               .word _let-keyword, 0b0000000000000010
               .word _line-keyword, 0b0000000000000010
               .word _list-keyword, 0b0000000000000010
               .word _load-keyword, 0b0000000000000010
               .word _local-keyword, 0b0000000000000010
               .word _log-keyword, 0b0000000000000001
               .word _loop-keyword, 0b1000000000000010
               .word _lower-keyword, 0b0000000000000001
               .word _mem-keyword, 0b0000000000000010
               .word _mid-keyword, 0b0000000000000001
               .word _mode-keyword, 0b0000000000000010
               .word _mouse-keyword, 0b0000000000000001
               .word _new-keyword, 0b0000000000000010
               .word _next-keyword, 0b1000000000000010
               .word _not-keyword, 0b0000000000000100
               .word _off-keyword, 0b0000000000000010
               .word _on-keyword, 0b0000000000000010
               .word _open-keyword, 0b0000000000000010
               .word _or-keyword, 0b0000000000000100
               .word _out-keyword, 0b0000000000000010
               .word _peek-keyword, 0b0000000000000001
               .word _play-keyword, 0b0000000000000010
               .word _point-keyword, 0b0000000000000010
               .word _poke-keyword, 0b0000000000000010
               .word _print-keyword, 0b0000000000000010
               .word _read-keyword, 0b0000000000000010
               .word _rect-keyword, 0b0000000000000010
               .word _rem-keyword, 0b0000000000000010
               .word _return-keyword, 0b0000000000000010
               .word _right-keyword, 0b0000000000000001
               .word _rnd-keyword, 0b0000000000000001
               .word _rename-keyword, 0b0000000000000010
               .word _remove-keyword, 0b0000000000000010
               .word _restore-keyword, 0b0000000000000010
               .word _run-keyword, 0b0000000000000010
               .word _save-keyword, 0b0000000000000010
               .word _screen-keyword, 0b0000000000000010
               .word _sgn-keyword, 0b0000000000000001
               .word _sin-keyword, 0b0000000000000001
               .word _size-keyword, 0b0000000000000010
               .word _source-keyword, 0b0000000000000010
               .word _spc-keyword, 0b0000000000000001
               .word _sprattr-keyword, 0b0000000000000001
               .word _sprite-keyword, 0b0000000000000010
               .word _sqr-keyword, 0b0000000000000001
               .word _status-keyword, 0b0000000000000001
               .word _step-keyword, 0b0000000000000010
               .word _stick-keyword, 0b0000000000000001
               .word _stop-keyword, 0b0000000000000010
               .word _str-keyword, 0b0000000000000001
               .word _subroutine-keyword, 0b0000000000000010
               .word _swap-keyword, 0b0000000000000010
               .word _tab-keyword, 0b0000000000000001
               .word _tan-keyword, 0b0000000000000001
               .word _then-keyword, 0b0110000000000010
               .word _tileset-keyword, 0b0000000000000010
               .word _time-keyword, 0b0000000000000001
               .word _to-keyword, 0b0000000000000010
               .word _until-keyword, 0b0000000000000010
               .word _upper-keyword, 0b0000000000000001
               .word _usr-keyword, 0b0000000000000001
               .word _val-keyword, 0b0000000000000001
               .word _while-keyword, 0b0000000000000010
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
               .word _comma-keyword, 0b0000000000001000
               .word _semicolon-keyword, 0b0000000000001000
               .word _end_of_stmt-keyword, 0b0000000000001000

            token-sections:

                .word _abs-keyword, 6     # A
                .word 0x0000, 0     # B
                .word _call-keyword, 11     # C
                .word _data-keyword, 5     # D
                .word _else-keyword, 3     # E
                .word _fill-keyword, 4     # F
                .word _gosub-keyword, 2     # G
                .word _hex-keyword, 1     # H
                .word _if-keyword, 4     # I
                .word 0x0000, 0     # J
                .word _key-keyword, 1     # K
                .word _layer-keyword, 11     # L
                .word _mem-keyword, 4     # M
                .word _new-keyword, 3     # N
                .word _off-keyword, 5     # O
                .word _peek-keyword, 5     # P
                .word 0x0000, 0     # Q
                .word _read-keyword, 10     # R
                .word _save-keyword, 17     # S
                .word _tab-keyword, 6     # T
                .word _until-keyword, 3     # U
                .word _val-keyword, 1     # V
                .word _while-keyword, 1     # W
                .word 0x0000, 0     # X
                .word 0x0000, 0     # Y
                .word 0x0000, 0     # Z
                .word _add-keyword, 18     # op
}
