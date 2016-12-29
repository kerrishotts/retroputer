.code 0xFF00
LDI A, 0x03                     => 49 00 03
MOV DB, A                       => 0c                                   # db = bank 3
LDI A, 0x03E7                   => 49 03 e7
MOV B, A                        => c4                                   # B := 0x03E7
XOR A, A                        => 04 80
MOV X, B                        => d1                                   # X := B
CLR Z                           => 38                                   # clear ZERO
STD AL, [0x0000+X]              => 94 00 00                             # Write AL to screen memory
INC A                           => 10                                   # A++
DEC X                           => 1c                                   # X--
IFN N                           => 29                                   # If not negative
BR -10                          => 07 09 ff f6                          # branch back to STD AL...
INC A                           => 10                                   # A++
BR -17                          => 07 09 ff ef                          # branch back to MOV X, B
.code 0xFE00
RET                             => ff                                   # make sure FRAME trap has a return