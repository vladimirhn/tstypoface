import React, {useEffect, useReducer, useState} from "react";
import DataSetManager from "../../../library/data/dataSet/DataSetManager";
import OrdersConsumablesDataSet from "../../domain/orders/OrdersConsumablesDataSet";
import dataUpdateEffect from "../../../library/data/dataSet/events/DataUpdateEffect";
import OrderConsumables from "../../domain/orders/OrderConsumables";
import ObjectFieldProcessor from "../../../library/data/dataObject/ObjectFieldProcessor";
import emptyFunction from "../../../library/functions/EmptyFunction";
import DataSetTable from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";
import ChooseFromTablePopupWidget
    from "../../../library/visual/widgets/fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import NumericInput from "../../../library/visual/widgets/fieldInputs/NumericInput";

export default function ProcessConsumablesSubWidget({dataSet, toggleVisibilityFunct}) {

    let orderId = dataSet.oneSelectedEntry.id;

    const [orderConsumables, ] = useState(DataSetManager.get(OrdersConsumablesDataSet));
    const [fetched, setFetched] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    // eslint-disable-next-line
    useEffect(dataUpdateEffect(orderConsumables, forceUpdate), [orderConsumables, forceUpdate]);

    useEffect(() => {
        if (!fetched) {
            const filterObject = new OrderConsumables();
            const fieldsProcessor = new ObjectFieldProcessor(filterObject, emptyFunction);
            fieldsProcessor.setValue(OrderConsumables.orderId, orderId);

            orderConsumables.clearData();
            orderConsumables.filterExample = filterObject;
            orderConsumables.applyFilter();
            setFetched(true);
        }
    }, [fetched, orderId, orderConsumables]);

    const [newOrderConsumable, ] = useState(initNewLine(orderId));
    const fieldsProcessor = new ObjectFieldProcessor(newOrderConsumable, forceUpdate);


    return <>

        <button onClick={() => toggleVisibilityFunct()}>Назад</button>
        <br/><br/>

        <div className={"widget"}>

            <b>Новый расходник</b>

            <ChooseFromTablePopupWidget
                idFieldDescription={OrderConsumables.consumableItemId}
                fieldsProcessor={fieldsProcessor}
                inlineFilters={true}
            />

            <NumericInput
                fieldDescription={OrderConsumables.qty}
                fieldsProcessor={fieldsProcessor}
            />

            <button onClick={() => {
                orderConsumables.persisModel(newOrderConsumable);
                forceUpdate()
            }}>Добавить
            </button>
        </div>


        <DataSetTable
            dataSet={orderConsumables}
            noFilters={true}
        />
    </>
}

let initNewLine = (orderId) => {
    const newLine = new OrderConsumables();
    const fieldsProcessor = new ObjectFieldProcessor(newLine, emptyFunction);
    fieldsProcessor.setValue(OrderConsumables.orderId, orderId);

    return newLine;
}