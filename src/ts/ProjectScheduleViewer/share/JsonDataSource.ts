import {anyWindow} from "../../util/anyWindow";
import {getter} from "../../util/cache";
import {DataSources} from "./DataSources";
import {JsonData} from "./JsonData";

const jsonData: JsonData = JSON.parse(anyWindow.appData as string) as JsonData;
// const jsonData: JsonData = fs.readJsonSync(path.join(dir.test, "appData.json"));

export const jsonDataSource: DataSources = jsonData.mapFields(e => getter(e) as DataSources[keyof DataSources]);
