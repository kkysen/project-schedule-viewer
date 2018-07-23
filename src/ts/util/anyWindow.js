"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = typeof window !== "undefined";
exports.anyWindow = exports.isBrowser ? window : global;
exports.globals = function (o) {
    Object.assign(exports.anyWindow, o);
};
exports.globalProperties = function (o) {
    Object.assignProperties(exports.anyWindow, o);
};
exports.globals({ globals: exports.globals, globalProperties: exports.globalProperties });
//# sourceMappingURL=anyWindow.js.map