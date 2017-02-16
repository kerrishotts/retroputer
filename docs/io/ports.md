#
Input/Output Port Reference

There are 256 I/O ports available for use. Of those ports, only some are attached to external devices. Other ports may provide other useful information, such as retrieving the system time, random numbers, and other information.

| Port | Name             | Device      | R/W  | Trigger? |Description |
|-----:| :--------------- | :---------- | :--- | :------: |:---------- |
| 0x10 | kbdpressed       | Keyboard    |  RO  |    -     | Returns the first key press in the 32-byte keyboard buffer |
| 0x11 | kbdmodifiers     | Keyboard    |  RO  |    -     | Returns the state of the keyboard modifier keys \(like SHIFT, CTRL, ALT, etc.\) |
| 0x12 | kbddirections    | Keyboard    |  RO  |    -     | Returns the state of the directional keys on the keyboard |
| 0x80 | timer-0-low      | Timer       |  RW  |    Y     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x81 | timer-0-high     | Timer       |  RW  |    -     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x82 | timer-1-low      | Timer       |  RW  |    Y     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x83 | timer-1-high     | Timer       |  RW  |    -     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x84 | timer-2-low      | Timer       |  RW  |    Y     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x85 | timer-2-high     | Timer       |  RW  |    -     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x86 | timer-3-low      | Timer       |  RW  |    Y     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x87 | timer-3-high     | Timer       |  RW  |    -     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x88 | timer-4-low      | Timer       |  RW  |    Y     | Returns the current time remaining before the timer is triggered; sets the timer's duration.
| 0x89 | timer-4-high     | Timer       |  RW  |    -     | Returns the current time remaining before the timer is triggered; sets the timer's duration.

A trigger indicates when a multi-byte value is acted upon by an associated device. Because ports can only transport eight bits and some devices
need more than eight bits of data, the trigger port allows the device to act only when all data has been sent to the appropriate ports. Until the
trigger port is written, the internal state of the device will not change.