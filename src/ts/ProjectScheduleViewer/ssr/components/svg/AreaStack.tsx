import * as classNames from "classnames";
import {extent} from "d3-array";
import {Axis, axisBottom, AxisDomain, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {area, CurveFactory, Series, SeriesPoint, stack, stackOffsetNone, stackOrderNone} from "d3-shape";
import * as React from "react";
import {Component, ComponentClass, createElement, ReactNode} from "react";
import {Modifier} from "../../../../util/functional/Modifier";
import {identity} from "../../../../util/functional/utils";
import {isArray} from "../../../../util/types/isType";
import {Axes} from "./Axes";
import {translate} from "./utils";

type Accessor<T, Datum> = (d: Datum, i: number) => T;

type GetKey<T, XKey> = Exclude<keyof T, XKey>;
type StackOrder<T, Key> = (series: Series<T, Key>) => number[];
type StackOffset<T, Key> = (series: Series<T, Key>, order: number[]) => void;

type Numeric = number | {valueOf(): number};

export interface Scale<Domain extends AxisDomain> {
    
    range(): number[];
    
    range(range: ReadonlyArray<number>): this;
    
    domain(): Domain[];
    
    domain(domain: ReadonlyArray<Domain>): this;
    
    (x: Domain): number;
    
    copy(): this;
    
    bandwidth?(): number;
    
}

interface AreaStackProps<T, XKey extends keyof T, XDomain extends Numeric> {
    data: ReadonlyArray<T>;
    xKey: XKey;
    values: {[K in keyof T]: (d: T[K], i: number) => K extends XKey ? XDomain : number};
    order?: StackOrder<T, GetKey<T, XKey>>;
    offset?: StackOffset<T, GetKey<T, XKey>>;
    color?: string[] | ((i: number) => string);
    scale?: {
        x?: Scale<XDomain>;
        y?: Scale<number>;
    };
    axes?: {
        x?: (axis: Axis<XDomain>, xData: ReadonlyArray<T[XKey]>) => Axis<XDomain>;
        y?: (axis: Axis<number>, data: ReadonlyArray<T>) => Axis<number>;
    };
    size: {
        width: number;
        height: number;
    };
    margin: {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    };
    curve?: CurveFactory;
    defined?: Accessor<boolean, T>;
    glyph?: (t: T[XKey], i: number, a: T[XKey][]) => ReactNode;
    reverse?: boolean;
    className?: string;
}

// allows me to specify generics easier
// generic components work in typescript, but not WebStorm yet
export const AreaStack = function <T, XKey extends keyof T, XDomain extends Numeric>(
    {
        data,
        xKey,
        values,
        order = stackOrderNone,
        offset = stackOffsetNone,
        color = ["red", "blue", "green"],
        scale: {
            x: xScale = scaleLinear() as any as Scale<XDomain>,
            y: yScale = scaleLinear() as Scale<number>,
        } = {},
        axes: {
            x: xAxis = identity,
            y: yAxis = identity,
        } = {},
        size: {width, height},
        margin: {left = 0, top = 0, bottom = 0, right = 0},
        className,
        curve,
        defined,
        glyph,
        reverse = false,
    }: AreaStackProps<T, XKey, XDomain>): ReactNode {
    type X = T[XKey];
    
    if (data.length === 0) {
        return;
    }
    
    const outerWidth = width + left + right;
    const outerHeight = height + top + bottom;
    
    const xData: X[] = data.map(d => d[xKey]);
    const xValues: XDomain[] = xData.map(values[xKey] as (d: X, i: number) => XDomain);
    
    const yValues = values as {[K in keyof T]: (d: T[K], i: number) => number};
    
    type Key = GetKey<T, XKey>;
    const keys = Object.allKeys(data[0]).filter((key: keyof T): key is Key => key !== xKey);
    
    const x = xScale.range([0, width])
        .domain(extent(xValues) as [XDomain, XDomain]);
    const y = yScale.range([height, 0]);
    const _color = isArray(color) ? (i: number) => color[i % color.length] : color;
    
    const path = area<SeriesPoint<T>>()
        .x((d, i) => x(xValues[i]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));
    curve && path.curve(curve);
    defined && path.defined((d, i) => defined(d.data, i));
    
    const seriesData = stack<T, Key>()
        .keys(keys)
        .value((d, key, i) => yValues[key](d[key], i))
        .order(order)
        .offset(offset)
        (data._());
    y.domain(extent(seriesData.flatten(2)) as [number, number]);
    reverse && seriesData.reverse();
    const paths = seriesData.mapFilter<string>(path);
    
    return <svg width={outerWidth} height={outerHeight}>
        <g transform={translate(left, top)}>
            {paths.map((path, i) => <path
                key={i}
                className={classNames("vx-area-stack", className)}
                d={path}
                fill={_color(i)}
                onMouseEnter={() => console.log(keys[i])}
            />)}
            {!!glyph && <g className="vx-area-stack-glyphs">{xData.map(glyph)}</g>}
            <Axes
                x={xAxis(axisBottom(x), xData)}
                y={yAxis(axisLeft(y), data)}
                height={height}
            />
        </g>
    </svg>;
};