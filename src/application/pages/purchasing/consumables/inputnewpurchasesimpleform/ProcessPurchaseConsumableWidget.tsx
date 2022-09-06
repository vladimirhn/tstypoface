import {FunctionComponent} from "react";
import DataObject from "../../../../../library/data/dataObject/DataObject";
import {InsertPurchaseConsumablesWidget} from "./InsertPurchaseConsumablesWidget";
import {EditPurchaseConsumablesWidget} from "./EditPurchaseConsumablesWidget";
import SharedServices from "../../../../../library/SharedServices";

interface properties {
    sharedServices:SharedServices;
}

export const ProcessPurchaseConsumableWidget: FunctionComponent<properties>= ({sharedServices}) => {

    const selectedEntry:DataObject<any> | undefined = sharedServices.repository?.dataSet.oneSelectedEntry;

    if (!selectedEntry) {
        return <InsertPurchaseConsumablesWidget sharedServices={sharedServices}/>
    } else {
        return <EditPurchaseConsumablesWidget sharedServices={sharedServices}/>
    }
}