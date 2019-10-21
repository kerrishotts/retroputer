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
        cursor-row:           .byte 0x00
        cursor-col:           .byte 0x00
        cursor-fg:            .byte 0xFF
        cursor-bg:            .byte 0x00
        cursor-tile:          .byte 0xDB
        cursor-visible:       .byte 0x01
        cursor-blink-toggle:  .byte 0x00
        cursor-blink-speed:   .byte 30
        cursor-blink-counter: .byte 30
        screen-init-end:      .byte 00
    }

    .segment kdata kmemmap.kernel.data-start .append {
        screen-width:         .byte 0x00
        cursor-row:           .byte 0x00
        cursor-col:           .byte 0x00
        cursor-fg:            .byte 0x00
        cursor-bg:            .byte 0x00
        cursor-tile:          .byte 0x00
        cursor-visible:       .byte 0x00
        cursor-blink-toggle:  .byte 0x00
        cursor-blink-speed:   .byte 00
        cursor-blink-counter: .byte 00
    }

    .segment kcode kmemmap.kernel.code-start .append {

        init: {
        _main: 
            #
            # initialize the screen
            ###################################################################

            init-data: {
                #
                # copy all defaults from ROM and store them into temp data
                ###############################################################
                ld al, [screen.krodata.screen-width]
                st [screen.kdata.screen-width], al
                ld al, [screen.krodata.cursor-row]
                st [screen.kdata.cursor-row], al
                ld al, [screen.krodata.cursor-col]
                st [screen.kdata.cursor-col], al
                ld al, [screen.krodata.cursor-tile]
                st [screen.kdata.cursor-tile], al
                ld al, [screen.krodata.cursor-fg]
                st [screen.kdata.cursor-fg], al
                ld al, [screen.krodata.cursor-bg]
                st [screen.kdata.cursor-bg], al
                ld al, [screen.krodata.cursor-visible]
                st [screen.kdata.cursor-visible], al
                ld al, [screen.krodata.cursor-blink-toggle]
                st [screen.kdata.cursor-blink-toggle], al
                ld al, [screen.krodata.cursor-blink-speed]
                st [screen.kdata.cursor-blink-speed], al
                ld al, [screen.krodata.cursor-blink-counter]
                st [screen.kdata.cursor-blink-counter], al
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

        clear-screen: {
            push x
            push a
        _main:
            ld x, 0x00FFF
            do {
                ld al, 0x00
                st [0x10000, x], al              # fill with null chars
                ld al, [screen.kdata.cursor-fg]
                st [0x11000, x], al              # set foreground color
                ld al, [screen.kdata.cursor-bg]
                st [0x12000, x], al              # set background color
                dec x
            } while !z
        _out:
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

            # put the sprite at the correct location on screen
            ld a, 0
            ld al, [screen.kdata.cursor-row]         # a = current row
            shl a, 4                                 #   * 16
            add a, 48                                #   + 64 (top of screen)
            out PORT_SPRITE_Y_LO, al                 # update lo bits of sprite pos
            exc a
            out PORT_SPRITE_Y_HI, al                 # and high bits

            ld a, 0
            ld al, [screen.kdata.cursor-col]         # a = current col
            shl a, 4                                 #   * 16
            add a, 64                                #   + 48 (left of screen)
            out PORT_SPRITE_X_LO, al                 # update lo bits of sprite pos
            exc a
            out PORT_SPRITE_X_HI, al                 # and high bits

        _out:
            popf
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

    }
}