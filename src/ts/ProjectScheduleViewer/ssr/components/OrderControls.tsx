import * as React from "react";
import {SFC} from "react";
import * as MenuItem from "react-bootstrap/lib/MenuItem";
import {capitalize} from "../../../util/utils";
import {AccessorsAs, Order, RawOrder, SetOrder} from "./GraphControls";
import DropdownButton = require("react-bootstrap/lib/DropdownButton");


interface OrderControlsProps {
    orders: AccessorsAs<Order>;
    setOrder: SetOrder;
}


export const indexOrder: RawOrder = (e, i) => i;


export const OrderControls: SFC<OrderControlsProps> = ({orders, setOrder}) =>
    <DropdownButton title="Order" id="">
        <MenuItem onSelect={() => setOrder(indexOrder)}>
            Index
        </MenuItem>
        {orders.map(({key: name, value: {order}}, i) =>
            <MenuItem key={i} onSelect={() => {
                setOrder(order);
            }}>
                {capitalize(name)}
            </MenuItem>
        )}
    </DropdownButton>;