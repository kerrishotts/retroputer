/* global __dirname */
/* eslint-disable */
var path = require("path");

module.exports = {
    context: __dirname,
    entry: {
        bundle: path.resolve(__dirname, "index.js"),
        CpuWorker: path.resolve(__dirname, "..", "workers", "CpuWorker.js"),
        ScreenWorker: path.resolve(__dirname, "..", "workers", "ScreenWorker.js"),
    },
    devtool: "inline-source-map",
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },
    module: {
        loaders: [
            {
                test: /\.(asm)$/,
                loader: "raw-loader",
                exclude: /node_modules/
            },
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