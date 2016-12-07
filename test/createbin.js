let createbin = require("../bootstrap-utils/createbin");
let createbinFromFont = require("../bootstrap-utils/createbinFromFont");
let fs = require("fs");
let path = require("path");
let tmpPath = path.join(__dirname, "tmp/");

let expect = require("chai").expect;
describe("create bin file", () => {
    describe ("#A", () => {
        let filename = path.join(tmpPath, "a.bin");
        let filenamejs = path.join(tmpPath, "a.js");
        let data = [ 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00,
                    0x00, 0xFF, 0xFF, 0x00, 0xFF, 0xFF, 0x00, 0x00,
                    0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
                    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00,
                    0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
                    0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ];
        it ("should save a bin file", () => {
            createbin(filename, data, 0x21040);
            expect(fs.existsSync(filename)).to.equal(true);
        });
        it ("should have saved correctly", () => {
            let filename = path.join(tmpPath, "a.bin");
            let fileContents = fs.readFileSync(filename, "utf8");
            fileContents = fileContents.split(String.fromCharCode(13));
            expect(fileContents).to.deep.equal([
                "21040: 00 00 00 ff 00 00 00 00 - 00 00 ff ff ff 00 00 00",
                "21050: 00 ff ff 00 ff ff 00 00 - ff ff 00 00 00 ff ff 00",
                "21060: ff ff ff ff ff ff ff 00 - ff ff 00 00 00 ff ff 00",
                "21070: ff ff 00 00 00 ff ff 00 - 00 00 00 00 00 00 00 00"
            ]);
        });
        it ("should save a js file", () => {
            createbin(filenamejs, data, 0x21040, "js");
            expect(fs.existsSync(filenamejs)).to.equal(true);
        });
    });
    describe ("#Font", () => {
        let fontname = path.join(__dirname, "..", "design", "font0.png");
        let filename = path.join(tmpPath, "font0.bin");
        let filenamejs = path.join(tmpPath, "font0.js");
        it ("should save a bin file", (done) => {
            createbinFromFont(fontname, filename, 0x20000)
            .then(()=> {
                expect(fs.existsSync(filename)).to.equal(true);
            }).then(done);
        });
        it ("should save a js file", (done) => {
            createbinFromFont(fontname, filenamejs, 0x20000, "js")
            .then(()=> {
                expect(fs.existsSync(filenamejs)).to.equal(true);
            }).then(done);
        });
    });
});