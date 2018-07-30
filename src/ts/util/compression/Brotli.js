"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iltorb_1 = require("../../lib/iltorb");
// TODO change to wasmBrotli once it supports options (encode params)
exports.brotli = iltorb_1.iltorb;
exports.brotliOptions = {
    staticText: {
        mode: "text",
        quality: 11,
    },
};
//# sourceMappingURL=Brotli.js.map