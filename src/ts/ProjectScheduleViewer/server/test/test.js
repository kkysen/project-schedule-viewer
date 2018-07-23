"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const allExtensions_1 = require("../../../util/extensions/allExtensions");
const path_1 = require("../../../util/polyfills/path");
const Range_1 = require("../../../util/Range");
const Data_1 = require("../../share/data/Data");
const JsonData_1 = require("../../share/data/JsonData");
const ssr_1 = require("../../ssr/ssr");
const dir_1 = require("../dir");
const FileSystemDataSource_1 = require("../FileSystemDataSource");
allExtensions_1.addExtensions();
const testData = async () => {
    const d = await Data_1.data.get(FileSystemDataSource_1.fileSystemDataSource);
    const e = d.mapFields((f) => f.all);
    await Promise.all([
        fs.writeJson(path_1.path.join(dir_1.dir.test, "data.json"), e, { spaces: 2 }),
        fs.writeJson(path_1.path.join(dir_1.dir.test, "appData.json"), JsonData_1.dataToJsonData(d), { spaces: 2 }),
    ]);
};
const testRenderingPerformance = async () => {
    // anyWindow.i = 0;
    await Range_1.Range.new(100).toArray().asyncMap(ssr_1.reRenderApp);
    const app = await ssr_1.getRenderedApp();
    console.log("done");
};
(async () => {
    // await testData();
    console.time("test");
    await testRenderingPerformance();
    console.timeEnd("test");
})();
//# sourceMappingURL=test.js.map