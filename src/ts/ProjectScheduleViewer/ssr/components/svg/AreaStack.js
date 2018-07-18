"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classNames = require("classnames");
const d3_array_1 = require("d3-array");
const d3_axis_1 = require("d3-axis");
const d3_scale_1 = require("d3-scale");
const d3_shape_1 = require("d3-shape");
const React = require("react");
const utils_1 = require("../../../../util/functional/utils");
const isType_1 = require("../../../../util/types/isType");
const Axes_1 = require("./Axes");
const utils_2 = require("./utils");
// allows me to specify generics easier
// generic components work in typescript, but not WebStorm yet
exports.AreaStack = function ({ data, xKey, values, order = d3_shape_1.stackOrderNone, offset = d3_shape_1.stackOffsetNone, color = ["red", "blue", "green"], scale: { x: xScale = d3_scale_1.scaleLinear(), y: yScale = d3_scale_1.scaleLinear(), } = {}, axes: { x: xAxis = utils_1.identity, y: yAxis = utils_1.identity, } = {}, size: { width, height }, margin: { left = 0, top = 0, bottom = 0, right = 0 }, className, curve, defined, glyph, reverse = false, }) {
    if (data.length === 0) {
        return;
    }
    const outerWidth = width + left + right;
    const outerHeight = height + top + bottom;
    const xData = data.map(d => d[xKey]);
    const xValues = xData.map(values[xKey]);
    const yValues = values;
    const keys = Object.allKeys(data[0]).filter((key) => key !== xKey);
    const x = xScale.range([0, width])
        .domain(d3_array_1.extent(xValues));
    const y = yScale.range([height, 0]);
    const _color = isType_1.isArray(color) ? (i) => color[i % color.length] : color;
    const path = d3_shape_1.area()
        .x((d, i) => x(xValues[i]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));
    curve && path.curve(curve);
    defined && path.defined((d, i) => defined(d.data, i));
    const seriesData = d3_shape_1.stack()
        .keys(keys)
        .value((d, key, i) => yValues[key](d[key], i))
        .order(order)
        .offset(offset)(data._());
    y.domain(d3_array_1.extent(seriesData.flatten(2)));
    reverse && seriesData.reverse();
    const paths = seriesData.mapFilter(path);
    return React.createElement("svg", { width: outerWidth, height: outerHeight },
        React.createElement("g", { transform: utils_2.translate(left, top) },
            paths.map((path, i) => React.createElement("path", { key: i, className: classNames("vx-area-stack", className), d: path, fill: _color(i), onMouseEnter: () => console.log(keys[i]) })),
            !!glyph && React.createElement("g", { className: "vx-area-stack-glyphs" }, xData.map(glyph)),
            React.createElement(Axes_1.Axes, { x: xAxis(d3_axis_1.axisBottom(x), xData), y: yAxis(d3_axis_1.axisLeft(y), data), height: height })));
};
//# sourceMappingURL=AreaStack.js.map