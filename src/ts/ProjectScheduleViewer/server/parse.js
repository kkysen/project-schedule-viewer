"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("../../lib/xlsx");
exports.readWorkBook = async function (filename) {
    return xlsx_1.xlsx.readFile(filename);
};
exports.readWorkBookAsCsv = async function (filename) {
    const wb = await exports.readWorkBook(filename);
    return wb.SheetNames
        .map(name => wb.Sheets[name])
        .map(sheet => xlsx_1.xlsx.utils.sheet_to_json(sheet, {
        header: 1,
        defval: null,
        blankrows: true,
    }));
};
//# sourceMappingURL=parse.js.map