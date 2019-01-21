// Kite
// ==========================

{
    const GLOBAL_CONTEXT = "__global__";
    const contexts = [
        {
            name: GLOBAL_CONTEXT,
            base: "0x34000",
            vars: []
        }
    ];

    const U_BYTE = 1;
    const S_BYTE = 2;
    const U_WORD = 3;
    const S_WORD = 4;
    const TYPE_DIRECTIVES = {
        [U_BYTE]: ".db",
        [S_BYTE]: ".db",
        [U_WORD]: ".dw",
        [S_WORD]: ".dw"
    };
    const TYPE_SIZES = {
        [U_BYTE]: 1,
        [S_BYTE]: 1,
        [U_WORD]: 2,
        [S_WORD]: 2
    };
    const SIZE_REGISTER = {
        [TYPE_SIZES[U_BYTE]]: "AL",
        [TYPE_SIZES[U_WORD]]: "A"
    };

    function enterContext(context) {
        context.push({
            name: context,
            vars: [],
            BP: 0
        });
    }

    function exitContext(context) {
        context.pop();
    }

    /**
     * defines a variable in the current scope (context)
     *
     * @param {string} id     the name of the variable
     * @param {number} type   the type of the variable
     * @param {number} [defaultValue = 0] the default value to assign (if possible)
     * @param {string | number} [location = "auto"] the location of the variable
     */
    function defineVariable(id, type, defaultValue = 0, location = "auto") {
        const context = contexts[contexts.length - 1];
        const out = {
            data: [],
            code: []
        };

        if (context.vars[id]) {
          error(`Variable ${id} already defined.`);
        }

        const newVar = {
            name: id,
            size: TYPE_SIZES[type],
            type,
            defaultValue,
            location: null,             // can be a string or a number
                                        // if a string, it'll be something like &var
                                        // or BP+-2. If a number, it'll be a hex location
        };

        if (context.name === GLOBAL_CONTEXT) {
            if (location === "auto") {
                newVar.location = `&${id}`; // let the assember resolve it
                out.data.push(
                    `.var ${id}`,
                    `    ${TYPE_DIRECTIVES[type]} ${defaultValue}`
                );
            } else {
                newVar.location = location; // memory address instead
                out.data.push(
                    `.data ${location}`,
                    `.var ${id}`,
                    `    ${TYPE_DIRECTIVES[type]} ${defaultValue}`,
                    `.data ${context.base}+`,
                );
            }
        } else {
            if (location === "auto") {
                context.BP -= 2; // can only ever push words on the stack
                newVar.location = `BP+${context.BP + (2 - newVar.size)}`; // the variable is on the stack
            } else {
                newVar.name = `__${context.name}_${id}`,
                newVar.location = location; // the variable is somewhere else in memory
                out.data.push(
                    `.data ${location}`,
                    `.var ${newVar.name}`,
                    `    ${TYPE_DIRECTIVES[type]} ${defaultValue}`,
                    `.data ${contexts[0].base}+`,
                );
            }
        }

        context.vars[id] = newVar;

        return out;
    }

    function getAddressOfVariable(id) {
        const context = contexts[contexts.length - 1];
        const globalContext = contexts[0];

        if (context.vars[id] || globalContext.vars[id]) {
            if (globalContext.vars[id]) {
                return globalContext.vars[id].location;
            } else {
                return context.vars[id].location;
            }
        } else {
            error(`${id} is not defined in the current scope.`)
        }
    }

    function getValueInVariable(id) {
        const out = {
            data: [],
            code: []
        };
        const context = contexts[contexts.length - 1];
        const location = getAddressOfVariable(id);
        const theVar = context.vars[id];
        if (typeof location === "number") {
            out.code.push(
                `LDI AL, bank(${location})`,
                `MOV DB, AL`,
                `LDD ${SIZE_REGISTER[theVar.size]}, [addr(${location})]`,
                `PUSH A`,
            );
        } else {
            if (location.substr(0,2) === 'BP') {
                out.code.push(
                    `LDS ${SIZE_REGISTER[theVar.size]}, [${location}]`,
                    `PUSH A`
                );
            } else {
                out.code.push(
                    `LDI AL, bank(${location})`,
                    `MOV DB, AL`,
                    `LDD ${SIZE_REGISTER[theVar.size]}, [addr(${location})]`,
                    `PUSH A`
                );
            }
        }
        return out;
    }

    function pushValue(d) {
        if (typeof d === "number") {
        	return {
            	code: [
                	`LDI A, ${d}            ; A = ${d}`,
                    `PUSH A`,
                ]
            };
        } else if (typeof d === "string") {
            return getValueInVariable(d);
        	/*return {
            	code: [
                	`LDI AL, bank(&${d})     ; A = [&${d}]`,
                    `MOV DB, AL`,
                    `LDD A, [addr(&${d})]`,
                    `PUSH A`,
                ]
            };*/
        } else {
        	return {
                data: d && d.data || [],
                code: [
                    ...(d && d.code || []),
                    `PUSH A`,
                ]
            }
        }
    }
}

