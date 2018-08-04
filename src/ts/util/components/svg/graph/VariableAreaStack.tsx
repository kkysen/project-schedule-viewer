import * as classNames from "classnames";
import {Axis, axisBottom, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {schemeCategory10} from "d3-scale-chromatic";
import {area, CurveFactory, SeriesPoint, stack, stackOffsetNone, stackOrderNone} from "d3-shape";
import * as React from "react";
import {ReactNode, SVGProps} from "react";
import {MapEntry} from "../../../collections/Map";
import {Range} from "../../../collections/Range";
import {development} from "../../../env/production";
import {identity} from "../../../functional/utils";
import {Numeric, sum} from "../../../misc/math";
import {moduloIndexer} from "../../../misc/utils";
import {isArray, isReadonlyArray} from "../../../types/isType";
import {Accessor, Margins, Scale, Size, translate} from "../utils";
import {Axes} from "./Axes";
import {StackOffset} from "./utils";

type Entry<K, V> = MapEntry<K, V>;

type RA<T> = ReadonlyArray<T>;

interface VariableAreaStackDataProps<T, X, XDomain extends Numeric, Z> {
    data: Iterable<Entry<X, RA<T>>> | Iterable<[X, RA<T>]>;
    values: {
        x: (d: X) => XDomain;
        y: (d: T) => number;
        z: (d: T) => Z;
    };
    flat?: boolean;
    forceDomain?: {
        x?: [XDomain, XDomain];
        y?: [number, number];
    };
}

interface VariableAreaStackProps<T, X, XDomain extends Numeric, Z> {
    zLine?: (z: Z) => number;
    orderBy?: (z: Z, i: number) => number;
    offset?: StackOffset<RA<T>, number>;
    scale?: {
        x?: Scale<XDomain>;
        y?: Scale<number>;
    };
    axes?: {
        x?: (axis: Axis<XDomain>, xData: RA<X>) => Axis<XDomain>;
        y?: (axis: Axis<number>, data: RA<RA<T>>) => Axis<number>;
    };
    axesNames?: {
        x?: string;
        y?: string;
    };
    size: Size;
    margins?: Partial<Margins>;
    curve?: CurveFactory;
    defined?: Accessor<boolean, RA<T>>;
    glyph?: (t: X, i: number, a: RA<X>) => ReactNode;
    reverse?: boolean;
    className?: string;
}

export interface VariableAreaStackData<T, X, XDomain extends Numeric, Z> {
    (props: VariableAreaStackProps<T, X, XDomain, Z>): VariableAreaStack<T, X, XDomain, Z>;
}

interface VariableAreaStackRenderedProps<Z> {
    color?: RA<string> | ((z: Z, i: number) => string);
}

export interface VariableAreaStack<T, X, XDomain, Z> {
    
    readonly domain: {
        readonly x: [XDomain, XDomain];
        readonly y: [number, number];
    }
    
    readonly render: (props: VariableAreaStackRenderedProps<Z>) => ReactNode;
    
}

export const VariableAreaStack = function <T, X, XDomain extends Numeric, Z>(
    props: VariableAreaStackDataProps<T, X, XDomain, Z>): VariableAreaStackData<T, X, XDomain, Z> {
    
    const {
        data: nonStandardizedData,
        values,
        flat = false,
        forceDomain = {},
    } = props;
    
    type DataEntry = Entry<X, RA<T>>;
    type Data = RA<DataEntry>;
    
    const dataAsEntries = function(data: typeof nonStandardizedData): Data {
        const a = [...data];
        if (a.length === 0) {
            return [];
        }
        if (!isArray(a[0])) {
            return a as Entry<X, RA<T>>[];
        }
        return (a as [X, RA<T>][]).map(([key, value]) => ({key, value}));
    };
    
    /**
     * Adds a new entry before every non-first entry
     * w/ the current key and the previous value.
     * This creates a column chart effect.
     */
    const flattenData = function(data: Data): Data {
        if (!flat) {
            return data;
        }
        return data.flatMap((e, i, a) => {
            if (i === 0) {
                return e;
            }
            return [
                {
                    key: e.key,
                    value: a[i - 1].value,
                },
                e,
            ];
        });
    };
    
    const standardizeData = function(): Data | undefined {
        const data = dataAsEntries(nonStandardizedData);
        switch (data.length) {
            case 0:
                return;
            case 1:
                return data;
            default:
                return flattenData(data);
        }
    };
    
    const data = standardizeData();
    if (!data) {
        return () => ({
            domain: {
                x: [undefined, undefined] as any as [XDomain, XDomain],
                y: [NaN, NaN],
            },
            render: () => null,
        });
    }
    
    const xData: RA<X> = data.map(e => e.key);
    const xValues: RA<XDomain> = xData.map(values.x);
    
    const yData: RA<RA<T>> = data.map(e => e.value);
    
    type Key = number;
    const numZ = Math.max(...yData.map(e => e.length));
    const zRange = Range.new(numZ);
    const keys = zRange.toArray();
    const zData: RA<Entry<Z, number[]>> = zRange
    // TODO check mapFilter or map
        .map(i => yData._().mapFilter(e => e[i]))
        .mapFilter(e => {
            if (e.length === 0) {
                return;
            }
            if (development) {
                if (new Set(e.map(values.z)).size > 1) {
                    throw new Error(`each zDatum contains non-unique keys`);
                }
            }
            return {
                key: values.z(e[0]),
                value: e.map(values.y),
            };
        });
    
    const colorFromArray = function(colors: RA<string>): (z: Z, i: number) => string {
        const color = moduloIndexer(colors);
        return (z, i) => color(i);
    };
    
    const xDomain = forceDomain.x || [xValues[0], xValues._().last()];
    
    const value = (d: RA<T>, i: Key) => {
        if (i > d.length) {
            return 0;
        }
        return values.y(d[i]);
    };
    
    return props => {
        const {
            zLine,
            orderBy,
            offset = stackOffsetNone,
            scale: {
                x: xScale = scaleLinear() as any as Scale<XDomain>,
                y: yScale = scaleLinear() as Scale<number>,
            } = {},
            axes: {
                x: xAxis = identity,
                y: yAxis = identity,
            } = {},
            axesNames = {},
            size,
            margins = {},
            className,
            curve,
            defined,
            glyph,
            reverse = false,
        } = props;
        
        const {width, height} = size;
        const {left = 0, top = 0, bottom = 0, right = 0} = margins;
        const _margins = {left, top, bottom, right};
        
        const outerWidth = width + left + right;
        const outerHeight = height + top + bottom;
        
        const x = xScale.range([0, width])
            .domain(xDomain);
        const y = yScale.range([height, 0]);
        
        const path = area<SeriesPoint<RA<T>>>()
            .x((d, i) => x(xValues[i]))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]));
        curve && path.curve(curve);
        defined && path.defined((d, i) => defined(d.data, i));
        
        const seriesData = stack<RA<T>, Key>()
            .keys(keys)
            .value(value)
            .order(!orderBy ? stackOrderNone : series =>
                series.map((e, i) => ({i, value: zData[i].key}))
                    .sortBy(e => orderBy(e.value, e.i))
                    .map(e => e.i)
            )
            .offset(offset)
            (yData._());
        
        const zLineHeight = zLine && sum(zData.map(e => e.key).map(zLine));
        
        reverse && seriesData.reverse();
        
        const yDomain = forceDomain.y || [
            Math.min(...seriesData[0].map(e => e[0]), zLine ? zLineHeight! : Infinity),
            Math.max(...seriesData.last().map(e => e[1]), zLine ? zLineHeight! : -Infinity),
        ];
        y.domain(yDomain);
        const paths = seriesData.mapFilter<string>(path);
        
        const zLinePath = zLineHeight && (() => {
            const [x1, x2] = xDomain.map(x);
            const _y = y(zLineHeight);
            // TODO add argument for controlling line's style
            return <line x1={x1} x2={x2} y1={_y} y2={_y} stroke={"black"}/>;
        })();
        
        const _className = classNames("variable-area-stack", className);
        
        const glyphNodes = !!glyph && <g className="vx-area-stack-glyphs">{xData.map(glyph)}</g>;
        
        const axesNode = <g>
            {Axes({
                axes: {
                    x: xAxis(axisBottom(x), xData),
                    y: yAxis(axisLeft(y), yData),
                },
                names: axesNames,
                size,
                margins: _margins,
            })}
        </g>;
        
        return {
            
            domain: {
                x: xDomain,
                y: yDomain,
            },
            
            render: props => {
                const {
                    color = schemeCategory10,
                } = props;
                
                const _color = isReadonlyArray(color) ? colorFromArray(color) : color;
                
                return <svg width={outerWidth} height={outerHeight}>
                    <g transform={translate(left, top)}>
                        <g>
                            {paths.map((path, i) => <path
                                key={i}
                                className={_className}
                                d={path}
                                fill={_color(zData[i].key, i)}
                                // onMouseEnter={() => console.log(zData[i].key, zData[i].value)}
                            />)}
                        </g>
                        {zLinePath}
                        {glyphNodes}
                        {axesNode}
                    </g>
                </svg>;
            }
            
        };
    };
};