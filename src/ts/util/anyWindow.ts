export const anyWindow: any = typeof window === "undefined" ? global : window;

export const globals = function(o: Object): void {
    Object.assign(anyWindow, o);
};

globals({globals});