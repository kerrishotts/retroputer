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
                   r2  r  reg
    a    16-bit    00  -  000   Accumulator, General Purpose
    b    16-bit    01  -  001   General Purpose
    c    16-bit    10  -  010   General Purpose   
    x    16-bit    11  -  011   General Purpose, Index
    sp   16-bit    --  0  100   Stack Pointer
    f     8-bit    --  1  101   Flags
    pc   16-bit    --  -  ---   Program Counter
    sb    4-bit    --  -  110   Source Bank
    db    4-bit    --  -  111   Destination Bank
```

## Instruction set and encoding

The instruction set uses a variable-width encoding. The encoding
is kept as orthogonal as possible in order to make assembly of
languages easier while also aiding comprehension of the underlying
code.

### Instruction width [0:1]

Instructions can be 8, 16, or 32 bits long

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
    I  x  x  x  O  C  N  Z

 * (I)nterrupt Enable
 * (O)verflow
 * (C)arry
 * (N)egative/Less-than
 * (Z)ero/equal


### Opcodes

```
0x00                    0000 00 00                NOP                          --------  No Operation
              
0x01                    0000 00 01                MEMCPY                       --------  Copy sb:b to db:c, indexed X, X times
0x02                    0000 00 10                MEMSWAP                      --------  Swap sb:b to db:c, indexed X, X times

0x03                    0000 00 11                RET                          ????????  Return (from trap or subroutine)      

0x04..0x07              0000 01 r2                INC r2                       ----OCNZ  r2 := r2 + 1  
0x08..0x0B              0000 10 r2                DEC r2                       ----OCNZ  r2 := r2 + 1

0x0C..0x0F              0000 11 r2                BYTESWAP r2                  ------NZ  Swaps top and bottom bytes of r2   
                                             or?  NULL r2                      ------NZ  Sets register to zero 

0x10..0x1F              0001 r2 r2                CMP r2, r2                   ------NZ  Compare r2, r2
                              
0x20..0x2F              0010 r2 r2                TXFR r2, r2                  --------  Transfer target, source
0x30..0x3F              0011 r2 r2                SWAP r2, r2                  --------  Swap target, source
              
0x40..0x4F              0100 r2 r2                ADD r2, r2                   ----OCNZ  target := target + source
0x50..0x5F              0101 r2 r2                SUB r2, r2                   ----OCNZ  target := target - source
0x60..0x6F              0110 r2 r2                MUL r2, r2                   ----OCNZ  target := target * source
0x70..0x7F              0111 r2 r2                DIV r2, r2                   ----OCNZ  target := target / source
                              
0x80..0x83              1000 00 r2 im16           LD r2, im16                  ------NZ  r2 := imm16
0x84..0x87              1000 01 r2 ab16           LD r2, sb:ab16[X]            ------NZ  r2 := memory at (sb:abs16[X])
0x88..0x8B              1000 10 r2 ab16           LD r2, db:&(sb:ab16[X])      ------NZ  r2 := memory at db:&(sb:abs16[X])
0x8C..0X8F              1000 11 r2 ab16           LD r2, db:&(sb:ab16)[X]      ------NZ  r2 := memory at db:&(sb:abs16)[X]
                  
0x90        0x00..0x03  1001 00 00 00 00 00 i2    SB imm2                      --------  SB := imm2
0x90        0x04..0x07  1001 00 00 00 00 01 r2    SB r2                        --------  SB := r2{0-1}
0x90        0x08..0x0B  1001 00 00 00 00 10 i2    DB imm2                      --------  DB := imm2
0x90        0x0C..0x0F  1001 00 00 00 00 11 r2    DB r2                        --------  DB := r2{0-1}

0x90        0x10..0x13  1001 00 00 00 01 00 r2    NEG r2                       ------NZ  Negate r2
0x90        0x14..0x17  1001 00 00 00 01 01 r2    NEG8 r2:8                     ------NZ  Negate r2{0-7}

                                                  STf?
                                                  CLf?
                                                  PUSH
                                                  POP
                ..
