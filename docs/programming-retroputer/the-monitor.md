# The Monitor

The Retroputer monitor is a way to view the state of the machine from _within_ the machine itself. It allows you to debug programs, inspect memory, and make changes on the fly.

Launching the monitor can be done in one of several ways:

| Context | Mechanism |
| :--- | :--- |
| At power-on or warm reset | Press and hold SHIFT until the monitor appears. |
| From BASIC | Type `MONITOR` and press **ENTER**. |
| From machine code | Jump to address `0x7D800` \(assumes that page thirty-one is mapped to page three\) |

Upon launch, the monitor will announce itself and display the current status of the machine by listing out several registers:

![The Retroputer Monitor Welcome](../images/monitor-greeting.png)

Whenever you see a `READY.` prompt, the monitor is waiting for your command. The monitor understands the following commands:

| Monitor Command | Mnemonic | Meaning |
| :--- | :--- | :--- |
| A \[address\] | Assemble | Start writing assembly code at the address \(or PC if not supplied\). |
| B \[address\] | Break \(at\) | Set a breakpoint at the given address \(or PC\). |
| C \[address\] | Clear \(breapoint\) | Clear a breakpoint at the given address \(or PC\). |
| D \[address\] \[count\] | Disassemble | Show a dissassembly at the specified address, for the specified number of lines. If no address is supplied, PC is assumed. If no count is supplied, 16 is assumed. |
| E \[address\] - \[address\] | Examine | Examine memory contents at the specified address. If no ending address is specified, sixteen bytes are displayed. |
| F |  |  |
| G \[address\] | Go | Starts execution at the specified address \(or PC\).  |
| H |  |  |
| I port | In | Reads a byte from the specified port. |
| J |  |  |
| K address size target-address | Copy Bloc\(K\) | Copies a block from one place to another. |
| L "program name" | Load | Loads the specified program from persistent storage. |
| M |  |  |
| N \[address\] | Next | Executes the instruction at address \(or PC\), and advances by a single instruction. |
| O port value | Out | Writes the value to the specified port. |
| P | Processor \(Status\) | Prints the processor status. |
| Q | Quit | Exits the monitor and returns control to the caller. If started at power-on or warm reset, control is given to BASIC. |
| R register value | \(Set\) Register | Sets the specified register to the given value. |
| S \["program name"\] \[start address\] \[end address\] | Save | Saves the specified contents of memory. |
| T 0\|1 | Trace | Enables \(1\) or disables \(0\) tracing of instructions during execution. During trace mode, use N to step through each instruction. |
| U |  |  |
| V |  |  |
| W address bytes... | Write | Writes the specified bytes to the given address. |
| X |  |  |
| Y |  |  |
| Z |  |  |

