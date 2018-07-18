(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client~server"],{

/***/ "./src/ts/ProjectScheduleViewer/share/Data.ts":
/*!****************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/Data.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cache_1 = __webpack_require__(/*! ../../util/cache */ \"./src/ts/util/cache.ts\");\nconst objectFields_1 = __webpack_require__(/*! ../../util/objectFields */ \"./src/ts/util/objectFields.ts\");\nconst Employee_1 = __webpack_require__(/*! ./Employee */ \"./src/ts/ProjectScheduleViewer/share/Employee.ts\");\nconst Position_1 = __webpack_require__(/*! ./Position */ \"./src/ts/ProjectScheduleViewer/share/Position.ts\");\nconst Team_1 = __webpack_require__(/*! ./Team */ \"./src/ts/ProjectScheduleViewer/share/Team.ts\");\nconst dataAccessors = { positions: Position_1.positions, employees: Employee_1.employees, leaders: Employee_1.leaders, teams: Team_1.teams };\nexports.data = cache_1.refreshableCache((source) => {\n    const dataPromises = objectFields_1.objectFields.callEachArgs(dataAccessors, source);\n    return objectFields_1.objectFields.awaitAll(dataPromises);\n});\nexports.getAppData = function (sources) {\n    exports.data.refresh();\n    return exports.data.get(sources);\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/Data.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/DataAccessor.ts":
/*!************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/DataAccessor.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst All_1 = __webpack_require__(/*! ../../util/All */ \"./src/ts/util/All.ts\");\nconst cache_1 = __webpack_require__(/*! ../../util/cache */ \"./src/ts/util/cache.ts\");\nconst objectFields_1 = __webpack_require__(/*! ../../util/objectFields */ \"./src/ts/util/objectFields.ts\");\nexports.DataAccessor = {\n    new({ source, parse, create, by }, argsGetter) {\n        return cache_1.cache(async (sources) => {\n            const args = await objectFields_1.objectFields.awaitFunctions(argsGetter, sources);\n            const raw = await source(sources)(args);\n            const parsed = raw.map(parse);\n            const map = (e, i) => create(e, i, args);\n            // do it twice so index is correct 2nd time\n            const a = parsed.filter(map).mapFilter(map);\n            // const a = parsed._().mapFilter((e, i) => create(e, i, args));\n            return {\n                ...All_1.All.of(a, by),\n                parsed,\n                raw,\n            };\n        });\n    },\n    mapped(create, by, argsGetter) {\n        return cache_1.cache(async (source) => {\n            return All_1.All.of(create(await objectFields_1.objectFields.awaitFunctions(argsGetter, source)), by);\n        });\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/DataAccessor.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/Employee.ts":
/*!********************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/Employee.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/DataAccessor.ts\");\nconst Position_1 = __webpack_require__(/*! ./Position */ \"./src/ts/ProjectScheduleViewer/share/Position.ts\");\nconst willBeLeader = (employee) => employee.isLeader;\nconst isLeader = willBeLeader;\nexports.employees = DataAccessor_1.DataAccessor.new({\n    source: e => e.employees,\n    parse: ([firstName, lastName, level, isLeader]) => ({ firstName, lastName, level, isLeader: !!isLeader }),\n    create: ({ firstName, lastName, level, isLeader }, id, { positions }) => {\n        const position = positions.by.level(level);\n        return !position ? undefined : {\n            id,\n            name: `${firstName} ${lastName}`,\n            firstName,\n            lastName,\n            position,\n            isLeader,\n        };\n    },\n    by: { name: \"\" },\n}, { positions: Position_1.positions });\nexports.leaders = DataAccessor_1.DataAccessor.mapped(({ employees }) => employees.all\n    .filter(willBeLeader)\n    .map((e, i) => Object.assign(e, {\n    leaderId: i,\n    team: () => undefined,\n})), { name: \"\" }, { employees: exports.employees });\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/Employee.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/Month.ts":
/*!*****************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/Month.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst monthArgs = [\n    \"January\",\n    \"February\",\n    \"March\",\n    \"April\",\n    \"May\",\n    \"June\",\n    \"July\",\n    \"August\",\n    \"September\",\n    \"October\",\n    \"November\",\n    \"December\",\n].map(name => ({ name }));\nexports.Months = monthArgs.map((month, i) => ({\n    ...month,\n    ordinal: i,\n    toDate: () => new Date(new Date().setMonth(i)),\n}));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/Month.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/Position.ts":
/*!********************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/Position.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../../util/functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/DataAccessor.ts\");\nexports.positions = DataAccessor_1.DataAccessor.new({\n    source: e => e.positions,\n    parse: ([level, name, rate]) => ({ level, name, rate }),\n    create: utils_1.identity,\n    by: { level: 0 },\n}, {});\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/Position.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/Team.ts":
/*!****************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/Team.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/DataAccessor.ts\");\nconst Employee_1 = __webpack_require__(/*! ./Employee */ \"./src/ts/ProjectScheduleViewer/share/Employee.ts\");\nconst Month_1 = __webpack_require__(/*! ./Month */ \"./src/ts/ProjectScheduleViewer/share/Month.ts\");\nconst makeProject = function (employees, leader) {\n    const byId = employees.by.index;\n    return (project) => {\n        const { id, name, percentLikelihood } = project;\n        const employees = project.employees.map(({ employee, months }) => ({\n            employee: byId(employee),\n            months: months.map(({ month, percentCommitted }) => ({ month: Month_1.Months[month], percentCommitted })),\n        })).filter(e => !!e.employee);\n        return {\n            id,\n            leader,\n            name,\n            employees: employees.map(e => e.employee),\n            months: Month_1.Months.map((month, i) => ({\n                month,\n                employees: employees.map(({ employee, months }) => ({\n                    employee,\n                    percentCommitted: months[i].percentCommitted,\n                })),\n            })),\n            percentLikelihood,\n        };\n    };\n};\nconst makeTeam = function (employees, leader, { projects }) {\n    const team = {\n        id: leader.leaderId,\n        leader,\n        projects: projects.map(makeProject(employees, leader)),\n    };\n    leader.team = () => team;\n    return team;\n};\nexports.teams = DataAccessor_1.DataAccessor.new({\n    source: e => e.teams,\n    parse: projects => ({\n        projects: projects.map(([id, name, employees, percentLikelihood]) => ({\n            id,\n            name,\n            employees: employees.map(([employee, months]) => ({\n                employee,\n                months: months.map((percentCommitted, i) => ({ month: i, percentCommitted }))\n            })),\n            percentLikelihood,\n        })).sortBy(e => e.id),\n    }),\n    create: (parsed, id, { leaders, employees }) => makeTeam(employees, leaders.all[id], parsed),\n    by: {},\n}, { leaders: Employee_1.leaders, employees: Employee_1.employees });\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/Team.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/App.tsx":
/*!*************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/App.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst d3_scale_1 = __webpack_require__(/*! d3-scale */ \"./node_modules/d3-scale/index.js\");\nconst d3_time_format_1 = __webpack_require__(/*! d3-time-format */ \"./node_modules/d3-time-format/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst utils_1 = __webpack_require__(/*! ../../../util/functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst ProjectTables_1 = __webpack_require__(/*! ./ProjectTables */ \"./src/ts/ProjectScheduleViewer/ssr/components/ProjectTables.tsx\");\nconst AreaStack_1 = __webpack_require__(/*! ./svg/AreaStack */ \"./src/ts/ProjectScheduleViewer/ssr/components/svg/AreaStack.tsx\");\nexports.appId = \"app\";\nexports.App = ({ data }) => React.createElement(\"div\", { id: exports.appId },\n    AreaStack_1.AreaStack({\n        data: [\n            { month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },\n            { month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },\n            { month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },\n            { month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 },\n            { month: new Date(2015, 4, 1), apples: 10000, bananas: 8000, cherries: 9000, dates: 7000 },\n        ],\n        xKey: \"month\",\n        values: {\n            month: utils_1.identity,\n            apples: utils_1.identity,\n            bananas: utils_1.identity,\n            cherries: utils_1.identity,\n            dates: utils_1.identity,\n        },\n        scale: {\n            x: d3_scale_1.scaleTime(),\n        },\n        axes: {\n            x: (axis, xData) => axis.tickFormat(d3_time_format_1.timeFormat(\"%B\")).ticks(xData.length),\n        },\n        size: { width: 600, height: 300 },\n        margin: { left: 50, top: 50, right: 50, bottom: 50 },\n    }),\n    React.createElement(ProjectTables_1.ProjectTables, { data: data }),\n    React.createElement(\"button\", { onClick: () => console.log(data) }, \"Button\"));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/App.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/ProjectTables.tsx":
/*!***********************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/ProjectTables.tsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst ProjectTable = ({ project }) => {\n    const border = { border: \"1px solid black\" };\n    return React.createElement(React.Fragment, null,\n        React.createElement(\"br\", null),\n        \"% Likelihood: \",\n        project.percentLikelihood,\n        React.createElement(\"br\", null),\n        React.createElement(\"table\", { style: { ...border, borderCollapse: \"collapse\" } },\n            React.createElement(\"thead\", null,\n                React.createElement(\"tr\", null,\n                    React.createElement(\"th\", { style: border },\n                        \"Project: \",\n                        project.name),\n                    project.employees.map((e, i) => React.createElement(\"th\", { key: i, style: border }, e.name)))),\n            React.createElement(\"tbody\", null, project.months.map((month, i) => React.createElement(\"tr\", { key: i },\n                React.createElement(\"td\", { style: border }, month.month.name),\n                month.employees.map((employee, i) => {\n                    return React.createElement(\"td\", { key: i, style: border }, employee.percentCommitted);\n                }))))),\n        React.createElement(\"br\", null));\n};\nexports.ProjectTables = ({ data }) => React.createElement(\"div\", null, data.teams.all.map(team => React.createElement(react_1.Fragment, { key: team.id },\n    React.createElement(\"br\", null),\n    React.createElement(\"br\", null),\n    \"Team \",\n    team.leader.name,\n    React.createElement(\"br\", null),\n    React.createElement(\"br\", null),\n    team.projects.map(project => React.createElement(ProjectTable, { project: project, key: project.id })),\n    React.createElement(\"br\", null),\n    React.createElement(\"br\", null))));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/ProjectTables.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/svg/AreaStack.tsx":
/*!***********************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/svg/AreaStack.tsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst classNames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\nconst d3_array_1 = __webpack_require__(/*! d3-array */ \"./node_modules/d3-array/index.js\");\nconst d3_axis_1 = __webpack_require__(/*! d3-axis */ \"./node_modules/d3-axis/index.js\");\nconst d3_scale_1 = __webpack_require__(/*! d3-scale */ \"./node_modules/d3-scale/index.js\");\nconst d3_shape_1 = __webpack_require__(/*! d3-shape */ \"./node_modules/d3-shape/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst utils_1 = __webpack_require__(/*! ../../../../util/functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst isType_1 = __webpack_require__(/*! ../../../../util/types/isType */ \"./src/ts/util/types/isType.ts\");\nconst Axes_1 = __webpack_require__(/*! ./Axes */ \"./src/ts/ProjectScheduleViewer/ssr/components/svg/Axes.tsx\");\nconst utils_2 = __webpack_require__(/*! ./utils */ \"./src/ts/ProjectScheduleViewer/ssr/components/svg/utils.ts\");\n// allows me to specify generics easier\n// generic components work in typescript, but not WebStorm yet\nexports.AreaStack = function ({ data, xKey, values, order = d3_shape_1.stackOrderNone, offset = d3_shape_1.stackOffsetNone, color = [\"red\", \"blue\", \"green\"], scale: { x: xScale = d3_scale_1.scaleLinear(), y: yScale = d3_scale_1.scaleLinear(), } = {}, axes: { x: xAxis = utils_1.identity, y: yAxis = utils_1.identity, } = {}, size: { width, height }, margin: { left = 0, top = 0, bottom = 0, right = 0 }, className, curve, defined, glyph, reverse = false, }) {\n    if (data.length === 0) {\n        return;\n    }\n    const outerWidth = width + left + right;\n    const outerHeight = height + top + bottom;\n    const xData = data.map(d => d[xKey]);\n    const xValues = xData.map(values[xKey]);\n    const yValues = values;\n    const keys = Object.allKeys(data[0]).filter((key) => key !== xKey);\n    const x = xScale.range([0, width])\n        .domain(d3_array_1.extent(xValues));\n    const y = yScale.range([height, 0]);\n    const _color = isType_1.isArray(color) ? (i) => color[i % color.length] : color;\n    const path = d3_shape_1.area()\n        .x((d, i) => x(xValues[i]))\n        .y0(d => y(d[0]))\n        .y1(d => y(d[1]));\n    curve && path.curve(curve);\n    defined && path.defined((d, i) => defined(d.data, i));\n    const seriesData = d3_shape_1.stack()\n        .keys(keys)\n        .value((d, key, i) => yValues[key](d[key], i))\n        .order(order)\n        .offset(offset)(data._());\n    y.domain(d3_array_1.extent(seriesData.flatten(2)));\n    reverse && seriesData.reverse();\n    const paths = seriesData.mapFilter(path);\n    return React.createElement(\"svg\", { width: outerWidth, height: outerHeight },\n        React.createElement(\"g\", { transform: utils_2.translate(left, top) },\n            paths.map((path, i) => React.createElement(\"path\", { key: i, className: classNames(\"vx-area-stack\", className), d: path, fill: _color(i), onMouseEnter: () => console.log(keys[i]) })),\n            !!glyph && React.createElement(\"g\", { className: \"vx-area-stack-glyphs\" }, xData.map(glyph)),\n            React.createElement(Axes_1.Axes, { x: xAxis(d3_axis_1.axisBottom(x), xData), y: yAxis(d3_axis_1.axisLeft(y), data), height: height })));\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/svg/AreaStack.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/svg/Axes.tsx":
/*!******************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/svg/Axes.tsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst d3_selection_1 = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst FauxElement_1 = __webpack_require__(/*! ../../../../util/dom/faux/FauxElement */ \"./src/ts/util/dom/faux/FauxElement.tsx\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/ts/ProjectScheduleViewer/ssr/components/svg/utils.ts\");\nclass Axes extends react_1.PureComponent {\n    render() {\n        const { x, y, height } = this.props;\n        const [gx, gy] = [x, y].map(axis => {\n            const { element: g, render } = FauxElement_1.FauxElement.new(\"g\");\n            axis(d3_selection_1.select(g));\n            return render();\n        });\n        return React.createElement(React.Fragment, null,\n            React.createElement(\"g\", { transform: utils_1.translate(0, height) }, gx),\n            gy);\n    }\n}\nexports.Axes = Axes;\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/svg/Axes.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/svg/utils.ts":
/*!******************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/svg/utils.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.translate = (x, y) => `translate(${x},${y})`;\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/svg/utils.ts?");

/***/ }),

