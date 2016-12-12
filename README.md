# Retroputer

The Retroputer is intended as both a plaything and educational tool. It is intended to simulate what programming and using a computer from the late 1980s was like. Some liberties, however, are taken, including the following:

* 256KiB is addressable; 256KiB is present -- in the 80s, this would have been pretty expensive
* 64KiB devoted to 320x200 graphics
* 256 color palette consisting of r,g,b elements
* 64KiB devoted to tile set definitions (4 sets x 16 KiB)
* 16KiB devoted to up to four visible tile pages on screen at once (4 pages x 4KiB)
* 16KiB of ROM
* 256 traps or interrupts
* A slightly larger register file than many CPUs of the time
* 16-bit CPU with an 18-bit address line

The above is to make programming for the Retroputer a little easier while also making it easy to translate the memory for screen graphics to an HTML5 canvas (which uses four bytes per pixel for RGBA). The tilesets are an affectation to make it easy to create levels and side-scrollers -- these are like (but not quite like) the character set definitions on many machines of the time.

## Status

The status of this project is simple: incomplete and tech demo. Currently being worked on:

* Assembler
* Decode & execute
* Sprites 
* ROM and KERNEL
* Tests

## Launching

You can launch what's runnable by executing:

```
$ npm install
$ npm serve run
```

Then navigate to http://localhost:8080.

## Tests

You can run tests by executing `npm test`.

## Memory Layout

The memory layout is simple:

