"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monthArgs = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
].map(name => ({ name }));
exports.Months = monthArgs.map((month, i) => ({
    ...month,
    ordinal: i,
    date: new Date(new Date(2000, 1, 1).setMonth(i)),
}));
//# sourceMappingURL=Month.js.map