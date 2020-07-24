import { OPCODES, decodeToTasks, decode } from "./opcodes.js";

export const INVALID_INSTRUCTION = {
    size: 0,
    tasks: null
};

export const INVALID_DECODE = {
    size: 0,
    opcode: null,
    instruction: 0
};


const opMap = [
    null,      // size 0 insts don't exist
    new Map(), // size 1 instructions
    new Map(), // size 2
    new Map(), // size 3
    new Map()  // size 4
];

/**
 * @export
 * @param {number[]} bytes
 * @returns {*}
 */
function _decodeInstruction(bytes) {
    let complete = false;
    let instruction = 0;
    let byte = 0;
    let size = 0
    let idx = 0;
    let opcode;
    let op, p1;

    while (!complete) {
        byte = bytes[idx];
        idx += 1;
        if (byte === undefined) {
            return INVALID_DECODE; // definitely not a valid instruction
        }
        instruction = (instruction << 8) | byte;
        size = idx;
        if (size > 4) {
            return INVALID_DECODE; // no longer a valid instruction
        }

        op = (instruction >> ((size - 1) << 3)) & 0xFF;

        if (size === 1) {
            // one byte, single variant instructions
            if (op === 0x00) { opcode = OPCODES.nop; }
            if (op === 0x3E) { opcode = OPCODES.halt; }
            if (op === 0x3F) { opcode = OPCODES.brk; }
            if (op === 0xA0) { opcode = OPCODES.pushall; }
            if (op === 0xA1) { opcode = OPCODES.popall; }
            if (op === 0xA2) { opcode = OPCODES.pushf; }
            if (op === 0xA3) { opcode = OPCODES.popf; }
            if (op === 0xA4) { opcode = OPCODES.pushmm; }
            if (op === 0xA5) { opcode = OPCODES.popmm; }
            if (op === 0xA7) { opcode = OPCODES.ret; }

            // one byte, operand instructions
            if (op >= 0x40 && op <= 0x47) { opcode = OPCODES.trap_r; }
            if (op >= 0xB0 && op <= 0xB7) { opcode = OPCODES.set_f; }
            if (op >= 0xB8 && op <= 0xBF) { opcode = OPCODES.clr_f; }
            if (op >= 0xC0 && op <= 0xCF) { opcode = OPCODES.inc_r; }
            if (op >= 0xD0 && op <= 0xDF) { opcode = OPCODES.dec_r; }
            if (op >= 0xE0 && op <= 0xEF) { opcode = OPCODES.push_r; }
            if (op >= 0xF0 && op <= 0xFF) { opcode = OPCODES.pop_r; }
        }

        p1 = size > 1 ? ((instruction >> ((size - 2) << 3)) & 0xFF) : 0;

        if (size === 2) {
            if (op === 0x01) { opcode = OPCODES.add_ds; }
            if (op === 0x02) { opcode = OPCODES.sub_ds; }
            if (op === 0x03) { opcode = OPCODES.cmp_ds; }
            if (op === 0x04) { opcode = OPCODES.and_ds; }
            if (op === 0x05) { opcode = OPCODES.or_ds; }
            if (op === 0x06) { opcode = OPCODES.test_ds; }
            if (op === 0x07) { opcode = OPCODES.xor_ds; }
            if (op === 0x08) { opcode = OPCODES.trap_b; }
            if (op === 0x09) {
                if (p1 >= 0x00 && p1 <= 0x0F) { opcode = OPCODES.not; }
                if (p1 >= 0x10 && p1 <= 0x1F) { opcode = OPCODES.neg; }
                if (p1 >= 0x20 && p1 <= 0x2F) { opcode = OPCODES.exc; }
            }
            if (op === 0x0A) { opcode = OPCODES.shl_rn; }
            if (op === 0x0B) { opcode = OPCODES.shl_ds; }
            if (op === 0x0C) { opcode = OPCODES.shr_rn; }
            if (op === 0x0D) { opcode = OPCODES.shr_ds; }
            if (op === 0x0E) { opcode = OPCODES.swap_ds; }
            if (op === 0x0F) { opcode = OPCODES.mov_ds; }
            if (op === 0x38) { opcode = OPCODES.enter_n; }
            if (op === 0x39) { opcode = OPCODES.exit_n; }
            if (op === 0xA8) { opcode = OPCODES.mul_ds; }
            if (op === 0xA9) { opcode = OPCODES.div_ds; }
            if (op === 0xAA) { opcode = OPCODES.mod_ds; }
            if (op === 0xAB) { opcode = OPCODES.smul_ds; }
            if (op === 0xAC) { opcode = OPCODES.sdiv_ds; }
            if (op === 0xAD) { opcode = OPCODES.smod_ds; }
            if (op === 0xAE) { 
                switch (p1) {
                    case 0x00: opcode = OPCODES.fclr; break;
                    case 0x10: opcode = OPCODES.fadd; break;
                    case 0x11: opcode = OPCODES.fsub; break;
                    case 0x12: opcode = OPCODES.fcmp; break;
                    case 0x13: opcode = OPCODES.fmul; break;
                    case 0x14: opcode = OPCODES.fmod; break;
                    case 0x15: opcode = OPCODES.fdiv; break;
                    case 0x16: opcode = OPCODES.fpow; break;
                    case 0x17: opcode = OPCODES.fsqrt; break;
                    case 0x18: opcode = OPCODES.fneg; break;
                    case 0x19: opcode = OPCODES.fexc; break;
                    case 0x1A: opcode = OPCODES.fint; break;
                    case 0x1B: opcode = OPCODES.fabs; break;
                    case 0x20: opcode = OPCODES.fsin; break;
                    case 0x21: opcode = OPCODES.fcos; break;
                    case 0x22: opcode = OPCODES.ftan; break;
                    case 0x24: opcode = OPCODES.fasin; break;
                    case 0x25: opcode = OPCODES.facos; break;
                    case 0x26: opcode = OPCODES.fatan; break;
                    case 0x30: opcode = OPCODES.fisnan; break;
                    case 0x31: opcode = OPCODES.fisinf; break;
                    case 0x32: opcode = OPCODES.flog2; break;
                    case 0x33: opcode = OPCODES.flog10; break;
                    case 0x70: opcode = OPCODES.fld0; break;
                    case 0x71: opcode = OPCODES.fld1; break;
                    case 0x72: opcode = OPCODES.flde; break;
                    case 0x73: opcode = OPCODES.fldpi; break;
                    default: 
                }
            }
            if (op === 0xAF) { opcode = OPCODES.wait; }
            if (op >= 0x48 && op <= 0x4F && (op & 1) === 1) { opcode = OPCODES.add_db; }
            if (op >= 0x50 && op <= 0x57 && (op & 1) === 1) { opcode = OPCODES.sub_db; }
            if (op >= 0x58 && op <= 0x5F && (op & 1) === 1) { opcode = OPCODES.cmp_db; }
            if (op >= 0x60 && op <= 0x67 && (op & 1) === 1) { opcode = OPCODES.and_db; }
            if (op >= 0x68 && op <= 0x6F && (op & 1) === 1) { opcode = OPCODES.or_db; }
            if (op >= 0x70 && op <= 0x77 && (op & 1) === 1) { opcode = OPCODES.test_db; }
            if (op >= 0x78 && op <= 0x7F && (op & 1) === 1) { opcode = OPCODES.xor_db; }
        }

        if (size === 3) {
            if (op >= 0x48 && op <= 0x4F && (op & 1) === 0) { opcode = OPCODES.add_dw; }
            if (op >= 0x50 && op <= 0x57 && (op & 1) === 0) { opcode = OPCODES.sub_dw; }
            if (op >= 0x58 && op <= 0x5F && (op & 1) === 0) { opcode = OPCODES.cmp_dw; }
            if (op >= 0x60 && op <= 0x67 && (op & 1) === 0) { opcode = OPCODES.and_dw; }
            if (op >= 0x68 && op <= 0x6F && (op & 1) === 0) { opcode = OPCODES.or_dw; }
            if (op >= 0x70 && op <= 0x77 && (op & 1) === 0) { opcode = OPCODES.test_dw; }
            if (op >= 0x78 && op <= 0x7F && (op & 1) === 0) { opcode = OPCODES.xor_dw; }
            if (op >= 0x10 && op <= 0x1F && (op & 1) === 1 && p1 === 0x00) { opcode = OPCODES.ld_db; }
            if (op === 0x30) { opcode = OPCODES.in_rp; }
            if (op === 0x31) { opcode = OPCODES.out_rp; }
            if ( op >= 0x80 && op <= 0x8F && (p1 & 1) === 1) { opcode = OPCODES.loops_r; }
            if ( op >= 0x90 && op <= 0x9F && (p1 & 1) === 1) { opcode = OPCODES.brs_calls_f; }
            if (op === 0xAE) { 
                switch (p1) {
                    case 0x80: opcode = OPCODES.fldr; break;
                    case 0x81: opcode = OPCODES.fldm; break;
                    case 0x82: opcode = OPCODES.fldim; break;
                    case 0x84: opcode = OPCODES.fstr; break;
                    case 0x85: opcode = OPCODES.fstm; break;
                    case 0x86: opcode = OPCODES.fstim; break;
                    default:
                }
            }
        }

        if (size === 4) {
            if (op >= 0x10 && op <= 0x1F && (op & 1) === 0 && p1 === 0x00) { opcode = OPCODES.ld_dw; }
            if (op >= 0x10 && op <= 0x1F /*&& (op & 1) === 0*/ && p1 != 0x00) { opcode = OPCODES.ld; }
            if (op >= 0x20 && op <= 0x2F ) { opcode = OPCODES.st; }
            if ( op >= 0x80 && op <= 0x8F && (p1 & 1) === 0) { opcode = OPCODES.loop_r; }
            if ( op >= 0x90 && op <= 0x9F && (p1 & 1) === 0) { opcode = OPCODES.br_call_f; }
        }

        complete = opcode !== undefined;

    }
    if (!complete) {
        return INVALID_DECODE;
    }
    return { size, opcode, instruction };
    //return { size, tasks: decodeToTasks(instruction, opcode) };

}

