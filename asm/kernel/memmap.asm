.namespace kmemmap {
    .const size                 0x80000 # size of memory
    .const start                0x00000 # bottom of memory
    .const end                  0x7FFFF # end of memory

    .namespace user {
        .const size             0x0A000
        .const start            0x02000 # start of user data and code
        .const end              0x0BFFF # end of user data and code
    }

    .namespace stack {
        .const size             0x00800 # size of the stack
        .const top              0x02000 # top of the stack
        .const bottom           0x01800 # bottom of the stack
    }

    .namespace kernel {
        .const data-start       0x01100 # kernel scratch data
        .const data-size        0x00800 # 
        .const rodata-start     0x78000 # read-only data
        .const rodata-size      0x04000
        .const sprite-start     0x01000 # kernel sprite data
        .const sprite-size      0x00100
        .const code-start       0x7C000 # start of kernel code
        .const vector-start     0x7FE00 # vectors containing jump codes
        .const init-start       0x7FF00 # initialization code
    }

    .namespace screen {
        .const charmap-start    0x70000
        .const palette-start    0x74000
    }

    .namespace traps {
        .const size             256 * 2
        .const start            0x00000 # bottom of trap vectors
        .const end              0x007FF # top of traps

        .namespace vectors {
            .namespace rtc {
                .const change   ktrapmap.rtc.change << 1
                .const timer-0  ktrapmap.rtc.timer-0 << 1
                .const timer-1  ktrapmap.rtc.timer-1 << 1
            }
            .namespace screen {
                .const vsync    ktrapmap.screen.vsync << 1
            }
            .namespace keyboard {
                .const key-down ktrapmap.keyboard.key-down << 1
                .const key-up   ktrapmap.keyboard.key-up << 1
                .const key-pressed ktrapmap.keyboard.key-pressed << 1
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
                .const rcvd    ktrapmap.console.rcvd << 1
                .const sent    ktrapmap.console.sent << 1
                .const ack     ktrapmap.console.ack  << 1
            }
            .namespace com2 {
                .const rcvd    ktrapmap.com2.rcvd << 1
                .const sent    ktrapmap.com2.sent << 1
                .const ack     ktrapmap.com2.ack  << 1
            }
            .namespace com3 {
                .const rcvd    ktrapmap.com2.rcvd << 1
                .const sent    ktrapmap.com2.sent << 1
                .const ack     ktrapmap.com2.ack  << 1
            }
            .namespace com4 {
                .const rcvd    ktrapmap.com2.rcvd << 1
                .const sent    ktrapmap.com2.sent << 1
                .const ack     ktrapmap.com2.ack  << 1
            }
            .namespace debugger {
            }
            .namespace power {
                .const reset   ktrapmap.power.reset << 1
            }
        }

    }

}