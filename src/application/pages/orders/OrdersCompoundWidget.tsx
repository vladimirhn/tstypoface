import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';

import {ProcessOrderWidget} from "./ProcessOrderWidget";
import {NewOrderSubWidget} from "./NewOrderSubWidget";
import {ProcessConsumablesSubWidget} from "./ProcessConsumablesSubWidget";
import {TrueFalseButton} from "../../../library/visual/widgets/buttons/TrueFalseButton";
import RepositoryState from "../../../library/data/backend/RepositoryState";
import Repository from "../../../library/data/backend/Repository";
import Order from "../../domain/orders/Order";
import BooleanState from "../../../library/data/dataObject/vanila/BooleanState";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";
import DataObject from "../../../library/data/dataObject/DataObject";

export const OrdersCompoundWidget: FunctionComponent = () => {

    const ordersRepositoryState:RepositoryState<Order> = new RepositoryState<any>(useState(Repository.empty(Order)));
    useEffect(() => {
        ordersRepositoryState.initialFetchAll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const selectedEntryState:DataObjectState = new DataObjectState(useState(DataObject.empty));
    const applySelection = (entry:DataObject<Order>) => {
        selectedEntryState.setDataObject(entry);
    }


    const isOrderDetailSwVisible:BooleanState = new BooleanState(useState<boolean>(false));
    const isConsumablesSwVisible:BooleanState = new BooleanState(useState<boolean>(false));

    const orderDetailSwButton = <TrueFalseButton
        variableState={isOrderDetailSwVisible}
        trueLabel={"Отмена"}
        falseLabel={"Новый заказ"}
    />

    let afterSelectionWidget = null;
    let newOrderWidget = null;

    const isSelected = !selectedEntryState.isEmpty();
    const selectedEntry = selectedEntryState.getDataObject();

    if (isSelected && selectedEntry) {
        afterSelectionWidget = isConsumablesSwVisible.getValue() ?
            <ProcessConsumablesSubWidget
                repository={ordersRepositoryState.repository}
                selectedEntry={selectedEntry}
                isConsumablesSwVisible={isConsumablesSwVisible}
            />
            :
            <ProcessOrderWidget
                repository={ordersRepositoryState.repository}
                selectedEntry={selectedEntry}
                isConsumablesSwVisible={isConsumablesSwVisible}
                selectedEntryState={selectedEntryState}
            />

    } else {

        if (!isOrderDetailSwVisible.getValue()) {
            afterSelectionWidget =
                <DataSetTableWidget
                    repository={ordersRepositoryState.repository}
                    config={new TableConfig().onSelectionFunc(applySelection)}
                />
        }

        newOrderWidget =
            <>
                {orderDetailSwButton}
                {isOrderDetailSwVisible.getValue() ?
                    <NewOrderSubWidget
                        repository={ordersRepositoryState.repository}
                        isOrderDetailSwVisible={isOrderDetailSwVisible}
                    />
                    : null}

                <br/><br/>
            </>
    }

    return <>
        {newOrderWidget}
        {afterSelectionWidget}
    </>
}