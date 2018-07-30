"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../../../util/cache/cache");
const ClientLoader_1 = require("../../../../util/ssr/ClientLoader");
exports.jsonDataSource = () => ClientLoader_1.getClientJsonData()
    .mapFields(e => cache_1.getter(e));
//# sourceMappingURL=JsonDataSource.js.map