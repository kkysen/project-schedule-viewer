"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const All_1 = require("../../util/All");
const cache_1 = require("../../util/cache");
const objectFields_1 = require("../../util/objectFields");
exports.DataAccessor = {
    new({ source, parse, create, by }, argsGetter) {
        return cache_1.cache(async (sources) => {
            const args = await objectFields_1.objectFields.awaitFunctions(argsGetter, sources);
            const raw = await source(sources)(args);
            const parsed = raw.map(parse);
            const map = (e, i) => create(e, i, args);
            // do it twice so index is correct 2nd time
            const a = parsed.filter(map).mapFilter(map);
            // const a = parsed._().mapFilter((e, i) => create(e, i, args));
            return {
                ...All_1.All.of(a, by),
                parsed,
                raw,
            };
        });
    },
    mapped(create, by, argsGetter) {
        return cache_1.cache(async (source) => {
            return All_1.All.of(create(await objectFields_1.objectFields.awaitFunctions(argsGetter, source)), by);
        });
    },
};
//# sourceMappingURL=DataAccessor.js.map