/***/ "./src/ts/util/All.ts":
/*!****************************!*\
  !*** ./src/ts/util/All.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.All = {\n    of(a, bySample) {\n        const map = (key) => new Map(a.map(e => [e[key], e]));\n        const mapBy = (key) => {\n            const byMap = map(key);\n            return (by) => byMap.get(by);\n        };\n        const maps = Object.keys(bySample)\n            .map(key => [key, mapBy(key)]);\n        const byMap = maps.toObject();\n        return {\n            all: a,\n            by: Object.assign(byMap, {\n                index: (i) => a[i],\n            }),\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/All.ts?");

/***/ }),

/***/ "./src/ts/util/cache.ts":
/*!******************************!*\
  !*** ./src/ts/util/cache.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getter = function (t) {\n    return () => t;\n};\nexports.makeGetter = function () {\n    return exports.getter;\n};\nexports.cache = function (getter) {\n    let cache;\n    return ((...args) => cache !== undefined ? cache : (cache = getter(...args)));\n};\nexports.refreshableCache = function (getter) {\n    let cache;\n    return {\n        get: ((...args) => cache !== undefined ? cache : (cache = getter(...args))),\n        refresh: () => cache = undefined,\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/cache.ts?");

/***/ }),

/***/ "./src/ts/util/collections/HashEquals.ts":
/*!***********************************************!*\
  !*** ./src/ts/util/collections/HashEquals.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cache_1 = __webpack_require__(/*! ../cache */ \"./src/ts/util/cache.ts\");\nconst utils_1 = __webpack_require__(/*! ../functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst fnv1a_1 = __webpack_require__(/*! ../hash/fnv1a */ \"./src/ts/util/hash/fnv1a.ts\");\nconst regex_1 = __webpack_require__(/*! ../regex */ \"./src/ts/util/regex.ts\");\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nconst isReferentialEqualitySource = (() => {\n    const twoArgs = /\\(([^\\s,]*)\\s*,\\s*([^\\s)]*)\\)/;\n    const equality = /\\s*\\1\\s*===\\s*\\2/;\n    const functionBody = regex_1.regex.join(/\\s*{\\s*return/, equality, /\\s*;\\s*}/);\n    const func = regex_1.regex.join(/function\\s*/, twoArgs, functionBody);\n    const arrow = /\\s*=>/;\n    const arrowFuncWithBody = regex_1.regex.join(twoArgs, arrow, functionBody);\n    const arrowFunc = regex_1.regex.join(twoArgs, arrow, equality);\n    return s => [arrowFunc, arrowFuncWithBody, func].some(regex => regex.test(s));\n})();\nexports.Equals = {\n    bind: (equals, t) => {\n        return _t => equals(t, _t);\n    },\n    default: cache_1.getter((t1, t2) => exports.Equals.referential()(t1, t2) || exports.Hash.default()(t1) === exports.Hash.default()(t2)),\n    referential: () => Object.is,\n    fastEquals: (equals) => {\n        // means equals is using referential equality, don't repeat\n        // double checking referential equality is cheap except for strings\n        const referential = exports.Equals.referential();\n        if (equals === referential || isReferentialEqualitySource(equals.toString())) {\n            return referential;\n        }\n        return (t1, t2) => t1 === t2 || equals(t1, t2);\n    },\n};\nexports.Hash = {\n    makeNumber(hash) {\n        return isType_1.isNumber(hash) ? hash : fnv1a_1.fnv1a(isType_1.isString(hash) ? hash : exports.Hash.default()(hash));\n    },\n    // TODO maybe fix type assertion\n    default: () => JSON.stringify,\n    referential: () => utils_1.identity,\n};\nconst defaultHashEquals = {\n    hash: exports.Hash.referential(),\n    equals: exports.Equals.referential(),\n};\n// can't properly type generic constant\n// (only functions can be generic, but won't return same value each time)\nconst referentialHashEquals = {\n    hash: exports.Hash.referential(),\n    equals: exports.Equals.referential(),\n};\nexports.HashEquals = {\n    default: () => defaultHashEquals,\n    referential: () => referentialHashEquals,\n    isReferential: hashEquals => hashEquals === referentialHashEquals,\n    fastEquals: ({ hash, equals }) => ({ hash, equals: exports.Equals.fastEquals(equals) }),\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/HashEquals.ts?");

