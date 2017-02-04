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
            let r = fn(port);
            if (r !== undefined && r !== null) {
                return r & 0xFF;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    write(port, v) {
        v &= 0xFF;
        let fn = this.ports.write[port];
        if (fn) {
            fn(port, v);
        }
    }
}