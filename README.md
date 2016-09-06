# Retroputer

The Retroputer is intended as both a plaything and
educational tool. It is intended to simulate what programming
and using a computer from the late 1980s was like. Some
liberties, however, are taken, including the following:

* 256KiB is addressable; 192KiB is present -- in the 80s, this would
  have been pretty expensive
* 64KiB devoted to 320x200 graphics
* 256 color palette consisting of r,g,b,a elements
* 64KiB devoted to tile set definitions (4 sets x 16 KiB)
* 16KiB of ROM
* 256 traps or interrupts
* A slightly larger register file than many CPUs of the time
* 16-bit CPU with a 18-bit address line

The above is to make programming for the Retroputer a little
easier while also to make it easy to translate the memory for
screen graphics to an HTML5 canvas (which uses four bytes per
pixel for RGBA). The tilesets are an affectation to make it
easy to create levels and side-scrollers -- these are like (but
not quite like) the character set definitions on most 8-bit
machines.

## Memory Layout

The memory layout is simple:

```
memoryLayout = {
  size:                192
 ,memtop:          0x2FFFF
 ,tileSetsLength:    65536
 ,tileSetLength:     16384
 ,tileSet3:        0x2C000  // tileset 3
 ,tileSet2:        0x28000  // tileset 2
 ,tileSet1:        0x24000  // tileset 1
 ,tileSet0:        0x20000  // 16K 256 8x8 tileset 0  
 ,tileSetsStart:   0x20000
 ,paletteLength:      1024
 ,paletteLength32:     256
 ,paletteStart:    0x1FC00  // 256 x 4 bytes
 ,backgroundColor: 0x1FA0B  // background color for screen
 ,tileForeground:  0x1FA0A  // foreground color for tiles (0xFF)
 ,tileBackground:  0x1FA09  // background color for tiles (0x00)
 ,tileSetOffsetY:  0x1FA08  // signed offset for tiles (y-pos px)
 ,tileSetOffsetX:  0x1FA07  // signed offset for tiles (x-pos px)
 ,borderSizeY:     0x1FA06  // height of vertical border in px
 ,borderSizeX:     0x1FA05  // width of horizontal border in px
 ,borderColor:     0x1FA04  // Border Color
 ,tileSet:         0x1FA03  // Tile set (sourced from 0x2****)
 ,graphicsDisplay: 0x1FA02  // Display graphics? 1 = yes
 ,tileDisplay:     0x1FA01  // Tile display order:
                            //     0 = behind graphics
                            //     1 = in front of graphics
                            //     2 = hidden
 ,tilePage:        0x1FA00  // Tile page: 0=0x0A000; 1=0x0A400
 ,screenConfigLength:  256
 ,screenConfigStart:0x1FA00
 ,graphicsLength:    64000
 ,graphicsStart:   0x10000  // 320 x 200 (64000) bytes
 ,romEnd:          0x0FFFF  // End of ROM
 ,romStart:        0x0C000  // Start of ROM
 ,tilePagesLength:    4096
 ,tilePageLength:     1000
 ,tilePage3:       0x0BC00  // 40x25 tile page 3
 ,tilePage2:       0x0B800  // 40x25 tile page 2
 ,tilePage1:       0x0B400  // 40x25 tile page 1
 ,tilePage0:       0x0B000  // 40x25 tile page 0
 ,tilePagesStart:  0x0B000
 ,codeStart:       0x01000  // Start of code execution
 ,stackTop:        0x00FFF  // top of stack (grows down)
 ,stackMax:        0x00400  // bottom of stack
 ,trapReset:       0x00000  // jump to instruction when reset
                            // default: 0x01000
 ,traps:           0x00000  // 256 2-byte long pointers; ends 0x001FF
 ,membot:          0x00000
}
```

## Register file

```
                   r2  r  reg  reg#
    a    16-bit    00  -  000  0000    Accumulator, General Purpose
    b    16-bit    01  -  001  0001    General Purpose
    c    16-bit    10  -  010  0010    General Purpose   
    x    16-bit    11  -  011  0011    General Purpose, Index
    sp   16-bit    --  0  100  0100    Stack Pointer
    f     8-bit    --  1  101  0101    Flags
    pc   16-bit    --  -  ---  0110    Program Counter
    sb    4-bit    --  -  110  1110    Source Bank
    db    4-bit    --  -  111  1111    Destination Bank
```

## Instruction set and encoding

The instruction set uses a variable-width encoding. The encoding
is kept as orthogonal as possible in order to make assembly of
languages easier while also aiding comprehension of the underlying
code.

