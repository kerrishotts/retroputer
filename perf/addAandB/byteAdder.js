export default (a, b, bytes, flags = {c: 0, n: 0, z: 0, v: 0}) => {
    let c = flags.c;
    let v = 0;
    var i, l, bA, bB, bV;
    const signMask = 0b1 << ((bytes << 3) - 1);
    const negMask = signMask;
    const aSign = (a & signMask) && 1;
    const bSign = (b & signMask) && 1;
    for (i = bytes, l = 0; i > 0; i--, l += 8) {
        bA = a & 0xFF;
        bB = b & 0xFF;
        bV = bA + bB + c;
        c = (bV & 0xFFFFFF00) && 1;
        v = v | ((bV & 0xFF) << l);
        a = a >>> 8;
        b = b >>> 8;
    }
    flags.c = c;
    flags.z = (v === 0) && 1;
    flags.n = (v & negMask) && 1;
    const vSign = (v & signMask) && 1;
    flags.v = (aSign === bSign && vSign !== aSign) ? 1 : 0;
    if (flags.n) v -= 0x10000 ;
    return v;
};
