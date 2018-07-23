import * as React from "react";
import {SFC} from "react";
import * as MenuItem from "react-bootstrap/lib/MenuItem";
import {capitalize} from "../../../util/utils";
import {AccessorsAs, Order, RawOrder, SetOrder} from "./GraphControls";
import DropdownButton = require("react-bootstrap/lib/DropdownButton");


interface OrderControlsProps {
    orders: AccessorsAs<Order>;
    setOrder: SetOrder;
    currentIndex: number;
}

export const indexOrder: RawOrder = (e, i) => i;

export const OrderControls: SFC<OrderControlsProps> = ({orders, setOrder, currentIndex}) => {
    orders = [{key: "index", value: {order: indexOrder}}, ...orders];
    return <DropdownButton title="Order" id="">
        {orders.map(({key: name, value: {order}}, i) =>
            <MenuItem key={i} onSelect={() => setOrder(order, i)} active={i === currentIndex}>
                {capitalize(name)}
            </MenuItem>
        )}
    </DropdownButton>;
};