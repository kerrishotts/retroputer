{
    const expectedRegister = () => expected("REGISTER");
    const expectedDataRegister = () => expected("DATA_REGISTER");
    const expectedMemoryAddress = () => expected("MEMORY ADDRESS");
    const expectedComma = () => expected("COMMA");
    const expectedExpression = () => expected("EXPRESSION");
    const expectedIdentifier = () => expected("IDENTIFIER");
    const expectedFlag = () => expected("FLAG");
    const expectedQuote = () => expected("QUOTE");
    const expectedStringLiteral = () => expected("STRING");

    const REGISTERS = {
        A: 0,
        AL: 1,
        B: 2,
        BL: 3,
        C: 4,
        CL: 5,
        D: 6,
        DL: 7,
        X: 8,
        XL: 9,
        Y: 10,
        YL: 11,
        BP: 12,
        SP: 14
    };

    const FLAGS = {
        ZERO: 0,
        OVERFLOW: 1,
        CARRY: 2,
        NEGATIVE: 3,
        SINGLE_STEP: 4,
        INTERRUPT_SERVICE: 5,
        INTERRUPT_DISABLE: 6,
        EXCEPTION: 7,
    };

    const OPCODES = {
        NOP: "nop",
        ADD: "add",
        AND: "and",
        CMP: "cmp",
        SUB: "sub",
        OR:  "or",
        TEST:"test",
        XOR: "xor",
        TRAP:"trap",
        NOT: "not",
        NEG: "neg",
        EXC: "exc",
        SHL: "shl",
        SHR: "shr",
        SWAP: "swap",
        MOV: "mov",
        LD: "ld",
        ST: "st",
        INC: "inc",
        IN: "in",
        OUT: "out",
        ENTER: "enter",
        EXIT: "exit",
        BRK: "brk",
        LOOP: "loop", LOOPS: "loops",
        BR: "br", BRS: "brs",
        CALL: "call", CALLS: "calls",
        PUSHALL: "pushall",
        POPALL: "popall",
        PUSHF: "pushf",
        POPF: "popf",
        PUSH: "push",
        POPMM: "popmm",
        PUSHMM: "pushmm",
        POP: "pop",
        RET: "ret",
        MUL: "mul",
        MOD: "mod",
        DIV: "div",
        SMUL: "smul",
        SMOD: "smod",
        SDIV: "sdiv",
        SET: "set",
        CLR: "clr",
        DEC: "dec",
        HALT: "halt",
        WAIT: "wait",
        FCLR:   "fclr",
        FLDR:   "fldr",
        FLDM:   "fldm",
        FLDIM:  "fldim",
        FSTR:   "fstr",
        FSTM:   "fstm",
        FSTIM:  "fstim",
        FADD:   "fadd",
        FSUB:   "fsub",
        FCMP:   "fcmp",
        FMUL:   "fmul",
        FDIV:   "fdiv",
        FMOD:   "fmod",
        FPOW:   "fpow",
        FSQRT:  "fsqrt",
        FABS:   "fabs",
        FSIN:   "fsin",
        FCOS:   "fcos",
        FTAN:   "ftan",
        FASIN:  "fasin",
        FACOS:  "facos",
        FATAN:  "fatan",
        FNEG:   "fneg",
        FEXC:   "fexc",
        FINT:   "fint",
        FISNAN: "fisnan",
        FISINF: "fisinf",
        FLOG2:  "flog2",
        FLOG10: "flog10",
        FLD0:   "fld0",
        FLD1:   "fld1",
        FLDE:   "flde",
        FLDPI:  "fldpi",
    };

    const DIRECTIVES = {
        SEGMENT: ".segment",
        BYTE: ".byte",
        WORD: ".word",
        STRING: ".string",
        APPEND: ".append"
    };

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

    const TOKENS = {
        COMMENT: "comment",
        STRING: "string",
        INTEGER: "integer",
        IDENTIFIER: "identifier",
        REGISTER: "register",
        FLAG: "flag",
        EXPRESSION: "expression",
        BINARY_EXPRESSION: "binary.expression",
        UNARY_EXPRESSION: "unary.expression",
        INSTRUCTION: "instruction",
        SEGMENT_DIRECTIVE: "directive.segment",
        NAMESPACE_DIRECTIVE: "directive.namespace",
        CONST_DIRECTIVE: "directive.const",
        IMPORT_DIRECTIVE: "directive.import",
        BYTE_DIRECTIVE: "directive.byte",
        WORD_DIRECTIVE: "directive.word",
        STRING_DIRECTIVE: "directive.string",
        LABEL: "label",
        MEMORY: "memory",
        BLOCK: "block",
        FUNCTION: "function",
        MACRO_DIRECTIVE: "directive.macro",
        MACRO_EXPANSION: "expand.macro",
        CONDITIONAL: "conditional"
    };

    function tBlock(block) {
        return {
            type: TOKENS.BLOCK,
            block,
            pos: location().start
        };
    }

    function tLiteral(value) {
        return {
            type: typeof value === "string" ? TOKENS.STRING: TOKENS.INTEGER,
            value,
            pos: location().start
        };
    }

    function tIdentifier(ident) {
        return {
            type: TOKENS.IDENTIFIER,
            ident,
            pos: location().start
        };
    }

    function tRegister(idx) {
        return {
            type: TOKENS.REGISTER,
            idx,
            size: 2 - (idx & 0b1),
            pos: location().start
        };
    }

    function tBinaryExpression(head, tail) {
        return tail.reduce(function(result, element) {
            return {
                type: TOKENS.BINARY_EXPRESSION,
                op: element[1],
                l: result,
                r: element[3],
            pos: location().start
            };
        }, head);
    }

    function tUnaryExpression(op, v) {
        return {
            type: TOKENS.UNARY_EXPRESSION,
            op,
            r: v,
            pos: location().start
        };
    }
    
    function tFunction(fn, param) {
        return {
            type: TOKENS.FUNCTION,
            fn,
            param,
            pos: location().start
        };
    }

    function tConditional(conditional) {
        return {
            type: TOKENS.CONDITIONAL,
            conditional
        };
    }

    const MODES = {
        IMMEDIATE: 0b00,
        ABSOLUTE: 0b01,
        BP: 0b10,
        D: 0b11
    };

    function tInstruction(op, {dest, source, m, i, x, y, a, imm, reg, addr, flag, bankReg, offsReg, condition} = {}) {
        return {
            type: TOKENS.INSTRUCTION,
            op,
            dest,
            source,
            m,
            i,
            x,
            y,
            a,
            imm,
            reg,
            addr,
            flag,
            bankReg,
            offsReg,
            pos: location().start,
            condition
        };
    }

    function tNamespace(name, block) {
        return {
            type: TOKENS.NAMESPACE_DIRECTIVE,
            name,
            block,
            pos: location().start
        };
    }

    function tConstant(name, expr) {
        return {
            type: TOKENS.CONST_DIRECTIVE,
            name,
            value: expr,
            pos: location().start
        };
    }

    function tSegment(name, addr, append, block) {
        return {
            type: TOKENS.SEGMENT_DIRECTIVE,
            name,
            addr,
            append,
            block,
            pos: location().start
        };
    }

    function tImport(path) {
        return {
            type: TOKENS.IMPORT_DIRECTIVE,
            path,
            pos: location().start
        };
    }

    function tDataDirective(which, data, size = -1) {
        return {
            type: which,
            data,
            size,
            pos: location().start
        };
    }

    function tComment(comment) {
        return {
            type: TOKENS.COMMENT,
            comment,
            pos: location().start
        };
    }

    function tLabel(name) {
        return {
            type: TOKENS.LABEL,
            name,
            pos: location().start
        };
    }

    function tFlag(flag, neg) {
        return {
            type: TOKENS.FLAG,
            flag,
            neg,
            pos: location().start
        };
    }

    function addressingMode({addr, m, x, y, i}, srce = {}) {
        return Object.assign({}, srce, {
            type: TOKENS.MEMORY,
            addr,
            m,
            x,
            y,
            i,
            pos: location().start
        });
    }
    
    function tMacroDirective(name, params, ast) {
    	return {
        	type: TOKENS.MACRO_DIRECTIVE,
            name,
            params,
            ast
        };
    }
    
    function tMacroExpansion(name, args) {
    	return {
        	type: TOKENS.MACRO_EXPANSION,
            name,
            args
        };
    }

    const hlScopes = [];
    function newScope() {
        hlScopes.unshift({});
    } 
    function exitScope() {
        hlScopes.shift(); 
    }

    const uniqNames = {};
    function uniqIdent(ident) {
        if (!uniqIdent[ident]) {
            uniqIdent[ident] = [];
        }
        if (!hlScopes[0][ident]) {
            hlScopes[0][ident] = [];
        }
        const newIdent = `${ident}__${uniqIdent[ident].length.toString(16).padStart(8, "0")}`;
        uniqIdent[ident].unshift(newIdent);
        hlScopes[0][ident].unshift(newIdent);

        return newIdent;
    }

    function getIdentInScope(ident) {
        if (hlScopes.length < 1) {
            error(`No current scope exists to perform rewrite; couldn't find ${ident}`);
        }
        for (let i = 0; i < hlScopes.length; i++) {
            const curScope = hlScopes[0];
            const curIdents = curScope[ident];
            if (curIdents) {
                return curIdents[0];
            }
        }
        return ident;
        error(`Rewrite failed; couldn't find ${ident} in scope.`);
    }

    function rewriteIdents(ast) {
        if (!ast) return;

        if (ast.type === TOKENS.IDENTIFIER) {
            if (ast.ident.startsWith("__")) {
                ast.ident = getIdentInScope(ast.ident);
            }
            return ast;
        }

        if (Array.isArray(ast)) {
            for (let i = 0; i < ast.length; i++) {
                rewriteIdents(ast[i]);
            }
            return ast;
        }

        if (typeof ast === "object") {
            if (ast && ast.type) {
                for (let k of Object.keys(ast)) {
                    if (typeof ast[k] === "object") {
                        rewriteIdents(ast[k]);
                    }
                }
            }
            return ast;
        }

        return ast;
    }
}

