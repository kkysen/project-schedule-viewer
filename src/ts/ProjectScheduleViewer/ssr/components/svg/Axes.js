"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const React = require("react");
const react_1 = require("react");
const FauxElement_1 = require("../../../../util/dom/faux/FauxElement");
const utils_1 = require("./utils");
class Axes extends react_1.PureComponent {
    render() {
        const { x, y, height } = this.props;
        const [gx, gy] = [x, y].map(axis => {
            const { element: g, render } = FauxElement_1.FauxElement.new("g");
            axis(d3_selection_1.select(g));
            return render();
        });
        return React.createElement(React.Fragment, null,
            React.createElement("g", { transform: utils_1.translate(0, height) }, gx),
            gy);
    }
}
exports.Axes = Axes;
//# sourceMappingURL=Axes.js.map