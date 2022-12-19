# Instructions

> ### Instruction Set Encodings
>
> If you want to see the entire instruction set and how it is encoded, [take a look at this reference](https://docs.google.com/spreadsheets/d/e/2PACX-1vSIMH-L17-UxNa2rhyLNF6gWUWPXic_-txike9oHIXu6zykN89dUTzA0-zNfKN-6toSEn6ox084nnId/pubhtml).

## ADD \(with Carry\)

Adds the source to the destination and stores the result in the destination register using the following algorithm \(here, `C` denotes the carry flag\).

```text
r = carry_in + source + dest_in
sign_source = source[msb]
sign_dest = dest[msb]
dest_out = r[msb:0]
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = {
    0 when r>>width = 0
    1 when r>>width >= 0
}

n_out = r[msb]

v_out = {
    0 when sign_dest = 0, sign_source = 0, and n_out = 0
    1 when sign_dest = 0, sign_source = 0, and n_out = 1
    0 when sign_dest = 0, sign_source = 1, and n_out = 0
    0 when sign_dest = 0, sign_source = 1, and n_out = 1
    0 when sign_dest = 1, sign_source = 0, and n_out = 0
    0 when sign_dest = 1, sign_source = 0, and n_out = 1
    1 when sign_dest = 1, sign_source = 1, and n_out = 0
    0 when sign_dest = 1, sign_source = 1, and n_out = 1
}    
```

> **Warning**
>
> `ADD` always takes the carry flag in to account when performing addition. As such, you should always `CLR C` before any addition when you know that the carry flag should not be considered.

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |
| Data Register | Immediate 8-bit value |
| Data Register | Immediate 16-bit value |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
ADD dest, src
ADD dest, immediate
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 1234
    add a, 2345       # a is 3579

    ld a, 0x5000
    ld b, 0x4000
    add a, b          # value in a is incorrect if this is signed
                      # addition -- V is set. For unsigned addition
                      # a is 0x9000.
}
```

## AND \(Bitwise AND\)

Performs a bitwise AND on the source and destination operands, and stores the result in the destination.

```text
r = dest_out = dest_in AND source_in
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = 0

n_out = r[msb]

