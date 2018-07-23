import {scaleTime} from "d3-scale";
import {schemeCategory10} from "d3-scale-chromatic";
import {timeFormat} from "d3-time-format";
import * as React from "react";
import {Component, ReactNode} from "react";
import {globalProperties} from "../../../util/anyWindow";
import {HashMap} from "../../../util/collections/HashMap";
import {Map} from "../../../util/collections/Map";
import {VariableAreaStack} from "../../../util/components/svg/graph/VariableAreaStack";
import {Scale} from "../../../util/components/svg/utils";
import {isArray} from "../../../util/types/isType";
import {moduloIndexer} from "../../../util/utils";
import {EmployeeCommitment, ProjectEmployee} from "../../share/data/access/Project";
import {Data} from "../../share/data/Data";

const prepareData = function(data: Data): Map<Date, EmployeeCommitment[]> {
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
            map.getOrPutDefault(month.date, []).addAll(employees._())
        );
    return map;
};


interface GraphProps {
    data: Data;
}

type By = (employee: ProjectEmployee, i: number) => number;

type Bys = {
    Amar: By;
    index: By;
    employee: By;
    project: By;
    team: By;
    position: By;
};

type Color = (employee: ProjectEmployee, i: number) => string;

interface GraphState {
    
    by: By;
    
    color: Color;
    
}

export class Graph extends Component<GraphProps, GraphState> {
    
    private readonly baseColor = moduloIndexer(schemeCategory10);
    
    private readonly byColor: Color = (e, i) => this.baseColor(this.state.by(e, i));
    
    private readonly by: Bys = {
        Amar: e => e.employee.firstName === "Amar" ? 1 : 0,
        index: (e, i) => i,
        employee: e => e.employee.id,
        project: e => e.project().id,
        team: e => e.project().team().id,
        position: e => e.employee.position.level,
    };
    
    public readonly state: GraphState = {
        by: this.by.index,
        color: this.byColor,
    };
    
    public constructor(props: GraphProps) {
        super(props);
        const _ = this;
        globalProperties({
            set onlyColor(only: number | number[]) {
                const onlySet = new Set(isArray(only) ? only : [only]);
                _.setState({
                    color: (employee, i) => !onlySet.has(i) ? "white" : _.baseColor(i),
                });
            },
            set by(by: keyof Bys) {
                _.setState({by: _.by[by]});
            },
        });
    }
    
    public render(): ReactNode {
        const {data} = this.props;
        const {color, by} = this.state;
        
        return <>
            {VariableAreaStack({
                data: prepareData(data),
                values: {
                    x: d => d,
                    y: d => d.percentCommitted * d.employee.project().percentLikelihood,
                    z: d => d.employee,
                },
                orderBy: by,
                flat: true,
                color,
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