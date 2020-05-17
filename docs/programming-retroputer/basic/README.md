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
print "Hello!"
```

Retroputer will immediately respond with a warm greeting:

```
Hello!
READY.
█
```

If you _didn't_ see that result, you may have typed something wrong. For example, let's imagine this scenario instead (or try it out yourself):

```
prnt "Hello!"
?SYNTAX ERROR
READY.
█
```

This kind of response may seem a bit rude, but it's just BASIC's way of telling you that it didn't understand what you meant.

Alternatively, if you forgot the ending quote, you might see this response:

```
print "Hello!
?EXPECTED A QUOTE ERROR
READY.
█
```

Here BASIC is letting you know that quotes come in pairs, and that you've forgot one somewhere. Once you understand BASIC's responses, things start to become a lot easier, and it can start to feel like you're having a conversation, although a somewhat _limited_ one. After all, Retroputer is only a machine, and can only do exactly what you tell it.

## 1.1 Calculating

As we mentioned earlier, sometimes _direct_ mode is often referred to as _calculator_ mode. That's because you can tell the computer to evaluate a mathematical expression and it will give you the result. Let's try an example.

```basic
print 2 + 2
```

Retroputer should respond with `4`. Ok, so that wasn't _so_ difficult. Let's try something that would take us humans a little more time to figure out.

```basic
print 234 * 56
```

Retroputer's response will be:

```
print 234 * 56
13104
READY.
█
```

Impressive! Retroputer was able to calculate the result faster than you were, I'd guess! 

So far we've seen that Retroputer can add and multiply, but it also can do several other mathematical operations, including subtraction, division, exponentiation, and more. 

One thing it _can't_ do is divide by zero. If you try, Retroputer will definitely let you know:

```
?DIVISION BY ZERO ERROR
READY.
█
```

