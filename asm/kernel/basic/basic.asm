########################################
#
# Retroputer Kernel : BASIC : Core
#
########################################

.namespace basic {
    .const NUL 0
    .const CR 13
    .const CLS 12
    .const SPACE 0x20
    .const QUOTE 0x22
    .const TOK_NUMBER 0xFF
    .const TOK_STRING 0xFE

    .segment brodata kmemmap.basic.rodata-start .append {

###############################################################################
#
# Welcome message and prompt
#
###############################################################################
        welcome:
            .string CLS
            .string 0x1B, "17", 0x12, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, CR
            .string 0x1B, "18", 0x12, 0xDB, 0xE3, 0xDC, 0xE8, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, 0x1B, "255", 0x12, "  RETROPUTER BASIC 1.0"
            .string 0x1B, "19", 0x12, 0xDB, 0xDE, 0xDB, 0xDE, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, CR
            .string 0x1B, "20", 0x12, 0xDB, 0xE3, 0xDC, 0xE8, 0xDB, 0xDB, 0xDB, 0x96, 0x1B, "255", 0x12, "  131072 CODE Bytes Free"
            .string 0x1B, "21", 0x12, 0xDB, 0xDE, 0xDB, 0xDD, 0xDB, 0xDB, 0x96, 0x1B, "255", 0x12, "   65536 ARRAY Bytes Free"
            .string 0x1B, "22", 0x12, 0xDB, 0xDE, 0xDB, 0xDD, 0xDB, 0x96, 0x1B, "255", 0x12, "   65536 STRING Bytes Free"
            .string 0x1B, "23", 0x12, 0xDB, 0xDB, 0xDB, 0xDB, 0x96, 0x1B, "255", 0x12, "   4096 SYMBOL Entries Free"
            .string 0x1B, "17", 0x12, 0xDB, 0xDB, 0xDB, 0x96, CR, CR, 0x1B, "255", 0x12, NUL
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
                d := addrbank(brodata.error)     # PTR to error messages
                call [vectors.PRINT]             # print the error
                d := addrpage(brodata.error)     # >> 3
                x := addrpofs(brodata.error)     # & 7
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
                cmp al, QUOTE
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
        # Is character within a given range?
        #
        # @param DL - character to check
        # @param CL - low range
        # @param CH - high range
        # @flags Z - clear if not within range (!=); set if within range (=)
        #######################################################################
        is-char-in-range: {
            pushf                           # push flags so we can only affect C
        _main:
            cmp dl, cl
            brs N not-a-number              # char is < cl
            exc c                           # ch is now in cl
            cmp dl, cl                      # 
            brs Z is-a-number               # char is = cl, so in range
            brs !N not-a-number             # char is > cl, so out of range
        is-a-number:
            popf                            # only affect the C flag
            set z
            brs _out
        not-a-number:
            popf
            clr z
        _out:
            ret
        }

        #
        # Is character a digit?
        #
        # @param DL - character to check
        # @flags Z - clear if not a digit; set if a digit
        #######################################################################
        is-char-a-digit: {
            push c
        _main:
            c := 0x3930
            call is-char-in-range
        _out:
            pop c
            ret
        }

        #
        # Crunches a line input by the user.
        #
        # @param [BP+4, BP+6]: PTR to receiving buffer (must be as large as the input string)
        # @param [BP+8, BP+A]: PTR to line that we want to crunch
        # @returns DL: 0 if no error, or an error number if one occurred
        #
        #######################################################################
        crunch-line: {
            enter 0x04
            .const target 4
            .const source 8
            .const sourceBank 8
            .const sourceAddr 10
            .const sourceIndex -2
            .const targetIndex -4
            push x
            push y
            push d
            push c
            push b
        _main:
            y := 0
            [bp+sourceIndex] := y               # we're at position 0 in both
            [bp+targetIndex] := y               # source and target strings
            dl := 0
            do {
                call _get-source-index          # get next character index (y)
                dl := <BP+source>,y             # read next char from our source string
                call _adv-source-index

                # crunching works in a few ways:
                # 0. we don't want to encode spaces
                ###############################################################
                cmp dl, SPACE                   # we won't encode spaces; instead
                br z bottom                     # we'll print them during listing instead

                # 1. numbers are tokenized into their byte forms (0xFF, hi, lo)
                ###############################################################
                call is-char-a-digit
                br !z not-a-number              # nope, not a digit

                # we're a number; let's convert it
                c := 0                          # start from zero
                b := 10                         # base 10
                call _get-source-index          # y = next character index
            cvt-number-loop:
                clr c                           # don't forget about the carry flag!
                sub dl, asc("0")                # get to the range 0x00 - 0x09
                mul c, b                        # shift c left by an order of magnitude
                clr c                           # ... and again
                add c, dl                       # add our digit to c

                dl := <BP+source>,y             # read next char from our source string
                call is-char-a-digit
                br !z end-of-number             # nope, number is over

                inc y                           # move the index along
                br cvt-number-loop              # go back around
            end-of-number:
                call _set-source-index          # save source character index
                call _get-target-index          # get next position in crunch target
                dl := 0xFF                      # Store NUMBER token to
                <BP+target>,y := dl             # into the crunched string
                inc y                           # move the index along
                <bp+target>,y := c              # and now the number itself
                inc y                           # move the index along
                inc y                           # move the index along
                call _set-target-index          # update our target index
                continue                        # back to the TOP

            not-a-number:

                # 2. strings are tokenized into their forms (0xFE, string bytes, 0)
                ###############################################################
                cmp dl, QUOTE                   # is dl a quote?
                brs !Z not-a-string             # nope; not a string

                call _get-target-index          # get next position in crunch target
                dl := 0xFE                      # "String" token
                <bp+target>,y := dl             # Store it into the crunch target
                call _adv-target-index

            still-a-string:
                call _get-source-index
                dl := <bp+source>,y             # get string character
                call _adv-source-index
                cmp dl, QUOTE                   # if it's a quote, we can zero it
                if Z { 
                    dl := 0 
                }
                call _get-target-index
                <bp+target>,y := dl             # write to target
                call _adv-target-index
                cmp dl, 0                       # are we done?
                brs !Z still-a-string           # no, keep going
                continue                        # next!

            not-a-string:
                # 3. keywords are converted into their token byte (0x80-0xFC)
                ###############################################################
                c := 0x7E21                     # next, check if we might start with a
                call is-char-in-range           # character that could be a keyword or
                br !Z not-a-keyword             # operator

                push d  
                LDPTR(d, x, brodata.keywords)   # we're potentially a keyword, so
                                                # get the location of our keyword list

                b := [bp+sourceAddr]            # get address of our current source
                #call _get-source-index          # (no, really)
                clr c
                add b, y                        # ... now were at the right spot
                dec b                           # ... except we weren't!
                push b                          # and put it on the stack so that we
                b := [bp+sourceBank]            # can call STRCMP correctly
                push b

            search-keywords:
                bl := [d, x]                    # get first character of current token
                cmp bl, NUL                     # if it's NUL, we've exhausted the list
                brs Z exit-keyword-search       # so we're clearly not a keyword
                clr Z                           # compare strings, but with partial equality
                call [vectors.STRCMP]           # so that our source doesn't need NUL between
                                                # tokens; c will now be how many chars got compared
                if !Z {
                    clr c                       # clear the carry
                    do {
                        inc x
                        bl := [d, x]
                        cmp bl, NUL
                    } while !z                  # advance the rest of the token
                    inc x
                    inc x                       # ... and one more past the token # in the table
                    brs search-keywords         # and keep going
                }
                clr c
                add x, c
                inc x
                bl := [d, x]                    # should be the token #
                call _get-target-index
                <bp+target>,y := bl             # write to target
                call _adv-target-index
                call _get-source-index          # advance past the token in the source
                clr c
                add y, c
                dec y
                call _set-source-index

                b := 4
                add sp, b                       # clean up stack from pushing ptrs
                pop d
                continue

            exit-keyword-search:
            #brk
                b := 4
                add sp, b                       # clean up stack from pushing ptrs
                pop d

            not-a-keyword:
                # 4. Everything else is copied as-is
                ###############################################################
                # 5. If char is 0, crunching ends (falls into #4, so we do want to copy it)
                ###############################################################
            everything-else:
                call _get-target-index          # get next character index (y)
                <BP+target>,y := dl             # store to target
                call _adv-target-index          # move it along
            bottom:
                cmp dl, 0                       # was char 0? if so, break
            } while !z
        _out:
            pop b
            pop c
            pop d
            pop y
            pop x
            exit 0x04
            ret
        _get-source-index:
            y := [bp+sourceIndex]
            ret
        _get-target-index:
            y := [bp+targetIndex]
            ret
        _set-source-index:
            [bp+sourceIndex] := y
            ret
        _set-target-index:
            [bp+targetIndex] := y
            ret
        _adv-source-index:
            calls _get-source-index
            inc y
            calls _set-source-index
            ret
        _adv-target-index:
            calls _get-target-index
            inc y
            calls _set-target-index
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

            d := bdata.buffer >> 3
            x := bdata.buffer & 7
            push x                      # BP+10
            push d                      # BP+8
            d := bdata.crunch-buffer >> 3
            x := bdata.crunch-buffer & 7
            push x                      # BP+6
            push d                      # BP+4
            call crunch-line
            d := 8
            add sp, d                   # clean up our stack

            # TEMP: Display what we got
            d := bdata.crunch-buffer >> 3
            x := bdata.crunch-buffer & 7
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