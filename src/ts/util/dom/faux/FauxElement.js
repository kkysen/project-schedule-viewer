"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_faux_dom_1 = require("react-faux-dom");
exports.FauxElement = {
    new(tagName) {
        const element = react_faux_dom_1.createElement(tagName);
        return {
            element,
            render: () => element.toReact(),
        };
    },
};
//# sourceMappingURL=FauxElement.js.map