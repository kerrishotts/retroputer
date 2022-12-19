let importProvider = {
    tryImport(name) { throw new Error("Import not supported in this environment."); },
    importFinally() { }
};

let depth = 0;
function debug(...args) {
    const cli = globalThis.cli;
    const str = Array.from({length: depth}, _ => ".").join("");
    if (cli) {
        cli.debug(str + args.join(" "));
    }
}


import { parser } from "./parser.js";

import { MODES, TOKENS, OPCODES, DIRECTIVES, REGISTERS, FLAGS } from "./constants.js";

export const SCOPE = {
    CONTENTS: Symbol("SCOPE.CONTENTS"),
    TYPE: Symbol("SCOPE.TYPE"),
    TYPES: {
        ANONYMOUS: "anonymous",
        GLOBAL: "global",
        NAMESPACE: "namespace",
        SEGMENT: "segment",
        BLOCK: "block",
    },
    NAME: Symbol("SCOPE.NAME"),
    BASE: Symbol("SCOPE.BASE"),
    ADDR: Symbol("SCOPE.ADDR"),
    DATA: Symbol("SCOPE.DATA"),
    PARENT: Symbol("SCOPE.PARENT"),
    ADJUSTED: Symbol("SCOPE.ADJUSTED"),
    SEGMENTS: Symbol("SCOPE.SEGMENTS")
};

let lastPos = {
    line: 1,
    column: 1
}

function err(msg) {
    throw new Error(`${msg} at ${lastPos.line}:${lastPos.column}`);
}

function getScopeChain(context, global) {
    let str = ""
    while (context && context !== global) {
        str = str + "." + context[SCOPE.NAME];
        context = context[SCOPE.PARENT];
    }
    return str.substr(1);
}

/**
 * Creates a new scope. Scopes are simple dictionaries that contain
 * the indentifiers, addresses, and more within a namespace or
 * segment.
 *
 * @param {string} [type=SCOPE.TYPES.GLOBAL] Type of scope
 * @param {*}      [parent]                    Parent of scope
 * @param {string} [name]                      Name of scope
 * @param {number} [addr]                      Address for code/data gen
 * @param {boolean} [append=false]             if append is false, reset address
 * @returns
 */
export function createScope(type = SCOPE.TYPES.GLOBAL, parent, name, addr, append = false) {
    const scope = {
        [SCOPE.CONTENTS]: {},
        [SCOPE.TYPE]: type,
        [SCOPE.BASE]: addr,
        [SCOPE.ADDR]: addr,
        [SCOPE.DATA]: [],
        [SCOPE.PARENT]: parent,
        [SCOPE.NAME]: name,
        [SCOPE.ADJUSTED]: undefined,
        [SCOPE.SEGMENTS]: []
    };
    if (parent && type !== SCOPE.TYPES.BLOCK) {
        if (!parent[name]) {
            parent[name] = scope;
        } else {
            if (parent[name][SCOPE.TYPE] !== type) {
                // can't change the type of a scope!
                err(`Scope ${name} already declared with type ${parent[name][SCOPE.TYPE]}, but tried to change to ${type}.`);
            }
            if (parent[name][SCOPE.BASE] !== addr) {
                err(`Scope ${name} already declared with base address ${parent[name][SCOPE.BASE]}, but tried to change it to ${addr}`);
            }
            if (type === SCOPE.TYPES.SEGMENT) {
                if (!append) {
                    parent[name][SCOPE.ADDR] = addr;
                }
            }
            return parent[name];
        }
    }
    return scope;
}

/**
 * Finds an identifier in the supplied scope chain (context)
 *
 * @param {*} ident
 * @param {*} [context={}]
 * @returns {*} ident node
 */
function findIdent(ident, context = {}) {
    const parts = ident.split(".");
    const head = parts.length > 1 ? parts.shift() : undefined,
        last = parts.pop();
    let curContext = context;

    if (head !== undefined) {
        // need to find at which part we can find the root
        let rootContext = context;
        while (!rootContext.hasOwnProperty(head)) {
            rootContext = rootContext[SCOPE.PARENT];
            if (!rootContext) {
                err(`Could not locate ${ident} in current scope chain.`);
            }
        }
        // now follow the tail down from the root context
        curContext = rootContext[head];
        parts.forEach(part => {
            if (curContext.hasOwnProperty(part)) {
                curContext = curContext[part];
            } else {
                err(`Could not locate ${ident} in current scope chain.`);
            }
        });
    }
    if (curContext[SCOPE.CONTENTS].hasOwnProperty(last)) {
        return curContext[SCOPE.CONTENTS][last];
    }
    if (head === undefined) {
        while (!curContext[SCOPE.CONTENTS].hasOwnProperty(last)) {
            curContext = curContext[SCOPE.PARENT];
            if (!curContext) {
                err(`Could not locate ${ident} in current scope chain.`);
            }
        }
        return curContext[SCOPE.CONTENTS][last];
    }
    err(`Could not locate ${ident} in current scope chain.`);
}

