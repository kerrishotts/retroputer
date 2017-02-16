import GenericDevice from "../GenericDevice.js";

class Timer {

    constructor(cpu, trap, portLo, portHi) {
        this.duration = 0;
        this._time = 0;
        this._then = 0;
        this._cpu = cpu;
        this._trap = trap;
        this.ports = [portLo, portHi];
    }

    set duration(v) {
        this.duration = v;
        this._time = v;
        this._then = 0;
    }

    tick(now) {
        if (this.duration <= 0) {
            return;
        }

        if (this._then === 0) {
            this._then = now;
        }

        this._time -= (now - this._then);
        if (this._time <= 0) {
            // triggered!
            this._time += this.duration;
            this._cpu.sendTrap(this.trap);
        }
    }
}

export default class Keyboard extends GenericDevice {
    constructor({io, cpu, memory} = {}) {
        super({io, cpu, memory, name: "timers", type: "raw"});

        this._cpu = cpu;

        this._timers = [0, 1, 2, 3, 4].map( (_, idx) => new Timer(cpu, idx + 0x80, (idx * 2) + 0x80, (idx * 2) + 0x81) );




        io.registerDeviceWithPort({
            device: this,
            port: 0x10,
            readHandler: this.readKey
        });
        io.registerDeviceWithPort({
            device: this,
            port: 0x11,
            readHandler: this.readState
        });
        io.registerDeviceWithPort({
            device: this,
            port: 0x12,
            readHandler: this.readDirections
        });

        if (typeof window !== "undefined") {
            this.registerWithDOM();
        }
    }
}