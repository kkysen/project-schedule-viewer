"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
const d3_time_format_1 = require("d3-time-format");
const HashMap_1 = require("../../../../util/collections/HashMap");
const VariableAreaStack_1 = require("../../../../util/components/svg/graph/VariableAreaStack");
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
exports.CachedGraph = function ({ data, filter, order, color }) {
    // TODO reorganize
    const updateGraphData = (reScale) => VariableAreaStack_1.VariableAreaStack({
        data: prepareData(data, filter),
        values: {
            x: d => d,
            y: d => d.percentCommitted * d.employee.project().percentLikelihood,
            z: d => d.employee,
        },
        flat: true,
        forceDomain: reScale ? undefined : graph.domain,
    });
    let graphData = updateGraphData(true);
    const updateGraph = () => graphData({
        orderBy: order,
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
        size: { width: 1000, height: 400 },
        margins: { left: 50, top: 50, right: 50, bottom: 50 },
    });
    let graph = updateGraph();
    const updateNode = () => graph.render({
        color: (e, i) => color(order(e, i)),
    });
    let node = updateNode();
    return (props) => {
        const sameGraphData = props.data === data && props.filter === filter && !props.reScale;
        if (!sameGraphData) {
            data = props.data;
            filter = props.filter;
            graphData = updateGraphData(props.reScale);
        }
        const sameGraph = props.order === order;
        if (!sameGraphData || !sameGraph) {
            order = props.order;
            graph = updateGraph();
        }
        const sameNode = props.color === color;
        if (!sameGraphData || !sameGraph || !sameNode) {
            color = props.color;
            node = updateNode();
        }
        return node;
    };
};
//# sourceMappingURL=CachedGraph.js.map