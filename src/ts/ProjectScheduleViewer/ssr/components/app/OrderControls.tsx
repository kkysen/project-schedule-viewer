import * as React from "react";
import {SFC} from "react";
import * as MenuItem from "react-bootstrap/lib/MenuItem";
import {capitalize} from "../../../../util/misc/utils";
import {AccessorsAs, Order, RawFilter, RawOrder, SetOrder} from "./GraphControls";
import DropdownButton = require("react-bootstrap/lib/DropdownButton");


interface OrderControlsProps {
    orders: AccessorsAs<Order>;
    setOrder: SetOrder;
    currentIndex: number;
}

export const indexOrder: RawOrder = (e, i) => i;
export const noFilter: RawFilter = () => true;

export const OrderControls: SFC<OrderControlsProps> = ({orders, setOrder, currentIndex}) => {
    const OrderItem = (order: RawOrder, i: number, name: string) =>
        <MenuItem key={i} onSelect={() => setOrder(order, i)} active={i === currentIndex}>
            {name}
        </MenuItem>;
    return <DropdownButton title="Order" id="">
        {OrderItem(indexOrder, -1, "Index")}
        {orders.map(({key: name, value: {order}}, i) => OrderItem(order, i, capitalize(name)))}
    </DropdownButton>;
};