#
The 6516's Register File

The 6516 has twelve registers within the register file, enumerated as follows:

| Index | Register | 8-bit Alias | Size | Comments |
| :--- | :--- | :--- | :--- | :--- |
| 0 | A | AL | 16 \(8\) | \(A\)ccumulator |
| 1 | B | – | 16 | General Purpose |
| 2 | C | – | 16 | \(C\)ounter |
| 3 | D | – | 16 | \(D\)ata access |
| 4 | X | – | 16 | Inde\(X\) |
| 5 | Y | – | 16 | Index \(Y\) |
| 6 | SP | – | 16 | \(S\)tack \(P\)ointer |
| 7 | BP | – | 16 | \(B\)ase \(P\)ointer |
| 12 | SB | – | 2 | \(S\)ource \(B\)ank |
| 13 | DB | – | 2 | \(D\)ata \(B\)ank |
| 14 | FLAGS | – | 8 | Processor status |
| 15 | PC | – | 16 | \(P\)rogram \(C\)ounter |

## The General Purpose registers

The first four registers \(**A**–**D**\) are considered general purpose registers in that they can be used for any 16-bit data, and the CPU doesn't \(usually\) change its behavior based upon the contents of these registers.

Each of three of the four registers also has a special function in certain contexts. Of the four, **B** is the only completely general purpose register; it has no other special function.

## The Accumulator \(A\)

Although the accumulator can be used for general purposes, the accumulator is the only register than can be stored to memory or that can accept a value from memory. This makes it the primary vehicle through which the CPU processes memory. Although any of the lower eight registers can be used for mathematical operations, the accumulator is given that name partly because of historical significance, but also because one can directly perform mathematical operations on values obtained from memory via the accumulator.

The accumulator can be referred to as **AL** when loading 8-bit values from memory or when storing 8-bit values to memory.

## The Counter \(C\)

The C register is typically considered general purpose, with the exception of the MFILL, MCOPY, and MSWAP instructions. These instructions will use the value stored in **C** to determine how many iterations to perform, hence the name.

## The Data Access Register \(D\)

This register is also typically considered general purpose, except that it can be used when addressing memory. There are two modes in this case, depending upon the addressing mode being used. When\_ \_absolute **D** is used, the CPU will use the value of D as the absolute address for the memory operation. When Indirect **D** is used, the CPU will load a 16-bit value at the location specified by D, and then use that as the absolute address for the memory operation.

## The Index Registers

There are two index registers: **X** and **Y**. Both are technically in the same category, but their functions are subtly different. They can also be considered pseudo-general-purpose registers outside of the context of certain addressing modes.

The index registers exist to provide array-like referencing without additional arithmetic on the part of the programmer. Consider the following code snippet:

```
var a: int[32]; // a is an array of 16-bit integers
var b: int = 0;
b = a[5];
```

There are several ways to convert this into instructions the computer can understand. We could use **D**, the Data Access register as follows:

```
.data 0x08000
.var a
.dw[] 32 # Array of 32 ints, "a"

.var b
.dw 0x0000 # Result, "b"

.code 0x01000
XOR A, A # Make sure A is zero
LDI AL, bank(&a)
MOV SB, AL # Source Bank is now 0
MOV DB, AL # as is data bank
LDI A, addr(&a) # Get address of A
MOV B, A # and copy to B
LDI A, 0x0001 #
MOV C, A # C := 0x0001
LDI A, 0x0005 # We want the fifth index
SHL A, C # multiply by two (C = 0x0001) --> 0x0A
ADD A, B # Add 0x8000 + 0x0A --> 0x800A
MOV D, A # Move to D register
LDS A, [D] # Get value at a[5]
STD A, [addr(&b)] # Store value of a[5] to b
```

This is a little... _painful_. Index registers simplify the code greatly:

```
.code 0x01000
XOR A, A # make sure A is zero
LDI AL, bank(&a)
MOV SB, AL # set SB
MOV DB, AL # and DB to bank of a & b
LDI A, 0x0005
MOV Y, A # Y = 0x0005
LDS A, [addr(&a)+Y] # A = value at 0x800A (Y*2)
STD A, [addr(&b)] # b = value of a[5]
```

When using absolute memory references, **X** and **Y** are both added to the memory reference, and are scaled based on the register size. That is, when using **AL**, **X** and **Y** are not scaled, but when using **A**, **X** and **Y** are multiplied by two.

When using indirect memory references, **X** is added to the absolute memory reference \(scaled\). **Y** is then added to the resulting memory reference \(scaled\).

## The Stack Registers \(SP & BP\)

The stack is a location of memory used for storing data while working with registers that might otherwise overwrite that data. The top of the stack defaults to 0x01000, and can safely extend down to 0x00400.

There are two stack registers that point to locations in the stack: **SP** and **BP**. **SP**, or Stack Pointer, always points to the head of the stack. As data are pushed onto the stack, **SP** moves downward to accommodate. As data are popped from the stack, **SP** moves back upwards. **BP**, or Base Pointer, only moves in special circumstances. **BP** represents the base of the current stack frame, and there are special addressing modes that can reference data relative to **BP**.

