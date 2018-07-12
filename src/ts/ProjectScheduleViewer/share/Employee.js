"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../util/polyfills/path");
const dir_1 = require("../server/dir");
const Positions_1 = require("../server/Positions");
const Teams_1 = require("../server/Teams");
const makeLeader = function (employee) {
    const leader = Object.assign(employee, {
        teamProjectsFileName: () => path_1.path.join(dir_1.dir.data, "teams", `${leader.name}.xlsx`),
        team: () => Teams_1.parseTeam(leader),
    });
    return leader;
};
exports.isLeader = function (employee) {
    return employee.isLeader;
};
const makeEmployee = function ({ firstName, lastName, level, isLeader }) {
    const position = Positions_1.positions.by.level(level);
    if (!position) {
        return undefined;
    }
    const employee = {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        position,
        isLeader,
    };
    return isLeader ? makeLeader(employee) : employee;
};
exports.makeEmployees = function (employees) {
    return employees
        .mapFilter(makeEmployee)
        .map((e, i) => Object.assign(e, { id: i }));
};
//# sourceMappingURL=Employee.js.map