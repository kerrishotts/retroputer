# Identifiers

Identifiers can be used to label any address, whether it be for code or for data storage. Identifiers can consist of alphanumeric characters as well as underscores and dashes.

{% hint style="info" %}
An identifier must start with an alphabetic character or an underscore. It may not begin with a digit or a dash.
{% endhint %}

{% hint style="danger" %}
An identifier may _not_ be a reserved word or register.
{% endhint %}

Identifiers are often defined by providing the name of the identifier followed by a colon \(`:`\). For example:

```text
cursor-pos: .word 0x0000
cursor-page: .byte 0x01

    LD A, screen.tile-pages-bot
    LD B, screen.tile-page-offset
    XOR C, C
    LD CL, [cursor-page]
    SUB A, B
loop:
    ADD A, B
    LOOP CL, loop
```

Identifiers are scoped to their nearest parent block. Identifiers within a block do not need additional qualification, but to access identifiers in other blocks, one must qualify the identifier with the scope name. For example:

```text
.segment kdata 0x0B800 .append {
    cursor-pos: .word 0x0000
    cursor-page: .byte 0x01
}

.segment kcode 0x0BC00 .append {
    LD A, [kdata.cursor-pos]
}
```

## Reserved Words

### Registers

Registers can be specified using their alias \(`A`, `B`, `C`, `D`, `X`, `Y`, `SP`, `BP`\). For `A` - `D` and `X` and `Y`, the eight-bit form can also be used \(`AL`, `BL`, `CL`, `DL`, etc\).

The status register and the `PC`, `MM`, `CF` registers cannot be specified directly in any assembly language instruction. This also means that registers 16 - 23 are inaccessible. Only certain commands can work on these registers. `PUSHF`, for example, can push the status register on to the stack. `BR` and `CALL` and `RET` all manipulate the `PC`.

### Flags

Flags can be specified using their names: `N`, `V`, `C`, `Z`, `ID`, `IS`, `EX`, `SS`. Flag names are not reserved for identifiers as it is unambiguous when flags are being used in an instruction.