Program
  = stmts: Statement* {
    const segments = {
        data: [
            `.data 0x34000`
        ],
        code: [
            `.code 0x01000`
        ]
    };
    return JSON.stringify(stmts.reduce((acc, cur) => {
        if (cur && cur.data) acc.data.push(...cur.data);
        if (cur && cur.code) acc.code.push(...cur.code);
        return acc;
    }, segments), null, 2);
  }

// TOKENS
// ==========
COMMENT   "Comment"                     = "#"
COMMA     "Comma"                       = ","
COLON     "Colon"                       = ":"
SEMICOLON "Semicolon"                   = ";"
DQUOTE    "Double Quote"                = "\""
SQUOTE    "Single Quote"                = "'"
LPAREN    "Left Parenthesis"            = "("
RPARAN    "Right Parenthesis"           = ")"
LBRACK    "Left Bracket"                = "["
RBRACK    "Right Bracket"               = "]"
LBRACE    "Left Brace"                  = "{"
RBRACE    "Right Brace"                 = "}"

OP_AT     "Memory Location"             = "@"
OP_ASSIGN "Assignment Operator"         = "="

OP_ADD      "Addition Operator"         = "+"
OP_SUBTRACT "Subtraction Operator"      = "-"
OP_MULTIPLY "Multiplication Operator"   = "*"
OP_DIVIDE   "Division Operator"         = "/"
OP_MODULUS  "Modulus Operator"          = "%"

OP_NOT "Not Operator"                   = "not"i
OP_OR  "Or Operator"                    = "or"i
OP_AND "And Operator"                   = "and"i
OP_XOR "Exclusive Or Operator"          = "xor"i
OP_SHL "Shift Left Operator"            = "<<"
OP_SHR "Shift Right Operator"           = ">>"

OP_EQ  "Equality Operator"              = "="
OP_NEQ "Inequality Operator"            = "!="
OP_LT  "Less Than Operator"             = "<"
OP_GT  "Greater Than Operator"          = ">"
OP_LTE "Less Than or Equal Operator"    = "<="
OP_GTE "Greater Than or Equal Operator" = ">="

K_ASM      "ASM Keyword"                = "asm"i
K_BREAK    "BREAK keyword"              = "break"i
K_CONTINUE "CONTINUE keyword"           = "continue"i
K_ELSE     "ELSE Keyword"               = "else"i
K_FN       "FN Keyword"                 = "fn"i
K_FOR      "FOR Keyword"                = "for"i
K_IF       "IF Keyword"                 = "if"i
K_RETURN   "RETURN Keyword"             = "return"i
K_SYS      "SYS Keyword"                = "sys"i
K_THEN     "THEN Keyword"               = "then"i
K_TO       "TO Keyword"                 = "to"i
K_WHILE    "WHILE Keyword"              = "while"i

K_CONST       "CONST Keyword"           = "const"i
K_PTR         "PTR Keyword"             = "ptr"i
K_SIGNED      "SIGNED Keyword"          = "signed"i
K_BYTE        "BYTE Keyword"            = "byte"i           { return U_BYTE; }
K_WORD        "WORD Keyword"            = "word"i           { return U_WORD; }
K_SIGNED_BYTE "SIGNED BYTE Keyword"     = K_SIGNED _ K_BYTE { return S_BYTE; }
K_SIGNED_WORD "SIGNED WORD Keyword"     = K_SIGNED _ K_WORD { return S_WORD; }
K_CHAR        "CHAR Keyword"            = "char"i           { return U_BYTE; }

