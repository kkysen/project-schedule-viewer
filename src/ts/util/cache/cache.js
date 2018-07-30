"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getter = function (t) {
    return () => t;
};
exports.makeGetter = function () {
    return exports.getter;
};
exports.cache = function (getter) {
    return exports.refreshableCache(getter).get;
};
exports.refreshableCache = function (getter) {
    let cache;
    return {
        get: ((...args) => cache !== undefined ? cache : (cache = getter(...args))),
        refresh: () => cache = undefined,
    };
};
exports.asyncCache = function (getter) {
    return exports.refreshableAsyncCache(getter).get;
};
exports.refreshableAsyncCache = function (getter) {
    let cache;
    const refresh = () => cache = undefined;
    const get = (args) => cache !== undefined ? cache : cache = (async () => cache = await getter(args))();
    return {
        get,
        refresh,
        getRefreshed: async (args) => {
            refresh();
            return await get(args);
        },
    };
};
//# sourceMappingURL=cache.js.map