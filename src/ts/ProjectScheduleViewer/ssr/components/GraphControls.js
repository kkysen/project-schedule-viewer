"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const isType_1 = require("../../../util/types/isType");
const FilterControls_1 = require("./FilterControls");
const OrderControls_1 = require("./OrderControls");
const Accessor = (() => {
    const has = function (a) {
        if (isType_1.isBoolean(a)) {
            return () => a;
        }
        const set = new Set(a);
        return t => set.has(t);
    };
    return {
        new({ get, all, name }) {
            return {
                get,
                order: e => get(e).id,
                filter: (include, exclude) => {
                    const includes = has(include);
                    const excludes = has(exclude);
                    return employee => {
                        const t = get(employee);
                        return includes(t) && !excludes(t);
                    };
                },
                all,
                name,
            };
        },
    };
})();
exports.GraphControls = ({ data, accessors: accessorsArgs, set, current }) => {
    const accessors = Object.entries(accessorsArgs).map(([key, value]) => ({ key, value: Accessor.new(value) }));
    return React.createElement("div", { style: { textAlign: "center" } },
        React.createElement(OrderControls_1.OrderControls, { orders: accessors, setOrder: set.order, currentIndex: current.orderIndex }),
        React.createElement(FilterControls_1.FilterControls, { filters: accessors, data: data, setFilter: set.filter, currentIndex: current.filterIndex }));
};
//# sourceMappingURL=GraphControls.js.map