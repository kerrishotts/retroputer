# Error Messages

### Scope {name} already declared with type {type}, but tried to change it to {type}

This error occurs if you try to redefined a previously named scope to a different type. For example, of you have a segment called `code`, you can't also have a namespace called `code`.

### Scope {name} with already declared with base address {addr}, but tried to change it to {addr}

Once a code or data segment has been declared, the base address can't be changed. You can _append_ new code or data to the segment, which means you probably forgot the `.append` directive. 

### Could not locate {identifier} in current scope chain

The identifier couldn't be found in the current lexical scope. In general the assembler is forgiving and will perform look-ahead to locate any identifiers yet to be defined, but this only works within the current file. This means that if you are referencing identifiers in another file, that file must be imported first.

### Unexpected operator in unary expression: {operator}

Unary expressions only support `!` and `-`.

### Unexpected operator in binary expression: {operator}

Binary expressions only support `+`, `-`, `/`, `*`, `&`, `|`, `^`, `<<`, and `>>`.

### Unexpected token in expression: {token type}

This should never happen. If it does, an internal parsing error has occurred.

### Tried to assemble an unexpected token: {token}

This indicates a problem when calling the internal JavaScript assembler library.

### Attempted to loop beyond short range

The `LOOPS` instruction can only loop to instructions within `-128` to `+127` bytes from the current instruction.

### Attempted to loop beyond range

The `LOOP` instruction can only loop to instructions within `-32768` to `+32767` bytes from the current instruction.

### Tried to assemble an undefined AST.

Somehow the parse tree became undefined when using the JavaScript assembler.

### Tried to assemble an invalid AST.

You passed an incorrect AST to the JavaScript assembler.

### Cannot redefine constant {identifier}

Once defined, constants cannot be redefined.

### Unexpected label {identifier} in {scope} scope

Labels can only occur in code or data segments.

### Unexpected data directive in {scope} scope

Data directives can only occur in code or data segments.

### Unexpected string directive in {scope} scope

String directives can only occur in code or data segments.

### Unexpected code in {scope} scope

Code can only occur in code or data segments.

### Could not locate symbol

The assember tried to look ahead and locate the symbol, but it couldn't find a declaration.

### Bytes mismatched at {line}:{col}. Expected {bytes}, saw {bytes}

When using the `{...}` directive to test the assembler's output, the assembler generated different bytes than what was specified.

### Non-contiguous code or data in segment {name}

Somehow the data or code wasn't contiguous in the segment. This generally indicates an internal error of some sort.

### Literal cannot be a reserved word

The literal in question cannot be a reserved word. This generally means you tried to use `loop` for an identifier, or something similar.

### Label cannot be a reserved word

The label cannot be a reserved word. Using `loop:` as a label will generate this error since `loop` is an instruction and a reserved word.

