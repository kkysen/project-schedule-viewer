"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert = function (employees, months) {
    return employees.map((e, i) => [
        e.id,
        months.map(m => m.employees[i].percentCommitted),
    ]);
};
exports.dataToJsonData = function (data) {
    return data.mapFields(e => e.raw);
};
exports.dataToJson = function (data) {
    return JSON.stringify(exports.dataToJsonData(data));
};
//# sourceMappingURL=JsonData.js.map