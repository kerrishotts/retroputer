# Palette

The 4025 Video Generator is capable of rendering up to 256 colors onscreen at once, from an overall palette of 24-bit color. Changing the palette will affect everything onscreen, making it possible to create faux-animation simply by cycling portions of the palette \(color cycling\), or making it possible to fade content in and out simply by changing brightness levels.

The palette is located at 0x74000 and continues to 0x743FF. There are 256 entries each consisting of an ignored byte \(set to 0xFF\) and the red, green, and blue component of the color. 

An initial palette is configured upon cold boot, however this palette can be overridden at any time.

### The initial palette

The initial palette is stored in ROM at `0x74000`, and the VGP is configured to read from this address \(page 29\) on `RESET`.

The palette consists of the following:

* 24 RGBI color entries \(indices 0–23\)
* 16 shades of gray \(indices 24–39\)
* 216 6-level RGB colors \(indicies 40–255\)
  * These can be accessed by using `40 + ((R/51)*36) + ((G/51)*6) + (B/51)`, where `R`, `G`, and `B` are between `0` and `255` inclusive.

In the initial palette some colors are duplicated, meaning that there aren't 256 distinct colors available for use, but the palette can be redefined to whatever values are needed.

