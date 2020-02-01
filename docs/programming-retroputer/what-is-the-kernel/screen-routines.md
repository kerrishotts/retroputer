# Screen Routines

## CLEAR\_SCREEN

**Parameters:** None  
**Returns:** None

Clears the contents of the screen.

```text
call [CLEAR_SCREEN]
```

## PUT\_CHAR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | DL | Character to display on the screen |
| Return | – | – |

Displays the character specified in `DL` and advances the cursor. If `DL` is a control character, the cursor may not advance by one character \(for example, if `DL` represents **backspace**, the cursor will go back by a character\).

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
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">19</td>
      <td style="text-align:left">F2 / CTRL+S</td>
      <td style="text-align:left">DC3</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
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
      <td style="text-align:left"></td>
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
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">27</td>
      <td style="text-align:left">F10 / CTRL+0</td>
      <td style="text-align:left">ESC</td>
      <td style="text-align:left">&#x2013;</td>
      <td style="text-align:left"></td>
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
</table>