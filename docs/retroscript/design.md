# Design of RetroScript

RetroScript was designed to be easy to understand both for beginners and experts alike. It was also designed to be easy to parse, tokenize, and execute by Retroputer.

## Sample

```
Int.add = function add(a) {
    return (self.value() + b);
}

2.add(4)









DECLARE add(a#, b#) RETURNING r#
BEGIN
    r = a + b
END

DECLARE [].find


DECLARE sort(a[#], direction.[DESC = 0, ASC]) RETURNING b[#]
BEGIN
    DECLARE item[#] = [0, 0], idx# = 0, putat# = 0
    b = []
    FOR EACH item[0] IN a
        FOR EACH item[1], idx IN b
            SWITCH
                WHEN item[0] >= item[1] THEN
                    putat = idx
                    BREAK
            END
        END

        b = b[0...(putat)] + item[0] + b[putat+1...]
    END
END

DECLARE askForName() RETURNING name$
BEGIN 
    name = PROMPT("What is your name?")
END

DECLARE startGame() RETURNING NOTHING
BEGIN
    DECLARE score# = 0, guess# = 0,  mynum# = 0

    mynum = RANDOM(100)
    LOOP WHILE mynum != guess
        guess = INT(PROMPT("{$}, What's your guess?", name))
        SWITCH
            WHEN guess < mynum THEN PRINT("Your guess is too low. Try again!")
            WHEN guess > mynum THEN PRINT("Your guess is too high. Try again!")
            OTHERWISE               PRINT("You guessed it, {$}! Score: {#}", name, score)
        END
        score = score + 1
    END
END

startGame(askForName())