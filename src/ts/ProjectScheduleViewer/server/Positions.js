"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const All_1 = require("../../util/All");
const path_1 = require("../../util/polyfills/path");
const dir_1 = require("./dir");
exports.positions = All_1.All.of(async () => {
    const buffer = await fs.readFile(path_1.path.join(dir_1.dir.data, "positions.csv"));
    const trim = (s) => s.trim();
    const csv = buffer
        .toString("utf8")
        .trim()
        .split("\n")
        .map(trim)
        .map(line => line.split(",").map(trim));
    return csv
        .map(([level, name, rate]) => ({ level, name, rate }));
}, { level: 0 });
//# sourceMappingURL=Positions.js.map