# Design of RetroScript

RetroScript was designed to be easy to understand both for beginners and experts alike. It was also designed to be easy to parse, tokenize, and execute by Retroputer.

## Syntax

```
var name = expr

name = expr

return expr

if condition? then statement

function name([parms, ...])
...
end function

repeat
...
until condition?

repeat
...
while condition?

```

## Sample

```
   10 function pickNumberToGuess%(min%, max%)
   20     var delta% = max% - min%
   30     var randomValue# = random#() * delta%
   40     var randomValue% = int%(randomValue#)
   50     randomValue = min% + randomValue%
   60     return randomValue%
   70 end function

  100 function getNumberFromPlayer%()
  110     var inputValue$
  120     var convertedNumber%
  130     var error? = false
  140     repeat
  150         inputValue$ = prompt$("Please enter your guess:")
  160         convertedNumber% = int%(inputValue$, error?)
  170         if error? then print("Woops! That wasn't a number. Try again.")
  180     while error?
  190     return convertedNumber%
  200 end function

  300 function checkPlayerGuess%(theAnswer%, theGuess%)
  310     if theGuess% < theAnswer% then return -1
  320     if theGuess% > theAnswer% then return 1
  330     return 0
  340 end function

  400 function startGame()
  410     var theAnswer% = pickNumberToGuess%(1, 10)
  420     var theGuess%
  430     var theGuessDirectionFromAnswer% = 0
  440     repeat
  450         theGuess% = getNumberFromPlayer%()
  460         theGuessDirectionFromAnswer% = checkPlayerGuess%(theAnswer%, theGuess%)
  470         if theGuessDirectionFromAnswer% < 0 then print("Your guess was too low! Try again.")
  480         if theGuessDirectionFromAnswer% > 0 then print("Your guess was too high. Try again.")
  490     until theGuessDirectionFromAnswer% == 0
  500     print("You guessed correctly!")
  510 end function

  600 function anotherRound?()
  605     var theAnswer$ = ""
  610     var continue? = false
  615     var goodAnswer? = false
  620     repeat
  625         theAnswer$ = prompt$("Do you want to play another round? [Y] or [N]")
  630         if theAnswer$ == "Y" then goodAnswer? = true
  635         if theAnswer$ == "y" then goodAnswer? = true
  640         if theAnswer$ == "N" then goodAnswer? = true
  645         if theAnswer$ == "n" then goodAnswer? = true
  650     until goodAnswer?
  655     if theAnswer$ == "Y" then continue? = true
  660     if theAnswer$ == "y" then continue? = true
  665     return continue?
  670 end function

  700 var tryAgain? = false
  710 repeat
  720     startGame()
  730     tryAgain? = anotherRound?()
  740 while tryAgain?
```

