(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app~login"],{

/***/ "./src/ts/util/extensions/allExtensions.ts":
/*!*************************************************!*\
  !*** ./src/ts/util/extensions/allExtensions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst compare_1 = __webpack_require__(/*! ../misc/compare */ \"./src/ts/util/misc/compare.ts\");\nconst equals_1 = __webpack_require__(/*! ../misc/equals */ \"./src/ts/util/misc/equals.ts\");\nconst mapFields_1 = __webpack_require__(/*! ../object/mapFields */ \"./src/ts/util/object/mapFields.ts\");\nconst Truthy_1 = __webpack_require__(/*! ../types/Truthy */ \"./src/ts/util/types/Truthy.ts\");\nconst anyWindow_1 = __webpack_require__(/*! ../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nconst extensionsConfig_1 = __webpack_require__(/*! ./extensionsConfig */ \"./src/ts/util/extensions/extensionsConfig.ts\");\nconst immutableDescriptor = Object.freeze({\n    writable: extensionsConfig_1.writableExtensions,\n    enumerable: false,\n    configurable: true,\n});\nconst defineSharedProperties = function (obj, sharedDescriptor, propertyValues, overwrite = true) {\n    const properties = Object.getOwnPropertyDescriptors(propertyValues);\n    Object.entries(properties).forEach(([propertyName, property]) => {\n        if (!overwrite && obj[propertyName]) {\n            return;\n        }\n        property = { ...property, ...sharedDescriptor };\n        if (property.get || property.set) {\n            delete property.writable;\n        }\n        properties[propertyName] = property;\n    });\n    Object.defineProperties(obj, properties);\n};\ndefineSharedProperties(Object, immutableDescriptor, {\n    defineSharedProperties,\n    defineImmutableProperties(obj, propertyValues, overwrite = true) {\n        defineSharedProperties(obj, immutableDescriptor, propertyValues, overwrite);\n    },\n});\nObject.defineImmutableProperties(Object, {\n    allKeys(t) {\n        return [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];\n    },\n    allValues(t) {\n        return Object.allKeys(t).map(key => t[key]);\n    },\n    allEntries(t) {\n        return Object.allKeys(t).map(key => [key, t[key]]);\n    },\n    definePolyfillProperties(obj, propertyValues) {\n        Object.defineImmutableProperties(obj, propertyValues, false);\n    },\n    getPrototypeChain(object) {\n        const chain = [];\n        for (let o = object; o !== null; o = Object.getPrototypeOf(o)) {\n            chain.push(o);\n        }\n        return chain;\n    },\n    getAllPropertyNames(object) {\n        return Array.from(new Set(Object.getPrototypeChain(object)\n            .flatMap(proto => Object.getOwnPropertyNames(proto))));\n    },\n    assignProperties(target, ...sources) {\n        for (const source of sources) {\n            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));\n        }\n    },\n    getting(key) {\n        return o => o[key];\n    },\n    deleting(key) {\n        return o => {\n            delete o[key];\n            return o;\n        };\n    },\n});\nObject.defineImmutableProperties(Object.prototype, {\n    _hasProperty(property) {\n        for (let o = this; o !== null; o = Object.getPrototypeOf(o)) {\n            if (o.hasOwnProperty(property)) {\n                return true;\n            }\n        }\n        return false;\n    },\n    freeze() {\n        return Object.freeze(this);\n    },\n    seal() {\n        return Object.seal(this);\n    },\n    shallowClone() {\n        return Object.assign(Object.create(null), this);\n    },\n    fullClone() {\n        return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));\n    },\n    mapFields(mapper) {\n        return mapFields_1.mapFields(this, mapper);\n    },\n    freezeFields() {\n        for (const value of Object.values(this)) {\n            value.freeze();\n        }\n        return this;\n    }\n});\nObject.defineImmutableProperties(Function, {\n    compose(...funcs) {\n        const numFuncs = funcs.length;\n        if (numFuncs === 0) {\n            return () => undefined;\n        }\n        const [firstFunc, ...restFunc] = funcs;\n        if (numFuncs === 1) {\n            return firstFunc();\n        }\n        return function (...args) {\n            let result = firstFunc();\n            for (const func of funcs) {\n                result = func(result);\n            }\n            return result;\n        };\n    },\n});\nObject.defineImmutableProperties(Function.prototype, {\n    then_(nextFunc) {\n        return (arg) => nextFunc(this(arg));\n    },\n    applyReturning() {\n        return (arg) => {\n            this(arg);\n            return arg;\n        };\n    },\n    mapping() {\n        return array => array.map(this);\n    },\n    applying() {\n        return array => this(...array);\n    },\n    timed() {\n        const timer = (...args) => {\n            const { name } = this;\n            console.time(name);\n            const returnValue = this(...args);\n            console.timeEnd(name);\n            return returnValue;\n        };\n        return timer.named(\"timing_\" + this.name);\n    },\n    setName(name) {\n        Object.defineProperties(this, {\n            name: {\n                value: name,\n            },\n        });\n    },\n    named(name) {\n        this.setName(name);\n        return this;\n    },\n    negate() {\n        return ((...args) => !this(...args));\n    },\n});\nObject.defineImmutableProperties(Array.prototype, {\n    size() {\n        return this.length;\n    },\n    last() {\n        return this[this.length - 1];\n    },\n    clear() {\n        this.length = 0;\n    },\n    removeAt(index) {\n        return this.splice(index, 1)[0];\n    },\n    remove(value, equals) {\n        const i = !equals ? this.indexOf(value) : this.findIndex(equals_1.equals.bind(equals, value));\n        if (i !== -1) {\n            return this.removeAt(i);\n        }\n    },\n    add(index, value) {\n        this.splice(index, 0, value);\n    },\n    addAll(values, index = this.length) {\n        if (index === this.length) {\n            this.push(...values);\n        }\n        else {\n            this.splice(index, 0, ...values);\n        }\n    },\n    applyOn(func) {\n        return func(this);\n    },\n    callOn(func) {\n        return func(...this);\n    },\n    toObject(noPrototype = false) {\n        let o = noPrototype ? Object.create(null) : {};\n        for (const [k, v] of this) {\n            o[k] = v;\n        }\n        return o;\n    },\n    sortBy(key) {\n        return this.sort(compare_1.cmp.byNumber(key));\n    },\n    random() {\n        return this[Math.floor(Math.random() * this.length)];\n    },\n    mapCall() {\n        return this.map(f => f());\n    },\n    callEach(u) {\n        this.forEach(f => f(u));\n    },\n    async asyncForEach(func) {\n        await Promise.all(this.map(func));\n    },\n    mapFilter(map) {\n        return this.map(map).filter(Truthy_1.truthy);\n    },\n    asyncMap(map) {\n        return Promise.all(this.map(map));\n    },\n    async asyncFilter(filter) {\n        return (await Promise.all(this.map(async (value, index, array) => ({ value, filtered: await filter(value, index, array) })))).filter(e => e.filtered).map(e => e.value);\n    },\n    async asyncMapFilter(map) {\n        return (await Promise.all(this.map(map))).filter(Truthy_1.truthy);\n    },\n    readOnly() {\n        return this;\n    },\n    _() {\n        return this;\n    },\n});\nObject.definePolyfillProperties(Array.prototype, {\n    flatMap(flatMap, thisArg) {\n        if (thisArg) {\n            flatMap = flatMap.bind(thisArg);\n        }\n        return [].concat(...this.map(flatMap));\n    },\n    flatten(depth = -1) {\n        // TODO faster flatten polyfill\n        return depth === 0\n            ? this\n            : this.reduce((a, e) => a.concat(Array.isArray(e) ? e.flatten(depth - 1) : e), []);\n    },\n});\nconst nativeSlice = String.prototype.slice;\nObject.defineImmutableProperties(String.prototype, {\n    equals(s) {\n        return this === s;\n    },\n    boundEquals() {\n        return s => this === s;\n    },\n    // allow negative indices for end\n    slice(start = 0, end = this.length) {\n        if (end < 0) {\n            end = this.length + end;\n        }\n        return nativeSlice.call(this, start, end);\n    },\n});\nObject.defineImmutableProperties(Number, {\n    isNumber(n) {\n        return !Number.isNaN(n);\n    },\n    toPixels(n) {\n        return Math.round(n) + \"px\";\n    },\n});\nObject.defineImmutableProperties(Map.prototype, {\n    map(map) {\n        return new Map([...this].map(([k, v]) => [k, map(v, k)]));\n    },\n});\nObject.defineImmutableProperties(Set.prototype, {\n    map(map) {\n        return new Set([...this].map(map));\n    },\n});\n// don't touch RegExp.prototype,\n// since modifying it will bail out of RegExp's fast paths.\nif (anyWindow_1.isBrowser) {\n    Object.defineImmutableProperties(Node.prototype, {\n        appendBefore(node) {\n            const { parentNode } = this;\n            parentNode && parentNode.insertBefore(node, this);\n            return node;\n        },\n        appendAfter(node) {\n            const { nextSibling } = this;\n            nextSibling && nextSibling.appendBefore(node);\n            return node;\n        },\n    });\n    Object.defineImmutableProperties(Element.prototype, {\n        clearHTML() {\n            this.innerHTML = \"\";\n        },\n        setAttributes(attributes) {\n            for (const [attribute, value] of Object.entries(attributes)) {\n                if (value) {\n                    this.setAttribute(attribute, value.toString());\n                }\n            }\n        },\n    });\n    Object.defineImmutableProperties(HTMLElement.prototype, {\n        appendTo(parent) {\n            parent.appendChild(this);\n            return this;\n        },\n        appendNewElement(tagName) {\n            return this.appendChild(document.createElement(tagName));\n        },\n        appendDiv() {\n            return this.appendNewElement(\"div\");\n        },\n        appendButton(buttonText) {\n            const button = this.appendNewElement(\"button\");\n            button.innerText = buttonText;\n            return button;\n        },\n        appendBr() {\n            return this.appendNewElement(\"br\");\n        },\n        withInnerText(text) {\n            this.innerText = text;\n            return this;\n        },\n        withInnerHTML(html) {\n            this.innerHTML = html;\n            return this;\n        },\n    });\n    Object.defineImmutableProperties(HTMLIFrameElement.prototype, {\n        activate() {\n            this.appendTo(document.body);\n            return this;\n        },\n    });\n}\nexports.addExtensions = function () {\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/extensions/allExtensions.ts?");

