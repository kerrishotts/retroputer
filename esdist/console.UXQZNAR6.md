# Console (8)

The console is a simple device that can be used to send and receive transmissions via a communication port instead of the keyboard and screen.

The console is hard-coded to device \#8, and works the same way as any of the **COM** devices.

### Generating Output

```text
    # Write "A" to the console
start:
    ld al, 65                          # 65 = A
    out 0x82, al                       # write to CON:SEND
    ld al, 0b10                        # indicate write
    out 0x80, al                       # ...on CON:CTRL
_loop:
    in al, 0x83                        # wait for ACK
    br z _loop                         # ...will be non-zero when ACK'd
    brk
```

