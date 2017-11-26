import ports from "../ports.js";
import twosComplement from "../../util/twosComplement.js";
import GenericDevice from "../GenericDevice.js";
import log from "../../util/log.js";

const timerPorts = {
    configuration: 0,
    resetLow: 1,
    resetHigh: 2,
    currentLow: 3,
    currentHigh: 4
}

const timerBits = {
    enable: 0b00000001,  // if 1, timer is enabled; CLEAR before changing resets
    mode: 0b00000010,  // if 0, one-shot. If 1, continuous
    interrupt: 0b00000100,  // if 0, no interrupt. If 1, interrupt
    triggered: 0b10000000,  // set when triggered; must be cleared manually
}

class Timer {

    constructor({ device, cpu, trap, port } = {}) {
        this._cpu = cpu;
        this._trap = trap;
        this._port = port;
        this._then = 0;
        this._device = device;
    }

    get enabled() {
        return this._device.read(this._port + timerPorts.configuration) & timerBits.enable !== 0;
    }

    get mode() {
        return this._device.read(this._port + timerPorts.configuration) & timerBits.mode !== 0;
    }

    get interrupt() {
        return this._device.read(this._port + timerPorts.configuration) & timerBits.interrupt !== 0;
    }

    set enabled(v) {
        this._device.write(this._port + timerPorts.configuration,
            (this._device.read(this._port + timerPorts.configuration) & 0b11111110) | (timerBits.enable * (v ? 1 : 0))
        );
    }

    get reset() {
        return twosComplement.from16((this._device.read(this._port + timerPorts.resetHigh) << 8) |
            this._device.read(this._port + timerPorts.resetLow));
    }

    get current() {
        return twosComplement.from16((this._device.read(this._port + timerPorts.currentHigh) << 8) |
            this._device.read(this._port + timerPorts.currentLow));
    }

    set current(v) {
        this._device.write(this._port + timerPorts.currentHigh, twosComplement.to16(v) >> 8);
        this._device.write(this._port + timerPorts.currentLow, twosComplement.to16(v) & 0xFF);
    }

    set triggered(v) {
        this._device.write(this._port + timerPorts.configuration,
            (this._device.read(this._port + timerPorts.configuration) & 0b01111111) | (timerBits.triggered * (v ? 1 : 0))
        );
    }

    tick(now) {
        if (this.reset <= 0 || !this.enabled) {
            // can't trigger faster than 0; can't trigger when disabled
            return;
        }

        if (this.current === 0) {
            this.current = this.reset;
        }

        this.current -= (now - this._then);
        this._then = now;

        if (this.current <= 0) {
            // triggered!
            if (this.mode) {
                // continuous
                this.current += this._duration;
            } else {
                this.enabled = false;
            }

            this.triggered = true;
            if (this.interrupt) {
                this._cpu.sendTrap(this._trap);
            }
        }
    }
}

export default class Timers extends GenericDevice {
    constructor({ cpu, memory } = {}) {
        super({ cpu, memory, name: "timers", type: "raw" });
        this.reset();
    }

    reset() {
        this._timers = [0, 1, 2, 3].map((_, idx) => new Timer({ device: this, cpu: this.cpu, trap: idx + 0x80, port: (idx * 8) + ports.ioTimer0Configuration }));
    }

    tick(now) {
        for (let i = this._timers.length - 1; i >= 0; i--) {
            this._timers[i].tick(now);
        }
    }
}