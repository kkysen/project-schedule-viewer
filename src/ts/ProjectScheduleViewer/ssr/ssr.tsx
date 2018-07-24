import * as fs from "fs-extra";
import * as React from "react";

import {renderToString} from "react-dom/server";
import {compression} from "../../lib/gzip";
import {withFauxDom} from "../../util/dom/faux/withFauxDom";
import {MaybePromise} from "../../util/MaybePromise";
import {path} from "../../util/polyfills/path";
import {production} from "../../util/production";
import {Range} from "../../util/Range";
import {gzipped} from "../server/config";
import {dir} from "../server/dir";
import {fileSystemDataSource} from "../server/FileSystemDataSource";
import {getAppData} from "../share/data/Data";
import {dataToJson} from "../share/data/JsonData";
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
    const quote = production ? `` : `"`;
    const insertionPoint = `<div id=${quote}not-${appId}${quote}></div>`;
    const [before, after] = template.split(insertionPoint);
    console.time("rendering");
    const html = [
        before,
        `<script>window.appData = '${dataToJson(data)}'</script>`,
        renderToString(<App data={data}/>),
        after,
    ].join("");
    console.timeEnd("rendering");
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

export const warmUpAppRenderer = function(repetitions: number = 10): () => Promise<void> {
    return () => Range.new(repetitions).toArray().asyncMap(reRenderApp)
        .then(() => undefined);
};