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
* `ds8` - eight bit destination register (`AL`–`DL`, `XL`, `YL`)
* `src` - source register (`A`–`D`, `X`, `Y`, `SP`, `BP`)
* `sr8` - eight bit source register (`AL`–`DL`, `XL`, `YL`)
* `reg` - register (when neither destination nor source make sense)
* `rg8` - eight bit register (when neither destination nor source make sense)
* `lrg` - loop register (`C`, `D`, `X`, `Y`)
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

## BR(S), Branch (short)

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `BR addr`                  | `0x07 0b00mmmxys addr`             | -                      |
| `BRS s8`                   | `0x07 0b00000000 s8`               | -                      |

Assigns the address to the `PC` register, transferring control to the desired address. The address is always based in bank zero, which means that code execution is limited to bank zero.

`BRS` is a form used when branching to addresses within +127/-128 bytes of `PC`.

> Note: immediate values are _relative_, meaning you can jump up to 32768 bytes back and 32767 bytes forward.

## CALL(S), Call subroutine (short)

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CALL addr`                | `0x07 0b01mmmxys addr`             | -                      |
| `CALLS s8`                 | `0x07 0b01000000 s8`               | -                      |

Pushes the current value of `PC` on to the stack, and then assigns the address to the `PC` register, transferring control to the desired address. The address is always based in bank zero, which means that code execution is limited to bank zero.

`CALLS` is a form used when calling a routine within +127/-128 bytes of `PC`.

> Note: immediate values are _relative_, meaning you can jump up to 32768 bytes back and 32767 bytes forward.

## CLR, Clear flag

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CLR flg`                  | `0b00111flg`                       | Any                    |

Clears the specified flag.

## CLRR, Clear Register

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CLRR rg8, u8`             | `0x06 0b00100rg8 u8`               | -                      |

Clears the low eight bits in `rg8` identified by `u8`.

## CMP, Compare

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `CMP dst, src`             | `0x04 0b00dstsrc`                  | C, V, N, Z             |

Compares the `dst` register with `src` and sets the flags accordingly:

* If `dst` is equal to `src`, the Zero (`Z`) flag is set; otherwise it is cleared.
* If `src` is less than `dst`, the Carry (`C`) flag is cleared and the Negative (`N`) flag is set.
* If `src` is greater than `dst`, all flags are cleared, except Carry (`C`), which is set.

> Note: Overflow (`V`) will be set according to the rules of subtraction and overflow; the result can be ignored, however.

## DEC, Decrement

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

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `HALT u8`                  | `0x06 0x14 u8`                     | -                      |

Halts the processor until an interrupt occurs, at which point the processor will wake up and begin execution at the immediately following instruction.

> Note: If `u8` is `0xFF`, the processor is placed into _single-step execution mode_. This is useful when working inside of a debugger, but not a good idea in production code.

## IDIV, Integer Divide

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IDIV dr*dst, src`         | `0x06 0x41 0bdrdstsrc`             | E, V, C, N, Z          |

Divides the 32-bit value represented by `dr` (high 16 bits) and `dst` (low 16 bits) by `src` and stores the lower 16 bits of the result in `dst`. If the result is larger than 16 bits, the Carry (`C`) and Overflow(`V`) flags are set and high 16 bits of the result is stored in `dr`. If the result is not larger than 16 bits, `dr` is not changed, and the Carry (`C`) and Overflow (`V`) flags are cleared.

Both Negative (`N`) and Zero (`Z`) are changed by the operation, but their results are meaningless in this context.

> Important: division by zero will set the Exception (`E`) flag. If the division occurs normally, the flag is clear.

## IMOD, Integer Modulo

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IDIV dr*dst, src`         | `0x06 0x41 0bdrdstsrc`             | E, V, C, N, Z          |

Divides the 32-bit value represented by `dr` (high 16 bits) and `dst` (low 16 bits) by `src` and stores the lower 16 bits of the remainder in `dst`. If the remainder is larger than 16 bits, the Carry (`C`) and Overflow(`V`) flags are set and high 16 bits of the result is stored in `dr`. If the result is not larger than 16 bits, `dr` is not changed, and the Carry (`C`) and Overflow (`V`) flags are cleared.

Both Negative (`N`) and Zero (`Z`) are changed by the operation, but their results are meaningless in this context.

> Important: modulus by zero will set the Exception (`E`) flag. If the modulus occurs normally, the flag is clear.

# IF, If flag

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IF flg`                   | `0b00100flg`                       | X                      |

Tests the flag in question and sets X if the flag is set, and clears X if the flag is unset. This has the effect of executing the next instruction only if the flag in question is set.

# IFN, If Not flag

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IFN flg`                  | `0b00101flg`                       | X                      |

Tests the flag in question and sets X if the flag is NOT set, and clears X if the flag is set. This has the effect of executing the next instruction only if the flag in question is clear.

# IFNR, If Not Register

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IFNR rg8, u8`             | `0x06 0b00111rg8 u8`               | X                      |

