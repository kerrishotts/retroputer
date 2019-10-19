.namespace multi-sprite-demo {
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
        xpos: .word[16] 64, 64, 96, 96, 128, 128, 160, 160, 192, 192, 224, 224, 256, 256, 288, 288
        ypos: .word[16] 48, 64, 72, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288
        xdir: .word[16]  2, -1,  1,  1,  -2,   1,   1,  -1,   4,  -1,   4,   1,   1,  -1,  -1,  -1
        ydir: .word[16]  2,  1, -2,  1,   1,   1,  -1,   2,   1,   1,  -2,   2,  -1,   1,   2,  -1
        color:.byte[16] 255, 18, 19, 20,  21, 255,  18,  19,  20,  21, 255,  18,  19,  20,  21, 255
    }

    .segment code 0x02000 {
        main: {
            call code.charset
            ld c, 15
            do {
                call code.init-sprite
                dec c
            } while !c
        }

        forever:
        {
            ld c, 15
            do {
                mov x, c
                shl x, 1
                ld a, [data.xpos, x]
                ld b, [data.ypos, x]
                call code.set-sprite-pos
                call code.bounce-sprite
                dec c
            } while !c

            next-frame:
                inc al
                out 0x2B, al     # colors while we wait!
                in dl, 0x2E
                cmp dl, 0xf0
                br !z next-frame
            hold-frame:
                in dl, 0x2E
                cmp dl, 0xf0
                br z hold-frame

            br forever
        }

        init-sprite:
        {
            push a
            push x
            push y 
            mov x, c                     # c = sprite to init
            mov y, c 
            shl x, 8                     # x << 8
            ld al, SPRITE_FG_COLOR
            st [0x14040, x], al          # store foreground color to sprite color data
            ld al, SPRITE_BG_COLOR
            st [0x14080, x], al          # and backgroun dcolor
            ld al, SPRITE_TILE
            clr c
            add al, c
            st [0x14000, x], al          # set sprite tile

            mov a, y                     # select the sprite we're going to set up
            out PORT_SPRITE_SEL, al

            ld al, ((SPRITE_VISIBLE * 0b1000_0000) + SPRITE_DATA_PAGE)
            out PORT_SPRITE_SRC, al      # set sprite visibiity and the data page (which tiles to show)

            mov a, y
            out PORT_SPRITE_IDX, al      # sprite offset

            ld al, ((SPRITE_SCALE * 0b0100_0000) + SPRITE_TILE_PAGE)
            out PORT_SPRITE_CFG, al      # set sprite scale and tile page

            ld al, ((SPRITE_HEIGHT * 0b0001_0000) + SPRITE_WIDTH)
            out PORT_SPRITE_SIZE, al     # set sprite height and width

            ld al, SPRITE_BG_COLOR
            out PORT_SPRITE_BG, al       # background color

            ld al, [data.color, y]
            out PORT_SPRITE_FG, al       # foreground color

            pop y
            pop x
            pop a
            ret
        }

        set-sprite-pos: 
        {
            # a and b are the desired sprite position
            # c is the desired sprite
            push a
            push b

            out PORT_SPRITE_SEL, cl # select the sprite we're going to set up
        set-x-pos:
            out PORT_SPRITE_X_LO, al
            exc a
            out PORT_SPRITE_X_HI, al

        set-y-pos:
            out PORT_SPRITE_Y_LO, bl
            exc b
            out PORT_SPRITE_Y_HI, bl

        done:
            pop b
            pop a
            ret
        }

        bounce-sprite: 
        {
            push a
            push b
            push x
            pushf

            mov x, c
            shl x, 1

            ld a, [data.xpos, x]                  # handle x
            ld b, [data.xdir, x]
            clr c
            add a, b

            cmp a, SCREEN_RIGHT
            if z {
                neg b
                st [data.xdir, x], b
            }

            cmp a, SCREEN_LEFT
            if z {
                neg b
                st [data.xdir, x], b
            }

            st [data.xpos, x], a

            ld a, [data.ypos, x]               # handle y
            ld b, [data.ydir, x]
            clr c
            add a, b

            cmp a, SCREEN_BOTTOM
            if z {
                neg b
                st [data.ydir, x], b
            }

            cmp a, SCREEN_TOP
            if z {
                neg b
                st [data.ydir, x], b
            }

            st [data.ypos, x], a

            popf
            pop x
            pop b
            pop a
            ret
        }


        charset:
        {
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
            ret
        }
    }
}