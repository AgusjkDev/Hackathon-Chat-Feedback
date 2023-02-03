const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    target: "node",
    externals: [nodeExternals()],
    externalsPresets: {
        node: true,
    },
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    resolve: {
        preferRelative: true,
        extensions: [".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
            },
        ],
    },
};
