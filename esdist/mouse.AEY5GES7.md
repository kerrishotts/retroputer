# Mouse

The mouse enables the user to directly interact with the contents on the screen simply by pointing at them and clicking a button. This is often the easiest method for users to provide input to your application.

Note that the mouse cursor position is always based on the screen's pixels, rather than converted to the current display mode. 

### Ports

| Port | Name | Notes |
| :--- | :--- | :--- |
| 0x50 | Mouse Y \(High\) | 0 - 479, or delta between last movement |
| 0x51 | Mouse Y \(Low\) | \(Resets High & Low when read if Report Mode is 1\) |
| 0x52 | Mouse X \(High\) | 0 - 639, or delta between last movement |
| 0x53 | Mouse X \(low\) | \(Resets High & Low when read if Report mode is 1\) |
| 0x54 | Report Mode | If 0, the values of 0x50-0x53 are absolute screen positions. If 1, the values are relative deltas since the last movement \(and read\). These reset on each read. |
| 0x55 | Button State | `......._rl` where `r` indicates state of the right mouse button and `l` indicates the state of the left mouse button. There is no provision for a middle mouse button. |
| 0x56 | Scroll Delta | Indicates the cumulative delta since the last read that the user has used the scroll wheel. Resets when read.  |
| 0x57 | - |  |
| 0x58 | - |  |
| 0x59 | - |  |
| 0x5A | - |  |
| 0x5B | - |  |
| 0x5C | - | - |
| 0x5D | - |  |
| 0x5E | - |  |
| 0x5F | Reset |  |



### 

