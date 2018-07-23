"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataToJsonData = function (data) {
    return data.mapFields(e => e.raw);
};
exports.dataToJson = function (data) {
    return JSON.stringify(exports.dataToJsonData(data));
};
//# sourceMappingURL=JsonData.js.map