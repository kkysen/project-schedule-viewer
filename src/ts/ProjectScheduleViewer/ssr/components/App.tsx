import * as React from "react";
import {SFC} from "react";
import {globals} from "../../../util/anyWindow";
import {Data} from "../../share/data/Data";
import {Graph} from "./Graph";
import {ProjectTables} from "./ProjectTables";


export const appId = "app";


export const App: SFC<{data: Data}> = ({data}) => {
    globals({data});
    return <div id={appId} style={{margin: 25}}>
        <Graph data={data}/>
        <ProjectTables data={data}/>
        <button onClick={() => console.log(data)}>Button</button>
    </div>;
};