import {ParsingOptions, WorkBook} from "xlsx";
import {xlsx} from "./xlsx";

/**
 * xlsx uses synchronous IO functions,
 * which makes it really slow,
 * so this an async wrapper on top of xlsx
 * that uses a sandboxed worker process
 * to run the xlsx code synchronously
 * without blocking the main process.
 */
export namespace xlsxAsync {
    
    export const readFile = async function(filename: string, opts?: ParsingOptions): Promise<WorkBook> {
        // TODO actually implement it
        return xlsx.readFile(filename, opts);
    };
    
}