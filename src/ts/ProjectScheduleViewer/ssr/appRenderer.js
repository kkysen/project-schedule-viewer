"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appClient_1 = require("../client/appClient");
const FileSystemDataSource_1 = require("../server/FileSystemDataSource");
const Data_1 = require("../share/data/Data");
const JsonData_1 = require("../share/data/JsonData");
const SsrRenderer_1 = require("./SsrRenderer");
exports.app = SsrRenderer_1.SsrRenderer.new({
    name: "app",
    getData: () => Data_1.getAppData(FileSystemDataSource_1.fileSystemDataSource),
    serialize: JsonData_1.dataToJsonData,
    loader: appClient_1.appLoader,
});
//# sourceMappingURL=appRenderer.js.map