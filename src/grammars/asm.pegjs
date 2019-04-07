{
const K_STRING      = "string";
const K_INTEGER     = "integer";
const K_IDENT       = "ident";
const K_DIRECTIVE   = "directive";
const K_FUNCTION    = "function";
const K_INSTRUCTION = "instruction";
const K_BLOCK       = "block"; // of instructions
const K_REGISTER    = "register";
const K_FLAG        = "flag";
const K_EXPR        = "expr";
const K_SIGIL       = "sigil";
const K_ADDRESS     = "address";

const T_IMPORT          = ".import";
const T_SEGMENT         = ".segment";
const T_SEGMENT_APPEND  = ".segment+";
const T_DEFINE          = ".define";
const T_RENAME          = ".rename";
const T_VARIABLE        = ".var";
const T_DATA_BYTE       = ".db";
const T_DATA_BYTE_ARRAY = ".db[]";
const T_DATA_WORD       = ".dw";
const T_DATA_WORD_ARRAY = ".dw[]";
const T_DATA_STRING     = ".ds";
const T_LABEL           = ".label";

const OP_ADD      = "+";
const OP_SUBTRACT = "-";
const OP_MULTIPLY = "*";
const OP_DIVIDE   = "/";

const I_NOP = "NOP";
const I_RETURN = "RET";
const I_ENTER = "ENTER";
const I_EXIT = "EXIT";
const I_TRAP = "TRAP";
const I_ADD = "ADD";
const I_SUB = "SUB";
const I_XOR = "XOR";
const I_CMP = "CMP";
const I_SHL = "SHL";
const I_SHR = "SHR";
const I_AND = "AND";
const I_OR = "OR";
const I_NEG = "NEG";
const I_XCB = "XCB";
const I_MUL = "MUL";
const I_IDIV = "IDIV";
const I_IMOD = "IMOD";
const I_MFILL = "MFILL";
const I_MCOPY = "MCOPY";
const I_MSWAP = "MSWAP";
const I_OUT = "OUT";
const I_IN = "IN";
const I_SWAP = "SWAP";
const I_INC = "INC";
const I_DEC = "DEC";
const I_IF = "IF";
const I_IFN = "IFN";
const I_SET = "SET";
const I_CLR = "CLR";
const I_IFR = "IFR";
const I_IFNR = "IFNR";
const I_SETR = "SETR";
const I_CLRR = "CLRR";
const I_PUSH = "PUSH";
const I_POP = "POP";
const I_PUSHA = "PUSHA";
const I_POPA = "POPA";
const I_BRS = "BRS";
const I_CALLS = "CALLS";
const I_BR = "BR";
const I_CALL = "CALL";
const I_LOOP = "LOOP";
const I_LDI = "LDI";
const I_LDS = "LDS";
const I_LD = "LD";
const I_ST = "ST";
const I_STD = "STD";
const I_LDD = "LDD";
const I_INFERRED_TRANSFER = "TX";
const I_STS = "STS";
const I_MOV = "MOV";
const I_HALT = "HALT";
const I_RET = "RET";

const H_IF = "hIF";
const H_IFN = "hIFN";

const RT_UNKNOWN = "?"; // unknown expected type
const RT_NONE = "none"; // result type doesn't matter
const RT_U8 = "u8"; // unsigned byte
const RT_U16 = "u16"; // unsigned word
const RT_U18 = "u18"; // unsinged extended word
const RT_S8 = "s8"; // signed byte
const RT_S16 = "s16"; // signed word
const RT_BYTE = "?8"; // byte
const RT_WORD = "?16"; // word
const RT_INTEGER = "int"; // an integer of undetermined size
const RT_EXTENDED_WORD = "?18"; // extended word
const RT_BANK_REGISTER = "bank-reg"; // SB or DB
const RT_DATA_REGISTER = "data-reg"; // A - D
const RT_GENERAL_REGISTER = "general-reg"; // A-D, X, Y, SP, BP
const RT_ANY_REGISTER = "any-reg";
const RT_LOOP_REGISTER = "loop-reg"; // C, D, X, Y
const RT_FLAG = "flag";
const RT_ADDRESS = "addr"; // will be a u16
const RT_X_REGISTER = "X"; // expected when indexing by X
const RT_Y_REGISTER = "Y"; // expected when indexing by Y
const RT_STRING = "string";
const RT_CHAR = "char";

const CT_BYTE = "byte";
const CT_WORD = "word";
const CT_EXTENDED_WORD = "extended-word";
const CT_INTEGER = "integer";
const CT_STRING = "string";

// address modes
const M_ABSOLUTE = "absolute";
const M_INDIRECT = "indirect";
const M_RELATIVE_BP = "relative-bp";
const M_INDIRECT_BP = "indirect-bp";
const M_ABSOLUTE_D = "absolute-d";
const M_INDIRECT_D = "indirect-d";

function makeNode({ type, resultType = RT_UNKNOWN, value, children} = {}) {
    return {
        type,
        resultType,
        value,
        children
    };
}

function isOfType(...types) {
    return function(node) {
        return types.filter(type => (type && type.type || type) === (node.type || node)).length > 0;
    }
}

function check(node, is) {
    return is(node);
}

function expect(node, to, err = "Unexpected error") {
    return !to(node) ? error(err) : node;
}

function partial(node) {
    if (!node) { return; }
    if (!node.children) { return node; }
    if (node.children.length === 0) { return node; }

    switch (node.type) {
    case K_BLOCK: {
        return makeInstructionBlock(node.children.map(n => partial(n)));
    } break;
    case K_FUNCTION: {
        const fn = partial(node.children[0]);
        const right = partial(node.children[1]);
        // TODO;
        return node;
    } break;
    case K_EXPR: {
        const left = partial(node.children[0]);
        const right = partial(node.children[1]);
        if (!check(left, isOfType(right))) {
            // can't calculate, so just return as-is
            return node;
        } else {
            if (!check(left, isOfType(K_INTEGER))) return node;
            // see if we can calculate it now
            let v;
            switch(node.value) {
            case "+": v = left.value + right.value; break;
            case "-": v = left.value - right.value; break;
            case "*": v = left.value * right.value; break;
            case "/": v = Math.floor(left.value / right.value); break;
            }
            return makeIntegerNode(v);
        }
    } break;
    default:
        return node;
    }
}

//
// primitives
////////////////////////////////////////////////////////////////////////

function makeIntegerNode(i) {
	let resultType = RT_INTEGER;
    if ( (i & 0xFF) === i) resultType = RT_BYTE;
    else if ( (i & 0xFFFF) === i) resultType = RT_WORD;
    else if ( (i & 0x3FFFF) === i) resultType = RT_EXTENDED_WORD;
    return makeNode({type: K_INTEGER, resultType, value: i});
}

function makeStringNode(s) {
    return makeNode({type: K_STRING, resultType: RT_STRING, value: s});
}

function makeIdentNode(i) {
    // if the ident is a register, we need to ensure we treat it as such.
    if (["AL", "A", "B", "C", "D", "DB", "SB", "X", "Y"].filter(r => i.toUpperCase() === r).length > 0) {
        return makeRegisterNode(i);
    }
    return makeNode({type: K_IDENT, resultType: RT_ADDRESS, value: i});
}

function makeSigilIdentNode(sigil, ident) {
    let resultType;
    switch (sigil) {
    case "%": resultType = RT_INTEGER; break;
    case "#": resultType = RT_INTEGER; break;
    case "&": case "@": case ":": case ">": default: resultType = RT_ADDRESS; break;
    }
    return makeNode({type: K_SIGIL, resultType, value: sigil, children: [ident]});
}

function makeRegisterNode(r) {
    return makeNode({type: K_REGISTER, resultType: RT_INTEGER, value: r});
}

function makeInstruction(opcode, ...operands) {
    return makeNode({type: K_INSTRUCTION, resultType: RT_NONE, value: opcode, children: operands});
}

function makeInstructionBlock(instructions) {
    return makeNode({type: K_BLOCK, resultType: RT_NONE, children: instructions.filter(s => s !== undefined)});
}

function makeAddressNode({addr, mode, indexByX = false, indexByY = false, bank = undefined} = {}) {
    return makeNode({type: K_ADDRESS, value: {addr, mode, indexByX, indexByY, bank}, returnType: RT_ADDRESS});
}

//
// directives
////////////////////////////////////////////////////////////////////////

function makeImportDirectiveNode(path) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_IMPORT, children: [
        makeStringNode(path)
    ]});
}

