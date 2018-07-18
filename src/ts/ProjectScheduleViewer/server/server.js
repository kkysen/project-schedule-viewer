"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const allExtensions_1 = require("../../util/extensions/allExtensions");
const path_1 = require("../../util/polyfills/path");
const ssr_1 = require("../ssr/ssr");
const dir_1 = require("./dir");
const e = require("express");
allExtensions_1.addExtensions();
const app = e();
exports.gzipped = false; // TODO
const setGzipHeaders = function (response, type, gzipped) {
    console.log(type);
    if (!gzipped) {
        return;
    }
    response.setHeader("Vary", "Accept-Encoding");
    for (const [key, value] of Object.entries({
        Vary: "Accept-Encoding",
        "Content-Encoding": "gzip",
        "Content-Type": {
            "html": "text/html",
            "js": "text/javascript",
        }[type],
    })) {
        response.setHeader(key, value);
    }
};
app.get("/", async (request, response) => {
    try {
        await ssr_1.reRenderApp(); // TODO for debugging
        const { html, gzipped } = await ssr_1.getRenderedApp();
        setGzipHeaders(response, "html", gzipped);
        response.send(html);
    }
    catch (e) {
        console.error(e);
    }
});
(async () => {
    (await fs.readdir(dir_1.dir.dist))
        .filter(e => e.endsWith("js"))
        .forEach(file => {
        app.get(`/${file}`, (request, response) => {
            setGzipHeaders(response, "js", exports.gzipped);
            response.sendFile(path_1.path.join(dir_1.dir.dist, `${file}${exports.gzipped ? ".gz" : ""}`));
        });
    });
})();
app.listen(8000, () => console.log("listening"));
//# sourceMappingURL=server.js.map