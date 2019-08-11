import { Device, _buffer } from "../core/Device.js";

const SVC_CON_RCVD = 0;
const SVC_CON_SENT = 1;
const SVC_CON_ACK = 2;

const ADR_CTRL = 0;
const ADR_RECV = 1;
const ADR_SEND = 2;
const ADR_ACK = 3;

const MASK_CTRL_WRITE = 0b10;
const MASK_CTRL_READ = 0b01;

const DATA_ACK = 1;

export class ConsoleDevice extends Device {
    _put(ch) {
        // log it out
        if (typeof process !== "undefined") {
            process.stdout.write(ch);
        } else {
            console.log(ch);
        }
    }
    pullFromBus(address) {
        super.pullFromBus(address);
        const isWrite = (address === ADR_CTRL) && (this._read(ADR_CTRL) & MASK_CTRL_WRITE) !== 0;
        if (isWrite) {
            // something's been put in our buffer on the SEND line
            const ch = this._read(ADR_SEND);
            this._put(String.fromCharCode(ch));

            // ACK
            this._write(ADR_ACK, DATA_ACK);
            this.requestService(SVC_CON_ACK);
        }
    }
    get mirrored() {
        return {
            [ADR_CTRL]: true,
            [ADR_SEND]: true,
            [ADR_RECV]: true,
            [ADR_ACK]: true
        };
    }
}