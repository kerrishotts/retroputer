# I/O Bus

The I/O bus enables the Retroputer CPU to communicate with other devices attached to the system, including things like keyboards, storage devices, and more.

The I/O bus allows fifteen devices to be connected — each one has a specific function and can interrupt the CPU at any time in order to request servicing. Data is transferred on an eight-bit wide data bus.

There are three components to this system:

* Interrupt Request \(IRQ\) Service lines \(16\), for a total of 16 IRQs
* IRQ Signal line \(1\)
* Device-Select lines \(4\)
* Address-Select lines \(4\)
* Data lines \(8\)
* Command line \(1\)
* Execute line \(1\)

### IRQ Service and IRQ Signal Lines

When a device needs serviced by the CPU, it will set the IRQ service line corresponding to the IRQ of the device, and then pulse the IRQ Signal line. This will cause the CPU to stop whatever it was doing and allow it to service the most important IRQ. Until the request is serviced, the device should continue to pulse the IRQ Signal line until the CPU responds to the request. Although there may be requests with higher priority, eventually the request should be serviced.

### Device and Address-Select Lines

When the CPU needs to request data from a device, or the device wants to send data to the CPU, the device is selected using the device-select lines. Each device is allocated a set number of addresses, and these are selected using the address-select lines.

When using assembly language, the device number directly corresponds to the _high_ nibble when using `IN` or `OUT`. For example, `OUT $47, AL` will send the contents of `AL` to the fifth device \(index `04`\) using the device's internal address of `07`.

### Data Lines

Data lines are used for the actual transmission of data between the CPU and devices. This bus is only eight-bits wide.

### Command Line

There are only two commands that the I/O bus understands:

* 1 \(Device Read from Bus\)
  * The Device will read the data placed on the bus and, based upon the address select lines, it will act accordingly.
* 0 \(Device Write to Bus\)
  * The Device will write the data requested from the address select lines to the data bus. The CPU will not automatically pick this data up; the device should also raise the IRQ select and signal lines to notify the CPU when data has been placed on the line.

### Execute Line

When the CPU is finished writing to the data, address, and command lines, the Execute line will be pulsed. This signals devices to read the I/O bus and determine the correct course of action.

### Devices and Priorities

| Device | Device \# | Trap Base | Priority |
| :--- | :--- | :--- | :--- |
| RTC | 0 | 0x80 | 3 |
| Screen | 1 & 2 | 0x88 | 2 |
| [Keyboard](keyboard.md) | 3 | 0x98 | 4 |
| [Controller](controllers.md) | 4 | 0xA0 | 4 |
| [Mouse](mouse.md) | 5 | 0xA8 | 4 |
| Audio | 6 | 0xB0 | 2 |
| Storage | 7 | 0xB8 | 5 |
| [Console](console.md) | 8 | 0xC0 | 5 |
| COM2 | 9 | 0xC8 | 5 |
| COM3 | 10 | 0xD0 | 5 |
| COM4 | 11 | 0xD8 | 5 |
| – | 12 | 0xE0 |  |
| [DMA](dma.md) | 13 | 0xE8 |  |
| Debugger | 14 | 0xF0 | 1 |
| Power | 15 | 0xF8 | 0 |

