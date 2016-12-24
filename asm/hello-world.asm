#
# Hello World!
#
# This assembly program writes "Hello, world!" to the screen whenever the RESET
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
.var hello
.db 13                                  # Hello, world! is 13 characters long
.ds Hello, world!

#
# Write our string to the screen!
.code 0xFF00
    POP A                               # reset SP, since this is a RESET handler
    XOR A, A                            # clear A
    LDI AL, bank(&hello)                # Get the bank for hello (zero)
    MOV SB, A                           # Set source bank to zero
    LDI AL, bank(&tile-page-0)          # Get the bank for tile page 0 (three)
    MOV DB, A                           # Set destination bank to zero
    LDS AL, [addr(&hello)]              # Get the number of characters for our string
    MOV X, A                            # ... and store to X
    LDI AL, 41                          # Load the offset from top left (1 line down, 1 over)
    MOV Y, A                            # ... and store to Y
loop>
    LDS AL, [addr(&hello)+X]            # Get the Xth character from our string and put into AL
    DEC X                               # decrement X
    STD AL, [addr(&tile-page-0)+X+Y]    # Store the character into the X+Y position on screen
    IFN Z                               # If X is not zero,
        BR >loop                        # ... branch to loop
halt>                                   # otherwise:
    HALT 0x00                           # HALT! (until next trap)
    BR >halt                            # loop forever
    RET
        