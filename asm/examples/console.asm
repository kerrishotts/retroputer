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

    ld d, data.crlf >> 3
    ld x, data.crlf & 0b111
    calls print

    # Write the string to the console a lot of times :-)
    ld c, 0x1000

    ld d, data.str >> 3
    ld x, data.str & 0b111
    {
    _loop:
        calls print
        loops _loop, c
    }

    ld d, data.crlf >> 3
    ld x, data.crlf & 0b111
    calls print

    brk

print:
    {
        push d                              # be nice citizens by saving values
        push x
        push y
        push a
        ld y, 0x0000                        # y is our index
        ld a, 0x0000                        # zero A to get it ready for loading characters
        {
        _loop:
            ld al, [D,X,Y]                        # A should be the desired character
            cmp al, 0x00                        # check if NUL
            brs z _done                         # ... if NUL, we're done!
            out 0x82, al                        # write to CON:SEND
            ld al, 0b10                         # indicate write
            out 0x80, al                        # ...on CON:CTRL
            {
            _loop:
                in al, 0x83                     # wait for ACK
                brs z _loop  {$90 $01 $FA}      # ...will be non-zero when ACK'd
            }
            inc y                               # next character
            brs _loop                           # go back for another round
        _done:
        }
        pop a
        pop y
        pop x
        pop d                               # cleaned up, ready to go back
        ret
    }

}
