5 LAYER 0 LINE 0 COLOR 23,24: POKE 0,0x1101,25: POKE 0,0x1115,16:PRINT CHR$(27);"0";CHR$(19);:CLS
10 W=0:R=1:Y=3
15 PRINT CHR$(27);"1";CHR$(19);
20 X=16-(W+2)/2
30 PRINT AT Y,0;SPC(X);CHR$(0xA7);CHRS$(0xDB,W);CHR$(0xA6);SPC(X);
40 W=W+2:R=R+1:Y=Y+1
50 IF R>3 THEN R=1:W=W-4
55 IF Y=12 THEN PRINT CHR$(27);"2";CHR$(19);
60 IF Y<18 THEN GOTO 20
70 R=0
80 PRINT AT Y+R,0;SPC(15);CHRS$(0xB0,2);SPC(15);
90 R=R+1:IF R<3 THEN GOTO 80
100 PRINT AT 1,8;CHR$(27);"0";CHR$(19);"MERRY CHRISTMAS!"
180 PRINT AT 22,9;"Press any key."
190 ZZ = IN(48): IF ZZ = 0 THEN GOTO 190
195 LAYER 0 LINE 1 COLOR 23, 0: POKE 0,0x1101,21: POKE 0,0x1115,18
199 PRINT CHR$(27);"0";CHR$(19);:CLS
