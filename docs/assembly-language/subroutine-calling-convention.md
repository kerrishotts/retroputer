# Subroutine Calling Convention

## Volatile and Preserved Registers

When calling a subroutine, it is expected that some registers will be preserved, whereas others will be destroyed. 

<table>
  <thead>
    <tr>
      <th >Register</th>
      <th >Typical Use</th>
      <th >Preserved?</th>
      <th >By Whom?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >A</td>
      <td >General Purpose Register</td>
      <td >Yes</td>
      <td >Subroutine</td>
    </tr>
    <tr>
      <td >B</td>
      <td >General Purpose Register</td>
      <td >Yes</td>
      <td >Subroutine</td>
    </tr>
    <tr>
      <td >C</td>
      <td >Counter</td>
      <td >No</td>
      <td ></td>
    </tr>
    <tr>
      <td >D</td>
      <td >Data Access Register &amp; Return Value</td>
      <td >No</td>
      <td ></td>
    </tr>
    <tr>
      <td >X</td>
      <td >
        <p>Index Register / Low Pointer Address /</p>
        <p>Low Pointer Address Return Value</p>
      </td>
      <td >No</td>
      <td ></td>
    </tr>
    <tr>
      <td >Y</td>
      <td >Index Register / Low Pointer address</td>
      <td >No</td>
      <td ></td>
    </tr>
    <tr>
      <td >BP</td>
      <td >Base Pointer</td>
      <td >Yes</td>
      <td >Subroutine</td>
    </tr>
    <tr>
      <td >SP</td>
      <td >Stack Pointer</td>
      <td >Yes</td>
      <td >Subroutine</td>
    </tr>
    <tr>
      <td >Flags</td>
      <td >Processor Status</td>
      <td >Yes</td>
      <td >Subroutine</td>
    </tr>
    <tr>
      <td >PC</td>
      <td >Program Counter</td>
      <td >Yes</td>
      <td >CPU</td>
    </tr>
    <tr>
      <td >MM</td>
      <td >Memory Map</td>
      <td >Yes</td>
      <td >Subroutine</td>
    </tr>
    <tr>
      <td >MP</td>
      <td >Memory Pointer</td>
      <td >Yes</td>
      <td >CPU</td>
    </tr>
  </tbody>
</table>## Integer Parameters

Because the 6516 has several registers, the calling convention does use some of them when passing parameters to subroutines. Any remaining parameters are passed on the stack.

| Parameter Index \(Word\) | Register |
| :--- | :--- |
| 1 | D |
| 2 | C |
| 3+ | BP+-2 \(...\) |

{% hint style="info" %}
#### Important

Aggregates \(8-bit values\) are passed in using _both_ the low and high portions of the corresponding 16-bit register. As such, the parameter ordering changes to the following: DL, DH, CL, CH, _stack_.
{% endhint %}

## Pointer Parameters

When a parameter needs to be a pointer to some data, the form `R[,IDX]` is used \(where `IDX` is an index register\). On the stack, a similar pattern is used where `BP+-2` would refer to the top 16 bits and `BP+-4` would refer to the bottom 16 bits of an address \(which is 19 bits\).

| Parameter Index \(Word\) | Register |
| :--- | :--- |
| 1 | D, X |
| 2 | C, Y |
| 3+ | BP+-2, BP+-4 \(...\) |

## Integer Return Value

The return value of a subroutine is returned through the `D` register for 16-bit values \(or `DL` for 8-bit values\).

## Pointer Return Value

Should a return value need to be a pointer to another memory address, the result must be in `D,X` where `D` contains the top 16-bits of the address and `X` contains the bottom 16-bits address such that `( D << 3 ) | X` results in the desired address. 

## In Practice

Let's go over a few of some typical subroutines and how one calls them.

```text
.segment data 0x03000 {
    str: .string "Hello, World"
         .byte 0x00
}
.segment code 0x02000 {

    ld d, data.str >> 3    # passing {ptr} str
    ld x, data.str & 0x7   # passing {ptr} str
    ld cl, 10              # passing {byte} col
    exc c                  # swap bytes
    ld cl, 12              # passing {byte} row
    calls print
    brk

    ##
    ## Displays a string at the desired row and column.
    ##
    ## @param {ptr} str - the string to display
    ## @param {byte} row - the row at which to start displaying it
    ## @param {byte} col - the column at which to start displaying it
    ## @affects X, Y
    ## @returns {byte} newRow - the ending row
    ## @returns {byte} newCol - the ending column
    print: {
    pre:
        push b
        push a
        pushf
    main:
        mov a, cl                # calculate addr = row * 32 + col
        shl a, 5                 #           a    = cl * 32  + ch
        mov b, c
        clr c # clear carry, so shr isn't sign extending
        shr b, 8
        add a, b
    
        mov y, a                 # y is used as the screen pos
        ld a, 0x00FF             # color
        ld bl, [D,X]             # load character        
        while !z do {
            st [0x10000,y], bl   # write to screen
            st [0x11000,y], al   # foreground color
            exc a
            st [0x12000,y], al   # background color
            exc a
            inc x
            inc y
            ld bl, [D,X]         # load next character
            cmp bl, 0x00         # is it NULL?
        }

        mov a, y
        and a, 0b11111
        exc a
        mov b, y
        shr b, 5
        add a, b
        mov d, a     # Compute return row and column

    post:
       popf
       pop a
       pop b
       ret
    }
}
```



