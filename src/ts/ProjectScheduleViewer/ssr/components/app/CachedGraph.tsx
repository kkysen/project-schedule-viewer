import {scaleTime} from "d3-scale";
import {timeFormat} from "d3-time-format";
import * as React from "react";
import {ReactNode} from "react";
import {HashMap} from "../../../../util/collections/HashMap";
import {Map} from "../../../../util/collections/Map";
import {
    VariableAreaStack,
    VariableAreaStackData
} from "../../../../util/components/svg/graph/VariableAreaStack";
import {Scale} from "../../../../util/components/svg/utils";
import {EmployeeCommitment, ProjectEmployee} from "../../../share/data/access/Project";
import {Data} from "../../../share/data/Data";
import {Color} from "./Graph";
import {RawFilter, RawOrder} from "./GraphControls";

const prepareData = function(data: Data, filter: RawFilter): Map<Date, EmployeeCommitment[]> {
    const hash = (date: Date) => +date;
    const map = HashMap.perfectHash<Date, EmployeeCommitment[]>({
        keysHashEquals: {
            hash,
            equals: (t1, t2) => hash(t1) === hash(t2),
        },
    });
    data.teams.all
        .flatMap(e => e.projects._())
        .flatMap(e => e.dates._())
        .forEach(({date, employees}) =>
            map.getOrPutDefault(date.date, [])
                .addAll(employees.filter(e => filter(e.employee)))
        );
    return map;
};

export interface CachedGraphProps {
    data: Data;
    filter: RawFilter;
    order: RawOrder;
    color: Color;
    reScale: boolean;
}

type GraphData = VariableAreaStackData<EmployeeCommitment, Date, Date, ProjectEmployee>;
type Graph = ReturnType<GraphData>;

export const CachedGraph = function({data, filter, order, color}: CachedGraphProps) {
    // TODO reorganize
    
    const updateGraphData = (reScale: boolean): GraphData => VariableAreaStack({
        data: prepareData(data, filter),
        values: {
            x: d => d,
            y: d => d.percentCommitted * d.employee.project().percentLikelihood,
            z: d => d.employee,
        },
        flat: true,
        forceDomain: reScale ? undefined : graph.domain,
    });
    let graphData: GraphData = updateGraphData(true);
    
    const updateGraph = (): Graph => graphData({
        orderBy: order,
        scale: {
            x: scaleTime() as Scale<Date>,
        },
        axes: {
            x: (axis, xData) => axis
                .tickFormat(timeFormat("%B"))
                .ticks(xData.length)
            ,
        },
        axesNames: {
            x: "Month",
            y: "Number of Employees",
        },
        size: {width: 1000, height: 400},
        margins: {left: 50, top: 50, right: 50, bottom: 50},
    });
    let graph = updateGraph();
    
    const updateNode = (): ReactNode => graph.render({
        color: (e, i) => color(order(e, i)),
    });
    let node: ReactNode = updateNode();
    
    return (props: CachedGraphProps) => {
        const sameGraphData = props.data === data && props.filter === filter && !props.reScale;
        if (!sameGraphData) {
            data = props.data;
            filter = props.filter;
            graphData = updateGraphData(props.reScale);
        }
        
        const sameGraph = props.order === order;
        if (!sameGraphData || !sameGraph) {
            order = props.order;
            graph = updateGraph();
        }
        
        const sameNode = props.color === color;
        if (!sameGraphData || !sameGraph || !sameNode) {
            color = props.color;
            node = updateNode();
        }
        
        return node;
    };
};

export type CachedGraph = ReturnType<typeof CachedGraph>;