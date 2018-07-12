"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const All_1 = require("../../util/All");
const Month_1 = require("../share/Month");
const Employees_1 = require("./Employees");
const parse_1 = require("./parse");
const parseProjectEmployee = function (row) {
    const [, , , , , name, ...months] = row;
    if (name === null) {
        return undefined;
    }
    const employee = Employees_1.employees.by.name(name);
    if (!employee) {
        return undefined;
    }
    return {
        employee,
        months: months.slice(0, Month_1.Months.length).map((e, i) => ({
            month: Month_1.Months[i],
            percentCommitted: e ? parseInt(e.slice(0, -1)) : 0,
        })),
    };
};
const parseProjectEmployees = function (rows) {
    const employees = [];
    for (const row of rows.slice(6)) {
        const employee = parseProjectEmployee(row);
        if (employee) {
            employees.push(employee);
        }
    }
    return employees;
};
const parseProject = function (rows) {
    const [number, name] = rows[2];
    const percentLikelihood = parseInt(rows.find(row => row[1] === "%AGE LIKELIHOOD:")[5].slice(0, -1));
    const employees = parseProjectEmployees(rows);
    return {
        name,
        number: parseInt(number),
        percentLikelihood,
        employees: employees.map(e => e.employee),
        months: Month_1.Months.map((month, i) => ({
            month,
            employees: employees.map(({ employee, months }) => ({
                employee,
                percentCommitted: months[i].percentCommitted,
            })),
        })),
    };
};
exports.parseTeam = async function (leader) {
    const projects = (await parse_1.readWorkBookAsCsv(leader.teamProjectsFileName()))
        .map(parseProject)
        .map(project => ({ ...project, leader }))
        .sortBy(project => project.number);
    return { leader, projects };
};
exports.teams = All_1.All.of(async () => {
    await Employees_1.employees.refresh();
    return await Promise.all(Employees_1.employees.leaders()
        .map(e => e.team()));
}, {});
//# sourceMappingURL=Teams.js.map