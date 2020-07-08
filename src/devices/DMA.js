import { Device } from "../core/Device.js";

const SOURCE_ADDRESS = 0x00;
const TARGET_ADDRESS = 0x04;
const LENGTH = 0x08;
const MODE = 0x0C;
const FILL = 0x0D;
const SKIP = 0x0A;
const TIMES = 0x0E;

const MODE_COPY = 0x01;
const MODE_SWAP = 0x02;
const MODE_FILL = 0x04;

const MIRROR_MAP = {
    [SOURCE_ADDRESS + 0]: true,
    [SOURCE_ADDRESS + 1]: true,
    [SOURCE_ADDRESS + 2]: true,
    [TARGET_ADDRESS + 0]: true,
    [TARGET_ADDRESS + 1]: true,
    [TARGET_ADDRESS + 2]: true,
    [LENGTH + 0]: true,
    [LENGTH + 1]: true,
    [MODE]: true,
    [FILL]: true,
    [SKIP]: true,
    [SKIP+1]: true,
    [TIMES]: true,
    [TIMES+1]: true
};

export class DMA extends Device {
    constructor({device = 13, length = 16, controller, memory = undefined, clock = undefined}) {
        super({device, length, controller, memory, clock});
    }

    pullFromBus(address) {
        super.pullFromBus(address);
        if (address === MODE) {
            let source = ((this._read(SOURCE_ADDRESS + 0) << 16) |
                            (this._read(SOURCE_ADDRESS + 1) <<  8) |
                            (this._read(SOURCE_ADDRESS + 2))) & 0x7FFFF;
            let target = ((this._read(TARGET_ADDRESS + 0) << 16) |
                            (this._read(TARGET_ADDRESS + 1) <<  8) |
                            (this._read(TARGET_ADDRESS + 2))) & 0x7FFFF;
            const length = ((this._read(LENGTH + 0) << 8) |
                            (this._read(LENGTH + 1))) & 0xFFFF;
            const fill = this._read(FILL);
            const skip = ((this._read(SKIP) << 8) | this._read(SKIP+1)) & 0xFFFF;
            let times = ((this._read(TIMES) << 8) | this._read(TIMES+1)) & 0xFFFF;
            const mode = this._read(MODE);
            do {
                switch (mode) {
                    case MODE_COPY:
                        this.memory.copyWithin(source, target, length); 
                        break;
                    case MODE_SWAP:
                        this.memory.swapWithin(source, target, length);
                        break;
                    case MODE_FILL:
                        this.memory.fillWithin(fill, source, length);
                        break;
                }
                times--;
                source += skip;
                target += skip;
            } while (times > 0);
        }
    }

    get mirrored() {
        return MIRROR_MAP;
    }
}