# Retroputer

The Retroputer is intended as both a plaything and educational tool. It is intended to simulate what programming and using a computer from the late 1980s was like. Some liberties, however, are taken, including the following:

* 256KiB is addressable; 192KiB is present -- in the 80s, this would have been pretty expensive
* 64KiB devoted to 320x200 graphics
* 256 color palette consisting of r,g,b,a elements
* 64KiB devoted to tile set definitions (4 sets x 16 KiB)
* 16KiB of ROM
* 256 traps or interrupts
* A slightly larger register file than many CPUs of the time
* 16-bit CPU with a 18-bit address line

The above is to make programming for the Retroputer a little easier while also to make it easy to translate the memory for screen graphics to an HTML5 canvas (which uses four bytes per pixel for RGBA). The tilesets are an affectation to make it easy to create levels and side-scrollers -- these are like (but not quite like) the character set definitions on most 8-bit machines.

## Memory Layout

The memory layout is simple:

|  Start  |   End   | Size | Identifier      | Purpose                                                      |
|:-------:|:-------:|:----:|:---------------:|:-------------------------------------------------------------|
|  00000                 ||| memBot          | Bottom of memory                                             |
|  00000  |  0FFFF  |  64K |                 | Bank 0; code and data                                        |
|  00000  |  001FF  | 512B | traps           | Traps consisting of 256 2-byte pointers                      |
|  00000  |  00001  |   2B | trapReset       | Trap 0x00; points to reset()                                 |
|  00400  |  00FFF  |   3K | stackMax        | Default location of stack; stack grows down from 00FFF       |
|  01000  |  0AFFF  |  39K | codeStart       | Code and data                                                |
|  0B000  |  0B3FF  |   1K | tilePage0       | 40x25 Tile Page 0                                            |
|  0B400  |  0B7FF  |   1K | tilePage1       | 40x25 Tile Page 1                                            |
|  0B800  |  0BBFF  |   1K | tilePage2       | 40x25 Tile Page 2                                            |
|  0BC00  |  0BFFF  |   1K | tilePage3       | 40x25 Tile Page 3                                            |
|  0C000  |  0FFFF  |  16K | romStart        | ROM and KERNEL                                               |
|  10000  |  1FFFF  |  64K |                 | Bank 1; graphics and video configuration                     |
|  10000  |  1F9FF  | ~64K | graphicsStart   | 320x200 256-color graphics                                   |
|  1FA00                 ||| tilePage        | Tile page select (0-3)                                       |
|  1FA01                 ||| tileDisplay     | Tile display order: 0 = behind graphics, 1 = in front; 0 = hidden |
|  1FA02                 ||| graphicsDisplay | Display graphics if set to 1                                 |
|  1FA03                 ||| tileSet         | Tile Set Index (0-4); base 0x20000                           |
|  1FA04                 ||| borderColor     | Border color                                                 |
|  1FA05                 ||| borderSizeX     | Width of border, horizontally                                |
|  1FA06                 ||| borderSizeY     | Height of border, vertically                                 |
|  1FA07                 ||| tileSetOffsetX  | signed offset for tiles, horizontally                        |
|  1FA08                 ||| tileSetOffsetY  | signed offset for tiles, vertically                          |
|  1FA09                 ||| tileBackground  | Tile background color (for 0x00 pixels)                      |
|  1FA0A                 ||| tileForeground  | Tile foreground color (for 0xFF pixels)                      |
|  1FA0B                 ||| backgroundColor | Screen background color                                      |
|  1FC00  |  1FFFF  |   1K | paletteStart    | 256 RGBx color definitions                                   |
|  20000  |  2FFFF  |  64K |                 | Bank 2; tile set definitions                                 |
|  20000  |  23FFF  |  16K | tileSet0        | Tile set 0 (256 8x8 tiles)                                   |
|  24000  |  27FFF  |  16K | tileSet1        | Tile set 1                                                   |
|  28000  |  2BFFF  |  16K | tileSet2        | Tile set 2                                                   |
|  2C000  |  2FFFF  |  16K | tileSet3        | Tile set 3                                                   |
|  2FFFF                 ||| memTop          | Top of memory                                                |

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
|   4   |  X   |  16  | Index, General purpose                       |
|   5   |  Y   |  16  | Index, General purpose                       |
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
|  5  |  B   | Load/Store (B)ank target (0 = SB, 1 = DB)             | 
|  4  |  X   | E(X)ecute next                                        |
|  3  |  O   | (O)verflow                                            |
|  2  |  C   | (C)arry                                               |
|  1  |  N   | (N)egative                                            |
|  0  |  Z   | (Z)ero                                                |

## Addressing modes

