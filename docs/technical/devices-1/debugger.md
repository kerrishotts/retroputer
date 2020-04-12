# Debugger (14)

This device enables the developer to debug the processor state.

### Trap (0xF0)

When the processor encounters a breakpoint, Trap 0xF0 is raised to trigger the monitor.

### Ports

| Port | Name | Notes |
| :--- | :--- | :--- |
| 0xE0 | Register Select | Selects the internal processor register  |
| 0xE1 | Register Value (High) | Renders the high bits of the selected register  |
| 0xE2 | Register Value (Low) | Renders the low bits of the selected register  |
| 0xE3 | Register Read/Write | 0: Reads the register<br/> 1: Writes the values of 0xE1:0xE2 to the register |
| 0xE4 | Breakpoint Select | Selects a breakpoint (0-255) |
| 0xE5 | Breakpoint Address (High) | The high bits of the breakpoint  |
| 0xE6 | Breakpoint Address (Low) | The low bits of the breakpoint  |
| 0xE7 | Breakpoint Mode | If the high bit is set, the breakpoint is _enabled_; otherwise it is disabled. <br/> If the low bit is set, the breakpoint is _set_. Breakpoint address is only updated when this port is modified.
| 0xE8 | Port Select | Selects a data port  |
| 0xE9 | Port Value | Renders the data on the port  |
| 0xEA | Port Read/Write | 0: Reads the port<br /> 1: Writes the value to the port  |
| 0xEB | Port Breakpoint Mode | If the high bit is set, the breakpoint is enabled and will fire when the port matches the set value. If the low bit is set, the breakpoint value is set to 0xE9.  |
| 0xEC | Break on Invalid Instruction | Indicates the TRAP to use when an invalid instruciton is encountered  |
| 0xED | Break on Exception | Indicates the TRAP to use when an exception occurs  |
| 0xEE | - |   |
| 0xEF | Debug Mode | If 0xFF, breakpoints are checked at each instruction.  |

