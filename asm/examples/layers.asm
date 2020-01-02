###############################################################################
#
# LAYERS
# ------
#
# This sample demonstrates the multiple layers that can be rendered by the
# VGU.
#

.namespace layers-demo {

    .const PORT_LAYER_SELECT           0x12
    .const PORT_LAYER_VISIBLE          0x13
    .const PORT_LAYER_VISIBLE_MASK     0b1_000_00000
    .const PORT_LAYER_SOURCE           0x13
    .const PORT_LAYER_SOURCE_MASK      0b0_000_11111
    .const PORT_LAYER_SCALE            0x14
    .const PORT_LAYER_SCALE_MASK       0b11_0_00000
    .const PORT_LAYER_TILE_SOURCE      0x14
    .const PORT_LAYER_TILE_SOURCE_MASK 0b00_0_11111
    .const PORT_LAYER_BG_COLOR         0x15
    .const PORT_LAYER_FG_COLOR         0x16
    .const PORT_LAYER_X_OFFSET         0x17
    .const PORT_LAYER_Y_OFFSET         0x18
    .const PORT_LAYER_X_CROP           0x19
    .const PORT_LAYER_Y_CROP           0x1A
    .const PORT_LAYER_MODE             0x1B

    .const MATTE_LAYER                 0x00
    .const BG_TILE_LAYER               0x01
    .const FG_TILE_LAYER               0x02
    .const SCORE_LAYER                 0x03

    .segment data 0x03000 {
        score: .word 12345
    }

    .segment code 0x02000 {

        init-score-layer: {
            ld al, SCORE_LAYER
            out PORT_LAYER_SELECT, al                         # layer 3 is the score layer

            ld al, 0x00
            out PORT_LAYER_MODE, al                           # score is 32x24 tile mode

            in al, PORT_LAYER_VISIBLE
            and al, !PORT_LAYER_VISIBLE_MASK
            or al, 0xFF & PORT_LAYER_VISIBLE_MASK
            out PORT_LAYER_VISIBLE                            # make sure score page is visible

            in al, PORT_LAYER_SCALE
            and al, !PORT_LAYER_SCALE_MASK
            or al, 0b10_0_00000                               # score layer is multiplied by four
            out PORT_LAYER_SCALE
        }

        init-matte-layer: {
            ld al, MATTE_LAYER
            out PORT_LAYER_SELECT, al                         # layer 3 is the score layer

            ld al, 0x02
            out PORT_LAYER_MODE, al                           # matte layer is tile mode 2

            in al, PORT_LAYER_VISIBLE
            and al, !PORT_LAYER_VISIBLE_MASK
            or al, 0xFF & PORT_LAYER_VISIBLE_MASK
            out PORT_LAYER_VISIBLE                            # make sure the  page is visible
        }

        init-bg-tile-layer: {
        }

        init-fg-tile-layer: {
        }






        ld al, 0
    top:
        ld x, 0
        ld c, 768
        ld bl, 0xff
        ld dl, 0
        do {
            st [0x10000,x], al
            st [0x11000,x], bl
            st [0x12000,x], dl
            inc al
            inc x
            dec c
        } while !z
        dec al
        br top
        brk
    }

}