Program "Program"
= parts:TopLevel* { return parts.filter(part => part !== null); }

TopLevel
= _ l:dSegment _ { return l; }
/ _ l:dImport _ { return l; }
/ _ l:dNamespace _ { return l; }
/ _ l:dMacro _ { return l; }
/ _ l:MacroExpansion _ { return l; }
/ _ l:COMMENT _ { return l; }
/ _ EOL _ { return null; }

Block "Block"
= _ LCURLY lines:Line* RCURLY _ { return tBlock(lines.flat().filter(line => !!line)); }

Line "Line"
= _ EOL _ { return null; }
/ Block
/ _ label:Label? _ content:(hlStatement/ Instruction / Directive / Block)? _ c:COMMENT? _ EOL _ { return [label, content, c].filter(e => e !== null); }
/ _ l:MacroExpansion _ { return l; }
// / !(RCURLY / EOL).+ { expected("BLOCK, LABEL, INSTRUCTION, DIRECTIVE, or COMMENT")}

//
// High Level Statements
////////////////////////////////////////

hlStatement = hlIF / hlDO / hlBreak / hlContinue

hlElse
= _ ELSE _ e:Block _ { return e; }

hlBreak
= _ BREAK _ {
    return tInstruction("br", {
        flag: null,
        addr: addressingMode({ addr: tIdentifier("__end"), m: 0 })
    });
}

hlContinue
= _ CONTINUE _ {
    return tInstruction("br", {
        flag: null,
        addr: addressingMode({ addr: tIdentifier("__begin"), m: 0 })
    });
}

hlIF
= _ IF _ f:(AllFlags / AllConditionals) _ t:Block _ e:hlElse? {
    newScope();
    const THEN = uniqIdent("__then");
    const ELSE = uniqIdent("__else");
    const ENDIF = uniqIdent("__endif");
    const ast = tBlock([
        tInstruction("br", {
            [f.type === "flag" ? "flag" : "condition"]: f,
            addr: addressingMode({ addr: tIdentifier(THEN), m: 0 })
        }),
        tInstruction("br", {
            flag: null,
            addr: addressingMode({ addr: e ? tIdentifier(ELSE) : tIdentifier(ENDIF), m: 0 })
        }),
        tLabel(tIdentifier(THEN)),
        rewriteIdents(t),
        ...(e ? [
            tInstruction("br", {
                flag: null,
                addr: addressingMode({ addr: tIdentifier(ENDIF), m: 0 })
            }),
            tLabel(tIdentifier(ELSE)),
            rewriteIdents(e)
        ] : []),
        tLabel(tIdentifier(ENDIF))
    ]);
    exitScope();
    return ast;
}
hlDO
= _ DO _ l:Block _ WHILE _ f:(AllFlags / AllConditionals) _ {
    newScope();
    const BEGIN = uniqIdent("__begin");
    const END = uniqIdent("__end");
    const ast = tBlock([
        tLabel(tIdentifier(BEGIN)),
        rewriteIdents(l),
        tInstruction("br", {
            [f.type==="flag" ? "flag" : "condition"]: f,
            addr: addressingMode({ addr: tIdentifier(BEGIN), m: 0 })
        }),
        tLabel(tIdentifier(END)),
    ]);
    exitScope();
    return ast;
}
/ _ WHILE _ f:(AllFlags / AllConditionals) _ DO _ l:Block _ {
    newScope();
    const BEGIN = uniqIdent("__begin");
    const END = uniqIdent("__end");
    const DO = uniqIdent("__do");
    const ast = tBlock([
        tLabel(tIdentifier(BEGIN)),
        tInstruction("br", {
            [f.type==="flag" ? "flag" : "condition"]: f,
            addr: addressingMode({ addr: tIdentifier(DO), m: 0 })
        }),
        tInstruction("br", {
            flag: null,
            addr: addressingMode({ addr: tIdentifier(END), m: 0 })
        }),
        tLabel(tIdentifier(DO)),
        rewriteIdents(l),
        tInstruction("br", {
            flag: null,
            addr: addressingMode({ addr: tIdentifier(BEGIN), m: 0 })
        }),
        tLabel(tIdentifier(END)),
    ]);
    exitScope();
    return ast;
}

//
// AST for Macro handling
AST
= Register
/ AllFlags
/ AllConditionals
/// / CommaSepStringOrConstantExpressions
/ StringOrConstantExpression
/ MemoryAddressingMode
/ BranchAddressingMode
/ Line
/ Program

ASTList = h:AST? _ t:(COMMA _ AST _)* {
    return [h, ...t.map(([,,a,]) => a)].filter(n => n !== null);
}

IdentifierList = h:Identifier? _ t:(COMMA _ Identifier _)* {
    return [h, ...t.map(([,,a,]) => a)].filter(n => n !== null);
}

