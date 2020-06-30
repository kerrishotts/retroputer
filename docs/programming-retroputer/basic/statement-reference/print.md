# PRINT

Prints content at the cursor location on the screen \(or at a specified screen location\), or sends content to an open channel.

Forms:

```text
PRINT [expression [,|; expression ...][,|;]
PRINT TO device ...
? ...
```

## Printing to the current cursor position

`PRINT`, on its own, will print to the screen at the current cursor position and advance the cursor by the length of the data to display.

Without any parameters, `PRINT` will simply move the cursor to the start of the next line.

`PRINT` can be used to display any number of expressions one after the other. Each expression must be separated by either a semicolon or a comma. A comma will advance the cursor to the next tab position on the line, whereas a semicolon will print items without intervening space.

A printable item can be a string, a number, a variable, or an expression that resolves to any of those types. Strings will print as-is and semicolons won't include any additional spaces between strings. Numbers reserve a space for the negative sign, so positive numbers will appear to have space between them.

```text
PRINT "Hello, world"
Hello, world
READY.
PRINT "1+2="; 1+2
1+2= 3
READY
█
```

`PRINT` will automatically advance to the start of the next line (scrolling the screen if necessary), unless you use a trailing semicolon or comma. If a semicolon is used, the cursor will be left at the end of the printed data, and if a comma is used, the cursor will advance to the next tab position.

## Printing at a specific screen position

`PRINT` makes it easy to print content at an arbitrary location on the screen by using the `AT` modifier before any text you want to print.

```text
PRINT AT 10, 15; "X"
```

`PRINT AT` takes a `row` and a `column`, and positions the cursor there before continuing printing. Both the `row` and `column` are zero-based, so `0, 0` refers to the top left of the screen.

> **Important**
>
> Retroputer BASIC assumes you'll pass a row and column that is actually visible on the screen. It's possible to write to areas outside of the visible screen area by passing large or negative values. This can result in undefined and unexpected behavior.

You can include as many `AT` modifiers as you want:

```
PRINT AT 4, 4; "X"; AT 9, 9; "Z"
```

## Printing with columns

`PRINT` will automatically advance to the next tab stop on a line when you use the `,` separator. You can include multiple commas to advance multiple tabs, but it may be preferrable to use the `TAB()` function instead.

```text
PRINT TAB(3); "Hi"
                        Hi
READY.
█
```

If you prefer to use a comma after the `TAB()` function, remember that the comma itself will be interpreted as a single tab, so you will need to reduce the parameter by one:

```
PRINT TAB(2), "Hi"
```

Using commas and `TAB` make it easy to print text in columns. Each column is eight characters wide, and will always be left aligned at the next tab stop. If a value overflows a column, the next available column is used.

```
10 CLS
20 PRINT "Value", "Times 2", "Times 3"
30 A = 0
40 PRINT A, A*2, A*3
50 A = A + 1
60 IF A < 13 THEN GOTO 40
run

Value   Times 2 Times 3
 0       0       0
 1       2       3
 2       4       6
 3       6       9
 4       8       12
 ...
```

## Printing spaces

The `PRINT` command also understands the `SPC()` function. This can be used to insert an arbitrary number of spaces between items, which can be useful for advancing to a position within a line while also clearing the contents of the line.

```text
PRINT SPC(15); "X"
```

As with `TAB`, a semicolon or comma must be used to separate the items. If you use a comma, the cursor will advance to the next available tab stop after the spaces are printed.

> **Important**
>
> It's possible to print a _large_ number of spaces with this command. If you do so, BASIC may appear to hang while it prints out the data. There is no way to interrupt BASIC while it is printing spaces.

## Printing Characters

You can instruct the `PRINT` command to print a character given the Retscii character code. This is useful for characters that aren't easily typed in (or may be impossible to type).

```
PRINT CHR$(65)
A
READY.
█
```

This can be used to print control strings. For example, you can change the color of the printed text to yellow by using `CHR$()`:

```
PRINT CHR$(27);"22";CHR$(18);"Hi!"
```

## Printing a run of characters

It's possible to print a character several times over, similar to the `SPC()` function, but with any character.

```
PRINT CHRS$ 65, 10
AAAAAAAAAAREADY
█
```

> **Note**
>
> Unlike previous examples, `CHRS$` does not immediately cause `PRINT` to advance to the next line when printing is complete.

## Printing to a device (@todo)

In order to print to a device, you can use use `PRINT TO`.

```
OPEN 1,8,"hello.txt" FOR PRINT
PRINT TO 1;"Hello!"
CLOSE 1
```

Depending upon the device and file types, the `AT` modifier may have special significance.

* For random-access files, `AT` moves the file pointer to the specified location. If the provided value is beyond the end of the file, the next output will extend the file to the given size.
* For a printer, `AT` will move the print head to the specified location on the page, adjusting the carriage as necessary. The printer is assumed to be 132 characters wide by 66 lines tall.
* For all other devices, `AT` is ignored.

