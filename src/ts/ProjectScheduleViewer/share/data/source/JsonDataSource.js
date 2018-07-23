"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anyWindow_1 = require("../../../../util/anyWindow");
const cache_1 = require("../../../../util/cache");
const jsonData = JSON.parse(anyWindow_1.anyWindow.appData);
// const jsonData: JsonData = fs.readJsonSync(path.join(dir.test, "appData.json"));
exports.jsonDataSource = jsonData.mapFields(e => cache_1.getter(e));
//# sourceMappingURL=JsonDataSource.js.map