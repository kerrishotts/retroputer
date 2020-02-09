.define OUTC(port, value) {
    #push al
    ld al, value()
    out port(), al
    #pop al
}