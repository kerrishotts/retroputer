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
        source: [ "i", "Source file", "string", undefined],
        output: [ "o", "Output file", "string", undefined],
        format: [ "f", "Output format (js or bin)", "string", "js"],
        basepath: [ "d", "Base directory (for imports)", "string", process.cwd()],
        exports: [ "x", "Export symbols in segments", "string", ""]
    });
global.log = cli.debug;
globalThis.cli = cli;
cli.debug("Using options: \n" + JSON.stringify(options, null, 2 ));

let sourceText = "";
let sourceFile = options.source ? path.resolve(process.cwd(), options.source) : undefined;

if (sourceFile) {
    cli.info(`Reading from ${sourceFile}...`)
}

const originalCWD = process.cwd();
process.chdir(options.basepath);

cli.withInput(...([sourceFile, "utf8", (line, newline, eof) => {
    if (!eof) {
        sourceText += line + newline;
    } else {
        try {
            const startTime = process.hrtime.bigint();

            const ast = parser.parse(sourceText);
            cli.debug("Results of parsing:\n" + util.inspect(ast, false, 10, true));
            const segments = assemble(ast);

            const endTime = process.hrtime.bigint();
            const timeTaken = Number((endTime - startTime)) / 1000000000;

            cli.info("Segment information:\n" + segments.map(seg => {
                const adj = seg.adj ? "*": " ";
                const name = seg.name.padEnd(24);
                const [addr, len, end] = [seg.addr, seg.length, seg.addr+seg.length].map(i => i.toString(16).padStart(5, "0"));
                const chain = seg.chain;
                return `${adj}${name} ${addr}-${end} ${len} ${chain}`;
            }).join("\n"));
            cli.debug("Assembled Segments:\n" + util.inspect(segments, false, 10, true));
            
            cli.info(`Time taken: ${Math.round(timeTaken*100)/100}s`);
            const outputText = write(segments, {format: cli.options.format, newline, exports: cli.options.exports});
            if (!options.output) {
                cli.output(outputText);
            } else {
                process.chdir(originalCWD);
                const outputFile = path.resolve(options.output);
                fs.writeFileSync(outputFile, outputText, "utf8");
                cli.info(`Wrote ${outputText.length} characters to ${outputFile}.`);
            }
        } catch (err) {
            if (err.location) {
                // a PEG error
                const found = (err.found || "").split("\n").slice(0, 5).join("\n");
                const location = `${err.location.start.line}:${err.location.start.column}`;
                if (err.expected) {
                    cli.error(`Expected ${err.expected[0].description} at ${location}, but saw ${found}`);
                } else {
                    cli.error(err.message);
                }
            } else {
                cli.error(err.message);
            }
        }

    }
}].slice(sourceFile ? 0 : 2)));