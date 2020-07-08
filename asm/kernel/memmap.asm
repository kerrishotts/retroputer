########################################
#
# Retroputer Kernel : Memory Map
#
########################################

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
        .const data-size        0x00700 # 
        .const rodata-start     0x78000 # read-only data
        .const rodata-size      0x02000
        .const sprite-start     0x01000 # kernel sprite data
        .const sprite-size      0x00100
        .const code-start       0x7C000 # start of kernel code
        .const vector-start     0x7FE00 # vectors containing jump codes
        .const init-start       0x7FF00 # initialization code
    }

    .namespace basic {
        #
        # BASIC MEMORY MAP
        #######################################################################
        #
        # Scratch storage for BASIC, such as code being entered, as well as
        # some variables to keep track of heaps and other things
        #######################################################################
        .const data-start       0x0B000 # BASIC scratch data
        .const data-size        0x01000
        #
        # Variable Storage
        #######################################################################
        .const vars-start       0x02000           # Start of BASIC variable storage
        .const ints-start       0x02000           # ... integers start at 0x02000
        .const ints-length      26 * 37 * 2       # ... variables are [A-Z][A-Z0-9]?; storage is 2 bytes
        .const strs-start       kmemmap.basic.ints-start + kmemmap.basic.ints-length 
        .const strs-length      26 * 37 * 2       # ... string variables are [A-Z][A-Z0-9]?$; pointer is 2 bytes
        .const dbls-start       kmemmap.basic.strs-start + kmemmap.basic.strs-length
        .const dbls-length      26 * 37 * 8       # ... reals are [A-Z][A-Z0-9]?#; value is 8 bytes
        .const arrs-start       kmemmap.basic.dbls-start + kmemmap.basic.dbls-length
        .const arrs-length      26 * 37 * 4       # ... arrays are [A-Z][A-Z0-9]?[|#|$](#). Stored as:
                                                  # ... 30:31 = type
                                                  # ... 30:16 = dimension (max dim is 16,383)
                                                  # ... 15:0  = pointer to object in heap
        .const vars-length      kmemmap.basic.ints-length + kmemmap.basic.strs-length + kmemmap.basic.dbls-length + kmemmap.basic.arrs-length
        .const vars-end         kmemmap.basic.vars-start + kmemmap.basic.vars-length
                                                  # ... should be 0x5C20, leaving 0x5BE0 (~23k) bytes free
        #
        # String and Array Storage (Heap; will need GC'd)
        #######################################################################
        .const heap-start       0x20000           # Heap has room for 64k of strings or
        .const heap-size        0x0FFFC           # array data
        #
        # Code Line Pointer Storage
        #######################################################################
        .const lptr-start       0x30000           # We can store up to 32k two-byte pointers to prog space
        .const lptr-size        0x10000           # so line #s can be 0 - 32767
        #
        # Code Line Storage (Another heap; will need GC'd)
        #######################################################################
        .const prog-start       0x40000           # Tokenized lines start here!
        .const prog-size        0x10000           # A program can be up to 64k large
        #
        # Garbage Collection Bank
        #######################################################################
        .const gcol-start       0x50000           # We reserve an entire 64k bank for
        .const gcol-size        0x10000           # garbage collection
        #
        # BASIC Executable Code and read-only data (ROM)
        #######################################################################
        .const code-start       0x7D000 # start of BASIC code
        .const rodata-start     0x7A000 # basic-rodata
        .const rodata-size      0x02000
    }

#    .namespace monitor {
#        .const data-start       0x0B800 # monitor scratch data
#        .const data-size        0x00800
#        .const code-start       0x7D800 # start of monitor code
#        .const rodata-start     0x76000 # read only data for monitor
#        .const rodata-size      0x02000
#    }

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