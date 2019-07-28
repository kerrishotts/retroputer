.namespace kernel {
    .import "./trapmap.asm"
    .import "./iomap.asm"
    .import "./memmap.asm"

    .import "./core/core.asm"

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