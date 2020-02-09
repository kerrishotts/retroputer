.define LDPTR(regD, regX, ident) {
    ld regD(), addrbank(ident())
    ld regX(), addrbofs(ident())
} 