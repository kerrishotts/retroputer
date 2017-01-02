# Instructions

The following instructions are understood by the 6516 CPU, once assembled by the assembler.

## ADD dst, src

> Encoding: `0x04, 0b00dstsrc`
> Flags: Carry, Overflow, Negative, Zero

Adds the `dst` and `src` registers together, and then stores the result in the `dst` register.

> Note: Only the lower seven registers are supported.

## ENTER u8

> Encoding: `0x01 u8`

Creates a stack frame of `u8` bytes on the stack.

## EXIT u8

> Encoding: `0x02 u8`

Pops a stack frame of `u8` bytes from the stack.

## NOP

> Encoding: `0x00`

Performs no operation.

## RET

> Encoding: `0xFF`

Returns from a trap or subroutine by popping `PC` off the stack.

## TRAP AL|u8

> Encoding: 
>    `TRAP AL = 0x03`
>    `TRAP u8 = 0x06 0x01 u8`

Sends the specified trap. These traps are not affected by the Interrupt Enable (`I`) flag.



