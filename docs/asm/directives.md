# Assembler Directives

The 6516 assembler understands several directives, which control where data and code are stored, variable definitions, and more.

## File import (.import)

> .import <file>

When `.import` is encountered, the assembler will import the specified file and assemble it immediately. Symbols defined within the imported file will be available to any other imported files as well as the main file.

## Segment type (.code, .data)

> .(code|data)[+] <starting-address>

The assembler understands two segment types: `.code`, which is used for executable code, and `.data` which is used for data. The directive must be specified with an address, which indicates where the code or data will start. Although code can be placed anywhere, it can only be executed in bank 0 (0x00000 - 0x0FFFF).

Specifying a segment without adding a plus-sign will reset any data or code within the segment. Adding a plus-sign indicates that code or data should be appended to whatever may already be present. This is used most often when importing code or data that should live within the same segment.

## Define value (.def)

> .def <symbol-name> <symbol-value>
> sigil: `#`

Defines a text replacement symbol. Whenever the assembler sees `#<sybmol-name>`, it will replace it with the specified value.

## Variable (.var)

> .var <variable-name>
> sigil: `&`

Defines a variable at the current data or code location. Whenever the assembler sees `&<symbol-name>` the address will be substitued instead.

## Rename register (.rename)

> .rename <new-name> <register>
> sigil: `%`

Allows you to assign a friendly name to a register, without colliding with other symbols. Whenever the assembler sees `@<symbol-name>`, the register assigned to the name will be used instead.

```
    .rename score A
```

## Data directives (.db, .dw, .ds)

> .(db|dw|ds)[[]] <data>

Writes data to the current segment, as follows:

* `.db` writes one or more bytes to the current segment
* `.db[]` allocates the specified number of bytes (the memory is zeroed)
* `.dw` writes one or more words to the current segment
* `.dw[]` allocates the specified number of words (the memory is zeroed)
* `.ds` writes bytes representing a string to the current segment; no length or terminator is provided

A data directive almost always follows a variable declaration.

Examples:

```asm
    .var a-byte
        .db 32
    .var a-word
        .dw 0x4000
    .var a-string
        .ds Hello, world!
    .var multiple-bytes
        .db 01 02 03 04 05
    .var multiple-words
        .db 0x1000 0x2000 0x3000
    .var byte-array
        .db[] 32
    .var word-array
        .dw[] 32
```