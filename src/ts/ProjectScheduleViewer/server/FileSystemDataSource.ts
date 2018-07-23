import * as fs from "fs-extra";
import {path} from "../../util/polyfills/path";
import {boolAsInt} from "../../util/utils";
import {Row} from "../../util/xlsx";
import {DataSources} from "../share/data/source/DataSources";
import {Employee, Employees, genericEmployeeName, RawEmployee} from "../share/data/access/Employee";
import {Months} from "../share/data/access/Month";
import {Position, Positions, positions, RawPosition} from "../share/data/access/Position";
import {RawProject, RawProjectEmployee} from "../share/data/access/Project";
import {dir} from "./dir";
import {readWorkBookAsCsv} from "../../util/xlsx";


type string$ = string | null;


const parseEmployee = function(row: Row): RawEmployee | undefined {
    const [i, lastName, firstName, level, isLeader] = row as [string$, string, string, string, string];
    return i === null ? undefined : [
        firstName,
        lastName,
        parseInt(level),
        boolAsInt(isLeader === "Y"),
    ];
};


const parseProject = function(employees: Employees, positions: Positions) {
    
    const parsePercent = function(defaultPercent: number = 0.00) {
        return (s: string | null | undefined): number => {
            if (!s) {
                return defaultPercent;
            }
            const percent = parseFloat(s.slice(0, -1));
            return !percent ? defaultPercent : 0.01 * percent;
        };
    };
    
    const GENERIC_EMPLOYEE_NAME = "Staff ??";
    
    const employeeByName = function(name: string$, levelString: string$, rateString: string$): Employee | undefined {
        if (!name) {
            return;
        }
        const employee = employees.by.name(name);
        if (employee) {
            return employee;
        }
        if (name !== GENERIC_EMPLOYEE_NAME) {
            return;
        }
        const level = parseInt(levelString!);
        if (!level) {
            return;
        }
        const position = positions.by.level(level);
        if (!position) {
            return;
        }
        return employees.by.name(genericEmployeeName(position));
    };
    
    const parseProjectEmployees = function* (rows: Row[]): IterableIterator<RawProjectEmployee> {
        for (const row of rows.slice(6)) {
            const [, , , level, rate, name, ...months] = row;
            const employee = employeeByName(name, level, rate);
            if (!employee) {
                continue;
            }
            yield [
                employee.id,
                months.slice(0, Months.length).map(parsePercent()),
            ];
        }
    };
    
    return (rows: Row[]): RawProject => {
        const [id, name] = rows[2] as string[];
        const percentLikelihood = parsePercent()(
            rows.find(row => row[1] === "%AGE LIKELIHOOD:")![5]
        );
        
        return [
            parseInt(id),
            name,
            [...parseProjectEmployees(rows)],
            percentLikelihood,
        ];
    };
    
};

export const fileSystemDataSource: DataSources = {
    
    positions: async () => {
        const buffer = await fs.readFile(path.join(dir.data, "positions.csv"));
        const trim = (s: string) => s.trim();
        const csv = buffer
            .toString("utf8")
            .trim()
            .split("\n")
            .map(trim)
            .map(line => line.split(",").map(trim));
        return csv
            .map(([level, name, rate]) => [parseInt(level), name, parseInt(rate)] as RawPosition);
    },
    
    employees: async () => {
        const [sheet] = await readWorkBookAsCsv(path.join(dir.data, "employees.xlsx"));
        return sheet.slice(3).mapFilter(parseEmployee);
    },
    
    teams: ({leaders, employees, positions}) => leaders.all._()
        .asyncMap(async leader =>
            (await readWorkBookAsCsv(path.join(dir.data, "teams", `${leader.name}.xlsx`),))
                .map(parseProject(employees, positions))
        ),
    
};