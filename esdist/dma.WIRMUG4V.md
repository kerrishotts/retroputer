# DMA (13)

The DMA device enables fast movement of memory blocks. This enables smoother scrolling, fast copying of large amounts of data, etc.

> **Important**
>
> The DMA device does _not_ respect the processor memory map. As such, any DMA operations operate directly on physical memory addresses. Furthermore, only 64K of data can be moved, swapped, or filled at any one time.

The DMA device supports the following operations:

### Copy

Copies the data in the source block to the target block.

### Swap

Swaps the data in the source and target block.

### Fill

Fills the range indicated by the source block with a given byte.


### Ports

| Port | Name | Notes |
| :--- | :--- | :--- |
| 0xD0 | Source Address (18-16) | Source of the memory operation |
| 0xD1 | Source Address (15-8) | " |
| 0xD2 | Source Address (7-0) | " |
| 0xD3 | - | Unused |
| 0xD4 | Target Address (18-16) | Target address |
| 0xD5 | Target Address (15-8) | " |
| 0xD6 | Target Address (7-0) | " |
| 0xD7 | - | Unused |
| 0xD8 | Length (15-8) | Length of data |
| 0xD9 | Length (7-0) | "  |
| 0xDA | - | Unused  |
| 0xDB | - | Unused  |
| 0xDC | Mode | Indicates the DMA operation: <br/> 1: Copy <br/> 2: Swap <br/> 4: Fill <br/> Setting this port executes the operation. |
| 0xDD | Fill | Specifies the byte to fill with if mode is 4 |
| 0xDE | - | Unused  |
| 0xDF | - | Unused  |

### Examples

```
.segment code 0x02000 {
    ld al, 0x00
    out 0x12, al     # set the layer we're modifying
    ld al, 2
    out 0x1B, al     # graphics mode 2
    ld al, 0
top:
    ld x, 49152
    ld bl, 0xff
    ld dl, 0
    do {
        st [0x10000,x], al
        inc al
        mov bl, al
        or bl, 0b10100100
        out 0x2B, bl
        dec x
    } while !c
setdma:
    # source
    ld cl, 0x01
    out 0xd0, cl
    ld cl, 0x00
    out 0xd1, cl
    ld cl, 0x00
    out 0xd2, cl
    # target
    ld cl, 0x01
    out 0xd4, cl
    ld cl, 0x00
    out 0xd5, cl
    ld cl, 0x01
    out 0xd6, cl
    # length
    ld cl, 0xBF
    out 0xd8, cl
    ld cl, 0xff
    out 0xd9, cl
    # execute
    ld cl, 0x01
dma:
    out 0xdc, cl
    st [0x10000], al
    inc al
sleep:
    inc bl
    out 0x2B, bl
    in dl, 0x2E
    cmp dl, 0xf0
    br !z sleep
hold:
    in dl, 0x2E
    cmp dl, 0xf0
    br z hold
    br dma
    brk
}
```