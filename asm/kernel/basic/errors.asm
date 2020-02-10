.segment brodata kmemmap.basic.rodata-start .append {

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
                                    .const SYNTAX_ERROR                      01
        syntax-err:                 .string "SYNTAX"                      , NUL
                                    .const TYPE_MISMATCH_ERROR               02
        type-mismatch-err:          .string "TYPE MISMATCH"               , NUL
                                    .const UNDEFINED_SUBROUTINE_ERROR        03
        undefined-subroutine-err:   .string "UNDEFINED SUBROUTINE"        , NUL
                                    .const UNDEFINED_FUNCTION_ERROR          04
        undefined-function-err:     .string "UNDEFINED FUNCTION"          , NUL
                                    .const UNDEFINED_STATEMENT_ERROR         05
        undefined-statement-err:    .string "UNDEFINED STATEMENT"         , NUL
                                    .const INSUFFICIENT_ARGUMENTS_ERROR      06
        insufficient-args-err:      .string "INSUFFICIENT ARGUMENTS"      , NUL
                                    .const TOO_MANY_ARGUMENTS_ERROR          07
        too-many-args-err:          .string "TOO MANY ARGUMENTS"          , NUL
                                    .const CAN_NOT_CONTINUE_ERROR            08
        can-not-continue-err:       .string "CAN'T CONTINUE"              , NUL
                                    .const OUT_OF_DATA_ERROR                 09
        out-of-data-err:            .string "OUT OF DATA"                 , NUL
                                    .const DEFFN_WITHOUT_ENDFN               10
        deffn-without-endfn-err:    .string "DEFFN WITHOUT ENDFN"         , NUL
                                    .const DEFSUB_WITHOUT_ENDSUB             11
        defsub-without-endsub-err:  .string "DEFSUB WITHOUT ENDSUB"       , NUL
                                    .const NOT_ENOUGH_MEMORY_ERROR           12
        not-enough-memory-err:      .string "NOT ENOUGH MEMORY"           , NUL
                                    .const OUT_OF_MEMORY_ERROR               13
        out-of-memory-err:          .string "OUT OF MEMORY"               , NUL
                                    .const INVALID_QUANTITY_ERROR            14
        invalid-quantity-err:       .string "INVALID QUANTITY"            , NUL
                                    .const DO_WITHOUT_LOOP_ERROR             15
        do-without-loop-err:        .string "DO WITHOUT LOOP"             , NUL
                                    .const MISMATCHED_NEXT_ERROR             16
        mismatched-next-err:        .string "MISMATCHED NEXT"             , NUL
                                    .const IF_WITHOUT_ENDIF_ERROR            17
        if-without-endif-err:       .string "IF WITHOUT ENDIF"            , NUL
                                    .const ELSE_WITHOUT_IF_ERROR             18
        else-without-if-err:        .string "ELSE WITHOUT IF"             , NUL
                                    .const ENDIF_WITHOUT_IF_ERROR            19
        endif-without-if-err:       .string "ENDIF WITHOUT IF"            , NUL
                                    .const ELSEIF_WITHOUT_IF_ERROR           20
        elseif-without-if-err:      .string "ELSEIF WITHOUT IF"           , NUL
                                    .const FILE_NOT_FOUND_ERROR              21
        file-not-found-err:         .string "FILE NOT FOUND"              , NUL
                                    .const UNEXPECTED_RETURN_ERROR           22
        unexpected-return-err:      .string "RETURN WITHOUT CALL OR GOSUB", NUL
                                    .const OUT_OF_DISK_SPACE_ERROR           23
        out-of-disk-space-err:      .string "OUT OF DISK SPACE"           , NUL
                                    .const FILE_EXISTS_ERROR                 24
        file-exists-err:            .string "FILE EXISTS"                 , NUL
                                    .const STOPPED_ERROR                     25
        stopped-err:                .string "STOPPED"                     , NUL
                                    .const STRING_TOO_LONG_ERROR             26
        string-too-long-err:        .string "STRING TOO LONG"             , NUL
                                    .const LINE_TOO_LONG_ERROR               27
        line-too-long-err:          .string "LINE TOO LONG"               , NUL
                                    .const NEXT_WITHOUT_FOR_ERROR            28
        next-without-for-err:       .string "NEXT WITHOUT FOR"            , NUL
                                    .const WHILE_WITHOUT_LOOP_ERROR          29
        while-without-loop-err:     .string "WHILE WITHOUT LOOP"          , NUL
                                    .const UNTIL_WITHOUT_LOOP_ERROR          30
        until-without-loop-err:     .string "UNTIL WITHOUT LOOP"          , NUL
                                    .const LOOP_WITHOUT_DO_ERROR             31
        loop-without-do-err:        .string "LOOP WITHOUT DO"             , NUL
                                    .const EXPRESSION_TOO_COMPLEX_ERROR      32
        expression-too-complex-err: .string "EXPRESSION TOO COMPLEX"      , NUL
                                    .const STACK_OVERFLOW_ERROR              33
        stack-overflow-err:         .string "STACK OVERFLOW"              , NUL
                                    .const EXPECTED_A_QUOTE                  34
        expected-quote:             .string "EXPECTED A QUOTE"            , NUL
                                    .const EXPECTED_LEFT_PARENTHESIS         35
        expected-left-paren:        .string "EXPECTED LEFT PARENTHESIS"   , NUL
                                    .const EXPECTED_RIGHT_PARENTHESIS        36
        expected-right-paren:       .string "EXPECTED RIGHT PARENTHESIS"  , NUL
                                    .const EXPECTED_LEFT_BRACKET             37
        expected-left-bracket:      .string "EXPECTED LEFT BRACKET"       , NUL
                                    .const EXPECTED_RIGHT_BRACKET            38
        expected-right-bracket:     .string "EXPECTED RIGHT BRACKET"      , NUL
        error-prefix:               .string CR, "?", NUL
        error:                      .string " ERROR", CR, NUL
        at-line:                    .string " AT LINE ", NUL
        error-vectors:
            .word syntax-err, type-mismatch-err, undefined-subroutine-err, undefined-function-err, undefined-statement-err
            .word insufficient-args-err, too-many-args-err, can-not-continue-err, out-of-data-err, deffn-without-endfn-err
            .word defsub-without-endsub-err, not-enough-memory-err, out-of-memory-err, invalid-quantity-err, do-without-loop-err
            .word mismatched-next-err, if-without-endif-err, else-without-if-err, endif-without-if-err, elseif-without-if-err
            .word file-not-found-err, unexpected-return-err, out-of-disk-space-err, file-exists-err, stopped-err, string-too-long-err
            .word line-too-long-err, next-without-for-err, while-without-loop-err, until-without-loop-err, loop-without-do-err
            .word expression-too-complex-err, stack-overflow-err, expected-quote, expected-left-paren, expected-right-paren
            .word expected-left-bracket, expected-right-bracket, error-prefix, error, at-line

}