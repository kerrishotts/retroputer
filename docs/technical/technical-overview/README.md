# Technical Overview

Retroputer emulates a machine with the following pieces of hardware:

* 16KB of ROM \(KERNEL\) with 1KB of scratch space
* 512KB of RAM, of which 64KB can be used for executable instructions
* [6516 16-bit processor](6516-central-processing-unit/README.md) capable of addressing 512KB of RAM in 4 banks of 64KB each
* [6448 video generator](6448-video-generator-1/README.md) capable of generating display, sprites, and custom fonts
* [1125 sound generator](1125-sound-generator.md)
* [9800 persistent storage interface](9800-persistent-storage-interface.md) for long-term persistent storage your files and data.