MacroExpansion = name:Identifier _ LPAREN _ args:ASTList _ RPAREN {
    return tMacroExpansion(name, args);
}

//
// Directives
////////////////////////////////////////

Directive "Directive"
= dSegment / dByte / dWord / dString / dConstant / dImport / dNamespace / dMacro

dSegment "Segment Directive"
= SEGMENT _ name:Identifier _ addr:Expression _ append:APPEND? _ block:Block
{
    return tSegment(name, addr, !!append, block);
}

dNamespace "Namespace Directive"
= NAMESPACE _ name:Identifier _ block:Block
{
    return tNamespace(name, block);
}

dConstant "Constant Directive"
= CONST _ name:Identifier _ expr:Expression { return tConstant(name, expr); }

dImport "Import Directive"
= IMPORT _ path:StringLiteral { return tImport(path); }

dByte "Byte Directive"
= BYTE _ size:ARRAY _ data:CommaSepExpressions? { return tDataDirective(TOKENS.BYTE_DIRECTIVE, data, size); }
/ BYTE _ data:CommaSepExpressions       { return tDataDirective(TOKENS.BYTE_DIRECTIVE, data); }

dWord "Word Directive"
= WORD _ size:ARRAY _ data:CommaSepExpressions? { return tDataDirective(TOKENS.WORD_DIRECTIVE, data, size); }
/ WORD _ data:CommaSepExpressions       { return tDataDirective(TOKENS.WORD_DIRECTIVE, data); }

dString "String Directive"
= STRING _ data:CommaSepStringOrConstantExpressions {
    return tDataDirective(TOKENS.STRING_DIRECTIVE, data);
}

dMacro "Macro Directive"
= MACRO _ name:Identifier _ LPAREN _ params:IdentifierList _ RPAREN _ ast:AST {
	return tMacroDirective(name, params, ast);
}


SEGMENT "Segment"       = ".segment"i
BYTE "Byte"             = ".byte"i
WORD "Word"             = ".word"i
STRING "String"         = ".string"i
APPEND "Append"         = ".append"i
CONST "Constant"        = ".const"i
IMPORT "Import"         = ".import"i
NAMESPACE "Namespace"   = ".namespace"i
ARRAY "Array" = LBRACKET _ size:Expression _ RBRACKET { return size; }
MACRO "Macro"           = ".macro"i
                        / ".define"i

DirectiveKeywords = SEGMENT / BYTE / WORD / STRING / APPEND / CONST / IMPORT / NAMESPACE / ARRAY / MACRO

ExpectedAssembly "Expected Assembly"
= "{" bytes:(_ Integer)* "}" {
    return bytes.map(([, byte]) => byte);
}

Instruction "Instruction"
= ins:(iNOP / iADD / iAND / iCMP / iSUB / iOR
/ iTEST / iXOR / iTRAP / iNOT / iNEG / iEXC
/ iSHL / iSHR / iSWAP / iMOV
/ iLOAD / iSTORE / iINC / iIN / iOUT
/ iENTER / iEXIT / iBRK / iLOOP / iBR
/ iCALL / iPUSHALL / iPOPALL / iPUSHF / iPOPMM / iPUSHMM
/ iPOPF / iPUSH / iPOP / iRET / iMUL
/ iMOD / iDIV / iSMUL / iSMOD / iSDIV
/ iSET / iCLR / iDEC / iHALT / iWAIT
/ iFCLR / iFADD / iFSUB / iFCMP / iFMUL / iFMOD / iFDIV
/ iFPOW / iFSQRT / iFNEG / iFEXC / iFINT / iFABS / iFSIN
/ iFCOS / iFTAN / iFASIN / iFACOS / iFATAN / iFISNAN / iFISINF
/ iFLOG2 / iFLOG10 / iFLD0 / iFLD1 / iFLDE / iFLDPI
/ iFLDR / iFLDM / iFLDIM / iFSTR / iFSTM / iFSTIM) _ bytes:ExpectedAssembly? {
    if (bytes) {
        ins.bytes = bytes;
    }
    return ins;
}

//
// Instruction Definitions
////////////////////////////////////////
iNOP     "No Operation Instruction" = op:NOP { return tInstruction(op); }
iBRK     "Break Instruction"        = op:BRK { return tInstruction(op); }
iHALT    "Halt Instruction"         = op:HALT { return tInstruction(op); }
iPUSHALL "Push All instruction"     = op:PUSHALL { return tInstruction(op); }
iPOPALL  "Pop All Instruction"      = op:POPALL { return tInstruction(op); }
iPUSHF   "Push Flags Instruction"   = op:PUSHF { return tInstruction(op); }
iPOPF    "Pop Flags Instruction"    = op:POPF { return tInstruction(op); }
iPUSHMM  "Push MM Instruction"      = op:PUSHMM { return tInstruction(op); }
iPOPMM   "Pop MM Instruction"       = op:POPMM { return tInstruction(op); }
iRET     "Return Instruction"       = op:RET { return tInstruction(op); }

iLOAD "Load Instruction"
= LD _ !Register { expectedRegister() }
/ LD _ Register _ !COMMA { expectedComma() }
/ LD _ Register _ COMMA _ !MemoryAddressingMode { expectedMemoryAddress() }
/ op:LD _ dest:Register _ COMMA _ source:MemoryAddressingMode { return tInstruction(op, {dest, source}); }
/ dest:Register _ OP_TAKES _ source:MemoryAddressingMode { return tInstruction(OPCODES.LD, {dest, source}); }


iSTORE "Store Instruction"
= op:ST _ dest:MemoryAddressingMode _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ dest:MemoryAddressingMode _ OP_TAKES _ source:Register { return tInstruction(OPCODES.ST, {dest, source}); }
/ ST _ MemoryAddressingMode _ COMMA _ !Register { expectedRegister() }
/ ST _ MemoryAddressingMode _ !COMMA { expectedRegister() }
/ ST _ !MemoryAddressingMode { expectedMemoryAddress() }

iLOOP "Loop Instruction"
= op:LOOPS _ addr:BranchAddressingMode _ COMMA _ reg:Register { return tInstruction(op, {addr, reg}); }
/ op:LOOP _ addr:BranchAddressingMode _ COMMA _ reg:Register { return tInstruction(op, {addr, reg}); }
/ LOOPS _ BranchAddressingMode _ COMMA _ !Register { expectedRegister() }
/ LOOP _ BranchAddressingMode _ COMMA _ !Register { expectedRegister() }
/ LOOPS _ BranchAddressingMode _ !COMMA { expectedComma() }
/ LOOP _ BranchAddressingMode _ !COMMA { expectedComma() }
/ LOOPS _ !BranchAddressingMode { expectedMemoryAddress() }
/ LOOP _ !BranchAddressingMode { expectedMemoryAddress() }

iCALL "Call Instruction"
= op:CALLS _ flag:AllFlags? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, flag}); }
/ op:CALLS _ condition:AllConditionals? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, condition}); }
/ op:CALL _ flag:AllFlags? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, flag}); }
/ op:CALL _ condition:AllConditionals? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, condition}); }
/ CALLS _ AllFlags? _ !BranchAddressingMode { expectedMemoryAddress() }
/ CALLS _ AllConditionals? _ !BranchAddressingMode { expectedMemoryAddress() }
/ CALL _ AllFlags? _ !BranchAddressingMode { expectedMemoryAddress() }
/ CALL _ AllConditionals? _ !BranchAddressingMode { expectedMemoryAddress() }

