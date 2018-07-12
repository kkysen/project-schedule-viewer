import {Employee, TeamLeader} from "./Employee";
import {Project} from "./Project";

export interface Team {
    
    readonly leader: TeamLeader;
    readonly projects: ReadonlyArray<Project>;
    
}