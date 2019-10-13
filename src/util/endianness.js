const buffer = new ArrayBuffer(2);
const bytes = new Uint8Array(buffer);
const words = new Uint16Array(buffer);
words[0] = 0x1234;

export const endianness = bytes[0] == 0x12 ? "big" : "little";
export const isBigEndian = endianness === "big";
export const isLittleEndian = endianness === "little";
