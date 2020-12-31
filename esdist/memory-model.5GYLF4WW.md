# BASIC Memory Model

Retroputer BASIC emulates certain aspects of early versions of BASIC while 
dispensing with certain restrictions due to memory size. As such the memory 
model is a mix of various techniques, not all of which would have made
sense within the environment a BASIC from the 80's and 90's would have
found itself in.

## Memory Use

Retroputer BASIC uses the majority of the Retroputer's 512KB of memory. This is
simply down to making the assembly language a little bit easier, while also
allowing for larger programs than would have typically fit within an 8-bit
micro of the era. As such, while some decisions feel like a huge waste of
memory, they are also implemented either for simplicity or for performance.

The high-level memory map looks like this:

Start   |  End    | What
--------|---------|--------
0x00000 | 0x01FFF | System traps, stack, and kernel state
0x02000 | 0x0549B | Variable storage and pointers
0x0549C | 0x057FF | Free
0x05800 | 0x0AFFF | Safe area for machine language
0x0B000 | 0x0B7FF | BASIC state
0x0B800 | 0x0BFFF | MONITOR state (@todo: may remove)
0x0C000 | 0x0FFFF | Mirror of ROM from 0x7C000-0x7FFFF
0x10000 | 0x1FFFF | Screen data
0x20000 | 0x20000 | Unused
0x20001 | 0x2FFFF | Data heap
0x30000 | 0x3FFFF | Line number pointers
0x40000 | 0x40000 | Unused
0x40001 | 0x4FFFF | Program code heap
0x50000 | 0x50000 | Unused
0x50001 | 0x5FFFF | Reserved for garbage collection
0x60000 | 0x6FFFF | Free
0x70000 | 0x7FFFF | ROM

### Variable Storage

Retroputer BASIC supports four types of variables:

* 16-bit Integer (default, no sigil)
* 64-bit Floating Point (uses `#` sigil)
* 8-bit character strings (uses `$` sigil)
* Functions and Subroutines

Aside from functions and subroutines, each type can also be supported as an
array of items. Note that BASIC does not support variant types within an 
array; items must all be of the same type.

Variable names can be any length, up to the allowed line limit, but only the
first two characters are significant. This is a restriction often found on
BASICs of the era, but it also enables us to use this to our benefit when it
comes to performance improvements.

Variable names must start with a letter (`_` is not permitted). Additional 
letters maybe letters or digits. Because of this, there are a total of 924
variables of each type that can be supported. (26 * 36 + 26)

Non-array variables are stored starting at 0x02000 as follows:

Type                  | Start   | End     | Length
----------------------|---------|---------|--------
Integer               | 0x02000 | 0x02783 | 0x784
String                | 0x02784 | 0x02F07 | 0x784
Floating Point        | 0x02F08 | 0x0368B | 0x784
SUBs and FNs          | 0x0368C | 0x03E0F | 0x784
Integer Arrays        | 0x03E10 | 0x04593 | 0x784
String Arrays         | 0x04594 | 0x04D17 | 0x784
Floating Point Arrays | 0x04D18 | 0x0549B | 0x784

Looking up a variable is fast, once you know its type. During line crunching
BASIC will compute the index of any variables and store it as part of the
token. Adding it to a given base results in the variable's location in memory.

A variable name is directly mapped to a location in memory using the following
algorithm:

* Single-letter variables come first (0-25) where the index is the letter
  minus the RetSCII character "A".
* Variables with two letters combine the first and the second to form the
  index. The first must be a letter, and so can follow the same pattern as
  single variables (0="A",25="Z"). This value is then multiplied by 36 to make
  room for the next letter or digit, and is also advanced past the first 26
  single-letter variables. Again "A"-"Z" get assigned values 0-25, with "0"-"9"
  assigned 26-35. When added together, you get the variable _index_. 
* A simple shift left will result in multiplying the index by two, resulting in
  an offset that can be added to the base for the given type to read the
  variable's value.

Because the above calculation is done at crunch-time, variable lookup can be
done with much faster performance than many BASICs of the time (which had to
search through a linked list to find a variable). Of course, this wastes a not
insignificant amount of memory -- it's unlikely that anyone will use the entire
set of variables. Because we have so much memory to spare, however, it makes
sense to enable some added performance.

The value of each variable is either the value itself in the case of an integer
or a pointer to where the variable's value is actually stored. Pointers and
integers are the same width (two bytes), and so the variable tables are the
same size for all types.

Type           | Stored Value
---------------|---------------
Integer        | 16-bit value
String         | Pointer to string in the heap
Floating Point | Pointer to 64-bit float in the heap
SUBS and FNs   | Associated line number in program storage
Arrays         | Pointer to contiguous block in the heap

### Safe Area for Machine Language Routines

