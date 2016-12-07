// creates a file suitable for loading by the retroputer
//
// The format is text, not binary. This is less efficient from a storage
// perspective, but much easier to inspect from a human perspective, and also
// won't need to be encoded for the Internet
//
// @param {string}   file
// @param {array}    data
// Format:
//
//     addr: 00 10 20 30 40 50 60 70 - 80 A0 B0 C0 D0 E0 F0 FF 
//     next: 00 00 00 00 00 00 00 00 - 00 00 00 00 00 00 00 00
//     ...

let fs = require("fs");
let hexUtils = require("../js/hexUtils");

module.exports = function createbin(file, data, addr, format="bin") {
    let fileContents = data.reduce((p, c, idx) => {
        if (idx % 16 === 0) {
            if (format === "bin") {
                p.push(`${hexUtils.toHex(addr+idx, "00000", "")}:`);
            } else {
                p.push(` /*${hexUtils.toHex(addr+idx, "00000", "")}*/ `);
            }
        }
        if (format === "bin") {
            p[p.length-1] += `${((idx % 8 === 0) && (idx % 16 !== 0)) ? " -" : ""} ${hexUtils.toHex2(c, "")}`;
        } else {
            p[p.length-1] += `${hexUtils.toHex2(c, "0x")},`;
        }
        return p;
    }, []);
    if (format !== "bin") {
        fileContents.unshift("module.exports = [");
        fileContents.push("];")
    }
    fileContents = fileContents.join(String.fromCharCode(13));
    fs.writeFileSync(file, fileContents);
}