function evaluate(node, context) {
    if (node === undefined || node === null) return; //err("Encountered undefined node in AST");
    if (typeof node === "number" || typeof node === "string" || typeof node === "boolean") {
        // return the value as-is: nothing further can be done
        return node;
    }
    lastPos = node.pos;
    switch (node.type) {
        case TOKENS.FUNCTION: 
            {
                switch (node.fn) {
                    case "ADDRBANK":
                        return (evaluate(node.param, context) & 0x70000) >> 3;
                    case "ADDRBOFS":
                        return (evaluate(node.param, context) & 0x0FFFF);
                    case "ADDRPAGE":
                        return (evaluate(node.param, context) & 0x7C000) >> 3;
                    case "ADDRPOFS":
                        return (evaluate(node.param, context) & 0x03FFF);
                    case "ASC":
                        return (evaluate(node.param, context).charCodeAt(0));
                    case "NEXT":
                        const cur = evalaute(node.param, context);
                        context[SCOPE.CONTENTS][node.param.ident] = cur + 1;
                        return cur;
                        
                    default:
                        err(`Unimplemented function: ${node.fn}`);
                }
            }
        case TOKENS.MACRO_EXPANSION:
            {
                const macro = findIdent(node.name.ident, context);
                const addr = context[SCOPE.ADDR];
                const name = `macro-${++macro_id}`;
                const newContext = createScope(SCOPE.TYPES.BLOCK, context, name, addr, false);

                const argsArray = node.args; //Array.isArray(node.args[0]) ? node.args[0] : [node.args];

                macro.params.forEach((param, idx) => {
                    newContext[SCOPE.CONTENTS][param.ident] = {
                        params: [],
                        ast: argsArray[idx]
                    };
                });
                if (macro.ast.type === TOKENS.MEMORY) {
                    return macro.ast;
                }
    //console.info(`there2`, macro.ast)
                const r = evaluate(macro.ast, newContext)
    //console.info(`there3`, r)
                return r;
            }
            break;
        case TOKENS.UNARY_EXPRESSION:
            {
                switch (node.op) {
                    case "-": return -(evaluate(node.r, context));
                    case "!": return (evaluate(node.r, context) ^ 0xFFFFFFFF);
                    default:
                        err(`Unexpected operator in unary expression: ${node.op}`);
                }
            }
        case TOKENS.BINARY_EXPRESSION:
            {
                switch (node.op) {
                    case "+": return evaluate(node.l, context) + evaluate(node.r, context);
                    case "-": return evaluate(node.l, context) - evaluate(node.r, context);
                    case "*": return evaluate(node.l, context) * evaluate(node.r, context);
                    case "/": return evaluate(node.l, context) / evaluate(node.r, context);
                    case "&": return evaluate(node.l, context) & evaluate(node.r, context);
                    case "|": return evaluate(node.l, context) | evaluate(node.r, context);
                    case "^": return evaluate(node.l, context) ^ evaluate(node.r, context);
                    case "<<": return evaluate(node.l, context) << evaluate(node.r, context);
                    case ">>": return evaluate(node.l, context) >> evaluate(node.r, context);
                    default:
                        err(`Unexpected operator in binary expression: ${node.op}`);
                }
            }
        case TOKENS.IDENTIFIER:
            {
                const v = findIdent(node.ident, context);
                return evaluate(v, context);
            }
        case TOKENS.INTEGER:
        case TOKENS.STRING:
            return node.value;
        case TOKENS.MEMORY:
            return evaluate(node.addr, context);
        case TOKENS.REGISTER:
        case TOKENS.FLAG:
        case TOKENS.CONDITIONAL:
            return node;
        default:
            err(`Unexpected token in expression ${node.type}`);
    }
}

/**
 * Try to assemble an instruction. "Try" is the operative word,
 * because if the instruction references an identifier not yet
 * assigned, we'll have to wait until it _is_ defined. In the
 * latter case, though, we can at least return the size.
 *
 * @param {*} node    an instruction to attempt to assemble
 * @param {*} context associated context
 * @param {*} pc      the current location
 * @returns {{size: number, bytes: number[]}} Data
 */
