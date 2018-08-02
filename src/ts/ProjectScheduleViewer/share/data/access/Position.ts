import {All} from "../../../../util/collections/query/All";
import {identity} from "../../../../util/functional/utils";
import {DataSource} from "../../../../util/data/DataSource";
import {DataAccessor} from "./DataAccessor";

export interface Position {
    
    readonly id: number;
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
    parse: ([level, name, rate]) => ({id: level, level, name, rate}),
    create: identity,
    by: {level: 0},
}, {});