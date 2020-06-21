5 CLS
10 X = 16: Y = 10: D = 1
20 PRINT AT Y, (X-1); " "; CHR$(241); " ";
30 X = X + D
40 IF X>29 THEN D = -1
50 IF X<2 THEN D = 1
60 GOTO 20
