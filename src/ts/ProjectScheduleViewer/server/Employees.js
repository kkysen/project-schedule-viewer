"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const All_1 = require("../../util/All");
const path_1 = require("../../util/polyfills/path");
const Employee_1 = require("../share/Employee");
const dir_1 = require("./dir");
const parse_1 = require("./parse");
const Positions_1 = require("./Positions");
const createEmployees = function (getter) {
    let _leaders;
    const employees = All_1.All.of(async () => {
        _leaders = undefined;
        return await getter();
    }, { name: "" });
    return Object.assign(employees, {
        leaders: () => {
            return _leaders || employees.all().filter(Employee_1.isLeader);
        },
    });
};
const parseEmployee = function (row) {
    const [i, lastName, firstName, level, isLeader] = row;
    return i === null ? undefined : {
        lastName,
        firstName,
        level: parseInt(level),
        isLeader: isLeader === "Y",
    };
};
const fetchEmployees = async function () {
    const [, sheets] = await Promise.all([
        Positions_1.positions.refresh(),
        parse_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, "employees.xlsx")),
    ]);
    return sheets[0].slice(3).mapFilter(parseEmployee);
};
exports.employees = createEmployees(async () => Employee_1.makeEmployees(await fetchEmployees()));
//# sourceMappingURL=Employees.js.map