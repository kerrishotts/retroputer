let _log = [];

/**
 * log information to the console -- works for the browser or in a node environment
 * 
 * @param {Array} args      data to log
 * @return {void}
 */
export default function log(...args) {
    if (typeof window !== "undefined") {
        _log.unshift(args.join(" "));
        if (_log.length > 24) {
        _log.pop();
        }
        document.getElementById("log").textContent = _log.join(String.fromCharCode(13) + String.fromCharCode(10));
    } else {
        console.log(args.join(" "));
    }
}
if (typeof window !== "undefined") {
    window.log = log;
}
if (typeof global !== "undefined") {
    global.log = log;
}