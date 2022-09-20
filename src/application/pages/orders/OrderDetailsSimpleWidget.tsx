import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent} from 'react';
import Order from "../../domain/orders/Order";
import {ChooseFromTablePopupWidget} from "../../../library/visual/widgets/fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import {ComboBoxFromForeign} from "../../../library/visual/widgets/fieldInputs/comboboxes/comboBoxFromForeign/ComboBoxFromForeign";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {DataObjectNumericInput} from "../../../library/visual/widgets/fieldInputs/numeric/DataObjectNumericInput";
import {DataObjectDateInput} from "../../../library/visual/widgets/fieldInputs/dates/DataObjectDateInput";
import Repository from "../../../library/data/backend/Repository";
import {DataObjectTextAreaInput} from "../../../library/visual/widgets/fieldInputs/text/DataObjectTextAreaInput";

interface properties {
    exampleObjectState:DataObjectState;
    repository:Repository<Order>;
}

export const OrderDetailsSimpleWidget: FunctionComponent<properties> = ({exampleObjectState, repository}) => {

    return <>

        <ChooseFromTablePopupWidget
            config={new TableConfig().noDelete()}
            exampleObjectState={exampleObjectState}
            fieldDescription={Order.orderSubjectId}
        />

        <DataObjectNumericInput
            fieldDescription={Order.amount}
            exampleObjectState={exampleObjectState}
        />

        <DataObjectDateInput
            fieldDescription={Order.orderDate}
            exampleObjectState={exampleObjectState}
        />

        <DataObjectDateInput
            fieldDescription={Order.orderDeadline}
            exampleObjectState={exampleObjectState}
        />

        <ComboBoxFromForeign
            fieldDescription={Order.legalEntityId}
            exampleObjectState={exampleObjectState}
            isInline={true}
            onChoice={() => repository.fetchFiltered(exampleObjectState.getDataObject())}
        />

        <DataObjectNumericInput
            fieldDescription={Order.moneyReceived}
            exampleObjectState={exampleObjectState}
        />

        <DataObjectTextAreaInput
            fieldDescription={Order.comment}
            exampleObjectState={exampleObjectState}
        />
    </>
}