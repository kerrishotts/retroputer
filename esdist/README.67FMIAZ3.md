# Statement Reference

* [DEF](./def.md)
* [NEW](./new.md)
* [PRINT](./print.md)

## CALL subroutine [, params] {@todo}

Calls a previously defined subroutine and provides additional parameters if specified.

```basic
10 DEFSUB SayHello: PRINT "Hello, World"
20 CALL SayHello    ' prints "Hello, World"
```

### Errors:

* ?TYPE MISMATCH ERROR: The address must be an integer
* ?INVALID QUANTITY ERROR: The address must be an integer

## CATALOG [query$] {@todo}

Displays a catalog of the files on persistent storage. `query$` may be used to filter the results using wildcards.

```basic
CATALOG             ' List all files on storage
CATALOG "*.bas"     ' List all BASIC files on storage
```

### Errors:
* ?TYPE MISMATCH ERROR: If specified, the query must be a string.

## CLS

Clears the screen using the currently configured foreground and background colors.

```basic
CLS
```

## CLOSE channel {@todo}

Closes a channel previously opened with `OPEN`. This should always be done before exiting a program in order to ensure that files are not left open and susceptible to corruption.

```basic
CLOSE 1
```

### Errors:
* ?INVALID QUANTITY ERROR: the channel was not previously opened.
* ?TYPE MISMATCH ERROR: the channel must be an integer.

## CONT[INUE] {@todo}

Continues BASIC execution where it left off (either from an `END` or `STOP` command or from the last break).

```basic
CONT
```

### Errors:
* ?CAN'T CONTINUE ERROR: The program can no longer be resumed.

## COLOR foreground [, background [, border]] {@todo}

Sets the colors used by Retroputer BASIC. 

```basic
COLOR 23             ' set foreground text color to white
COLOR 23,24          ' white-on-black
COLOR 23,24,24       ' white-on-black with a black border
```

### Errors:
* ?TYPE MISMATCH ERROR: The colors must be integers.

## COLOR SOURCE bank, address {@todo}

Sets the source of the color palette. The default value is bank 7, address 0x4000.

```basic
COLOR SOURCE 7, 0x4000       ' use default palette
```

### Errors:
* ?TYPE MISMATCH ERROR: The bank and address must be integers.

## DATA item[, ...items] {@todo}

Specifies data items that can be later loaded into variables using `READ`. Each item must be separated by commas. Strings must be enclosed with quotes.

```basic
5 DIM A$(10)
10 FOR K = 1 TO 10: READ A$: NEXT
20 PRINT A$(RND(10))
30 END
100 DATA "THIS", "PRINTS", "RANDOM", "WORDS", "TO"
110 DATA "THE", "SCREEN", "FROM", "THIS", "DATA"
```

### Errors:
* ?SYNTAX ERROR: Make sure strings are enclosed in quotes and that commas are used to separate items.

## DEFFN [name] (...params) [= expression] {@todo}

Defines a function for later use when evaluating expressions. Functions names follow the same rules as other variable names. A function's return type is indicated by its type sigil.

Any parameters specified are made to be local to the function (that is, changing their value will not affect variables of the same name in the outer scope). Any variables declared with `DIM` are considered to be local to the function as well.

If an expression is included on the same line, the function definition is assumed to be a single line definition. In this case, `ENDFN` is not required (and is a syntax error if encountered). If you need a more complicated function, you can omit the expression and then use as many lines as long as you end with an `ENDFN` on its own line.

```basic
10 DEFFN square(x) = x*2
20 DEFFN last$(str$) = right(str$,1)
30 DEFFN reverse$(str$)
40   DIM i, temp$
50   FOR i = 0 TO LEN(str$) - 1: temp$ = temp$ + MID$(str$, i, 1): NEXT
60   RETURN temp$
70 ENDFN
80 PRINT CALL(square, 4)           ' 16
90 PRINT CALL(last$, "Hello")      ' "0"
100 PRINT CALL(reverse$, "Hello")  ' "olleH"
```

## DEFSUB [name] (...params) [: statement] {@todo}

Defines a subroutine for later use. Subroutine names follow the same rules as other variable names. Functions and subroutines share the same namespace, and as such, you cannot have a function and subroutine with the same name.

