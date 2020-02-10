# Tile Sets

The VGP can access tile sets at the base of any of the 32 available pages. Each tile set contains 256 tile definitions, with each definition being 64 bytes arranged in an 8x8 configuration. Each byte can specify a palette entry, the background color, transparency, or the foreground color. Depending upon the context, the foreground and background color may come from a tile page's color memory or from a sprite's configuration.

The second tile of the first tile set defaults to the following:

![](../../../images/tile-definition.png)

If you squint a little, you might be able to make out the shape of a smiley-face, which is the second defined tile in the first tile set.

In this example, `0x00` corresponds to the background color, and `0xFF` corresponds to the foreground color. Should either of those colors evaluate to `0x00`, then the corresponding pixel will be transparent.

Any other value \(`0x01–0xFE`\) is taken directly from the corresponding palette entry.

A tile-based resource \(either tile pages or sprites\) can only use tiles from one set at a time. However, each tile-based resource can be configured to use any tile set independently. This means that one might reserve three tile sets for sprites, and another tile set for tile pages \(acting as text\). Or, one might have four slightly different font variations, making it easy to change the rendering of text.

### Default Tile Set

Upon power-on, the system defaults to using the VGU's default tile set.

![](../../../images/character-map.png)

