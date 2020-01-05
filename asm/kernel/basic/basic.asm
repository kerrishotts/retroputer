########################################
#
# Retroputer Kernel : BASIC : Core
#
########################################

.namespace basic {
    .segment brodata kmemmap.basic.rodata-start .append {
        welcome:
            .byte 12, 13
            .string " **** RETROPUTER BASIC 1.0 ****"
            .byte 13, 13
            .string "512K RAM  40960 BASIC BYTES FREE"
            .byte 13, 0
        prompt:
            .string "READY."
        newline:
            .byte 13, 0
    }
    
    .segment bdata kmemmap.basic.data-start .append {
        buffer:
            .byte[256]
    }

    .segment bcode kmemmap.basic.code-start .append {
        start: {
            call init
            call repl
            brk
        }
        init: {
            d := brodata.welcome >> 3
            x := brodata.welcome & 7
            call [vectors.PRINT]
            ret
        }
        repl: {
        _loop:
            d := brodata.prompt >> 3
            x := brodata.prompt & 7
            call [vectors.PRINT]

            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            c := 255
            call [vectors.INPUT]

            d := brodata.newline >> 3
            x := brodata.newline & 7
            call [vectors.PRINT]
            
            br _loop
            ret
        }
    }
}