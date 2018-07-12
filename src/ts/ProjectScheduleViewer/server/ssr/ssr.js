"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const React = require("react");
const server_1 = require("react-dom/server");
const path_1 = require("../../../util/polyfills/path");
const dir_1 = require("../dir");
const Employees_1 = require("../Employees");
const Teams_1 = require("../Teams");
const App_1 = require("./components/App");
exports.appData = {
    employees: Employees_1.employees,
    teams: Teams_1.teams,
};
const getAppData = async function () {
    await Teams_1.teams.refresh();
    return exports.appData;
};
exports.getAppDataRemote = async function () {
    return await getAppData();
    // TODO load over network
};
const readTemplate = async function () {
    const buffer = await fs.readFile(path_1.path.join(dir_1.dir.dist, "ProjectScheduleViewer.html"));
    return buffer.toString("utf8");
};
const renderApp = async function () {
    const [template, data] = await Promise.all([readTemplate(), getAppData()]);
    const insertionPoint = "</body>";
    const [before, after] = template.split(insertionPoint);
    return [
        before,
        server_1.renderToString(React.createElement(App_1.App, { data: data })),
        insertionPoint,
        after,
    ].join("");
};
let renderedApp = renderApp();
exports.reRenderApp = async function () {
    return renderedApp = renderApp();
};
exports.getRenderedApp = function () {
    return renderedApp;
};
//# sourceMappingURL=ssr.js.map