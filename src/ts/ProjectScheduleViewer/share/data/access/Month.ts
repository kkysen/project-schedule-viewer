interface MonthArgs {
    
    readonly name: string;
    
}

export interface Month extends MonthArgs {
    
    readonly ordinal: number;
    readonly name: string;
    readonly date: Date;
    
}

const monthArgs: MonthArgs[] = [
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
].map(name => ({name}));


export const Months: Month[] = monthArgs.map((month, i) => ({
    ...month,
    ordinal: i,
    date: new Date(new Date(2000, 1, 1).setMonth(i)),
}));