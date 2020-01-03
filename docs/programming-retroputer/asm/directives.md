# Directives

Directives tell the assembler about important information such as data, procedure definitions, and more.

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

## .import

Imports a file into the current scope.

```text
.import "another-file.asm"
```

#### Grammar

```text
.import <path to file>
```

## .const

Defines an identifier with a constant value. Once defined, the constant cannot be redefined.

> #### NOTE
>
> Constants are inlined into any assembly instructions that use them. As such, they don't consume additional memory space beyond that which the instruction itself uses.

```text
.const MAX_PLAYERS 2
```

> #### IMPORTANT
>
> A constant must be defined within a `namespace` or `segment`.

#### Grammar

```text
.const <identifier> <expression>
```

## .word

Specifies a word value to be placed at the current location in the segment. Typically used in data segments to define the initial values for variables.

```text
.segment players 0x03000 {
    count: .word 0x0002
}
```



