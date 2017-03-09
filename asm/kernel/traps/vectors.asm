;
; 6516 Retroputer Kernel
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; vectors.asm
; Author: Kerri Shotts
; Version: 0.2
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;
; Vectors for RESET, FRAME, etc...
;

.data 0x00000
.var vRESET                             ; RESET (BOOTSTRAP) vector
    .dw @RESET

.data 0x001E0
.var vFRAME                             ; FRAME vector
    .dw @FRAME

.data 0x001FC
.var vBADOP                             ; BADOP vector
    .dw @BADOP