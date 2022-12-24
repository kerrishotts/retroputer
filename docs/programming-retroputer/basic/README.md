# BASIC

Retroputer comes preinstalled with a version of BASIC, short for _Beginner's All-purpose Symbolic Instruction Code_. This is a simple programming language that is easy to learn, but also provides a significant amount of power, flexibility, and functionality. While it is meant to model BASICs of the '80s and '90s, it also comes with some more modern conveniences that machines of the era often didn't have.

## 1.0 Saying Hello

Retroputer BASIC has two distinct operating modes. The first mode is *direct* mode (often referred to as _immediate_ or _calculator_ mode by other BASICs). This mode provides the ability to enter and edit programs and a way to execute commands immediately. The second mode is called _program mode_, and during this mode BASIC is busy executing a program, which means you can't directly access BASIC's commands.

When Retroputer is started, you'll be greated by a pleasant startup screen informing you of the version of BASIC and how much memory is available for your program.

```text
RETROPUTER BASIC 1.0
--------------------
131072 Code Bytes Free
65536 Heap Bytes Free
```

Below this banner will be a single word: `READY.` Below this word will be a flashing white square. This is your text _cursor_, and the word above is the _Ready Prompt_. Whenever you see a Ready prompt, you know you're in direct mode and BASIC is waiting for you to tell it what to do next.

When your cursor is visible on the screen and it is blinking, you can take this as a cue that the computer is waiting for you to type something. If the cursor is not visible, this usually signifies that Retroputer is busy. You can continue to type while Retroputer is working, but what you type will end up stored in a buffer and only displayed when Retroputer can turn its attention back to you.

At this point, Retroputer's said "hello!" to you—how about you return the favor? Type the following to Retroputer. Be sure not to make a typing mistake or the response may not be quite as you'd like!

```basic
print "Hello!"⏎
```

> **Hint**
>
> That "⏎" symbol? That's our hint to you that you should press the RETURN key. Whenever you see this symbol, press RETURN to complete that line of text.

Retroputer will immediately respond with a warm greeting:

```
Hello!

READY.
█
```

If you _didn't_ see that result, you may have typed something wrong. For example, let's imagine this scenario instead (or try it out yourself):

```
prnt "Hello!"⏎

?SYNTAX ERROR
READY.
█
```

This kind of response may seem a bit rude, but it's just BASIC's way of telling you that it didn't understand what you meant.

Alternatively, if you forgot the ending quote, you might see this response:

```
print "Hello!⏎

?EXPECTED A QUOTE ERROR
READY.
█
```

Here BASIC is letting you know that quotes come in pairs, and that you've forgot one somewhere. Once you understand BASIC's responses, things start to become a lot easier, and it can start to feel like you're having a conversation, although a somewhat _limited_ one. After all, Retroputer is only a machine, and can only do exactly what you tell it.

## 1.1 Calculating

As we mentioned earlier, sometimes _direct_ mode is often referred to as _calculator_ mode. That's because you can tell the computer to evaluate a mathematical expression and it will give you the result. Let's try an example.

```basic
print 2 + 2⏎
```

Retroputer should respond with `4`. Ok, so that wasn't _so_ difficult. Let's try something that would take us humans a little more time to figure out.

```basic
print 234 * 56⏎
```

Retroputer's response will be:

```
print 234 * 56
13104

READY.
█
```

Impressive! Retroputer was able to calculate the result faster than you were, I'd guess! 

While Retroputer can add and multiply quickly, and it can perform other mathematical operations, Retroputer BASIC does, by default, operate in "integer" mode—that is, it operates on signed integers in the range -32,768 to 32,767. You can see this in action by running the following program:

```
print 32767 + 1⏎
-32768

READY.
█
```

Instead of complaining, however, Retroputer _wrapped_ the mathematical computation to a negative number. Similarly, if you run `print -32768 - 1`, you'll get the result `32767`. 

This wrapping occurs when you do any other mathematical operation, including multiplication. This means that an innocuous expression, such as `400 * 400` will yield an entirely incorrect result (try it!)

