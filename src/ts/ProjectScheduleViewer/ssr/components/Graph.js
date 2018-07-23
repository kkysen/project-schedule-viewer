"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
const d3_scale_chromatic_1 = require("d3-scale-chromatic");
const d3_time_format_1 = require("d3-time-format");
const React = require("react");
const react_1 = require("react");
const HashMap_1 = require("../../../util/collections/HashMap");
const VariableAreaStack_1 = require("../../../util/components/svg/graph/VariableAreaStack");
const utils_1 = require("../../../util/utils");
const GraphControls_1 = require("./GraphControls");
const OrderControls_1 = require("./OrderControls");
const prepareData = function (data, filter) {
    const hash = (date) => +date;
    const map = HashMap_1.HashMap.perfectHash({
        keysHashEquals: {
            hash,
            equals: (t1, t2) => hash(t1) === hash(t2),
        },
    });
    data.teams.all
        .flatMap(e => e.projects._())
        .flatMap(e => e.months._())
        .forEach(({ month, employees }) => map.getOrPutDefault(month.date, [])
        .addAll(employees.filter(e => filter(e.employee))));
    return map;
};
const accessors = {
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
class Graph extends react_1.Component {
    constructor() {
        super(...arguments);
        this.baseColor = utils_1.moduloIndexer(d3_scale_chromatic_1.schemeCategory10);
        this.state = {
            color: this.baseColor,
            order: OrderControls_1.indexOrder,
            filter: () => true,
        };
        this.set = {
            order: order => this.setState({ order }),
            filter: filter => this.setState({ filter }),
        };
    }
    render() {
        const { data } = this.props;
        const { color, order, filter } = this.state;
        return React.createElement(React.Fragment, null,
            React.createElement(GraphControls_1.GraphControls, { accessors: accessors, data: data, set: this.set }),
            VariableAreaStack_1.VariableAreaStack({
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
                    x: d3_scale_1.scaleTime(),
                },
                axes: {
                    x: (axis, xData) => axis
                        .tickFormat(d3_time_format_1.timeFormat("%B"))
                        .ticks(xData.length),
                },
                axesNames: {
                    x: "Month",
                    y: "Number of Employees",
                },
                size: { width: 1000, height: 500 },
                margins: { left: 50, top: 50, right: 50, bottom: 50 },
            }));
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map