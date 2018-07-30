import * as fs from "fs-extra";
import {All} from "../../../util/collections/query/All";
import {brotli} from "../../../util/compression/Brotli";
import {addExtensions} from "../../../util/extensions/allExtensions";
import {path} from "../../../util/polyfills/path";
import {data} from "../../share/data/Data";
import {dataToJsonData} from "../../share/data/JsonData";
import {app} from "../../ssr/appRenderer";
import {dir} from "../dir";
import {fileSystemDataSource} from "../FileSystemDataSource";

addExtensions();

const testData = async () => {
    const d = await data.get(fileSystemDataSource);
    const e = (d as any).mapFields((f: All<any, any>) => f.all);
    await Promise.all([
        fs.writeJson(path.join(dir.test, "data.json"), e, {spaces: 2}),
        fs.writeJson(path.join(dir.test, "appData.json"), dataToJsonData(d), {spaces: 2}),
    ]);
};

const testRenderingPerformance = async () => {
    // anyWindow.i = 0;
    app.warmUp(100);
    console.log("done");
};

const testWasmBrotli = async () => {
    const buf = Buffer.from("Hello, World", "utf8");
    const out = await brotli.node.compress(buf);
    const newBuf = await brotli.node.decompress(out);
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

