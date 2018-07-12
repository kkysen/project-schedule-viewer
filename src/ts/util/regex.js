"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex;
(function (regex) {
    regex.toSource = function (regExp) {
        const { source, flags } = regExp;
        return `/${source}/${flags}`;
    };
    regex.join = function (...regexes) {
        const source = regexes.map(e => e.source).join("");
        const flagChars = regexes.map(e => e.flags).join("").split("");
        const flags = flagChars && [...new Set(flagChars)].join("");
        return new RegExp(source, flags);
    };
})(regex = exports.regex || (exports.regex = {}));
//# sourceMappingURL=regex.js.map