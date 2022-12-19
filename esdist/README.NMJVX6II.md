# 6516 Processor

The 6516 is a 16-bit processor with four 16-bit general-purpose registers \(`A`, `B`, `C`, `D`\), two 16-bit index registers \(`X`, `Y`\), two 16-bit stack registers \(`SP`, `BP`\), an 8-bit processor status register \(`FLAGS`\) and a 16-bit program counter \(`PC`\). There are 8-bit aliases for the low eight bits of the registers `A` - `D`, `X` and `Y` — this alias adds an `L` to the register name. So `AL` represents the low eight bits of `A`.

The CPU can perform 16-bit mathematical operations on any of the 16-bit registers except the program counter. The CPU can perform add, subtract, multiple, divide \(integer\), and modulus \(integer\) operations. The CPU is also capable of bit shifting and byte swapping.

Memory can be loaded and stored a byte at a time or a word \(16 bits\) at a time. There are many different methods of memory access, including absolute, indirect, relative, base-relative, and data-relative addressing. Memory addresses can be further indexed by the index registers and optionally scaled by two to simulate arrays with word-sized elements.

Although the processor can load memory from any of the eight available banks, instructions can only be executed in bank 0. This limits programs to 64KB in size, although in reality, programs will be further limited due to the fact that trap vectors, stacks, and ROM all exist in bank 0. However, the configuration of bank zero can be modified by changing the `MM` register, which can allow the program to swap in code into pages 1–3. With clever programming, it's possible to create programs much larger than 64KB in code size.

The processor supports 256 interrupts by way of vectors at the low end of memory. These can be triggered by external events \(say, a soft-reset\), internal events \(a timer reaches zero\), or by software.

The processor also supports sending and receiving data over 256 ports. Ports have no timing; requesting a value from a port will let the next piece of data take its place on the next instruction cycle. Likewise, sending data over a port can be done in a tight loop without regard for timing mechanisms.

