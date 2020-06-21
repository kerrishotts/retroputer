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

        ########################################################################
        #
        # STACK ROUTINES
        #
        # Stacks are simple structures constructed as follows:
        #
        # offset 0, 1: stack index (0-based, not adjusted for word)
        # offset 2, 3: first word on stack
        # offset 4, 5: second word on stack, etc.
        #
        # There are no bounds checks for going beyond the _length_ of the stack
        # -- that's up to the developer to do, although the flags are left 
        # unmodified from the stack index manipulation.
        #
        ########################################################################

        ########################################################################
        #
        # STACK-POP 
        #
        # Pops a word from the stack pointed to by D,X
        #
        # @param D,X            (PTR) Stack         Stack
        # @param @flag.Z        Peek or Pop?        if SET, PEEK
        # @return C             Word                Word on top of stack
        # @return FLAGS
        #   @flag Z             if set, index is now at the beginning of the stack
        #   @flag N / @flag C   if set, stack is underflowed
        #   @flag EX            if set, stack was empty
        ########################################################################
        stack-pop: {
            enter 0x00
            push y
            pushf                               # for later...
        _main:
            y := [d, x]                         # get stack index
            dec y                               # is stack about to underflow?
            if c {
                popf                            # undo first push
                set n                           # set negative
                set c                           # and carry
                set ex                          # and exception flag
                brs _out                        # to indicate a bad pop
            }
            inc y                               # put y back where we need it
            push y                              # push for later
            shl y, 1                            # * 2 (dealing with words)
            c := [d, x, y]                      # read word at index (this will be off by one, but that's what we want)
            pop y                               # y is back to normal
            popf                                # pop flags so we can see if we're peeking or popping
            brs z _out                          # if zero was set at call, we're PEEKing, not POPping
            dec y                               # reduce stack index
            [d, x] := y                         # and store
            clr ex
        _out:
            pop y
            exit 0x00
            ret
        }

        ########################################################################
        #
        # STACK-PUSH
        #
        # Pushes a word onto the stack pointed to by D,X
        #
        # @param D,X            (PTR) Stack         Stack
        # @param C              Word                Word to push
        # @return FLAGS
        #   @flag Z             if set, index is now at the beginning of the stack
        #   @flag N / @flag C   if set, stack is underflowed
        ########################################################################
        stack-push: {
            enter 0x00
            push y
        _main:
            y := [d, x]                         # get stack index
            push y                              # push for later
            shl y, 1                            # * 2 (dealing with words)
            push x                              # stash...
            inc x
            inc x                               # advance x past the index
            [d, x, y] := c                      # store word at index (not off-by-one as in pop)
            pop x                               # back at the front
            pop y                               # y is back to normal
            inc y                               # increment stack index
            [d, x] := y                         # and store
        _out:
            pop y
            exit 0x00
            ret
        }

        ########################################################################
        #
        # HEAP ROUTINES
        #
        # Heaps are single contiguous areas of memory where new items can be
        # added at the first available free slot. While heap management can be
        # very sophisticated, our heaps are very dumb: they'll fill up fast and
        # need to be garbage collected.
        #
        # offset 0, 1: first free byte (FREPTR) (e.g. 0x0004)
        # offset 2, 3: size of heap (HEAPSZ) (e.g. 0xFFFC)
        # offset 4, 5...: data in block
        #
        # When a new item needs to be added to the heap, a range check is
        # performed. If there is insufficient space, EX is set so that the code
        # knows that a failure occurred. Furthermore, a NUL pointer will be
        # returned (instead of an actual pointer)
        #
        ########################################################################

        ########################################################################
        #
        # MAKE-HEAP
        #
        # Creates a heap. The largest heap that can be created is 0xFFFC bytes,
        # but there is no check done here. Furthermore, heaps must not span
        # bank boundaries.
        #
        # @param D,X            (PTR) Heap          Heap 
        # @param C              Size                Size of Heap
        #
        ########################################################################
        make-heap: {
            enter 0x00
            push y
        _main:
            y := 2
            [d, x, y] := c                      # set heap size
            y := 4
            [d, x] := y                         # set pointer to first free spot 
        _out:
            pop y
            exit 0x00
            ret
        }

        ########################################################################
        #
        # GET_HEAP_FREE
        #
        # Returns the amount of space available in the heap.
        #
        # @param D,X            (PTR) Heap          Heap 
        # @return C             Size                Requested size of block
        #
        ########################################################################
        get-heap-free: {
            enter 0x00
            push y
        _main:
            y := 2
            c := [d, x, y]                      # c is HEAP SIZE
            y := [d, x]                         # y is FREPTR
            clr c
            sub c, y                            # size is HEAPSZ-FREPTR
        _out:
            pop y
            exit 0x00
            ret
        }

        ########################################################################
        #
        # ALLOC
        #
        # Allocates memory on the heap. If there is space, a pointer to the new
        # block will be returned. If there isn't space, EX will be set and the
        # pointer will be NULL.
        #
        # @param D,X            (PTR) Heap          Heap 
        # @param C              Size                Requested size of block
        # @return D,X           (PTR) Block         Pointer to block.
        # @return FLAGS
        #   @flag EX            if set, heap didn't have enough space
        #
        ########################################################################
        alloc: {
            enter 0x00
            push y
            push b
            push a
        _main:
            y := 2
            b := [d, x, y]                      # B is the size of the heap
            a := [d, x]                         # A is the FREPTR
            add a, c                            # do we have space?
            cmp a, b                            # if a < b, we do
            if !n {
                set ex                          # nope!
                d := 0
                x := 0                          # NULL pointer
                br _out
            }
            clr ex                              # we had enough space
            b := [d, x]                         # FREPTR will be what we want to return
            [d, x] := a                         # FREPTR = FREPTR + Size
            clr c
            add x, b                            # X needs to point to base of heap (X) plus FREPTR
        _out:
            pop a
            pop b
            pop y
            exit 0x00
            ret
        }
    }
}