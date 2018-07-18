import {MaybePromise} from "../../util/MaybePromise";

export type DataSource<T, Args> = (args: Args) => MaybePromise<ReadonlyArray<T>>;