import {All} from "../../util/All";
import {cache} from "../../util/cache";
import {MaybePromise} from "../../util/MaybePromise";
import {objectFields} from "../../util/objectFields";
import {DataSource} from "./DataSource";
import {DataSources} from "./DataSources";
import AwaitFunctions = objectFields.AwaitFunctions;

interface DataAccessorArgs<T extends By, By, Parsed, Raw, Args> {
    
    source(sources: DataSources): DataSource<Raw, Args>;
    
    parse(raw: Raw): Parsed;
    
    create(parsed: Parsed, id: number, args: Args): T | undefined;
    
    by: By;
    
}

export type OriginalData<All, Parsed, Raw> = All & {
    readonly parsed: ReadonlyArray<Parsed>;
    readonly raw: ReadonlyArray<Raw>;
};

export type MappedData<All> = All;

interface DataAccessor<Data> {
    
    (source: DataSources): MaybePromise<Data>;
    
}

export const DataAccessor = {
    
    new<T extends By, By, Parsed, Raw, Args>(
        {source, parse, create, by}: DataAccessorArgs<T, By, Parsed, Raw, Args>,
        argsGetter: AwaitFunctions<Args, DataSources>,
    ): DataAccessor<OriginalData<All<T, By>, Parsed, Raw>> {
        return cache(async (sources: DataSources) => {
            const args = await objectFields.awaitFunctions(argsGetter, sources);
            const raw = await source(sources)(args);
            const parsed = raw.map(parse);
            const map = (e: Parsed, i: number) => create(e, i, args);
            // do it twice so index is correct 2nd time
            const a = parsed.filter(map).mapFilter(map);
            // const a = parsed._().mapFilter((e, i) => create(e, i, args));
            return {
                ...All.of(a, by),
                parsed,
                raw,
            };
        });
    },
    
    mapped<T extends By, By, Args>(
        create: (args: Args) => ReadonlyArray<T>,
        by: By,
        argsGetter: AwaitFunctions<Args, DataSources>,
    ): DataAccessor<MappedData<All<T, By>>> {
        return cache(async (source: DataSources) => {
            return All.of(create(await objectFields.awaitFunctions(argsGetter, source)), by);
        });
    },
    
};