function makeSegmentDirectiveNode(segment, startAt, append = false) {
	return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: append ? T_SEGMENT_APPEND : T_SEGMENT, children: [
    	makeStringNode(segment),
        startAt
    ]});
}

function makeDefineDirectiveNode(ident, value) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_DEFINE, children: [ident, value]});
}

function makeVariableDirectiveNode(ident) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_VARIABLE, children: [ident]});
}

function makeRenameDirectiveNode(ident, reg) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_RENAME, children: [ident, reg]});
}

function makeByteDirectiveNode(bytes) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_DATA_BYTE, children: bytes});
}

function makeByteArrayDirectiveNode(size) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_DATA_BYTE_ARRAY, children: [size]});
}

function makeWordDirectiveNode(words) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_DATA_WORD, children: words});
}

function makeWordArrayDirectiveNode(size) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_DATA_WORD_ARRAY, children: [size]});
}

function makeStringDirectiveNode(strings) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_DATA_STRING, children: strings});
}

function makeLabelDirectiveNode(name) {
    return makeNode({type: K_DIRECTIVE, resultType: RT_NONE, value: T_LABEL, children: [name]});
}


//
// expressions
////////////////////////////////////////////////////////////////////////

function makeExpression(left, op, right) {
    return makeNode({type: K_EXPR, resultType: RT_INTEGER, value: op, children: [left, right]});
}

