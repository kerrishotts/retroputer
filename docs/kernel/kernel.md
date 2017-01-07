# KERNEL Reference

The KERNEL provides the computer with basic input/output handling, communication with external devices, and provides the initial operating environment and programming language. It is stored in 16KB of read-only memory \(ROM\) and cannot be changed by running programs. It also has access to a 1KB of scratch area which stores temporary and permanent variables needed by the KERNEL in order to operate. This scratch area can be manipulated by running programs, but doing so is not suggested unless you know what you're doing as doing so can result in a crash.

The KERNEL is mostly a collection of variables and callable subroutines. Your program can call a KERNEL routine by setting certain registers and executing a specific software trap. When the KERNEL routine finishes, control is returned to your program along with any results the routine needs to return. The KERNEL also has various routines that run on a regular basis in order to perform basic housekeeping routines – such as blinking the cursor.

The KERNEL reserves traps 0x80–0xBF and 0xF0–0xFF. The latter sixteen are for hardware events \(for example, the reset button being pressed\), while the first sixty-four traps provide entry into the KERNEL. Their vectors are initially stored in ROM, but copied from ROM to the trap vectors in RAM by the RESET trap.

## KERNEL Variables

The following variables are used by the KERNEL. For each variable, the address location and size is specified, as well as the name and description. Variable space starts at 0x0B000.

| Name | Location | Size | Description |
| :--- | :--- | :--- | :--- |
| cursor-enable | | 1 | Determines if the cursor should be visible. |
| cursor-blink-enable | | 1 | Determines if the cursor should blink, and which blink stage the cursor is in \(on/off\). |
| cursor-blink-reset | | 1 | Indicates the cursor blink reset value; defaults to 0x30. A lower value will cause a faster blink rate, while a higher value slows the cursor blinking down. |
| cursor-pos | | 1 | The address at which the cursor is located. |
| | | | |

# KERNEL Subroutines

The following subroutines are exposed to program. For each routine, the trap and any associated "in" and "out" registers are provided, as well as the name and description.

For example, to wait until a keyboard key is pressed and write it to the screen when it is pressed

```
    LDI A, 0x0000
    MOV X, A
    MOV Y, A
    TRAP 0x80           ; set cursor to 0, 0
    TRAP 0xD1           ; key pressed is in AL
    TRAP 0x9C           ; write key (in AL) at cursor
```

|    Name             | Addr |Trap|    Description    
|:-------------------:|:----:|:--:|:-------------------------------------------
| RESET               | FF00 | 00 | Resets the machine (warm)
| ...                 |      | .. | 
| CURSOR-SET-POS      |      | 80 | Sets the cursor position to X, Y
| CURSOR-GET-POS      |      | 81 | Returns the cursor position in X and Y
| CURSOR-SET-PAGE     |      | 82 | Sets the current cursor page to X
| CURSOR-GET-PAGE     |      | 83 | Returns the current cursor page in X
| CURSOR-SHOW         |      | 84 | Shows the cursor
| CURSOR-HIDE         |      | 85 | Hides the cursor
| CURSOR-BLINK-SPEED  |      | 86 | Determines cursor blink speed; # of frames is in X; X = 0 means no blinking
| CURSOR-RENDER       |      | 87 | Render the cursor (updates blink, etc.)
| CURSOR-RESET-BLINK  |      | 88 | Resets cursor blink value (e.g., after keypress)
| CURSOR-ADVANCE      |      | 89 | Advances the cursor by a character, wrapping and scrolling if necessary
| ...                 |      | .. | 
| SET-PAGE-LAYER      |      | 90 | Sets selected page (X)'s layer to Y
| GET-PAGE-LAYER      |      | 91 | Returns page (X) layer in Y
| SCROLL-PAGE-UP      |      | 92 | Scrolls the desired page (X) up by Y lines
| SCROLL-PAGE-DOWN    |      | 93 | Scrolls the desired page (X) down by Y lines
| CLEAR-PAGE          |      | 94 | Clears the desired page (X)
| FILL-PAGE           |      | 95 | Fills the desired page (X) with YL
| SET-PAGE-FGCOLOR    |      | 96 | Sets selected page's (X) foreground color
| SET-PAGE-BGCOLOR    |      | 97 | Sets selected page's (X) background color
| SET-PAGE-TILESET    |      | 98 | Sets selected page's (X) tile setting
| SET-BORDER-COLOR    |      | 99 | Sets the border color      
| SET-BORDER-SIZE     |      | 9A | Sets the border size (X = width, Y = height)
| SET-GRAPHICS-LAYER  |      | 9B | Sets the graphics layer to Y
| PUT-CHAR            |      | 9C | Writes a character (AL) at the current cursor position
| PUT-STRING          |      | 9D | Writes a pascal string (DB:D) at the current cursor position
| ...                 |      | .. | 
| CVT-INT-TO-STR      |      | A0 | Converts an int in A to a string at DB:D
| CVT-STR-TO-INT      |      | A1 | Converts a string at DB:D into an integer (A), setting E if not a number
| ...                 |      | .. | 
| EDITOR-ENTER        |      | B0 | Enter the program editor
| EDITOR-EXIT         |      | B1 | Exit the program editor 
| EDITOR-INIT         |      |    | Initializes the program editor
| ...                 |      | .. | 
| CHANNEL-OPEN        |      | C0 | Opens channel (X) with options (Y, like Read, write, etc)
| CHANNEL-CLOSE       |      | C1 | Closes channel (X)
| CHANNEL-COMMAND     |      | C2 | Sends command (Y) to channel (X)
| CHANNEL-READ-BYTE   |      | C3 | Reads a single byte (AL) from channel (X) 
| CHANNEL-WRITE-BYTE  |      | C4 | Writes a single byte (AL) to channel (X)
| CHANNEL-READ        |      | C5 | Reads a string (DB:D) with C characters from channel (X)
| CHANNEL-WRITE       |      | C6 | Writes a pascal string (DB:D) to channel (X)
| CHANNEL-READ-BLOCK  |      | C7 | Reads a block (DB:D) with C bytes from channel (X)
| CHANNEL-WRITE-BLOCK |      | C8 | Writes a block (DB:D) with C bytes to channel (X)
| ...                 |      | .. | 
| KBD-GET-KEY         |      | D0 | Returns the key pressed in A; E is set if no key has been pressed
| KBD-WAIT-FOR-KEY    |      | D1 | Waits for a key press and returns it in A (efficient loop)
| ...                 |      | .. | 
| FRAME               |      | F0 | Called after a screen frame is drawn
| SECOND              |      | F1 | Called once per SECOND
| MINUTE              |      | F2 | Called once per MINUTE
| HOUR                |      | F3 | Called once per DAY
| ...                 |      | .. | 
| INIT-1125           |      | FD | Initializes the 1125 sound generator
| INIT-4025           |      | FE | Initializes the 4025 video generator
| INIT-RAM            |      | FF | Initializes memory, devices, etc.


