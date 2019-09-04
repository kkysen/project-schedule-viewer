"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button = require("react-bootstrap/lib/Button");
const Br_1 = require("../../../../util/components/Br");
const GraphAccessor_1 = require("../../../../util/components/svg/graph/GraphAccessor");
const FilterControls_1 = require("./FilterControls");
const OrderControls_1 = require("./OrderControls");
const Accessor = GraphAccessor_1.GraphAccessor;
exports.GraphControls = ({ data, accessors: accessorsArgs, set, current }) => {
    const accessors = Object.entries(accessorsArgs)
        .map(([key, value]) => ({ key, value: Accessor.new(value) }));
    return React.createElement("div", { style: { textAlign: "center" } },
        React.createElement(OrderControls_1.OrderControls, { orders: accessors, setOrder: set.order, currentIndex: current.orderIndex }),
        React.createElement(Br_1.Br, { times: 1 }),
        React.createElement(FilterControls_1.FilterControls, { filters: accessors, data: data, setFilter: set.filter, currentIndex: current.filterIndex }),
        React.createElement(Br_1.Br, { times: 1 }),
        React.createElement(Button, { onClick: set.reScale }, "Re-Scale"));
};
//# sourceMappingURL=GraphControls.js.map