// decode size 1 instructions
for (let b = 0; b < 256; b++) {
    const r = _decodeInstruction([b]);
    if (r !== INVALID_DECODE) {
        opMap[r.size].set(b, r.opcode);
    }
}
// decode size 2 instructions and above
for (let b = 0; b < 256; b++) {
    for (let bb = 0; bb < 256; bb++) {
        const op = (b << 8) | bb;
        // size 2
        let r = _decodeInstruction([b, bb]);
        if (r !== INVALID_DECODE) { opMap[2].set(op, r.opcode); }
        // size 3
        r = _decodeInstruction([b, bb, 0x00]);
        if (r !== INVALID_DECODE) { opMap[3].set(op, r.opcode); }
        // size 4
        r = _decodeInstruction([b, bb, 0x00, 0x00]);
        if (r !== INVALID_DECODE) { opMap[4].set(op, r.opcode); }
    }
}

export const necessaryBytesForInstruction = bytes => {
    let op = 0, idx = 0;
    const len = bytes.length;
    if (len === 0) return -1;

    op = bytes[idx++];
    if (opMap[1].has(op)) return 1;
    if (idx >= len) return -1;

    op = (op << 8) | bytes[idx++];
    if (opMap[2].has(op)) return 2;
    if (idx >= len) return -1;

    idx++;
    if (opMap[3].has(op)) return 3;
    if (idx >= len) return -1;

    idx++;
    if (opMap[4].has(op)) return 4;
    if (idx >= len) return -1;

    return -1;
}

