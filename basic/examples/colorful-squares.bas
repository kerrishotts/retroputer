0 REM Retroputer Edition Squares
5 cls
10 a=0:max=32*21
15 FG=4096:BG=8192
20 poke 1,a+fg,rnd(256)
21 poke 1,a+bg,rnd(256)
22 poke 1,a,rnd(15)+219
30 a=a+1
40 goto (a<max)*20 + (a>=max)*99
