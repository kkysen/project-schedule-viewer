import {Axis, AxisDomain} from "d3-axis";
import {select} from "d3-selection";
import * as React from "react";
import {ReactNode} from "react";
import {FauxComponent} from "../../../dom/faux/FauxComponent";
import {renderNodesObj} from "../../../react";
import {Margins, Size, translate} from "../utils";
import {rotate} from "../utils";

interface AxesProps<XDomain extends AxisDomain, YDomain extends AxisDomain> {
    axes: {
        x: Axis<XDomain>;
        y: Axis<YDomain>;
    };
    names: {
        x?: string;
        y?: string;
    };
    size: Size;
    margins: Margins;
}

export const Axes = function <XDomain extends AxisDomain, YDomain extends AxisDomain>(
    {
        axes,
        names,
        size: {width, height},
        margins: {left, top, right, bottom},
    }: AxesProps<XDomain, YDomain>): ReactNode {
    const [gx, gy] = Object.values(axes).map(axis => {
        const {element: g, render} = FauxComponent.new("g");
        axis(select(g));
        return render();
    });
    
    return renderNodesObj({
    
        axes: <>
            <g transform={translate(0, height)}>
                {gx}
            </g>
        
            {gy}
        </>,
    
        names: <>
            {names.x && <text
                transform={translate(width / 2, height + top)}
                style={{textAnchor: "middle"}}
            >
                {names.x}
            </text>}
        
            {names.y && <text
                transform={rotate(-90)}
                y={-left}
                x={-height / 2}
                dy={"1em"}
                style={{textAnchor: "middle"}}
            >
                {names.y}
            </text>}
        </>,
    
    });
};