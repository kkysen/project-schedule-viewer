import {All} from "../../../../util/collections/query/All";
import {DataSource} from "../../../../util/data/DataSource";
import {sparseTreeTranspose} from "../../../../util/misc/sparseTranspose";
import {DataAccessor} from "./DataAccessor";
import {Day} from "./Day";
import {employees, Employees, leaders, TeamLeader, TeamLeaders} from "./Employee";
import {Positions, positions} from "./Position";
import {ParsedProject, Project, ProjectEmployee, RawProject} from "./Project";

export interface Team {
    
    readonly id: number;
    readonly leader: TeamLeader;
    readonly projects: ReadonlyArray<Project>;
    
}

export interface ParsedTeam {
    readonly projects: ReadonlyArray<ParsedProject>;
}

export type RawTeam = RawProject[];

export type Teams = All<Team, {}>;

type TeamsArgs = {leaders: TeamLeaders, employees: Employees, positions: Positions};

export type TeamsSource = DataSource<RawTeam, TeamsArgs>;

interface EmployeeDates {
    employee: ProjectEmployee;
    dates: {date: Day, percentCommitted: number}[];
}

interface DateEmployees {
    date: Day;
    employees: {employee: ProjectEmployee, percentCommitted: number}[];
}

const transposeEmployeeDates = function(employeeDates: EmployeeDates[]): DateEmployees[] {
    const a = employeeDates.map(({employee, dates}) => ({
        i: employee,
        row: dates.map(({date, percentCommitted}) => ({j: date, value: percentCommitted})),
    }));
    // Day.sinceEpoch is pretty fast, so use it
    const b = sparseTreeTranspose(a, date => date.day, Day.sinceEpoch);
    return b.map(({i, row}) => ({
        date: i,
        employees: row.map(({j, value}) => ({employee: j, percentCommitted: value})),
    }));
};

const makeProject = function(employees: Employees, leader: TeamLeader, team: () => Team) {
    const byId = employees.by.index;
    return ({id, name, firstDate, percentLikelihood, employees: parsedEmployees}: ParsedProject): Project => {
        const employeeDates = parsedEmployees.map(({employee, dates}) => ({
            employee: {
                employee: byId(employee)!,
                project: () => project,
            },
            dates: dates.map(({date, percentCommitted}) => ({date: Day.sinceEpoch(date + firstDate), percentCommitted})),
        })).filter(e => !!e.employee.employee);
        const project: Project = {
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

const makeTeam = function(employees: Employees, leader: TeamLeader, {projects}: ParsedTeam): Team {
    const team: Team = {
        id: leader.leaderId,
        leader,
        projects: projects.map(makeProject(employees, leader, () => team)),
    };
    (leader as {team: () => Team}).team = () => team;
    return team;
};

export const teams = DataAccessor.new<Team, {}, ParsedTeam, RawTeam, TeamsArgs>({
    source: e => e.teams,
    parse: projects => ({
        projects: projects.map(([id, name, firstDate, employees, percentLikelihood]) => ({
            id,
            name,
            firstDate,
            employees: employees.map(([employee, dates]) => ({
                employee,
                dates: dates.map(([date, percentCommitted]) => ({date, percentCommitted}))
            })),
            percentLikelihood,
        })).sortBy(e => e.id),
    }),
    create: (parsed, id, {leaders, employees}) => makeTeam(employees, leaders.all[id], parsed),
    by: {},
}, {leaders, employees, positions});