Tests the bits in `rg8` specified by `u8` in question and sets X if the bits are NOT set, and clears X if the bits aren't clear. This has the effect of executing the next instruction only if the bits in specified register are clear.

# IFR, If Register

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IFR rg8, u8`              | `0x06 0b00110rg8 u8`               | X                      |

Tests the bits in `rg8` specified by `u8` in question and sets X if the bits are set, and clears X if the bits are clear. This has the effect of executing the next instruction only if the bits in specified register are set.

## IN

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `IN sr8, u8`               | `0x06 0b01110sr8`                  | N, Z                   |

Reads an eight-bit value from the specified port and stores it in the low eight bits of `sr8`.

The Negative (`N`) and Zero (`Z`) flags are updated to reflect the value read from the port.

## INC, Increment

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `INC reg`                  | `0b00010reg`                       | C, V, N, Z             |

Increments `reg` by one. Carry (`C`) will be set if the operation exceeds 16 bits.

* Carry (`C`) is set if the unsigned result is larger than 16 bits. It is cleared otherwise.
* Overflow (`V`) is set if the signed result is incorrect. It is cleared otherwise.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## LDI, Load Immediate

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `LDI AL, u8`               | `0x40 u8`                          | N, Z                   |
| `LDI A, u16`               | `0x49 u16`                         | N, Z                   |

Loads the operand into the accumulator.

> Note: If loading an eight-bit value into `AL` it is important to remember that the upper eight bits are not changed. If you must be sure that the upper bits are zero, you should either execute an `LDI` into `A` or `XOR A, A`.

## LDS, Load from Source Bank

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `LDS AL, addr`             | `0b01mmmxy0 u16`                   | N, Z                   |
| `LDS A, addr`              | `0b01mmmxy1 u16`                   | N, Z                   |

Loads the value at `SB:addr` into the accumulator.

> Note: If loading an eight-bit value into `AL` it is important to remember that the upper eight bits are not changed. If you must be sure that the upper bits are zero, you should either execute an `LDI` into `A` or `XOR A, A`.

> Note: when using _BP-relative_ addressing, all addresses are constrained to the first bank (0).

## LDD, Load from Destination Bank

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `LDD AL, addr`             | `0x07 0b10mmmxy0 u16`              | N, Z                   |
| `LDD A, addr`              | `0x07 0b10mmmxy1 u16`              | N, Z                   |

Loads the value at `DB:addr` into the accumulator.

> Note: If loading an eight-bit value into `AL` it is important to remember that the upper eight bits are not changed. If you must be sure that the upper bits are zero, you should either execute an `LDI` into `A` or `XOR A, A`.

> Note: when using _BP-relative_ addressing, all addresses are constrained to the first bank (0).

## LOOP

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `LOOP lrg, s8`             | `0x06 0b001100lr s8`               | V, C, N, Z             |

Decrements `lrg`, and if `C` is set, branches to the relative `s8` address.

## MCOPY, Memory Copy

| Assembly                     | Encoding                           | Flags                  |
|:-----------------------------|:----------------------------------:|:----------------------:|
| `MCOPY dbr:drg, sbr:srg * C` | `0x06 6F DSdrgsrg`                 | -                      |

Copies a block of memory from one location to another. `dbr:drg` specifies the destination bank and register, while `sbr:srg` specifies the source bank and register. `C` specifies the amount of memory to copy.

## MFILL, Memory Fill

| Assembly                     | Encoding                           | Flags                  |
|:-----------------------------|:----------------------------------:|:----------------------:|
| `MFILL dbr:drg, sr8 * C`     | `0x06 6D D.drgsrg`                 | -                      |

Fills a block of memory with the value of `sr8`. The size of the block is specified by `C`, and the block is located at the combination of `dbr:drg`.

## MOV, Move

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `MOV dst, dr`              | `0b110dstdr`                       | -                      |
| `MOV dst, src`             | `0x06 0b10dstrc`                   | -                      |
| `MOV br, dr`               | `0b00001bdr`                       | -                      |

Copies the value from `dr` or `src` and stores it into `dst`. The first form can only copy data from the data registers (`A` - `D`), while the second form can copy data from any of the lower eight registers. The third form is provided only for moving data into the `SB` and `DB` registers from the data registers.

## MUL, Integer multiplication

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `MUL dr*dst, src`          | `0x06 0x40 0bdrdstsrc`             | C, V, N, Z             |

Multiplies the 32-bit value represented by `dr` (high 16 bits) and `dst` (low 16 bits) by `src` and stores the lower 16 bits of the result in `dst`. If the result is larger than 16 bits, the Carry (`C`) and Overflow(`V`) flags are set and high 16 bits of the result is stored in `dr`. If the result is not larger than 16 bits, `dr` is not changed, and the Carry (`C`) and Overflow (`V`) flags are cleared.

Both Negative (`N`) and Zero (`Z`) are changed by the operation, but their results are meaningless in this context.

> Important: there is no way to identify a multiplication which exceeds 32 bits.

## MSWAP, Memory Swap

| Assembly                     | Encoding                           | Flags                  |
|:-----------------------------|:----------------------------------:|:----------------------:|
| `MSWAP dbr:drg, sbr:srg * C` | `0x06 6E DSdrgsrg`                 | -                      |

Swaps a block of memory from one location to another. `dbr:drg` specifies the destination bank and register, while `sbr:srg` specifies the source bank and register. `C` specifies the amount of memory to swap.

> Note: this is useful for swapping code from higher banks into the first bank (0).

## NEG, Negate

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `NEG reg`                  | `0x06 0x08 0b00000dst`             | N, Z                   |

If `M` is clear, calculates the two's complement of the register and stores it back in the register. If `M` is set, the one's complement (or `NOT`) is calculated instead.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## NOP, No Operation

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
| `OUT sr8, u8`              | `0x06 0b01111sr8`                  | -                      |

Writes the low eight bits of `sr8` to the specified port.

## POP

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `POP regs`                 | `0b1111regs`                       | Potentially any or all |

Pops a value the size of `regs` off the stack at `SP` and loads it into `regs`. If `regs` is the `Flags`, the flags will be adjusted as a result.

`SP` is incremented by the size of `regs`.

> Note: It is not possible to `POP PC`; use `RET` instead, which accomplishes and encodes to the same thing.

## POPA, Pop All

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `PUSHA`                    | `0x06 0x18`                        | Any or all             |

Pops all the registers except `PC` from the stack.

## PUSH

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `PUSH regs`                | `0b1110regs`                       | -                      |

Decrements `SP` by the size of `regs` and then pushes `regs` onto the stack at `SP`.

## PUSHA, Push All

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `PUSHA`                    | `0x06 0x18`                        | -                      |

Pushes all the registers except `PC` onto the stack.

## RET, Return from subroutine/trap

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `RET`                      | `0xFF`                             | -                      |

Returns from a trap or subroutine by popping `PC` off the stack.

## SET, Set flag

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SET flg`                  | `0b00110flg`                       | Any                    |

