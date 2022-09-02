import React, {useReducer, useState} from 'react';
import OrderDetailsSimpleWidget from "./OrderDetailsSimpleWidget";
import Button from "../../../library/widgets/buttons/Button";
import Order from "../../domain/orders/Order";

let orderWithDefaults = () => {
    const order = new Order();
    order.dataObject.status = "CREATED";
    return order;
}

export default function NewOrderSubWidget({dataSet, toggleVisibilityFunct}) {

    const [newOrder, ] = useState(orderWithDefaults());
    const [, redraw] = useReducer((x) => x + 1, 0, (a) => a);

    const orderDetailSw = <OrderDetailsSimpleWidget
        order={newOrder}
        redrawFunct={redraw}
    />

    const saveNewOrderButton = <Button
        funct={() => {dataSet.persisModel(newOrder); toggleVisibilityFunct()}}
        label={"Сохранить"}
        enabled={!newOrder.emptyMandatoryFieldsDescriptions}
    />

    return <>
        <br/><br/>
        {orderDetailSw}
        <br/><br/>
        {saveNewOrderButton}
    </>
}