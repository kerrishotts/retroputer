# 1125 Sound Generator

Uses https://tonejs.github.io for generation?

## An instrument

* Attack, Decay, Sustain, Release
* Waveform
* Volume
* Frequency (16-bit)

Port Index  | Parameter(s)
-----------:|:------------
    +0{0:5} | Volume (0-31)
    +0{6,7} | Waveform (0: sine, 1: square, 2: sawtooth, 3: noise)
    +1, +2  | Frequency (16-bit)
    +3{0:3} | Attack (0-15)
    +3{4:7} | Decay (0-15)
    +4{0:3} | Sustain (0-15)
    +4{4:7} | Release (0-15)
