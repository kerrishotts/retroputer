# DEF

`DEF` defines a function or a subroutine.

### Forms

#### Single line form

```text
DEF FN fnName([arg [, args...]]) = expression
DEF SUB subName([arg, [, args...]]) = statement
```

#### Multiline form

```text
DEF FN fnName([arg [, args...])
  REM statements
  RETURN result
END FN

DEF SUB subName([arg [, args...]])
  REM Statements
END SUB
```

## Examples

#### Single line functions

```text
DEF FN double(x) = RETURN x * 2
DEF FN textAddr(row, col) = RETURN row * 32 + col
```

#### Multiline function

```text
DEF FN upper$(str$)
  DIM t$, ch$, ch
  FOR i = 0 TO LEN(str$)
    ch$ = str$[i]
    ch = ASC(ch$)
    IF ch >= ASC("a") AND ch <= ASC("z") THEN
      ch = ch - 32
    END IF
    t$ = t$ + CHR$(ch)
  NEXT i
  RETURN t$
END FN
```

#### Subroutine

```text
DEF SUB printIntro()
  PRINT "Hello, world!"
END SUB
```

