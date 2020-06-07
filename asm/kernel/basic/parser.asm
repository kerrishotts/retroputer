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
        cmp dl, constants.SPACE                 # eat SPACEs
        brs z _main    
    _out:
        ret
    }

    gettok-raw: {
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
        push d
    _main:
        push x
        x := [bdata.current-line-aptr]
        dec x
        [bdata.current-line-aptr] := x
        pop x
        dl := <bdata.current-line-ptr>
        cmp dl, constants.SPACE                 # go back before the space
        brs z _main
    _out:
        pop d
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