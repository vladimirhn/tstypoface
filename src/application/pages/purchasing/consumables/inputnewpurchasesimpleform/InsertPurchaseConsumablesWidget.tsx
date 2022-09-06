import {FunctionComponent, useEffect, useState} from "react";
import PurchasingConsumables from "../../../../domain/purchasing/PurchasingConsumables";
import {ProcessPurchaseConsumableForm} from "./ProcessPurchaseConsumableForm";
import DataObjectState from "../../../../../library/data/dataObject/DataObjectState";
import DataObject from "../../../../../library/data/dataObject/DataObject";
import Dates from "../../../../../library/tools/Dates";
import SharedServices from "../../../../../library/SharedServices";

interface properties {
    sharedServices:SharedServices;
}

export const InsertPurchaseConsumablesWidget: FunctionComponent<properties>= ({sharedServices}) => {

    const exampleObjectState:DataObjectState = new DataObjectState(useState<DataObject<PurchasingConsumables>>(DataObject.empty));
    useEffect(() => {
        exampleObjectState.setValue(PurchasingConsumables.purchasingDate, Dates.getToday());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const save = () => {
        sharedServices.repository?.insert(exampleObjectState.getDataObject());
        exampleObjectState.eraseObject();
        sharedServices.navigation?.home();
    }

    return <ProcessPurchaseConsumableForm
        exampleObjectState={exampleObjectState}
        applyButtonLabel={"сохранить"}
        applyButtonFunct={save}
    />
}