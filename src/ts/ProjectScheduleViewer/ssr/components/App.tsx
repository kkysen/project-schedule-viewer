import {scaleTime} from "d3-scale";
import {timeFormat} from "d3-time-format";
import * as React from "react";
import {SFC} from "react";
import {identity} from "../../../util/functional/utils";
import {Data} from "../../share/Data";
import {ProjectTables} from "./ProjectTables";
import {AreaStack, Scale} from "./svg/AreaStack";


export const appId = "app";


export const App: SFC<{data: Data}> = ({data}) => <div id={appId}>
    {AreaStack({
        data: [
            {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
            {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
            {month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, dates: 400},
            {month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, dates: 400},
            {month: new Date(2015, 4, 1), apples: 10000, bananas: 8000, cherries: 9000, dates: 7000},
        ],
        xKey: "month",
        values: {
            month: identity,
            apples: identity,
            bananas: identity,
            cherries: identity,
            dates: identity,
        },
        scale: {
            x: scaleTime() as Scale<Date>,
        },
        axes: {
            x: (axis, xData) => axis.tickFormat(timeFormat("%B")).ticks(xData.length),
        },
        size: {width: 600, height: 300},
        margin: {left: 50, top: 50, right: 50, bottom: 50},
    })}
    
    <ProjectTables data={data}/>
    <button onClick={() => console.log(data)}>Button</button>
</div>;