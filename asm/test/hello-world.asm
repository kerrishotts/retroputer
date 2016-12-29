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
.db 13                                                                  # Hello, world! is 13 characters long
.ds Hello, world!

#
# Write our string to the screen!
.code 0xFF00
    POP A                               => f0                           # reset SP, since this is a RESET handler
    XOR A, A                            => 04 80                        # clear A
    LDI AL, bank(&hello)                => 40 00                        # Get the bank for hello (zero)
    MOV SB, A                           => 08                           # Set source bank to zero
    LDI AL, bank(&tile-page-0)          => 40 03                        # Get the bank for tile page 0 (three)
    MOV DB, A                           => 0c                           # Set destination bank to zero
    LDS AL, [addr(&hello)]              => 50 20 00                     # Get the number of characters for our string
    MOV X, A                            => d0                           # ... and store to X
    LDI AL, 41                          => 40 29                        # Load the offset from top left (1 line down, 1 over)
    MOV Y, A                            => d4                           # ... and store to Y
loop>
    LDS AL, [addr(&hello)+X]            => 54 20 00                     # Get the Xth character from our string and put into AL
    DEC X                               => 1c                           # decrement X
    STD AL, [addr(&tile-page-0)+X+Y]    => 96 00 00                     # Store the character into the X+Y position on screen
    IFN Z                               => 28                           # If X is not zero,
        BR >loop                        => 07 09 ff f4                  # ... branch to loop
halt>                                                                   # otherwise:
    HALT 0x00                           => 06 20 00                     # HALT! (until next trap)
    BR >halt                            => 07 09 ff f9                  # loop forever
    RET                                 => ff
        