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
        CLEAR_SCREEN:     .word core.screen.kcode.clear-screen         # 0x0FE00
        SCROLL_SCREEN_UP: .word core.screen.kcode.scroll-screen-up     # 0x0FE02
        SET_CURSOR_POS:   .word core.screen.kcode.set-cursor-pos       # 0x0FE04
        GET_CURSOR_POS:   .word core.screen.kcode.get-cursor-pos       # 0x0FE06
        GET_CURSOR_ADDR:  .word core.screen.kcode.get-cursor-addr      # 0x0FE08
        CURSOR_ADVANCE:   .word core.screen.kcode.cursor-advance       # 0x0FE0A
        PUT_CHAR:         .word core.screen.kcode.put-char             # 0x0FE0C
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