const extensionsConfig = require("./src/ts/util/extensions/extensionsConfig");

extensionsConfig.writableExtensions = true;

const {configs} = require("./src/ts/ProjectScheduleViewer/webpack/config");

module.exports = configs;