"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem = require("react-bootstrap/lib/MenuItem");
const utils_1 = require("../../../util/utils");
const DropdownButton = require("react-bootstrap/lib/DropdownButton");
exports.indexOrder = (e, i) => i;
exports.OrderControls = ({ orders, setOrder, currentIndex }) => {
    orders = [{ key: "index", value: { order: exports.indexOrder } }, ...orders];
    return React.createElement(DropdownButton, { title: "Order", id: "" }, orders.map(({ key: name, value: { order } }, i) => React.createElement(MenuItem, { key: i, onSelect: () => setOrder(order, i), active: i === currentIndex }, utils_1.capitalize(name))));
};
//# sourceMappingURL=OrderControls.js.map