> TODO: Retroputer BASIC Floating Point

Retroputer supports the following mathematical operators:

Operator    | Symbol    | # of Operands | Precedence | Associativity | Notes
------------|-----------|---------------|------------|---------------|------------------
Add         | `+`       | 2             | 14         | Left          |
Subtract    | `-`       | 2             | 14         | Left          |
Multiply    | `*`       | 2             | 15         | Left          |
Divide      | `/`       | 2             | 15         | Left          | Division by zero yields `0`
Modulo      | `%`       | 2             | 15         | Left          | Modulo by zero yields `0`
Exponent    | `^`       | 2             | 16         | Right         | NOT YET IMPLEMENTED
Negate      | `-`       | 1             | 17         | Left          |

Retroputer applies precedence in evaluating ambiguous mathematical expressions based on the order specified in the preceding table. If you want Retroputer BASIC to evaluate terms in an expression in a specific way, you should include parantheses.

```
print 5+2*3⏎ 
11

READY. 
print (5+2)*3⏎
21

READY.
█
```

You can nest parantheses fairly deeply; if your expression is too complex, you'll receive an `?EXPRESSION TOO COMPLEX ERROR` message. In this case, split up your expression into multiple separate evaluations steps.

> TODO: Retroputer Mathematical Functions (COS, SIN, etc.)

## 1.2 Relational Logic

In addition to calculating mathematical expressions, you can also ask Retroputer how one number compares to another.

For example:

```
print 5 < 10⏎
1

READY.
█
```

Retroputer's output of `1` indicates that it thinks that five is less than ten. If we flipped this to be `print 5 > 10` instead, Retroputer would print `0` instead, because five is _not_ greater than 10.

Retroputer supports the following comparison operators:

Operator               | Symbol    | # of Operands | Precedence | Associativity | Notes
-----------------------|-----------|---------------|------------|---------------|------------------
Equality               | `=`       | 2             | 11         | Left          |
Not Equal              | `!=`,`<>` | 2             | 11         | Left          |
Less than              | `<`       | 2             | 12         | Left          |
Less than or equal     | `<=`,`=<` | 2             | 12         | Left          |
Greater than           | `>`       | 2             | 12         | Left          |
Greater than or equal  | `>=`,`=>` | 2             | 12         | Left          |

> TODO: Comparing floating point numbers or strings

## 1.3 Printing multiple items at once

So far you've just asked Retroputer to print the results of a single calculation. However, Retroputer can generate more complex and interesting output by using commas and semicolons in your `PRINT` statements.

You can tell Retroputer to print two things on the same line, without any intervening space, by using the semicolon, like so:

```
print "Hello";" ";"world"⏎
Hello world

READY.
█
```

You can also ask Retroputer to align items to columns. Each column is eight characters wide, and if an item exceeds eight characters, the next item will be placed on the following column.

```
print "City", "Population", "Elev."⏎ 
City    Population      Elev.

READY.
█
```

If you haven't already noticed, Retroputer always likes to display a line break after each print operation. You can suppress this by using a trailing semicolon:

```
print "Hello";⏎
Hello
READY.
█
```

## 1.4 Entering a Program

So far you've been interacting with Retroputer interactively—you give it a command and Retroputer responds immediately. This is nice, but one of many benefitis of programming is that you can provide a list or sequence of instructions to the computer, and it will execute each instruction in turn without requiring intervention.

Enter the following into Retroputer, and observe how the computer reacts in a different manner to what we've become accustomed.

```
10 print "Hello, world"⏎
█
```

This time, Retroputer didn't display a fresh `READY.` prompt, and it also didn't echo `Hello, World` back at us. What did happen, then?

By starting an instruction with a number, we told Retroputer that we wanted it to remember this instruction. The number (called a line number) tells Retroputer how to _order_ these instructions.

For example, let's add a new instruction:

```
5 cls⏎
█
```

This instruction tells Retroputer to clear the screen... but Retroputer didn't do that. Instead, it saved this instruction to memory, and added it _before_ the previous instruction (because 5 comes before 10).

Let's add one more instruction:

