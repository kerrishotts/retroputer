# BASIC

-[ ] Add CTRL+C handling to `exec` so we can break single-line loops.
     This means we won't need it in outer loops, so you'll never see a
     CTRL+C where a line doesn't actually exist.
-[ ] Add more checking to `eval` so that `2 2 +` isn't a valid expression
-[ ] Fix up variable storage to match technical design docs
-[ ] Add floating point math support
-[ ] Add heap management routines
-[ ] Add garbage-collection routines
-[ ] Add more token routines to make it easier to scan forward
-[ ] Add a token routine to make it easier to indicate an expected token
     with optional failure if the token isn't present. Failure always occurs
     if a token is present, but it's not expected.
-[ ] Optimize assignments where possible to save ROM space
-[ ] Remove the monitor? (We're tight on space)
-[ ] Add support for higher-level language constructs using stacks
-[ ] Encode 32-bit integers as long words during tokenization
-[ ] Optimize keyword tokenization
-[ ] Decide whether to use brackets or parentheses for array indexes

# CPU

-[ ] Add floating-point operations

# Assembler

-[ ] Add floating-point aliases
-[ ] Better error handling:
    -[ ] Assignment to non-data register
    -[ ] Invalid comparisons

# Devices

-[ ] Mouse
-[ ] Power management
-[ ] Debugging (breakpoints, etc.)
-[ ] Sound
