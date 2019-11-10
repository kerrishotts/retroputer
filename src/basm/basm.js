/* global process */
/* eslint-disable no-var, vars-on-top */

import path from "path";
import fs from "fs";
import cli from "cli";
import peg from "pegjs";
import util, { types } from "util";

import { parser } from "./parser.js";
import { assemble, setImportProvider } from "./assemble.js";
import { nodeImportProvider } from "./importProviders/node.js";
import cvtDataToBin from "../util/cvtDataToBin.js";

setImportProvider(nodeImportProvider);

function write(segments, { format = "js", newline, exports } = {}) {
    if (!newline) {
        newline = String.fromCharCode(13) + String.fromCharCode(10);
    }
    let text = (format !== "bin") ? "export default [" : "";
    for (let segment of segments) {
        const addr = segment.addr;
        text += cvtDataToBin(segment.data, Number(addr), format, newline, "", "") + (format !== "bin" ? "," : "") + newline;
    }
    if (format !== "bin") {
        text += "];";
    }
    if (format !== "bin") {
        if (exports) {
            const segmentsToExport = exports.split(",");
            const exportSegments = segments.filter(segment => segmentsToExport.indexOf(segment.name) > -1);
            for (let segment of exportSegments) {
                const name = segment.name;
                const contents = segment.contents;
                text += newline;
                text += `export const ${name} = ${JSON.stringify(contents, null, 2)};`;
            }
        }
    }
    return text;
}

cli.enable("status");
const options = cli.parse({
        format: [ "f", "Output format (js or bin)", "string", "js"],
        basepath: [ "d", "Base directory (for imports)", "string", process.cwd()],
        exports: [ "x", "Export symbols in segments", "string", ""]
    });
global.log = cli.debug;
process.chdir(options.basepath);
cli.debug("Using options: \n" + JSON.stringify(options, null, 2 ));
cli.withStdinLines(function(lines, newline) {
    const ast = parser.parse(lines.join(newline));
    cli.debug("Results of parsing:\n" + util.inspect(ast, false, 10, true));
    const segments = assemble(ast);
    cli.debug("Assembled Segments:\n" + util.inspect(segments, false, 10, true));
    cli.output(write(segments, {format: cli.options.format, newline, exports: cli.options.exports}));
});