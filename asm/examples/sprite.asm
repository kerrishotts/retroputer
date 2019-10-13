.namespace sprite-demo {
    .const WHICH_SPRITE     0
    .const SPRITE_WIDTH     1
    .const SPRITE_HEIGHT    1
    .const SPRITE_TILE_PAGE 28
    .const SPRITE_DATA_PAGE 5
    .const SPRITE_DATA_IDX  0
    .const SPRITE_TILE      0x01 # face; full block is 0xDB
    .const SPRITE_BG_COLOR  0x00
    .const SPRITE_FG_COLOR  0xFF
    .const SPRITE_VISIBLE   1
    .const SPRITE_SCALE     1

    .const SCREEN_TOP       32
    .const SCREEN_RIGHT     576
    .const SCREEN_BOTTOM    432
    .const SCREEN_LEFT      48

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

    .segment data 0x03000 {
        xpos: .word 64
        ypos: .word 48
        xdir: .word 1
        ydir: .word 1
    }

    .segment code 0x02000 {
    reset:
        ld a, 64
        st [data.xpos], a

        ld a, 48
        st [data.ypos], a

        ld a, 1
        st [data.xdir], a
        st [data.ydir], a

    charset:
        ld x, 136
        ld al, 0
        ld bl, 0
        do {
            ld dl, 0x8C
            st [0x11000, x], dl
            ld dl, 0
            st [0x12000, x], dl
            mov cl, bl
            shl cl, 4
            or cl, al
            st [0x10000, x], cl
            inc x
            inc al
            cmp al, 16
            br z next-line
            continue
        next-line:
            ld dl, 16
            add x, dl
            ld al, 0
            inc bl
            cmp bl, 16
        } while !z



    set-sprite-data:
        ld al, SPRITE_FG_COLOR
        st [0x14040], al             # store foreground color to sprite color data
        ld al, SPRITE_BG_COLOR
        st [0x14080], al             # and backgroun dcolor
        ld al, SPRITE_TILE
        st [0x14000], al             # set sprite tile

    init-sprite:
        ld al, WHICH_SPRITE          # select the sprite we're going to set up
        out PORT_SPRITE_SEL, al

        ld al, ((SPRITE_VISIBLE * 128) + SPRITE_DATA_PAGE)
        out PORT_SPRITE_SRC, al      # set sprite visibiity and the data page (which tiles to show)

        ld al, SPRITE_DATA_IDX
        out PORT_SPRITE_IDX, al      # sprite offset

        ld al, ((SPRITE_SCALE * 64) + SPRITE_TILE_PAGE)
        out PORT_SPRITE_CFG, al      # set sprite scale and tile page

        ld al, ((SPRITE_HEIGHT * 16) + SPRITE_WIDTH)
        out PORT_SPRITE_SIZE, al     # set sprite height and width

        ld al, SPRITE_BG_COLOR
        out PORT_SPRITE_BG, al       # background color

        ld al, SPRITE_FG_COLOR
        out PORT_SPRITE_FG, al       # foreground color

    set-x-pos:

        ld al, [data.xpos + 1]
        out PORT_SPRITE_X_LO, al
        ld al, [data.xpos + 0]
        out PORT_SPRITE_X_HI, al

    set-y-pos:
        ld al, [data.ypos + 1]
        out PORT_SPRITE_Y_LO, al
        ld al, [data.ypos + 0]
        out PORT_SPRITE_Y_HI, al

    bounce-x:
        ld a, [data.xpos]
        ld b, [data.xdir]
        clr c
        add a, b

        cmp a, SCREEN_RIGHT
        if z {
            neg b
            st [data.xdir], b
        }

        cmp a, SCREEN_LEFT
        if z {
            neg b
            st [data.xdir], b
        }

        st [data.xpos], a

    bounce-y:
        ld a, [data.ypos]
        ld b, [data.ydir]
        clr c
        add a, b

        cmp a, SCREEN_BOTTOM
        if z {
            neg b
            st [data.ydir], b
        }

        cmp a, SCREEN_TOP
        if z {
            neg b
            st [data.ydir], b
        }

        st [data.ypos], a

    next-frame:
        inc cl
        out 0x2B, c      # colors while we wait!
        in dl, 0x2E
        cmp dl, 0xf0
        br !z next-frame
    hold-frame:
        in dl, 0x2E
        cmp dl, 0xf0
        br z hold-frame

        br set-x-pos

    done:
        brk
    }

}