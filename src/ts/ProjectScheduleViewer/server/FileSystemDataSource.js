"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path_1 = require("../../util/polyfills/path");
const Month_1 = require("../share/Month");
const dir_1 = require("./dir");
const parse_1 = require("./parse");
const parseEmployee = function (row) {
    const [i, lastName, firstName, level, isLeader] = row;
    return i === null ? undefined : [
        firstName,
        lastName,
        parseInt(level),
        isLeader === "Y" ? 1 : 0,
    ];
};
const parseProject = function (employees) {
    const parseProjectEmployees = function* (rows) {
        for (const row of rows.slice(6)) {
            const [, , , , , name, ...months] = row;
            if (name === null) {
                return;
            }
            const employee = employees.by.name(name);
            if (!employee) {
                continue;
            }
            yield [
                employee.id,
                months.slice(0, Month_1.Months.length).map(e => e ? parseInt(e.slice(0, -1)) : 0),
            ];
        }
    };
    return (rows) => {
        const [id, name] = rows[2];
        const percentLikelihood = parseInt(rows.find(row => row[1] === "%AGE LIKELIHOOD:")[5].slice(0, -1));
        return [
            parseInt(id),
            name,
            [...parseProjectEmployees(rows)],
            percentLikelihood,
        ];
    };
};
exports.fileSystemDataSource = {
    positions: async () => {
        const buffer = await fs.readFile(path_1.path.join(dir_1.dir.data, "positions.csv"));
        const trim = (s) => s.trim();
        const csv = buffer
            .toString("utf8")
            .trim()
            .split("\n")
            .map(trim)
            .map(line => line.split(",").map(trim));
        return csv
            .map(([level, name, rate]) => [parseInt(level), name, parseInt(rate)]);
    },
    employees: async () => {
        const [sheet] = await parse_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, "employees.xlsx"));
        return sheet.slice(3).mapFilter(parseEmployee);
    },
    teams: ({ leaders, employees }) => leaders.all._()
        .asyncMap(async (leader) => (await parse_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, "teams", `${leader.name}.xlsx`)))
        .map(parseProject(employees))),
};
//# sourceMappingURL=FileSystemDataSource.js.map