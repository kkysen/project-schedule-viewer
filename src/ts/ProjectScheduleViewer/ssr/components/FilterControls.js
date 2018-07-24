"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DropdownButton = require("react-bootstrap/lib/DropdownButton");
const MenuItem = require("react-bootstrap/lib/MenuItem");
const utils_1 = require("../../../util/utils");
const OrderControls_1 = require("./OrderControls");
exports.FilterControls = ({ filters, data, setFilter, currentIndex }) => {
    const FilterItem = function (filter, i, name) {
        return React.createElement(MenuItem, { key: i, onSelect: () => setFilter(filter, i), active: i === currentIndex }, name);
    };
    return React.createElement(React.Fragment, null, filters.map(({ key: title, value: { filter, all, name } }, i) => React.createElement(DropdownButton, { key: i, title: utils_1.capitalize(title), id: i.toString() },
        FilterItem(OrderControls_1.noFilter, -1, "All"),
        all(data).map((e, i) => FilterItem(filter([e], false), i, name(e))))));
};
//# sourceMappingURL=FilterControls.js.map