# The Monitor

The monitor allows the user to interact with Retroputer before any programs have been loaded. The monitor is provided in ROM, and automatically given control after `RESET` by the bootstrap routine.

The monitor is very simple -- it allows the following functions:

* `LOAD` data from storage into memory
* `SAVE` data in memory to storage
* `LIST` storage contents by name
* `PEEK` display contents from memory
* `POKE` place data into memory
* `ASSEMBLE` code into a machine-language representation and store into memory
* `RUN` run code, starting at given memory location

## LOAD

```
Usage: 
    LOAD "<program name>" [,<starting address>]
```

`LOAD` retrieves data from storage and writes it into memory. The following output occurs when a program loads successfully:

```
> LOAD "hello", 1000

Searching for "hello"...
Loading "hello"...
OK

>
```

Should a program fail to be found, the response will look like this:

```
> LOAD "no program by this name", 1000

Searching for "no program by this name"...
ERROR: Could not find program.

>
```

If, for some reason, a program fails to load correctly, the response looks like this (in this example, the program is too large):

```
> LOAD "program that fails to load", 3F000

Searching for "program that fails to load"...
Loading "program that fails to load"...
ERROR: Load aborted; out of memory.

>
```

## LIST

```
Usage:
    LIST ["pattern match"]
```

Displays a list of programs in storage. If a pattern is provided, only programs matching the pattern are displayed.

## SAVE

```
Usage:
    SAVE "<program name>", <starting address>, <length in bytes>
```

## PEEK

```
Usage:
    PEEK [<data type>] <address> [, <length in bytes>]

Examples:
    PEEK 1000, 100          ; shows 0x100 bytes starting at 0x1000
    PEEK WORDS 1000, 100    ; shows 0x100 words starting at 0x1000
```

## POKE

```
Usage:
    POKE [<data type> ]<address>, [<values>]

Examples:
    POKE 2000, 00, 10, 20, 30, 40, 50, 60, 70
    POKE WORDS 2000, 1234, 2345, 3456, 4567
```

## ASSEMBLE
```
Usage:
    ASSEMBLE [<address>]

Examples:
    ASSEMBLE 1000
    1000: XOR A, A
    1002: ...
```

## RUN

```
Usage:
    RUN [,<starting address>]
```

`RUN`, on its own, will transfer processor control to the code starting at `0x01000`. Should this not be desirable, `RUN` can be provided the starting address as a parameter.

`RUN` always executes the routine using `CALL`, which means that programs should end with `RET` if they wish to transfer control back to the monitor.

