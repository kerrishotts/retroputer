let fs = require("fs");
let path = require("path");
let createbin = require("./createbin");
let getPixels = require("get-pixels");

module.exports = function createbinFromFont(pathToFont, file, start, format="bin") {
    return new Promise((resolve, reject) => {
        getPixels(pathToFont, (err, pixels) => {
            if (err) {
                reject(`could not locate ${pathToFont}`);
            }
            let [w, h, channels] = pixels.shape;
            // if we have more than one channel, thin it down to one
            let data = pixels.data.reduce((p, c, idx) => {
                if (idx % channels === 0) {
                    p.push(c);
                } 
                return p;
            },[]);
            // we want a 2D representation
            data = data.reduce((p, c, idx) => {
                if (idx % w === 0) {
                    p.push([]);
                }
                p[p.length-1].push(c);
                return p;
            }, []);
            let numCharCols = Math.floor(w / 8);
            let numCharRows = Math.floor(h / 8);
            let transformedData = [];
            for (let cy = 0; cy < numCharRows; cy++) {
                for (let cx = 0; cx < numCharCols; cx++) {
                    for (let y = 0; y < 8; y++) {
                        for (let x = 0; x < 8; x++) {
                            let datay = (cy * 8 ) + y;
                            let datax = (cx * 8 ) + x;
                            transformedData.push(data[datay][datax]);
                        }
                    }
                }
            }
            createbin(file, transformedData, start, format);
            resolve();
        });
    });
}