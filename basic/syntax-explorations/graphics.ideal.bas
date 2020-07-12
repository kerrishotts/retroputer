COLOR fg [, bg [, borderColor, borderVisible]]
COLOR SOURCE page
LAYER lyr# [ON|OFF] [SOURCE page] [SCALE scale] [TILESET page] [COLOR fg, bg] [AT x, y] [SIZE w, h] [MODE mode]
SPRITE spr# [ON|OFF] [SOURCE page, idx] [SCALE scale] [TILESET page] [COLOR fg, bg] [SIZE w, h] [LAYER lyr#] [AT x, y]
SPRATTR(spr#, whichAttr) ' 0=X, 1=Y, 2=Collision
MEM FILL byte FROM bank, start TO finish [FOR times] [STEP step]
MEM COPY|SWAP bank, size FROM source TO bank, target [FOR times] [STEP step]
MEM PRINT TO page, addr; print-list

PRINT LAYER lyr# ?
DRAW LAYER lyr#
DRAW COLOR color
DRAW LINE x1,y1 TO x2,y2 [COLOR color] [STEP step] [FILL]
DRAW CIRCLE x1,y1 TO x2,y2 [COLOR color] [FROM angle TO angle] [FILL]
DRAW POINT x1,y1 [COLOR color]
POINT(x1,y1) ?
DRAW BOX x1,y1 TO x2,y2 [COLOR color] [FILL]
DRAW PRINT AT x1,y1 [COLOR color]; print-list
DRAW FILL AT x1, y1 [COLOR color]

COLOR   OFF     LAYER   SOURCE  SCALE 
TILESET MODE    SPRITE  SIZE    SPRATTR()
MEM     FILL    FROM    COPY    SWAP
DRAW    LINE    CIRCLE  POINT   BOX
STICK() MOUSE() PLAY    TIME()

STICK(controller)
MOUSE(axis)
PLAY voice ON|OFF [AT freq] [MODE mode] [SCALE volume]


SPRITE 1 ON AT 100, 100 SOURCE 24, 0 
MEM PRINT TO 24, 0; "X"
