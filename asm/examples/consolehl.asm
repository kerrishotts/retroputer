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

    ld a, data.str
    do {
        calls print
        dec c
    } while !c

    ld a, data.crlf
    calls print

    brk

print:
    {
        push d                              # be nice citizens by saving values
        push x
        push a
        mov d, a                            # D must have the address to print
        ld x, 0x0000                        # x is our index
        ld a, 0x0000                        # zero A to get it ready for loding characters
        do {
            ld al, [D,X]                        # A should be the desired character
            cmp al, 0x00                        # check if NUL
            if !z {
                out 0x82, al                        # write to CON:SEND
                ld al, 0b10                         # indicate write
                out 0x80, al                        # ...on CON:CTRL
                do {
                    in al, 0x83                     # wait for ACK
                } while z
                inc x                               # next character
                continue
            }
        } while !z
        pop a
        pop x
        pop d                               # cleaned up, ready to go back
        ret
    }

}
