# Tokens

The following tokens are used in Retroputer BASIC.

Token | Keyword, Operator, or Meaning 
------|-------------------------------
`0x00`| End of line 
`0x80`| `ABS`
`0x81`| `AND`
`0x82`| `ASC`
`0x83`| `ATN`
`0x84`| `AT`
`0x85`| `CALL`
`0x86`| `CATALOG`
`0x87`| `CHR$`
`0x88`| `CLS`
`0x89`| `CLOSE`
`0x8A`| `CONTINUE`
`0x8B`| `COS`
`0x8C`| `DATA`
`0x8D`| `DEFFN`
`0x8E`| `DEFSUB`
`0x8F`| `DIM`
`0x90`| `DO` 
`0x91`| `ELSEIF`
`0x92`| `ELSE`
`0x93`| `ENDSUB`
`0x94`| `ENDFN`
`0x95`| `ENDIF`
`0x96`| `END`
`0x97`| `EXP`
`0x98`| `FOR`
`0x99`| `GETKEY$`
`0x9A`| `GOSUB`
`0x9B`| `GOTO`
`0x9C`| `HEX$`
`0x9D`| `HOME`
`0x9E`| `IF`
`0x9F`| `INPUT`
`0xA0`| `INT`
`0xA1`| `IN` 
`0xA2`| `LEFT$`
`0xA3`| `LEN`
`0xDF`| `LET`
`0xA4`| `LIST`
`0xA5`| `LOAD`
`0xA6`| `LOG`
`0xA7`| `LOOP`
`0xDD`| `LOWER$`
`0xA8`| `MID$`
`0xA9`| `NEW`
`0xAA`| `NEXT`
`0xAB`| `NOT`
`0xAC`| `ON`  
`0xAD`| `OPEN`
`0xAE`| `OR`  
`0xAF`| `OUT`  
`0xB0`| `PEEK`
`0xB1`| `POKE` 
`0xB2`| `PRINT`, `?`
`0xB3`| `READ`
`0xB4`| `REM`, `'`
`0xB5`| `RETURN`
`0xB6`| `RIGHT$`
`0xB7`| `RND`
`0xB8`| `RENAME`
`0xB9`| `REMOVE`
`0xBA`| `RESTORE`
`0xBB`| `RUN`
`0xBC`| `SAVE`
`0xBD`| `SGN`
`0xBE`| `SIN`
`0xBF`| `SPC`
`0xC0`| `SQR` 
`0xC1`| `STEP`
`0xC2`| `STOP`
`0xC3`| `STR$`
`0xC4`| `TAB` 
`0xC5`| `TAN`
`0xC6`| `THEN` 
`0xC7`| `TO` 
`0xC8`| `UNTIL`
`0xDE`| `UPPER$`
`0xC9`| `USR`   
`0xCA`| `VAL`
`0xCB`| `WHILE`
`0xCC`| `+`  
`0xCD`| `-`   
`0xCE`| `*`  
`0xCF`| `/`
`0xD0`| `%`
`0xD1`| `^`
`0xD2`| `<>`
`0xD3`| `<=`, `=<`
`0xD4`| `>=`, `=>`
`0xD5`| `<`
`0xD6`| `>`
`0xD7`| `=`
`0xD8`| `(`
`0xD9`| `)`
`0xDA`| `[`
`0xDB`| `]`
`0xDC`| `:`
`0xE0`| `,`
`0xE1`| `;`
`0xE2`| Reserved
`0xE3`| Reserved
`0xE4`| Reserved
`0xE5`| Reserved
`0xE6`| Reserved
`0xE7`| Reserved
`0xE8`| Reserved
`0xE9`| Reserved
`0xEA`| Reserved
`0xEB`| Reserved
`0xEC`| Reserved
`0xED`| Reserved
`0xEE`| Reserved
`0xEF`| Reserved
`0xF0`| Reserved
`0xF1`| Reserved
`0xF2`| Reserved
`0xF3`| Reserved
`0xF4`| Reserved
`0xF5`| Reserved
`0xF6`| Reserved
`0xF7`| Reserved
`0xF8`| Reserved
`0xF9`| Floating Point
`0xFA`| Variable
`0xFB`| Code String
`0xFC`| String
`0xFD`| Long Word
`0xFE`| Word
`0xFF`| Byte

## Functions

The following function names are reserved:

