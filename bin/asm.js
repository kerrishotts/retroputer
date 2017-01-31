#!/usr/bin/env node
require("ts-node").register({
    compilerOptions: {
        allowJs: true,
        target: "es6",
        module: "none",
        noResolve: true,
    }
});
var path = require("path");
var fs = require("fs");
var cli = require("cli").enable("status"),
    options = cli.parse({
        format: [ "-f", "Output format (js or bin)", "string", "js"],
        basepath: [ "-d", "Base directory (for imports)", "string", process.cwd()]
    });

var Asm = require("../src/asm/Asm.js").default,
    hexUtils = require("../src/util/hexUtils.js").default;

global.log = cli.debug;

cli.debug("Using options: \n" + JSON.stringify(options, null, 2 ));

cli.withStdinLines(function(lines, newline) {
    var asm = new Asm();
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
        cli.error((err.file ? err.file : "stdin") + ":" + err.lineNumber + ", " + err.message + " (" + hexUtils.toHex4(err.code) + ") " );
        cli.error("line: " + err.line)
        cli.error(err.stack);
    }
});
