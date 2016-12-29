export default class IO {
    constructor() {
        this.ports = {
            read: Array(256),
            write: Array(256)
        };
    }

    registerDeviceWithPort({device, port, readHandler, writeHandler} = {}) {
        if (readHandler) {
            this.ports.read[port] = readHandler.bind(device);
        }
        if (writeHandler) {
            this.ports.write[port] = writeHandler.bind(device);
        }
    }

    read(port) {
        let fn = this.ports.read[port];
        if (fn) {
            return fn(port) & 0xFF;
        } else {
            return 0;
        }
    }

    write(port, v) {
        v = v & 0xFF;
        let fn = this.ports.write[port];
        if (fn) {
            fn(port, v);
        }
    }
}