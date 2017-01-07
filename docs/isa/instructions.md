# Instructions

Each instruction supported by the 6516 assembler is provided below, along with the associated encodings and flag modifications.

The following conventions are used:

* `u8` - unsigned byte
* `u16` - unsigned word
* `u18` - unsigned 18-bit value
* `s8` - signed byte
* `s16` - signed word
* `br` - bank register (`SB` or `DB`)
* `dr` - data register (`A`–`D`)
* `dst` - destination register (`A`–`D`, `X`, `Y`, `SP`, `BP`)
* `src` - source register (`A`–`D`, `X`, `Y`, `SP`, `BP`)
* `reg` - register (when neither destination nor source make sense)
* `regs` - register (any register, including bank registers or `Flags`)
* `addr` - address
* `flg` - flag
* `mmm` - addressing mode
* `x` - index by x
* `y` - index by y
* `s` - scale (0 = byte, 1 = word)

## ADD

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `ADD dst, src`             | `0x04 0b00dstsrc`                  | C, V, N, Z             |

Adds the `dst` and `src` registers together, and then stores the result in the `dst` register.

* Carry (`C`) is set if the unsigned result is larger than 16 bits. It is cleared otherwise.
* Overflow (`V`) is set if the signed result is incorrect. It is cleared otherwise.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## AND

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `AND dst, src`             | `0x05 0b10dstsrc`                  | N, Z                   |

ANDs the `dst` and `src` registers together, and then stores the result in the `dst` register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## BR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `BR addr`                  | `0x07 0b00mmmxys addr`             | -                      |

Assigns the address to the `PC` register, transferring control to the desired address. The address is always based in bank zero, which means that code execution is limited to bank zero.

> Note: immediate values are _relative_, meaning you can jump up to 32768 bytes back and 32767 bytes forward.

## CALL

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CALL addr`                | `0x07 0b01mmmxys addr`             | -                      |

Pushes the current value of `PC` on to the stack, and then assigns the address to the `PC` register, transferring control to the desired address. The address is always based in bank zero, which means that code execution is limited to bank zero.

> Note: immediate values are _relative_, meaning you can jump up to 32768 bytes back and 32767 bytes forward.


## CLR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CLR flg`                  | `0b00111flg`                       | Any                    |

Clears the specified flag.

## CLRR 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CLRR reg, u8`             | `0x06 0b00100reg u8`               | -                      |

Clears the low eight bits in `reg` identified by `u8`. 

## CMP

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CMP dst, src`             | `0x04 0b00dstsrc`                  | C, V, N, Z             |

Compares the `dst` register with `src` and sets the flags accordingly:

* If `dst` is equal to `src`, the Zero (`Z`) flag is set; otherwise it is cleared.
* If `src` is less than `dst`, the Carry (`C`) flag is cleared and the Negative (`N`) flag is set.
* If `src` is greater than `dst`, all flags are cleared, except Carry (`C`), which is set.

> Note: Overflow (`V`) will be set according to the rules of subtraction and overflow; the result can be ignored, however.

## DEC

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `DEC reg`                  | `0b00010reg`                       | C, V, N, Z             |

Decrements `reg` by one. Carry (`C`) will be unset if the operation causes `reg` to go below zero.

* Carry (`C`) is set if no borrow was necessary; otherwise it is cleared.
* Overflow (`V`) is set if the signed result is incorrect. It is cleared otherwise.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## ENTER

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `ENTER u8`                 | `0x01 u8`                          | -                      |

Creates a stack frame of `u8` bytes on the stack.

## EXIT

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `EXIT u8`                  | `0x02 u8`                          | -                      |

Pops a stack frame of `u8` bytes from the stack.

## HALT

## IDIV

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IDIV dr*dst, src`         | `0x06 0x41 0bdrdstsrc`             | E, V, C, N, Z          |

Divides the 32-bit value represented by `dr` (high 16 bits) and `dst` (low 16 bits) by `src` and stores the lower 16 bits of the result in `dst`. If the result is larger than 16 bits, the Carry (`C`) and Overflow(`V`) flags are set and high 16 bits of the result is stored in `dr`. If the result is not larger than 16 bits, `dr` is not changed, and the Carry (`C`) and Overflow (`V`) flags are cleared.

Both Negative (`N`) and Zero (`Z`) are changed by the operation, but their results are meaningless in this context.

> Important: division by zero will set the Exception (`E`) flag. If the division occurs normally, the flag is clear.

## IMOD

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IDIV dr*dst, src`         | `0x06 0x41 0bdrdstsrc`             | E, V, C, N, Z          |

Divides the 32-bit value represented by `dr` (high 16 bits) and `dst` (low 16 bits) by `src` and stores the lower 16 bits of the remainder in `dst`. If the remainder is larger than 16 bits, the Carry (`C`) and Overflow(`V`) flags are set and high 16 bits of the result is stored in `dr`. If the result is not larger than 16 bits, `dr` is not changed, and the Carry (`C`) and Overflow (`V`) flags are cleared.

Both Negative (`N`) and Zero (`Z`) are changed by the operation, but their results are meaningless in this context.

> Important: modulus by zero will set the Exception (`E`) flag. If the modulus occurs normally, the flag is clear.

# IF 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IF flg`                   | `0b00100flg`                       | X                      |

Tests the flag in question and sets X if the flag is set, and clears X if the flag is unset. This has the effect of executing the next instruction only if the flag in question is set.

# IFN 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IFN flg`                  | `0b00101flg`                       | X                      |

