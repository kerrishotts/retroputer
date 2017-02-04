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

import cvtDataToBin from "./cvtDataToBin.js";

export default function createbin(file, data, addr, format = "bin") {
    let fileContents = cvtDataToBin(data, addr, format);
    fs.writeFileSync(file, fileContents);
}