"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AllNow = {
    of(a, bySample) {
        const map = (key) => new Map(a.map(e => [e[key], e]));
        const mapBy = (key) => {
            const byMap = map(key);
            return (by) => byMap.get(by);
        };
        const maps = Object.keys(bySample)
            .map(key => [key, mapBy(key)]);
        const byMap = maps.toObject();
        return {
            all: () => a,
            by: Object.assign(byMap, {
                id: (id) => a[id],
            }),
        };
    },
};
exports.All = {
    of(getter, by, initial = []) {
        const all = {
            refresh: async () => {
                getter && Object.assign(all, AllNow.of(await getter(), by));
                return all;
            },
            ...AllNow.of(initial, by),
        };
        return all;
    },
};
//# sourceMappingURL=All.js.map