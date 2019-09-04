/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/ts/ProjectScheduleViewer/client/appClient.ts","vendors~app~login","vendors~app","app~login"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/ProjectScheduleViewer/client/appClient.ts":
/*!**********************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/client/appClient.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Data_1 = __webpack_require__(/*! ../share/data/Data */ \"./src/ts/ProjectScheduleViewer/share/data/Data.ts\");\nconst JsonDataSource_1 = __webpack_require__(/*! ../share/data/source/JsonDataSource */ \"./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts\");\nconst App_1 = __webpack_require__(/*! ../ssr/components/app/App */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/App.tsx\");\nconst ClientLoader_1 = __webpack_require__(/*! ../../util/ssr/ClientLoader */ \"./src/ts/util/ssr/ClientLoader.ts\");\nexports.appLoader = ClientLoader_1.ClientLoader.new({\n    create: App_1.createApp,\n    deserialize: () => Data_1.getAppData(JsonDataSource_1.jsonDataSource),\n});\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/client/appClient.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/Data.ts":
/*!*********************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/Data.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ./access/DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts\");\nconst Employee_1 = __webpack_require__(/*! ./access/Employee */ \"./src/ts/ProjectScheduleViewer/share/data/access/Employee.ts\");\nconst Position_1 = __webpack_require__(/*! ./access/Position */ \"./src/ts/ProjectScheduleViewer/share/data/access/Position.ts\");\nconst Team_1 = __webpack_require__(/*! ./access/Team */ \"./src/ts/ProjectScheduleViewer/share/data/access/Team.ts\");\nconst dataAccessors = { positions: Position_1.positions, employees: Employee_1.employees, leaders: Employee_1.leaders, teams: Team_1.teams };\nexports.data = DataAccessor_1.DataAccessor.data(dataAccessors);\nexports.getAppData = function (sources) {\n    // data.refresh();\n    return exports.data.get(sources);\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/Data.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts":
/*!************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ../../../../util/data/DataAccessor */ \"./src/ts/util/data/DataAccessor.ts\");\nexports.DataAccessor = DataAccessor_1.DataAccessorFactory.for();\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/access/Day.ts":
/*!***************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/access/Day.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Month_1 = __webpack_require__(/*! ./Month */ \"./src/ts/ProjectScheduleViewer/share/data/access/Month.ts\");\nconst dayLength = (() => {\n    const [first, second] = [1, 2].map(day => +new Date(2000, 0, day));\n    return (second - first) | 0;\n})();\nconst makeDay = function (day, date) {\n    return {\n        day,\n        date,\n        month: Month_1.Months[date.getMonth()],\n    };\n};\nexports.Day = {\n    of(date) {\n        date.setHours(0, 0, 0, 0);\n        return makeDay((+date / dayLength) | 0, date);\n    },\n    sinceEpoch(day) {\n        day = day | 0; // will always be i32\n        return makeDay(day, new Date((day + 1) * dayLength));\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/access/Day.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/access/Employee.ts":
/*!********************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/access/Employee.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts\");\nconst Position_1 = __webpack_require__(/*! ./Position */ \"./src/ts/ProjectScheduleViewer/share/data/access/Position.ts\");\nconst willBeLeader = (employee) => employee.isLeader;\nconst GENERIC_EMPLOYEE_LAST_NAME = \"???\";\nconst createGenericEmployee = function (position) {\n    return {\n        firstName: position.name,\n        lastName: GENERIC_EMPLOYEE_LAST_NAME,\n        level: position.level,\n        isLeader: false,\n        isReal: false,\n    };\n};\nconst createName = function ({ firstName, lastName }) {\n    return `${firstName} ${lastName}`;\n};\nexports.genericEmployeeName = function (position) {\n    return createName(createGenericEmployee(position));\n};\nexports.employees = DataAccessor_1.DataAccessor.new({\n    source: e => e.employees,\n    parse: ([firstName, lastName, level, isLeader]) => ({ firstName, lastName, level, isLeader: !!isLeader, isReal: true }),\n    preParsed: ({ positions }) => positions.all.map(createGenericEmployee),\n    create: (employee, id, { positions }) => {\n        const { firstName, lastName, level, isLeader, isReal } = employee;\n        const position = positions.by.level(level);\n        return !position ? undefined : {\n            id,\n            name: createName(employee),\n            firstName,\n            lastName,\n            position,\n            isLeader,\n            isReal,\n        };\n    },\n    by: { name: \"\" },\n}, { positions: Position_1.positions });\nexports.leaders = DataAccessor_1.DataAccessor.mapped(({ employees }) => employees.all\n    .filter(willBeLeader)\n    .map((e, i) => Object.assign(e, {\n    leaderId: i,\n    team: () => undefined,\n})), { name: \"\" }, { employees: exports.employees });\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/access/Employee.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/access/Month.ts":
/*!*****************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/access/Month.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst monthArgs = [\n    \"January\",\n    \"February\",\n    \"March\",\n    \"April\",\n    \"May\",\n    \"June\",\n    \"July\",\n    \"August\",\n    \"September\",\n    \"October\",\n    \"November\",\n    \"December\",\n].map(name => ({ name }));\nexports.Months = monthArgs.map((month, i) => ({\n    ...month,\n    ordinal: i,\n    date: new Date(new Date(2000, 1, 1).setMonth(i)),\n}));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/access/Month.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/access/Position.ts":
/*!********************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/access/Position.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../../../../util/functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts\");\nexports.positions = DataAccessor_1.DataAccessor.new({\n    source: e => e.positions,\n    parse: ([level, name, rate]) => ({ id: level, level, name, rate }),\n    create: utils_1.identity,\n    by: { level: 0 },\n}, {});\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/access/Position.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/access/Team.ts":
/*!****************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/access/Team.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst sparseTranspose_1 = __webpack_require__(/*! ../../../../util/misc/sparseTranspose */ \"./src/ts/util/misc/sparseTranspose.ts\");\nconst DataAccessor_1 = __webpack_require__(/*! ./DataAccessor */ \"./src/ts/ProjectScheduleViewer/share/data/access/DataAccessor.ts\");\nconst Day_1 = __webpack_require__(/*! ./Day */ \"./src/ts/ProjectScheduleViewer/share/data/access/Day.ts\");\nconst Employee_1 = __webpack_require__(/*! ./Employee */ \"./src/ts/ProjectScheduleViewer/share/data/access/Employee.ts\");\nconst Position_1 = __webpack_require__(/*! ./Position */ \"./src/ts/ProjectScheduleViewer/share/data/access/Position.ts\");\nconst transposeEmployeeDates = function (employeeDates) {\n    const a = employeeDates.map(({ employee, dates }) => ({\n        i: employee,\n        row: dates.map(({ date, percentCommitted }) => ({ j: date, value: percentCommitted })),\n    }));\n    // Day.sinceEpoch is pretty fast, so use it\n    const b = sparseTranspose_1.sparseTreeTranspose(a, date => date.day, Day_1.Day.sinceEpoch);\n    return b.map(({ i, row }) => ({\n        date: i,\n        employees: row.map(({ j, value }) => ({ employee: j, percentCommitted: value })),\n    }));\n};\nconst makeProject = function (employees, leader, team) {\n    const byId = employees.by.index;\n    return ({ id, name, firstDate, percentLikelihood, employees: parsedEmployees }) => {\n        const employeeDates = parsedEmployees.map(({ employee, dates }) => ({\n            employee: {\n                employee: byId(employee),\n                project: () => project,\n            },\n            dates: dates.map(({ date, percentCommitted }) => ({ date: Day_1.Day.sinceEpoch(date + firstDate), percentCommitted })),\n        })).filter(e => !!e.employee.employee);\n        const project = {\n            id,\n            team,\n            leader,\n            name,\n            employees: employeeDates.map(e => e.employee),\n            dates: transposeEmployeeDates(employeeDates),\n            percentLikelihood,\n        };\n        return project;\n    };\n};\nconst makeTeam = function (employees, leader, { projects }) {\n    const team = {\n        id: leader.leaderId,\n        leader,\n        projects: projects.map(makeProject(employees, leader, () => team)),\n    };\n    leader.team = () => team;\n    return team;\n};\nexports.teams = DataAccessor_1.DataAccessor.new({\n    source: e => e.teams,\n    parse: projects => ({\n        projects: projects.map(([id, name, firstDate, employees, percentLikelihood]) => ({\n            id,\n            name,\n            firstDate,\n            employees: employees.map(([employee, dates]) => ({\n                employee,\n                dates: dates.map(([date, percentCommitted]) => ({ date, percentCommitted }))\n            })),\n            percentLikelihood,\n        })).sortBy(e => e.id),\n    }),\n    create: (parsed, id, { leaders, employees }) => makeTeam(employees, leaders.all[id], parsed),\n    by: {},\n}, { leaders: Employee_1.leaders, employees: Employee_1.employees, positions: Position_1.positions });\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/access/Team.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cache_1 = __webpack_require__(/*! ../../../../util/cache/cache */ \"./src/ts/util/cache/cache.ts\");\nconst ClientLoader_1 = __webpack_require__(/*! ../../../../util/ssr/ClientLoader */ \"./src/ts/util/ssr/ClientLoader.ts\");\nexports.jsonDataSource = () => ClientLoader_1.getClientJsonData()\n    .mapFields(e => cache_1.getter(e));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/App.tsx":
/*!*****************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/App.tsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst anyWindow_1 = __webpack_require__(/*! ../../../../util/window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst Graph_1 = __webpack_require__(/*! ./Graph */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/Graph.tsx\");\nconst ProjectTables_1 = __webpack_require__(/*! ./ProjectTables */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/ProjectTables.tsx\");\nexports.appId = \"app\";\nexports.App = ({ data }) => {\n    anyWindow_1.globals({ data });\n    return React.createElement(\"div\", { style: { margin: 25 } },\n        React.createElement(Graph_1.Graph, { data: data }),\n        React.createElement(ProjectTables_1.ProjectTables, { data: data }),\n        React.createElement(\"button\", { onClick: () => console.log(data) }, \"Button\"));\n};\nexports.createApp = function (data) {\n    return React.createElement(exports.App, { data: data });\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/App.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/CachedGraph.tsx":
/*!*************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/CachedGraph.tsx ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst d3_scale_1 = __webpack_require__(/*! d3-scale */ \"./node_modules/d3-scale/index.js\");\nconst d3_time_format_1 = __webpack_require__(/*! d3-time-format */ \"./node_modules/d3-time-format/index.js\");\nconst HashMap_1 = __webpack_require__(/*! ../../../../util/collections/HashMap */ \"./src/ts/util/collections/HashMap.ts\");\nconst VariableAreaStack_1 = __webpack_require__(/*! ../../../../util/components/svg/graph/VariableAreaStack */ \"./src/ts/util/components/svg/graph/VariableAreaStack.tsx\");\nconst prepareData = function (data, filter) {\n    const hash = (date) => +date;\n    const map = HashMap_1.HashMap.perfectHash({\n        keysHashEquals: {\n            hash,\n            equals: (t1, t2) => hash(t1) === hash(t2),\n        },\n    });\n    data.teams.all\n        .flatMap(e => e.projects._())\n        .flatMap(e => e.dates._())\n        .forEach(({ date, employees }) => map.getOrPutDefault(date.date, [])\n        .addAll(employees.filter(e => filter(e.employee))));\n    return map;\n};\nexports.CachedGraph = function ({ data, filter, order, color }) {\n    // TODO reorganize\n    const updateGraphData = (reScale) => VariableAreaStack_1.VariableAreaStack({\n        data: prepareData(data, filter),\n        values: {\n            x: d => d,\n            y: d => d.percentCommitted * d.employee.project().percentLikelihood,\n            z: d => d.employee,\n        },\n        flat: true,\n        extendLast: {\n            // inverse: x => new Date(x),\n            increment: x1 => {\n                const x2 = new Date(x1); // make copy\n                x2.setMonth(x1.getMonth() + 1); // allow overflow, will go to next year\n                return x2;\n            },\n        },\n        forceDomain: reScale ? undefined : graph.domain,\n    });\n    let graphData = updateGraphData(true);\n    const updateGraph = () => graphData({\n        zLine: employee => employee.employee.isReal ? 1 : 0,\n        orderBy: order.order,\n        orderByLength: order.all(data).length,\n        scale: {\n            x: d3_scale_1.scaleTime(),\n        },\n        axes: {\n            x: (axis, xData) => axis\n                .tickFormat(d3_time_format_1.timeFormat(\"%B\"))\n                .ticks(xData.length),\n        },\n        axesNames: {\n            x: \"Month\",\n            y: \"Number of Employees\",\n        },\n        size: { width: 1000, height: 400 },\n        margins: { left: 50, top: 50, right: 50, bottom: 50 },\n    });\n    let graph = updateGraph();\n    const updateNode = () => graph.render({\n        color: (e, i) => color(order.order(e, i)),\n        tooltip: order.tooltip,\n    });\n    let node = updateNode();\n    return (props) => {\n        const sameGraphData = props.data === data && props.filter === filter && !props.reScale;\n        if (!sameGraphData) {\n            data = props.data;\n            filter = props.filter;\n            graphData = updateGraphData(props.reScale);\n        }\n        const sameGraph = props.order === order;\n        if (!sameGraphData || !sameGraph) {\n            order = props.order;\n            graph = updateGraph();\n        }\n        const sameNode = props.color === color;\n        if (!sameGraphData || !sameGraph || !sameNode) {\n            color = props.color;\n            node = updateNode();\n        }\n        return node;\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/CachedGraph.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/FilterControls.tsx":
/*!****************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/FilterControls.tsx ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst DropdownButton = __webpack_require__(/*! react-bootstrap/lib/DropdownButton */ \"./node_modules/react-bootstrap/lib/DropdownButton.js\");\nconst MenuItem = __webpack_require__(/*! react-bootstrap/lib/MenuItem */ \"./node_modules/react-bootstrap/lib/MenuItem.js\");\nconst utils_1 = __webpack_require__(/*! ../../../../util/misc/utils */ \"./src/ts/util/misc/utils.ts\");\nconst OrderControls_1 = __webpack_require__(/*! ./OrderControls */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/OrderControls.tsx\");\nexports.FilterControls = ({ filters, data, setFilter, currentIndex }) => {\n    const FilterItem = function (filter, i, name) {\n        return React.createElement(MenuItem, { key: i, onSelect: () => setFilter(filter, i), active: i === currentIndex }, name);\n    };\n    return React.createElement(React.Fragment, null, filters.map(({ key: title, value: { filter, all, name } }, i) => React.createElement(DropdownButton, { key: i, title: utils_1.capitalize(title), id: i.toString() },\n        FilterItem(OrderControls_1.noFilter, -1, \"All\"),\n        all(data).map((e, i) => FilterItem(filter([e], false), i, name(e))))));\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/FilterControls.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/Graph.tsx":
/*!*******************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/Graph.tsx ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst d3_scale_chromatic_1 = __webpack_require__(/*! d3-scale-chromatic */ \"./node_modules/d3-scale-chromatic/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst Range_1 = __webpack_require__(/*! ../../../../util/collections/Range */ \"./src/ts/util/collections/Range.ts\");\nconst multiEvent_1 = __webpack_require__(/*! ../../../../util/events/multiEvent */ \"./src/ts/util/events/multiEvent.ts\");\nconst utils_1 = __webpack_require__(/*! ../../../../util/misc/utils */ \"./src/ts/util/misc/utils.ts\");\nconst CachedGraph_1 = __webpack_require__(/*! ./CachedGraph */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/CachedGraph.tsx\");\nconst GraphControls_1 = __webpack_require__(/*! ./GraphControls */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/GraphControls.tsx\");\nconst OrderControls_1 = __webpack_require__(/*! ./OrderControls */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/OrderControls.tsx\");\nconst accessors = {\n    employee: {\n        get: e => e.employee,\n        all: data => data.employees.all,\n        name: e => e.name,\n    },\n    project: {\n        get: e => e.project(),\n        all: data => data.teams.all.flatMap(e => e.projects._()),\n        name: e => e.name,\n    },\n    team: {\n        get: e => e.project().team(),\n        all: data => data.teams.all,\n        name: e => e.leader.name,\n    },\n    position: {\n        get: e => e.employee.position,\n        all: data => data.positions.all,\n        name: e => e.name,\n    },\n};\nclass Graph extends react_1.Component {\n    constructor() {\n        super(...arguments);\n        this.baseColor = utils_1.moduloIndexer(d3_scale_chromatic_1.schemeSet3);\n        this.state = {\n            color: this.baseColor,\n            order: OrderControls_1.indexOrder,\n            orderIndex: -1,\n            filter: OrderControls_1.noFilter,\n            filterIndex: -1,\n            reScale: false,\n        };\n        this.set = {\n            order: (order, orderIndex) => this.setState({ order, orderIndex }),\n            filter: (filter, filterIndex) => this.setState({ filter, filterIndex }),\n            reScale: () => this.setState({ reScale: true }, () => this.state.reScale = false),\n        };\n    }\n    render() {\n        const { props, state } = this;\n        const { data } = props;\n        const { color, order, filter, reScale } = state;\n        if (Range_1.Range.closed(1, 3).has(state.orderIndex)) {\n            const onClick = multiEvent_1.doubleEvent()(() => {\n            }, () => {\n            });\n        }\n        const graphProps = { data, filter, order, color, reScale };\n        const graphNode = (this.graph || (this.graph = CachedGraph_1.CachedGraph(graphProps)))(graphProps);\n        return React.createElement(React.Fragment, null,\n            React.createElement(GraphControls_1.GraphControls, { accessors: accessors, data: data, set: this.set, current: state }),\n            graphNode);\n    }\n}\nexports.Graph = Graph;\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/Graph.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/GraphControls.tsx":
/*!***************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/GraphControls.tsx ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst Button = __webpack_require__(/*! react-bootstrap/lib/Button */ \"./node_modules/react-bootstrap/lib/Button.js\");\nconst Br_1 = __webpack_require__(/*! ../../../../util/components/Br */ \"./src/ts/util/components/Br.tsx\");\nconst GraphAccessor_1 = __webpack_require__(/*! ../../../../util/components/svg/graph/GraphAccessor */ \"./src/ts/util/components/svg/graph/GraphAccessor.ts\");\nconst FilterControls_1 = __webpack_require__(/*! ./FilterControls */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/FilterControls.tsx\");\nconst OrderControls_1 = __webpack_require__(/*! ./OrderControls */ \"./src/ts/ProjectScheduleViewer/ssr/components/app/OrderControls.tsx\");\nconst Accessor = GraphAccessor_1.GraphAccessor;\nexports.GraphControls = ({ data, accessors: accessorsArgs, set, current }) => {\n    const accessors = Object.entries(accessorsArgs)\n        .map(([key, value]) => ({ key, value: Accessor.new(value) }));\n    return React.createElement(\"div\", { style: { textAlign: \"center\" } },\n        React.createElement(OrderControls_1.OrderControls, { orders: accessors, setOrder: set.order, currentIndex: current.orderIndex }),\n        React.createElement(Br_1.Br, { times: 1 }),\n        React.createElement(FilterControls_1.FilterControls, { filters: accessors, data: data, setFilter: set.filter, currentIndex: current.filterIndex }),\n        React.createElement(Br_1.Br, { times: 1 }),\n        React.createElement(Button, { onClick: set.reScale }, \"Re-Scale\"));\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/GraphControls.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/OrderControls.tsx":
/*!***************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/OrderControls.tsx ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst MenuItem = __webpack_require__(/*! react-bootstrap/lib/MenuItem */ \"./node_modules/react-bootstrap/lib/MenuItem.js\");\nconst math_1 = __webpack_require__(/*! ../../../../util/misc/math */ \"./src/ts/util/misc/math.ts\");\nconst utils_1 = __webpack_require__(/*! ../../../../util/misc/utils */ \"./src/ts/util/misc/utils.ts\");\nconst DropdownButton = __webpack_require__(/*! react-bootstrap/lib/DropdownButton */ \"./node_modules/react-bootstrap/lib/DropdownButton.js\");\nexports.indexOrder = {\n    order: (e, i) => i,\n    tooltip: (e, i) => i.toString(),\n    all: data => ({\n        length: math_1.sumBy(data.teams.all, e => math_1.sumBy(e.projects, e => e.employees.length))\n    }),\n};\nexports.noFilter = () => true;\nexports.OrderControls = ({ orders, setOrder, currentIndex }) => {\n    const OrderItem = (order, i, name) => React.createElement(MenuItem, { key: i, onSelect: () => setOrder(order, i), active: i === currentIndex }, name);\n    return React.createElement(DropdownButton, { title: \"Order\", id: \"\" },\n        OrderItem(exports.indexOrder, -1, \"Index\"),\n        orders.map(({ key: name, value: order }, i) => OrderItem(order, i, utils_1.capitalize(name))));\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/OrderControls.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/components/app/ProjectTables.tsx":
/*!***************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/components/app/ProjectTables.tsx ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst ProjectTable = ({ project }) => {\n    const border = { border: \"1px solid black\" };\n    return React.createElement(React.Fragment, null,\n        React.createElement(\"br\", null),\n        \"% Likelihood: \",\n        project.percentLikelihood,\n        React.createElement(\"br\", null),\n        React.createElement(\"table\", { style: { ...border, borderCollapse: \"collapse\" } },\n            React.createElement(\"thead\", null,\n                React.createElement(\"tr\", null,\n                    React.createElement(\"th\", { style: border },\n                        \"Project: \",\n                        project.name),\n                    project.employees.map((e, i) => React.createElement(\"th\", { key: i, style: border }, e.employee.name)))),\n            React.createElement(\"tbody\", null, project.dates.map((date, i) => React.createElement(\"tr\", { key: i },\n                React.createElement(\"td\", { style: border }, date.date.month.name),\n                date.employees.map((employee, i) => {\n                    return React.createElement(\"td\", { key: i, style: border }, employee.percentCommitted);\n                }))))),\n        React.createElement(\"br\", null));\n};\nexports.ProjectTables = ({ data }) => React.createElement(\"div\", null, data.teams.all.map(team => React.createElement(react_1.Fragment, { key: team.id },\n    React.createElement(\"br\", null),\n    React.createElement(\"br\", null),\n    \"Team \",\n    team.leader.name,\n    React.createElement(\"br\", null),\n    React.createElement(\"br\", null),\n    team.projects.map(project => React.createElement(ProjectTable, { project: project, key: project.id })),\n    React.createElement(\"br\", null),\n    React.createElement(\"br\", null))));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/components/app/ProjectTables.tsx?");

/***/ }),

