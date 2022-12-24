0 REM Borders
1 X = 0
2 OUT 0x2B, X
3 X = X + 13
4 If X > 255 THEN X = X - 256
5 GOTO 2
