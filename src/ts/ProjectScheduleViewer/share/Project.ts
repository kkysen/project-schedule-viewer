import {Employee} from "./Employee";
import {Month} from "./Month";

export interface EmployeeCommitment {
    
    readonly employee: Employee;
    readonly percentCommitted: number;
    
}

export interface ProjectMonth {
    
    readonly month: Month;
    readonly employees: ReadonlyArray<EmployeeCommitment>;
    
}

export interface Project {
    
    readonly name: string;
    readonly number: number;
    readonly leader: Employee;
    readonly employees: ReadonlyArray<Employee>;
    
    readonly months: ReadonlyArray<ProjectMonth>;
    
    readonly percentLikelihood: number;
    
}