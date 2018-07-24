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
/******/ 		"server": 0
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
/******/ 	deferredModules.push(["./src/ts/ProjectScheduleViewer/server/server.ts","vendors~client~server","vendors~server","client~server"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/express/lib sync recursive":
/*!***************************************!*\
  !*** ./node_modules/express/lib sync ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/express/lib sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/express/lib_sync?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/server/FileSystemDataSource.ts":
/*!*********************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/server/FileSystemDataSource.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __webpack_require__(/*! fs-extra */ \"./node_modules/fs-extra/lib/index.js\");\nconst path_1 = __webpack_require__(/*! ../../util/polyfills/path */ \"./src/ts/util/polyfills/path.ts\");\nconst utils_1 = __webpack_require__(/*! ../../util/utils */ \"./src/ts/util/utils.ts\");\nconst Employee_1 = __webpack_require__(/*! ../share/data/access/Employee */ \"./src/ts/ProjectScheduleViewer/share/data/access/Employee.ts\");\nconst Month_1 = __webpack_require__(/*! ../share/data/access/Month */ \"./src/ts/ProjectScheduleViewer/share/data/access/Month.ts\");\nconst dir_1 = __webpack_require__(/*! ./dir */ \"./src/ts/ProjectScheduleViewer/server/dir.ts\");\nconst xlsx_1 = __webpack_require__(/*! ../../util/xlsx */ \"./src/ts/util/xlsx.ts\");\nconst parseEmployee = function (row) {\n    const [i, lastName, firstName, level, isLeader] = row;\n    return i === null ? undefined : [\n        firstName,\n        lastName,\n        parseInt(level),\n        utils_1.boolAsInt(isLeader === \"Y\"),\n    ];\n};\nconst parseProject = function (employees, positions) {\n    const parsePercent = function (defaultPercent = 0.00) {\n        return (s) => {\n            if (!s) {\n                return defaultPercent;\n            }\n            const percent = parseFloat(s.slice(0, -1));\n            return !percent ? defaultPercent : 0.01 * percent;\n        };\n    };\n    const GENERIC_EMPLOYEE_NAME = \"Staff ??\";\n    const employeeByName = function (name, levelString, rateString) {\n        if (!name) {\n            return;\n        }\n        const employee = employees.by.name(name);\n        if (employee) {\n            return employee;\n        }\n        if (name !== GENERIC_EMPLOYEE_NAME) {\n            return;\n        }\n        const level = parseInt(levelString);\n        if (!level) {\n            return;\n        }\n        const position = positions.by.level(level);\n        if (!position) {\n            return;\n        }\n        return employees.by.name(Employee_1.genericEmployeeName(position));\n    };\n    const parseProjectEmployees = function* (rows) {\n        for (const row of rows.slice(6)) {\n            const [, , , level, rate, name, ...months] = row;\n            const employee = employeeByName(name, level, rate);\n            if (!employee) {\n                continue;\n            }\n            yield [\n                employee.id,\n                months.slice(0, Month_1.Months.length).map(parsePercent()),\n            ];\n        }\n    };\n    return (rows) => {\n        const [id, name] = rows[2];\n        const percentLikelihood = parsePercent()(rows.find(row => row[1] === \"%AGE LIKELIHOOD:\")[5]);\n        return [\n            parseInt(id),\n            name,\n            [...parseProjectEmployees(rows)],\n            percentLikelihood,\n        ];\n    };\n};\nexports.fileSystemDataSource = {\n    positions: async () => {\n        const buffer = await fs.readFile(path_1.path.join(dir_1.dir.data, \"positions.csv\"));\n        const trim = (s) => s.trim();\n        const csv = buffer\n            .toString(\"utf8\")\n            .trim()\n            .split(\"\\n\")\n            .map(trim)\n            .map(line => line.split(\",\").map(trim));\n        return csv\n            .map(([level, name, rate]) => [parseInt(level), name, parseInt(rate)]);\n    },\n    employees: async () => {\n        const [sheet] = await xlsx_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, \"employees.xlsx\"));\n        return sheet.slice(3).mapFilter(parseEmployee);\n    },\n    teams: ({ leaders, employees, positions }) => leaders.all._()\n        .asyncMap(async (leader) => (await xlsx_1.readWorkBookAsCsv(path_1.path.join(dir_1.dir.data, \"teams\", `${leader.name}.xlsx`)))\n        .map(parseProject(employees, positions))),\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/server/FileSystemDataSource.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/server/config.ts":
/*!*******************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/server/config.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.gzipped = false; // TODO\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/server/config.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/server/dir.ts":
/*!****************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/server/dir.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__filename) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __webpack_require__(/*! fs */ \"./node_modules/node-libs-browser/mock/empty.js\");\nconst path_1 = __webpack_require__(/*! ../../util/polyfills/path */ \"./src/ts/util/polyfills/path.ts\");\nconst dirParts = path_1.path.parse(__filename).dir.split(path_1.path.sep);\nwhile (!fs.existsSync(path_1.path.join(...dirParts, \".git\"))) {\n    dirParts.pop();\n}\nvar dir;\n(function (dir) {\n    dir.root = path_1.path.join(...dirParts);\n    dir.dist = path_1.path.join(dir.root, \"dist\");\n    dir.src = path_1.path.join(dir.root, \"src\");\n    dir.data = path_1.path.join(dir.src, \"data\");\n    dir.test = path_1.path.join(dir.src, \"ts\", \"ProjectScheduleViewer\", \"server\", \"test\", \"data\");\n})(dir = exports.dir || (exports.dir = {}));\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/index.js\"))\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/server/dir.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/server/server.ts":
/*!*******************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/server/server.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __webpack_require__(/*! fs-extra */ \"./node_modules/fs-extra/lib/index.js\");\nconst allExtensions_1 = __webpack_require__(/*! ../../util/extensions/allExtensions */ \"./src/ts/util/extensions/allExtensions.ts\");\nconst path_1 = __webpack_require__(/*! ../../util/polyfills/path */ \"./src/ts/util/polyfills/path.ts\");\nconst production_1 = __webpack_require__(/*! ../../util/production */ \"./src/ts/util/production.ts\");\nconst ssr_1 = __webpack_require__(/*! ../ssr/ssr */ \"./src/ts/ProjectScheduleViewer/ssr/ssr.tsx\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/ts/ProjectScheduleViewer/server/config.ts\");\nconst dir_1 = __webpack_require__(/*! ./dir */ \"./src/ts/ProjectScheduleViewer/server/dir.ts\");\nconst e = __webpack_require__(/*! express */ \"./node_modules/express/index.js\");\nallExtensions_1.addExtensions();\nconst app = e();\nconst setGzipHeaders = function (response, type, gzipped) {\n    console.log(type);\n    if (!gzipped) {\n        return;\n    }\n    response.setHeader(\"Vary\", \"Accept-Encoding\");\n    for (const [key, value] of Object.entries({\n        Vary: \"Accept-Encoding\",\n        \"Content-Encoding\": \"gzip\",\n        \"Content-Type\": {\n            \"html\": \"text/html\",\n            \"js\": \"text/javascript\",\n        }[type],\n    })) {\n        response.setHeader(key, value);\n    }\n};\napp.get(\"/\", async (request, response) => {\n    try {\n        await ssr_1.reRenderApp(); // TODO for debugging\n        const { html, gzipped } = await ssr_1.getRenderedApp();\n        setGzipHeaders(response, \"html\", gzipped);\n        response.send(html);\n    }\n    catch (e) {\n        console.error(e);\n    }\n});\n(async () => {\n    (await fs.readdir(dir_1.dir.dist))\n        .filter(e => e.endsWith(\"js\"))\n        .forEach(file => {\n        app.get(`/${file}`, (request, response) => {\n            setGzipHeaders(response, \"js\", config_1.gzipped);\n            response.sendFile(path_1.path.join(dir_1.dir.dist, `${file}${config_1.gzipped ? \".gz\" : \"\"}`));\n        });\n    });\n})();\n// force v8 to compile and optimize\nproduction_1.inProduction(ssr_1.warmUpAppRenderer(10));\napp.listen(8000, () => console.log(\"listening\"));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/server/server.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/JsonData.ts":
/*!*************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/JsonData.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.dataToJsonData = function (data) {\n    return data.mapFields(e => e.raw);\n};\nexports.dataToJson = function (data) {\n    return JSON.stringify(exports.dataToJsonData(data));\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/JsonData.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/ssr/ssr.tsx":
/*!**************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/ssr/ssr.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __webpack_require__(/*! fs-extra */ \"./node_modules/fs-extra/lib/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst server_1 = __webpack_require__(/*! react-dom/server */ \"./node_modules/react-dom/server.browser.js\");\nconst gzip_1 = __webpack_require__(/*! ../../lib/gzip */ \"./src/ts/lib/gzip.ts\");\nconst path_1 = __webpack_require__(/*! ../../util/polyfills/path */ \"./src/ts/util/polyfills/path.ts\");\nconst Range_1 = __webpack_require__(/*! ../../util/Range */ \"./src/ts/util/Range.ts\");\nconst config_1 = __webpack_require__(/*! ../server/config */ \"./src/ts/ProjectScheduleViewer/server/config.ts\");\nconst dir_1 = __webpack_require__(/*! ../server/dir */ \"./src/ts/ProjectScheduleViewer/server/dir.ts\");\nconst FileSystemDataSource_1 = __webpack_require__(/*! ../server/FileSystemDataSource */ \"./src/ts/ProjectScheduleViewer/server/FileSystemDataSource.ts\");\nconst Data_1 = __webpack_require__(/*! ../share/data/Data */ \"./src/ts/ProjectScheduleViewer/share/data/Data.ts\");\nconst JsonData_1 = __webpack_require__(/*! ../share/data/JsonData */ \"./src/ts/ProjectScheduleViewer/share/data/JsonData.ts\");\nconst App_1 = __webpack_require__(/*! ./components/App */ \"./src/ts/ProjectScheduleViewer/ssr/components/App.tsx\");\nconst readTemplate = async function () {\n    const buffer = await fs.readFile(path_1.path.join(dir_1.dir.dist, \"ProjectScheduleViewer.html\"));\n    return buffer.toString(\"utf8\");\n};\nconst renderApp = async function () {\n    const [template, data] = await Promise.all([readTemplate(), Data_1.getAppData(FileSystemDataSource_1.fileSystemDataSource)]);\n    const insertionPoint = `<div id=\"not-${App_1.appId}\"></div>`;\n    const [before, after] = template.split(insertionPoint);\n    console.time(\"rendering\");\n    const html = [\n        before,\n        `<script>window.appData = '${JsonData_1.dataToJson(data)}'</script>`,\n        server_1.renderToString(React.createElement(App_1.App, { data: data })),\n        after,\n    ].join(\"\");\n    console.timeEnd(\"rendering\");\n    (async () => {\n        await fs.writeFile(path_1.path.join(dir_1.dir.test, \"index.html\"), html);\n    })();\n    return {\n        gzipped: config_1.gzipped,\n        html: config_1.gzipped ? await gzip_1.compression.gzip(html) : html,\n    };\n};\nlet renderedApp;\nlet renderedAppPromise = renderApp().then(app => renderedApp = app);\nexports.reRenderApp = async function () {\n    renderedAppPromise = renderApp();\n    return renderedApp = await renderedAppPromise;\n};\nexports.getRenderedApp = function () {\n    return renderedApp || renderedAppPromise;\n};\nexports.warmUpAppRenderer = function (repetitions = 10) {\n    return () => Range_1.Range.new(repetitions).toArray().asyncMap(exports.reRenderApp)\n        .then(() => undefined);\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/ssr/ssr.tsx?");

/***/ }),

