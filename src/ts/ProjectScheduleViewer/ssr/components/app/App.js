"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const anyWindow_1 = require("../../../../util/window/anyWindow");
const Graph_1 = require("./Graph");
const ProjectTables_1 = require("./ProjectTables");
exports.appId = "app";
exports.App = ({ data }) => {
    anyWindow_1.globals({ data });
    return React.createElement("div", { style: { margin: 25 } },
        React.createElement(Graph_1.Graph, { data: data }),
        React.createElement(ProjectTables_1.ProjectTables, { data: data }),
        React.createElement("button", { onClick: () => console.log(data) }, "Button"));
};
exports.createApp = function (data) {
    return React.createElement(exports.App, { data: data });
};
//# sourceMappingURL=App.js.map