;
; 6516 Retroputer Kernel
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; FRAME.asm
; Author: Kerri Shotts
; Version: 0.2
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; executes routines that need to execute each frame
;

.code 0x0FE00
FRAME:                                  ; does nothing ATM
    PUSHA                               ; push everything on the stack
    CLR I                               ; disable interrupts
    CALL :cursor-render                 ; draw the cursor, if necessary
    POPA                                ; clean up (enables interrupts again)
    RET