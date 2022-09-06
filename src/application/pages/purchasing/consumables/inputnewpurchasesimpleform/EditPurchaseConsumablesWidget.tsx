import {FunctionComponent, useState} from "react";
import {ProcessPurchaseConsumableForm} from "./ProcessPurchaseConsumableForm";
import DataObjectState from "../../../../../library/data/dataObject/DataObjectState";
import SharedServices from "../../../../../library/SharedServices";

interface properties {
    sharedServices:SharedServices;
}

export const EditPurchaseConsumablesWidget: FunctionComponent<properties>= ({sharedServices}) => {

    const exampleObjectState:DataObjectState = new DataObjectState(useState<any>(sharedServices.repository?.dataSet.oneSelectedEntry));

    const save = () => {
        sharedServices.repository?.update(exampleObjectState.getDataObject());
        sharedServices.repository?.dataSet.dropOneSelection();
        sharedServices.navigation?.home();
    }

    return <ProcessPurchaseConsumableForm
        exampleObjectState={exampleObjectState}
        applyButtonLabel={"сохранить"}
        applyButtonFunct={save}
    />
}