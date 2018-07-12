"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const App_1 = require("../server/ssr/components/App");
const ssr_1 = require("../server/ssr/ssr");
exports.loadApp = function () {
    const appRoot = document.getElementById(App_1.appId);
    if (appRoot) {
        react_dom_1.hydrate(React.createElement(App_1.App, null), appRoot);
    }
    else {
        const appRoot = document.body.appendDiv();
        appRoot.id = App_1.appId;
        react_dom_1.render(React.createElement(App_1.App, { dataPromise: ssr_1.getAppDataRemote() }), appRoot);
    }
};
//# sourceMappingURL=loadApp.js.map