function makeFunctionNode(fn, right) {
    return makeNode({type: K_FUNCTION, resultType: RT_INTEGER, value: fn, children: [right]});
}

}
Program
 = stmts:Statement* { return makeInstructionBlock(stmts); }

Block
  = _ "{" stmts: Statement* "}" { return makeInstructionBlock(stmts); }

Statement
  = directive:Directive _ EOL { return directive; }
  / label:Label _ EOL { return label; }
  / label:Label _ instruction:Instruction _ EOL {return makeInstructionBlock([ label, instruction ]); }
  / instruction:Instruction _ EOL { return instruction; }
  / block:Block _ EOL { return block; }
  / _ EOL {}

Label
  = _ ident:Identifier ":" { return makeLabelDirectiveNode(ident); }

// Instructions

InferredTransferInstruction "Inferred Transfer Instruction"
  = _ target:(RegisterA / RegisterAL) _ ":=" _ source:Expression { return makeInstruction(I_INFERRED_TRANSFER, target, source); }
  / _ target:Register _ ":=" _ source:Expression { return makeInstruction(I_INFERRED_TRANSFER, target, source); }
  / _ target:SigilIdentifier _ ":=" _ source:Expression { return makeInstruction(I_INFERRED_TRANSFER, target, source); }
  / _ target:Identifier _ ":=" _ source:Expression { return makeInstruction(I_INFERRED_TRANSFER, target, source); }


LoadInstructions "Load Instructions"
  = _ "LD"i _ target:(RegisterAL / RegisterA) _ "," _ source:Address { return makeInstruction( I_LD, target, source ); }
  / _ "LD"i _ target:(RegisterAL / RegisterA) _ "," _ source:Expression { return makeInstruction(I_LDI, target, source); }
  / _ "LDI"i _ target:(RegisterAL / RegisterA) _ "," _ source:Expression { return makeInstruction(I_LDI, target, source); }
  / _ "LDS"i _ target:(RegisterAL / RegisterA) _ "," _ source:Address { return makeInstruction(I_LDS, target, source); }
  / _ "LDD"i _ target:(RegisterAL / RegisterA) _ "," _ source:Address { return makeInstruction(I_LDD, target, source); }

StoreInstructions "Store Instructions"
  = _ "ST"i _ target:Address _ "," _ source:(RegisterAL / RegisterA) { return makeInstruction( I_ST, target, source ); }
  / _ "STS"i _ target:Address _ "," _ source:(RegisterAL / RegisterA) { return makeInstruction(I_STS, target, source); }
  / _ "STD"i _ target:Address _ "," _ source:(RegisterAL / RegisterA) { return makeInstruction(I_STD, target, source); }
  / _ "STS"i _ target:(RegisterAL / RegisterA) _ "," _ source:Address { return makeInstruction(I_STS, target, source); }
  / _ "STD"i _ target:(RegisterAL / RegisterA) _ "," _ source:Address { return makeInstruction(I_STD, target, source); }

