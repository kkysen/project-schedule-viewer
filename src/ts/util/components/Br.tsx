import * as React from "react";
import {SFC} from "react";
import {Repeat} from "./Repeat";

export const Br: SFC<{times: number}> = ({times}) => <Repeat times={times} render={() => <br/>}/>;