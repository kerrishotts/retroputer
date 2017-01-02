# Technical Specifications

Retroputer emulates a machine with the following pieces of hardware:

* 16KB of ROM \(KERNEL\) with 1KB of scratch space

* 256KB of RAM, of which 64KB can be used for executable instructions

* 6516 16-bit processor capable of addressing 256KB of RAM in 4 banks of 64KB each

* 4025 video generator capable of generating display, sprites, and custom fonts

* 1125 sound generator

* 9800 Hard drive interface for persistent storage

## The 6516 Central Processing Unit

The 6516 is a 16-bit processor with four 16-bit general-purpose registers \(**A**–**D**\), two 16-bit index registers \(**X** & Y**\)**, two 16-bit stack registers \(**SP** & **BP**\), two 2-bit bank select registers \(**SB** & **DB**\), an 8-bit processor status register \(**flags**\) and a 16-bit program counter \(**PC**\). There is an 8-bit alias named **AL** for the low eight bits of **A**.

The CPU can perform 16-bit mathematical operations on any of the 16-bit registers except the program counter. The CPU can perform add, subtract, multiple, divide \(integer\), and modulus \(integer\) operations. The CPU is also capable of bit shifting and byte swapping.

Memory can be loaded and stored a byte at a time or a word \(16 bits\) at a time. There are many different methods of memory access, including absolute, indirect, relative, base-relative, and data-relative addressing. Memory addresses can be further indexed by the index registers and optionally scaled by two to simulate arrays with word-sized elements.

Although the processor can load memory from any of the four available banks, instructions can only be executed in bank 0. This limits programs to 64KB in size, although in reality, programs will be further limited due to the fact that trap vectors, stacks, and ROM all exist in bank 0.

The processor supports 256 interrupts by way of vectors at the low end of memory. These can be triggered by external events \(say, a soft-reset\), internal events \(a timer reaches zero\), or by software.

The processor also supports sending and receiving data over 256 ports. Ports have no timing; requesting a value from a port will let the next piece of data take its place on the next instruction cycle. Likewise, sending data over a port can be done in a tight loop without regard for timing mechanisms.

# The 4025 Video Generator

The 4025 Video Generator is a sophisticated piece of hardware that composites several different types of graphical data into a single 320x200 graphical display using a 256-color palette \(from a 24-bit color palette\). This display is refreshed sixty times per second. Various memory locations control the operation and configuration of the video generator.

The 4025 is capable of compositing multiple layers of graphical content each frame. The following types of content are supported:

* 256 color palette \(using 24-bit colors: R, G, B\)

* Background \(single color\)

* Border \(single color\); capable of changing width and height

* Tiles \(8x8 256-color\); tilesets \(or fonts when generating text\) can be redefined at will

* Up to four \(4\) tile pages visible on-screen, each 40x25 with full background and foreground control

* Tile pages can be offset vertically and horizontally to make smooth scrolling easy, as well as scaled and cropped

* A 320x200 256-color resolution graphics bank

* Eight \(8\) compositing layers; a tile page, graphics, or a sprite may exist at any layer

* Sixteen \(16\) sprites, independently positioned; definitions are obtained from the tilesets and can be any multiple of 8 wide and high

The video generator has access to ~144KB of memory, apportioned as follows:

* 16K of text \(tile\) memory, representing four 40x25 pages, 40x25 background colors, and 40x25 foreground colors, and configuration settings

* 64K of high-resolution graphics memory, representing 320x200 resolution

* 64K of tile \(font\) memory, representing four character \(tile\) sets of 256 entities each \(16K per set\)

* 256 bytes of sprite settings

# The 1125 Sound Generator

The 1125 Sound Generator is a fairly simple piece of hardware capable of generating rudimentary beeps and other synthesized sounds.

TODO: actual specifications

# The 9800 Hard Drive Interface

TODO: actual specifications