Sets the specified flag.

## SETR, Set Register

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SETR rg8, u8`             | `0x06 0b00100rg8 u8`               | -                      |

Sets the low eight bits in `rg8` identified by `u8`. Equivalent to `OR reg8, u8`, except that the `OR` instruction doesn't accept an immediate value and operates on 16 bits.

## SHL, Shift Left

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SHL dst, reg`             | `0x05 0b00dstsrc`                  | C, N, Z                |

Shifts the contents of `dst` left by the number of times specified by `reg`. If `M` is set, the operation rotates the bits instead of shifting them out.

* Carry (`C`) is set if a bit is shifted out of the register; and clear if not.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## SHR, Shift Right

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `SHR dst, reg`             | `0x05 0b01dstsrc`                  | C, N, Z                |

Shifts the contents of `dst` right by the number of times specified by `reg`. If `M` is set, the operation rotates the bits instead of shifting them out.

* Carry (`C`) is set if a bit is shifted out of the register; and clear if not.
* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## STS, Store to Source bank

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `STS AL, addr`             | `0x07 0b11mmmxy0 u16`              | -                      |
| `STS A, addr`              | `0x07 0b11mmmxy1 u16`              | -                      |

Stores the value in the accumulator to `DB:addr`.

> Note: when using _BP-relative_ addressing, all addresses are constrained to the first bank (0).

## STD, Store to Destination bank

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `STD AL, addr`             | `0b10mmmxy0 u16`                   | -                      |
| `STD A, addr`              | `0b10mmmxy1 u16`                   | -                      |

Stores the value in the accumulator to `DB:addr`.

> Note: when using _BP-relative_ addressing, all addresses are constrained to the first bank (0).

## SUB, Subtract

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

## XCB, Exchange Bytes

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `XCB reg`                  | `0x06 0x10 0b00000dst`             | N, Z                   |

Exchanges the high and low eight bits of the specified register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.

## XOR, Exclusive OR

| Assembly                   | Encoding                           | Flags                  |
|:---------------------------|:----------------------------------:|:----------------------:|
| `XOR dst, src`             | `0x04 0b10dstsrc`                  | N, Z                   |

Exclusive-ORs the `dst` and `src` registers together, and then stores the result in the `dst` register.

* Negative (`N`) is set if the signed result is negative. It is cleared if positive or zero.
* Zero (`Z`) is set if the result is zero and cleared if otherwise.


