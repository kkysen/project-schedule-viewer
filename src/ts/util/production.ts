const process = (global || window).process;
const nodeEnv = process && process.env && process.env.NODE_ENV;

export const production: boolean = !nodeEnv ? false : nodeEnv.toLowerCase() === "production";
export const development = !production;

export const inProduction = function(func: () => void): void {
    if (production) {
        func();
    }
};

export const inDevelopment = function(func: () => void): void {
    if (development) {
        func();
    }
};