/***/ "./src/ts/util/cache/cache.ts":
/*!************************************!*\
  !*** ./src/ts/util/cache/cache.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getter = function (t) {\n    return () => t;\n};\nexports.makeGetter = function () {\n    return exports.getter;\n};\nexports.cache = function (getter) {\n    return exports.refreshableCache(getter).get;\n};\nexports.refreshableCache = function (getter, onRefresh = () => {\n}) {\n    let cache;\n    const get = ((...args) => cache !== undefined ? cache : (cache = getter(...args)));\n    const refresh = () => {\n        cache = undefined;\n        onRefresh();\n    };\n    return {\n        get,\n        refresh,\n        getRefreshed: ((...args) => {\n            refresh();\n            return get(...args);\n        }),\n    };\n};\nexports.asyncCache = function (getter, onRefresh) {\n    return exports.refreshableAsyncCache(getter, onRefresh).get;\n};\nexports.refreshableAsyncCache = function (getter, onRefresh = () => {\n}) {\n    let cache;\n    const refresh = () => {\n        cache = undefined;\n        onRefresh();\n    };\n    const get = (args) => cache !== undefined ? cache : cache = (async () => cache = await getter(args))();\n    return {\n        get,\n        refresh,\n        getRefreshed: async (args) => {\n            refresh();\n            return await get(args);\n        },\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/cache/cache.ts?");

/***/ }),

