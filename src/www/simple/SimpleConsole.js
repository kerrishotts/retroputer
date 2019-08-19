import { ConsoleDevice } from "../../devices/Console.js";

export class SimpleConsoleDevice extends ConsoleDevice {
    constructor(opts) {
        super(opts);
        this._target = opts.target;
        this._output = "";
        this._outputThrottle = null;
        this._updateTarget = this._updateTarget.bind(this);
    }
    _updateTarget() {
        this._outputThrottle = null;
        this._output = this._output.substr(-2000);
        this._target.innerText = this._output.split("\n").slice(-25).join("\n");
    }
    _put(ch) {
        this._output += ch;
        if (this._outputThrottle) return;
        this._outputThrottle = requestAnimationFrame(this._updateTarget);
    }
}