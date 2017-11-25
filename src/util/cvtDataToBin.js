import hexUtils from "./hexUtils.js";

/**
 * Converts a data array to a BIN or JSON format
 *
 * @param {Array} data
 * @param {number} addr
 * @param {string} [format="bin"]
 * @return {string}
 */
//module.exports =
export default function cvtDataToBin(data, addr, format = "bin", newline, jsprefix = "export default ", jspostfix = ";") {
    addr = Number(addr);
    if (!newline) {
        newline = String.fromCharCode(13) + String.fromCharCode(10);
    }
    let text = data.reduce((p, c, idx) => {
        if (idx % 16 === 0) {
            if (format === "bin") {
                p.push(`${hexUtils.toHex(addr + idx, "00000", "")}:`);
            } else {
                p.push(` /*${hexUtils.toHex(addr + idx, "00000", "")}*/ `);
            }
        }
        if (format === "bin") {
            p[p.length - 1] += `${((idx % 8 === 0) && (idx % 16 !== 0)) ? " -" : ""} ${hexUtils.toHex2(c, "")}`;
        } else {
            p[p.length - 1] += `${hexUtils.toHex2(c, "0x")},`;
        }
        return p;
    }, []);

    if (format !== "bin") {
        text.unshift(`${jsprefix}{addr: ${addr}, data: [`);
        text.push(`]}${jspostfix}`)
    }
    text = text.join(newline);

    return text;
}