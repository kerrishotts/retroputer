export default class GenericDevice {
    constructor({io, cpu, memory, name = "generic", type="buffered"} = {}) {
        // register device with IO
        // since this is a generic "abstract" device, we don't do
        // anything here other than set our metadata
        this.name = name;
        this.type = type;
    }

    read(port) {
        return 0;
    }

    write(port, v) {
        return;
    }

}