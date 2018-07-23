"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../util/functional/utils");
const DataAccessor_1 = require("./DataAccessor");
exports.positions = DataAccessor_1.DataAccessor.new({
    source: e => e.positions,
    parse: ([level, name, rate]) => ({ level, name, rate }),
    create: utils_1.identity,
    by: { level: 0 },
}, {});
//# sourceMappingURL=Position.js.map