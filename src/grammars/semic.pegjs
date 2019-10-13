{
    const expectedComma = () => expected("COMMA");
    const expectedExpression = () => expected("EXPRESSION");
    const expectedIdentifier = () => expected("IDENTIFIER");
    const expectedQuote = () => expected("QUOTE");
    
    const whereNotNull = v => v !== null;

    function toNumber(inStr) {
        // allow _ as separator
        let str = inStr.replace(/\_/g, "");

        // set up radix based on prefix/postfix
        let radix = 10;
        if (str.startsWith("0x") ||
            str.startsWith("$") ||
            str.endsWith("h")) {
            radix = 16;
        }
        if (str.startsWith("0b") ||
            str.endsWith("b")) {
            radix = 2;
        }

        str = str.replace("0x", "")
                .replace("0b", "")
                .replace("$", "")
                .replace("h", "");

        return parseInt(str, radix);
    }
    
    const NODES = {
        COMMENT: "comment",
        BLOCK: "block",
        ARRAY_LITERAL: "array literal",
        ARRAY_INDEX: "array index",
        INTEGER_LITERAL: "integer literal",
        FLOAT_LITERAL: "float literal",
        STRING_LITERAL: "string literal",
        IDENTIFIER: "identifier",
        EXPRESSION: "expression",
        CONST_EXPRESSION: "constant expression",
        BINARY_OP: "binary operation",
        UNARY_OP: "unary operation",
        FUNCTION_DECL: "function declaration",
        VARIABLE_DECL: "variable declaration",
        TYPE_DECL: "type declaration",
        TYPE: "type specification",
        IF: "if",
        ELSE: "else",
        WHILE: "while",
        DO: "do",
        LOOP: "loop",
        FOR: "for",
        FOREVER: "forever",
        WHEN: "when",
        ASSIGNMENT_STMT: "assignment",
        COMMA_EXPRESSION: "comma expression",
        
    }
    
    const Node = (type, opts) => ({type, ...opts, pos: location().start});
    const nBlock = value => Node(NODES.BLOCK, { value });
    const nIntegerLiteral = value => Node(NODES.INTEGER_LITERAL, { value });
    const nArrayLiteral = value => Node(NODES.ARRAY_LITERAL, { value });
    const nFloatLiteral = value => Node(NODES.FLOAT_LITERAL, { value });
    const nStringLiteral = value => Node(NODES.STRING_LITERAL, { value });
    const nIdentifier = value => Node(NODES.IDENTIFIER, { value });
    const nComment = value => Node(NODES.COMMENT, { value });
    const nTypeSpec = (type, modifiers, isArray, arraySize) => 
        Node(NODES.TYPE_SPEC, { type, modifiers, isArray, arraySize });
    const nArrayIndexOp = (value, idxs) => Node(NODES.ARRAY_INDEX, {value, indexes: idxs});
    
    const nVariableDecl = (v, t, i, at) => Node(NODES.VARIABLE_DECL, {type: t, name: v, init: i, at});
    const nAssignmentStmt = (lhs, rhs) => Node(NODES.ASSIGNMENT_STMT, {lhs, rhs});
    
    const nBinaryOp = (head, tail) =>
    	tail.reduce( (result, element) =>
            Node(NODES.BINARY_OP, {
                op: element[1],
                l: result,
                r: element[3]
            }), head);
    
    const nUnaryOp = (op, v) => Node(NODES.UNARY_OP, { op, r: v });
    
    const nIf = (expr, thenBlock, elseBlock) => Node(NODES.IF, {cond: expr, t: thenBlock, e: elseBlock});
}

Program "Program"
= lines:Line* { return nBlock(lines.filter(whereNotNull)); }

Block "Block"
= _ LCURLY _ lines:Line* _ RCURLY _ { return nBlock(lines.filter(whereNotNull)); }

Line "Line"
= _ stmt:Statement _ SEMI? _ { return stmt; }
/ _ block:Block _ SEMI? _ { return block; }

//
//  Statements
////////////////////////////////////////