/***/ }),

/***/ "./src/ts/util/dom/faux/FauxElement.tsx":
/*!**********************************************!*\
  !*** ./src/ts/util/dom/faux/FauxElement.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_faux_dom_1 = __webpack_require__(/*! react-faux-dom */ \"./node_modules/react-faux-dom/lib/ReactFauxDOM.js\");\nexports.FauxElement = {\n    new(tagName) {\n        const element = react_faux_dom_1.createElement(tagName);\n        return {\n            element,\n            render: () => element.toReact(),\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/dom/faux/FauxElement.tsx?");

/***/ }),

/***/ "./src/ts/util/extensions/allExtensions.ts":
/*!*************************************************!*\
  !*** ./src/ts/util/extensions/allExtensions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst HashEquals_1 = __webpack_require__(/*! ../collections/HashEquals */ \"./src/ts/util/collections/HashEquals.ts\");\nconst Truthy_1 = __webpack_require__(/*! ../types/Truthy */ \"./src/ts/util/types/Truthy.ts\");\nconst immutableDescriptor = Object.freeze({\n    writable: false,\n    enumerable: false,\n    configurable: true,\n});\nconst defineSharedProperties = function (obj, sharedDescriptor, propertyValues, overwrite = true) {\n    const properties = Object.getOwnPropertyDescriptors(propertyValues);\n    Object.entries(properties).forEach(([propertyName, property]) => {\n        if (!overwrite && obj[propertyName]) {\n            return;\n        }\n        property = { ...property, ...sharedDescriptor };\n        if (property.get || property.set) {\n            delete property.writable;\n        }\n        properties[propertyName] = property;\n    });\n    Object.defineProperties(obj, properties);\n};\ndefineSharedProperties(Object, immutableDescriptor, {\n    defineSharedProperties,\n    defineImmutableProperties(obj, propertyValues, overwrite = true) {\n        defineSharedProperties(obj, immutableDescriptor, propertyValues, overwrite);\n    },\n});\nObject.defineImmutableProperties(Object, {\n    allKeys(t) {\n        return [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];\n    },\n    allValues(t) {\n        return Object.allKeys(t).map(key => t[key]);\n    },\n    allEntries(t) {\n        return Object.allKeys(t).map(key => [key, t[key]]);\n    },\n    definePolyfillProperties(obj, propertyValues) {\n        Object.defineImmutableProperties(obj, propertyValues, false);\n    },\n    getPrototypeChain(object) {\n        const chain = [];\n        for (let o = object; o !== null; o = Object.getPrototypeOf(o)) {\n            chain.push(o);\n        }\n        return chain;\n    },\n    getAllPropertyNames(object) {\n        return Array.from(new Set(Object.getPrototypeChain(object)\n            .flatMap(proto => Object.getOwnPropertyNames(proto))));\n    },\n    getting(key) {\n        return o => o[key];\n    },\n    deleting(key) {\n        return o => {\n            delete o[key];\n            return o;\n        };\n    },\n});\nObject.defineImmutableProperties(Object.prototype, {\n    freeze() {\n        return Object.freeze(this);\n    },\n    seal() {\n        return Object.seal(this);\n    },\n    _clone() {\n        return Object.assign(Object.create(null), this);\n    },\n    fullClone() {\n        return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));\n    },\n    mapFields(mapper) {\n        const obj = {};\n        for (const [key, value] of Object.entries(this)) {\n            obj[key] = mapper(value);\n        }\n        return obj;\n    },\n    freezeFields() {\n        for (const value of Object.values(this)) {\n            value.freeze();\n        }\n        return this;\n    }\n});\nObject.defineImmutableProperties(Function, {\n    compose(...funcs) {\n        const numFuncs = funcs.length;\n        if (numFuncs === 0) {\n            return () => undefined;\n        }\n        const [firstFunc, ...restFunc] = funcs;\n        if (numFuncs === 1) {\n            return firstFunc();\n        }\n        return function (...args) {\n            let result = firstFunc();\n            for (const func of funcs) {\n                result = func(result);\n            }\n            return result;\n        };\n    },\n});\nObject.defineImmutableProperties(Function.prototype, {\n    thenCall(nextFunc) {\n        return (arg) => nextFunc(this(arg));\n    },\n    applyReturning() {\n        return (arg) => {\n            this(arg);\n            return arg;\n        };\n    },\n    mapping() {\n        return array => array.map(this);\n    },\n    applying() {\n        return array => this(...array);\n    },\n    timed() {\n        const timer = (...args) => {\n            const { name } = this;\n            console.time(name);\n            const returnValue = this(...args);\n            console.timeEnd(name);\n            return returnValue;\n        };\n        return timer.named(\"timing_\" + this.name);\n    },\n    setName(name) {\n        Object.defineProperties(this, {\n            name: {\n                value: name,\n            },\n        });\n    },\n    named(name) {\n        this.setName(name);\n        return this;\n    },\n    negate() {\n        return ((...args) => !this(...args));\n    },\n});\nObject.defineImmutableProperties(Array.prototype, {\n    size() {\n        return this.length;\n    },\n    last() {\n        return this[this.length - 1];\n    },\n    clear() {\n        this.length = 0;\n    },\n    removeAt(index) {\n        return this.splice(index, 1)[0];\n    },\n    remove(value, equals) {\n        const i = !equals ? this.indexOf(value) : this.findIndex(HashEquals_1.Equals.bind(equals, value));\n        if (i !== -1) {\n            return this.removeAt(i);\n        }\n    },\n    add(index, value) {\n        this.splice(index, 0, value);\n    },\n    addAll(values, index = this.length) {\n        if (index === this.length) {\n            this.push(...values);\n        }\n        else {\n            this.splice(index, 0, ...values);\n        }\n    },\n    applyOn(func) {\n        return func(this);\n    },\n    callOn(func) {\n        return func(...this);\n    },\n    toObject() {\n        let o = {};\n        for (const [k, v] of this) {\n            o[k] = v;\n        }\n        return o;\n    },\n    sortBy(key) {\n        this.sort((a, b) => key(a) - key(b));\n        return this;\n    },\n    random() {\n        return this[Math.floor(Math.random() * this.length)];\n    },\n    mapCall() {\n        return this.map(f => f());\n    },\n    callEach(u) {\n        this.forEach(f => f(u));\n    },\n    async asyncForEach(func) {\n        await Promise.all(this.map(func));\n    },\n    mapFilter(map) {\n        return this.map(map).filter(Truthy_1.truthy);\n    },\n    asyncMap(map) {\n        return Promise.all(this.map(map));\n    },\n    async asyncFilter(filter) {\n        return (await Promise.all(this.map(async (value, index, array) => ({ value, filtered: await filter(value, index, array) })))).filter(e => e.filtered).map(e => e.value);\n    },\n    async asyncMapFilter(map) {\n        return (await Promise.all(this.map(map))).filter(Truthy_1.truthy);\n    },\n    readOnly() {\n        return this;\n    },\n    _() {\n        return this;\n    },\n});\nObject.definePolyfillProperties(Array.prototype, {\n    flatMap(flatMap, thisArg) {\n        if (thisArg) {\n            flatMap = flatMap.bind(thisArg);\n        }\n        return [].concat(...this.map(flatMap));\n    },\n    flatten(depth = -1) {\n        return depth === 0\n            ? this\n            : this.reduce((a, e) => a.concat(Array.isArray(e) ? e.flatten(depth - 1) : e), []);\n    },\n});\nconst nativeSlice = String.prototype.slice;\nObject.defineImmutableProperties(String.prototype, {\n    equals(s) {\n        return this === s;\n    },\n    boundEquals() {\n        return s => this === s;\n    },\n    // allow negative indices for end\n    slice(start = 0, end = this.length) {\n        if (end < 0) {\n            end = this.length + end;\n        }\n        return nativeSlice.call(this, start, end);\n    },\n});\nObject.defineImmutableProperties(Number, {\n    isNumber(n) {\n        return !Number.isNaN(n);\n    },\n    toPixels(n) {\n        return Math.round(n) + \"px\";\n    },\n});\nObject.defineImmutableProperties(Map.prototype, {\n    map(map) {\n        return new Map([...this].map(([k, v]) => [k, map(v, k)]));\n    },\n});\nObject.defineImmutableProperties(Set.prototype, {\n    map(map) {\n        return new Set([...this].map(map));\n    },\n});\n// don't touch RegExp.prototype,\n// since modifying it will bail out of RegExp's fast paths.\nif (typeof window !== \"undefined\") {\n    Object.defineImmutableProperties(Node.prototype, {\n        appendBefore(node) {\n            const { parentNode } = this;\n            parentNode && parentNode.insertBefore(node, this);\n            return node;\n        },\n        appendAfter(node) {\n            const { nextSibling } = this;\n            nextSibling && nextSibling.appendBefore(node);\n            return node;\n        },\n    });\n    Object.defineImmutableProperties(Element.prototype, {\n        clearHTML() {\n            this.innerHTML = \"\";\n        },\n        setAttributes(attributes) {\n            for (const [attribute, value] of Object.entries(attributes)) {\n                if (value) {\n                    this.setAttribute(attribute, value.toString());\n                }\n            }\n        },\n    });\n    Object.defineImmutableProperties(HTMLElement.prototype, {\n        appendTo(parent) {\n            parent.appendChild(this);\n            return this;\n        },\n        appendNewElement(tagName) {\n            return this.appendChild(document.createElement(tagName));\n        },\n        appendDiv() {\n            return this.appendNewElement(\"div\");\n        },\n        appendButton(buttonText) {\n            const button = this.appendNewElement(\"button\");\n            button.innerText = buttonText;\n            return button;\n        },\n        appendBr() {\n            return this.appendNewElement(\"br\");\n        },\n        withInnerText(text) {\n            this.innerText = text;\n            return this;\n        },\n        withInnerHTML(html) {\n            this.innerHTML = html;\n            return this;\n        },\n    });\n    Object.defineImmutableProperties(HTMLIFrameElement.prototype, {\n        activate() {\n            this.appendTo(document.body);\n            return this;\n        },\n    });\n}\nexports.addExtensions = function () {\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/extensions/allExtensions.ts?");

