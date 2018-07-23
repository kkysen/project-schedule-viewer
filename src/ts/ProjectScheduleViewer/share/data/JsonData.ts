import {AccessDatum} from "../../../util/data/DataAccessor";
import {Difference} from "../../../util/types/types";
import {Data} from "./Data";
import {leaders, RawEmployee} from "./access/Employee";
import {RawPosition} from "./access/Position";
import {RawTeam} from "./access/Team";

export interface JsonData {
    
    readonly positions: ReadonlyArray<RawPosition>;
    readonly employees: ReadonlyArray<RawEmployee>;
    readonly teams: ReadonlyArray<RawTeam>;
    
}

type OriginalData = Difference<Data, {leaders: AccessDatum<typeof leaders>}>;

export const dataToJsonData = function(data: OriginalData): JsonData {
    return data.mapFields(e => e.raw);
};

export const dataToJson = function(data: Data): string {
    return JSON.stringify(dataToJsonData(data));
};