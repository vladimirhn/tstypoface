import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';
import OrderDetailsSimpleWidget from "./OrderDetailsSimpleWidget";
import CheckBoxInput from "../../../library/visual/widgets/fieldInputs/CheckBoxInput";
import Order from "../../domain/orders/Order";
import ObjectFieldProcessor from "../../../library/data/dataObject/ObjectFieldProcessor";
import ComboBoxFromMapObject
    from "../../../library/visual/widgets/fieldInputs/comboboxes/comboBoxFromMapObject/ComboBoxFromMapObject";
import ConsumablesSubWidget from "./ConsumablesSubWidget";


export default function ProcessOrderWidget({dataSet, redrawFunct, toggleConsumablesSwVisibility}) {

    const order = dataSet.oneSelectedEntry;
    const fieldProcessor = new ObjectFieldProcessor(order, redrawFunct);

    let backButtonClicked = () => {
        dataSet.dropSelection();
        redrawFunct();
    }

    return <>
        <div>
            <button onClick={backButtonClicked}>Назад</button>
        </div>

        <div className="widget">
            <strong>Детали заказа</strong>
            <OrderDetailsSimpleWidget
                order={order}
                redrawFunct={redrawFunct}
            />

            <CheckBoxInput
                fieldDescription={Order.confirmed}
                fieldProcessor={fieldProcessor}
            />

            <CheckBoxInput
                fieldDescription={Order.supplied}
                fieldProcessor={fieldProcessor}
            />

            <ComboBoxFromMapObject
                fieldDescription={Order.status}
                fieldProcessor={fieldProcessor}
                noEmpty={true}
            />

            <br/>

            <ConsumablesSubWidget
                selectedEntry={order}
                toggleConsumablesSwVisibility={toggleConsumablesSwVisibility}
            />

            <br/><br/>
            <div className="widget">
                <button onClick={() => {
                    dataSet.updateSelectedEntry();
                    dataSet.dropSelection()
                }}> Обновить заказ
                </button>
                &#160;&#160;&#160;&#160;
                <button onClick={() => {
                    dataSet.deleteSelectedEntry()
                }} style={{float: "right"}}>Удалить заказ
                </button>
            </div>
        </div>
    </>
}