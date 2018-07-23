"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path_1 = require("../../util/polyfills/path");
const utils_1 = require("../../util/utils");
const Employee_1 = require("../share/data/access/Employee");
const Month_1 = require("../share/data/access/Month");
const dir_1 = require("./dir");
const xlsx_1 = require("../../util/xlsx");
const parseEmployee = function (row) {
    const [i, lastName, firstName, level, isLeader] = row;
    return i === null ? undefined : [
        firstName,
        lastName,
        parseInt(level),
        utils_1.boolAsInt(isLeader === "Y"),
    ];
};
const parseProject = function (employees, positions) {
    const parsePercent = function (defaultPercent = 0.00) {
        return (s) => {
            if (!s) {
                return defaultPercent;
            }
            const percent = parseFloat(s.slice(0, -1));
            return !percent ? defaultPercent : 0.01 * percent;
        };
    };
    const GENERIC_EMPLOYEE_NAME = "Staff ??";
    const employeeByName = function (name, levelString, rateString) {
        if (!name) {
            return;
        }
        const employee = employees.by.name(name);
        if (employee) {
            return employee;
        }
        if (name !== GENERIC_EMPLOYEE_NAME) {
            return;
        }
        const level = parseInt(levelString);
        if (!level) {
            return;
        }
        const position = positions.by.level(level);
        if (!position) {
            return;
        }
        return employees.by.name(Employee_1.genericEmployeeName(position));
    };
    const parseProjectEmployees = function* (rows) {
        for (const row of rows.slice(6)) {
            const [, , , level, rate, name, ...months] = row;
            const employee = employeeByName(name, level, rate);
            if (!employee) {
                continue;
            }
            yield [
                employee.id,
                months.slice(0, Month_1.Months.length).map(parsePercent()),
            ];
        }
    };
    return (rows) => {
        const [id, name] = rows[2];
        const percentLikelihood = parsePercent()(rows.find(row => row[1] === "%AGE LIKELIHOOD:")[5]);
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
        const [sheet] = await xlsx_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, "employees.xlsx"));
        return sheet.slice(3).mapFilter(parseEmployee);
    },
    teams: ({ leaders, employees, positions }) => leaders.all._()
        .asyncMap(async (leader) => (await xlsx_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, "teams", `${leader.name}.xlsx`)))
        .map(parseProject(employees, positions))),
};
//# sourceMappingURL=FileSystemDataSource.js.map