/***/ "./src/ts/util/collections/ArrayStack.ts":
/*!***********************************************!*\
  !*** ./src/ts/util/collections/ArrayStack.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst bind_1 = __webpack_require__(/*! ../decorators/bind */ \"./src/ts/util/decorators/bind.ts\");\nconst hashEquals_1 = __webpack_require__(/*! ../misc/hashEquals */ \"./src/ts/util/misc/hashEquals.ts\");\nconst Collection_1 = __webpack_require__(/*! ./Collection */ \"./src/ts/util/collections/Collection.ts\");\nexports.ArrayStack = {\n    new({ elements = [], hashEquals = hashEquals_1.hashEquals.default_() }) {\n        const { equals } = hashEquals;\n        const a = bind_1.bind([...elements]);\n        const { size, push, pop, last: peek, clear, remove } = a;\n        // noinspection TypeScriptValidateJSTypes\n        return Collection_1.Collection.basedOn({\n            size,\n            add: e => (push(e), true),\n            remove: Collection_1.checkSizeChanged(size, (e) => remove(e, equals)),\n            clear,\n            [Symbol.iterator]: () => a[Symbol.iterator](),\n            push,\n            peek,\n            pop,\n        }, hashEquals, exports.ArrayStack.new);\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/ArrayStack.ts?");

/***/ }),

/***/ "./src/ts/util/collections/Collection.ts":
/*!***********************************************!*\
  !*** ./src/ts/util/collections/Collection.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst hash_1 = __webpack_require__(/*! ../misc/hash */ \"./src/ts/util/misc/hash.ts\");\nconst hashEquals_1 = __webpack_require__(/*! ../misc/hashEquals */ \"./src/ts/util/misc/hashEquals.ts\");\nconst equals_1 = __webpack_require__(/*! ../misc/equals */ \"./src/ts/util/misc/equals.ts\");\nexports.checkSizeChanged = function (size, wrapped) {\n    return arg => {\n        const originalSize = size();\n        wrapped(arg);\n        return originalSize !== size();\n    };\n};\nexports.Collection = {\n    basedOn(base, hashEquals, constructor) {\n        const { size, add, remove, clear } = base;\n        const { hash, equals } = hashEquals_1.hashEquals.fastEquals(hashEquals);\n        const makeHas = function (iter) {\n            return e => [...iter].some(equals_1.equals.bind(equals, e));\n        };\n        const iterArray = function (method) {\n            return (iter) => method([...iter]);\n        };\n        const iterArrayForEach = function (func) {\n            return iterArray(a => a.forEach(func));\n        };\n        const _checkSizeChanged = function (wrapped) {\n            return exports.checkSizeChanged(size, wrapped);\n        };\n        const construct = () => constructor;\n        const asyncConstruct = () => async ({ hashEquals, elements }) => construct()({ hashEquals, elements: await elements });\n        const maybeAsyncConstruct = ((async) => async ? asyncConstruct() : construct());\n        const arrayMethod = function (getter, returner) {\n            return (f, args) => {\n                const a = _.toArray();\n                const m = getter(a).bind(a);\n                // Object spread is used here like this\n                // so that all properties of args are included,\n                // even if they are not in CollectionArgs.\n                // This is b/c CollectionArgs can be subtyped,\n                // but Collection won't know about it and can't know about it,\n                // b/c Collection can't have higher kinded generic types.\n                return returner({\n                    ...{\n                        hashEquals: hashEquals_1.hashEquals.default_(),\n                    },\n                    ...args || {},\n                    ...{\n                        elements: m(f),\n                    },\n                });\n            };\n        };\n        const forEachMethod = function (forEachGetter) {\n            return arrayMethod(forEachGetter, (args) => args.elements);\n        };\n        const mappingMethod = function (mapGetter, async) {\n            return arrayMethod(mapGetter, maybeAsyncConstruct(async));\n        };\n        const filteringMethod = function (filterGetter, async) {\n            return (filter) => arrayMethod(filterGetter, maybeAsyncConstruct(async))(filter, { hashEquals });\n        };\n        const extended = {\n            isEmpty: () => size() === 0,\n            has: makeHas(base),\n            hasAll: iterArray(a => a.every(_.has)),\n            addAll: iterArrayForEach(add),\n            removeAll: _checkSizeChanged(iterArrayForEach(remove)),\n            retainAll: _checkSizeChanged(iter => _.retainIf(makeHas(iter))),\n            removeIf: _checkSizeChanged(filter => _.toArray().filter(filter).forEach(remove)),\n            retainIf: filter => _.removeIf(filter.negate()),\n            replaceAll: replacer => {\n                const mapped = _.toArray().map(replacer);\n                clear();\n                _.addAll(mapped);\n            },\n            toString: () => `[${_.toArray().join(\", \")}]`,\n            toArray: () => [..._],\n            random: () => _.toArray().random(),\n            forEach: forEachMethod(a => a.forEach),\n            asyncForEach: forEachMethod(a => a.asyncForEach),\n            equals: (c) => size() === c.size() && (() => {\n                const a = c.toArray();\n                return _.toArray().every((e, i) => equals(e, a[i]));\n            })(),\n            hash: () => _.toArray().map(hash).map(hash_1.hash.makeNumber).reduce((hash, h) => 31 * (hash | 0) + h, 1),\n            filter: filteringMethod(a => a.filter, false),\n            map: mappingMethod(a => a.map, false),\n            mapFilter: mappingMethod(a => a.mapFilter, false),\n            asyncFilter: filteringMethod(a => a.asyncFilter, true),\n            asyncMap: mappingMethod(a => a.asyncMap, true),\n            asyncMapFilter: mappingMethod(a => a.asyncMapFilter, true),\n            clone: () => _.map(e => e),\n        };\n        // type system not good enough with difference types, need to assert\n        const _ = Object.assign(base, extended);\n        return _;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/Collection.ts?");

/***/ }),

