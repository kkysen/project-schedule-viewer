import * as fs from "fs-extra";
import * as React from "react";

import {renderToString} from "react-dom/server";
import {path} from "../../../util/polyfills/path";
import {dir} from "../dir";
import {employees} from "../Employees";
import {teams} from "../Teams";
import {App, AppData} from "./components/App";

export const appData: AppData = {
    employees,
    teams,
};

const getAppData = async function(): Promise<AppData> {
    await teams.refresh();
    return appData;
};

export const getAppDataRemote = async function(): Promise<AppData> {
    return await getAppData();
    // TODO load over network
};

const readTemplate = async function(): Promise<string> {
    const buffer = await fs.readFile(path.join(dir.dist, "ProjectScheduleViewer.html"));
    return buffer.toString("utf8");
};

const renderApp = async function(): Promise<string> {
    const [template, data] = await Promise.all([readTemplate(), getAppData()]);
    const insertionPoint = "</body>";
    const [before, after] = template.split(insertionPoint);
    return [
        before,
        renderToString(<App data={data}/>),
        insertionPoint,
        after,
    ].join("");
};

let renderedApp: Promise<string> = renderApp();

export const reRenderApp = async function(): Promise<string> {
    return renderedApp = renderApp();
};

export const getRenderedApp = function(): Promise<string> {
    return renderedApp;
};