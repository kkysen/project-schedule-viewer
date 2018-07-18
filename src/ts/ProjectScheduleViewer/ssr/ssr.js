"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const React = require("react");
const server_1 = require("react-dom/server");
const gzip_1 = require("../../lib/gzip");
const path_1 = require("../../util/polyfills/path");
const dir_1 = require("../server/dir");
const FileSystemDataSource_1 = require("../server/FileSystemDataSource");
const server_2 = require("../server/server");
const Data_1 = require("../share/Data");
const JsonData_1 = require("../share/JsonData");
const App_1 = require("./components/App");
const readTemplate = async function () {
    const buffer = await fs.readFile(path_1.path.join(dir_1.dir.dist, "ProjectScheduleViewer.html"));
    return buffer.toString("utf8");
};
const renderApp = async function () {
    const [template, data] = await Promise.all([readTemplate(), Data_1.getAppData(FileSystemDataSource_1.fileSystemDataSource)]);
    const insertionPoint = `<div id="not-${App_1.appId}"></div>`;
    const [before, after] = template.split(insertionPoint);
    console.log("rendering");
    const html = [
        before,
        `<script>window.appData = '${JsonData_1.dataToJson(data)}'</script>`,
        server_1.renderToString(React.createElement(App_1.App, { data: data })),
        after,
    ].join("");
    (async () => {
        await fs.writeFile(path_1.path.join(dir_1.dir.test, "index.html"), html);
    })();
    return {
        gzipped: server_2.gzipped,
        html: server_2.gzipped ? await gzip_1.compression.gzip(html) : html,
    };
};
let renderedApp;
let renderedAppPromise = renderApp().then(app => renderedApp = app);
exports.reRenderApp = async function () {
    renderedAppPromise = renderApp();
    return renderedApp = await renderedAppPromise;
};
exports.getRenderedApp = function () {
    return renderedApp || renderedAppPromise;
};
//# sourceMappingURL=ssr.js.map