iBR "Branch Instruction"
= op:BRS _ flag:AllFlags? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, flag}); }
/ op:BRS _ condition:AllConditionals? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, condition}); }
/ op:BR _ flag:AllFlags? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, flag}); }
/ op:BR _ condition:AllConditionals? _ COMMA? _ addr:BranchAddressingMode { return tInstruction(op, {addr, condition}); }
/ BRS _ AllFlags? _ !BranchAddressingMode { expectedMemoryAddress() }
/ BRS _ AllConditionals? _ !BranchAddressingMode { expectedMemoryAddress() }
/ BR _ AllFlags? _ !BranchAddressingMode { expectedMemoryAddress() }
/ BR _ AllConditionals? _ !BranchAddressingMode { expectedMemoryAddress() }

iADD "Add Instruction"
= op:ADD _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:ADD _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ ADD _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ ADD _ Register _ !COMMA { expectedComma() }
/ ADD _ !Register { expectedRegister() }

iAND "And Instruction"
= op:AND _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:AND _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ AND _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ AND _ Register _ !COMMA { expectedComma() }
/ AND _ !Register { expectedRegister() }

iCMP "Compare Instruction"
= op:CMP _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:CMP _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ CMP _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ CMP _ Register _ !COMMA { expectedComma() }
/ CMP _ !Register { expectedRegister() }

iSUB "Subtract Instruction"
= op:SUB _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:SUB _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ SUB _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ SUB _ Register _ !COMMA { expectedComma() }
/ SUB _ !Register { expectedRegister() }

iOR "Or Instruction"
= op:OR _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:OR _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ OR _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ OR _ Register _ !COMMA { expectedComma() }
/ OR _ !Register { expectedRegister() }

iXOR "Exclusive Or Instruction"
= op:XOR _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:XOR _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ XOR _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ XOR _ Register _ !COMMA { expectedComma() }
/ XOR _ !Register { expectedRegister() }

iTEST "Test Instruction"
= op:TEST _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:TEST _ dest:GeneralRegister _ COMMA _ imm:Expression { return tInstruction(op, {dest, imm}); }
/ TEST _ NonGeneralRegister _ COMMA _ Expression { expectedDataRegister() }
/ TEST _ Register _ !COMMA { expectedComma() }
/ TEST _ !Register { expectedRegister() }

iSHL "Shift Left Instruction"
= op:SHL _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:SHL _ dest:Register _ COMMA _ imm:Immediate4 { return tInstruction(op, {dest, imm}); }

iSHR "Shift Right Instruction"
= op:SHR _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ op:SHR _ dest:Register _ COMMA _ imm:Immediate4 { return tInstruction(op, {dest, imm}); }

iDIV "Divide Instruction"
= op:DIV _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ DIV _ Register _ COMMA _ Expression { expectedRegister() }

iMUL "Multiply Instruction"
= op:MUL _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ MUL _ Register _ COMMA _ Expression { expectedRegister() }

iMOD "Modulo Instruction"
= op:MOD _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ MOD _ Register _ COMMA _ Expression { expectedRegister() }

iSDIV "Signed Divide Instruction"
= op:SDIV _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ SDIV _ Register _ COMMA _ Expression { expectedRegister() }

iSMUL "Signed Multiply Instruction"
= op:SMUL _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ SMUL _ Register _ COMMA _ Expression { expectedRegister() }

iSMOD "Signed Modulo Instruction"
= op:SMOD _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
/ SMOD _ Register _ COMMA _ Expression { expectedRegister() }

iSWAP "Swap Instruction"
= op:SWAP _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }

iMOV "Move Instruction"
= op:MOV _ dest:Register _ COMMA _ source:Register { return tInstruction(op, {dest, source}); }
// / op:LD _ dest:Register _ COMMA _ source:Register { return tInstruction(OPCODES.MOV, {dest, source}); }
// / op:ST _ dest:Register _ COMMA _ source:Register { return tInstruction(OPCODES.MOV, {dest, source}); }
/ dest:Register _ OP_TAKES _ source:Register  { return tInstruction(OPCODES.MOV, {dest, source}); }

iNOT "Not Instruction"
= op:NOT _ reg:Register { return tInstruction(op, {reg}); }

iNEG "Negate Instruction"
= op:NEG _ reg:Register { return tInstruction(op, {reg}); }

iEXC "Exchange Halves Instruction"
= op:EXC _ reg:Register { return tInstruction(op, {reg}); }

iTRAP "Trap Instruction"
= op:TRAP _ reg:Register { return tInstruction(op, {reg}); }
/ op:TRAP _ imm:Immediate8 { return tInstruction(op, {imm}); }

iIN "In Instruction"
= op:IN _ reg:Register _ COMMA _ imm:Immediate8 { return tInstruction(op, {reg, imm}); }

iOUT "OUT Instruction"
= op:OUT _ imm:Immediate8 _ COMMA _ reg:Register { return tInstruction(op, {reg, imm}); }

iENTER "Enter Instruction"
= op:ENTER _ imm:Immediate8 { return tInstruction(op, {imm}); }

iEXIT "Exit Instruction"
= op:EXIT _ imm:Immediate8 { return tInstruction(op, {imm}); }

iWAIT "Wait Instruction"
= op:WAIT _ imm:Immediate8 { return tInstruction(op, {imm}); }

iSET "Set Instruction"   = op:SET _ flag:Flags { return tInstruction(op, {flag}); }
iCLR "Clear Instruction" = op:CLR _ flag:Flags { return tInstruction(op, {flag}); }

iINC "Increment Instruction" = op:INC _ reg:Register { return tInstruction(op, {reg}); }
iDEC "Decrement Instruction" = op:DEC _ reg:Register { return tInstruction(op, {reg}); }
iPUSH "Push Instruction"     = op:PUSH _ reg:Register { return tInstruction(op, {reg}); }
iPOP "Pop Instruction"       = op:POP _ reg:Register { return tInstruction(op, {reg}); }