/***/ }),

/***/ "./src/ts/util/extensions/extensionsConfig.ts":
/*!****************************************************!*\
  !*** ./src/ts/util/extensions/extensionsConfig.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.writableExtensions = false;\n\n\n//# sourceURL=webpack:///./src/ts/util/extensions/extensionsConfig.ts?");

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

/***/ "./src/ts/util/misc/compare.ts":
/*!*************************************!*\
  !*** ./src/ts/util/misc/compare.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cmp;\n(function (cmp) {\n    cmp.byNumber = function (keyExtractor) {\n        return (t1, t2) => keyExtractor(t1) - keyExtractor(t2);\n    };\n    cmp.byNumeric = function (keyExtractor) {\n        return cmp.byNumber(keyExtractor.then_(e => e.valueOf()));\n    };\n    cmp.byString = function (keyExtractor) {\n        return (t1, t2) => {\n            const k1 = keyExtractor(t1);\n            const k2 = keyExtractor(t2);\n            return k1 === k2 ? 0 : k1 < k2 ? -1 : 1;\n        };\n    };\n})(cmp = exports.cmp || (exports.cmp = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/compare.ts?");

/***/ }),

/***/ "./src/ts/util/misc/equals.ts":
/*!************************************!*\
  !*** ./src/ts/util/misc/equals.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst hash_1 = __webpack_require__(/*! ./hash */ \"./src/ts/util/misc/hash.ts\");\nconst regex_1 = __webpack_require__(/*! ./regex */ \"./src/ts/util/misc/regex.ts\");\nvar equals;\n(function (equals_1) {\n    const _referential = Object.is;\n    equals_1.referential = function () {\n        return _referential;\n    };\n    equals_1.bind = function (equals, t1) {\n        return t2 => equals(t1, t2);\n    };\n    equals_1.by = function (keyExtractor) {\n        return (t1, t2) => keyExtractor(t1) === keyExtractor(t2);\n    };\n    const _default = function (t1, t2) {\n        return _referential(t1, t2) || equals_1.by(hash_1.hash.referential())(t1, t2);\n    };\n    equals_1.default_ = function () {\n        return _default;\n    };\n    const isReferentialEqualitySource = (() => {\n        const twoArgs = /\\(([^\\s,]*)\\s*,\\s*([^\\s)]*)\\)/;\n        const equality = /\\s*\\1\\s*===\\s*\\2/;\n        const functionBody = regex_1.regex.join(/\\s*{\\s*return/, equality, /\\s*;\\s*}/);\n        const func = regex_1.regex.join(/function\\s*/, twoArgs, functionBody);\n        const arrow = /\\s*=>/;\n        const arrowFuncWithBody = regex_1.regex.join(twoArgs, arrow, functionBody);\n        const arrowFunc = regex_1.regex.join(twoArgs, arrow, equality);\n        return s => [arrowFunc, arrowFuncWithBody, func].some(regex => regex.test(s));\n    })();\n    equals_1.fast = function (equals) {\n        // means equals is using referential equality, don't repeat\n        // double checking referential equality is cheap except for strings\n        const _referential = equals_1.referential();\n        if (equals === _referential || isReferentialEqualitySource(equals.toString())) {\n            return _referential;\n        }\n        return (t1, t2) => t1 === t2 || equals(t1, t2);\n    };\n})(equals = exports.equals || (exports.equals = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/equals.ts?");

