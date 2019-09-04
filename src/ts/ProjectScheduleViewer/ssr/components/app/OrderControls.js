"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem = require("react-bootstrap/lib/MenuItem");
const math_1 = require("../../../../util/misc/math");
const utils_1 = require("../../../../util/misc/utils");
const DropdownButton = require("react-bootstrap/lib/DropdownButton");
exports.indexOrder = {
    order: (e, i) => i,
    tooltip: (e, i) => i.toString(),
    all: data => ({
        length: math_1.sumBy(data.teams.all, e => math_1.sumBy(e.projects, e => e.employees.length))
    }),
};
exports.noFilter = () => true;
exports.OrderControls = ({ orders, setOrder, currentIndex }) => {
    const OrderItem = (order, i, name) => React.createElement(MenuItem, { key: i, onSelect: () => setOrder(order, i), active: i === currentIndex }, name);
    return React.createElement(DropdownButton, { title: "Order", id: "" },
        OrderItem(exports.indexOrder, -1, "Index"),
        orders.map(({ key: name, value: order }, i) => OrderItem(order, i, utils_1.capitalize(name))));
};
//# sourceMappingURL=OrderControls.js.map