"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getter = function (t) {
    return () => t;
};
exports.makeGetter = function () {
    return exports.getter;
};
exports.cache = function (getter) {
    let cache;
    return ((...args) => cache !== undefined ? cache : (cache = getter(...args)));
};
exports.refreshableCache = function (getter) {
    let cache;
    return {
        get: ((...args) => cache !== undefined ? cache : (cache = getter(...args))),
        refresh: () => cache = undefined,
    };
};
//# sourceMappingURL=cache.js.map