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
        this._target.innerText = this._output.substr(-2000);
    }
    _put(ch) {
        this._output += ch;
        if (this._outputThrottle) cancelAnimationFrame(this._outputThrottle);
        this._outputThrottle = requestAnimationFrame(this._updateTarget);
    }
}