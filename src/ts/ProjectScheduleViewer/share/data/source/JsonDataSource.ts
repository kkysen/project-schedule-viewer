import {getter} from "../../../../util/cache/cache";
import {getClientJsonData} from "../../../../util/ssr/ClientLoader";
import {ValueOf} from "../../../../util/types/ValueOf";
import {JsonData} from "../JsonData";
import {DataSources} from "./DataSources";

export const jsonDataSource: () => DataSources = () => getClientJsonData<JsonData>()
    .mapFields(e => getter(e) as ValueOf<DataSources>);
