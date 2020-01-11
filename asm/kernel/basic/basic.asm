########################################
#
# Retroputer Kernel : BASIC : Core
#
########################################

.namespace basic {
    .const NUL 0
    .const CR 13
    .const CLS 12

    .segment brodata kmemmap.basic.rodata-start .append {

###############################################################################
#
# Welcome message and prompt
#
###############################################################################
        welcome:
            .string CLS
            .string 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, CR
            .string 0xDB, 0xE3, 0xDC, 0xE8, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, "  RETROPUTER BASIC 1.0"
            .string 0xDB, 0xDE, 0xDB, 0xDE, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, CR
            .string 0xDB, 0xE3, 0xDC, 0xE8, 0xDB, 0xDB, 0xDB, 0x96, "  131072 CODE Bytes Free"
            .string 0xDB, 0xDE, 0xDB, 0xDD, 0xDB, 0xDB, 0x96, "   65536 ARRAY Bytes Free"
            .string 0xDB, 0xDE, 0xDB, 0xDD, 0xDB, 0x96, "   65536 STRING Bytes Free"
            .string 0xDB, 0xDB, 0xDB, 0xDB, 0x96, "   4096 SYMBOL Entries Free"
            .string 0xDB, 0xDB, 0xDB, 0x96, CR, CR, NUL
        prompt:
            .string "READY."
        newline:
            .byte CR, NUL
    }

    .import "./errors.asm"
    .import "./tokens.asm"
    
###############################################################################
#
# Global BASIC State
#
###############################################################################
    .segment bdata kmemmap.basic.data-start .append {
        buffer:              .byte[256]          # input buffer
        crunch-buffer:       .byte[256]          # line crunch buffer

    }

###############################################################################
#
# BASIC Logic
#
###############################################################################
    .segment bcode kmemmap.basic.code-start .append {
        start: {
            call init                            # Say hello
            call repl                            # Enter the REPL
            brk
        }

        #
        # Hi!
        #
        #######################################################################
        init: {
            d := brodata.welcome >> 3
            x := brodata.welcome & 7
            call [vectors.PRINT]
            ret
        }

        ########################################################################
        # Convert the integer in register C to a string (pointed at by D, X)
        #
        # Requires 26 bytes on the stack
        ########################################################################
        itoa: {
            enter 10                        # reserve 10 bytes for an internal buffer
            push a
            push b
            push c
            push d
            push x
            push y
        _main:
            ld b, 10                        # multiplier / modulo
            ld y, 0                         # index to our internal buffer
            mov a, c
            do {
            mov c, a                     # keep a copy of a; mod is going to obliterate it

            mod a, b                     # a = a % 10
            clr c
            add a, 48                    # "0" is 48, so adding this will convert to the ascii character
            st [bp+-10, y], al           # stuff it in the local buffer (this will be reversed)
            inc y                        # don't overwrite... ;-)

            mov a, c                     # restore a so we can divide it instead
            div a, b                     # a = a / 10

            cmp a, 0x00                  # check if we're done
            } while !z

            dec y                           # back x off by one so we're starting in the right place when
            do {                            # we copy things back in reverse
            ld al, [bp+-10, y]           # get character (in reverse)
            st [d, x], al                   # store it into the passed buffer (in correct order)
            inc x                        # don't overwrite
            dec y
            } while !c

            ld al, 0x00                     # store terminating NULL
            st [d, x], al
        _out:
            pop y
            pop x
            pop d
            pop c
            pop b
            pop a
            exit 10

            ret
        }

        #
        # Prints the error message (if any) specified by DL. If C is other than
        # zero, will also print C as a line number
        #
        #######################################################################
        print-error: {
            enter 10
            push d
            push x
            push y
            pushf
        _main:
            cmp dl, 0
            if !z {
                y := dl                          # get error #
                d := brodata.error-prefix >> 3
                x := brodata.error-prefix & 7
                call [vectors.PRINT]             # NEWLINE + "?""
                d := brodata.error-vectors >> 3  # PTR to error vectors
                x := brodata.error-vectors & 7
                dec y                            # errors start at 0
                shl y, 1                         # y *= 2
                x := [d, x, y]                   # indirect
                d := (brodata.error & 0x7_0000) >> 3       # PTR to error messages
                call [vectors.PRINT]             # print the error
                d := brodata.error >> 3
                x := brodata.error & 7
                call [vectors.PRINT]             # " ERROR" + NEWLINE
                cmp c, 0
                if !z {
                    d := brodata.at-line >> 3
                    x := brodata.at-line & 7
                    call [vectors.PRINT]         # " AT LINE "

                    d := bp
                    sub d, 10
                    x := d
                    d := 0
                    call itoa                    # Convert C to a string
                    call [vectors.PRINT]         # ... and print it!
                    d := brodata.newline >> 3
                    x := brodata.newline & 7
                    call [vectors.PRINT]         # NEWLINE, to be neat
                }
            }
        _out:
            popf
            pop y
            pop x
            pop d
            exit 10
            ret
        }

        #
        # Converts the line that's been input to UPPERCASE, except when
        # quotes are found. Works IN PLACE.
        #
        # [D, X]: PTR to line that we want to uppercase
        #
        # Returns 0 in DL if OK; or EXPECTED_A_QUOTE if quotes are mismatched.
        #######################################################################
        convert-to-uppercase: {
            enter 0x00
            push y
            push a
            push b
            pushf
        _main:
            y := 0
            bl := 0                              # tracks if we're in quote mode
            do {
                al := [d, x, y]
                cmp al, 34
                if z {
                    # QUOTE!
                    xor bl, 0xFF                 # toggle quote mode on and off
                }
                cmp bl, 0xFF
                if !z {
                    # not in quote mode, do uppercase handling
                    cmp al, 97
                    if !n {
                        cmp al, 123
                        if n {
                            and al, 0b11011111   # to uppercase (zero bit 5)
                            [d, x, y] := al
                        }
                    }
                }
                inc y
                cmp al, 0x00
            } while !z
            al := brodata.EXPECTED_A_QUOTE       # check if we have unbalanced
            and al, bl                           # quotes -- if so, return it
            dl := al                             # return value 
        _out:
            popf
            pop b
            pop a
            pop y
            exit 0x00
            ret
        }

        #
        # Crunches a line input by the user.
        #
        # [BP+-2, BP+-4]: PTR to line that we want to crunch
        # [BP+-6, BP+-8]: PTR to receiving buffer (must be as large as the input string)
        #
        # Returns 0 if no error occurred, or an error number if one did
        #######################################################################
        crunch-line: {

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

            #
            # STEP 1
            #
            d := brodata.prompt >> 3
            x := brodata.prompt & 7
            call [vectors.PRINT]                 # READY.

        _get-line:
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            c := 255
            call [vectors.INPUT]                 # Get input from user

            d := brodata.newline >> 3
            x := brodata.newline & 7
            call [vectors.PRINT]                 # NEWLINE, to be neat

            # Is the line too long, or no line at all?
            cmp c, 0x00
            if z {
                # no line; go again, but no prompt
                br _get-line
            }
            if n {
                # yup; too long
                c := 0
                dl := brodata.LINE_TOO_LONG_ERROR
                call print-error

                # try again.
                br _ready
            }


            #
            # STEP 2: Crunch
            #

            # 2a. UPPERCASE anything that's not a string; this is important
            #     to ensure that we can properly crunch later.
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            call convert-to-uppercase

            cmp dl, 0
            if !z {
                # we've got an error -- likely a quote mismatch
                c := 0
                call print-error
                br _ready
            }

            #
            # 2b. Find the first non-space character. (trimming the front)
            #     We do this so we can ensure that you can have spaces before a
            #     line number and not have it fall into direct mode.
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            y := 0
            do {
                al := [d, x, y]
                inc y
                cmp al, 32
            } while z
            dec y

            #
            # 2c. Now we can start crunching the line. There's some things we want
            #     to do:
            #     - convert integers into packed forms so that we don't have
            #       to re-parse them later
            #     - convert tokens into packed forms for easier parsing
            #     - strip extra spaces 

            # TEMP: Display what we got
            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            call [vectors.PRINT]
            d := brodata.newline >> 3
            x := brodata.newline & 7
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