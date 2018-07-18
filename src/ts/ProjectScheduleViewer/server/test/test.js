"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const allExtensions_1 = require("../../../util/extensions/allExtensions");
const path_1 = require("../../../util/polyfills/path");
const Data_1 = require("../../share/Data");
const JsonData_1 = require("../../share/JsonData");
const dir_1 = require("../dir");
const FileSystemDataSource_1 = require("../FileSystemDataSource");
allExtensions_1.addExtensions();
console.log(require("../../../lib/vx/shape/AreaStack.test"));
(async () => {
    const d = await Data_1.data.get(FileSystemDataSource_1.fileSystemDataSource);
    const e = d.mapFields((f) => f.all);
    await Promise.all([
        fs.writeJson(path_1.path.join(dir_1.dir.test, "data.json"), e, { spaces: 2 }),
        fs.writeJson(path_1.path.join(dir_1.dir.test, "appData.json"), JsonData_1.dataToJsonData(d), { spaces: 2 }),
    ]);
})();
//# sourceMappingURL=test.js.map