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
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "AND",       keyword: ["AND"],             stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x06},
    {tok: "ASC",       keyword: ["ASC"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "ASM",       keyword: ["ASM"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "ATN",       keyword: ["ATN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "AT",        keyword: ["AT"],              stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "BOX",       keyword: ["BOX"],             stmt: "token-not-impl",       meta: META.CMD,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "CALL",      keyword: ["CALL"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "CATALOG",   keyword: ["CATALOG"],         stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "CHRS",      keyword: ["CHRS$"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "CHR",       keyword: ["CHR$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "CIRCLE",    keyword: ["CIRCLE"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "CLS",       keyword: ["CLS"],             stmt: "handler-clear-screen", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "CLOSE",     keyword: ["CLOSE"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "CONTINUE",  keyword: ["CONTINUE", "CONT"], stmt: "token-not-impl",      meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "COLOR",     keyword: ["COLOR"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "COPY",      keyword: ["COPY"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "COS",       keyword: ["COS"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "DATA",      keyword: ["DATA"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "DEF",       keyword: ["DEF"],             stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "DEFFN",     keyword: ["DEFFN"],           stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "DEFSUB",    keyword: ["DEFSUB"],          stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "DIM",       keyword: ["DIM"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "DO",        keyword: ["DO"],              stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "DRAW",      keyword: ["DRAW"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "ELSEIF",    keyword: ["ELSEIF"],          stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK | META.ENTER_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "ELSE",      keyword: ["ELSE"],            stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "ENDSUB",    keyword: ["ENDSUB"],          stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "ENDFN",     keyword: ["ENDFN"],           stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "ENDIF",     keyword: ["ENDIF"],           stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "END",       keyword: ["END"],             stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "EXP",       keyword: ["EXP"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "FILL",      keyword: ["FILL"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "FN",        keyword: ["FN"],              stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "FOR",       keyword: ["FOR"],             stmt: "token-not-impl",       meta: META.CMD | META.ENTER_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "FROM",      keyword: ["FROM"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "GETKEY",    keyword: ["GETKEY$"],         stmt: "handler-syntax-error", meta: META.FN,
//                     expr: "token-not-impl",       args: 0, assoc: 0, prec: 0x14},
    {tok: "GOSUB",     keyword: ["GOSUB"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "GOTO",      keyword: ["GOTO"],            stmt: "handler-goto",         meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "HEX",       keyword: ["HEX$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
//  {tok: "HOME",      keyword: ["HOME"],            stmt: "handler-home",         meta: META.CMD,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "IF",        keyword: ["IF"],              stmt: "handler-if",           meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "INPUT",     keyword: ["INPUT"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "INT",       keyword: ["INT"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "IN",        keyword: ["IN"],              stmt: "handler-syntax-error", meta: META.FN,
                       expr: "handler-in-expr",      args: 1, assoc: 0, prec: 0x14},
    {tok: "KEY",       keyword: ["KEY$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0x14},
    {tok: "LAYER",     keyword: ["LAYER"],           stmt: "handler-layer",        meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LEFT",      keyword: ["LEFT$"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "LEN",       keyword: ["LEN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "LET",       keyword: ["LET"],             stmt: "handler-let",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LINE",      keyword: ["LINE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LIST",      keyword: ["LIST"],            stmt: "handler-list",         meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LOAD",      keyword: ["LOAD"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LOCAL",     keyword: ["LOCAL"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LOG",       keyword: ["LOG"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "LOOP",      keyword: ["LOOP"],            stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "LOWER",     keyword: ["LOWER$"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "MEM",       keyword: ["MEM"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "MID",       keyword: ["MID$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 3, assoc: 0, prec: 0x14},
    {tok: "MODE",      keyword: ["MODE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "MOUSE",     keyword: ["MOUSE"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "NEW",       keyword: ["NEW"],             stmt: "handler-new",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "NEXT",      keyword: ["NEXT"],            stmt: "token-not-impl",       meta: META.CMD | META.LEAVE_BLOCK,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "NOT",       keyword: ["NOT"],             stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 1, assoc: 0xF, prec: 0x11},
    {tok: "OFF",       keyword: ["OFF"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "ON",        keyword: ["ON"],              stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "OPEN",      keyword: ["OPEN"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "OR",        keyword: ["OR"],              stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x05},
    {tok: "OUT",       keyword: ["OUT"],             stmt: "handler-out",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "PEEK",      keyword: ["PEEK"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "handler-peek-expr",    args: 2, assoc: 0, prec: 0x14},
    {tok: "PLAY",      keyword: ["PLAY"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "POINT",     keyword: ["POINT"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "POKE",      keyword: ["POKE"],            stmt: "handler-poke",         meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "PRINT",     keyword: ["PRINT", "?"],      stmt: "handler-print",        meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "READ",      keyword: ["READ"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "RECT",      keyword: ["RECT"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "REM",       keyword: ["REM", "'"],        stmt: "handler-rem",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "RETURN",    keyword: ["RETURN"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "RIGHT",     keyword: ["RIGHT$"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "RND",       keyword: ["RND"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "handler-rnd-expr",     args: 1, assoc: 0, prec: 0x14},
    {tok: "RENAME",    keyword: ["RENAME"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "REMOVE",    keyword: ["REMOVE"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "RESTORE",   keyword: ["RESTORE"],         stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "RUN",       keyword: ["RUN"],             stmt: "handler-run",          meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SAVE",      keyword: ["SAVE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
//  {tok: "SCALE",     keyword: ["SCALE"],           stmt: "token-not-impl",       meta: META.CMD,
//                     expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SCREEN",    keyword: ["SCREEN"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SGN",       keyword: ["SGN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "SIN",       keyword: ["SIN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "SIZE",      keyword: ["SIZE"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SOURCE",    keyword: ["SOURCE"],          stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SPC",       keyword: ["SPC"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "SPRATTR",   keyword: ["SPRATTR"],         stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "SPRITE",    keyword: ["SPRITE"],          stmt: "handler-sprite",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SQR",       keyword: ["SQR"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "STATUS",    keyword: ["STATUS"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "STEP",      keyword: ["STEP"],            stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "STICK",     keyword: ["STICK"],           stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "STOP",      keyword: ["STOP"],            stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "STR",       keyword: ["STR$"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "SUBROUTINE",keyword: ["SUB"],             stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "SWAP",      keyword: ["SWAP"],            stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "TAB",       keyword: ["TAB"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "TAN",       keyword: ["TAN"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "THEN",      keyword: ["THEN"],            stmt: "handler-syntax-error", meta: META.CMD | META.ENTER_BLOCK | META.NO_TRAILING,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "TILESET",   keyword: ["TILESET"],         stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "TIME",      keyword: ["TIME"],            stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "TO",        keyword: ["TO"],              stmt: "handler-syntax-error", meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "UNTIL",     keyword: ["UNTIL"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "UPPER",     keyword: ["UPPER$"],          stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "USR",       keyword: ["USR"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "VAL",       keyword: ["VAL"],             stmt: "handler-syntax-error", meta: META.FN,
                       expr: "token-not-impl",       args: 1, assoc: 0, prec: 0x14},
    {tok: "WHILE",     keyword: ["WHILE"],           stmt: "token-not-impl",       meta: META.CMD,
                       expr: "handler-syntax-error", args: 0, assoc: 0, prec: 0x00},
    {tok: "ADD",       keyword: ["+"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-add-expr",     args: 2, assoc: 0, prec: 0x0E},
    {tok: "SUB",       keyword: ["-"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-sub-expr",     args: 2, assoc: 0, prec: 0x0E},
    {tok: "NEG",       keyword: ["-"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-neg-expr",     args: 1, assoc: 0, prec: 0x11},
    {tok: "MUL",       keyword: ["*"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-mul-expr",     args: 2, assoc: 0, prec: 0x0F},
    {tok: "DIV",       keyword: ["/"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-div-expr",     args: 2, assoc: 0, prec: 0x0F},
    {tok: "MOD",       keyword: ["%"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-mod-expr",     args: 2, assoc: 0, prec: 0x0F},
    {tok: "POW",       keyword: ["^"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "token-not-impl",       args: 2, assoc: 0xF, prec: 0x10},
    {tok: "NEQ",       keyword: ["<>", "!="],        stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-neq-expr",     args: 2, assoc: 0, prec: 0x0B},
    {tok: "LTE",       keyword: ["<=", "=<"],        stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-lte-expr",     args: 2, assoc: 0, prec: 0x0C},
    {tok: "GTE",       keyword: [">=", "=>"],        stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-gte-expr",     args: 2, assoc: 0, prec: 0x0C},
    {tok: "LT",        keyword: ["<"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-lt-expr",      args: 2, assoc: 0, prec: 0x0C},
    {tok: "GT",        keyword: [">"],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-gt-expr",      args: 2, assoc: 0, prec: 0x0C},
    {tok: "EQU",       keyword: ["="],               stmt: "handler-syntax-error", meta: META.OP,
                       expr: "handler-equ-expr",     args: 2, assoc: 0, prec: 0x0B},
    {tok: "LPAR",      keyword: ["("],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "0xFFFE",               args: 2, assoc: 0, prec: 0x15},
    {tok: "RPAR",      keyword: [")"],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "0xFFFF",               args: 2, assoc: 0, prec: 0x15},
//  {tok: "LBRACKET",  keyword: ["["],               stmt: "handler-syntax-error", meta: META.GROUP,
//                     expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
//  {tok: "RBRACKET",  keyword: ["]"],               stmt: "handler-syntax-error", meta: META.GROUP,
//                     expr: "token-not-impl",       args: 2, assoc: 0, prec: 0x14},
    {tok: "COMMA",     keyword: [","],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "0x0000",               args: 0, assoc: 0, prec: 0x01},
    {tok: "SEMICOLON", keyword: [";"],               stmt: "handler-syntax-error", meta: META.GROUP,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok:"END_OF_STMT",keyword: [":"],               stmt: "token-not-impl",     meta: META.GROUP,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok: "REAL",      idx: 249,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok: "VARIABLE",  idx: 250,                     stmt: "handler-assignment",   meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok:"CODE_STRING",idx: 251,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok: "STRING",    idx: 252,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok: "DWORD",     idx: 253,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok: "WORD",      idx: 254,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
    {tok: "BYTE",      idx: 255,                     stmt: "handler-syntax-error", meta: 0,
                       expr: "token-not-impl",       args: 0, assoc: 0, prec: 0xFF},
];

function generateTokenTable() {
    let curToken = 128;
    let keywordsSection=`
        keywords:
`;
    let tokenVectors=`
            token-vectors:
`;
    for (let {tok, idx, keyword, stmt, expr, args, assoc, prec, meta} of tokens) {
        if (!idx) idx = curToken;
        curToken++;
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