Statement 
= AssignmentStmt
/ FunctionDeclStmt
/ VariableDeclStmt
/ IfStmt 
/ DoStmt 
/ BreakStmt 
/ ContinueStmt

ElseClause
= _ ELSE _ e:Line _ { return e; }

BreakStmt
= _ BREAK _ 

ContinueStmt
= _ CONTINUE _ 

IfStmt 
= _ IF _ LPAREN _ f:Expression _ RPAREN _ t:Line _ e:ElseClause? 
    { return nIf(f, t, e); }

DoStmt
= _ DO _ l:Block _ WHILE _ f:Expression _ 
/ _ WHILE _ f:Expression _ DO _ l:Block _ 

FunctionDeclStmt
= _ t:Type _ i:Identifier _ LPAREN _ c:(VariableDeclStmt _ (COMMA _ VariableDeclStmt)*)? _ RPAREN _ b:Block

MemoryLocation
= _ OP_AT _ addr:Expression _ { return addr; }

VariableDeclStmt
= _ t:Type _ i:Identifier _ m:MemoryLocation? _ OP_ASSIGN _ init:Expression
    { return nVariableDecl(i, t, init, m); }
/ _ t:Type _ i:Identifier _ m:MemoryLocation? _
    { return nVariableDecl(i, t, null, m); }


AssignmentStmt
= lhs:AssignableExpression _ OP_ASSIGN _ rhs:Expression
    { return nAssignmentStmt(lhs, rhs); }

//
// Keyword Definitions
////////////////////////////////////////
IF       "IF"       = "IF"i       !IdentifierPart { return "IF"; }
ELSE     "ELSE"     = "ELSE"i     !IdentifierPart { return "ELSE"; }
DO       "DO"       = "DO"i       !IdentifierPart { return "DO"; }
WHILE    "WHILE"    = "WHILE"i    !IdentifierPart { return "WHILE"; }
BREAK    "BREAK"    = "BREAK"i    !IdentifierPart { return "BREAK"; }
CONTINUE "CONTINUE" = "CONTINUE"i !IdentifierPart { return "CONTINUE"; }

Keyword "Keyword"
= IF / ELSE / DO / WHILE / BREAK / CONTINUE

//
// Type Definitions
///////////////////////////////////////
U32  "unsigned 32-bit integer" = "u32"i  !IdentifierPart { return "U32"; }
ADDR "memory address"          = "addr"i !IdentifierPart { return "ADDR"; }
U16  "unsigned 32-bit integer" = "u16"i  !IdentifierPart { return "U16"; }
U8   "unsigned 32-bit integer" = "u8"i   !IdentifierPart { return "U8"; }
                               / "char"i !IdentifierPart { return "CHAR"; }
I32  "signed 32-bit integer"   = "i32"i  !IdentifierPart { return "I32"; }
I16  "signed 32-bit integer"   = "i16"i  !IdentifierPart { return "I16"; }
                               / "int"i  !IdentifierPart { return "INT"; }
I8   "signed 32-bit integer"   = "i8"i   !IdentifierPart { return "I8"; }
VOID "Void"                    = "void"i !IdentifierPart { return "VOID"; }

TypeSpec "Type Specification"
= U32 / ADDR / U16 / U8 / I32 / I16 / I8 / VOID

CONST "constant modifier" = "const"i !IdentifierPart { return "CONST"; }
STATIC "static modifier" = "static"i !IdentifierPart { return "STATIC"; }
INLINE "inline modifier" = "inline"i !IdentifierPart { return "INLINE"; }
SIGNED "signed modifier" = "signed"i !IdentifierPart { return "SIGNED"; }
UNSIGNED "unsigned modifier" = "unsigned"i !IdentifierPart { return "UNSIGNED"; }
REGISTER "register modifier" = ( "register"i / "reg"i ) !IdentifierPart { return "REGISTER"; }
POINTER "pointer modifier" = ( "pointer"i / "ptr"i ) !IdentifierPart { return "POINTER"; }

TypeModifierKW "Type Modifier"
= UNSIGNED / SIGNED / CONST / STATIC / INLINE / REGISTER / POINTER