/***/ "./src/ts/util/collections/HashMap.ts":
/*!********************************************!*\
  !*** ./src/ts/util/collections/HashMap.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst bind_1 = __webpack_require__(/*! ../decorators/bind */ \"./src/ts/util/decorators/bind.ts\");\nconst iterables_1 = __webpack_require__(/*! ../functional/iterables */ \"./src/ts/util/functional/iterables.ts\");\nconst hash_1 = __webpack_require__(/*! ../misc/hash */ \"./src/ts/util/misc/hash.ts\");\nconst hashEquals_1 = __webpack_require__(/*! ../misc/hashEquals */ \"./src/ts/util/misc/hashEquals.ts\");\nconst utils_1 = __webpack_require__(/*! ../misc/utils */ \"./src/ts/util/misc/utils.ts\");\nconst typeAliases_1 = __webpack_require__(/*! ../types/typeAliases */ \"./src/ts/util/types/typeAliases.ts\");\nconst ArrayStack_1 = __webpack_require__(/*! ./ArrayStack */ \"./src/ts/util/collections/ArrayStack.ts\");\nconst Collection_1 = __webpack_require__(/*! ./Collection */ \"./src/ts/util/collections/Collection.ts\");\nconst HashSet_1 = __webpack_require__(/*! ./HashSet */ \"./src/ts/util/collections/HashSet.ts\");\n// TODO add referential version like in HashSet\n// TODO add perfect hash version (for keys like Date or enums), b/c can be optimized (no linked lists)\n// TODO add perfect hash version to HashSet, too\nexports.HashMap = {\n    new({ elements = [], hashEquals, keysHashEquals = hashEquals_1.hashEquals.default_(), valuesHashEquals = hashEquals_1.hashEquals.default_(), }) {\n        const exists = (node) => node.exists;\n        const { hash, equals } = hashEquals_1.hashEquals.fastEquals(keysHashEquals);\n        const { hash: valueHash, equals: valueEquals } = hashEquals_1.hashEquals.fastEquals(valuesHashEquals);\n        hashEquals = {\n            hash: ({ key, value }) => hash_1.hash.makeNumber(hash(key)) ^ hash_1.hash.makeNumber(valueHash(value)),\n            equals: (e1, e2) => equals(e1.key, e2.key) && valueEquals(e1.value, e2.value),\n        };\n        const table = bind_1.bind(new typeAliases_1.NativeMap());\n        const { clear, values } = table;\n        const getNode = function (key) {\n            const h = hash(key);\n            let node = table.get(h);\n            if (!node) {\n                return {\n                    exists: false,\n                    key,\n                    put: value => (table.set(h, { key, value }), undefined),\n                    remove: () => undefined,\n                };\n            }\n            // explicitly check first node\n            if (equals(key, node.key)) {\n                const n = node;\n                n.key = key;\n                return {\n                    exists: true,\n                    key,\n                    value: n.value,\n                    put: value => {\n                        const v = n.value;\n                        n.value = value;\n                        return v;\n                    },\n                    remove: () => {\n                        const value = n.value;\n                        table.delete(h);\n                        return value;\n                    },\n                };\n            }\n            for (let next, prev; next = node.next; prev = node, node = next) {\n                const k = node.key;\n                if (!equals(k, key)) {\n                    continue;\n                }\n                const n = node;\n                n.key = key;\n                return {\n                    exists: true,\n                    key: n.key,\n                    value: n.value,\n                    put: value => {\n                        const v = n.value;\n                        n.value = value;\n                        return v;\n                    },\n                    remove: () => {\n                        const value = n.value;\n                        if (prev) {\n                            prev.next = next;\n                        }\n                        else if (next) {\n                            table.set(h, next);\n                        }\n                        else {\n                            table.delete(h);\n                        }\n                        return value;\n                    },\n                };\n            }\n            const n = node;\n            return {\n                exists: false,\n                key,\n                put: value => (n.next = { key, value }, undefined),\n                remove: () => n.next = undefined,\n            };\n        };\n        const size = () => table.size;\n        const put = function (key, value) {\n            return getNode(key).put(value);\n        };\n        const removeKey = function (key) {\n            return getNode(key).remove();\n        };\n        const sized = function (wrapped) {\n            return Collection_1.checkSizeChanged(size, wrapped);\n        };\n        const base = {\n            size,\n            clear,\n            add: ({ key, value }) => {\n                const node = getNode(key);\n                node.put(value);\n                return !node.exists;\n            },\n            remove: ({ key, value }) => {\n                const node = getNode(key);\n                if (exists(node) && valueEquals(value, node.value)) {\n                    node.remove();\n                    return true;\n                }\n                return false;\n            },\n            [Symbol.iterator]: function* () {\n                for (let node of values()) {\n                    for (let n = node; n; n = n.next) {\n                        yield n;\n                    }\n                }\n            },\n        };\n        const hasKey = function (key) {\n            return getNode(key).exists;\n        };\n        const get = function (key) {\n            return getNode(key).value;\n        };\n        const getOrDefault = function (key, defaultValue) {\n            const node = getNode(key);\n            return exists(node) ? node.value : defaultValue;\n        };\n        const getOrPutDefault = function (key, defaultValue) {\n            const node = getNode(key);\n            return exists(node) ? node.value : (node.put(defaultValue), defaultValue);\n        };\n        const getByValue = function (remove) {\n            return function (v) {\n                for (const { key, value } of base) {\n                    if (valueEquals(v, value)) {\n                        if (remove) {\n                            removeKey(key);\n                        }\n                        return true;\n                    }\n                }\n                return false;\n            };\n        };\n        const removeValue = getByValue(true);\n        const putIfDefined = function (node, value) {\n            if (value !== undefined) {\n                node.put(value);\n            }\n            else {\n                node.remove();\n            }\n            return value;\n        };\n        // noinspection TypeScriptValidateJSTypes\n        const map = {\n            ...{},\n            put,\n            removeKey,\n            removeValue,\n            hasKey,\n            get,\n            getOrDefault,\n            getOrPutDefault,\n            putIfAbsent: (key, value) => {\n                const node = getNode(key);\n                if (!node.exists) {\n                    node.put(value);\n                }\n            },\n            putAll: map => {\n                // TODO optimize\n                addAll(map);\n            },\n            replace: (key, value) => {\n                const node = getNode(key);\n                return exists(node) ? node.put(value) : undefined;\n            },\n            replaceIfEquals: (key, oldValue, newValue) => {\n                const node = getNode(key);\n                const replace = exists(node) && valueEquals(oldValue, node.value);\n                if (replace) {\n                    node.put(newValue);\n                }\n                return replace;\n            },\n            computeIfAbsent: ((key, mapper) => {\n                const node = getNode(key);\n                if (exists(node)) {\n                    return node.value;\n                }\n                return putIfDefined(node, mapper(key));\n            }),\n            computeIfPresent: (key, remapper) => {\n                const node = getNode(key);\n                if (!exists(node)) {\n                    return undefined;\n                }\n                return putIfDefined(node, remapper(key, node.value));\n            },\n            compute: (key, remapper) => {\n                const node = getNode(key);\n                return putIfDefined(node, remapper(key, node.value));\n            },\n            merge: (key, value, remapper) => {\n                const node = getNode(key);\n                return putIfDefined(node, remapper(key, exists(node) ? node.value : value));\n            },\n            hasValue: getByValue(false),\n            entries: () => _,\n            keys: () => Collection_1.Collection.basedOn({\n                size,\n                clear,\n                add: () => {\n                    throw new utils_1.NotImplementedError();\n                },\n                remove: e => {\n                    const node = getNode(e);\n                    node.remove();\n                    return node.exists;\n                },\n                ...iterables_1.iterables.map(_, e => e.key),\n                has: hasKey,\n            }, keysHashEquals, HashSet_1.HashSet.new),\n            values: () => Collection_1.Collection.basedOn({\n                size,\n                clear,\n                add: () => {\n                    throw new utils_1.NotImplementedError();\n                },\n                remove: removeValue,\n                ...iterables_1.iterables.map(_, e => e.value),\n            }, valuesHashEquals, ArrayStack_1.ArrayStack.new),\n        };\n        const extended = {\n            has: ({ key, value }) => {\n                const node = getNode(key);\n                return exists(node) && valueEquals(value, node.value);\n            },\n            toString: () => `{${toArray()\n                .map(({ key, value }) => `${key} = ${value}`)\n                .join(\"\\n\")}`,\n        };\n        const _ = Collection_1.Collection.basedOn({\n            ...base,\n            ...map,\n            ...extended,\n        }, hashEquals, exports.HashMap.new);\n        // TODO why do I need this type assertion\n        const { toArray, addAll } = _;\n        addAll(elements);\n        return _;\n    },\n    referential(args) {\n        args.keysHashEquals = hashEquals_1.hashEquals.referential();\n        return exports.HashMap.new(args);\n    },\n    perfectHash(args) {\n        // TODO\n        return exports.HashMap.new(args);\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/HashMap.ts?");

/***/ }),

/***/ "./src/ts/util/collections/HashSet.ts":
/*!********************************************!*\
  !*** ./src/ts/util/collections/HashSet.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst bind_1 = __webpack_require__(/*! ../decorators/bind */ \"./src/ts/util/decorators/bind.ts\");\nconst iterables_1 = __webpack_require__(/*! ../functional/iterables */ \"./src/ts/util/functional/iterables.ts\");\nconst hashEquals_1 = __webpack_require__(/*! ../misc/hashEquals */ \"./src/ts/util/misc/hashEquals.ts\");\nconst typeAliases_1 = __webpack_require__(/*! ../types/typeAliases */ \"./src/ts/util/types/typeAliases.ts\");\nconst Collection_1 = __webpack_require__(/*! ./Collection */ \"./src/ts/util/collections/Collection.ts\");\nconst HashMap_1 = __webpack_require__(/*! ./HashMap */ \"./src/ts/util/collections/HashMap.ts\");\nexports.HashSet = {\n    new({ elements = [], hashEquals = hashEquals_1.hashEquals.default_() }) {\n        if (hashEquals_1.hashEquals.isReferential(hashEquals)) {\n            // if using referential HashEquals, use optimized referential version\n            return exports.HashSet.referential({ elements });\n        }\n        const { value, done } = elements[Symbol.iterator]().next();\n        if (!done && ![\"object\", \"function\"].includes(typeof value)) {\n            // if using a primitive type, always use referential version\n            return exports.HashSet.referential({ elements }); // don't need hashEquals\n        }\n        const { size, clear, hasKey: has, put, removeKey: remove, keys, replaceAll, } = HashMap_1.HashMap.new({\n            elements: iterables_1.iterables.map(elements, e => ({ key: e, value: null })),\n            keysHashEquals: hashEquals,\n            valuesHashEquals: {\n                hash: t => 0,\n                equals: () => true,\n            },\n        });\n        // noinspection TypeScriptValidateJSTypes\n        return Collection_1.Collection.basedOn({\n            size,\n            add: e => put(e, null) !== null,\n            remove: e => remove(e) === null,\n            clear,\n            [Symbol.iterator]: () => keys()[Symbol.iterator](),\n            has,\n            replaceAll: replacer => replaceAll(({ key, value }) => ({ key: replacer(key), value })),\n        }, hashEquals, exports.HashSet.new);\n    },\n    referential(args) {\n        const { elements = [] } = args;\n        // always use referential HashEquals, ignore args\n        const hashEquals = hashEquals_1.hashEquals.referential();\n        const nativeSet = bind_1.bind(new typeAliases_1.NativeSet(elements));\n        const { add, has, delete: remove, clear, [Symbol.iterator]: iterator, forEach } = nativeSet;\n        const size = () => nativeSet.size;\n        // noinspection TypeScriptValidateJSTypes\n        return Collection_1.Collection.basedOn({\n            size,\n            add: Collection_1.checkSizeChanged(size, add),\n            remove,\n            clear,\n            [Symbol.iterator]: () => iterator(),\n            has,\n            forEach: (func => {\n                let i = 0;\n                forEach(e => func(e, i++));\n            }),\n        }, hashEquals, exports.HashSet.referential);\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/HashSet.ts?");

/***/ }),

