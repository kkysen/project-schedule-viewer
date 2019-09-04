import {schemeSet3} from "d3-scale-chromatic";
import * as React from "react";
import {Component, MouseEvent, ReactNode} from "react";
import {Range} from "../../../../util/collections/Range";
import {GraphControlIndices} from "../../../../util/components/svg/graph/GraphAccessor";
import {doubleEvent} from "../../../../util/events/multiEvent";
import {moduloIndexer} from "../../../../util/misc/utils";
import {Data} from "../../../share/data/Data";
import {CachedGraph, CachedGraphProps} from "./CachedGraph";
import {Accessor, AccessorsArgs, GraphControls, Order, RawFilter, SetControls} from "./GraphControls";
import {indexOrder, noFilter} from "./OrderControls";

interface GraphProps {
    data: Data;
}

export type Color = (i: number) => string;

interface GraphState extends GraphControlIndices {
    
    color: Color;
    order: Order;
    filter: RawFilter;
    reScale: boolean;
    
}

const accessors: AccessorsArgs = {
    employee: {
        get: e => e.employee,
        all: data => data.employees.all,
        name: e => e.name,
    },
    project: {
        get: e => e.project(),
        all: data => data.teams.all.flatMap(e => e.projects._()),
        name: e => e.name,
    },
    team: {
        get: e => e.project().team(),
        all: data => data.teams.all,
        name: e => e.leader.name,
    },
    position: {
        get: e => e.employee.position,
        all: data => data.positions.all,
        name: e => e.name,
    },
};

export class Graph extends Component<GraphProps, GraphState> {
    
    private readonly baseColor = moduloIndexer(schemeSet3);
    
    public readonly state: GraphState = {
        color: this.baseColor,
        order: indexOrder,
        orderIndex: -1,
        filter: noFilter,
        filterIndex: -1,
        reScale: false,
    };
    
    private readonly set: SetControls = {
        order: (order, orderIndex) => this.setState({order, orderIndex}),
        filter: (filter, filterIndex) => this.setState({filter, filterIndex}),
        reScale: () => this.setState({reScale: true},
            () => this.state.reScale = false), // revert back right after
    };
    
    private graph?: CachedGraph;
    
    public render(): ReactNode {
        const {props, state} = this;
        const {data} = props;
        const {color, order, filter, reScale} = state;
        
        if (Range.closed(1, 3).has(state.orderIndex)) {
            const onClick = doubleEvent<MouseEvent<SVGPathElement>>()(
                () => {
                },
                () => {
                },
            );
        }
        
        const graphProps: CachedGraphProps = {data, filter, order, color, reScale};
        const graphNode = (this.graph || (this.graph = CachedGraph(graphProps)))(graphProps);
        
        return <>
            <GraphControls accessors={accessors} data={data} set={this.set} current={state}/>
            {graphNode}
        </>;
    }
    
}