0x90        0x80..0x8F  1001 00 00 10 00 r2 i2    SHL r2, i2                   ----OCNZ  r2 << i2
0x90        0x90..0x9F  1001 00 00 10 01 r2 r2    SHL r2, r2                   ----OCNZ  r2 << r2

0x90        0xA0..0xAF  1001 00 00 10 10 r2 i2    SHR r2, i2                   ----OCNZ  r2 >> i2
0x90        0xB0..0xBF  1001 00 00 10 11 r2 r2    SHR r2, r2                   ----OCNZ  r2 >> r2

0x90        0xC0..0xCF  1001 00 00 11 00 r2 i2    ROL r2, i2                   ----OCNZ  r2 <<< i2
0x90        0xD0..0xDF  1001 00 00 11 01 r2 r2    ROL r2, r2                   ----OCNZ  r2 <<< r2

0x90        0xE0..0xEF  1001 00 00 11 10 r2 i2    ROR r2, i2                   ----OCNZ  r2 >>> i2
0x90        0xF0..0xFF  1001 00 00 11 11 r2 r2    ROR r2, r2                   ----OCNZ  r2 >>> r2

0x91        0x00..0xFF  1001 00 01 imm8           TRAP imm8                    ????????  TRAP imm8
0x92        0x00..0x03  1001 00 10 00 00 00 r2    TRAP r2                      ????????  TRAP r2
                ..
0x93        0x00..0x0F  1001 00 11 00 00 r2 r2    AND r2, r2                   ------NZ  target := target & source 
0x93        0x10..0x1F  1001 00 11 00 01 r2 r2    OR r2, r2                    ------NZ  target := target | source 
0x93        0x20..0x2F  1001 00 11 00 10 r2 r2    XOR r2, r2                   ------NZ  target := target ^ source
                          
0x94..0x97              1001 01 r2 ab16           ST r2, db:ab16[X]            --------  memory at (sb:abs16[X]) := r2
0x98..0x9B              1001 10 r2 ab16           ST r2, db:&(sb:ab16[X])      --------  memory at db:&(sb:abs16[X]) := r2
0x9C..0x9F              1001 11 r2 ab16           ST r2, db:&(sb:ab16)[X]      --------  memory at db:&(sb:abs16)[X] := r2
                              
0xA0..0xA3              1010 00 r2 imm8           LD8 r2:8, imm8                ------NZ  r2 := imm8
0xA4..0xA7              1010 01 r2 ab16           LD8 r2:8, sb:ab16[X]:8        ------NZ  r2 := memory at (sb:abs16[X]){0-7}
0xA8..0xAB              1010 10 r2 ab16           LD8 r2:8, db:&(sb:ab16[X]):8  ------NZ  r2 := memory at db:&(sb:abs16[X]){0-7}
0xAC..0xAF              1010 11 r2 ab16           LD8 r2:8, db:&(sb:ab16)[X]:8  ------NZ  r2 := memory at db:&(sb:abs16)[X]{0-7}
                              
0xB0                    1011 00 00 im16           JMP imm16
0xB1                    1011 00 01 ab16           JSR imm16
0xB2                    1011 00 10 ab16           JZS imm16
0xB3                    1011 00 11 ab16           JZC imm16   
                              
0xB4..0xB7              1011 01 r2 ab16           ST8 r2:8, sb:ab16[X]:8        --------  memory at (sb:abs16[X]) := r2{0-7}
0xB8..0xBB              1011 10 r2 ab16           ST8 r2:8, db:&(sb:ab16[X]):8  --------  memory at db:&(sb:abs16[X]) := r2{0-7}
0xBC..0xBF              1011 11 r2 ab16           ST8 r2:8, db:&(sb:ab16)[X]:8  --------  memory at db:&(sb:abs16)[X] := r2{0-7}

0xC0..0xC3              1100 00 r2 im16           CMP r2, imm16                ------NZ  r2 == imm16
0xC4..0xC7              1100 01 r2 ab16           CMP r2, sb:ab16[X]           ------NZ  r2 == (abs16[X])
0xC8..0xCB              1100 10 r2 ab16           CMP r2, db:&(sb:ab16[X])     ------NZ  r2 == db:&(sb:abs16[X])
0xCC..0xCF              1100 11 r2 ab16           CMP r2, db:&(sb:ab16)[X]     ------NZ  r2 == db:&(sb:abs16)[X]

