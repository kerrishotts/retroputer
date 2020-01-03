.namespace kernel {
    .import "./trapmap.asm"
    .import "./iomap.asm"
    .import "./memmap.asm"
    .import "./charmap.asm"
    .import "./palette.asm"

    .import "./core/core.asm"

    .segment k-no-impl-trap kmemmap.traps.start {
        ret   # by storing RET in trap 0, any traps that point to 0
        ret   # will return immediately. TRAP 0 is not defined.
    }

    .segment vectors kmemmap.kernel.vector-start .append {
        CLEAR_SCREEN:                .word core.screen.kcode.clear-screen
        SCROLL_SCREEN_UP:            .word core.screen.kcode.scroll-screen-up
        SET_CURSOR_POS:              .word core.screen.kcode.set-cursor-pos
        GET_CURSOR_POS:              .word core.screen.kcode.get-cursor-pos
        GET_CURSOR_ADDR:             .word core.screen.kcode.get-cursor-addr
        CVT_ADDR_TO_POS:             .word core.screen.kcode.cvt-addr-to-pos
        GET_CHAR_UNDER_CURSOR:       .word core.screen.kcode.get-char-under-cursor
        GET_LOGICAL_LINE_START_ADDR: .word core.screen.kcode.get-logical-line-start-addr
        GET_LOGICAL_LINE_END_ADDR:   .word core.screen.kcode.get-logical-line-end-addr
        CURSOR_UP:                   .word core.screen.kcode.cursor-up
        CURSOR_LEFT:                 .word core.screen.kcode.cursor-left
        CURSOR_RIGHT:                .word core.screen.kcode.cursor-right
        CURSOR_DOWN:                 .word core.screen.kcode.cursor-down
        CURSOR_NEWLINE:              .word core.screen.kcode.cursor-newline
        PUT_CHAR:                    .word core.screen.kcode.put-char
        GET_CHAR:                    .word core.screen.kcode.get-char
    }

#  .segment kcode kmemmap.kernel.code-start .append{
#      # init:
#          ld bp, kmemmap.stack.top
#          mov sp, bp
#
#             ld a, 0x1234
#             st [kmemmap.traps.vectors.rtc.change], a
#
#             ld b, kmemmap.traps.end
#
#             ret
#     }
}