# BASIC Tokenization

Like most BASICs of the 8 and 16-bit microcomputer era, lines of code are
tokenized before stored in memory. For computers with a small mount of memory
this was useful because it often enabled significant space savings. For
computers with a bit more memory (like Retroputer), some space savings can be
traded for performance. This can be seen in the tokenization of variables to
pre-compute variable indexes as well as the tokenization of constants to avoid
converting a string representation into a number at runtime.

There are several forms of code transformation and tokenization used in 
Retroputer BASIC:

1. Conversion to uppercase
2. Removal of extra SPACEs
3. Numbers in byte range are converted to BYTE tokens
4. Numbers in word range are converted to WORD tokens
5. Floating point numbers are converted to REAL tokens
6. Strings are stored as NUL-terminated character arrays, without any QUOTEs
7. Keywords are stored as a single byte with bit 7 set (0x80 and higher)
8. Operators are also treated the same as keywords
9. Variables have their index pre-calculated, their type condensed into the
   index's high two bits. The length of the variable name is stored so that
   we can quickly jump past during execution. Variable names are NOT stored
   with NUL terminators.
10. End-of-line indicator

## Conversion to uppercase

The first step of the tokenization process is to convert all non-string
characters to uppercase. This simplifies keyword lookups, and also ensures that
a variable name is easier to index (no need to account for lowercase names).

Because strings must be accounted for, it's during this phase that quotes are
checked to ensure that all opening quotes have an ending quote. If a quote is
found to be missing, BASIC will raise a "EXPECTED A QUOTE" error. Should this
occur when entering a line into program storage, _the line will not be stored_.

## Removal of extra SPACEs

Whitespace in BASIC is not significant, and so any unnecessary spaces are
removed. This is to save on memory, but also to increase performance speed
during runtime (the more SPACEs must be consumed, the slower code would run).

> Note: Removal of extra spaces has the unfortunate side-effect of losing any
> indentation of code. You can use `:` statement separators to keep indentation
> at the cost of execution speed.

BASIC will match keywords and other tokens greedily, and so SPACEs are not
absolutely required. As such, SPACEs can be omitted in many places to save even
more memory at the expense of readibility.

> Note: SPACEs are not removed from string literals.

## Tokenization of Numbers

In many early versions of BASIC, numers were stored as strings, requiring
parsing every time they were encountered. This meant that variables were often
far faster than constants. While magic numbers should not be encouraged, there
are often cases where storing `0`, `1`, and other sentinel values make sense.

Retroputer BASIC tries to conserve as much memory as possible when tokenizing
numbers. If a number can be stored as a byte, it will be, for example.

Range        | Token | Storage
-------------|-------|---------
0x00-0xFF    | 0xFF  | Byte
0x100-0xFFFF | 0xFE  | Word
32-bit value | 0xFC  | Long Word (@todo)
Otherwise... | 0xF9  | 64-bit floating point (@todo)

This means that for small digits, the tokenized storage required will be more
than the single digit would require. For example, `0` takes two bytes to store
(`0xFF 0x00`). However `255` requires one less byte (`0xFF 0xFF`). Floating
point values are also sometimes subject to this as well (where `1.5` takes more
space when tokenized).

The storage tradeoff is considered worthwhile, however, because it grants a
large performance improvement during runtime. Instead of having to convert
numbers each time they are encountered, they are encountered in a form that can
be immediately used by the CPU. This improves performance considerably,
especially for larger numbers and floating-point numbers.

## Tokenization of String literals

String literals are stored in a format that makes them easy to print and pass
to other functions in the standard library (like `STRCMP`). These are stored
as NUL-terminated character arrays, without any surrounding QUOTEs. When
LISTed, BASIC will wrap strings with QUOTEs to reflect the original intent.

> NOTE: when scanning, string literals must be scanned character by character.
> This means that long strings take more time to parse during runtime.

String literals are stored with token `0xFB` (Code String). This is used to
signify to the runtime environment that, absent any string manipulation, the
interpreter can use the string directly from code, thus saving space on the
data heap.

## Tokenization of Keywords and Operators

All keywords and operators are condensed into a single byte token with bit 7
set. This means that keywords and operator tokens are easily identified
because they will be 0x80 or higher. This makes it easy to construct vector
tables to speed up execution during runtime.

Retroputer BASIC, like many BASICs of the era, will match keywords that exist
at the start of a variable name. (Some BASICs would match even in the middle of
a variable name.) This means that it's impossible to have a variable named
`TOTAL` because Retroputer will see `TO` as a keyword. However, `SCORE` and
`GOAT` are valid names, even though because they _contain_ keywords (`OR` and
`AT`, respectively) they don't _start_ with a keyword.

Variable names in Retroputer BASIC are only significant to two characters, and
variables can only be of the form `[A-Z][A-Z0-9]*`. The first two chracters are
used to calculate the variable index into variable memory (starting at 
`0x02000`). This means that every variable reference takes up four more bytes
than the name itself. This takes up a lot of space, but makes it trivial for
BASIC to look up a variable quickly during runtime.

The format when stored looks like this:

0x00 | 0x01              | 0x02      | 0x03   | 0x04   | 0x05...
-----|-------------------|-----------|--------|--------|-----------
0xFA | high index & type | low index | length | char 1 | char 2...

The type of a variable is stored in the top three bits of the index as follows:

Bits | Type                            | Sigil
-----|---------------------------------|-------
`000`| Integer                         | N/A
`001`| String                          | `$`
`010`| Floating Point number           | `#`
`011`| FN or SUB                       | N/A
`100`| Array of Integers               | `()`
`101`| Array of Strings                | `$()`
`110`| Array of Floating Point numbers | `#()`
`111`| Unused                          | N/A

This information enables BASIC to quickly calculate the correct base in storage
to either lookup or store a viarable value during runtime.

When LISTed, the corresponding sigil is rendered to indicate the originally
indicated type.

## End-of-line

A NUL byte is added to the end of each tokenized line. This is used to quickly
identify during runtime when the end of the line has been reached. This is a
different token from the "End of Statement" token, which has a slightly
different semantic meaning than does the end of the line.

