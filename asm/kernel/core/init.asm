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
        br kmemmap.user.start
    }

}