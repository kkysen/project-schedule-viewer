import {All} from "../../util/All";
import {path} from "../../util/polyfills/path";
import {Is} from "../../util/types/isType";
import {dir} from "../server/dir";
import {DataSource} from "./DataSource";
import {DataAccessor} from "./DataAccessor";
import {Position, Positions, positions} from "./Position";
import {Team} from "./Team";

export interface Employee {
    
    readonly id: number;
    
    readonly name: string;
    readonly firstName: string;
    readonly lastName: string;
    
    readonly position: Position;
    readonly isLeader: boolean;
    
}

export interface TeamLeader extends Employee {
    
    readonly leaderId: number;
    
    readonly team: () => Team;
    
}

const willBeLeader = (employee: Employee): boolean => employee.isLeader;

const isLeader: Is<TeamLeader> = willBeLeader as Is<TeamLeader>;

interface ParsedEmployee {
    
    readonly firstName: string;
    readonly lastName: string;
    readonly level: number;
    readonly isLeader: boolean;
    
}

export type RawEmployee = [string, string, number, 0 | 1];

type Named = {name: string};

export type Employees = All<Employee, Named>;

type EmployeesArgs = {positions: Positions};

export type EmployeesSource = DataSource<RawEmployee, EmployeesArgs>;

export const employees = DataAccessor.new<Employee, Named, ParsedEmployee, RawEmployee, EmployeesArgs>({
    source: e => e.employees,
    parse: ([firstName, lastName, level, isLeader]) => ({firstName, lastName, level, isLeader: !!isLeader}),
    create: ({firstName, lastName, level, isLeader}, id, {positions}) => {
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
    by: {name: ""},
}, {positions});

export type TeamLeaders = All<TeamLeader, Named>;

export const leaders = DataAccessor.mapped<TeamLeader, Named, {employees: Employees}>(
    ({employees}) => employees.all
        .filter(willBeLeader)
        .map((e, i) => Object.assign(e, {
            leaderId: i,
            team: () => undefined as any as Team, // is assigned later in makeTeam (Team.ts)
        })),
    {name: ""},
    {employees},
);