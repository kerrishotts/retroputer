.segment __current__ kmemmap.basic.code-start .append {
    token-nop: {
        dl := 0
        ret
    }

    token-not-impl: {
    _main:
        dl := brodata.NOT_IMPLEMENTED
        ret
    }

    handler-syntax-error: {
        dl := brodata.SYNTAX_ERROR
        ret
    }
}