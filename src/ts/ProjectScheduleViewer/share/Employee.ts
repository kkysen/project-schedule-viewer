import {path} from "../../util/polyfills/path";
import {Difference, PartialDifference} from "../../util/types/types";
import {dir} from "../server/dir";
import {positions} from "../server/Positions";
import {parseTeam} from "../server/Teams";
import {Position} from "./Position";
import {Team} from "./Team";

export interface ParsedEmployee {
    
    readonly firstName: string;
    readonly lastName: string;
    readonly level: number;
    readonly isLeader: boolean;
    
}

export interface Employee {
    
    readonly id: number;
    
    readonly name: string;
    readonly firstName: string;
    readonly lastName: string;
    
    readonly position: Position;
    readonly isLeader: boolean;
    
}

export interface TeamLeader extends Employee {
    
    teamProjectsFileName(): string;
    
    team(): Promise<Team>;
    
}

type Id = {readonly id: number};

const makeLeader = function(employee: PartialDifference<Employee, Id>): PartialDifference<TeamLeader, Id> {
    const leader: Difference<TeamLeader, Id> = Object.assign(employee, {
        teamProjectsFileName: () => path.join(dir.data, "teams", `${leader.name}.xlsx`),
        team: () => parseTeam(leader as TeamLeader),
    });
    return leader;
};

export const isLeader = function(employee: Employee): employee is TeamLeader {
    return employee.isLeader;
};

const makeEmployee = function(
    {firstName, lastName, level, isLeader}: ParsedEmployee): Difference<Employee, Id> | undefined {
    const position = positions.by.level(level);
    if (!position) {
        return undefined;
    }
    const employee = {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        position,
        isLeader,
    };
    return isLeader ? makeLeader(employee) : employee;
};

export const makeEmployees = function(employees: ReadonlyArray<ParsedEmployee>): ReadonlyArray<Employee> {
    return (employees as ParsedEmployee[])
        .mapFilter(makeEmployee)
        .map((e, i) => Object.assign(e, {id: i}));
};