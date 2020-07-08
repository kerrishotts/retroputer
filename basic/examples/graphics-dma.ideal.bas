0 REM Graphics DMA
5 COLOR 23,24: CLS
9 PRINT AT 10,5;">-->";
10 LAYER SHOW 1: LAYER SOURCE 1, 20: LAYER SCALE 1, 0: LAYER TILESET 1, 28
11 LAYER COLOR 1, 255, 0: LAYER OFFSET 1, 0, 0: LAYER CROP 1, 0, 0
12 LAYER MODE 1, 2
18 REM Set up DMA for Fill
19 MEM FILL 6, 0x0000, 0xC000, 0   ' Times & Offset are implied to be 0
24 REM Clear line 
25 MEM FILL 6, 0, 1, 0 FOR 192 STEP 256
35 Y = RND(256) * 256 + 255
36 POKE 6,Y,RND(16)+24
37 POKE 6,0xC000,24
39 REM Move screen left by one
40 MEM COPY 6, 0x0001, 6, 0x0000, 0xC000
50 ZZ=IN(48):IF ZZ>64 THEN IF ZZ<128 THEN GOTO 200
60 GOTO 25
190 ZZ=IN(48):IF ZZ>64 THEN IF ZZ<128 THEN GOTO 200
191 GOTO 190
199 REM Reset Mode
200 LAYER HIDE 1
