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
/******/ 		"client": 0
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
/******/ 	deferredModules.push(["./src/ts/ProjectScheduleViewer/client/client.ts","vendors~client~server","client~server"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/ProjectScheduleViewer/client/api.ts":
/*!****************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/client/api.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar api;\n(function (api) {\n    api.getAppData = async function () {\n        return {}; // TODO FIXME\n    };\n})(api = exports.api || (exports.api = {}));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/client/api.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/client/client.ts":
/*!*******************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/client/client.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst allExtensions_1 = __webpack_require__(/*! ../../util/extensions/allExtensions */ \"./src/ts/util/extensions/allExtensions.ts\");\nconst loadApp_1 = __webpack_require__(/*! ./loadApp */ \"./src/ts/ProjectScheduleViewer/client/loadApp.tsx\");\nconst main = function () {\n    allExtensions_1.addExtensions();\n    (async () => {\n        await loadApp_1.loadApp();\n    })();\n};\nmain();\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/client/client.ts?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/client/loadApp.tsx":
/*!*********************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/client/loadApp.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nconst anyWindow_1 = __webpack_require__(/*! ../../util/anyWindow */ \"./src/ts/util/anyWindow.ts\");\nconst Data_1 = __webpack_require__(/*! ../share/data/Data */ \"./src/ts/ProjectScheduleViewer/share/data/Data.ts\");\nconst JsonDataSource_1 = __webpack_require__(/*! ../share/data/source/JsonDataSource */ \"./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts\");\nconst App_1 = __webpack_require__(/*! ../ssr/components/App */ \"./src/ts/ProjectScheduleViewer/ssr/components/App.tsx\");\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/ts/ProjectScheduleViewer/client/api.ts\");\nexports.loadApp = async function () {\n    const data = anyWindow_1.anyWindow.appData ? await Data_1.getAppData(JsonDataSource_1.jsonDataSource) : await api_1.api.getAppData();\n    const appContainer = document.body.appendDiv();\n    let appRoot = document.getElementById(App_1.appId);\n    if (1 === 1 && appRoot) {\n        appRoot.remove();\n        appRoot = null;\n    }\n    if (appRoot) {\n        console.log(\"hydrating\");\n        appRoot.remove();\n        appContainer.appendChild(appRoot);\n        react_dom_1.hydrate(React.createElement(App_1.App, { data: data }), appContainer);\n    }\n    else {\n        console.log(\"rendering\");\n        react_dom_1.render(React.createElement(App_1.App, { data: data }), appContainer);\n    }\n};\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/client/loadApp.tsx?");

/***/ }),

/***/ "./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst anyWindow_1 = __webpack_require__(/*! ../../../../util/anyWindow */ \"./src/ts/util/anyWindow.ts\");\nconst cache_1 = __webpack_require__(/*! ../../../../util/cache */ \"./src/ts/util/cache.ts\");\nconst jsonData = JSON.parse(anyWindow_1.anyWindow.appData);\n// const jsonData: JsonData = fs.readJsonSync(path.join(dir.test, \"appData.json\"));\nexports.jsonDataSource = jsonData.mapFields(e => cache_1.getter(e));\n\n\n//# sourceURL=webpack:///./src/ts/ProjectScheduleViewer/share/data/source/JsonDataSource.ts?");

/***/ })

/******/ });