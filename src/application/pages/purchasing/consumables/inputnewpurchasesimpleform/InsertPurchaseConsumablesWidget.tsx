import {FunctionComponent, useEffect, useState} from "react";
import Repository from "../../../../../library/data/backend/Repository";
import PurchasingConsumables from "../../../../domain/purchasing/PurchasingConsumables";
import {ProcessPurchaseConsumableWidget} from "./ProcessPurchaseConsumableWidget";
import DataObjectState from "../../../../../library/data/dataObject/DataObjectState";
import DataObject from "../../../../../library/data/dataObject/DataObject";
import Dates from "../../../../../library/tools/Dates";

interface properties {
    repository:Repository<PurchasingConsumables>;
}

export const InsertPurchaseConsumablesWidget: FunctionComponent<properties>= ({repository}) => {

    const exampleObjectState:DataObjectState = new DataObjectState(useState<DataObject<PurchasingConsumables>>(DataObject.empty));
    useEffect(() => {
        exampleObjectState.setValue(PurchasingConsumables.purchasingDate, Dates.getToday());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const save = () => {
        repository.insert(exampleObjectState.getDataObject());
        exampleObjectState.eraseObject();
    }

    return <ProcessPurchaseConsumableWidget
        exampleObjectState={exampleObjectState}
        applyButtonLabel={"сохранить"}
        applyButtonFunct={save}
    />
}