SimpleInstructions "Simple Instructions"
  = _ "NOP"i { return makeInstruction( I_NOP ); }

StackInstructions "Stack Instructions"
  = _ "PUSHA"i { return makeInstruction( I_PUSHA ); }
  / _ "POPA"i { return makeInstruction( I_POPA ); }
  / _ "PUSH"i _ reg:AllRegisters { return makeInstruction( I_PUSH, reg ); }
  / _ "POP"i _ reg:AllRegisters { return makeInstruction( I_POP, reg ); }
  / _ "ENTER"i _ expr:Expression { return makeInstruction( I_ENTER, expr ); }
  / _ "EXIT"i _ expr:Expression { return makeInstruction( I_EXIT, expr ); }
  / _ "RET"i { return makeInstruction( I_RET ); }


BranchInstructions "Branch Instructions"
  = _ "BRS"i _ target:Expression { return makeInstruction( I_BRS, target ); }
  / _ "BR"i _ target:(Expression / Address) { return makeInstruction( I_BR, target ); }
  / _ "CALLS"i _ target:Expression { return makeInstruction( I_CALLS, target ); }
  / _ "CALL"i _ target:(Expression / Address) { return makeInstruction( I_CALL, target ); }
  / _ "LOOP"i _ reg:LoopRegister _ "," _ addr:Expression { return makeInstruction( I_LOOP, reg, addr ); }
  / _ "TRAP"i _ trap:(RegisterAL / Expression) { return makeInstruction( I_TRAP, trap ); }
  / _ "HALT"i _ expr:Expression { return makeInstruction( I_HALT, expr ); }

ArithmeticInstructions "Arithmetic Instructions"
  = _ "ADD"i _ target:Register _ "," _ source:Register { return makeInstruction( I_ADD, target, source ); }
  / target:Register _ "+=" _ source:Register { return makeInstruction( I_ADD, target, source ); }
  / _ "AND"i _ target:Register _ "," _ source:Register { return makeInstruction( I_AND, target, source ); }
  / target:Register _ "&=" _ source:Register { return makeInstruction( I_AND, target, source ); }
  / _ "CMP"i _ target:Register _ "," _ source:Register { return makeInstruction( I_CMP, target, source ); }
  / target:Register _ "?" _ source:Register { return makeInstruction( I_CMP, target, source ); }
  / _ "DEC"i _ target:Register { return makeInstruction( I_DEC, target ); }
  / target:Register _ "--" { return makeInstruction( I_DEC, target ); }
  / _ "INC"i _ target:Register { return makeInstruction( I_INC, target ); }
  / target:Register _ "++" { return makeInstruction( I_INC, target ); }
  / _ "IDIV"i _ high:GeneralRegister _ ":" _ target:Register _ "," _ source:Register { return makeInstruction( I_IDIV, target, high, source ); }
  / _ high:GeneralRegister _ ":" _ target:Register _ "/=" _ source:Register { return makeInstruction( I_IDIV, target, high, source ); }
  / _ "IMOD"i _ high:GeneralRegister _ ":" _ target:Register _ "," _ source:Register { return makeInstruction( I_IMOD, target, high, source ); }
  / _ high:GeneralRegister _ ":" _ target:Register _ "%=" _ source:Register { return makeInstruction( I_IMOD, target, high, source ); }
  / _ "MUL"i _ high:GeneralRegister _ ":" _ target:Register _ "," _ source:Register { return makeInstruction( I_MUL, target, high, source ); }
  / _ high:GeneralRegister _ ":" _ target:Register _ "*=" _ source:Register { return makeInstruction( I_MUL, target, high, source ); }
  / _ "NEG"i _ target:Register { return makeInstruction( I_NEG, target ); }
  / target:Register _ "!!" { return makeInstruction( I_NEG, target ); }
  / _ "OR"i _ target:Register _ "," _ source:Register { return makeInstruction( I_OR, target, source ); }
  / target:Register _ "|=" _ source:Register { return makeInstruction( I_OR, target, source ); }
  / _ "SHL"i _ target:Register _ "," _ source:Register { return makeInstruction( I_SHL, target, source ); }
  / target:Register _ "<<=" _ source:Register { return makeInstruction( I_SHL, target, source ); }
  / _ "SHR"i _ target:Register _ "," _ source:Register { return makeInstruction( I_SHR, target, source ); }
  / target:Register _ ">>=" _ source:Register { return makeInstruction( I_SHR, target, source ); }
  / _ "SUB"i _ target:Register _ "," _ source:Register { return makeInstruction( I_SUB, target, source ); }
  / target:Register _ "-=" _ source:Register { return makeInstruction( I_SUB, target, source ); }
  / _ "XOR"i _ target:Register _ "," _ source:Register { return makeInstruction( I_XOR, target, source ); }
  / target:Register _ "^=" _ source:Register { return makeInstruction( I_XOR, target, source ); }

