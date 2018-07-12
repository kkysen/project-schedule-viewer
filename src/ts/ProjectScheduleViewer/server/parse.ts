import {WorkBook} from "xlsx";
import {xlsx} from "../../lib/xlsx";

export const readWorkBook = async function(filename: string): Promise<WorkBook> {
    return xlsx.readFile(filename);
};

export type Row = (string | null)[];

export const readWorkBookAsCsv = async function(filename: string): Promise<Row[][]> {
    const wb = await readWorkBook(filename);
    return wb.SheetNames
        .map(name => wb.Sheets[name])
        .map(sheet => xlsx.utils.sheet_to_json<(string | null)[]>(sheet, {
            header: 1,
            defval: null,
            blankrows: true,
        }));
};