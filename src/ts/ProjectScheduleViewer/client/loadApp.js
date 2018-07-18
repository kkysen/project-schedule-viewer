"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const anyWindow_1 = require("../../util/anyWindow");
const Data_1 = require("../share/Data");
const JsonDataSource_1 = require("../share/JsonDataSource");
const App_1 = require("../ssr/components/App");
const api_1 = require("./api");
exports.loadApp = async function () {
    const data = anyWindow_1.anyWindow.appData ? await Data_1.getAppData(JsonDataSource_1.jsonDataSource) : await api_1.api.getAppData();
    const appContainer = document.body.appendDiv();
    let appRoot = document.getElementById(App_1.appId);
    if (1 === 1 && appRoot) {
        appRoot.remove();
        appRoot = null;
    }
    if (appRoot) {
        console.log("hydrating");
        appRoot.remove();
        appContainer.appendChild(appRoot);
        react_dom_1.hydrate(React.createElement(App_1.App, { data: data }), appContainer);
    }
    else {
        console.log("rendering");
        react_dom_1.render(React.createElement(App_1.App, { data: data }), appContainer);
    }
};
//# sourceMappingURL=loadApp.js.map