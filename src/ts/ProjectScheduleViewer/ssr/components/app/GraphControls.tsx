import * as React from "react";
import {SFC} from "react";
import * as Button from "react-bootstrap/lib/Button";
import {Br} from "../../../../util/components/Br";
import {
    GraphAccessor,
    GraphAccessorArgs, GraphAccessorsAs,
    GraphControlIndices, GraphFilter, GraphOrder,
    Id, RawGraphFilter,
    SetGraphControls, SetGraphFilter, SetGraphOrder
} from "../../../../util/components/svg/graph/GraphAccessor";
import {Employee} from "../../../share/data/access/Employee";
import {Position} from "../../../share/data/access/Position";
import {Project, ProjectEmployee} from "../../../share/data/access/Project";
import {Team} from "../../../share/data/access/Team";
import {Data} from "../../../share/data/Data";
import {FilterControls} from "./FilterControls";
import {OrderControls} from "./OrderControls";

type AccessorArgs<T extends Id> = GraphAccessorArgs<ProjectEmployee, T>;

export interface AccessorsArgs {
    readonly employee: AccessorArgs<Employee>;
    readonly project: AccessorArgs<Project>;
    readonly team: AccessorArgs<Team>;
    readonly position: AccessorArgs<Position>;
}

export type Accessor<T extends Id = any> = GraphAccessor<ProjectEmployee, T>;

export type RawFilter = RawGraphFilter<ProjectEmployee>;

export type Order = GraphOrder<ProjectEmployee>;
export type Filter<T extends Id = any> = GraphFilter<ProjectEmployee, T>;

export type AccessorsAs<T> = GraphAccessorsAs<ProjectEmployee, T>;

export type SetOrder = SetGraphOrder<ProjectEmployee>;
export type SetFilter = SetGraphFilter<ProjectEmployee>;
export type SetControls = SetGraphControls<ProjectEmployee>;

export type ControlIndices = GraphControlIndices;

interface GraphControlsProps {
    readonly data: Data;
    readonly accessors: AccessorsArgs;
    readonly set: SetControls;
    readonly current: ControlIndices;
}

const Accessor = GraphAccessor;

export const GraphControls: SFC<GraphControlsProps> = ({data, accessors: accessorsArgs, set, current}) => {
    const accessors = Object.entries(accessorsArgs)
        .map(([key, value]) => ({key, value: Accessor.new(value as Accessor<any>)}));
    return <div style={{textAlign: "center"}}>
        <OrderControls orders={accessors} setOrder={set.order} currentIndex={current.orderIndex}/>
        <Br times={1}/>
        <FilterControls filters={accessors} data={data} setFilter={set.filter} currentIndex={current.filterIndex}/>
        <Br times={1}/>
        <Button onClick={set.reScale}>Re-Scale</Button>
    </div>;
};