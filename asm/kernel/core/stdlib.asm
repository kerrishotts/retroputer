########################################
#
# Retroputer Kernel : Core : Standard Library
#
########################################

.namespace stdlib {
    .segment kcode kmemmap.kernel.code-start .append {

        ########################################################################
        # Convert the integer in register C to a string (pointed at by D, X)
        #
        # Buffer needs enough room to store a number for the given radix:
        #
        #     RADIX   BUFFER SIZE
        #         2   17 (16 + NUL)
        #         8   9  (8 + NUL)
        #        10   6  (5 + NUL)
        #        16   5  (4 + NUL)
        #
        # Note: Above does not include any additional padding in BH
        #
        # @param C    numToConvert               number to convert
        # @param BL   radix                      2 (binary), 8 (octal), 10 (decimal), 16 (hexadecimal)
        # @param BH   padding                    # of minimum characters to render
        # @param D,X  (PTR) target               buffer for converted number
        # @return NUL
        ########################################################################
        u16-to-str: {
            enter 17                             # needs a 17-byte buffer (16 characters + NUL)
            .const buffer -17
            pushf
            push a
            push b
            push c
            push d
            push x
            push y
        _main:
            y := 0                               # index to our internal buffer
            a := c
            do {
                c := a                           # keep a copy of a; mod is going to obliterate it
                mod a, bl                        # a = a % radix
                clr c
                add a, asc("0")                  # "0" is 48, so adding this will convert to the ascii character
                cmp a, asc("9") + 1
                if !n {
                    add a, 7                     # a > "9", so add 7 to get it to "A"
                }
                [bp+buffer, y] := al             # stuff it in the local buffer (this will be reversed)
                inc y                            # don't overwrite... ;-)

                a := c                           # restore a so we can divide it instead
                div a, bl                        # a = a / radix

                cmp a, 0x00                      # check if we're done
            } while !z

            # do we need to add additional padding?
            exc b                                # padding is in BH
            cmp yl, bl
            if n {
                al := asc("0")
                do {
                    [bp+buffer, y] := al
                    inc y
                    cmp yl, bl
                } while n
            }

            dec y                                # back x off by one so we're starting in the right place when
            do {                                 # we copy things back in reverse
                al := [bp+buffer, y]             # get character (in reverse)
                [d, x] := al                     # store it into the passed buffer (in correct order)
                inc x                            # don't overwrite
                dec y
            } while !c

            al := 0                              # store terminating NULL
            [d, x] := al
        _out:
            pop y
            pop x
            pop d
            pop c
            pop b
            pop a
            popf
            exit 17

            ret
        }

        ########################################################################
        # Convert the signed integer in register C to a string (pointed at by D, X)
        #
        # Buffer needs enough room to store a number for the given radix:
        #
        #     RADIX   BUFFER SIZE
        #         2   18 (SIGN + 16 + NUL)
        #         8   10 (SIGN + 8 + NUL)
        #        10   7  (SIGN + 5 + NUL)
        #        16   6  (SIGN + 4 + NUL)
        #
        # Note: Above does not include any additional padding in BH
        #
        # @param C    numToConvert               signed number to convert
        # @param BL   radix                      2 (binary), 8 (octal), 10 (decimal), 16 (hexadecimal)
        # @param BH   padding                    # of minimum characters to render
        # @param D,X  (PTR) target               buffer for converted number
        # @return NUL
        ########################################################################
        i16-to-str: {
            pushf
            push a
        _main:
            cmp c, 0x0000
            if n {
                al := ASC("-")                   # negative sign
                neg c                            # two's complement
            } else {
                al := ASC(" ")                   # positive has no sign
            }
            [d, x] := al
            inc x                                # bump the buffer pointer by 1
            call u16-to-str                      # we're unsigned now, continue conversion
            dec x                                # and back, in case caller depends on it
        _out:
            pop a
            popf
            ret
        }

        ########################################################################
        #
        # STRCMP
        #
        # Compares two strings and returns if the first string is equal to, 
        # less than, or greater than the second string. Both strings must be NUL
        # terminated.
        #
        # @param D,X            (PTR) String A      First string to compare
        # @param [BP+4,BP+6]    (PTR) String B      Second string to compare
        # @param FLAGS
        #   @flag Z     if set, check for full equality (NULs must be in the same location)
        #               if not set, bails with +Z/-N when first NUL is encountered (in string a)
        # @return FLAGS
        #   @flag Z     set when equal; clear when unequal
        #   @flag N     set when less than; clear when equal or greater than
        # @return C     number of characters compared
        ########################################################################
        strcmp: {
            enter 0x00
            push a
            push b
            push d
            push y
            pushf
            if Z {
                bl := 0x00                  # Checking for full equality
            } else {
                bl := 0x01                  # only checking for partial equality
            }
        _main:
            y := 0                          # start of string
        top:
            cl := [d, x, y]                 # character in string A
            al := <bp+4>,y                  # character in string B
            cmp bl, 0x01                    # check if we're doing full equality
            if Z {
                cmp cl, 0                   # we're not, so check for an early nul in string b
                brs Z strings-are-equal       # if it's NUL, we calling them equal
            }
            cmp cl, al                      # check character
            if Z {
                cmp cl, 0                   # equal, but check for NUL
                brs Z strings-are-equal     # NUL reached, strings are equal
                inc y                       # next character
                brs top                     # not NUL, so keep going...
            }

            # if here, the strings aren't equal
            if N {
                popf                        # string is less than
                set N
                clr Z
                brs _out
            } else {
                popf                        # string is greater than
                clr N
                clr Z
                brs _out
            }

        strings-are-equal:
            popf
            clr N                           # Not less than
            set Z                           # but Equal

        _out:
            c := y                          # make sure we know how many chars where compared
            pop y
            pop d
            pop b
            pop a
            exit 0x00
            ret
        }

    }
}