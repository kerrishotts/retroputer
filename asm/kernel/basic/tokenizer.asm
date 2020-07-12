.segment __current__ kmemmap.basic.code-start .append {
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
        bl := 0                                             # tracks if we're in quote mode
        do {
            al := [d, x, y]
            cmp al, constants.QUOTE
            if z {
                # QUOTE!
                xor bl, 0xFF                                # toggle quote mode on and off
            }
            cmp bl, 0xFF
            if !z {
                # not in quote mode, do uppercase handling
                cmp al, 97
                if !n {
                    cmp al, 123
                    if n {
                        and al, 0b11011111                  # to uppercase (zero bit 5)
                        [d, x, y] := al
                    }
                }
            }
            inc y
            cmp al, 0x00
        } while !z
        al := brodata.EXPECTED_A_QUOTE                      # check if we have unbalanced
        and al, bl                                          # quotes -- if so, return it
        dl := al                                            # return value 
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
        pushf                                               # push flags so we can only affect C
    _main:
        cmp dl, cl
        brs N not-a-number                                  # char is < cl
        exc c                                               # ch is now in cl
        cmp dl, cl                                          # 
        brs Z is-a-number                                   # char is = cl, so in range
        brs !N not-a-number                                 # char is > cl, so out of range
    is-a-number:
        popf                                                # only affect the C flag
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
    # Is character hex? A-F0-9
    #
    # @param DL - character to check
    # @flags Z - clear if not a letter or digit ; set if a letter or digit
    #######################################################################
    is-char-a-hex: {
    _main:
        call is-char-a-digit
        brs z _out
        push c
        c := 0x4641
        call is-char-in-range
        pop c
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
        enter 0x06
        .const target 4
        .const source 8
        .const sourceBank 8
        .const sourceAddr 10
        .const sourceIndex -2
        .const targetIndex -4
        .const expectUnary -6
        push x
        push y
        #push d
        push c
        push b
    _main:
        y := 1
        [bp+expectUnary] := y                               # we're expecting a unary minus (negative) if we see a "-"
        y := 0
        [bp+sourceIndex] := y                               # we're at position 0 in both
        [bp+targetIndex] := y                               # source and target strings
        dl := 0
        do {
            call _get-source-index                          # get next character index (y)
            dl := <BP+source>,y                             # read next char from our source string
            call _adv-source-index

            # crunching works in a few ways:
            # 0. we don't want to encode more than one SPACE at a time
            ###############################################################
            cmp dl, constants.SPACE                         # we won't encode spaces; instead
            if z {
    _eat-space:
                dl := <BP+source>,y                         # read next char from our source string
                cmp dl, constants.SPACE
                if z {
                    inc y
                    brs _eat-space                          # back for more
                }
                call _set-source-index
                dl := constants.SPACE                       # make sure we store a SPACE
                br everything-else
            }

            # 1. numbers are tokenized into their byte forms (TOK_BYTE|TOK_WORD|TOK_DWORD, hi, lo)
            # @todo bytes and double words
            ###############################################################
            call is-char-a-digit
            br !z not-a-number                              # nope, not a digit

            # we're a number; let's convert it
            c := 0                                          # start from zero
            b := 10                                         # base 10
            call _get-source-index                          # y = next character index
        cvt-number-loop:
            clr c                                           # don't forget about the carry flag!
            sub dl, asc("0")                                # get to the range 0x00 - 0x09
            mul c, b                                        # shift c left by an order of magnitude
            cmp dl, 10
            if !n {                                         # handle hex letters
                clr c
                sub dl, 7
            }
            cmp dl, bl
            br !n end-of-number                             # ... if out of range, escape!
            clr c                                           # ... and again
            add c, dl                                       # add our digit to c


            dl := <BP+source>,y                             # read next char from our source string
            cmp dl, asc("X")                                # is it a hex number?
            if z {
                cmp c, 0
                if !z {                                     # can't switch to hex if we've seen decimals
                    dl := brodata.SYNTAX_ERROR
                    br _out
                }
                dl := asc("0")                              # simulate a zero instead
                bl := 16
                br _continue-digit
            }
            cmp bl, 10
            if z {
                call is-char-a-digit
            } else {
                call is-char-a-hex
            }
            br !z end-of-number                             # nope, number is over
        _continue-digit:
            inc y                                           # move the index along
            br cvt-number-loop                              # go back around
        end-of-number:
            call _set-source-index                          # save source character index
            call _get-target-index                          # get next position in crunch target
            exc c
            cmp cl, 0                                       # is c a byte? (if so, ch === 0)
            if z {
                dl := brodata.TOK_BYTE                      # Store BYTE token...
            } else {
                dl := brodata.TOK_WORD                      # Store WORD token...
            }
            exc c
            <BP+target>,y := dl                             # into the crunched string
            inc y                                           # move the index along
            cmp dl, brodata.TOK_WORD
            if z {
                <bp+target>,y := c                          # and now the number itself
                inc y                                       # move the index along
                inc y                                       # move the index along for word size
            } else {
                <bp+target>,y := cl                         # and now the number itself
                inc y                                       # move the index along
            }
            call _set-target-index                          # update our target index

            call _expect-subtract                           # "-" after number is subtraction
            continue                                        # back to the TOP

        not-a-number:

            # 2. strings are tokenized into their forms (TOK_STRING, string bytes, 0)
            ###############################################################
            cmp dl, constants.QUOTE                         # is dl a quote?
            brs !Z not-a-string                             # nope; not a string

            call _get-target-index                          # get next position in crunch target
            dl := brodata.TOK_CODE_STRING                   # "String" token
            <bp+target>,y := dl                             # Store it into the crunch target
            call _adv-target-index

        still-a-string:
            call _get-source-index
            dl := <bp+source>,y                             # get string character
            call _adv-source-index
            cmp dl, constants.QUOTE                         # if it's a quote, we can zero it
            if Z { 
                dl := 0 
            }
            call _get-target-index
            <bp+target>,y := dl                             # write to target
            call _adv-target-index
            cmp dl, 0                                       # are we done?
            brs !Z still-a-string                           # no, keep going
            call _expect-subtract                           # "-" after string is subtraction
            continue                                        # next!

        not-a-string:
            # 3. keywords are converted into their token byte (0x80-0xFC)
            ###############################################################
            c := 0x7E21                                     # next, check if we might start with a
            call is-char-in-range                           # character that could be a keyword or
            br !Z not-a-keyword                             # operator

            push d  
            LDPTR(d, x, brodata.keywords)                   # we're potentially a keyword, so
                                                            # get the location of our keyword list

            b := [bp+sourceAddr]                            # get address of our current source
            clr c
            add b, y                                        # ... now were at the right spot
            dec b                                           # ... except we weren't!
            push b                                          # and put it on the stack so that we
            b := [bp+sourceBank]                            # can call STRCMP correctly
            push b

        search-keywords:
            bl := [d, x]                                    # get first character of current token
            cmp bl, constants.NUL                           # if it's NUL, we've exhausted the list
            brs Z exit-keyword-search                       # so we're clearly not a keyword
            clr Z                                           # compare strings, but with partial equality
            call [vectors.STRCMP]                           # so that our source doesn't need NUL between
                                                            # tokens; c will now be how many chars got compared
            if !Z {
                #clr c                                       # clear the carry
                do {
                    inc x
                    bl := [d, x]
                    cmp bl, constants.NUL
                } while !z                                  # advance the rest of the token
                inc x
                inc x                                       # ... and one more past the token  # in the table
                brs search-keywords                         # and keep going
            }
            clr c
            add x, c
            inc x
            bl := [d, x]                                    # should be the token  #
            call _handle-unary                              # check what we should do with "-"
            call _get-target-index
            <bp+target>,y := bl                             # write to target
            call _adv-target-index
            call _get-source-index                          # advance past the token in the source
            clr c
            add y, c
            dec y
            call _set-source-index

            b := 4
            add sp, b                                       # clean up stack from pushing ptrs
            pop d

            # @todo special case REM; all remaining characters should be copied as-is
            continue

        exit-keyword-search:
            b := 4
            add sp, b                                       # clean up stack from pushing ptrs
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
            #       AVG#    -> TOK_VARIABLE,131,0, 3, "AVG"      AV  -> 47 << 1
            ###############################################################
        check-variable:
            call is-char-a-letter                           # variables can only start with alphabetical characters
            br !z not-a-variable
            clr c
            sub dl, ASC("A")                                # get letter

            call _get-target-index
            cl := brodata.TOK_VARIABLE
            <BP+target>,y := cl                             # We know we're a variable
            call _adv-target-index                          # next target position

            exc d                                           # dl -> dh
            call _get-source-index                          # advance ahead; is this a one or 2+ char variable?
            dl := <BP+source>,y                             # read next char from our source string
            inc y
            call is-char-alphanum                           # if this is true, we're 2+ chrs long
            if !z {
                dec y                                       # fix up our character index
                dl := 0xFF                                  # second character is not useful
            } else {
                clr c
                sub dl, ASC("A")                            # get letter num
                if n {                                      # if negative, we're a digit
                    clr c
                    add dl, 43                              # get digit num (+26)
                }
            }

            c := 0                                          # compute the pointer index of our variable
            cmp dl, 0xFF                                    # is this a valid character?
            if !z {
                exc d
                c := dl
                x := 36
                mul c, x                                    # c = c * 36
                clr c
                x := 26
                add c, x                                    # c = c + 26 to advance past 
            }
            exc d
            clr c
            add c, dl                                       # add in our low character
            shl c, 1                                        # double to get true index (ints, strings, arrays; reals are wrong)

            call _get-target-index
            push y                                          # save this for a little later...
            <BP+target>,y := c                              # store pointer
            inc y
            inc y
            call _set-target-index                          # advance ahead two

            call _get-source-index                          # need to get length of variable name
            dec y
            call _set-source-index                          # ... but we're ahead by one
            bl := 0                         
            do {                                            # scan ahead to get count of chars
                inc bl
                inc y
                dl := <bp+source>, y                        # read next char
                call is-char-alphanum       
            } while z

            call _get-target-index                          # we need to save the count of characters
            <BP+target>,y := bl                             # so that when interpreting, we can skip ahead
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
            call _get-source-index                          # this will either be a sigil, a 0 (end of line), or a symbol
            dl := <bp+source>, y
            x := y                                          # save y; we'll need it
            pop y                                           # ... and now we're back at the pointer value where we can store the type
            bl := <bp+target>, y
            inc x                                           # x is temporarily our source pointer
            cmp dl, ASC("$")                                # is it a string?
            if z {
                or bl, 0b0100_0000                          # OR with 64 to mark as a string
            } else {
                cmp dl, ASC("#")                            # is it a real?
                if z {
                    or bl, 0b1000_0000                      # OR with 128 to mark as a real
                } else {
                    dec x                                   # back X off by one; we didn't see a sigil (array doesn't count the same)
                    cmp dl, ASC("(")                        # is it an array ref?
                    if z {
                        or bl, 0b1100_0000                  # it is!
                    } else {
                    }
                }
            }
            <bp+target>, y := bl                            # write back revised type

            y := x
            call _set-source-index                          # make sure to pick up at next position

            call _expect-subtract                           # "-" after variable is subtraction
            continue

        not-a-variable:
            # 5a. Everything else is copied as-is
            # 5b. If char is 0, crunching ends (falls into #4, so we do want to copy it)
            ###############################################################
        everything-else:
            call _get-target-index                          # get next character index (y)
            <BP+target>,y := dl                             # store to target
            call _adv-target-index                          # move it along
        bottom:
            cmp dl, 0                                       # was char 0? if so, break
        } while !z
        dl := 0                                             # if we get here, no errors
    _out:
        #d := 0
        exc d
        call _get-target-index                              # length of crunch!
        dl := yl 
        exc d                                               # preserve error message?
        pop b
        pop c
        #pop d
        pop y
        pop x
        exit 0x06
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
    _handle-unary:
        cmp bl, brodata.TOK_SUB
        if z {
            push y
            push c
            y := [bp+expectUnary]                           # read unary expectation
            c := 1
            cmp y, c                                        # is y set?
            if z {
                bl := brodata.TOK_NEG                       # yes; we're a unary minus
            }
            pop c
            pop y
        }
        cmp bl, brodata.TOK_RPAR
        if z {
            call _expect-subtract                           # A "-" after ")" indicates subtraction
        } else {
            call _expect-unary                              # Only a unary minus makes sense
        }
        ret
    _expect-subtract:
        push y
        y := 0
        [bp+expectUnary] := y                               # A "-" is now treated as a subtract
        pop y
        ret
    _expect-unary:
        push y
        y := 1
        [bp+expectUnary] := y                               # A "-" is now treated as a unary minus (negative)
        pop y
        ret
    }
}