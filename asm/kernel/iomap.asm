########################################
#
# Retroputer Kernel  : IO Map
#
########################################

.namespace kiomap {
    .namespace rtc {
        # real time clock
        .const hour             0x00
        .const minute           0x01
        .const second           0x02
        .const centisecond      0x03
        .const timer-modes      0x04
        .const timer-0-ms-3     0x05
        .const timer-0-ms-2     0x06
        .const timer-0-ms-1     0x07
        .const timer-0-ms-0     0x08
        .const timer-1-ms-3     0x09
        .const timer-1-ms-2     0x0A
        .const timer-1-ms-1     0x0B
        .const timer-1-ms-0     0x0C
        .const mode             0x0D
      # .const                  0x0E    # reserved for expansion
        .const reset            0x0F
    }

    .namespace screen {
        # screen configuration
        .const palette-page     0x10    # configure the palette page
        .const bg-color         0x11    # background color
        .const layer-0-src      0x12    # lll_ppppp
        .const layer-0-cfg      0x13    # v_s_ttttt
        .const layer-0-pos      0x14    # yyyy_xxxx
        .const layer-0-bg-color 0x15
        .const layer-0-fg-color 0x16
        .const layer-0-window   0x17    # yyyy_xxxx
        .const layer-1-src      0x18
        .const layer-1-cfg      0x19
        .const layer-1-pos      0x1A
        .const layer-1-bg-color 0x1B
        .const layer-1-fg-color 0x1C
        .const layer-1-window   0x1D
        .const layer-2-src      0x1E
        .const layer-2-cfg      0x1F
        .const layer-2-pos      0x20
        .const layer-2-bg-color 0x21
        .const layer-2-fg-color 0x22
        .const layer-2-window   0x23
        .const layer-3-src      0x24
        .const layer-3-cfg      0x25
        .const layer-3-pos      0x26
        .const layer-3-bg-color 0x27
        .const layer-3-fg-color 0x28
        .const layer-3-window   0x29
        .const layer-mode       0x2A    # 33_22_11_00
        .const border-color     0x2B
        .const border-cfg       0x2C    # v_?_yyy_xxx
    }
    .namespace keyboard {
    }
    .namespace controller {
    }
    .namespace mouse {
    }
    .namespace audio {
    }
    .namespace storage {
    }
    .namespace console {
        .const ctrl             0x80    # control line
        .const recv             0x81
        .const send             0x82
        .const ack              0x83
    }
    .namespace com2 {
        .const ctrl             0x90    # control line
        .const recv             0x91
        .const send             0x92
        .const ack              0x93
    }
    .namespace com3 {
        .const ctrl             0xA0    # control line
        .const recv             0xA1
        .const send             0xA2
        .const ack              0xA3
    }
    .namespace com4 {
        .const ctrl             0xB0    # control line
        .const recv             0xB1
        .const send             0xB2
        .const ack              0xB3
    }
    .namespace debugger {
    }
    .namespace power {
    }

}