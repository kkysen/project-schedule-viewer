"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const React = require("react");
const server_1 = require("react-dom/server");
const gzip_1 = require("../../lib/gzip");
const path_1 = require("../../util/polyfills/path");
const Range_1 = require("../../util/Range");
const config_1 = require("../server/config");
const dir_1 = require("../server/dir");
const FileSystemDataSource_1 = require("../server/FileSystemDataSource");
const Data_1 = require("../share/data/Data");
const JsonData_1 = require("../share/data/JsonData");
const App_1 = require("./components/App");
const readTemplate = async function () {
    const buffer = await fs.readFile(path_1.path.join(dir_1.dir.dist, "ProjectScheduleViewer.html"));
    return buffer.toString("utf8");
};
const renderApp = async function () {
    const [template, data] = await Promise.all([readTemplate(), Data_1.getAppData(FileSystemDataSource_1.fileSystemDataSource)]);
    const insertionPoint = `<div id="not-${App_1.appId}"></div>`;
    const [before, after] = template.split(insertionPoint);
    console.time("rendering");
    const html = [
        before,
        `<script>window.appData = '${JsonData_1.dataToJson(data)}'</script>`,
        server_1.renderToString(React.createElement(App_1.App, { data: data })),
        after,
    ].join("");
    console.timeEnd("rendering");
    (async () => {
        await fs.writeFile(path_1.path.join(dir_1.dir.test, "index.html"), html);
    })();
    return {
        gzipped: config_1.gzipped,
        html: config_1.gzipped ? await gzip_1.compression.gzip(html) : html,
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
exports.warmUpAppRenderer = function (repetitions = 10) {
    return () => Range_1.Range.new(repetitions).toArray().asyncMap(exports.reRenderApp)
        .then(() => undefined);
};
//# sourceMappingURL=ssr.js.map