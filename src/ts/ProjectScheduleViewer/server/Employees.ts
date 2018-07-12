import {All} from "../../util/All";
import {path} from "../../util/polyfills/path";
import {Employee, isLeader, makeEmployees, ParsedEmployee, TeamLeader} from "../share/Employee";
import {dir} from "./dir";
import {readWorkBookAsCsv, Row} from "./parse";
import {positions} from "./Positions";

interface Named {
    readonly name: string;
}

export interface Employees extends All<Employee, Named> {
    
    leaders(): ReadonlyArray<TeamLeader>;
    
}

const createEmployees = function(getter: () => Promise<ReadonlyArray<Employee>>): Employees {
    let _leaders: TeamLeader[] | undefined;
    const employees = All.of(async () => {
        _leaders = undefined;
        return await getter();
    }, {name: ""});
    return Object.assign(employees, {
        leaders: () => {
            return _leaders || employees.all().filter(isLeader);
        },
    });
};

const parseEmployee = function(row: Row): ParsedEmployee | undefined {
    const [i, lastName, firstName, level, isLeader] = row as [null | string, string, string, string, string];
    return i === null ? undefined : {
        lastName,
        firstName,
        level: parseInt(level),
        isLeader: isLeader === "Y", // FIXME check boolean format
    };
};

const fetchEmployees = async function(): Promise<ReadonlyArray<ParsedEmployee>> {
    const [, sheets] = await Promise.all([
        positions.refresh(),
        readWorkBookAsCsv(path.join(dir.data, "employees.xlsx")),
    ]);
    return sheets[0].slice(3).mapFilter(parseEmployee);
};

export const employees = createEmployees(async () => makeEmployees(await fetchEmployees()));