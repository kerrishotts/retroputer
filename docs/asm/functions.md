# Functions

The following functions are understood by the assembler:

* bank
* addr
* word
* ord
* chr
* lo
* hi

## bank(), addr(), and word()

The `bank()` function returns the upper two bits of an 18-bit balue. It is used to set the bank registers appropriately prior to loading data from a variable.

The `addr()` and `word()` functions return the lower sixteen bits of an 18-bit value. These are used to reference the appropriate memory address within the desired bank.

Example:

```asm
.data 0x38000

.var score
    .dw 0x1234

.code 0x01000

    XOR A, A
    LDI AL, bank(&score)        ; AL = 0x03
    MOV SB, AL                  ; SB = 0x03
    LDS A, addr(&score)         ; Load word at SB:0x8000 (0x38000) into A
```

## ord() and chr()

> Important: these functions only make sense with the portions of RetSCII that match ASCII.

The `ord()` function returns the ordinal value of the provided character. The `chr()` function returns the character matching the provided ordinal value. 

Example:

```asm
.var the-letter-A
    .db ord(A)

.var the-letter-A-string
    .ds chr(65)
```

## hi() and lo()

The `hi()` function returns the upper eight bits of a sixteen bit word. The `lo()` function returns the lower eight bits.


