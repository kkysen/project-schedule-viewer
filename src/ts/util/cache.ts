export const getter = function <T>(t: T): () => T {
    return () => t;
};

export const makeGetter = function<T>(): (t: T) => () => T {
    return getter;
};

export type Function<R = any> = (...args: any[]) => R;

export const cache = function <F extends Function>(getter: F): F {
    let cache: ReturnType<F> | undefined;
    return ((...args: any[]) => cache !== undefined ? cache : (cache = getter(...args))) as F;
};

export interface RefreshableCache<F extends Function> {
    
    readonly get: F;
    
    refresh(): void;
    
}

export const refreshableCache = function <F extends Function>(getter: F): RefreshableCache<F> {
    let cache: ReturnType<F> | undefined;
    return {
        get: ((...args: any[]) => cache !== undefined ? cache : (cache = getter(...args))) as F,
        refresh: () => cache = undefined,
    };
};