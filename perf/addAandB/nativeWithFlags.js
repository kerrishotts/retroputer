const carryBit = [0x100, 0x10000, 0x1000000, 0x100000000];
const signBit = [0x080, 0x08000, 0x0800000, 0x080000000];
const maskBit = [0x0FF, 0x0FFFF, 0x0FFFFFF, 0x0FFFFFFFF];

export default (a, b, bytes, flags = {c : 0, z: 0, n: 0, v: 0}) => {
    let c = flags.c;
    let v = a + b + c;
    flags.c = (v & ~(maskBit[bytes])) && 1;
    if (v === 0) flags.z = 1;
    if (v & signBit[bytes]) flags.n = 1;
    const signMask = signBit[bytes];
    const aSign = (a & signMask) && 1;
    const bSign = (b & signMask) && 1;
    const vSign = (v & signMask) && 1;
    flags.v = (aSign === bSign && vSign !== aSign) ? 1 : 0;
    return v & maskBit[bytes];
}
