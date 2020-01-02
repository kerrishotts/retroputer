import { ConsoleDevice } from "../../devices/Console.js";

export class TerminalConsoleDevice extends ConsoleDevice {
    constructor(opts) {
        super(opts);
        this._target = opts.target;
        this._output = "";
        this._outputThrottle = null;
        this._updateTarget = this._updateTarget.bind(this);
    }
    _updateTarget() {
        this._outputThrottle = null;

        const lines = this._output
                     .split("\n")
                     .slice(-25)
                     .reduce((lines, line) => {
                         while (line.length > 80) {
                             lines.push(line.substr(0, 80));
                             line = line.substr(80);
                         }
                         lines.push(line);
                         return lines;
                     }, [])
                     .slice(-25)
                     .join("\n");

        this._output = lines;
        if (this._target) {
            this._target.innerText = this._output;
        }
    }
    _put(ch) {
        this._output += ch;
        if (this._outputThrottle) return;
        this._outputThrottle = requestAnimationFrame(this._updateTarget);
    }
    set target(el) {
        this._target = el;
    }
}