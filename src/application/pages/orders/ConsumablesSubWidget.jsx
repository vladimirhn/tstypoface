import React, {useEffect, useReducer, useState} from "react";
import DataSetManager from "../../../library/data/dataSet/DataSetManager";
import DataSetTable from "../../../library/widgets/tables/dataSetTable/DataSetTable";
import dataUpdateEffect from "../../../library/data/dataSet/events/DataUpdateEffect";
import OrdersConsumablesDataSet from "../../domain/orders/OrdersConsumablesDataSet";
import ObjectFieldProcessor from "../../../library/data/dataObject/ObjectFieldProcessor";
import emptyFunction from "../../../library/functions/EmptyFunction";
import OrderConsumables from "../../domain/orders/OrderConsumables";
import DataState from "../../../library/data/dataSet/DataState";

export default function ConsumablesSubWidget({selectedEntry, toggleConsumablesSwVisibility}) {

    const id = selectedEntry.id;

    const [orderConsumables, ] = useState(DataSetManager.get(OrdersConsumablesDataSet));
    const [fetched, setFetched] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    // eslint-disable-next-line
    useEffect(dataUpdateEffect(orderConsumables, forceUpdate), [orderConsumables, forceUpdate]);

    useEffect(() => {
        if (!fetched) {
            const filterObject = new OrderConsumables();
            const fieldsProcessor = new ObjectFieldProcessor(filterObject, emptyFunction);
            fieldsProcessor.setValue(OrderConsumables.orderId, id);

            orderConsumables.clearData();
            orderConsumables.applyFilter(filterObject);
            setFetched(true);
        }
    }, [fetched, id, orderConsumables]);

    const showTable = fetched && orderConsumables.dataState === DataState.FILTERED && !orderConsumables.isEmpty();
    const consumables = showTable ?
        <DataSetTable
            dataSet={orderConsumables}
            noDel={true}
            noFilters={true}
        /> : null;

    return <>

        <b>Расходные материалы </b>
        <button onClick={() => toggleConsumablesSwVisibility()}>редактировать</button>

        {consumables}

    </>
}