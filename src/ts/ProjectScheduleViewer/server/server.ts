import {Request, Response} from "express";
import * as fs from "fs-extra";
import {addExtensions} from "../../util/extensions/allExtensions";
import {path} from "../../util/polyfills/path";
import {inProduction} from "../../util/production";
import {getRenderedApp, reRenderApp, warmUpAppRenderer} from "../ssr/ssr";
import {gzipped} from "./config";
import {dir} from "./dir";
import e = require("express");

addExtensions();

const app = e();

const setGzipHeaders = function(response: Response, type: "html" | "js", gzipped: boolean): void {
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

app.get("/", async (request: Request, response: Response) => {
    try {
        await reRenderApp(); // TODO for debugging
        const {html, gzipped} = await getRenderedApp();
        setGzipHeaders(response, "html", gzipped);
        response.send(html);
    } catch (e) {
        console.error(e);
    }
});

(async () => {
    (await fs.readdir(dir.dist))
        .filter(e => e.endsWith("js"))
        .forEach(file => {
            app.get(`/${file}`, (request: Request, response: Response) => {
                setGzipHeaders(response, "js", gzipped);
                response.sendFile(path.join(dir.dist, `${file}${gzipped ? ".gz" : ""}`));
            });
        });
})();

// force v8 to compile and optimize
inProduction(warmUpAppRenderer(10));

app.listen(8000, () => console.log("listening"));