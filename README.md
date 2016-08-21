# Retroputer

The Retroputer is intended as both a plaything and
educational tool. It is intended to simulate what programming
and using an 8-bit computer of the late 1980s was like. Some
liberties, however, are taken, including the following:

* 192KiB of address space -- most 8-bits had 4 - 128KiB
* 64KiB devoted to 320x200 graphics
* 256 color palette consisting of r,g,b,a elements
* 64KiB devoted to tile set definitions (4 sets x 16 KiB)
* 16KiB of ROM
* 256 traps or interrupts
* A slightly larger register file than many CPUs of the time

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
    this.registers = {
      a: 0x00,       // accumulator, general purpose
      b: 0x00,       // general purpose
      // ab          // combination of a & b in 16 bits
      c: 0x00,       // general purpose
      d: 0x00,       // general purpose
      // cd          // combination of c & d in 16 bits
      x: 0x00,       // index register, general purpose
      y: 0x00,       // index register, general purpose
      // xy          // index register (x << 8 + y)
      flags: 0x00,   // 8-bit flags register
      sp: 0x0FFF,    // stack pointer
      pc: 0x0000     // program counter
      bs: 0x00       // bank select (for LD/ST)
    }
```

## Instruction set and encoding

The instruction set uses a variable-width encoding. The encoding
is kept as orthogonal as possible in order to make assembly of
languages easier while also aiding comprehension of the underlying
code.

### Instruction width [0:1]

Instructions can be 8, 16, or 32 bits long, encoded like so:

* 0 - 8 bits
* 10 - 16 bits
* 11 - 32 bits

### Register Encoding 

For 8-bit instructions:

* 000 = a
* 001 = b
* 010 = c
* 011 = d
* 100 = x
* 101 = y
* 110 = flags
* 111 = sp

For 16-bit instructions:

* 000 = ab
* 010 = cd
* 100 = xy
* 111 = sp

### Address Mode encoding

The following address modes are available:

* 000 - Immediate8/16
* 001 - Absolute16
* 010 - Absolute16 + Indexed16
* 011 - Indirect16 (Absolute)
* 100 - Indexed16 Indirect16 (Absolute)
* 101 - Indirect16 Indexed16 (Absolute)
* 110 - Relative8
* 111 - Relative8 + Indexed16?

### Flags

Flags are as follows:

    8  7  6  5  4  3  2  1
    O  C  N              Z

 * (O)verflow
 * (C)arry
 * (N)egative/Less-than
 * (Z)ero/equal

### 1 Byte commands

```
0 0000000     NOP
0 001 0 imm   BS imm        Select Bank 7-bit Immediate 
0 001 1 r08   BS reg8       Select Bank Register  
0 010 0 r08   DEC reg8      Decrement 8-bit register
0 010 1 r16   DEC16 reg16   Decrement 16-bit register
0 011 0 r08   INC reg8      Increment 8-bit register
0 011 1 r16   INC16 reg16   Increment 16-bit register
0 100
0 101
0 110
0 111 0000    LD A, #0x00
0 111 0001    LD B, #0x00
0 111 0010    LD C, #0x00
0 111 0011    LD D, #0x00
0 111 0100    LD X, #0x00
0 111 0101    LD Y, #0x00
0 111 0110    CLF
0 111 0111    LD SP, #0x1000
0 111 1000    LD AB, #0x0000
0 111 1001
0 111 1010    LD CD, #0x0000
0 111 1011
0 111 1100    LD XY, #0x0000
0 111 1101
0 111 1110
0 111 1111    RET           Return
```

### 2 byte commands

```
10 000 r08 | imm8                      CMP reg8, imm8
10 001 000 | imm8                      TRAP imm8
10 001 001 | r08                       TRAP reg8
10 001 010 | registers                 PUSH registers (by bit position; SP,Flags,Y,X,D,C,B,A)
10 001 011 | registers                 POP registers
10 001 100 | r08 r08 ??                CMP reg8, reg8
10 001 101 | r16 r16 ??                CMP reg16, reg16
10 001 110 | rel8                      JZ rel8
10 001 111 | rel8                      JMP rel8
10 010 r08 | imm8                      LD reg8, imm8
10 011 100 | r08 r08                   TXFR r08, r08
10 011 101 | r16 r16                   TXFR r16, r16
10 011 110 | r08 r08                   SWAP r08, r08
10 011 111 | r16 r16                   SWAP r16, r16
10 100 000 | r08 r08                   ADD r08, r08     # src = src + target
10 100 001 | r16 r16                   ADD r16, r16
10 100 010 | r08 r08                   SUB r08, r08
10 100 011 | r16 r16                   SUB r16, r16
10 101 100 | r08 r08                   MUL r08, r08
10 101 101 | r16 r16                   MUL r16, r16
10 101 110 | r08 r08                   DIV r08, r08
10 101 111 | r16 r16                   DIV r16, r16
10 110 000 | r08 imm3                  SHL r08, imm3
10 110 001 | r16 imm3                  SHL r16, imm3   # could optimize this to 2-byte r16 & imm4
10 110 010 | r08 imm3                  SHR r08, imm3
10 110 011 | r16 imm3                  SHR r16, imm3
10 110 100 | r08 imm3                  ROL r08, imm3
10 110 101 | r16 imm3                  ROL r16, imm3
10 110 110 | r08 imm3                  ROR r08, imm3
10 110 111 | r16 imm3                  ROR r16, imm3
10 111 000 | r08 r08                   SHL r08, r08
10 111 001 | r16 r08                   SHL r16, r08
10 111 010 | r08 r08                   SHR r08, r08
10 111 011 | r16 r08                   SHR r16, r08
10 111 100 | r08 r08                   ROL r08, r08
10 111 101 | r16 r08                   ROL r16, r08
10 111 110 | r08 r08                   ROR r08, r08
10 111 111 | r16 r08                   ROR r16, r08
```

### 4 byte commands

```
11 00000 0 | r08 mde bs | val16        LD r08, val16(mde); if imm, then imm8 (high bits ignored)
11 00000 1 | r16 mde bs | val16        LD r16, val16(mde)
11 00001 0 | r08 mde bs | val16        ST r08, val16(mde); if imm, then imm8 (high bits ignored)
11 00001 1 | r16 mde bs | val16        ST r16, val16(mde)
11 00010 0 | r08 mde bs | val16        CMP r08, val16(mde)
11 00010 1 | r16 mde bs | val16        CMP r16, val16(mde)

                                       AND r08, 
                                       AND r16
                                       OR  r08
                                       OR  r16
                                       XOR r08
                                       XOR r16
                                       NOT r08?
                                       NOT r16?

                                       JMP
                                       JSR


