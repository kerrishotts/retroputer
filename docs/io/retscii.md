# RetSCII

RetSCII is the Retroputer's own special version of ASCII. For the alphanumeric characters \(A-Z, a-z, 0-9\) and most symbols within the same ASCII range, the values match. \(This was not always the case for machines from this era, however.\)

Symbols below 0x20 generally follow Code Page 437. Code Page 437 box-drawing characters are also in the same location as in RetSCII. However, symbols outside of this range are specific to the Retroputer.

The following table maps RetSCII code to the corresponding ASCII symbols. Outside the alphanumeric range, the Unicode mapping is supplied, which should give you a good idea what the character should look like.

|        |    x0    |    x1    |    x2    |    x3    |    x4    |    x5    |    x6    |    x7    |    x8    |    x9    |    xA    |    xB    |    xC    |    xD    |    xE    |    xF    |
|:------:| :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: |
| **0x** |   null   | &#x263A; | &#x263B; | &#x2665; | &#x2666; | &#x2663; | &#x2660; | &#x2022; | &#x25D8; | &#x25CB; | &#x25D9; | &#x2642; | &#x2640; | &#x266A; | &#x266B; | &#x263C; |
| **1x** | &#x25BA; | &#x25C4; | &#x2195; | &#x203C; | &#x00B6; | &#x00A7; | &#x25AC; | &#x21A8; | &#x2191; | &#x2193; | &#x2192; | &#x2190; | &#x221F; | &#x2194; | &#x25B2; | &#x25BC; |
| **2x** |   " "    |    !     |    @     |    \#    |    $     |    %     |    &     |    '     |    \(    |    \)    |    \*    |    +     |    ,     |    -     |    .     |     /    |
| **3x** | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | : | ; | &lt; | = | &gt; | ? |
| **4x** | @ | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
| **5x** | P | Q | R | S | T | U | V | W | X | Y | Z | \[ | \ | \] | ^ | \_ |
| **6x** | \` | a | b | c | d | e | f | g | h | i | j | k | l | m | n | o |
| **7x** | p | q | e | s | t | u | v | w | x | y | z | { | \| | } | ~ | &#x2302; |
| **8x** | | | | | | | | | | | | | | | | |
| **9x** | | | | | | | | | | | | | | | | |
| **Ax** | | | | | | | | | | | | | | | | |
| **Bx** | &#x2591; | &#x2592; | &#x2593; | &#x2502; | &#x2524; | &#x2561; | &#x2562; | &#x2556; | &#x2555; | &#x2563; | &#x2551; | &#x2557; | &#x255D; | &#x255C; | &#x255B; | &#x2510; |
| **Cx** | &#x2514; | &#x2534; | &#x252C; | &#x251C; | &#x2500; | &#x253C; | &#x255E; | &#x255F; | &#x255A; | &#x2554; | &#x2569; | &#x2566; | &#x2560; | &#x2550; | &#x256C; | &#x2567; |
| **Dx** | &#x2568; | &#x2564; | &#x2565; | &#x2559; | &#x2558; | &#x2552; | &#x2553; | &#x256B; | &#x256A; | &#x2518; | &#x250C; | &#x2588; | &#x2584; | &#x258C; | &#x2590; | &#x2580; |
| **Ex** | &#x2598; | &#x259D; | &#x2596; | &#x2597; | &#x259A; | &#x259E; | &#x259F; | &#x2599; | &#x259C; | &#x259B; | &#x256F; | &#x256E; | &#x2570; | &#x256D; | &#x2571; | &#x2572; |
| **Fx** | -        | &#x2022; | -        | -        | &#x25A0; | &#x25A1; | &#x25FB; | -        | -        | -        | -        | &#x25A3; | | | | |


