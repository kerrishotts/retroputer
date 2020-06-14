.segment __current__ kmemmap.basic.code-start .append {

    peektok: {
        push x
        push y
        x := [bdata.current-line-aptr]
        y := 0
    _main:
        dl := <bdata.current-line-ptr>,y
        inc y
        cmp dl, constants.SPACE                 # eat SPACEs
        brs z _main    
    _out:
        pop y
        pop x
        ret

    }

    #
    # gettok returns the next token, and advances
    # 
    # @returns DL: next token
    #
    #######################################################################
    gettok: {
        push x
    _main:
        dl := <bdata.current-line-ptr>
        x := [bdata.current-line-aptr]
        inc x
        [bdata.current-line-aptr] := x
        cmp dl, constants.SPACE                 # eat SPACEs
        brs z _main    
    _out:
        pop x
        ret
    }

    gettok-raw: {
        push x
    _main:
        dl := <bdata.current-line-ptr>
        x := [bdata.current-line-aptr]
        inc x
        [bdata.current-line-aptr] := x
    _out:
        pop x
        ret
    }

    backtok: {
        push d
        push x
    _main:
        x := [bdata.current-line-aptr]
        dec x
        [bdata.current-line-aptr] := x
        dl := <bdata.current-line-ptr>
        cmp dl, constants.SPACE                 # go back before the space
        brs z _main
    _out:
        pop x
        pop d
        ret
    }

    gettok-word: {
        push x
    _main:
        d := <bdata.current-line-ptr>
        x := [bdata.current-line-aptr]
        inc x
        inc x
        [bdata.current-line-aptr] := x
    _out:
        pop x
        ret
    }
}