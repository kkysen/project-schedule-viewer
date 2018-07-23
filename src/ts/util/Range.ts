import {globals} from "./anyWindow";

export interface Range {
    
    map<T>(map: (i: number) => T): T[];
    
    filter(filter: (i: number) => boolean): number[];
    
    forEach(func: (i: number) => void): void;
    
    toArray(): number[];
    
    toInterval(): number[];
    
}

export type RangeClass = {
    
    "new"(to: number): Range;
    
    "new"(from: number, to: number): Range;
    
    ofDomain(domain: number[]): Range;
    
};

export const Range: RangeClass = {
    
    new(from: number, to?: number): Range {
        const _from: number = to === undefined ? 0 : from;
        const _to: number = to === undefined ? from : to;
        
        return {
            
            toArray(): number[] {
                return [...new Array(_to - _from)].map((e, i) => i + _from);
            },
            
            map<T>(map: (i: number) => T): T[] {
                return this.toArray().map(map);
            },
            
            filter(func: (i: number) => boolean): number[] {
                return this.toArray().filter(func);
            },
            
            forEach(func: (i: number) => void): void {
                for (let i: number = _from; i < _to; i++) {
                    func(i);
                }
            },
            
            toInterval(): number[] {
                return [_from, _to];
            },
            
        };
        
    },
    
    ofDomain(domain: number[]): Range {
        return this.new(Math.min(...domain), Math.max(...domain));
    },
    
};

globals({range: Range});