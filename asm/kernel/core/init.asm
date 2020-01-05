########################################
#
# Retroputer Kernel : Core : Init
#
########################################

.segment kcode kmemmap.kernel.init-start .append {
    init: {
        # interrupts should be disabled for this
        set id

        # reset interrupt vectors (point all to zero)
        d := 0
        x := 0
        c := 512
        a := 0
        do {
            [d, x] := al
            inc x
            dec c
            cmp c, 0x0000
        } while !z

        # set up interrupt vector 0
        x := 0xA7A7
        [0] := x

        # configure the stack
        ld bp, kmemmap.stack.top
        mov sp, bp

        # configure MM
        ld a, 0x7C41
        push a
        popmm

        # configure the screen
        call screen.kcode.init

        clr id
        # jump to program start
        # br kmemmap.user.start
        br kmemmap.basic.code-start
    }
}