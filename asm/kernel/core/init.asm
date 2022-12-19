########################################
#
# Retroputer Kernel : Core : Init
#
########################################

.segment kcode kmemmap.kernel.init-start .append {
    init: {
        # interrupts should be disabled for this
        set id

        # configure MM
        ld a, 0x7C41
        push a
        popmm

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


        # configure the screen
        call screen.kcode.init

        clr id
        # jump to program start
        # br kmemmap.user.start

        in al, 0x38                                         # Check if user is holding SHIFT
        test al, 0b0000_0001
        if !z {
            br kmemmap.user.start                           # yes, jump to user code
        } else {
            br kmemmap.basic.code-start                     # otherwise, start BASIC
        }
    }
}