"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("rxjs/index");
const operators_1 = require("rxjs/internal/operators");
const path_1 = require("../../util/polyfills/path");
const fromFSWatch_1 = require("../../util/rx/fromFSWatch");
const timer_1 = require("../../util/rx/timer");
const Data_1 = require("../share/data/Data");
const appRenderer_1 = require("../ssr/appRenderer");
const dir_1 = require("./dir");
exports.watchData = function () {
    const printPath = (prepend) => operators_1.tap((e) => console.log(`${prepend}: ${e.path}`));
    const { start, end } = timer_1.timer("reload app");
    index_1.of("positions.csv", "employees.xlsx", "teams")
        .pipe(operators_1.map(e => path_1.path.join(dir_1.dir.data, e)), operators_1.mergeMap(e => fromFSWatch_1.fromFSWatch(e)), 
    // printPath("all"),
    operators_1.filter(({ filename: e }) => !(e.startsWith("~") || e.endsWith("~") || e.endsWith("tmp") || !e.includes("."))), 
    // printPath("filtered"),
    operators_1.debounceTime(1000), printPath("debounced"), start, operators_1.tap(Data_1.data.refresh), operators_1.switchMap(appRenderer_1.app.getRefreshed), end).subscribe(() => null);
};
//# sourceMappingURL=watchData.js.map