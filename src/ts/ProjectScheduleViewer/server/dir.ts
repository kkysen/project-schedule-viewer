import * as fs from "fs";
import {path} from "../../util/polyfills/path";

const dirParts = path.parse(__filename).dir.split(path.sep);
while (!fs.existsSync(path.join(...dirParts, ".git"))) {
    dirParts.pop();
}

export namespace dir {
    
    export const root: string = path.join(...dirParts);
    export const dist: string = path.join(root, "dist");
    export const src: string = path.join(root, "src");
    export const data: string = path.join(src, "data");
    export const test: string = path.join(src, "ts", "ProjectScheduleViewer", "server", "test", "data");
    
}