ABS()
AND
ASC()
ASM AT addr, "" - Parse assembly language at address
ASM LIST addr   - list assembly language
ASM RUN         - start assembly language
ASM STEP - step assembly language
ASM STOP AT - add break point

COLOR fg [,   bg [, borderColor, borderVisible]]
COLOR SOURCE page
LAYER lyr# [ON|OFF] [SOURCE page] [SIZE scale] [TILESET page] [COLOR fg, bg] [AT x, y] [RECT w, h] [MODE mode]
SPRITE spr# [ON|OFF] [SOURCE page, idx] [TILESET page] [COLOR fg, bg] [SIZE w, h, scale] [LAYER lyr#] [AT x, y]
SPRATTR(spr#, whichAttr) ' 0=X, 1=Y, 2=Collision
MEM FILL byte FROM bank, start TO finish [FOR times] [STEP step]
MEM COPY|SWAP bank, size FROM source TO bank, target [FOR times] [STEP step]
MEM PRINT TO page, addr; print-list

PRINT LAYER lyr# ?
DRAW LAYER lyr#
DRAW COLOR color
DRAW LINE x1,y1 TO x2,y2 [COLOR color] [STEP step] [FILL]
DRAW CIRCLE x1,y1 TO x2,y2 [COLOR color] [FROM angle TO angle] [FILL]
DRAW POINT x,y [COLOR color]
POINT(x,y) -> color at x,y
DRAW RECT x1,y1 TO x2,y2 [COLOR color] [FILL]
DRAW PRINT AT x,y [COLOR color]; print-list
DRAW FILL AT x,y [COLOR color]

SCREEN [SIZE 32,21] [SOURCE page] 
SCREEN(row, col) -> char at row,col

COLOR   OFF     LAYER   SOURCE  
TILESET MODE    SPRITE  SIZE    SPRATTR()
MEM     FILL    FROM    COPY    SWAP
DRAW    LINE    CIRCLE  POINT   RECT
STICK() MOUSE() PLAY    TIME()

STICK(controller)
MOUSE(axis)
PLAY voice ON|OFF [AT freq] [MODE mode] [SCALE volume]


SPRITE 1 ON AT 100, 100 SOURCE 24, 0 
MEM PRINT TO 24, 0; "X"
