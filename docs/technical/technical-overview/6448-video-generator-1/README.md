# 6448 Video Generator

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



