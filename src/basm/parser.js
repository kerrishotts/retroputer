/*import path from "path";
import fs from "fs";
import peg from "pegjs";

const basmGrammar = fs.readFileSync(path.resolve(__dirname, "basm.pegjs"), "utf8");
export const parser = peg.generate(basmGrammar);
*/

import { parse } from "./basm.peg.js";

export const parser = {
    parse
};