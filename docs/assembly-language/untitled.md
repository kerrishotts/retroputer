# About the Assembler

The Retroputer Assembler is called `BASM` and, while not a macro assembler, can parse some constructs that feel like a high-level language. BASM generates output that Retroputer can then load into its memory and feed to the 6516 CPU to execute the desired program.

### Program Structure

An assembly language program consists of a series of constant definitions, namespaces, segments, and comments. Code and data can only be defined within segments.

```text
#
# Comments are allowed outside of any namespace or block
#

.namespace app {
    .segment code 0x01000 {
        xor a, a
    }
}

# segments don't have to live within namespaces
.segment kcode 0x02000 {
    xor b, b
}

# you can have as many namespaces and segments as needed
.namespace util {
    .segment code 0x09000 {
        str-length:
            ret
    }
}
```

