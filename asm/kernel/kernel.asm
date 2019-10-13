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