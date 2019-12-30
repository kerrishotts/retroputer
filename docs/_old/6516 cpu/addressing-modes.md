# Addressing Modes

Without the ability to address memory, the 6516 CPU would be very limited, since it only has a few registers with which to store and process data. Addressing memory, however, is often more complicated than one might initially imagine, since one needs to be able to effectively reference data on the stack, perform array indexing operations, and also perform pointer operations.

The following addressing modes are supported by the 6516:

* Immediate 8/16: used to quickly load a value into the AL/A register. The scale of the register determines the size of the immediate value.
* Relative 8/16: used when branching or calling subroutines; the immediate value is relative to the PC register. Note that PC will be pointing at the next instruction, so a BR -4 will enter an infinite loop.
* Absolute 16: the operand specifies the lower 16 bits of the address to reference. The opcode will determine which bank register should be used.
* Indirect 16: The operand specifies the lower 16 bits of the address to reference, which is then dereferenced once more. The opcode will determine which bank register will be used.
* Relative BP: The operand specifies an offset from BP. The opcode will determine which bank register will be used, although this is of little practical value.
* Indirect BP: The operand specifies an offset from BP, which is then dereferenced again. The opcode will determine which bank register will be used.
* Absolute D: The value in the D register is used as the memory reference. The opcode will determine which bank register will be used.
* Indirect D: The value in the D register is used as the memory reference, which is then dereferenced again. The opcode will determine which bank register will be used.

In each all but the immediate and relative addressing modes, the memory reference can be further indexed by the X and Y registers. The X register is added before any dereferencing that might occur, and the Y register is added after any dereferencing that might occur. This allows for easy array indexing.

Furthermore, each mode specifies the scale of data expected, which depends on the register specified in the LD% or ST% instruction. When AL is used, the scale is expected to be one, and when A is used, the scale is two. This scale determines how much data to read or write at once, but also multiplies X and Y accordingly.

Samples:

| Instruction | Addressing Mode | Meaning |
| :--- | :--- | :--- |
| LDI AL, 0x08 | Immediate 8 | AL is assigned 0x08 |
| LDI A, 0x1000 | Immediate 16 | A is assigned 0x1000 |
| BR -10 | Relative 16 \(Relative 8 is supported but not used by the assembler\) | Branch back ten bytes |
| LDS AL, \[0x1000\] | Absolute 16, 1x scale | Load the byte at SB:0x1000 into AL |
| LDS A, \[0x1000\] | Absolute 16, 2x scale | Load the word at SB:0x1000 into A |
| LDS A, \(0x1000\) | Indirect 16, 2x scale | Load the word at SB:0x1000, then load the word pointed to at SB:word into A |
| LDS A, \[0x1000+X\] | Absolute 16, 2x scale, Index by X | Load the word at SB:0x1000+\(X\*2\) |
| LDS A, \[0x1000+X+Y\] | Absolute 16, 2x scale, Index by X and Y | Load the word at SB:0x1000+\(X\*2\)+\(Y\*2\) |
| LDS A, \(0x1000+X\) | Indirect 16, 2x scale, Index by X | Load the word at SB:0x1000+\(X\*2\), then load the word pointed to at SB:word into A |
| LDS A, \(0x1000+X\)+Y | Indirect 16, 2x scale, Index by X and Y | Load the word at SB:0x1000+\(X\*2\), then load the word pointed to at SB:word+\(Y\*2\) into A |
| LDS A, \[BP+-10\] | BP Relative, 2x scale | Load the word at SB:BP-10 into A |
| LDS A, \(BP+-10\) | BP Relative Indirect, 2x scale | Load the word at SB:BP-10, then load the word at SB:word into A |
| LDS A, \[D\] | Absolute D, 2x scale | Load the word at D into A |
| LDS A, \(D\) | Indirect D, 2x scale | Load the word at D, then load the word at SB:word into A |


