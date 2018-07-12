import * as React from "react";
import {hydrate, render} from "react-dom";
import {App, appId} from "../server/ssr/components/App";
import {getAppDataRemote} from "../server/ssr/ssr";

export const loadApp = function(): void {
    const appRoot = document.getElementById(appId);
    if (appRoot) {
        hydrate(<App/>, appRoot);
    } else {
        const appRoot = document.body.appendDiv();
        appRoot.id = appId;
        render(<App dataPromise={getAppDataRemote()}/>, appRoot);
    }
};