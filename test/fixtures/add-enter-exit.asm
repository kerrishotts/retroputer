
# code.regs: A=0x0357
.segment code 0x02000 {

    ld a, 0x123
    push a                              # arg a, bp + 8

    ld a, 0x234
    push a                              # arg b, bp + 6

    ld a, 0x000
    push a                              # return, bp + 4

    call proc-add

    pop a                               # should be the return value
    pop b                               # we no longer care about in "b"
    pop b                               # or in "a"

    brk

proc-add: {
    # expect two value on the stack; these are called "a" and "b"
    # located at BP+8 (a) and BP+6 (b). We also want a return value
    # which we're going locate at BP+4.
    #
    # Local variables can be at BP+-2 and below. We want three
    # local variables, so we'll ENTER with 6 bytes
    #
    # "local.a" is BP+-6
    # "local.b" is BP+-4
    # "local.ret" is BP+-2
    enter 6                             # reserve space for three variables
    push a
    push b
    ld a, [bp+8]                        # get "a"
    st [bp+-6], a                       # store into "local.a"
    ld a, [bp+6]                        # get "b"
    st [bp+-4], a                       # store into "local.b"

    ld a, [bp+-6]                       # get "local.a"
    ld b, [bp+-4]                       # get "local.b"
    add a, b                            # do the work
    st [bp+-2], a                       # store the result into our local return variable

    ld a, [bp+-2]                       # get "local return"
    st [bp+4], a                        # put it into the designated return
    pop b
    pop a
    exit 6                              # reverse the local variable space
    ret
}

}