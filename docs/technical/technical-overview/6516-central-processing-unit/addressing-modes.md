# Addressing Modes

Without the ability to address memory, the 6516 CPU would be very limited, since it only has a few registers with which to store and process data. Addressing memory, however, is often more complicated than one might initially imagine, since one needs to be able to effectively reference data on the stack, perform array indexing operations, and also perform pointer operations.

The following addressing modes are supported by the 6516.

## Immediate \(8/16\)

This mode applies only to the `LD` instruction and is used to quickly transfer constants into a register. The width of the register determines the length of the instruction required to fit the constant value.

```text
ld a, 1234     # four bytes required for this instruction
ld al, 65      # three bytes required for this instruction
```

## Relative \(8/16\)

Relative addressing is used only for instructions that affect the program's control flow, namely `BR`, `CALL`, and `LOOP` \(and short variants\). The address is relative to the _next_ instruction.

> #### **Note**
>
> PC will be pointing at the next instruction, so a `BR -4` will enter an infinite loop. \(For a short branch, `BRS -3` will do the same.\)

A short branch can jump within -128 to 127 bytes from the next instruction. A long branch can jump within -32768 to 32767 bytes.

## Absolute

When loading data, the operand specifies the full 19-bits required to reference any byte within memory space. When branching, the operand specifies 16 bits, which is sufficient for reading and then branching to any location in the first bank \(which is the only bank that supports code execution\).

```text
ld a, [0x01234]    # load the word at address 0x01234
ld al, [0x7FFFF]   # load the last byte of memory
br [0x2000]        # jump to address pointed to by the word at 0x2000
```

### Indexing

The address can be indexed by either `X` or `Y` or both.

```text
ld x, 0x1000
ld y, 0x0010
ld al, [0x10000, x]     # load the byte from 0x11000
ld al, [0x10000, y]     # load the byte from 0x10010
ld al, [0x10000, x, y]  # load the byte from 0x11010
```

The indexing is always by byte; the width of the destination register has no effect on it.

## Indirect Absolute

Indirect addressing mode allows one to load data from a location that's pointed at by an absolute address in memory.

When loading or storing data, the absolute address is encoded in 19 bits—enough to reference every byte of memory. The word that is located at the specified location is then combined with the page of the original absolute address, resulting in a new indirect address. This has the result that you can only access memory indirectly within the same bank as the address through which you are indirecting.

When branching, the absolute address is encoded in 16 bits. The value at that address is then used to look up the new target address. This means that you can only indirect branch within the lowest bank of memory.

### Indexing

You can index by `X` or `Y` \(or both\) when using the indirect addressing mode, but the final address is determined by the register used for indexing.

When indexing by `X`, the value of `X` is added to the absolute address. This enables the ability to index a vector table, for example. The word at the absolute address _plus_ the `X` offset will be used as the target address.

When indexing by `Y`, however, the value of `Y` is added to the indirected address. This makes it easier to dereference array indices when indirecting through a pointer.

When combining the two, `X` is first applied to the absolute address, and then `Y` is applied to the resulting indirect address.

```text
ld a, 0x1000  
st [0x02000], a        # address 0x02000 has the value 0x1000
st [0x03000], a        # so does 0x03000
ld al, 65
st [0x01000], al       # address 0x01000 has the value 65
st [0x01010], al

ld x, 0x1000
ld y, 0x0010

ld al, <0x02000>       # load a with 65 (0x02000 -> 0x01000 = 65)
ld al, <0x02000, x>    # load a with 65 (0x02000 + 0x1000 -> 0x03000 -> 0x01000 = 65)
ld al, <0x02000>, y    # load a with 65 (0x02000 -> 0x03000 + 0x10 -> 0x01010 = 65)
ld al, <0x02000, x>, y # load a with 65 (0x02000 + 0x1000 -> 0x03000 + 0x10 -> 0x01010 = 65)
```

## Relative BP

