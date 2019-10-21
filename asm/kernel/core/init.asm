########################################
#
# Retroputer Kernel : Core : Init
#
########################################

.segment kcode kmemmap.kernel.init-start .append {
    init: {
        # configure the stack
        ld bp, kmemmap.stack.top
        mov sp, bp

        # configure the screen
        call screen.kcode.init


        # jump to program start
        br kmemmap.user.start
    }
}