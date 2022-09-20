import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useState} from 'react';
import {OrderDetailsSimpleWidget} from "./OrderDetailsSimpleWidget";
import {CheckBoxInput} from "../../../library/visual/widgets/fieldInputs/CheckBoxInput";
import Order from "../../domain/orders/Order";
import {ComboBoxFromMapObject} from "../../../library/visual/widgets/fieldInputs/comboboxes/comboBoxFromMapObject/ComboBoxFromMapObject";
import {ConsumablesSubWidget} from "./ConsumablesSubWidget";
import Repository from "../../../library/data/backend/Repository";
import BooleanState from "../../../library/data/dataObject/vanila/BooleanState";
import DataObject from "../../../library/data/dataObject/DataObject";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";

interface properties {
    repository:Repository<Order>;
    selectedEntry:DataObject<Order>;
    isConsumablesSwVisible:BooleanState;
    selectedEntryState:DataObjectState;
}

export const ProcessOrderWidget: FunctionComponent<properties> = ({repository, selectedEntry, isConsumablesSwVisible, selectedEntryState}) => {

    const exampleOrderState:DataObjectState = new DataObjectState(useState<DataObject<any>>(selectedEntry));

    let backButtonClicked = () => {
        selectedEntryState.setDataObject(DataObject.empty())
    }

    return <>
        <div>
            <button onClick={backButtonClicked}>Назад</button>
        </div>

        <div className="widget">
            <strong>Детали заказа</strong>
            <OrderDetailsSimpleWidget
                exampleObjectState={exampleOrderState}
                repository={repository}
            />

            <CheckBoxInput
                exampleObjectState={exampleOrderState}
                fieldDescription={Order.confirmed}
            />

            <CheckBoxInput
                exampleObjectState={exampleOrderState}
                fieldDescription={Order.supplied}
            />

            <ComboBoxFromMapObject
                exampleObjectState={exampleOrderState}
                fieldDescription={Order.status}
                isInline={false}
                noEmpty={true}
            />

            <br/>

            <ConsumablesSubWidget
                selectedEntry={selectedEntry}
                isConsumablesSwVisible={isConsumablesSwVisible}
            />

            <br/><br/>
            <div className="widget">
                <button onClick={() => {
                    repository.update(exampleOrderState.getDataObject())
                    repository.dataSet.dropSelection()
                }}> Обновить заказ
                </button>
                &#160;&#160;&#160;&#160;
                <button onClick={() => {
                    const id:string | undefined = exampleOrderState.getId();
                    if (id) {
                        repository.delete(id);
                    }
                }} style={{float: "right"}}>Удалить заказ
                </button>
            </div>
        </div>
    </>
}