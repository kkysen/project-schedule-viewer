"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Range_1 = require("../../Range");
const FauxElement_1 = require("./FauxElement");
exports.FauxComponent = {
    new(tagName) {
        // const element = createElement(tagName);
        // return {
        //     element,
        //     render: () => {
        //         return Range.new(1000)
        //             .map(() => element.toReact())
        //             .random();
        //         // return element.toReact();
        //     }
        // };
        const element = FauxElement_1.FauxElement.new(tagName);
        return {
            element,
            render: () => {
                return Range_1.Range.new(1)
                    .map(() => element.render())
                    .random();
            },
        };
    },
};
//# sourceMappingURL=FauxComponent.js.map