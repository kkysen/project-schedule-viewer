import {MaybePromise} from "../MaybePromise";

export type DataSource<T, Args> = (args: Args) => MaybePromise<ReadonlyArray<T>>;