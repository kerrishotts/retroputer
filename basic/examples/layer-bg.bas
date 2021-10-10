5 cls
10 bg = 0
15 layer 0 color 23, bg
20 print at 10,14;bg;"  ";
22 bg = bg + 1
25 if bg > 255 then bg = 0
27 if in(48) = 0 then goto 15
30 layer 0 color 23, 0: cls