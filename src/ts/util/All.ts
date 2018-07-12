interface Named {
    readonly name: string;
}

interface AllNow<T extends By, By> {
    
    all(): ReadonlyArray<T>;
    
    readonly by: {
        
        id(id: number): T | undefined;
        
    } & {[K in keyof By]: (by: By[K]) => T | undefined};
    
}

export interface All<T extends By, By = {}> extends AllNow<T, By> {
    
    refresh(): Promise<All<T, By>>;
    
}

const AllNow = {
    
    of<T extends By, By = {}>(a: ReadonlyArray<T>, bySample: By): AllNow<T, By> {
        type K = keyof By;
        type V = By[K];
        type M = Map<V, T>;
        type GetBy = (by: V) => T | undefined;
        type AllGetBy = {[_K in K]: (by: By[_K]) => T | undefined}
        
        const map = (key: K): M => new Map(a.map(e => [e[key], e] as [V, T]));
        const mapBy = (key: K): GetBy => {
            const byMap = map(key);
            return (by: V) => byMap.get(by);
        };
        
        const maps = Object.keys(bySample)
            .map(key => [key, mapBy(key)] as [K, GetBy]);
        const byMap: AllGetBy = maps.toObject();
        
        return {
            all: () => a,
            by: Object.assign(byMap, {
                id: (id: number) => a[id],
            }),
        };
    },
    
};

export const All = {
    
    of<T extends By, By>(getter: null | (() => Promise<ReadonlyArray<T>>), by: By, initial: ReadonlyArray<T> = []): All<T, By> {
        const all: All<T, By> =  {
            refresh: async () => {
                getter && Object.assign(all, AllNow.of(await getter(), by));
                return all;
            },
            ...AllNow.of(initial, by),
        };
        return all;
    },
    
};