|     Type     |   Opcodes        | Encoding                             |  Mnemonic  |  Operand 1  |  Operand 2  |   Flags  | Description
|:------------:|:----------------:|:-------------------------------------|:----------:|:-----------:|:-----------:|:--------:|:--------------
| No Op        | 0x00             |`00000000`                            |   `NOP`    |      -      |      -      |`........`| NOP; really CPY A,A
| Reg Manip.   | 0x00...0x0F      |`0000drsr`                            |   `CPY`    |  dest reg   |    src reg  |`........`| Copies the destination register value to source register
| Reg Manip.   | 0x10...0x1F      |`0001r1r2`                            |   `SWP`    |     r1      |      r2     |`........`| Swaps r1 and r2
| Cond. Logic  | 0x20...0x1F      |`0010rrrr`                            |   `CMP`    |     reg     |      reg    |`......NZ`| Compares registers; sets N if less-than; clears if greater; sets Z if zero
| Math         | 0x30...0x3F      |`0011rrrr`                            |   `ADD`    |  dest reg   |    src reg  |`....OCNZ`| dest reg += src reg
| Math         | 0x40...0x4F      |`0100rrrr`                            |   `SUB`    |  dest reg   |    src reg  |`....OCNZ`| dest reg -= src reg
| Bit Manip.   | 0x50...0x5F      |`0101rrrr`                            |   `SHL`    |  dest reg   |      reg    |`....OCNZ`| dest reg << reg
| Bit Manip.   | 0x60...0x6F      |`0110rrrr`                            |   `SHR`    |  dest reg   |      reg    |`....OCNZ`| dest reg >> reg
| Bit Manip.   | 0x70...0x7F      |`0111rrrr`                            |   `AND`    |  dest reg   |      reg    |`......NZ`| dest reg &= reg
| Bit Manip.   | 0x80...0x8F      |`1000rrrr`                            |   `OR`     |  dest reg   |      reg    |`......NZ`| dest reg |= reg
| Bit Manip.   | 0x90...0x9F      |`1001rrrr`                            |   `XOR`    |  dest reg   |      reg    |`......NZ`| dest reg ^= reg
| Math         | 0xA0...0xAF      |`1010rrrr`                            |   `MUL`    |  dest reg   |      reg    |`....OCNZ`| dest reg *= reg
| Math         | 0xB0...0xBF      |`1011rrrr`                            |   `DIV`    |  dest reg   |      reg    |`....OCNZ`| dest reg /= reg
| Flags        | 0xC0             |`11000000`                            |   `CLI`    |      -      |      -      |`I.......`| Clear interrupt flag (disables hardware interrupts)
| Flags        | 0xC1             |`11000001`                            |   `B16`    |      -      |      -      |`.8......`| Operations will be 16-bit
| Flags        | 0xC2             |`11000010`                            |     -      |      -      |      -      |`..!.....`| Invalid Instruction
| Flags        | 0xC3             |`11000011`                            |   `CLB`    |      -      |      -      |`...B....`| Clear branch flag
| Flags        | 0xC4             |`11000100`                            |   `CLO`    |      -      |      -      |`....O...`| Clear Overflow flag
| Flags        | 0xC5             |`11000101`                            |   `CLC`    |      -      |      -      |`.....C..`| Clear Carry Flag
| Flags        | 0xC6             |`11000110`                            |   `CLN`    |      -      |      -      |`......N.`| Clear Negative Flag
| Flags        | 0xC7             |`11000111`                            |   `CLZ`    |      -      |      -      |`.......Z`| Clear Zero Flag
| Flags        | 0xC8             |`11001000`                            |   `STI`    |      -      |      -      |`I.......`| Set interrupt flag (enables hardware interrupts)
| Flags        | 0xC9             |`11001001`                            |   `B08`    |      -      |      -      |`.8......`| Next operation will be 8-bit
| Flags        | 0xCA             |`11001010`                            |     -      |      -      |      -      |`..!.....`| Invalid Instruction
| Flags        | 0xCB             |`11001011`                            |   `STB`    |      -      |      -      |`...B....`| Set branch flag
| Flags        | 0xCC             |`11001100`                            |   `STO`    |      -      |      -      |`....O...`| Set Overflow flag
| Flags        | 0xCD             |`11001101`                            |   `STC`    |      -      |      -      |`.....C..`| Set Carry Flag
| Flags        | 0xCE             |`11001110`                            |   `STN`    |      -      |      -      |`......N.`| Set Negative Flag
| Flags        | 0xCF             |`11001111`                            |   `STZ`    |      -      |      -      |`.......Z`| Set Zero Flag
| Flags        | 0xD0             |`11010000`                            |   `TSI`    |      -      |      -      |`...B....`| Test interrupt flag
| Flags        | 0xD1             |`11010001`                            |   `TS8`    |      -      |      -      |`...B....`| Test 8-bit flag
| Flags        | 0xD2             |`11010010`                            |     -      |      -      |      -      |`...B....`| Invalid Instruction
| Flags        | 0xD3             |`11010011`                            |   `TSB`    |      -      |      -      |`...B....`| Test branch flag
| Flags        | 0xD4             |`11010100`                            |   `TSO`    |      -      |      -      |`...B....`| Test Overflow flag
| Flags        | 0xD5             |`11010101`                            |   `TSC`    |      -      |      -      |`...B....`| Test Carry Flag
| Flags        | 0xD6             |`11010110`                            |   `TSN`    |      -      |      -      |`...B....`| Test Negative Flag
| Flags        | 0xD7             |`11010111`                            |   `TSZ`    |      -      |      -      |`...B....`| Test Zero Flag
| Reg Manip.   | 0xD8...0xDB      |`110110rr`                            |   `INC`    |     reg     |      -      |`....OCNZ`| Increments register by one
| Reg Manip.   | 0xDC...0xDF      |`110111rr`                            |   `DEC`    |     reg     |      -      |`....OCNZ`| Decrements register by one
| Reg Manip.   | 0xE0...0xE3      |`111000rr`                            |   `NEG`    |     reg     |      -      |`......N.`| Negates the register (2s-Compliment)
| Stack Manip. | 0xE4             |`11100100`                            |   `PUSHP`  |      -      |      -      |`........`| Push Processor State on stack (all registers)
| Stack Manip. | 0xE5             |`11100101`                            |   `POPP`   |      -      |      -      |`........`| Pops Processor State from stack
| Control flow | 0xE6             |`11100110`                            |   `RET`    |      -      |      -      |`........`| Return from call
| 2-Byte Ext.  | 0xE7             |`11100111`                            |     -      |      -      |      -      |`........`| Extended Opcode Group
| Bank Manip   | 0xE7 0x00...0x03 |`11100111 000000rr`                   |    `SB`    |     reg     |      -      |`........`| Set Source Bank to register
| Bank Manip   | 0xE7 0x04...0x07 |`11100111 000001##`                   |    `SB`    |    imm(2)   |      -      |`........`| Set Source Bank to immediate value (0-3)
| Bank Manip   | 0xE7 0x08...0x0B |`11100111 000010rr`                   |    `DB`    |     reg     |      -      |`........`| Set Destination Bank to register
| Bank Manip   | 0xE7 0x0C...0x0F |`11100111 000011##`                   |    `DB`    |    imm(2)   |      -      |`........`| Set Destination Bank to immediate value (0-3)
| Bit Manip    | 0xE7 0x10...0x1F |`11100111 0001rrrr`                   |   `ROL`    |  dest reg   |      reg    |`......NZ`| Rotate dest register left number of times (reg)
| Bit Manip    | 0xE7 0x20...0x2F |`11100111 0010rrrr`                   |   `ROR`    |  dest reg   |      reg    |`......NZ`| Rotate dest register right number of times (reg)
| Bit Manip    | 0xE7 0x30...0x33 |`11100111 001100rr`                   |   `BSWP`   |     reg     |      -      |`......NZ`| Swaps byte order of register
|              | 0xE7     ...     |`11100111         `                   |            |      -      |      -      |`........`|  
| Reg Bit Manip| 0xE7 0x40...0x7F |`11100111 01rrbits`                   |   `TSTB`   |     reg     |      bits   |`...B....`| Tests bit # of register; B indicates set status 
| Reg Bit Manip| 0xE7 0x80...0xBF |`11100111 10rrbits`                   |   `CLRB`   |     reg     |      bits   |`........`| Clears bit # of register 
| Reg Bit Manip| 0xE7 0xC0...0xFF |`11100111 11rrbits`                   |   `SETB`   |     reg     |      bits   |`........`| sets bit # of register 
| Bulk Memory  | 0xE7 0xFD        |`11100111 11111101`                   |    `MC`    |      -      |      -      |`........`| Memory Copy 
| Bulk Memory  | 0xE7 0xFE        |`11100111 11111110`                   |    `MS`    |      -      |      -      |`........`| Memory Swap 
| Bulk Memory  | 0xE7 0xFF        |`11100111 11111111`                   |    `MF`    |      -      |      -      |`........`| Memory Fill 
| Stack Manip. | 0xE8...0xEF      |`11101reg`                            |   `PUSH`   |     reg     |      -      |`........`| Pushes reg on the stack
| Stack Manip. | 0xF0...0xF7      |`11110reg`                            |   `POP`    |     reg     |      -      |`........`| Pops register off stack
| Data Load    | 0xF8 0x10...0x13 |`11111000 000100rr ########`          |    `LD`    |     reg  
| Data Load    | 0xFC             |`11111100 rrsiam## ######## ########` |    `LD`    |     reg     |    varied   |`......NZ`| Loads a value into a register from memory 
| Control Flow | 0xFF             |`11111111 00sijm## ######## ########` |   `BRA`    |    varied   |             |`........`| Branch Always to address 

