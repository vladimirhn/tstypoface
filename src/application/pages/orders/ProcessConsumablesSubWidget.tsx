import React, {FunctionComponent, useEffect, useState} from "react";
import OrderConsumables from "../../domain/orders/OrderConsumables";
import {ChooseFromTablePopupWidget} from "../../../library/visual/widgets/fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import Repository from "../../../library/data/backend/Repository";
import Order from "../../domain/orders/Order";
import DataObject from "../../../library/data/dataObject/DataObject";
import BooleanState from "../../../library/data/dataObject/vanila/BooleanState";
import RepositoryState from "../../../library/data/backend/RepositoryState";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {DataObjectNumericInput} from "../../../library/visual/widgets/fieldInputs/numeric/DataObjectNumericInput";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";


interface properties {
    repository:Repository<Order>;
    selectedEntry:DataObject<Order>;
    isConsumablesSwVisible:BooleanState;
}

export const ProcessConsumablesSubWidget: FunctionComponent<properties> = ({repository, selectedEntry, isConsumablesSwVisible}) => {

    const orderId = selectedEntry.data?.id;

    const consumablesRepository:RepositoryState<OrderConsumables> = new RepositoryState<any>(useState(Repository.empty(OrderConsumables)));
    useEffect(() => {
        consumablesRepository.initialFetchFiltered(DataObject.withField(OrderConsumables.orderId, selectedEntry.data?.id))
    }, [selectedEntry])

    const newOrderConsumableState:DataObjectState = new DataObjectState(useState(DataObject.withField(OrderConsumables.orderId, orderId)));


    return <>

        <button onClick={isConsumablesSwVisible.toggleValue}>Назад</button>
        <br/><br/>

        <div className={"widget"}>

            <b>Новый расходник</b>

            <ChooseFromTablePopupWidget
                exampleObjectState={newOrderConsumableState}
                fieldDescription={OrderConsumables.consumableItemId}
                config={new TableConfig().noDelete().useInlineFilters()}
            />

            <DataObjectNumericInput
                fieldDescription={OrderConsumables.qty}
                exampleObjectState={newOrderConsumableState}
            />

            <button onClick={() => {
                consumablesRepository.repository.insert(newOrderConsumableState.getDataObject())
            }}>Добавить
            </button>
        </div>


        <DataSetTableWidget
            repository={consumablesRepository.repository}
            config={new TableConfig().noDelete().noFilters()}
        />
    </>
}