/***/ }),

/***/ "./src/ts/util/misc/hash.ts":
/*!**********************************!*\
  !*** ./src/ts/util/misc/hash.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../functional/utils */ \"./src/ts/util/functional/utils.ts\");\nconst fnv1a_1 = __webpack_require__(/*! ../hash/fnv1a */ \"./src/ts/util/hash/fnv1a.ts\");\nconst isType_1 = __webpack_require__(/*! ../types/isType */ \"./src/ts/util/types/isType.ts\");\nvar hash;\n(function (hash_1) {\n    hash_1.referential = function () {\n        return utils_1.identity;\n    };\n    hash_1.default_ = function () {\n        return JSON.stringify;\n    };\n    hash_1.makeNumber = function (hash) {\n        return isType_1.isNumber(hash) ? hash : fnv1a_1.fnv1a(isType_1.isString(hash) ? hash : hash_1.default_()(hash));\n    };\n})(hash = exports.hash || (exports.hash = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/hash.ts?");

/***/ }),

/***/ "./src/ts/util/misc/regex.ts":
/*!***********************************!*\
  !*** ./src/ts/util/misc/regex.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar regex;\n(function (regex_1) {\n    regex_1.toSource = function (regExp) {\n        const { source, flags } = regExp;\n        return `/${source}/${flags}`;\n    };\n    regex_1.join = function (...regexes) {\n        const source = regexes.map(e => e.source).join(\"\");\n        const flagChars = regexes.map(e => e.flags).join(\"\").split(\"\");\n        const flags = flagChars && [...new Set(flagChars)].join(\"\");\n        return new RegExp(source, flags);\n    };\n    regex_1.matchAll = function (regex, s) {\n        if (!regex.global) {\n            throw new Error(\"trying to matchAll with non global regex\");\n        }\n        const matches = [];\n        let match;\n        while (match = regex.exec(s)) {\n            matches.push(match);\n        }\n        return matches;\n    };\n})(regex = exports.regex || (exports.regex = {}));\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/regex.ts?");

/***/ }),

