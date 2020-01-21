########################################
#
# Retroputer Kernel : Core : Screen
#
########################################

.namespace screen {
    .const PORT_SPRITE_SEL  0x1C
    .const PORT_SPRITE_SRC  0x1D
    .const PORT_SPRITE_IDX  0x1E
    .const PORT_SPRITE_CFG  0x1F
    .const PORT_SPRITE_SIZE 0x20
    .const PORT_SPRITE_BG   0x21
    .const PORT_SPRITE_FG   0x22
    .const PORT_SPRITE_X_HI 0x23
    .const PORT_SPRITE_X_LO 0x24
    .const PORT_SPRITE_Y_HI 0x25
    .const PORT_SPRITE_Y_LO 0x26

    .const CURSOR_SPRITE_SEL 0x0F
    .const CURSOR_SPRITE_IDX 0x10

    .segment krodata kmemmap.kernel.rodata-start .append {
        screen-init-start:
        screen-width:         .byte 0x05       # amount to shift for (row << width) calculation 
        screen-rows:          .byte 24         # number of rows
        screen-cols:          .byte 32         # number of columns
        screen-length:        .word 0xFFF
        screen-part-length:   .word 0x3FF      # screen length for one component (text, color, etc.)
        cursor-scale:         .byte 0x04       # shifter for determining cursor position
        cursor-row:           .byte 0x00
        cursor-col:           .byte 0x00
        cursor-fg:            .byte 0xFF
        cursor-bg:            .byte 0x00
        cursor-tile:          .byte 0xDB
        cursor-visible:       .byte 0x01
        cursor-blink-toggle:  .byte 0x00
        cursor-blink-speed:   .byte 30
        cursor-blink-counter: .byte 30
        screen-text-fg:       .byte 0xFF
        screen-text-bg:       .byte 0x00
        screen-page:          .word 0x10000 >> 3
        screen-init-end:      .byte 00

        .const SCREEN-INIT-DATA-LENGTH ((screen.krodata.screen-init-end - screen.krodata.screen-init-start) - 1)
    }

    .segment kdata kmemmap.kernel.data-start .append {
        screen-data-start:
        screen-width:         .byte 0x00
        screen-rows:          .byte 0x00
        screen-cols:          .byte 0x00
        screen-length:        .word 0x0000
        screen-part-length:   .word 0x0000
        cursor-scale:         .byte 0x00
        cursor-row:           .byte 0x00
        cursor-col:           .byte 0x00
        cursor-fg:            .byte 0x00
        cursor-bg:            .byte 0x00
        cursor-tile:          .byte 0x00
        cursor-visible:       .byte 0x00
        cursor-blink-toggle:  .byte 0x00
        cursor-blink-speed:   .byte 00
        cursor-blink-counter: .byte 00
        screen-text-fg:       .byte 0x00
        screen-text-bg:       .byte 0x00
        screen-page:          .word 0x0000
    }

    .segment kcode kmemmap.kernel.code-start .append {

        init: {
        _main: 
            #
            # initialize the screen
            ###################################################################

            init-screen: {
                #
                # copy all defaults from ROM and store them into temp data
                ###############################################################

                # number of bytes we need to copy
                ld y, screen.krodata.SCREEN-INIT-DATA-LENGTH
                do {
                # address of the starting point of screen init data in rom
                    ld d, screen.krodata.screen-init-start >> 3
                    ld x, screen.krodata.screen-init-start & 7
                    ld al, [d, x, y]

                    ld d, screen.kdata.screen-data-start >> 3
                    ld x, screen.kdata.screen-data-start & 7
                    st [d, x, y], al

                    dec y
                } while !c 

                # set up the screen device to be what it would be at a cold
                # start

                ld al, 29
                out 0x10, al        # palette should point at page 29
                ld al, 9
                out 0x11, al        # background color is a dark blue
                ld al, 0x80
                out 0x2B, al        # border config
                out 0x2C, al        # and border color (light blue)
                ld al, 0
                out 0x2D, al        # trap-on-raster

                # ensure layer zero is visible and pointing at page 0x10000

                ld al, 0
                out 0x12, al        # select layer zero
                out 0x17, al        # x offset is zero
                out 0x18, al        # y offset is zero
                out 0x19, al        # x crop is zero
                out 0x1A, al        # y crop is zero
                out 0x1B, al        # screen mode is zero (32x24)
                ld al, 0x84
                out 0x13, al        # layer is visible, source is page 4 (0x10000)
                ld al, 28
                out 0x14, al        # tile page is from ROM
                ld al, [screen.kdata.screen-text-bg]
                out 0x15, al        # background color (transparent)
                ld al, [screen.kdata.screen-text-fg]
                out 0x16, al        # foreground color
            }

            init-cursor-sprite: {
                #
                # Set up the sprite to be a full block (unless that's been changed)
                ###############################################################
                ld al, [screen.kdata.cursor-tile]
                st [kmemmap.kernel.sprite-start], al
                ld al, 0xFF
                st [kmemmap.kernel.sprite-start+0x40], al
                ld al, 0x00
                st [kmemmap.kernel.sprite-start+0x80], al

                #
                # configure the sprite for display
                ###############################################################
                ld al, CURSOR_SPRITE_SEL     # select the sprite we're going to set up
                out PORT_SPRITE_SEL, al

                ld al, 0b1_11_00000          # Visible, above everything, page 0
                out PORT_SPRITE_SRC, al      # set sprite visibiity and the data page (which tiles to show)

                ld al, CURSOR_SPRITE_IDX
                out PORT_SPRITE_IDX, al      # sprite offset

                ld al, 0b01_0_11100          # scale for 32x24; tile page 28
                out PORT_SPRITE_CFG, al      # set sprite scale and tile page

                ld al, 0b0001_0001           # cursor is 1x1
                out PORT_SPRITE_SIZE, al     # set sprite height and width

                ld al, [screen.kdata.cursor-bg]
                out PORT_SPRITE_BG, al       # background color

                ld al, [screen.kdata.cursor-fg]
                out PORT_SPRITE_FG, al       # foreground color
            }
        
            calls clear-screen
            calls install-frame-handler
        _out:
            ret

        }

        ##
        ## Vector: CLEAR_SCREEN
        ## Parameters: None
        ## Preserves: x, a
        ##
        ## Clears the screen 
        #######################################################################
        clear-screen: {
            push x
            push a
            push d
        _main:
            ld d, [screen.kdata.screen-page]
            ld x, [screen.kdata.screen-length]
            do {
                ld al, 0x00
                st [d + 0x0000, x], al              # fill with null chars
                ld al, [screen.kdata.screen-text-fg]
                st [d + 0x1000, x], al              # set foreground color
                ld al, [screen.kdata.screen-text-bg]
                st [d + 0x2000, x], al              # set background color
                dec x
            } while !c
            d := 0
            call set-cursor-pos
        _out:
            pop d
            pop a
            pop x
            ret
        }

        install-frame-handler: {
            push a
            ld a, screen.kcode.each-frame
            st [0x88 << 1], a
            pop a
            ret
        }

        each-frame: {
            set id                # turn off interrupts
        _main:
            calls draw-cursor
            calls update-cursor
        _out:
            clr id
            ret
        }

        draw-cursor: {
            push a
            push b
            push c
            push d
            pushf
        _main:
            # update cursor sprite visiblity
            ld al, CURSOR_SPRITE_SEL                  # select the cursor sprite
            out PORT_SPRITE_SEL, al
            in al, PORT_SPRITE_SRC                    # get current settings
            ld bl, [screen.kdata.cursor-visible]      # is visible?
            ld cl, [screen.kdata.cursor-blink-toggle] # is on? (based on blink cycle)
            and bl, cl                                # only show if visible and on
            shl bl, 7                                 # needs to be bit 7
            and al, 0x0111_1111                       # clear top bit
            or al, bl                                 # or in the right bit
            out PORT_SPRITE_SRC, al

            ld dl, [screen.kdata.cursor-scale]

            # put the sprite at the correct location on screen
            ld a, 0
            ld al, [screen.kdata.cursor-row]         # a = current row
            shl a, dl                                #   * 16 (dl === multiplier)
            add a, 48                                #   + 48 (top of screen)
            out PORT_SPRITE_Y_LO, al                 # update lo bits of sprite pos
            exc a
            out PORT_SPRITE_Y_HI, al                 # and high bits

            ld a, 0
            ld al, [screen.kdata.cursor-col]         # a = current col
            shl a, dl                                #   * 16 (dl === multiplier)
            add a, 64                                #   + 64 (left of screen)
            out PORT_SPRITE_X_LO, al                 # update lo bits of sprite pos
            exc a
            out PORT_SPRITE_X_HI, al                 # and high bits

        _out:
            popf
            pop d
            pop c
            pop b
            pop a
            ret
        }

        update-cursor: {
            push a
            push b
            pushf
        _main:
            ld al, [screen.kdata.cursor-blink-counter]   # get current counter  
            dec al
            if c {
                # when carry, we've gone below 0; toggle the cursor
                ld al, [screen.kdata.cursor-blink-toggle]
                ld bl, 0b1
                xor al, bl
                st [screen.kdata.cursor-blink-toggle], al

                # reset the counter
                ld al, [screen.kdata.cursor-blink-speed]
            }
            st [screen.kdata.cursor-blink-counter], al

        _out:
            popf
            pop b
            pop a
            ret
        }

        ##
        ## Vector: SET_CURSOR_POSITION
        ## Parameters: DL - column
        ##             DH - row
        ## Returns: nothing
        ## 
        ## Sets the cursor to X (DL), Y (DH).
        ##
        #######################################################################
        set-cursor-pos: {
        _main:
            st [screen.kdata.cursor-col], dl
            exc d
            st [screen.kdata.cursor-row], dl
            exc d

            # reset blink and toggle status
            push a
            ld al, 0x01
            st [screen.kdata.cursor-blink-toggle], al
            ld al, [screen.kdata.cursor-blink-speed]
            st [screen.kdata.cursor-blink-counter], al
            pop a
        _out:
            # return
            ret
        }

        ##
        ## Vector: GET_CURSOR_POSITION
        ## Parameters: none
        ## Returns: DL - column
        ##          DH - row
        ##
        ## Returns the current cursor position.
        #######################################################################
        get-cursor-pos: {
            ld dl, [screen.kdata.cursor-row]
            exc d
            ld dl, [screen.kdata.cursor-col]
            ret
        }

        ##
        ## Vector: GET_CURSOR_ADDR
        ## Parameters: none
        ## Returns: D - screen page
        ##          X - offset of cursor position
        ##
        ## Returns the screen address offset for the current cursor position
        #######################################################################
        get-cursor-addr: {
            push a
            pushf
        _main:
            # convert position to address
            call get-cursor-pos
            exc d
            mov x, dl
            ld al, [screen.kdata.screen-width]
            shl x, al
            exc d
            or x, dl
            # get the page
            ld d, [screen.kdata.screen-page]
        _out:
            popf
            pop a
            ret
        }

        ##
        ## Vector: CVT_ADDR_TO_POS
        ## Parameters: D, x - address of cursor
        ## Return: DH - row, DL - col
        #######################################################################
        cvt-addr-to-pos: {
                push a
            _main:
                d := x
                # calculate rows by shifting d >> width
                al := [screen.kdata.screen-width]
                shl d, al

                # calculate cols by taking x & (cols-1)
                exc d
                al := [screen.kdata.screen-cols]
                dec al
                and x, al
                dl := xl
            _out:
                pop a
                ret
        }

        ##
        ## Vector: GET_CHAR_UNDER_CURSOR
        ## Parameters: none
        ## Returns: DL - char
        ##
        ## Returns the character under the current character position
        #######################################################################
        get-char-under-cursor: {
        _main:
            call get-cursor-addr
            ld dl, [d, x]
        _out:
            ret
        }

        ##
        ## Vector: GET_LOGICAL_LINE_START_ADDR
        ## Parameters: none
        ## Returns: D, X - address of the start of the logical line
        ##
        #######################################################################
        get-logical-line-start-addr: {
                push a
            _main:
                call get-cursor-addr
                dec x
                do {
                    ld al, [d, x]
                    cmp al, 0x00
                    if z {
                        break
                    }
                    dec x
                } while !n
                inc x
            _out:
                pop a
                ret
        }

        ##
        ## Vector: GET_LOGICAL_LINE_END_ADDR
        ## Parameters: none
        ## Returns: D, X - address of the end of the logical line
        ##
        #######################################################################
        get-logical-line-end-addr: {
                push a
            _main:
                call get-cursor-addr
                do {
                    ld al, [d, x]
                    cmp al, 0x00
                    if z {
                        break
                    }
                    inc x
                    # note: if there's no ending 00 at the end of screen
                    # memory, this will do strange things... ;-) 
                } while !n
                dec x
            _out:
                pop a
                ret
        }

        ##
        ## Vector: SCROLL_SCREEN_UP
        ## Parameters: none
        ## Returns: none
        ##
        ## Scrolls the contents of the screen up by one row
        #######################################################################
        scroll-screen-up: {
            push a
            push x
            push d
            push b
            push y
            pushf
        _main:
            ld d, [screen.kdata.screen-page]     # get screen page
            xor y, y
            ld yl, [screen.kdata.screen-cols]     # # of screen columns
            ld x, 0                              # x + y == a line down
            ld b, [screen.kdata.screen-part-length]
            sub b, y                             # needs to be one line less
            clr c
            do {
                ld al, [d, x, y]                 # get char a row down
                st [d, x], al                    # and scroll it up
                ld al, [d + 0x1000, x, y]
                st [d + 0x1000, x], al           # set foreground color
                ld al, [d + 0x2000, x, y]
                st [d + 0x2000, x], al           # set background color
                inc x
                mov a, x
                cmp a, b
            } while !z
        _out:
            popf
            pop y
            pop b
            pop d
            pop x
            pop a
            ret
        }

        ##
        ## Vector: CURSOR_UP
        ## Parameters: none
        ## Returns: none
        ##
        ## Moves the cursor up by 1 row; can't advance beyond row 0
        #######################################################################
        cursor-up: {
            push d
            push c
            push a
            pushf
        _main:
            call get-cursor-pos
            exc d                              # need to work on row 
            dec dl                             # up a row
            if n {
                inc dl                         # nope!
            }
            exc d                              # switch back for set
            call set-cursor-pos
        _out:
            popf
            pop a
            pop c
            pop d
            ret
        }
        

        ##
        ## Vector: CURSOR_LEFT
        ## Parameters: none
        ## Returns: none
        ##
        ## Moves the cursor 1 position to the left, moving up and to the
        ## right if necessary
        #######################################################################
        cursor-left: {
            push d
            push c
            push a
            pushf
        _main:
            call get-cursor-pos
            dec dl
            if n {
                # moved past left of screen, 
                ld dl, [screen.kdata.screen-cols]
                dec dl
                exc d
                dec dl
                if n {
                    inc dl
                    # don't go to the right side if we're already at the top
                    exc d
                    dl := 0
                    exc d
                }
                exc d
            }
            call set-cursor-pos
        _out:
            popf
            pop a
            pop c
            pop d
            ret
        }

        ##
        ## Vector: CURSOR_RIGHT  
        ## Parameters: none
        ## Returns: none
        ##
        ## Advances the cursor by one to the right, wrapping and scrolling 
        ## as necessary
        #######################################################################
        cursor-right: {
            push d
            push c
            push a
            pushf
        _main:
            call get-cursor-pos
            exc d
            mov cl, dl
            exc d

            # x is in dl
            inc dl
            ld al, [screen.kdata.screen-cols]
            cmp dl, al   # right of screen
            if z {
                # reset column
                ld dl, 0
                # next row
                inc cl
            }
            ld al, [screen.kdata.screen-rows]
            cmp cl, al   # bottom of screen
            if z {
                dec cl   # keep at the bottom
                call scroll-screen-up
            }

            exc d
            mov dl, cl
            exc d
            call set-cursor-pos

        _out:
            popf
            pop a
            pop c
            pop d
            ret
        }

        ##
        ## Vector: CURSOR_DOWN
        ## Parameters: none
        ## Returns: none
        ##
        ## Advances the cursor down a line, scrolling if necessary
        #######################################################################
        cursor-down: {
            push d
            push c
            push a
            pushf
        _main:
            call get-cursor-pos
            exc d

            inc dl
            ld al, [screen.kdata.screen-rows]
            cmp dl, al   # bottom of screen
            if z {
                dec dl   # keep at bottom
                call scroll-screen-up
            }

            exc d
            call set-cursor-pos

        _out:
            popf
            pop a
            pop c
            pop d
            ret
        }

        ##
        ## Vector: CURSOR_NEWLINE
        ## Parameters: none
        ## Returns: none
        ##
        ## Advances the cursor down a line and returns the cursor to the left
        #######################################################################
        cursor-newline: {
            push d
            push c
            push a
            pushf
        _main:
            call get-cursor-pos
            exc d
            mov cl, dl
            exc d

            # x is in dl
            ld dl, 0

            # next row
            inc cl
            ld al, [screen.kdata.screen-rows]
            cmp cl, al   # bottom of screen
            if z {
                dec cl   # keep at bottom
                call scroll-screen-up
            }

            exc d
            mov dl, cl
            exc d
            call set-cursor-pos

        _out:
            popf
            pop a
            pop c
            pop d
            ret
        }

        ##
        ## Vector: CURSOR_BACKSPACE
        ## Parameters: none
        ## Returns: none
        ##
        ## Backspace acts differently from a simple cursor-left;
        ## we'll back up to the left, but only if the character is
        ## non-zero. If it's zero, we'll search back to find the first
        ## non-zero character and reset there. This ensures BKSP is
        ## always operating on logical lines.
        ## BKSP can't be used to navigate before 0,0.
        #######################################################################
        cursor-backspace: {
            push d
            push y
            push a
            pushf
        _main:
            call cursor-left
            call get-cursor-addr
            y := x
            call get-logical-line-end-addr
            cmp x, y
            br n _out 
            do {
                al := [d+0x0001,y]
                [d,y] := al
                al := [d+0x1001,y]
                [d+0x1000,y] := al
                al := [d+0x2001,y]
                [d+0x2000,y] := al
                inc y
                cmp x, y
            } while !n

        _out:
            popf
            pop a
            pop y
            pop d
            ret
        }

        control-no-op: {
            ret
        }

        control-vectors:
            .word control-no-op       # 00 - NUL - 
            .word control-no-op       # 01 - SOH - Home (top left)
            .word control-no-op       # 02 - STX - Start of logical line
            .word control-no-op       # 03 - ETX - Break (No visual)
            .word control-no-op       # 04 - EOT - 
            .word control-no-op       # 05 - ENQ - 
            .word control-no-op       # 06 - ACK - 
            .word control-no-op       # 07 - BEL - 
            .word cursor-backspace    # 08 - BS  - Backspace
            .word control-no-op       # 09 - HT  - Tab
            .word cursor-down         # 10 - LF  - Line Feed
            .word control-no-op       # 11 - VT  -
            .word clear-screen        # 12 - FF  - Clear Screen
            .word cursor-newline      # 13 - CR  - ENTER
            .word control-no-op       # 14 - SO  - End of logical line
            .word control-no-op       # 15 - SI  - 
            .word cursor-right        # 16 - DLE - Cursor Right
            .word cursor-left         # 17 - DC1 - Cursor Left
            .word control-no-op       # 18 - DC2 - 
            .word control-no-op       # 19 - DC3 - 
            .word control-no-op       # 20 - DC4 - 
            .word control-no-op       # 21 - NAK - 
            .word control-no-op       # 22 - SYN - 
            .word control-no-op       # 23 - ETB - 
            .word control-no-op       # 24 - CAN - 
            .word control-no-op       # 25 - EM  - 
            .word control-no-op       # 26 - SUB - 
            .word control-no-op       # 27 - ESC - 
            .word control-no-op       # 28 - FS  -
            .word control-no-op       # 29 - GS  - Delete
            .word cursor-up           # 30 - RS  - Cursor Up
            .word cursor-down         # 31 - MS  - Cursor Down

        ##
        ## Vector: PUT_CHAR
        ## Parameters: DL - character
        ## Returns: none
        ##
        ## Displays a character on the screen and advances the cursor
        #######################################################################
        put-char: {
            push a
            push x
            push d
            push y
            pushf
        _main:
            mov a, d

            # if this is a control character, we don't print it
            cmp al, 32
            br c _put-char-control
            br _put-non-control-char

        _put-char-control:
            # we're a control character; look up the vector
            d := control-vectors >> 3
            x := control-vectors & 7
            y := al
            shl y, 1                   # shift to a word
            call [d,x,y]               # perform the control char
            br _out 

        _put-non-control-char:
            # get the current cursor address offset
            call get-cursor-addr
            st [d, x], al
            ld al, [screen.kdata.screen-text-fg]
            st [d + 0x1000, x], al
            ld al, [screen.kdata.screen-text-bg]
            st [d + 0x2000, x], al

            # advance the cursor
            call cursor-right
        _out:
            popf
            pop y
            pop d
            pop x
            pop a
            ret
        }

        ##
        ## Vector: GET_CHAR
        ## Parameters: none
        ## Returns: DL - char
        ##
        ## Waits for a character to be typed and returns it in DL
        #######################################################################
        get-char: {
                pushf
            _main:
                do {
                    halt
                    in dl, 0x30
                    cmp dl, 0
                } while z
            _out:
                popf
                ret
        }

        ##
        ## Vector: PRINT
        ## Parameters: D, X - NUL-terminated string to print on screen
        ## Returns: none
        ##
        #######################################################################
        print: {
                pushf
                push x
                push a
            _main:
                al := [d, x]
                cmp al, 0x00
                while !z do {
                    swap a, d
                    call put-char
                    swap a, d
                    inc x
                    al := [d, x]
                    cmp al, 0x00
                }
            _out:
                pop a
                pop x
                popf
                ret
        }

        ##
        ## Vector: INPUT
        ## Parameters: D, X - Buffer for resulting user input
        ##             C - maximum size of buffer
        ## Returns: C - length of input
        ##
        #######################################################################
        input: {
                pushf
                push a
                push b
                push y
                enter 0
                .const buffer -4
                .const source -8
            _main:
                push x
                push d                                # put PTR TO BUFFER on stack
            _loop:
                call get-char                         # get user input
                cmp dl, 13                            # wait for ENTER 
                br z _done
                call put-char                         # print any output
                br _loop
            _done:
                call get-logical-line-end-addr       # d,x = end of logical line
                b := x
                call get-logical-line-start-addr     # d,x = start of line
                sub b, x                             # b = # of chars in line
                inc b                                # account for NUL
                push x
                push d                               # push PTR to SOURCE on stack
                cmp b, 0x0000
                if z {
                    c := 0                           # ENTER with no input.
                    <BP+buffer> := cl
                    br _out
                }
                cmp c, b                             # check if we have space
                if n {
                    c := -1                          # no? fail
                    br _out
                }
                c := b                               # return the # of chars in the line
                push c
                y := 0
                do {
                    cl := <bp+source>, y             # get char from screen
                    <bp+buffer>, y := cl
                    inc y
                    dec b                            # count down chars to copy
                    cmp b, 0x00
                } while !z
                cl := 0
                <bp+buffer>, y := cl                 # write the NUL terminator
                pop c
            _out:
                exit 8
                pop y
                pop b
                pop a
                popf
                ret
        }
    }
}