import * as fs from "fs-extra";
import {All} from "../../util/All";
import {path} from "../../util/polyfills/path";
import {Position} from "../share/Position";
import {dir} from "./dir";

export type Positions = All<Position, {level: number}>;

export const positions: Positions = All.of(
    async () => {
        const buffer = await fs.readFile(path.join(dir.data, "positions.csv"));
        const trim = (s: string) => s.trim();
        const csv = buffer
            .toString("utf8")
            .trim()
            .split("\n")
            .map(trim)
            .map(line => line.split(",").map(trim));
        return (csv as [number, string, number][])
            .map(([level, name, rate]) => ({level, name, rate}));
    },
    {level: 0},
);