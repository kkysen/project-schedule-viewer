export namespace regex {
    
    export const toSource = function(regExp: RegExp): string {
        const {source, flags} = regExp;
        return `/${source}/${flags}`;
    };
    
    export const join = function(...regexes: RegExp[]): RegExp {
        const source = regexes.map(e => e.source).join("");
        const flagChars = regexes.map(e => e.flags).join("").split("");
        const flags = flagChars && [...new Set(flagChars)].join("");
        return new RegExp(source, flags);
    };
    
}