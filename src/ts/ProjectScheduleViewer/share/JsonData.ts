import {Difference} from "../../util/types/types";
import {AccessDatum, Data} from "./Data";
import {Employee, leaders, RawEmployee} from "./Employee";
import {RawPosition} from "./Position";
import {ProjectMonth, RawProjectEmployee} from "./Project";
import {RawTeam} from "./Team";

export interface JsonData {
    
    readonly positions: ReadonlyArray<RawPosition>;
    readonly employees: ReadonlyArray<RawEmployee>;
    readonly teams: ReadonlyArray<RawTeam>;
    
}

const convert = function(
    employees: ReadonlyArray<Employee>,
    months: ReadonlyArray<ProjectMonth>,
): ReadonlyArray<RawProjectEmployee> {
    return employees.map((e, i) => [
        e.id,
        months.map(m => m.employees[i].percentCommitted),
    ] as RawProjectEmployee);
};

// export const dataToJsonData = function({positions, employees, teams}: Data): JsonData {
//     return {
//         positions: positions
//             .all()
//             .map(e => Object.values(e) as RawPosition),
//         employees: employees
//             .all()
//             .map(({firstName, lastName, position: {level}, isLeader}) =>
//                 [firstName, lastName, level, isLeader ? 1 : 0] as RawEmployee),
//         teams: teams
//             .all()
//             .map(({projects}) => projects
//                 .map(({id, name, percentLikelihood, employees, months}) =>
//                     [id, name, convert(employees, months), percentLikelihood] as RawProject)
//             ),
//     };
// };

type OriginalData = Difference<Data, {leaders: AccessDatum<typeof leaders>}>;

export const dataToJsonData = function(data: OriginalData): JsonData {
    return data.mapFields(e => e.raw);
};

export const dataToJson = function(data: Data): string {
    return JSON.stringify(dataToJsonData(data));
};