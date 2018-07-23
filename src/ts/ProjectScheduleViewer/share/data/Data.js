"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataAccessor_1 = require("./access/DataAccessor");
const Employee_1 = require("./access/Employee");
const Position_1 = require("./access/Position");
const Team_1 = require("./access/Team");
const dataAccessors = { positions: Position_1.positions, employees: Employee_1.employees, leaders: Employee_1.leaders, teams: Team_1.teams };
exports.data = DataAccessor_1.DataAccessor.data(dataAccessors);
exports.getAppData = function (sources) {
    exports.data.refresh();
    return exports.data.get(sources);
};
//# sourceMappingURL=Data.js.map