# Colors and Transparency

The 4025 Video Generator can render 256 colors at once from a much larger palette. For most color values, the resulting palette entry directly corresponds to the color value. That is, color 0x01 maps to palette entry 0x01. Except for the background and border color, however, 0x00 and 0xFF refer instead to the _resource background_ and _foreground color_ respectively. If the _resource background_ or _foreground color_ is also 0x00, that color is considered to be _transparent_.

Determining the resource's corresponding background or foreground color depends upon the resource itself:

* The background color for the screen is derived from 0x1FA0B. Should this value be 0x00, palette entry 0x00 is used. \(No transparency\)
* The border color for the screen is derived from 0x1FA034. Should this value be 0x00, palette entry 0x00 is used. \(No transparency\)
* When rendering tiles, the background color is obtained from the memory address 0x0400 higher than the tile's address. Any 0x00 pixel from the corresponding tile definition will be rendered in the background color. If this background color is 0x00, the pixel is transparent. The foreground color is obtained from the memory address 0x0800 higher than the tile's address. Any 0xFF pixel from the corresponding tile definition is rendered as the foreground color. As with the background color, an 0x00 result is considered transparent.
* When rendering Hires Graphics, 0x00 is considered to be transparent.
* When rendering sprites, tile definitions are used. However, instead of obtaining colors from tile page memory, background and foreground colors are obtained from the sprite configuration settings.



