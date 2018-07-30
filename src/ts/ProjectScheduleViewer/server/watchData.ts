import {FSWatcher} from "fs";
import * as fs from "fs";
import {path} from "../../util/polyfills/path";
import {data} from "../share/data/Data";
import {app} from "../ssr/appRenderer";
import {dir} from "./dir";

const onDataChange = function(): void {
    data.refresh();
    app.refresh();
};

interface DataWatchers {
    readonly positions: FSWatcher;
    readonly employees: FSWatcher;
    readonly teams: FSWatcher;
}

export const watchData = function(): DataWatchers {
    return {
        positions: "positions.csv",
        employees: "employees.xlsx",
        teams: "teams",
    }.mapFields(filename => fs.watch(path.join(dir.data, filename), (event, filename) => {
        if (filename.startsWith("~") || !filename.endsWith(".xlsx")) {
            return; // skip temp Excel file
        }
        console.log("reloading data", {event, filename});
        onDataChange();
    }));
};