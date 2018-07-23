"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const React = require("react");
const FauxComponent_1 = require("../../../dom/faux/FauxComponent");
const react_1 = require("../../../react");
const utils_1 = require("../utils");
const utils_2 = require("../utils");
exports.Axes = function ({ axes, names, size: { width, height }, margins: { left, top, right, bottom }, }) {
    const [gx, gy] = Object.values(axes).map(axis => {
        const { element: g, render } = FauxComponent_1.FauxComponent.new("g");
        axis(d3_selection_1.select(g));
        return render();
    });
    // TODO check magic number 20 in names.x translate
    return react_1.renderNodesObj({
        axes: React.createElement(React.Fragment, null,
            React.createElement("g", { transform: utils_1.translate(0, height) }, gx),
            gy),
        names: React.createElement(React.Fragment, null,
            names.x && React.createElement("text", { transform: utils_1.translate(width / 2, height + top), style: { textAnchor: "middle" } }, names.x),
            names.y && React.createElement("text", { transform: utils_2.rotate(-90), y: -left, x: -height / 2, dy: "1em", style: { textAnchor: "middle" } }, names.y)),
    });
};
//# sourceMappingURL=Axes.js.map