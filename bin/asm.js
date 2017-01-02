#!/usr/bin/env Node
var path = require("path");
var fs = require("fs");
var cli = require("cli").enable("status"),
    options = cli.parse({
        format: [ "-f", "Output format (js or bin)", "string", "js"],
        basepath: [ "-d", "Base directory (for imports)", "string", process.cwd()]
    });

var SystemJS = require("systemjs");
SystemJS.config({
  packages: {
    "ts": {
      "main": "plugin.js"
    },
    "typescript": {
      "main": "lib/typescript.js",
      "meta": {
        "lib/typescript.js": {
          "exports": "ts"
        }
      }
    }
  },
  map: {
    "ts": "node_modules/plugin-typescript/lib",
    "typescript": "node_modules/typescript"
  },
  transpiler: "ts",
  meta: {
      "js/hexUtils.js": {
          format: "cjs"
      },
      "js/cvtDataToBin.js": {
          format: "cjs"
      }
  }

    //baseURL: path.join(__dirname, "..")
});

var Asm,
    hexUtils,
    cvtDataToBin;

global.log = cli.debug;

cli.debug("Using options: \n" + JSON.stringify(options, null, 2 ));

SystemJS.import("js/Asm.js")
.then(function (module) {
    Asm = module.default;
    return SystemJS.import("js/hexUtils.js");
})
.then(function (module) {
    hexUtils = module;
    return SystemJS.import("js/cvtDataToBin.js");
})
.then(function (module) {
    cvtDataToBin = module;
    return;
})
.then(function () {
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
})
.catch(function (err) {
    cli.error(err);
});
