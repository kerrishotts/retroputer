.namespace screen {
    .segment kdata kmemmap.kernel.data-start .append {
        cursor-x:             .byte 0x00
        cursor-y:             .byte 0x00
        cursor-page:          .byte 0x05
        cursor-page-width:    .byte 0x20
        cursor-page-width-shl: .byte 0x05 
        cursor-fg:            .byte 0xff
        cursor-bg:            .byte 0x00
        cursor-visible:       .byte 0x01
        cursor-blink-toggle:  .byte 0x00
        cursor-blink-speed:   .byte 30
        cursor-blink-counter: .byte 30
        cursor-blink-orig-fg: .byte 0x00
        cursor-blink-orig-bg: .byte 0x00
    }

    .segment kcode kmemmap.kernel.code-start .append {

        update-cursor: {
            push a                               
            ld al, [kdata.cursor-blink-counter]  # get the current cursor blink counter
            dec al                               # counter--
            if c {                               # if we carry (go negative), toggle the cursor
                ld al, [kdata.cursor-blink-speed]      # get the original speed
                st [kdata.cursor-blink-counter], al    # write it back to the counter
                ld al, [kdata.cursor-blink-toggle]     # get the current toggle state
                xor al, 0xFF                     # toggle it too
                st [kdata.cursor-blink-toggle], al
            }
            pop a
            ret
        }

        #
        # Draw the cursor at the current location. It will be drawn in the foreground
        # or background color depending on the state of the cursor. If the cursor
        # is invisible, it will not be drawn
        draw-cursor: {
            push a
            ld al, [kdata.cursor-visible]              # if we're hidden, there's no point to this...
            cmp al, 0x00
            if z {
                pop a
                ret                              # bail early
            }

            push a
            push b
            push c
            push d 

            set id                               # Disable interrupts -- we have to adjust MM
            pushmm                               # Push MM; we're about to change it
            pushmm                               # Push MM so we can manipulate it
            pop a                                # ... A is now MM. We want to change the lower
            and al, 0b1_11111_11111_00000        # five bits, so zero them out...
            ld bl, [kdata.cursor-page]                 # get the page the cursor is on
            or al, bl                            # update the low bits
            push a                               # put back on the stack
            popmm                                # MM is reconfigured!

            ld a, 0
            ld al, [kdata.cursor-y]                    # get the cursor row
            ld bl, [kdata.cursor-page-width-shl]       # and the amount we should shift by
            shl a, bl                            # a now has the row
            ld bl, [kdata.cursor-x]                    # now we have the x position
            add a, bl                            # add x to the row; now we have the memory address
            
            ld bl, [kdata.cursor-fg]                   # get the foreground color
            ld cl, [kdata.cursor-bg]                   # and the background color
            ld al, [kdata.cursor-blink-toggle]         # which colors should we use?
            cmp al, 0x00
            if z {
                swap b, c                        # switch the order of colors
            }

            mov x, a
            st [0x05000, x], bl                  # put the foreground color
            st [0x06000, x], cl                  # and the background color

            popmm                                # put MM back where it should be

            pop d
            pop c 
            pop b 
            pop a 

            clr id                               # interrupts enabled
            ret 
        }

    }
}