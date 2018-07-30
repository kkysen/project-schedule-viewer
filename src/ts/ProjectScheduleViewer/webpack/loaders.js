"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsLoader = {
    test: /\.tsx?$/,
    loader: "ts-loader",
};
const binaryNodeLoader = {
    test: /\.node$/,
    loader: "node-loader",
};
exports.loaders = {
    rules: [
        tsLoader,
        binaryNodeLoader,
    ],
};
//# sourceMappingURL=loaders.js.map