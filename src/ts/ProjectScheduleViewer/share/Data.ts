import {Function, refreshableCache} from "../../util/cache";
import {MaybePromise} from "../../util/MaybePromise";
import {AwaitType, objectFields, Values} from "../../util/objectFields";
import {DataSources} from "./DataSources";
import {employees, leaders,} from "./Employee";
import {positions} from "./Position";
import {teams} from "./Team";
import AwaitAll = objectFields.AwaitAll;

export type AccessDatum<T extends Function<MaybePromise<any>>> = AwaitType<ReturnType<T>>;

type AccessData<T extends Values<Function<MaybePromise<any>>>> = {[K in keyof T]: AccessDatum<T[K]>};

const dataAccessors = {positions, employees, leaders, teams};

export type Data = AccessData<typeof dataAccessors>;

export const data = refreshableCache((source: DataSources): MaybePromise<Data> => {
    const dataPromises = objectFields.callEachArgs<AwaitAll<Data>, DataSources>(dataAccessors, source);
    return objectFields.awaitAll(dataPromises);
});

export const getAppData = function(sources: DataSources): MaybePromise<Data> {
    data.refresh();
    return data.get(sources);
};