```
20 print "This is cool"⏎
█
```

Because "20" is larger than either number we've entered so far, Retroputer will add this to the end of our list of instructions.

In order to see the instructions Retroputer has in memory, we can give it the `LIST` command:

```
list⏎
5 cls
10 print "Hello, world"
20 print "This is cool"

READY.
█
```

Notice how Retroputer now lists out our instructions in the order of the line numbers we provided rather than in the order we typed them. This means we can always add new instructions in front of or behind other instructions at a later date without having to completely start a new sequence of instructions when we want to add a new instruction to the middle.

> **Hint**
>
> For this reason, it's common to increment your line numbers by 5 or 10 so that there's some space between each instruction. This lets you come back in the future and insert something new in between these instructions without having to change the line numbers in your program.

Great—we've given Retroputer a list of instructions, but now what?

Well, now, we can ask Retroputer to perform each instruction in order by giving it the `RUN` command:

```
run⏎
(Retroputer clears the screen)
Hello, world.
This is cool

READY.
█
```

So far we've provided Retroputer a single instruction per line number. We can, however, add multiple instructions in a single line by separating each one with a colon (":"). Let's add a new instruction:

```
15 print "Retroputer": print "says Hi"⏎
█
```

Now if we `RUN` the program, we'll see the following:

```
run⏎
(Retroputer clears the screen)
Hello, world.
Retroputer
says Hi
This is cool

READY.
█
```

Notice how _both_ `PRINT` commands were followed. Also notice that because we added these with line number `15`, the results appeared after `Hello, world` (line 10) and before `This is cool` (line 20). 

If we `LIST` our program now, we'll see this:

```
list⏎
5 cls
10 print "Hello, world"
15 print "Retroputer": print "says Hi"⏎
20 print "This is cool"

READY.
█
```

What happens if we want to remove an instruction? We can do that by telling Retroputer to delete a line by providing just the line number.

```
15⏎
█
```

If you `LIST` the program now, you'll see that line 15 is now gone. 

if you made a spelling or logic mistake in a line, you can also edit lines. If the line is still on the screen, you can use the ARROW KEYs to go back to the line in error, correct the text, and press RETURN. But if the line isn't on the screen, you'll need to `LIST` the line so that you can edit it.

```
LIST 10⏎
10 print "Hello, world"

READY.
█
```

Now you can use the ARROW KEYs to change this line to say "Hello, Retroputer". Press the UP ARROW KEY _three_ times, and then use the RIGHT ARROW KEY _seventeen_ times to position your cursor correctly. Then type `Retroputer"` before pressing RETURN.

```
LIST 10
10 print "Hello, Retroputer"⏎
█
READY.
```

Notice that your cursor is now just above the previous `READY.` prompt. While we could immediately ask Retroputer to perform these instructions by typing `RUN` at this point, it's also common to have additional lines of code on this line (especially if you've typed in several lines of instrucitons, and now need to correct something from five or ten lines ago). If you type `RUN` in those cases, Retroputer would likely complain with a `?SYNTAX ERROR` message. To avoid these scenarios, reposition the cursor using the ARROW KEYs to a blank line on the screen. If there isn't a blank line, you can press the DOWN ARROW KEY when at the bottom of the screen to add a new blank line.

Now when you `RUN` the program, you'll see the change we made to the "hello" message.

---

Retroputer BASIC supports the following in expressions:

Operator    | Symbol    | # of Operands | Precedence | Associativity | Notes
------------|-----------|---------------|------------|---------------|------------------
Or          | `OR`      | 2             | 5          | Left          | NOT YET IMPLEMENTED
And         | `AND`     | 2             | 6          | Left          | NOT YET IMPLEMENTED
Not         | `NOT`     | 1             | 17         | Right         | NOT YET IMPLEMENTED


Token       | Symbol    | # of Operands | Precedence | Associativity | Notes
------------|-----------|---------------|------------|---------------|------------------
Comma       | `,`       | 0             | 1          | —             |
Functions   | `fn()`    | 1             | 20         | —             |
Parentheses | `(`, `)`  | 1             | 21         | —             |

