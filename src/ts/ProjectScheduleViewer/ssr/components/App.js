"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const animate_1 = require("../../../util/animate");
const anyWindow_1 = require("../../../util/anyWindow");
const utils_1 = require("../../../util/utils");
const Graph_1 = require("./Graph");
const ProjectTables_1 = require("./ProjectTables");
exports.appId = "app";
exports.App = ({ data }) => {
    anyWindow_1.globals({ data });
    return React.createElement("div", { id: exports.appId },
        React.createElement(Graph_1.Graph, { data: data }),
        React.createElement(ProjectTables_1.ProjectTables, { data: data }),
        React.createElement("button", { onClick: () => console.log(data) }, "Button"));
};
if (anyWindow_1.isBrowser) {
    anyWindow_1.anyWindow.start = () => {
        const bys = utils_1.moduloIndexer(["index", "employee", "project", "team", "position"]);
        anyWindow_1.anyWindow.stop = animate_1.animate(i => anyWindow_1.anyWindow.by = bys(i));
    };
}
//# sourceMappingURL=App.js.map