// ENUMS
// ==========

Type "Type"
  = K_BYTE
  / K_SIGNED_BYTE
  / K_WORD
  / K_SIGNED_WORD



Statement
  = DeclarationStatement
  / AssignmentStatement
  / CommentStatement

CommentStatement "Comment"
  = _ COMMENT [^\n\r]* [\n\r]

DeclarationStatement "Declaration"
  = _ type:Type _ id:Identifier _ EOS _ { return defineVariable(id, type); }
  / _ type:Type _ id:Identifier _ OP_AT _ loc:ConstExpression _ EOS _ { return defineVariable(id, type, 0, loc); }
  / _ type:Type _ id:Identifier _ OP_ASSIGN _ expr:ConstExpression _ EOS _ { return defineVariable(id, type, expr); }
  / _ type:Type _ id:Identifier _ OP_AT _ loc:ConstExpression _ OP_ASSIGN _ expr:ConstExpression _ EOS _ { return defineVariable(id, type, expr, loc); }

AssignmentStatement "Assignment"
  = _ id:Identifier _ OP_ASSIGN _ expr:Expression _ EOS _ {
      return {
          code: [...pushValue(expr).code,
                 `LDI AL, bank(&${id})`,
                 `MOV DB, AL`,
                 `POP A`,
                 `STD A, [addr(&${id})]`,
                ]
      };
  }

ConstExpression "Constant Expression"
  = head:ConstTerm tail:(_ (OP_ADD / OP_SUBTRACT) _ ConstTerm)* {
       return tail.reduce(function(result, element) {
        if (element[1] === "+") {
            return result + element[3];
        }
        if (element[1] === "-") {
            return result - element[3];
        }
      }, head);
  }

ConstTerm "Constant Term"
  = head:ConstFactor tail:(_ (OP_MULTIPLY / OP_DIVIDE) _ ConstFactor)* {
       return tail.reduce(function(result, element) {
        if (element[1] === "*") {
            return result * element[3];
        }
        if (element[1] === "/") {
            return result / element[3];
         }
      }, head);
  }

ConstFactor "Constant Factor"
  = "(" _ expr:ConstExpression _ ")" { return expr; }
  / HexLiteral
  / BinaryLiteral
  / Integer


Expression
  = head:Term tail:(_ (OP_ADD / OP_SUBTRACT) _ Term)* {
       return tail.reduce(function(result, element) {
        if (element[1] === "+") {
            return {
            	code: [
                	...pushValue(result).code,
                    ...pushValue(element[3]).code,
                    `POP B`,
                    `POP A`,
                    `ADD A, B            ; A = A + B`,
                ]
            };
        }
        if (element[1] === "-") {
        }
      }, head);
    }

Term
  = head:Factor tail:(_ (OP_MULTIPLY / OP_DIVIDE) _ Factor)* {
       return tail.reduce(function(result, element) {
        if (element[1] === "*") {
        }
        if (element[1] === "/") {
         }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / ConstExpression
  / HexLiteral
  / BinaryLiteral
  / Integer
  / Identifier

Identifier "identifier"
  = _ StartOfIdentifierChar IdentifierChar* {
    return text().trim();
  }

StartOfIdentifierChar "Start of Identifier"
  = [A-Za-z_]

IdentifierChar "Identifier Character"
  = [A-Za-z0-9_]

Integer "integer"
  = _ "-"? [0-9]+ {
      return Number(text().trim());
  }

HexLiteral "Hexadecimal Literal"
  = _ "0x" hex:HexDigit+ {
      return Number(`0x${hex.join("")}`);
  }

BinaryLiteral "Binary Literal"
  = _ "0b" binary:BinaryDigit+ {
      return Number(`0b${binary.join("")}`);
  }


BinaryDigit "Binary Digit"
 = [0|1]

HexDigit "Hexadecimal Digit"
 = [0-9A-Fa-f]

_ "whitespace"
  = [ \t\n\r]*

EOS "End of Statement"
  = SEMICOLON