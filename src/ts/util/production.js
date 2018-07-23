"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = (global || window).process;
const nodeEnv = process && process.env && process.env.NODE_ENV;
exports.production = !nodeEnv ? false : nodeEnv.toLowerCase() === "production";
exports.development = !exports.production;
exports.inProduction = function (func) {
    if (exports.production) {
        func();
    }
};
exports.inDevelopment = function (func) {
    if (exports.development) {
        func();
    }
};
//# sourceMappingURL=production.js.map