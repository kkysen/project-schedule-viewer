import * as React from "react";
import {SFC} from "react";
import {Data} from "../../share/data/Data";
import {AccessorsAs, Filter, SetFilter} from "./GraphControls";

interface FilterControlsProps {
    filters: AccessorsAs<Filter<any>>;
    data: Data;
    setFilter: SetFilter;
}

export const FilterControls: SFC<FilterControlsProps> = ({filters, data, setFilter}) => <>

</>;