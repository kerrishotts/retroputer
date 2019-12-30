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