v_out = 0
```

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |
| Data Register | Immediate 8-bit value |
| Data Register | Immediate 16-bit value |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | 0 | ✓ |

#### Grammar

```text
AND dest, src
AND dest, immediate
```

#### Examples

```text
.segment code 0x02000 {
    ld al, 0b1111_0000
    and al, 0b0001_1000    # al is 0b0001_0000

    ld a, 0x1234
    ld b, 0x00FF
    and a, b               # a is 0x0034
}
```

## BR \(Branch\)

Sets `PC` to the specified value, causing a jump or branch to that location. Code execution continues from the new address. The width of the value determines if the branch is _short_ \(8 bits\) or _long_ \(16 bits\).

Branches can be unconditional \(the branch is taken every time\), or they can be conditional \(based upon if a flag is set or not\).

#### Forms

A branch is _long_ unless `s` is added to the alias. That is, `br` is a long branch, whereas `brs` is a short branch.

The unconditional form specifies only a target address:

```text
br next-frame        # long branch
```

The conditional form specifies a target address _and_ a flag. If the flag is set, the branch will be taken. Conditionals can also be _negated_, meaning that the branch will be taken if the flag is clear.

```text
brs z next-frame        # branch to next-frame if last ALU op was zero
br !c end-game          # branch to end-game if carry is clear
```

It should be noted that there are no concessions offered for checking multiple flags at once -- such as you might want to do when checking if a value is less than or equal to another value. Instead, you must make multiple branches:

```text
ld a, 0x4000
cmp a, 0x4001
br z lte        # when zero is set, that signals equality
br n lte        # when negative is set, that signals less-than
```

For reference, the following conditions may prove useful when mapping flags to their mathematical equivalents:

| Result of Comparison | Flags |
| :--- | :--- |
| Equal | Z |
| Not Equal | !Z |
| Less Than | N |
| Greater Than | C |
| Less Than or Equal | Z, N |
| Greater Than or Equal | Z, C |

#### Grammar

```text
BR[S] [!][flag]
```

#### Examples

```text
.segment data 0x03000 {
     lives: .byte 3
}
.segment code 0x02000 {
     ld al, [lives]
     cmp al, 0
     br z game-over
     # more code
game-over:
     # no more lives left!
     brk
}
```

## **BRK \(Break\)**

Transitions the CPU to single-step mode. This will cause the debugger to halt the processor until a single-step or continue signal is received.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | + | - | + | - | - | - | - |

#### Grammar

```text
BRK
```

## CALL \(Subroutine\)

Pushes `PC` on to the stack, and then sets `PC` to the specified value, causing a jump or branch to that location. Code execution continues from the new address. The width of the value determines if the branch is _short_ \(8 bits\) or _long_ \(16 bits\).

Calls can be unconditional \(the branch is taken every time\), or they can be conditional \(based upon if a flag is set or not\).

#### Forms

A call is _long_ unless `s` is added to the alias. That is, `call` is a long call, whereas `calls` is a short call.

The unconditional form specifies only a target address:

```text
call next-frame        # long call
```

The conditional form specifies a target address _and_ a flag. If the flag is set, the call will be taken. Conditionals can also be _negated_, meaning that the call will be taken if the flag is clear.

```text
calls z next-frame        # call next-frame if last ALU op was zero
call !c end-game          # call end-game if carry is clear
```

It should be noted that there are no concessions offered for checking multiple flags at once -- such as you might want to do when checking if a value is less than or equal to another value. Instead, you should make multiple branches and then call :

```text
ld a, 0x4000
cmp a, 0x4001
br z _lte        # when zero is set, that signals equality
br n _lte        # when negative is set, that signals less-than
brk
_lte:
call lte         # call lte if less than or equal
```

#### Grammar

```text
CALL[S] [!][flag]
```

#### Examples

```text
.segment data 0x03000 {
     score: .word 0
}
.segment code 0x02000 {
     ld a, [score]
     cmp a, 10000
     call z extra-life
     # more code
     brk
extra-life:
     # bonus life!
     ld a, [score]
     inc a
     st [score], a
     ret
}
```

## **CLR \(Clear Flag\)**

Clears the specified flag.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
CLR flag
```

#### Example

```text
clr c        # clear the carry flag before addition
add a, b
```

## CMP \(Compare\)

Compares the two values and sets the flags according to the results of the comparison.

```text
r = dest_in - source
sign_source = source[msb]
sign_dest = dest_in[msb]
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = {
    0 when r>>width = 0
    1 when r>>width >= 0
}

n_out = r[msb]

v_out = {
    0 when sign_dest = 0, sign_source = 1, and n_out = 0
    1 when sign_dest = 0, sign_source = 1, and n_out = 1
    0 when sign_dest = 0, sign_source = 0, and n_out = 0
    0 when sign_dest = 0, sign_source = 0, and n_out = 1
    0 when sign_dest = 1, sign_source = 1, and n_out = 0
    0 when sign_dest = 1, sign_source = 1, and n_out = 1
    1 when sign_dest = 1, sign_source = 0, and n_out = 0
    0 when sign_dest = 1, sign_source = 0, and n_out = 1
}   
```

> **Note**
>
> Unlike other arithmetic operations, `cmp` does not take the carry flag into consideration when performing a comparison.

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |
| Data Register | Immediate 8-bit value |
| Data Register | Immediate 16-bit value |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

> **Note**
>
> Although the full contingent of ALU flags is calculated when `cmp` is executed, only `N` , `C`, and`Z` have any real meaning.

| Z | N | C | Meaning |
| :--- | :--- | :--- | :--- |
| Set | - | - | Source and Destination are equal |
| Clear | - | - | Source and Destination are unequal |
| - | Set | - | Destination is less than Source |
| - | - | Set | Destination is greater than Source |