11 110 mde | bit-flags  | val16        J(flags)S val16(mde)
11 110 mde | 0000 000 
11 110 mde | 0000 0001  | val16            JZS val16(mde)

11 111 mde | bit-flags  | val16        J(flags)C
11 111 mde | 0000 0001  | val16            JZC val16(mde)
```


## Sample Assembly and Encoding 

```

     .data
     str_len:    #13
     str:        "Hello, world!"  --> 0x0A000
     tilePage0:  #0xB000
     tilePagePtr: .bytes 0xB0 0x00 --> 0x0A100

     TILE_SET:   0xFA03  # DEVICE ONE
     GRAPHICS:   0x0000  # DEVICE ONE
     GRAPHICS_LENGTH: 64000

     .code
     setup:
            BS #0x00                   # 0 001 0 000
            LD A, #0x00                # 10 001 000 , 0000 0000
            LD D, #0x01                # 10 001 011 , 0000 0001
            BS D                       # 0 001 1 011
            ST A, TILE_SET             # 11 00010 0,00 001 .01 , 1100 0000 , 0000 0000 
            BS 0x00                    # 0 001 0 000

     clearGraphics:
            LD A, #0x00                # 10 001 000 , 0000 0000
            LD X, HI(GRAPHICS_LENGTH)  # 10 100 000 , 1111 1010
            LD Y, LO(GRAPHICS_LENGTH)  # 10 101 000 , 0000 0000
     _cont:
            DEC16 XY                   # 0 010 1 100 
            JZ start
            BS #0x01                   # 0 001 0 001
            ST A, GRAPHICS[XY]         # 11 00010 0,00 010 ... , 0000 0000 , 0000 0000
            BS #0x00                   # 0 001 0 000
            JMP _cont 

     start: 
            BS #0x00
            LD X, #0x00
            LD Y, #0x00              # LD XY, #0x0000
            LD A, str[XY]            # LD A,  0x0A000[XY]
            ST A, &(tilePagePtr)[XY] # ST A,  &(0x0A100)[XY]
            CMP Y, #13               # or CMP16 XY, #13
            JZ end                   # relative jump forward
            INC Y                    #
            JMP start                # relative jump back
     end:   RET



    
```