//
// Floating Point Instructions
////////////////////////////////////////
iFCLR    "FP Clear"                 = op:FCLR   { return tInstruction(op); }
iFLDR    "FP Load Register"         = op:FLDR _ reg:Register  { return tInstruction(op, {reg}); }
iFLDM    "FP Load Memory"           = op:FLDM _ addr:FPAbsolute { return tInstruction(op, {bankReg: addr.bank, offsReg: addr.offs, immediate: addr.immediate}); }
iFLDIM   "FP Load Indirect"         = op:FLDIM _ addr:FPIndirect  { return tInstruction(op, {bankReg: addr.bank, offsReg: addr.offs, immediate: addr.immediate}); }
iFSTR    "FP Store Register"        = op:FSTR _ reg:Register  { return tInstruction(op, {reg}); }
iFSTM    "FP Store Memory"          = op:FSTM _ addr:FPAbsolute { return tInstruction(op, {bankReg: addr.bank, offsReg: addr.offs, immediate: addr.immediate}); }
iFSTIM   "FP Store Indirect"        = op:FSTIM _ addr:FPIndirect  { return tInstruction(op, {bankReg: addr.bank, offsReg: addr.offs, immediate: addr.immediate}); }
iFADD    "FP Add"                   = op:FADD   { return tInstruction(op); }
iFSUB    "FP Subtract"              = op:FSUB   { return tInstruction(op); }
iFCMP    "FP Compare"               = op:FCMP   { return tInstruction(op); }
iFMUL    "FP Multiply"              = op:FMUL   { return tInstruction(op); }
iFMOD    "FP Modulo"                = op:FMOD   { return tInstruction(op); }
iFDIV    "FP Divide"                = op:FDIV   { return tInstruction(op); }
iFABS    "FP Absolute Value"        = op:FABS   { return tInstruction(op); }
iFPOW    "FP Power"                 = op:FPOW   { return tInstruction(op); }
iFSQRT   "FP Square Root"           = op:FSQRT  { return tInstruction(op); }
iFSIN    "FP Sine"                  = op:FSIN   { return tInstruction(op); }
iFCOS    "FP Cosine"                = op:FCOS   { return tInstruction(op); }
iFTAN    "FP Tangent"               = op:FTAN   { return tInstruction(op); }
iFASIN   "FP Arc Sine"              = op:FASIN  { return tInstruction(op); }
iFACOS   "FP Arc Cosine"            = op:FACOS  { return tInstruction(op); }
iFATAN   "FP Arc Tangent"           = op:FATAN  { return tInstruction(op); }
iFNEG    "FP Negate"                = op:FNEG   { return tInstruction(op); }
iFEXC    "FP Exchange"              = op:FEXC   { return tInstruction(op); }
iFINT    "FP To Int"                = op:FINT   { return tInstruction(op); }
iFISNAN  "FP Is NaN"                = op:FISNAN { return tInstruction(op); }
iFISINF  "FP Is Infinite"           = op:FISINF { return tInstruction(op); }
iFLOG2   "FP Log 2"                 = op:FLOG2  { return tInstruction(op); }
iFLOG10  "FP Log 10"                = op:FLOG10 { return tInstruction(op); }
iFLD0    "FP Load 0"                = op:FLD0   { return tInstruction(op); }
iFLD1    "FP Load 1"                = op:FLD1   { return tInstruction(op); }
iFLDE    "FP Load E"                = op:FLDE   { return tInstruction(op); }
iFLDPI   "FP Load Pi"               = op:FLDPI  { return tInstruction(op); }

//
// Keyword Definitions
////////////////////////////////////////
ADD   "Add"           = "ADD"i !IdentifierPart { return OPCODES.ADD; }
AND   "And"           = "AND"i !IdentifierPart { return OPCODES.AND; }
BRK   "Break"         = "BRK"i !IdentifierPart { return OPCODES.BRK; }
BR    "Branch"        = "BR"i !IdentifierPart { return OPCODES.BR; }
BRS   "Branch Short"  = "BRS"i !IdentifierPart { return OPCODES.BRS; }
CALL  "Call"          = "CALL"i !IdentifierPart { return OPCODES.CALL; }
CALLS "Call Short"    = "CALLS"i !IdentifierPart { return OPCODES.CALLS; }
CLR   "Clear"         = "CLR"i !IdentifierPart { return OPCODES.CLR; }
CMP   "Compare"       = "CMP"i !IdentifierPart { return OPCODES.CMP; }
DEC   "Decrement"     = "DEC"i !IdentifierPart { return OPCODES.DEC; }
DIV   "Divide"        = "DIV"i !IdentifierPart { return OPCODES.DIV; }
ENTER "Enter Frame"   = "ENTER"i !IdentifierPart { return OPCODES.ENTER; }
EXC   "Exchange"      = "EXC"i !IdentifierPart { return OPCODES.EXC; }
EXIT  "Exit Frame"    = "EXIT"i !IdentifierPart { return OPCODES.EXIT; }
HALT  "Halt"          = "HALT"i !IdentifierPart { return OPCODES.HALT; }
LD    "Load"          = "LD"i !IdentifierPart { return OPCODES.LD; }
LOOP  "Loop"          = "LOOP"i !IdentifierPart { return OPCODES.LOOP; }
LOOPS "Loop Short"    = "LOOPS"i !IdentifierPart { return OPCODES.LOOPS; }
IN    "In"            = "IN"i !IdentifierPart { return OPCODES.IN; }
INC   "Increment"     = "INC"i !IdentifierPart { return OPCODES.INC; }
MOD   "Modulo"        = "MOD"i !IdentifierPart { return OPCODES.MOD; }
MOV   "Move"          = "MOV"i !IdentifierPart { return OPCODES.MOV; }
MUL   "Multiply"      = "MUL"i !IdentifierPart { return OPCODES.MUL; }
NEG   "Negate"        = "NEG"i !IdentifierPart { return OPCODES.NEG; }
NOP   "No Operation"  = "NOP"i !IdentifierPart { return OPCODES.NOP; }
NOT   "Not"           = "NOT"i !IdentifierPart { return OPCODES.NOT; }
OR    "Or"            = "OR"i !IdentifierPart { return OPCODES.OR; }
OUT   "Out"           = "OUT"i !IdentifierPart { return OPCODES.OUT; }
POP   "Pop"           = "POP"i !IdentifierPart { return OPCODES.POP; }
POPALL "Pop All"      = "POPALL"i !IdentifierPart { return OPCODES.POPALL; }
POPF  "Pop Flags"     = "POPF"i !IdentifierPart { return OPCODES.POPF; }
PUSH  "Push"          = "PUSH"i !IdentifierPart { return OPCODES.PUSH; }
PUSHALL "Push All"    = "PUSHALL"i !IdentifierPart { return OPCODES.PUSHALL; }
PUSHF "Push Flags"    = "PUSHF"i !IdentifierPart { return OPCODES.PUSHF; }
PUSHMM "Push MM"      = "PUSHMM"i !IdentifierPart { return OPCODES.PUSHMM; }
POPMM "Pop MM"        = "POPMM"i !IdentifierPart { return OPCODES.POPMM; }
RET   "Return"        = "RET"i !IdentifierPart { return OPCODES.RET; }
SDIV  "Signed Divide" = "SDIV"i !IdentifierPart { return OPCODES.SDIV; }
SET   "Set"           = "SET"i !IdentifierPart { return OPCODES.SET; }
SHL   "Shift Left"    = "SHL"i !IdentifierPart { return OPCODES.SHL; }
SHR   "Shift Right"   = "SHR"i !IdentifierPart { return OPCODES.SHR; }
SMOD  "Signed Modulo" = "SMOD"i !IdentifierPart { return OPCODES.SMOD; }
SMUL  "Signed Multiply"="SMUL"i !IdentifierPart { return OPCODES.SMUL; }
ST    "Store"         = "ST"i !IdentifierPart { return OPCODES.ST; }
SUB   "Subtract"      = "SUB"i !IdentifierPart { return OPCODES.SUB; }
SWAP  "Swap"          = "SWAP"i !IdentifierPart { return OPCODES.SWAP; }
TEST  "Test"          = "TEST"i !IdentifierPart { return OPCODES.TEST; }
TRAP  "Trap"          = "TRAP"i !IdentifierPart { return OPCODES.TRAP; }
WAIT  "Wait"          = "WAIT"i !IdentifierPart { return OPCODES.WAIT; }
XOR   "Exclusive Or"  = "XOR"i !IdentifierPart { return OPCODES.XOR; }