/***/ "./src/ts/util/misc/utils.ts":
/*!***********************************!*\
  !*** ./src/ts/util/misc/utils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.capitalize = function (word) {\n    return word.length === 0\n        ? \"\"\n        : word[0].toUpperCase() + word.slice(1);\n};\nexports.joinWords = function (words) {\n    const _words = [...words];\n    switch (_words.length) {\n        case 0:\n            return \"\";\n        case 1:\n            return _words[0];\n        case 2:\n            return _words[0] + \" and \" + _words[1];\n        default:\n            const lastWord = _words.pop();\n            return _words.join(\", \") + \", and \" + lastWord;\n    }\n};\nexports.camelCase = (() => {\n    // from react-faux-dom/lib/utils/camelCase.js\n    const hyphenPattern = /-+([a-z])/gi;\n    return function (s) {\n        hyphenPattern.lastIndex = 0;\n        return s.replace(hyphenPattern, (match, c, offset) => {\n            return offset === 0 ? c : c.toUpperCase();\n        });\n    };\n})();\nexports.separateClassName = function (className) {\n    return className.replace(/([A-Z])/g, \" $1\").trim();\n};\nexports.separateFunctionName = function (functionName) {\n    const [first, ...rest] = exports.separateClassName(functionName).split(\" \");\n    return [exports.capitalize(first), ...rest].join(\" \");\n};\nexports.joinNodes = function (nodes, node) {\n    if (nodes.length < 2) {\n        return nodes;\n    }\n    const joinedNodes = [];\n    for (let i = 0, j = 0; i < nodes.length; i++) {\n        joinedNodes.push(nodes[i]);\n        joinedNodes.push(node && node.shallowClone());\n    }\n    joinedNodes.pop();\n    return joinedNodes;\n};\nexports.singletonAsArray = function (singletonOrArray) {\n    return Array.isArray(singletonOrArray) ? singletonOrArray : [singletonOrArray];\n};\nexports.filterInput = function (input, charFilter) {\n    input.value = input.value.split(\"\").filter(charFilter).join(\"\");\n};\n/**\n * Check if a single character string is a allowDigits.\n *\n * @param {string} char a single character string\n * @returns {boolean} if the character is a allowDigits 0-9\n */\nexports.isDigit = function (char) {\n    return !Number.isNaN(parseInt(char));\n};\nexports.onlyDigitsInput = function (input) {\n    exports.filterInput(input, exports.isDigit);\n};\nexports.sleep = function (seconds) {\n    return new Promise(resolve => setTimeout(resolve, seconds * 1000));\n};\nconst regExpLiteralPattern = /\\/([^\\/]+)\\/([gimuy]*)/;\nexports.isRegExpLiteral = function (regex) {\n    return regExpLiteralPattern.test(regex);\n};\nexports.parseRegExpLiteral = function (regex) {\n    const match = regExpLiteralPattern.exec(regex);\n    if (match) {\n        const [, pattern, flags] = match;\n        return new RegExp(pattern, flags);\n    }\n    else {\n        return undefined;\n    }\n};\nexports.escapeRegExp = function (literal, flags) {\n    return new RegExp(literal.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, \"\\\\$&\"), flags);\n};\nclass NotImplementedError extends Error {\n}\nexports.NotImplementedError = NotImplementedError;\nexports.lowerBound = function (min, n) {\n    return Math.max(min, n);\n};\nexports.upperBound = function (max, n) {\n    return Math.min(max, n);\n};\nexports.bound = function (min, max, n) {\n    return exports.lowerBound(min, exports.upperBound(max, n));\n};\nexports.boundSurrounding = function (min, max, center, halfSize) {\n    return [exports.lowerBound(min, center - halfSize), exports.upperBound(max, center + halfSize)];\n};\nexports.snippet = function (s, center, halfSize) {\n    const [start, end] = exports.boundSurrounding(0, s.length, center, halfSize);\n    return s.slice(start, end);\n};\nexports.boolAsInt = function (bool) {\n    return bool ? 1 : 0;\n};\nexports.moduloIndexer = function (a) {\n    return i => a[i % a.length];\n};\n/**\n * Make an array non-holey.\n *\n * @param {T[]} a holey array\n * @returns {T[]} a blasphemous array\n */\nexports.makeBlasphemous = function (a) {\n    return Object.values(a);\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/utils.ts?");

/***/ }),

