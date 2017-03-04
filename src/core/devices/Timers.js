import GenericDevice from "../GenericDevice.js";
import log from "../../util/log.js";

class Timer {

    constructor({cpu, io, trap, portLo, portHi} = {}) {
        this._duration = 0;
        this._time = 0;
        this._then = 0;
        this._cpu = cpu;
        this._trap = trap;
        this._partialV = 0;
        this.ports = [portLo, portHi];

        io.registerDeviceWithPort({
            device: this,
            port: portHi,
            readHandler: () => this._time >> 8,
            writeHandler: (port, v) => {
                this._partialV = v;
            }
        });
        io.registerDeviceWithPort({
            device: this,
            port: portLo,
            readHandler: () => this._time & 0xFF,
            writeHandler: (port, v) => {
                this.duration = ((this._partialV & 0xFF) << 8) | v;
            }
        });
    }

    set duration(v) {
        this._duration = v;
        this._time = v;
        this._then = 0;
    }

    tick(now) {
        if (this._duration <= 0) {
            return;
        }

        if (this._then === 0) {
            this._then = now;
        }

        this._time -= (now - this._then);
        this._then = now;
        if (this._time <= 0) {
            // triggered!
            this._time += this._duration;
            this._cpu.sendTrap(this._trap);
        }
    }
}

export default class Keyboard extends GenericDevice {
    constructor({io, cpu, memory} = {}) {
        super({io, cpu, memory, name: "timers", type: "raw"});
        this._cpu = cpu;
        this._io = io;
        this.reset();
    }

    reset() {
        this._timers = [0, 1, 2, 3, 4].map( (_, idx) => new Timer({cpu:this._cpu, io: this._io, trap: idx + 0x80, portHi: (idx * 2) + 0x80, portLo:(idx * 2) + 0x81}));
    }

    tick(now) {
        for (let i = this._timers.length - 1; i >= 0; i--) {
            this._timers[i].tick(now);
        }
    }
}