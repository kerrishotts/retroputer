/* global beforeEach, describe, it, afterEach */
const kiteParser = require ("../src/grammars/kite");

let expect = require("chai").expect;

describe("#declaration", () => {
    it("should be able to reserve space for a word", () => {
        expect(JSON.parse(kiteParser.parse("word player1Score;"))).to.deep.equal({
            data: [
                ".data 0x34000",
                ".var player1Score",
                "    .dw 0",
            ],
            code: [
                ".code 0x01000"
            ]
        });
    });
});

describe("#moderate", () => {
    it("...", () => {
        const input = `
byte backgroundColor @ 0x1FA0B;         # Background color
word player1Score;                      # first player's score; defaults to 0
word player2Score;                      # Same for second player
signed byte ballVelocityX = 1;          # initial ball direction is to the right
signed byte ballVelocityY = -1;         # ... and up
backgroundColor = 15;                   # set the background color
player1Score = 1 + 5 + ballVelocityX + 3;      # try to trip up the parser...
`;

        const out = kiteParser.parse(input);
        console.log(out);
        expect(out).to.not.be.undefined;
    })

})