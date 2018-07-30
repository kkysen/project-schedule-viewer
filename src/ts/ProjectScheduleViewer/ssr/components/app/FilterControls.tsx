import * as React from "react";
import {SFC} from "react";
import * as DropdownButton from "react-bootstrap/lib/DropdownButton";
import * as MenuItem from "react-bootstrap/lib/MenuItem";
import {capitalize} from "../../../../util/misc/utils";
import {Data} from "../../../share/data/Data";
import {AccessorsAs, Filter, RawFilter, SetFilter} from "./GraphControls";
import {noFilter} from "./OrderControls";

interface FilterControlsProps {
    filters: AccessorsAs<Filter<any>>;
    data: Data;
    setFilter: SetFilter;
    currentIndex: number;
}

export const FilterControls: SFC<FilterControlsProps> = ({filters, data, setFilter, currentIndex}) => {
    const FilterItem = function <T>(filter: RawFilter, i: number, name: string) {
        return <MenuItem
            key={i}
            onSelect={() => setFilter(filter, i)}
            active={i === currentIndex}
        >
            {name}
        </MenuItem>;
    };
    return <>
        {filters.map(({key: title, value: {filter, all, name}}, i) =>
            <DropdownButton key={i} title={capitalize(title)} id={i.toString()}>
                {FilterItem(noFilter, -1, "All")}
                {all(data).map((e, i) => FilterItem(filter([e], false), i, name(e)))}
            </DropdownButton>)}
    </>;
};