Only two instructions modify **BP**: ENTER and EXIT. When ENTER is encountered, both stack pointers are pushed onto the stack, and then **SP** is copied to **BP**. **SP** is then decremented by the number of bytes specified by ENTER's operand. The reverse is occurs when EXIT is encountered. In this manner, it's trivial to create stack frames usable for procedures that take many parameters and use local variables.

## The Bank Registers \(SB & DB\)

The 6516 is a 16-bit CPU, but has a 18-bit address bus. Due to the size of the registers, however, only 16 bits can be used directly to specify memory locations. In order to access memory beyond 0x0FFFF, bank registers must be used.

The **SB**, or _Source Bank_, and **DB**, or _Destination Bank_, registers are two-bit registers that affect the top two bits of the address bus, depending upon the current opcode. These banks only come into play when referring to memory. As such, memory is thought of as being broken up into four banks \(0–3\).

The opcode being executed determines which bank registers are used, as follows:

| Instruction | Bank Register | Size |
| :--- | :--- | :--- |
| LDS | SB | 3 bytes |
| STD | DB | 3 bytes |
| LDD | DB | 4 bytes |
| STS | SB | 4 bytes |
| MFILL | SB/DB | 3 bytes |
| MCOPY | SB/DB | 3 bytes |
| MSWAP | SB/DB | 3 bytes |

Except for immediate load addressing modes, all other addressing modes will be affected by the selected bank register, _including **D** and **BP**-relative modes_.

Note: When the CPU fetches instructions, it does not use either **SB** or **DB**. As such, the CPU is only capable of executing code in bank 0.

## The Processor Status Register \(Flags\)

A flag is a single bit that represents a portion of the processor's state. The processor status register \(Flags\) has eight of these flags, as follows:

| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| I | M | X | E | V | C | N | Z |
| Interrupt Enable | Mode | Execute Next | Exception | Overflow | Carry | Negative | Zero |

Most flags are set or cleared after arithmetic or logic operations. Some flags control how instructions will perform, and some flags control what the CPU will do or what it can respond to.

### The Interrupt Enable Flag \(I\)

The Interrupt Enable flag, referred to as I, indicates if maskable interrupts are enabled. Maskable interrupts are traps which can be disabled, essentially, and include all traps above 0x00. Only 0x00 is non-maskable, and will always interrupt the system regardless of the value of this flag.

Set the flag using SET I, and clear the flag using CLR I.

> Important: If you CLR I, be sure that you SET I at some point later, otherwise the machine may appear to hang.

### The Mode Flag \(M\)

The Mode flag, referred to as M, determines how certain mathematical operations will behave.

TODO.

### The Execute Next Flag \(X\)

In order to support conditional instruction execution, the 6516 utilizes a flag that indicates if the next instruction should be executed or skipped. This is the Execute Next, or X, flag. If it is set, the next instruction will be executed, as you would typically expect. If it is not set, however, the next \(and only the next\) instruction is skipped.

When used in conjunction with instructions that test the state of various flags, one can easily obtain conditional branching, like so:

```
LDI A, 0x1000
MOV C, A
loop:
DEC C # C = C - 1
IFN Z # If C isn't zero
BR :loop # then branch back to loop
done: # otherwise, we're done!
HALT 0x00
BR :done
```

This flag can be set directly by using SET X, and cleared by using CLR X, but in practice, one uses the IF and IFN instructions to set the flag as desired based upon the value of the specified flag.

> Note: If the following instruction is executed, it is done so atomically; that is, an interrupt cannot occur between the two instructions.

### The Exception Flag \(E\)

The Exception, or E, flag is set when the processor encounters an exceptional state. The simplest example is if one were to divide by zero. Since the result is undefined, the processor sets the Exception flag to warn the following code that something went awry.

### The Overflow Flag \(V\)

TODO

### The Carry Flag \(C\)

The Carry flag \(C\) is set whenever a mathematical operation overflows the available 16-bits. When adding, the carry flag is set when two unsigned integers exceed 65535 \(the flag is clear otherwise\). When subtracting, the carry flag is cleared when the result of subtracting two unsigned integers would fall below zero \(the flag is set otherwise\).

### The Negative Flag \(N\)

The Negative flag \(N\) indicates if the last operation resulted in a negative number. This flag is calculated when using mathematical and logical operations, but is also updated when loading from memory or when reading data from a port.

### The Zero Flag \(Z\)

The Zero Flag \(Z\) indicates if the last operation resulted in a zero. This flag is calculated when using mathematical and logical operations, but is also updated when loading from memory or when reading data from a port.

## The Processor Counter Register \(PC\)

The Processor Counter, or PC, register indicates the memory location of the next instruction to execute \(subject to the Execute flag\). Because PC is only 16-bits wide and the processor cannot use bank registers when fetching instructions, code is limited to the lowest bank of memory, which effectively restricts code size to 64K.


