.segment __current__ kmemmap.basic.code-start .append {
    #
    # gettok returns the next token, and advances
    # 
    # @returns DL: next token
    #
    #######################################################################
    gettok: {
    _main:
        dl := <bdata.current-line-ptr>
        push x
        x := [bdata.current-line-aptr]
        inc x
        [bdata.current-line-aptr] := x
        pop x
    _out:
        ret
    }

    backtok: {
        push x
        x := [bdata.current-line-aptr]
        dec x
        [bdata.current-line-aptr] := x
        pop x
    _out:
        ret
    }

    gettok-word: {
    _main:
        d := <bdata.current-line-ptr>
        push x
        x := [bdata.current-line-aptr]
        inc x
        inc x
        [bdata.current-line-aptr] := x
        pop x
    _out:
        ret
    }
}