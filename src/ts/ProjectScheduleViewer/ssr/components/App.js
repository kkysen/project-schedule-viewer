"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
const d3_time_format_1 = require("d3-time-format");
const React = require("react");
const utils_1 = require("../../../util/functional/utils");
const ProjectTables_1 = require("./ProjectTables");
const AreaStack_1 = require("./svg/AreaStack");
exports.appId = "app";
exports.App = ({ data }) => React.createElement("div", { id: exports.appId },
    AreaStack_1.AreaStack({
        data: [
            { month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
            { month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
            { month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },
            { month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 },
            { month: new Date(2015, 4, 1), apples: 10000, bananas: 8000, cherries: 9000, dates: 7000 },
        ],
        xKey: "month",
        values: {
            month: utils_1.identity,
            apples: utils_1.identity,
            bananas: utils_1.identity,
            cherries: utils_1.identity,
            dates: utils_1.identity,
        },
        scale: {
            x: d3_scale_1.scaleTime(),
        },
        axes: {
            x: (axis, xData) => axis.tickFormat(d3_time_format_1.timeFormat("%B")).ticks(xData.length),
        },
        size: { width: 600, height: 300 },
        margin: { left: 50, top: 50, right: 50, bottom: 50 },
    }),
    React.createElement(ProjectTables_1.ProjectTables, { data: data }),
    React.createElement("button", { onClick: () => console.log(data) }, "Button"));
//# sourceMappingURL=App.js.map