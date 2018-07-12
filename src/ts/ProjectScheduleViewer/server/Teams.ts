import {WorkBook} from "xlsx";
import {xlsx} from "../../lib/xlsx";
import {All} from "../../util/All";
import {Difference} from "../../util/types/types";
import {Employee, TeamLeader} from "../share/Employee";
import {Month, Months} from "../share/Month";
import {Project} from "../share/Project";
import {Team} from "../share/Team";
import {employees} from "./Employees";
import {readWorkBookAsCsv, Row} from "./parse";

interface ProjectEmployee {
    
    readonly employee: Employee;
    readonly months: ReadonlyArray<{
        readonly month: Month;
        readonly percentCommitted: number;
    }>;
    
}

const parseProjectEmployee = function(row: Row): ProjectEmployee | undefined {
    const [, , , , , name, ...months] = row;
    if (name === null) {
        return undefined;
    }
    const employee = employees.by.name(name);
    if (!employee) {
        return undefined;
    }
    return {
        employee,
        months: months.slice(0, Months.length).map((e, i) => ({
            month: Months[i],
            percentCommitted: e ? parseInt(e.slice(0, -1)) : 0,
        })),
    };
};

const parseProjectEmployees = function(rows: Row[]): ProjectEmployee[] {
    const employees = [];
    for (const row of rows.slice(6)) {
        const employee = parseProjectEmployee(row);
        if (employee) {
            employees.push(employee);
        }
    }
    return employees;
};

const parseProject = function(rows: Row[]): Difference<Project, {leader: TeamLeader}> {
    const [number, name] = rows[2] as string[];
    const percentLikelihood = parseInt(
        (rows.find(row => row[1] === "%AGE LIKELIHOOD:") as string[])
            [5].slice(0, -1)
    );
    
    const employees = parseProjectEmployees(rows);
    
    return {
        name,
        number: parseInt(number),
        percentLikelihood,
        employees: employees.map(e => e.employee),
        months: Months.map((month, i) => ({
            month,
            employees: employees.map(({employee, months}) => ({
                employee,
                percentCommitted: months[i].percentCommitted,
            })),
        })),
    };
};

export const parseTeam = async function(leader: TeamLeader): Promise<Team> {
    const projects = (await readWorkBookAsCsv(leader.teamProjectsFileName()))
        .map(parseProject)
        .map(project => ({...project, leader}))
        .sortBy(project => project.number)
    ;
    return {leader, projects};
};

export type Teams = All<Team>;

export const teams: Teams = All.of(async () => {
    await employees.refresh();
    return await Promise.all(employees.leaders()
        .map(e => e.team()));
}, {});