When writing functions that take a large number of arguments or a large amount of data, it's useful to reference information stored locally on the stack. This addressing mode enables one to specify an offset from `BP`, and then reads data from that address.

When branching, this mode only makes sense if the address on the stack points at another function.

The offset from `BP` can be -32768 to 32767. Given the typical size of the stack, however, this is rarely ever an issue.

```text
ld al, [bp]        # load the byte at BP
ld al, [bp+-02]    # load the byte at BP - 2 (the + is required syntax)
```

### Indexing

Indexing `BP` is also possible, and acts the same as with absolute addressiong.

```text
ld al, [bp+-10, x]    #start at 10 bytes before BP, index by x, and load
ld al, [bp+-10, y]
ld al, [bp+-10, x, y]
```

## Indirect Relative BP

As with indrect absolute addressing, one can indirect through a relative `BP` address:

```text
ld al, <bp+-2>      # load the byte from the address specified at BP+-2
```

### Indexing

Indexing with indirect relative `BP` works the same way as indirect absolute indexing.

```text
ld al, <bp+-10, x>
ld al, <bp+-10>, y
ld al, <bp+-10, x>, y
```

## Absolute D,X

This mode is used to enable the combinations of `D` and `X` to specify any address in the memory space. `D` and `X` are combined in such a way that they form a 19-bit address, which can then be indexed and offset.

The operation for determining the final operation looks like this:

$$
\begin{alignedat}{1}
& D_f & D_e & D_d & D_c & D_b & D_a & D_9 & D_8
& D_7 & D_6 & D_5 & D_4 & D_3 & D_2 & D_1 & D_0 &   &   &   \\
+ &   &   &   & X_f & X_e & X_d & X_c & X_b & X_a & X_9 & X_8 & X_7 & X_6 & X_5 & X_4 & X_3 & X_2 & X_1 & X_0\\
\hline
& A_{12} & A_{11} & A_{10} & A_f & A_e & A_d & A_c & A_b & A_a & A_9 & A_8 & A_7 & A_6 & A_5 & A_4 & A_3 & A_2 & A_1 & A_0
\end{alignedat}
$$

> #### Note
>
> If `X` is not supplied, `0` is assumed. As such `ld al, [d]` will load from the address`d<<3`.

There's no established requirement to determining which bits should go in `D` and which should go in `X`, so use whatever makes sense for the algorithm at hand. Typically, however, you'll usually load the top 16 bits of the address in `D` and the bottom three bits in `X` to ensure that you can continue to index by `X` should you need to do so.

Often this looks like this:

```text
.segment data 0x03000 {
    hello: .string "Hello, world"
           .byte 0
}

.segment code 0x02000 {
    ld d, data.hello >> 3
    ld x, data.hello & 7
    ld al, [d, x]           # al is now "H"
}
```

### Indexing

Should you wish to index, you can adjust `X`, or index additionally with `Y`.

### Offsetting

Like in Relative `BP` addressing, you can add an additional constant offset to `D`.

```text
ld al, [d+1000, x]
```

## Indirect D,X

It is possible to indirect through any word in memory space using **Indirect D,X**. Just like any mode of indirection, the resulting bank will always be the same as the original absolute address \(or `0` when branching\). The method for determining the initial absolute address is the same as **Absolute D,X**. 

```text
.segment strings 0x50000 {
    hello: .string "Hello, World"
           .byte 0
    score: .string "Score"
           .byte 0
    level: .string "Level"
           .byte 0
    vectors:
        .word[3] hello, score, level
}

.segment code 0x02000 {
    ld d, strings.vectors >> 3
    ld x, string.vectors & 7
    ld al, <d+2,x>           # al has "S"
}
```

### Indexing

Indexing with Indirect D, X is similar to indirecting with any other addressing mode in that `Y` is applied after determining the indirect address. 

```text
ld al, <d,x>, y
```

### Offsetting

A constant offset can be added to `D`:

```text
ld al, <d+2, x>
```



