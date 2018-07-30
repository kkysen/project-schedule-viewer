import {Day} from "./Day";
import {Employee, TeamLeader} from "./Employee";
import {Team} from "./Team";


interface ParsedEmployeeDate {
    readonly date: number;
    readonly percentCommitted: number;
}

type RawEmployeeDate = [number, number];

export interface ParsedProjectEmployee {
    readonly employee: number;
    readonly dates: ReadonlyArray<ParsedEmployeeDate>;
}

export type RawProjectEmployee = [number, RawEmployeeDate[]];

export interface ParsedProject {
    readonly id: number;
    readonly name: string;
    readonly firstDate: number; // keep dates as delta for compression
    readonly employees: ReadonlyArray<ParsedProjectEmployee>;
    readonly percentLikelihood: number;
}

export type RawProject = [number, string, number, RawProjectEmployee[], number];

export interface ProjectEmployee {
    
    readonly employee: Employee;
    readonly project: () => Project;
    
}

export interface EmployeeCommitment {
    
    readonly employee: ProjectEmployee;
    readonly percentCommitted: number;
    
}

export interface ProjectDate {
    
    readonly date: Day;
    readonly employees: ReadonlyArray<EmployeeCommitment>;
    
}

export interface Project {
    
    readonly id: number;
    readonly name: string;
    readonly team: () => Team;
    readonly leader: TeamLeader;
    readonly employees: ReadonlyArray<ProjectEmployee>;
    
    readonly dates: ReadonlyArray<ProjectDate>;
    
    readonly percentLikelihood: number;
    
}