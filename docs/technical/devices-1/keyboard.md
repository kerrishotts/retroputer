# Keyboard

The keyboard device listens for user keypresses and then sends them to the processor for further handling.

### Layout

The physical layout is modern, especially when compared with typical computers of the era where it often seemed as every computer had a different location for various symbols. Retroputer does have a few custom keys, but nothing that would be surprising to modern users.

![Physical key placement](../../images/unshifted-keyboard.png)

| Retroputer Key | macOS | Windows |
| :--- | :--- | :--- |
| fn | Cmd | Windows |
| gr | Opt | Alt |
| ctrl | Ctrl | Ctrl |
| bksp | Delete | Backspace |
| enter | Return | Enter |
| caps | Caps Lock | Caps Lock |

Logically the keyboard is laid out in five rows of two quadrants. Each quadrant is represented by an I/O byte and can represent if a key is pressed by setting a bit \(or a key is not pressed by clearing the bit\).

![Logical Keyboard Layout](../../images/keyboard-scan-codes.png)

This makes it possible to detect if multiple keys are _currently_ being pressed.

### The \[GR\] Key

The **GR** key enables you to type graphical characters with the keyboard. You can access an alternate set by pressing **GR**+**SHIFT** at the same time.

![Characters obtained with GR](../../images/keyboard-gr-unshifted.png)

![Characters obtained with GR and SHIFT](../../images/keyboard-gr-shifted.png)

### The \[CTRL\] Key

The **CTRL** key is used to translate keys to their corresponding control codes. This only works for alphabetical keys and a few numerical keys. **CTRL**+**H** will generate RetSCII code `08`, which corresponds to **BACKSPACE**.

The following maps the **CTRL** combination to the resulting control code.

<table>
  <thead>
    <tr>
      <th style="text-align:left">CTRL +</th>
      <th style="text-align:left">RetSCII Code</th>
      <th style="text-align:left">Control Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">A</td>
      <td style="text-align:left"><code>01</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">B</td>
      <td style="text-align:left"><code>02</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">C</td>
      <td style="text-align:left"><code>03</code>
      </td>
      <td style="text-align:left">Break</td>
    </tr>
    <tr>
      <td style="text-align:left">D</td>
      <td style="text-align:left"><code>04</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">E</td>
      <td style="text-align:left"><code>05</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">F</td>
      <td style="text-align:left"><code>06</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">G</td>
      <td style="text-align:left"><code>07</code>
      </td>
      <td style="text-align:left">Bell</td>
    </tr>
    <tr>
      <td style="text-align:left">H</td>
      <td style="text-align:left"><code>08</code>
      </td>
      <td style="text-align:left">Backspace</td>
    </tr>
    <tr>
      <td style="text-align:left">I</td>
      <td style="text-align:left"><code>09</code>
      </td>
      <td style="text-align:left">Tab</td>
    </tr>
    <tr>
      <td style="text-align:left">J</td>
      <td style="text-align:left"><code>0A</code>
      </td>
      <td style="text-align:left">Line Feed</td>
    </tr>
    <tr>
      <td style="text-align:left">K</td>
      <td style="text-align:left"><code>0B</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">L</td>
      <td style="text-align:left"><code>0C</code>
      </td>
      <td style="text-align:left">
        <p>Form Feed /</p>
        <p>Clear Screen</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">M</td>
      <td style="text-align:left"><code>0D</code>
      </td>
      <td style="text-align:left">
        <p>Carriage Return /</p>
        <p>Enter</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">N</td>
      <td style="text-align:left"><code>0E</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">O</td>
      <td style="text-align:left"><code>0F</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">P</td>
      <td style="text-align:left"><code>10</code>
      </td>
      <td style="text-align:left">Cursor Right</td>
    </tr>
    <tr>
      <td style="text-align:left">Q</td>
      <td style="text-align:left"><code>11</code>
      </td>
      <td style="text-align:left">Cursor Left</td>
    </tr>
    <tr>
      <td style="text-align:left">R</td>
      <td style="text-align:left"><code>12</code>
      </td>
      <td style="text-align:left">F1</td>
    </tr>
    <tr>
      <td style="text-align:left">S</td>
      <td style="text-align:left"><code>13</code>
      </td>
      <td style="text-align:left">F2</td>
    </tr>
    <tr>
      <td style="text-align:left">T</td>
      <td style="text-align:left"><code>14</code>
      </td>
      <td style="text-align:left">F3</td>
    </tr>
    <tr>
      <td style="text-align:left">U</td>
      <td style="text-align:left"><code>15</code>
      </td>
      <td style="text-align:left">F4</td>
    </tr>
    <tr>
      <td style="text-align:left">V</td>
      <td style="text-align:left"><code>16</code>
      </td>
      <td style="text-align:left">F5</td>
    </tr>
    <tr>
      <td style="text-align:left">W</td>
      <td style="text-align:left"><code>17</code>
      </td>
      <td style="text-align:left">F6</td>
    </tr>
    <tr>
      <td style="text-align:left">X</td>
      <td style="text-align:left"><code>18</code>
      </td>
      <td style="text-align:left">F7</td>
    </tr>
    <tr>
      <td style="text-align:left">Y</td>
      <td style="text-align:left"><code>19</code>
      </td>
      <td style="text-align:left">F8</td>
    </tr>
    <tr>
      <td style="text-align:left">Z</td>
      <td style="text-align:left"><code>1A</code>
      </td>
      <td style="text-align:left">F9</td>
    </tr>
    <tr>
      <td style="text-align:left">0</td>
      <td style="text-align:left"><code>1B</code>
      </td>
      <td style="text-align:left">F10</td>
    </tr>
    <tr>
      <td style="text-align:left">1</td>
      <td style="text-align:left"><code>1C</code>
      </td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">2</td>
      <td style="text-align:left"><code>1D</code>
      </td>
      <td style="text-align:left">Delete</td>
    </tr>
    <tr>
      <td style="text-align:left">3</td>
      <td style="text-align:left"><code>1E</code>
      </td>
      <td style="text-align:left">Cursor Up</td>
    </tr>
    <tr>
      <td style="text-align:left">4</td>
      <td style="text-align:left"><code>1F</code>
      </td>
      <td style="text-align:left">Cursor Down</td>
    </tr>
  </tbody>
