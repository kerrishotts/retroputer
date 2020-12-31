# The Kernel

The **kernel** is the core operating system for Retroputer. It controls the startup and initialization of memory, trap vectors, and launches whatever code is stored at 0x02000. It also contains a lot of reusable routines that make working with the screen, the keyboard, and other devices easier.

> **Note**
>
> If you're at all familiar with the x86 PCs, you can think of the kernel as the BIOS \(Basic Input/Output System\).



