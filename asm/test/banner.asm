;
; Banner
;
; This assembly program writes a banner to the screen
;

; Create a reference to tile page 0
.data 0x30000
.var tile-page-0

;
; Program data
.data 0x02000
.var line1
.db 40
.db 32 32
.ds //// RETROPUTER 256
.db 32
.ds KERNEL V1.0 \\\\
.db 32 32

.var line2
.db 40
.db 32
.ds 239K RAM INSTALLED
.db 32 32 32 32
.ds 40960 BYTES FREE
.db 32

.var line3
.db 2
.ds OK

.def border-width  0x1FA05
.def border-height 0x1FA06

;
; Write our banner to the screen!
.code 0x1000
    XOR A, A                            => 04 80                        ; clear A

    ; eliminate our borders
    LDI AL, bank(#border-width)         => 40 01
    MOV DB, A                           => 0c                           ; DB = 0x01 (bank 1 is screen config)
    LDI AL, 0x00                        => 40 00
    STD AL, [word(#border-width)]       => 90 fa 05                     ; word --> FA05 (discards bank)
    STD AL, [word(#border-height)]      => 90 fa 06

line1:
    LDI A, addr(&line1)                 => 49 20 00
    MOV D, A                            => cc                           ; D = line 1 of text
    LDI A, 40                           => 49 00 28
    MOV Y, A                            => d4                           ; Y = 40 (line 2 on screen)
    CALLS :print                        => 07 40 1D                     ; print, please!
line2:
    LDI A, addr(&line2)                 => 49 20 29
    MOV D, A                            => cc
    LDI A, 120                          => 49 00 78
    MOV Y, A                            => d4
    CALLS :print                        => 07 40 12
line3:
    LDI A, addr(&line3)                 => 49 20 52
    MOV D, A                            => cc
    LDI A, 200                          => 49 00 c8
    MOV Y, A                            => d4
    CALLS :print                        => 07 40 07
halt:
    HALT 0x00                           => 06 14 00                     ; HALT! (until next trap)
    BRS :halt                           => 07 00 fa                     ; loop forever
    RET                                 => ff

    ; print requested string to screen
    ; D = address of string to print (PASCAL-type]) (in bank 0)
    ; Y = screen offset
print:
    PUSHA                               => 06 18                        ; Be nice, preserve All
    XOR A, A                            => 04 80                        ; Clear A
    MOV SB, A                           => 08                           ; Data is assumed to be in bank 0
    LDI AL, 0x03                        => 40 03
    MOV DB, A                           => 0c                           ; Screen is in bank 3
    LDS AL, [D]                         => 70                           ; Get number of characters
    MOV X, A                            => d0                           ; ... and assign to X
    INC D                               => 13
    DEC X                               => 1c
    IFN C                               => 2a                           ; if x < 0, nothing to print
        RET                             => ff                           ; so get out
print-loop:
    LDS AL, [D+X]                       => 74                           ; Get the Xth character
    STD AL, [0x0000+X+Y]                => 96 00 00                     ; Put the character at the X+Y position
    LOOP X, :print-loop                 => 06 52 F9                     ; keep going until we've printed everything
    POPA                                => 06 19                        ; clean up
    RET                                 => ff
