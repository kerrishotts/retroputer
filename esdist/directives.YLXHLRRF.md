# Directives

Directives tell the assembler about important information such as data, procedure definitions, and more.

## .byte

Specifies a byte value to be placed at the current location in the segment. Typically used in data segments to define the initial values for byte-sized variables.

```text
.segment players 0x03000 {
    count: .byte 0x0002
}
```

#### Grammar

```text
.byte <value> [, <values>]
```

## .byte\[\]

Specifies a byte array to be placed at the current location in the segment. Typically used in data segments to define the initial values forbyte-sized arrays. Any values not listed will be initialized to zero.

```text
.segment players 0x03000 {
    lives: .byte[2] 3, 3
}
```

#### Grammar

```text
.byte\[<size>\] [<value> [, <values>]]
```

## .const

Defines an identifier with a constant value. Once defined, the constant cannot be redefined.

> **Note**
>
> Constants are inlined into any assembly instructions that use them. As such, they don't consume additional memory space beyond that which the instruction itself uses.

```text
.const MAX_PLAYERS 2
```

> **Important**
>
> A constant must be defined within a `namespace` or `segment`.

#### Grammar

```text
.const <identifier> <expression>
```

## .define \(.macro\)

Defines a macro.

> **Note**
>
> Macros are inlined into any assembly instructions that use them. Be careful not to treat macros like function calls or procedures, since they will _duplicate_ their contents inline.

```text
.define LDPTR(regD, regX, var) {
    ld regD(), addrbank(var())
    ld regX(), addrbofs(var())
}
```

To utilize a macro, it must be _expanded_. This is _similar_ to calling a function or procedure in a higher-level language, except that the contents of the macro are _inlined_ at the place it is used. This means that it is faster than a function or procedure call \(no `call`, no stack management\), but consumes much more memory. Use macros with care!

Expanding a macro is done by using parentheses and supplying an necessary arguments. **Even if a macro expects no arguments, parentheses must be used.**

For example:

```text
.segment data 0x03000 {
    hello: .string "Hello", 0
}

.segment code 0x02000 {
    LDPTR(D, X, data.hello)
    call [PRINT]
}
```

In the above example, the resulting assembly looks like this:

```text
ld d, addrbank(data.hello)
ld x, addrbofs(data.hello)
call [PRINT]
```

#### Grammar

```text
.define <identifier>([<args>]) <expression-or-block>
.macro <identifier>([<args>]) <expression-or-block>
```

## .import

Imports a file into the current scope.

```text
.import "another-file.asm"
```

#### Grammar

```text
.import <path to file>
```

## .namespace

Defines a new namespace with the given name. In order to access any identifiers within the namespace's corresponding block, the references will need to be prefixed with the namespace name itself.

```text
.namespace levels {
    .const NUMBER_OF_LEVELS 20
}

.segment code 0x02000 {
    ld a, levels.NUMBER_OF_LEVELS        # 20
}
```

Namespaces can be nested, and there is no practical limit on the number of namespaces you create.

#### Grammar

```text
.namespace <name> <block>
```

## .segment

Defines a new code or data segment with the given name, starting at the given address. If you need to append to a previously defined segment, you can specify the `.append` directive in addition.

```text
.segment code 0x02000 {
    ld a, data.currentPlayer
}
.segment data 0x03000 {
    currentPlayer: .byte 0x00
}
```

#### Grammar

```text
.segment <name> <address expression> [.append] <block>
```

## .string

Specifies a string to be placed at the current location in the segment. Typically used in data segments to define the initial values for variables.

```text
.segment players 0x03000 {
    hello: .string "Hello", 0
}
```

#### Grammar

```text
.string <value> [, <values>]
```

## .word

Specifies a word value to be placed at the current location in the segment. Typically used in data segments to define the initial values for variables.

```text
.segment players 0x03000 {
    count: .word 0x0002
}
```

#### Grammar

```text
.word <value> [, <values>]
```

## .word\[\]

Specifies a word array to be placed at the current location in the segment. Typically used in data segments to define the initial values for word-sized arrays. Any values not listed will be initialized to zero.

```text
.segment players 0x03000 {
    scores: .word[2] 0x1000, 0x2000
}
```

#### Grammar

```text
.word\[<size>\] [<value> [, <values>]]
```

## 

