import { REGISTER_NAMES, FLAG_NAMES, OPCODES } from "./constants.js";

const toNum = (n, width, base) => 
    ((n < 0) ? "-" : "") +
    (base === 16 ? "0x" : base === 2 ? "0b" : "") + 
    (Math.abs(n) || 0).toString(base).padStart(base === 16 ? width : base === 2 ? width*8 : 0, "0")
    .toUpperCase();

const address = ( {size, instruction, opcode, base} = {} ) => {
    const modeByte = size === 3 ? (instruction & 0x0000FF00) >>> 8 : (instruction & 0x00FF0000) >>> 16;
    const reg = size === 3 ? (instruction & 0x000F0000) >>> 16 : (instruction & 0x0F000000) >>> 24;
    const flg = size === 3 ? (instruction & 0x00070000) >>> 16 : (instruction & 0x07000000) >>> 24;
    const cond = size === 3 ? (instruction & 0x000F0000) >>> 16 : (instruction & 0x0F000000) >>> 24;
    const negate = !!(size === 3 ? (instruction & 0x00080000) : (instruction & 0x08000000));
    const indirect =     !!(modeByte & 0b00100000);
    const indexByX =     !!(modeByte & 0b00010000);
    const indexByY =     !!(modeByte & 0b00001000);
    const addressingMode = (modeByte & 0b11000000) >> 6;
    const short =        !!(modeByte & 0b00000001);
    const which =        !!(modeByte & 0b00000010);
    const always =       !!(modeByte & 0b00000100);
    const canBeRelative = !(opcode === OPCODES.LD || opcode === OPCODES.ST );
    const usesFlags = opcode === OPCODES.BR || opcode === OPCODES.BRS || opcode === OPCODES.CALL || opcode === OPCODES.CALLS;
    const isLoadOrStore = opcode === OPCODES.LD || opcode === OPCODES.ST;
    let v = size === 3 ? (instruction & 0x000000FF) : (instruction & 0x0000FFFF);
    if (isLoadOrStore) v |= size === 3 ? (instruction & 0x00000700) : (instruction & 0x00070000);

    const relV19 = -(v & 0x40000) + (v & 0x3FFFF);
    const relV16 = -(v & 0x8000) + (v & 0x7FFF);
    const relV8 = -(v & 0x80) + (v & 0x7F);

    let out = `${opcode}`;
    if (usesFlags) {
        if (!always) {
            out = `${out} ${negate ? "!" : ""}${FLAG_NAMES[flg]},`;
        } else {
            switch (cond) {
                case 0b0000:
                    break;
                case 0b0010:
                    out = `${out} .lt,`; break;
                case 0b0011:
                    out = `${out} .lte,`; break;
                case 0b0100:
                    out = `${out} .gt,`; break;
                case 0b0101:
                    out = `${out} .gte,`; break;
                case 0b1010:
                    out = `${out} .blo,`; break;
                case 0b1011:
                    out = `${out} .ble,`; break;
                case 0b1100:
                    out = `${out} .abv,`; break;
                case 0b1101:
                    out = `${out} .abe,`; break;
                default:
                    out = `${out} .???,`;
            }
        }
    }  else {
        if (opcode === OPCODES.LD || opcode === OPCODES.LOOP || opcode === OPCODES.LOOPS) {
            out = `${out} ${REGISTER_NAMES[reg]},`;
        }
    }
    switch (addressingMode) {
        case 0b00:
            if (indirect) {
                out = `${out} ?${toNum(v, (size - 2) * 2, base)}?`;
            } else {
                if (opcode === OPCODES.CALLS || opcode === OPCODES.BRS) out = `${out} ${toNum(relV8, (size - 2) * 2, base)} `;
                else if (opcode === OPCODES.CALL || opcode === OPCODES.BR) out = `${out} ${toNum(relV16, (size - 2) * 2, base)} `;
                else out = `${out} ${toNum(v, (size - 2) * 2, base)} `;
            }
            break;
        case 0b01:
            if (indirect) {
                out = `${out} <${toNum(v, (size - 2) * 2, base)}>`;
            } else {
                out = `${out} [${toNum(v, (size - 2) * 2, base)}]`;
            }
            break;
        case 0b10:
            if (indirect) {
                out = `${out} <BP+${toNum(relV19, (size - 2) * 2, base)}>`;
            } else {
                out = `${out} [BP+${toNum(relV19, (size - 2) * 2, base)}]`;
            }
            break;
        case 0b11:
            if (indirect) {
                out = `${out} <D+${toNum(v, (size - 2) * 2, base)}>`;
            } else {
                out = `${out} [D+${toNum(v, (size - 2) * 2, base)}]`;
            }
            break;
    }
    if (indexByX) {
        out = `${out.substr(0, out.length - 1)}, X${out.substr(out.length - 1)}`;
    }
    if (indexByY) {
        if (!indirect) {
            out = `${out.substr(0, out.length - 1)}, Y${out.substr(out.length - 1)}`;
        } else out = `${out}, Y`;
    }
    if (!usesFlags) {
        if (opcode === OPCODES.ST) {
            out = `${out}, ${REGISTER_NAMES[reg]}`;
        }
    }

    return out;
}

