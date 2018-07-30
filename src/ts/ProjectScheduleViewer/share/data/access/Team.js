"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sparseTranspose_1 = require("../../../../util/misc/sparseTranspose");
const DataAccessor_1 = require("./DataAccessor");
const Day_1 = require("./Day");
const Employee_1 = require("./Employee");
const Position_1 = require("./Position");
const transposeEmployeeDates = function (employeeDates) {
    const a = employeeDates.map(({ employee, dates }) => ({
        i: employee,
        row: dates.map(({ date, percentCommitted }) => ({ j: date, value: percentCommitted })),
    }));
    // Day.sinceEpoch is pretty fast, so use it
    const b = sparseTranspose_1.sparseTreeTranspose(a, date => date.day, Day_1.Day.sinceEpoch);
    return b.map(({ i, row }) => ({
        date: i,
        employees: row.map(({ j, value }) => ({ employee: j, percentCommitted: value })),
    }));
};
const makeProject = function (employees, leader, team) {
    const byId = employees.by.index;
    return ({ id, name, firstDate, percentLikelihood, employees: parsedEmployees }) => {
        const employeeDates = parsedEmployees.map(({ employee, dates }) => ({
            employee: {
                employee: byId(employee),
                project: () => project,
            },
            dates: dates.map(({ date, percentCommitted }) => ({ date: Day_1.Day.sinceEpoch(date + firstDate), percentCommitted })),
        })).filter(e => !!e.employee.employee);
        const project = {
            id,
            team,
            leader,
            name,
            employees: employeeDates.map(e => e.employee),
            dates: transposeEmployeeDates(employeeDates),
            percentLikelihood,
        };
        return project;
    };
};
const makeTeam = function (employees, leader, { projects }) {
    const team = {
        id: leader.leaderId,
        leader,
        projects: projects.map(makeProject(employees, leader, () => team)),
    };
    leader.team = () => team;
    return team;
};
exports.teams = DataAccessor_1.DataAccessor.new({
    source: e => e.teams,
    parse: projects => ({
        projects: projects.map(([id, name, firstDate, employees, percentLikelihood]) => ({
            id,
            name,
            firstDate,
            employees: employees.map(([employee, dates]) => ({
                employee,
                dates: dates.map(([date, percentCommitted]) => ({ date, percentCommitted }))
            })),
            percentLikelihood,
        })).sortBy(e => e.id),
    }),
    create: (parsed, id, { leaders, employees }) => makeTeam(employees, leaders.all[id], parsed),
    by: {},
}, { leaders: Employee_1.leaders, employees: Employee_1.employees, positions: Position_1.positions });
//# sourceMappingURL=Team.js.map