/***/ "./src/ts/lib/gzip.ts":
/*!****************************!*\
  !*** ./src/ts/lib/gzip.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst zlib = __webpack_require__(/*! zlib */ \"./node_modules/browserify-zlib/lib/index.js\");\nconst makeCompression = function (gzip) {\n    return (buffer, options) => new Promise((resolve, reject) => {\n        const cb = (error, result) => {\n            error ? reject(error) : resolve(result);\n        };\n        options ? zlib.gzip(buffer, options, cb) : zlib.gzip(buffer, cb);\n    });\n};\nconst compressionNames = [\n    \"deflate\",\n    \"deflateRaw\",\n    \"gzip\",\n    \"gunzip\",\n    \"inflate\",\n    \"inflateRaw\",\n    \"unzip\",\n];\nexports.compression = compressionNames.map(name => [name, makeCompression(zlib[name])]).toObject();\n\n\n//# sourceURL=webpack:///./src/ts/lib/gzip.ts?");

/***/ }),

/***/ "./src/ts/lib/xlsx.ts":
/*!****************************!*\
  !*** ./src/ts/lib/xlsx.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! xlsx */ \"./node_modules/xlsx/xlsx.js\");\nvar xlsx;\n(function (xlsx) {\n    xlsx.version = _.version;\n    xlsx.readFile = _.readFile;\n    xlsx.read = _.read;\n    xlsx.writeFile = _.writeFile;\n    xlsx.write = _.write;\n    xlsx.utils = _.utils;\n    xlsx.stream = _.stream;\n    xlsx.SSF = _.SSF;\n    xlsx.CFB = _.CFB;\n})(xlsx = exports.xlsx || (exports.xlsx = {}));\n\n\n//# sourceURL=webpack:///./src/ts/lib/xlsx.ts?");