| Index | Abbr | Name                | Formula               | Purpose                                |
|:-----:|-----:|:--------------------|:----------------------|:---------------------------------------|
|   0   | imm8 | Immediate 8         | (SB:PC)[1]            | Quickly load an 8-bit value            |
|   0   | rel86| Relative 8          | (SB:PC+(SB:PC)[1])[0] | Jump to an address relative to PC      |
|   1   | imm16| Immediate 16        | (SB:PC)[1]            | Quickly load a 16-bit value            |
|   1   | rel16| Relative 16         | (SB:PC+(SB:PC)[1])[0] | Jump to an address relative to PC      |
|   2   | abs16| Absolute 16         | ((SB:PC)[1])[0]       | Value in memory at SB:PC[1,2]          |
|   3   | ind16| Indirect 16         | (((SB:PC)[1])[0])     | Value of address pointed to by address |
|   4   | relBP| Relative BP         | (SB:BP+(SB:PC)[1])[0] | Value relative bytes into stack frame  |
|   5   | indBP| Indirect BP         | ((SB:BP+(SB:PC)[1])[0])[0] | Indirected value relative bytes into stack frame |
|   6   | absD | Absolute D          | (SB:D+(SB:PC)[1])[0] ] |  Value at address indicated by SB:D   |
|   7   | indD | Indirect D          | ((SB:D+(SB:PC)[1])[0])[0] | Indirected value at address indicated by SB:D |

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
| `01`             |`........ ........ ........ 00000001`| SB:                          |`........`| Target source bank
| `02`             |`........ ........ ........ 00000010`| DB:                          |`........`| Target destination bank
| `03`             |`........ ........ ........ 00000011`| TRAP AL                      |`........`| Call trap AL 
| `04 00-3F`       |`........ ........ 00000100 00drgsrg`| ADD drg, srg                 |`....OCNZ`| drg := srg + drg; with carry if M is 1
| `04 80-BF`       |`........ ........ 00000100 10drgsrg`| SUB drg, srg                 |`....OCNZ`| drg := drg - srg; with carry if M is 1
| `04 80-BF`       |`........ ........ 00000100 10drgsrg`| XOR drg, srg                 |`......NZ`| drg := drg ^ srg
| `04 C0-FF`       |`........ ........ 00000100 11drgsrg`| CMP drg, srg                 |`......NZ`| flags = drg cmp srg
| `05 00-3F`       |`........ ........ 00000101 00regnum`| SHL reg, times               |`....OCNZ`| reg shl times; if M = 1, ROL
| `05 80-BF`       |`........ ........ 00000101 10drgsrg`| SHR reg, times               |`....OCNZ`| reg shr times; if M = 1, ROR
| `05 80-BF`       |`........ ........ 00000101 10drgsrg`| AND drg, srg                 |`......NZ`| drg := drg & srg
| `05 C0-FF`       |`........ ........ 00000101 11drgsrg`| OR  drg, srg                 |`......NZ`| drg := drg || srg
| `06 01`          |`........ 00000110 00000001 ########`| TRAP imm8                    |`........`| Call trap imm8
| `06 08`          |`........ 00000110 00001000 00000reg`| NEG reg                      |`......N.`| Two's complement register
| `06 10`          |`........ 00000110 00010000 00000reg`| BYTESWAP reg                 |`........`| Swap hi/lo byte of register
| `06 40`          |`........ 00000110 00100000 0drg0srg`| MUL drg, srg                 |`....OCNZ`| drg := drg * srg;
| `06 41`          |`........ 00000110 00100001 0drg0srg`| IDIV drg, srg                |`....OCNZ`| drg := drg / srg;
| `06 42`          |`........ 00000110 00100010 0drg0srg`| IMOD drg, srg                |`....OCNZ`| drg := drg % srg;
| `06 6D`          |`........ 00000110 01101101 Ddrgsreg`| MEMFILL D:Drg, sreg          |`........`| Fill memory at D:drg with low 8 bits of sreg
| `06 6E`          |`........ 00000110 01101110 DSdrgsrg`| MEMSWP D:drg, S:srg          |`........`| Swap memory C times from address specified in srg in bank register indicated by S to memory in D:DRG
| `06 6F`          |`........ 00000110 01101111 DSdrgsrg`| MEMCPY D:drg, S:srg          |`........`| Move memory C times from address specified in srg in bank register indicated by S to memory in D:DRG
| `06 70-77`       |`........ 00000110 01110reg ########`| IN reg, port                 |`........`| reg := data from port#
| `06 78-7F`       |`........ 00000110 01111reg ########`| OUT reg, port                |`........`| data from port# := reg
| `06 80-BF`       |`........ 00000110 10drgsrg ########`| MOV drg, srg                 |`........`| srg := drg
| `06 C0-FF`       |`........ 00000110 11drgsrg ########`| SWAP reg, reg                |`........`| swap reg and reg
| `07 00-3F`       |`00000111 00mmmxys ######## ########`| BR                           |`........`| Branch to address
| `07 40-7F`       |`00000111 01mmmxys ######## ########`| CALL                         |`........`| Call address as subroutine
| `08-0B`          |`........ ........ ........ 000010rg`| MOV reg, SB                  |`........`| Set source bank
| `0C-0F`          |`........ ........ ........ 000011rg`| MOV reg, DB                  |`........`| Set destination bank
| `10-17`          |`........ ........ ........ 00010reg`| INC reg                      |`....OCNZ`| Increment register by one
| `18-1F`          |`........ ........ ........ 00011reg`| DEC reg                      |`....OCNZ`| Decrement register by one
| `20-27`          |`........ ........ ........ 00100flg`| IF flag                      |`...X....`| If flag is set, execute next instruction
| `28-2F`          |`........ ........ ........ 00101flg`| IF !flag                     |`...X....`| If flag is NOT set, execute next instruction
| `30-37`          |`........ ........ ........ 00111flg`| STf                          |`IMX.OCNZ`| Set flag
| `38-3F`          |`........ ........ ........ 00111flg`| CLf                          |`IMX.OCNZ`| Clear flag
| `40-7F`          |`........ 01mmmxys ######## ########`| LD A(L)                      |`......NZ`| scale of 1 = AL; 2 = A
| `80-BF`          |`........ 10mmmxys ######## ########`| ST A(L)                      |`........`| scale of 1 = AL; 2 = A
| `C0-DF`          |`........ ........ ........ 110dddss`| MOV dest, src                |`........`| transfer dest reg to src reg
| `E0-EF`          |`........ ........ ........ 1110regs`| PUSH reg                     |`....O...`| push reg on stack; O if stack overflow
| `F0-FE`          |`........ ........ ........ 1111regs`| POP reg                      |`......N.`| pop reg off stack; N if stack underflow
| `FF`             |`........ ........ ........ 11111111`| RET                          |`......N.`| Return from call


