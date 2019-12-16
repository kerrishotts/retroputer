import path from "path";
import fs from "fs";
import getPixels from "get-pixels";

const fontPath = path.resolve(".", "design", "font0.png");
const outputFile = path.resolve(".", "asm", "kernel", "charmap.asm");

export function loadFont(pathToFont, cb) {
    getPixels(pathToFont, (err, pixels) => {
        if (err) {
            throw new Error(`could not locate ${pathToFont}`);
        }
        let [w, h, channels] = pixels.shape;

        // if we have more than one channel, thin it down to one
        let data = pixels.data.reduce((p, c, idx) => {
            if (idx % channels === 0) {
                p.push(c);
            } 
            return p;
        },[]);

        // we want a 2D representation (instead of 1D)
        data = data.reduce((p, c, idx) => {
            if (idx % w === 0) {
                p.push([]);
            }
            p[p.length - 1].push(c);
            return p;
        }, []);

        const numCharCols = Math.floor(w / 8);
        const numCharRows = Math.floor(h / 8);
        const transformedData = [];
        for (let cy = 0; cy < numCharRows; cy++) {
            for (let cx = 0; cx < numCharCols; cx++) {
                for (let y = 0; y < 8; y++) {
                    for (let x = 0; x < 8; x++) {
                        const datay = (cy * 8 ) + y;
                        const datax = (cx * 8 ) + x;
                        transformedData.push(data[datay][datax]);
                    }
                }
            }
        }
        cb(transformedData);
    });
}

export function convertData(data) {
    const lines = [];
    lines.push(`.namespace charmap {`);
    lines.push(`    .segment kchar kmemmap.screen.charmap-start {`);
    lines.push(`         chars: .byte ` + data.map(i => "0x" + i.toString(16).padStart(2, "0")).join(", "));
    lines.push(`    }`);
    lines.push(`}`);

    return lines.join("\n");
}

export function writeData(data, file) {
    fs.writeFileSync(file, data, "utf8");
}

loadFont(fontPath, data => {
    const str = convertData(data);
    writeData(str, outputFile);
});