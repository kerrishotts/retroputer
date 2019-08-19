export const REGISTERS = {
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

export const REGISTER_NAMES = Object.entries(REGISTERS).reduce((o, [k, v]) => (o[v] = k, o), {});

export const FLAGS = {
    ZERO: 0,
    OVERFLOW: 1,
    CARRY: 2,
    NEGATIVE: 3,
    SINGLE_STEP: 4,
    INTERRUPT_SERVICE: 5,
    INTERRUPT_DISABLE: 6,
    EXCEPTION: 7,
};
export const FLAG_NAMES = [ "Z", "V", "C", "N", "SS", "IS", "ID", "EX" ];

export const OPCODES = {
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
    PUSHMM: "pushmm",
    POPMM: "popmm",
    PUSH: "push",
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
};

export const DIRECTIVES = {
    SEGMENT: ".segment",
    BYTE: ".byte",
    WORD: ".word",
    STRING: ".string",
    APPEND: ".append",
    CONST: ".const",
    IMPORT: ".import",
};

export const TOKENS = {
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
    BLOCK: "block"
};

export const MODES = {
    IMMEDIATE: 0b00,
    ABSOLUTE: 0b01,
    BP: 0b10,
    D: 0b11
};