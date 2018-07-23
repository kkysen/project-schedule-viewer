import {All} from "../All";
import {cache, Function, RefreshableCache, refreshableCache} from "../cache";
import {MaybePromise} from "../MaybePromise";
import {AwaitType, objectFields, Values} from "../objectFields";
import {DataSource} from "./DataSource";
import AwaitAll = objectFields.AwaitAll;
import AwaitFunctions = objectFields.AwaitFunctions;

interface DataAccessorArgs<DataSources, T extends By, By, Parsed, Raw, Args> {
    
    source(sources: DataSources): DataSource<Raw, Args>;
    
    parse(raw: Raw): Parsed;
    
    preParsed?: (args: Args) => ReadonlyArray<Parsed>;
    
    create(parsed: Parsed, id: number, args: Args): T | undefined;
    
    by: By;
    
}

export type OriginalData<All, Parsed, Raw> = All & {
    readonly parsed: ReadonlyArray<Parsed>;
    readonly raw: ReadonlyArray<Raw>;
};

export type MappedData<All> = All;

interface DataAccessor<DataSources, Data> {
    
    (source: DataSources): MaybePromise<Data>;
    
}

export type AccessDatum<T extends Function<MaybePromise<any>>> = AwaitType<ReturnType<T>>;

export type AccessData<T extends Values<Function<MaybePromise<any>>>> = {[K in keyof T]: AccessDatum<T[K]>};

interface DataAccessorClass<DataSources> {
    
    "new"<T extends By, By, Parsed, Raw, Args>(
        args: DataAccessorArgs<DataSources, T, By, Parsed, Raw, Args>,
        argsGetter: AwaitFunctions<Args, DataSources>,
    ): DataAccessor<DataSources, OriginalData<All<T, By>, Parsed, Raw>>;
    
    mapped<T extends By, By, Args>(
        create: (args: Args) => ReadonlyArray<T>,
        by: By,
        argsGetter: AwaitFunctions<Args, DataSources>,
    ): DataAccessor<DataSources, MappedData<All<T, By>>>;
    
    data<DataAccessors extends Values<Function<MaybePromise<any>>>>(dataAccessors: DataAccessors):
        RefreshableCache<(source: DataSources) => MaybePromise<AccessData<DataAccessors>>>;
    
}

export const DataAccessorFactory = {
    
    for<DataSources>(): DataAccessorClass<DataSources> {
        return {
            
            new: ({source, parse, preParsed = () => [], create, by}, argsGetter) => {
                return cache(async (sources: DataSources) => {
                    const args = await objectFields.awaitFunctions(argsGetter, sources);
                    const raw = await source(sources)(args);
                    const parsed = raw.map(parse);
                    // do it twice so index is correct 2nd time
                    const a = [
                        ...parsed.filter((e, i) => create(e, i, args)),
                        ...preParsed(args),
                    ].mapFilter((e, i) => create(e, i, args));
                    return {
                        ...All.of(a, by),
                        parsed,
                        raw,
                    };
                });
            },
            
            mapped: (create, by, argsGetter) => {
                return cache(async (source: DataSources) => {
                    return All.of(create(await objectFields.awaitFunctions(argsGetter, source)), by);
                });
            },
            
            data: <DataAccessors extends Values<Function<MaybePromise<any>>>>(dataAccessors: DataAccessors) => {
                type Data = AccessData<DataAccessors>;
                return refreshableCache((source: DataSources): MaybePromise<Data> => {
                    const dataPromises = objectFields.callEachArgs<AwaitAll<Data>, DataSources>(dataAccessors, source);
                    return objectFields.awaitAll(dataPromises);
                });
            },
            
        };
    },
    
};