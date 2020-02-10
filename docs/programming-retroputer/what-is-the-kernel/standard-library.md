# Standard Library

The standard library provides routines that are common to many different kinds of programs. Rather than each program supply their own, it makes sense for the kernel to do so in order to reduce memory consumption by duplication.

## I16-TO-STR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | D, X | PTR to buffer for converted number |
|  | C | Word to convert to a string \(signed\) |
|  | BH | Padding |
|  | BL | Radix |
| Return | – | – |

Converts the signed word in `C` to a string \(at `[D, X]`\) using the specified radix \(`BL`\) and adding extra zeros to fill out the requested padding \(`BH`\).

The target buffer _must_ have sufficient space to accept the converted number, including space for a `NUL` terminator and the sign of the number.

| Radix \(BL\) | Space required |
| :--- | :--- |
| 2 | 18 \(SIGN + 16 + NUL\) |
| 8 | 10 \(SIGN + 8 + NUL\) |
| 10 | 7 \(SIGN + 5 + NUL\) |
| 16 | 6 \(SIGN + 4 + NUL\) |

A negative sign \("-"\) will be rendered as the first character if `C` is negative. Otherwise a space \(" "\) will be used to denote a positive value.

> **Important**
>
> This routine technically permits any value for radix. A radix of zero will result in a processor exception and an infinite loop. A radix of one will also result in an infinite loop. Any other radix will generate a conversion that makes _some_ sort of sense, but once past a radix of 36, characters beyond "Z" will start to be used, resulting in visual gibberish.

```text
d := addrbank(buffer)
x := addrbofs(buffer)
c := 12345
bh := 0
bl := 10
call [U16_TO_STR]       # [D, X] => "12345", 0x00
```

## STRCMP \(TODO\)

## STR-TO-I16 \(TODO\)

## STR-TO-U16 \(TODO\)

## U16-TO-STR

| Type | Register | Notes |
| :--- | :--- | :--- |
| Parameter | D, X | PTR to buffer for converted number |
|  | C | Word to convert to a string \(unsigned\) |
|  | BH | Padding |
|  | BL | Radix |
| Return | – | – |

Converts the unsigned word in `C` to a string \(at `[D, X]`\) using the specified radix \(`BL`\) and adding extra zeros to fill out the requested padding \(`BH`\).

The target buffer _must_ have sufficient space to accept the converted number, including space for a `NUL` terminator.

| Radix \(BL\) | Space required |
| :--- | :--- |
| 2 | 17 \(16 + NUL\) |
| 8 | 9 \(8 + NUL\) |
| 10 | 6 \(5 + NUL\) |
| 16 | 5 \(4 + NUL\) |

> **Important**
>
> This routine technically permits any value for radix. A radix of zero will result in a processor exception and an infinite loop. A radix of one will also result in an infinite loop. Any other radix will generate a conversion that makes _some_ sort of sense, but once past a radix of 36, characters beyond "Z" will start to be used, resulting in visual gibberish.

```text
d := addrbank(buffer)
x := addrbofs(buffer)
c := 12345
bh := 0
bl := 10
call [U16_TO_STR]       # [D, X] => "12345", 0x00
```

## UPPERCASE-IN-PLACE \(TODO\)



