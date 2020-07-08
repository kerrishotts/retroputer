.namespace constants {
    .const NUL 0
    .const CR 13
    .const CLS 12
    .const SPACE 0x20
    .const QUOTE 0x22
    .const CURSOR_LEFT 17

    .const MODE_DIRECT 0x00
    .const MODE_RUN    0x01

    .const TYPE_WORD   0b00
    .const TYPE_STRING 0b01
    .const TYPE_REAL   0b10
    .const TYPE_ARRAY  0b11

    .const EXIT_EARLY 0xFF
    .const NO_STMT_TERM_NEEDED 0xFE

    .const COMMAND_COLOR  22 # Yellow
    .const FUNCTION_COLOR 22 # Yellow
    .const OPERATOR_COLOR 22 # Yellow
    .const GROUPING_COLOR 23 # White
    .const LINENUM_COLOR  23 # White
    .const NUMBER_COLOR   19 # Cyan
    .const STRING_COLOR   21 # Purple
    .const VARIABLE_COLOR 23 # White

}