const META = {
    FN:          0b0000_0000_0000_0001,
    CMD:         0b0000_0000_0000_0010,
    OP:          0b0000_0000_0000_0100,
    GROUP:       0b0000_0000_0000_1000,
    NO_TRAILING: 0b0010_0000_0000_0000,
    ENTER_BLOCK: 0b0100_0000_0000_0000,
    LEAVE_BLOCK: 0b1000_0000_0000_0000,
};

const tokens = [
    {tok: "ABS",       keyword: ["ABS"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "A"},
    {tok: "AND",       keyword: ["AND"],             stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x06, section: "A"},
    {tok: "ASC",       keyword: ["ASC"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "A"},
    {tok: "ASM",       keyword: ["ASM"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "A"},
    {tok: "ATN",       keyword: ["ATN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "A"},
    {tok: "AT",        keyword: ["AT"],              stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "A"},
//  {tok: "BOX",       keyword: ["BOX"],             stmt: "token-not-impl",       meta: META.CMD,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "B"},
    {tok: "CALL",      keyword: ["CALL"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "CATALOG",   keyword: ["CATALOG"],         stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "CHRS",      keyword: ["CHRS$"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14, section: "C"},
    {tok: "CHR",       keyword: ["CHR$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "C"},
    {tok: "CIRCLE",    keyword: ["CIRCLE"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "CLS",       keyword: ["CLS"],             stmt: "handler-clear-screen", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "CLOSE",     keyword: ["CLOSE"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "CONTINUE",  keyword: ["CONTINUE", "CONT"], stmt: "token-not-impl",      meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "COLOR",     keyword: ["COLOR"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "COPY",      keyword: ["COPY"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "C"},
    {tok: "COS",       keyword: ["COS"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "C"},
    {tok: "DATA",      keyword: ["DATA"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "D"},
    {tok: "DEF",       keyword: ["DEF"],             stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "D"},
//  {tok: "DEFFN",     keyword: ["DEFFN"],           stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "DEFSUB",    keyword: ["DEFSUB"],          stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "DIM",       keyword: ["DIM"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "D"},
    {tok: "DO",        keyword: ["DO"],              stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "D"},
    {tok: "DRAW",      keyword: ["DRAW"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "D"},
//  {tok: "ELSEIF",    keyword: ["ELSEIF"],          stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK | META.ENTER_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "ELSE",      keyword: ["ELSE"],            stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "E"},
//  {tok: "ENDSUB",    keyword: ["ENDSUB"],          stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "ENDFN",     keyword: ["ENDFN"],           stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "ENDIF",     keyword: ["ENDIF"],           stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "END",       keyword: ["END"],             stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "E"},
    {tok: "EXP",       keyword: ["EXP"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "E"},
    {tok: "FILL",      keyword: ["FILL"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "F"},
    {tok: "FN",        keyword: ["FN"],              stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "F"},
    {tok: "FOR",       keyword: ["FOR"],             stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "F"},
    {tok: "FROM",      keyword: ["FROM"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "F"},
//  {tok: "GETKEY",    keyword: ["GETKEY$"],         stmt: "handler-syntax-error", meta: META.FN,
//                     expr: "token-not-impl",       args: 0, assoc: 0, prec: 0x14},
    {tok: "GOSUB",     keyword: ["GOSUB"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "G"},
    {tok: "GOTO",      keyword: ["GOTO"],            stmt: "handler-goto",         meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "G"},
    {tok: "HEX",       keyword: ["HEX$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "H"},
//  {tok: "HOME",      keyword: ["HOME"],            stmt: "handler-home",         meta: META.CMD,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "IF",        keyword: ["IF"],              stmt: "handler-if",           meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "I"},
    {tok: "INPUT",     keyword: ["INPUT"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "I"},
    {tok: "INT",       keyword: ["INT"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "I"},
    {tok: "IN",        keyword: ["IN"],              stmt: "handler-syntax-error", meta: META.FN,
                       expr: "handler-in-expr",      args: 1, assoc: 0, prec: 0x14, section: "I"},
    {tok: "KEY",       keyword: ["KEY$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0x14, section: "K"},
    {tok: "LAYER",     keyword: ["LAYER"],           stmt: "handler-layer",        meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LEFT",      keyword: ["LEFT$"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14, section: "L"},
    {tok: "LEN",       keyword: ["LEN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "L"},
    {tok: "LET",       keyword: ["LET"],             stmt: "handler-let",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LINE",      keyword: ["LINE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LIST",      keyword: ["LIST"],            stmt: "handler-list",         meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LOAD",      keyword: ["LOAD"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LOCAL",     keyword: ["LOCAL"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LOG",       keyword: ["LOG"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "L"},
    {tok: "LOOP",      keyword: ["LOOP"],            stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "L"},
    {tok: "LOWER",     keyword: ["LOWER$"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "L"},
    {tok: "MEM",       keyword: ["MEM"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "M"},
    {tok: "MID",       keyword: ["MID$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 3, assoc: 0, prec: 0x14, section: "M"},
    {tok: "MODE",      keyword: ["MODE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "M"},
    {tok: "MOUSE",     keyword: ["MOUSE"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "M"},
    {tok: "NEW",       keyword: ["NEW"],             stmt: "handler-new",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "N"},
    {tok: "NEXT",      keyword: ["NEXT"],            stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "N"},
    {tok: "NOT",       keyword: ["NOT"],             stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 1, assoc: 0xF, prec: 0x11, section: "N"},
    {tok: "OFF",       keyword: ["OFF"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "O"},
    {tok: "ON",        keyword: ["ON"],              stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "O"},
    {tok: "OPEN",      keyword: ["OPEN"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "O"},
    {tok: "OR",        keyword: ["OR"],              stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x05, section: "O"},
    {tok: "OUT",       keyword: ["OUT"],             stmt: "handler-out",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "O"},
    {tok: "PEEK",      keyword: ["PEEK"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "handler-peek-expr",    args: 2, assoc: 0, prec: 0x14, section: "P"},
    {tok: "PLAY",      keyword: ["PLAY"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "P"},
    {tok: "POINT",     keyword: ["POINT"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "P"},
    {tok: "POKE",      keyword: ["POKE"],            stmt: "handler-poke",         meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "P"},
    {tok: "PRINT",     keyword: ["PRINT", "?"],      stmt: "handler-print",        meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "P"},
    {tok: "READ",      keyword: ["READ"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "RECT",      keyword: ["RECT"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "REM",       keyword: ["REM", "'"],        stmt: "handler-rem",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "RETURN",    keyword: ["RETURN"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "RIGHT",     keyword: ["RIGHT$"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14, section: "R"},
    {tok: "RND",       keyword: ["RND"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "handler-rnd-expr",     args: 1, assoc: 0, prec: 0x14, section: "R"},
    {tok: "RENAME",    keyword: ["RENAME"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "REMOVE",    keyword: ["REMOVE"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "RESTORE",   keyword: ["RESTORE"],         stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "RUN",       keyword: ["RUN"],             stmt: "handler-run",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "R"},
    {tok: "SAVE",      keyword: ["SAVE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
//  {tok: "SCALE",     keyword: ["SCALE"],           stmt: "token-not-impl",       meta: META.CMD,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SCREEN",    keyword: ["SCREEN"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "SGN",       keyword: ["SGN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "S"},
    {tok: "SIN",       keyword: ["SIN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "S"},
    {tok: "SIZE",      keyword: ["SIZE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "SOURCE",    keyword: ["SOURCE"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "SPC",       keyword: ["SPC"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "S"},
    {tok: "SPRATTR",   keyword: ["SPRATTR"],         stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14, section: "S"},
    {tok: "SPRITE",    keyword: ["SPRITE"],          stmt: "handler-sprite",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "SQR",       keyword: ["SQR"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "S"},
    {tok: "STATUS",    keyword: ["STATUS"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "S"},
    {tok: "STEP",      keyword: ["STEP"],            stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "STICK",     keyword: ["STICK"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14, section: "S"},
    {tok: "STOP",      keyword: ["STOP"],            stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "STR",       keyword: ["STR$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "S"},
    {tok: "SUBROUTINE",keyword: ["SUB"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "SWAP",      keyword: ["SWAP"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "S"},
    {tok: "TAB",       keyword: ["TAB"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "T"},
    {tok: "TAN",       keyword: ["TAN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "T"},
    {tok: "THEN",      keyword: ["THEN"],            stmt: "handler-syntax-error", meta: META.CMD | META.ENTER_BLOCK | META.NO_TRAILING,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "T"},
    {tok: "TILESET",   keyword: ["TILESET"],         stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "T"},
    {tok: "TIME",      keyword: ["TIME"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "T"},
    {tok: "TO",        keyword: ["TO"],              stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "T"},
    {tok: "UNTIL",     keyword: ["UNTIL"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "U"},
    {tok: "UPPER",     keyword: ["UPPER$"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "U"},
    {tok: "USR",       keyword: ["USR"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "U"},
    {tok: "VAL",       keyword: ["VAL"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14, section: "V"},
    {tok: "WHILE",     keyword: ["WHILE"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00, section: "W"},
    {tok: "ADD",       keyword: ["+"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-add-expr",     args: 2, assoc: 0, prec: 0x0E, section: "op"},
    {tok: "SUB",       keyword: ["-"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-sub-expr",     args: 2, assoc: 0, prec: 0x0E, section: "op"},
    {tok: "NEG",       keyword: ["-"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-neg-expr",     args: 1, assoc: 0, prec: 0x11, section: "op"},
    {tok: "MUL",       keyword: ["*"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-mul-expr",     args: 2, assoc: 0, prec: 0x0F, section: "op"},
    {tok: "DIV",       keyword: ["/"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-div-expr",     args: 2, assoc: 0, prec: 0x0F, section: "op"},
    {tok: "MOD",       keyword: ["%"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-mod-expr",     args: 2, assoc: 0, prec: 0x0F, section: "op"},
    {tok: "POW",       keyword: ["^"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 2, assoc: 0xF, prec: 0x10, section: "op"},
    {tok: "NEQ",       keyword: ["<>", "!="],        stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-neq-expr",     args: 2, assoc: 0, prec: 0x0B, section: "op"},
    {tok: "LTE",       keyword: ["<=", "=<"],        stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-lte-expr",     args: 2, assoc: 0, prec: 0x0C, section: "op"},
    {tok: "GTE",       keyword: [">=", "=>"],        stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-gte-expr",     args: 2, assoc: 0, prec: 0x0C, section: "op"},
    {tok: "LT",        keyword: ["<"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-lt-expr",      args: 2, assoc: 0, prec: 0x0C, section: "op"},
    {tok: "GT",        keyword: [">"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-gt-expr",      args: 2, assoc: 0, prec: 0x0C, section: "op"},
    {tok: "EQU",       keyword: ["="],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-equ-expr",     args: 2, assoc: 0, prec: 0x0B, section: "op"},
    {tok: "LPAR",      keyword: ["("],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "0xFFFE",               args: 2, assoc: 0, prec: 0x15, section: "op"},
    {tok: "RPAR",      keyword: [")"],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "0xFFFF",               args: 2, assoc: 0, prec: 0x15, section: "op"},
//  {tok: "LBRACKET",  keyword: ["["],               stmt: "handler-syntax-error", meta: META.GROUP,
//                     expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
//  {tok: "RBRACKET",  keyword: ["]"],               stmt: "handler-syntax-error", meta: META.GROUP,
//                     expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "COMMA",     keyword: [","],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "0x0000",               args: 0, assoc: 0, prec: 0x01, section: "op"},
    {tok: "SEMICOLON", keyword: [";"],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "op"},
    {tok:"END_OF_STMT",keyword: [":"],               stmt: "token-not-impl",     meta: META.GROUP,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "op"},
    {tok: "REAL",      idx: 249,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
    {tok: "VARIABLE",  idx: 250,                     stmt: "handler-assignment",   meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
    {tok:"CODE_STRING",idx: 251,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
    {tok: "STRING",    idx: 252,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
    {tok: "DWORD",     idx: 253,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
    {tok: "WORD",      idx: 254,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
    {tok: "BYTE",      idx: 255,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF, section: "tok"},
];

function generateTokenTable() {
    let curToken = 128;
    let sections = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,op,tok".split(",").reduce((acc, sec) => {
        acc[sec] = {
            label: null,
            count: 0
        };
        return acc;
    }, {});
    let keywordsSection=`
        keywords:
`;
    let tokenVectors=`
            token-vectors:
`;
    for (let {tok, idx, keyword, stmt, expr, args, assoc, prec, meta, section} of tokens) {
        if (!idx) idx = curToken;
        curToken++;
        if (!sections[section].label) {
            sections[section].label = `_${tok.toLowerCase()}-keyword`;
        }
        sections[section].count++;
        keywordsSection += `                                ` + `.const TOK_${tok}`.padEnd(40) + `${idx}\n`;
        if (keyword) {
            keyword.forEach((item, idx) => {
                if (idx === 0) keywordsSection += `            ` + `_${tok.toLowerCase()}-keyword:`.padEnd(20) + `.string "${item}"`.padEnd(23)+ `, constants.NUL, TOK_${tok}\n`;
                else           keywordsSection += `            ` + ` `                             .padEnd(20) + `.string "${item}"`.padEnd(23)+ `, constants.NUL, TOK_${tok}\n`;
            });
            tokenVectors += `               .word _${tok.toLowerCase()}-keyword, 0b${(meta || 0).toString(2).padStart(16, "0")}\n`;
        }
    }

    return `
.segment brodata kmemmap.basic.rodata-start .append {
${keywordsSection}
            _end-of-token-table: .byte constants.NUL
${tokenVectors}
            token-sections:
${Object.entries(sections).map(([k, section]) => {
    return section.label !== "_real-keyword" ? `
                .word ${section.label || "0x0000"}, ${section.count}     # ${k}` : ``
}).join("")}
}
`;
}

function createTable() {
    let table = Array.from({length: 256}, (_, idx) => ({
        idx, stmt: "token-not-impl",
        expr: "token-not-impl", 
        assoc: 0, prec: 0, args: 0
    }));
    let curToken = 128;
    for (let {tok, idx, keyword, stmt, expr, args, assoc, prec} of tokens) {
        if (!idx) idx = curToken;
        curToken++;
        table[idx] = {idx, tok, keyword, stmt, expr, args, assoc, prec};
    }
    return table;
}

function generateStmtTable() {
    const tokenTable = createTable();
    let code = `.segment __current__ kmemmap.basic.code-start .append {
    statement-handlers:
`;
    for (let entry of tokenTable) {
        if (entry && entry.idx > 127) {
            let {tok, idx, keyword, stmt} = entry;
            code += `        .word ${stmt.padEnd(32)} # ${idx}, ${keyword || tok}\n`
        }
    }
    code += `}\n`;
    return code;
}

function generateExprTable() {
    const tokenTable = createTable();
    let code = `.segment __current__ kmemmap.basic.code-start .append {
    expression-handlers:
`;
    for (let entry of tokenTable) {
        if (entry && entry.idx > 127) {
            let {tok, idx, keyword, stmt, expr, args, assoc, prec} = entry;
            const secondWord = ((args << 12) | (assoc << 8) | prec).toString(16).toUpperCase().padStart(4, "0");
            code += `        .word ${expr.padEnd(32)},0x${secondWord} # ${idx}, ${keyword || tok}\n`
        }
    }
    code += `}\n`;
    return code;
}

switch ((process.argv[process.argv.length - 1] || "").toLowerCase()) {
    case "tokens":
        process.stdout.write(generateTokenTable());
        break;
    case "stmt":
        process.stdout.write(generateStmtTable());
        break;
    case "expr":
        process.stdout.write(generateExprTable());
        break;
    default:
}