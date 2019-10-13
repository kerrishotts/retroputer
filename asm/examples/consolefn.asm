.segment data 0x03000 {
    str: .string "Hello, world! I'm alive! "
        .byte 0x00
    crlf: .byte 13, 10                  ## CR/LF
        .byte 0x00
}
.segment code 0x02000 {
    # set up the stack for now
    ld sp, 0x02000
    ld bp, 0x02000

    ld a, data.crlf
    calls print

    # Write the string to the console a lot of times :-)
    ld c, 0x1000

    do {
        ld a, data.str
        calls print
        dec c
    } while !c

    ld a, data.crlf
    calls print

    brk

print-char:
    {
        enter 0x00
        push a
        out 0x82, al                        # write to CON:SEND
        ld al, 0b10                         # indicate write
        out 0x80, al                        # ...on CON:CTRL
        do {
            in al, 0x83                     # wait for ACK
        } while z
        pop a
        exit 0x00
        ret
    }

print:
    {
        enter 0x00
        push c
        ld c, print-char
        calls str-iter
        pop c
        exit 0x00
        ret
    }

str-iter:
    {
        # preamble
        enter 0x00
        push c                              # C has the address of the callback
        push a                              # A has the address of the string
        push d                              # D will get used (save it)
        push x                              # X will get used (save it)

        # logic
        mov d, a                            # D must have the address to print
        ld x, 0x0000                        # x is our index
        ld a, 0x0000                        # zero A to get it ready for loding characters
        do {
            ld al, [D,X]                    # A should be the desired character
            cmp al, 0x00                    # check if NUL
            if !z {
                call [BP+-2]                     # callback!
                inc x                           # next character
                continue
            }
        } while !z

        # postamble
        pop x
        pop d
        pop a
        pop c
        exit 0x00
        ret
    }

}
