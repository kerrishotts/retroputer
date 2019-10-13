.segment data 0x03000 {
    num: .word 1000                    # number to start counting down from
    buffer: .byte 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    start: .string "T MINUS ..."
        .byte 0x00
    finish: .string "... and LIFTOFF!"
        .byte 0x00
    crlf: .byte 13, 10                  ## CR/LF
        .byte 0x00
}
.segment code 0x02000 {
    ld sp, 0x02000                      # Initialize the stack
    ld bp, 0x02000

    ld a, data.crlf
    call print

    ld a, data.start                    # Print T MINUS...
    call print
    ld a, data.crlf
    call print

    do {
        ld a, [data.num]                # convert num to a string
        ld d, data.buffer
        call itoa

        ld a, data.buffer               # print the number to the console
        call print
        ld a, data.crlf
        call print

        ld a, [data.num]                # decrease num
        dec a
        st [data.num], a
    } while !c                          # keep doing so until CARRY

    ld a, data.finish                   # Liftoff!
    call print
    ld a, data.crlf
    call print

    brk                                 # done!

itoa:
    {
        ########################################################################
        # Convert the integer in register A to a string (pointed at by D)
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
        ld x, 0                         # index to our internal buffer
        do {
           mov c, a                     # keep a copy of a; mod is going to obliterate it

           mod a, b                     # a = a % 10
           add a, 48                    # "0" is 48, so adding this will convert to the ascii character
           st [bp+-10, x], al           # stuff it in the local buffer (this will be reversed)
           inc x                        # don't overwrite... ;-)

           mov a, c                     # restore a so we can divide it instead
           div a, b                     # a = a / 10

           cmp a, 0x00                  # check if we're done
        } while !z

        dec x                           # back x off by one so we're starting in the right place when
        do {                            # we copy things back in reverse
           ld al, [bp+-10, x]           # get character (in reverse)
           st [d], al                   # store it into the passed buffer (in correct order)
           inc d                        # don't overwrite
           dec x
        } while !c

        ld al, 0x00                     # store terminating NULL
        st [d], al

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

print:
    {
        enter 0x00                      # prints a string using str-iter
        push c                          # save C
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

        # logic
        mov d, a                        # D must have the address to print
        ld x, 0x0000                    # x is our index
        ld a, 0x0000                    # zero A to get it ready for loding characters
        do {
            ld al, [d, x]               # A should be the desired character
            cmp al, 0x00                # check if NUL
            if !z {
                call [BP+-2]            # callback! (say, print the character?)
                inc x                   # next character
                continue
            }
        } while !z                      # until NULL

        pop x
        pop d
        pop a
        pop c
        exit 0x00
        ret
    }

}