#### Grammar

```text
CMP dest, src
CMP dest, immediate
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 0x2000
    ld b, 0x2001
    cmp a, b          # N will be set because a < b
                      # Z will be clear (not equal)
}
```

## DEC \(Decrement\)

Decrements the specified register by one, updating flags as appropriate:

| Condition | Flag |
| :--- | :--- |
| Result is zero | Z is set |
| Result is negative | N is set |
| Result goes below zero | C is set |
| Result goes below signed minimum | V is set |

> **Note**
>
> Unlike other arithmetic operations, `dec` does not take the carry flag into consideration when performing a comparison.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
DEC dest
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 0x2000
    dec a
}
```

## DIV \(Unsigned Divide\)

Divides the destination by the source, and stores the result in the destination.

```text
r = source / dest_in
dest_out = r[msb:0]
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = 0

n_out = r[msb]

v_out = 0

EX_out = {
    1 when dest_in = 0
    EX_in when dest_in != 0
}

```

> **Note**
>
> If the operation would result in a division by zero, the `EX` flag will be set, indicating a processor exception. This flag is not cleared automatically—it must be cleared using `clr ex` manually.
>
> The `C`, `N`, `Z`, and `V` flags are also set. The return result will be `0`.

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ✓ | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
DIV dest, src
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 2000
    ld b, 20
    div a, b          # a is 100

    ld a, 0x5000
    ld b, 0
    div a, b          # a is zero, and EX is set (divide by zero)
}
```

## ENTER \(Enter Stack Frame\)

Allocates the specified number of bytes on the stack and adjusts `SP` and `BP` to create a new stack frame.

> **Note**
>
> The data allocated on the stack is _not zeroed_. You should initialize it with data before use.

Specifically, the order of operations is as follows:

* `BP` is pushed on to the stack
* `SP` is moved to `BP`
* `SP` is decremented by the specified number of bytes

> **Warning**
>
> Be sure there is sufficient space on the stack before using `ENTER`, otherwise a stack overflow could occur and memory outside of the stack could be overwritten.

In order to access the reserved data on the stack, one should use `BP`-relative addressing:

```text
enter 2
ld a, [BP+0]        # Previous BP
ld a, [BP+-2]       # Reserved word on stack
```

#### Grammar

```text
ENTER immediate
```

#### Examples

```text
.segment code 0x02000 {
main:
    enter 10           # reserve space on the stack for 10 bytes
    ...
    exit 10
    ret
}
```

## EXC \(Exchange Components\)

Exchanges the components of the register. Used to access the high portions of a 16-bit register, but also works to swap nybbles in an 8-bit register. Flags are updated as a result, although only `N` and `Z` have any real meaning.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
EXC register
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 0x3134
    out 0x80, al      # output 34 to port 80
    exc a             # exchange the high and low components
                      # a is now 0x3431
    out 0x80, al      # output 31 to port 80
    exc a             # restore a to the original value
}
```

## EXIT \(Exit Stack Frame\)

Exits from the current stack frame, deallocating the specified number of bytes.

> **Warning**
>
> The number of bytes to deallocate _must_ match the number of bytes allocated by the corresponding `ENTER` instruction. Otherwise the stack will become corrupted.

Specifically, the order of operations is as follows:

* `SP` is incremented by the specified number of bytes
* The next word on the stack \(previous `BP`\) is popped into `BP`

> **Warning**
>
> Be sure there is a stack frame on the stack before using `EXIT`, otherwise a stack underflow could occur and memory outside of the stack could be overwritten.

#### Grammar

```text
EXIT immediate
```

#### Examples

```text
.segment code 0x02000 {
main:
    enter 10           # reserve space on the stack for 10 bytes
    ...
    exit 10            # always make sure the immediate value matches!
    ret
}
```

## IN \(Input from port\)

Inputs a byte from a given port into the specified register. The size of the register doesn't matter—the low eight bits of the register will contain the value from the port.

#### Grammar

```text
IN dest, port#
```

#### Examples

```text
.segment code 0x02000 {
main:
    in al, 0x80
}
```

## INC \(Increment\)

Increment the specified register by one, updating flags as appropriate:

| Condition | Flag |
| :--- | :--- |
| Result is zero | Z is set |
| Result is negative | N is set |
| Result goes above unsigned maximum | C is set |
| Result goes below signed maximum | V is set |

> **Note**
>
> Unlike other arithmetic operations, `inc` does not take the carry flag into consideration when performing a comparison.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
INC dest
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 0x2000
    inc a
}
```