function tryToAssemble(node, context, pc, fail = false) {
    if (node.type !== TOKENS.INSTRUCTION) {
        err(`Tried to assemble an unexpected token: ${node}`);
    }

    let { op, dest, source, reg, addr, flag, imm, x, y, i, m, bankReg, offsReg, condition } = node;


    try {
        let evalParts = [dest, source, reg, flag, imm, bankReg, offsReg].map(n => {
            if ((n !== undefined && n !== null) && n.type === TOKENS.MACRO_EXPANSION) return evaluate(n, context);
            return n;
        });
        [dest, source, reg, flag, imm, bankReg, offsReg] = evalParts;
    } catch (err) { }

    let size = 0,
        bytes = [];

    try {
        switch (op) {
            case OPCODES.FCLR:   size = 2; bytes.push(0xAE, 0x00); break;
            case OPCODES.FADD:   size = 2; bytes.push(0xAE, 0x10); break;
            case OPCODES.FSUB:   size = 2; bytes.push(0xAE, 0x11); break;
            case OPCODES.FCMP:   size = 2; bytes.push(0xAE, 0x12); break;
            case OPCODES.FMUL:   size = 2; bytes.push(0xAE, 0x13); break;
            case OPCODES.FMOD:   size = 2; bytes.push(0xAE, 0x14); break;
            case OPCODES.FDIV:   size = 2; bytes.push(0xAE, 0x15); break;
            case OPCODES.FPOW:   size = 2; bytes.push(0xAE, 0x16); break;
            case OPCODES.FSQRT:  size = 2; bytes.push(0xAE, 0x17); break;
            case OPCODES.FNEG:   size = 2; bytes.push(0xAE, 0x18); break;
            case OPCODES.FEXC:   size = 2; bytes.push(0xAE, 0x19); break;
            case OPCODES.FINT:   size = 2; bytes.push(0xAE, 0x1A); break;
            case OPCODES.FABS:   size = 2; bytes.push(0xAE, 0x1B); break;
            case OPCODES.FSIN:   size = 2; bytes.push(0xAE, 0x20); break;
            case OPCODES.FCOS:   size = 2; bytes.push(0xAE, 0x21); break;
            case OPCODES.FTAN:   size = 2; bytes.push(0xAE, 0x22); break;
            case OPCODES.FASIN:  size = 2; bytes.push(0xAE, 0x24); break;
            case OPCODES.FACOS:  size = 2; bytes.push(0xAE, 0x25); break;
            case OPCODES.FATAN:  size = 2; bytes.push(0xAE, 0x26); break;
            case OPCODES.FISNAN: size = 2; bytes.push(0xAE, 0x30); break;
            case OPCODES.FISINF: size = 2; bytes.push(0xAE, 0x31); break;
            case OPCODES.FLOG2:  size = 2; bytes.push(0xAE, 0x32); break;
            case OPCODES.FLOG10: size = 2; bytes.push(0xAE, 0x33); break;
            case OPCODES.FLD0:   size = 2; bytes.push(0xAE, 0x70); break;
            case OPCODES.FLD1:   size = 2; bytes.push(0xAE, 0x71); break;
            case OPCODES.FLDE:   size = 2; bytes.push(0xAE, 0x72); break;
            case OPCODES.FLDPI:  size = 2; bytes.push(0xAE, 0x73); break;
            case OPCODES.FLDR:   size = 3; bytes.push(0xAE, 0x80, reg.idx); break;
            case OPCODES.FLDM:   size = 3; bytes.push(0xAE, 0x81, (bankReg.idx << 4) | offsReg.idx); break;
            case OPCODES.FLDIM:  size = 3; bytes.push(0xAE, 0x82, (bankReg.idx << 4) | offsReg.idx); break;
            case OPCODES.FSTR:   size = 3; bytes.push(0xAE, 0x84, reg.idx); break;
            case OPCODES.FSTM:   size = 3; bytes.push(0xAE, 0x85, (bankReg.idx << 4) | offsReg.idx); break;
            case OPCODES.FSTIM:  size = 3; bytes.push(0xAE, 0x86, (bankReg.idx << 4) | offsReg.idx); break;
            case OPCODES.NOP: size = 1; bytes.push(0x00); break;
            case OPCODES.HALT: size = 1; bytes.push(0x3E); break;
            case OPCODES.BRK: size = 1; bytes.push(0x3F); break;
            case OPCODES.PUSHALL: size = 1; bytes.push(0xA0); break;
            case OPCODES.POPALL: size = 1; bytes.push(0xA1); break;
            case OPCODES.PUSHF: size = 1; bytes.push(0xA2); break;
            case OPCODES.POPF: size = 1; bytes.push(0xA3); break;
            case OPCODES.PUSHMM: size = 1; bytes.push(0xA4); break;
            case OPCODES.POPMM: size = 1; bytes.push(0xA5); break;
            case OPCODES.RET: size = 1; bytes.push(0xA7); break;
            case OPCODES.SET: size = 1; bytes.push(0xB0 | flag.flag); break;
            case OPCODES.CLR: size = 1; bytes.push(0xB8 | flag.flag); break;
            case OPCODES.INC: size = 1; bytes.push(0xC0 | reg.idx); break;
            case OPCODES.DEC: size = 1; bytes.push(0xD0 | reg.idx); break;
            case OPCODES.PUSH: size = 1; bytes.push(0xE0 | reg.idx); break;
            case OPCODES.POP: size = 1; bytes.push(0xF0 | reg.idx); break;
            case OPCODES.NOT: size = 2; bytes.push(0x09, reg.idx); break;
            case OPCODES.NEG: size = 2; bytes.push(0x09, 0x10 | reg.idx); break;
            case OPCODES.EXC: size = 2; bytes.push(0x09, 0x20 | reg.idx); break;
            case OPCODES.SWAP: size = 2; bytes.push(0x0E, (dest.idx << 4) | source.idx); break;
            case OPCODES.MOV: size = 2; bytes.push(0x0F, (dest.idx << 4) | source.idx); break;
            case OPCODES.MUL: size = 2; bytes.push(0xA8, (dest.idx << 4) | source.idx); break;
            case OPCODES.DIV: size = 2; bytes.push(0xA9, (dest.idx << 4) | source.idx); break;
            case OPCODES.MOD: size = 2; bytes.push(0xAA, (dest.idx << 4) | source.idx); break;
            case OPCODES.SMUL: size = 2; bytes.push(0xAB, (dest.idx << 4) | source.idx); break;
            case OPCODES.SDIV: size = 2; bytes.push(0xAC, (dest.idx << 4) | source.idx); break;
            case OPCODES.SMOD: size = 2; bytes.push(0xAD, (dest.idx << 4) | source.idx); break;
            case OPCODES.TRAP: {
                {
                    size = imm ? 2 : 1;
                    if (imm) {
                        bytes.push(0x08);
                        bytes.push(evaluate(imm, context) & 0xFF);
                    }
                }
                break;
            }
            case OPCODES.SHL:
            case OPCODES.SHR:
                {
                    size = 2;
                    if (imm) {
                        bytes.push(op === OPCODES.SHL ? 0x0A : 0x0C, (dest.idx << 4) | evaluate(imm, context) & 0x0F);
                    } else {
                        bytes.push(op === OPCODES.SHL ? 0x0B : 0x0D, (dest.idx << 4) | source.idx);
                    }
                }
                break;
            case OPCODES.IN:
            case OPCODES.OUT:
                size = 3;
                bytes.push(op === OPCODES.IN ? 0x30 : 0x31, reg.idx << 4, evaluate(imm, context) & 0xFF);
                break;
            case OPCODES.ENTER:
            case OPCODES.EXIT:
                size = 2;
                bytes.push(op === OPCODES.ENTER ? 0x38 : 0x39, evaluate(imm, context) & 0xFF);
                break;
            case OPCODES.WAIT: size = 2; bytes.push(0xAF, evaluate(imm, context) & 0xFF); break;
            case OPCODES.LD:
                {
                    bytes.push(0x10 | dest.idx);
                    if (source.m === MODES.IMMEDIATE || source.m === undefined) {
                        size = dest.size + 2;
                        const v = evaluate(source.addr !== undefined ? source.addr : source, context);
                        bytes.push(0x00);
                        if (dest.size === 1) {
                            bytes.push(v & 0xFF);
                        } else {
                            bytes.push((v & 0xFF00) >> 8);
                            bytes.push(v & 0x00FF);
                        }
                    } else {
                        size = 4;
                        const a = evaluate(source.addr, context) & 0x7FFFF;
                        bytes.push((source.m << 6) |
                            ((source.i ? 1 : 0) << 5) |
                            ((source.x ? 1 : 0) << 4) |
                            ((source.y ? 1 : 0) << 3) |
                            (a & 0x70000) >> 16,
                            (a & 0x0FF00) >> 8,
                            (a & 0x000FF));
                    }
                }
                break;
            case OPCODES.ST:
                {
                    size = 4;
                    bytes.push(0x20 | source.idx);
                    const a = evaluate(dest.addr, context) & 0x7FFFF;
                    bytes.push((dest.m << 6) |
                        ((dest.i ? 1 : 0) << 5) |
                        ((dest.x ? 1 : 0) << 4) |
                        ((dest.y ? 1 : 0) << 3) |
                        (a & 0x70000) >> 16,
                        (a & 0x0FF00) >> 8,
                        (a & 0x000FF));
                }
                break;
            case OPCODES.LOOP:
            case OPCODES.LOOPS:
                {
                    size = op === OPCODES.LOOP ? 4 : 3;
                    const a = evaluate(addr.addr, context) & 0x0FFFF;
                    let r = a;
                    if (addr.m === 0) { // relative
                        const npc = (pc + size) & 0x0FFFF;
                        r = a - npc;
                        if (size === 3) {
                            if (r > 127 || r < -128) {
                                err(`Attempted to loop beyond short range`);
                            }
                        } else {
                            if (r > 32767 || r < -32768) {
                                err(`Attempted to loop beyond range`);
                            }
                        }
                    }
                    bytes.push(0x80 | reg.idx,
                        (addr.m << 6) |
                        ((addr.i ? 1 : 0) << 5) |
                        ((addr.x ? 1 : 0) << 4) |
                        ((addr.y ? 1 : 0) << 3) |
                        ((size === 3 ? 1 : 0)));
                    if (size === 3) {
                        bytes.push((r & 0x000FF));
                    } else {
                        bytes.push((r & 0x0FF00) >> 8, (r & 0x000FF));
                    }
                }
                break;
            case OPCODES.CALL:
            case OPCODES.CALLS:
            case OPCODES.BR:
            case OPCODES.BRS:
                {
                    size = (op === OPCODES.CALL || op === OPCODES.BR) ? 4 : 3;
                    const isCall = (op === OPCODES.CALL || op === OPCODES.CALLS);
                    const a = evaluate(addr.addr, context) & 0x0FFFF;
                    let r = a;
                    if (addr.m === 0) { // relative
                        const npc = (pc + size) & 0x0FFFF;
                        r = a - npc;
                        /*
                        if (size === 3) {
                            if (r > 127 || r < -128) {
                                err(`Attempted to ${isCall ? "call" : "branch"}  beyond short range`);
                            }
                        } else {
                            if (r > 32767 || r < -32768) {
                                err(`Attempted to  ${isCall ? "call" : "branch"} beyond range`);
                            }
                        }
                        */
                    }

                    let flagSpecific = false;
                    if ( (!flag && !condition) || flag) {
                        const neg = (flag && flag.neg);
                        const flg = (flag && flag.flag) || 0;
                        bytes.push(0x90 | (neg ? 1 : 0) << 3 | flg);
                        if (flag) flagSpecific = true;
                    } else {
                        // condition
                        switch (condition.conditional) {
                            case "==":
                                bytes.push(0x90); flagSpecific = true; break;
                            case "!=":
                                bytes.push(0x98); flagSpecific = true; break;
                            case "s<=":
                                bytes.push(0x90 | 0b0011); break;
                            case "s<":
                                bytes.push(0x90 | 0b0010); break;
                            case "s>=":
                                bytes.push(0x90 | 0b0101); break;
                            case "s>":
                                bytes.push(0x90 | 0b0100); break;
                            case "u<=":
                                bytes.push(0x90 | 0b1011); break;
                            case "u<":
                                bytes.push(0x90 | 0b1010); break;
                            case "u>=":
                                bytes.push(0x90 | 0b1101); break;
                            case "u>":
                                bytes.push(0x90 | 0b1100); break;
                        }
                    }
                    bytes.push( (addr.m << 6) |
                                ((addr.i ? 1 : 0) << 5) |
                                ((addr.x ? 1 : 0) << 4) |
                                ((addr.y ? 1 : 0) << 3) |
                                (((!flagSpecific) ? 1 : 0) << 2) | // not flag-specific
                                ((isCall ? 1 : 0) << 1) | // BR | CALL
                                ((size === 3 ? 1 : 0)));
                    if (size === 3) {
                        bytes.push((r & 0x000FF));
                    } else {
                        bytes.push((r & 0x0FF00) >> 8, (r & 0x000FF));
                    }
                }
                break;
            case OPCODES.ADD:
            case OPCODES.SUB:
            case OPCODES.CMP:
            case OPCODES.AND:
            case OPCODES.OR:
            case OPCODES.TEST:
            case OPCODES.XOR: {
                //console.info(`cmp`, dest, source)
                size = imm ? 1 + dest.size : 2;
                if (imm) {
                    bytes.push(({
                        [OPCODES.ADD]: 0x48,
                        [OPCODES.SUB]: 0x50,
                        [OPCODES.CMP]: 0x58,
                        [OPCODES.AND]: 0x60,
                        [OPCODES.OR]: 0x68,
                        [OPCODES.TEST]: 0x70,
                        [OPCODES.XOR]: 0x78
                    })[op] | dest.idx);
                    if (dest.size === 1) {
                        bytes.push(evaluate(imm, context) & 0xFF);
                    } else {
                        const v = evaluate(imm, context) & 0xFFFF;
                        bytes.push((v & 0xFF00) >> 8);
                        bytes.push(v & 0x00FF);
                    }
                } else {
                    bytes.push(({
                        [OPCODES.ADD]: 0x01,
                        [OPCODES.SUB]: 0x02,
                        [OPCODES.CMP]: 0x03,
                        [OPCODES.AND]: 0x04,
                        [OPCODES.OR]: 0x05,
                        [OPCODES.TEST]: 0x06,
                        [OPCODES.XOR]: 0x07
                    })[op]);
                    bytes.push((dest.idx << 4) | (source.idx));
                }
                break;
            }
        }
    } catch (err) {
        bytes = undefined;
        if (fail) {
            throw err;
        }
        if (!err.message.startsWith("Could not locate")) {
            throw err;
        }
    }
    return { size, bytes };
}

