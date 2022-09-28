import React, {FunctionComponent, useState} from 'react';
import {OrderDetailsSimpleWidget} from "./OrderDetailsSimpleWidget";
import {Button} from "../../../library/visual/widgets/buttons/Button";
import Order from "../../domain/orders/Order";
import Repository from "../../../library/data/backend/Repository";
import DataObject from "../../../library/data/dataObject/DataObject";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";
import BooleanState from "../../../library/data/dataObject/vanila/BooleanState";

interface properties {
    repository:Repository<Order>;
    isOrderDetailSwVisible:BooleanState;
}

export const NewOrderSubWidget: FunctionComponent<properties> = ({repository, isOrderDetailSwVisible}) => {

    const newOrderConsumableState:DataObjectState = new DataObjectState(useState(DataObject.fromClass(Order, true)));

    const orderDetailSw = <OrderDetailsSimpleWidget
        exampleObjectState={newOrderConsumableState}
        repository={repository}
    />

    const saveNewOrderButton = <Button
        onClick={() => {repository.insert(newOrderConsumableState.getDataObject()); isOrderDetailSwVisible.toggleValue()}}
        label={"Сохранить"}
        enabled={!newOrderConsumableState.getDataObject().emptyMandatoryFieldsDescriptions}
    />

    return <>
        <br/><br/>
        {orderDetailSw}
        <br/><br/>
        {saveNewOrderButton}
    </>
}