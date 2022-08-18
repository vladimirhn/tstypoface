import React, {FunctionComponent, useState} from 'react';
import retreat from "../../../../library/navigation/retreat";
import {ProcessItemWidget} from "./ProcessItemWidget";
import DataObject from "../../../../library/data/dataObject/DataObject";
import ConsumableType from "../../../domain/consumables/ConsumableType";
import StateElement from "../../../../library/data/dataObject/StateElement";
import VanillaStateElement from "../../../../library/data/dataObject/vanila/VanillaStateElement";
import VanillaStateMap from "../../../../library/data/dataObject/vanila/VanillaStateMap";
import ConsumableItem from "../../../domain/consumables/ConsumableItem";
import ConsumablesView from "../../../domain/consumables/ConsumablesView";
import {getFromObject, setToObject} from "../../../../library/data/dataObject/vanila/VanilaObjects";
import Repository from "../../../../library/data/backend/Repository";
import BackendInteraction from "../../../../library/data/backend/BackendInteraction";
import {ConsumablesSubPage} from "../ConsumablesSubPage";

interface properties {
    type:DataObject<ConsumableType> | undefined;
    navigationState:[Array<ConsumablesSubPage>, React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>];
}

export const AddNewItemWidget: FunctionComponent<properties> = ({type, navigationState}) => {

    const itemState:StateElement<any> = new VanillaStateElement<any>(useState<any>({}));
    const propsState:VanillaStateMap<Map<any,any>> = new VanillaStateMap<Map<any,any>>(useState<any>(new Map()));

    if (!type) return null;

    const cancelButton = <button onClick={() => {navigationState[1](retreat(navigationState[0]))}}>Назад</button>

    const save = () => {
        const item:{} = {};
        setToObject(item, ConsumableItem.item, getFromObject(itemState.getObject(), ConsumablesView.itemName));
        setToObject(item, ConsumableItem.typeId, type.data?.id);

        setToObject(item, ConsumableItem.propertyValues, propsState.getArray());
        Repository.empty(ConsumableItem).insertObject(item);
        setTimeout(()=>{navigationState[1](retreat(navigationState[0]))}, BackendInteraction.WAIT_REQUEST);

    }

    const saveButton = <button onClick={save} disabled={!itemState.getValue(ConsumablesView.itemName)}>Сохранить</button>
    return <div>

        <ProcessItemWidget type={type} itemState={itemState} propsState={propsState}/>
        {cancelButton}
        {saveButton}
    </div>
}