* 3-byte LD imm8
* 3-byte IN reg, port
* 3-byte OUT reg, port
* 3-byte TRAP imm8
* 3-byte TRAP reg

* 4-byte LD
* 4-byte ST
* 4-byte BRA (branch always)
* 4-byte BSA (branch subroutine always)
* 4-byte BRC (branch if branch clear)
* 4-byte BRS (branch if branch set)





### Address Mode encoding

The following address modes are available:

```
                      am  jm   
    Immediate         00  --    Immediate value; 8/16 dependent upon instruction
    Relative          --  00    Relative Jump
    Absolute[X]       01  01    Absolute value, indexed by X; Jump isn't indexed
    &(Indirect[X])    10  10    Value at location pointed to by (Indirect + X)
    &(Indirect)[X]    11  11    Value at location pointed to by Indirect, then indexed by X;
```

### Flags

Flags are as follows:

    8  7  6  5  4  3  2  1
    I  8  x  B  O  C  N  Z

 * (I)nterrupt Enable
 * (8)bit mode -- if set, only the low eight bits of registers are used, and memory is retrieved and stored one byte at a time. 
 * (B)ranch   -- used for branches; if set causes BRA to branch. If not set, causes BRC to branch
 * (O)verflow
 * (C)arry
 * (N)egative/Less-than
 * (Z)ero/equal





