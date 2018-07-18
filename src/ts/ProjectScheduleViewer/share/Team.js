"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataAccessor_1 = require("./DataAccessor");
const Employee_1 = require("./Employee");
const Month_1 = require("./Month");
const makeProject = function (employees, leader) {
    const byId = employees.by.index;
    return (project) => {
        const { id, name, percentLikelihood } = project;
        const employees = project.employees.map(({ employee, months }) => ({
            employee: byId(employee),
            months: months.map(({ month, percentCommitted }) => ({ month: Month_1.Months[month], percentCommitted })),
        })).filter(e => !!e.employee);
        return {
            id,
            leader,
            name,
            employees: employees.map(e => e.employee),
            months: Month_1.Months.map((month, i) => ({
                month,
                employees: employees.map(({ employee, months }) => ({
                    employee,
                    percentCommitted: months[i].percentCommitted,
                })),
            })),
            percentLikelihood,
        };
    };
};
const makeTeam = function (employees, leader, { projects }) {
    const team = {
        id: leader.leaderId,
        leader,
        projects: projects.map(makeProject(employees, leader)),
    };
    leader.team = () => team;
    return team;
};
exports.teams = DataAccessor_1.DataAccessor.new({
    source: e => e.teams,
    parse: projects => ({
        projects: projects.map(([id, name, employees, percentLikelihood]) => ({
            id,
            name,
            employees: employees.map(([employee, months]) => ({
                employee,
                months: months.map((percentCommitted, i) => ({ month: i, percentCommitted }))
            })),
            percentLikelihood,
        })).sortBy(e => e.id),
    }),
    create: (parsed, id, { leaders, employees }) => makeTeam(employees, leaders.all[id], parsed),
    by: {},
}, { leaders: Employee_1.leaders, employees: Employee_1.employees });
//# sourceMappingURL=Team.js.map