const __decodeInstruction = bytes => {
    let op = 0, idx = 0;
    let opcode = null, instruction = 0;
    const len = bytes.length;
    if (len === 0) return INVALID_DECODE;

    op = bytes[idx++];
    instruction = op;
    // check size 1
    if (opcode = opMap[1].get(op)) return { size: 1, opcode, instruction };
    if (idx >= len) return INVALID_DECODE;

    op = (op << 8) | bytes[idx++];
    instruction = op;
    if (opcode = opMap[2].get(op)) return { size: 2, opcode, instruction };
    if (idx >= len) return INVALID_DECODE;

    instruction = (instruction << 8) | bytes[idx++];
    if (opcode = opMap[3].get(op)) return { size: 3, opcode, instruction };
    if (idx >= len) return INVALID_DECODE;

    instruction = (instruction << 8) | bytes[idx++];
    if (opcode = opMap[4].get(op)) return { size: 4, opcode, instruction };
    if (idx >= len) return INVALID_DECODE;

    return INVALID_DECODE;
}

export const decodeInstruction = (bytes, useEquiv = true) => {
    const r = __decodeInstruction(bytes);
    if (r !== INVALID_DECODE) {
        return { size: r.size, tasks: decode(r.instruction, r.opcode, useEquiv) };
    }
    return INVALID_INSTRUCTION;
}