0xD0..0xD3              1101 00 r2 im16           CMP8 r2:8, imm16           :8 ------NZ  r2 == imm8
0xD4..0xD7              1101 01 r2 ab16           CMP8 r2:8, sb:ab16[X]      :8 ------NZ  r2 == (abs16[X])
0xD8..0xDB              1101 10 r2 ab16           CMP8 r2:8, db:&(sb:ab16[X]):8 ------NZ  r2 == db:&(sb:abs16[X])
0xDC..0xDF              1101 11 r2 ab16           CMP8 r2:8, db:&(sb:ab16)[X]:8 ------NZ  r2 == db:&(sb:abs16)[X]

0xE0                    1110 00 00 im16           JMP rel16                    --------  
0xE1                    1110 00 01 ab16           JMP abs16                    --------  [X]?
0xE2                    1110 00 10 ab16           JMP &(ab16[X])               --------
0xE3                    1110 00 11 ab16           JMP &(ab16)[X]               --------

0xE4                    1110 01 00 im16           JSR rel16                    --------  
0xE5                    1110 01 01 ab16           JSR abs16                    --------  [X]?
0xE6                    1110 01 10 ab16           JSR &(ab16[X])               --------
0xE7                    1110 01 11 ab16           JSR &(ab16)[X]               --------

0xE8..0xEB              1110 10 jm val            JCS
0xEC..0xEF              1110 11 jm val            JCC
0xF0..0xF3              1111 00 jm val            JNS
0xF4..0xF7              1111 01 jm val            JNC
0xF8..0xFB              1111 10 jv val            JZS
0xFC..0xFF              1111 11 jm val            JZC

missing JOS, JOC, CMP r2:8, r2:8
MEMZERO might be nice
```


### Instruction Mnemonic Reference



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
E4 00 1A            JSR setup
93 2F               XOR X, X                        # X := 0
A7 20 00            LD8 X, len[X]                   # X := len[0] (abs16)
90 00               SB #0x00                        # Source bank 0
90 08               DB #0x00                        # Dest bank 0
                _loop:
0B                  DEC X                           # X--
A4 20 01            LD8 A, str[X]                   # A{0-7} := str[X]
94 B0 00            ST8 A, TILEPAGE0[X]             # TILEPAGE0[X] := A{0-7}
C3 00 00            CMP X, #0x0000                  # X = 0?
FC FF F5            JZC _loop                       # if X > 0, loop
03                  RET
                end main
            
                setup:  -- BUG: should have XOR X, X to zero
93 20               XOR A, A                        # A := 0
90 01               SB #GRAPHICSBANK                # Source bank 1
94 FA 03            ST8 A, TILESETSEL[X]            # SB:TILESETSEL[X] := A
E4 00 02            JSR clearGraphics
03                  RET        
                end setup
            
                clearGraphics:
93 20               XOR A, A                        # A := 0
83 FA 00            LD X, #GRAPHICSLEN              # X := 64000
90 01               SB #GRAPHICSBANK                # Source Bank 1
                _loop:
0B                  DEC X                           # X--
94 00 00            ST8 A, GRAPHICS[X]              # SB:GRAPHICS[X] := A
FC FF FB            JZC _loop                       # If X > 0, back to the top
03                  RET     
                end clearGraphics      


0x1000: E4 00 1A 93 2F A7 20 00 - 90 00 90 08 0B A4 20 01
0x1010: 94 B0 00 C3 00 00 FC FF - F5 03 93 20 90 01 94 FA
0x1020: 03 E4 00 02 03 92 20 83 - FA 00 90 01 0B 94 00 00
0x1030: FC FF FB 03 .. .. .. .. - .. .. .. .. .. .. .. ..
0x2000: 0D H  e  l  l  o  ,     - w  o  r  l  d  !  .. ..

```






