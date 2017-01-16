# Design of RetroScript

RetroScript was designed to be easy to understand both for beginners and experts alike. It was also designed to be easy to parse, tokenize, and execute by Retroputer.

## Sample

```
let pickNumberToGuess = function%(min%, max%)
    let randomValue% = min% + int%(random#() * (max% - min%))
    return randomValue%
end function

let getNumberFromPlayer = function%
    let inputValue$, convertedNumber%, goodNumber?
    repeat
        inputValue$ = prompt$("Please enter your guess:")
        try
            convertedNumber% = int%(inputValue$)
            goodNumber? = true
        catch
            goodNumber? = false
        end try
    until goodNumber? == true
    return convertedNumber%
end function

let checkPlayerGuess = function%(theAnswer%, theGuess%)
    if theGuess% < theAnswer% then return -1
    if theGuess% > theAnswer% then return 1
    return 0
end function

let startGame = sub
    let theAnswer%, theGuess%, theGuessDirectionFromAnswer%
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

let anotherRound = function?
    let theAnswer$
    repeat
        let theAnswer$ = prompt$("Do you want to play another round? [Y] or [N]")
    until theAnswer in ["Y", "N", "y", "n"]
    return theAnswer in ["Y", "y"]

let tryAgain?
repeat
    startGame
    tryAgain? = anotherRound?
until tryAgain? == false
```