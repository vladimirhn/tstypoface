import React, {FunctionComponent, useEffect, useState} from "react";
import Repository from "../../../library/data/backend/Repository";
import Order from "../../domain/orders/Order";
import BooleanState from "../../../library/data/dataObject/vanila/BooleanState";
import RepositoryState from "../../../library/data/backend/RepositoryState";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import DataObject from "../../../library/data/dataObject/DataObject";
import OrderConsumables from "../../domain/orders/OrderConsumables";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";

interface properties {
    selectedEntry:DataObject<Order>;
    isConsumablesSwVisible:BooleanState;
}

export const ConsumablesSubWidget: FunctionComponent<properties> = ({selectedEntry, isConsumablesSwVisible}) => {

    const consumablesRepository:RepositoryState<OrderConsumables> = new RepositoryState<any>(useState(Repository.empty(OrderConsumables)));
    useEffect(() => {
        consumablesRepository.initialFetchFiltered(DataObject.withField(OrderConsumables.orderId, selectedEntry.data?.id))
    }, [selectedEntry]);

    const consumables =
        <DataSetTableWidget
            repository={consumablesRepository.repository}
            config={new TableConfig().noDelete().noFilters()}
        />;

    return <>

        <b>Расходные материалы </b>
        <button onClick={isConsumablesSwVisible.toggleValue}>редактировать</button>

        {consumables}

    </>
}