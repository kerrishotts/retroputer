#
# Hello World
########################################
#.import "system"  # import the system libs

.namespace app {
    .const NUL 0x00
    .const SEGMENT-SIZE 0x00800
    .const CODE-START 0x01000
    .const DATA-START CODE-START + SEGMENT-SIZE
    .segment data DATA-START .append {
        hello: .byte 12
               .string "Hello, World\n"
               .byte NUL
        scores: .word[2] 0, 0
    }

    .segment code CODE-START {
        calls main            {$90 $07 $01}      # test forward resolution
        ret                   {$a7}              # return to caller
    main:
        pushall               {$a0}              # be a nice citizen...
        xor x, x              {$07 $88}          # x = 0
        ld d, data.hello      {$16 $00 $18 $00}  # address of hello, world
        ld cl, [d]            {$15 $c0 $00 $00}  # size of our string
        inc x                 {$c8}              # increment past length
    print-loop:
        ld al, [d,x]          {$11 $d0 $00 $00}  # get character
        out 0x10, al          {$31 $10 $10}      # print (for now)
        inc x                 {$c8}              # next
        loops print-loop, c   {$84 $01 $f5}      # keep going?

        popall                {$a1}              # clean up
        ret                   {$a7}              # back whence we came
    }
}