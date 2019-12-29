/**
 * @param {Array} bytes check for instruction validity
 * @returns {Boolean} if the instruction is valid
 */
export function isDecodeableInstruction(bytes) { //eslint-disable-line complexity
    const numBytes = bytes.length;
    switch (numBytes) {
        case 1:
            {
                const hi = (bytes[0] & 0xF0) >> 4;
                const lo = bytes[0] & 0x0F;

                if (hi === 0x0) {
                    if (lo === 0x0) { return true; } // NOP
                }
                if (hi === 0x3) {
                    if (lo === 0xE) { return true; } // HALT
                    if (lo === 0xF) { return true; } // BRK
                }
                if (hi === 0x4) {
                    return true; // TRAP reg
                }
                if (hi === 0xA) {
                    if (lo < 0x8) { return true; } // PUSHA ... RET
                }
                if (hi >= 0xB) {
                    return true; // SET .. POP
                }
            }
            break;
        case 2:
            {
                const hi = bytes[0];

                if (hi >= 0x01 && hi <= 0x0F) { return true; } // ADD ... MOV
                if (hi === 0x38 || hi === 0x39) { return true; } // ENTER .. EXIT
                if (hi >= 0x40 && hi <= 0x7F && ((hi & 0x01) !== 0)) {
                    return true; // ADD ... XOR for 8-bit registers
                }
                if (hi >= 0xA8 && hi <= 0xAF )  { return true; } // MUL ... SMOD
            }
            break;
        case 3:
            {
                const hi = bytes[0];
                const lo = bytes[1];
                if (hi >= 0x10 && hi <= 0x1F && ((hi & 0x01) === 1) && (lo === 0x00)) {
                    return true; // LD imm8 for 8-bit registers
                }
                if (hi >= 0x80 && hi <= 0x9F && ((lo & 0x01) === 1)) {
                    return true; // BRS / CALLS
                }
                if (hi === 0x30 || hi === 0x31) { return true; } // IN ... OUT
                if (hi >= 0x40 && hi <= 0x7F && ((hi & 0x01) === 0)) {
                    return true; // ADD ... XOR for 16-bit registers
                }
            }
            break;
        case 4:
            {
                const hi = bytes[0];
                const lo = bytes[1];

                if (hi >= 0x10 && hi <= 0x1F && ((hi & 0x01) === 0) && (lo === 0x00)) {
                    return true; // LD imm16 for 16-bit registers
                }
                if (hi >= 0x20 && hi <= 0x2F) { return true; } // ST
                if (hi >= 0x80 && hi <= 0x9F && ((lo & 0x01) === 0)) {
                    return true; // BR / CALL
                }
            }
            break;
        default:
            return false;
    }
    return false;
}