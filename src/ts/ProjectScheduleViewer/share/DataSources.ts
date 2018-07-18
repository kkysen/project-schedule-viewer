import {EmployeesSource} from "./Employee";
import {PositionsSource} from "./Position";
import {TeamsSource} from "./Team";

export interface DataSources {
    
    readonly positions: PositionsSource;
    readonly employees: EmployeesSource;
    readonly teams: TeamsSource;
    
}