ElseBlock "Else Block"
  = _ "ELSE"i _ elseBlock:Block { return elseBlock; }

FlagInstructions "Flag Instructions"
  = _ "CLRR"i _ reg:Register _ "," _ expr:Expression { return makeInstruction( I_CLRR, reg, expr ); }
  / _ "CLR"i _ flag:Flag { return makeInstruction( I_CLR, flag ); }
  / _ "IFNR"i _ reg:Register _ "," _ expr:Expression { return makeInstruction( I_IFNR, reg, expr ); }
  / _ "IFN"i _ flag:Flag { return makeInstruction( I_IFN, flag ); }
  / _ "IFR"i _ reg:Register _ "," _ expr:Expression { return makeInstruction( I_IFR, reg, expr ); }
  / _ "IF"i _ flag:Flag { return makeInstruction( I_IF, flag ); }
  / _ "IF"i _ "!" _ flag:Flag { return makeInstruction( I_IFN, flag ); }
  / _ "SETR"i _ reg:Register _ "," _ expr:Expression { return makeInstruction( I_SETR, reg, expr ); }
  / _ "SET"i _ flag:Flag { return makeInstruction( I_SET, flag ); }
  / _ "+" _ flag:Flag { return makeInstruction( I_SET, flag ); }
  / _ "-" _ flag:Flag { return makeInstruction( I_CLR, flag ); }

TransferInstructions "TransferInstructions"
  = _ "MCOPY"i _ targetBank:BankSelect _ target:Register _ "," _ sourceBank:BankSelect _ source:Register _ "*" _ RegisterC { return makeInstruction( I_MCOPY, targetBank, target, sourceBank, source ); }
  / _ "MFILL"i _ targetBank:BankSelect _ target:Register _ "," _ expr:Expression _ "*" _ RegisterC { return makeInstruction( I_MFILL, targetBank, target, expr ); }
  / _ "MSWAP"i _ targetBank:BankSelect _ target:Register _ "," _ sourceBank:BankSelect _ source:Register _ "*" _ RegisterC { return makeInstruction( I_MSWAP, targetBank, target, sourceBank, source ); }
  / _ "MOV"i _ target:BankRegister _ "," _ source:GeneralRegister { return makeInstruction( I_MOV, target, source ); }
  / _ "MOV"i _ target:Register _ "," _ source:Register { return makeInstruction( I_MOV, target, source ); }
  / _ "SWAP"i _ regA:Register _ "," _ regB:Register { return makeInstruction( I_SWAP, regA, regB ); }
  / _ "XCB"i _ reg:Register { return makeInstruction( I_XCB, reg ); }

IOInstructions "I/O Instructions"
  = _ "IN"i _ target:Register _ "," _ port:Expression { return makeInstruction( I_IN, target, port ); }
  / _ "OUT"i _ port:Expression _ "," _ source:Register { return makeInstruction( I_OUT, port, source ); }
  / _ "OUR"i _ source:Register _ "," _ port:Expression { return makeInstruction( I_IN, port, source ); }

HighLevelIf "High Level If"
  = _ "IF"i _ "!" _ flag:Flag _ thenBlock:Block _ elseBlock:ElseBlock? { return makeInstruction( H_IFN, thenBlock, elseBlock ); }
  / _ "IF"i _ flag:Flag _ thenBlock:Block _ elseBlock:ElseBlock? { return makeInstruction( H_IF, thenBlock, elseBlock ); }