FCLR    "FP Clear"      = "FCLR"i   !IdentifierPart { return OPCODES.FCLR; }
FLDR    "FP Load Reg"   = "FLDR"i   !IdentifierPart { return OPCODES.FLDR; }
FLDM    "FP Load Memory"= "FLDM"i   !IdentifierPart { return OPCODES.FLDM; }
FLDIM   "FP Load Indir."= "FLDIM"i  !IdentifierPart { return OPCODES.FLDIM; }
FSTR    "FP Store Reg"  = "FSTR"i   !IdentifierPart { return OPCODES.FSTR; }
FSTM    "FP Store Mem"  = "FSTM"i   !IdentifierPart { return OPCODES.FSTM; }
FSTIM   "FP Store Indir"= "FSTIM"i  !IdentifierPart { return OPCODES.FSTIM; }
FADD    "FP Add"        = "FADD"i   !IdentifierPart { return OPCODES.FADD; }
FSUB    "FP Subtract"   = "FSUB"i   !IdentifierPart { return OPCODES.FSUB; }
FCMP    "FP Compare"    = "FCMP"i   !IdentifierPart { return OPCODES.FCMP; }
FMUL    "FP Multiply"   = "FMUL"i   !IdentifierPart { return OPCODES.FMUL; }
FDIV    "FP Divide"     = "FDIV"i   !IdentifierPart { return OPCODES.FDIV; }
FMOD    "FP Modulo"     = "FMOD"i   !IdentifierPart { return OPCODES.FMOD; }
FPOW    "FP Power"      = "FPOW"i   !IdentifierPart { return OPCODES.FPOW; }
FSQRT   "FP Square Root"= "FSQRT"i  !IdentifierPart { return OPCODES.FSQRT; }
FABS    "FP ABS"        = "FABS"i   !IdentifierPart { return OPCODES.FABS; }
FSIN    "FP Sine"       = "FSIN"i   !IdentifierPart { return OPCODES.FSIN; }
FCOS    "FP Cosine"     = "FCOS"i   !IdentifierPart { return OPCODES.FCOS; }
FTAN    "FP Tangent"    = "FTAN"i   !IdentifierPart { return OPCODES.FTAN; }
FASIN   "FP Arc Sine"   = "FASIN"i  !IdentifierPart { return OPCODES.FASIN; }
FACOS   "FP Arc Cosine" = "FACOS"i  !IdentifierPart { return OPCODES.FACOS; }
FATAN   "FP Arc Tangent"= "FATAN"i  !IdentifierPart { return OPCODES.FATAN; }
FNEG    "FP Negate"     = "FNEG"i   !IdentifierPart { return OPCODES.FNEG; }
FEXC    "FP Exchange"   = "FEXC"i   !IdentifierPart { return OPCODES.FEXC; }
FINT    "FP To Int"     = "FINT"i   !IdentifierPart { return OPCODES.FINT; }
FISNAN  "FP Is NaN"     = "FISNAN"i !IdentifierPart { return OPCODES.FISNAN; }
FISINF  "FP Is Infinite"= "FISINF"i !IdentifierPart { return OPCODES.FISINF; }
FLOG2   "FP Log 2"      = "FLOG2"i  !IdentifierPart { return OPCODES.FLOG2; }
FLOG10  "FP Log 10"     = "FLOG10"i !IdentifierPart { return OPCODES.FLOG10; }
FLD0    "FP Load 0"     = "FLD0"i   !IdentifierPart { return OPCODES.FLD0; }
FLD1    "FP Load 1"     = "FLD1"i   !IdentifierPart { return OPCODES.FLD1; }
FLDE    "FP Load E"     = "FLDE"i   !IdentifierPart { return OPCODES.FLDE; }
FLDPI   "FP Load PI"    = "FLDPi"i  !IdentifierPart { return OPCODES.FLDPI; }

IF    "IF"            = "IF"i !IdentifierPart { return "IF"; }
ELSE  "ELSE"          = "ELSE"i !IdentifierPart { return "ELSE"; }
DO    "DO"            = "DO"i !IdentifierPart { return "DO"; }
WHILE "WHILE"         = "WHILE"i !IdentifierPart { return "WHILE"; }
BREAK "BREAK"         = "BREAK"i !IdentifierPart { return "BREAK"; }
CONTINUE "CONTINUE"   = "CONTINUE"i !IdentifierPart { return "CONTINUE"; }
ADDRBANK "ADDRBANK"   = "ADDRBANK"i !IdentifierPart { return "ADDRBANK"; }
                      / "ADDRBH"i !IdentifierPart { return "ADDRBANK"; }
ADDRBOFS "ADDRBOFS"   = "ADDRBOFS"i !IdentifierPart { return "ADDRBOFS"; }
                      / "ADDRBL"i !IdentifierPart { return "ADDRBOFS"; }
ADDRPAGE "ADDRPAGE"   = "ADDRPAGE"i !IdentifierPart { return "ADDRPAGE"; }
                      / "ADDRPH"i !IdentifierPart { return "ADDRPAGE"; }
ADDRPOFS "ADDRPOFS"   = "ADDRPOFS"i !IdentifierPart { return "ADDRPOFS"; }
                      / "ADDRPL"i !IdentifierPart { return "ADDRPOFS"; }

ASC "ASC"             = "ASC"i !IdentifierPart { return "ASC"; }
NEXT "NEXT"           = "NEXT"i !IdentifierPart { return "NEXT"; }



Keyword "Keyword"
= ADD / AND / BRK / BRS / BR / CALLS / CALL
/ CLR / CMP / DEC / DIV / ENTER / EXC
/ EXIT / LD / LOOPS / LOOP / INC / IN / MOD
/ MOV / MUL / NEG / NOP / NOT / OR / OUT
/ POPALL / POPF / POP / PUSHALL / PUSHF
/ POPMM / PUSHMM
/ PUSH / RET / SDIV / SET / SMOD / SMUL
/ SHL / SHR / ST / SUB / SWAP / TEST
/ TRAP / XOR
/ IF / ELSE / DO / WHILE / BREAK / CONTINUE
/ WAIT / HALT
/ Function
/ DirectiveKeywords
/ FloatingPointKeyword

FloatingPointKeyword "Floating Point Keyword"
= FCLR / FLDR / FLDM / FLDIM / FSTR / FSTM / FSTIM
/ FADD / FSUB / FCMP / FMUL / FMOD / FDIV / FPOW / FSQRT
/ FABS / FSIN / FCOS / FTAN / FASIN / FACOS / FATAN
/ FNEG / FEXC / FINT / FISNAN / FISINF / FLOG2 / FLOG10
/ FLD0 / FLD1 / FLDE / FLDPI

Function "Function"
= ADDRBANK / ADDRBOFS / ADDRPAGE / ADDRPOFS
/ ASC / NEXT


//
// Register Definitions
////////////////////////////////////////
rA  "A Register"    = "A"i  !IdentifierPart { return tRegister(REGISTERS.A) }
rAL "AL Register"   = "AL"i !IdentifierPart { return tRegister(REGISTERS.AL) }
rB  "B Register"    = "B"i  !IdentifierPart { return tRegister(REGISTERS.B) }
rBL "BL Register"   = "BL"i !IdentifierPart { return tRegister(REGISTERS.BL) }
rC  "C Register"    = "C"i  !IdentifierPart { return tRegister(REGISTERS.C) }
rCL "CL Register"   = "CL"i !IdentifierPart { return tRegister(REGISTERS.CL) }
rD  "D Register"    = "D"i  !IdentifierPart { return tRegister(REGISTERS.D) }
rDL "DL Register"   = "DL"i !IdentifierPart { return tRegister(REGISTERS.DL) }
rX  "X Register"    = "X"i  !IdentifierPart { return tRegister(REGISTERS.X) }
rXL "XL Register"   = "XL"i !IdentifierPart { return tRegister(REGISTERS.XL) }
rY  "Y Register"    = "Y"i  !IdentifierPart { return tRegister(REGISTERS.Y) }
rYL "YL Register"   = "YL"i !IdentifierPart { return tRegister(REGISTERS.YL) }

