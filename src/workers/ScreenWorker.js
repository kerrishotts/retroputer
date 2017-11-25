/* globals self */
import Screen from "../core/Screen.js";
import Memory from "../core/Memory.js";

import memoryLayout from "../core/memoryLayout.js";

class ScreenWorker {
    constructor() {
        this.screen = new Screen(null, null, null, {
            worker: true,
            shared: true
        });
    }

    setSharedMemory(sharedArrayBuffer) {
        this.screen._memory = new Memory(memoryLayout, {
            shared: true,
            withSharedArrayBuffer: sharedArrayBuffer
        });
        this.screen._layout = memoryLayout;
    }

    setSharedFrameBuffer(sharedArrayBuffer) {
        this.screen.setSharedArrayBuffer(sharedArrayBuffer);
    }

    init() {
        this.screen.init();
    }

    update(_, postMessage) {
        this.screen.update();
        postMessage({ cmd: "updated" });
    }
}

const screenWorker = new ScreenWorker();
self.addEventListener("message", (e) => {
    const cmd = e.data.cmd;
    const data = e.data.data;
    if (screenWorker[cmd]) {
        screenWorker[cmd](data, self.postMessage);
    }
});