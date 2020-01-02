.segment data 0x03000 {
    num: .word 1000                    # number to start counting down from
    buffer: .byte[11]
    start: .string "T MINUS ..."
        .byte 0x00
    finish: .string "... and LIFTOFF!"
        .byte 0x00
    crlf: .byte 13, 10                  ## CR/LF
        .byte 0x00
    space: .byte 32, 00
}
.segment code 0x02000 {
    ld a, 1000
    st [data.num], a
    ld d, data.crlf >> 3
    ld x, data.crlf  & 7
    call print

    ld d, data.start >> 3
    ld x, data.start  & 7               # Print T MINUS...
    call print
    
    ld d, data.crlf >> 3
    ld x, data.crlf  & 7
    call print

    do {
        ld c, [data.num]                # convert num to a string
        ld d, data.buffer >> 3
        ld x, data.buffer  & 7
        call itoa
        call print
        
        ld d, data.space >> 3
        ld x, data.space  & 7
        call print

        ld c, [data.num]                # decrease num
        dec c
        st [data.num], c
    } while !c                          # keep doing so until CARRY

    ld d, data.finish >> 3                   # Liftoff!
    ld x, data.finish &  7
    call print
    
    ld d, data.crlf >> 3
    ld x, data.crlf  & 7
    call print

    brk                                 # done!

itoa:
    {
        ########################################################################
        # Convert the integer in register C to a string (pointed at by D, X)
        #
        # Requires 26 bytes on the stack
        ########################################################################

        enter 10                        # reserve 10 bytes for an internal buffer
        push a
        push b
        push c
        push d
        push x
        push y

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

        pop y
        pop x
        pop d
        pop c
        pop b
        pop a
        exit 10

        ret
    }

print-char:
    {                                   # NOTE: destructive for A!
        out 0x82, al                    # write to CON:SEND
        ld al, 0b10                     # indicate write
        out 0x80, al                    # ...on CON:CTRL
        do {
            in al, 0x83                 # wait for ACK
        } while z                       # if ACK, z is UNSET
        ret
    }

print-char-to-screen:
    {
        push d
        mov dl, al
        call [PUT_CHAR]
        pop d
        ret
    }

print:
    {
        enter 0x00                      # prints a string using str-iter
        push c                          # save C
        ld c, print-char-to-screen      # get address of print-char
        call str-iter                   # and call str-iter (expecting C to have our callback)
        ld c, print-char                # get address of print-char
        call str-iter                   # and call str-iter (expecting C to have our callback)
        pop c                           # done ... clean up
        exit 0x00
        ret
    }

str-iter:
    {
        enter 0x00
        push c                          # C has the address of the callback
        push a                          # A has the address of the string
        push d                          # D will get used (save it)
        push x                          # X will get used (save it)
        push y

        # logic
        ld y, 0x0000                    # x is our index
        ld a, 0x0000                    # zero A to get it ready for loding characters
        do {
            ld al, [d, x, y]               # A should be the desired character
            cmp al, 0x00                # check if NUL
            if !z {
                call [BP+-2]            # callback! (say, print the character?)
                inc y                   # next character
                continue
            }
        } while !z                      # until NULL

        pop y
        pop x
        pop d
        pop a
        pop c
        exit 0x00
        ret
    }

}
