import * as fs from "fs-extra";
import {All} from "../../../util/All";
import {addExtensions} from "../../../util/extensions/allExtensions";
import {path} from "../../../util/polyfills/path";
import {data} from "../../share/Data";
import {dataToJsonData} from "../../share/JsonData";
import {dir} from "../dir";
import {fileSystemDataSource} from "../FileSystemDataSource";

addExtensions();

console.log(require("../../../lib/vx/shape/AreaStack.test"));

(async () => {
    const d = await data.get(fileSystemDataSource);
    const e = (d as any).mapFields((f: All<any, any>) => f.all);
    await Promise.all([
        fs.writeJson(path.join(dir.test, "data.json"), e, {spaces: 2}),
        fs.writeJson(path.join(dir.test, "appData.json"), dataToJsonData(d), {spaces: 2}),
    ]);
})();