## Sample Assembly and Encoding 

```
.code = 0x1000

FUNC main
  LD AL, 0x00
ENDF

.func fillGraphicsWithColor ( byte color )
  .const word GRAPHICS        = 0x0000
  .const byte GRAPHICS-BANK   = 0x01
  .const word GRAPHICS-LENGTH = 64000
  
  LD AL, GRAPHICS-BANK       #
  MV DB, A                   # DB := GRAPHICSBANK
  
  LD A, GRAPHICS-LENGTH      #
  MV C, A                    # C := GRAPHICSLENGTH
  
  LD A, GRAPHICS             #
  MV D, A                    # A := GRAPHICS
  
  LD AL, color               # AL := color
  
  MEMFILL DB:D, AL * C       # Fill memory with color

  RET
  
.func setTileSet ( byte tileSet )
  .const word TILE-SET-SEL   = 0xFA03
  .const byte BANK = 0x00
  
  LD AL, BANK                #
  MV DB, A                   # DB := BANK
  
  LD AL, tileSet             # A := tileSet
  ST AL, SB:&TILE-SET-SEL    # Set the tileset
  
  RET
  
.func printStringAtPos ( wordPtr *str, byte row, byte col )
  .const word TILE-PAGE-0    = 0xB000
  .const byte COLS-PER-ROW   = 40
  .const byte ROWS-PER-PAGE  = 25
  
  XOR A, A                   #
  LD AL, row                 #
  MV B, A                    #
  LD AL, COLS-PER-PAGE       #
  MUL B, A                   # B := row * COLS-PER-PAGE
  
  LD AL, col                 #
  ADD A, B                   #
  MV B, A                    # B := B + col
  
  LD A, TILE-PAGE-0          #
  ADD B, A                   # B := TILE-PAGE-0 + B
  
  XOR A, A                   #
  LD AL, str[0]              #
  MV C, A                    # C := str[0] (length)
  
  XOR X, X                   # X := 0

_loop:
  INC X
  LD AL, str[X]              # AL := str[X]
  ST AL, &TILE-PAGE-0[X]     # Write character to memory location
  DEC C
  IF Z
    BR _loop                 # Keep going as long as we have characters to write

  RET
  
.func main()
  .var str:byte[]            = L"Hello, World!"
  
  CALL setTileSet ( tileSet: 0x00 )
  CALL fillGraphicsWithColor ( color: 0x00 )
  CALL printStringAtPos ( str: str,  row: 12, col: 15 )
  
  RET
  