/***/ "./src/ts/util/misc/when.ts":
/*!**********************************!*\
  !*** ./src/ts/util/misc/when.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.when = function (bool) {\n    return f => bool && f();\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/misc/when.ts?");

/***/ }),

/***/ "./src/ts/util/object/mapFields.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/object/mapFields.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.mapFields = function (obj, mapper) {\n    const mapped = {};\n    for (const [key, value] of Object.entries(obj)) {\n        mapped[key] = mapper(value);\n    }\n    return mapped;\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/object/mapFields.ts?");

/***/ }),

/***/ "./src/ts/util/ssr/ClientLoader.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/ssr/ClientLoader.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nconst allExtensions_1 = __webpack_require__(/*! ../extensions/allExtensions */ \"./src/ts/util/extensions/allExtensions.ts\");\nconst anyWindow_1 = __webpack_require__(/*! ../window/anyWindow */ \"./src/ts/util/window/anyWindow.ts\");\nexports.clientRootDivId = \"client\";\nexports.clientDataField = \"clientData\";\nexports.getClientJsonData = function () {\n    const json = anyWindow_1.anyWindow[exports.clientDataField];\n    return JSON.parse(json);\n};\nexports.ClientLoader = {\n    new(args) {\n        const { deserialize, create } = args;\n        const _load = async () => {\n            allExtensions_1.addExtensions();\n            const data = await deserialize(exports.getClientJsonData());\n            const node = create(data);\n            const clientRoot = document.getElementById(exports.clientRootDivId);\n            if (clientRoot) {\n                console.log(\"hydrating\");\n                react_dom_1.hydrate(node, clientRoot);\n            }\n            else {\n                console.log(\"rendering\");\n                const clientContainer = document.body.appendDiv();\n                clientContainer.id = exports.clientRootDivId;\n                react_dom_1.render(node, clientContainer);\n            }\n        };\n        const load = () => {\n            (async () => {\n                try {\n                    await _load();\n                }\n                catch (e) {\n                    console.error(e);\n                }\n            })();\n        };\n        anyWindow_1.inBrowser(load);\n        return {\n            args,\n            load,\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/util/ssr/ClientLoader.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ../misc/utils */ \"./src/ts/util/misc/utils.ts\");\nexports.isNativeType = function (type) {\n    const typeName = `[object ${utils_1.capitalize(type)}]`;\n    const toString = Object.prototype.toString;\n    return (o) => toString.call(o) === typeName;\n};\n// can use isNativeType for all, but some can be optimized\nexports.isNull = (o) => o === null;\nexports.isUndefined = (o) => o === undefined;\nexports.isBoolean = (o) => o === true || o === false;\nexports.isNumber = exports.isNativeType(\"number\");\nexports.isString = exports.isNativeType(\"string\");\nexports.isFunction = exports.isNativeType(\"Function\"); // TODO can this be optimized?\nexports.isArray = Array.isArray;\nexports.isReadonlyArray = Array.isArray;\nexports.isRegExp = exports.isNativeType(\"RegExp\");\nexports.isDate = exports.isNativeType(\"Date\");\nexports.isObject = exports.isNativeType(\"object\");\nexports._isTruthy = (o) => !!o;\nexports.isTruthy = () => exports._isTruthy;\nexports.isByConstructor = function (constructor) {\n    return (o) => o.constructor === constructor;\n};\nexports.isDataView = exports.isByConstructor(DataView);\nexports.isArrayBuffer = exports.isByConstructor(ArrayBuffer);\nexports.isPromise = exports.isByConstructor(Promise);\n\n\n//# sourceURL=webpack:///./src/ts/util/types/isType.ts?");

/***/ }),

/***/ "./src/ts/util/window/anyWindow.ts":
/*!*****************************************!*\
  !*** ./src/ts/util/window/anyWindow.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst when_1 = __webpack_require__(/*! ../misc/when */ \"./src/ts/util/misc/when.ts\");\nexports.isBrowser = typeof window !== \"undefined\";\nexports.inBrowser = when_1.when(exports.isBrowser);\nexports.anyWindow = exports.isBrowser ? window : global;\nexports.globals = function (o) {\n    Object.assign(exports.anyWindow, o);\n};\nexports.globalProperties = function (o) {\n    Object.assignProperties(exports.anyWindow, o);\n};\nexports.globals({ globals: exports.globals, globalProperties: exports.globalProperties });\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/ts/util/window/anyWindow.ts?");

/***/ })

}]);