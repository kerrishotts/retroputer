# Design of RetroScript

RetroScript was designed to be easy to understand both for beginners and experts alike. It was also designed to be easy to parse, tokenize, and execute by Retroputer.

## Sample

```
var pickNumberToGuess = function%(min%, max%)
    var randomValue% = min% + int%(random#() * (max% - min%))
    return randomValue%
end function

var getNumberFromPlayer = function%
    var inputValue$, convertedNumber%, goodNumber?, error?
    repeat
        inputValue$ = prompt$("Please enter your guess:")
        convertedNumber% = int%(inputValue$, error?) 
        goodNumber? = not error?
    until goodNumber? == true
    return convertedNumber%
end function

var checkPlayerGuess = function%(theAnswer%, theGuess%)
    if theGuess% < theAnswer% then return -1
    if theGuess% > theAnswer% then return 1
    return 0
end function

var startGame = sub
    var theAnswer%, theGuess%, theGuessDirectionFromAnswer%
    theAnswer% = pickNumberToGuess%(1, 10)
    repeat
        theGuess% = getNumberFromPlayer%
        theGuessDirectionFromAnswer% = checkPlayerGuess%(theAnswer%, theGuess%)
        case theGuessDirectionFromAnswer%
            when <  0 then alert("Your guess was too low! Try again.")
            when >  0 then alert("Your guess was too high! Try again.")
            when == 0 then alert("You guessed correctly!")
        end case
    until theGuessDirectionFromAnswer% == 0
end sub

var anotherRound = function?
    var theAnswer$
    repeat
        var theAnswer$ = prompt$("Do you want to play another round? [Y] or [N]")
    until theAnswer in ["Y", "N", "y", "n"]
    return theAnswer in ["Y", "y"]

var tryAgain?
repeat
    startGame
    tryAgain? = anotherRound?
until tryAgain? == false
```