import {AccessData} from "../../../util/data/DataAccessor";
import {MaybePromise} from "../../../util/maybePromise/MaybePromise";
import {DataAccessor} from "./access/DataAccessor";
import {DataSources, DataSourcesOrGetter} from "./source/DataSources";
import {employees, leaders,} from "./access/Employee";
import {positions} from "./access/Position";
import {teams} from "./access/Team";

const dataAccessors = {positions, employees, leaders, teams};

export type Data = AccessData<typeof dataAccessors>;

export const data = DataAccessor.data(dataAccessors);

export const getAppData = function(sources: DataSourcesOrGetter): MaybePromise<Data> {
    // data.refresh();
    return data.get(sources);
};