"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const utils_1 = require("../../util/misc/utils");
const xlsx_1 = require("../../util/misc/xlsx");
const path_1 = require("../../util/polyfills/path");
const Day_1 = require("../share/data/access/Day");
const Employee_1 = require("../share/data/access/Employee");
const Month_1 = require("../share/data/access/Month");
const dir_1 = require("./dir");
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
    const GENERIC_EMPLOYEE_NAME_PATTERN = /^( *\?*)*Staff( *\?*)*$/i;
    const employeeByName = function (name, levelString, rateString) {
        if (!name) {
            return;
        }
        const employee = employees.by.name(name);
        if (employee) {
            return employee;
        }
        if (!GENERIC_EMPLOYEE_NAME_PATTERN.test(name)) {
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
        const year = 2018; // FIXME
        for (const row of rows.slice(6)) {
            const [, , , level, rate, name, ...months] = row;
            const employee = employeeByName(name, level, rate);
            if (!employee) {
                continue;
            }
            const parse = parsePercent();
            const map = (percent, month) => {
                return [Day_1.Day.of(new Date(year, month)).day, parse(percent)];
            };
            yield [
                employee.id,
                months.slice(0, Month_1.Months.length).map(map),
            ];
        }
    };
    const subtractFirstDate = function (employees) {
        const datesField = 1;
        const dateField = 0;
        const dateCommitments = employees.flatMap(e => e[datesField]);
        const firstDate = Math.min(...dateCommitments.map(e => e[dateField]));
        dateCommitments.forEach(e => e[dateField] -= firstDate);
        return firstDate;
    };
    return (rows) => {
        const [id, name] = rows[2];
        const percentLikelihood = parsePercent()(rows.find(row => row[1] === "%AGE LIKELIHOOD:")[5]);
        const employees = [...parseProjectEmployees(rows)];
        const firstDate = subtractFirstDate(employees);
        return [
            parseInt(id),
            name,
            firstDate,
            employees,
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