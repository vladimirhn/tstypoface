import React, {FunctionComponent, useState} from 'react';
import {OrderDetailsSimpleWidget} from "./OrderDetailsSimpleWidget";
import {Button} from "../../../library/visual/widgets/buttons/Button";
import Order from "../../domain/orders/Order";
import Repository from "../../../library/data/backend/Repository";
import DataObject from "../../../library/data/dataObject/DataObject";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";

interface properties {
    repository:Repository<Order>;
}

export const NewOrderSubWidget: FunctionComponent<properties> = ({repository}) => {

    const newOrderConsumableState:DataObjectState = new DataObjectState(useState(DataObject.fromClass(Order)));

    const orderDetailSw = <OrderDetailsSimpleWidget
        exampleObjectState={newOrderConsumableState}
        repository={repository}
    />

    const saveNewOrderButton = <Button
        onClick={() => {repository.update(newOrderConsumableState.getDataObject())}}
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