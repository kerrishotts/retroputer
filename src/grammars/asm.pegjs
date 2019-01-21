// Simple Arithmetics Grammar
// ==========================
//
// Accepts expressions like "2 * (3 + 4)" and computes their value.

Program =
  Statement*

Statement
  = Directive _ EOL
  / Label _ EOL
  / Label _ Instruction _ EOL
  / Instruction _ EOL
  / _ EOL

Label
  = _ Identifier ":"

Instruction =
  _ "LDI" _ (RegisterAL / RegisterA) _ "," _ Expression

// Registers

RegisterA    = _ "A"i
RegisterAL   = _ "AL"i
RegisterB    = _ "B"i
RegisterC    = _ "C"i
RegisterD    = _ "D"i
RegisterX    = _ "X"i
RegisterY    = _ "Y"i
BasePointer  = _ "BP"i
StackPointer = _ "SP"i
SourceBank   = _ "SB"i
DataBank     = _ "DB"i

Accumulator     = RegisterA
Accumulator8    = RegisterAL
Counter         = RegisterC
DataAccess      = RegisterD
GeneralRegister = (RegisterA / RegisterB / RegisterC / RegisterD)
IndexRegister   = (RegisterX / RegisterY)
BankRegister    = (SourceBank / DataBank)
Register        = (GeneralRegister / IndexRegister / BankRegister)

// Flags

ZeroFlag      = _ "Z"i
OverflowFlag  = _ "O"i
CarryFlag     = _ "C"i
NegativeFlag  = _ "N"i
ExceptionFlag = _ "E"i
ExecuteFlag   = _ "X"i
ModeFlag      = _ "M"i
InterruptFlag = _ "I"i

// Directives

ImportDirective "Import Directive"
  = _ ".import"i _ StringLiteral

SegmentDirective "Segment Directive"
  = _ (".code"i / ".data"i) "+"? Expression

DefineDirective "Define Directive"
  = _ ".def"i _ Identifier _ StringLiteral

VariableDirective "Variable Directive"
  = _ ".var"i _ Identifier

RenameDirective "Rename Directive"
  = _ ".rename"i _ Identifier _ Register

ByteDirective "Byte Directive"
  = _ ".db"i _ Expression+

ByteArrayDirective "Byte Array Directive"
  = _ ".db[]" _ Expression

WordDirective "Word Directive"
  = _ ".dw"i _ Expression+

WordArrayDirective "Word Array Directive"
  = _ ".dw[]" _ Expression

StringDirective "String Directive"
  = _ ".ds"i _ StringLiteral+



DataDirective "Data Directive"
  = ByteArrayDirective
  / WordArrayDirective
  / ByteDirective
  / WordDirective
  / StringDirective

Directive "Directive"
  = ImportDirective
  / SegmentDirective
  / DefineDirective
  / VariableDirective
  / RenameDirective
  / DataDirective



Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / IntegerFunctionExpression
  / StringFunctionExpression
  / IntegerLiteral

IntegerFunctionExpression
  = _ func:IntegerFunction _ "(" _ v:Expression _ ")" {
  	return func(v);
  }

StringFunctionExpression
  = _ func:StringFunction _ "(" _ v:StringLiteral _ ")" {
    return func(v);
  }

IntegerFunction
  = "hi"i   { return function hi(v) { return (v & 0x00FF00) >> 8; } }
  / "lo"i   { return function lo(v) { return v & 0x0000FF; } }
  / "chr"i  { return function chr(v) { return String.fromCharCode(v) } }
  / "bank"i { return function bank(v) { return (v & 0x0F0000) >> 16; } }
  / "addr"i { return function addr(v) { return v & 0x00FFFF; } }
  / "word"i { return function word(v) { return v & 0x00FFFF; } }

StringFunction
  = "ord"i  { return function ord(v) { return v.charCodeAt(1); } }

IntegerLiteral "Integer Literal"
  = _ "-"? [0-9][xb]?[0-9A-Fa-f]* { return Number(text()); }

Identifier "Identifier"
  = _ [A-Za-z_][A-Za-z0-9_\-]* { return text(); }

StringLiteral "String Literal"
  = _ '"' [^"]* '"' { return text(); }

EOL "End of Line"
  = [\n\r]+

_ "whitespace"
  = [ \t]*

