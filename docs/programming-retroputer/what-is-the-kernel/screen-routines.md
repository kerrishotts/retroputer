# Screen and Editor

The screen module within the kernel provides operations around displaying text, changing screen display modes, and supporting the screen editor. 

## Settings

The screen module uses the following settings in memory \(starting at `0x01100`\) to ensure proper operation of the cursor, and much more. 

> **Important**
>
> Any mismatch between the following settings and the corresponding screen layer settings will result in misplacement of the screen cursor, incorrect rendering, and unexpected visual artifacts.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Setting</th>
      <th style="text-align:left">Address</th>
      <th style="text-align:left">Values</th>
      <th style="text-align:left">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">screen-width</td>
      <td style="text-align:left"><code>0x01100</code>
      </td>
      <td style="text-align:left">
        <p><b>5</b>
        </p>
        <p>6</p>
      </td>
      <td style="text-align:left">
        <p>Determines the screen width (32 or 64 char).</p>
        <p>If 5, the screen is 32 characters wide. If 6, 64.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">screen-rows</td>
      <td style="text-align:left"><code>0x01101</code>
      </td>
      <td style="text-align:left">
        <p><b>21</b>
        </p>
        <p>24</p>
        <p>42</p>
        <p>48</p>
      </td>
      <td style="text-align:left">
        <p>Tracks the number of rows visible on the screen.</p>
        <p>21 and 42 arise from the 9px character cells.</p>
        <p>24 and 48 arise from the 8px character cells.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">screen-cols</td>
      <td style="text-align:left"><code>0x01102</code>
      </td>
      <td style="text-align:left">
        <p><b>32</b>
        </p>
        <p>64</p>
      </td>
      <td style="text-align:left">The actual screen width (# of characters).</td>
    </tr>
    <tr>
      <td style="text-align:left">screen-length</td>
      <td style="text-align:left"><code>0x01103</code>
      </td>
      <td style="text-align:left"><code>0x0FFF</code>
      </td>
      <td style="text-align:left">
        <p>Indicates the length of the text screen in bytes.</p>
        <p>Includes color memory.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">screen-part-length</td>
      <td style="text-align:left"><code>0x01105</code>
      </td>
      <td style="text-align:left">
        <p><b><code>0x03FF</code></b>
        </p>
        <p><code>0x0FFF</code>
        </p>
      </td>
      <td style="text-align:left">Indicates the length of the memory block representing the visible text.</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-scale</td>
      <td style="text-align:left"><code>0x01107</code>
      </td>
      <td style="text-align:left">
        <p><b>4</b>
        </p>
        <p>5</p>
      </td>
      <td style="text-align:left">
        <p>Used to correctly place the cursor sprite.</p>
        <p>Set to 4 when screen is 32 characters wide.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-row</td>
      <td style="text-align:left"><code>0x01108</code>
      </td>
      <td style="text-align:left">0-47</td>
      <td style="text-align:left">Current row position of the cursor sprite.</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-col</td>
      <td style="text-align:left"><code>0x01109</code>
      </td>
      <td style="text-align:left">0-63</td>
      <td style="text-align:left">Current column position of the cursor sprite.</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-fg</td>
      <td style="text-align:left"><code>0x0110A</code>
      </td>
      <td style="text-align:left">0-<b>255</b>
      </td>
      <td style="text-align:left">Foreground color for the cursor sprite.</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-bg</td>
      <td style="text-align:left"><code>0x0110B</code>
      </td>
      <td style="text-align:left"><b>0</b>-255</td>
      <td style="text-align:left">Background color for the cursor sprite.</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-tile</td>
      <td style="text-align:left"><code>0x0110C</code>
      </td>
      <td style="text-align:left">
        <p><b><code>0xDB</code></b>
        </p>
        <p><code>0x93</code>
        </p>
      </td>
      <td style="text-align:left">
        <p>The tile used for the cursor sprite.</p>
        <p><code>0xDB</code> is a block, used to indicate overstrike.</p>
        <p><code>0x93</code> is a vertical line, used to indicate insert mode.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-visible</td>
      <td style="text-align:left"><code>0x0110D</code>
      </td>
      <td style="text-align:left">
        <p>0</p>
        <p><b>1</b>
        </p>
      </td>
      <td style="text-align:left">If <code>1</code>, the cursor sprite is rendered on the screen.</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-blink-toggle</td>
      <td style="text-align:left"><code>0x0110E</code>
      </td>
      <td style="text-align:left">
        <p><b>0</b>
        </p>
        <p>1</p>
      </td>
      <td style="text-align:left">(Internal) Used to determine if the cursor is currently blinking (hidden)
        or not (visible).</td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-blink-speed</td>
      <td style="text-align:left"><code>0x0110F</code>
      </td>
      <td style="text-align:left"><b>19</b>
      </td>
      <td style="text-align:left">
        <p>Speed of the cursor blink.</p>
        <p>Default is 1/3s.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">cursor-blink-counter</td>
      <td style="text-align:left"><code>0x01110</code>
      </td>
      <td style="text-align:left"><b>19</b>
      </td>
      <td style="text-align:left">(Internal) Countdown used to control cursor blink.</td>
    </tr>
    <tr>
      <td style="text-align:left">screen-text-fg</td>
      <td style="text-align:left"><code>0x01111</code>
      </td>
      <td style="text-align:left">0-<b>255</b>
      </td>
      <td style="text-align:left">Foreground color for rendering text.</td>
    </tr>
    <tr>
      <td style="text-align:left">screen-text-bg</td>
      <td style="text-align:left"><code>0x01112</code>
      </td>
      <td style="text-align:left"><b>0</b>-255</td>
      <td style="text-align:left">Background color for rendering text.</td>
    </tr>
    <tr>
      <td style="text-align:left">screen-page</td>
      <td style="text-align:left"><code>0x01113</code>
      </td>
      <td style="text-align:left"><b><code>0x2000</code></b>
      </td>
      <td style="text-align:left">Indicates which page to utilize for rendering text.
        <br />This is in <b>PTR</b> form.</td>
    </tr>
    <tr>
      <td style="text-align:left">screen-line-height</td>
      <td style="text-align:left"><code>0x01115</code>
      </td>
      <td style="text-align:left">
        <p>8</p>
        <p>9</p>
        <p>16</p>
        <p><b>18</b>
        </p>
      </td>
      <td style="text-align:left">The current line height. Relates to the height of the character cell.</td>
    </tr>
    <tr>
      <td style="text-align:left">screen-layer</td>
      <td style="text-align:left"><code>0x01116</code>
      </td>
      <td style="text-align:left"><b>0</b>
      </td>
      <td style="text-align:left">Used when controlling layer modes.</td>
    </tr>
    <tr>
      <td style="text-align:left">print-mode</td>
      <td style="text-align:left"><code>0x01117</code>
      </td>
      <td style="text-align:left">
        <p><b><code>0x00</code></b>
        </p>
        <p><code>0x02</code>
        </p>
        <p><code>0x04</code>
        </p>
        <p><code>0x80</code>
        </p>
      </td>
      <td style="text-align:left">
        <p>Determines the printing mode when calling kernel routines.</p>
        <p>When 0, rich printing occurs (with parsing of control codes.)</p>
        <p>When 2, quote mode is in effect.</p>
        <p>When 4, control parameter collection is in effect</p>
        <p>When 128, characters are printed with no processing. (raw mode)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">print-control-param</td>
      <td style="text-align:left"><code>0x01118</code>
      </td>
      <td style="text-align:left"><b>0</b>-255</td>
      <td style="text-align:left">Accumulator for the control code parameter.</td>
    </tr>
  </tbody>
</table>## CLEAR\_SCREEN

Clears the contents of the screen. The screen is filled with `0x00` bytes to ensure that the screen editor can detect the ends of lines. The foreground and background color are also copied to color memory.

```text
call [CLEAR_SCREEN]
```

## CURSOR\_BACKSPACE

Removes the character directly preceding the cursor in the current logical line and shifts the remaining characters left by one. The cursor is moved one space to the left, and if necessary is placed at the end of the previous row. The cursor cannot retreat past the top-left screen position.

* TODO: Expose

```text
call [CURSOR_BACKSPACE]
```

## CURSOR\_DOWN

Moves the cursor down by one row. If necessary, the contents of the screen will scroll to make room.

```text
call [CURSOR_DOWN]
```

## CURSOR\_LEFT

Moves the cursor left by one character. If the cursor goes beyond the left side of the screen, it will reappear on the right on the previous row. The cursor cannot retreat past the top-left position of the screen.

```text
call [CURSOR_LEFT]
```

## CURSOR\_NEWLINE

Moves the cursor down by one row and places it at the beginning of the line. If necessary, the screen contents will scroll to make room.

```text
call [CURSOR_NEWLINE]
```

## CURSOR\_RIGHT

Moves the cursor right by one character. If the cursor goes beyond the right side of the screen, it will reappear on the left on the next row. If the cursor goes beyond the number of visible lines on the screen, the screen contents will scroll up to make room.

```text
call [CURSOR_RIGHT]
```

## CURSOR\_UP

Moves the cursor up by one row. The cursor cannot advance above the first row of the screen.

```text
call [CURSOR_UP]
```

## CVT\_ADDR\_TO\_POS

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | D, X | Address |
| Return | DH | Row |
|  | DL | Column |

Converts a PTR address into the corresponding row and column. For example, if PTR\(D, X\) is `0x10010`, then the corresponding cursor position is row 0, column 16.

> **Important**
>
> This routine performs no range checking. As such, it is possible for values out of the supported range to be returned.

```text
d := addrbank(0x10010)
x := addrbofs(0x10010)
call [CVT_ADDR_TO_POS]       # D: 0x0010
```

## GET\_CHAR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Return | DL | Character typed |

Waits for the user to press a key. When the user does, the value of the key is returned.

> **Important**
>
> When invoked, the keyboard will be repeatedly polled for keypresses. The machine will enter a lower power state until the user presses a key or another interrupt occurs \(such as a new screen frame\).
>
> No further program operation will continue until the user presses a key.

```text
call [GET_CHAR]             # Get a character from the user
cmp dl, ASC("A")            # Did they type an uppercase "A"?
```

## GET\_CHAR\_UNDER\_CURSOR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Return | DL | The character under the cursor |

Returns the chacter under the cursor \(for the current screen page\).

```text
call [GET_CHAR_UNDER_CURSOR]  # Current address
cmp dl, asc("A")              # check if it's an "A"
```

## GET\_CURSOR\_ADDR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Return | D, X | Address corresponding to cursor position |

Returns the memory address of the current cursor position. This is in PTR form.

> **Note**
>
> To access the color memories, add `0x01000` for the foreground color and `0x02000` for the background color.

```text
call [GET_CURSOR_ADDR]      # Current address
al := asc("A")              # al = 65
[d, x] := al                # "A" is now under the cursor
```

## GET\_CURSOR\_POS

| Type | Register | Notes |
| :--- | :--- | :--- |
| Return | DL | Column \(0-63\) |
|  | DH | Row \(0-47\) |

Returns the current cursor position. Any printed text will be displayed starting at this location.

> **Important**
>
> This routine performs no range checking. As such, it is possible for values out of the expected range to be returned if they have been previously set incorrectly.

```text
call [GET_CURSOR_POS]       # Get current position
inc dl                      # Move cursor right by one
call [SET_CURSOR_POS]       # Cursor is now one character right
                            # NOTE: no range check in this example!
```

## GET\_LOGICAL\_LINE\_END\_ADDR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Return | D, X | Address corresponding to end of the logical line. |

A physical line is a single row of characters in screen memory–the width of which is determined by the width of the layer \(either 32 or 64 characters\).

A logical line, however, is any number of characters on the screen bracketed by NUL \(`0x00`\) characters. This allows the user to enter lines much wider than the physical screen width.

This position returns the address of the last character that ends the _current_ logical line. If none can be found, the position will be the bottom-right of the screen.

```text
call [GET_LOGICAL_LINE_END_ADDR]        # End of logical line
call [CVT_ADDR_TO_POS]                  # Convert to row, col
call [SET_CURSOR_POS]                   # Move cursor to end of line
```

## GET\_LOGICAL\_LINE\_START\_ADDR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Return | D, X | Address corresponding to start of the logical line. |

A physical line is a single row of characters in screen memory–the width of which is determined by the width of the layer \(either 32 or 64 characters\).

A logical line, however, is any number of characters on the screen bracketed by NUL \(`0x00`\) characters. This allows the user to enter lines much wider than the physical screen width.

This position returns the address of the first character that starts the _current_ logical line. If none can be found, the position will be the top left of the screen.

```text
call [GET_LOGICAL_LINE_START_ADDR]      # Start of logical line
call [CVT_ADDR_TO_POS]                  # Convert to row, col
call [SET_CURSOR_POS]                   # Move cursor to start of line
```

## INPUT

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | D, X | Buffer for user input |
|  | C | Maximum characters to accept |
| Return | C | Number of characters accepted |

Waits for the user to enter a logical line and stores the result in `[D, X]`. The buffer _must_ be large enough to store the requested number of characters \(including a `NUL`\).

If the logical line exceeds the allowed length, `C` will be `-1`, and `[D, X]` will only contain `NUL`.

> **Important**
>
> This routine uses GET\_CHAR to wait for input. See that routine for more information.

```text
d := addrbank(input-buffer)
x := addrbofs(input-buffer)
c := 100
call [INPUT]
```

## PRINT

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | D, X | PTR Address of NUL-terminated string |
| Return | – | – |

Calls `PUT_CHAR` for each character in the string until `0x00` is encountered. The screen contents will scroll as needed to make room for any content.

> **Important**
>
> If no NUL character terminates the string, random gibberish may appear on the screen. Furthermore, control codes and such may be interpreted in unexpected ways.

```text
d := addrbank(str)
x := addrbofs(str)
call [PRINT]
```

## PUT\_CHAR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | DL | Character to display on the screen |
| Return | – | – |

Displays the character specified in `DL` and advances the cursor. If `DL` is a control character, the cursor may not advance by one character \(for example, if `DL` represents **backspace**, the cursor will go back by a character\).

If control code parameter collection mode is enabled, the cursor will not advance until a new control code is entered. While in this mode, numerical digits accumulate in the control code parameter.

When quote or raw mode is enabled, control characters are rendered rather than being interpreted.

If necessary, the screen will scroll should the cursor advance past the bottom of the visible screen.

```text
ld al, 65
call [PUT_CHAR]             # writes "A" on the screen
```

#### Control Characters

<table>
  <thead>
    <tr>
      <th style="text-align:left">Character Code</th>
      <th style="text-align:left">Keyboard Shortcut</th>
      <th style="text-align:left">ASCII</th>
      <th style="text-align:left">RETSCII</th>
      <th style="text-align:left">Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">00</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left">NUL</td>
      <td style="text-align:left">NUL</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">01</td>
      <td style="text-align:left">CTRL + A</td>
      <td style="text-align:left">SOH</td>
      <td style="text-align:left">TOP</td>
      <td style="text-align:left">Moves cursor to the home position (top, left)</td>
    </tr>
    <tr>
      <td style="text-align:left">02</td>
      <td style="text-align:left">CTRL + B</td>
      <td style="text-align:left">STX</td>
      <td style="text-align:left">SOL</td>
      <td style="text-align:left">Moves cursor to the start of the logical line</td>
    </tr>
    <tr>
      <td style="text-align:left">03</td>
      <td style="text-align:left">CTRL+C</td>
      <td style="text-align:left">ETX</td>
      <td style="text-align:left">BRK</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">04</td>
      <td style="text-align:left">CTRL+D</td>
      <td style="text-align:left">EOT</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">05</td>
      <td style="text-align:left">CTRL+E</td>
      <td style="text-align:left">ENQ</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">06</td>
      <td style="text-align:left">CTRL+F</td>
      <td style="text-align:left">ACK</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">07</td>
      <td style="text-align:left">CTRL+G</td>
      <td style="text-align:left">BEL</td>
      <td style="text-align:left">BEL</td>
      <td style="text-align:left">Plays a short beep</td>
    </tr>
    <tr>
      <td style="text-align:left">08</td>
      <td style="text-align:left">BACKSPACE / CTRL+H</td>
      <td style="text-align:left">BS</td>
      <td style="text-align:left">BS</td>
      <td style="text-align:left">Backspace</td>
    </tr>
    <tr>
      <td style="text-align:left">09</td>
      <td style="text-align:left">
        <p>TAB</p>
        <p>CTRL+I</p>
      </td>
      <td style="text-align:left">HT</td>
      <td style="text-align:left">HT</td>
      <td style="text-align:left">Horizontal Tab</td>
    </tr>
    <tr>
      <td style="text-align:left">10</td>
      <td style="text-align:left">CTRL+J</td>
      <td style="text-align:left">LF</td>
      <td style="text-align:left">LF</td>
      <td style="text-align:left">Moves the cursor down a line, scrolling if necessary</td>
    </tr>
    <tr>
      <td style="text-align:left">11</td>
      <td style="text-align:left">CTRL+K</td>
      <td style="text-align:left">VT</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">12</td>
      <td style="text-align:left">CTRL+L</td>
      <td style="text-align:left">FF</td>
      <td style="text-align:left">CLS</td>
      <td style="text-align:left">Clears the screen and relocates the cursor to the home position</td>
    </tr>
    <tr>
      <td style="text-align:left">13</td>
      <td style="text-align:left">ENTER / CTRL+M</td>
      <td style="text-align:left">CR</td>
      <td style="text-align:left">NL</td>
      <td style="text-align:left">Moves the cursor down a line, scrolling if necessary, and moves the cursor
        to the leftmost position on the new line</td>
    </tr>
    <tr>
      <td style="text-align:left">14</td>
      <td style="text-align:left">CTRL+N</td>
      <td style="text-align:left">SO</td>
      <td style="text-align:left">EOL</td>
      <td style="text-align:left">Moves cursor to the end of the logical line</td>
    </tr>
    <tr>
      <td style="text-align:left">15</td>
      <td style="text-align:left">CTRL+O</td>
      <td style="text-align:left">SI</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">16</td>
      <td style="text-align:left">RIGHT / CTRL+P</td>
      <td style="text-align:left">DLE</td>
      <td style="text-align:left">RT</td>
      <td style="text-align:left">Moves the cursor right, wrapping and scrolling if necessary</td>
    </tr>
    <tr>
      <td style="text-align:left">17</td>
      <td style="text-align:left">LEFT / CTRL+Q</td>
      <td style="text-align:left">DC1</td>
      <td style="text-align:left">LT</td>
      <td style="text-align:left">Moves the cursor left, wrapping if necessary</td>
    </tr>
    <tr>
      <td style="text-align:left">18</td>
      <td style="text-align:left">F1 / CTRL+R</td>
      <td style="text-align:left">DC2</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left">Set Foreground Color to Control Parameter</td>
    </tr>
    <tr>
      <td style="text-align:left">19</td>
      <td style="text-align:left">F2 / CTRL+S</td>
      <td style="text-align:left">DC3</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left">Set Background Color to Control Parameter</td>
    </tr>
    <tr>
      <td style="text-align:left">20</td>
      <td style="text-align:left">F3 / CTRL+T</td>
      <td style="text-align:left">DC4</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">21</td>
      <td style="text-align:left">F4 / CTRL+U</td>
      <td style="text-align:left">NAK</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">22</td>
      <td style="text-align:left">F5 / CTRL+V</td>
      <td style="text-align:left">SYN</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">23</td>
      <td style="text-align:left">F6 / CTRL+W</td>
      <td style="text-align:left">ETB</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">24</td>
      <td style="text-align:left">F7 / CTRL+X</td>
      <td style="text-align:left">CAN</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left">Clears the screen</td>
    </tr>
    <tr>
      <td style="text-align:left">25</td>
      <td style="text-align:left">F8 / CTRL+Y</td>
      <td style="text-align:left">EM</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">26</td>
      <td style="text-align:left">F9 / CTRL+Z</td>
      <td style="text-align:left">SUB</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left">Cancels Control Parameter Collection mode.</td>
    </tr>
    <tr>
      <td style="text-align:left">27</td>
      <td style="text-align:left">F10 / CTRL+0</td>
      <td style="text-align:left">ESC</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left">Enters Control Parameter Collection mode. Any digits typed after this
        code will accumulate until another control code is entered.</td>
    </tr>
    <tr>
      <td style="text-align:left">28</td>
      <td style="text-align:left">CTRL+1</td>
      <td style="text-align:left">FS</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">29</td>
      <td style="text-align:left">DELETE / CTRL+2</td>
      <td style="text-align:left">GS</td>
      <td style="text-align:left">DEL</td>
      <td style="text-align:left">Delete</td>
    </tr>
    <tr>
      <td style="text-align:left">30</td>
      <td style="text-align:left">UP / CTRL+3</td>
      <td style="text-align:left">RS</td>
      <td style="text-align:left">UP</td>
      <td style="text-align:left">Moves the cursor up</td>
    </tr>
    <tr>
      <td style="text-align:left">31</td>
      <td style="text-align:left">DOWN / CTRL+4</td>
      <td style="text-align:left">MS</td>
      <td style="text-align:left">DN</td>
      <td style="text-align:left">Moves the cursor down, scrolling if necessary</td>
    </tr>
  </tbody>
</table>## SCROLL\_SCREEN\_UP

Scrolls the contents of the screen up by one row. 

```text
call [SCROLL_SCREEN_UP]
```

## SET\_CURSOR\_POS

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | DL | Column \(0-63\) |
|  | DH | Row \(0-47\) |
| Return | – | – |

Positions the cursor sprite at the specified row and column. Printed text will continue from this position. The cursor sprite blink cycle is also reset.

> **Important**
>
> This routine performs no range checking. As such, it is possible for values out of the expected range to cause the cursor to disappear, and memory to become corrupt.

```text
d := 0x1005                 # DH = 16, DL = 5
call [SET_CURSOR_POS]       # Cursor is now at row 16, col 5
```

#### 

