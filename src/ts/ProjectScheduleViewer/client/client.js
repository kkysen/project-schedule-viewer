"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allExtensions_1 = require("../../util/extensions/allExtensions");
const loadApp_1 = require("./loadApp");
const main = function () {
    allExtensions_1.addExtensions();
    (async () => {
        await loadApp_1.loadApp();
    })();
};
main();
//# sourceMappingURL=client.js.map