/***/ }),

/***/ "./src/ts/util/functional/utils.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/functional/utils.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.identity = (t) => t;\n\n\n//# sourceURL=webpack:///./src/ts/util/functional/utils.ts?");

/***/ }),

/***/ "./src/ts/util/hash/fnv1a.ts":
/*!***********************************!*\
  !*** ./src/ts/util/hash/fnv1a.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst OFFSET_BASIS_32 = 2166136261;\nexports.fnv1a = function (s) {\n    let hash = OFFSET_BASIS_32;\n    for (let i = 0; i < s.length; i++) {\n        hash ^= s.charCodeAt(i);\n        // 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619\n        // Using bitshift for accuracy and performance. Numbers in JS suck.\n        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);\n    }\n    return hash | 0;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/hash/fnv1a.ts?");

/***/ }),

/***/ "./src/ts/util/objectFields.ts":
/*!*************************************!*\
  !*** ./src/ts/util/objectFields.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isType_1 = __webpack_require__(/*! ./types/isType */ \"./src/ts/util/types/isType.ts\");\nvar objectFields;\n(function (objectFields) {\n    objectFields.map = function (t, mapper) {\n        return t.mapFields(mapper);\n    };\n    objectFields.callEach = function (functions) {\n        return objectFields.map(functions, f => f());\n    };\n    objectFields.callEachArgs = function (functions, args) {\n        return objectFields.map(functions, f => f(args));\n    };\n    objectFields.awaitAll = function (promises) {\n        if (!Object.values(promises).some(isType_1.isPromise)) {\n            return promises;\n        }\n        return (async () => (await Object.entries(promises)\n            .asyncMap(async ([key, promise]) => [key, await promise])).toObject())();\n    };\n    objectFields.awaitGetters = function (asyncGetters) {\n        return objectFields.awaitAll(objectFields.callEach(asyncGetters));\n    };\n    objectFields.awaitFunctions = function (asyncFunctions, args) {\n        return objectFields.awaitAll(objectFields.callEachArgs(asyncFunctions, args));\n    };\n})(objectFields = exports.objectFields || (exports.objectFields = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/objectFields.ts?");

