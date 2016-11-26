let _log = [];
function log(...args) {
    if (typeof window !== "undefined") {
        _log.push(args.join(" "));
        if (_log.length > 24) {
        _log.shift();
        }
        document.getElementById("log").innerHTML = _log.join("<BR>");
    } else {
        console.log(args.join(" "));
    }
}
module.exports = log;