TypeModifier "Type Modifier" = _ m:TypeModifierKW _ { return m; }

Type "Type"
= m:TypeModifier* _ ts:Identifier _ arr:(LBRACKET Expression? RBRACKET)? 
    { return nTypeSpec(ts, m, !!arr, arr && arr[1]); }


//
// Expressions
////////////////////////////////////////

OP_ADD     "Addition Operator"       = "+"
OP_SUB     "Subtraction Operator"    = "-"
OP_MUL     "Multiplication Operator" = "*"
OP_DIV     "Division Operator"       = "/"
OP_MOD     "Modulo Operator"         = "%"
OP_SHL     "Shift Left Operator"     = "<<"
OP_SHR     "Shift Right Operator"    = ">>"
OP_AND     "And Operator"            = "&"
OP_OR      "Or Operator"             = "|"
OP_NOT     "Unary Not Operator"      = "!"
OP_XOR     "XOR Operator"            = "^"
OP_ASSIGN  "Assignment Operator"     = "="
OP_EQUALS  "Equality Operator"       = "=="
OP_UNEQUAL "Inequality Operator"     = "!="
OP_LT      "Less Than Operator"      = "<"
OP_GT      "Greater Than Operator"   = ">"
OP_LTEQ    "Less Than or Equal Op"   = "<="
OP_GTEQ    "Greater Than or Equal Op"= ">="
OP_AT      "Address Of Operator"     = "@"

AdditiveOperator "Additive Operator" = OP_ADD / OP_SUB

MultiplicativeOperator "Multiplicative Operator" = OP_MUL / OP_MOD / OP_DIV

LogicalOperator "Logical Operator" = OP_AND / OP_OR / OP_XOR

ShiftOperator "Shift Operator" = OP_SHL / OP_SHR

ConditionalOperator "Conditional Operator" = OP_EQUALS / OP_UNEQUAL / OP_LTEQ / OP_GTEQ / OP_LT / OP_GT

AssignmentOperator "Assignment Operator" = OP_ASSIGN

CommaExpression "Comma Expression"
= head:AssignmentExpression tail:(_ COMMA _ AssignmentExpression)* {
    return nBinaryOp(head, tail);
}

AssignmentExpression "Assignment Expression"
= head:ConditionalExpression tail:(_ AssignmentOperator _ ConditionalExpression)* {
    return nBinaryOp(head, tail);
}

ConditionalExpression "Conditional Expression"
= head:OrExpression tail:(_ ConditionalOperator _ OrExpression)* {
    return nBinaryOp(head, tail);
}

OrExpression "Or Expression"
= head:XorExpression tail:(_ (OP_OR) _ XorExpression)* {
    return nBinaryOp(head, tail);
}
XorExpression "Xor Expression"
= head:AndExpression tail:(_ (OP_XOR) _ AndExpression)* {
    return nBinaryOp(head, tail);
}
AndExpression "And Expression"
= head:ShiftExpression tail:(_ (OP_AND) _ ShiftExpression)* {
    return nBinaryOp(head, tail);
}

ShiftExpression "Shift Expression"
= head:AdditiveExpression tail:(_ (ShiftOperator) _ AdditiveExpression)* {
    return nBinaryOp(head, tail);
}

AdditiveExpression "Additive Expression"
= head:MultiplicativeExpression tail:(_ (AdditiveOperator) _ MultiplicativeExpression)* {
    return nBinaryOp(head, tail);
}

MultiplicativeExpression "Multiplicative Expression"
= head:Literal tail:(_ (MultiplicativeOperator) _ Literal)* {
    return nBinaryOp(head, tail);
}

NotExpression "Not Expression"
= _ op:OP_NOT _ v:Expression {
    return nUnaryOp(op, v);
}
NegativeExpression "Negative Expression"
= _ op:OP_SUB _ v:Expression {
    return nUnaryOp(op, v);
}
AddressOfExpression "Address Of Expression"
= _ op:OP_AT _ v:Expression {
    return nUnaryOp(op, v);
}
TypeCastExpression "Typecast"
= _ LPAREN _ t:Type _ RPAREN _ v:Expression {
   return nUnaryOp("typecast", {t, v}); 
}

