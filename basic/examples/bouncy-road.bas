1 OUT 0x14,28: POKE 0,0x1101,25: POKE 0,0x1115,16
5 PRINT CHR$(27);"24";CHR$(19);
10 CLS
15 PRINT AT 3,10;CHR$(27);"23";CHR$(18);"* ROAD RACE *";
17 PRINT AT 4, 7;"ARROW KEYS TO MOVE";
20 X = 10: W = 8: SW = 32: RD = 32: SH = 219: GR = 158: P = 15: DL = 5: OL = 5: SC = 0
30 RT = SW-X-W-2: IF RT < 0 THEN RT = 0
32 PRINT AT 24,0; CHR$(27);"18";CHR$(18);CHRS$ GR,X; CHR$(27);"23";CHR$(18);CHR$(SH); CHRS$ RD, W; CHR$(SH); CHR$(27);"18";CHR$(18);CHRS$ GR, RT;
35 PRINT AT 5,P; CHR$(27);"21";CHR$(18);"X";
38 DL = DL - 1:IF DL = 0 THEN GOTO 40
39 GOTO 80
40 D = RND(11) - 5: DL = 2 + RND(OL)
50 X = X + D
60 IF X >= (SW-W-2) THEN X = SW-W-2
70 IF X <= 0 THEN X = 0
80 KY = IN(0x3B)
81 ZZ = IN(0x30)
90 IF KY = 0x20 THEN P=P+1: IF P>=(SW-1) THEN P=SW-1
100 IF KY = 0x08 THEN P=P-1: IF P<=0 THEN P=0
110 CH=PEEK(1,6*SW+P): IF CH <> RD THEN IF CH <> 0 THEN GOTO 200
115 SC=SC+1
120 GOTO 30
200 PRINT AT 24, 10;CHR$(27);"23";CHR$(18);"*** CRASH ***"
210 PRINT SPC(11);"SCORE:";SC
220 ZZ = IN(0x30): IF ZZ <> 0 THEN GOTO 220
230 OUT 0x14,28: POKE 0,0x1101,24: POKE 0,0x1115,16

