import {schemeSet3} from "d3-scale-chromatic";
import * as React from "react";
import {Component, MouseEvent, ReactNode} from "react";
import {HashMap} from "../../../util/collections/HashMap";
import {Map} from "../../../util/collections/Map";
import {doubleEvent} from "../../../util/multiEvent";
import {Range} from "../../../util/Range";
import {moduloIndexer} from "../../../util/utils";
import {EmployeeCommitment} from "../../share/data/access/Project";
import {Data} from "../../share/data/Data";
import {CachedGraph, CachedGraphProps} from "./CachedGraph";
import {AccessorsArgs, ControlIndices, GraphControls, RawFilter, RawOrder, SetControls} from "./GraphControls";
import {indexOrder, noFilter} from "./OrderControls";

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
        .flatMap(e => e.months._())
        .forEach(({month, employees}) =>
            map.getOrPutDefault(month.date, [])
                .addAll(employees.filter(e => filter(e.employee)))
        );
    return map;
};


interface GraphProps {
    data: Data;
}

export type Color = (i: number) => string;

interface GraphState extends ControlIndices {
    
    color: Color;
    order: RawOrder;
    filter: RawFilter;
    
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
    };
    
    private readonly set: SetControls = {
        order: (order, orderIndex) => this.setState({order, orderIndex}),
        filter: (filter, filterIndex) => this.setState({filter, filterIndex}),
    };
    
    private graph?: CachedGraph;
    
    public render(): ReactNode {
        const {props, state} = this;
        const {data} = props;
        const {color, order, filter} = state;
        
        if (Range.closed(1, 3).has(state.orderIndex)) {
            const onClick = doubleEvent<MouseEvent<SVGPathElement>>()(
                () => {
                },
                () => {
                },
            );
        }
        
        const graphProps: CachedGraphProps = {data, filter, order, color};
        const graphNode = (this.graph || (this.graph = CachedGraph(graphProps)))(graphProps);
        
        return <>
            <GraphControls accessors={accessors} data={data} set={this.set} current={state}/>
            {graphNode}
        </>;
    }
    
}