import {scaleTime} from "d3-scale";
import {schemeCategory10} from "d3-scale-chromatic";
import {timeFormat} from "d3-time-format";
import * as React from "react";
import {Component, ReactNode} from "react";
import {HashMap} from "../../../util/collections/HashMap";
import {Map} from "../../../util/collections/Map";
import {VariableAreaStack} from "../../../util/components/svg/graph/VariableAreaStack";
import {Scale} from "../../../util/components/svg/utils";
import {moduloIndexer} from "../../../util/utils";
import {EmployeeCommitment} from "../../share/data/access/Project";
import {Data} from "../../share/data/Data";
import {AccessorsArgs, ControlIndices, GraphControls, RawFilter, RawOrder, SetControls} from "./GraphControls";
import {indexOrder} from "./OrderControls";

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

type Color = (i: number) => string;

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
    
    private readonly baseColor = moduloIndexer(schemeCategory10);
    
    public readonly state: GraphState = {
        color: this.baseColor,
        order: indexOrder,
        orderIndex: 0,
        filter: () => true,
        filterIndex: 0,
    };
    
    private readonly set: SetControls = {
        order: (order, orderIndex) => this.setState({order, orderIndex}),
        filter: (filter, filterIndex) => this.setState({filter, filterIndex}),
    };
    
    public render(): ReactNode {
        const {props, state} = this;
        const {data} = props;
        const {color, order, filter} = state;
        
        return <>
            <GraphControls accessors={accessors} data={data} set={this.set} current={state}/>
            {VariableAreaStack({
                data: prepareData(data, filter),
                values: {
                    x: d => d,
                    y: d => d.percentCommitted * d.employee.project().percentLikelihood,
                    z: d => d.employee,
                },
                orderBy: order,
                flat: true,
                color: (e, i) => color(order(e, i)),
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
                size: {width: 1000, height: 500},
                margins: {left: 50, top: 50, right: 50, bottom: 50},
            })}
        </>;
    }
    
}