/***/ "./src/ts/util/collections/Range.ts":
/*!******************************************!*\
  !*** ./src/ts/util/collections/Range.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst anyWindow_1 = __webpack_require__(/*! ../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nexports.Range = {\n    new(from, to) {\n        const _from = to === undefined ? 0 : from;\n        const _to = to === undefined ? from : to;\n        return {\n            fill(t) {\n                return [...new Array(_to - _from)].fill(t);\n            },\n            toArray() {\n                return [...new Array(_to - _from)].map((e, i) => i + _from);\n            },\n            map(map) {\n                return this.toArray().map(map);\n            },\n            filter(func) {\n                return this.toArray().filter(func);\n            },\n            forEach(func) {\n                for (let i = _from; i < _to; i++) {\n                    func(i);\n                }\n            },\n            toInterval() {\n                return [_from, _to];\n            },\n            has(i) {\n                return i >= _from && i < _to;\n            },\n        };\n    },\n    open(from, to) {\n        return exports.Range.new(from + 1, to);\n    },\n    closed(from, to) {\n        return exports.Range.new(from, to + 1);\n    },\n    ofDomain(domain) {\n        return this.new(Math.min(...domain), Math.max(...domain));\n    },\n};\nanyWindow_1.globals({ range: exports.Range });\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/Range.ts?");

/***/ }),

/***/ "./src/ts/util/collections/query/All.ts":
/*!**********************************************!*\
  !*** ./src/ts/util/collections/query/All.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.All = {\n    of(a, bySample) {\n        const map = (key) => new Map(a.map(e => [e[key], e]));\n        const mapBy = (key) => {\n            const byMap = map(key);\n            return (by) => byMap.get(by);\n        };\n        const maps = Object.keys(bySample)\n            .map(key => [key, mapBy(key)]);\n        const byMap = maps.toObject();\n        return {\n            all: a,\n            by: Object.assign(byMap, {\n                index: (i) => a[i],\n            }),\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/collections/query/All.ts?");

/***/ }),

/***/ "./src/ts/util/components/Br.tsx":
/*!***************************************!*\
  !*** ./src/ts/util/components/Br.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst Repeat_1 = __webpack_require__(/*! ./Repeat */ \"./src/ts/util/components/Repeat.tsx\");\nexports.Br = ({ times = 1 }) => React.createElement(Repeat_1.Repeat, { times: times, render: () => React.createElement(\"br\", null) });\n\n\n//# sourceURL=webpack:///./src/ts/util/components/Br.tsx?");

/***/ }),

/***/ "./src/ts/util/components/Repeat.tsx":
/*!*******************************************!*\
  !*** ./src/ts/util/components/Repeat.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst Range_1 = __webpack_require__(/*! ../collections/Range */ \"./src/ts/util/collections/Range.ts\");\nexports.Repeat = ({ times, render }) => {\n    const node = render();\n    return React.createElement(React.Fragment, null, Range_1.Range.new(times).map(i => React.createElement(react_1.Fragment, { key: i }, node)));\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/components/Repeat.tsx?");

/***/ }),

/***/ "./src/ts/util/components/react.tsx":
/*!******************************************!*\
  !*** ./src/ts/util/components/react.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nexports.renderNodes = function (nodes) {\n    return nodes.map((node, i) => React.createElement(react_1.Fragment, { key: i }, node));\n};\nexports.renderNodesObj = function (nodes) {\n    return exports.renderNodes(Object.values(nodes));\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/components/react.tsx?");

/***/ }),

/***/ "./src/ts/util/components/svg/graph/Axes.tsx":
/*!***************************************************!*\
  !*** ./src/ts/util/components/svg/graph/Axes.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst d3_selection_1 = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst FauxComponent_1 = __webpack_require__(/*! ../../../dom/faux/FauxComponent */ \"./src/ts/util/dom/faux/FauxComponent.ts\");\nconst react_2 = __webpack_require__(/*! ../../react */ \"./src/ts/util/components/react.tsx\");\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/ts/util/components/svg/utils.ts\");\nconst _Axes = function (props) {\n    const { axes, names, size: { width, height }, margins: { left, top, right, bottom }, } = props;\n    const [gx, gy] = Object.values(axes).map(axis => {\n        const { element: g, render } = FauxComponent_1.FauxComponent.new(\"g\");\n        axis(d3_selection_1.select(g));\n        return render();\n    });\n    return react_2.renderNodesObj({\n        axes: React.createElement(React.Fragment, null,\n            React.createElement(\"g\", { transform: utils_1.translate(0, height) }, gx),\n            gy),\n        names: React.createElement(React.Fragment, null,\n            names.x && React.createElement(\"text\", { transform: utils_1.translate(width / 2, height + top), style: { textAnchor: \"middle\" } }, names.x),\n            names.y && React.createElement(\"text\", { transform: utils_1.rotate(-90), y: -left, x: -height / 2, dy: \"1em\", style: { textAnchor: \"middle\" } }, names.y)),\n    });\n};\nexports.Axes = function (props) {\n    return react_1.createElement(_Axes, props);\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/components/svg/graph/Axes.tsx?");

/***/ }),

/***/ "./src/ts/util/components/svg/graph/GraphAccessor.ts":
/*!***********************************************************!*\
  !*** ./src/ts/util/components/svg/graph/GraphAccessor.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isType_1 = __webpack_require__(/*! ../../../types/isType */ \"./src/ts/util/types/isType.ts\");\nexports.GraphAccessor = (() => {\n    const has = function (a) {\n        if (isType_1.isBoolean(a)) {\n            return () => a;\n        }\n        const set = new Set(a);\n        return t => set.has(t);\n    };\n    return {\n        new({ get, all, name }) {\n            return {\n                get,\n                order: e => get(e).id,\n                filter: (include, exclude) => {\n                    const includes = has(include);\n                    const excludes = has(exclude);\n                    return e => {\n                        const t = get(e);\n                        return includes(t) && !excludes(t);\n                    };\n                },\n                all,\n                name,\n                tooltip: e => {\n                    const t = get(e);\n                    return `${name(t)}: ${t.id}`;\n                },\n            };\n        },\n    };\n})();\n\n\n//# sourceURL=webpack:///./src/ts/util/components/svg/graph/GraphAccessor.ts?");

/***/ }),