/***/ }),

/***/ "./src/ts/lib/xlsxAsync.ts":
/*!*********************************!*\
  !*** ./src/ts/lib/xlsxAsync.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __webpack_require__(/*! fs-extra */ \"./node_modules/fs-extra/lib/index.js\");\nconst xlsx_1 = __webpack_require__(/*! ./xlsx */ \"./src/ts/lib/xlsx.ts\");\n/**\n * xlsx uses synchronous IO functions,\n * which makes it really slow,\n * so this an async wrapper on top of xlsx.\n */\nvar xlsxAsync;\n(function (xlsxAsync) {\n    xlsxAsync.readFile = async function (filename, opts) {\n        const buffer = await fs.readFile(filename);\n        return xlsx_1.xlsx.read(buffer, {\n            type: \"buffer\",\n        });\n    };\n})(xlsxAsync = exports.xlsxAsync || (exports.xlsxAsync = {}));\n\n\n//# sourceURL=webpack:///./src/ts/lib/xlsxAsync.ts?");

/***/ }),

/***/ "./src/ts/util/polyfills/path.ts":
/*!***************************************!*\
  !*** ./src/ts/util/polyfills/path.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst nodePath = __webpack_require__(/*! path */ \"./node_modules/node-libs-browser/node_modules/path-browserify/index.js\");\nconst allExtensions_1 = __webpack_require__(/*! ../extensions/allExtensions */ \"./src/ts/util/extensions/allExtensions.ts\");\nconst pathBrowserify = __webpack_require__(/*! path-browserify */ \"../../node_modules/path-browserify/index.js\");\nallExtensions_1.addExtensions();\nexports.path = nodePath;\nconst oldNodePath = exports.path.fullClone();\n// add any missing properties in webpack's path polyfill\n// with the complete path-browserify polyfill\n// (even though they're supposed to be the same, they're not (path.parse is missing))\nObject.defineProperties(nodePath, Object.getOwnPropertyDescriptors(pathBrowserify));\nObject.defineProperties(nodePath, Object.getOwnPropertyDescriptors(oldNodePath));\n\n\n//# sourceURL=webpack:///./src/ts/util/polyfills/path.ts?");

/***/ }),

/***/ "./src/ts/util/xlsx.ts":
/*!*****************************!*\
  !*** ./src/ts/util/xlsx.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst xlsx_1 = __webpack_require__(/*! ../lib/xlsx */ \"./src/ts/lib/xlsx.ts\");\nconst xlsxAsync_1 = __webpack_require__(/*! ../lib/xlsxAsync */ \"./src/ts/lib/xlsxAsync.ts\");\nexports.readWorkBook = async function (filename) {\n    return xlsxAsync_1.xlsxAsync.readFile(filename);\n};\nexports.readWorkBookAsCsv = async function (filename) {\n    const wb = await exports.readWorkBook(filename);\n    return wb.SheetNames\n        .map(name => wb.Sheets[name])\n        .map(sheet => xlsx_1.xlsx.utils.sheet_to_json(sheet, {\n        header: 1,\n        defval: null,\n        blankrows: true,\n    }));\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/xlsx.ts?");

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 2:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///fs_(ignored)?");

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ }),

/***/ 4:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///stream_(ignored)?");

/***/ }),

/***/ 5:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///http_(ignored)?");

/***/ }),

/***/ 6:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 7:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ })

/******/ });