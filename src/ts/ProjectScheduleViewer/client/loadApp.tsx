import * as React from "react";
import {hydrate, render} from "react-dom";
import {anyWindow} from "../../util/anyWindow";
import {getAppData} from "../share/Data";
import {jsonDataSource} from "../share/JsonDataSource";
import {App, appId} from "../ssr/components/App";
import {api} from "./api";

export const loadApp = async function(): Promise<void> {
    const data = anyWindow.appData ? await getAppData(jsonDataSource) : await api.getAppData();
    
    const appContainer = document.body.appendDiv();
    let appRoot = document.getElementById(appId);
    if (1 === 1 && appRoot) {
        appRoot.remove();
        appRoot = null;
    }
    if (appRoot) {
        console.log("hydrating");
        appRoot.remove();
        appContainer.appendChild(appRoot);
        hydrate(<App data={data}/>, appContainer);
    } else {
        console.log("rendering");
        render(<App data={data}/>, appContainer);
    }
};