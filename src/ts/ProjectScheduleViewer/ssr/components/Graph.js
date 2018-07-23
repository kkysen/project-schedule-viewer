"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
const d3_scale_chromatic_1 = require("d3-scale-chromatic");
const d3_time_format_1 = require("d3-time-format");
const React = require("react");
const react_1 = require("react");
const anyWindow_1 = require("../../../util/anyWindow");
const HashMap_1 = require("../../../util/collections/HashMap");
const VariableAreaStack_1 = require("../../../util/components/svg/graph/VariableAreaStack");
const isType_1 = require("../../../util/types/isType");
const utils_1 = require("../../../util/utils");
const prepareData = function (data) {
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
        .forEach(({ month, employees }) => map.getOrPutDefault(month.date, []).addAll(employees._()));
    return map;
};
class Graph extends react_1.Component {
    constructor(props) {
        super(props);
        this.baseColor = utils_1.moduloIndexer(d3_scale_chromatic_1.schemeCategory10);
        this.byColor = (e, i) => this.baseColor(this.state.by(e, i));
        this.by = {
            Amar: e => e.employee.firstName === "Amar" ? 1 : 0,
            index: (e, i) => i,
            employee: e => e.employee.id,
            project: e => e.project().id,
            team: e => e.project().team().id,
            position: e => e.employee.position.level,
        };
        this.state = {
            by: this.by.index,
            color: this.byColor,
        };
        const _ = this;
        anyWindow_1.globalProperties({
            set onlyColor(only) {
                const onlySet = new Set(isType_1.isArray(only) ? only : [only]);
                _.setState({
                    color: (employee, i) => !onlySet.has(i) ? "white" : _.baseColor(i),
                });
            },
            set by(by) {
                _.setState({ by: _.by[by] });
            },
        });
    }
    render() {
        const { data } = this.props;
        const { color, by } = this.state;
        return React.createElement(React.Fragment, null, VariableAreaStack_1.VariableAreaStack({
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