Function | Signature          | Result
---------|--------------------|----------
`ABS`    | `number`           | Absolute value of number
`ASC`    | `$`                | RetSCII value of the first character in string
`ATN`    | `number`           | Arctangent
`CALL`   | `fn, ...params`    | Call a function
`CHR$`   | `number`           | Character corresponding to the number
`COS`    | `number`           | Cosine
`EXP`    | `number`           | Exponential
`GETKEY$`| N/A                | Character of last key press
`HEX$`   | `number`           | String representation of number in hexadecimal
`INT`    | `number`           | Integer portion of the number
`IN`     | `port:number`      | Returns the data on the given port (0x00-0xFF)
`LEFT$`  | `$, length:number` | Returns the first number of characters in a string
`LEN`    | `$`                | Returns the length of the string
`LOG`    | `number`           | Logarithm
`LOWER$` | `$`                | Lowercase version of string
`MID$`   | `$, s:#, l:#`      | Returns portion of string at `s` for `l` chars
`PEEK`   | `bank:#, addr:#`   | Returns memory at given bank and address
`RIGHT$` | `$, length:number` | Returns right portion of string
`RND`    | `number`           | Returns next random number within range of #
`SGN`    | `number`           | Returns -1 if number is negative; 1 if postive; 0 if zero
`SIN`    | `number`           | Sine
`SPC`    | `number`           | Move cursor right by a given number of spaces
`SQR`    | `number`           | Square root
`STR$`   | `number`           | String representation of the given number
`TAB`    | `number`           | Move cursor right by given number of tabs
`TAN`    | `number`           | Tangent
`USR`    | `a:#, ...params`   | Call machine language at address
`VAL`    | `$`                | Number represented by the string

## Operators

The following operators are reserved:

Operator | Precedence | Result
---------|------------|----------------
`AND`    | 0x06       | Bitwise AND
`NOT`    | 0x11       | Bitwise NOT
`OR`     | 0x05       | Bitwise OR
`+`      | 0x0E       | Addition
`-`      | 0x0E       | Subtraction
`*`      | 0x0F       | Multiply
`/`      | 0x0F       | Divide
`%`      | 0x0F       | Modulo
`^`      | 0x10       | Power
`<>`     | 0x0B       | 1 if Unequal; else 0
`<=`     | 0x0C       | 1 if lhs is less than or equal to rhs; else 0
`>=`     | 0x0C       | 1 if lhs is greater than or equal to rhs; else 0
`<`      | 0x0C       | 1 if lhs is less than rhs; else 0
`>`      | 0x0C       | 1 if lhs is greater than rhs; else 0
`=`      | 0x0B       | 1 if equal; else 0
`(...)`  | 0x15       | Array index, Parameter list
`[...]`  | 0x14       | Array index? (@todo)
`,`      | 0x01       | Separator

## Keywords

The following keywords are reserved:

Keyword     | Signature        | Result
------------|------------------|---------
`AT`        | `x:#, y:#`       | Position cursor at given position. Valid only w/ `PRINT` and `INPUT`
`CALL`      | `sub, ...params` | Call a subroutine
`CATALOG`   |                  | Display catalog of BASIC programs on storage
`CLS`       |                  | Clear screen
`CLOSE`     | `channel:#`      | Close given channel
`CONTINUE`  |                  | Continue program execution where it left off
`DATA`      | `...values`      | Define data values
`DEFFN`     | `name (params)`  | Define a function; return type is determined from the sigil
`DEFSUB`    | `name (params)`  | Define a subroutine
`DIM`       | `name(size)`     | Declares an array of specified size and type
`DO`        | Block            | Executes a block in a loop
`ELSEIF`    | expr Block       | Evalutes expression and executes Block if it is 1
`ELSE`      | Block            | Executes Block if previous IF was false
`ENDSUB`    |                  | Ends a subroutine
`ENDFN`     |                  | Ends a function
`ENDIF`     |                  | Ends a multi-line `IF`
`END`       |                  | Stops program execution
`FOR`       |                  | Starts a `FOR` loop
`GOSUB`     | `number`         | Calls a subroutine at the line number
`GOTO`      | `number`         | Jumps to the line number
`HOME`      |                  | Sets cursor to top left position
`IF`        | expr Block       | Evaluates expression and if 1, evaluates the then bock
`INPUT`     | `...$|name|,|;`  | Gets data from the user
`LET`       | `name=expr`      | Assigns result of expression to variable
`LIST`      | `[s:#[,f:#]]`    | Lists a program, optionally with a range
`LOAD`      | `$`              | Loads a program with the given name
`LOOP`      |                  | Repeats inverted `UNTIL`|`WHILE`
`NEW`       |                  | Resets BASIC, erasing the current program
`NEXT`      | `[name]`         | Returns to the nearest `FOR`
`ON`        |`# GOTO|GOSUB...#`| Jumps or branches based on result of expression
`OPEN`      | `c:#, $`         | Opens a channel with name
`OUT`       | `port:#, #`      | Outputs a value to the given port
`POKE`      | `b:#, a:#, #`    | Writes a value to the given bank/address
`PRINT`,`?` |                  | Prints data
`READ`      | `...names`       | Reads data into variables
`REM`       |                  | Comment
`RETURN`    |                  | Returns from a subroutine. In a function, can return a value
`RENAME`    | `$ TO $`         | Renames a file
`REMOVE`    | `$`              | Removes a file
`RESTORE`   | `[number]`       | Restores DATA pointer to start (or line number)
`RUN`       | `[number]`       | Starts execution at start (or line number)
`SAVE`      | `$`              | Saves program to file
`STEP`      | `number`         | Controls increment/decrement in `FOR`
`STOP`      |                  | Stops execution and displays a `STOPPED` error.
`THEN`      | Block            | Executes block if `IF` expression was 1
`TO`        |                  | Used in `FOR` and `RENAME`
`UNTIL`     | expr             | Repeats `DO` until the expression is 1
`WHILE`     | expr             | Repeats `DO` while the expression is 1