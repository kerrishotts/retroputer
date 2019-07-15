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
    write(address, data) {
        super.write(address, data);
        if (address === ADR_CTRL && (data & MASK_CTRL_WRITE) !== 0) {
            // something's been put in our buffer on the SEND line
            const ch = this[_buffer][ADR_SEND];
            // log it out
            if (typeof process !== "undefined") {
                process.stdout.write(String.fromCharCode(ch));
            } else {
                console.log(String.fromCharCode(ch));
            }

            // ACK
            this[_buffer][ADR_ACK] = DATA_ACK;
            this.requestService(SVC_CON_ACK);
        }
    }
}