## LD \(Load Data\)

Loads data from memory \(or immediately from the instruction\) into a destination register. The width of the destination determines how much data is loaded—if the destination is an eight-bit register, only one byte will be loaded, and if is a sixteen-bit register, two bytes will be loaded. Note that data is always stored and loaded in _big endian_.

> **Note**
>
> Loading data into a register does not affect the processor status flags.

The immediate forms of this instruction allows direct assignment of a value to a register:

```text
LD A, 1234
LD AL, 65
```

> **Warning**
>
> When loading data into the low portion of the register, the data in the high portion is not modified.

The other forms load data from memory into the destination register. There are several [addressing modes](../../technical/technical-overview/6516-central-processing-unit/addressing-modes.md) available.

## LOOP

Decrements the target register, and then if carry hasn't been set, loops back to the target address. The width of the value determines if the loop is _short_ \(8 bits\) or _long_ \(16 bits\).

> **Note**
>
> The body of the loop will always be taken at least once. Initialize the starting value of your loop register accordingly.
>
> ```text
>     ld c, 0
> _loop:
>     out 0x80, cl      # executes once
>     loop _loop, c
> ```

#### Forms

A loop is _long_ unless `s` is added to the alias. That is, `loop` is a long loop, whereas `loops` is a short loop.

```text
loops c next-frame        # short loop to next-frame
loop c next-game          # long loop to next-frame
```

#### Grammar

```text
LOOP[S] target-address, loop-register
```

#### Examples

```text
todo
```

## MOD \(Unsigned Modulo\)

Divides the destination by the source, and stores the remainder in the destination.

```text
r = source mod dest_in
dest_out = r[msb:0]
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = 0

n_out = r[msb]

v_out = 0

EX_out = {
    1 when dest_in = 0
    EX_in when dest_in != 0
}
```

> **Note**
>
> If the operation would result in a division by zero, the `EX` flag will be set, indicating a processor exception. This flag is not cleared automatically—it must be cleared using `clr ex` manually.
>
> The `C`, `N`, `Z`, and `V` flags are also set. The return result will be `0`.

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ✓ | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
MOD dest, src
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 2000
    ld b, 20
    mod a, b          # a is 0

    ld a, 0x5000
    ld b, 0
    mod a, b          # a is zero, and EX is set (divide by zero)
}
```

## MOV \(Move\)

Transfers the value of one register into another register. Flags are not affected.

#### Grammar

```text
MOV dest, srce
```

#### Examples

```text
ld a, 10
mov b, a
ld a, 20
```

## MUL \(Unsigned Multiply\)

Multiples the destination by the source, and stores the result in the destination.

```text
r = source * dest_in
dest_out = r[msb:0]
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = r > max-unsigned-word

n_out = r[msb]

v_out = 0
```

> **Note**
>
> If the operation would result in a value too large for the destination register, the `C` flag is set.

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ✓ | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
MUL dest, src
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 2000
    ld b, 2
    mul a, b          # a is 4000

    ld a, 0x5000
    ld b, 0
    mul a, b          # a is zero
}
```

## NEG \(Negate\)

