0 REM Graphics Fill
5 P1=IN(18):P2=IN(27)
10 OUT 18,0: OUT 27,2: REM Graphics Mode
15 X=6144:A=0
20 POKE 1,X,A
21 POKE 1,X+6144,A
22 POKE 1,X+12288,A
23 POKE 1,X+18432,A
24 POKE 1,X+24576,A
25 POKE 1,X+30720,A
26 POKE 1,X+36864,A
27 POKE 1,X+43008,A
29 ZZ=IN(48):IF ZZ>64 THEN IF ZZ<128 THEN GOTO 200
30 A=A+1:IF A>255 THEN A=0
35 X=X-1:IF X<>-1 THEN GOTO 20

190 ZZ=IN(48):IF ZZ>64 THEN IF ZZ<128 THEN GOTO 200
199 REM Reset Mode
200 OUT 18,P1:OUT 27,P2
