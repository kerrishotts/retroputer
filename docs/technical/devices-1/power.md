# Power (15)

This device controls and responds to power requests.

### Ports

| Port | Name | Notes |
| :--- | :--- | :--- |
| 0xF0 | Power State | 0x00: Idle <br/> 0x01: Breakpoint <br/> 0x80: Full power |
| 0xF1 | - |   |
| 0xF2 | - |   |
| 0xF3 | - |   |
| 0xF4 | - |   |
| 0xF5 | - |   |
| 0xF6 | - |   |
| 0xF7 | - |   |
| 0xF8 | - |   |
| 0xF9 | - |   |
| 0xFA | - |   |
| 0xFB | - |   |
| 0xFC | - |   |
| 0xFD | - |   |
| 0xFE | - |   |
| 0xFF | Reset Device | Writing to this port triggers a reset by raising TRAP 0xF8 |

