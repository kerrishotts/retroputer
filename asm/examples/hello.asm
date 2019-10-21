.segment data 0x03000 {
    str: .string "Hello, World"
         .byte 0x00
}
.segment code 0x02000 {

    ld d, data.str >> 3    # passing {ptr} str
    ld x, data.str & 0x7   # passing {ptr} str
    ld cl, 10              # passing {byte} col
    exc c                  # swap bytes
    ld cl, 12              # passing {byte} row
    calls print
    brk

    ##
    ## Displays a string at the desired row and column.
    ##
    ## @param {ptr} str - the string to display
    ## @param {byte} row - the row at which to start displaying it
    ## @param {byte} col - the column at which to start displaying it
    ## @affects X, Y
    ## @returns {byte} newRow - the ending row
    ## @returns {byte} newCol - the ending column
    print: {
    pre:
        push b
        push a
        pushf
    main:
        mov a, cl                # calculate addr = row * 32 + col
        shl a, 5                 #           a    = cl * 32  + ch
        mov b, c
        clr c # clear carry, so shr isn't sign extending
        shr b, 8
        add a, b
    
        mov y, a                 # y is used as the screen pos
        ld a, 0x00FF             # color
        ld bl, [D,X]             # load character        
        while !z do {
            st [0x10000,y], bl   # write to screen
            st [0x11000,y], al   # foreground color
            exc a
            st [0x12000,y], al   # background color
            exc a
            inc x
            inc y
            ld bl, [D,X]         # load next character
            cmp bl, 0x00         # is it NULL?
        }

        mov a, y
        and a, 0b11111
        exc a
        mov b, y
        shr b, 5
        add a, b
        mov d, a     # Compute return row and column

    post:
       popf
       pop a
       pop b
       ret
    }
}