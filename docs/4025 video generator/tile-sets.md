# Tile sets

The 4025 Video Generator can access four \(4\) tile sets. Each tile set contains 256 tile definitions, with each definition being 64 bytes arranged in an 8x8 configuration. Each byte can specify a palette entry, the background color, transparency, or the foreground color. Depending upon the context, the foreground and background color may come from a tile page's color memory or from a sprite's configuration.

The second tile of the first tile set defaults to the following:

| | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0x20040 | 0x00 | 0xFF | 0xFF | 0xFF | 0xFF | 0xFF | 0x00 | 0x00 | 0 |
| 0x20048 | 0xFF | 0x00 | 0x00 | 0x00 | 0x00 | 0x00 | 0xFF | 0x00 | 1 |
| 0x20050 | 0xFF | 0x00 | 0xFF | 0x00 | 0xFF | 0x00 | 0xFF | 0x00 | 2 |
| 0x20058 | 0xFF | 0x00 | 0x00 | 0x00 | 0x00 | 0x00 | 0xFF | 0x00 | 3 |
| 0x20060 | 0xFF | 0x00 | 0xFF | 0x00 | 0xFF | 0x00 | 0xFF | 0x00 | 4 |
| 0x20068 | 0xFF | 0x00 | 0x00 | 0xFF | 0x00 | 0x00 | 0xFF | 0x00 | 5 |
| 0x20070 | 0xFF | 0x00 | 0x00 | 0x00 | 0x00 | 0x00 | 0xFF | 0x00 | 6 |
| 0x20078 | 0x00 | 0xFF | 0xFF | 0xFF | 0xFF | 0xFF | 0x00 | 0x00 | 7 |

If you squint a little, you might be able to make out the shape of a smiley-face, which is the second defined tile in the first tile set.

In this example, 0x00 corresponds to the background color, and 0xFF corresponds to the foreground color. Should either of those colors evaluate to 0x00, then the corresponding pixel will be transparent.

Any other value \(0x01–0xFE\) is taken directly from the corresponding palette entry.

There are four tile sets, defined at the following locations:

* 0x20000
* 0x24000
* 0x28000
* 0x2C000

A tile-based resource \(either tile pages or sprites\) can only use tiles from one set at a time. However, each tile-based resource can be configured to use any tile set independently. This means that one might reserve three of the four tile sets for sprites, and the other tile set for tile pages \(acting as text\). Or, one might have four slightly different font variations, making it easy to change the rendering of text.



