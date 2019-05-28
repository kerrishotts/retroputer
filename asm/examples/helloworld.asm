#
# Hello World
########################################
.import "system"  # import the system libs

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
    main:
        pushall                         # be a nice citizen...
        xor x, x                        # x = 0
        ld d, app.data.hello            # address of hello, world
        ld cl, [d]                      # size of our string
        inc x                           # increment past length
    print-loop:
        ld al, [d,x]                    # get character
        out 0x10, al                    # print (for now)
        inc x                           # next
        loop print-loop, c              # keep going?

        popall                          # clean up
        ret                             # back whence we came
    }
}