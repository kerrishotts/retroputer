# Symbols

There are three types of symbols recognized by the assembler:

* Labels
* Defined values
* Variables

## Labels

Labels are references to addresses within code segments. Labels can be referenced by `BR` and `CALL` instructions, and their relative offset is automatically determined.

Labels can be defined in two ways:

```asm
label:
another-label>
```

Labels can consist only of alphanumeric characters, dashes, or underscores. 

To referencing a label, the `:` or `>` type sentinel is prepended to the label name, like so:

```asm
loop:
    BR :loop
```

## Defined values

Defined values are text replacements. They are often used for constants, although that isn't their only possible use.

Defined values are defined by using the `.def` directive, like so:

```asm
.def seconds-in-a-minute 60
```

Defined value symbols can consist only of alphanumeric characters, dashes, or underscores.

To reference a defined value, use the `#` type sentinel:

```asm
.def seconds-in-a-minute 60

LDI AL, #seconds-in-a-minute
```

Although these are often used as constants, defined values can in fact be used anywhere. For example:

```asm
.def LOAD-FROM-SB LDS

#LOAD-FROM-SB A, [0x1000]    # translates to LDS A, [0x1000]
```

## Variables

Variable symbols refer to an address within a segment. Variables are defined using the `.var` directive, and generally used with data definition directives, like so:

```asm
.var score
    .dw 0x0000
```

Variable names can consist only of alphanumeric characters, dashes, or underscores.

When referencing variable names, use the `&` type sentinel (read "address of"), as such:

```asm
.data 0x02000
.var score
    .dw 0x0000

.code 0x01000
    LDI AL, bank(&score)
    MOV SB, AL
    LDS A, [addr(&score)]
```

