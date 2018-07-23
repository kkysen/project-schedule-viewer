import {All} from "../../../../util/All";
import {DataSource} from "../../../../util/data/DataSource";
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
    readonly isReal: boolean;
    
}

export interface TeamLeader extends Employee {
    
    readonly leaderId: number;
    
    readonly team: () => Team;
    
}

const willBeLeader = (employee: Employee): boolean => employee.isLeader;

interface ParsedEmployee {
    
    readonly firstName: string;
    readonly lastName: string;
    readonly level: number;
    readonly isLeader: boolean;
    readonly isReal: boolean;
    
}

export type RawEmployee = [string, string, number, 0 | 1];


const GENERIC_EMPLOYEE_LAST_NAME = "???";

const createGenericEmployee = function(position: Position): ParsedEmployee {
    return {
        firstName: position.name,
        lastName: GENERIC_EMPLOYEE_LAST_NAME,
        level: position.level,
        isLeader: false,
        isReal: false,
    };
};

const createName = function({firstName, lastName}: ParsedEmployee): string {
    return `${firstName} ${lastName}`;
};

export const genericEmployeeName = function(position: Position): string {
    return createName(createGenericEmployee(position));
};


type Named = {name: string};

export type Employees = All<Employee, Named>;

type EmployeesArgs = {positions: Positions};

export type EmployeesSource = DataSource<RawEmployee, EmployeesArgs>;

export const employees = DataAccessor.new<Employee, Named, ParsedEmployee, RawEmployee, EmployeesArgs>({
    source: e => e.employees,
    parse: ([firstName, lastName, level, isLeader]) =>
        ({firstName, lastName, level, isLeader: !!isLeader, isReal: true}),
    preParsed: ({positions}) => positions.all.map(createGenericEmployee),
    create: (employee, id, {positions}) => {
        const {firstName, lastName, level, isLeader, isReal} = employee;
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