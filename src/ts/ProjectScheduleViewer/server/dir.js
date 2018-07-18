"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("../../util/polyfills/path");
const dirParts = path_1.path.parse(__filename).dir.split(path_1.path.sep);
while (!fs.existsSync(path_1.path.join(...dirParts, ".git"))) {
    dirParts.pop();
}
var dir;
(function (dir) {
    dir.root = path_1.path.join(...dirParts);
    dir.dist = path_1.path.join(dir.root, "dist");
    dir.src = path_1.path.join(dir.root, "src");
    dir.data = path_1.path.join(dir.src, "data");
    dir.test = path_1.path.join(dir.src, "ts", "ProjectScheduleViewer", "server", "test", "data");
})(dir = exports.dir || (exports.dir = {}));
//# sourceMappingURL=dir.js.map