/***/ "./src/ts/util/components/svg/graph/VariableAreaStack.tsx":
/*!****************************************************************!*\
  !*** ./src/ts/util/components/svg/graph/VariableAreaStack.tsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst classNames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\nconst d3_axis_1 = __webpack_require__(/*! d3-axis */ \"./node_modules/d3-axis/index.js\");\nconst d3_scale_1 = __webpack_require__(/*! d3-scale */ \"./node_modules/d3-scale/index.js\");\nconst d3_scale_chromatic_1 = __webpack_require__(/*! d3-scale-chromatic */ \"./node_modules/d3-scale-chromatic/index.js\");\nconst d3_shape_1 = __webpack_require__(/*! d3-shape */ \"./node_modules/d3-shape/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst Range_1 = __webpack_require__(/*! ../../../collections/Range */ \"./src/ts/util/collections/Range.ts\");\nconst production_1 = __webpack_require__(/*! ../../../env/production */ \"./src/ts/util/env/production.ts\");\nconst utils_1 = __webpack_require__(/*! ../../../functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst groupBy_1 = __webpack_require__(/*! ../../../misc/groupBy */ \"./src/ts/util/misc/groupBy.ts\");\nconst math_1 = __webpack_require__(/*! ../../../misc/math */ \"./src/ts/util/misc/math.ts\");\nconst utils_2 = __webpack_require__(/*! ../../../misc/utils */ \"./src/ts/util/misc/utils.ts\");\nconst isType_1 = __webpack_require__(/*! ../../../types/isType */ \"./src/ts/util/types/isType.ts\");\nconst anyWindow_1 = __webpack_require__(/*! ../../../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst utils_3 = __webpack_require__(/*! ../utils */ \"./src/ts/util/components/svg/utils.ts\");\nconst Axes_1 = __webpack_require__(/*! ./Axes */ \"./src/ts/util/components/svg/graph/Axes.tsx\");\nexports.VariableAreaStack = function (props) {\n    const { data: nonStandardizedData, values, flat = false, extendLast, forceDomain = {}, } = props;\n    const dataAsEntries = function (data) {\n        const a = [...data];\n        if (a.length === 0) {\n            return [];\n        }\n        if (!isType_1.isArray(a[0])) {\n            return a;\n        }\n        return a.map(([key, value]) => ({ key, value }));\n    };\n    /**\n     * Adds a new entry before every non-first entry\n     * w/ the current key and the previous value.\n     * This creates a column chart effect.\n     */\n    const flattenData = function (data) {\n        if (!flat) {\n            return data;\n        }\n        return [...(function* () {\n                for (let i = 0; i < data.length; i++) {\n                    const e = data[i];\n                    if (i !== 0) {\n                        yield { key: e.key, value: data[i - 1].value };\n                    }\n                    yield e;\n                    if (extendLast && i === data.length - 1) {\n                        const { inverse, increment } = extendLast;\n                        if (increment) {\n                            yield { key: increment(e.key), value: e.value };\n                        }\n                        else {\n                            const start = +data[0].key;\n                            const end = +e.key;\n                            const range = end - start;\n                            const avgInterval = range / data.length;\n                            const next = end + avgInterval;\n                            yield { key: inverse(next), value: e.value };\n                        }\n                    }\n                }\n            })()];\n    };\n    const standardizeData = function () {\n        const data = dataAsEntries(nonStandardizedData);\n        switch (data.length) {\n            case 0:\n                return;\n            case 1:\n                return data;\n            default:\n                return flattenData(data);\n        }\n    };\n    const data = standardizeData();\n    if (!data) {\n        return () => ({\n            domain: {\n                x: [undefined, undefined],\n                y: [NaN, NaN],\n            },\n            render: () => null,\n        });\n    }\n    const xData = data.map(e => e.key);\n    const xValues = xData.map(values.x);\n    const yData = data.map(e => e.value);\n    const numZ = Math.max(...yData.map(e => e.length));\n    const zRange = Range_1.Range.new(numZ);\n    const keys = zRange.toArray();\n    const zData = zRange\n        // TODO check mapFilter or map\n        .map(i => yData._().mapFilter(e => e[i]))\n        .mapFilter(e => {\n        if (e.length === 0) {\n            return;\n        }\n        if (production_1.development) {\n            if (new Set(e.map(values.z)).size > 1) {\n                throw new Error(`each zDatum contains non-unique keys`);\n            }\n        }\n        return {\n            key: values.z(e[0]),\n            value: e.map(values.y),\n        };\n    });\n    const colorFromArray = function (colors) {\n        const color = utils_2.moduloIndexer(colors);\n        return (z, i) => color(i);\n    };\n    const xDomain = forceDomain.x || [xValues[0], xValues._().last()];\n    const value = (d, i) => {\n        if (i > d.length) {\n            return 0;\n        }\n        return values.y(d[i]);\n    };\n    return props => {\n        const { zLine, orderBy, orderByLength, offset = d3_shape_1.stackOffsetNone, scale: { x: xScale = d3_scale_1.scaleLinear(), y: yScale = d3_scale_1.scaleLinear(), } = {}, axes: { x: xAxis = utils_1.identity, y: yAxis = utils_1.identity, } = {}, axesNames = {}, size, margins = {}, className, curve, defined, glyph, reverse = false, } = props;\n        const { width, height } = size;\n        const { left = 0, top = 0, bottom = 0, right = 0 } = margins;\n        const _margins = { left, top, bottom, right };\n        const outerWidth = width + left + right;\n        const outerHeight = height + top + bottom;\n        const x = xScale.range([0, width])\n            .domain(xDomain);\n        const y = yScale.range([height, 0]);\n        const path = d3_shape_1.area()\n            .x((d, i) => x(xValues[i]))\n            .y0(d => y(d[0]))\n            .y1(d => y(d[1]));\n        curve && path.curve(curve);\n        defined && path.defined((d, i) => defined(d.data, i));\n        const order = !orderBy ? null : (series) => {\n            // if orderByLength is given, can optimize this\n            // groups will be buckets, with orderBy() giving the bucket index\n            // therefore use a pre-filled, packed smi array\n            // otherwise use [], a hash-map like array\n            const indexedZData = series.map((e, i) => ({ i, z: zData[i] }));\n            const groupBy = (e, i) => orderBy(e.z.key, i);\n            const groups = orderByLength\n                ? groupBy_1.groupByOrdinal(indexedZData, groupBy, orderByLength)\n                : groupBy_1.groupByNumber(indexedZData, groupBy);\n            for (const group of groups) {\n                for (const e of group) {\n                    series[e.i].hello = e.z;\n                }\n            }\n            // need to remove holes if used groupByNumber\n            return (orderByLength ? groups : utils_2.makeBlasphemous(groups))\n                .flatMap(group => group.flatMap(ize => ize.i));\n            // return series.map((e, i) => ({i, value: zData[i].key}))\n            //     .sortBy(e => orderBy(e.value, e.i))\n            //     .map(e => e.i);\n        };\n        const seriesData = d3_shape_1.stack()\n            .keys(keys)\n            .value(value)\n            .order(order || d3_shape_1.stackOrderNone)\n            .offset(offset)(yData._());\n        const zLineHeight = zLine && math_1.sum(zData.map(e => e.key).map(zLine));\n        reverse && seriesData.reverse();\n        const yDomain = forceDomain.y || [\n            Math.min(...seriesData[0].map(e => e[0]), zLine ? zLineHeight : Infinity),\n            Math.max(...seriesData.last().map(e => e[1]), zLine ? zLineHeight : -Infinity),\n        ];\n        y.domain(yDomain);\n        const paths = seriesData.mapFilter(path);\n        const zLinePath = zLineHeight && (() => {\n            const [x1, x2] = xDomain.map(x);\n            const _y = y(zLineHeight);\n            // TODO add argument for controlling line's style\n            return React.createElement(\"line\", { x1: x1, x2: x2, y1: _y, y2: _y, stroke: \"black\" });\n        })();\n        const _className = classNames(\"variable-area-stack\", className);\n        const glyphNodes = !!glyph && React.createElement(\"g\", { className: \"vx-area-stack-glyphs\" }, xData.map(glyph));\n        const axesNode = React.createElement(\"g\", null, Axes_1.Axes({\n            axes: {\n                x: xAxis(d3_axis_1.axisBottom(x), xData),\n                y: yAxis(d3_axis_1.axisLeft(y), yData),\n            },\n            names: axesNames,\n            size,\n            margins: _margins,\n        }));\n        return {\n            domain: {\n                x: xDomain,\n                y: yDomain,\n            },\n            render: props => {\n                const { color = d3_scale_chromatic_1.schemeCategory10, tooltip, } = props;\n                const _color = isType_1.isReadonlyArray(color) ? colorFromArray(color) : color;\n                const Area = (path, i) => {\n                    const { key, value } = zData[i];\n                    return React.createElement(\"path\", { key: i, className: _className, d: path, fill: _color(key, i), onMouseOver: e => {\n                            const mouseX = x.invert(e.nativeEvent.offsetX - left);\n                            const nextIndex = xValues.findIndex(x => x > mouseX);\n                            const xRegion = xValues[nextIndex - 1];\n                            return (anyWindow_1.anyWindow.f || (() => {\n                            }))({ e, x, y, mouseX, xValues, xRegion });\n                        } }, tooltip && React.createElement(\"title\", null, tooltip(key, i)));\n                };\n                return React.createElement(\"svg\", { width: outerWidth, height: outerHeight },\n                    React.createElement(\"g\", { transform: utils_3.translate(left, top) },\n                        React.createElement(\"g\", null, paths.map(Area)),\n                        zLinePath,\n                        glyphNodes,\n                        axesNode));\n            }\n        };\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/components/svg/graph/VariableAreaStack.tsx?");

/***/ }),

/***/ "./src/ts/util/components/svg/utils.ts":
/*!*********************************************!*\
  !*** ./src/ts/util/components/svg/utils.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.translate = (x, y) => `translate(${x},${y})`;\nexports.rotate = (degrees) => `rotate(${degrees})`;\n\n\n//# sourceURL=webpack:///./src/ts/util/components/svg/utils.ts?");

/***/ }),

/***/ "./src/ts/util/data/DataAccessor.ts":
/*!******************************************!*\
  !*** ./src/ts/util/data/DataAccessor.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cache_1 = __webpack_require__(/*! ../cache/cache */ \"./src/ts/util/cache/cache.ts\");\nconst All_1 = __webpack_require__(/*! ../collections/query/All */ \"./src/ts/util/collections/query/All.ts\");\nconst objectFields_1 = __webpack_require__(/*! ../object/objectFields */ \"./src/ts/util/object/objectFields.ts\");\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nexports.DataAccessorFactory = {\n    for() {\n        return {\n            new: ({ source, parse, preParsed = () => [], create, by }, argsGetter) => {\n                return cache_1.refreshableAsyncCache(async (sources) => {\n                    const args = await objectFields_1.objectFields.awaitRefreshableCaches(argsGetter, sources);\n                    const raw = await source(sources)(args);\n                    const parsed = raw.map(parse);\n                    // do it twice so index is correct 2nd time\n                    const a = [\n                        ...parsed.filter((e, i) => create(e, i, args)),\n                        ...preParsed(args),\n                    ].mapFilter((e, i) => create(e, i, args));\n                    return {\n                        ...All_1.All.of(a, by),\n                        parsed,\n                        raw,\n                    };\n                });\n            },\n            mapped: (create, by, argsGetter) => {\n                return cache_1.refreshableAsyncCache(async (source) => {\n                    return All_1.All.of(create(await objectFields_1.objectFields.awaitRefreshableCaches(argsGetter, source)), by);\n                });\n            },\n            data: (dataAccessors) => {\n                return cache_1.refreshableAsyncCache((source) => {\n                    const _source = isType_1.isFunction(source) ? source() : source;\n                    const dataPromises = dataAccessors.mapFields(e => e.get(_source));\n                    return objectFields_1.objectFields.awaitAll(dataPromises);\n                }, () => Object.values(dataAccessors).forEach(e => e.refresh()));\n            },\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/data/DataAccessor.ts?");

/***/ }),

/***/ "./src/ts/util/debug/DebugProxy.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/debug/DebugProxy.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nexports.DebugProxy = {\n    for(target, options = {}, name = \"Target\") {\n        const handler = {\n            get: (target, p, receiver) => {\n                if (!target._hasProperty(p) && (!isType_1.isString(p) || !p.startsWith(\"__\"))) {\n                    throw new TypeError(`${p.toString()} is not yet implemented on ${name} ${target}`);\n                }\n                return Reflect.get(target, p, receiver);\n            },\n        };\n        for (const [key, value] of Object.entries(options)) {\n            if (value === false) {\n                handler[key] = undefined;\n            }\n        }\n        return new Proxy(target, handler);\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/debug/DebugProxy.ts?");

/***/ }),

/***/ "./src/ts/util/decorators/bind.ts":
/*!****************************************!*\
  !*** ./src/ts/util/decorators/bind.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst anyWindow_1 = __webpack_require__(/*! ../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst allExtensions_1 = __webpack_require__(/*! ../extensions/allExtensions */ \"./src/ts/util/extensions/allExtensions.ts\");\nallExtensions_1.addExtensions();\nexports.bind = function (target) {\n    if (typeof target !== \"object\") {\n        throw new Error(`cannot bind non-object: ${target}`);\n    }\n    const _target = target;\n    const isBindable = (value) => value.bind && !value.bound; // don't double bind methods\n    const bind = (f) => {\n        f = f.bind(_target);\n        f.bound = true;\n        return f;\n    };\n    const properties = Object.getAllPropertyNames(target)\n        .map(key => ({ key, value: _target[key] }))\n        .filter(({ value }) => isBindable(value))\n        .map(({ key, value }) => [key, bind(value)])\n        .toObject(true);\n    Object.defineImmutableProperties(target, properties);\n    return target;\n};\nanyWindow_1.globals({ bind: exports.bind });\nexports.bindClass = function (Target) {\n    return class extends Target {\n        // noinspection JSUnusedGlobalSymbols\n        constructor(...args) {\n            super(...args);\n            exports.bind(this);\n        }\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/decorators/bind.ts?");

/***/ }),

/***/ "./src/ts/util/dom/faux/FauxComponent.ts":
/*!***********************************************!*\
  !*** ./src/ts/util/dom/faux/FauxComponent.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst FauxElement_1 = __webpack_require__(/*! ./FauxElement */ \"./src/ts/util/dom/faux/FauxElement.ts\");\nexports.FauxComponent = {\n    new(tagName) {\n        const element = FauxElement_1.FauxElement.new(tagName);\n        return {\n            element,\n            render: element.render,\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/dom/faux/FauxComponent.ts?");

/***/ }),

