import {EmployeesSource} from "../access/Employee";
import {PositionsSource} from "../access/Position";
import {TeamsSource} from "../access/Team";

export interface DataSources {
    
    readonly positions: PositionsSource;
    readonly employees: EmployeesSource;
    readonly teams: TeamsSource;
    
}