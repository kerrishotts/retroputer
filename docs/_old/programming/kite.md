# The Kite Programming Language

**Kite** is a C-like language that is designed to be simple to use and understand, while still also being suitable for systems-level programming. It is a procedural language that uses statement delimiters (semicolons), and is not sensitive to whitespace.

## Hello World

```
const char[12] hello = "Hello, world";  # define hello as "Hello, World"
char[1000] SCREEN_MEMORY @ 0x30000;     # location of screen memory

char ch;                                # variable for current character
byte idx;                               # variable for looping
for idx = 0 to 11 {                     # repeat 12 times
    ch = hello[idx];                    # get the nth char
    SCREEN_MEMORY[idx] = ch;            # store it to screen memory
}
return;                                 # done !
```

## Types

**Kite** has the following types:

Type                | Description            | Range
--------------------|------------------------|----------------------
`byte`              | unsigned byte          | 0 .. 255
`signed byte`       | signed byte            | -128 .. 127
`word`              | 16-bit unsigned word   | 0 .. 65535
`signed word`       | 16-bit signed word     | -32768 .. 32767

## Variable Declaration

In **Kite** all variables must be declared before they can be used. Some declaration forms will also accept constant expressions as default values.

> **Note:**
>
> Variables defined _globally_ reside in the global heap (0x34000 and above). Any variables
> defined locally will reside on the stack (growing down from BP). Locally defined variables
> do not allow default values to be set.

```
word fn foo() {
    word bar;                           # bar is a word-sized (16-bit) variable at BP+-2
    bar = 10;                           # local variables do not accept default values, so
                                        # assignment has to happen separately.
    signed byte oof;                    # variables can be declared anywhere -- they can't
                                        # be _used_ until they are declared, though.
                                        # also, bytes will always take up 16 bits on the stack
    oof = bar + 30;                     # assignment is like you would expect
    byte backgroundColor @ 0x1FA0B = 15;# backgroundColor is at memory location 1FA0B; default to 15
    return bar;                         # returns are placed at BP+6
}

word bar;                               # global variables are reserved in the global heap
word foo = 3 + 10 * 35;                 # ... and can be set to a constant expression (353)
byte backgroundColor @ 0x1FA0B = 15;    # globals can be placed at specific memory locations as well
                                        # ... reserving no additional heap space


```



## Examples

```
byte borderColor @ 0x1FA04;
word count;
while ( count < 10 ) {
    count = count + 1;
    borderColor = borderColor + count;
}
```