Given that variables take up just over 13K, and the start of BASIC state begins
at 0xB800, this leaves roughly 28K free storage in page zero for machine 
language code. To be safe, though, machine code should be located between
`0x05800` and `0x0B000`, giving 22K available space. BASIC will not modify the
contents of this area.

> Note: If you adjust the memory map (`MM`) register, you can use memory above
> `0x0B000`, but you'll need to supply your own kernel. You can copy the kernel
> in ROM from `0x7C000` to your target using DMA and then switch the memory map
> as desired, but the kernel does often expect to be able to utilize portions
> of memory in the `0x0B000`-`0x0BFFF` range.

### Heap Storage

Floating point numbers, strings, and arrays are all stored on the heap. The
heap consumes the entirety of bank 2, meaning that there's only room for 64K of
this kind of data.

> Note: the first byte in bank 2 is not used, because we use NUL to signify
> the NULL pointer.

The heap is managed very simply. A state variable in page 0 manages the highest
address used by the heap, and simply writes new data to that location and
advances the address appropriately. This means that certain operations will
rapidly fill the heap with garbage. As such, BASIC will need to perform some
garbage collection in order to compact the heap to enable more data to be
stored. If you want the best performance, avoid operations that require string
concatenation, manipulation, or the re-creation of arrays.

Once the heap is full, a temporary bank will be used for the garbage collection.
BASIC will go through every variable that can be on the stack, and copy the
data to contiguous locations. When done, this temporary bank will be copied back
to bank 2 and execution can resume. Bank 5 is used for garbage collection
routines, and so it's inadvisable to store any important data there, unless you
know you'll never need garbage collection.

For arrays, the heap is often hit twice -- once for the pointers themselves and
then another time for the actual data. As such, different types take up very
different amounts of heap space.

Array Type           | Space Required
---------------------|--------------------------------
Integer Array        | 2 (for bounds) + size * 2
String Array         | 2 + size * 2 + new allocations * 2
Floating Point Array | 2 + size * 2 + size * 8

> Note: although the initial set of array's pointers to items are contiguously
> allocated on the heap, that doesn't mean that additional allocations are
> also contiguous. Strings, for example, can be allocated at any time and may
> not be particularly close to the original pointer table.

Looking up a value often requires some degree of indirection, as illustrated
below:

Variable Type        | Initial Value | Indirection | Second Indirection
---------------------|---------------|-------------|--------------------
Integer              | Integer       | N/A |
String               | HEAP Pointer  | NUL-terminated string |
Floating Point       | HEAP Pointer  | 64-bit floating point value |
FN or SUB            | Line Number   | N/A |
Integer Array        | HEAP Pointer  | Integer value (at 2+index * 2) |
String Array         | HEAP Pointer  | HEAP pointer (at 2+index * 2) | NUL-terminated string
Floating Point Array | HEAP Pointer  | HEAP Pointer (at 2+index * 2) | 64-bit Floating Point number

As array item pointers are always allocated contiguously, lookup can be very
fast, but this comes at the cost of memory storage. There must be enough
memory after garbage collection on the heap to store all the pointers or values
for the given array size. If this isn't available, the heap will overflow and
BASIC will raise an "OUT OF MEMORY" error.

### Program Storage

Storage of program code utilizes two banks. Bank 3 (0x30000-0x3FFFF) is used to
link line numbers with the crunched code stored in Bank 4 (0x40001-0x4FFFF).
The first byte of bank 4 is never used so that BASIC can use `0` to indicate an
empty line.

Bank 4 is managed in much the same way as the data heap. New lines are added at
the end of storage's free space, and when storage becomes full, garbage
collection must occur. Like with the data heap, Bank 5 will be used to compact
the code and then copy that code back to Bank 4 (while updating line references
in Bank 3).

This means that we're essentially wasting an entire 64K bank with the
assumption that developers might ever write a program with 32,767 lines of
code. This would be very nearly impossible to pull off since most lines of
BASIC require more than a couple bytes to store in the program code heap. One
thing this method _does_ give us, however, is very rapid lookups for lines
themselves. This means that given a line number we can:

* Quickly determine if a line exists at that number
* Quickly jump to a line number during execution (`GOTO`, `GOSUB`, etc.)
  without the need to search through a linked list

One thing we _can't_ do quickly, however, is sequential execution. Instead
BASIC must search the line table, skip over NUL pointers, and then pick up
execution at the next non-NUL pointer it sees. For a program with a lot of
space between line numbers, this would impact performance. Generally, however,
the typical distance between line numbers is 5 or 10 items, and so this isn't
too much of an impact. But if code must go from line 500 to line 1500 without
an intevening jump, there will be a short delay as the line number counts up.

### Free Storage

Bank 6 is entirely unused by BASIC, and is available for any forms of storage
by the developer. It's also possible to use this area for screen data or sprite
data as well.