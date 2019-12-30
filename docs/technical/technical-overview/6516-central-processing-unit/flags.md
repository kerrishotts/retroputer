# Flags

Retroputer has eight flags, and are stored in the STATUS register.. Each flag can be SET or UNSET. This corresponds to `1`\(SET\) and `0` \(UNSET\).

| Index | Name | Alias | Description |
| :--- | :--- | :--- | :--- |
| 7 | Exception | EX | SET if the processor has encountered an exception. |
| 6 | IRQ Disable | ID | When SET maskable interrupts are ignored.  |
| 5 | IRQ In Service | IS | SET when the processor is servicing an interrupt. Useful for a trap handler to determine if it is dealing with a hardware interrupt \(SET\) or a software trap \(UNSET\). |
| 4 | Single Step | SS | When SET, the processor will execute a single instruction and then WAIT until an NMI is received in order to continue. |
| 3 | Negative | N | SET if the result of the last arithmetic operation would result in a negative number \(MSB is SET\). |
| 2 | Carry | C | When SET, the last arithmetic operation caused a carry condition  |
| 1 | Overflow | V | SET if the result of the last arithmetic operation would result in an arithmetic overflow \(important for 2's complement math\). |
| 0 | Zero | Z | When ZERO, the last arithmetic operation resulted in zero. |

Each flag can be set using the `SET` instruction, along with the flag alias. To clear a flag, use the `CLR` instruction with the flag alias.

Testing the state of a flag is done by using the `BR(S)` and `CALL(S)` instructions.