let block_id = 0;
let macro_id = 0;
export function assemble(ast, global, context) {
    try {
    depth+=1;
    debug(">");

    global = global || createScope();
    if (!context) { context = global; }
    if (!ast) {
        err(`Tried to assemble an undefined AST.`);
    }
    if (!ast.forEach) {
        if (ast.type === TOKENS.BLOCK && ast.block) {
            return assemble(ast.block, global, context);
        }
        err(`Tried to assemble invalid AST ${JSON.stringify(ast)}`);
    }
    for (let node of ast) {
        lastPos = node.pos;             // always mark the last visited source
        // code position so we can display
        // meaningful error messages
        switch (node.type) {
            default:
            case TOKENS.COMMENT:
                {
                    // do nothing :-)
                }
                break;
            case TOKENS.IMPORT_DIRECTIVE:
                {
                    const name = node.path.value;
                    debug(`IMPO ${name}...`)
                    const fileContents = importProvider.tryImport(name);
                    debug(`PARS ${name}...`)
                    const ast = parser.parse(fileContents);
                    try {
                        debug(`ASM  ${name}...`)
                        assemble(ast, global, context);
                    } catch (err) {
                        throw err;
                    } finally {
                        debug(`DONE ${name}`)
                        importProvider.importFinally();
                    }
                }
                break;
            case TOKENS.NAMESPACE_DIRECTIVE:
                {
                    const name = node.name.ident;
                    if (name !== "__current__") {
                        debug(`NSPC ${node.name.ident}...`)
                        const newContext = createScope(SCOPE.TYPES.NAMESPACE, context, name);
                        assemble(node.block, global, newContext);
                    } else {
                        assemble(node.block, global, context);
                    }
                }
                break;
            case TOKENS.SEGMENT_DIRECTIVE:
                {
                    const name = node.name.ident;
                    if (name !== "__current__") {
                        let baseAddr = evaluate(node.addr, context);
                        let matchingSegments = global[SCOPE.SEGMENTS]
                            .filter(seg => (seg[SCOPE.BASE] === baseAddr || seg[SCOPE.ADJUSTED] === baseAddr) && 
                                        getScopeChain(seg[SCOPE.PARENT], global) !== getScopeChain(context, global));
                        let newContext;
                        if (matchingSegments.length > 0) {
                            matchingSegments= matchingSegments.sort((a, b) => a[SCOPE.ADDR] < b[SCOPE.ADDR] ? -1 : a[SCOPE.ADDR] > b[SCOPE.ADDR] ? 1 : 0);
                            const nextAddr = matchingSegments[matchingSegments.length - 1][SCOPE.ADDR];
                            newContext = createScope(SCOPE.TYPES.SEGMENT, context, node.name.ident, nextAddr, node.append);
                            newContext[SCOPE.ADJUSTED] = baseAddr;
                        } else {
                            newContext = createScope(SCOPE.TYPES.SEGMENT, context, node.name.ident, baseAddr, node.append);
                        }
                        if (global[SCOPE.SEGMENTS].indexOf(newContext) < 0) {
                            global[SCOPE.SEGMENTS].push(newContext);
                        }
                        debug(`SEGM ${newContext[SCOPE.NAME]}...`)
                        assemble(node.block, global, newContext);
                    } else {
                        assemble(node.block, global, context);
                    }
                }
                break;
            case TOKENS.BLOCK:
                {
                    const addr = context[SCOPE.ADDR];
                    const name = `block-${++block_id}`;
                    debug(`BLCK ${name}...`)
                    const newContext = createScope(SCOPE.TYPES.BLOCK, context, name, addr, false);
                    try {
                        assemble(node.block, global, newContext);
                    } catch(err) {
                        //console.log(`failed block ${addr}`);
                    }
                    // put the data back into the current context
                    newContext[SCOPE.DATA].forEach(data => {
                        context[SCOPE.DATA][context[SCOPE.ADDR]] = {
                            asm: data.asm,
                            bytes: data.bytes,
                            size: data.size,
                            pc: data.pc,
                            context: data.context
                        };
                        context[SCOPE.ADDR] += data.size;
                    });
                }
                break;
            case TOKENS.CONST_DIRECTIVE:
                {
                    if (context[SCOPE.CONTENTS].hasOwnProperty(node.name.ident)) {
                        err(`Cannot redefine constant ${node.name.ident}`);
                    }
                    context[SCOPE.CONTENTS][node.name.ident] = node.value;
                }
                break;
            case TOKENS.MACRO_DIRECTIVE:
                {
                    if (context[SCOPE.CONTENTS].hasOwnProperty(node.name.ident)) {
                        err(`Cannot redefine macro ${node.name.ident}`);
                    }
                    context[SCOPE.CONTENTS][node.name.ident] = {
                        params: node.params,
                        ast: node.ast
                    };
                }
                break;
            // the remaining tokens must be in a segment
            case TOKENS.LABEL:
                {
                    if (context[SCOPE.TYPE] !== SCOPE.TYPES.SEGMENT && context[SCOPE.TYPE] !== SCOPE.TYPES.BLOCK) {
                        err(`Unexpected label ${node.name.ident} in ${context[SCOPE.NAME]} scope`);
                    }
                    //console.log(node.name.ident, context[SCOPE.NAME]);
                    context[SCOPE.CONTENTS][node.name.ident] = context[SCOPE.ADDR];
                    break;
                }
            case TOKENS.WORD_DIRECTIVE:
            case TOKENS.BYTE_DIRECTIVE:
                {
                    if (context[SCOPE.TYPE] !== SCOPE.TYPES.SEGMENT && context[SCOPE.TYPE] !== SCOPE.TYPES.BLOCK) {
                        err(`Unexpected data directive in ${context[SCOPE.NAME]} scope`);
                    }
                    const incAmount = node.type === TOKENS.WORD_DIRECTIVE ? 2 : 1;
                    const size = node.size ? evaluate(node.size, context) : -1;
                    const data = (node.data || []).map(e => evaluate(e, context));
                    while (data.length < size) {
                        data.push(0);
                    }

                    const bytes = [];
                    data.forEach(v => {
                        if (incAmount === 1) {
                            bytes.push(v & 0xFF);
                        } else {
                            bytes.push((v & 0xFF00) >> 8);
                            bytes.push((v & 0x00FF));
                        }
                    });

                    context[SCOPE.DATA][context[SCOPE.ADDR]] = {
                        asm: node,
                        size: bytes.length,
                        bytes
                    };

                    context[SCOPE.ADDR] += bytes.length;
                }
                break;
            case TOKENS.STRING_DIRECTIVE:
                {
                    if (context[SCOPE.TYPE] !== SCOPE.TYPES.SEGMENT && context[SCOPE.TYPE] !== SCOPE.TYPES.BLOCK) {
                        err(`Unexpected string directive in ${context[SCOPE.NAME]} scope`);
                    }
                    const data = (node.data || []).map(el => evaluate(el, context))
                        .reduce((bytes, data) => {
                            if (typeof data === "string") {
                                bytes.push(...data.split("").map(ch => ch.charCodeAt(0)));
                            } else {
                                bytes.push(data)
                            }
                            return bytes;
                        }, []);
                    //const data = evaluate(node.data, context).split("").map(ch => ch.charCodeAt(0));
                    context[SCOPE.DATA][context[SCOPE.ADDR]] = {
                        asm: node,
                        bytes: data,
                        size: data.length,
                        pc: context[SCOPE.ADDR],
                        context
                    };

                    context[SCOPE.ADDR] += data.length;
                    break;
                }
            case TOKENS.MACRO_EXPANSION:
                {
                    //console.info(`In macro ${node.name.ident}`)
                    const macro = findIdent(node.name.ident, context);
                    const addr = context[SCOPE.ADDR];
                    const name = `macro-${++macro_id}`;
                    debug(`MCRO ${name}...`)
                    const newContext = createScope(SCOPE.TYPES.BLOCK, context, name, addr, false);
                    //console.info(`... with ${macro.params.length} parameters...`, node.args);

                    const argsArray = node.args; //Array.isArray(node.args[0]) ? node.args[0] : [node.args];

                    //console.info(`... ... transformed`, argsArray);
                    macro.params.forEach((param, idx) => {
                        //console.info(`... ... ${param.ident} = ${JSON.stringify(argsArray[idx])}`)
                        newContext[SCOPE.CONTENTS][param.ident] = {
                            params: [],
                            ast: argsArray[idx]
                        }
                    });

                    try {
                        assemble(macro.ast, global, newContext);
                    } catch (err) {}

                    newContext[SCOPE.DATA].forEach(data => {
                        context[SCOPE.DATA][context[SCOPE.ADDR]] = {
                            asm: data.asm,
                            bytes: data.bytes,
                            size: data.size,
                            pc: data.pc,
                            context: data.context
                        };
                        context[SCOPE.ADDR] += data.size;
                    });
                }
                break;
            case TOKENS.INSTRUCTION:
                {
                    if (context[SCOPE.TYPE] !== SCOPE.TYPES.SEGMENT && context[SCOPE.TYPE] !== SCOPE.TYPES.BLOCK) {
                        err(`Unexpected code in ${context[SCOPE.NAME]} scope`);
                    }
                    const { size, bytes } = tryToAssemble(node, context, context[SCOPE.ADDR]);
                    context[SCOPE.DATA][context[SCOPE.ADDR]] = {
                        asm: node,
                        bytes,
                        size,
                        pc: context[SCOPE.ADDR],
                        context
                    };
                    context[SCOPE.ADDR] += size;
                    break;
                }
        }
    }

    // retry any failed assembly instructions
    const segments = global[SCOPE.SEGMENTS];

    let code = [];
    if (depth<2) {
    debug ("CODE", segments.map(segment => segment[SCOPE.NAME]).join(", "));
    for (let segment of segments) {
        const data = segment[SCOPE.DATA];
        const contents = segment[SCOPE.CONTENTS];
        const bytes = data.map((datum, idx) => {
            if (datum) {
                const { asm, bytes, context, pc } = datum;
                if (bytes === undefined) {
                    try {
                        debug("TTAS");
                        const { bytes: newBytes } = tryToAssemble(asm, context, pc, true);
                        if (newBytes) {
                            datum.bytes = newBytes;
                        } else {
                            err(`Could not locate symbol`);
                        }
                    } catch (err) {
                        //console.log(util.inspect(context[SCOPE.NAME]));
                        throw err;
                    }
                }
                // if the instruction has its own bytes specified, see if we match
                if (asm.bytes) {
                    const matchBytes = asm.bytes.map(byte => evaluate(byte, context));
                    if (datum.bytes.join(",") !== matchBytes.join(",")) {
                        err(`Bytes mismatched at ${asm.pos.line}:${asm.pos.column}. Expected ${matchBytes.map(b => b.toString(16).padStart(2, "0"))}; saw ${datum.bytes.map(b => b.toString(16).padStart(2, "0"))}`);
                    }
                }
                return { idx, bytes: datum.bytes };
            }
        });
        const arr = bytes.reduce((arr, item) => {
            if (!item) {
                err(`Non-contiguous code or data in segment ${segment[SCOPE.NAME]}`);
            }
            arr.push(...item.bytes);
            return arr;
        }, []);
        code.push({ 
            name: segment[SCOPE.NAME], 
            addr: segment[SCOPE.BASE], 
            length: arr.length, 
            data: arr, 
            contents, 
            chain: getScopeChain(segment, global), 
            adj: !!segment[SCOPE.ADJUSTED] 
        });
    }
    }
    // return the segments
    return code.sort((a, b) => a.addr < b.addr ? -1 : a.addr > b.addr ? 1 : 0);


    } finally {
        debug("<");
        depth-=1;
    }

}

export const setImportProvider = theImportProvider => {
    importProvider = theImportProvider;
}