/***/ "./src/ts/util/dom/faux/FauxElement.ts":
/*!*********************************************!*\
  !*** ./src/ts/util/dom/faux/FauxElement.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst cache_1 = __webpack_require__(/*! ../../cache/cache */ \"./src/ts/util/cache/cache.ts\");\nconst DebugProxy_1 = __webpack_require__(/*! ../../debug/DebugProxy */ \"./src/ts/util/debug/DebugProxy.ts\");\nconst production_1 = __webpack_require__(/*! ../../env/production */ \"./src/ts/util/env/production.ts\");\nconst utils_1 = __webpack_require__(/*! ../../misc/utils */ \"./src/ts/util/misc/utils.ts\");\nconst libQuerySelectorAll = __webpack_require__(/*! query-selector */ \"./node_modules/query-selector/index.js\");\nexports.FauxElement = (() => {\n    const skipNameTransformationExpressions = [\n        /^data-/,\n        /^aria-/,\n    ];\n    const attributeNameMap = new Map([\n        [\"class\", \"className\"],\n    ]);\n    const attributeToPropName = (name) => {\n        if (skipNameTransformationExpressions.some(e => e.test(name))) {\n            return name;\n        }\n        return attributeNameMap.get(name) || utils_1.camelCase(name);\n    };\n    const eventNameMap = new Map([]);\n    const eventToPropName = (type) => {\n        return eventNameMap.get(type) || type;\n    };\n    const itemIndexed = (a) => {\n        const _a = a;\n        _a.item = i => a[i];\n        return _a;\n    };\n    const arrayToNodeList = (nodes) => {\n        return itemIndexed(nodes);\n    };\n    const arrayToHTMLCollection = (elements) => {\n        const htmlCollection = itemIndexed(elements);\n        if (production_1.development) {\n            return DebugProxy_1.DebugProxy.for(htmlCollection, {}, \"FauxElement.HTMLCollection\");\n        }\n        return htmlCollection;\n    };\n    const arrayToDomTokenList = (tokens) => {\n        // TODO\n        return tokens;\n    };\n    const child = (node) => node;\n    const isFaux = (node) => !!node.render;\n    return {\n        new(tagName, namespaceURI = \"http://www.w3.org/1999/xhtml\") {\n            const ownerDocument = fauxDocument;\n            const nodeName = tagName;\n            const nodeType = 1;\n            let parentNode;\n            let parentElement;\n            const setParent = (parent) => {\n                parentElement = parentNode = parent;\n            };\n            let innerHTML = \"\";\n            const childNodes = arrayToNodeList([]);\n            // const classList = arrayToDomTokenList([]);\n            const props = {};\n            // const eventListeners: Map<string, EventListenerOrEventListenerObject[]> = new Map();\n            const getAttribute = (name) => {\n                return props[attributeToPropName(name)] || null;\n                // return props.get(attributeToPropName(name)) || null;\n            };\n            const setAttribute = (name, value) => {\n                props[attributeToPropName(name)] = value;\n                // props.set(attributeToPropName(name), value);\n            };\n            const removeAttribute = (name) => {\n                delete props[attributeToPropName(name)];\n                // props.delete(attributeToPropName(name));\n            };\n            const getAttributeNode = (name) => {\n                const value = getAttribute(name);\n                if (!value) {\n                    return null;\n                }\n                const _attr = {\n                    name,\n                    value,\n                    specified: true,\n                    ownerElement: _,\n                };\n                const attr = _attr;\n                if (production_1.development) {\n                    return DebugProxy_1.DebugProxy.for(attr, {}, \"FauxElement.Attr\");\n                }\n                return attr;\n            };\n            // const addEventListener = (\n            //     type: string,\n            //     listener: EventListenerOrEventListenerObject,\n            //     options?: boolean | AddEventListenerOptions,\n            // ): void => {\n            //     const prop = eventToPropName(type);\n            //     const emptyListeners: EventListenerOrEventListenerObject[] = [];\n            //     const listeners = eventListeners.get(prop) || (eventListeners.set(prop,\n            //         emptyListeners), emptyListeners);\n            //     listeners.push(listener);\n            // };\n            // const removeEventListener = (\n            //     type: string,\n            //     listener: EventListenerOrEventListenerObject,\n            //     options?: boolean | EventListenerOptions,\n            // ): void => {\n            //     const prop = eventToPropName(type);\n            //     const listeners = eventListeners.get(prop);\n            //     if (listeners) {\n            //         listeners.remove(listener);\n            //     }\n            // };\n            const appendChild = (newChild) => {\n                newChild.parentElement = _;\n                childNodes.push(child(newChild));\n                return newChild;\n            };\n            const removeChild = (oldChild) => {\n                const removed = childNodes.remove(child(oldChild));\n                if (!removed) {\n                    throw new Error(\"Not Found Error\");\n                }\n                return oldChild;\n            };\n            // const remove = (): void => {\n            //     if (parentNode) {\n            //         parentNode.removeChild(_);\n            //     }\n            // };\n            const insertBefore = (newChild, refChild) => {\n                if (!refChild) {\n                    return appendChild(newChild);\n                }\n                const i = childNodes.indexOf(child(refChild));\n                if (i === -1) {\n                    return appendChild(child(newChild));\n                }\n                childNodes.add(i, child(newChild));\n                return newChild;\n            };\n            const isElement = (node) => node.nodeType === undefined || node.nodeType === 1;\n            const getChildren = () => {\n                return arrayToHTMLCollection(childNodes.filter(isElement));\n            };\n            // const getSibling = (offset: number): Node | null => {\n            //     if (!parentNode) {\n            //         return null;\n            //     }\n            //     const siblings = parentNode.childNodes as any as Node[];\n            //     return siblings[siblings.indexOf(_) + offset];\n            // };\n            const querySelectorAll = (selectors) => {\n                return libQuerySelectorAll(selectors, _);\n            };\n            const querySelector = (selectors) => {\n                return querySelectorAll(selectors)[0] || null;\n            };\n            const getElementsByTagName = (tagName) => {\n                const children = getChildren();\n                if (children.length === 0) {\n                    return arrayToNodeList([]);\n                }\n                const shallowMatches = tagName === \"*\"\n                    ? children\n                    : children.filter(e => e.nodeName === tagName);\n                const allMatches = shallowMatches.flatMap(e => [...e.getElementsByTagName(tagName)]);\n                return arrayToNodeList(allMatches);\n            };\n            // const getElementsByClassName = (className: string): NodeListOf<Element> => {\n            //     const children = getChildren();\n            //     if (children.length === 0) {\n            //         return arrayToNodeList([]);\n            //     }\n            //     const shallowMatches = tagName === \"*\"\n            //         ? children\n            //         : children.filter(e => e.className === className || [...e.classList].includes(className));\n            //     const allMatches = shallowMatches.flatMap(e => [...e.getElementsByTagName(tagName)]);\n            //     return arrayToNodeList(allMatches);\n            // };\n            const render = (key = 0) => {\n                const children = getChildren().map((e, i) => isFaux(e) ? e.render(i) : e);\n                if (innerHTML) {\n                    children.push(innerHTML);\n                }\n                const _props = props;\n                _props.key = key;\n                return react_1.createElement(nodeName, _props, children.length === 1 ? innerHTML : children);\n            };\n            const e = {\n                ownerDocument,\n                namespaceURI,\n                nodeName,\n                nodeType,\n                get parentNode() {\n                    return parentNode;\n                },\n                get parentElement() {\n                    return parentElement;\n                },\n                set parentNode(node) {\n                    setParent(node);\n                },\n                set parentElement(element) {\n                    setParent(element);\n                },\n                // get innerHTML() {\n                //     return innerHTML;\n                // },\n                // set innerHTML(html) {\n                //     innerHTML = html;\n                // },\n                get textContent() {\n                    return innerHTML;\n                },\n                set textContent(text) {\n                    innerHTML = text;\n                },\n                childNodes,\n                get children() {\n                    return getChildren();\n                },\n                // get nextSibling() {\n                //     return getSibling(+1);\n                // },\n                // get previousSibling() {\n                //     return getSibling(-1);\n                // },\n                // classList,\n                //\n                // get className() {\n                //     return classList.join(\" \");\n                // },\n                getAttribute,\n                setAttribute,\n                removeAttribute,\n                // getAttributeNode,\n                // addEventListener,\n                // removeEventListener,\n                appendChild,\n                removeChild,\n                // remove,\n                insertBefore,\n                querySelectorAll,\n                querySelector,\n                getElementsByTagName,\n                // getElementsByClassName,\n                render,\n            };\n            const _ = e;\n            if (production_1.development) {\n                return DebugProxy_1.DebugProxy.for(_, {}, \"FauxElement\");\n            }\n            return _;\n        },\n    };\n})();\nconst fauxDocument = (() => {\n    const getDocumentElement = cache_1.cache(() => exports.FauxElement.new(\"html\"));\n    const document = {\n        createElement: (tagName) => exports.FauxElement.new(tagName),\n        createElementNS: exports.FauxElement.new,\n        get documentElement() {\n            return getDocumentElement();\n        },\n    };\n    const _ = document;\n    if (production_1.development) {\n        return DebugProxy_1.DebugProxy.for(_, {}, \"FauxDocument\");\n    }\n    return _;\n})();\n\n\n//# sourceURL=webpack:///./src/ts/util/dom/faux/FauxElement.ts?");

/***/ }),

/***/ "./src/ts/util/env/production.ts":
/*!***************************************!*\
  !*** ./src/ts/util/env/production.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst when_1 = __webpack_require__(/*! ../misc/when */ \"./src/ts/util/misc/when.ts\");\nconst process = (global || window).process;\nconst nodeEnv = process && process.env && process.env.NODE_ENV;\nexports.production = !nodeEnv ? false : nodeEnv.toLowerCase() === \"production\";\nexports.development = !exports.production;\nexports.inProduction = when_1.when(exports.production);\nexports.inDevelopment = when_1.when(exports.development);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/ts/util/env/production.ts?");

/***/ }),

