# System Bus

The system bus between the CPU and memory consists of 18 address-select lines, 16 data lines, two command lines, and one execute line, in addition to the typical clock line.

### Data Lines

There are sixteen data lines that can be used to transfer data between the CPU and memory. The entire data bus is always used; it is up to the CPU or the memory controller which lines to choose when reading from or writing to memory.

### Address Select Lines

The total amount of memory on the system is 512KB. Nineteen address select lines enables direct access to every byte.

The CPU's PC register \(Program Counter\) is only capable of driving the lowest 16 lines of the address select bus. As such, code can only be executed from the lowest 64KB of memory.

### Command Lines

There are four commands that can be expressed with the two command lines:

* `00` \(Store 8 bit value from memory\)
* `01` \(Store 16 bit value from memory\)
* `10` \(Get 8 bit value into memory\)
* `11` \(Get 16 bit value into memory\)

### Execute Line

When set, the CPU has finished writing commands to the system bus, and the memory controller is expected to perform the operation. If the request is one for data \(commands `10` and `11`\), the value will be read from the data bus on the same clock tick.

