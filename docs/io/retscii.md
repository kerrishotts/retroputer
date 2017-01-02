# RetSCII

RetSCII is the Retroputer's own special version of ASCII. For the alphanumeric characters \(A-Z, a-z, 0-9\) and most symbols within the same ASCII range, the values match. \(This was not always the case for machines from this era, however.\)

Symbols below 0x20 generally follow Code Page 437. Code Page 437 box-drawing characters are also in the same location as in RetSCII. However, symbols outside of this range are specific to the Retroputer.

The following table maps RetSCII code to the corresponding ASCII symbols. Outside the alphanumeric range, the Unicode mapping is supplied, which should give you a good idea what the character should look like.

| | x0 | x1 | x2 | x3 | x4 | x5 | x6 | x7 | x8 | x9 | xA | xB | xC | xD | xE | xF |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0x | nul | 263A | 263B | 2665 | 2666 | 2663 | 2660 | 2022 | 25D8 | 25CB | 25D9 | 2642 | 2640 | 266A | 266B | 263C |
| 1x | 25BA | 25C4 | 2195 | 203C | 00B6 | 00A7 | 25AC | 21A8 | 2191 | 2193 | 2192 | 2190 | 221F | 2194 | 25B2 | 25BC |
| 2x | " " | ! | @ | \# | $ | % | & | ' | \( | \) | \* | + | , | - | . | / |
| 3x | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | : | ; | &lt; | = | &gt; | ? |
| 4x | @ | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
| 5x | P | Q | R | S | T | U | V | W | X | Y | Z | \[ | \ | \] | ^ | \_ |
| 6x | \` | a | b | c | d | e | f | g | h | i | j | k | l | m | n | o |
| 7x | p | q | e | s | t | u | v | w | x | y | z | { | \| | } | ~ | 2302 |
| 8x | | | | | | | | | | | | | | | | |
| 9x | | | | | | | | | | | | | | | | |
| Ax | | | | | | | | | | | | | | | | |
| Bx | 2591 | 2592 | 2593 | 2502 | 2524 | 2561 | 2562 | 2556 | 2555 | 2563 | 2551 | 2557 | 255D | 255C | 255B | 2510 |
| Cx | 2514 | 2534 | 252C | 251C | 2500 | 253C | 255E | 255F | 255A | 2554 | 2569 | 2566 | 2560 | 2550 | 256C | 2567 |
| Dx | 2568 | 2564 | 2565 | 2559 | 2558 | 2552 | 2553 | 256B | 256A | 2518 | 250C | 2588 | 2584 | 258C | 2590 | 2580 |
| Ex | | | | | | | | | | | | | | | | |
| Fx | | | | | | | | | | | | | | | | |


