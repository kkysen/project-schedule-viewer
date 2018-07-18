"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../util/cache");
const objectFields_1 = require("../../util/objectFields");
const Employee_1 = require("./Employee");
const Position_1 = require("./Position");
const Team_1 = require("./Team");
const dataAccessors = { positions: Position_1.positions, employees: Employee_1.employees, leaders: Employee_1.leaders, teams: Team_1.teams };
exports.data = cache_1.refreshableCache((source) => {
    const dataPromises = objectFields_1.objectFields.callEachArgs(dataAccessors, source);
    return objectFields_1.objectFields.awaitAll(dataPromises);
});
exports.getAppData = function (sources) {
    exports.data.refresh();
    return exports.data.get(sources);
};
//# sourceMappingURL=Data.js.map