HighLevelInstructions "High Level Instructions"
  = HighLevelIf

Instruction "Instruction"
  = HighLevelInstructions
  / SimpleInstructions
  / StackInstructions
  / IOInstructions
  / FlagInstructions
  / ArithmeticInstructions
  / BranchInstructions
  / LoadInstructions
  / StoreInstructions
  / TransferInstructions
  / InferredTransferInstruction

// Addressing modes
BankSelect "Bank Select"
  = _ bank:BankRegister _ ":" _ { return bank; }

AbsoluteAddress "Absolute Address"
  = _ bank:BankSelect? "[" _ expr:Expression _ indexByX:("," _ RegisterX _)? indexByY:("," _ RegisterY _)? "]" { return makeAddressNode({mode: M_ABSOLUTE, indexByX: !!indexByX, indexByY: !!indexByY, addr: expr, bank}); }

IndirectAddress "Indirect Address"
  = _ bank:BankSelect? "(" _ expr:Expression _ indexByX:("," _ RegisterX _)? ")" _ indexByY:("," _ RegisterY _)? { return makeAddressNode({mode: M_INDIRECT, indexByX: !!indexByX, indexByY: !!indexByY, addr: expr, bank}); }

RelativeBPAddress "Relative BP Address"
  = _ bank:BankSelect? "[" _ BasePointer _ "+" _ expr:Expression _ indexByX:("," _ RegisterX _)? indexByY:("," _ RegisterY _)? "]" { return makeAddressNode({mode: M_RELATIVE_BP, indexByX: !!indexByX, indexByY: !!indexByY, addr: expr, bank}); }

IndirectBPAddress "Indirect BP Address"
  = _ bank:BankSelect? "(" _ BasePointer _ "+" _ expr:Expression _ indexByX:("," _ RegisterX _)? ")" _ indexByY:("," _ RegisterY _)? { return makeAddressNode({mode: M_INDIRECT_BP, indexByX: !!indexByX, indexByY: !!indexByY, addr: expr, bank}); }

AbsoluteDAddress "Relative BP Address"
  = _ bank:BankSelect? "[" _ RegisterD _ indexByX:("," _ RegisterX _)? indexByY:("," _ RegisterY _)? "]" { return makeAddressNode({mode: M_ABSOLUTE_D, indexByX: !!indexByX, indexByY: !!indexByY, addr: null, bank}); }

IndirectDAddress "Indirect BP Address"
  = _ bank:BankSelect? "(" _ RegisterD _ indexByX:("," _ RegisterX _)? ")" _ indexByY:("," _ RegisterY _)? { return makeAddressNode({mode: M_INDIRECT_D, indexByX: !!indexByX, indexByY: !!indexByY, addr: null, bank}); }


Address "Address"
  = RelativeBPAddress
  / IndirectBPAddress
  / AbsoluteDAddress
  / IndirectDAddress
  / AbsoluteAddress
  / IndirectAddress

// Registers

RegisterA    = _ "A"i { return makeRegisterNode("A"); }
RegisterAL   = _ "AL"i { return makeRegisterNode("AL"); }
RegisterB    = _ "B"i { return makeRegisterNode("B"); }
RegisterC    = _ "C"i { return makeRegisterNode("C"); }
RegisterD    = _ "D"i { return makeRegisterNode("D"); }
RegisterX    = _ "X"i { return makeRegisterNode("X"); }
RegisterY    = _ "Y"i { return makeRegisterNode("Y"); }
BasePointer  = _ "BP"i { return makeRegisterNode("BP"); }
StackPointer = _ "SP"i { return makeRegisterNode("SP"); }
SourceBank   = _ "SB"i { return makeRegisterNode("SB"); }
DataBank     = _ "DB"i { return makeRegisterNode("DB"); }

Accumulator     = RegisterA
Accumulator8    = RegisterAL
Counter         = RegisterC
DataAccess      = RegisterD
GeneralRegister = (RegisterAL / RegisterA / RegisterB / RegisterC / RegisterD)
IndexRegister   = (RegisterX / RegisterY)
LoopRegister    = (RegisterC / RegisterD / IndexRegister)
BankRegister    = (SourceBank / DataBank)
Register        = (BasePointer / StackPointer / IndexRegister / GeneralRegister)
AllRegisters    = (BankRegister / Register / "PC"i)

