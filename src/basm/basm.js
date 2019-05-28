/* global process */
/* eslint-disable no-var, vars-on-top */

import path from "path";
import fs from "fs";
import cli from "cli";
import peg from "pegjs";

import { assemble } from "./assemble.js";

const basmGrammar = fs.readFileSync(path.resolve("./basm.pegjs"), "utf8");
const basmParser = peg.generate(basmGrammar);

cli.enable("status");
const options = cli.parse({
        format: [ "-f", "Output format (js or bin)", "string", "js"],
        basepath: [ "-d", "Base directory (for imports)", "string", process.cwd()]
    });
global.log = cli.debug;

cli.debug("Using options: \n" + JSON.stringify(options, null, 2 ));
cli.withStdinLines(function(lines, newline) {
    const ast = basmParser.parse(lines.join(newline));

    assemble(ast);

/*    var asm = new Asm();
    asm.basepath = options.basepath;
    asm.importCallback = function(file) {
        // return the file contents
        let filepath = path.join(process.cwd(), asm.basepath, file);
        var data = fs.readFileSync(filepath, "utf8").split(newline);
        cli.debug("imported " + filepath + ", " + data.length + " lines");
        return data;
    }
    try {
        asm.assemble(lines);

        // once assembled, let's write the file in the desired format
        this.output(asm.writeToString(options.format, newline));
    } catch (err) {
        cli.error(err.stack);
    }*/
});