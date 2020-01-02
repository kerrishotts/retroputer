---
description: The Keyboard (device 3) and how to use it.
---

# Keyboard

The keyboard device listens for user keypresses and then sends them to the processor for further handling.

### Layout

The physical layout is modern, especially when compared with typical computers of the era where it often seemed as every computer had a different location for various symbols. Retroputer does have a few custom keys, but nothing that would be surprising to modern users.

![Physical key placement](../../.gitbook/assets/image%20%284%29.png)

| Retroputer Key | macOS | Windows |
| :--- | :--- | :--- |
| fn | Cmd | Windows |
| gr | Opt | Alt |
| ctrl | Ctrl | Ctrl |
| bksp | Delete | Backspace |
| enter | Return | Enter |
| caps | Caps Lock | Caps Lock |

Logically the keyboard is laid out in five rows of two quadrants. Each quadrant is represented by an I/O byte and can represent if a key is pressed by setting a bit \(or a key is not pressed by clearing the bit\).

![Logical Keyboard Layout](../../.gitbook/assets/image%20%2814%29.png)

This makes it possible to detect if multiple keys are _currently_ being pressed.

### The \[GR\] Key

The **GR** key enables you to type graphical characters with the keyboard. You can access an alternate set by pressing **GR**+**SHIFT** at the same time.

![Characters obtained with and without SHIFT and GR](../../.gitbook/assets/image%20%288%29.png)

### The \[CTRL\] Key

The **CTRL** key is used to translate keys to their corresponding control codes. This only works for alphabetical keys and a few numerical keys. **CTRL**+**H** will generate RetSCII code `08`, which corresponds to **BACKSPACE**.

The following maps the **CTRL** combination to the resulting control code.

<table>
  <thead>
    <tr>
      <th >CTRL +</th>
      <th >RetSCII Code</th>
      <th >Control Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >A</td>
      <td ><code>01</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >B</td>
      <td ><code>02</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >C</td>
      <td ><code>03</code>
      </td>
      <td >Break</td>
    </tr>
    <tr>
      <td >D</td>
      <td ><code>04</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >E</td>
      <td ><code>05</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >F</td>
      <td ><code>06</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >G</td>
      <td ><code>07</code>
      </td>
      <td >Bell</td>
    </tr>
    <tr>
      <td >H</td>
      <td ><code>08</code>
      </td>
      <td >Backspace</td>
    </tr>
    <tr>
      <td >I</td>
      <td ><code>09</code>
      </td>
      <td >Tab</td>
    </tr>
    <tr>
      <td >J</td>
      <td ><code>0A</code>
      </td>
      <td >Line Feed</td>
    </tr>
    <tr>
      <td >K</td>
      <td ><code>0B</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >L</td>
      <td ><code>0C</code>
      </td>
      <td >
        <p>Form Feed /</p>
        <p>Clear Screen</p>
      </td>
    </tr>
    <tr>
      <td >M</td>
      <td ><code>0D</code>
      </td>
      <td >
        <p>Carriage Return /</p>
        <p>Enter</p>
      </td>
    </tr>
    <tr>
      <td >N</td>
      <td ><code>0E</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >O</td>
      <td ><code>0F</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >P</td>
      <td ><code>10</code>
      </td>
      <td >Cursor Right</td>
    </tr>
    <tr>
      <td >Q</td>
      <td ><code>11</code>
      </td>
      <td >Cursor Left</td>
    </tr>
    <tr>
      <td >R</td>
      <td ><code>12</code>
      </td>
      <td >F1</td>
    </tr>
    <tr>
      <td >S</td>
      <td ><code>13</code>
      </td>
      <td >F2</td>
    </tr>
    <tr>
      <td >T</td>
      <td ><code>14</code>
      </td>
      <td >F3</td>
    </tr>
    <tr>
      <td >U</td>
      <td ><code>15</code>
      </td>
      <td >F4</td>
    </tr>
    <tr>
      <td >V</td>
      <td ><code>16</code>
      </td>
      <td >F5</td>
    </tr>
    <tr>
      <td >W</td>
      <td ><code>17</code>
      </td>
      <td >F6</td>
    </tr>
    <tr>
      <td >X</td>
      <td ><code>18</code>
      </td>
      <td >F7</td>
    </tr>
    <tr>
      <td >Y</td>
      <td ><code>19</code>
      </td>
      <td >F8</td>
    </tr>
    <tr>
      <td >Z</td>
      <td ><code>1A</code>
      </td>
      <td >F9</td>
    </tr>
    <tr>
      <td >0</td>
      <td ><code>1B</code>
      </td>
      <td >F10</td>
    </tr>
    <tr>
      <td >1</td>
      <td ><code>1C</code>
      </td>
      <td >N/A</td>
    </tr>
    <tr>
      <td >2</td>
      <td ><code>1D</code>
      </td>
      <td >Delete</td>
    </tr>
    <tr>
      <td >3</td>
      <td ><code>1E</code>
      </td>
      <td >Cursor Up</td>
    </tr>
    <tr>
      <td >4</td>
      <td ><code>1F</code>
      </td>
      <td >Cursor Down</td>
    </tr>
  </tbody>
</table>### The Buffer

Because it's possible that the computer won't have a chance to check for a keyboard character being registered during long computations, the keyboard has a 256-character buffer that will store these until they are read back. Once the user reaches the end of the buffer, additional key presses are lost.

### Ports

<table>
  <thead>
    <tr>
      <th >Port</th>
      <th >Name</th>
      <th >Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >0x30</td>
      <td >RetSCII code of key pressed</td>
      <td >
        <ul>
          <li>0x00 if no key pressed.</li>
          <li>Reading will clear the value.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td >0x31</td>
      <td >Buffer Remaining</td>
      <td ># of characters remaining in the buffer</td>
    </tr>
    <tr>
      <td >0x32</td>
      <td >r0:0-7 keys pressed</td>
      <td >A set bit indicates the key is currently pressed. Zero indicates that
        it is up.</td>
    </tr>
    <tr>
      <td >0x33</td>
      <td >r0:8-F keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x34</td>
      <td >r1:0-7 keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x35</td>
      <td >r1:8-F keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x36</td>
      <td >r2:0-7 keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x37</td>
      <td >r2:8-F keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x38</td>
      <td >r3:0-7 keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x39</td>
      <td >r3:8-F keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x3A</td>
      <td >r4:0-7 keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x3B</td>
      <td >r4:8-F keys pressed</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x3C</td>
      <td >&#x2013;</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x3D</td>
      <td >&#x2013;</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x3E</td>
      <td >&#x2013;</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x3F</td>
      <td >&#x2013;</td>
      <td ></td>
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

