const worker = new Worker("./worker.js");

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
    worker.postMessage({command: "sys-init", options});
}

export function cpuReset() {
    worker.postMessage({command: "cpu-reset"});
}

export function frameDump() {
    worker.postMessage({command: "frame-dump"});
}

export function getLastFrame() {
    return frame;
}