rSP "Stack Pointer" = "SP"i !IdentifierPart { return tRegister(REGISTERS.SP) }
rBP "Base Pointer"  = "BP"i !IdentifierPart { return tRegister(REGISTERS.BP) }
rPC "Program Counter" = "PC"i !IdentifierPart
rFLAGS "Flags"      = "FLAGS"i !IdentifierPart

Register "Register"
= rAL / rA / rBL / rB / rCL / rC / rDL
/ rD / rXL / rX / rYL / rY / rSP / rBP
/ MacroExpansion

Register16 "Word-sized Register"
= rA / rB / rC / rD / rX / rY / rSP / rBP
/ MacroExpansion

Register8 "Byte-sized Register"
= rAL / rBL / rCL / rDL / rXL / rYL
/ MacroExpansion

GeneralRegister "General Purpose Register"
= rAL / rA / rBL / rB / rCL / rC / rDL / rD
/ MacroExpansion

MemoryRegister "Memory Register"
= rD / rBP
/ MacroExpansion

NonGeneralRegister "Register other than General Purpose"
= rXL / rX / rYL / rY / rSP / rBP

//
// Flags
////////////////////////////////////////
fZERO              "Zero"              = ("Z"i/"flag:z"i) !IdentifierPart { return tFlag(FLAGS.ZERO); }
fCARRY             "Carry"             = ("C"i/"flag:c"i) !IdentifierPart { return tFlag(FLAGS.CARRY); }
fOVERFLOW          "Overflow"          = ("V"i/"flag:v"i) !IdentifierPart { return tFlag(FLAGS.OVERFLOW); }
fNEGATIVE          "Negative"          = ("N"i/"flag:n"i) !IdentifierPart { return tFlag(FLAGS.NEGATIVE); }
fEXCEPTION         "Exception"         = ("X"i/"flag:x"i) !IdentifierPart { return tFlag(FLAGS.EXCEPTION); }
                                       / ("EX"i/"flag:ex"i) !IdentifierPart { return tFlag(FLAGS.EXCEPTION); }
fINTERRUPT_DISABLE "Interrupt Disable" = ("ID"i/"flag:id"i) !IdentifierPart { return tFlag(FLAGS.INTERRUPT_DISABLE); }
fINTERRUPT_SERVICE "Interrupt Service" = ("IS"i/"flag:is"i) !IdentifierPart { return tFlag(FLAGS.INTERRUPT_SERVICE); }
fSINGLE_STEP       "Single Step"       = ("SS"i/"flag:ss"i) !IdentifierPart { return tFlag(FLAGS.SINGLE_STEP); }

Flags "Flags"
= fZERO / fCARRY / fOVERFLOW / fNEGATIVE
/ fEXCEPTION / fINTERRUPT_DISABLE
/ fINTERRUPT_SERVICE / fSINGLE_STEP

fNOTZERO              "Not Zero"              = ("N"i / "!") flag:fZERO { flag.neg = true; return flag; }
fNOTCARRY             "Not Carry"             = ("N"i / "!") flag:fCARRY { flag.neg = true; return flag; }
fNOTOVERFLOW          "Not Overflow"          = ("N"i  / "!")flag:fOVERFLOW { flag.neg = true; return flag; }
fNOTNEGATIVE          "Not Negative"          = ("N"i  / "!")flag:fNEGATIVE { flag.neg = true; return flag; }
fNOTEXCEPTION         "Not Exception"         = ("N"i  / "!")flag:fEXCEPTION { flag.neg = true; return flag; }
fNOTINTERRUPT_DISABLE "Not Interrupt Disable" = ("N"i  / "!")flag:fINTERRUPT_DISABLE { flag.neg = true; return flag; }
fNOTINTERRUPT_SERVICE "Not Interrupt Service" = ("N"i  / "!")flag:fINTERRUPT_SERVICE { flag.neg = true; return flag; }
fNOTSINGLE_STEP       "Not Single Step"       = ("N"i  / "!")flag:fSINGLE_STEP { flag.neg = true; return flag; }

NotFlags "Not Flags"
= fNOTZERO / fNOTCARRY / fNOTOVERFLOW / fNOTNEGATIVE
/ fNOTEXCEPTION / fNOTINTERRUPT_DISABLE
/ fNOTINTERRUPT_SERVICE / fNOTSINGLE_STEP

AllFlags "All Flags"
= NotFlags
/ Flags
/ MacroExpansion

//
// Conditionals
////////////////////////////////////////
cLTE      "Less Than or Equal"    = (".LTE"i / ".NGT"i ) { return tConditional("s<="); }
cLT       "Less Than"             = (".LT"i  / ".NGTE"i) { return tConditional("s<"); }
cGTE      "Greater Than or Equal" = (".GTE"i / ".NLT"i ) { return tConditional("s>="); }
cGT       "Greater Than"          = (".GT"i  / ".NLTE"i) { return tConditional("s>"); }
cABE      "Above or Equal"        = (".ABE"i / ".NBLO"i) { return tConditional("u>="); }
cABV      "Above"                 = (".ABV"i / ".NBLE"i) { return tConditional("u>"); }
cBLE      "Below or Equal"        = (".BLE"i / ".NABV"i) { return tConditional("u<="); }
cBLO      "Below"                 = (".BLO"i / ".NABE"i) { return tConditional("u<"); }
cEQ       "Equal To"              = ".EQ"i               { return tConditional("=="); }
cNEQ      "Not Equal To"          = ".NEQ"i              { return tConditional("!="); }

Conditionals = cLTE / cLT / cGTE / cGT / cABE / cABV / cBLE / cBLO / cEQ / cNEQ

AllConditionals "All Conditionals"
= Conditionals
/ MacroExpansion

ConditionalOrFlag
= Conditionals
/ Flags
/ MacroExpansion


//
// Addressing Modes
////////////////////////////////////////

Immediate4 "Immediate Nibble"
= Expression

Immediate8 "Immediate Byte"
= imm:Expression { return addressingMode({m: MODES.IMMEDIATE, addr: imm}); }

Immediate16 "Immediate Word"
= imm:Expression { return addressingMode({m: MODES.IMMEDIATE, addr: imm}); }

Relative8 "Relative Short Address"
= imm:Expression { return addressingMode({m: MODES.IMMEDIATE, addr: imm}); }

Relative16 "Relative Long Address"
= imm:Expression { return addressingMode({m: MODES.IMMEDIATE, addr: imm}); }

IndexByX "Index by X"
= COMMA _ rX

IndexByY "Index by Y"
= COMMA _ rY

ImmediateOffset "Immediate Offset"
= PLUS _ offset:Expression { return offset; }

Absolute18 "Absolute Address"
= LBRACKET _ addr:Expression _ x:IndexByX? _ y:IndexByY? _ RBRACKET { return addressingMode({addr, x: !!x, y: !!y, m:MODES.ABSOLUTE}); }

Indirect18 "Indirect Address"
= LANGLE _ addr:Expression _ x:IndexByX? _ RANGLE _ y:IndexByY? { return addressingMode({addr, x: !!x, y: !!y, i: true, m:MODES.ABSOLUTE}); }

