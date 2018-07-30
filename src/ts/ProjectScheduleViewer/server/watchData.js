"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("../../util/polyfills/path");
const Data_1 = require("../share/data/Data");
const appRenderer_1 = require("../ssr/appRenderer");
const dir_1 = require("./dir");
const onDataChange = function () {
    Data_1.data.refresh();
    appRenderer_1.app.refresh();
};
exports.watchData = function () {
    return {
        positions: "positions.csv",
        employees: "employees.xlsx",
        teams: "teams",
    }.mapFields(filename => fs.watch(path_1.path.join(dir_1.dir.data, filename), (event, filename) => {
        if (filename.startsWith("~") || !filename.endsWith(".xlsx")) {
            return; // skip temp Excel file
        }
        console.log("reloading data", { event, filename });
        onDataChange();
    }));
};
//# sourceMappingURL=watchData.js.map