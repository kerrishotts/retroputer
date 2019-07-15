import { OPCODES, decodeToTasks } from "./opcodes.js";

/**
 * @export
 * @param {number[]} bytes
 * @returns {*}
 */
export function decodeInstruction(bytes) {
    let complete = false;
    let instruction = [];
    let size, opcode;

    while (!complete) {
        const byte = bytes.shift();
        if (byte === undefined) {
            return null; // definitely not a valid instruction
        }
        instruction.push(byte);
        size = instruction.length;
        if (size > 4) {
            return null; // no longer a valid instruction
        }

        const [op, p1, p2, p3] = instruction;

        if (size === 1) {
            // one byte, single variant instructions
            if (op === 0x00) { opcode = OPCODES.nop; }
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
        }

        if (size === 4) {
            if (op >= 0x10 && op <= 0x1F && (op & 1) === 0 && p1 === 0x00) { opcode = OPCODES.ld_dw; }
            if (op >= 0x10 && op <= 0x1F /*&& (op & 1) === 0*/ && p1 != 0x00) { opcode = OPCODES.ld; }
            if (op >= 0x20 && op <= 0x2F ) { opcode = OPCODES.st; }
            if ( op >= 0x80 && op <= 0x8F && (p1 & 1) === 0) { opcode = OPCODES.loop_r; }
            if ( op >= 0x90 && op <= 0x9F && (p1 & 1) === 0) { opcode = OPCODES.br_call_f; }
        }

        complete = !!opcode;

    }
    if (!complete) {
        return null;
    }
    return decodeToTasks(instruction, opcode);

}