export function disassemble(bytes, { base = 16 } = {}) {
    let complete = false;
    let instruction = 0;
    let byte = 0;
    let size = 0
    let idx = 0;
    let code;
    let op, p1;

    while (!complete && idx < bytes.length) {
        byte = bytes[idx];
        idx += 1;
        if (byte === undefined) { return null; }
        instruction = (instruction << 8) | byte;
        size = idx;
        if (size > 4) { return null; }

        op = (instruction >> ((size - 1) << 3)) & 0xFF;

        if (size === 1) {
            // one byte, single variant instructions
            if (op === 0x00) { code = `${OPCODES.NOP}`; }
            if (op === 0x3E) { code = `${OPCODES.HALT}`; }
            if (op === 0x3F) { code = `${OPCODES.BRK}`; }
            if (op === 0xA0) { code = `${OPCODES.PUSHALL}`; }
            if (op === 0xA1) { code = `${OPCODES.POPALL}`; }
            if (op === 0xA2) { code = `${OPCODES.PUSHF}`; }
            if (op === 0xA3) { code = `${OPCODES.POPF}`; }
            if (op === 0xA4) { code = `${OPCODES.PUSHMM}`; }
            if (op === 0xA5) { code = `${OPCODES.POPMM}`; }
            if (op === 0xA7) { code = `${OPCODES.RET}`; }

            // one byte, operand instructions
            if (op >= 0x40 && op <= 0x47) { code = `${OPCODES.TRAP} ${REGISTER_NAMES[op & 0x07]}`; }
            if (op >= 0xB0 && op <= 0xB7) { code = `${OPCODES.SET} ${FLAG_NAMES[op & 0x07]}`; }
            if (op >= 0xB8 && op <= 0xBF) { code = `${OPCODES.CLR} ${FLAG_NAMES[op & 0x07]}`; }
            if (op >= 0xC0 && op <= 0xCF) { code = `${OPCODES.INC} ${REGISTER_NAMES[op & 0x0F]}`; }
            if (op >= 0xD0 && op <= 0xDF) { code = `${OPCODES.DEC} ${REGISTER_NAMES[op & 0x0F]}`; }
            if (op >= 0xE0 && op <= 0xEF) { code = `${OPCODES.PUSH} ${REGISTER_NAMES[op & 0x0F]}`; }
            if (op >= 0xF0 && op <= 0xFF) { code = `${OPCODES.POP} ${REGISTER_NAMES[op & 0x0F]}`; }
        }

        p1 = size > 1 ? ((instruction >> ((size - 2) << 3)) & 0xFF) : 0;

        if (size === 2) {
            if (op === 0x01) { code = `${OPCODES.ADD} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x02) { code = `${OPCODES.SUB} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x03) { code = `${OPCODES.CMP} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x04) { code = `${OPCODES.AND} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x05) { code = `${OPCODES.OR} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x06) { code = `${OPCODES.TEST} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x07) { code = `${OPCODES.XOR} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x08) { code = `${OPCODES.TRAP} ${toNum(p1, 2, base)}`; }
            if (op === 0x09) {
                if (p1 >= 0x00 && p1 <= 0x0F) { code = `${OPCODES.NOT} ${REGISTER_NAMES[(p1 & 0x0F)]}`; }
                if (p1 >= 0x10 && p1 <= 0x1F) { code = `${OPCODES.NEG} ${REGISTER_NAMES[(p1 & 0x0F)]}`; }
                if (p1 >= 0x20 && p1 <= 0x2F) { code = `${OPCODES.EXC} ${REGISTER_NAMES[(p1 & 0x0F)]}`; }
            }
            if (op === 0x0A) { code = `${OPCODES.SHL} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${toNum(p1 & 0x0F, 2, base)}`; }
            if (op === 0x0B) { code = `${OPCODES.SHL} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x0C) { code = `${OPCODES.SHR} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${toNum(p1 & 0x0F, 2, base)}`; }
            if (op === 0x0D) { code = `${OPCODES.SHR} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x0E) { code = `${OPCODES.SWAP} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x0F) { code = `${OPCODES.MOV} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0x38) { code = `${OPCODES.ENTER} ${toNum(p1, 2, base)}`; }
            if (op === 0x39) { code = `${OPCODES.EXIT} ${toNum(p1, 2, base)}`; }
            if (op === 0xA8) { code = `${OPCODES.MUL} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0xA9) { code = `${OPCODES.DIV} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0xAA) { code = `${OPCODES.MOD} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0xAB) { code = `${OPCODES.SMUL} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0xAC) { code = `${OPCODES.SDIV} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0xAD) { code = `${OPCODES.SMOD} ${REGISTER_NAMES[(p1 & 0xF0) >> 4]}, ${REGISTER_NAMES[p1 & 0x0F]}`; }
            if (op === 0xAE) { 
                switch (p1) {
                    case 0x00: code = `${OPCODES.FCLR}`; break;
                    case 0x10: code = `${OPCODES.FADD}`; break;
                    case 0x11: code = `${OPCODES.FSUB}`; break;
                    case 0x12: code = `${OPCODES.FCMP}`; break;
                    case 0x13: code = `${OPCODES.FMUL}`; break;
                    case 0x14: code = `${OPCODES.FMOD}`; break;
                    case 0x15: code = `${OPCODES.FDIV}`; break;
                    case 0x16: code = `${OPCODES.FPOW}`; break;
                    case 0x17: code = `${OPCODES.FSQRT}`; break;
                    case 0x18: code = `${OPCODES.FNEG}`; break;
                    case 0x19: code = `${OPCODES.FEXC}`; break;
                    case 0x1A: code = `${OPCODES.FINT}`; break;
                    case 0x1B: code = `${OPCODES.FABS}`; break;
                    case 0x20: code = `${OPCODES.FSIN}`; break;
                    case 0x21: code = `${OPCODES.FCOS}`; break;
                    case 0x22: code = `${OPCODES.FTAN}`; break;
                    case 0x24: code = `${OPCODES.FASIN}`; break;
                    case 0x25: code = `${OPCODES.FACOS}`; break;
                    case 0x26: code = `${OPCODES.FATAN}`; break;
                    case 0x30: code = `${OPCODES.FISNAN}`; break;
                    case 0x31: code = `${OPCODES.FISINF}`; break;
                    case 0x32: code = `${OPCODES.FLOG2}`; break;
                    case 0x33: code = `${OPCODES.FLOG10}`; break;
                    case 0x70: code = `${OPCODES.FLD0}`; break;
                    case 0x71: code = `${OPCODES.FLD1}`; break;
                    case 0x72: code = `${OPCODES.FLDE}`; break;
                    case 0x73: code = `${OPCODES.FLDPI}`; break;
                }
            }
            if (op >= 0x48 && op <= 0x4F && (op & 1) === 1) { code = `${OPCODES.ADD} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
            if (op >= 0x50 && op <= 0x57 && (op & 1) === 1) { code = `${OPCODES.SUB} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
            if (op >= 0x58 && op <= 0x5F && (op & 1) === 1) { code = `${OPCODES.CMP} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
            if (op >= 0x60 && op <= 0x67 && (op & 1) === 1) { code = `${OPCODES.AND} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
            if (op >= 0x68 && op <= 0x6F && (op & 1) === 1) { code = `${OPCODES.OR} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
            if (op >= 0x70 && op <= 0x77 && (op & 1) === 1) { code = `${OPCODES.TEST} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
            if (op >= 0x78 && op <= 0x7F && (op & 1) === 1) { code = `${OPCODES.XOR} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1, 2, base)}`; }
        }
        const p2 = size > 2 ? ((instruction >> ((size - 3) << 3)) & 0xFF) : 0;

        if (size === 3) {
            if (op >= 0x48 && op <= 0x4F && (op & 1) === 0) { code = `${OPCODES.ADD} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1 << 8 | p2, 4, base)}`; }
            if (op >= 0x50 && op <= 0x57 && (op & 1) === 0) { code = `${OPCODES.SUB} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1 << 8 | p2, 4, base)}`; }
            if (op >= 0x58 && op <= 0x5F && (op & 1) === 0) { code = `${OPCODES.CMP} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1 << 8 | p2, 4, base)}`; }
            if (op >= 0x60 && op <= 0x67 && (op & 1) === 0) { code = `${OPCODES.AND} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1 << 8 | p2, 4, base)}`; }
            if (op >= 0x68 && op <= 0x6F && (op & 1) === 0) { code = `${OPCODES.OR} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1 << 8 | p2, 4, base)}`; }
            if (op >= 0x70 && op <= 0x77 && (op & 1) === 0) { code = `${OPCODES.TEST} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p1 << 8 | p2, 4, base)}`; }
            if (op >= 0x78 && op <= 0x7F && (op & 1) === 0) { code = `${OPCODES.XOR} ${REGISTER_NAMES[op & 0x07]}, ${toNum(p2 << 8 | p2, 4, base)}`; }
            if (op >= 0x10 && op <= 0x1F && (op & 1) === 1 && p1 === 0x00) { code = address({size, instruction, base, opcode: OPCODES.LD}); }
            if (op === 0x30) { code = `${OPCODES.IN} ${REGISTER_NAMES[p1 >>> 4]}, ${toNum(p2, 2, base)}`; }
            if (op === 0x31) { code = `${OPCODES.OUT} ${toNum(p2, 2, base)}, ${REGISTER_NAMES[p1 >>> 4]}`; }
            if ( op >= 0x80 && op <= 0x8F && (p1 & 1) === 1) { code = address({size, instruction, base,  opcode: OPCODES.LOOPS}); }
            if ( op >= 0x90 && op <= 0x9F && (p1 & 1) === 1) { code = address({size, instruction, base, opcode: (p1 & 0b10) ? OPCODES.CALLS : OPCODES.BRS}); }
            if (op === 0xAE) {
                switch (p1) {
                    case 0x80: code = `${OPCODES.FLDR} ${REGISTER_NAMES[p2 & 0x0F]}`; break;
                    case 0x81: code = `${OPCODES.FLDM} [${REGISTER_NAMES[(p2 & 0xF0) >> 4]}, ${REGISTER_NAMES[p2 & 0x0F]}]`; break;
                    case 0x82: code = `${OPCODES.FLDIM} <${REGISTER_NAMES[(p2 & 0xF0) >> 4]}, ${REGISTER_NAMES[p2 & 0x0F]}>`; break;
                    case 0x84: code = `${OPCODES.FSTR} ${REGISTER_NAMES[p2 & 0x0F]}`; break;
                    case 0x85: code = `${OPCODES.FSTM} [${REGISTER_NAMES[(p2 & 0xF0) >> 4]}, ${REGISTER_NAMES[p2 & 0x0F]}]`; break;
                    case 0x86: code = `${OPCODES.FSTIM} <${REGISTER_NAMES[(p2 & 0xF0) >> 4]}, ${REGISTER_NAMES[p2 & 0x0F]}>`; break;
                    default: 
                        code = `???`;
                }
            }
        }

        const p3 = size > 3 ? ((instruction >> ((size - 4) << 3)) & 0xFF) : 0;

        if (size === 4) {
            if (op >= 0x10 && op <= 0x1F && (op & 1) === 0 && p1 === 0x00) { code = address({size, instruction, base, opcode: OPCODES.LD}); }
            if (op >= 0x10 && op <= 0x1F /*&& (op & 1) === 0*/ && p1 != 0x00) { code = address({size, instruction, base, opcode: OPCODES.LD}); }
            if (op >= 0x20 && op <= 0x2F ) { code = address({size, instruction, base, opcode: OPCODES.ST}); }
            if ( op >= 0x80 && op <= 0x8F && (p1 & 1) === 0) { code = address({size, instruction, base, opcode: OPCODES.LOOP}); }
            if ( op >= 0x90 && op <= 0x9F && (p1 & 1) === 0) { code = address({size, instruction, base, opcode: (p1 & 0b10) ? OPCODES.CALL : OPCODES.BR}); }
        }

        complete = code !== undefined;

    }
    if (!complete) { return null; }
    return { size, code, instruction };
}

export function disassembleAll(bytes, { base = 16, addr} = {}) {
    const arr = bytes.map(i => i);
    let out = "";
    let offset = 0;
    while (arr.length > 0) {
        let result, idx = 1, code = "", size = 0;
        do {
            const tryBytes = arr.slice(0, idx + 1);
            result = disassemble(tryBytes, base);
            idx++;
        } while (result === null && idx < arr.length && idx < 5 );
        if (result) {
            size = result.size;
            code = result.code;
        } else {
            code = "???";
            size = 1;
        }
        const used = arr.splice(0, size);
        out += (addr !== undefined ? toNum(addr + offset, 5, 16).substr(2) + ": " : "") + 
            used.map(b => toNum(b, 2, 16).substr(2)).join(" ").padEnd(11, " ") + 
            "    " + 
            code + 
            "\n";
        offset += size;
    }
    return out;
}