Any parameters specified are made to be local to the subroutine. Any variables declared with `DIM` are also considered to be local to the subroutine.

If `DEFSUB` is followed by additional statements on the same line, the defintion is assumed to be a single-line subroutine. In this case `ENDSUB` is not required (and is considered to be a syntax error if it is encountered). If you don't specify additional statements, the subroutine is a multi-line definition and `ENDSUB` is required to terminate the definition.

```basic
10 DEFSUB printship(x, y): PRINT AT y, x; "X";
20 DEFSUB loadSettings()
30   OPEN 1, 9, "settings.dat" FOR INPUT
40   INPUT FROM 1, A$     ' A$ here is global
50   CLOSE 1
60 ENDSUB
70 CALL printship 10,15
80 CALL loadSettings
```

## DIM varName[(size)][, ...vars] {@todo}

Allocates space for the variable. For global scalar variables, these are already pre-allocated for you -- that is, you don't need to execute `DIM A` before using the variable `A`. Array variables, however, aren't pre-allocated, and must be dimensioned before use. 

When encountered inside a function or subroutine definition, `DIM` will create a new _local_ variable of the given name, shadowing the previous definition. Upon exit of the routine, the previous value will be restored.

When declaring an array, be careful not to exceed the available heap space, or you'll generate an error.

> *NOTE*
>
> Unlike most BASICs, arrays and strings are indexed from zero. `DIM A(10)`
> specifies the number of items, not the maximum index. As such `A(10)` is
> an invalid index.

```basic
10 DIM A$(10)           ' space for 10 strings (0-9)
```

> *NOTE*
>
> You an re-dimension an array, but it will lose all of its prior contents.

### Errors
* ?OUT OF MEMORY ERROR: Not enough memory remains to allocate an array of the requested size (or, there's no more memory to shadow a variable)

## DO [WHILE expression | UNTIL expression] {@todo}

Executes a block of statements while (or until) the expression is true. If no expression is provided an infinite loop is started. Note that the `WHILE` or `UNTIL` portion may not appear until the end of the loop.

If a clause is provided after `DO`, it will be evaluated before the loop is entered. This is useful if you have already processed some data and only want to process more if conditions are warrented.

All `DO` blocks must be terminated with a corresponding `LOOP` command.

```basic
10 A = 0
20 DO WHILE A < 10
30   PRINT A;
40   A = A + 1
50 LOOP
```

## DRAW [BOX|CIRCLE|LINE] x1, y1 TO x2, y2 [COLOR color] [FILL color]{@todo}

Draws a shape from (x1, y1) to (x2, y2) on the target layer. The edge of the box will be colored with the current color (or the specified color). If `FILL` is provided, the current fill color (or specified fill color) is used.

> *NOTE*
>
> Lines cannot be filled.

Circles allow the angle to be specified using `FROM angle TO angle`.

```basic
10 LAYER 2 ON MODE 0 SOURCE 6, 0
20 DRAW LAYER 2
29 ' Draw a box rimmed with white, and filled with black
30 DRAW BOX 10, 10 TO 50, 50 COLOR 23 FILL 24
40 DRAW CIRCLE 60, 10 TO 100, 50 COLOR 23 FROM 0 TO 90
```

## DRAW [POINT|FILL] x1, y1 [COLOR color] {@todo}

Draws a pixel (or starts a fill operation) at the specified point using the current (or specified) color.

```basic
40 DRAW POINT 50, 50 COLOR 17 ' put a yellow dot at (50,50)
```

## DRAW COLOR color {@todo}

Specifies the current drawing color.

## DRAW FILL COLOR color {@todo}

Specifies the current fill color

## DRAW LAYER layer {@todo}

Indicates the layer that drawing operations should target.

### Errors

* ?INVALID QUANTITY ERROR: A valid layer (0-3) must be specified.
* ?TYPE MISMATCH: layers must be numbers

## ELSE {@todo}

Used in multi-statement `IF...THEN...ELSE` statements. See `IF`.

## ENDSUB {@todo}

Used to terminate a multi-line subroutine definition.

## ENDFN {@todo}

Used to terminate a multi-line function definition.

## ENDIF {@todo}

Used to terminate a multi-line `IF...THEN...ELSE` block.

## END {@todo}

Stops program execution immediately.