/***/ }),

/***/ "./src/ts/util/regex.ts":
/*!******************************!*\
  !*** ./src/ts/util/regex.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar regex;\n(function (regex_1) {\n    regex_1.toSource = function (regExp) {\n        const { source, flags } = regExp;\n        return `/${source}/${flags}`;\n    };\n    regex_1.join = function (...regexes) {\n        const source = regexes.map(e => e.source).join(\"\");\n        const flagChars = regexes.map(e => e.flags).join(\"\").split(\"\");\n        const flags = flagChars && [...new Set(flagChars)].join(\"\");\n        return new RegExp(source, flags);\n    };\n    regex_1.matchAll = function (regex, s) {\n        if (!regex.global) {\n            throw new Error(\"trying to matchAll with non global regex\");\n        }\n        const matches = [];\n        let match;\n        while (match = regex.exec(s)) {\n            matches.push(match);\n        }\n        return matches;\n    };\n})(regex = exports.regex || (exports.regex = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/regex.ts?");

/***/ }),

/***/ "./src/ts/util/types/Truthy.ts":
/*!*************************************!*\
  !*** ./src/ts/util/types/Truthy.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.truthy = function (value) {\n    return !!value;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/types/Truthy.ts?");

/***/ }),

/***/ "./src/ts/util/types/isType.ts":
/*!*************************************!*\
  !*** ./src/ts/util/types/isType.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/ts/util/utils.ts\");\nexports.isNativeType = function (type) {\n    const typeName = `[object ${utils_1.capitalize(type)}]`;\n    const toString = Object.prototype.toString;\n    return (o) => toString.call(o) === typeName;\n};\n// can use isNativeType for all, but some can be optimized\nexports.isNull = (o) => o === null;\nexports.isUndefined = (o) => o === undefined;\nexports.isBoolean = (o) => o === true || o === false;\nexports.isNumber = exports.isNativeType(\"number\");\nexports.isString = exports.isNativeType(\"string\");\nexports.isFunction = exports.isNativeType(\"Function\"); // TODO can this be optimized?\nexports.isArray = Array.isArray;\nexports.isRegExp = exports.isNativeType(\"RegExp\");\nexports.isDate = exports.isNativeType(\"Date\");\nexports.isObject = exports.isNativeType(\"object\");\nexports.isByConstructor = function (constructor) {\n    return (o) => o.constructor === constructor;\n};\nexports.isDataView = exports.isByConstructor(DataView);\nexports.isArrayBuffer = exports.isByConstructor(ArrayBuffer);\nexports.isPromise = exports.isByConstructor(Promise);\n\n\n//# sourceURL=webpack:///./src/ts/util/types/isType.ts?");

/***/ }),

