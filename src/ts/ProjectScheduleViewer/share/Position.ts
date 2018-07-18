import {All} from "../../util/All";
import {identity} from "../../util/functional/utils";
import {DataAccessor} from "./DataAccessor";
import {DataSource} from "./DataSource";

export interface Position {
    
    readonly level: number;
    readonly name: string;
    readonly rate: number;
    
}

export type RawPosition = [number, string, number];

type Leveled = {level: number};

export type Positions = All<Position, Leveled>;

type PositionsArgs = {};

export type PositionsSource = DataSource<RawPosition, PositionsArgs>;

export const positions = DataAccessor.new<Position, Leveled, Position, RawPosition, PositionsArgs>({
    source: e => e.positions,
    parse: ([level, name, rate]) => ({level, name, rate}),
    create: identity,
    by: {level: 0},
}, {});
