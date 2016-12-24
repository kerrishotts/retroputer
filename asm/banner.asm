#
# Banner
#
# This assembly program writes a banner to the screen whenever the RESET
# trap is triggered. When finished, the machine halts.
#

#
# Handle FRAME trap by returning immediately
.code 0xFE00
    RET                                 # nothing to do!

#
# Create a reference to tile page 0
.data 0x30000
.var tile-page-0

#
# Program data
.data 0x02000
.var line1
.db 40
.db 32 32
.ds **** Retroputer 256
.db 32
.ds Kernel v1.0 ****
.db 32 32

.var line2
.db 40
.db 32
.ds 256K RAM avail 45056 Kernel bytes free
.db 32

.var line3
.db 6
.ds Ready.

.def border-width  0x1FA05
.def border-height 0x1FA06

#
# Write our banner to the screen!
.code 0xFF00
    POP A                               # reset SP, since this is a RESET handler
    XOR A, A                            # clear A

    # eliminate our borders
    LDI AL, bank(#border-width)
    MOV DB, A                           # DB = 0x01 (bank 1 is screen config)
    LDI AL, 0x00
    STD AL, [word(#border-width)]       # word --> FA05 (discards bank)
    STD AL, [word(#border-height)]

line1>
    LDI A, addr(&line1)
    MOV D, A                            # D = line 1 of text
    LDI A, 40
    MOV Y, A                            # Y = 40 (line 2 on screen)
    CALL >print                         # print, please!
line2>
    LDI A, addr(&line2)
    MOV D, A                            # D = line 1 of text
    LDI A, 120
    MOV Y, A                            # Y = 40 (line 2 on screen)
    CALL >print                         # print, please!
line3>
    LDI A, addr(&line3)
    MOV D, A                            # D = line 1 of text
    LDI A, 200
    MOV Y, A                            # Y = 40 (line 2 on screen)
    CALL >print                         # print, please!
halt>                                   # otherwise:
    HALT 0x00                           # HALT! (until next trap)
    BR >halt                            # loop forever
    RET

    # print requested string to screen
    # D = address of string to print (PASCAL-type]) (in bank 0)
    # Y = screen offset
print>
    PUSH A                              # Be nice, preserve A
    PUSH FLAGS                          # and flags
    PUSH DB
    PUSH SB                             # and bank registers
    XOR A, A                            # Clear A
    LDI AL, 0x00
    MOV SB, A                           # Data is assumed to be in bank 0
    LDI AL, 0x03
    MOV DB, A                           # Screen is in bank 3
    LDS AL, [D]                         # Get number of characters
    MOV X, A                            # ... and assign to X
print-loop>
    LDS AL, [D+X]                       # Get the Xth character
    DEC X
    STD AL, [0x0000+X+Y]                # Put the character at the X+Y position
    IFN Z                               # If X is not zero,
        BR >print-loop                  # ... keep going
    POP SB                              # clean up
    POP DB
    POP FLAGS
    POP A
    RET
