import {getAppData} from "../share/data/Data";
import {jsonDataSource} from "../share/data/source/JsonDataSource";
import {createApp} from "../ssr/components/app/App";
import {ClientLoader} from "../../util/ssr/ClientLoader";

export const appLoader = ClientLoader.new({
    create: createApp,
    deserialize: () => getAppData(jsonDataSource),
});