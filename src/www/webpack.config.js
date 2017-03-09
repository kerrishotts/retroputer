/* global __dirname */
/* eslint-disable */
var path = require("path");

module.exports = {
    context: __dirname,
    entry: path.resolve(__dirname, "index.js"),
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.(ts|js)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    entryFileIsJs: true
                }
            }
        ]
    }
}