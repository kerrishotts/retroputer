/* eslint-disable no-unused-vars */
export default class GenericDevice {
    constructor({ cpu, memory, name = "generic", type = "buffered" } = {}) {
        // register device with IO
        // since this is a generic "abstract" device, we don't do
        // anything here other than set our metadata
        this.name = name;
        this.type = type;
        this.memory = memory;
        this.cpu = cpu;
    }

    read(port) {
        return this.memory.peek(this.memory.layout.iobot + port);
    }

    write(port, v) {
        this.memory.poke(this.memory.layout.iobot + port, v);
    }

}