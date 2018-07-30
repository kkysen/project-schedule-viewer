import {Month, Months} from "./Month";

export interface Day {
    day: number;
    date: Date;
    month: Month;
}

const dayLength: number = (() => {
    const [first, second] = [1, 2].map(day => +new Date(2000, 0, day));
    return (second - first) | 0;
})();

const makeDay = function(day: number, date: Date): Day {
    return {
        day,
        date,
        month: Months[date.getMonth()],
    };
};


export const Day = {
    
    of(date: Date): Day {
        date.setHours(0, 0, 0, 0);
        return makeDay((+date / dayLength) | 0, date);
    },
    
    sinceEpoch(day: number): Day {
        day = day | 0; // will always be i32
        return makeDay(day, new Date((day + 1) * dayLength));
    },
    
};