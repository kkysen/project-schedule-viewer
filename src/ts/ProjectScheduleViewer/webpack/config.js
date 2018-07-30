"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allExtensions_1 = require("../../util/extensions/allExtensions");
const path_1 = require("../../util/polyfills/path");
const dir_1 = require("../server/dir");
const renderers_1 = require("../ssr/renderers");
const loaders_1 = require("./loaders");
const optimization_1 = require("./optimization");
const plugins_1 = require("./plugins");
const production_1 = require("./production");
allExtensions_1.addExtensions();
const clients = renderers_1.renderers.webpackEntry();
const servers = {
    server: "server.ts",
};
const commonConfig = {
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: loaders_1.loaders,
    cache: true,
    mode: production_1.productionMode,
};
const entryFor = function ({ base, entry }) {
    return entry.mapFields(e => path_1.path.join(base, e));
};
exports.configFor = function (target) {
    const isWeb = ["web", "webworker"].includes(target);
    return {
        ...commonConfig,
        target,
        node: !isWeb ? false : {
            fs: "empty",
            net: "empty",
        },
        entry: entryFor(isWeb
            ? { base: dir_1.dir.client, entry: clients }
            : { base: dir_1.dir.server, entry: servers }),
        output: {
            filename: "[name].js",
            path: isWeb ? dir_1.dir.clientDist : dir_1.dir.serverDist,
        },
        optimization: optimization_1.optimization(isWeb),
        plugins: plugins_1.plugins(isWeb),
    };
};
exports.webConfig = exports.configFor("web");
exports.nodeConfig = exports.configFor("node");
exports.configs = [exports.webConfig, exports.nodeConfig];
//# sourceMappingURL=config.js.map