# Assembly Files for Retroputer

The assembly files contained within this folder serve both as examples and as Retroputer's operating system.

* `examples`: various small programs that demonstrate and/or test certain aspects of the emulation.
* `kernel`: Retroputer

## Editing Files

If you, like me, want to keep comments nicely aligned, there's no extension that I can find to accomplish this. Instead:

Search using the following regular expression:

```
^\s+[^#|\s]+[^#]*(#.*)
```

Press ALT+ENTER to select all entries. If using VI, make sure to be in visual mode (`v`).

* Use the Transform Selection command from the "Transform Selection" plugin with this expression:

```
s=x.split("#"), a=s.slice(0,s.length-1).join("#"), b=s.slice(-1), a.padEnd(59," ")+" #"+b
```

At some point I'll probably write a prettifier for this code, but the above does the trick for now.