/***/ "./src/ts/util/events/multiEvent.ts":
/*!******************************************!*\
  !*** ./src/ts/util/events/multiEvent.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst globalWindow_1 = __webpack_require__(/*! ../window/globalWindow */ \"./src/ts/util/window/globalWindow.ts\");\nconst defaultInterval = 500;\nexports.multiEvent = function (intervalMs = defaultInterval) {\n    return (handler, ...handlers) => {\n        const setTimeout = globalWindow_1.globalWindow.setTimeout;\n        const clearTimeout = globalWindow_1.globalWindow.clearTimeout;\n        const numHandlers = handlers.length;\n        let events = [];\n        let prev = 0;\n        let timeoutId = 0;\n        if (handler) {\n            const fire = () => {\n                handler(events);\n                events = [];\n                prev = performance.now();\n            };\n            return event => {\n                timeoutId && clearTimeout(timeoutId);\n                events.push(event);\n                const now = performance.now();\n                if (events.length === 1) {\n                    prev = now;\n                }\n                const interval = now - prev;\n                prev = now;\n                if (interval > intervalMs) {\n                    fire();\n                }\n                else {\n                    timeoutId = setTimeout(fire, intervalMs - interval);\n                }\n            };\n        }\n        else {\n            switch (handlers.length) {\n                case 0:\n                    return () => { };\n                case 1:\n                    const handler = handlers[0];\n                    return event => handler([event]);\n                default:\n                    let numEvents = events.length;\n                    const fire = () => {\n                        handlers[numEvents - 1](events);\n                        events = [];\n                    };\n                    return event => {\n                        timeoutId && clearTimeout(timeoutId);\n                        events.push(event);\n                        numEvents = events.length;\n                        const now = performance.now();\n                        if (numEvents === 1) {\n                            prev = now;\n                        }\n                        const interval = now - prev;\n                        prev = now;\n                        if ((interval > intervalMs) || numEvents === numHandlers) {\n                            fire();\n                        }\n                        else {\n                            timeoutId = setTimeout(fire, intervalMs - interval);\n                        }\n                    };\n            }\n        }\n    };\n};\nexports.doubleEvent = function (intervalMs = defaultInterval) {\n    const multi = exports.multiEvent(intervalMs);\n    return (single, double) => multi(null, single, double);\n};\nexports.tripleEvent = function (intervalMs = defaultInterval) {\n    const multi = exports.multiEvent(intervalMs);\n    return (single, double, triple) => multi(null, single, double, triple);\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/events/multiEvent.ts?");

/***/ }),

/***/ "./src/ts/util/functional/iterables.ts":
/*!*********************************************!*\
  !*** ./src/ts/util/functional/iterables.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nvar iterables;\n(function (iterables) {\n    iterables.ofGenerator = function (generator) {\n        return {\n            [Symbol.iterator]: generator,\n        };\n    };\n    iterables.ofIterator = function (iterator) {\n        return iterables.ofGenerator(() => iterator);\n    };\n    iterables.map = function (iterable, map) {\n        if (isType_1.isArray(iterable)) {\n            return iterable.map(map);\n        }\n        return iterables.ofGenerator(function* () {\n            let i = 0;\n            for (const e of iterable) {\n                yield map(e, i++);\n            }\n        });\n    };\n})(iterables = exports.iterables || (exports.iterables = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/functional/iterables.ts?");

/***/ }),

/***/ "./src/ts/util/misc/groupBy.ts":
/*!*************************************!*\
  !*** ./src/ts/util/misc/groupBy.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Range_1 = __webpack_require__(/*! ../collections/Range */ \"./src/ts/util/collections/Range.ts\");\nexports.groupByOrdinal = function (a, group, numGroups) {\n    const groups = Range_1.Range.new(numGroups).map(() => []);\n    for (let i = 0; i < a.length; i++) {\n        const e = a[i];\n        groups[group(e, i)].push(e);\n    }\n    return groups;\n};\nexports.groupByNumber = function (a, group) {\n    const groups = [];\n    for (let i = 0; i < a.length; i++) {\n        const e = a[i];\n        const groupNum = group(e, i);\n        const _group = groups[groupNum];\n        if (_group) {\n            _group.push(e);\n        }\n        else {\n            groups[groupNum] = [e];\n        }\n    }\n    return groups;\n};\nexports.groupByString = function (a, group) {\n    const groups = {};\n    for (let i = 0; i < a.length; i++) {\n        const e = a[i];\n        const groupName = group(e, i);\n        const _group = groups[groupName];\n        if (_group) {\n            _group.push(e);\n        }\n        else {\n            groups[groupName] = [e];\n        }\n    }\n    return groups;\n};\nexports.groupBy = function (a, group) {\n    const groups = new Map();\n    for (let i = 0; i < a.length; i++) {\n        const e = a[i];\n        const groupName = group(e, i);\n        const _group = groups.get(groupName);\n        if (_group) {\n            _group.push(e);\n        }\n        else {\n            groups.set(groupName, [e]);\n        }\n    }\n    return groups;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/groupBy.ts?");

/***/ }),

/***/ "./src/ts/util/misc/hashEquals.ts":
/*!****************************************!*\
  !*** ./src/ts/util/misc/hashEquals.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst equals_1 = __webpack_require__(/*! ./equals */ \"./src/ts/util/misc/equals.ts\");\nconst hash_1 = __webpack_require__(/*! ./hash */ \"./src/ts/util/misc/hash.ts\");\nvar hashEquals;\n(function (hashEquals_1) {\n    const _referential = {\n        hash: hash_1.hash.referential(),\n        equals: equals_1.equals.referential(),\n    };\n    hashEquals_1.referential = function () {\n        return _referential;\n    };\n    hashEquals_1.isReferential = function (hashEquals) {\n        return hashEquals === _referential;\n    };\n    const _default = {\n        hash: hash_1.hash.default_(),\n        equals: equals_1.equals.default_(),\n    };\n    hashEquals_1.default_ = function () {\n        return _default;\n    };\n    hashEquals_1.fastEquals = function (hashEquals) {\n        return {\n            hash: hashEquals.hash,\n            equals: equals_1.equals.fast(hashEquals.equals),\n        };\n    };\n    hashEquals_1.fromHash = function (hash) {\n        return {\n            hash,\n            equals: equals_1.equals.by(hash),\n        };\n    };\n})(hashEquals = exports.hashEquals || (exports.hashEquals = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/hashEquals.ts?");

/***/ }),

/***/ "./src/ts/util/misc/math.ts":
/*!**********************************!*\
  !*** ./src/ts/util/misc/math.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.sum = function (a) {\n    let sum = 0;\n    for (const n of a) {\n        sum += n;\n    }\n    return sum;\n};\nexports.sumBy = function (a, by) {\n    let sum = 0;\n    for (const n of a) {\n        sum += by(n);\n    }\n    return sum;\n};\nconst checkNonEmpty = function (a, name) {\n    if (a.length === 0) {\n        throw new Error(`${name} does not exist b/c 0 elements in array`);\n    }\n};\nexports.min = function (a) {\n    checkNonEmpty(a, \"min\");\n    let min = a[0];\n    for (let i = 1; i < a.length; i++) {\n        const n = a[i];\n        if (n < min) {\n            min = n;\n        }\n    }\n    return min;\n};\nexports.max = function (a) {\n    checkNonEmpty(a, \"max\");\n    let max = a[0];\n    for (let i = 1; i < a.length; i++) {\n        const n = a[i];\n        if (n > max) {\n            max = n;\n        }\n    }\n    return max;\n};\nexports.range = function (a) {\n    checkNonEmpty(a, \"range\");\n    let min = a[0];\n    let max = min;\n    for (let i = 1; i < a.length; i++) {\n        const n = a[i];\n        if (n < min) {\n            min = n;\n        }\n        else if (n > max) {\n            max = n;\n        }\n    }\n    return [min, max];\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/math.ts?");

/***/ }),

/***/ "./src/ts/util/misc/sparseTranspose.ts":
/*!*********************************************!*\
  !*** ./src/ts/util/misc/sparseTranspose.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst HashSet_1 = __webpack_require__(/*! ../collections/HashSet */ \"./src/ts/util/collections/HashSet.ts\");\nconst hashEquals_1 = __webpack_require__(/*! ./hashEquals */ \"./src/ts/util/misc/hashEquals.ts\");\nexports.sparseTranspose = function (a) {\n    return a.map(({ i, j, value }) => ({ i: j, j: i, value }));\n};\nconst reconstructUsingHashNew = function (flat, hashJ, newJ) {\n    return [...new Set(flat.map(e => e.i).map(hashJ))]\n        .sort()\n        .map(h => ({\n        i: newJ(h),\n        row: flat.mapFilter(({ i, j, value }) => hashJ(i) === h && ({ j, value })),\n    }));\n};\nconst reconstructUsingHash = function (flat, hashJ) {\n    const { hash, equals } = hashEquals_1.hashEquals.fromHash(hashJ);\n    return [...HashSet_1.HashSet.new({\n            elements: flat.map(e => e.i),\n            hashEquals: { hash, equals },\n        })]\n        .sortBy(hash)\n        .map(_i => ({\n        i: _i,\n        row: flat.mapFilter(({ i, j, value }) => equals(i, _i) && ({ j, value })),\n    }));\n};\nexports.sparseTreeTranspose = function (a, hashJ, newJ) {\n    const flatA = a.flatMap(({ i, row }) => row.map(({ j, value }) => ({ i, j, value })));\n    const flatB = exports.sparseTranspose(flatA);\n    if (newJ) {\n        return reconstructUsingHashNew(flatB, hashJ, newJ);\n    }\n    else {\n        return reconstructUsingHash(flatB, hashJ);\n    }\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/sparseTranspose.ts?");

/***/ }),

/***/ "./src/ts/util/object/objectFields.ts":
/*!********************************************!*\
  !*** ./src/ts/util/object/objectFields.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nvar objectFields;\n(function (objectFields) {\n    objectFields.map = function (t, mapper) {\n        return t.mapFields(mapper);\n    };\n    objectFields.callEach = function (functions) {\n        return objectFields.map(functions, f => f());\n    };\n    objectFields.callEachArgs = function (functions, args) {\n        return objectFields.map(functions, f => f(args));\n    };\n    objectFields.awaitAll = function (promises) {\n        if (!Object.values(promises).some(isType_1.isPromise)) {\n            return promises;\n        }\n        return (async () => (await Object.entries(promises)\n            .asyncMap(async ([key, promise]) => [key, await promise])).toObject())();\n    };\n    objectFields.awaitGetters = function (asyncGetters) {\n        return objectFields.awaitAll(objectFields.callEach(asyncGetters));\n    };\n    objectFields.awaitFunctions = function (asyncFunctions, args) {\n        return objectFields.awaitAll(objectFields.callEachArgs(asyncFunctions, args));\n    };\n    objectFields.awaitRefreshableCaches = function (caches, args) {\n        return objectFields.awaitAll(objectFields.map(caches, e => e.get(args)));\n    };\n})(objectFields = exports.objectFields || (exports.objectFields = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/object/objectFields.ts?");

/***/ }),

/***/ "./src/ts/util/types/typeAliases.ts":
/*!******************************************!*\
  !*** ./src/ts/util/types/typeAliases.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.NativeMap = Map;\nexports.NativeSet = Set;\n\n\n//# sourceURL=webpack:///./src/ts/util/types/typeAliases.ts?");

/***/ }),

/***/ "./src/ts/util/window/globalWindow.ts":
/*!********************************************!*\
  !*** ./src/ts/util/window/globalWindow.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst anyWindow_1 = __webpack_require__(/*! ./anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nexports.globalWindow = anyWindow_1.isBrowser ? window : global;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/ts/util/window/globalWindow.ts?");

/***/ })

/******/ });