CommaSepExpressions
= head:Expression tail:(_ COMMA _ Expression)* {
    return [ head, ...tail.map(([,,,expr]) => expr)];
}

Expression
= CommaExpression

ArrayIndex
= _ LBRACKET _ idx:Expression _ RBRACKET _ { return idx; }

FunctionCallArguments
= _ LPAREN _ expr:Expression* _ RPAREN _ { return expr; }

AssignableExpression
= ident:Identifier _ idxs:ArrayIndex+ { return nArrayIndexOp(ident, idxs); }
/ ident:Identifier

Literal
= TypeCastExpression
/ LPAREN _ expr:Expression _ RPAREN { return expr; }
/ AddressOfExpression
/ NotExpression
/ NegativeExpression
/ Integer
/ StringLiteral
/ ArrayLiteral
/ ident:Identifier _ args:FunctionCallArguments
/ ident:Identifier _ idxs:ArrayIndex+ { return nArrayIndexOp(ident, idxs); }
/ Identifier
/ ReservedWord { error(`Literal can not be a reserved word: ${text()}`); }

//
// Primitives
////////////////////////////////////////

ReservedWord "Reserved Word"
= Keyword / TypeModifierKW

Identifier "Identifier"
= !ReservedWord IdentifierName { return nIdentifier(text()); }

IdentifierName "Identifier Name"
= head:IdentifierStart tail:IdentifierPart*
    { return text(); }

IdentifierStart "Identifier Start"
= [A-Za-z]
/ "_"

IdentifierPart "Identifier Part"
= [_A-Za-z0-9\-\.]

ArrayLiteral "Array Literal"
= _ LBRACKET _ values:CommaExpression _ RBRACKET _
    { return nArrayLiteral(values); }

Integer "Integer"
= "0x" head:[0-9A-Fa-f] tail:[0-9A-Fa-f_]*
    { return nIntegerLiteral(toNumber(text())); }
/ "$" head:[0-9A-Fa-f] tail:[0-9A-Fa-f_]*
    { return nIntegerLiteral(toNumber(text())); }
/ "0b" head:[0-1] tail:[0-1_]*
    { return nIntegerLiteral(toNumber(text())); }
/ head:[0-9A-Fa-f] tail:[0-9A-Fa-f_]* "h"
    { return nIntegerLiteral(toNumber(text())); }
/ head:[0-1] tail:[0-1_]* "b"
    { return nIntegerLiteral(toNumber(text())); }
/ negative:"-"? head:[0-9] tail:[0-9_]*
    { return nIntegerLiteral(toNumber(text())); }


StringLiteral "String Literal"
= DQUOTE text:(!DQUOTE .)* DQUOTE { return nStringLiteral(text.map(([,ch]) => ch).join("")); }
/ DQUOTE (!DQUOTE .)* { expectedQuote() }

//
// Delimiters
////////////////////////////////////////

SEMI     "Semicolon"     = ";" { return ";"; }
LCURLY   "Left Curly Brace" = "{" { return ""; }
RCURLY   "Right Curly Brace" = "}" { return ""; }
LBRACKET "Left Bracket"  = "[" { return "["; }
RBRACKET "Right Bracket" = "]" { return "]"; }
LPAREN   "Left Paren"    = "(" { return "("; }
RPAREN   "Right Paren"   = ")" { return ")"; }
LANGLE   "Left Angle"    = "<" { return "<"; }
RANGLE   "Right Angle"   = ">" { return ">"; }
DQUOTE   "Double Quote"  = '"' { return '"'; }
PLUS "Plus"              = "+" { return "+"; }
COMMA "Comma"            = "," { return ","; }
__ "Space"               = [ \t]+ { return " "; }

//
// Whitespace
////////////////////////////////////////

COMMENT "Comment"
= "#" data:([^\n]*) { return nComment(data.join("").trim()); }

_ "Whitespace"
= [ \t\r\n]* { return null; }

EOL "End Of Line" = [\r\n]+ { return null; }