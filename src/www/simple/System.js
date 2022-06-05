const worker = new Worker("./worker.js");

const sentinel = new SharedArrayBuffer(1);
const sentinelArray = new Uint8Array(sentinel);
const sendMessage = (data) => {
    Atomics.store(sentinelArray, 0, 1);
    worker.postMessage(data);
}

let frame;
worker.onmessage = evt => {
    const { data } = evt;
    const { command } = data;
    switch (command) {
        case "frame": 
            frame = data.frame;
            break;
        default:
            console.log(`Unknown message ${evt}`)
    }
}

export function sysInit(options) {
    sendMessage({command: "sys-init", options: Object.assign({}, options, {sentinel})});
}

export function cpuReset() {
    sendMessage({command: "cpu-reset"});
}

export function frameDump() {
    sendMessage({command: "frame-dump"});
}

export function getLastFrame() {
    return frame;
}