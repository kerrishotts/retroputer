# Instruction encoding

The instruction set uses a variable-width encoding. 

|   Opcodes        | Encoding                            |  Mnemonic and parameters     |   Flags  | Description
|:----------------:|:------------------------------------|:-----------------------------|:--------:|:--------------
|                  |`76543210 76543210 76543210 76543210`|                              |`IMXEVCNZ`|               
| `00`             |`........ ........ ........ 00000000`| NOP                          |`........`| No operation
| `01`             |`........ ........ 00000001 ########`| ENTER imm8                   |`........`| Create new stack frame with space for imm8 bytes
| `02`             |`........ ........ 00000010 ########`| EXIT imm8                    |`........`| Pop stack frame of imm8 bytes
| `03`             |`........ ........ ........ 00000011`| TRAP AL                      |`........`| Call trap AL 
| `04 00-3F`       |`........ ........ 00000100 00drgsrg`| ADD drg, srg                 |`....VCNZ`| drg := srg + drg; with carry if M is 1
| `04 80-BF`       |`........ ........ 00000100 01drgsrg`| SUB drg, srg                 |`....VCNZ`| drg := drg - srg; with carry if M is 1
| `04 80-BF`       |`........ ........ 00000100 10drgsrg`| XOR drg, srg                 |`......NZ`| drg := drg ^ srg
| `04 C0-FF`       |`........ ........ 00000100 11drgsrg`| CMP drg, srg                 |`....VCNZ`| flags = drg cmp srg
| `05 00-3F`       |`........ ........ 00000101 00drgsrg`| SHL drg, times(srg)          |`.....CNZ`| reg shl times; if M = 1, ROL
| `05 80-BF`       |`........ ........ 00000101 01drgsrg`| SHR drg, times(srg)          |`......NZ`| reg shr times; if M = 1, ROR
| `05 80-BF`       |`........ ........ 00000101 10drgsrg`| AND drg, srg                 |`......NZ`| drg := drg & srg
| `05 C0-FF`       |`........ ........ 00000101 11drgsrg`| OR  drg, srg                 |`......NZ`| drg := drg || srg
| `06 01`          |`........ 00000110 00000001 ########`| TRAP imm8                    |`........`| Call trap imm8
| `06 08`          |`........ 00000110 00001000 00000reg`| NEG reg                      |`......NZ`| Two's complement register
| `06 10`          |`........ 00000110 00010000 00000reg`| XCB reg                      |`........`| Swap hi/lo byte of register
| `06 14`          |`........ 00000110 00010100 ########`| HALT imm8                    |`........`| Halt until interrupt
| `06 18`          |`........ 00000110 00011000 ........`| PUSHA                        |`........`| Push all registers (except PC)
| `06 19`          |`........ 00000110 00011001 ........`| POPA                         |`........`| Pop all registers (except PC)
| `06 20-27`       |`........ 00000110 00100reg ########`| SETR reg, imm8               |`........`| Set bits to 1 in specified register
| `06 28-2F`       |`........ 00000110 00101reg ########`| CLRR reg, imm8               |`........`| Clear bits in specified register
| `06 30-37`       |`........ 00000110 00110reg ########`| IFR reg, imm8                |`..X.....`| Sets X if bits in imm8 are on in register
| `06 38-3F`       |`........ 00000110 00111reg ########`| IFNR reg, imm8               |`..X.....`| Sets X if bits in imm8 are off in register
| `06 40`          |`........ 00000110 00100000 00drgsrg`| MUL drg, srg                 |`.....CNZ`| drg := drg * srg;
| `06 41`          |`........ 00000110 00100001 00drgsrg`| IDIV drg, srg                |`...E..NZ`| drg := drg / srg;
| `06 42`          |`........ 00000110 00100010 00drgsrg`| IMOD drg, srg                |`......NZ`| drg := drg % srg;
| `06 6D`          |`........ 00000110 01101101 D.drgreg`| MFILL  D:drg, sreg * C       |`........`| Fill memory at D:drg with low 8 bits of sreg
| `06 6E`          |`........ 00000110 01101110 DSdrgsrg`| MSWAP  D:drg, S:srg * C      |`........`| Swap memory C times from address specified in srg in bank register indicated by S to memory in D:DRG
| `06 6F`          |`........ 00000110 01101111 DSdrgsrg`| MCOPY  D:drg, S:srg * C      |`........`| Move memory C times from address specified in srg in bank register indicated by S to memory in D:DRG
| `06 70-77`       |`........ 00000110 01110reg ########`| IN reg, port                 |`......NZ`| reg := data from port#
| `06 78-7F`       |`........ 00000110 01111reg ########`| OUT reg, port                |`........`| data from port# := reg
| `06 80-BF`       |`........ 00000110 10drgsrg ........`| MOV drg, srg                 |`........`| srg := drg
| `06 C0-FF`       |`........ 00000110 11drgsrg ........`| SWAP reg, reg                |`........`| swap reg and reg
| `07 00-3F`       |`00000111 00mmmxys ######## ########`| BR                           |`........`| Branch to address
| `07 40-7F`       |`00000111 01mmmxys ######## ########`| CALL                         |`........`| Call address as subroutine
| `07 80-BF`       |`00000111 10mmmxys ######## ########`| LDD A(L) [DB]                |`......NZ`| scale of 1 = AL; 2 = A
| `07 C0-FF`       |`00000111 11mmmxys ######## ########`| STS A(L) [DB]                |`........`| scale of 1 = AL; 2 = A
| `08-0B`          |`........ ........ ........ 000010rg`| MOV reg, SB                  |`........`| Set source bank
| `0C-0F`          |`........ ........ ........ 000011rg`| MOV reg, DB                  |`........`| Set destination bank
| `10-17`          |`........ ........ ........ 00010reg`| INC reg                      |`.....CNZ`| Increment register by one
| `18-1F`          |`........ ........ ........ 00011reg`| DEC reg                      |`.....CNZ`| Decrement register by one
| `20-27`          |`........ ........ ........ 00100flg`| IF flag                      |`..X.....`| If flag is set, execute next instruction
| `28-2F`          |`........ ........ ........ 00101flg`| IFN flag                     |`..X.....`| If flag is NOT set, execute next instruction
| `30-37`          |`........ ........ ........ 00110flg`| SET flag                     |`IMXEVCNZ`| Set flag
| `38-3F`          |`........ ........ ........ 00111flg`| CLR flag                     |`IMXEVCNZ`| Clear flag
| `40-7F`          |`........ 01mmmxys ######## ########`| LDS A(L) [SB]                |`......NZ`| scale of 1 = AL; 2 = A
| `80-BF`          |`........ 10mmmxys ######## ########`| STD A(L) [SB]                |`........`| scale of 1 = AL; 2 = A
| `C0-DF`          |`........ ........ ........ 110dddss`| MOV dest, src                |`........`| transfer dest reg to src reg
| `E0-EF`          |`........ ........ ........ 1110regs`| PUSH reg                     |`........`| push reg on stack
| `F0-FE`          |`........ ........ ........ 1111regs`| POP reg                      |`........`| pop reg off stack
| `FF`             |`........ ........ ........ 11111111`| RET                          |`........`| Return from call