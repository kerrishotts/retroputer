# Video Layers

The 4025 Video Generator is continuously compositing eight layers onto your screen sixty \(60\) times per second. This composition allows complex visual effects without a lot of effort on the programmer's part. The composition system is designed to make it easy to create two-dimensional side-scrollers and the like, a typical staple for computers from the design time period.

Except for the background and the border, every resource can be assigned to a distinct video layer. Each layer is composited in order from zero \(0\) to seven \(7\), in ascending order, on top of the previous layer. Transparency is specified by using the transparent color \(0x00\). There is no partial transparency support.

The background color is fixed at layer zero \(0\) and always rendered first. The border is fixed at layer seven \(7\) and always rendered last. The programmer is free to determine the layer at which tile pages, high-resolution graphics, and sprites all render, making it easy to occlude some resources by other resources, or _vice versa_.

Resources can also be removed from the composition process, effectively hiding them from view, by assigning a layer larger than seven \(7\). Conventionally, 0xFF is used \(which represents -1 in two's-complement binary\).

Upon cold boot, the 4025 Video Generator assigns the following layers to the available resources:

| Resource | Layer | Address |
| :--- | :--- | :--- |
| Background color | 0x00 | - |
| Tile Page 0 | 0x01 | 0x30FFF |
| Tile Page 1 | 0xFF \(invisible\) | 0x31FFF |
| Tile Page 2 | 0xFF \(invisible\) | 0x32FFF |
| Tile Page 3 | 0xFF \(invisible\) | 0x33FFF |
| Hires Graphics | 0xFF \(invisible\) | 0x1FA02 |
| Border | 0x07 | - |
| Sprites \(_n_ = 0–15\) | 0xFF \(invisible\) | 0x3400_n_ |

Without further modifications to these settings, the system is essentially rendering a 40x25 text mode, suitable for typical text operations.


