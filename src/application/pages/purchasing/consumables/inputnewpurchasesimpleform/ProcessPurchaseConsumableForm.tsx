import '../../../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent} from 'react';

import PurchasingConsumables from "../../../../domain/purchasing/PurchasingConsumables";
import DataObjectState from "../../../../../library/data/dataObject/DataObjectState";
import DataObject from "../../../../../library/data/dataObject/DataObject";
import TableConfig from "../../../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {ChooseFromTablePopupWidget} from "../../../../../library/visual/widgets/fieldInputs/chooseFromTablePopup/ChooseFromTablePopupWidget";
import {DataObjectNumericInput} from "../../../../../library/visual/widgets/fieldInputs/numeric/DataObjectNumericInput";
import ConsumableItem from "../../../../domain/consumables/ConsumableItem";
import {InlineLayout} from "../../../../../library/visual/widgets/layouts/InlineLayout";
import {Button} from "../../../../../library/visual/widgets/buttons/Button";
import {DataObjectDateInput} from "../../../../../library/visual/widgets/fieldInputs/dates/DataObjectDateInput";
import Runnable from "../../../../../library/functions/interfaces/Runnable";

interface properties {
    exampleObjectState:DataObjectState;
    applyButtonLabel:string;
    applyButtonFunct:Runnable;
}

export const ProcessPurchaseConsumableForm: FunctionComponent<properties>= ({   exampleObjectState,
                                                                                  applyButtonLabel,
                                                                                  applyButtonFunct}) => {

    const consumableChoice = (entry:DataObject<PurchasingConsumables> | undefined) => {
        const capacity = entry ? entry.data?.getValueByField(ConsumableItem.packageCapacity) : undefined;
        exampleObjectState.setValue(PurchasingConsumables.capacity, capacity);
    }

    const dateInputLine = <DataObjectDateInput
        exampleObjectState={exampleObjectState}
        fieldDescription={PurchasingConsumables.purchasingDate}
    />

    const priceInputLine = <DataObjectNumericInput
        exampleObjectState={exampleObjectState}
        fieldDescription={PurchasingConsumables.price}
    />

    const amountInputLine = <DataObjectNumericInput
        exampleObjectState={exampleObjectState}
        fieldDescription={PurchasingConsumables.amount}
    />

    const capacityInputLine = <DataObjectNumericInput
        exampleObjectState={exampleObjectState}
        fieldDescription={PurchasingConsumables.capacity}
    />

    const countTotal = ():number|null => {
        const price:number | null = exampleObjectState.getValue(PurchasingConsumables.price) || null;
        const amount:number | null = exampleObjectState.getValue(PurchasingConsumables.amount) || null;

        if (price !== null && amount !== null) {
            return price * amount;
        }
        return null;
    }

    const totalLabelWidget = <>{"итого"}</>
    const totalValueWidget = <>{countTotal()}</>
    const totalLine = <InlineLayout widgets={[totalLabelWidget, totalValueWidget]} defaultWidth={200}/>;

    const isApplyButtonAvailable = exampleObjectState.getValue(PurchasingConsumables.consumableId) && countTotal();

    const applyButton = <Button
        onClick={applyButtonFunct}
        label={applyButtonLabel}
        enabled={isApplyButtonAvailable}
    />

    return <div className={"widget"}>
        <p><b>Добавить новый расходник</b></p>

        {dateInputLine}

        <ChooseFromTablePopupWidget
            config={new TableConfig().noDelete()}
            exampleObjectState={exampleObjectState}
            fieldDescription={PurchasingConsumables.consumableId}
            dataObjectConsumer={consumableChoice}
        />

        {capacityInputLine}
        {priceInputLine}
        {amountInputLine}
        {totalLine}
        {applyButton}
    </div>
}