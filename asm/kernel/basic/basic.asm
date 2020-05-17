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

    .const MODE_DIRECT 0x00
    .const MODE_RUN    0x01

    .segment brodata kmemmap.basic.rodata-start .append {

###############################################################################
#
# Welcome message and prompt
#
###############################################################################
        welcome:
            .string CLS
            .string 0x1B, "17", 0x12, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, CR
            .string 0x1B, "18", 0x12, 0xDB, 0xE3, 0xDC, 0xE8, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x1B, "255", 0x12, "  RETROPUTER BASIC 1.0"
            .string 0x1B, "19", 0x12, 0xDB, 0xDE, 0xDB, 0xDE, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x1B, "255", 0x12, "   --------------------"
            .string 0x1B, "20", 0x12, 0xDB, 0xE3, 0xDC, 0xE8, 0xDB, 0xDB, 0xDB, 0xDB, 0x1B, "255", 0x12, CR
            .string 0x1B, "21", 0x12, 0xDB, 0xDE, 0xDB, 0xDD, 0xDB, 0xDB, 0xDB, 0x1B, "255", 0x12, "   131072 Code Bytes Free"
            .string 0x1B, "22", 0x12, 0xDB, 0xDE, 0xDB, 0xDD, 0xDB, 0xDB, 0x1B, "255", 0x12, "     65536 Heap Bytes Free"
            .string 0x1B, "23", 0x12, 0xDB, 0xDB, 0xDB, 0xDB, 0xDB, 0x1B, "255", 0x12, CR, CR, NUL
            #.string 0x1B, "17", 0x12, 0xDB, 0xDB, 0xDB, 0xDB, CR, CR, 0x1B, "255", 0x12, NUL
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
        buffer:              .byte[256]          # (0x100) input buffer
        crunch-buffer:       .byte[256]          # (0x100) line crunch buffer
        forsub-stack:        .word[256]          # (0x200) stack for FOR/GOSUB/CALL. 128 4-byte entries
                                                 #         31:30 = type (0=FOR, 1=GOSUB, 2=CALL) 
                                                 #         29:16 = variable (for FOR)
                                                 #         15:0  = line number to return to
        expr-area:           .byte[256]          # (0x100) Area for evaluating expressions

        # 0x300 bytes remaining for non-array data
        forsub-stack-ptr:    .byte 0             # pointer into forsub stack
        execution-mode:      .byte 0             # are we (1)running or (0)entering code? 
        current-line-number: .word 0             # current line number of execution (or entry)
        current-line-ptr:
        current-line-bptr:   .word 0             # will point to the program bank
        current-line-aptr:   .word 0             # pointer to current program line
        
        heap-next-free:      .word 0             # pointer to next free area in heap
        prog-next-free:      .word 0             # pointer to next free area in program storage

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
            call new
            ret
        }


        ########################################################################
        # Resets BASIC's internal state so that a new program can be entered.
        ########################################################################
        new: {
        _main:
            d := 0
            [bdata.forsub-stack-ptr] := d       # forsub stack pointer is reset
            [bdata.current-line-number] := d    # current line number is zero
            d := 1
            [bdata.heap-next-free] := d         # heap starts at 1 (so we avoid NUL)
            [bdata.prog-next-free] := d         # program code starts at 1
            LDPTR(d, x, kmemmap.basic.prog-start)
            [bdata.current-line-bptr] := d      # not pointing anywhere either
            [bdata.current-line-aptr] := x      # not pointing anywhere either
            d := MODE_DIRECT
            [bdata.execution-mode] := d         # direct mode (not running)

            # Initialize variables
            al := 0
            d := 0
            x := kmemmap.basic.vars-start
            y := kmemmap.basic.vars-length
            do {
                dec y
                [d, x, y] := al                 # clear memory
            } while !z

            # initialize line number pointers
            LDPTR(d, x, kmemmap.basic.lptr-start)
            y := kmemmap.basic.lptr-size        # (technically zero)
            do {
                dec y
                [d, x, y] := al                 # clear memory
            } while !z

        _out:
            ret
        }

        ########################################################################
        # Convert the integer in register C to a string (pointed at by D, X)
        #
        # Requires 26 bytes on the stack
        ########################################################################
        itoa: {
            enter 10                            # reserve 10 bytes for an internal buffer
            push a
            push b
            push c
            push d
            push x
            push y
        _main:
            ld b, 10                            # multiplier / modulo
            ld y, 0                             # index to our internal buffer
            mov a, c
            do {
            mov c, a                            # keep a copy of a; mod is going to obliterate it

            mod a, b                            # a = a % 10
            clr c
            add a, 48                           # "0" is 48, so adding this will convert to the ascii character
            st [bp+-10, y], al                  # stuff it in the local buffer (this will be reversed)
            inc y                               # don't overwrite... ;-)

            mov a, c                            # restore a so we can divide it instead
            div a, b                            # a = a / 10

            cmp a, 0x00                         # check if we're done
            } while !z

            dec y                               # back x off by one so we're starting in the right place when
            do {                                # we copy things back in reverse
            ld al, [bp+-10, y]                  # get character (in reverse)
            st [d, x], al                       # store it into the passed buffer (in correct order)
            inc x                               # don't overwrite
            dec y
            } while !c

            ld al, 0x00                         # store terminating NULL
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
        # Is character a letter?
        #
        # @param DL - character to check
        # @flags Z - clear if not a letter; set if a letter
        #######################################################################
        is-char-a-letter: {
            push c
        _main:
            c := 0x5A41
            call is-char-in-range
        _out:
            pop c
            ret
        }

        #
        # Is character alphanumeric? A-Z0-9
        #
        # @param DL - character to check
        # @flags Z - clear if not a letter or digit ; set if a letter or digit
        #######################################################################
        is-char-alphanum: {
        _main:
            call is-char-a-digit
            brs z _out
            call is-char-a-letter
        _out:
            ret
        }

        #
        # Crunches a line input by the user.
        #
        # @param [BP+4, BP+6]: PTR to receiving buffer (must be as large as the input string)
        # @param [BP+8, BP+A]: PTR to line that we want to crunch
        # @returns DL: 0 if no error, or an error number if one occurred
        #          DH: size of resulting crunch
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
            #push d
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

                # 1. numbers are tokenized into their byte forms (TOK_BYTE|TOK_WORD|TOK_DWORD, hi, lo)
                # @todo bytes and double words
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
                exc c
                cmp cl, 0                       # is c a byte? (if so, ch === 0)
                if z {
                    dl := brodata.TOK_BYTE      # Store BYTE token...
                } else {
                    dl := brodata.TOK_WORD      # Store WORD token...
                }
                exc c
                <BP+target>,y := dl             # into the crunched string
                inc y                           # move the index along
                cmp dl, brodata.TOK_WORD
                if z {
                    <bp+target>,y := c          # and now the number itself
                    inc y                       # move the index along
                    inc y                       # move the index along for word size
                } else {
                    <bp+target>,y := cl         # and now the number itself
                    inc y                       # move the index along
                }
                call _set-target-index          # update our target index
                continue                        # back to the TOP

            not-a-number:

                # 2. strings are tokenized into their forms (TOK_STRING, string bytes, 0)
                ###############################################################
                cmp dl, QUOTE                   # is dl a quote?
                brs !Z not-a-string             # nope; not a string

                call _get-target-index          # get next position in crunch target
                dl := brodata.TOK_STRING        # "String" token
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

                # @todo special case REM; all remaining characters should be copied as-is
                continue

            exit-keyword-search:
                b := 4
                add sp, b                       # clean up stack from pushing ptrs
                pop d

            not-a-keyword:
                # 4. Maybe it's a variable (this actually takes more space)
                #    Variables are flagged with an appropiate type token and
                #    ends up making variables take an additional four bytes
                #    since we prepend with the token, the pointer, and the 
                #    length of the variable name. Type sigils are stripped, but
                #    added into the next byte (the pointer) using the top two
                #    bits.
                #       00 = Integer
                #       01 = String
                #       10 = Real
                #       11 = Array
                #
                #    The variable _index_ is also computed. This makes looking
                #    up variables extremely simple during evaluation since the
                #    pointer has already been computed.
                #
                #    Variables are (currently) significant to the first two
                #    characters. Variables must start with an alphabetical
                #    character, and can then end with a letter or a digit.
                #
                #    A pointer is computed as follows:
                #
                #    1. A single character variable is always assigned a value
                #       between 0(A) to 25(Z) using char-65.
                #    2. A multi-character variable is computed by first getting
                #       the initial character, multiplying it by 36 (to account
                #       for 26 letters and 10 digits), and then adding the
                #       second digit. In this scheme, A-Z is given values 0-25
                #       and 0-9 is given values 26-35. (char-22). 
                #       In order to advance past the first 26 variables, we add
                #       26 to the final result.
                #    3. Values are shifted left by 1, to account for pointer
                #       width in the variable tables.
                #    Note: because the maximum variable index is 961, we can
                #    safely use the top two bits for the variable type.
                #
                #    Examples:     (Bytes)                          (Var mapping)
                #       A       -> TOK_VARIABLE,0,  0, 1, "A"        A   -> 0
                #       A0      -> TOK_VARIABLE,0,  104, 2, "A0"     A0  -> 52 << 1
                #       A$      -> TOK_VARIABLE,64, 0, 1, "A"        A   -> 0
                #       NAME$   -> TOK_VARIABLE,67, 240, 4, "NAME"   NA  -> 504 << 1
                #       AVG#    -> TOK_VARIABLE,131,0, 94, "AVG"     AV  -> 47 << 1
                ###############################################################
            check-variable:
                call is-char-a-letter           # variables can only start with alphabetical characters
                br !z not-a-variable
                clr c
                sub dl, ASC("A")                # get letter #

                call _get-target-index
                cl := brodata.TOK_VARIABLE
                <BP+target>,y := cl             # We know we're a variable
                call _adv-target-index          # next target position

                exc d                           # dl -> dh
                call _get-source-index          # advance ahead; is this a one or 2+ char variable?
                dl := <BP+source>,y             # read next char from our source string
                inc y
                call is-char-alphanum           # if this is true, we're 2+ chrs long
                if !z {
                    dec y                       # fix up our character index
                    dl := 0xFF                  # second character is not useful
                } else {
                    clr c
                    sub dl, ASC("A")            # get letter #
                    if n {                      # if negative, we're a digit
                        clr c
                        add dl, 43              # get digit # (+26)
                    }
                }

                c := 0                          # compute the pointer index of our variable
                cmp dl, 0xFF                    # is this a valid character?
                if !z {
                    exc d
                    c := dl
                    x := 36
                    mul c, x                    # c = c * 36
                    clr c
                    x := 26
                    add c, x                    # c = c + 26 to advance past 
                }
                exc d
                clr c
                add c, dl                       # add in our low character
                shl c, 1                        # double to get true index (ints, strings, arrays; reals are wrong)

                call _get-target-index
                push y                          # save this for a little later...
                <BP+target>,y := c              # store pointer
                inc y
                inc y
                call _set-target-index          # advance ahead two

                call _get-source-index          # need to get length of variable name
                dec y
                call _set-source-index          # ... but we're ahead by one
                bl := 0                         
                do {                            # scan ahead to get count of chars
                    inc bl
                    inc y
                    dl := <bp+source>, y        # read next char
                    call is-char-alphanum       
                } while z

                call _get-target-index          # we need to save the count of characters
                <BP+target>,y := bl             # so that when interpreting, we can skip ahead
                call _adv-target-index

                do {
                    call _get-source-index
                    dl := <bp+source>, y
                    call _adv-source-index
                    call _get-target-index
                    <bp+target>, y := dl
                    call _adv-target-index
                    dec bl
                } while !z
                call _get-source-index          # this will either be a sigil, a 0 (end of line), or a symbol
                dl := <bp+source>, y
                x := y                          # save y; we'll need it
                pop y                           # ... and now we're back at the pointer value where we can store the type
                bl := <bp+target>, y
                inc x                           # x is temporarily our source pointer
                cmp dl, ASC("$")                # is it a string?
                if z {
                    or bl, 0b0100_0000          # OR with 64 to mark as a string
                } else {
                    cmp dl, ASC("#")            # is it a real?
                    if z {
                        or bl, 0b1000_0000      # OR with 128 to mark as a real
                    } else {
                        dec x                   # back X off by one; we didn't see a sigil (array doesn't count the same)
                        cmp dl, ASC("(")        # is it an array ref?
                        if z {
                            or bl, 0b1100_0000  # it is!
                        } else {
                        }
                    }
                }
                <bp+target>, y := bl            # write back revised type

                y := x
                call _set-source-index          # make sure to pick up at next position

                continue

            not-a-variable:
                # 5a. Everything else is copied as-is
                # 5b. If char is 0, crunching ends (falls into #4, so we do want to copy it)
                ###############################################################
            everything-else:
                call _get-target-index          # get next character index (y)
                <BP+target>,y := dl             # store to target
                call _adv-target-index          # move it along
            bottom:
                cmp dl, 0                       # was char 0? if so, break
            } while !z
        _out:
            d := 0
            call _get-target-index              # length of crunch!
            dl := yl 
            exc d                               # preserve error message?
            pop b
            pop c
            #pop d
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

        token-not-impl: {
        _main:
            dl := brodata.NOT_IMPLEMENTED
            ret
        }

        handler-clear-screen: {
            call [vectors.CLEAR_SCREEN]
            dl := 0
            ret
        }

        handler-new: {
            call new
            dl := 0
            ret
        }

        token-handlers:
            .word token-not-impl                # 128, ABS
            .word token-not-impl                # 129, AND
            .word token-not-impl                # 130, ASC
            .word token-not-impl                # 131, ATN
            .word token-not-impl                # 132, AT
            .word token-not-impl                # 133, CALL
            .word token-not-impl                # 134, CATALOG
            .word token-not-impl                # 135, CHR
            .word handler-clear-screen          # 136, CLS
            .word token-not-impl                # 137, CLOSE
            .word token-not-impl                # 138, CONTINUE
            .word token-not-impl                # 139, COS
            .word token-not-impl                # 140, DATA
            .word token-not-impl                # 141, DEFFN
            .word token-not-impl                # 142, DEFSUB
            .word token-not-impl                # 143, DIM
            .word token-not-impl                # 144, DO
            .word token-not-impl                # 145, ELSEIF
            .word token-not-impl                # 146, ELSE
            .word token-not-impl                # 147, ENDSUB
            .word token-not-impl                # 148, ENDFN
            .word token-not-impl                # 149, ENDIF
            .word token-not-impl                # 150, END
            .word token-not-impl                # 151, EXP
            .word token-not-impl                # 152, FOR
            .word token-not-impl                # 153, GETKEY
            .word token-not-impl                # 154, GOSUB
            .word token-not-impl                # 155, GOTO
            .word token-not-impl                # 156, HEX
            .word token-not-impl                # 157, HOME
            .word token-not-impl                # 158, IF
            .word token-not-impl                # 159, INPUT
            .word token-not-impl                # 160, INT
            .word token-not-impl                # 161, IN
            .word token-not-impl                # 162, LEFT
            .word token-not-impl                # 163, LEN
            .word token-not-impl                # 164, LIST
            .word token-not-impl                # 165, LOAD
            .word token-not-impl                # 166, LOG
            .word token-not-impl                # 167, LOOP
            .word token-not-impl                # 168, MID
            .word handler-new                   # 169, NEW
            .word token-not-impl                # 170, NEXT
            .word token-not-impl                # 171, NOT
            .word token-not-impl                # 172, ON
            .word token-not-impl                # 173, OPEN
            .word token-not-impl                # 174, OR
            .word token-not-impl                # 175, OUT
            .word token-not-impl                # 176, PEEK
            .word token-not-impl                # 177, POKE
            .word token-not-impl                # 178, PRINT
            .word token-not-impl                # 179, READ
            .word token-not-impl                # 180, REM
            .word token-not-impl                # 181, RETURN
            .word token-not-impl                # 182, RIGHT
            .word token-not-impl                # 183, RND
            .word token-not-impl                # 184, RENAME
            .word token-not-impl                # 185, REMOVE
            .word token-not-impl                # 186, RESTORE
            .word token-not-impl                # 187, RUN
            .word token-not-impl                # 188, SAVE
            .word token-not-impl                # 189, SGN
            .word token-not-impl                # 190, SIN
            .word token-not-impl                # 191, SPC
            .word token-not-impl                # 192, SQR
            .word token-not-impl                # 193, STEP
            .word token-not-impl                # 194, STOP
            .word token-not-impl                # 195, STR
            .word token-not-impl                # 196, TAB
            .word token-not-impl                # 197, TAN
            .word token-not-impl                # 198, THEN
            .word token-not-impl                # 199, TO
            .word token-not-impl                # 200, UNTIL
            .word token-not-impl                # 201, USR
            .word token-not-impl                # 202, VAL
            .word token-not-impl                # 203, WHILE
            .word token-not-impl                # 204, +  
            .word token-not-impl                # 205, -  
            .word token-not-impl                # 206, *
            .word token-not-impl                # 207, /
            .word token-not-impl                # 208, %
            .word token-not-impl                # 209, ^
            .word token-not-impl                # 210, <>, !=
            .word token-not-impl                # 211, <=
            .word token-not-impl                # 212, >=
            .word token-not-impl                # 213, <
            .word token-not-impl                # 214, >
            .word token-not-impl                # 215, =
            .word token-not-impl                # 216, (
            .word token-not-impl                # 217, )
            .word token-not-impl                # 218, [
            .word token-not-impl                # 219, ]
            .word token-not-impl                # 220, :
            .word token-not-impl                # 221, LOWER
            .word token-not-impl                # 222, UPPER
            .word token-not-impl                # 223, LET
            .word token-not-impl                # 224
            .word token-not-impl                # 225
            .word token-not-impl                # 226
            .word token-not-impl                # 227
            .word token-not-impl                # 228
            .word token-not-impl                # 229
            .word token-not-impl                # 230
            .word token-not-impl                # 231
            .word token-not-impl                # 232
            .word token-not-impl                # 233
            .word token-not-impl                # 234
            .word token-not-impl                # 235
            .word token-not-impl                # 236
            .word token-not-impl                # 237
            .word token-not-impl                # 238
            .word token-not-impl                # 239
            .word token-not-impl                # 240
            .word token-not-impl                # 241
            .word token-not-impl                # 242
            .word token-not-impl                # 243
            .word token-not-impl                # 244
            .word token-not-impl                # 245
            .word token-not-impl                # 246
            .word token-not-impl                # 247
            .word token-not-impl                # 248
            .word token-not-impl                # 249
            .word token-not-impl                # 250
            .word token-not-impl                # 251, TOK_VARIABLE
            .word token-not-impl                # 252, TOK_STRING
            .word token-not-impl                # 253, TOK_DWORD
            .word token-not-impl                # 254, TOK_WORD
            .word token-not-impl                # 255, TOK_BYTE

        #
        # gettok returns the next token, and advances
        # 
        # @returns DL: next token
        #
        #######################################################################
        gettok: {
        _main:
            dl := <bdata.current-line-ptr>
            push x
            x := [bdata.current-line-aptr]
            inc x
            [bdata.current-line-aptr] := x
            pop x
        _out:
            ret
        }

        #
        # EVAL is responsible for evaluating the line at D,X
        # 
        # @param [D, X]: PTR to crunched line (either direct or run mode works)
        # @returns DL: 0 if no error, or an error number if one occurred
        #
        #######################################################################
        eval: {
            enter 0x00
            push x
            push a
            push y
            push c
        _main:
            #@todo: handle end of statement/: correctly. Right now "clscls" is valid, even though it should be cls:cls
            y := 0
            do {
                call gettok
                c := dl
                cmp c, 128
                if n {
                    # not an executable token
                    cmp c, 0
                    if z {
                        dl := 0
                        brs _out
                    }
                    dl := brodata.SYNTAX_ERROR
                    brs _out
                }
                clr c
                sub c, 128
                shl c, 1
                x := c
                call [token-handlers, x]
                cmp dl, 0
            } while z
        _out:
            pop c
            pop y
            pop a
            pop x
            exit 0x00
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
            push x                              # BP+10
            push d                              # BP+8
            d := bdata.crunch-buffer >> 3
            x := bdata.crunch-buffer & 7
            push x                              # BP+6
            push d                              # BP+4
            call crunch-line
            exc d
            bl := dl                            # save length of crunch
            exc d
            a := 8
            clr c                               # make sure carry is clear
            add sp, a                           # clean up our stack

            #
            # STEP 3: Store / execute
            #
            LDPTR(d, x, bdata.crunch-buffer)
            al := [d, x]                        # check the first byte of our crunch
            cmp al, brodata.TOK_BYTE            # if it's a byte
            brs z _store                        # ... store the line!
            cmp al, brodata.TOK_WORD            # or if it's a word 
            brs z _store                        # ... store the line

        _eval:
            # @todo write this bit!
            cl := 0
            [bdata.execution-mode] := cl        # 0 = direct
            c := 0xFFFF
            [bdata.current-line-number] := c    # When executing direct, the current line number is always -1
            [bdata.current-line-bptr] := d
            [bdata.current-line-aptr] := x      
            call eval                           # eval uses the above setup to execute code
            brs _display-errors                 # make sure we show any error messages

        _store:
            c := 0                              # "c" will be the current line number
            cmp al, brodata.TOK_BYTE            # how much do we read in?
            if z {
                inc x                           # skip past the token
                dec bl                          # reduce # of chars to copy
                cl := [d, x]                    # only want one byte
                inc x                           # and don't want to copy this one, either
                dec bl                          # reduce # of chars to copy
            } else {
                inc x                           # skip past the token
                dec bl                          # reduce # of chars to copy
                c := [d, x]                     # this one's a word
                inc x
                dec bl                          # reduce # of chars to copy
                inc x
                dec bl                          # reduce # of chars to copy
            }

            # @todo handle DELETING lines instead (bl is 0)

            [bdata.current-line-number] := c
            a := [bdata.prog-next-free]         # get next free address so we can write to it
            [bdata.current-line-aptr] := a

            # move the heap along
            a := [bdata.prog-next-free]
            clr c
            add a, bl
            [bdata.prog-next-free] := a

            # d,x is now at the portion where we can copy to the correct location
            # and bl has the number of crunched characters to copy (plus 1)
            y := bl
            dec y
            do {
                al := [d, x, y]                     # get byte
                <bdata.current-line-bptr>, y := al  # and write 
                dec y
            } while !c

            # write the address to our line # pointer 
            LDPTR(d, x, kmemmap.basic.lptr-start)
            shl c, 1                            # multiply by two, since it's now becoming a pointer
            clr c                               # don't forget to clear carry
            y := c                              # move ahead the right amount
            b := [bdata.current-line-aptr]
            [d, x, y] := b                      # write our pointer
            br _get-line


        _display-errors:
            #
            # STEP 4: Display errors
            #
            c := 0
            cmp dl, 0
            if !z {
                call print-error
            }

            #
            # STEP 5: Do it again
            #
            # TEMP: Display what we got
            #d := bdata.crunch-buffer >> 3
            #x := bdata.crunch-buffer & 7
            #call [vectors.PRINT_RAW]
            #d := brodata.newline >> 3
            #x := brodata.newline & 7
            #call [vectors.PRINT]                 # NEWLINE, to be neat
            br _ready
            ret
        }
    }
}