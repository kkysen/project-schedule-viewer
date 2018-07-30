import {Module, RuleSetRule} from "webpack";

const tsLoader: RuleSetRule = {
    test: /\.tsx?$/,
    loader: "ts-loader",
};

const binaryNodeLoader: RuleSetRule = {
    test: /\.node$/,
    loader: "node-loader",
};

export const loaders: Module = {
    rules: [
        tsLoader,
        binaryNodeLoader,
    ],
};