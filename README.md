# Retroputer

The Retroputer is intended as both a plaything and educational tool. It is intended to simulate what programming and using a computer from the late 1980s was like. Some liberties, however, are taken, including the following:

* 256KiB is addressable; 256KiB is present -- in the 80s, this would have been pretty expensive
* 64KiB devoted to 320x200 graphics
* 256 color palette consisting of 8-bit r,g,b elements
* 64KiB devoted to tile set definitions (4 sets x 16 KiB)
* 16KiB devoted to up to four visible tile pages on screen at once (4 pages x 4KiB)
* 16KiB of ROM
* 256 traps or interrupts
* A slightly larger register file than many CPUs of the time
* 16-bit CPU with an 18-bit address bus

The above is to make programming for the Retroputer a little easier while also making it easy to translate the memory for screen graphics to an HTML5 canvas (which uses four bytes per pixel for RGBA). The tilesets are an affectation to make it easy to create levels and side-scrollers -- these are like (but not quite like) the character set definitions on many machines of the time.

## Status

Currently works:

* Assembler
* Fetch, decode and execute
* Screen
* Keyboard

In Progress:

* ROM and KERNEL
* Tests

TODO:

* Sprites 
* Sound
* Other devices

## Launching

You can launch the browser interface executing:

```
$ npm install
$ npm run jspm-install
$ npm run serve
```

Then navigate to http://localhost:8080.

## Tests

You can run tests by executing `npm test`.

## Docs

Documentation is available in the [docs](./docs) directory. 

## License

MIT License. Use as much or as little as you want.
