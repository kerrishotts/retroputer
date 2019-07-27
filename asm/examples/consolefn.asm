.segment data 0x02000 {
    str: .string "Hello, world! I'm alive! "
        .byte 0x00
    crlf: .byte 13, 10                  ## CR/LF
        .byte 0x00
}
.segment code 0x03000 {
    # set up the stack for now
    ld sp, 0x02000
    ld bp, 0x02000

    ld a, data.crlf
    calls print

    # Write the string to the console a lot of times :-)
    ld c, 0x1000

    {
    _loop:
        ld a, data.str
        calls print

        loop _loop, c
    }

    ld a, data.crlf
    calls print

    brk

print-char:
    {
    brk
        push a
        out 0x82, al                        # write to CON:SEND
        ld al, 0b10                         # indicate write
        out 0x80, al                        # ...on CON:CTRL
        {
        _loop:
            in al, 0x83                     # wait for ACK
            brs z _loop                     # ...will be non-zero when ACK'd
        }
        pop a
        ret
    }

print:
    {
        push c
        ld c, print-char
        calls str-iter
        pop c
        ret
    }

str-iter:
    {
        # preamble
        push bp                             # Save stack frame
        push c                              # C has the address of the callback
        push a                              # A has the address of the string
        push d                              # D will get used (save it)
        push x                              # X will get used (save it)
        mov bp, sp

        # logic
        mov d, a                            # D must have the address to print
        ld x, 0x0000                        # x is our index
        ld a, 0x0000                        # zero A to get it ready for loding characters
        {
        _loop:
            ld al, [D,X]                    # A should be the desired character
            cmp al, 0x00                    # check if NUL
            brs z _done                     # ... if NUL, we're done!
            ld c, [BP+6]
            brk
            call [BP+6]                     # callback!
            brk
            inc x                           # next character
            brs _loop                       # go back for another round
        }
    _done:

        # postamble
        pop x
        pop d
        pop a
        pop c
        pop bp                              # Restore stack frame
        ret
    }

}