/***/ "./src/ts/util/utils.ts":
/*!******************************!*\
  !*** ./src/ts/util/utils.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.capitalize = function (word) {\n    return word.length === 0\n        ? \"\"\n        : word[0].toUpperCase() + word.slice(1);\n};\nexports.joinWords = function (words) {\n    const _words = [...words];\n    switch (_words.length) {\n        case 0:\n            return \"\";\n        case 1:\n            return _words[0];\n        case 2:\n            return _words[0] + \" and \" + _words[1];\n        default:\n            const lastWord = _words.pop();\n            return _words.join(\", \") + \", and \" + lastWord;\n    }\n};\nexports.separateClassName = function (className) {\n    return className.replace(/([A-Z])/g, \" $1\").trim();\n};\nexports.separateFunctionName = function (functionName) {\n    const [first, ...rest] = exports.separateClassName(functionName).split(\" \");\n    return [exports.capitalize(first), ...rest].join(\" \");\n};\nexports.joinNodes = function (nodes, node) {\n    if (nodes.length < 2) {\n        return nodes;\n    }\n    const joinedNodes = [];\n    for (let i = 0, j = 0; i < nodes.length; i++) {\n        joinedNodes.push(nodes[i]);\n        joinedNodes.push(node && node._clone());\n    }\n    joinedNodes.pop();\n    return joinedNodes;\n};\nexports.singletonAsArray = function (singletonOrArray) {\n    return Array.isArray(singletonOrArray) ? singletonOrArray : [singletonOrArray];\n};\nexports.filterInput = function (input, charFilter) {\n    input.value = input.value.split(\"\").filter(charFilter).join(\"\");\n};\n/**\n * Check if a single character string is a allowDigits.\n *\n * @param {string} char a single character string\n * @returns {boolean} if the character is a allowDigits 0-9\n */\nexports.isDigit = function (char) {\n    return !Number.isNaN(parseInt(char));\n};\nexports.onlyDigitsInput = function (input) {\n    exports.filterInput(input, exports.isDigit);\n};\nexports.sleep = function (seconds) {\n    return new Promise(resolve => setTimeout(resolve, seconds * 1000));\n};\nconst regExpLiteralPattern = /\\/([^\\/]+)\\/([gimuy]*)/;\nexports.isRegExpLiteral = function (regex) {\n    return regExpLiteralPattern.test(regex);\n};\nexports.parseRegExpLiteral = function (regex) {\n    const match = regExpLiteralPattern.exec(regex);\n    if (match) {\n        const [, pattern, flags] = match;\n        return new RegExp(pattern, flags);\n    }\n    else {\n        return undefined;\n    }\n};\nexports.escapeRegExp = function (literal, flags) {\n    return new RegExp(literal.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, \"\\\\$&\"), flags);\n};\nclass NotImplementedError extends Error {\n}\nexports.NotImplementedError = NotImplementedError;\nexports.lowerBound = function (min, n) {\n    return Math.max(min, n);\n};\nexports.upperBound = function (max, n) {\n    return Math.min(max, n);\n};\nexports.bound = function (min, max, n) {\n    return exports.lowerBound(min, exports.upperBound(max, n));\n};\nexports.boundSurrounding = function (min, max, center, halfSize) {\n    return [exports.lowerBound(min, center - halfSize), exports.upperBound(max, center + halfSize)];\n};\nexports.snippet = function (s, center, halfSize) {\n    const [start, end] = exports.boundSurrounding(0, s.length, center, halfSize);\n    return s.slice(start, end);\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/utils.ts?");

/***/ })

}]);