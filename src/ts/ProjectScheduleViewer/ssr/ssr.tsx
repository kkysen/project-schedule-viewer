import * as fs from "fs-extra";
import * as React from "react";

import {renderToString} from "react-dom/server";
import {compression} from "../../lib/gzip";
import {MaybePromise} from "../../util/MaybePromise";
import {path} from "../../util/polyfills/path";
import {dir} from "../server/dir";
import {fileSystemDataSource} from "../server/FileSystemDataSource";
import {gzipped} from "../server/server";
import {getAppData} from "../share/Data";
import {dataToJson} from "../share/JsonData";
import {App, appId} from "./components/App";


const readTemplate = async function(): Promise<string> {
    const buffer = await fs.readFile(path.join(dir.dist, "ProjectScheduleViewer.html"));
    return buffer.toString("utf8");
};

interface RenderedApp {
    readonly html: Buffer | string;
    readonly gzipped: boolean;
}

const renderApp = async function(): Promise<RenderedApp> {
    const [template, data] = await Promise.all([readTemplate(), getAppData(fileSystemDataSource)]);
    const insertionPoint = `<div id="not-${appId}"></div>`;
    const [before, after] = template.split(insertionPoint);
    console.log("rendering");
    const html = [
        before,
        `<script>window.appData = '${dataToJson(data)}'</script>`,
        renderToString(<App data={data}/>),
        after,
    ].join("");
    (async () => {
        await fs.writeFile(path.join(dir.test, "index.html"), html);
    })();
    return {
        gzipped,
        html: gzipped ? await compression.gzip(html) : html,
    };
};

let renderedApp: RenderedApp | undefined;
let renderedAppPromise: Promise<RenderedApp> = renderApp().then(app => renderedApp = app);

export const reRenderApp = async function(): Promise<RenderedApp> {
    renderedAppPromise = renderApp();
    return renderedApp = await renderedAppPromise;
};

export const getRenderedApp = function(): MaybePromise<RenderedApp> {
    return renderedApp || renderedAppPromise;
};