export default {
    from8(n) {
        return -(n & 0x80) + (n & 0x7F);
    },
    from16(n) {
        return -(n & 0x8000) + (n & 0x7FFF);
    },
    to8(n) {
        return n & 0xFF;
    },
    to16(n) {
        return n & 0xFFFF;
    }
}