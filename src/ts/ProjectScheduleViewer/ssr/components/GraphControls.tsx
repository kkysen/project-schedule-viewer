import * as React from "react";
import {SFC} from "react";
import {MapEntry} from "../../../util/collections/Map";
import {Br} from "../../../util/components/Br";
import {isBoolean} from "../../../util/types/isType";
import {Employee} from "../../share/data/access/Employee";
import {Position} from "../../share/data/access/Position";
import {Project, ProjectEmployee} from "../../share/data/access/Project";
import {Team} from "../../share/data/access/Team";
import {Data} from "../../share/data/Data";
import {FilterControls} from "./FilterControls";
import {OrderControls} from "./OrderControls";

export interface Id {
    readonly id: number;
}

interface AccessorArgs<T extends Id> {
    
    get(employee: ProjectEmployee): T;
    
    all(data: Data): ReadonlyArray<T>;
    
    name(t: T): string;
    
}

type GetAccessorArgsType<Args> = Args extends AccessorArgs<infer T> ? T : never;

export interface AccessorsArgs {
    readonly employee: AccessorArgs<Employee>;
    readonly project: AccessorArgs<Project>;
    readonly team: AccessorArgs<Team>;
    readonly position: AccessorArgs<Position>;
}

export type RawOrder = (employee: ProjectEmployee, i: number) => number;
export type RawFilter = (employee: ProjectEmployee) => boolean;

export interface Order {
    
    readonly order: RawOrder;
    
}

export interface Filter<T> {
    
    filter(include: ReadonlyArray<T> | boolean, exclude: ReadonlyArray<T> | boolean): RawFilter;
    
    all(data: Data): ReadonlyArray<T>;
    
    name(t: T): string;
    
}

interface Accessor<T extends Id> extends AccessorArgs<T>, Order, Filter<T> {
    
}

type Accessors = {[K in keyof AccessorsArgs]: Accessor<GetAccessorArgsType<AccessorsArgs[K]>>};

export type AccessorKey = keyof Accessors;

export type AccessorsAs<T> = Accessor<Id> extends T ? ReadonlyArray<MapEntry<string, T>> : never;


const Accessor = (() => {
    
    const has = function <T>(a: ReadonlyArray<T> | boolean): (t: T) => boolean {
        if (isBoolean(a)) {
            return () => a;
        }
        const set = new Set(a);
        return t => set.has(t);
    };
    
    return {
        
        new<T extends Id>({get, all, name}: AccessorArgs<T>): Accessor<T> {
            return {
                get,
                order: e => get(e).id,
                filter: (include, exclude) => {
                    const includes = has(include);
                    const excludes = has(exclude);
                    return employee => {
                        const t = get(employee);
                        return includes(t) && !excludes(t);
                    };
                },
                all,
                name,
            };
        },
        
    };
})();


export type SetOrder = (order: RawOrder, i: number) => void;
export type SetFilter = (filter: RawFilter, i: number) => void;


export interface SetControls {
    readonly order: SetOrder;
    readonly filter: SetFilter;
}

export interface ControlIndices {
    readonly orderIndex: number;
    readonly filterIndex: number;
}

interface GraphControlsProps {
    readonly data: Data;
    readonly accessors: AccessorsArgs;
    readonly set: SetControls;
    readonly current: ControlIndices;
}

export const GraphControls: SFC<GraphControlsProps> = ({data, accessors: accessorsArgs, set, current}) => {
    const accessors = Object.entries(accessorsArgs).map(([key, value]) => ({key, value: Accessor.new(value as Accessor<any>)}));
    return <div style={{textAlign: "center"}}>
        {/*<Br times={3}/>*/}
        <OrderControls orders={accessors} setOrder={set.order} currentIndex={current.orderIndex}/>
        <FilterControls filters={accessors} data={data} setFilter={set.filter} currentIndex={current.filterIndex}/>
    </div>;
};