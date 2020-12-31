# Hardware Sprites

The video processor can display up to sixteen sprites in any given frame. These sprites can have arbitrary dimensions, and can also be scaled.

Some sprites are initially reserved by the system:

* Sprite 14: reserved for the mouse pointer
* Sprite 15: reserved for the text cursor

## Sprite Configuration

Sprites are configured using ports `0x1D`—`0x26`, but must first be selected using port `0x1C` in order to read or write sprite configuration data.

### Sprite Selection \(0x1C:3-0\)

Selects the desired sprite \(0 - 15\).

### Sprite Visibility \(0x1D:7\)

If set, the selected sprite is visible. If not set, the selected sprite is hidden and not rendered.

### Sprite Layer \(0x1D:6-5\)

Determines the layer over which to draw the sprite. Sprites are always drawn above the indicated layer.

### Sprite Source Page \(0x1D:4-0\)

Determines the page from which to load the sprite's tile data. This is then mapped against sprite's tile page \(`0X1F`\) and used to render the sprite. Sprite are always tile-based in nature; there is no unique pixel addressing mode for sprites.

### Sprite Index \(0x1E\)

Within a given 16K page, this is used to select the actual sprite data. An index addresses 64 bytes of memory, although with color data, a sprite is usually larger than 64 bytes.

### Sprite Scale \(0x1F:7-6\)

Indicates the scale of the sprite.

* `0`: normal scale
* `1`: double scale
* `2`: 4x scale
* `3`: 8x scale

### Sprite Tile Page \(0x1F:4-0\)

Indicates the source tile material for the sprite.

### Sprite Height \(0x20:7-4\)

Indicates the height of the sprite, in tiles. Ranges from 0 to 15 tiles high.

### Sprite Width \(0x20:3-0\)

Indicates the width of the sprite, in tiles. Ranges from 0 to 15 tiles wide.

### Sprite Background Color \(0x21\)

Indicates the sprite's background color. If `0x00`, the sprite will be transparent.

### Sprite Foreground Color \(0x22\)

Indicates the sprite's foreground color. Any `0xFF` pixels in the sprite will render with this color.

### Sprite X Position \(0x23 & 0x24\)

Determines the sprite's horizontal position. Combined, ports `0x23` and `0x24` form a sixteen-bit word \(with `0x23` as the high eight bits\) allowing a sprite to be positioned anywhere on the screen. The position is signed, meaning that negative values can be specified to ensure that a sprite is off screen \(to the left\).

Note that the horizontal sprite position of `0` does not indicate the left-most visible pixel column on the screen. Instead `0` is typically behind the screen border. For small sprites, this means it's easy to go "off screen" without having to go negative.

The screen border is typically 64 pixels wide. To display a sprite at the first visible horizontal pozition, set the X position to 64. Similarly, the last visible X position is 575.

### Sprite Y Position \(0x25 & 0x26\)

Determines the sprite's vertical position. Like the X position, these two ports combine to form a sixteen-bit word \(with `0x25` as the high byte\). This allows the sprite to be positioned anywhere on the screen. The position is signed, meaning that negative values can be specified to ensure that a sprite is off screen \(above the top\).

A vertical position of `0` does not indicate the top-most visible pixel row on the screen. Instead this is typically behind the screen border. The screen border is typically 48 pixels high. To display a sprite at the first visible position, set the Y position to 48. Similarly the last visible Y position is 431.

## Sprite Collisions

Sprite collisions are tracked with ports `0x29` and `0x2A`. Each bit \(with `0x29` being the high bits\) represents a single sprite. If the bit is set, the sprite collided with _something_ \(although the system doesn't track _what_\). If unset, the sprite hasn't collided with anything.

* [ ] TODO: Implement this!



