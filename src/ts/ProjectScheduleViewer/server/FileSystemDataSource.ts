import * as fs from "fs-extra";
import {path} from "../../util/polyfills/path";
import {DataSources} from "../share/DataSources";
import {Employees, RawEmployee, TeamLeader} from "../share/Employee";
import {Months} from "../share/Month";
import {positions, RawPosition} from "../share/Position";
import {RawProject, RawProjectEmployee} from "../share/Project";
import {dir} from "./dir";
import {readWorkBookAsCsv, Row} from "./parse";


const parseEmployee = function(row: Row): RawEmployee | undefined {
    const [i, lastName, firstName, level, isLeader] = row as [null | string, string, string, string, string];
    return i === null ? undefined : [
        firstName,
        lastName,
        parseInt(level),
        isLeader === "Y" ? 1 : 0, // FIXME check boolean format
    ];
};


const parseProject = function(employees: Employees) {
    
    const parseProjectEmployees = function* (rows: Row[]): IterableIterator<RawProjectEmployee> {
        for (const row of rows.slice(6)) {
            const [, , , , , name, ...months] = row;
            if (name === null) {
                return;
            }
            const employee = employees.by.name(name);
            if (!employee) {
                continue;
            }
            yield [
                employee.id,
                months.slice(0, Months.length).map(e => e ? parseInt(e.slice(0, -1)) : 0),
            ];
        }
    };
    
    return (rows: Row[]): RawProject => {
        const [id, name] = rows[2] as string[];
        const percentLikelihood = parseInt(
            (rows.find(row => row[1] === "%AGE LIKELIHOOD:") as string[])
                [5].slice(0, -1)
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
    
    teams: ({leaders, employees}) => leaders.all._()
        .asyncMap(async leader =>
            (await readWorkBookAsCsv(path.join(dir.data, "teams", `${leader.name}.xlsx`),))
                .map(parseProject(employees))
        ),
    
};