AbsoluteRegister "Absolute BP or D"
= LBRACKET _ reg:MemoryRegister _ imm:ImmediateOffset? _ x:IndexByX? _ y:IndexByY? _ RBRACKET
{
    return addressingMode({
        m: reg.idx === REGISTERS.D ? MODES.D : MODES.BP,
        addr: imm || 0,
        x: !!x,
        y: !!y
    });
}

IndirectRegister "Indirect BP"
= LANGLE _ reg:MemoryRegister _ imm:ImmediateOffset? _ x:IndexByX? _ RANGLE _ y:IndexByY?
{
    return addressingMode({
        m: reg.idx === REGISTERS.D ? MODES.D : MODES.BP,
        addr: imm || 0,
        x: !!x,
        y: !!y,
        i: true
    });
}

MemoryAddressingMode "Memory Addressing Mode"
= MacroExpansion
/ AbsoluteRegister
/ IndirectRegister
/ Immediate16
/ Immediate8
/ Absolute18
/ Indirect18
// / Identifier

BranchAddressingMode "Branch Addressing Mode"
= MacroExpansion
/ AbsoluteRegister
/ IndirectRegister
/ Relative16
/ Relative8
/ Absolute18
/ Indirect18
// / Identifier

FPAbsolute "Floating Point Absolute Mode"
= LBRACKET _ bank:Register _ COMMA _ offs:Register _ RBRACKET { return {indirect: false, bank, offs}; }

FPIndirect "Floating Point Indirect Mode"
= LANGLE _ bank:Register _ COMMA _ offs:Register _ RANGLE { return {indirect: true, bank, offs}; }

FPAddressingMode "Floating Point Addressing Mode"
= MacroExpansion
/ FPAbsolute
/ FPIndirect


//
// Expressions
////////////////////////////////////////

OP_ADD "Addition Operator"       = "+"
OP_SUB "Subtraction Operator"    = "-"
OP_MUL "Multiplication Operator" = "*"
OP_DIV "Division Operator"       = "/"
OP_MOD "Modulo Operator"         = "%"
OP_SHL "Shift Left Operator"     = "<<"
OP_SHR "Shift Right Operator"    = ">>"
OP_AND "And Operator"            = "&"
OP_OR "Or Operator"              = "|"
OP_NOT "Unary Not Operator"      = "!"
OP_XOR "XOR Operator"            = "^"
OP_TAKES "Takes"                 = "<=" / ":="

AdditiveOperator "Additive Operator"
= OP_ADD
/ OP_SUB

MultiplicativeOperator "Multiplicative Operator"
= OP_MUL
/ OP_MOD
/ OP_DIV

LogicalOperator "Logical Operator"
= OP_AND
/ OP_OR
/ OP_XOR

ShiftOperator "Shift Operator"
= OP_SHL
/ OP_SHR

OrExpression "Or Expression"
= head:XorExpression tail:(_ (OP_OR) _ XorExpression)* {
    return tBinaryExpression(head, tail);
}
XorExpression "Xor Expression"
= head:AndExpression tail:(_ (OP_XOR) _ AndExpression)* {
    return tBinaryExpression(head, tail);
}
AndExpression "And Expression"
= head:ShiftExpression tail:(_ (OP_AND) _ ShiftExpression)* {
    return tBinaryExpression(head, tail);
}

ShiftExpression "Shift Expression"
= head:AdditiveExpression tail:(_ (ShiftOperator) _ AdditiveExpression)* {
    return tBinaryExpression(head, tail);
}

AdditiveExpression "Additive Expression"
= head:MultiplicativeExpression tail:(_ (AdditiveOperator) _ MultiplicativeExpression)* {
    return tBinaryExpression(head, tail);
}

MultiplicativeExpression "Multiplicative Expression"
= head:Literal tail:(_ (MultiplicativeOperator) _ Literal)* {
    return tBinaryExpression(head, tail);
}

NotExpression "Not Expression"
= _ op:OP_NOT _ v:Expression {
    return tUnaryExpression(op, v);
}
NegativeExpression "Negative Expression"
= _ op:OP_SUB _ v:Expression {
    return tUnaryExpression(op, v);
}

CommaSepExpressions
= head:Expression tail:(_ COMMA _ Expression)* {
    return [ head, ...tail.map(([,,,expr]) => expr)];
}

StringOrConstantExpression
= Expression
/ StringLiteral

CommaSepStringOrConstantExpressions
= head:StringOrConstantExpression tail:(_ COMMA _ StringOrConstantExpression)* {
    return [ head, ...tail.map(([,,,expr]) => expr)];
}

Expression
= OrExpression

ConstantFunction
= fn:ADDRBANK _ LPAREN _ expr:Expression _ RPAREN { return tFunction(fn, expr); }
/ fn:ADDRBOFS _ LPAREN _ expr:Expression _ RPAREN { return tFunction(fn, expr); }
/ fn:ADDRPAGE _ LPAREN _ expr:Expression _ RPAREN { return tFunction(fn, expr); }
/ fn:ADDRPOFS _ LPAREN _ expr:Expression _ RPAREN { return tFunction(fn, expr); }
/ fn:NEXT _ LPAREN _ expr:Expression _ RPAREN { return tFunction(fn, expr); }
/ fn:ASC _ LPAREN _ expr:StringLiteral _ RPAREN { return tFunction(fn, expr); }
/ fn:ASC _ LPAREN _ expr:(Expression / Register / Flags) _ RPAREN { return expectedStringLiteral() }

Literal
= LPAREN _ expr:Expression _ RPAREN { return expr; }
/ NotExpression
/ NegativeExpression
/ ConstantFunction
/ Integer
/ MacroExpansion
/ Identifier


// / ReservedWord { error(`Literal can not be a reserved word: ${text()}`); }

//
// Primitives
////////////////////////////////////////

ReservedWord "Reserved Word"
= Keyword 

Label "Label"
= name:Identifier ":" { return tLabel(name); }
/ ReservedWord ":" { error(`Label can not be a reserved word: ${text()}`); }

Identifier "Identifier"
= !ReservedWord IdentifierName { return tIdentifier(text()); }

IdentifierName "Identifier Name"
= head:IdentifierStart tail:IdentifierPart*
    { return text(); }

IdentifierStart "Identifier Start"
= [A-Za-z]
/ "_"

IdentifierPart "Identifier Part"
= [_A-Za-z0-9\-\.]

Integer "Integer"
= "0x" head:[0-9A-Fa-f] tail:[0-9A-Fa-f_]*
    { return tLiteral(toNumber(text())); }
/ "$" head:[0-9A-Fa-f] tail:[0-9A-Fa-f_]*
    { return tLiteral(toNumber(text())); }
/ "0b" head:[0-1] tail:[0-1_]*
    { return tLiteral(toNumber(text())); }
// / head:[0-9A-Fa-f] tail:[0-9A-Fa-f_]* "h"
//    { return tLiteral(toNumber(text())); }
// / head:[0-1] tail:[0-1_]* "b"
//    { return tLiteral(toNumber(text())); }
/ negative:"-"? head:[0-9] tail:[0-9_]*
    { return tLiteral(toNumber(text())); }


StringLiteral "String Literal"
= DQUOTE text:(!DQUOTE .)* DQUOTE { return tLiteral(text.map(([,ch]) => ch).join("")); }
/ DQUOTE (!DQUOTE .)* { expectedQuote() }
/ MacroExpansion

//
// Delimiters
////////////////////////////////////////

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
= "#" data:([^\n]*) { return tComment(data.join("").trim()); }

_ "Whitespace"
= [ \t]* { return null; }

EOL "End Of Line" = [\r\n]+ { return null; }