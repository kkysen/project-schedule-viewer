"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_chromatic_1 = require("d3-scale-chromatic");
const React = require("react");
const react_1 = require("react");
const HashMap_1 = require("../../../../util/collections/HashMap");
const Range_1 = require("../../../../util/collections/Range");
const multiEvent_1 = require("../../../../util/events/multiEvent");
const utils_1 = require("../../../../util/misc/utils");
const CachedGraph_1 = require("./CachedGraph");
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
        .flatMap(e => e.dates._())
        .forEach(({ date, employees }) => map.getOrPutDefault(date.date, [])
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
        this.baseColor = utils_1.moduloIndexer(d3_scale_chromatic_1.schemeSet3);
        this.state = {
            color: this.baseColor,
            order: OrderControls_1.indexOrder,
            orderIndex: -1,
            filter: OrderControls_1.noFilter,
            filterIndex: -1,
            reScale: false,
        };
        this.set = {
            order: (order, orderIndex) => this.setState({ order, orderIndex }),
            filter: (filter, filterIndex) => this.setState({ filter, filterIndex }),
            reScale: () => this.setState({ reScale: true }, () => this.state.reScale = false),
        };
    }
    render() {
        const { props, state } = this;
        const { data } = props;
        const { color, order, filter, reScale } = state;
        if (Range_1.Range.closed(1, 3).has(state.orderIndex)) {
            const onClick = multiEvent_1.doubleEvent()(() => {
            }, () => {
            });
        }
        const graphProps = { data, filter, order, color, reScale };
        const graphNode = (this.graph || (this.graph = CachedGraph_1.CachedGraph(graphProps)))(graphProps);
        return React.createElement(React.Fragment, null,
            React.createElement(GraphControls_1.GraphControls, { accessors: accessors, data: data, set: this.set, current: state }),
            graphNode);
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map