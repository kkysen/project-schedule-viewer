import {All} from "../../util/All";
import {DataSource} from "./DataSource";
import {DataAccessor} from "./DataAccessor";
import {Employee, employees, Employees, leaders, TeamLeader, TeamLeaders} from "./Employee";
import {Months} from "./Month";
import {ParsedProject, Project, RawProject} from "./Project";

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

type TeamsArgs = {leaders: TeamLeaders, employees: Employees};

export type TeamsSource = DataSource<RawTeam, TeamsArgs>;

const makeProject = function(employees: Employees, leader: TeamLeader) {
    const byId = employees.by.index;
    return (project: ParsedProject): Project => {
        const {id, name, percentLikelihood} = project;
        const employees = project.employees.map(({employee, months}) => ({
            employee: byId(employee) as Employee,
            months: months.map(({month, percentCommitted}) => ({month: Months[month], percentCommitted})),
        })).filter(e => !!e.employee);
        return {
            id,
            leader,
            name,
            employees: employees.map(e => e.employee),
            months: Months.map((month, i) => ({
                month,
                employees: employees.map(({employee, months}) => ({
                    employee,
                    percentCommitted: months[i].percentCommitted,
                })),
            })),
            percentLikelihood,
        };
    };
};

const makeTeam = function(employees: Employees, leader: TeamLeader, {projects}: ParsedTeam): Team {
    const team = {
        id: leader.leaderId,
        leader,
        projects: projects.map(makeProject(employees, leader)),
    };
    (leader as {team: () => Team}).team = () => team;
    return team;
};

export const teams = DataAccessor.new<Team, {}, ParsedTeam, RawTeam, TeamsArgs>({
    source: e => e.teams,
    parse: projects => ({
        projects: projects.map(([id, name, employees, percentLikelihood]) => ({
            id,
            name,
            employees: employees.map(([employee, months]) => ({
                employee,
                months: months.map((percentCommitted, i) => ({month: i, percentCommitted}))
            })),
            percentLikelihood,
        })).sortBy(e => e.id),
    }),
    create: (parsed, id, {leaders, employees}) => makeTeam(employees, leaders.all[id], parsed),
    by: {},
}, {leaders, employees});