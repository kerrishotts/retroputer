import { Device, _buffer } from "../core/Device.js";

const PORT_RTC_HOURS       = 0x00;
const PORT_RTC_MINUTES     = 0x01;
const PORT_RTC_SECONDS     = 0x02;
const PORT_RTC_HUNDREDTHS  = 0x03;
const PORT_TIMER_0_HIGH    = 0x04;
const PORT_TIMER_0_LOW     = 0x05;
const PORT_TIMER_1_HIGH    = 0x06;
const PORT_TIMER_1_LOW     = 0x07;
const PORT_TIMER_2_HIGH    = 0x08;
const PORT_TIMER_2_LOW     = 0x09;
const PORT_TIMER_3_HIGH    = 0x0A;
const PORT_TIMER_3_LOW     = 0x0B;
const PORT_RANDOM_HIGH     = 0x0C;
const PORT_RANDOM_LOW      = 0x0D;
const PORT_TIMER_MODES     = 0x0E;
const PORT_RESET           = 0x0F;

const MIRROR_MAP = {
    [PORT_RTC_HOURS]: true,
    [PORT_RTC_MINUTES]: true,
    [PORT_RTC_SECONDS]: true,
    [PORT_RTC_HUNDREDTHS]: true,
    [PORT_TIMER_0_HIGH]: true,
    [PORT_TIMER_0_LOW]: true,
    [PORT_TIMER_1_HIGH]: true,
    [PORT_TIMER_1_LOW]: true,
    [PORT_TIMER_2_HIGH]: true,
    [PORT_TIMER_2_LOW]: true,
    [PORT_TIMER_3_HIGH]: true,
    [PORT_TIMER_3_LOW]: true,
    [PORT_TIMER_MODES]: true,
    [PORT_RANDOM_HIGH]: true,
    [PORT_RANDOM_LOW]: true,
    [PORT_RESET]: true
};

const TIMER_MODES = {
    DISABLED: 0,
    ONE_SHOT: 1,
    MULTI_SHOT: 2,
    RANDOM: 3
};

export class Timers extends Device {
    constructor({device = 0, length = 16, controller, memory = undefined, clock = undefined, performance}) {
        super({device, length, controller, memory, clock});

        this._timers = Array.from({length: 5}, (_, idx) => ({
            mode: (idx < 4) ? TIMER_MODES.DISABLED : TIMER_MODES.RANDOM,
            cur: 0,
            dur: 0,
            start: 0,
            read: undefined
        }));

        this._performance = performance;
        this._lastTime = performance.now();
        this._tickSkip = 0;
    }

    tick() {
        super.tick();
        if (this._tickSkip > 0) {
            this._tickSkip--;
            return;
        }
        this._tickSkip = 100;

        const now = this._performance.now();
        const then = this._lastTime;
        const delta = now - then;
        //if (delta < 1) return;
        this._lastTime = now;

        for (let i = 0; i < this._timers.length; i++) {
            const timer = this._timers[i];
            switch (timer.mode) {
                case TIMER_MODES.ONE_SHOT:
                    if (timer.cur < timer.dur) {
                        timer.cur = timer.cur + delta;
                    } else {
                        timer.read = timer.cur;
                        timer.cur = 0;
                        timer.dur = 0;
                        this.requestService();
                    }
                    break;
                case TIMER_MODES.MULTI_SHOT:
                    timer.cur = timer.cur + delta;
                    if (timer.cur >= timer.dur) {
                        timer.read = timer.cur;
                        timer.cur -= timer.dur;
                        this.requestService();
                    }
                    break;
                case TIMER_MODES.RANDOM:
                    timer.cur = Math.floor(Math.random() * 65536);
                    if (timer.read === undefined) {
                        timer.read = timer.cur;
                    }
                    break;
            }
        }
    }

    _write(address = 0, data) {
        super._write(address, data);
        switch (address) {
            case PORT_RANDOM_HIGH:
            case PORT_TIMER_3_HIGH:
            case PORT_TIMER_2_HIGH:
            case PORT_TIMER_1_HIGH:
            case PORT_TIMER_0_HIGH:
                this._timers[(address - 4) >> 1].dur = (this[_buffer][address] << 8) | (this[_buffer][address + 1]);
                this._timers[(address - 4) >> 1].cur = 0; //this._timers[(address - 4) >> 1].dur;
                break;
            case PORT_TIMER_MODES:
                this._timers[0].mode = (data & 0b00000011);
                this._timers[1].mode = (data & 0b00001100) >> 2;
                this._timers[2].mode = (data & 0b00110000) >> 4;
                this._timers[3].mode = (data & 0b11000000) >> 6;
                break;
        }
    }

    _read(address = 0) {
        let data = super._read(address);

        switch (address) {
            case PORT_RTC_HOURS: 
                data = (new Date).getHours();
                break;
            case PORT_RTC_MINUTES:
                data = (new Date).getMinutes();
                break;
            case PORT_RTC_SECONDS:
                data = (new Date).getSeconds();
                break;
            case PORT_RTC_HUNDREDTHS:
                data = Math.floor((new Date).getMilliseconds() / 10);
                break;
            case PORT_RANDOM_HIGH:
            case PORT_TIMER_3_HIGH:
            case PORT_TIMER_2_HIGH:
            case PORT_TIMER_1_HIGH:
            case PORT_TIMER_0_HIGH:
                data = this._timers[(address - 4) >> 1].read;
                if (data === undefined) data = Math.floor(this._timers[(address - 4) >> 1].cur);
                data = (data & 0xFF00) >> 8;
                break;
            case PORT_RANDOM_LOW:
            case PORT_TIMER_3_LOW:
            case PORT_TIMER_2_LOW:
            case PORT_TIMER_1_LOW:
            case PORT_TIMER_0_LOW:
                data = this._timers[(address - 4) >> 1].read;
                if (data === undefined) data = Math.floor(this._timers[(address - 4) >> 1].cur);
                data = (data & 0x00FF);
                break;
        }

        return data;
    }

    putOnBus(address = 0) {
        super.putOnBus(address);
        switch(address) {
            case PORT_RANDOM_LOW:
            case PORT_TIMER_3_LOW:
            case PORT_TIMER_2_LOW:
            case PORT_TIMER_1_LOW:
            case PORT_TIMER_0_LOW:
                const data = this._timers[(address - 4) >> 1].read;
                if (data !== undefined) this._timers[(address - 4) >> 1].read = undefined;
                break;
            
        }
    }

    get mirrored() {
        return MIRROR_MAP;
    }
}