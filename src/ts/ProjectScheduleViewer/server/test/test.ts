import * as fs from "fs-extra";
import {All} from "../../../util/All";
import {anyWindow} from "../../../util/anyWindow";
import {addExtensions} from "../../../util/extensions/allExtensions";
import {path} from "../../../util/polyfills/path";
import {Range} from "../../../util/Range";
import {data} from "../../share/data/Data";
import {dataToJsonData} from "../../share/data/JsonData";
import {getRenderedApp, reRenderApp} from "../../ssr/ssr";
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
    await Range.new(100).toArray().asyncMap(reRenderApp);
    const app = await getRenderedApp();
    console.log("done");
};

(async () => {
    // await testData();
    console.time("test");
    await testRenderingPerformance();
    console.timeEnd("test");
})();

