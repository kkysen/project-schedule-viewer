"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const All_1 = require("../collections/query/All");
const cache_1 = require("../cache/cache");
const objectFields_1 = require("../object/objectFields");
const isType_1 = require("../types/isType");
exports.DataAccessorFactory = {
    for() {
        return {
            new: ({ source, parse, preParsed = () => [], create, by }, argsGetter) => {
                return cache_1.cache(async (sources) => {
                    const args = await objectFields_1.objectFields.awaitFunctions(argsGetter, sources);
                    const raw = await source(sources)(args);
                    const parsed = raw.map(parse);
                    // do it twice so index is correct 2nd time
                    const a = [
                        ...parsed.filter((e, i) => create(e, i, args)),
                        ...preParsed(args),
                    ].mapFilter((e, i) => create(e, i, args));
                    return {
                        ...All_1.All.of(a, by),
                        parsed,
                        raw,
                    };
                });
            },
            mapped: (create, by, argsGetter) => {
                return cache_1.cache(async (source) => {
                    return All_1.All.of(create(await objectFields_1.objectFields.awaitFunctions(argsGetter, source)), by);
                });
            },
            data: (dataAccessors) => {
                return cache_1.refreshableAsyncCache((source) => {
                    const _source = isType_1.isFunction(source) ? source() : source;
                    const dataPromises = objectFields_1.objectFields.callEachArgs(dataAccessors, _source);
                    return objectFields_1.objectFields.awaitAll(dataPromises);
                });
            },
        };
    },
};
//# sourceMappingURL=DataAccessor.js.map