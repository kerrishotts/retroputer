import { Device } from "../core/Device.js";

const SOURCE_ADDRESS = 0x00;
const TARGET_ADDRESS = 0x04;
const LENGTH = 0x08;
const MODE = 0x0C;
const FILL = 0x0D;

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
};

export class DMA extends Device {
    constructor({device = 13, length = 16, controller, memory = undefined, clock = undefined}) {
        super({device, length, controller, memory, clock});
    }

    pullFromBus(address) {
        super.pullFromBus(address);
        if (address === MODE) {
            const source = ((this._read(SOURCE_ADDRESS + 0) << 16) |
                            (this._read(SOURCE_ADDRESS + 1) <<  8) |
                            (this._read(SOURCE_ADDRESS + 2))) & 0x7FFFF;
            const target = ((this._read(TARGET_ADDRESS + 0) << 16) |
                            (this._read(TARGET_ADDRESS + 1) <<  8) |
                            (this._read(TARGET_ADDRESS + 2))) & 0x7FFFF;
            const length = ((this._read(LENGTH + 0) << 8) |
                            (this._read(LENGTH + 1))) & 0xFFFF;
            const fill = this._read(FILL);
            switch (this._read(MODE)) {
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
        }
    }

    get mirrored() {
        return MIRROR_MAP;
    }
}