"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../cache");
const utils_1 = require("../functional/utils");
const fnv1a_1 = require("../hash/fnv1a");
const regex_1 = require("../regex");
const isType_1 = require("../types/isType");
const isReferentialEqualitySource = (() => {
    const twoArgs = /\(([^\s,]*)\s*,\s*([^\s)]*)\)/;
    const equality = /\s*\1\s*===\s*\2/;
    const functionBody = regex_1.regex.join(/\s*{\s*return/, equality, /\s*;\s*}/);
    const func = regex_1.regex.join(/function\s*/, twoArgs, functionBody);
    const arrow = /\s*=>/;
    const arrowFuncWithBody = regex_1.regex.join(twoArgs, arrow, functionBody);
    const arrowFunc = regex_1.regex.join(twoArgs, arrow, equality);
    return s => [arrowFunc, arrowFuncWithBody, func].some(regex => regex.test(s));
})();
exports.Equals = {
    bind: (equals, t) => {
        return _t => equals(t, _t);
    },
    default: cache_1.getter((t1, t2) => exports.Equals.referential()(t1, t2) || exports.Hash.default()(t1) === exports.Hash.default()(t2)),
    referential: () => Object.is,
    fastEquals: (equals) => {
        // means equals is using referential equality, don't repeat
        // double checking referential equality is cheap except for strings
        const referential = exports.Equals.referential();
        if (equals === referential || isReferentialEqualitySource(equals.toString())) {
            return referential;
        }
        return (t1, t2) => t1 === t2 || equals(t1, t2);
    },
};
exports.Hash = {
    makeNumber(hash) {
        return isType_1.isNumber(hash) ? hash : fnv1a_1.fnv1a(isType_1.isString(hash) ? hash : exports.Hash.default()(hash));
    },
    // TODO maybe fix type assertion
    default: () => JSON.stringify,
    referential: () => utils_1.identity,
};
const defaultHashEquals = {
    hash: exports.Hash.referential(),
    equals: exports.Equals.referential(),
};
// can't properly type generic constant
// (only functions can be generic, but won't return same value each time)
const referentialHashEquals = {
    hash: exports.Hash.referential(),
    equals: exports.Equals.referential(),
};
exports.HashEquals = {
    default: () => defaultHashEquals,
    referential: () => referentialHashEquals,
    isReferential: hashEquals => hashEquals === referentialHashEquals,
    fastEquals: ({ hash, equals }) => ({ hash, equals: exports.Equals.fastEquals(equals) }),
};
//# sourceMappingURL=HashEquals.js.map