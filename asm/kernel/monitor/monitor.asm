########################################
#
# Retroputer Kernel : MONITOR : Core
#
########################################

.namespace monitor {
    .const NUL 0
    .const CR 13
    .const CLS 12

    .segment mrodata kmemmap.monitor.rodata-start .append {

###############################################################################
#
# Welcome message and prompt
#
###############################################################################
        welcome:
            .string CLS, CR
            .string "RETROPUTER MONITOR 1.0", CR, CR, NUL
        prompt:
            .string CR, "READY."
        newline:
            .byte CR, NUL
        space:
            .byte 32, NUL
        state-heading-1:
            .string " A.   B.   C.   D.   X.   Y. ", CR, NUL
        state-heading-2:
            .string CR, " BP   SP   PC   MM  XDSWNCVZ", CR, NUL

        registers:
            .string "A", 0, 0, 0, "AL", 0, 0, "B", 0, 0, 0, "BL", 0, 0
            .string "C", 0, 0, 0, "CL", 0, 0, "D", 0, 0, 0, "DL", 0, 0
            .string "X", 0, 0, 0, "XL", 0, 0, "Y", 0, 0, 0, "YL", 0, 0
            .string "BP", 0, 0,   "BPL", 0,   "SP", 0, 0,   "SPL", 0
            .string "ST", 0, 0,   "FLG", 0,   "PC", 0, 0,   "PCL", 0
            .string "MP", 0, 0,   "MPL", 0,   "MM", 0, 0,   "MML", 0

        flags:
        flags-unset:
            .string "e", 0, "d", 0, "s", 0, "w", 0
            .string "n", 0, "c", 0, "v", 0, "z", 0
        flags-set:
            .string "E", 0, "D", 0, "S", 0, "W", 0
            .string "N", 0, "C", 0, "V", 0, "Z", 0

    }

    #.import "./errors.asm"
    #.import "./tokens.asm"
    
###############################################################################
#
# Global monitor State
#
###############################################################################
    .segment mdata kmemmap.monitor.data-start .append {
        state:               .byte[32]           # machine state
        buffer:              .byte[256]          # input buffer
    }

###############################################################################
#
# MONITOR Logic
#
###############################################################################
    .segment mcode kmemmap.monitor.code-start .append {
        start: {
            call save-state                      # save state before we say HI
            call init                            # Say hello
            call repl                            # Enter the REPL
        }

        save-state: {
            push x
            x := 0
            [mdata.state, x] := a
            xl := 2
            [mdata.state, x] := b
            xl := 4
            [mdata.state, x] := c
            xl := 6
            [mdata.state, x] := d
            pop x
            push y
            y := 8 
            [mdata.state, y] := x
            pop y
            push x
            x := 10
            [mdata.state, x] := y
            x := 12
            [mdata.state, x] := bp
            x := 14
            [mdata.state, x] := sp
            pop x
            pop a                                # PC
            push x
            x := 16
            [mdata.state, x] := a
            pop x
            push a
            push x
            pushmm                               # Memory Map
            pop a
            x := 18
            [mdata.state, x] := a
            pushf                                # Flags
            pop a 
            x := 20
            [mdata.state, x] := a
            pop x
            ret
        }

        print-state: {
            d := addrbank(mrodata.state-heading-1)
            x := addrbofs(mrodata.state-heading-1)
            call [vectors.PRINT]

            bl := 4
            exc b
            bl := 16
            y := 0
            al := 12
            do {
                c := [mdata.state, y]
                d := addrbank(mdata.buffer)
                x := addrbofs(mdata.buffer)
                call [vectors.U16_TO_STR]
                call [vectors.PRINT]
                d := addrbank(mrodata.space)
                x := addrbofs(mrodata.space)
                call [vectors.PRINT]
                inc y
                inc y
                cmp y, al
            } while !z

            d := addrbank(mrodata.newline)
            x := addrbofs(mrodata.newline)
            call [vectors.PRINT]                 # NEWLINE, to be neat
            d := addrbank(mrodata.state-heading-2)
            x := addrbofs(mrodata.state-heading-2)
            call [vectors.PRINT]

            al := 20
            do {
                c := [mdata.state, y]
                d := addrbank(mdata.buffer)
                x := addrbofs(mdata.buffer)
                call [vectors.U16_TO_STR]
                call [vectors.PRINT]
                d := addrbank(mrodata.space)
                x := addrbofs(mrodata.space)
                call [vectors.PRINT]
                inc y
                inc y
                cmp y, al
            } while !z

            c := [mdata.state, y]
            and c, 0x00FF                        # only render bottom 8 bits
            b := 0x0802                          # binary output, padded to 8 chars
            d := addrbank(mdata.buffer)
            x := addrbofs(mdata.buffer)
            call [vectors.U16_TO_STR]
            call [vectors.PRINT]
            d := addrbank(mrodata.space)
            x := addrbofs(mrodata.space)
            call [vectors.PRINT]

            d := addrbank(mrodata.newline)
            x := addrbofs(mrodata.newline)
            call [vectors.PRINT]                 # NEWLINE, to be neat
            ret
        }

        #
        # Hi!
        #
        #######################################################################
        init: {
            d := mrodata.welcome >> 3
            x := mrodata.welcome & 7
            call [vectors.PRINT]
            ret
        }

        #
        # The REPL is responsible for:
        # 
        # 1. Print prompt, and take input (via vectors.INPUT)
        # 2. Crunching the line
        # 3a. If there's a line number, add it to program memory
        # 3b. If there's no line number, execute it immediately
        # 4. If an error has occurred, print it.
        # 5. Go back to 1.
        #
        #######################################################################
        repl: {
        _loop:
        _ready:

            call print-state

            #
            # STEP 1
            #
            d := mrodata.prompt >> 3
            x := mrodata.prompt & 7
            call [vectors.PRINT]                 # READY.

        _get-line:
            d := mdata.buffer >> 3
            x := mdata.buffer & 7
            c := 255
            call [vectors.INPUT]                 # Get input from user

            d := mrodata.newline >> 3
            x := mrodata.newline & 7
            call [vectors.PRINT]                 # NEWLINE, to be neat

            # Is the line too long, or no line at all?
            cmp c, 0x00
            if z {
                # no line; go again, but no prompt
                br _get-line
            }
            if n {
                # yup; too long
                # try again.
                br _ready
            }


            #
            # STEP 2: Crunch
            #

            # TEMP: Display what we got
            d := mdata.buffer >> 3
            x := mdata.buffer & 7
            call [vectors.PRINT]
            d := mrodata.newline >> 3
            x := mrodata.newline & 7
            call [vectors.PRINT]                 # NEWLINE, to be neat


            #
            # STEP 3: Store / execute
            #

            #
            # STEP 4: Display errors
            #

            #
            # STEP 5: Do it again
            #
            br _ready
            ret
        }
    }
}