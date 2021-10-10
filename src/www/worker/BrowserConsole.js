import { ConsoleDevice } from "../../devices/Console.js";

export class BrowserConsole extends ConsoleDevice {
    constructor(opts) {
        super(opts);
        this._output = "";
    }
    _put(ch) {
        this._output += ch;
        if (ch === "\n") {
            console.log(this._output);
            this._output = "";
        }
    }
}