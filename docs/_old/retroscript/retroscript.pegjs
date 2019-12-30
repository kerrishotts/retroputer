Start = __ program:Program __ { return program; }

// ----- Whitespace and terminators -----

Whitespace "Whitespace" 
    = [ \t]
LineTerminator "End of line" 
    = [\r\n]
Comment "Start of Comment" 
    = "//" .*

__ = (Whitespace / LineTerminator / Comment)*

// ----- Numbers -----
Integer "Integer"
    = digits:[0-9]+ { return Number(digits.join("")).valueOf(); }

// ----- ? -----

ListOfIdentifiers "List of Identifiers"
    = head:Identifier __ tail:("," __ Identifier)* {
        return [head].concat(tail.reduce((p, c) => (c && (c.length) && c[2].type === "Identifier") ? (p.push(c[2]),p) : p,[]));
    }

// ----- Identifiers -----
ReservedWord  = AndToken
              / CaseToken
              / CatchToken
              / ElseToken
              / EndToken
              / FalseToken
              / FunctionToken
              / IfToken
              / LetToken
              / NotToken
              / OrToken
              / RepeatToken
              / SubToken
              / ThenToken
              / TrueToken
              / TryToken
              / UntilToken
              / WhenToken
              / XorToken
              
Identifier "Identifier"
    = !ReservedWord name:IdentifierName { return name; }

IdentifierName "Continuation of Identifier"
    = head:IdentifierStart tail:[A-Za-z_\-0-9]* sigil:Sigil {
                      return {
                          type: "Identifier",
                          name: head + tail.join(""),
                          sigil: sigil
                      };
                  }

IdentifierStart "Start of Identifier" 
    = [A-Za-z_]

// ----- Sigils -----
Sigil "Sigil" 
    = IntegerSigil
    / FloatSigil
    / StringSigil
    / ArraySigil
    / BooleanSigil
    / FunctionSigil
              
IntegerSigil  = "%"
FloatSigil    = "#"
StringSigil   = "$"
ArraySigil    = "[]"
BooleanSigil  = "?"
FunctionSigil = !.

// ----- Operators -----

AssignmentOperator         = "="
EqualityOperator           = "=="
InequalityOperator         = "!="
LessThanOperator           = "<"
LessThanOrEqualOperator    = "<="
GreaterThanOperator        = ">"
GreaterThanOrEqualOperator = ">="
InOperator                 = "in"i
AdditionOperator           = "+"
SubtractionOperator        = "-"
MultiplicationOperator     = "*"
DivisionOperator           = "/"
AndOperator                = "&" / AndToken
OrOperator                 = "|" / OrToken
NotOperator                = "!" / NotToken
XorOperator                = "^" / XorToken
RangeOperator              = ".."

// ----- Tokens -----

AndToken      = "and"i
CaseToken     = "case"i
CatchToken    = "catch"i
ElseToken     = "else"i
EndToken      = "end"i
FalseToken    = "false"
FunctionToken = "function"i
IfToken       = "if"i
LetToken      = "let"i
NotToken      = "not"i
OrToken       = "or"i
RepeatToken   = "repeat"i
ReturnToken   = "return"i
SubToken      = "sub"i
ThenToken     = "then"i
TrueToken     = "true"i
TryToken      = "try"i
UntilToken    = "until"i
WhenToken     = "when"i
XorToken      = "xor"i

// ----- Statements -----

Statement = Block
          / LetStatement

LetStatement "Let statement"
    = LetToken __ list:ListOfIdentifiers __ {
        return {
        	type: "LetStatement",
            identifiers: list
        };
    }

Block = RepeatBlock
//      / SubBlock
 //     / RepeatUntilBlock
   //   / TryCatchBlock
      
//FunctionBlock = FunctionToken __ id:Identifier __
RepeatBlock = RepeatToken __ body:Statement* __ UntilToken {
    return {
        type: "RepeatStatement",
        body: body
    }
}

Program = Statement*
        