|  Start  |   End   | Size | Identifier       | Purpose                                                      |
|:-------:|:-------:|:----:|:----------------:|:-------------------------------------------------------------|
|  00000                 ||| memBot           | Bottom of memory                                             |
|  00000  |  0FFFF  |  64K |                  | Bank 0; code and data                                        |
|  00000  |  001FF  | 512B | traps            | Traps consisting of 256 2-byte pointers                      |
|  00000  |  00001  |   2B | trapReset        | Trap 0x00; points to reset()                                 |
|  00400  |  00FFF  |   3K | stackMax         | Default location of stack; stack grows down from 00FFF       |
|  01000  |  0BFFF  |  43K | codeStart        | Code and data                                                |
|  0C000  |  0FFFF  |  16K | romStart         | ROM and KERNEL                                               |
|  10000  |  1FFFF  |  64K |                  | Bank 1; graphics and video configuration                     |
|  10000  |  1F9FF  | ~64K | graphicsStart    | 320x200 256-color graphics                                   |
|  1FA00                 ||| reserved         | reserved                                                     |
|  1FA01                 ||| reserved         |                                                              |
|  1FA02                 ||| graphicsLayer    | (0-7 visible; else invisible)                                |
|  1FA03                 ||| reserved         |                                                              |
|  1FA04                 ||| borderColor      | Border color                                                 |
|  1FA05                 ||| borderSizeX      | Width of border, horizontally                                |
|  1FA06                 ||| borderSizeY      | Height of border, vertically                                 |
|  1FA07                 ||| reserved         |                                                              |
|  1FA08                 ||| reserved         |                                                              |
|  1FA09                 ||| reserved         |                                                              |
|  1FA0A                 ||| reserved         |                                                              |
|  1FA0B                 ||| backgroundColor  | Screen background color                                      |
|  1FC00  |  1FFFF  |   1K | paletteStart     | 256 RGBx color definitions                                   |
|  20000  |  2FFFF  |  64K |                  | Bank 2; tile set definitions                                 |
|  20000  |  23FFF  |  16K | tileSet0         | Tile set 0 (256 8x8 tiles)                                   |
|  24000  |  27FFF  |  16K | tileSet1         | Tile set 1                                                   |
|  28000  |  2BFFF  |  16K | tileSet2         | Tile set 2                                                   |
|  2C000  |  2FFFF  |  16K | tileSet3         | Tile set 3                                                   |
|  30000  |  3FFFF  |  64K |                  | Bank 3; tile pages, sprites, data storage                    |
|  30000  |  303FF  |   1K | tilePage0        | Tile page 0                                                  |
|  30400  |  307FF  |   1K | tilePage0bgColor | Background color for tile page 0                             |
|  30800  |  30BFF  |   1K | tilePage0fgColor | Foreground color for tile page 0                             |
|  30FF9                 ||| tilePage0CropX   | Width of visual crop, in pixels                              |
|  30FFA                 ||| tilePage0CropY   | Height of visual crop, in pixels                             |
|  30FFB                 ||| tilePage0Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  30FFC                 ||| tilePage0Set     | Tile set to use (0-3)                                        |
|  30FFD                 ||| tilePage0OffsetX | Rendering offset (signed)                                    |
|  30FFE                 ||| tilePage0OffsetY | Rendering offset (signed)                                    |
|  30FFF                 ||| tilePage0Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  31000  |  313FF  |   1K | tilePage1        | Tile page 1                                                  |
|  31400  |  317FF  |   1K | tilePage1bgColor | Background color for tile page 1                             |
|  31800  |  31BFF  |   1K | tilePage1fgColor | Foreground color for tile page 1                             |
|  31FF9                 ||| tilePage1CropX   | Width of visual crop, in pixels                              |
|  31FFA                 ||| tilePage1CropY   | Height of visual crop, in pixels                             |
|  31FFB                 ||| tilePage1Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  31FFC                 ||| tilePage1Set     | Tile set to use (0-3)                                        |
|  31FFD                 ||| tilePage1OffsetX | Rendering offset (signed)                                    |
|  31FFE                 ||| tilePage1OffsetY | Rendering offset (signed)                                    |
|  31FFF                 ||| tilePage1Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  32000  |  323FF  |   1K | tilePage2        | Tile page 2                                                  |
|  32400  |  327FF  |   1K | tilePage2bgColor | Background color for tile page 2                             |
|  32800  |  32BFF  |   1K | tilePage2fgColor | Foreground color for tile page 2                             |
|  32FF9                 ||| tilePage2CropX   | Width of visual crop, in pixels                              |
|  32FFA                 ||| tilePage2CropY   | Height of visual crop, in pixels                             |
|  32FFB                 ||| tilePage2Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  32FFC                 ||| tilePage2Set     | Tile set to use (0-3)                                        |
|  32FFD                 ||| tilePage2OffsetX | Rendering offset (signed)                                    |
|  32FFE                 ||| tilePage2OffsetY | Rendering offset (signed)                                    |
|  32FFF                 ||| tilePage2Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  33000  |  333FF  |   1K | tilePage3        | Tile page 3                                                  |
|  33400  |  337FF  |   1K | tilePage3bgColor | Background color for tile page 3                             |
|  33800  |  33BFF  |   1K | tilePage3fgColor | Foreground color for tile page 3                             |
|  33FF9                 ||| tilePage3CropX   | Width of visual crop, in pixels                              |
|  33FFA                 ||| tilePage3CropY   | Height of visual crop, in pixels                             |
|  33FFB                 ||| tilePage3Scale   | Scaling factor (0 = 1x1, 1 = 2x2, 2 = 4x4, etc.              |
|  33FFC                 ||| tilePage3Set     | Tile set to use (0-3)                                        |
|  33FFD                 ||| tilePage3OffsetX | Rendering offset (signed)                                    |
|  33FFE                 ||| tilePage3OffsetY | Rendering offset (signed)                                    |
|  33FFF                 ||| tilePage3Layer   | Rendering layer (0-7 visible, otherwise hidden)              |
|  3FFFF                 ||| memTop           | Top of memory                                                |

## Register file

| Index | Name | Bits | Purpose                                      |
|:-----:|:----:|:----:|:---------------------------------------------|
|   0   |  A   |  16  | Accumulator, General purpose                 |
||         AL  |   8  | Low 8 bits of Accumulator                    |
|   1   |  B   |  16  | General purpose                              |
||         BL  |   8  | Low 8 bits of B                              |
|   2   |  C   |  16  | Counter, General purpose                     |
||         CL  |   8  | Low 8 bits of C                              |
|   3   |  D   |  16  | aDdress select, General purpose              |
||         DL  |   8  | Low 8 bits of D                              |
|   4   |  X   |  16  | Index before indirect, General purpose       |
|   5   |  Y   |  16  | Index after indrect, General purpose         |
|   6   |  SP  |  16  | Stack Pointer                                |
|   7   |  BP  |  16  | Base Pointer                                 |
|   C   |  SB  |   2  | Source Bank                                  |
|   D   |  DB  |   2  | Destination Bank                             |
|   E   |  F   |   8  | Flags / processor state                      |
|   F   |  PC  |  16  | Program counter                              |

The flags register is laid out as follows:

| Bit | Name | Purpose                                               |
|:---:|:----:|:------------------------------------------------------|
|  7  |  I   | (I)nterrupt Enable (0 = off, 1 = on)                  |
|  6  |  M   | Calculation (M)ode (0 = no carry, 1 = with carry)     | 
|  5  |  X   | E(X)ecute next                                        |
|  4  |  -   | Reserved                                              |
|  3  |  O   | (O)verflow                                            |
|  2  |  C   | (C)arry                                               |
|  1  |  N   | (N)egative                                            |
|  0  |  Z   | (Z)ero                                                |

## Addressing modes

| Index | Abbr | Name                | Purpose                                |
|:-----:|-----:|:--------------------|:---------------------------------------|
|   0   | imm8 | Immediate 8         | Quickly load an immediate 8-bit value  |
|   0   | rel86| Relative 8          | Jump to an address relative to PC      |
|   1   | imm16| Immediate 16        | Quickly load an immediate 16-bit value |
|   1   | rel16| Relative 16         | Jump to an address relative to PC      |
|   2   | abs16| Absolute 16         | Value in memory                        |
|   3   | ind16| Indirect 16         | Value of address pointed to by address |
|   4   | relBP| Relative BP         | Value relative bytes into stack frame  |
|   5   | indBP| Indirect BP         | Indirected value relative bytes into stack frame |
|   6   | absD | Absolute D          | Value at address indicated by SB:D   |
|   7   | indD | Indirect D          | Indirected value at address indicated by SB:D |

Each mode can be modified by the two index registers:

| Index | Abbr | Name                       | Formula               | Purpose                                |
|:-----:|-----:|:---------------------------|:----------------------|:---------------------------------------|
|   0   |  -   | No index                   | N/A                   | Mode not indexed                       |
|   1   | +X   | Index by X before indirect | (addr+X)              | Add X to the address                   |
|   2   | +Y   | Index by Y after indirect  | (addr)+Y              | Add Y to the address AFTER indirection |
|   3   | +XY  | Index by X and Y           | (addr+X)+Y            | Add X, indirect, then add Y            |

Each index can be modified by scaling:

| Index | Scale |  Formula  | Purpose                        |
|:-----:|:-----:|:----------|:-------------------------------|
|   0   |   1   | index * 1 | Index by bytes                 |
|   1   |   2   | index * 2 | Index by words                 |


## Instruction set and encoding

The instruction set uses a variable-width encoding. 

|   Opcodes        | Encoding                            |  Mnemonic and parameters     |   Flags  | Description
|:----------------:|:------------------------------------|:-----------------------------|:--------:|:--------------
|                  |`76543210 76543210 76543210 76543210`|                              |`IMX.OCNZ`|               
| `00`             |`........ ........ ........ 00000000`| NOP                          |`........`| No operation
| `01`             |`........ ........ 00000001 ########`| ENTER imm8                   |`........`| Create new stack frame with space for imm8 bytes
| `02`             |`........ ........ 00000010 ########`| EXIT imm8                    |`........`| Pop stack frame of imm8 bytes
| `03`             |`........ ........ ........ 00000011`| TRAP AL                      |`........`| Call trap AL 
| `04 00-3F`       |`........ ........ 00000100 00drgsrg`| ADD drg, srg                 |`....OCNZ`| drg := srg + drg; with carry if M is 1
| `04 80-BF`       |`........ ........ 00000100 01drgsrg`| SUB drg, srg                 |`....OCNZ`| drg := drg - srg; with carry if M is 1
| `04 80-BF`       |`........ ........ 00000100 10drgsrg`| XOR drg, srg                 |`......NZ`| drg := drg ^ srg
| `04 C0-FF`       |`........ ........ 00000100 11drgsrg`| CMP drg, srg                 |`......NZ`| flags = drg cmp srg
| `05 00-3F`       |`........ ........ 00000101 00regnum`| SHL reg, times               |`....OCNZ`| reg shl times; if M = 1, ROL
| `05 80-BF`       |`........ ........ 00000101 01drgsrg`| SHR reg, times               |`....OCNZ`| reg shr times; if M = 1, ROR
| `05 80-BF`       |`........ ........ 00000101 10drgsrg`| AND drg, srg                 |`......NZ`| drg := drg & srg
| `05 C0-FF`       |`........ ........ 00000101 11drgsrg`| OR  drg, srg                 |`......NZ`| drg := drg || srg
| `06 01`          |`........ 00000110 00000001 ########`| TRAP imm8                    |`........`| Call trap imm8
| `06 08`          |`........ 00000110 00001000 00000reg`| NEG reg                      |`......N.`| Two's complement register
| `06 10`          |`........ 00000110 00010000 00000reg`| XCB reg                      |`........`| Swap hi/lo byte of register
| `06 40`          |`........ 00000110 00100000 00drgsrg`| MUL drg, srg                 |`....OCNZ`| drg := drg * srg;
| `06 41`          |`........ 00000110 00100001 00drgsrg`| IDIV drg, srg                |`....OCNZ`| drg := drg / srg;
| `06 42`          |`........ 00000110 00100010 00drgsrg`| IMOD drg, srg                |`....OCNZ`| drg := drg % srg;
| `06 6D`          |`........ 00000110 01101101 D.drgreg`| MFILL  D:drg, sreg * C       |`........`| Fill memory at D:drg with low 8 bits of sreg
| `06 6E`          |`........ 00000110 01101110 DSdrgsrg`| MSWAP  D:drg, S:srg * C      |`........`| Swap memory C times from address specified in srg in bank register indicated by S to memory in D:DRG
| `06 6F`          |`........ 00000110 01101111 DSdrgsrg`| MCOPY  D:drg, S:srg * C      |`........`| Move memory C times from address specified in srg in bank register indicated by S to memory in D:DRG
| `06 70-77`       |`........ 00000110 01110reg ########`| IN reg, port                 |`........`| reg := data from port#
| `06 78-7F`       |`........ 00000110 01111reg ########`| OUT reg, port                |`........`| data from port# := reg
| `06 80-BF`       |`........ 00000110 10drgsrg ........`| MOV drg, srg                 |`........`| srg := drg
| `06 C0-FF`       |`........ 00000110 11drgsrg ........`| SWAP reg, reg                |`........`| swap reg and reg
| `07 00-3F`       |`00000111 00mmmxys ######## ########`| BR                           |`........`| Branch to address
| `07 40-7F`       |`00000111 01mmmxys ######## ########`| CALL                         |`........`| Call address as subroutine
| `07 80-BF`       |`00000111 10mmmxys ######## ########`| LDD A(L) [DB]                |`......NZ`| scale of 1 = AL; 2 = A
| `07 C0-FF`       |`00000111 11mmmxys ######## ########`| STS A(L) [DB]                |`........`| scale of 1 = AL; 2 = A
| `08-0B`          |`........ ........ ........ 000010rg`| MOV reg, SB                  |`........`| Set source bank
| `0C-0F`          |`........ ........ ........ 000011rg`| MOV reg, DB                  |`........`| Set destination bank
| `10-17`          |`........ ........ ........ 00010reg`| INC reg                      |`....OCNZ`| Increment register by one
| `18-1F`          |`........ ........ ........ 00011reg`| DEC reg                      |`....OCNZ`| Decrement register by one
| `20-27`          |`........ ........ ........ 00100flg`| IF flag                      |`...X....`| If flag is set, execute next instruction
| `28-2F`          |`........ ........ ........ 00101flg`| IFN flag                     |`...X....`| If flag is NOT set, execute next instruction
| `30-37`          |`........ ........ ........ 00110flg`| SET flag                     |`IMX.OCNZ`| Set flag
| `38-3F`          |`........ ........ ........ 00111flg`| CLR flag                     |`IMX.OCNZ`| Clear flag
| `40-7F`          |`........ 01mmmxys ######## ########`| LDS A(L) [SB]                |`......NZ`| scale of 1 = AL; 2 = A
| `80-BF`          |`........ 10mmmxys ######## ########`| STD A(L) [SB]                |`........`| scale of 1 = AL; 2 = A
| `C0-DF`          |`........ ........ ........ 110dddss`| MOV dest, src                |`........`| transfer dest reg to src reg
| `E0-EF`          |`........ ........ ........ 1110regs`| PUSH reg                     |`........`| push reg on stack
| `F0-FE`          |`........ ........ ........ 1111regs`| POP reg                      |`........`| pop reg off stack
| `FF`             |`........ ........ ........ 11111111`| RET                          |`........`| Return from call

## Stack and calling convention

There are two registers that control the stack:

* `SP` indicates the current top of the stack
* `BP` indicates the bottom of the current stack frame

The stack typically lives at 0x00400 - 0x00FFF. However, this can be relocated by changing SP and BP appropriately. The stack can grow indiscriminately, so it is important that you properly manage the stack.

The stack grows DOWN from SP. This means that the current frame (BP) is always higher than SP. Referencing local variables on the stack will be BP-index, whereas parameters and return values will be BP+index.

## Sample Assembly and Encoding 

### Every possible addressing mode with LD

```asm
.code = 0x1000

    LDS AL, 0x80            => 07 80 80             #imm8
    LDS A,  0x80            => 07 89 00 80          #imm16
    LDS AL, [0x2000]        => 07 90 20 00          #abs16 byte
    LDS A,  [0x2000]        => 07 91 20 00          #abs16 word
    LDS AL, [0x2000+Y]      => 07 92 20 00          #abs16 indexed by Y, byte
    LDS A,  [0x2000+Y]      => 07 93 20 00          #abs16 indexed by Y, word
    LDS AL, [0x2000+X]      => 07 94 20 00          #abs16 indexed by X, byte
    LDS A,  [0x2000+X]      => 07 95 20 00          #abs16 indexed by X, word
    LDS AL, [0x2000+X+Y]    => 07 96 20 00          #abs16 indexed by X and Y, byte
    LDS A,  [0x2000+X+Y]    => 07 97 20 00          #abs16 indexed by X and Y, word
    LDS AL, (0x2000)        => 07 98 20 00          #ind16 byte
    LDS A,  (0x2000)        => 07 99 20 00          #ind16 word
    LDS AL, (0x2000)+Y      => 07 9A 20 00          #ind16, indexed by Y, byte
    LDS A,  (0x2000)+Y      => 07 9B 20 00          #ind16, indexed by Y, word
    LDS AL, (0x2000+X)      => 07 9C 20 00          #ind16 indexed by X, byte
    LDS A,  (0x2000+X)      => 07 9D 20 00          #ind16 indexed by X, word
    LDS AL, (0x2000+X)+Y    => 07 9E 20 00          #ind16 indexed by X, then Y, byte
    LDS A,  (0x2000+X)+Y    => 07 9F 20 00          #ind16 indexed by X, then Y, word
    LDS AL, [BP+0x2000]     => 07 A0 20 00          #relBP byte
    LDS A,  [BP+0x2000]     => 07 A1 20 00          #relBP word
    LDS AL, [BP+0x2000+Y]   => 07 A2 20 00          #relBP+Y byte
    LDS A,  [BP+0x2000+Y]   => 07 A3 20 00          #relBP+Y word
    LDS AL, [BP+0x2000+X]   => 07 A4 20 00          #relBP+X byte
    LDS A,  [BP+0x2000+X]   => 07 A5 20 00          #relBP+X word
    LDS AL, [BP+0x2000+X+Y] => 07 A6 20 00          #relBP+XY byte
    LDS A,  [BP+0x2000+X+Y] => 07 A7 20 00          #relBP+XY word
    LDS AL, (BP+0x2000)     => 07 A8 20 00          #indBP byte
    LDS A,  (BP+0x2000)     => 07 A9 20 00          #indBP word
    LDS AL, (BP+0x2000)+Y   => 07 AA 20 00          #indBP+Y byte
    LDS A,  (BP+0x2000)+Y   => 07 AB 20 00          #indBP+Y word
    LDS AL, (BP+0x2000+X)   => 07 AC 20 00          #indBP+X byte
    LDS A,  (BP+0x2000+X)   => 07 AD 20 00          #indBP+X word
    LDS AL, (BP+0x2000+X)+Y => 07 AE 20 00          #indBP+XY byte
    LDS A,  (BP+0x2000+X)+Y => 07 AF 20 00          #indBP+XY word
    LDS AL, [D]             => 07 B0                #relD byte
    LDS A,  [D]             => 07 B1                #relD word
    LDS AL, [D+Y]           => 07 B2                #relD+Y byte
    LDS A,  [D+Y]           => 07 B3                #relD+Y word
    LDS AL, [D+X]           => 07 B4                #relD+X byte
    LDS A,  [D+X]           => 07 B5                #relD+X word
    LDS AL, [D+X+Y]         => 07 B6                #relD+XY byte
    LDS A,  [D+X+Y]         => 07 B7                #relD+XY word
    LDS AL, (D)             => 07 B8                #indD byte
    LDS A,  (D)             => 07 B9                #indD word
    LDS AL, (D)+Y           => 07 BA                #indD+Y byte
    LDS A,  (D)+Y           => 07 BB                #indD+Y word
    LDS AL, (D+X)           => 07 BC                #indD+X byte
    LDS A,  (D+X)           => 07 BD                #indD+X word
    LDS AL, (D+X)+Y         => 07 BE                #indD+XY byte
    LDS A,  (D+X)+Y         => 07 BF                #indD+XY word
```