Tests the flag in question and sets X if the flag is NOT set, and clears X if the flag is set. This has the effect of executing the next instruction only if the flag in question is clear.

# IFNR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IFNR reg, u8`             | `0x06 0b00111reg u8`               | X                      |

Tests the bits in `reg` specified by `u8` in question and sets X if the bits are NOT set, and clears X if the bits aren't clear. This has the effect of executing the next instruction only if the bits in specified register are clear.

# IFR 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IFR reg, u8`              | `0x06 0b00110reg u8`               | X                      |

Tests the bits in `reg` specified by `u8` in question and sets X if the bits are set, and clears X if the bits are clear. This has the effect of executing the next instruction only if the bits in specified register are set.

## IN

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IN src, u8`               | `0x06 0b01110src`                  | N, Z                   |

Reads an eight-bit value from the specified port and stores it in the low eight bits of `src`. 

The Negative (`N`) and Zero (`Z`) flags are updated to reflect the value read from the port.

## INC

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `INC reg`                  | `0b00010reg`                       | C, V, N, Z             |

Increments `reg` by one. Carry (`C`) will be set if the operation exceeds 16 bits. 

* Carry (`C`) is set if the unsigned result is larger than 16 bits. It is cleared otherwise.
* Overflow (`V`) is set if the signed result is incorrect. It is cleared otherwise.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## LDI

## LDS

## LDD

## MCOPY

TODO

## MFILL

TODO

## MOV

## MUL

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `MUL dr*dst, src`          | `0x06 0x40 0bdrdstsrc`             | C, V, N, Z             |

Multiplies the 32-bit value represented by `dr` (high 16 bits) and `dst` (low 16 bits) by `src` and stores the lower 16 bits of the result in `dst`. If the result is larger than 16 bits, the Carry (`C`) and Overflow(`V`) flags are set and high 16 bits of the result is stored in `dr`. If the result is not larger than 16 bits, `dr` is not changed, and the Carry (`C`) and Overflow (`V`) flags are cleared.

Both Negative (`N`) and Zero (`Z`) are changed by the operation, but their results are meaningless in this context.

> Important: there is no way to identify a multiplication which exceeds 32 bits.

## MSWAP

TODO

## NEG

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `NEG reg`                  | `0x06 0x08 0b00000dst`             | N, Z                   |

Calculates the two's complement of the register and stores it back in the register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## NOP

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `NOP`                      | `0x00`                             | -                      |

Performs no operation.

## OR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `OR dst, src`              | `0x05 0b11dstsrc`                  | N, Z                   |

ORs the `dst` and `src` registers together, and then stores the result in the `dst` register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## OUT

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `OUT src, u8`              | `0x06 0b01111src`                  | -                      |

Writes the low eight bits of `src` to the specified port.

## POP 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `POP regs`                 | `0b1111regs`                       | Potentially any or all |

Pops a value the size of `regs` off the stack at `SP` and loads it into `regs`. If `regs` is the `Flags`, the flags will be adjusted as a result. 

`SP` is incremented by the size of `regs`.

> Note: It is not possible to `POP PC`; use `RET` instead, which accomplishes and encodes to the same thing.

## POPA  

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `PUSHA`                    | `0x06 0x18`                        | Any or all             |

Pops all the registers except `PC` from the stack.

## PUSH

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `PUSH regs`                | `0b1110regs`                       | -                      |

Decrements `SP` by the size of `regs` and then pushes `regs` onto the stack at `SP`. 

## PUSHA 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `PUSHA`                    | `0x06 0x18`                        | -                      |

Pushes all the registers except `PC` onto the stack.

## RET

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `RET`                      | `0xFF`                             | -                      |

Returns from a trap or subroutine by popping `PC` off the stack.

## SET 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SET flg`                  | `0b00110flg`                       | Any                    |

Sets the specified flag.

## SETR 

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SETR reg, u8`             | `0x06 0b00100reg u8`               | -                      |

Sets the low eight bits in `reg` identified by `u8`. Equivalent to `OR reg8, u8`, except that the `OR` instruction doesn't accept an immediate value and operates on 16 bits.

## SHL

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SHL dst, reg`             | `0x05 0b00dstsrc`                  | C, N, Z                |

Shifts the contents of `dst` left by the number of times specified by `reg`.

* Carry (`C`) is set if a bit is shifted out of the register; and clear if not.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## SHR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SHR dst, reg`             | `0x05 0b01dstsrc`                  | N, Z,                  |

Shifts the contents of `dst` right by the number of times specified by `reg`.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## STS

## STD

## SUB

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SUB dst, src`             | `0x04 0b01dstsrc`                  | C, V, N, Z             |

Subtracts `src` from `dst` and stores the result in `dst`.

* Carry (`C`) is set if no borrow was necessary; otherwise it is cleared.
* Overflow (`V`) is set if the signed result is incorrect. It is cleared otherwise.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## SWAP

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SWAP dst, src             | `0x06 0b11dstsrc`                  | -                      |

Swaps the values of `dst` and `src`.

## TRAP

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `TRAP AL`                  | `0x03`                             | -                      |
| `TRAP u8`                  | `0x06 0x01 u8`                     | -                      |

Sends the specified trap. These traps are not affected by the Interrupt Enable (`I`) flag.

## XCB

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `XCB reg`                  | `0x06 0x10 0b00000dst`             | N, Z                   |

Exchanges the high and low eight bits of the specified register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## XOR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `XOR dst, src`             | `0x04 0b10dstsrc`                  | N, Z                   |

Exclusive-ORs the `dst` and `src` registers together, and then stores the result in the `dst` register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.