## Sample Assembly and Encoding 

```
#   #=Immediate
#   &=Indirect
#   {}=Bit range
#   (nothing) = Absolute
#
                .const
                TILEPAGE0    0xB000
                TILESETSEL   0xFA03                 # in bank 0x01
                GRAPHICS     0x0000                 # in bank 0x01
                GRAPHICSBANK 0x01
                GRAPHICSLEN  64000
            
                .data = 0x2000
0D              len   db 13                         # 0x2000
Hello, World!   str   db "Hello, World!"            # 0x2001
            
                .code = 0x1000
                main: 
90 00               SB #0x00                        # Wise to always select the source
90 08               DB #0x00                        # and destination banks before doing anything
E4 00 15            CALL setup
0F                  NULL X                          # X needs to be zero, or we'll mis-index the next cmd
A7 20 00            LD X.8, :len[X]                  # X := len[0]
81 20 01            LD B, #str                      # B := address of str
82 B0 00            LD C, #TILEPAGE0                # C := address of the first tile page
01                  MEMCPY                          # Copy each byte at SB:B to DB:C, X times
03                  RET                             # Going to trigger Stack Underflow and HALT
                end main

                setup:
90 01               SB #GRAPHICSBANK
0F                  NULL X                          # Make sure X is zero, or we'll mis-index!
0C                  NULL A
B4 FA 03            ST A.8, :TILESETSEL[X]           # Ensure tile page 0 is selected (A = 0)
E4 00 04            CALL clearGraphics
03                  RET
                end setup                    

                clearGraphics:
90 00               SB #0x00                    
90 09               DB #GRAPHICSBANK
83 FA 00            LD X, #GRAPHICSLEN              # Graphics display is 64,000 long
A0 20               LD A:8, 0x20                    # We want to fill it with spaces (32 = 0x20)
83 00 00            LD C, #GRAPHICS                 # Start at GRAPHICS starting address
90 1F               MEMFILL                         # Dump a lot of spaces!
03                  RET
                end clearGraphics



0x1000: 90 00 90 08 E4 00 15 0F - A7 20 00 81 20 01 82 B0 
0x1010: 00 01 03|90 01 0F 0C B4 - FA 03 E4 00 04 03|90 00
0x1020: 90 09 83 FA 00 A0 20 83 - 00 00 90 1F 03 .. .. ..
0x2000: 0D H  e  l  l  o  ,     - w  o  r  l  d  !  .. ..

```






