const worker = new Worker("./worker.js");

const sentinel = new SharedArrayBuffer(1);
const sentinelArray = new Uint8Array(sentinel);
const sendMessage = (data) => {
    Atomics.store(sentinelArray, 0, 1);
    worker.postMessage(data);
}

let frame, asm = [], memory = [], io = [];
worker.onmessage = evt => {
    const { data } = evt;
    const { command } = data;
    switch (command) {
        case "frame": 
            frame = data.frame;
            break;
        case "disassemble":
            asm = data.asm || [];
            break;
        case "mem-dump":
            memory = data.memory || [];
            break;
        case "io-dump":
            io = data.io || [];
            break;
        default:
            console.log(`Unknown message ${evt}`)
    }
}

export function sysInit(options)                  { sendMessage({command: "sys-init", options: Object.assign({}, options, {sentinel})}); }
export function cpuReset()                        { sendMessage({command: "cpu-reset"}); }
export function frameDump()                       { sendMessage({command: "frame-dump"}); }
export function disassemble({address, length}={}) { sendMessage({command: "disassemble", options: {address, length}}); }
export function dumpMemory({address, length}={})  { sendMessage({command: "mem-dump", options:{address, length}}); }
export function dumpIO()                          { sendMessage({command: "io-dump"}); }

export function keyDown(which)                    { sendMessage({command: "key-down", options: {which}})}
export function keyUp(which)                      { sendMessage({command: "key-up", options: {which}})}
export function keyPressed(which)                 { sendMessage({command: "key-pressed", options: {which}})}

export function getLastFrame()                    { return frame; }
export function getLastDisassembly()              { return asm; }
export function getLastMemoryDump()               { return memory; }
export function getLastIODump()                   { return io; }

