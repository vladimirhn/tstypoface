import '../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';
import NumericInput from "../../../library/widgets/fieldInputs/NumericInput";
import Order from "../../domain/orders/Order";
import ChooseFromTablePopupWidget
    from "../../../library/widgets/fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import DateInput from "../../../library/widgets/fieldInputs/DateInput";
import ComboBoxFromForeign from "../../../library/widgets/fieldInputs/comboboxes/comboBoxFromForeign/ComboBoxFromForeign";
import TextAreaInput from "../../../library/widgets/fieldInputs/TextAreaInput";
import ObjectFieldProcessor from "../../../library/data/dataObject/ObjectFieldProcessor";

export default function OrderDetailsSimpleWidget({order, redrawFunct}) {

    const fieldsProcessor = new ObjectFieldProcessor(order, redrawFunct);

    return <>

        <ChooseFromTablePopupWidget
            idFieldDescription={Order.orderSubjectId}
            fieldsProcessor={fieldsProcessor}
        />

        <NumericInput
            fieldDescription={Order.amount}
            fieldsProcessor={fieldsProcessor}
        />

        <DateInput
            fieldDescription={Order.orderDate}
            fieldsProcessor={fieldsProcessor}
        />

        <DateInput
            fieldDescription={Order.orderDeadline}
            fieldsProcessor={fieldsProcessor}
        />

        <ComboBoxFromForeign
            fieldDescription={Order.legalEntityId}
            fieldsProcessor={fieldsProcessor}
        />

        <NumericInput
            fieldDescription={Order.moneyReceived}
            fieldsProcessor={fieldsProcessor}
        />

        <TextAreaInput
            fieldDescription={Order.comment}
            fieldsProcessor={fieldsProcessor}
        />
    </>
}