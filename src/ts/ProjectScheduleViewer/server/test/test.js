"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const Brotli_1 = require("../../../util/compression/Brotli");
const allExtensions_1 = require("../../../util/extensions/allExtensions");
const path_1 = require("../../../util/polyfills/path");
const Data_1 = require("../../share/data/Data");
const JsonData_1 = require("../../share/data/JsonData");
const appRenderer_1 = require("../../ssr/appRenderer");
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
    appRenderer_1.app.warmUp(100);
    console.log("done");
};
const testWasmBrotli = async () => {
    const buf = Buffer.from("Hello, World", "utf8");
    const out = await Brotli_1.brotli.node.compress(buf);
    const newBuf = await Brotli_1.brotli.node.decompress(out);
    console.log(newBuf.toString());
};
const testReplaceAll = () => {
    const after = `
  <script src="vendors~client~server.js"></script><script src="client~server.js"></script><script src="client.js"></script></body>
</html>`;
    console.log(after);
    after.replace(/<script src="?([^">]*)"?><\/script>/g, (script, src, offset, whole) => {
        return script;
    });
};
(async () => {
    // await testData();
    console.time("test");
    await testReplaceAll();
    console.timeEnd("test");
})();
//# sourceMappingURL=test.js.map