Negates \(two's complement\) the signed value in the register. If the register was originally `42`, it will now be `-42`.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
NEG dest
```

#### Examples

```text
.segment code 0x02000 {
    ld a, 2000
    neg a        # a is -2000
}
```

## NOP \(No Operation\)

Do nothing. Takes some time, so can be used to slow a process down slightly.

## NOT \(Bitwise Not\)

Flips the bits in the register. If the register was originally `0b10010010`, it will now be `0b01101101`.

```text
dest-out = !dest_in
```

Flags are computed as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = 0
n_out = r[msb]
v_out = 0
```

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
NOT dest
```

#### Examples

```text
.segment code 0x02000 {
    ld al, 0b0000_1111
    not al        # a is 0b1111_0000 or 0xF0
}
```

## OR \(Bitwise Or\)

Performs a bitwise OR on the source and destination operands, and stores the result in the destination.

```text
dest_out = dest_in OR source_in
```

Once the result of the operation is computed, the ALU computes the flags as follows:

```text
z_out = {
    1 when r = 0
    0 when r != 0
}

c_out = {
    0 when r >> width = 0
    1 when r >> width >= 0
}

n_out = r[msb]

v_out = 0
```

#### Forms

| Destination | Source |
| :--- | :--- |
| Addressable Register | Addressable Register |
| Data Register | Immediate 8-bit value |
| Data Register | Immediate 16-bit value |

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | ✓ | ✓ | 0 | ✓ |

#### Grammar

```text
OR dest, src
OR dest, immediate
```

#### Examples

```text
.segment code 0x02000 {
    ld al, 0b1111_0000
    or al, 0b0001_1000    # al is 0b1111_1000

    ld a, 0x1234
    ld b, 0x00FF
    or a, b               # a is 0x12FF
}
```

## OUT \(Output to port\)

Outputs a byte to a given port from the specified register. The size of the register doesn't matter—the low eight bits of the register will be sent to the port.

#### Grammar

```text
OUT port#, srce
```

#### Examples

```text
.segment code 0x02000 {
main:
    out 0x80, al
}
```

## POP \(Pop from Stack\)

Pops the top value from the stack and stores it in the specified register. The width of the register determines if a byte or a word is popped from the stack.

`SP` is increased by the size of the data popped from the stack.

#### Grammar

```text
POP dest
```

#### Examples

```text
.segment code 0x02000 {
main:
    pop a
}
```

## POPALL

Pops the state of the addressable registers from the stack, in reverse order as `PUSHALL`.

* BP
* Y
* X
* D
* C
* B
* A
* SP

Unless you need to store all the above registers on the stack, it's better to push and pop only those registers that you need, as the `POPALL` command is very slow.

#### Grammar

```text
POPALL
```

#### Examples

```text
.segment code 0x02000 {
main:
    pushall
    # some intermediate code
    popall
    ret
}
```

## POPF \(Pop Flags\)

Pops the top byte off the stack and sets the processor status flags to the value popped.

#### Flags

| EX | ID | IS | SS | N | C | V | Z |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

#### Grammar

```text
POPF
```

#### Examples

```text
.segment code 0x02000 {
main:
    ld al, 1
    push al
    popf        # z is now set
}
```

## POPMM \(Pop Memory Map\)

Pops the top value on the stack and sets the memory map register to that value. Used to finish a page map operation.

#### Grammar

```text
POPMM
```

#### Examples

```text
.segment code 0x02000 {
main:
    set id      # disable interrupts
    pushmm      # save the current memory map
    pop a       # pop it into A
    and a, 0b0_11111_00000_11111   # zero page 2 mapping
    or a, 0b0_00000_00100_00000    # set page 2 to map to page 4
    push a
    pop mm      # pop revised memory map
    clr id      # re-enable interrupts
}
```

## PUSH

## PUSHALL

## PUSHF \(Push Flags\)

## PUSHMM \(Push Memory Map\)

## RET \(Return from Call\)

## SDIV \(Signed Divide\)

## SHL \(Shift Left\)

## SHR \(Shift Right\)

## SMOD \(Signed Modulo\)

## SMUL \(Signed Multiplication\)

## ST \(Store\)

## SUB \(Subtract\)

## SWAP

## TEST

## TRAP

## XOR \(Bitwise Exclusive OR\)

