"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataAccessor_1 = require("./DataAccessor");
const Position_1 = require("./Position");
const willBeLeader = (employee) => employee.isLeader;
const GENERIC_EMPLOYEE_LAST_NAME = "???";
const createGenericEmployee = function (position) {
    return {
        firstName: position.name,
        lastName: GENERIC_EMPLOYEE_LAST_NAME,
        level: position.level,
        isLeader: false,
        isReal: false,
    };
};
const createName = function ({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
};
exports.genericEmployeeName = function (position) {
    return createName(createGenericEmployee(position));
};
exports.employees = DataAccessor_1.DataAccessor.new({
    source: e => e.employees,
    parse: ([firstName, lastName, level, isLeader]) => ({ firstName, lastName, level, isLeader: !!isLeader, isReal: true }),
    preParsed: ({ positions }) => positions.all.map(createGenericEmployee),
    create: (employee, id, { positions }) => {
        const { firstName, lastName, level, isLeader, isReal } = employee;
        const position = positions.by.level(level);
        return !position ? undefined : {
            id,
            name: createName(employee),
            firstName,
            lastName,
            position,
            isLeader,
            isReal,
        };
    },
    by: { name: "" },
}, { positions: Position_1.positions });
exports.leaders = DataAccessor_1.DataAccessor.mapped(({ employees }) => employees.all
    .filter(willBeLeader)
    .map((e, i) => Object.assign(e, {
    leaderId: i,
    team: () => undefined,
})), { name: "" }, { employees: exports.employees });
//# sourceMappingURL=Employee.js.map