import {Axis, AxisDomain} from "d3-axis";
import {select} from "d3-selection";
import * as React from "react";
import {PureComponent, ReactNode} from "react";
import {FauxElement} from "../../../../util/dom/faux/FauxElement";
import {translate} from "./utils";

interface AxesProps<XDomain extends AxisDomain, YDomain extends AxisDomain> {
    x: Axis<XDomain>;
    y: Axis<YDomain>;
    height: number;
}

export class Axes<XDomain extends AxisDomain, YDomain extends AxisDomain>
    extends PureComponent<AxesProps<XDomain, YDomain>, {}> {
    
    public render(): ReactNode {
        const {x, y, height} = this.props;
        const [gx, gy] = [x, y].map(axis => {
            const {element: g, render} = FauxElement.new("g");
            axis(select(g));
            return render();
        });
        return <>
            <g transform={translate(0, height)}>
                {gx}
            </g>
            {gy}
        </>;
    }
    
}