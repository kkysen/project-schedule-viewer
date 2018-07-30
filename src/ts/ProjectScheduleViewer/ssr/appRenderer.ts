import {appLoader} from "../client/appClient";
import {fileSystemDataSource} from "../server/FileSystemDataSource";
import {getAppData} from "../share/data/Data";
import {dataToJsonData} from "../share/data/JsonData";
import {SsrRenderer} from "./SsrRenderer";

export const app = SsrRenderer.new({
    name: "app",
    getData: () => getAppData(fileSystemDataSource),
    serialize: dataToJsonData,
    loader: appLoader,
});