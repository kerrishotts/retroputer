# Layers

The 6448 VGP is continuously compositing several layers several times per second. This composition allows complex visual effects without a lot of effort on the programmer's part. The composition system is designed to make it easy to create two-dimensional side-scrollers and the like, a typical staple for computers from the design time period.

Aside from the background and the border, there are four layers which can be configured to use any of the two available text modes or the hi-res graphics mode. There are also up to sixteen sprites available for use. While each layer is rendered in ascending order \(so layer 0 is below layer 1\), sprites can be assigned to be above an arbitrary layer \(this is a sprite's z-index setting\).

Due to the way the layers and sprites are rendered, a pixel that resolves to `0x00` in any layer is considered transparent and will show the layer underneath \(or the background, if no layer is below\). There is no support for partial transparency.

### Layer Configuration

Layers are configured by first selecting the desired layer \(0—3\) and then modifying the associated configuration settings.

Selecting a layer is accomplished by writing the desired layer to port `0x12`.

```text
ld a, 0x01
out 0x12, a
```

At this point, any write to ports `0x13` to `0x1B` will alter the configuration for the selected layer. Changes will take effect immediately, so you may need to take care to wait for the next frame if you are concerned about flicker or static.

#### Layer Visibility \(0x13:7\)

You can control the visibility of a layer by setting or clearing the high bit of port `0x13` \(`LAYER_SRC`\).

```text
in a, 0x13
or al, 0b1000_0000       # set high bit so that this layer is visible
out 0x13, a              # ... make it so!
```

If the high bit is clear, the layer will not be rendered.

#### Layer Source Page \(0x13:4-0\)

Each layer's contents must be stored somewhere in memory. This setting controls which page contains the data that is used to render each layer. The layout of this page is determined by the layer's rendering mode. Because only the page can be specified, there are only 32 locations at which a layer's content can reside \(these are 16k blocks throughout memory\). By default, the first layer's page is set to `0x04`, which maps to `0x10000` in memory.

```text
in a, 0x13
or al, 0b000_00100     # set page to fourth page, mapped to 0x10000
out 0x13, a
```

For 32x24 text mode, the layout is as follows:

* `0x0000` — `0x02FF`: tile index data \(768 bytes\)
* `0x1000` — `0x12FF`: foreground color
* `0x2000` — `0x22FF`: background color
* All other memory addresses are ignored and may be used for your own purposes

For 64 x 48 text mode, the layout is as follows:

* `0x0000` — `0x0BFF`: tile index data \(3072 bytes\)
* `0x1000` — `0x1BFF`: foreground color
* `0x2000` — `0x2BFF`: background color

For 256 x 192 hi-res mode, the layout is as follows:

* `0x0000` — `0xC000`: pixel color
* Note that hi-res mode is comprised of _three_ 16k pages.

#### Layer Scale \(0x14:7-6\)

Each layer has an associated scale factor that can be applied during rendering. This scale factor allows easy magnification of a layer, at the cost of reduced resolution. There are four scaling factors:

* 0: no magnification
* 1: double magnification
* 2: quadruple magnification
* 3: x8 magnification

  in al, 0x14 or al, 0b01\_000000 \# set scaling to double out 0x14, al

Although scaling a text mode layer does effectively reduce the number of characters that are visible per line, the _layout_ of the source page is not changed. That is, the VGP still expects 32 \(or 64\) characters per text line.

#### Layer Tile Source \(0x14:4-0\)

Each layer, when in text mode, sources the text character \(or tile\) definitions from a specified page in memory. By default this is set to page 28 \(`0x70000`\) in ROM.

```text
in al, 0x14
or al, 0b00_01000      # set tile source to page 8 (0x20000)
out 0x14, al
```

Changing the text character definition or the tile source can be an effective way at changing the look of a level — including primitive animation.

#### Layer Background Color \(0x15\) and Foreground Color \(0x16\)

Sets the background and foreground color for the layer. By default, this is `0x00` for the background, which means that any `0x00` color in the layer source will be considered transparent as well, making the layer translucent. Should the layer need to be opaque, a non-zero color can be specified.

By default, the foreground is set to `0xFF`, which means that any `0xFF` color in the source will map to the same color.

```text
ld al, 0x0C
out 0x15, al     # set the background color of the layer to 0x0C
ld al, 0x16
out 0x16, al     # set the foreground color to be yellow
```

#### Layer X and Y Offset \(0x17, 0x18\)

Each layer can be offset in both the horizontal and vertical direction, making smooth scrolling easy to accomplish. Each port accepts an eight-bit signed integer indicating the amount of offset. This means layers can be offset by 128 pixels to the left \(or top\) and 127 pixels to the right \(or bottom\).

```text
ld al, -64
out 0x17, al
ld al, 42
out 0x18, al
```

#### Layer X and Y Crop \(0x19, 0x1A\)

Each layer can also be cropped by a specified number of pixels. This can be useful if one wants to mask out portions of a layer in order to render "windows".

The crop is mirrored — so if you set the X crop to be 16 pixels, the layer will be cropped on both edges using 16 pixels.

#### Layer Render Mode \(0x1B:1-0\)

Each layer has its own rendering mode, as follows:

* 0: 32 x 24 text mode
* 1: 64 x 48 text mode
* 2: 256 x 192 hi-res graphics mode
* 3: undefined

