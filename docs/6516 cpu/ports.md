# Input/Output Port Reference

There are 256 I/O ports available for use. Of those ports, only some are attached to external devices. Other ports may provide other useful information, such as retrieving the system time, random numbers, and other information.

| Name \(Port\) | Device | Read/Write | Description |
| :--- | :--- | :--- | :--- |
| kbdpressed \(0x10\) | Keyboard | RO | Returns the first key press in the 32-byte keyboard buffer |
| kbdmodifiers \(0x11\) | Keyboard | RO | Returns the state of the keyboard modifier keys \(like SHIFT, CTRL, ALT, etc.\) |
| kbddirections \(0x12\) | Keyboard | RO | Returns the state of the directional keys on the keyboard |


