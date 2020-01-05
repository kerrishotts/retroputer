########################################
#
# Retroputer Kernel : Trap Mapping
#
########################################
.namespace ktrapmap {
    .namespace rtc {
        .const root               0x80
        .const change             0x80  # rtc clock changed
        .const timer-0            0x81  # timer-0 expired
        .const timer-1            0x82  # timer-1 expired
    }

    .namespace screen {
        .const root               0x88
        .const vsync              0x88  # ready for a new frame
    }

    .namespace keyboard {
        .const root               0x98
        .const key-down           0x98  # key is down
        .const key-up             0x99  # key is up
        .const key-pressed        0x9A  # key has had a down/up cycle
    }

    .namespace controller {
        .const root               0xA0
    }

    .namespace mouse {
        .const root               0xA8
    }

    .namespace audio {
        .const root               0xB0
    }

    .namespace storage {
        .const root               0xB8
    }

    .namespace console {
        .const root               0xC0
        .const rcvd               0xC0
        .const sent               0xC1
        .const ack                0xC2
    }

    .namespace com2 {
        .const root               0xC8
        .const rcvd               0xC8
        .const sent               0xC9
        .const ack                0xCA
    }

    .namespace com3 {
        .const root               0xD0
        .const rcvd               0xD0
        .const sent               0xD1
        .const ack                0xD2
    }

    .namespace com4 {
        .const root               0xD8
        .const rcvd               0xD8
        .const sent               0xD9
        .const ack                0xDA
    }

    .namespace debugger {
        .const root               0xF0
    }

    .namespace power {
        .const root               0xF8
        .const reset              0xFF  # machine reset requested
    }

}
