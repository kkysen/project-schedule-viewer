"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataAccessor_1 = require("./DataAccessor");
const Position_1 = require("./Position");
const willBeLeader = (employee) => employee.isLeader;
const isLeader = willBeLeader;
exports.employees = DataAccessor_1.DataAccessor.new({
    source: e => e.employees,
    parse: ([firstName, lastName, level, isLeader]) => ({ firstName, lastName, level, isLeader: !!isLeader }),
    create: ({ firstName, lastName, level, isLeader }, id, { positions }) => {
        const position = positions.by.level(level);
        return !position ? undefined : {
            id,
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            position,
            isLeader,
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