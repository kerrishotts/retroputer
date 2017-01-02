# KERNEL Reference

The KERNEL provides the computer with basic input/output handling, communication with external devices, and provides the initial operating environment and programming language. It is stored in 16KB of read-only memory \(ROM\) and cannot be changed by running programs. It also has access to a 1KB of scratch area which stores temporary and permanent variables needed by the KERNEL in order to operate. This scratch area can be manipulated by running programs, but doing so is not suggested unless you know what you're doing as doing so can result in a crash.

The KERNEL is mostly a collection of variables and callable subroutines. Your program can call a KERNEL routine by setting certain registers and executing a specific software trap. When the KERNEL routine finishes, control is returned to your program along with any results the routine needs to return. The KERNEL also has various routines that run on a regular basis in order to perform basic housekeeping routines – such as blinking the cursor.

The KERNEL reserves traps 0x80–0xBF and 0xF0–0xFF. The latter sixteen are for hardware events \(for example, the reset button being pressed\), while the first sixty-four traps provide entry into the KERNEL. Their vectors are initially stored in ROM, but copied from ROM to the trap vectors in RAM by the RESET trap.

## KERNEL Variables

The following variables are used by the KERNEL. For each variable, the address location and size is specified, as well as the name and description. Variable space starts at 0x0B000.

| Name | Location | Size | Description |
| :--- | :--- | :--- | :--- |
| cursor-enable | | 1 | Determines if the cursor should be visible. |
| cursor-blink-enable | | 1 | Determines if the cursor should blink, and which blink stage the cursor is in \(on/off\). |
| cursor-blink-reset | | 1 | Indicates the cursor blink reset value; defaults to 0x30. A lower value will cause a faster blink rate, while a higher value slows the cursor blinking down. |
| cursor-pos | | 1 | The address at which the cursor is located. |
| | | | |

# KERNEL Subroutines

The following subroutines are exposed to program. For each routine, the trap and any associated "in" and "out" registers are provided, as well as the name and description.

| Name | TRAP and IN Registers | OUT Registers | Description |
| :--- | :--- | :--- | :--- |
| draw-cursor | TRAP 0x80; A = 0x0000 | N/A | Draws the cursor according to cursor configuration variables. |
| get-key | TRAP 0x90; A = 0x0000 | AL = key pressed | Waits for a key to be pressed, and returns it |
| | | | |
| | | | |

# KERNEL Processes

There are some processes within the KERNEL that occur on a regular basis in order to take care of various housekeeping items.

| Name | Trap | Location | Description |
| :--- | :--- | :--- | :--- |
| FRAME | 0xF0 | 0xFE00 | Performs house keeping tasks each frame |


