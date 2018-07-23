import {Employee, TeamLeader} from "./Employee";
import {Month} from "./Month";
import {Team} from "./Team";


interface ParsedEmployeeMonth {
    readonly month: number;
    readonly percentCommitted: number;
}

type RawEmployeeMonth = number;

export interface ParsedProjectEmployee {
    readonly employee: number;
    readonly months: ReadonlyArray<ParsedEmployeeMonth>;
}

export type RawProjectEmployee = [number, RawEmployeeMonth[]];

export interface ParsedProject {
    readonly id: number;
    readonly name: string;
    readonly employees: ReadonlyArray<ParsedProjectEmployee>;
    readonly percentLikelihood: number;
}

export type RawProject = [number, string, RawProjectEmployee[], number];

export interface ProjectEmployee {
    
    readonly employee: Employee;
    readonly project: () => Project;
    
}

export interface EmployeeCommitment {
    
    readonly employee: ProjectEmployee;
    readonly percentCommitted: number;
    
}

export interface ProjectMonth {
    
    readonly month: Month;
    readonly employees: ReadonlyArray<EmployeeCommitment>;
    
}

export interface Project {
    
    readonly id: number;
    readonly name: string;
    readonly team: () => Team;
    readonly leader: TeamLeader;
    readonly employees: ReadonlyArray<ProjectEmployee>;
    
    readonly months: ReadonlyArray<ProjectMonth>;
    
    readonly percentLikelihood: number;
    
}