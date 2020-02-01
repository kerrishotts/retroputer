block = stmts:(_ stmt __)* { return [...stmts.map(([,stmt,]) => stmt)]; }

stmt = REM
     / DEF
     / FOR / NEXT
     / RETURN
     / LET
     / IF
     / PRINT
     / INPUT
     
//----------------------------------------------------------------------


DEF = kDEF _ kind:(kFN/kSUB) _ name:ident _ LPAREN _ parms:identList? _ RPAREN 
      def:((_ multi:block _ kEND _ (kFN/kSUB)) / single:(_ "=" _ stmt))
      { return [kind, name, parms, def[1] === "=" ? def[3] : def[1] ]}
      
FOR = kFOR _ i:ident _ "=" _ s:expr _ kTO _ e:expr j:(_ kSTEP _ expr)?
      { return ["for", i, s, e, j && j[3]]; }

NEXT = kNEXT _ i:ident? { return ["next", i]; }

LET = (kLET _)? lhs:ident _ "=" _ rhs:expr { return ["let", lhs, rhs]; }

IF = kIF _ e:expr _ kTHEN _ t:block _ o:(kELSE _ block)? _ kEND _ kIF
     { return ["if", e, t, o && o[2]]; }
   / kIF _ e:expr _ kTHEN _ t:stmt __ o:(kELSE _ stmt __)?
     { return ["if", e, t, o && o[2]]; }   
     
PRINT = kPRINT _ opt:(kAT _ list / kTO _ expr)? _ l:formatList?
     { return ["print", [opt && opt[0], opt&& opt[2]], l]; }

INPUT = kINPUT _ opt:(kAT _ list / kFROM _ expr)? _ l:formatList?
     { return ["input", [opt && opt[0], opt && opt[2]], l]; }
     
REM = (kREM/"#") r:$([^\n]*) { return ["rem", r]; }

RETURN = kRETURN _ r:expr { return ["return", r]; }

kDEF = "DEF"i
kEND = "END"i
kFN = "FN"i
kLET = "LET"i
kREM = "REM"i
kRETURN = "RETURN"i
kSUB = "SUB"i
kIF = "IF"i
kFROM = "FROM"i
kTHEN = "THEN"i
kELSE = "ELSE"i
kAND = "AND"i
kOR = "OR"i
kNOT = "NOT"i
kPRINT = "PRINT"i
kINPUT = "INPUT"i
kAT = "AT"i
kTO = "TO"i
kFOR = "FOR"i
kWHILE = "kWHILE"i
kREPEAT = "kREPEAT"i
kUNTIL = "kUNTIL"i
kSTEP = "STEP"i
kNEXT = "NEXT"i
keyword = kDEF / kEND / kFN / kLET / kREM / kRETURN / kSUB / kIF 
        / kTHEN / kELSE / kAND / kOR / kNOT / kPRINT / kAT / kTO
        / kFOR / kWHILE / kREPEAT / kUNTIL / kSTEP / kNEXT / kINPUT
        / kFROM

//----------------------------------------------------------------------

expr = logical

logical = h:comparative _ t:((kAND/kOR) _ comparative)+ { return [h, ...t.map(([o,,r]) => [o, r])]; }
         / comparative

comparative = h:additive _ t:(("!="/"="/"<="/">="/"<>"/"<"/">") _ additive)+ { return [h, ...t.map(([o,,r]) => [o, r])]; }
         / additive

additive = h:multiplicative _ t:(("+"/"-"/"&") _ multiplicative)+ { return [h, ...t.map(([o,,r]) => [o, r])]; }
         / multiplicative
         
multiplicative = h:term _ t:(("*"/"/"/"\\"/"%") _ term)+ { return [h, ...t.map(([o,,r]) => [o, r])]; }
         / term
         
term = number / string
     / call
     / ident
     / LPAREN _ expr:expr _ RPAREN { return expr; }
     
list = head:expr _ tail:(COMMA _ expr)* { return [head, ...tail.map(([,,t]) => t)] };
formatList = head:expr _ tail:((COMMA / SEMI) _ expr)* f:(COMMA/SEMI)? { return [head, ...tail.map(([s,,t]) => [s,t]).flat(), f] };
identList = head:ident _ tail:(COMMA _ ident)* { return [head, ...tail.map(([,,t]) => t)] };

call = fn:ident _ LPAREN _ args:list? _ RPAREN { return ["call", fn, args]; }


//----------------------------------------------------------------------

number "Number" 
       = n:([-+]?[0-9_]+[.]?[0-9_]*("e"i[-+]?[0-9_]+)?) { return Number(text().replace(/\_/, "")); }
       / "0" h:[0-9A-F_]i? "h"i { return Number("0x"+h.join("").replace(/\_/, "")); }
       / b:[0-1_]i+ "b"i { return Number("0b"+b.join("").replace(/\_/, "")); }


string "String"
       = DQUOTE s:[^\"]* DQUOTE { return s.join(""); }

ident "Identifier" = $(!keyword identHead identRest* identSigil*)
                   // keyword { error("Can't use reserved word " + text() + " as identifer"); }
identHead = [A-Z_]i
identRest = [A-Z_0-9]i
identSigil = [!#$%&]

LPAREN = "("
RPAREN = ")"
COMMA = ","
SEMI = ";"
DQUOTE = ["]
__ "End Of Statement" = ([\n]+ / (_ ":" _)+ / REM?)
_ "Whitespace" = [\t\n\ ]* { return ""; }