</table>### The Buffer

Because it's possible that the computer won't have a chance to check for a keyboard character being registered during long computations, the keyboard has a 256-character buffer that will store these until they are read back. Once the user reaches the end of the buffer, additional key presses are lost.

### Ports

<table>
  <thead>
    <tr>
      <th style="text-align:left">Port</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">0x30</td>
      <td style="text-align:left">RetSCII code of key pressed</td>
      <td style="text-align:left">
        <ul>
          <li>0x00 if no key pressed.</li>
          <li>Reading will clear the value.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">0x31</td>
      <td style="text-align:left">Buffer Remaining</td>
      <td style="text-align:left"># of characters remaining in the buffer</td>
    </tr>
    <tr>
      <td style="text-align:left">0x32</td>
      <td style="text-align:left">r0:0-7 keys pressed</td>
      <td style="text-align:left">A set bit indicates the key is currently pressed. Zero indicates that
        it is up.</td>
    </tr>
    <tr>
      <td style="text-align:left">0x33</td>
      <td style="text-align:left">r0:8-F keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x34</td>
      <td style="text-align:left">r1:0-7 keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x35</td>
      <td style="text-align:left">r1:8-F keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x36</td>
      <td style="text-align:left">r2:0-7 keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x37</td>
      <td style="text-align:left">r2:8-F keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x38</td>
      <td style="text-align:left">r3:0-7 keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x39</td>
      <td style="text-align:left">r3:8-F keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x3A</td>
      <td style="text-align:left">r4:0-7 keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x3B</td>
      <td style="text-align:left">r4:8-F keys pressed</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x3C</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x3D</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x3E</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x3F</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

### Polling the keyboard

You can poll the keyboard for input as follows:

* Read the value of port 0x30
* If it is non-zero, a key is in the buffer waiting to be processed
  * You must immediately handle the key; checking the buffer will remove the key from the buffer.
* Repeat!
  * Call `PUT_CHAR` if you'd like to echo the results on screen.

```text
.segment code 0x02000 {
.const PUT_CHAR 0x0FE0C

top:
    do {
        in dl, 0x30
        cmp dl, 0
    } while z
    call [PUT_CHAR]
    br top
}
```

