# Accessing Memory

Reading from and writing to memory is accomplished using the `LD` \(LOAD\) and `ST` \(STORE\) instructions respectively. These are the only two instructions that can read from and modify memory. All other instructions deal either with registers or with I/O ports.

## Loading a Constant

When one needs to load a register with a specific value, but doesn't want to assign the value a location in memory, the immediate form of `LD` can be used. Technically it's very similar to any other method of loading data from memory into a register, just that the data is encoded within the instruction itself.

Let's say we wanted to change the value of `A` to the value of `0x1234`. We can use the following instruction:

```text
ld a, 0x1234
```

> ### NOTE
>
> The assembler allows expressions too! So you could use `ld a, 0x1200 + 0x34` to accomplish the same result.

## Loading a Value from a Variable

Typically programs will store information in a variable and will need to retrieve that information later. Variables are allocated a specific amount of memory in a segment based upon the size and width of the data itself. For example, a byte takes up one byte in a segment, whereas an array of 256 words will take up 512 bytes.

Assuming the variable in question is a byte or word variable, it's easy to load data from it into a register using the **absolute addressing mode**.

First, let's imagine the following data segment -- it has one variable defined named `lives` -- this represents the number of lives a player has left in a game.

```text
.segment data 0x03000 {
  lives: .byte 0x03
}
```

Next, we might want to access the variable in order to see if the game is truly over. We use **absolute addressing mode** to accomplish this. Absolute addresses are simply 19-bit numbers that refer to a specific memory address. 19 bits is sufficient to address the entirety of Retroputer's memory space. Because the address isn't relative to anything else \(other than `0`\), the addressing mode is called **absolute**.

To indicate that you're using **absolute addressing**, one uses square brackets in the `LD` statement, like so:

```text
.segment code 0x02000 {
  ld al, [data.lives]
}
```

> ### IMPORTANT: Register Width Matters!
>
> It's critical to match the register and the width of the data you're trying to access. `ld a, [0x00000]` will load the bytes at addresses `0x00000` and `0x00001` and deposit them into the high and low bytes of `A` respectively. `ld al, [0x00000]`, however will load only the byte at address `0x00000` and deposit it into the low byte of `A` \(known as `AL`\).

The above statement will actually be turned into `ld al, [0x03000]` by the assembler -- it will keep track of the fact that `data.lives` actually points to address `0x03000` for us.

## Storing Data into a Variable

Storing data into a variable works similarly to how you load data from a variable. The order of operands is swapped around to indicate that the _source_ and _target_ is different, however.

Let's say we wanted to decrement the number of lives remaining and store that back into the variable we've already defined. We can do that like so:

```text
dec al
st [data.lives], al
```

This will write the new value in `AL` to memory address `0x03000` which happens to be the variable `lives`.

> ### IMPORTANT: Register Width Matters!
>
> Just like the `LD` statement, the size of the register you're using with `ST` matters. If you want to write a single byte to memory, be sure to use a single-byte register. If you want to write two bytes at once, use a word-sized register. If you fail to use the correct width, you could inadvertently overwrite memory that you didn't intend to change.

## Loading Data from an Array

