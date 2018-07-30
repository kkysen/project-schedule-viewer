"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Month_1 = require("./Month");
const dayLength = (() => {
    const [first, second] = [1, 2].map(day => +new Date(2000, 0, day));
    return (second - first) | 0;
})();
const makeDay = function (day, date) {
    return {
        day,
        date,
        month: Month_1.Months[date.getMonth()],
    };
};
exports.Day = {
    of(date) {
        date.setHours(0, 0, 0, 0);
        return makeDay((+date / dayLength) | 0, date);
    },
    sinceEpoch(day) {
        day = day | 0; // will always be i32
        return makeDay(day, new Date((day + 1) * dayLength));
    },
};
//# sourceMappingURL=Day.js.map