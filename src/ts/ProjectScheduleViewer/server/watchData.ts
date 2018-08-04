import {of} from "rxjs/index";
import {debounceTime, filter, map, mergeMap, switchMap, tap} from "rxjs/internal/operators";
import {path} from "../../util/polyfills/path";
import {fromFSWatch, FSEvent} from "../../util/rx/fromFSWatch";
import {timer} from "../../util/rx/timer";
import {data} from "../share/data/Data";
import {app} from "../ssr/appRenderer";
import {dir} from "./dir";

export const watchData = function(): void {
    const printPath = (prepend: string) => tap((e: FSEvent) => console.log(`${prepend}: ${e.path}`));
    const {start, end} = timer("reload app");
    of("positions.csv", "employees.xlsx", "teams")
        .pipe(
            map(e => path.join(dir.data, e)),
            mergeMap(e => fromFSWatch(e)),
            // printPath("all"),
            filter(({filename: e}) => !(e.startsWith("~") || e.endsWith("~") || e.endsWith("tmp") || !e.includes("."))),
            // printPath("filtered"),
            debounceTime(1000),
            printPath("debounced"),
            start,
            tap(data.refresh),
            switchMap(app.getRefreshed),
            end,
        ).subscribe(() => null);
};