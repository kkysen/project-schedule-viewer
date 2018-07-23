import * as React from "react";
import {SFC} from "react";
import {animate} from "../../../util/animate";
import {anyWindow, globals, isBrowser} from "../../../util/anyWindow";
import {moduloIndexer} from "../../../util/utils";
import {Data} from "../../share/data/Data";
import {Graph} from "./Graph";
import {ProjectTables} from "./ProjectTables";


export const appId = "app";


export const App: SFC<{data: Data}> = ({data}) => {
    globals({data});
    return <div id={appId}>
        <Graph data={data}/>
        <ProjectTables data={data}/>
        <button onClick={() => console.log(data)}>Button</button>
    </div>;
};

if (isBrowser) {
    anyWindow.start = () => {
        const bys = moduloIndexer(["index", "employee", "project", "team", "position"]);
        anyWindow.stop = animate(i => anyWindow.by = bys(i));
    };
}