// Flags

ZeroFlag      = _ "Z"i
OverflowFlag  = _ "O"i
CarryFlag     = _ "C"i
NegativeFlag  = _ "N"i
ExceptionFlag = _ "E"i
ExecuteFlag   = _ "X"i
ModeFlag      = _ "M"i
InterruptFlag = _ "I"i

Flag "Flag"
  = ZeroFlag
  / OverflowFlag
  / CarryFlag
  / NegativeFlag
  / ExceptionFlag
  / ExecuteFlag
  / ModeFlag
  / InterruptFlag

// Sigils
RenameSigil "Rename Sigil"           = "%"
DereferenceSigil "Dereference Sigil" = "&"
LabelSigil "Label Sigil"             = ":"
                                     / "@"
                                     / ">"
DefineSigil "Define Sigil"           = "#"

Sigil "Sigil"
  = RenameSigil
  / DereferenceSigil
  / LabelSigil
  / DefineSigil


// Directives

ImportDirective "Import Directive"
  = _ ".import"i _ path:StringLiteral { return makeImportDirectiveNode(path); }

SegmentDirective "Segment Directive"
  = _ segment:(".code"i / ".data"i) append:"+"? startAt:Expression { return makeSegmentDirectiveNode(segment, startAt, !!append); }

DefineDirective "Define Directive"
  = _ ".def"i _ ident:Identifier _ value:StringLiteral { return makeDefineDirectiveNode(ident, value); }

VariableDirective "Variable Directive"
  = _ ".var"i _ ident:Identifier { return makeVariableDirectiveNode(ident); }

RenameDirective "Rename Directive"
  = _ ".rename"i _ ident:Identifier _ reg:Register { return makeRenameDirectiveNode(ident, reg); }

ByteDirective "Byte Directive"
  = _ ".db"i _ bytes:(Expression+) { return makeByteDirectiveNode(bytes); }

ByteArrayDirective "Byte Array Directive"
  = _ ".db[]" _ size:Expression  { return makeByteArrayDirectiveNode(size); }

WordDirective "Word Directive"
  = _ ".dw"i _ words:(Expression+)  { return makeWordDirectiveNode(words); }

WordArrayDirective "Word Array Directive"
  = _ ".dw[]" _ size:Expression  { return makeWordArrayDirectiveNode(size); }

StringDirective "String Directive"
  = _ ".ds"i _ strings:(StringLiteral+)  { return makeStringDirectiveNode(strings); }



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
        return partial(makeExpression(result, element[1], element[3]));
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        return partial(makeExpression(result, element[1], element[3]));
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / IntegerFunctionExpression
  / StringFunctionExpression
  / IntegerLiteral
  / SigilIdentifier
  / Identifier

IntegerFunctionExpression
  = _ func:IntegerFunction _ "(" _ v:Expression _ ")" {
    return partial(makeFunctionNode(func, v));
  }

StringFunctionExpression
  = _ func:StringFunction _ "(" _ v:StringLiteral _ ")" {
    return partial(makeFunctionNode(func, v));
  }

IntegerFunction
  = "hi"i
  / "lo"i
  / "chr"i
  / "bank"i
  / "addr"i
  / "word"i

StringFunction
  = "ord"i

IntegerLiteral "Integer Literal"
  = _ "-"? [0-9][xb]?[0-9A-Fa-f]* { return makeIntegerNode(Number(text())); }


SigilIdentifier "Sigil with Identifier"
 = _ sigil:Sigil ident:Identifier { return makeSigilIdentNode(sigil, ident); }


Identifier "Identifier"
  = _ [A-Za-z_][A-Za-z0-9_\-]* { return makeIdentNode(text()); }

StringLiteral "String Literal"
  = _ '"' string:[^"]* '"' { return makeStringNode(string.join("")); }

Comment "Comment"
  = ("#" / ";" / "=>") [^\n\r]*


EOL "End of Line"
  = [\n\r]+ {}
  / Comment [\n\r]+ {}

_ "whitespace"
  = [ \t]* {}


