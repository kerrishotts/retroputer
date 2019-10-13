;
; BOOTSTRAP.ASM
; Author: Kerri Shotts
; Version: 0.2
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; Initializes the machine to its default state by setting up trap vectors, the
; screen (palette & tile page), setting flags and registers appropriately, and
; jumping to 0x01000.


;
; FRAME
;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; Handles cursor-related logic
;

.code 0x0FE00
FRAME:                                  ; does nothing ATM
    RET

.import kernel/traps/vectors.asm

.import kernel/traps/RESET.asm
.import kernel/traps/BADOP.asm