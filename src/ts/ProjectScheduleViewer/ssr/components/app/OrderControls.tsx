import * as React from "react";
import {SFC} from "react";
import * as MenuItem from "react-bootstrap/lib/MenuItem";
import {sum, sumBy} from "../../../../util/misc/math";
import {capitalize} from "../../../../util/misc/utils";
import {AccessorsAs, Order, RawFilter, SetOrder} from "./GraphControls";
import DropdownButton = require("react-bootstrap/lib/DropdownButton");

interface OrderControlsProps {
    orders: AccessorsAs<Order>;
    setOrder: SetOrder;
    currentIndex: number;
}

export const indexOrder: Order = {
    order: (e, i) => i,
    tooltip: (e, i) => i.toString(),
    all: data => ({
        length: sumBy(data.teams.all, e => sumBy(e.projects, e => e.employees.length))
    }),
};

export const noFilter: RawFilter = () => true;

export const OrderControls: SFC<OrderControlsProps> = ({orders, setOrder, currentIndex}) => {
    const OrderItem = (order: Order, i: number, name: string) =>
        <MenuItem key={i} onSelect={() => setOrder(order, i)} active={i === currentIndex}>
            {name}
        </MenuItem>;
    return <DropdownButton title="Order" id="">
        {OrderItem(indexOrder, -1, "Index")}
        {orders.map(({key: name, value: order}, i) => OrderItem(order, i, capitalize(name)))}
    </DropdownButton>;
};