;
; Banner
;
; This assembly program writes a banner to the screen whenever the RESET
; trap is triggered. When finished, the machine halts.
;

;
; Handle FRAME trap by returning immediately
.code 0xFE00
    RET                                 ; nothing to do!

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
.ds **** Retroputer 256
.db 32
.ds Kernel v1.0 ****
.db 32 32

.var line2
.db 40
.db 32
.ds 256K RAM avail 45056 Kernel bytes free
.db 32

.var line3
.db 6
.ds Ready.

.def border-width  0x1FA05
.def border-height 0x1FA06

;
; Write our banner to the screen!
.code 0xFF00
    POP A                               => f0                           ; reset SP, since this is a RESET handler
    XOR A, A                            => 04 80                        ; clear A

    ; eliminate our borders
    LDI AL, bank(#border-width)         => 40 01
    MOV DB, A                           => 0c                           ; DB = 0x01 (bank 1 is screen config)
    LDI AL, 0x00                        => 40 00
    STD AL, [word(#border-width)]       => 90 fa 05                     ; word --> FA05 (discards bank)
    STD AL, [word(#border-height)]      => 90 fa 06

line1>
    LDI A, addr(&line1)                 => 49 20 00
    MOV D, A                            => cc                           ; D = line 1 of text
    LDI A, 40                           => 49 00 28
    MOV Y, A                            => d4                           ; Y = 40 (line 2 on screen)
    CALL >print                         => 07 49 00 20                  ; print, please!
line2>
    LDI A, addr(&line2)                 => 49 20 29
    MOV D, A                            => cc
    LDI A, 120                          => 49 00 78
    MOV Y, A                            => d4
    CALL >print                         => 07 49 00 14
line3>
    LDI A, addr(&line3)                 => 49 20 52
    MOV D, A                            => cc
    LDI A, 200                          => 49 00 c8
    MOV Y, A                            => d4
    CALL >print                         => 07 49 00 08
halt>                                  
    HALT 0x00                           => 06 14 00                     ; HALT! (until next trap)
    BR >halt                            => 07 09 ff f9                  ; loop forever
    RET                                 => ff

    ; print requested string to screen
    ; D = address of string to print (PASCAL-type]) (in bank 0)
    ; Y = screen offset
print>
    PUSH A                              => e0                           ; Be nice, preserve A
    PUSH FLAGS                          => ee                           ; and flags
    PUSH DB                             => ed
    PUSH SB                             => ec                           ; and bank registers
    XOR A, A                            => 04 80                        ; Clear A
    LDI AL, 0x00                        => 40 00
    MOV SB, A                           => 08                           ; Data is assumed to be in bank 0
    LDI AL, 0x03                        => 40 03
    MOV DB, A                           => 0c                           ; Screen is in bank 3
    LDS AL, [D]                         => 70                           ; Get number of characters
    MOV X, A                            => d0                           ; ... and assign to X
print-loop>
    LDS AL, [D+X]                       => 74                           ; Get the Xth character
    DEC X                               => 1c
    STD AL, [0x0000+X+Y]                => 96 00 00                     ; Put the character at the X+Y position
    IFN Z                               => 28                           ; If X is not zero,
        BR >print-loop                  => 07 09 ff f6                  ; ... keep going
    POP SB                              => fc                           ; clean up
    POP DB                              => fd
    POP FLAGS                           => fe
    POP A                               => f0
    RET                                 => ff
