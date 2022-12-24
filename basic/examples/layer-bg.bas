5 cls
10 bg = 0: bo = 59
15 layer 0 color 255-bg, bg
16 out 0x2B, bo
20 print at 10,14;bg;"  ";
22 bg = bg + 13
23 bo = bo + 17
25 if bg > 255 then bg = bg - 256
26 if bo > 255 then bo = bo - 256
27 if in(48) = 0 then goto 15
30 layer 0 color 23, 0: cls
31 out 0x2B, 128